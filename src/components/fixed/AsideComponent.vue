<template>
    <aside class="justify-start items-start flex-col fixed flex large bg-white" :class="{'collapse': !collectionStore.menu}" v-if="collectionStore.myScreen > 896">
        <div class="menus">
            <ul class="main">
                <ul class="team-menu menu  mt-3">
                    <h2 class=" font-semibold text-us text-gray-500 my-2" v-if="collectionStore.menu">Main</h2>

                    <li class="item py-2">
                        <router-link :to="{name: 'home'}">

                            <svg xmlns="http://www.w3.org/2000/svg" class="side-menu__icon pr-2" width="26" height="24" viewBox="0 0 24 24">
                                <path d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM9 9H5V5h4v4zm11-6h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1 6h-4V5h4v4zm-9 4H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zm-1 6H5v-4h4v4zm8-6c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z"></path>
                            </svg>

                            <span class="title text-xm  flex justify-center items-center " v-if="collectionStore.menu">Dashboard</span>

                        </router-link>
                    </li>

                    <h2 class=" font-semibold text-us text-gray-500 my-2" v-if="collectionStore.menu">User Managment</h2>

                    <li class="item py-2">
                        <router-link :to="{name: 'monitoring'}">

                            <svg class="svg-icon pr-2" xmlns="http://www.w3.org/2000/svg" height="24" width="26" viewBox="0 0 24 24">
                                <path d="M0 0h24v24H0V0z" fill="none"></path>
                                <path d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"></path>
                            </svg>

                            <span class="title text-xm flex justify-center items-center" v-if="collectionStore.menu">Monitoring</span>
                            
                        </router-link>
                    </li>

                    <li class="item py-2" v-if="hasPriviledges('colleges')">
                        <router-link :to="{name: 'colleges'}">
                            
                            <svg class="svg-icon pr-2" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="26">
                                <path d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"></path></svg>
                            <span class="title text-xm flex justify-center items-center" v-if="collectionStore.menu">Colleges</span>
                        
                        </router-link>
                    </li>
                    <li class="item py-2">
                        <router-link :to="{name: 'roles'}" @click="this.collectionStore.smallMenu = true">

                            <svg class="svg-icon pr-2" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="26">
                                <path d="M0 0h24v24H0V0z" fill="none"></path>
                                <path d="M22.61 18.99l-9.08-9.08c.93-2.34.45-5.1-1.44-7C9.79.61 6.21.4 3.66 2.26L7.5 6.11 6.08 7.52 2.25 3.69C.39 6.23.6 9.82 2.9 12.11c1.86 1.86 4.57 2.35 6.89 1.48l9.11 9.11c.39.39 1.02.39 1.41 0l2.3-2.3c.4-.38.4-1.01 0-1.41zm-3 1.6l-9.46-9.46c-.61.45-1.29.72-2 .82-1.36.2-2.79-.21-3.83-1.25C3.37 9.76 2.93 8.5 3 7.26l3.09 3.09 4.24-4.24-3.09-3.09c1.24-.07 2.49.37 3.44 1.31 1.08 1.08 1.49 2.57 1.24 3.96-.12.71-.42 1.37-.88 1.96l9.45 9.45-.88.89z"></path>
                            </svg>

                            <span class="title text-xm flex justify-center items-center" v-if="collectionStore.menu">Roles</span>
                            
                        </router-link>
                    </li> 
                </ul>
                 <!-- Start:System Managment -->
                <ul class="system-menu menu">
                    <h2 class=" font-semibold text-us text-gray-500 my-2" v-if="collectionStore.menu">System Managment</h2>
                    <li class="item py-2">
                        <router-link :to="{name: 'status'}" @click="this.collectionStore.smallMenu = true">
                            <i class="fa-solid fa-users-gear pr-2 dark:text-white"></i>
                            <span class="title text-xm flex justify-center items-center" v-if="collectionStore.menu">Status</span>
                        </router-link>
                    </li> 
                    <li class="item py-2">
                        <router-link :to="{name: 'requests'}" @click="this.collectionStore.smallMenu = true">
                            <i class="fa-solid fa-code-pull-request pr-2 dark:text-white"></i>
                            <span class="title text-xm flex justify-center items-center" v-if="collectionStore.menu">Request</span>
                        </router-link>
                    </li> 
                     <li class="item py-2">
                        <router-link :to="{name: 'attending'}" @click="this.collectionStore.smallMenu = true">
                            <i class="fa-solid fa-layer-group pr-2 dark:text-white"></i>
                            <span class="title text-xm flex justify-center items-center" v-if="collectionStore.menu">Attending profile</span>
                        </router-link>
                    </li>
                     <li class="item py-2">
                        <router-link :to="{name: 'profile',params:{id: user.id}}" @click="this.collectionStore.smallMenu = true">
                            <i class="fa-solid fa-address-card pr-2 dark:text-white"></i>
                            <span class="title text-xm flex justify-center items-center" v-if="collectionStore.menu">My Profile</span>
                        </router-link>
                    </li> 
                </ul>
                <!-- End:System Managment -->
            </ul>
        </div>
    </aside>
    <aside class="justify-start items-start flex-col fixed transition-all flex  small top-0 z-1000" :class="{'collapse': ! collectionStore.smallMenu}" v-if="collectionStore.myScreen < 896">
        <div class="flex justify-between w-full cursor-pointer items-center">
            <LogoComponents class="lg:hidden block"></LogoComponents>
            <button class="" @click="this.collectionStore.smallMenu =! this.collectionStore.smallMenu">
                <i class="fa-solid fa-xmark to-gray-800"></i>
            </button>
        </div>
        <div class="menus">
            <ul class="main small">
                <!-- Start:Team Managment -->
                <ul class="team-menu menu  mt-3">
                    <li class="item py-2">
                        <router-link :to="{name: 'home'}" @click="this.collectionStore.smallMenu = true">
                            <font-awesome-icon icon="chart-line" class="icon pr-2 "/>
                            <span class="title text-xm flex justify-center items-center" v-if="this.collectionStore.smallMenu">Dashboard</span>
                        </router-link>
                    </li>
                    <li class="item py-2">
                        <router-link :to="{name: 'monitoring'}" @click="this.collectionStore.smallMenu = true">
                            <font-awesome-icon icon="tv" class="icon pr-2"/>
                            <span class="title text-xm flex justify-center items-center" v-if="this.collectionStore.smallMenu">Monitoring</span>
                        </router-link>
                    </li>
                    <li class="item py-2">
                        <router-link :to="{name: 'colleges'}">
                            <font-awesome-icon icon="user" class="icon pr-2"/>
                            <span class="title text-xm flex justify-center items-center">Colleges</span>
                        </router-link>
                    </li>
                </ul>
                <!-- End:Team Managment -->

                <!-- Start:System Managment -->
                <ul class="system-menu menu mt-3">
                    <li class="item py-2">
                        <router-link :to="{name: 'status'}" @click="this.collectionStore.smallMenu = true">
                            <font-awesome-icon icon="chart-line" class="icon pr-2 "/>
                            <span class="title text-xm flex justify-center items-center">Status Managment</span>
                        </router-link>
                    </li> 
                    <li class="item py-2">
                        <router-link :to="{name: 'home'}" @click="this.collectionStore.smallMenu = true">
                            <font-awesome-icon icon="chart-line" class="icon pr-2 "/>
                            <span class="title text-xm flex justify-center items-center">Request Managment</span>
                        </router-link>
                    </li> 
                    <li class="item py-2">
                        <router-link :to="{name: 'home'}" @click="this.collectionStore.smallMenu = true">
                            <font-awesome-icon icon="chart-line" class="icon pr-2 "/>
                            <span class="title text-xm flex justify-center items-center">Accessablity</span>
                        </router-link>
                    </li> 
                </ul>
                <!-- End:System Managment -->
            </ul>
        </div>
    </aside>
    <div class="overlay fixed top-0 bg-black">

    </div>
</template>

<script>

import { mapActions, mapState, mapStores } from 'pinia';
import { useCollectionStore } from "@/stores/collection";
import LogoComponents from './LogoComponents.vue';
import { useAuthStore } from '../../stores/Auth';
import { useGuardStore } from '../../stores/Guard';

export default {
    computed: {
        ...mapStores(useCollectionStore),
        ...mapState(useAuthStore,['user']),
        ...mapState(useGuardStore,['priviledges'])
    },
    methods: {
        ...mapActions(useGuardStore,['hasPriviledges'])
    },
    components: { LogoComponents },
    mounted() {
    }
}
</script>