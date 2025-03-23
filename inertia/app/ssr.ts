import { createInertiaApp, Link } from '@inertiajs/vue3'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, h, type DefineComponent } from 'vue'
import AppLayout from '~/layouts/AppLayout.vue'

const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

export default function render(page: any) {
  return createInertiaApp({
    page,
    title: (title) => `${title} - ${appName}`,
    render: renderToString,
    resolve: (name) => {
      const pages = import.meta.glob<DefineComponent>('../pages/**/*.vue', { eager: true })
      const resolvedPaged = pages[`../pages/${name}.vue`]
      resolvedPaged.default.layout = resolvedPaged.default.layout || AppLayout

      return resolvedPaged
    },

    setup({ App, props, plugin }) {
      return createSSRApp({ render: () => h(App, props) })
        .use(plugin)
        .component('Link', Link)
    },
  })
}
