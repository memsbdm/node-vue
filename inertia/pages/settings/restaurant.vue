<script setup lang="ts">
import RestaurantDto from '#dtos/restaurant'

defineProps<{
  restaurant: RestaurantDto
}>()
</script>

<template>
  <AppHead title="Restaurant Settings" :description="`Manage your ${restaurant.name} restaurant`" />

  <SettingsShell>
    <RestaurantEditCard :restaurant="restaurant" />
  </SettingsShell>
</template>
