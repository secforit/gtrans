'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function switchLocale(next: string) {
    router.replace(pathname, { locale: next })
  }

  return (
    <div className="flex items-center gap-0.5 border border-border rounded-md overflow-hidden text-xs font-semibold">
      <button
        onClick={() => switchLocale('ro')}
        className={`px-2 py-1 transition-colors ${
          locale === 'ro'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
        }`}
        aria-label="Română"
      >
        RO
      </button>
      <button
        onClick={() => switchLocale('en')}
        className={`px-2 py-1 transition-colors ${
          locale === 'en'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  )
}
