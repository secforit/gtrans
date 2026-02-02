import Image from "next/image"
import { Check, Truck, Users } from "lucide-react"

const logistics = [
  "Planificarea si organizarea fluxului de marfuri",
  "Colectarea de la furnizori",
  "Transport si manipulare profesionala",
  "Depozitare si conditionare",
  "Distributia catre clientii finali",
]

const fleet = [
  {
    icon: Truck,
    title: "Parc propriu",
    description: "Dube de 3,5 T, folosite in special pentru transporturi rapide de marfa usoara cu volum mic. Echipate modern si intretinute constant.",
  },
  {
    icon: Users,
    title: "Parc sub-contractori",
    description: "Colaboram cu parteneri de incredere verificati pentru a va oferi capacitatea si flexibilitatea de care aveti nevoie.",
  },
]

export function LogisticsSection() {
  return (
    <section id="logistica" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative">
            <div className="relative h-[450px] lg:h-[550px] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/logistics-warehouse.jpg"
                alt="Logistica G-Trans"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground p-6 rounded-lg shadow-xl hidden md:block">
              <p className="text-4xl font-bold">17+</p>
              <p className="text-sm font-medium">Ani de experienta</p>
            </div>
          </div>
          
          <div>
            <p className="text-accent font-semibold mb-3 tracking-wide uppercase text-sm">
              Logistica completa
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Solutii integrate de logistica
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Oferim solutii complete si moderne de logistica, adaptate necesitatilor fiecarui client. 
              Serviciile de logistica pe care le punem la dispozitia clientilor nostri includ:
            </p>
            <ul className="space-y-4">
              {logistics.map((item, index) => (
                <li key={index} className="flex items-center gap-4">
                  <div className="p-1.5 bg-accent/20 rounded-full">
                    <Check className="h-4 w-4 text-accent" />
                  </div>
                  <span className="text-foreground font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-primary rounded-2xl p-8 md:p-12">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
              Parcul nostru de masini
            </h3>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto">
              Dispunem de resurse proprii si colaboram cu parteneri de incredere pentru a acoperi orice cerinta
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {fleet.map((item, index) => (
              <div key={index} className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20">
                <div className="flex gap-5">
                  <div className="p-3 bg-accent rounded-lg h-fit">
                    <item.icon className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-primary-foreground mb-2">{item.title}</h4>
                    <p className="text-primary-foreground/70 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
