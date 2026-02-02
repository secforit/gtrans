import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

interface ContactFormData {
  name: string
  phone: string
  email: string
  message: string
}

interface CallbackFormData {
  phone: string
}

const getEmailTemplate = (content: string) => `
<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>G-TRANS ESPERTO</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header with Logo -->
          <tr>
            <td style="padding: 30px 40px; text-align: center;">
              <img src="cid:logo" alt="G-TRANS ESPERTO" style="max-width: 200px; height: auto;" />
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px 40px; border-top: 1px solid #e9ecef;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="color: #6c757d; font-size: 14px; line-height: 1.6;">
                    <strong style="color: #2d2d2d;">G-TRANS ESPERTO S.R.L.</strong><br>
                    Str. Cetatii Orod, Nr. 48<br>
                    Loc. Vladimirescu, Jud. Arad, 317405, RO<br><br>
                    <a href="tel:+40742735399" style="color: #ff3131; text-decoration: none;">+40 742 735 399</a> /
                    <a href="tel:+40723929081" style="color: #ff3131; text-decoration: none;">+40 723 929 081</a><br>
                    <a href="mailto:logistica@g-trans.ro" style="color: #ff3131; text-decoration: none;">logistica@g-trans.ro</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Copyright -->
        <table width="600" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding: 20px; text-align: center; color: #adb5bd; font-size: 12px;">
              &copy; ${new Date().getFullYear()} G-TRANS ESPERTO S.R.L. Toate drepturile rezervate.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

export async function sendContactEmail(data: ContactFormData) {
  const content = `
    <h2 style="color: #2d2d2d; margin: 0 0 20px 0; font-size: 24px;">Mesaj nou de contact</h2>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
      <tr>
        <td style="padding: 15px; background-color: #f8f9fa; border-radius: 8px; margin-bottom: 10px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="120" style="color: #6c757d; font-size: 14px; font-weight: 600;">Nume:</td>
              <td style="color: #2d2d2d; font-size: 14px;">${data.name}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr><td style="height: 10px;"></td></tr>
      <tr>
        <td style="padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="120" style="color: #6c757d; font-size: 14px; font-weight: 600;">Telefon:</td>
              <td style="color: #2d2d2d; font-size: 14px;">
                <a href="tel:${data.phone}" style="color: #ff3131; text-decoration: none;">${data.phone}</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr><td style="height: 10px;"></td></tr>
      <tr>
        <td style="padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="120" style="color: #6c757d; font-size: 14px; font-weight: 600;">Email:</td>
              <td style="color: #2d2d2d; font-size: 14px;">
                <a href="mailto:${data.email}" style="color: #ff3131; text-decoration: none;">${data.email}</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <div style="background-color: #2d2d2d; padding: 20px; border-radius: 8px;">
      <h3 style="color: #ffffff; margin: 0 0 10px 0; font-size: 16px;">Mesaj:</h3>
      <p style="color: #e9ecef; margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
    </div>
  `

  const mailOptions = {
    from: `"G-TRANS Website" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL || "logistica@g-trans.ro",
    replyTo: data.email,
    subject: `Mesaj nou de contact de la ${data.name}`,
    html: getEmailTemplate(content),
    attachments: [
      {
        filename: "logo.svg",
        path: "./public/images/logo.svg",
        cid: "logo",
      },
    ],
  }

  return transporter.sendMail(mailOptions)
}

export async function sendCallbackEmail(data: CallbackFormData) {
  const content = `
    <h2 style="color: #2d2d2d; margin: 0 0 20px 0; font-size: 24px;">Cerere de apel telefonic</h2>

    <div style="background-color: #ff3131; padding: 25px; border-radius: 8px; text-align: center;">
      <p style="color: #ffffff; margin: 0 0 10px 0; font-size: 14px;">Un client doreste sa fie contactat la numarul:</p>
      <a href="tel:${data.phone}" style="color: #ffffff; font-size: 28px; font-weight: bold; text-decoration: none;">${data.phone}</a>
    </div>

    <p style="color: #6c757d; margin: 30px 0 0 0; font-size: 14px; text-align: center;">
      Va rugam sa contactati clientul cat mai curand posibil.
    </p>
  `

  const mailOptions = {
    from: `"G-TRANS Website" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL || "logistica@g-trans.ro",
    subject: `Cerere apel telefonic: ${data.phone}`,
    html: getEmailTemplate(content),
    attachments: [
      {
        filename: "logo.svg",
        path: "./public/images/logo.svg",
        cid: "logo",
      },
    ],
  }

  return transporter.sendMail(mailOptions)
}
