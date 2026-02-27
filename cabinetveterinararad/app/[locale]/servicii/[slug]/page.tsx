import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/language-switcher'
import {
  CheckCircle2,
  Phone,
  Mail,
  ArrowLeft,
  Stethoscope,
  Syringe,
  Zap,
  FlaskConical,
  Heart,
  PawPrint,
  ChevronRight,
  Scan,
  Pill,
  UtensilsCrossed,
  ShoppingBag,
} from 'lucide-react'
import { routing } from '@/i18n/routing'

const slugOrder = ['consultatii', 'chirurgie', 'laser', 'laborator', 'radiologie', 'internare', 'farmacie', 'hrana', 'cosmetica', 'accesorii']

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  consultatii: Stethoscope,
  chirurgie: Syringe,
  laser: Zap,
  laborator: FlaskConical,
  radiologie: Scan,
  internare: Heart,
  farmacie: Pill,
  hrana: UtensilsCrossed,
  cosmetica: PawPrint,
  accesorii: ShoppingBag,
}

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = []
  for (const locale of routing.locales) {
    for (const slug of slugOrder) {
      params.push({ locale, slug })
    }
  }
  return params
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params

  if (!slugOrder.includes(slug)) notFound()

  const t = await getTranslations({ locale, namespace: 'servicesData' })
  const tPage = await getTranslations({ locale, namespace: 'servicePage' })
  const tNav = await getTranslations({ locale, namespace: 'nav' })
  const tData = await getTranslations({ locale, namespace: 'servicesData' })

  const title = t(`${slug}.title`)
  const subtitle = t(`${slug}.subtitle`)
  const description = t(`${slug}.description`)
  const details = t.raw(`${slug}.details`) as { heading: string; text: string }[]
  const features = t.raw(`${slug}.features`) as string[]

  const Icon = iconMap[slug]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image src="/images/logo/logo.png" alt="Canis Vet" fill className="object-contain" />
              </div>
              <div>
                <span className="text-lg font-bold text-foreground tracking-tight">Canis Vet</span>
                <span className="hidden sm:block text-[11px] text-muted-foreground -mt-1 tracking-wide uppercase">{tNav('subtitle')}</span>
              </div>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/#servicii" className="text-sm text-muted-foreground hover:text-foreground font-medium transition-colors">{tNav('services')}</Link>
              <Link href="/#contact" className="text-sm text-muted-foreground hover:text-foreground font-medium transition-colors">{tNav('contact')}</Link>
              <LanguageSwitcher />
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm">
                <a href="tel:+40745534944">{tNav('book')}</a>
              </Button>
            </div>
            <div className="md:hidden flex items-center gap-2">
              <LanguageSwitcher />
              <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <a href="tel:+40745534944">
                  <Phone className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="border-b border-border bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">{tPage('home')}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/#servicii" className="hover:text-foreground transition-colors">{tPage('services')}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">{title}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/[0.04] to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
              <Icon className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">{title}</h1>
            <p className="text-xl text-primary font-medium mb-6">{subtitle}</p>
            <p className="text-muted-foreground leading-relaxed text-lg">{description}</p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground group">
                <a href="tel:+40745534944">
                  <Phone className="mr-2 w-4 h-4" />
                  0745 534 944
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="mailto:contact@cabinetveterinararad.ro">
                  <Mail className="mr-2 w-4 h-4" />
                  contact@cabinetveterinararad.ro
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-2xl font-bold text-foreground">{tPage('details')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {details.map((detail) => (
                  <div key={detail.heading} className="bg-card border border-border rounded-xl p-6">
                    <h3 className="font-semibold text-foreground mb-2">{detail.heading}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{detail.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 sticky top-24">
                <h3 className="font-semibold text-foreground mb-4">{tPage('includes')}</h3>
                <ul className="space-y-3">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-primary/10 space-y-3">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{tPage('schedule')}</p>
                  <p className="text-sm text-foreground/80">{tPage('scheduleWeekdays')}</p>
                  <p className="text-sm text-foreground/80">{tPage('scheduleSaturday')}</p>
                  <p className="text-sm text-foreground/80">{tPage('scheduleSunday')}</p>
                  <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-2">
                    <a href="tel:+40745534944">{tPage('book')}</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="py-16 bg-secondary/50 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-foreground mb-6">{tPage('otherServices')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {slugOrder
              .filter((s) => s !== slug)
              .map((s) => {
                const SIcon = iconMap[s]
                return (
                  <Link
                    key={s}
                    href={`/servicii/${s}`}
                    className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 hover:shadow-md transition-all duration-200 group"
                  >
                    <SIcon className="w-5 h-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium text-foreground leading-tight">{tData(`${s}.title`)}</p>
                  </Link>
                )
              })}
          </div>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {tPage('back')}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="relative w-8 h-8">
              <Image src="/images/logo/logo.png" alt="Canis Vet" fill className="object-contain" />
            </div>
            <span className="font-bold text-background">Canis Vet</span>
          </div>
          <p className="text-xs text-background/50 text-center">
            &copy; {new Date().getFullYear()} Dr. Raul Tatar | Clinica Canis Vet. Toate drepturile rezervate.
          </p>
          <a href="tel:+40745534944" className="text-sm text-background/70 hover:text-background transition-colors">
            0745 534 944
          </a>
        </div>
      </footer>
    </div>
  )
}
