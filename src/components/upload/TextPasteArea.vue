<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  visible?: boolean
  modelValue?: string
}>()

const emit = defineEmits<{
  'text-pasted': [text: string]
  'update:modelValue': [value: string]
}>()

const showTextarea = ref(false)
const textareaRef = ref<HTMLTextAreaElement | null>(null)

watch(() => props.modelValue, (val) => {
  if (val) {
    showTextarea.value = true
  }
})

function onToggle() {
  showTextarea.value = true
}

function onInput(e: Event) {
  const target = e.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
  if (target.value) {
    emit('text-pasted', target.value)
  }
}
</script>

<template>
  <div class="text-paste-area">
    <button
      v-if="!showTextarea"
      class="text-paste-area__toggle"
      @click="onToggle"
    >
      Prefere escrever? Cole o texto aqui
    </button>
    <textarea
      v-show="showTextarea"
      ref="textareaRef"
      class="text-paste-area__input"
      placeholder="Cole seu texto aqui..."
      :value="modelValue"
      @input="onInput"
    ></textarea>
  </div>
</template>

<style scoped>
.text-paste-area__toggle {
  background: none;
  border: none;
  color: var(--accent);
  font-size: 0.875rem;
  padding: 0.5rem 0;
}

.text-paste-area__toggle:hover {
  text-decoration: underline;
}

.text-paste-area__input {
  width: 100%;
  min-height: 100px;
  max-height: 400px;
  padding: 0.75rem;
  border: 1px solid var(--text-muted);
  border-radius: var(--border-radius);
  background: var(--surface);
  color: var(--text-main);
  font-family: var(--font-family);
  font-size: 0.875rem;
  resize: vertical;
  outline: none;
}

.text-paste-area__input:focus {
  border-color: var(--accent);
}

.text-paste-area__input::placeholder {
  color: var(--text-muted);
}
</style>
