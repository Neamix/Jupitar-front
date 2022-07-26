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
                    <span>Colleges</span>
                    <span class="text-xs text-gray-500 px-4 hover:text-blue-500 cursor-pointer" @click="model.college_invite_model = true">+ Add Colleges</span>
                </h2>
                <!-- <button class="bg-silvery border-light-silvery px-5 py-1 text-xs rounded-xl font-semibold">Search Options</button> -->
                <div class="xl:flex filter-search grid grid-cols-1">
                    <div class="search-container ml-2 md:ml-0">
                        <label class="block text-sm text-xs font-lightbold pl-1 py-1">Search College</label>
                        <svg viewBox="64 64 896 896" focusable="false" data-icon="search" width="1em" height="1em"
                            fill="#5e5e5e" aria-hidden="true" class="absolute mt-2 w-4 text-md w-5 ml-2"
                            style="width: 13px; margin:9px">
                            <path
                                d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z">
                            </path>
                        </svg>
                        <input type="search" class="bg-gray-50 text-sm px-3 py-2 min-w-fit search" placeholder="Search.." @keyup="searchBy()" @change="searchBy()" v-model="search.name"/>
                    </div>
                    <div class="search-container ml-2">
                        <label class="block text-sm text-xs font-lightbold pl-1  py-1">Role</label>
                        <v-select :options="['Canada', 'United States']" placeholder="Filter by role" class="select-search">
                        </v-select>
                    </div>
                    <div class="search-container ml-2">
                        <label class="block text-sm text-xs font-lightbold pl-1  py-1">Record to</label>
                        <input type="date" class="bg-gray-50 text-sm px-3 py-2 min-w-fit search"
                            placeholder="Search Colleage.." />
                    </div>
                    <ul class="ml-auto mt-6 flex md:justify-end w-full">
                        <button 
                            @click="downloadFile('xlsx')"
                            class="btn flex bg-green-100 justify-center items-center uppercase md:w-50p w-30">
                            <img src="@/assets/img/icon/excel.png" alt="excel" class="icon" />
                            <span class="text-white px-2 font-lightbold text-us">Export As Excel</span>
                        </button>
                        <button 
                            @click="downloadFile('pdf')"
                            class="btn flex items-center mx-2 bg-red-500 uppercase justify-center md:w-50p w-30 ">
                            <img src="@/assets/img/icon/pdf.png" alt="excel" class="icon" />
                            <span class=" text-us text-white px-2 font-lightbold">Export As PDF</span>
                        </button>
                        <button 
                            @click="downloadFile('csv')"
                            class="btn flex bg-green-500 justify-center items-center uppercase md:w-50p w-30">
                            <i class="fa-solid fa-file-csv text-white"></i>
                            <span class="text-white px-2 font-lightbold text-us">Export As CSV</span>
                        </button>
                    </ul>
                </div>
            </div>
            <div class="page_content">
                <Transition  name="menu">
                    <div class="mt-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2" v-if="!loading.users">
                        <div class="card mt-1 bg-white shadow-sm mx-2 rounded-md relative" v-for="user in users" :key="user.id">
                            <div class="shadow-sm rounded-md w-full flex items-center">
                                <img :src="avatarSwitcher(user.avatar)" alt="person" class="avatar rounded-full p-3" />
                                <div class="user-info">
                                    <h3 class="text-sm font-semibold w-full">
                                        {{ user.name }}
                                        <p 
                                        v-if="!user.active" 
                                        class=" font-thin text-us  bg-yellow-300 px-2 rounded-full text-white absolute block right-2 top-2">Suspended</p>
                                    </h3>
                                    <p class="text-xs text-gray-600 ">{{ user.email }}</p>
                                </div>
                                <router-link :to="{ name: 'profile', params: { id: user.id }}" class="absolute top-0 left-0 w-full h-full"></router-link>
                                <div class="ml-auto px-2 z-1000 mt-4 flex">
                                    <span class="px-1 text-us text-zinc-700 cursor-pointer" @click="toggleUserActivateState(user.id);suspendID = user.id">
                                        <i class="fa-solid fa-lock" @click="loading.suspending = user.id"></i>
                                        <svg v-if="loading.suspending == user.id"
                                            version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                            x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve" width="20px" class=" fill-black relative" style="top:-3px">
                                            <path 
                                            d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                                            <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50"
                                                to="360 50 50" repeatCount="indefinite" />
                                            </path>
                                        </svg>
                                    </span>
                                    <span class="px-1 text-us text-zinc-700 cursor-pointer" @click="deleteUserPayload.id = user.id;model.deleteModel = true ;">
                                        <i class="fa-solid fa-trash"></i>
                                    </span>
                                    <span class="px-1 text-us text-zinc-700 cursor-pointer" @click="editUserPayload.id = user.id;model.editModel = true">
                                        <i class="fa-solid fa-pen"></i>
                                    </span>
                                </div>
                            </div>
                    </div>
                    </div>
                </Transition>
                <div class="flex justify-center w-full" v-if="loading.users">
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
                <PaginationComponent :pages="pages" @swipePage="swipePage" v-if="!loading.users"></PaginationComponent>
                <div class="h-6"></div>
            </div>
            <Transition name="fade">
                <AddCollegeModel v-if="model.college_invite_model" @close="closeModels" @register="registerNewUser"></AddCollegeModel>
            </Transition>
            <Transition name="fade">
                <EditColleageModel v-if="model.editModel" @close="closeModels" @updated="updateUser" :user_id="editUserPayload.id"></EditColleageModel>
            </Transition>
            <Transition name="fade">
                <div
                    @click.self="model.deleteModel = false"
                    class="overview fixed z-1000 w-full h-full-screen bg-shadow top-0 left-0 flex justify-center  items-center" v-if="model.deleteModel">
                    <Transition name="menu" appear>
                        <div class="modal bg-white rounded-md  min-w-500  max-w-md  p-3" v-if="model.deleteModel">
                            <div class="flex items-center justify-center flex-col">
                                <img src="@/assets/img/system/warning.png" class="w-20"/>
                                <p class="font-semibold text-xs p-4 text-center">
                                    Howdy, We have to warn you that this action is irreversable and the deleted data can't be retrived again
                                </p>
                            </div>
                            <div class="form-group w-full my-4">
                                <input type="password" placeholder="Confirm your password" class="w-full border-0  bg-gray-200 rounded-sm text-xs font-semibold" v-model="deleteUserPayload.password"/>
                                <p class="error">{{ error.deletePassword }}</p>
                            </div>
                            <div class="flex ml-auto w-full justify-end">
                                <button
                                @click="model.deleteModel = false" 
                                class=" border-0 bg-blue-600 hover:bg-blue-500 transition-all  text-white text-us font-semibold px-6  py-1 rounded-sm mx-2">
                                    Cancel
                                </button>
                                <button 
                                @click="removeUser();"
                                class=" flex relative justify-center items-center border-0 bg-red-600 hover:bg-red-500 transition-all  text-white text-us font-semibold px-6  py-1 rounded-sm">
                                    <span>Confirm</span>
                                    <svg 
                                        v-if="loading.delete"
                                        version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                        x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve" width="23px" class="ml-4 absolute right-1">
                                        <path fill="#fff"
                                        d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                                        <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50"
                                            to="360 50 50" repeatCount="indefinite" />
                                        </path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </Transition>
                </div>
            </Transition>
            
        </PageSlot>
    </Transition>
</template>

<script>

import PageSlot from "@/components/slots/PageSlot.vue";
import { mapActions } from 'pinia';
import { useAuthStore } from '../../stores/Auth';
import PaginationComponent from "../../components/fixed/PaginationComponent.vue";
import AddCollegeModel from "../../components/modals/AddCollegeModel.vue";
import EditColleageModel from "../../components/modals/EditColleageModel.vue";

export default {
    components: { PageSlot, PaginationComponent, AddCollegeModel, EditColleageModel },
    data() {
        return {
            url: import.meta.env.VITE_APP_END_POINT + '/',
            dropDowns: {
                userRoleSelect: false
            },
            model: {
                college_invite_model: false,
                deleteModel: false,
                editModel: false
            },
            users: [
               
            ],

            error: {
                email: null,
                name: null,
                deletePassword: null
            },

            payload: {
                name: "",
                email: ""
            },

            deleteUserPayload: {
                id: null,
                password:""
            },

            editUserPayload: {
                id: null
            },

            search: {
                name: "",
                role: null,
                page: parseInt(localStorage.getItem('CollegePager') || 1)
            },

            loading: {
                delete: false,
                users: false,
                register: false,
                suspending: null
            },
            sendSearchQuery:null,
            suspendID: null,
            isLoading: true
        }
    },
    methods: {
        ...mapActions(useAuthStore,['register','getUserList','deleteUser','toggleUserActive','downloadUsersFile']),
        swipePage(page) {
            this.search.page = page;
            this.loading.users = true;
            this.getAllUserList();
        },

        getAllUserList()
        {
            this.getUserList(this.search).then((response) => {
                this.users = response.data.data.users.data;
                this.pages = response.data.data.users.paginatorInfo.lastPage;
                this.loading.users = false;
            });
        },

        searchBy() {
            this.loading.users = true;
            this.search.page = 1;
            localStorage.setItem('CollegePager',this.getPage);
            clearTimeout(this.sendSearchQuery);
            this.sendSearchQuery =  setTimeout(() => {
                this.getAllUserList()
            }, 2000);
        },

        avatarSwitcher(avatar) 
        {
            if( avatar ) {
                return this.url +'storage/images/avatar/small/'+ avatar
            } else {
                return this.url + 'storage/images/system/default.png'
            }
        },

        removeUser() {
            this.loading.delete = true;
            this.error.deletePassword = "";
            this.deleteUser(this.deleteUserPayload).then((response) => {
                let errors = response.data.errors;
                if ( errors ) {
                    let passwordError = errors.extensions.validation['input.password'][0];
                    this.error.deletePassword = passwordError;
                } else {
                    this.model.deleteModel = false;
                    this.getAllUserList();
                }
                this.loading.delete = false;
            });
        },

        toggleUserActivateState(id)
        {
            this.toggleUserActive(id).then(() => {
                this.getAllUserList();
            });
        },

        downloadFile($type)
        {
            this.downloadUsersFile($type);
        },

        closeModels($model)
        {
            if ( $model == 'invite_model' ) {
                this.model.college_invite_model = false;
            } 

            if ( $model == 'update_model' ) {
                this.model.editModel = false;
            }
        },

        registerNewUser($user)
        {
            this.model.college_invite_model = false;
            this.getAllUserList();
        },

        updateUser($user)
        {
            this.model.editModel = false;
            this.getAllUserList();
        }
    },

   

    mounted() {
        this.getUserList(this.search).then((response) => {
            this.users = response.data.data.users.data;
            this.pages = response.data.data.users.paginatorInfo.lastPage;
            this.isLoading = false;
        })
    }
}
</script>