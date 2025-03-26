<script setup lang="ts">
import RestaurantDto from '#dtos/restaurant'
import { router, useForm } from '@inertiajs/vue3'
import { ChevronsUpDown } from 'lucide-vue-next'
import { ref } from 'vue'
import { tuyau } from '~/core/providers/tuyau'
import FormDialog from './FormDialog.vue'
import { watchEffect } from 'vue'
import { useResourceActions } from '~/composables/resource_actions'
import { StoreRestaurantDto } from '#dtos/store_restaurant'

const props = defineProps<{
  restaurant: RestaurantDto
  restaurants: RestaurantDto[]
}>()

const restaurantId = ref(props.restaurant.id)
const { form, dialog, onSuccess } = useResourceActions<{ id: string }>()({
  id: '',
})

watchEffect(() => (restaurantId.value = props.restaurant.id))

function onRestaurantChange(activeId: string) {
  router.get(tuyau.$url('restaurants.active.handle', { params: { id: activeId } }))
}

function onSubmit() {
  form.post(tuyau.$url('restaurants.create.handle'), {
    onSuccess,
  })
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost">{{ restaurant.name }}<ChevronsUpDown class="w-4 h-4 ml-2" /></Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Your Restaurants ({{ restaurants.length }})</DropdownMenuLabel>

      <DropdownMenuSeparator />

      <DropdownMenuRadioGroup v-model="restaurantId" @update:modelValue="onRestaurantChange">
        <DropdownMenuRadioItem v-for="rest in restaurants" :key="rest.id" :value="rest.id">
          {{ rest.name }}
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>

      <DropdownMenuSeparator />

      <DropdownMenuItem @click="router.get(tuyau.$url(''))">
        Edit {{ restaurant.name }}
      </DropdownMenuItem>
      <DropdownMenuItem @click="dialog.open()">Add Restaurant</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <FormDialog
    resource="Restaurant"
    v-model:open="dialog.isOpen"
    :processing="form.processing"
    @create="onSubmit"
  >
    <PlaceAutocomplete v-model="form.id" :error="form.errors.id" />
  </FormDialog>
</template>
