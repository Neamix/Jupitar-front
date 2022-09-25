<template>
    <div
        class="overview fixed z-1000 w-full h-full-screen bg-shadow top-0 left-0 flex justify-center  items-center">
        <Transition name="menu" appear>
            <div class="modal bg-white rounded-md min-w-992 max-w-lg">
                <div class="p-5 w-full">
                    <h2 class="font-extrabold text-headline ">Control your employees</h2>
                    <div class="mt-5 w-full">
                        <input type="text" placeholder="Attending Profile name" class="w-full input"/> 
                    </div>
                    <div class="mt-5">
                        <div class="requests">
                            <div class="flex">
                                <h2 class=" text-sm font-semibold mb-2">Profile Requests</h2>
                                <span class="text-xs text-gray-500 px-4 hover:text-blue-500 cursor-pointer font-semibold " @click="increment.requests++" >+ Add Request</span>
                            </div>
                            <div class="requests mt-2" v-for="requestindex in increment.requests" :key="requestindex">
                                {{ AddRequestForm(requestindex) }}
                                <div class="grid grid-cols-2">
                                    <div class="placeholder input w-full flex items-center relative rounded-full cursor-pointer" data-menu="roleMenu" @click="dropdown.requestMenu[requestindex] =! dropdown.requestMenu[requestindex]">
                                        <span data-menu="requestModel"> {{ dropdown.placeholder_request[requestindex] }} </span>
                                        <font-awesome-icon icon="chevron-down" class="ml-auto transition-all" :class="{'rotate-180': dropdown.requestMenu[requestindex]}" data-menu="roleMenu" />
                                        <transition 
                                            enter-active-class="transform transition duration-500 ease-custom"
                                            enter-class="-translate-y-1/2 scale-y-0 opacity-0"
                                            enter-to-class="translate-y-0 scale-y-100 opacity-100"
                                            leave-active-class="transform transition duration-300 ease-custom"
                                            leave-class="translate-y-0 scale-y-100 opacity-100"
                                            leave-to-class="-translate-y-1/2 scale-y-0 opacity-0">
                                            <ul class="select_menu bg-gray-100 rounded-md mt-2 dark:bg-dark-300 shadow-md absolute z-20 " v-if="dropdown.requestMenu[requestindex]">
                                                <li class="text-xs font-semibold p-2 cursor-pointer hover:bg-blue-500 hover:text-white" v-for="request in requests" :key="request.id" @click="dropdown.placeholder_request[requestindex] = request.name">{{ request.name }}</li>
                                            </ul>
                                        </transition>
                                    </div>
                                    <div class="value flex items-center">
                                        <input type="number" placeholder="Value" class="input ml-2"/>
                                        <span class="ml-2 text-xs font-semibold">- Remove Request</span>
                                    </div>
                                </div>
                            </div>
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
          increment: {
            requests: 1
          },
          loading: {
            add: false,
          },
          requests: {},
          model: {
            placeholder_request: "Choose a request"
          },
          payload: {
            name: "",
            id: null,
            requests: {}
          },
          error: {
            email: "",
            name: ""
          },
          dropdown: {
            requestMenu: {},
            placeholder_request: {}
          }
        }
    },
    methods: {
        ...mapActions(useRequestStore,['getAllRequests']),
        addRequest() {
            this.loading.add = true;
            this.upsertRequest(this.payload,this.search).then((response) => {
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
        AddRequestForm(index) {
            if ( ! this.dropdown.requestMenu[index] ) {
                this.dropdown.requestMenu[index] = false;
                this.dropdown.placeholder_request[index] = "Choose request"
            }
            console.log(this.dropdown)

        },
        changePlaceholder(index) {
            console.log(index);
        },

        closeModel() {
            this.$emit('close','new_request_model');
        },
    },
    mounted() {
        this.getAllRequests().then((response) => {
            this.requests = response.data.data.requestall;
        })
    }
}
</script>