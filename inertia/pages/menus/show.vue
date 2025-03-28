<script setup lang="ts">
import type MenuDto from '#dtos/menu'
import type RestaurantDto from '#dtos/restaurant'
import { Pencil, Trash2 } from 'lucide-vue-next'
import { ref, watchEffect } from 'vue'

const props = defineProps<{
  restaurant: RestaurantDto
  menu: MenuDto
}>()

const actions = ref()
const internalMenu = ref({ ...props.menu })
watchEffect(() => (internalMenu.value = { ...props.menu }))
</script>

<template>
  <AppHead :title="menu.name" :description="`Manage your menu ${menu.name}`" />

  <div class="w-full max-w-screen-lg mx-auto bg-background border rounded-xl py-4 lg:px-4">
    <div class="flex flex-wrap items-center justify-between mb-6">
      <h1 class="text-2xl font-bold px-4">{{ menu.name }}</h1>
      <div class="flex items-center justify-end gap-2">
        <Button size="sm" variant="ghost" @click="actions.edit(internalMenu)">
          <Pencil class="w-3 h-3 mr-2" />
          Edit
        </Button>

        <Button
          size="sm"
          variant="ghost"
          class="hover:text-red-500"
          @click="actions.destroy(internalMenu)"
        >
          <Trash2 class="w-3 h-3 mr-2" />
          Delete
        </Button>
      </div>
    </div>

    <MenuActions ref="actions" />
  </div>
</template>
