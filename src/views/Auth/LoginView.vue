<template>
    <div class="login">
        <p class="text-md text-headline   font-semibold text-blue-600">Welcome Back</p>
        <p class="text-xs text-gray-500 mb-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        <div class="w-full ">
            <div class="form-group mb-5 ">
                <label class="block text-xs font-lightbold mb-2">Email</label>
                <input 
                    class="form-control block border-2 border-gray-10 w-full py-2 rounded-sm text-xs p-2 outline-0 focus:outline-2 outline-blue-500" 
                    placeholder="Enter your email"
                    v-model="payload.email"
                    />
                <p class="error">{{error.email}}</p>
            </div>
            <div class="form-group w-full mt-2">
                <label class="block text-xs font-lightbold mb-2">Password</label>
                <input 
                    class="form-control block border-2 border-gray-10 w-full py-2 rounded-sm text-xs p-2 focus:outline-2 outline-blue-500" 
                    placeholder="Enter your password"
                    type="password"
                    v-model="payload.password"
                    />
            </div>
            <button 
                class=" bg-blue-600 hover:bg-blue-700 relative transition-all duration-200  rounded-sm w-full py-2 text-xs mt-4"
                @click="UserLogin()"
                >
                <svg class="loader-auth absolute w-5" viewBox="0 0 50 50" v-if="loading"  style="right:17%">
                    <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                </svg>
                <p class=" text-white  ">Sign in</p>
            </button>
            <router-link class="text-xs mt-2 text-blue-700" :to="{name: 'forget'}">
                Forget your password ?
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "pinia"
import { useAuthStore } from "../../stores/Auth"


export default ({
    data() {
        return {
            loading: false,
            payload: {
                email: null,
                password: null
            },
            error: {
                email: null,
            }
        }
    },

    computed: {
        ...mapState(useAuthStore,['resetSuccessFlashMessage'])
    },

    methods: {
        ...mapActions(useAuthStore,['login']),

        UserLogin() {
            this.loading = true;
            this.error.email = null;
            this.login(this.payload).then((response) => {
                this.loading = false;
                if ( response.data.errors ) {                    
                    let validationMessages = response.data.errors[0].extensions.validation;

                    for ( let key in validationMessages ) {
                        if (key == 'input.email') {
                            this.error.email = validationMessages[key][0];
                        }
                    }
                } else {
                    let data = response.data.data.login;
                    localStorage.setItem('auth_token',data.access_token);
                    this.$router.push('/');
                }
            });
        }
    },

    mounted() {
        console.log(this.resetSuccessFlashMessage)
        if ( this.resetSuccessFlashMessage ) {
            this.$swal({
              text: 'Password has been changed',
              icon: 'success',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
        }
    }


})
</script>
