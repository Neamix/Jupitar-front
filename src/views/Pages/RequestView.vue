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
                    <span>Requests Managment</span>
                    <span class="text-xs text-gray-500 px-4 hover:text-blue-500 cursor-pointer" @click="model.new_request = true">+ Add Request</span>
                </h2>
                <input type="search" placeholder="Search Requests" class="input w-full max-w-md h-10 ml-auto mt-2" @input="this.searchBy()" v-model="this.search.name"/>
            </div>
            <div class=" grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full py-3 grid" v-if="!this.request_loader">
                <div class="request bg-white shadow-sm rounded-md p-3 m-1" v-for="request in requests" :key="request.id">
                    <div class="request_info cursor-pointer"  @click="updateRequest(request.id)">
                        <h4 class="text-xs font-semibold ">{{ request.name }}</h4>
                        <div class="request info text-xs font-semibold text-gray-600 flex">
                            <span>{{request.requestType.type}}</span>
                            <div class="request_keys ml-auto">
                                <span class="text-us pr-2" @click.stop="model.update_request = true;editRequestPayload.id=request.id">
                                    <i class="fa-solid fa-pen"></i>
                                </span>
                                <span class="text-us pr-2" @click.stop="model.delete_request = true;deleteRequestPayload.id=request.id">
                                    <i class="fa-solid fa-trash"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-center w-full" v-if="this.request_loader">
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
        <AddNewRequestModal v-if="model.new_request" @close="closeModels" @upsertRequest="createdNewtRequest" :search="search"></AddNewRequestModal>
    </Transition>
    <Transition name="fade">
        <EditRequestModal v-if="model.update_request" @close="closeModels" @upsertRequest="createdNewtRequest" :request_id="editRequestPayload.id" :search="search"></EditRequestModal>
    </Transition>
    <Transition name="fade">
       <DeleteRequestModel v-if="model.delete_request" @close="closeModels" @deleted="removedRequest" :request_id="deleteRequestPayload.id" :search="search"></DeleteRequestModel>
    </Transition>
</template>

<script>

import PageSlot from "@/components/slots/PageSlot.vue";
import { mapActions } from 'pinia';
import PaginationComponent from "../../components/fixed/PaginationComponent.vue";
import { useRequestStore } from "../../stores/request.js";
import AddNewRequestModal from "../../components/modals/RequestModels/AddNewRequestModal.vue";
import EditRequestModal from "../../components/modals/RequestModels/EditRequestModal.vue";
import DeleteRequestModel from "../../components/modals/RequestModels/DeleteRequestModel.vue";

export default {
    components: { PageSlot, PaginationComponent, AddNewRequestModal, EditRequestModal, DeleteRequestModel },
    data() {
        return {
            url: import.meta.env.VITE_APP_END_POINT + '/',
            request_loader: false,
            
            requests: [],
            dropDowns: {
                userRequestSelect: false
            },
            model: {
                new_request: false,
                update_request: false,
                delete_request: false,
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

            deleteRequestPayload: {
                id: null,
                password:""
            },

            editRequestPayload: {
                id: 5
            },

            search: {
                name: "",
                request: null,
                page: 1
            },
            sendSearchQuery:null,
            isLoading: true,
            sendSearchQuery: null
        }
    },
    methods: {
        ...mapActions(useRequestStore,['getRequestsList']),
        createdNewtRequest(response) 
        {
            this.closeModels('new_request_model');
            this.closeModels('update_request_model');
            this.requests = response.data.data.requestupsert.requests.data;
        },

        closeModels($model)
        {
            if ( $model == 'new_request_model' ) {
                this.model.new_request = false;
            } 

            if ( $model == 'update_request_model' ) {
                this.model.update_request = false;
            } 

            if ( $model == 'request_delete' ) {
                this.model.delete_request = false;
            }
        },

        searchBy()
        {
            this.request_loader = true;
            clearTimeout(this.sendSearchQuery);
            this.sendSearchQuery = setTimeout(() => {
                this.getRequestsList(this.search).then((response) => {
                    this.requests = response.data.data.requests.data;
                    this.request_loader = false;
                });
            },1000);
        },
        updateRequest(id) {
            this.editRequestPayload.id = id;
            this.model.update_request = true;
        },

        removedRequest(response) {
            this.model = false;
            this.requests = response.data.data.requestdelete.requests.data;
        }
    },

   

    mounted() {
        this.getRequestsList(this.search).then((response) => {
            this.requests = response.data.data.requests.data;
            this.isLoading = false;
        })
    }
}
</script>