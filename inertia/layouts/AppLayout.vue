<script setup lang="ts">
defineProps<{
  messages: Record<string, string | Record<string, string>>
}>()
</script>

<template>
  <div>
    <h1>AppLayout</h1>

    <div>
      <slot />
    </div>
    <ToastManager :messages="messages" />
  </div>
</template>
