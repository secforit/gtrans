import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { sendCallbackEmail } from "@/lib/email"

const callbackSchema = z.object({
  phone: z.string().min(10, "Numarul de telefon nu este valid"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const validationResult = callbackSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Numarul de telefon nu este valid",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { phone } = validationResult.data

    await sendCallbackEmail({ phone })

    return NextResponse.json({
      success: true,
      message: "Cererea a fost trimisa! Te vom suna in curand.",
    })
  } catch (error) {
    console.error("Callback form error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "A aparut o eroare. Te rugam sa incerci din nou.",
      },
      { status: 500 }
    )
  }
}
