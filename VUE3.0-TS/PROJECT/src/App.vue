<template>
  <div class="container">
    <GlobalHeader :user="currentUser"></GlobalHeader>
    <RouterView></RouterView>
    <footer class="text-center py-4 text-secondary bg-light mt-6"></footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from './components/GlobalHeader.vue'
import { GlobalDataProps } from '../src/store'

export default defineComponent({
  name: 'App',
  components: { GlobalHeader },
  setup () {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)
    return {
      currentUser
    }
  }
})
</script>

<style></style>
