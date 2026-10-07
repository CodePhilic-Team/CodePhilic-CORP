import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message, inquiryEmail } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    const apiKey = (process.env.BREVO_API_KEY || '').trim();
    const senderEmail = (process.env.BREVO_SENDER_EMAIL || 'clients@codephilic.com').trim();
    const receiverEmail = (process.env.CONTACT_RECEIVER_EMAIL || inquiryEmail || 'contact@codephilic.com').trim();

    if (!apiKey) {
      return NextResponse.json(
        { error: 'BREVO_API_KEY is not configured in environment variables.' },
        { status: 500 }
      );
    }

    const emailSubject = subject && subject.trim()
      ? `[Contact Form] ${subject.trim()} - ${name.trim()}`
      : `[Contact Form] New message from ${name.trim()}`;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.6; background-color: #f8fafc; padding: 24px; }
          .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: #3b82f6; color: #ffffff; padding: 24px; }
          .header h2 { margin: 0; font-size: 20px; font-weight: 700; }
          .header p { margin: 4px 0 0; font-size: 13px; opacity: 0.9; }
          .content { padding: 28px 24px; }
          .info-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
          .info-table td { padding: 8px 0; font-size: 14px; vertical-align: top; }
          .info-label { width: 120px; color: #64748b; font-weight: 600; }
          .info-val { color: #0f172a; font-weight: 500; }
          .message-box { background: #f8fafc; border-left: 4px solid #3b82f6; padding: 16px 20px; border-radius: 8px; margin-top: 12px; font-size: 15px; color: #334155; white-space: pre-wrap; line-height: 1.6; }
          .footer { padding: 16px 24px; background: #f1f5f9; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h2>New Contact Message Received</h2>
            <p>Sent from CodePhilic website contact form</p>
          </div>
          <div class="content">
            <table class="info-table">
              <tr>
                <td class="info-label">From Name:</td>
                <td class="info-val">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td class="info-label">Reply Email:</td>
                <td class="info-val"><a href="mailto:${escapeHtml(email)}" style="color:#3b82f6; text-decoration:none;">${escapeHtml(email)}</a></td>
              </tr>
              ${inquiryEmail ? `<tr><td class="info-label">Department:</td><td class="info-val">${escapeHtml(inquiryEmail)}</td></tr>` : ''}
              <tr>
                <td class="info-label">Subject:</td>
                <td class="info-val">${escapeHtml(subject || 'No Subject')}</td>
              </tr>
            </table>

            <div style="font-weight: 600; font-size: 14px; color: #0f172a; margin-top: 16px;">Message:</div>
            <div class="message-box">${escapeHtml(message)}</div>
          </div>
          <div class="footer">
            You can reply directly to this email to respond to ${escapeHtml(name)} (${escapeHtml(email)}).
          </div>
        </div>
      </body>
      </html>
    `;

    const textContent = `New Contact Form Message

From: ${name} (${email})
Department: ${inquiryEmail || 'General'}
Subject: ${subject || 'No Subject'}

Message:
${message}
`;

    // 1. If key is Brevo REST API v3 key (starts with 'xkeysib-')
    if (apiKey.startsWith('xkeysib-')) {
      const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': apiKey,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          sender: { name: 'CodePhilic Website', email: senderEmail },
          to: [{ email: receiverEmail, name: 'CodePhilic Team' }],
          replyTo: { email, name },
          subject: emailSubject,
          htmlContent,
          textContent,
        }),
      });

      if (!brevoRes.ok) {
        const errorData = await brevoRes.json().catch(() => ({}));
        console.error('Brevo REST API error:', errorData);
        return NextResponse.json(
          {
            error: errorData.message || 'Failed to dispatch email via Brevo API.',
            details: errorData,
          },
          { status: brevoRes.status }
        );
      }

      const resData = await brevoRes.json();
      return NextResponse.json({ success: true, messageId: resData.messageId });
    }

    // 2. If key is Brevo SMTP Key (starts with 'xsmtpsib-') or fallback
    const smtpLogin = (process.env.BREVO_SMTP_LOGIN || senderEmail).trim();

    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        secure: false, // TLS via STARTTLS
        auth: {
          user: smtpLogin,
          pass: apiKey,
        },
      });

      const info = await transporter.sendMail({
        from: `"CodePhilic Website" <${senderEmail}>`,
        to: receiverEmail,
        replyTo: `"${name}" <${email}>`,
        subject: emailSubject,
        text: textContent,
        html: htmlContent,
      });

      return NextResponse.json({ success: true, messageId: info.messageId });
    } catch (smtpErr: any) {
      console.error('Brevo SMTP error:', smtpErr);

      if (smtpErr?.responseCode === 525 || (smtpErr?.message && smtpErr.message.includes('525'))) {
        return NextResponse.json(
          {
            error:
              "Brevo SMTP rejected the connection (525 Unauthorized IP address). To fix this, either: 1) Switch to the REST API Key by going to Brevo Dashboard -> Settings -> SMTP & API -> 'API Keys' tab and generating a key (starts with 'xkeysib-'), which works without IP restrictions, or 2) Whitelist your current IP address in Brevo under SMTP & API -> Authorized IPs.",
          },
          { status: 403 }
        );
      }

      if (smtpErr?.code === 'EAUTH' || smtpErr?.responseCode === 535) {
        return NextResponse.json(
          {
            error:
              "Brevo SMTP Authentication failed (535 Invalid Login). Please check your Brevo SMTP key and BREVO_SMTP_LOGIN. Or generate a REST API key (starts with 'xkeysib-') from Brevo Dashboard -> Settings -> SMTP & API -> API Keys tab.",
          },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { error: smtpErr?.message || 'Failed to send email via SMTP.' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
