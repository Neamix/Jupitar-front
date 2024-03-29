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
                    <span>Roles Managment</span>
                    <span class="text-xs text-gray-500 px-4 hover:text-blue-500 cursor-pointer" @click="model.new_role = true">+ Add Role</span>
                </h2>
                <input type="search" placeholder="Search Roles" class="input w-full max-w-md h-10 ml-auto mt-2" @input="this.searchBy()" v-model="this.search.name"/>
            </div>
            <p class="w-full text-center text-sm text-gray-500 mt-5 font-semibold"  v-if="!loading.role && roles.length == 0">Opps, we didn't get any data</p>
            <div class=" grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full py-3 grid" v-if="!this.role_loader">
                <div class="role  bg-white dark:text-white dark:bg-dark-300 shadow-sm rounded-md p-3 m-1" v-for="role in roles" :key="role.id">
                    <div class="role_info cursor-pointer"  @click="updateRole(role.id)">
                        <h4 class="text-xs font-semibold ">{{ role.name }}</h4>
                        <div class="role info text-xs font-semibold text-gray-600 flex">
                            <span>{{role.users.length}} Members</span>
                            <div class="role_keys ml-auto">
                                <span class="text-us pr-2" @click.stop="model.update_role = true;editRolePayload.id=role.id">
                                    <i class="fa-solid fa-pen"></i>
                                </span>
                                <span class="text-us pr-2" @click.stop="model.deleteModel = true;deleteRolePayload.id=role.id">
                                    <i class="fa-solid fa-trash"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-center w-full" v-if="this.role_loader">
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
        <AddNewRoleModal v-if="model.new_role" @close="closeModels" @upsertRole="createdNewtRole" :search="search"></AddNewRoleModal>
    </Transition>
    <Transition name="fade">
        <EditRoleModal v-if="model.update_role" @close="closeModels" @upsertRole="createdNewtRole" :role_id="editRolePayload.id" :search="search"></EditRoleModal>
    </Transition>
    <Transition name="fade">
       <DeleteRoleModel v-if="model.deleteModel" @close="closeModels" @deleted="removedRole" :role_id="deleteRolePayload.id" :search="search"></DeleteRoleModel>
    </Transition>
</template>

<script>

import PageSlot from "@/components/slots/PageSlot.vue";
import { mapActions } from 'pinia';
import PaginationComponent from "../../components/fixed/PaginationComponent.vue";
import EditColleageModel from "../../components/modals/CollegesModels/EditColleageModel.vue";
import { useGuardStore } from "../../stores/Guard";
import AddNewRoleModal from "../../components/modals/RoleModels/AddNewRoleModal.vue";
import EditRoleModal from "../../components/modals/RoleModels/EditRoleModal.vue";
import DeleteRoleModel from "../../components/modals/RoleModels/DeleteRoleModel.vue";

export default {
    components: { PageSlot, PaginationComponent, EditColleageModel, AddNewRoleModal, EditRoleModal, DeleteRoleModel },
    data() {
        return {
            url: import.meta.env.VITE_APP_END_POINT + '/',
            role_loader: false,
            
            roles: [],
            dropDowns: {
                userRoleSelect: false
            },
            model: {
                new_role: false,
                update_role: false,
                deleteModel: false,
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

            deleteRolePayload: {
                id: null,
                password:""
            },

            editRolePayload: {
                id: 5
            },

            search: {
                name: "",
                role: null,
                page: 1
            },
            sendSearchQuery:null,
            suspendID: null,
            isLoading: true,
            sendSearchQuery: null
        }
    },
    methods: {
        ...mapActions(useGuardStore,['getRolesList','deleteRole']),
        createdNewtRole(response) 
        {
            this.closeModels('new_role_model');
            this.closeModels('update_role_model');
            this.roles = response.data.data.roleupsert.roles.data;
        },

        closeModels($model)
        {
            if ( $model == 'new_role_model' ) {
                this.model.new_role = false;
            } 

            if ( $model == 'update_role_model' ) {
                this.model.update_role = false;
            } 

            if ( $model == 'role_delete' ) {
                this.model.deleteModel = false;
            }
        },

        searchBy()
        {
            this.role_loader = true;
            clearTimeout(this.sendSearchQuery);
            this.sendSearchQuery = setTimeout(() => {
                this.getRolesList(this.search).then((response) => {
                    this.roles = response.data.data.roles.data;
                    this.role_loader = false;
                });
            },1000);
        },
        updateRole(id) {
            this.editRolePayload.id = id;
            this.model.update_role = true;
        },

        removedRole(response) {
            this.model.deleteModel = false;
            this.roles = response.data.data.roledelete.roles.data;
        }
    },

   

    mounted() {
        this.getRolesList(this.search).then((response) => {
            this.roles = response.data.data.roles.data;
            this.isLoading = false;
        });

        console.log(this.$route.params.valueOf('action'))
    }
}
</script>