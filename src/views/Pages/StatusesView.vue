<template>
    <div class="loading h-full-screen" v-if="isLoading">
        <svg class="spinner" viewBox="0 0 50 50">
            <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
        </svg>
    </div>
    <Transition name="menu">
        <PageSlot v-if="!isLoading">
            <div class="w-full bg-white shadow-sm rounded-md p-3">
                <h2 class="font-bold text-26 mb-4 flex items-center">
                    <span>Statuses Managment</span>
                    <span class="text-xs text-gray-500 px-4 hover:text-blue-500 cursor-pointer" @click="model.new_status = true">+ Add Status</span>
                </h2>
                <input type="search" placeholder="Search Statuses" class="input w-full max-w-md h-10 ml-auto mt-2" @input="this.searchBy()" v-model="this.search.name"/>
            </div>
            <div class=" grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full py-3 grid" v-if="!this.status_loader">
                <div class="status bg-white shadow-sm rounded-md p-3 m-1" v-for="status in statuses" :key="status.id">
                    <div class="status_info cursor-pointer"  @click="updateStatus(status.id)">
                        <h4 class="text-xs font-semibold flex items-center ">
                            {{ status.name }}
                            <span class="status_color block mx-3" :style="{'background': status.color}"></span>
                        </h4>
                        <div class="status info text-xs font-semibold text-gray-600 flex">
                            <div class="status_keys ml-auto">
                                <span class="text-us pr-2" @click.stop="model.update_status = true;editStatusPayload.id=status.id">
                                    <i class="fa-solid fa-pen"></i>
                                </span>
                                <span class="text-us pr-2" @click.stop="model.delete_status = true;deleteStatusPayload.id=status.id">
                                    <i class="fa-solid fa-trash"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-center w-full" v-if="this.status_loader">
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
        <AddNewStatusModal v-if="model.new_status" @close="closeModels" @upsertStatus="createdNewtStatus" :search="search"></AddNewStatusModal>
    </Transition>
    <Transition name="fade">
        <EditStatusModal v-if="model.update_status" @close="closeModels" @upsertStatus="createdNewtStatus" :status_id="editStatusPayload.id" :search="search"></EditStatusModal>
    </Transition>
    <Transition name="fade">
       <DeleteStatusModel v-if="model.delete_status" @close="closeModels" @deleted="removedStatus" :status_id="deleteStatusPayload.id" :search="search"></DeleteStatusModel>
    </Transition>
</template>

<script>

import PageSlot from "@/components/slots/PageSlot.vue";
import { mapActions } from 'pinia';
import PaginationComponent from "../../components/fixed/PaginationComponent.vue";
import { useStatusestore } from "../../stores/status.js";
import AddNewStatusModal from "../../components/modals/StatusModels/AddNewStatusModal.vue";
import EditStatusModal from "../../components/modals/StatusModels/EditStatusModal.vue";
import DeleteStatusModel from "../../components/modals/StatusModels/DeleteStatusModel.vue";

export default {
    components: { PageSlot, PaginationComponent, AddNewStatusModal, EditStatusModal, DeleteStatusModel },
    data() {
        return {
            url: import.meta.env.VITE_APP_END_POINT + '/',
            status_loader: false,
            
            statuses: [],
            dropDowns: {
                userStatusSelect: false
            },
            model: {
                new_status: false,
                update_status: false,
                delete_status: false,
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

            deleteStatusPayload: {
                id: null,
                password:""
            },

            editStatusPayload: {
                id: 5
            },

            search: {
                name: "",
                status: null,
                page: 1
            },
            sendSearchQuery:null,
            isLoading: true,
            sendSearchQuery: null
        }
    },
    methods: {
        ...mapActions(useStatusestore,['getStatusesList']),
        createdNewtStatus(response) 
        {
            this.closeModels('new_status_model');
            this.closeModels('update_status_model');
            this.statuses = response.data.data.statusupsert.statuses.data;
        },

        closeModels($model)
        {
            if ( $model == 'new_status_model' ) {
                this.model.new_status = false;
            } 

            if ( $model == 'update_status_model' ) {
                this.model.update_status = false;
            } 

            if ( $model == 'status_delete' ) {
                this.model.delete_status = false;
            }
        },

        searchBy()
        {
            this.status_loader = true;
            clearTimeout(this.sendSearchQuery);
            this.sendSearchQuery = setTimeout(() => {
                this.getStatusesList(this.search).then((response) => {
                    this.statuses = response.data.data.statuses.data;
                    this.status_loader = false;
                });
            },1000);
        },
        updateStatus(id) {
            this.editStatusPayload.id = id;
            this.model.update_status = true;
        },

        removedStatus(response) {
            this.model = false;
            this.statuses = response.data.data.statusdelete.statuses.data;
        }
    },

   

    mounted() {
        this.getStatusesList(this.search).then((response) => {
            this.statuses = response.data.data.statuses.data;
            this.isLoading = false;
        })
    }
}
</script>