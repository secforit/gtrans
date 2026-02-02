import Image from "next/image"
import { Shield, Clock, Award, Globe } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Siguranta",
    description: "Marfurile incarcate sunt fixate cu chingi, astfel incat acestea sa fie imobilizate de podeaua masinii.",
  },
  {
    icon: Clock,
    title: "Punctualitate",
    description: "Marfurile sunt livrate la timp si in siguranta, conform orarului de lucru stabilit.",
  },
  {
    icon: Award,
    title: "Experienta",
    description: "Ne bazam pe experienta dobandita in anii de activitate si pe echipa noastra de oameni talentati.",
  },
  {
    icon: Globe,
    title: "Comunicare",
    description: "Echipa noastra este vorbitoare de limba engleza si italiana pentru o comunicare eficienta.",
  },
]

const stats = [
  { value: "17+", label: "Ani experienta" },
  { value: "100%", label: "Siguranta marfii" },
  { value: "24/7", label: "Suport clienti" },
  { value: "EU", label: "Acoperire Europa" },
]

export function AboutSection() {
  return (
    <section id="despre" className="py-24 md:py-32 bg-muted">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-accent font-semibold mb-3 tracking-wide uppercase text-sm">
              Despre G-Trans Esperto
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Partenerul tau de incredere in transport
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Poate va intrebati, ce are de oferit nou o alta companie de expeditie si transport, 
              intr-un moment in care piata romaneasca si europeana sunt extrem de dinamice, 
              iar concurenta este cel putin acerba in acest domeniu?
            </p>
            <div className="bg-card border-l-4 border-accent p-6 rounded-r-lg mb-8">
              <p className="text-foreground italic leading-relaxed">
                &ldquo;Raspunsul si totodata convingerea ca ati decis bine alegand serviciile noastre, 
                le veti primi in momentul in care veti solicita firmei noastre un serviciu in materie 
                de transport, expeditie de marfa si - nu numai!&rdquo;
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-lg border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg flex gap-5"
              >
                <div className="p-3 bg-primary/10 rounded-lg h-fit">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
