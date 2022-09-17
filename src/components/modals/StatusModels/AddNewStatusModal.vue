<template>
    <div
        class="overview fixed z-1000 w-full h-full-screen bg-shadow top-0 left-0 flex justify-center  items-center">
        <Transition name="menu" appear>
            <div class="modal bg-white rounded-md min-w-992 max-w-lg grid grid-cols-2">
                <img src="@/assets/img/models/travel.svg" class="w-full max-w-lg p-4 " alt="team" />
                <div class="p-5 relative">
                    <h2 class="font-extrabold text-headline ">Let's take part time off</h2>
                    <div class="mt-4 h-full">
                        <div class="status_info">
                            <label class="label pb-1">Status name</label>
                            <input type="name" class="input w-full" placeholder="Howdy Status" v-model="payload.name"/>
                            <p class="error">{{ error.name }}</p>
                        </div>
                        <div class="grid grid-cols-1 mt-3">
                            <div class="group p-1">
                                <label class="label pb-1">Status type</label>
                                <div class="select relative" @click="dropdown.statusMenu =! dropdown.statusMenu ">
                                    <input type="color" v-model="payload.color">
                                </div>
                            </div>
                        </div>
                        <div class="flex absolute bottom-0 right-3">
                            <button class="relative right-2 my-5 mx-1 text-xs font-semibold bg-blue-600 py-2 px-10 rounded-sm text-white flex" @click="addStatus()">
                                Add status
                                <svg class="loader-auth absolute w-5" viewBox="0 0 50 50" v-if="loading.add"  style="right:7%">
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
            add: false,
          },
          payload: {
            name: "",
            id: null,
            color: "#000",
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
        addStatus() {
            this.loading.add = true;
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
                        type: "Daily",
                        type_id: 1,
                    }
                }

                this.loading.add = false;
            })
        },
        closeModel() {
            this.$emit('close','new_status_model');
        }
    },
    mounted() {
        console.log(this.search)
    }
}
</script>