import { ref, watchEffect } from 'vue'

export function useDarkMode() {
  const stored = localStorage.getItem('theme')
  const isDark = ref(stored !== 'light')

  watchEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  })

  function toggle() {
    isDark.value = !isDark.value
  }

  return { isDark, toggle }
}
