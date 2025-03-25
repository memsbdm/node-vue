<script setup lang="ts">
import AuthLayout from '~/layouts/AuthLayout.vue'
import { useForm } from '@inertiajs/vue3'
import { Loader } from 'lucide-vue-next'
import { tuyau } from '~/core/providers/tuyau'

defineOptions({ layout: AuthLayout })

const form = useForm({
  fullName: '',
  email: '',
  password: '',
})
</script>

<template>
  <AppHead title="Register" description="Register your account" />

  <div class="flex flex-col space-y-2">
    <h1 class="text-2xl font-semibold tracking-tight">Register</h1>
    <p class="text-sm text-muted-foreground">
      <Link :href="tuyau.$url('auth.login.render')">Have an account? Login</Link>
    </p>
  </div>

  <form
    class="grid gap-3"
    @submit.prevent="
      form.post(tuyau.$url('auth.register.handle'), { onSuccess: () => form.reset() })
    "
  >
    <FormInput
      label="Full Name"
      v-model="form.fullName"
      :error="form.errors.fullName"
      :disabled="form.processing"
      :required="true"
    />

    <FormInput
      label="Email"
      v-model="form.email"
      :error="form.errors.email"
      :disabled="form.processing"
      :required="true"
      type="email"
    />

    <FormInput
      label="Password"
      v-model="form.password"
      :error="form.errors.password"
      :disabled="form.processing"
      :required="true"
      type="password"
    />

    <Button type="submit" :disabled="form.processing">
      <Loader v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
      Register
    </Button>
  </form>
</template>
