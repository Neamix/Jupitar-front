<template>
    <div
        @click.self="model.suspendedModel = false"
        class="overview fixed z-1000 w-full h-full-screen bg-shadow top-0 left-0 flex justify-center  items-center" v-if="payload.id">
        <Transition name="menu" appear>
            <div class="modal bg-white rounded-md  min-w-500  max-w-md  p-3">
                <div class="flex items-center justify-center flex-col">
                    <img src="@/assets/img/system/warning.png" class="w-20"/>
                    <p class="font-semibold text-xs p-4 text-center">
                        Howdy, We have to warn you that you must be sure from taken this Suspended/Unsuspended user will be able/not able to reach system data 
                    </p>
                </div>
                <div class="flex ml-auto w-full justify-end">
                    <button
                    @click="model.suspendedModel = false" 
                    class=" border-0 bg-blue-600 hover:bg-blue-500 transition-all  text-white text-us font-semibold px-6  py-1 rounded-sm mx-2">
                        Cancel
                    </button>
                    <button 
                    @click="suspendUser();"
                    class=" flex relative justify-center items-center border-0 bg-red-600 hover:bg-red-500 transition-all  text-white text-us font-semibold px-6  py-1 rounded-sm">
                        <span>Confirm</span>
                        <svg 
                            v-if="loading.suspended"
                            version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve" width="23px" class="ml-4 absolute right-1">
                            <path fill="#fff"
                            d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                            <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50"
                                to="360 50 50" repeatCount="indefinite" />
                            </path>
                        </svg>
                    </button>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script>
import { mapActions } from 'pinia';
import { useAuthStore } from '../../../stores/Auth';
export default {
    props: {
        user_id: Number,
        page: Number
    },

    data() {
        return {
            payload: {
                id: null,
                password: null
            },

            error: {
                suspendedPassword: null
            },

            loading: {
                suspended: null 
            }
        }
    },

    methods: {
        ...mapActions(useAuthStore,['toggleUserActive',]),
        suspendUser() {
            this.loading.suspended = true;
            this.toggleUserActive(this.payload,this.page).then((response) => {
                let errors = response.data.errors;

                if ( !errors ) {

                    this.payload = {
                        id: null,
                    }

                    this.$emit('suspended',response)
                } 

                this.loading.suspended = false;
            });
        },
    },  

    mounted() {
        this.payload.id = this.user_id;
        console.log(this.page);
    }


}
</script>