<template>
    <div class="main light">
        <NavbarComponent/>
        <div class="flex top-16 pt-2 relative">
          <Vueform>
            <Vueform :schema="schema"></Vueform>
          </Vueform>
        </div>
    </div>
</template>

<script>
    import NavbarComponent from "../../components/fixed/NavbarComponent.vue";
  
    export default {
      data() {
        return {
          schema: {
            name: { type: 'text', label: 'Name' },
            email: { type: 'text', label: 'Email' }
          }
        }
      },
      components: {NavbarComponent},
  
      mounted() {
        
      }
    }
  </script>