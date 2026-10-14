import nodemailer from "nodemailer";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  const origin = request.headers.get("origin");
  if (origin) {
    let originUrl;
    try {
      originUrl = new URL(origin);
    } catch {
      return Response.json(
        { message: "This request could not be verified." },
        { status: 403 },
      );
    }

    const expectedHost =
      request.headers.get("x-forwarded-host")?.split(",")[0].trim() ||
      request.headers.get("host");
    const expectedProtocol =
      request.headers.get("x-forwarded-proto")?.split(",")[0].trim() ||
      new URL(request.url).protocol.slice(0, -1);

    if (
      !expectedHost ||
      originUrl.host.toLowerCase() !== expectedHost.toLowerCase() ||
      originUrl.protocol !== `${expectedProtocol}:`
    ) {
      return Response.json(
        { message: "This request could not be verified." },
        { status: 403 },
      );
    }
  }

  if (
    request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !==
    "application/json"
  ) {
    return Response.json(
      { message: "Please submit this form using the supported format." },
      { status: 415 },
    );
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 4000) {
    return Response.json(
      { message: "The submitted request is too large." },
      { status: 413 },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { message: "The submitted request could not be read." },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json(
      { message: "Please submit a valid email address." },
      { status: 400 },
    );
  }

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const honeypot = typeof body.website === "string" ? body.website.trim() : "";
  if (honeypot) return Response.json({ ok: true });

  if (!EMAIL_PATTERN.test(email) || email.length > 254 || body.consent !== true) {
    return Response.json(
      { message: "Enter a valid email address and confirm your consent." },
      { status: 400 },
    );
  }

  const smtpHost = process.env.SMTP_HOST?.trim();
  const smtpPort = Number(process.env.SMTP_PORT);
  const smtpSecure = process.env.SMTP_SECURE;
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;
  const smtpFrom = process.env.SMTP_FROM?.trim();
  const contactEmail = process.env.CONTACT_EMAIL?.trim();

  if (
    !smtpHost ||
    !Number.isInteger(smtpPort) ||
    smtpPort < 1 ||
    smtpPort > 65535 ||
    !["true", "false"].includes(smtpSecure) ||
    !smtpUser ||
    !smtpPassword ||
    !smtpFrom ||
    !contactEmail
  ) {
    console.error(
      "Newsletter signup is unavailable because SMTP configuration is incomplete.",
    );
    return Response.json(
      { message: "Signups are temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure === "true",
    auth: { user: smtpUser, pass: smtpPassword },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  });

  try {
    await transporter.sendMail({
      from: smtpFrom,
      to: contactEmail,
      replyTo: email,
      subject: "Newsletter subscription request",
      text: `A visitor requested occasional business updates.\n\nEmail: ${email}\nConsent: Yes`,
      html: `<p>A visitor requested occasional business updates.</p><p><strong>Email:</strong> ${email.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char])}</p><p><strong>Consent:</strong> Yes</p>`,
    });
  } catch (error) {
    console.error("Failed to deliver a newsletter signup request.", {
      code: error?.code,
      command: error?.command,
      responseCode: error?.responseCode,
    });
    return Response.json(
      { message: "We couldn't send your signup request. Please try again later." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true }, { status: 201 });
}
