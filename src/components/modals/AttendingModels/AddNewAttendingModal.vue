<template>
    <div
        class="overview fixed z-1000 w-full h-full-screen bg-shadow top-0 left-0 flex justify-center  items-center">
        <Transition name="menu" appear>
            <div class="modal bg-white rounded-md min-w-992 max-w-lg grid grid-cols-2">
                <img src="@/assets/img/models/travel.svg" class="w-full max-w-lg p-4 " alt="team" />
                <div class="p-5 relative">
                    <h2 class="font-extrabold text-headline ">Let's take part time off</h2>
                    <div class="mt-4 h-full">
                        <div class="request_info">
                            <label class="label pb-1">Request name</label>
                            <input type="name" class="input w-full" placeholder="Howdy Request" v-model="payload.name"/>
                            <p class="error">{{ error.name }}</p>
                        </div>
                        <div class="grid grid-cols-1 mt-3">
                            <div class="group p-1">
                                <label class="label pb-1">Request type</label>
                                <div class="select relative" @click="dropdown.requestMenu =! dropdown.requestMenu ">
                                    <div class="placeholder input w-full flex items-center">
                                        <span> {{ payload.type }} </span>
                                        <font-awesome-icon icon="chevron-down" class="ml-auto transition-all" :class="{'rotate-180': dropdown.requestMenu}" />
                                    </div>
                                    <transition 
                                        enter-active-class="transform transition duration-500 ease-custom"
                                        enter-class="-translate-y-1/2 scale-y-0 opacity-0"
                                        enter-to-class="translate-y-0 scale-y-100 opacity-100"
                                        leave-active-class="transform transition duration-300 ease-custom"
                                        leave-class="translate-y-0 scale-y-100 opacity-100"
                                        leave-to-class="-translate-y-1/2 scale-y-0 opacity-0">
                                        <ul class="select_menu bg-gray-100 rounded-md mt-2 shadow-md absolute z-1000" v-if="dropdown.requestMenu">
                                            <li class="text-xs font-semibold p-2 cursor-pointer hover:bg-blue-500 hover:text-white" :class="{'bg-blue-500 text-white': payload.type_id == 2}" @click="payload.type= 'Hourly';payload.type_id=2">Hourly</li>
                                            <li class="text-xs font-semibold p-2 cursor-pointer hover:bg-blue-500 hover:text-white" :class="{'bg-blue-500 text-white': payload.type_id == 1}" @click="payload.type= 'Daily';payload.type_id=1">Daily</li>
                                        </ul>
                                    </transition>
                                </div>
                            </div>
                        </div>
                        <div class="flex absolute bottom-0 right-3">
                            <button class="relative right-2 my-5 mx-1 text-xs font-semibold bg-blue-600 py-2 px-10 rounded-sm text-white flex" @click="addRequest()">
                                Add request
                                <svg class="loader-auth absolute w-5" viewBox="0 0 50 50" v-if="loading.add"  style="right:7%">
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
import { useAuthStore } from '../../../stores/Auth';
import { useGuardStore } from '../../../stores/Guard';
import { useRequestStore } from '../../../stores/request';
export default {
    props: {
        request_id: Number,
        search: Array
    },
    data() {
        return {
          loading: {
            add: false,
          },
          payload: {
            name: "",
            id: null,
            type: "Daily",
            type_id: 1,
          },
          error: {
            email: "",
            name: ""
          },
          dropdown: {
            requestMenu: false
          }
        }
    },
    methods: {
        ...mapActions(useRequestStore,['getRequest','upsertRequest']),
        addRequest() {
            this.loading.add = true;
            this.upsertRequest(this.payload,this.search).then((response) => {
                console.log(response);
                if ( response.data.errors ) {
                    let data = response.data.errors[0].extensions.validation;
                    this.error.name  = data['input.name'] ? data['input.name'][0] : null;
                } else {
                    this.$emit('upsertRequest',response);
                    this.payload =  {
                        name: "",
                        id: null,
                        type: "Daily",
                        type_id: 1,
                    }
                }

                this.loading.add = false;
            })
        },
        closeModel() {
            this.$emit('close','new_request_model');
        }
    },
    mounted() {
        console.log(this.search)
    }
}
</script>