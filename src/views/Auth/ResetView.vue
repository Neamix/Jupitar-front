<template>
    <div class="login">
        <p class="text-md text-headline   font-semibold text-blue-600" v-if="payload.type == 'Reset'">Reset Password</p>
        <p class="text-md text-headline   font-semibold text-blue-600" v-if="payload.type == 'Verify'">Verify Account</p>
        <p class="text-xs text-gray-500 mb-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        <div class="w-full ">
            <div class="form-group mb-5 ">
                <label class="block text-xs font-lightbold mb-2">Password</label>
                <input  class="form-control block border-2 border-gray-10 w-full py-2 rounded-sm text-xs p-2 outline-0 focus:outline-2 outline-blue-500"
                        placeholder="Enter your password" 
                        type="password"
                        v-model="payload.password"
                       />
                <p class="error text-us text-red-700 font-semibold pt-1">{{error.password}}</p>
            </div>
            <div class="form-group mb-5 ">
                <label class="block text-xs font-lightbold mb-2">Confirm Password</label>
                <input class="form-control block border-2 border-gray-10 w-full py-2 rounded-sm text-xs p-2 outline-0 focus:outline-2 outline-blue-500" 
                       placeholder="Enter your password" 
                       type="password"
                       v-model="payload.password_confirmation"
                       />
                <p class="error text-us text-red-700 font-semibold pt-1">{{error.token}}</p>
            </div>
            <button class=" relative bg-blue-600 hover:bg-blue-700 transition-all duration-200  rounded-sm w-full py-2 text-xs mt-4"
                    @click="ResetPassword()"
            >
                <svg class="loader-auth absolute w-5" viewBox="0 0 50 50" v-if="loading"  style="right:17%">
                    <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                </svg>
                <p class=" text-white  ">Reset Password</p>
            </button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useAuthStore } from '../../stores/Auth';
export default {
    data() {
        return {
            loading: false,
            payload: {
                email: null,
                token: null,
                type: null,
                password: null,
                password_confirmation: null
            },
            error: {
                token: null,
                password: null
            }
        }
    },
    computed: {
        ...mapState(useAuthStore,['resetSuccessFlashMessage'])
    },
    methods: {
        ...mapActions(useAuthStore,['resetPassword']),
        ResetPassword() {
            this.loading = true;
            this.resetPassword(this.payload).then((response) => {
                this.loading = false;
                if ( response.data.errors ) {                    
                    let validationMessages = response.data.errors[0].extensions.validation;

                    for ( let key in validationMessages ) {
                        if (key == 'input.token') {
                            this.error.token = validationMessages[key][0];
                        }

                        if (key == 'input.password') {
                            this.error.password = validationMessages[key][0]
                        }
                    }
                } else {
                    this.$router.push('/login');
                }
            });
        }
    },
    mounted() {
        this.payload.email = this.$route.query.email;
        this.payload.token = this.$route.query.token;
        this.payload.type = this.$route.query.type;

        if ( ! this.payload.token || ! this.payload.type || ! this.payload.email ) {
            this.$router.push('/notFound');
        }

    }
}
</script>