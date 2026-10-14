import nodemailer from "nodemailer";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

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
  if (contentLength > 12000) {
    return Response.json(
      { message: "The submitted message is too large." },
      { status: 413 },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { message: "The submitted form could not be read." },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json(
      { message: "Please submit valid contact details." },
      { status: 400 },
    );
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const service = typeof body.service === "string" ? body.service.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const honeypot = typeof body.website === "string" ? body.website.trim() : "";

  if (honeypot) {
    return Response.json({ ok: true });
  }

  if (
    !name ||
    name.length > 120 ||
    !EMAIL_PATTERN.test(email) ||
    email.length > 254 ||
    phone.length > 40 ||
    service.length > 160 ||
    message.length < 8 ||
    message.length > 3000
  ) {
    return Response.json(
      {
        message:
          "Please check your details and make sure your message is at least 8 characters long.",
      },
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
    console.error("Contact email is unavailable because SMTP configuration is incomplete.");
    return Response.json(
      { message: "Enquiries are temporarily unavailable. Please try again later." },
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

  const safeName = name.replace(/[\r\n\x00-\x1f\x7f]+/g, " ");
  const safeMessage = message.replace(/\r\n?/g, "\n");
  const text = [
    `Name: ${safeName}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Interested in: ${service || "Not specified"}`,
    "",
    "Message:",
    safeMessage,
  ].join("\n");
  const html = [
    `<p><strong>Name:</strong> ${escapeHtml(safeName)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
    `<p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>`,
    `<p><strong>Interested in:</strong> ${escapeHtml(service || "Not specified")}</p>`,
    `<p><strong>Message:</strong></p>`,
    `<p>${escapeHtml(safeMessage).replace(/\n/g, "<br>")}</p>`,
  ].join("");

  try {
    await transporter.sendMail({
      from: smtpFrom,
      to: contactEmail,
      replyTo: { name: safeName, address: email },
      subject: `Website enquiry from ${safeName}`,
      text,
      html,
    });
  } catch (error) {
    console.error("Failed to deliver a contact enquiry email.", {
      code: error?.code,
      command: error?.command,
      responseCode: error?.responseCode,
    });
    return Response.json(
      { message: "We couldn't send your enquiry. Please try again later." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true }, { status: 201 });
}
