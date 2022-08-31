<template>
    <div
        class="overview fixed z-1000 w-full h-full-screen bg-shadow top-0 left-0 flex justify-center  items-center">
        <div class="w-full h-full flex justify-center items-center" v-if="!payload.id">
            <svg  
                version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve" width="100px" class=" fill-white relative" style="top:-3px">
                <path 
                d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50"
                    to="360 50 50" repeatCount="indefinite" />
                </path>
            </svg>
        </div>
        <Transition name="menu" appear>
            <div class="modal bg-white rounded-md min-w-992 max-w-lg grid grid-cols-2" v-if="payload.id">
                <img src="@/assets/img/models/edit.svg" class="w-full max-w-lg p-4 " alt="team" />
                <div class="p-5 relative">
                    <h2 class="font-extrabold text-headline ">Sometimes we made some errors,let's fix it</h2>
                    <div class="mt-4 h-full">
                        <div class="user_info">
                            <label class="label pb-1">College email</label>
                            <input type="email" class="input w-full" placeholder="TheGreatestAssistance@iamgreat.com" v-model="payload.email"/>
                            <p class="error">{{ error.email }}</p>
                        </div>
                        <div class="grid grid-cols-2 mt-3">
                            <div class="group p-1">
                                <label class="label pb-1">College role</label>
                                <div class="select relative" @click="dropdown.roleMenu =! dropdown.roleMenu ">
                                    <div class="placeholder input w-full flex items-center">
                                        <span> {{ payload.role_name }} </span>
                                        <font-awesome-icon icon="chevron-down" class="ml-auto transition-all" :class="{'rotate-180': dropdown.roleMenu}" />
                                    </div>
                                    <transition 
                                        enter-active-class="transform transition duration-500 ease-custom"
                                        enter-class="-translate-y-1/2 scale-y-0 opacity-0"
                                        enter-to-class="translate-y-0 scale-y-100 opacity-100"
                                        leave-active-class="transform transition duration-300 ease-custom"
                                        leave-class="translate-y-0 scale-y-100 opacity-100"
                                        leave-to-class="-translate-y-1/2 scale-y-0 opacity-0">
                                        <ul class="select_menu bg-gray-100 rounded-md mt-2 shadow-md absolute z-1000"
                                            v-if="dropdown.roleMenu">
                                            <li class="text-xs font-semibold p-2 cursor-pointer hover:bg-blue-500 hover:text-white" v-for="role in roles" :key="role.id" @click="payload.role_name=role.name;payload.role_id=role.id">{{ role.name }}</li>
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
                            <button class="relative right-2 my-5 mx-1 text-xs font-semibold bg-blue-600 py-2 px-10 rounded-sm text-white flex" @click="updateUser()">
                                Update user
                                <svg class="loader-auth absolute w-5" viewBox="0 0 50 50" v-if="loading.update"  style="right:7%">
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
import { mapActions, mapState } from 'pinia';
import { useAuthStore } from '../../stores/Auth';
import { useGuardStore } from '../../stores/Guard';
export default {
    props: {
        user_id: Number,
        page: Number
    },
    data() {
        return {
          model: {
            user_update: false
          },
          roles: [],
          loading: {
            update: false
          },
          payload: {
            email: "",
            name: "",
            role_name: "",
            role_id: "",
            id: ""
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
        ...mapActions(useAuthStore,['getUserData','upsert']),
        ...mapActions(useGuardStore,['getRolesList']),
        updateUser() {
            this.loading.update = true;
            this.upsert(this.payload,this.page).then((response) => {
                this.loading.update = false;
                let errors = response.data.errors;
                
                if ( errors ) {
                    if ( errors[0].extensions.validation['input.email'] ) {
                        this.error.email = errors[0].extensions.validation['input.email'][0];
                    }

                    if ( errors[0].extensions.validation['input.name'] ) {
                        this.error.name = errors[0].extensions.validation['input.name'][0];
                    }
                } else {
                    this.$emit('updated',response);
                }
                
            })
        },
        closeModel() {
            this.model.user_update = false;
            this.$emit('close','update_model');
        }
    },
    mounted() {
        this.getUserData(this.user_id).then((response) => {
            let data = response.data.data.user;
            this.payload.id = data.id,
            this.payload.name = data.name,
            this.payload.email = data.email
            this.payload.role_name = data.role.name;
            this.payload.role_id = data.role.id;
            this.getRolesList({'name':""}).then((response) => {
                this.roles = response.data.data.roles.data;
            })
        });
    }
}
</script>