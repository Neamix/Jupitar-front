<template>
    <div class="loading h-full-screen" v-if="isLoading">
        <svg class="spinner" viewBox="0 0 50 50">
            <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
        </svg>
    </div>
    <Transition name="menu">
        <PageSlotVue v-if="!isLoading">
                <div class="profile mb-4">
                <div class="banner p-3" :style="{'background-image': 'url('+cover+') !important'}" >
                    <button  v-if="isMyProfile" class="text-xs  flex outline-0 outline-hidden items-center py-1 px-3 border-white border-2 rounded-sm  relative ml-auto bg-white text-black " @click="models.cover = true">
                        <i class="fa-solid fa-pencil"></i>
                        <p class="mx-2">Edit Cover</p>
                    </button>
                </div>
                <div class="user">
                    <div class="container px-10 w-auto flex">
                        <img :src="avatar" alt="person" class="rounded-full w-40 h-40">
                        <div class="user-info pt-10 px-5 ">
                            <h2 class=" text-white font-semibold text-lg">
                                {{ userProfile.name }}
                                <button class="text-xs px-2" @click="models.avatar = true" v-if="isMyProfile">
                                    <i class="fa-solid fa-pencil"></i>
                                </button>
                            </h2>
                            <h4 class=" text-zinc-200 text-xs ">{{ userProfile.email }}</h4>
                        </div>
                        <button class="btn">
                        </button>
                    </div>
                </div>

                <div class="grid gap-4 grid-cols-2 mt-14">
                    <div class="card p-4">
                        <h2 class="uppercase font-bold border-l-2 px-2 border-blue-500 text-xs">Available Requests</h2>
                        <div class="card-body p-2 flex items-center h-full">
                            <div class="request-container grid grid-cols-2">
                                <p class="text-xs pb-2">
                                    <span class="font-semibold">Normal Leave:</span>
                                    <span class="px-2">16 Days Left</span>
                                </p>
                                <p class="text-xs pb-2">
                                    <span class="font-semibold">Emergence Leave:</span>
                                    <span class="px-2">10 Days Left</span>
                                </p>
                                <p class="text-xs pb-2">
                                    <span class="font-semibold">Permissions:</span>
                                    <span class="px-2">4 hours Left</span>
                                </p>
                                <p class="text-xs pb-2">
                                    <span class="font-semibold">Sick leave:</span>
                                    <span class="px-2">5 Days left</span>
                                </p>
                                <p class="text-xs pb-2">
                                    <span class="font-semibold">Half day:</span>
                                    <span class="px-2">5 Days left</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="card p-4">
                        <h2 class="uppercase font-bold border-l-2 px-2 border-blue-500 text-xs">Latest Requests</h2>
                        <div class="card-body p-2">
                            <table class="w-full">
                                <thead class="w-full">
                                    <tr class="grid grid-cols-4 w-full">
                                        <th class="text-xs pb-2 font-semibold flex">Type</th>
                                        <th class="text-xs pb-2 font-semibold flex">From</th>
                                        <th class="text-xs pb-2 font-semibold flex">To</th>
                                        <th class="text-xs pb-2 font-semibold flex">Status</th>
                                    </tr>
                                </thead>
                                <tbody class="w-full">
                                    <tr class="grid grid-cols-4 w-full py-1">
                                        <td class="text-xs flex">Emergence leave</td>
                                        <td class="text-xs flex">7 June 2022</td>
                                        <td class="text-xs flex">9 June 2022</td>
                                        <td class="text-xs flex text-green-500 uppercase">Approved</td>
                                    </tr>
                                    <tr class="grid grid-cols-4 w-full py-1">
                                        <td class="text-xs flex">Normal leave</td>
                                        <td class="text-xs flex">10 June 2022</td>
                                        <td class="text-xs flex">12 June 2022</td>
                                        <td class="text-xs flex text-red-500 uppercase">Decline</td>
                                    </tr>
                                    <tr class="grid grid-cols-4 w-full py-1">
                                        <td class="text-xs">Permissions</td>
                                        <td class="text-xs">10 June 2022 20:55</td>
                                        <td class="text-xs">12 June 2022 21:55</td>
                                        <td class="text-xs text-yellow-500 uppercase">pending</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="grid gap-4 grid-cols-1 mt-5">
                    <div class="card p-4">
                        <h2 class="uppercase font-bold border-l-2 px-2 border-blue-500 text-xs">Abdalrhman's Assigned Tasks</h2>
                        <div class="card-body p-2 flex items-center h-full">
                            <table class="w-full">
                                <thead class="w-full">
                                    <tr class="grid grid-cols-4 w-full">
                                        <th class="text-xs pb-2 font-semibold flex">Task</th>
                                        <th class="text-xs pb-2 font-semibold flex">Assigned by</th>
                                        <th class="text-xs pb-2 font-semibold flex">Deadline</th>
                                        <th class="text-xs pb-2 font-semibold flex">Status</th>
                                    </tr>
                                </thead>
                                <tbody class="w-full">
                                    <tr class="grid grid-cols-4 w-full py-1">
                                        <td class="text-xs flex">Remove unessary data</td>
                                        <td class="text-xs flex">Aswald David</td>
                                        <td class="text-xs flex">9 June 2022</td>
                                        <td class="text-xs flex text-blue-500 uppercase">Progress</td>
                                    </tr>
                                    <tr class="grid grid-cols-4 w-full py-1">
                                        <td class="text-xs flex">Gather team data</td>
                                        <td class="text-xs flex">Aswald David</td>
                                        <td class="text-xs flex">12 June 2022</td>
                                        <td class="text-xs flex text-green-500 uppercase">Done</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class=" h-3 "></div>
            </div>
        </PageSlotVue>   
    </Transition>
    <Transition name="fade">
        <div class="overview fixed z-1000 w-full h-full-screen bg-shadow top-0 left-0 flex justify-center  items-center" v-if="models.avatar || models.cover">
            <Transition name="menu" appear>
                <AvatarModal v-if="models.avatar" @close="models.avatar = false"></AvatarModal>
            </Transition>
            <Transition name="menu" appear>
                <CoverModel v-if="models.cover" @close="models.cover = false"></CoverModel>
            </Transition>
        </div>
    </Transition>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import PageSlotVue from '../../components/slots/PageSlot.vue'
import { useAuthStore } from '../../stores/Auth';
import AvatarModal from '../../components/modals/ProfileModels/AvatarModal.vue'; 
import CoverModel from '../../components/modals/ProfileModels/CoverModel.vue';

export default {
    components: {PageSlotVue,AvatarModal,CoverModel},
    data() {
        return {
            url: import.meta.env.VITE_APP_END_POINT + '/',
            isLoading: true,
            buttons: {
                avatar: false,
            },
            models: {
                avatar: false,
                cover: false
            },

            userProfile: {}
        }
    },
    computed: {
        ...mapState(useAuthStore,['user']),
        avatar() {
            if ( this.userProfile.avatar ) {
                return this.url +'storage/images/avatar/small/'+this.userProfile.avatar
            } else {
                return this.url+'storage/images/system/default.png';
            }
        },
        cover() {
            if ( this.userProfile.cover ) {
                return this.url +'storage/images/avatar/small/'+this.userProfile.cover
            } else {
                return null;
            }   
        },
        isMyProfile() {
            if ( this.userProfile.id == this.user.id ) {
                return true;
            } else {
                return false;
            }
        }
    },
    methods: {
        ...mapActions(useAuthStore,['getProfile']),
    },
    mounted() {
        this.getProfile(this.$route.params.id).then((response) => {
            this.userProfile = response.data.data.user;
            if (this.userProfile.id == this.user.id ) {
                this.isMyProfile = true;
                this.userProfile = this.user;
            } else {
                this.isMyProfile = false;
            }

            this.isLoading = false; 
        });
    }
}
</script>