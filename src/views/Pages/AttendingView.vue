<template>
    <div class="loading h-full-screen" v-if="isLoading">
        <svg class="spinner" viewBox="0 0 50 50">
            <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
        </svg>
    </div>
    <Transition name="menu">
        <PageSlot v-if="!isLoading">
            <div class="w-full bg-white dark:text-white dark:bg-dark-300 shadow-sm rounded-md p-3">
                <h2 class="font-bold text-26 mb-4 flex items-center">
                    <span>Attendings Managment</span>
                    <router-link class="text-xs text-gray-500 px-4 hover:text-blue-500 cursor-pointer" :to="{name:'upsert_attending'}">+ Add Attending</router-link>
                </h2>
                <input type="search" placeholder="Search Attendings" class="input w-full max-w-md h-10 ml-auto mt-2" @input="this.searchBy()" v-model="this.search.name"/>
            </div>
            <div class=" grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full py-3 grid" v-if="!this.attending_loader">
                <div class="attending bg-white dark:text-white dark:bg-dark-300 shadow-sm rounded-md p-3 m-1" v-for="attending in attendings" :key="attending.id">
                    <div class="attending_info">
                        <h4 class="text-xs font-semibold ">{{ attending.name }}</h4>
                        <div class="attending info text-xs font-semibold text-gray-600 flex">
                            <div class="attending_keys ml-auto">
                                <span class="text-us pr-2">
                                    <router-link :to="{name: 'upsert_attending',params:{id: attending.id}}">
                                        <i class="fa-solid fa-pen"></i>
                                    </router-link>
                                </span>
                                <span class="text-us pr-2 cursor-pointer " @click.stop="model.delete_attending = true;deleteAttendingPayload.id=attending.id">
                                    <i class="fa-solid fa-trash"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-center w-full" v-if="this.attending_loader">
                <svg 
                    version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve" width="90px" class=" fill-blue-700 ">
                    <path 
                    d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                    <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50"
                        to="360 50 50" repeatCount="indefinite" />
                    </path>
                </svg>
            </div>
        </PageSlot>
    </Transition>
    <Transition name="fade">
        <AddNewAttendingModal v-if="model.new_attending" @close="closeModels" @upsertAttending="createdNewtAttending" :search="search"></AddNewAttendingModal>
    </Transition>
    <Transition name="fade">
        <EditAttendingModal v-if="model.update_attending" @close="closeModels" @upsertAttending="createdNewtAttending" :attending_id="editAttendingPayload.id" :search="search"></EditAttendingModal>
    </Transition>
    <Transition name="fade">
       <DeleteAttendingModel v-if="model.delete_attending" @close="closeModels" @deleted="removedAttending" :attending_id="deleteAttendingPayload.id" :search="search"></DeleteAttendingModel>
    </Transition>
</template>

<script>

import PageSlot from "@/components/slots/PageSlot.vue";
import { mapActions } from 'pinia';
import PaginationComponent from "../../components/fixed/PaginationComponent.vue";
import { useAttendingStore } from "../../stores/attending.js";
import AddNewAttendingModal from "../../components/modals/AttendingModels/AddNewAttendingModal.vue";
import EditAttendingModal from "../../components/modals/AttendingModels/EditAttendingModal.vue";
import DeleteAttendingModel from "../../components/modals/AttendingModels/DeleteAttendingModel.vue";

export default {
    components: { PageSlot, PaginationComponent, AddNewAttendingModal, EditAttendingModal, DeleteAttendingModel },
    data() {
        return {
            url: import.meta.env.VITE_APP_END_POINT + '/',
            attending_loader: false,
            
            attendings: [],
            dropDowns: {
                userAttendingSelect: false
            },
            model: {
                new_attending: false,
                update_attending: false,
                delete_attending: false,
            },
            
            error: {
                id: null,
                password: null
            },

            payload: {
                name: "",
                email: ""
            },

            loading: {
                delete: false,
            },

            deleteAttendingPayload: {
                id: null,
                password:""
            },

            editAttendingPayload: {
                id: 5
            },

            search: {
                name: "",
                attending: null,
                page: 1
            },
            sendSearchQuery:null,
            isLoading: true,
            sendSearchQuery: null
        }
    },
    methods: {
        ...mapActions(useAttendingStore,['getAttendingsList']),
        createdNewtAttending(response) 
        {
            this.closeModels('new_attending_model');
            this.closeModels('update_attending_model');
            this.attendings = response.data.data.attendingupsert.attendings.data;
        },

        closeModels($model)
        {
            console.log($model);
            if ( $model == 'new_attending_model' ) {
                this.model.new_attending = false;
            } 

            if ( $model == 'update_attending_model' ) {
                this.model.update_attending = false;
            } 

            if ( $model == 'attending_delete' ) {
                this.model.delete_attending = false;
                console.log(this.model.delete_attending)
            }
        },


        searchBy()
        {
            this.attending_loader = true;
            clearTimeout(this.sendSearchQuery);
            this.sendSearchQuery = setTimeout(() => {
                this.getAttendingsList(this.search).then((response) => {
                    this.attendings = response.data.data.attendings.data;
                    this.attending_loader = false;
                });
            },1000);
        },
        updateAttending(id) {
            this.editAttendingPayload.id = id;
            this.model.update_attending = true;
        },

        removedAttending(response) {
            this.model.delete_attending = false;
            this.attendings = response.data.data.attendingdelete.attendings.data;
        }
    },

   

    mounted() {
        this.getAttendingsList(this.search).then((response) => {
            this.attendings = response.data.data.attendings.data;
            this.isLoading = false;
        })
    }
}
</script>