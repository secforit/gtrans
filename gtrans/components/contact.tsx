import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react"
import Link from "next/link"

const contactItems = [
  {
    icon: Phone,
    label: "Telefon",
    value: "+40 742 735 399",
    secondary: "+40 723 929 081",
    href: "tel:+40742735399",
  },
  {
    icon: Mail,
    label: "Email",
    value: "logistica@gtrans.ro",
    href: "mailto:logistica@gtrans.ro",
  },
  {
    icon: MapPin,
    label: "Adresa",
    value: "Str. Cetatii Orod, Nr. 48",
    secondary: "Vladimirescu, Arad, RO",
    href: "https://maps.google.com/?q=Str.+Cetatii+Orod+Nr.+48+Vladimirescu+Arad+Romania",
  },
]

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="text-sm font-medium text-white/40 tracking-widest uppercase mb-4">Contact</p>
            <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">
              Hai sa discutam<br />
              <span className="font-semibold">despre proiectul tau</span>
            </h2>

            <p className="mt-8 text-white/50 leading-relaxed max-w-md">
              Pentru orice cereri de oferta sau informatii suplimentare,
              contacteaza-ne folosind una dintre metodele de mai jos.
            </p>

            <div className="mt-12 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-sm text-white/30">Program: Luni - Vineri, 08:00 - 18:00</span>
            </div>
          </div>

          <div className="space-y-6">
            {contactItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group flex items-start gap-6 p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 group-hover:bg-white transition-colors">
                  <item.icon className="h-5 w-5 text-white group-hover:text-neutral-900 transition-colors" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white/40 mb-1">{item.label}</p>
                  <p className="text-lg text-white font-medium">{item.value}</p>
                  {item.secondary && (
                    <p className="text-white/50">{item.secondary}</p>
                  )}
                </div>
                <ArrowUpRight className="h-5 w-5 text-white/30 group-hover:text-white transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
