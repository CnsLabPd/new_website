import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, audienceType, problemStatement, background, timeline } = body;

    // Validate required fields
    if (!fullName || !email || !audienceType || !problemStatement) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format the email content
    const emailContent = `
New Advisory Query Submission

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: ${fullName}
Email: ${email}
Category: ${audienceType}
${timeline ? `Timeline: ${timeline}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROBLEM STATEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${problemStatement}

${background ? `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BACKGROUND
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${background}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted at: ${new Date().toLocaleString()}
    `.trim();

    // Send email using Resend
    // NOTE: In testing mode, Resend only allows sending to the verified account email
    // For production: verify your domain at resend.com/domains and update the 'from' address
    const { data, error } = await resend.emails.send({
      from: 'Neurogati Advisory <onboarding@resend.dev>',
      to: ['cnspdapp@gmail.com'], // Changed to verified email for testing mode
      subject: `New Advisory Query from ${fullName} - ${audienceType}`,
      text: emailContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Advisory query submitted successfully',
        emailId: data?.id
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
