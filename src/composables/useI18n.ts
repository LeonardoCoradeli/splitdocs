import { useI18n } from 'vue-i18n'

export function useAppI18n() {
  const { locale } = useI18n()

  function setLocale(loc: 'pt-BR' | 'en') {
    locale.value = loc
    localStorage.setItem('locale', loc)
  }

  const stored = localStorage.getItem('locale') as 'pt-BR' | 'en' | null
  if (stored) {
    locale.value = stored
  }

  return { locale, setLocale }
}
