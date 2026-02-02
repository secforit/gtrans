import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"

const quickLinks = [
  { href: "#acasa", label: "Acasa" },
  { href: "#servicii", label: "Servicii" },
  { href: "#despre", label: "Despre noi" },
  { href: "#logistica", label: "Logistica" },
  { href: "#contact", label: "Contact" },
]

const legalLinks = [
  { href: "/termeni", label: "Termeni si Conditii" },
  { href: "/cookies", label: "Politica de Cookies" },
]

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <div className="relative h-16 w-44">
                <Image
                  src="/images/logo.svg"
                  alt="G-Trans Esperto"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-4">
              S.C. G-TRANS ESPERTO S.R.L. este o firma de transport infiintata in anul 2008. 
              Obiectul nostru de activitate este transportul rutier de marfuri si activitatile conexe ale acestuia.
            </p>
            <p className="text-primary-foreground/50 text-xs">
              CUI: RO23120545 | J02/110/2008
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-primary-foreground mb-6 text-lg">Linkuri rapide</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-primary-foreground mb-6 text-lg">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-primary-foreground mb-6 text-lg">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-sm text-primary-foreground/70">
                  Str. Cetatii Orod, Nr. 48, Loc. Vladimirescu, Jud. Arad, 317405, Romania
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <div className="text-sm">
                  <a href="tel:+40742735399" className="text-primary-foreground/70 hover:text-accent transition-colors block">
                    +40 742 735 399
                  </a>
                  <a href="tel:+40723929081" className="text-primary-foreground/70 hover:text-accent transition-colors block">
                    +40 723 929 081
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <a href="mailto:logistica@g-trans.ro" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  logistica@g-trans.ro
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} G-TRANS ESPERTO S.R.L. Toate drepturile rezervate.
          </p>
          <div className="flex items-center gap-6 text-primary-foreground/50 text-sm">
            <span>Parteneri: Smart Diesel | Fan Courier</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
