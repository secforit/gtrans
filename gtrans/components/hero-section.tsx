import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Clock, Award, MapPin } from "lucide-react"

export function HeroSection() {
  return (
    <section id="acasa" className="relative min-h-screen flex items-center pt-32 md:pt-28">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-truck.png"
          alt="Transport G-Trans"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/85" />
      </div>

      <div className="container mx-auto px-6 relative z-10 py-16">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="h-4 w-4 text-accent" />
            <span className="text-primary-foreground/80 text-sm font-medium tracking-wide">
              Transport rutier in Romania si Europa
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight text-balance">
            Solutii complete de transport si logistica
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl leading-relaxed">
            Din 2008, oferim servicii profesionale de transport rutier de marfuri. 
            Siguranta, punctualitate si incredere pe drumurile Europei.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8">
              <Link href="#contact">
                Solicita oferta gratuita
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent font-medium">
              <Link href="#servicii">Descopera serviciile</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-primary-foreground text-lg">Siguranta</p>
                <p className="text-sm text-primary-foreground/70">Asigurare CMR completa</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-primary-foreground text-lg">Punctualitate</p>
                <p className="text-sm text-primary-foreground/70">Livrare la timp garantata</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20">
                <Award className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-primary-foreground text-lg">Experienta</p>
                <p className="text-sm text-primary-foreground/70">17+ ani in domeniu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  )
}
