<script lang="ts" setup>
import { Menu, Slash, Route } from 'lucide-vue-next'
import RestaurantSelect from './RestaurantSelect.vue'
import RestaurantDto from '#dtos/restaurant'
import { tuyau } from '~/core/providers/tuyau'

const props = defineProps<{
  restaurant: RestaurantDto
  restaurants: RestaurantDto[]
}>()
</script>

<template>
  <nav class="hidden gap-5 text-sm items-center md:flex lg:gap-6">
    <Link
      :href="tuyau.$url('menus.store.render')"
      class="flex items-center gap-2 text-lg font-semibold md:text-base"
    >
      <Route class="h-6 w-6" />

      <span class="sr-only">Restaurant App</span>
    </Link>

    <div class="flex items-center">
      <Slash class="text-slate-300 w-4 h-4 -rotate-12" />
      <RestaurantSelect v-bind="props" />

      <Slash class="text-slate-300 w-4 h-4 -rotate-12" />
    </div>

    <!-- TODO -->
    <Link
      :href="tuyau.$url('menus.store.render')"
      class="desktop-link"
      :class="{ active: $page.url.startsWith('/menus') }"
    >
      Menus
    </Link>

    <Link
      href="/categories"
      class="desktop-link"
      :class="{ active: $page.url.startsWith('categories') }"
    >
      Categories
    </Link>

    <Link
      href="/articles"
      class="desktop-link"
      :class="{ active: $page.url.startsWith('/articles') }"
    >
      Articles
    </Link>
  </nav>

  <Sheet>
    <SheetTrigger as-child>
      <Button variant="outline" size="icon" class="shrink-0 md:hidden">
        <Menu class="w-5 h-5" />

        <span class="sr-only">Toggle navigation menu</span>
      </Button>
    </SheetTrigger>

    <SheetContent side="left">
      <nav class="grid gap-6 text-lg font-medium">
        <Link href="/courses" class="flex items-center gap-2 text-lg font-semibold">
          <Route class="h-6 w-6" />

          <span class="sr-only">Restaurant App</span>
        </Link>

        <RestaurantSelect v-bind="props" />

        <Link
          :href="tuyau.$url('menus.store.render')"
          class="mobile-link"
          :class="{ active: $page.url.startsWith('/menus') }"
        >
          Menus
        </Link>

        <Link
          href="/categories"
          class="mobile-link"
          :class="{ active: $page.url.startsWith('/categories') }"
        >
          Categories
        </Link>

        <Link
          href="/articles"
          class="mobile-link"
          :class="{ active: $page.url.startsWith('/articles') }"
        >
          Articles
        </Link>
      </nav>
    </SheetContent>
  </Sheet>
</template>

<style scope>
.desktop-link {
  @apply text-muted-foreground transition-colors hover:text-foreground;

  &.active {
    @apply text-foreground;
  }
}

.mobile-link {
  @apply text-muted-foreground hover:text-foreground;

  &.active {
    @apply text-foreground;
  }
}
</style>
