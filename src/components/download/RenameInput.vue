<script setup lang="ts">
import { ref, nextTick } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const editing = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)
const localValue = ref(props.modelValue)

function startEdit() {
  editing.value = true
  localValue.value = props.modelValue
  nextTick(() => {
    inputRef.value?.select()
  })
}

function confirm() {
  editing.value = false
  if (localValue.value.trim()) {
    emit('update:modelValue', localValue.value.trim())
  } else {
    localValue.value = props.modelValue
  }
}

function cancel() {
  editing.value = false
  localValue.value = props.modelValue
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') confirm()
  if (e.key === 'Escape') cancel()
}
</script>

<template>
  <span class="rename-input">
    <span
      v-if="!editing"
      class="rename-input__text"
      @click="startEdit"
    >
      {{ modelValue }}
    </span>
    <input
      v-else
      ref="inputRef"
      v-model="localValue"
      class="rename-input__field"
      @blur="confirm"
      @keydown="onKeydown"
    />
  </span>
</template>

<style scoped>
.rename-input__text {
  cursor: pointer;
  border-bottom: 1px dashed var(--text-muted);
}

.rename-input__text:hover {
  border-bottom-color: var(--accent);
}

.rename-input__field {
  padding: 0.25rem 0.375rem;
  border: 1px solid var(--accent);
  border-radius: var(--border-radius);
  background: var(--surface);
  color: var(--text-main);
  font-size: 0.875rem;
  outline: none;
}
</style>
