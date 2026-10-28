<script setup lang="ts">
import { onMounted } from 'vue'

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

onMounted(() => {
  try {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  } catch {}
})
</script>

<template>
  <aside class="sidebar-ad">
    <ins
      class="adsbygoogle"
      style="display:block"
      data-ad-client="ca-pub-6961578288811450"
      data-ad-slot="8832881903"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  </aside>
</template>

<style scoped>
.sidebar-ad {
  width: 300px;
  min-height: 600px;
  background: var(--surface);
  display: block;
}
</style>
