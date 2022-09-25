<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
    <div class="main light">
        <NavbarComponent/>
        <div class="flex top-16 pt-2 relative dark:bg-dark-300">
          <AsideComponent/>
          <router-view :key="$route.path"></router-view>
        </div>
    </div>
</template>

<script>
  import { mapActions, mapStores } from 'pinia';
  import { useCollectionStore } from "@/stores/collection";
  import AsideComponent from "../../components/fixed/AsideComponent.vue";
  import NavbarComponent from "../../components/fixed/NavbarComponent.vue";
  import { useAuthStore } from "../../stores/Auth";

  export default {
    data() {
      return {
         test: 'hello'
      }
    },
    components: {AsideComponent,NavbarComponent},
    methods: {
      ...mapActions(useCollectionStore,['windowSize']),  
      ...mapActions(useAuthStore,['getUser']),  
    },

    mounted() {
     
    }
  }
</script>
