<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost'
  disabled?: boolean
  loading?: boolean
}>(), {
  variant: 'primary',
  disabled: false,
  loading: false
})
</script>

<template>
  <button
    :class="['app-button', `app-button--${variant}`, { 'app-button--loading': loading }]"
    :disabled="disabled || loading"
  >
    <span v-if="loading" class="app-button__spinner"></span>
    <slot v-else />
  </button>
</template>

<style scoped>
.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: var(--border-radius);
  font-size: 0.875rem;
  font-weight: 500;
  transition: background 0.2s, opacity 0.2s;
}

.app-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.app-button--primary {
  background: var(--accent);
  color: #fff;
}

.app-button--primary:hover:not(:disabled) {
  opacity: 0.9;
}

.app-button--secondary {
  background: var(--surface);
  color: var(--text-main);
  border: 1px solid var(--text-muted);
}

.app-button--secondary:hover:not(:disabled) {
  border-color: var(--accent);
}

.app-button--ghost {
  background: transparent;
  color: var(--accent);
}

.app-button--ghost:hover:not(:disabled) {
  background: var(--surface);
}

.app-button--loading {
  pointer-events: none;
}

.app-button__spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: app-button-spin 0.6s linear infinite;
}

@keyframes app-button-spin {
  to { transform: rotate(360deg); }
}
</style>
