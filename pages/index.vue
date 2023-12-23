<script setup>

import EverythingCool from './EverythingCool.vue';
import Account from './Account.vue';

// SUPABASE

import { supabase } from '../lib/supabase.js'

const session = ref('')

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})


// main navigation array

const items = [
  {
  label: 'Home',
  slot: 'home'
  }, 
  {
  label: 'Overview',
  slot: 'problematic'
  }, 
  {
  label: 'Types of institutions',
  slot: 'institutions'
  }, 
  {
  label: 'About us',
  slot: 'about'
  },
  {
  label: 'Contact',
  slot: 'contact'
  }
]




</script>

<template>
  <div class="w-screen h-screen  m-0 p-0 bg-gradient-to-t from-black-500 to-green-500 w-screen h-screen font-mono">

    <Account v-if="session" :session="session" />
  
    <EverythingCool v-else />

    <UNotifications />
  
  
  </div>
</template>

<style scoped>

</style>