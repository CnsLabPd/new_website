import { NextRequest, NextResponse } from "next/server"
import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda"

const REGION = "ap-south-1"
const FUNCTION_NAME = "Neurogati_Dev_TokenGenerator"

const lambdaClient = new LambdaClient({ region: REGION })

type LaunchTokenRequest = {
  username?: string
  email?: string
}

export async function POST(request: NextRequest) {
  try {
    const { username, email }: LaunchTokenRequest = await request.json()

    if (!username || !email) {
      return NextResponse.json(
        { error: "username and email are required" },
        { status: 400 }
      )
    }

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
        FunctionName: FUNCTION_NAME,
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
      return NextResponse.json(
        { error: "Failed to generate launch token" },
        { status: 502 }
      )
    }

    const parsedBody =
      typeof lambdaResponse.body === "string"
        ? JSON.parse(lambdaResponse.body)
        : lambdaResponse.body

    if (!parsedBody?.token) {
      console.error("Unexpected token generator response:", lambdaResponse)
      return NextResponse.json(
        { error: "Token generator returned an invalid response" },
        { status: 502 }
      )
    }

    return NextResponse.json({
      token: parsedBody.token,
      expiresAt: parsedBody.expires_at ?? null,
    })
  } catch (error) {
    console.error("Error generating Sonic Pop launch token:", error)
    return NextResponse.json(
      { error: "Failed to generate launch token" },
      { status: 500 }
    )
  }
}
