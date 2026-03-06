import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Truck, Package, Shirt, ArrowRight } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: Package,
    title: "Transport in regim de grupaj",
    description: "Oferim transport in grupaj cu camionete de 3,5 tone (carosate sau cu prelata), camioane si tiruri. Solutia ideala pentru marfa usoara sau volum mic, cu Monitorizare GPS si asigurare CMR.",
    image: "/images/groupage-van.jpg",
    features: ["Asigurare CMR completa", "Monitorizare GPS in timp real", "Livrare rapida si sigura"],
  },
  {
    icon: Truck,
    title: "Transport in regim de exclusivitate",
    description: "Oferim servicii de transport in regim de exclusivitate pentru marfurile generale, frigorifice, agabaritice, periculoase (ADR) pentru orice tip de marfa.",
    image: "/images/exclusive-truck.jpg",
    features: ["Siguranta pe toata durata transportului", "Incarcare si descarcare conform orelor stabilite", "Transport personalizat"],
  },
  {
    icon: Shirt,
    title: "Transport textile pe umerase",
    description: "Camionetele cu care transportam textile pe umerase sunt echipate cu faguri pe pereti, astfel incat hainele pot fi incarcate in siguranta.",
    image: "/images/textile-transport.jpg",
    features: ["Barele sunt facute la comanda", "Sisteme fixe de prindere a umeraselor", "Protectie completa a textilelor"],
  },
]

export function ServicesSection() {
  return (
    <section id="servicii" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <p className="text-accent font-semibold mb-3 tracking-wide uppercase text-sm">
            Serviciile noastre
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            Solutii de transport adaptate nevoilor tale
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Oferim o gama completa de servicii de transport, de la grupaj la exclusivitate, 
            toate cu aceeasi dedicare pentru calitate si siguranta.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group overflow-hidden border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl bg-card">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                <div className="absolute bottom-4 left-4 p-3 bg-card rounded-lg shadow-lg">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                  {service.description}
                </p>
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-foreground">
                      <div className="p-0.5 bg-accent/20 rounded-full mt-0.5">
                        <Check className="h-3.5 w-3.5 text-accent" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link 
                  href="#contact" 
                  className="inline-flex items-center text-sm font-semibold text-primary hover:text-accent transition-colors group/link"
                >
                  Solicita oferta
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
