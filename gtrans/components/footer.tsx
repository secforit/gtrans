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
        <div className="py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <Image
              src="/images/logo.svg"
              alt="G-Trans Esperto"
              width={140}
              height={40}
              className="h-10 w-auto"
            />
            <p className="mt-4 text-white/40 max-w-sm text-sm">
              Din 2008, oferim servicii profesionale de transport rutier de marfuri in Romania si Europa.
            </p>
          </div>

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
        </div>

        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            {new Date().getFullYear()} G-Trans Esperto. Toate drepturile rezervate.
          </p>
          <p className="text-xs text-white/30">
            Vladimirescu, Arad, Romania
          </p>
        </div>
      </div>
    </footer>
  )
}
