import Image from "next/image"
import { Check } from "lucide-react"

const features = [
  "Distributia catre clientii finali",
  "Depozitare si conditionare",
  "Transport si manipulare profesionala",
  "Colectarea de la furnizori",
  "Planificarea fluxului de marfuri",
]

export function Logistics() {
  return (
    <section id="logistica" className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden">
              <Image
                src="/images/logistics-warehouse.jpg"
                alt="Logistica G-Trans Esperto"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-neutral-900/10" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-neutral-900 rounded-2xl p-6 text-white">
              <div className="text-3xl font-light">100%</div>
              <div className="text-sm text-white/60 mt-1">Siguranta marfii</div>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-neutral-400 tracking-widest uppercase mb-4">Logistica</p>
            <h2 className="text-4xl md:text-5xl font-light text-neutral-900 tracking-tight">
              Solutii integrate<br />
              <span className="font-semibold">de logistica</span>
            </h2>

            <p className="mt-8 text-neutral-500 leading-relaxed">
              Oferim solutii complete si moderne de logistica, adaptate necesitatilor fiecarui client.
              Dispunem de resurse proprii si colaboram cu parteneri de incredere.
            </p>

            <div className="mt-10 space-y-4">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-neutral-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
