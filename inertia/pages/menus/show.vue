<script setup lang="ts">
import type CategoryDto from '#dtos/category'
import type MenuDto from '#dtos/menu'
import type RestaurantDto from '#dtos/restaurant'
import { Pencil, Trash2 } from 'lucide-vue-next'
import { toRaw } from 'vue'
import { ref, watchEffect } from 'vue'

const props = defineProps<{
  restaurant: RestaurantDto
  menu: MenuDto
  categories: CategoryDto[]
}>()

const actions = ref()
const internalMenu = ref({ ...props.menu })
const internalCategories = ref(structuredClone(toRaw(props.categories)))
watchEffect(() => (internalMenu.value = { ...props.menu }))
watchEffect(() => (internalCategories.value = structuredClone(toRaw(props.categories))))
</script>

<template>
  <AppHead :title="menu.name" :description="`Manage your menu ${menu.name}`" />

  <div class="w-full max-w-screen-lg mx-auto bg-background border rounded-xl py-4 lg:px-4">
    <div class="flex flex-wrap items-center justify-between mb-6">
      <h1 class="text-2xl font-bold px-4 flex gap-3 flex-col">
        <span v-if="menu.isActive" class="text-green-500 text-sm font-medium">Active</span>
        <span v-if="!menu.isActive" class="text-red-500 text-sm font-medium">Not active</span>
        {{ menu.name }}
      </h1>
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

    <div class="px-2">
      <div class="border-b border-slate-200 text-slate-400 text-sm p-2 mb-2">
        {{ categories.length }} Categories, {{ menu.meta.articles_count }} Articles
      </div>
      <SortableCategories v-model="internalCategories" :menu="menu" />
    </div>
    <MenuActions ref="actions" />
  </div>
</template>
