<template>
    <div class="login">
        <p class="text-md text-headline   font-semibold text-blue-600">Forget Password</p>
        <p class="text-xs text-gray-500 mb-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        <div class="w-full ">
            <div class="form-group mb-5 ">
                <label class="block text-xs font-lightbold mb-2">Email</label>
                <input class="form-control block border-2 border-gray-10 w-full py-2 rounded-sm text-xs p-2 outline-0 focus:outline-2 outline-blue-500" 
                       placeholder="Enter your email"
                       v-model="payload.email"
                       type="email"
                       />
                <p class="error text-us text-red-700 font-semibold pt-1">{{error.email}}</p>
                <p class="text-us text-green-700 font-semibold pt-1">{{success}}</p>
            </div>
            <button 
                class=" bg-blue-600 hover:bg-blue-700 relative transition-all duration-200  rounded-sm w-full py-2 text-xs mt-4"
                @click="ForgetPassword()"
                :disabled="loading"
                >
                <svg class="loader-auth absolute w-5" viewBox="0 0 50 50" v-if="loading"  style="right:17%">
                    <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                </svg>
                <p class=" text-white  ">Send Reset Password Message</p>
            </button>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'pinia'
import { useAuthStore } from '../../stores/Auth'
export default {
   data() {
        return {
            loading: false,
            payload: {
                email: null
            },
            success: null,
            error: {
                email: null
            }
        }
   },
   methods: {
    ...mapActions(useAuthStore,['forgetPassword']),
    ForgetPassword() {

        if ( ! this.payload.email ) {
            this.error.email = "Please enter your email address";
            return false;
        }

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.payload.email))) {
            this.error.email = "Please enter valid email";
            return false;
        }

        this.error.email = null;
        this.success = null
        this.loading = true;

        this.forgetPassword(this.payload).then((response) => {
            this.loading = false;
            this.error.email = "";
            if ( response.data.errors ) {                    
                let validationMessages = response.data.errors[0].extensions.validation;
                for ( let key in validationMessages ) {
                    if (key == 'input.email') {
                        this.error.email = validationMessages[key][0];
                    }
                }
            } else {
                this.success = response.data.data.forgetPassword;
                this.payload.email = null;
            }
        })
    }
   }
   
}
</script>