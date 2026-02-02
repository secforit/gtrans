import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { sendContactEmail } from "@/lib/email"

const contactSchema = z.object({
  name: z.string().min(2, "Numele trebuie sa aiba cel putin 2 caractere"),
  phone: z.string().min(10, "Numarul de telefon nu este valid"),
  email: z.string().email("Adresa de email nu este valida"),
  message: z.string().min(10, "Mesajul trebuie sa aiba cel putin 10 caractere"),
  agreed: z.literal(true, {
    errorMap: () => ({ message: "Trebuie sa fii de acord cu termenii si conditiile" }),
  }),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const validationResult = contactSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Datele introduse nu sunt valide",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { name, phone, email, message } = validationResult.data

    await sendContactEmail({ name, phone, email, message })

    return NextResponse.json({
      success: true,
      message: "Mesajul a fost trimis cu succes! Te vom contacta in curand.",
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "A aparut o eroare la trimiterea mesajului. Te rugam sa incerci din nou.",
      },
      { status: 500 }
    )
  }
}
