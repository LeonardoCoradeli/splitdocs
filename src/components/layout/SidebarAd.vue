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
      style="display:block; width:300px; height:300px"
      data-ad-client="ca-pub-6961578288811450"
      data-ad-slot="0000000000"
      data-ad-format="auto"
    ></ins>
  </aside>
</template>

<style scoped>
.sidebar-ad {
  width: 300px;
  min-height: 300px;
  background: var(--surface);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
