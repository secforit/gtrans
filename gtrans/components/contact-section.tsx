"use client"

import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Loader2, CheckCircle } from "lucide-react"

const contactInfo = [
  {
    icon: MapPin,
    title: "Adresa",
    content: "Str. Cetatii Orod, Nr. 48, Loc. Vladimirescu, Jud. Arad, 317405, RO",
  },
  {
    icon: Phone,
    title: "Telefon",
    content: "+40 742 735 399 / +40 723 929 081",
    href: "tel:+40742735399",
  },
  {
    icon: Mail,
    title: "Email",
    content: "logistica@g-trans.ro",
    href: "mailto:logistica@g-trans.ro",
  },
  {
    icon: Clock,
    title: "Program",
    content: "Luni - Vineri: 08:00 - 18:00",
  },
]

export function ContactSection() {
  const [callbackPhone, setCallbackPhone] = useState("")
  const [isCallbackSubmitting, setIsCallbackSubmitting] = useState(false)
  const [callbackStatus, setCallbackStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCallbackSubmitting(true)
    setCallbackStatus({ type: null, message: "" })

    try {
      const response = await fetch("/api/callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: callbackPhone }),
      })

      const data = await response.json()

      if (data.success) {
        setCallbackStatus({ type: "success", message: data.message })
        setCallbackPhone("")
      } else {
        setCallbackStatus({
          type: "error",
          message: data.error || "A aparut o eroare. Te rugam sa incerci din nou.",
        })
      }
    } catch {
      setCallbackStatus({
        type: "error",
        message: "A aparut o eroare de conexiune. Te rugam sa incerci din nou.",
      })
    } finally {
      setIsCallbackSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-muted">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl">
          <p className="text-accent font-semibold mb-3 tracking-wide uppercase text-sm">
            Contact
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            Hai sa discutam despre proiectul tau
          </h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            Pentru orice cereri de oferta sau informatii suplimentare,
            contacteaza-ne folosind una dintre metodele de mai jos.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {contactInfo.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="p-3 bg-primary/10 rounded-lg h-fit">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">{item.title}</p>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {item.content}
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground">{item.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Card className="bg-primary border-0">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-primary-foreground mb-2">Te sunam noi?</h3>
              <p className="text-primary-foreground/70 text-sm mb-4">
                Lasa-ne numarul de telefon si te contactam in cel mai scurt timp.
              </p>
              <form onSubmit={handleCallbackSubmit} className="flex gap-3">
                <Input
                  placeholder="Numarul tau de telefon"
                  type="tel"
                  value={callbackPhone}
                  onChange={(e) => setCallbackPhone(e.target.value)}
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                  disabled={isCallbackSubmitting}
                />
                <Button
                  type="submit"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground shrink-0"
                  disabled={isCallbackSubmitting}
                >
                  {isCallbackSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Trimite"
                  )}
                </Button>
              </form>
              {callbackStatus.type && (
                <p className={`mt-3 text-sm ${
                  callbackStatus.type === "success"
                    ? "text-green-300"
                    : "text-red-300"
                }`}>
                  {callbackStatus.type === "success" && (
                    <CheckCircle className="h-4 w-4 inline mr-1" />
                  )}
                  {callbackStatus.message}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
