import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Termeni si Conditii | G-TRANS ESPERTO",
  description:
    "Termenii si conditiile generale ale S.C. G-TRANS ESPERTO S.R.L. pentru serviciile de transport si expeditii.",
}

const sections = [
  {
    title: "Generalitati si Definitii",
    paragraphs: [
      "Prin casa de expeditii, in sensul prezentelor conditii generale, se intelege orice intreprinzator, care din ordinul si pe seama unui comitent (client), face sa se transporte, adica sa se organizeze un transport de marfuri, fara sa fie el insusi transportatorul. In organizarea transportului, pe langa transportul propriu-zis, se includ si activitati conexe acestuia, cum ar fi: depozitarea marfii, obligatiile vamale (declaratii s.a.), controlul marfurilor, executarea dispozitiilor privind incasarea sumelor cuvenite comitentului (client).",
      "Clientul este orice persoana juridica si fizica, detinator si/sau care are drept de dispozitie asupra unei cantitati de marfa si solicita efectuarea transportului acesteia, inclusiv operatiuni conexe transportului. Clientul este cel care plateste sau garanteaza plata pretului transportului si al operatiunilor legate de acesta.",
      "Organizarea transportului se face in baza si in conditiile contractului de expeditii, incheiat intre client si casa de expeditii.",
      "Se considera drept contract incheiat si comanda clientului adresata casei de expeditii, urmata de acceptarea acesteia. Comanda si acceptarea pot fi transmise prin posta, telex, fax sau pe cale electronica. Comanda trebuie sa contina elementele necesare care sa permita organizarea si efectuarea transportului, precum si a operatiunilor conexe de catre casa de expeditii.",
      "Casa de expeditii nu este obligata sa verifice exactitatea documentelor puse la dispozitie de client (facturi comerciale, liste specificative etc.), care are responsabilitatea modului de intocmire si a corectitudinii acestora. Clientul este obligat sa transmita in scris casei de expeditii instructiuni precise daca solicita conditii speciale de livrare a marfii. Instructiunile sunt supuse acceptului casei de expeditii. Totusi, acestea se considera acceptate daca, dupa primirea acestora de catre casa de expeditii, s-a trecut la executare.",
      "In toate cazurile in care casa de expeditii este membra USER, prevederile contractului de expeditie sau comanda se considera completate cu prevederile prezentelor conditii generale, care fac parte integranta din contract sau comanda, chiar daca o mentiune expresa in acest sens lipseste.",
      "Partile sunt libere sa convina expres in contractele incheiate si alte clauze, decit cele prevazute in prezentele conditii generale, pe care le pot inlocui, modifica sau exclude dupa caz. Partile care nu sunt membre USER pot conveni prin mentiune expresa aplicarea prezentelor conditii generale in contractele incheiate cu clientii.",
    ],
  },
  {
    title: "Obligatiile Casei de Expeditii",
    paragraphs: [
      "Casa de expeditii va depune diligentele necesare pentru organizarea transportului si efectuarea operatiunilor conexe, potrivit instructiunilor clientului, astfel cum au fost convenite, precum si pentru protejarea pe tot parcursul executarii a intereselor acestuia.",
      "Casa de expeditii trebuie sa fie organizata si sa dispuna de mijloacele necesare executarii misiunii sale. Daca nu s-a convenit altfel, casa de expeditii are dreptul sa-si aleaga in mod liber subexecutantii, precum si modurile de transport si mijloacele folosite.",
      "Sarcina probei privind instructiunile speciale date casei de expeditii incumba clientului. Persoanele intermediare sau subexecutantii la care recurge casa de expeditii pentru executarea obligatiilor sale sunt considerate acceptate de client.",
      "In cazurile in care casa de expeditii, in calitate de comisionar, incheie cu carausi contracte de transport, in nume propriu dar pe seama clientilor, pentru raspunderea fata de acestia, pentru daunele produse in executarea transportului, pentru care este angajata raspunderea carausului, casa de expeditii nu va putea fi tinuta responsabila, fata de client, la mai mult decit datoreaza caraus.",
      "Contractelor de transport incheiate de casele de expeditii cu carausi, le sunt aplicabile prevederile Conventiei referitoare la contractul de transport international de marfuri pe sosele CMR, semnata la Geneva, Elvetia, la 19 mai 1956 la care Romania a aderat prin Decretul nr. 451/ noiembrie 1972, publicat in Buletinul Oficial, Partea I din 6 decembrie 1972 si ale Legii nr. 102/09 mai 2006 pentru aprobarea Ordonantei de urgenta a Guvernului nr. 109/2005, privind transporturile rutiere, publicata in Monitorul oficial nr. 398/09 mai 2006 (art 53/5 si urmatorii).",
    ],
  },
  {
    title: "Obligatiile Clientului",
    paragraphs: [
      "Marfa trebuie sa fie predata ambalata, marcata, etichetata, astfel incat sa reziste operatiunilor de transport si/sau celor conexe si sa poata fi livrata destinatarului potrivit contractului si conform uzantelor.",
      "Casa de expeditii nu raspunde pentru daunele ce ar decurge din absenta, insuficienta sau defectuozitatea ambalajului, marcarii si/sau etichetarii marfii, precum si din lipsa unor informatii corespunzatoare cu privire la natura sau insusirile particulare ale marfii.",
      "In cazul constatarii, la destinatie, de pierderi, avarii sau orice pagube produse marfii, inclusiv cele produse de intarzierea transporturilor, destinatarul sau cei care receptioneaza marfa au obligatia sa procedeze la constatarea daunelor si la indeplinirea formalitatilor ce se impun, inclusiv la formularea de rezerve legale fata de transportator, precum si sa ia alte masuri care sa asigure conservarea dreptului la reclamatii si actiuni in vederea recuperarii daunelor.",
      "In cazul in care casa de expeditii angajeaza in contul clientului operatiuni vamale, clientul este cel care garanteaza comisionarului vamal plata taxelor de vama si amenzile ce s-ar datora, determinate de furnizarea unor instructiuni sau documente eronate.",
      "In caz de refuz al marfii de catre destinatar sau in caz de absenta a acestuia, indiferent de motiv, clientul este obligat sa suporte cheltuielile initiale, cat si cele suplimentare, efectuate sau angajate de casa de expeditii.",
    ],
  },
  {
    title: "Responsabilitatea Casei de Expeditii",
    paragraphs: [
      "Casa de expeditii, oricare ar fi calitatea sa de intermediar (concesionar, mandatar) raspunde numai pentru daunele produse prin greselile proprii, ce pot fi imputate atat ei, cat si prepusilor sai.",
      "Casa de expeditii nu raspunde pentru faptele tertilor, cum ar fi subexecutantii sai (transportator, intermediar etc.) cu exceptia cazurilor in care o greseala in alegerea acestora ar putea sa ii fie imputata. In acest din urma caz, raspunderea casei de expeditii nu poate depasi limitele raspunderii tertilor.",
      "Totusi, in cazurile in care responsabilitatea casei de expeditii este angajata in conditiile aliniatului precedent, aceasta este strict limitata.",
      "Casa de expeditii nu raspunde pentru pagubele indirecte, indiferent de cauza care le-a generat.",
      "Daca un termen de executare a transportului nu a fost cerut expres de client si acceptat de casa de expeditii, aceasta nu garanteaza o data determinata de sosire la destinatie si nu datoreaza nici o despagubire pentru intarzierea transportului. Chiar si in cazul unui termen expres convenit, clientul va putea solicita despagubiri numai dupa o notificare adresata in acest scop casei de expeditii.",
      "Daca valoarea marfii excede limitele responsabilitatii casei de expeditii, clientul este liber sa aleaga una din urmatoarele masuri:",
    ],
    list: [
      "Sa suporte, in caz de daune, riscul rezultat din diferenta dintre responsabilitatea casei de expeditii si valoarea marfii.",
      "Sa faca, la incheierea contractului, o declaratie de valoare a marfii care, daca va fi acceptata de casa de expeditii, va ridica limita responsabilitatii acesteia pana la valoarea declarata; in asemenea situatii se vor datora diferentele de pret corespunzatoare.",
      "Sa dea instructiuni casei de expeditii pentru incheierea in contul sau (al clientului) a unei asigurari care sa acopere total sau partial riscul, indicand riscul si valoarea asigurata. Aceste instructiuni trebuie date pentru fiecare expeditie in parte.",
    ],
  },
  {
    title: "Transporturi Speciale",
    paragraphs: [
      "In cazul unor transporturi speciale (frigo, marfuri periculoase), casa de expeditii va pune la dispozitia clientului informatiile necesare executarii transportului, variantele de transport, pret, asigurari etc., pe baza carora clientul sa poata conveni, in cunostinta de cauza, contractul de expeditie.",
    ],
  },
  {
    title: "Reclamatii",
    paragraphs: [
      "Reclamatiile impotriva casei de expeditii pot fi formulate in termen de 6 (sase) luni.",
      "Termenul de 6 (sase) luni incepe din ziua livrarii marfii la destinatie sau, daca livrarea nu a avut loc, din ziua incheierii contractului de expeditie.",
    ],
  },
  {
    title: "Dreptul de Gaj si Dreptul de Retentie al Casei de Expeditii",
    paragraphs: [
      "Casa de expeditii are, pentru toate creantele sale actuale sau anterioare rezultate din prestatii executate pentru client, un drept de gaj si retentie asupra marfurilor si asupra oricaror alte valori apartinand acestuia, care se gasesc in posesia sa.",
    ],
  },
  {
    title: "Clauza Arbitrala",
    paragraphs: [
      "In lipsa unor prevederi contrare convenite, litigiile dintre client si casa de expeditii sau dintre aceasta si partile indreptatite legal, ramase nesolutionate pe cale amiabila, sunt de competenta organelor judecatoresti din localitatea unde isi are sediul casa de expeditii.",
      "Raporturile juridice dintre casele de expeditii si clienti, generate din aplicarea acestor conditii generale, sunt reglementate de dreptul roman.",
    ],
  },
]

export default function TermeniPage() {
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
            Termeni si Conditii Generale
          </h1>
          <p className="text-muted-foreground mb-12">
            Conditii generale aplicabile serviciilor de transport si expeditii
            oferite de S.C. G-TRANS ESPERTO S.R.L.
          </p>

          <div className="space-y-10">
            {sections.map((section, index) => (
              <section key={index}>
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-start gap-3">
                  <span className="bg-accent text-accent-foreground text-sm font-bold rounded-md px-2.5 py-1 shrink-0">
                    {index + 1}
                  </span>
                  {section.title}
                </h2>
                <div className="space-y-3 pl-10">
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-muted-foreground leading-relaxed text-sm"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.list && (
                    <ul className="list-disc list-inside space-y-2 ml-2">
                      {section.list.map((item, lIndex) => (
                        <li
                          key={lIndex}
                          className="text-muted-foreground leading-relaxed text-sm"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-16 bg-muted rounded-lg p-6">
            <p className="text-sm text-foreground font-semibold">S.C. G-TRANS ESPERTO S.R.L.</p>
            <p className="text-sm text-muted-foreground mt-1">
              CUI: RO23120545 | J02/110/2008
            </p>
            <p className="text-sm text-muted-foreground">
              Str. Cetatii Orod, Nr. 48, Loc. Vladimirescu, Jud. Arad, 317405, RO
            </p>
            <p className="text-sm text-muted-foreground">
              Email:{" "}
              <a href="mailto:logistica@g-trans.ro" className="text-accent hover:underline">
                logistica@g-trans.ro
              </a>{" "}
              | Telefon:{" "}
              <a href="tel:+40742735399" className="text-accent hover:underline">
                +40 742 735 399
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
