<template>
    <page-slot>
        <div class="w-full bg-white dark:text-white dark:bg-dark-300 shadow-sm rounded-md p-3 mb-3 relative">
            <div class="flex relatvie">
                <h3 class="font-bold text-26 mb-4 flex items-center">{{ type }}</h3>
                <button class="absolute right-5 text-xs font-semibold  bg-slate-300 disabled:bg-slate-400 hover:bg-slate-400 dark:hover:bg-blue-600 transition-all dark:disabled:bg-blue-600 dark:bg-blue-500 px-8 py-1 rounded-full" :disabled="loading" @click="loading = true;saveProfile()">
                    Save
                    <svg class="loader-auth absolute w-3" viewBox="0 0 50 50" style="right:14%;top: 28%;" v-if="this.loading">
                        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                    </svg>
                </button>
            </div>
            <input type="text" placeholder="Attending profile name" class="input w-full" v-model="payload.name"/>
            <p class="error ml-2" v-if="error_display.profile_name">{{ error_display.profile_name }}</p>
        </div>
        <div class="w-full bg-white dark:text-white dark:bg-dark-300 shadow-sm rounded-md p-3">
            <div class="mt-2">
                <h3 class="font-semibold text-sm mb-3">Attending profile requests</h3>
                <div class="grid grid-cols-2" v-if="requests.length">
                    <div class="placeholder input w-full flex items-center relative rounded-full cursor-pointer" :class="{error_input: error.request_name}" @click="dropdown.requestMenu =! dropdown.requestMenu">
                        <span data-menu="requestModel" > {{ placeholder.placeholder_request }} </span>
                        <font-awesome-icon icon="chevron-down" class="ml-auto transition-all" :class="{'rotate-180': dropdown.requestMenu}" data-menu="roleMenu" />
                        <transition 
                            enter-active-class="transform transition duration-500 ease-custom"
                            enter-class="-translate-y-1/2 scale-y-0 opacity-0"
                            enter-to-class="translate-y-0 scale-y-100 opacity-100"
                            leave-active-class="transform transition duration-300 ease-custom"
                            leave-class="translate-y-0 scale-y-100 opacity-100"
                            leave-to-class="-translate-y-1/2 scale-y-0 opacity-0">
                            <ul class="select_menu bg-gray-100 rounded-md mt-2 dark:bg-dark-300 shadow-md absolute z-20 "  v-if="dropdown.requestMenu">
                                <li class="text-xs font-semibold p-2 cursor-pointer hover:bg-blue-500 hover:text-white" v-for="request in requests" :key="request.id" 
                                @click="placeholder.placeholder_request = request.name,added_request.name = request.name,added_request.type = request.requestType.type,added_request.id = request.id">{{ request.name }}</li>
                            </ul>
                        </transition>
                    </div>
                    <div class="value flex items-center">
                        <input type="number" placeholder="Value" class="input ml-2" :class="{error_input: error.request_value}" v-model="added_request.value"/>
                        <span class="ml-2 text-xs font-semibold cursor-pointer" @click="AddNewRequest()"> + Add Request </span>
                    </div>
                </div>
                <div class="overflow-x-auto relative mt-3 sm:rounded-lg">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="py-3 px-6">
                                    Request
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Value
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Unit
                                </th>
                                <th scope="col" class="py-3 px-6">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                          <tr v-if="!appended_requests.length">
                            <td colspan="4" class=" text-center font-semibold mt-2 py-4">No request to show here</td>
                          </tr>
                           <tr class="nothing_tr py-2" v-for="request in appended_requests" :key="request.id" >
                                <td class="py-4 px-6">
                                    {{ request.name }}
                                </td>
                                <td class="py-4 px-6">
                                    {{ request.value }}
                                </td>
                                <td class="py-4 px-6">
                                    {{ request.type }}/Month
                                </td>
                                <td class="py-4 px-6">
                                    <span class="font-semibold cursor-pointer" @click="RemoveRequest(request.id)">
                                        - Remove request
                                    </span>
                                </td>
                           </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="w-full bg-white dark:text-white dark:bg-dark-300 shadow-sm rounded-md p-3 mt-3">
            <div class="mt-2">
                <h3 class="font-semibold text-sm mb-3">Attending profile status</h3>
                <div class="grid grid-cols-2"  v-if="statuses.length">
                    <div class="placeholder input w-full flex items-center relative rounded-full cursor-pointer" :class="{error_input: error.status_name}" @click="dropdown.statusMenu =! dropdown.statusMenu">
                        <span data-menu="requestModel"> {{ placeholder.placeholder_status }} </span>
                        <font-awesome-icon icon="chevron-down" class="ml-auto transition-all" :class="{'rotate-180': dropdown.statusMenu}" data-menu="roleMenu" />
                        <transition 
                            enter-active-class="transform transition duration-500 ease-custom"
                            enter-class="-translate-y-1/2 scale-y-0 opacity-0"
                            enter-to-class="translate-y-0 scale-y-100 opacity-100"
                            leave-active-class="transform transition duration-300 ease-custom"
                            leave-class="translate-y-0 scale-y-100 opacity-100"
                            leave-to-class="-translate-y-1/2 scale-y-0 opacity-0">
                            <ul class="select_menu bg-gray-100 rounded-md mt-2 dark:bg-dark-300 shadow-md absolute z-20 " v-if="dropdown.statusMenu">
                                <li class="text-xs font-semibold p-2 cursor-pointer hover:bg-blue-500 hover:text-white" v-for="status in statuses" :key="status.id" 
                                @click="placeholder.placeholder_status = status.name,added_status.name = status.name,added_status.id = status.id">{{ status.name }}</li>
                            </ul>
                        </transition>
                    </div>
                    <div class="value flex items-center">
                        <span class="ml-2 text-xs font-semibold cursor-pointer" @click="AddNewStatus()"> + Add Status </span>
                    </div>
                </div>
                <div class="overflow-x-auto relative mt-3 sm:rounded-lg">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="py-3 px-6">
                                    Status
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                          <tr v-if="!appended_statuses.length">
                            <td colspan="4" class=" text-center font-semibold mt-2 py-4">No status to show here</td>
                          </tr>
                           <tr class="nothing_tr py-2" v-for="status in appended_statuses" :key="status.id" >
                                <td class="py-4 px-6">
                                    {{ status.name }}
                                </td>
                                <td class="py-4 px-6">
                                    <span class="font-semibold cursor-pointer" @click="RemoveStatus(status.id)">
                                        - Remove status
                                    </span>
                                </td>
                           </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </page-slot>
</template>

<script>

import PageSlotVue from '../../components/slots/PageSlot.vue';
import { useRequestStore } from '../../stores/request.js';
import { mapActions } from 'pinia';
import { useStatusestore } from '../../stores/status.js';
import { useAttendingStore } from '../../stores/attending.js';

export default ({
    components: {PageSlot: PageSlotVue},
    data() {
        return {
            type: "Add new attending",

            requests: {},

            statuses: {},

            placeholder: {
                placeholder_request: "Choose request",
                placeholder_status: "Choose status"
            },

            dropdown: {
                requestMenu: false,
                statusMenu: false
            },

            added_status: {
                name: null,
                id: null
            },

            added_request: {
                type: null,
                value: null,
                name: null,
                id: null
            },

            payload: {
                name: null,
                requests:[],
                status: []
            },

            appended_requests: [],
            appended_statuses: [],

            error: {
                request_name: false,
                request_value: false,
                status_name: false,
                profile_name: false
            },

            error_display: {
                profile_name: null
            },

            loading: false
        }
    },
    methods: {
        ...mapActions(useRequestStore,['getAllRequests']),
        ...mapActions(useStatusestore,['getAllStatuses']),
        ...mapActions(useAttendingStore,['upsertAttending']),

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

        AddNewRequest() {

            if ( this.added_request.id && this.added_request.value ) {
                let request_index = this.requests.findIndex(x => x.id == this.added_request.id);
                this.requests.splice(request_index,1);
                this.appended_requests.push({
                    id: this.added_request.id,
                    type: this.added_request.type,
                    value: this.added_request.value,
                    name: this.added_request.name
                });

                this.payload.requests.push({request_id: this.added_request.id , value: this.added_request.value});
                
                this.added_request = {
                    type: null,
                    value: null,
                    name: null,
                    id: null
                },

                this.placeholder.placeholder_request = "Choose request";
                this.error.request_name = false;
                this.error.request_value = false;
            } else {
                
                if (  ! this.added_request.id  ) {
                    this.error.request_name = true;
                }

                if( ! this.added_request.value ) {
                    this.error.request_value = true;
                }
            }
        },

        AddNewStatus() {
            let status_index = this.requests.findIndex(x => x.id == this.added_request.id);
            this.statuses.splice(status_index,1);
            if( this.added_status.id ) {

                this.appended_statuses.push({
                    id: this.added_status.id,
                    name: this.added_status.name
                });

                this.payload.status.push(this.added_status.id);

                this.error.status_name = false;
                this.placeholder.placeholder_status = "Choose status";

            } else {

                this.error.status_name = true;

            }
        },

        RemoveRequest(index) {
            let getIndex = this.appended_requests.findIndex(x => x.id == index);
            let payloadIndex = this.payload.requests.findIndex(x => x.id == index);
            let spliced_request =  this.appended_requests.splice(getIndex,1);
            this.requests.push({id: spliced_request[0].id,type: spliced_request[0].type,name: spliced_request[0].name});
            this.payload.requests.splice(payloadIndex,1);
            this.requests.sort(function(a,b){
                return a.id - b.id;
            });
        },

        RemoveStatus(index) {
            let getIndex = this.appended_statuses.findIndex(x => x.id == index);
            let payloadIndex = this.payload.status.findIndex(x => x.id == index);
            let spliced_status =  this.appended_statuses.splice(getIndex,1);
            this.statuses.push({id: spliced_status[0].id,type: spliced_status[0].type,name: spliced_status[0].name});
            this.payload.status.splice(payloadIndex,1);
            this.statuses.sort(function(a,b){
                return a.id - b.id;
            });
        },

        saveProfile() {
            this.upsertAttending(this.payload).then((response) => {
                this.loading = false;
                let errors = response.data.errors;
                if ( errors ) {
                    let errorBag = errors[0].extensions.validation
                    if ( errorBag['input.name'] ) {
                        this.error_display.profile_name = errorBag['input.name'][0]
                    }
                } else {
                    this.$router.push({name: "attending"});
                }
            });
        }
    },
    mounted() {
        this.getAllRequests().then((response) => {
            this.requests = response.data.data.requestall;
            this.getAllStatuses().then((response) => {
                this.statuses = response.data.data.statusesall;
                console.log(this.statuses)
            });
        });
    }
})
</script>
