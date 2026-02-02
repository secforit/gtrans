import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politica de Cookies | G-TRANS ESPERTO",
  description:
    "Politica de cookies a G-TRANS ESPERTO S.R.L. - informatii despre utilizarea cookie-urilor pe site-ul nostru.",
}

export default function CookiesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-36 pb-24 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Inapoi la pagina principala
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Politica de Cookies
          </h1>
          <p className="text-muted-foreground mb-12">
            Ultima actualizare: {new Date().toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" })}
          </p>

          <div className="prose prose-neutral max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Ce sunt cookie-urile?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookie-urile sunt fisiere text de mici dimensiuni care sunt stocate pe dispozitivul
                dumneavoastra (computer, telefon mobil, tableta) atunci cand vizitati un site web.
                Cookie-urile sunt utilizate pe scara larga pentru a face site-urile web sa functioneze
                mai eficient, precum si pentru a furniza informatii proprietarilor site-ului.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Cum utilizam cookie-urile?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Site-ul nostru, g-trans.ro, operat de S.C. G-TRANS ESPERTO S.R.L., utilizeaza
                urmatoarele tipuri de cookie-uri:
              </p>

              <div className="space-y-4">
                <div className="bg-muted rounded-lg p-5">
                  <h3 className="font-semibold text-foreground mb-2">Cookie-uri strict necesare</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Aceste cookie-uri sunt esentiale pentru functionarea site-ului. Includ cookie-uri
                    care va permit sa navigati pe site si sa utilizati functiile acestuia. Fara aceste
                    cookie-uri, serviciile solicitate nu pot fi furnizate.
                  </p>
                </div>

                <div className="bg-muted rounded-lg p-5">
                  <h3 className="font-semibold text-foreground mb-2">Cookie-uri de performanta (Analytics)</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Utilizam Vercel Analytics pentru a intelege cum interactioneaza vizitatorii cu
                    site-ul nostru. Aceste cookie-uri colecteaza informatii in mod anonim si ne ajuta
                    sa imbunatatim experienta utilizatorilor. Informatiile colectate includ: paginile
                    vizitate, durata vizitei, sursa traficului si tipul dispozitivului.
                  </p>
                </div>

                <div className="bg-muted rounded-lg p-5">
                  <h3 className="font-semibold text-foreground mb-2">Cookie-uri functionale</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Aceste cookie-uri permit site-ului sa retina alegerile pe care le faceti (cum ar fi
                    preferinta pentru consimtamantul cookie-urilor) si sa ofere functii imbunatatite si
                    personalizate.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Cookie-uri utilizate</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Cookie</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Tip</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Durata</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Scop</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border">
                      <td className="py-3 px-4 font-mono text-xs">cookie_consent</td>
                      <td className="py-3 px-4">Necesar</td>
                      <td className="py-3 px-4">365 zile</td>
                      <td className="py-3 px-4">Stocheaza preferinta de consimtamant</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4 font-mono text-xs">va_*</td>
                      <td className="py-3 px-4">Analytics</td>
                      <td className="py-3 px-4">Sesiune</td>
                      <td className="py-3 px-4">Vercel Analytics - masurarea performantei</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Controlul cookie-urilor</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Puteti controla si/sau sterge cookie-urile dupa cum doriti. Puteti sterge toate
                cookie-urile care sunt deja pe dispozitivul dumneavoastra si puteti seta majoritatea
                browserelor sa le impiedice sa fie plasate.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                La prima vizita pe site-ul nostru, vi se va afisa un banner de consimtamant care va
                permite sa acceptati sau sa refuzati cookie-urile non-esentiale. Puteti modifica
                aceste preferinte in orice moment prin stergerea cookie-urilor din browser.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Dezactivarea cookie-urilor in browser</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Majoritatea browserelor web permit un anumit control al cookie-urilor prin setarile
                browserului. Pentru a afla mai multe despre cookie-uri si despre cum sa le gestionati,
                vizitati setarile browserului dumneavoastra:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                <li>Google Chrome - Setari &gt; Confidentialitate si securitate</li>
                <li>Mozilla Firefox - Optiuni &gt; Confidentialitate si securitate</li>
                <li>Safari - Preferinte &gt; Confidentialitate</li>
                <li>Microsoft Edge - Setari &gt; Cookie-uri si permisiuni site</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Modificari ale politicii</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ne rezervam dreptul de a actualiza aceasta politica de cookies in orice moment.
                Orice modificari vor fi publicate pe aceasta pagina cu data actualizarii revizuita.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                Pentru intrebari referitoare la politica noastra de cookies, ne puteti contacta la:
              </p>
              <div className="bg-muted rounded-lg p-5 mt-3">
                <p className="text-sm text-foreground font-semibold">S.C. G-TRANS ESPERTO S.R.L.</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Str. Cetatii Orod, Nr. 48, Loc. Vladimirescu, Jud. Arad, 317405, RO
                </p>
                <p className="text-sm text-muted-foreground">
                  Email:{" "}
                  <a href="mailto:logistica@g-trans.ro" className="text-accent hover:underline">
                    logistica@g-trans.ro
                  </a>
                </p>
                <p className="text-sm text-muted-foreground">
                  Telefon:{" "}
                  <a href="tel:+40742735399" className="text-accent hover:underline">
                    +40 742 735 399
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
