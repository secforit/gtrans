import { Shield, Clock, Award, MessageCircle } from "lucide-react"

const values = [
  { icon: Shield, title: "Siguranta", description: "Marfurile sunt fixate cu chingi, imobilizate de podeaua masinii." },
  { icon: Clock, title: "Punctualitate", description: "Livrare la timp, conform orarului stabilit." },
  { icon: Award, title: "Experienta", description: "17+ ani de activitate si o echipa de profesionisti." },
  { icon: MessageCircle, title: "Comunicare", description: "Echipa vorbitoare de engleza si italiana." },
]

export function About() {
  return (
    <section id="despre" className="py-24 md:py-32 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="text-sm font-medium text-neutral-400 tracking-widest uppercase mb-4">Despre noi</p>
            <h2 className="text-4xl md:text-5xl font-light text-neutral-900 tracking-tight">
              Partenerul tau<br />
              <span className="font-semibold">de incredere</span>
            </h2>

            <p className="mt-8 text-neutral-500 leading-relaxed">
              Poate va intrebati, ce are de oferit nou o alta companie de expeditie si transport,
              intr-un moment in care piata romaneasca si europeana sunt extrem de dinamice?
            </p>

            <blockquote className="mt-10 border-l-2 border-neutral-900 pl-6">
              <p className="text-neutral-700 italic leading-relaxed">
                &ldquo;Raspunsul si totodata convingerea ca ati decis bine alegand serviciile noastre,
                le veti primi in momentul in care veti solicita firmei noastre un serviciu in materie
                de transport si expeditie de marfa.&rdquo;
              </p>
            </blockquote>

            <div className="mt-12 flex items-center gap-12">
              <div>
                <div className="text-5xl font-light text-neutral-900">17+</div>
                <div className="mt-2 text-sm text-neutral-400">Ani experienta</div>
              </div>
              <div className="h-16 w-px bg-neutral-200" />
              <div>
                <div className="text-5xl font-light text-neutral-900">EU</div>
                <div className="mt-2 text-sm text-neutral-400">Acoperire</div>
              </div>
              <div className="h-16 w-px bg-neutral-200" />
              <div>
                <div className="text-5xl font-light text-neutral-900">24/7</div>
                <div className="mt-2 text-sm text-neutral-400">Suport</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={`bg-white rounded-2xl p-6 ${index === 0 ? 'col-span-2' : ''}`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900">
                  <value.icon className="h-4 w-4 text-white" />
                </div>
                <h3 className="mt-4 font-medium text-neutral-900">{value.title}</h3>
                <p className="mt-2 text-sm text-neutral-500">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
