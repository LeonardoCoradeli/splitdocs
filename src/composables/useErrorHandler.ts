import { ref } from 'vue'

const error = ref<string | null>(null)

export function useErrorHandler() {
  function showError(message: string): void {
    error.value = message
  }

  function clearError(): void {
    error.value = null
  }

  function handleError(err: unknown): void {
    if (err instanceof Error) {
      showError(err.message)
    } else if (typeof err === 'string') {
      showError(err)
    } else {
      showError('Ocorreu um erro. Tente novamente.')
    }
  }

  return { error, showError, clearError, handleError }
}
