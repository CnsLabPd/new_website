import { NextRequest, NextResponse } from "next/server"
import { GetObjectCommand, NoSuchKey, S3Client } from "@aws-sdk/client-s3"

const REGION = "ap-south-1"
const BUCKET_NAME = "neurogati-telemetry-raw-dev"
const ANALYTICS_PREFIX = "telementary_analytics"

const s3Client = new S3Client({ region: REGION })

async function streamToString(
  stream: NodeJS.ReadableStream | ReadableStream | Blob | undefined
) {
  if (!stream) return ""
  if ("transformToString" in stream && typeof stream.transformToString === "function") {
    return stream.transformToString()
  }

  const chunks: Uint8Array[] = []
  for await (const chunk of stream as NodeJS.ReadableStream) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks).toString("utf-8")
}

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("sessionId")

  if (!sessionId) {
    return NextResponse.json({ error: "sessionId is required" }, { status: 400 })
  }

  const key = `${ANALYTICS_PREFIX}/${sessionId}.json`

  try {
    const response = await s3Client.send(
      new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      })
    )

    const raw = await streamToString(response.Body)
    const analytics = raw ? JSON.parse(raw) : null

    return NextResponse.json({
      ready: true,
      sessionId,
      analytics,
    })
  } catch (error) {
    if (error instanceof NoSuchKey || (error as { name?: string }).name === "NoSuchKey") {
      return NextResponse.json(
        {
          ready: false,
          sessionId,
          status: "processing",
        },
        { status: 202 }
      )
    }

    if ((error as { $metadata?: { httpStatusCode?: number } }).$metadata?.httpStatusCode === 404) {
      return NextResponse.json(
        {
          ready: false,
          sessionId,
          status: "processing",
        },
        { status: 202 }
      )
    }

    console.error("Error fetching Sonic Pop analytics:", error)
    return NextResponse.json(
      { error: "Failed to fetch analytics results" },
      { status: 500 }
    )
  }
}
