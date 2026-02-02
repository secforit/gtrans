"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Cookie, X } from "lucide-react"

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent")
    if (!consent) {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted")
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem("cookie_consent", "declined")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-card border border-border rounded-xl shadow-2xl p-5 md:p-6">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-accent/10 rounded-lg shrink-0 hidden sm:block">
              <Cookie className="h-5 w-5 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="font-semibold text-foreground text-sm">
                  Acest site utilizeaza cookie-uri
                </h3>
                <button
                  onClick={decline}
                  className="text-muted-foreground hover:text-foreground transition-colors shrink-0 -mt-1"
                  aria-label="Inchide"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Folosim cookie-uri pentru a imbunatati experienta pe site si pentru analytics.
                Citeste{" "}
                <Link href="/cookies" className="text-accent hover:underline">
                  politica de cookies
                </Link>{" "}
                pentru mai multe detalii.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button onClick={accept} size="sm">
                  Accepta toate
                </Button>
                <Button onClick={decline} variant="outline" size="sm">
                  Doar necesare
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
