import Image from "next/image"
import Link from "next/link"

const links = [
  { name: "Servicii", href: "#servicii" },
  { name: "Despre", href: "#despre" },
  { name: "Logistica", href: "#logistica" },
  { name: "Contact", href: "#contact" },
]

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-6">
            <Image
              src="/images/logo.svg"
              alt="G-Trans Esperto"
              width={200}
              height={60}
              className="h-14 w-auto brightness-0 invert"
            />
            <div className="flex flex-col gap-1">
              <p className="text-white/40 text-sm">
                Din 2008, oferim servicii profesionale de transport rutier de marfuri in Romania si Europa.
              </p>
              <p className="text-xs text-white/30">
                {new Date().getFullYear()} G-Trans Esperto. Toate drepturile rezervate.
              </p>
              <p className="text-xs text-white/30">
                G-Trans Esperto SRL · RO23120545 · J02/110/2008 · EUID: ROONRC.J02/110/2008
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-4">
            <div className="flex flex-wrap gap-8">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-white/40 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <a href="https://www.secforit.ro" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 opacity-30 hover:opacity-60 transition-opacity">
              <span className="text-xs text-white">Creat de Lisman Razvan</span>
              <Image src="/images/logo-secforit.svg" alt="Secforit" width={320} height={96} className="h-24 w-auto" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
