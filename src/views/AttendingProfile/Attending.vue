<template>
    <page-slot>
        <div class="loading h-full-screen" v-if="isLoading">
            <svg class="spinner" viewBox="0 0 50 50">
                <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
            </svg>
        </div>
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
                <div class="grid grid-cols-2" v-if="available_requests.length">
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
                                <li class="text-xs font-semibold p-2 cursor-pointer hover:bg-blue-500 hover:text-white" v-for="available_request in available_requests" :key="available_request.id" 
                                @click="placeholder.placeholder_request = available_request.name,added_request.name = available_request.name,added_request.type = available_request.requestType.type,added_request.id = available_request.id">{{ available_request.name }}</li>
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
                <div class="grid grid-cols-2"  v-if="available_statuses.length">
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
                                <li class="text-xs font-semibold p-2 cursor-pointer hover:bg-blue-500 hover:text-white" v-for="available_status in available_statuses" :key="available_status.id" 
                                @click="placeholder.placeholder_status = available_status.name,added_status.name = available_status.name,added_status.id = available_status.id">{{ available_status.name }}</li>
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
    props: {id:  Number},
    data() {
        return {
            type: "Add new attending",
            isLoading: true,

            requests: [{}],

            statuses: [{}],

            available_requests: [],
            available_statuses: [],

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
                id: null,
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
        ...mapActions(useAttendingStore,['upsertAttending','getAttending']),

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
                let request_index = this.available_requests.findIndex(x => x.id == this.added_request.id);
                this.available_requests.splice(request_index,1);
                this.appended_requests.push({
                    id: this.added_request.id,
                    type: this.added_request.type,
                    value: this.added_request.value,
                    name: this.added_request.name
                });
                console.log(this.appended_requests)
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

                let status_index = this.available_statuses.findIndex(x => x.id == this.added_status.id);
                this.available_statuses.splice(status_index,1);
                this.appended_statuses.push({
                    id: this.added_status.id,
                    type: this.added_status.type,
                    value: this.added_status.value,
                    name: this.added_status.name
                });

                this.payload.status.push(this.added_status.id);
                this.added_status = {
                    name: null,
                    id: null
                },

                this.placeholder.placeholder_status = "Choose statuse";
                this.error.status_name = false;
            } else {

                this.error.status_name = true;

            }
        },

        RemoveRequest(index) {
            console.log(this.appended_requests)
            let getIndex = this.appended_requests.findIndex(x => x.id == index);
            let payloadIndex = this.payload.requests.findIndex(x => x.request_id == index);
            let spliced_request =  this.appended_requests.splice(getIndex,1);
            this.available_requests.push({id: spliced_request[0].id,requestType: {type: spliced_request[0].type},name: spliced_request[0].name});
            this.payload.requests.splice(payloadIndex,1);
            console.log(payloadIndex,this.payload.requests);
            this.requests.sort(function(a,b){
                return a.id - b.id;
            });
        },

        RemoveStatus(index) {
            let getIndex = this.appended_statuses.findIndex(x => x.id == index);
            let payloadIndex = this.payload.status.findIndex(x => x.id == index);
            let spliced_status =  this.appended_statuses.splice(getIndex,1);
            this.available_statuses.push({id: spliced_status[0].id,name: spliced_status[0].name});
            this.payload.status.splice(payloadIndex,1);
            this.statuses.sort(function(a,b){
                return a.id - b.id;
            });
        },
        isRequestExist(index) {
            this.payload.requests.findIndex(x => x.id == index);
            
            if ( index > -1 ) {
                return true;
            } else {
                return false;
            }
        },
        saveProfile() {
            this.error_display.profile_name = '';
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
        },
    },

    mounted() {
        if ( this.$route.params.id ) {
            this.payload.id = this.$route.params.id;
            this.getAttending(this.payload).then((response) => {
                this.isLoading = false;
                let attending = response.data.data.attending
                let status = attending.status;
                let requests = attending.requests;
                this.payload.name = attending.name; 
                this.payload.id = attending.id;
                status.forEach((item) => {
                    this.payload.status.push(item.id);
                    this.appended_statuses.push({id: item.id,name: item.name});
                });
                requests.forEach((item) => {
                    this.payload.requests.push({request_id: item.id,value: item.pivot.value});
                    this.appended_requests.push({id: item.id,name: item.name,type: item.requestType.type,value: item.pivot.value});
                });

                this.getAllStatuses().then((response) => {
                    this.statuses = response.data.data.statusesall;
                    this.statuses.forEach((item) => {
                        let status_index = this.payload.status.indexOf(item.id);
                        if ( status_index == -1 ) {
                            let req_index = this.statuses.find(function (x) { return x.id == item.id });
                            this.available_statuses.push(req_index)
                        }
                    })
                });

                this.getAllRequests().then((response) => {
                    this.requests= response.data.data.requestall;
                    this.requests.forEach((item) => {
                        let request_index = this.payload.requests.findIndex(x=> x.request_id == item.id);
                        if ( request_index == -1 ) {
                            let req_index = this.requests.find(function (x) { return x.id == item.id });
                            this.available_requests.push(req_index)
                        }
                    })
                });

            });
        } else {
            this.isLoading = false;
            this.getAllRequests().then((response) => {
                this.available_requests = response.data.data.requestall;
            });
            this.getAllStatuses().then((response) => {
                this.available_statuses = response.data.data.statusesall;
            });
        }
    }
})
</script>
