"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const navigation = [
  { name: "Servicii", href: "#servicii" },
  { name: "Despre", href: "#despre" },
  { name: "Logistica", href: "#logistica" },
  { name: "Contact", href: "#contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="#" className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-white tracking-tight">G-TRANS</span>
              <span className="text-[9px] font-medium text-white/40 tracking-[0.3em] uppercase -mt-1">Esperto</span>
            </div>
          </Link>

          <div className="hidden md:flex md:items-center md:gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-sm text-white/60 transition-colors hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex md:items-center md:gap-6">
            <span className="text-sm text-white/40">+40 742 735 399</span>
            <Button asChild size="sm" className="bg-white text-black hover:bg-white/90 rounded-full px-5 h-9 text-xs font-medium">
              <Link href="#contact">Contacteaza-ne</Link>
            </Button>
          </div>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white/60 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/5">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-3 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button asChild className="mt-4 bg-white text-black hover:bg-white/90 rounded-full">
                <Link href="#contact">Contacteaza-ne</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
