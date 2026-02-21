'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  CheckCircle2,
  Heart,
  Stethoscope,
  Clock,
  Users,
  Award,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Shield,
  Syringe,
  Microscope,
  Bone,
  PawPrint,
  ChevronRight,
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
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

const services = [
  {
    icon: Shield,
    title: 'Preventive Care',
    description: 'Comprehensive wellness exams, vaccinations, and parasite prevention to keep your pet healthy.',
    items: ['Annual wellness exams', 'Core vaccinations', 'Parasite prevention'],
  },
  {
    icon: Microscope,
    title: 'Diagnostics',
    description: 'Advanced diagnostic imaging and laboratory services for accurate, timely diagnosis.',
    items: ['Digital radiography', 'Ultrasound imaging', 'In-house laboratory'],
  },
  {
    icon: Syringe,
    title: 'Surgery',
    description: 'Board-certified surgical team with modern anesthesia monitoring and post-op care.',
    items: ['Soft tissue surgery', 'Orthopedic procedures', 'Spay & neuter'],
  },
  {
    icon: Bone,
    title: 'Dental Care',
    description: 'Complete dental services including cleanings, extractions, and oral health assessments.',
    items: ['Dental cleanings', 'Tooth extractions', 'Oral radiographs'],
  },
  {
    icon: Stethoscope,
    title: 'Internal Medicine',
    description: 'Specialized care for complex medical conditions with evidence-based treatment plans.',
    items: ['Endocrinology', 'Cardiology consults', 'Chronic disease management'],
  },
  {
    icon: PawPrint,
    title: 'Emergency Care',
    description: 'Round-the-clock emergency services with rapid triage and critical care capabilities.',
    items: ['24/7 availability', 'Critical care unit', 'Trauma stabilization'],
  },
]

export default function Home() {
  const statsReveal = useScrollReveal()
  const servicesReveal = useScrollReveal()
  const aboutReveal = useScrollReveal()
  const ctaReveal = useScrollReveal()

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" fill="currentColor" />
              </div>
              <div>
                <span className="text-lg font-bold text-foreground tracking-tight">Pawsitive Care</span>
                <span className="hidden sm:block text-[11px] text-muted-foreground -mt-1 tracking-wide uppercase">Veterinary Clinic</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-sm text-muted-foreground hover:text-foreground font-medium transition-colors">Services</a>
              <a href="#about" className="text-sm text-muted-foreground hover:text-foreground font-medium transition-colors">About</a>
              <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground font-medium transition-colors">Contact</a>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm">
                Book Appointment
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
                <p className="text-xs font-semibold text-primary uppercase tracking-wider">Now accepting new patients</p>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance leading-[1.1] text-foreground tracking-tight">
                Expert veterinary care your pet deserves
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                Comprehensive medical services delivered with compassion. From preventive wellness to emergency care, our board-certified team is here for your pet.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground group">
                  Schedule a Visit
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary">
                  <Phone className="mr-2 w-4 h-4" />
                  (555) 123-4567
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  AAHA Accredited
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  Fear-Free Certified
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 bg-primary/5 rounded-3xl" />
              <div className="relative rounded-2xl border border-border shadow-lg overflow-hidden min-h-[420px]">
                <Image
                  src="/images/vet-hero.jpg"
                  alt="Veterinarian examining a dog in a modern clinic"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <div className="bg-card/95 backdrop-blur-sm rounded-xl border border-border p-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-xl font-bold text-primary">15+</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Years</p>
                      </div>
                      <div className="text-center border-x border-border">
                        <p className="text-xl font-bold text-primary">12</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Doctors</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-bold text-primary">24/7</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Emergency</p>
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
                <AnimatedCounter end={15} suffix="+" />
              </p>
              <p className="text-primary-foreground/80 text-sm mt-1 font-medium">Years Experience</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary-foreground">
                <AnimatedCounter end={5000} suffix="+" />
              </p>
              <p className="text-primary-foreground/80 text-sm mt-1 font-medium">Pets Treated</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary-foreground">
                <AnimatedCounter end={12} />
              </p>
              <p className="text-primary-foreground/80 text-sm mt-1 font-medium">Veterinarians</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary-foreground">24/7</p>
              <p className="text-primary-foreground/80 text-sm mt-1 font-medium">Emergency Care</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={servicesReveal.ref}
            className={`text-center space-y-3 mb-14 transition-all duration-700 ${servicesReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">What We Offer</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Comprehensive Veterinary Services</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From routine wellness visits to complex surgical procedures, our team delivers exceptional care at every stage of your pet's life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Card
                  key={service.title}
                  className={`p-6 border-border bg-card group hover:shadow-lg hover:border-primary/20 transition-all duration-300 cursor-default ${
                    servicesReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                  style={{ transitionDelay: servicesReveal.isVisible ? `${index * 100}ms` : '0ms' }}
                >
                  <div className="w-11 h-11 bg-primary/10 rounded-lg flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                    <Icon className="w-5.5 h-5.5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-foreground/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-28 bg-secondary/50 border-y border-border">
        <div
          ref={aboutReveal.ref}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${aboutReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="bg-card rounded-2xl border border-border p-10 flex flex-col items-center justify-center min-h-[400px] shadow-sm">
                <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
                  <div className="bg-primary/10 rounded-xl p-6 flex flex-col items-center text-center">
                    <Shield className="w-8 h-8 text-primary mb-2" />
                    <p className="text-xs font-semibold text-foreground">AAHA Accredited</p>
                  </div>
                  <div className="bg-primary/10 rounded-xl p-6 flex flex-col items-center text-center">
                    <Award className="w-8 h-8 text-primary mb-2" />
                    <p className="text-xs font-semibold text-foreground">Board Certified</p>
                  </div>
                  <div className="bg-primary/10 rounded-xl p-6 flex flex-col items-center text-center">
                    <Heart className="w-8 h-8 text-primary mb-2" />
                    <p className="text-xs font-semibold text-foreground">Fear-Free Practice</p>
                  </div>
                  <div className="bg-primary/10 rounded-xl p-6 flex flex-col items-center text-center">
                    <Clock className="w-8 h-8 text-primary mb-2" />
                    <p className="text-xs font-semibold text-foreground">24/7 Emergency</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider">About Our Practice</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Dedicated to excellence in animal healthcare</h2>
              <p className="text-muted-foreground leading-relaxed">
                With over 15 years of dedicated service, Pawsitive Care Veterinary Clinic has been the trusted partner for pet families in our community. Our team of board-certified veterinarians combines clinical expertise with genuine compassion.
              </p>
              <ul className="space-y-3">
                {[
                  'Board-certified veterinarians with specialized training',
                  'State-of-the-art diagnostic and surgical equipment',
                  'Fear-Free certified practice for stress-free visits',
                  'Comprehensive in-house laboratory for rapid results',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/80 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground mt-2 group">
                Meet Our Team
                <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
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
              Schedule your pet's next visit today
            </h2>
            <p className="text-primary-foreground/80 mt-4 max-w-lg mx-auto">
              New patients welcome. Same-day appointments available for urgent care needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 group">
                Book Online
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Phone className="mr-2 w-4 h-4" />
                (555) 123-4567
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
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Heart className="w-4 h-4 text-primary-foreground" fill="currentColor" />
                </div>
                <span className="font-bold text-background">Pawsitive Care</span>
              </div>
              <p className="text-background/60 text-sm leading-relaxed">
                Professional veterinary medicine with a compassionate approach for every patient.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm text-background">Services</h4>
              <ul className="space-y-2.5 text-sm text-background/60">
                <li><a href="#services" className="hover:text-background transition-colors">Preventive Care</a></li>
                <li><a href="#services" className="hover:text-background transition-colors">Diagnostics</a></li>
                <li><a href="#services" className="hover:text-background transition-colors">Surgery</a></li>
                <li><a href="#services" className="hover:text-background transition-colors">Emergency Care</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm text-background">Contact</h4>
              <ul className="space-y-2.5 text-sm text-background/60">
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                  <a href="tel:5551234567" className="hover:text-background transition-colors">(555) 123-4567</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                  <a href="mailto:info@pawsitive.care" className="hover:text-background transition-colors">info@pawsitive.care</a>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                  Mon-Fri 7:00 AM - 7:00 PM
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm text-background">Location</h4>
              <p className="text-sm text-background/60 leading-relaxed flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span>123 Pet Avenue, Veterinary Plaza, Your City, ST 12345</span>
              </p>
            </div>
          </div>
          <div className="border-t border-background/10 pt-8">
            <p className="text-center text-xs text-background/50">
              &copy; 2026 Pawsitive Care Veterinary Clinic. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
