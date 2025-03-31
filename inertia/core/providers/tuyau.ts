import { createTuyau } from '@tuyau/client'
import { api } from '../../../.adonisjs/api.js'
export const tuyau = createTuyau({ baseUrl: process.env.APP_URL!, api })
