<template>
    <div
        class="overview fixed z-1000 w-full h-full-screen bg-shadow top-0 left-0 flex justify-center  items-center">
        <div class="w-full h-full flex justify-center items-center" v-if="loading.modal">
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
            <div class="modal bg-white dark:bg-dark-300 rounded-md min-w-992 max-w-lg grid grid-cols-2" v-if="!loading.modal">
                <img src="@/assets/img/models/status.svg" class="w-full max-w-lg p-4 " alt="team" />
                <div class="p-5 relative">
                    <h2 class="font-extrabold text-headline dark:text-white">Let's take part time off</h2>
                    <div class="mt-4 h-full">
                        <div class="status_info">
                            <label class="label pb-1 dark:text-white">Status name</label>
                            <input type="name" class="input w-full dark:text-white" placeholder="Howdy Status" v-model="payload.name"/>
                            <p class="error">{{ error.name }}</p>
                        </div>
                        <div class="grid grid-cols-1 mt-3">
                            <div class="group p-1">
                                <label class="label pb-1 dark:text-w">Status color</label>
                                <div class="select relative" @click="dropdown.statusMenu =! dropdown.statusMenu ">
                                    <div class="select relative" @click="dropdown.statusMenu =! dropdown.statusMenu ">
                                        <div id="swatch">
                                            <input type="color" id="color" v-model="payload.color">
                                            <div class="info">
                                                <h5 class="type">Color</h5>
                                            </div>
                                        </div>  
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex absolute bottom-0 right-3">
                            <button class="relative right-2 my-5 mx-1 text-xs font-semibold bg-blue-600 py-2 px-10 rounded-sm text-white flex" @click="updateStatus()">
                                Update status
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
import { useStatusestore } from '../../../stores/status';
export default {
    props: {
        status_id: Number,
        search: Array
    },
    data() {
        return {
          loading: {
            update: false,
            modal: true
          },
          payload: {
            name: "",
            id: null,
            color: null
          },
          error: {
            email: "",
            name: ""
          },
          dropdown: {
            statusMenu: false
          }
        }
    },
    methods: {
        ...mapActions(useStatusestore,['getStatus','upsertStatuses']),
        updateStatus() {
            this.loading.update = true;
            this.upsertStatuses(this.payload,this.search).then((response) => {
                console.log(response);
                if ( response.data.errors ) {
                    let data = response.data.errors[0].extensions.validation;
                    this.error.name  = data['input.name'] ? data['input.name'][0] : null;
                } else {
                    this.$emit('upsertStatus',response);
                    this.payload =  {
                        name: "",
                        id: null,
                        color: null,
                    }
                }

                this.loading.update = false;
            })
        },
        closeModel() {
            this.$emit('close','update_status_model');
        }
    },
    mounted() {
        this.payload.id = this.status_id;
        this.getStatus(this.payload).then((response) => {
            let status = response.data.data.status;
            this.payload.name = status.name,
            this.payload.color = status.color;
            this.loading.modal = false
            console.log(this.payload.color);
        });

    }
}
</script>