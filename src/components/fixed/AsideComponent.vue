<template>
    <aside class="justify-start items-start flex-col fixed flex large" :class="{'collapse': !collectionStore.menu}" v-if="collectionStore.myScreen > 896">
        <div class="menus">
            <ul class="main">
                <ul class="team-menu menu  mt-3">
                    <li class="item py-2">
                        <router-link :to="{name: 'home'}">
                            <i class="fa-solid fa-gauge pr-2"></i>
                            <span class="title" v-if="collectionStore.menu">Dashboard</span>
                        </router-link>
                    </li>
                    <li class="item py-2">
                        <router-link :to="{name: 'monitoring'}">
                            <i class="fa-solid fa-display pr-2"></i>
                            <span class="title" v-if="collectionStore.menu">Monitoring</span>
                        </router-link>
                    </li>
                    <li class="item py-2">
                        <router-link :to="{name: 'colleges'}">
                            <font-awesome-icon icon="user" class="icon pr-2"/>
                            <span class="title" v-if="collectionStore.menu">Colleges</span>
                        </router-link>
                    </li>
                    <li class="item py-2" v-if="user.priviledges.includes(7)">
                        <router-link :to="{name: 'home'}" @click="this.collectionStore.smallMenu = true">
                            <i class="fa-solid fa-dice-d20 pr-2"></i>
                            <span class="title" v-if="collectionStore.menu">Roles</span>
                        </router-link>
                    </li> 
                    <li class="item py-2">
                        <router-link :to="{name: 'home'}" @click="this.collectionStore.smallMenu = true">
                            <i class="fa-solid fa-layer-group pr-2"></i>
                            <span class="title" v-if="collectionStore.menu">My team</span>
                        </router-link>
                    </li>
                     <li class="item py-2">
                        <router-link :to="{name: 'profile',params:{id: user.id}}" @click="this.collectionStore.smallMenu = true">
                            <i class="fa-solid fa-address-card pr-2"></i>
                            <span class="title" v-if="collectionStore.menu">My Profile</span>
                        </router-link>
                    </li> 
                </ul>
                 <!-- Start:System Managment -->
                <ul class="system-menu menu">
                    <li class="item py-2">
                        <router-link :to="{name: 'home'}" @click="this.collectionStore.smallMenu = true">
                            <i class="fa-solid fa-users-gear pr-2"></i>
                            <span class="title" v-if="collectionStore.menu">Status</span>
                        </router-link>
                    </li> 
                    <li class="item py-2">
                        <router-link :to="{name: 'home'}" @click="this.collectionStore.smallMenu = true">
                            <i class="fa-solid fa-code-pull-request pr-2"></i>
                            <span class="title" v-if="collectionStore.menu">Request</span>
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
                            <span class="title" v-if="this.collectionStore.smallMenu">Dashboard</span>
                        </router-link>
                    </li>
                    <li class="item py-2">
                        <router-link :to="{name: 'monitoring'}" @click="this.collectionStore.smallMenu = true">
                            <font-awesome-icon icon="tv" class="icon pr-2"/>
                            <span class="title" v-if="this.collectionStore.smallMenu">Monitoring</span>
                        </router-link>
                    </li>
                    <li class="item py-2">
                        <router-link :to="{name: 'colleges'}">
                            <font-awesome-icon icon="user" class="icon pr-2"/>
                            <span class="title">Colleges</span>
                        </router-link>
                    </li>
                </ul>
                <!-- End:Team Managment -->

                <!-- Start:System Managment -->
                <ul class="system-menu menu mt-3">
                    <li class="item py-2">
                        <router-link :to="{name: 'home'}" @click="this.collectionStore.smallMenu = true">
                            <font-awesome-icon icon="chart-line" class="icon pr-2 "/>
                            <span class="title">Status Managment</span>
                        </router-link>
                    </li> 
                    <li class="item py-2">
                        <router-link :to="{name: 'home'}" @click="this.collectionStore.smallMenu = true">
                            <font-awesome-icon icon="chart-line" class="icon pr-2 "/>
                            <span class="title">Request Managment</span>
                        </router-link>
                    </li> 
                    <li class="item py-2">
                        <router-link :to="{name: 'home'}" @click="this.collectionStore.smallMenu = true">
                            <font-awesome-icon icon="chart-line" class="icon pr-2 "/>
                            <span class="title">Accessablity</span>
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

import { mapState, mapStores } from 'pinia';
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
        
    },
    components: { LogoComponents },
    mounted() {
        console.log(this.priviledges);
    }
}
</script>