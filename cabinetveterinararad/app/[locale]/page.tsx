'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { LanguageSwitcher } from '@/components/language-switcher'
import {
  CheckCircle2,
  Heart,
  Stethoscope,
  Clock,
  Award,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Syringe,
  PawPrint,
  ChevronRight,
  Facebook,
  FlaskConical,
  Zap,
  Scan,
  Pill,
  UtensilsCrossed,
  ShoppingBag,
} from 'lucide-react'

function AnimatedCounter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let start = 0
          const increment = end / (duration / 16)
          const timer = setInterval(() => {
            start += increment
            if (start >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
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

const slugOrder = ['consultatii', 'chirurgie', 'laser', 'laborator', 'radiologie', 'internare', 'farmacie', 'hrana', 'cosmetica', 'accesorii']

const galleryImages = [
  '/images/clinic/gallery1.jpeg',
  '/images/clinic/gallery2.jpeg',
  '/images/clinic/gallery3.jpeg',
  '/images/clinic/gallery4.jpeg',
  '/images/clinic/gallery5.jpeg',
  '/images/clinic/gallery6.jpeg',
]

function GallerySection() {
  const t = useTranslations('gallery')
  const reveal = useScrollReveal()
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={reveal.ref}
          className={`text-center space-y-3 mb-14 transition-all duration-700 ${reveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">{t('label')}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">{t('title')}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {galleryImages.map((src, index) => (
            <div
              key={src}
              className={`relative overflow-hidden rounded-xl aspect-square transition-all duration-500 ${
                reveal.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{ transitionDelay: reveal.isVisible ? `${index * 60}ms` : '0ms' }}
            >
              <Image
                src={src}
                alt={`${t('alt')} ${index + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const tNav = useTranslations('nav')
  const tHero = useTranslations('hero')
  const tStats = useTranslations('stats')
  const tServices = useTranslations('services')
  const tAbout = useTranslations('about')
  const tCta = useTranslations('cta')
  const tFooter = useTranslations('footer')
  const tData = useTranslations('servicesData')

  const statsReveal = useScrollReveal()
  const servicesReveal = useScrollReveal()
  const aboutReveal = useScrollReveal()
  const ctaReveal = useScrollReveal()

  const services = slugOrder.map((slug) => ({
    slug,
    icon: serviceIcons[slug],
    title: tData(`${slug}.title`),
    description: tData(`${slug}.description`),
    items: tData.raw(`${slug}.items`) as string[],
  }))

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image src="/images/logo/logo.png" alt="Canis Vet" fill className="object-contain" />
              </div>
              <div>
                <span className="text-lg font-bold text-foreground tracking-tight">Canis Vet</span>
                <span className="hidden sm:block text-[11px] text-muted-foreground -mt-1 tracking-wide uppercase">{tNav('subtitle')}</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#servicii" className="text-sm text-muted-foreground hover:text-foreground font-medium transition-colors">{tNav('services')}</a>
              <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground font-medium transition-colors">{tNav('contact')}</a>
              <LanguageSwitcher />
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm">
                <a href="tel:+40745534944">{tNav('book')}</a>
              </Button>
            </div>
            {/* Mobile */}
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

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <p className="text-xs font-semibold text-primary uppercase tracking-wider">{tHero('badge')}</p>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance leading-[1.1] text-foreground tracking-tight">
                {tHero('title')}
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                {tHero('description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground group">
                  <a href="tel:+40745534944">
                    {tHero('cta1')}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary">
                  <a href="tel:+40745534944">
                    <Phone className="mr-2 w-4 h-4" />
                    {tHero('cta2')}
                  </a>
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  {tHero('feat1')}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  {tHero('feat2')}
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 bg-primary/5 rounded-3xl" />
              <div className="relative rounded-2xl border border-border shadow-lg overflow-hidden min-h-[420px]">
                <Image
                  src="/images/clinic/hero.jpeg"
                  alt="Clinica Canis Vet Arad"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <div className="bg-card/95 backdrop-blur-sm rounded-xl border border-border p-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-xl font-bold text-primary">10+</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{tHero('statYears')}</p>
                      </div>
                      <div className="text-center border-x border-border">
                        <p className="text-xl font-bold text-primary">4</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{tHero('statDoctors')}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-bold text-primary">24/7</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{tHero('statEmergency')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section
        ref={statsReveal.ref}
        className={`py-12 bg-primary transition-all duration-700 ${statsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary-foreground">
                <AnimatedCounter end={10} suffix="+" />
              </p>
              <p className="text-primary-foreground/80 text-sm mt-1 font-medium">{tStats('years')}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary-foreground">
                <AnimatedCounter end={5000} suffix="+" />
              </p>
              <p className="text-primary-foreground/80 text-sm mt-1 font-medium">{tStats('animals')}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary-foreground">
                <AnimatedCounter end={4} />
              </p>
              <p className="text-primary-foreground/80 text-sm mt-1 font-medium">{tStats('doctors')}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary-foreground">24/7</p>
              <p className="text-primary-foreground/80 text-sm mt-1 font-medium">{tStats('emergency')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicii" className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={servicesReveal.ref}
            className={`text-center space-y-3 mb-14 transition-all duration-700 ${servicesReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">{tServices('label')}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">{tServices('title')}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{tServices('description')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:[&>*:last-child]:col-start-2">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Link key={service.slug} href={`/servicii/${service.slug}`}>
                  <Card
                    className={`p-6 border-border bg-card group hover:shadow-lg hover:border-primary/20 transition-all duration-300 h-full flex flex-col ${
                      servicesReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                    }`}
                    style={{ transitionDelay: servicesReveal.isVisible ? `${index * 80}ms` : '0ms' }}
                  >
                    <div className="w-11 h-11 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">{service.description}</p>
                    <ul className="space-y-1.5 mb-4">
                      {service.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-foreground/70">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                      {tServices('details')} <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <GallerySection />

      {/* About Section */}
      <section id="despre" className="py-20 md:py-28 bg-background">
        <div
          ref={aboutReveal.ref}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${aboutReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="bg-card rounded-2xl border border-border p-10 flex flex-col items-center justify-center min-h-[400px] shadow-sm">
                <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
                  <div className="bg-primary/10 rounded-xl p-6 flex flex-col items-center text-center">
                    <Stethoscope className="w-8 h-8 text-primary mb-2" />
                    <p className="text-xs font-semibold text-foreground">{tAbout('box1')}</p>
                  </div>
                  <div className="bg-primary/10 rounded-xl p-6 flex flex-col items-center text-center">
                    <Award className="w-8 h-8 text-primary mb-2" />
                    <p className="text-xs font-semibold text-foreground">{tAbout('box2')}</p>
                  </div>
                  <div className="bg-primary/10 rounded-xl p-6 flex flex-col items-center text-center">
                    <Heart className="w-8 h-8 text-primary mb-2" />
                    <p className="text-xs font-semibold text-foreground">{tAbout('box3')}</p>
                  </div>
                  <div className="bg-primary/10 rounded-xl p-6 flex flex-col items-center text-center">
                    <Clock className="w-8 h-8 text-primary mb-2" />
                    <p className="text-xs font-semibold text-foreground">{tAbout('box4')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider">{tAbout('label')}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">{tAbout('title')}</h2>
              <p className="text-muted-foreground leading-relaxed">{tAbout('p1')}</p>
              <p className="text-muted-foreground leading-relaxed">{tAbout('p2')}</p>
              <ul className="space-y-3">
                {(['item1', 'item2', 'item3', 'item4'] as const).map((key) => (
                  <li key={key} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/80 text-sm">{tAbout(key)}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground mt-2 group">
                <a href="tel:+40745534944">
                  {tCta('call')}
                  <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-background">
        <div
          ref={ctaReveal.ref}
          className={`max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700 ${ctaReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="bg-primary rounded-2xl p-10 md:p-14">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground tracking-tight text-balance">
              {tCta('title')}
            </h2>
            <p className="text-primary-foreground/80 mt-4 max-w-lg mx-auto">{tCta('description')}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 group">
                <a href="tel:+40745534944">
                  {tCta('call')}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <a href="mailto:contact@cabinetveterinararad.ro">
                  <Mail className="mr-2 w-4 h-4" />
                  {tCta('email')}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-foreground text-background py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="relative w-9 h-9">
                  <Image src="/images/logo/logo.png" alt="Canis Vet" fill className="object-contain" />
                </div>
                <div>
                  <span className="font-bold text-background block">Canis Vet</span>
                  <span className="text-[10px] text-background/50 uppercase tracking-wide">{tNav('subtitle')}</span>
                </div>
              </div>
              <p className="text-background/60 text-sm leading-relaxed whitespace-pre-line">
                {tFooter('description')}
              </p>
              <a
                href="https://www.facebook.com/cabinetveterinararadro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm text-background/60 hover:text-background transition-colors"
              >
                <Facebook className="w-4 h-4" />
                {tFooter('facebook')}
              </a>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm text-background">{tFooter('services')}</h4>
              <ul className="space-y-2.5 text-sm text-background/60">
                {slugOrder.map((slug) => (
                  <li key={slug}>
                    <a href="#servicii" className="hover:text-background transition-colors">
                      {tData(`${slug}.title`)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm text-background">{tFooter('contact')}</h4>
              <ul className="space-y-2.5 text-sm text-background/60">
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                  <a href="tel:+40745534944" className="hover:text-background transition-colors">0745 534 944</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                  <a href="mailto:contact@cabinetveterinararad.ro" className="hover:text-background transition-colors">contact@cabinetveterinararad.ro</a>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <span className="whitespace-pre-line">{tFooter('schedule.label')}</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm text-background">{tFooter('location')}</h4>
              <p className="text-sm text-background/60 leading-relaxed flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span>Str. Făt Frumos, nr. 5<br />Arad, România</span>
              </p>
              <a
                href="https://www.google.com/maps?um=1&fb=1&gl=ro&sa=X&geocode=KZke_EENmEVHMTG3MwPCzg2O&daddr=Strada+F%C4%83t+Frumos+5,+Arad+310364"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-3 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
              >
                {tFooter('mapLink')}
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
          <div className="border-t border-background/10 pt-8">
            <p className="text-center text-xs text-background/50">
              &copy; {new Date().getFullYear()} Dr. Raul Tatar | Clinica Canis Vet. {tFooter('copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
