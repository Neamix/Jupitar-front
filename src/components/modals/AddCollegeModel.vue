<template>
    <div
        class="overview fixed z-1000 w-full h-full-screen bg-shadow top-0 left-0 flex justify-center  items-center">
        <Transition name="menu" appear>
            <div class="modal bg-white rounded-md min-w-992 max-w-lg grid grid-cols-2" v-if="model.college_invite_model">
                <img src="@/assets/img/models/team.svg" class="w-full max-w-lg p-4 " alt="team" />
                <div class="p-5 relative">
                    <h2 class="font-extrabold text-headline ">All Heros need assistances, Let's invite some</h2>
                    <div class="mt-4 h-full">
                        <div class="user_info">
                            <label class="label pb-1">College email</label>
                            <input type="email" class="input w-full" placeholder="TheGreatestAssistance@iamgreat.com" v-model="payload.email"/>
                            <p class="error">{{ error.email }}</p>
                        </div>
                        <div class="grid grid-cols-2 mt-3">
                            <div class="group p-1">
                                <label class="label pb-1">College role</label>
                                <div class="select" @click="dropdown.roleMenu =! dropdown.roleMenu ">
                                    <div class="placeholder input w-full flex items-center">
                                        <span> Admin </span>
                                        <font-awesome-icon icon="chevron-down" class="ml-auto transition-all" :class="{'rotate-180': dropdown.roleMenu}" />
                                    </div>
                                    <transition 
                                        enter-active-class="transform transition duration-500 ease-custom"
                                        enter-class="-translate-y-1/2 scale-y-0 opacity-0"
                                        enter-to-class="translate-y-0 scale-y-100 opacity-100"
                                        leave-active-class="transform transition duration-300 ease-custom"
                                        leave-class="translate-y-0 scale-y-100 opacity-100"
                                        leave-to-class="-translate-y-1/2 scale-y-0 opacity-0">
                                        <ul class="select_menu bg-gray-100 rounded-md mt-2 shadow-md"
                                            v-if="dropdown.roleMenu">
                                            <li class="text-xs font-semibold p-2">Admin</li>
                                            <li class="text-xs font-semibold p-2">Modrator</li>
                                            <li class="text-xs font-semibold p-2">Modrator</li>
                                        </ul>
                                    </transition>
                                </div>
                            </div>
                            <div class="group p-1">
                                <label class="label pb-1">College name</label>
                                <input type="text" class="input w-full" placeholder="The Greatest Assistance" v-model="payload.name"/>
                                <p class="error">{{ error.name }}</p>
                            </div>
                        </div>
                        <div class="flex absolute bottom-0 right-3">
                            <button class="relative right-2 my-5 mx-1 text-xs font-semibold bg-blue-600 py-2 px-10 rounded-sm text-white flex" @click="createUser()">
                                Send invitation
                                <svg class="loader-auth absolute w-5" viewBox="0 0 50 50" v-if="loading.register"  style="right:7%">
                                    <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                                </svg>
                            </button>
                            <button class=" right-2 my-5 mx-1 text-xs font-semibold bg-red-600 py-2 px-10 rounded-sm text-white flex" @click="closeModel()">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script>
import { mapActions } from 'pinia';
import { useAuthStore } from '../../stores/Auth';
export default {
    data() {
        return {
          model: {
            college_invite_model: false
          },
          loading: {
            register: false
          },
          payload: {
            email: "",
            name: ""
          },
          error: {
            email: "",
            name: ""
          },
          dropdown: {
            roleMenu: false
          }
        }
    },
    methods: {
        ...mapActions(useAuthStore,['upsert']),
        createUser() {
            this.loading.register = true;
            this.upsert(this.payload).then((response) => {
                this.loading.register = false;
                if ( response.data.errors ) {
                    let data = response.data.errors[0].extensions.validation;
                    this.error.email = data['input.email'] ? data['input.email'][0] : null;
                    this.error.name  = data['input.name'] ? data['input.name'][0] : null;
                } else {
                    this.model.college_invite_model = false; 
                    this.$emit('register',[this.payload]);
                    this.payload = {
                        email: "",
                        name: ""
                    }
                }
            });
        },
        closeModel() {
            this.model.college_invite_model = false;
            this.$emit('close','invite_model');
        }
    },
    mounted() {
        setTimeout(() => {
            this.model.college_invite_model = true;
        },100);
    }
}
</script>