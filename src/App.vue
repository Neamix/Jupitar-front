<template>
    <router-view></router-view>
    <Transition name="fade">
      <Loading v-if="fetch"></Loading>
    </Transition>
</template>

<script>
import { mapActions, mapState, mapStores } from 'pinia';
import { useCollectionStore } from "@/stores/collection";
import { useAuthStore } from './stores/Auth';
import Loading from './views/Pages/Loading.vue';


export default {
  components: {Loading},
  methods: {
    ...mapActions(useCollectionStore,['windowSize']),  
    ...mapActions(useAuthStore,['getAuthIfExist']),
  },

  computed: {
    ...mapState(useAuthStore,['fetch'])
  },

  mounted() {
    this.windowSize();
  }
}
</script>
