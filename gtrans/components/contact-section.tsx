"use client"

import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Send, Loader2, CheckCircle } from "lucide-react"

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
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    agreed: false,
  })
  const [callbackPhone, setCallbackPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCallbackSubmitting, setIsCallbackSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })
  const [callbackStatus, setCallbackStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitStatus({ type: "success", message: data.message })
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
          agreed: false,
        })
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "A aparut o eroare. Te rugam sa incerci din nou.",
        })
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "A aparut o eroare de conexiune. Te rugam sa incerci din nou.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className="text-accent font-semibold mb-3 tracking-wide uppercase text-sm">
              Contact
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Hai sa discutam despre proiectul tau
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Pentru orice cereri de oferta sau informatii suplimentare,
              contacteaza-ne folosind una dintre metodele de mai jos sau completeaza formularul.
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

          <Card className="border-border shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">Trimite-ne un mesaj</h3>
              <p className="text-muted-foreground mb-8">
                Completeaza formularul si iti vom raspunde cat mai curand posibil.
              </p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Nume complet</label>
                    <Input
                      placeholder="Ion Popescu"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Telefon</label>
                    <Input
                      placeholder="+40 7XX XXX XXX"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                  <Input
                    placeholder="exemplu@email.com"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Mesajul tau</label>
                  <Textarea
                    placeholder="Descrie-ne nevoile tale de transport..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={formData.agreed}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, agreed: checked as boolean })
                    }
                    className="mt-1"
                    disabled={isSubmitting}
                  />
                  <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                    Sunt de acord cu politica de confidentialitate si Termenii si Conditiile site-ului.
                  </label>
                </div>

                {submitStatus.type && (
                  <div className={`p-4 rounded-lg ${
                    submitStatus.type === "success"
                      ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                      : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                  }`}>
                    {submitStatus.type === "success" && (
                      <CheckCircle className="h-4 w-4 inline mr-2" />
                    )}
                    {submitStatus.message}
                  </div>
                )}

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Se trimite...
                    </>
                  ) : (
                    <>
                      Trimite mesajul
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
