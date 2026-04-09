import { NextRequest, NextResponse } from "next/server"
import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda"

const REGION = "ap-south-1"
const TOKEN_FUNCTION_NAME = "Neurogati_Dev_TokenGenerator"
const INGEST_URL =
  "https://w92nwfz91c.execute-api.ap-south-1.amazonaws.com/v1/telemetry/ingest"

const lambdaClient = new LambdaClient({ region: REGION })

type IngestRequest = {
  username?: string
  email?: string
  telemetryPayload?: unknown
}

async function createLaunchToken(username: string, email: string) {
  const invokePayload = {
    requestContext: {
      authorizer: {
        jwt: {
          claims: {
            sub: email,
            email,
            preferred_username: username,
          },
        },
      },
    },
  }

  const response = await lambdaClient.send(
    new InvokeCommand({
      FunctionName: TOKEN_FUNCTION_NAME,
      InvocationType: "RequestResponse",
      Payload: Buffer.from(JSON.stringify(invokePayload)),
    })
  )

  const rawPayload = response.Payload
    ? Buffer.from(response.Payload).toString("utf-8")
    : ""
  const lambdaResponse = rawPayload ? JSON.parse(rawPayload) : {}

  if (response.FunctionError) {
    console.error("Token generator lambda function error:", {
      functionError: response.FunctionError,
      lambdaResponse,
    })
    throw new Error("Failed to generate launch token")
  }

  const parsedBody =
    typeof lambdaResponse.body === "string"
      ? JSON.parse(lambdaResponse.body)
      : lambdaResponse.body

  if (!parsedBody?.token) {
    console.error("Unexpected token generator response:", lambdaResponse)
    throw new Error("Token generator returned an invalid response")
  }

  return parsedBody.token as string
}

async function postTelemetry(token: string, telemetryPayload: unknown) {
  return fetch(INGEST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(telemetryPayload),
  })
}

export async function POST(request: NextRequest) {
  try {
    const { username, email, telemetryPayload }: IngestRequest =
      await request.json()

    if (!username || !email || !telemetryPayload) {
      return NextResponse.json(
        { error: "username, email, and telemetryPayload are required" },
        { status: 400 }
      )
    }

    let token = await createLaunchToken(username, email)
    let ingestResponse = await postTelemetry(token, telemetryPayload)

    if (ingestResponse.status === 401 || ingestResponse.status === 403) {
      token = await createLaunchToken(username, email)
      ingestResponse = await postTelemetry(token, telemetryPayload)
    }

    const responseText = await ingestResponse.text()
    let parsedResponse: unknown = null

    try {
      parsedResponse = responseText ? JSON.parse(responseText) : null
    } catch {
      parsedResponse = responseText
    }

    if (!ingestResponse.ok) {
      console.error("Telemetry ingest failed:", {
        status: ingestResponse.status,
        body: parsedResponse,
      })

      return NextResponse.json(
        {
          error: "Telemetry ingest failed",
          upstreamStatus: ingestResponse.status,
          details: parsedResponse,
        },
        { status: 502 }
      )
    }

    return NextResponse.json({
      success: true,
      data: parsedResponse,
    })
  } catch (error) {
    console.error("Error proxying Sonic Pop telemetry ingest:", error)
    return NextResponse.json(
      { error: "Failed to upload telemetry" },
      { status: 500 }
    )
  }
}
