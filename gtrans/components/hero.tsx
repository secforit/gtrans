import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-16">
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <Image
        src="/images/hero-truck.png"
        alt="G-Trans Esperto truck"
        fill
        className="object-cover opacity-60"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-12 bg-white/30" />
            <span className="text-sm font-medium text-white/60 tracking-widest uppercase">Din 2008</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.1]">
            Transport
            <br />
            <span className="font-semibold">si logistica</span>
            <br />
            <span className="text-white/40">in Europa</span>
          </h1>

          <p className="mt-8 text-lg text-white/50 max-w-lg leading-relaxed">
            Siguranta, punctualitate si incredere pe drumurile Europei.
            Partenerul tau de incredere pentru transport rutier de marfuri.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild className="bg-white text-black hover:bg-white/90 rounded-full px-8 h-12 text-sm font-medium">
              <Link href="#contact">
                Solicita oferta
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 h-12 text-sm font-medium bg-transparent">
              <Link href="#servicii">Descopera serviciile</Link>
            </Button>
          </div>
        </div>

        <div className="absolute bottom-12 right-8 lg:right-16 hidden lg:flex flex-col items-end gap-8">
          <div className="text-right">
            <div className="text-5xl font-light text-white">17+</div>
            <div className="text-sm text-white/40 mt-1">ani experienta</div>
          </div>
          <div className="text-right">
            <div className="text-5xl font-light text-white">EU</div>
            <div className="text-sm text-white/40 mt-1">acoperire</div>
          </div>
        </div>
      </div>
    </section>
  )
}
