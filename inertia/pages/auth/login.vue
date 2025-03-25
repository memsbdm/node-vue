<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'

import { AlertCircle, Loader } from 'lucide-vue-next'
import { tuyau } from '~/core/providers/tuyau'

import AuthLayout from '~/layouts/AuthLayout.vue'

defineOptions({ layout: AuthLayout })

defineProps<{
  exceptions: Record<string, string>
}>()

const form = useForm({
  email: '',

  password: '',
})
</script>

<template>
  <AppHead title="Login" description="Login to your PlotMyCourse account" />

  <div class="flex flex-col space-y-2">
    <h1 class="text-2xl font-semibold tracking-tight">Login</h1>

    <p class="text-sm text-muted-foreground">
      <Link :href="tuyau.$url('auth.register.render')">Need an account? Register</Link>
    </p>
  </div>

  <form @submit.prevent="form.post(tuyau.$url('auth.login.handle'))">
    <Alert v-if="exceptions.E_INVALID_CREDENTIALS" variant="destructive" class="mb-6">
      <AlertCircle class="w-4 h-4" />

      <AlertTitle>Error</AlertTitle>

      <AlertDescription>{{ exceptions.E_INVALID_CREDENTIALS }}</AlertDescription>
    </Alert>

    <div class="grid gap-3">
      <FormInput
        label="Email"
        type="email"
        v-model="form.email"
        :error="form.errors.email"
        :required="true"
      />

      <FormInput
        label="Password"
        type="password"
        v-model="form.password"
        :error="form.errors.password"
        :required="true"
      />

      <Button type="submit" :disable="form.processing">
        <Loader v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
        Login
      </Button>
    </div>
  </form>
</template>
