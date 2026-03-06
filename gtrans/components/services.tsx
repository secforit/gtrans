import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

const services = [
  {
    image: "/images/groupage-van.jpg",
    number: "01",
    title: "Transport grupaj",
    description: "Dube de 3,5 T pentru transporturi rapide de marfa usoara cu volum mic. Monitorizare GPS si asigurare CMR completa.",
  },
  {
    image: "/images/exclusive-truck.jpg",
    number: "02",
    title: "Transport exclusivitate",
    description: "Servicii de transport in regim de exclusivitate pentru marfuri generale, frigorifice, agabaritice sau periculoase (ADR).",
  },
  {
    image: "/images/textile-transport.jpg",
    number: "03",
    title: "Transport textile",
    description: "Camionetele noastre sunt echipate cu faguri pe pereti, astfel incat hainele pot fi incarcate in siguranta pe umerase.",
  },
]

export function Services() {
  return (
    <section id="servicii" className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-sm font-medium text-neutral-400 tracking-widest uppercase mb-4">Servicii</p>
            <h2 className="text-4xl md:text-5xl font-light text-neutral-900 tracking-tight">
              Ce putem face<br />
              <span className="font-semibold">pentru tine</span>
            </h2>
          </div>
          <p className="text-neutral-500 max-w-sm md:text-right">
            Solutii de transport adaptate nevoilor tale, cu aceeasi dedicare pentru calitate si siguranta.
          </p>
        </div>

        <div className="grid gap-px bg-neutral-200 md:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="group relative bg-white hover:bg-neutral-50 transition-colors">
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-neutral-900/20 group-hover:bg-neutral-900/10 transition-colors" />
                <span className="absolute top-4 left-4 text-sm text-white/70 font-medium">{service.number}</span>
              </div>

              <div className="p-8 md:p-10">
                <h3 className="text-xl font-medium text-neutral-900 mb-3">{service.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed mb-8">{service.description}</p>

                <Link href="#contact" className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 hover:text-neutral-600 transition-colors">
                  Solicita oferta
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
