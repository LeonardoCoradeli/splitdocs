<template>
  <div class="skeleton-block">
    <div class="skeleton-block__bar skeleton-block__bar--60" />
    <div class="skeleton-block__bar skeleton-block__bar--80" />
    <div class="skeleton-block__bar skeleton-block__bar--70" />
    <div class="skeleton-block__bar skeleton-block__bar--45" />
  </div>
</template>

<style scoped>
.skeleton-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skeleton-block__bar {
  height: 12px;
  background: var(--text-muted);
  opacity: 0.3;
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}

.skeleton-block__bar--60 { width: 60%; }
.skeleton-block__bar--80 { width: 80%; }
.skeleton-block__bar--70 { width: 70%; }
.skeleton-block__bar--45 { width: 45%; }

@keyframes skeleton-pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}
</style>
