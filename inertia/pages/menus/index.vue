<script setup lang="ts">
import MenuDto from '#dtos/menu'
import RestaurantDto from '#dtos/restaurant'
import { Link, router } from '@inertiajs/vue3'
import { EllipsisVertical, Plus, GripVertical } from 'lucide-vue-next'
import { ref, watchEffect } from 'vue'
import { tuyau } from '~/core/providers/tuyau'
import Sortable from 'vuedraggable'

const props = defineProps<{
  restaurant: RestaurantDto
  menus: MenuDto[]
}>()

const actions = ref()
const list = ref(props.menus)

function onOrderUpdate() {
  const ids = list.value.map((menu) => menu.id)
  router.put(tuyau.$url('menus.order.handle'), { ids }, { preserveScroll: true })
}

watchEffect(() => (list.value = props.menus))
</script>

<template>
  <AppHead title="Menus" :description="`Manage menus of ${restaurant.name}`" />

  <div class="w-full max-w-screen-lg mx-auto bg-background border rounded-xl py-4 lg:px-4">
    <div class="flex items-center justify-between mb-3">
      <h1 class="text-2xl font-bold px-2">Menus</h1>

      <Button size="sm" variant="ghost" @click="actions.create()">
        <Plus class="w-3 h-3 mr-2" />
        Add Menu
      </Button>
    </div>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead> Name </TableHead>
          <TableHead> Status </TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <Sortable
        v-if="list?.length"
        v-model="list"
        item-key="id"
        handle=".handle"
        tag="tbody"
        class="[&_tr:last-child]:border-0"
        @end="onOrderUpdate"
      >
        <template #item="{ element: menu }">
          <TableRow class="group">
            <TableCell>
              <div class="flex items-center gap-3">
                <div
                  class="text-slate-300 group-hover:text-slate-950 duration-300 handle cursor-move"
                >
                  <GripVertical class="w-4 h-4" />
                </div>
                <Link
                  :href="tuyau.$url('menus.show.render', { params: { id: menu.id } })"
                  class="hover:underline"
                  :class="menu.isActive ? 'font-semibold' : ''"
                >
                  {{ menu.name }}
                </Link>
              </div>
            </TableCell>
            <TableCell :class="menu.isActive ? 'font-semibold' : ''">
              {{ menu.isActive ? 'Active' : 'Not active' }}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical class="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    :as="Link"
                    :href="tuyau.$url('menus.show.render', { params: { id: menu.id } })"
                  >
                    Open
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="actions.edit(menu)">Edit</DropdownMenuItem>
                  <DropdownMenuItem @click="actions.destroy(menu)">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </template>
      </Sortable>
      <TableBody v-else>
        <TableRow>
          <TableCell class="text-center" colspan="5"> You don't have any menu yet. </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <MenuActions ref="actions" />
  </div>
</template>
