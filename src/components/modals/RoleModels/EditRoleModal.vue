<template>
    <div
        class="overview fixed z-1000 w-full h-full-screen bg-shadow top-0 left-0 flex justify-center  items-center">
        <Transition name="menu" appear>
            <div class="modal bg-white rounded-md min-w-992 max-w-lg grid grid-cols-1" v-if="model.model_open">
                <div class="p-5 relative">
                    <h2 class="font-extrabold text-headline ">Setup your power packages</h2>
                    <div class="mt-4 h-full">
                        <div class="user_info">
                            <label class="label pb-1">Role name</label>
                            <input type="name" class="input w-full" placeholder="TheGreatestAssistance@iamgreat.com" v-model="payload.name"/>
                            <p class="error">{{ error.name }}</p>
                            <p class="error">{{ error.priviledge }}</p>
                        </div>
                        <div class="grid grid-cols-3 mt-3">
                           <div class="group mt-4" v-for="priviledge in priviledges" :key="priviledge.id">
                                <h2 class="text-xs mb-2 font-semibold">{{ priviledge.parent }}</h2>
                                <div class="permission">
                                    <div class="flex">
                                        <label class="switch">
                                            <input type="checkbox" :value="priviledge.id" @input="pushPriviledges(priviledge.id,$event)" v-model="this.payload.priviledges">
                                            <span class="slider round"></span>
                                        </label>
                                        <p class="text-xs p-1 ">{{ priviledge.name }}</p>
                                    </div>
                                    <div class="children ml-3 mt-2">
                                        <div class="permission flex mt-2" v-for="child in priviledge.children" :key="child.id">
                                            <label class="switch">
                                                <input type="checkbox" :value="child.id" :disabled="disabledPriviledges(child.parent_id)" v-model="this.payload.priviledges">
                                                <span class="slider round"></span>
                                            </label>
                                            <p class="text-xs p-1 ">{{ child.name }}</p>
                                        </div>
                                    </div>
                                </div>
                           </div>
                        </div>
                        <div class="flex relative bottom-0 justify-end">
                            <button class="relative right-2 my-5 mx-1 text-xs font-semibold bg-blue-600 py-2 px-10 rounded-sm text-white flex" @click="updateRole()" :disabled="loading.role_upsert">
                                Update role
                                <svg class="loader-auth absolute w-5" viewBox="0 0 50 50" v-if="loading.role_upsert"  style="right:7%">
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
        <div class="model_loader" v-if="loading.model"></div>
    </div>
</template>

<script>
import { mapActions } from 'pinia';
import { useGuardStore } from '../../../stores/Guard';
import { useCollectionStore } from '../../../stores/collection';
export default {
    props: {
        role_id: Number,
        search: Array
    },
    data() {
        return {
            model: {
                model_open: false,
            },
            loading: {
                model: false,
                role_upsert: false,
            },
            payload: {
                priviledges: [],
                name: ""
            },
            error: {
                name: "",
                priviledge: ""
            },
            dropdown: {
                roleMenu: false
            },
            priviledges: [],
            editRolePayload: {
                id: 2
            }
        }
    },
    methods: {
        ...mapActions(useGuardStore,['getRole','getPriviledges','upsertRole']),
        closeModel() {
            this.model.model_open = false;
            this.$emit('close','update_role_model');
        },

        pushPriviledges(priviledge_id) {
            let children_ids = this.getChildrenIds(priviledge_id);
            let index = this.payload.priviledges.indexOf(priviledge_id);

            if ( index != -1 ) {
                this.payload.priviledges.splice(index,1);
            }

            for(var children_id of children_ids) {
                let index = this.payload.priviledges.indexOf(children_id);
                if ( index != -1 ) {
                    this.payload.priviledges.splice(index,1);
                }
            }
        },


        updateRole() {
            this.loading.role_upsert = true;
            this.upsertRole(this.payload,this.search).then((response) => {
                this.loading.role_upsert = false;
                if ( response.data.errors ) {
                    let data = response.data.errors[0].extensions.validation;
                    this.error.name  = data['input.name'] ? data['input.name'][0] : null;
                    this.error.priviledge = data['input.priviledge'] ? data['input.priviledge'][0] : null;
                } else {
                    this.model.model_open = false; 
                    this.$emit('upsertRole',response);
                    this.payload = {
                        name: "",
                        priviledges: [],
                        id: null
                    }
                }
            });
        },

        getChildrenIds(priviledge_id) {
            let priviledge = this.priviledges.find((x) => x.id == priviledge_id);

            if ( priviledge ) {
                return priviledge.children.map((x) => x.id);
            }
        },  

        disabledPriviledges(priviledge_parent_id) {
            return (this.payload.priviledges.includes(priviledge_parent_id)) ? false : true;        
        }
    },
    mounted() {
        this.loading.model = true;
        this.getPriviledges().then((response) => {
            this.priviledges = response.data.data.priviledges;
            this.getRole(this.role_id).then((response) => {
                let exist_priviledges = response.data.data.role.priviledges
                this.payload.name = response.data.data.role.name;
                this.payload.id = response.data.data.role.id;
                let priviledge_array = [];
                for ( var item of exist_priviledges ) {
                    priviledge_array.push(item.id);
                }
                this.payload.priviledges = priviledge_array;
                this.loading.model = false;
                this.model.model_open = true;
            });
        });
    }
}
</script>