"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: "#acasa", label: "Acasă" },
    { href: "#servicii", label: "Servicii" },
    { href: "#despre", label: "Despre noi" },
    { href: "#logistica", label: "Logistică" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-primary text-primary-foreground py-2 hidden md:block">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-end gap-6 text-sm">
            <a href="tel:+40742735399" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="h-3.5 w-3.5" />
              +40 742 735 399
            </a>
            <a href="mailto:logistica@g-trans.ro" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Mail className="h-3.5 w-3.5" />
              logistica@g-trans.ro
            </a>
          </div>
        </div>
      </div>
      
      <div className="bg-card/98 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center">
              <div className="relative h-20 w-52">
                <Image
                  src="/images/logo.svg"
                  alt="G-Trans Esperto"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <Button variant="outline" size="sm" asChild>
                <a href="tel:+40742735399">
                  <Phone className="h-4 w-4 mr-2" />
                  Sună acum
                </a>
              </Button>
              <Button size="sm" asChild>
                <Link href="#contact">Solicită ofertă</Link>
              </Button>
            </div>

            <button
              className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden py-6 border-t border-border">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border">
                  <a href="tel:+40742735399" className="flex items-center gap-2 text-sm text-muted-foreground px-4">
                    <Phone className="h-4 w-4" />
                    +40 742 735 399
                  </a>
                  <a href="mailto:logistica@g-trans.ro" className="flex items-center gap-2 text-sm text-muted-foreground px-4">
                    <Mail className="h-4 w-4" />
                    logistica@g-trans.ro
                  </a>
                  <Button asChild className="mx-4 mt-2">
                    <Link href="#contact">Solicită ofertă</Link>
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
