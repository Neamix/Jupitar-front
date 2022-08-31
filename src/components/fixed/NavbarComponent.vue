<template>
    <nav class="navbar bg-white main w-full px-4 flex items-center z-2000 ">
        <LogoComponents class="hidden lg:block"></LogoComponents>
        <!-- Start:Menu Key -->
        <div class="menu px-4 cursor-pointer" @click="toggleSideNav()">
            <svg viewBox="64 64 896 896" focusable="false" data-icon="menu-fold" width="1em" height="1em" fill="#5e5e5e"
                class="text-svg" aria-hidden="true">
                <path
                    d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM115.4 518.9L271.7 642c5.8 4.6 14.4.5 14.4-6.9V388.9c0-7.4-8.5-11.5-14.4-6.9L115.4 505.1a8.74 8.74 0 000 13.8z">
                </path>
            </svg>
        </div>
        <!-- End:Menu Key -->

        <ul class="ml-auto px-4 flex items-center">
            <li class="px-2 relative">
                <svg viewBox="64 64 896 896" focusable="false" data-icon="bell" width="1em" height="1em" fill="#5e5e5e"
                    class="text-svg mx-2 cursor-pointer" @click="toggleMenus('notification')" aria-hidden="true">
                    <path
                        d="M816 896h-24V428c0-141.1-104.3-257.7-240-277.1V112c0-22.1-17.9-40-40-40s-40 17.9-40 40v38.9c-135.7 19.4-240 136-240 277.1v340h-24c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h216c0 61.8 50.2 112 112 112s112-50.2 112-112h216c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM512 888c-26.5 0-48-21.5-48-48h96c0 26.5-21.5 48-48 48zM304 896V428c0-55.6 21.6-107.8 60.9-147.1S456.4 220 512 220c55.6 0 107.8 21.6 147.1 60.9S720 372.4 720 428v340H304z">
                    </path>
                </svg>

                <!-- Start:Notification -->
                <MenuSlot>
                    <div class="dropdown absolute mt-8 rounded-md bg-white shadow-md p-4 wide left-min-83 "
                        v-if="dropmenu.notification">
                        <ul>
                            <li class="flex items-center border-b-2 pb-2">
                                <img src="@/assets/img/thumb-1.jpg" class="avatar" />
                                <p class="text-xs ml-2">
                                    <span class="font-semibold">Amer Jack</span> Changed Profile that you watching
                                </p>
                            </li>
                            <li class="flex items-center mt-2 border-b-2 pb-2">
                                <img src="@/assets/img/thumb-2.jpg" class="avatar" />
                                <p class="text-xs ml-2">
                                    <span class="font-semibold">Amer Jack</span> Changed Profile that you watching
                                </p>
                            </li>
                            <li class="flex items-center mt-2">
                                <img src="@/assets/img/thumb-3.jpg" class="avatar" />
                                <p class="text-xs ml-2">
                                    <span class="font-semibold">Amer Jack</span> Changed Profile that you watching
                                </p>
                            </li>
                        </ul>
                        <p class="w-full to-cyan-800 text-xs text-center mt-4 font-semibold cursor-pointer">Show all
                            notification</p>
                    </div>
                </MenuSlot>
                <!-- End:Notification -->
            </li>

            <li class="px-2">
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="global" width="1em" height="1em"
                        fill="#5e5e5e" class="text-svg mx-2 cursor-pointer" @click="toggleMenus('language')"
                        aria-hidden="true">
                        <path
                            d="M854.4 800.9c.2-.3.5-.6.7-.9C920.6 722.1 960 621.7 960 512s-39.4-210.1-104.8-288c-.2-.3-.5-.5-.7-.8-1.1-1.3-2.1-2.5-3.2-3.7-.4-.5-.8-.9-1.2-1.4l-4.1-4.7-.1-.1c-1.5-1.7-3.1-3.4-4.6-5.1l-.1-.1c-3.2-3.4-6.4-6.8-9.7-10.1l-.1-.1-4.8-4.8-.3-.3c-1.5-1.5-3-2.9-4.5-4.3-.5-.5-1-1-1.6-1.5-1-1-2-1.9-3-2.8-.3-.3-.7-.6-1-1C736.4 109.2 629.5 64 512 64s-224.4 45.2-304.3 119.2c-.3.3-.7.6-1 1-1 .9-2 1.9-3 2.9-.5.5-1 1-1.6 1.5-1.5 1.4-3 2.9-4.5 4.3l-.3.3-4.8 4.8-.1.1c-3.3 3.3-6.5 6.7-9.7 10.1l-.1.1c-1.6 1.7-3.1 3.4-4.6 5.1l-.1.1c-1.4 1.5-2.8 3.1-4.1 4.7-.4.5-.8.9-1.2 1.4-1.1 1.2-2.1 2.5-3.2 3.7-.2.3-.5.5-.7.8C103.4 301.9 64 402.3 64 512s39.4 210.1 104.8 288c.2.3.5.6.7.9l3.1 3.7c.4.5.8.9 1.2 1.4l4.1 4.7c0 .1.1.1.1.2 1.5 1.7 3 3.4 4.6 5l.1.1c3.2 3.4 6.4 6.8 9.6 10.1l.1.1c1.6 1.6 3.1 3.2 4.7 4.7l.3.3c3.3 3.3 6.7 6.5 10.1 9.6 80.1 74 187 119.2 304.5 119.2s224.4-45.2 304.3-119.2a300 300 0 0010-9.6l.3-.3c1.6-1.6 3.2-3.1 4.7-4.7l.1-.1c3.3-3.3 6.5-6.7 9.6-10.1l.1-.1c1.5-1.7 3.1-3.3 4.6-5 0-.1.1-.1.1-.2 1.4-1.5 2.8-3.1 4.1-4.7.4-.5.8-.9 1.2-1.4a99 99 0 003.3-3.7zm4.1-142.6c-13.8 32.6-32 62.8-54.2 90.2a444.07 444.07 0 00-81.5-55.9c11.6-46.9 18.8-98.4 20.7-152.6H887c-3 40.9-12.6 80.6-28.5 118.3zM887 484H743.5c-1.9-54.2-9.1-105.7-20.7-152.6 29.3-15.6 56.6-34.4 81.5-55.9A373.86 373.86 0 01887 484zM658.3 165.5c39.7 16.8 75.8 40 107.6 69.2a394.72 394.72 0 01-59.4 41.8c-15.7-45-35.8-84.1-59.2-115.4 3.7 1.4 7.4 2.9 11 4.4zm-90.6 700.6c-9.2 7.2-18.4 12.7-27.7 16.4V697a389.1 389.1 0 01115.7 26.2c-8.3 24.6-17.9 47.3-29 67.8-17.4 32.4-37.8 58.3-59 75.1zm59-633.1c11 20.6 20.7 43.3 29 67.8A389.1 389.1 0 01540 327V141.6c9.2 3.7 18.5 9.1 27.7 16.4 21.2 16.7 41.6 42.6 59 75zM540 640.9V540h147.5c-1.6 44.2-7.1 87.1-16.3 127.8l-.3 1.2A445.02 445.02 0 00540 640.9zm0-156.9V383.1c45.8-2.8 89.8-12.5 130.9-28.1l.3 1.2c9.2 40.7 14.7 83.5 16.3 127.8H540zm-56 56v100.9c-45.8 2.8-89.8 12.5-130.9 28.1l-.3-1.2c-9.2-40.7-14.7-83.5-16.3-127.8H484zm-147.5-56c1.6-44.2 7.1-87.1 16.3-127.8l.3-1.2c41.1 15.6 85 25.3 130.9 28.1V484H336.5zM484 697v185.4c-9.2-3.7-18.5-9.1-27.7-16.4-21.2-16.7-41.7-42.7-59.1-75.1-11-20.6-20.7-43.3-29-67.8 37.2-14.6 75.9-23.3 115.8-26.1zm0-370a389.1 389.1 0 01-115.7-26.2c8.3-24.6 17.9-47.3 29-67.8 17.4-32.4 37.8-58.4 59.1-75.1 9.2-7.2 18.4-12.7 27.7-16.4V327zM365.7 165.5c3.7-1.5 7.3-3 11-4.4-23.4 31.3-43.5 70.4-59.2 115.4-21-12-40.9-26-59.4-41.8 31.8-29.2 67.9-52.4 107.6-69.2zM165.5 365.7c13.8-32.6 32-62.8 54.2-90.2 24.9 21.5 52.2 40.3 81.5 55.9-11.6 46.9-18.8 98.4-20.7 152.6H137c3-40.9 12.6-80.6 28.5-118.3zM137 540h143.5c1.9 54.2 9.1 105.7 20.7 152.6a444.07 444.07 0 00-81.5 55.9A373.86 373.86 0 01137 540zm228.7 318.5c-39.7-16.8-75.8-40-107.6-69.2 18.5-15.8 38.4-29.7 59.4-41.8 15.7 45 35.8 84.1 59.2 115.4-3.7-1.4-7.4-2.9-11-4.4zm292.6 0c-3.7 1.5-7.3 3-11 4.4 23.4-31.3 43.5-70.4 59.2-115.4 21 12 40.9 26 59.4 41.8a373.81 373.81 0 01-107.6 69.2z">
                        </path>
                    </svg>

                    <!-- Start:Languages -->
                    <MenuSlot>
                        <ul class="dropdown absolute rounded-md mt-8 bg-white shadow-md p-4 right-2" v-if="dropmenu.language">
                            <li class="flex">
                                <img src="@/assets/img/system/en.png" class="w-5" />
                                <span class="text-xs font-bold ml-2">English</span>
                            </li>
                            <li class="flex mt-2">
                                <img src="@/assets/img/system/fr.png" class="w-5" />
                                <span class="text-xs font-bold ml-2">French</span>
                            </li>
                        </ul>
                    </MenuSlot>
                    <!-- End:Languages -->

                </li>
                <li class="px-2">
                    <img :src="avatar" alt="person" class="rounded-full w-10">
                </li>
                <li class="px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="#000" focusable="false"
                        viewBox="0 0 24 24" class="vt-switch-appearance-sun">
                        <path
                            d="M12,18c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,18,12,18zM12,8c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4c2.2,0,4-1.8,4-4C16,9.8,14.2,8,12,8z">
                        </path>
                        <path d="M12,4c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,3.6,12.6,4,12,4z"></path>
                        <path d="M12,24c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,23.6,12.6,24,12,24z"></path>
                        <path
                            d="M5.6,6.6c-0.3,0-0.5-0.1-0.7-0.3L3.5,4.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C6.2,6.5,5.9,6.6,5.6,6.6z">
                        </path>
                        <path
                            d="M19.8,20.8c-0.3,0-0.5-0.1-0.7-0.3l-1.4-1.4c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C20.3,20.7,20,20.8,19.8,20.8z">
                        </path>
                        <path d="M3,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S3.6,13,3,13z"></path>
                        <path d="M23,13h-2c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S23.6,13,23,13z"></path>
                        <path
                            d="M4.2,20.8c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C4.7,20.7,4.5,20.8,4.2,20.8z">
                        </path>
                        <path
                            d="M18.4,6.6c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C18.9,6.5,18.6,6.6,18.4,6.6z">
                        </path>
                    </svg> 
                </li>
        </ul>
    </nav>
</template>

<script>
    import { mapActions, mapState, mapWritableState} from 'pinia';
    import MenuSlot from "@/components/slots/MenuSlot.vue";
    import LogoComponents from './LogoComponents.vue';
    import { useAuthStore } from '../../stores/Auth';
    import { useCollectionStore } from '../../stores/collection';
    
    export default {
        components: { MenuSlot, LogoComponents },
        data() {
            return {
                url: import.meta.env.VITE_APP_END_POINT + '/',
                dropmenu: {
                    language: false,
                    notification: false,
                },
            }
        },

        computed: {
            ...mapWritableState(useAuthStore,['userProfile','user']),
            ...mapWritableState(useCollectionStore,['myScreen','menu','smallMenu']),
            avatar() {
                if ( this.user.avatar ) {
                    return this.url +'storage/images/avatar/small/'+this.user.avatar
                } else {
                    return this.url+'storage/images/system/default.png';
                }
            },
        },

        watch: {
            user() {
            }
        },

        methods: {
            ...mapActions(useCollectionStore,['windowSize']),
            toggleSideNav() {
                this.menuTest = false;
                if(this.myScreen  > 769) {
                    this.menu = !this.menu
                } else {
                    this.smallMenu = false;
                }

                if(this.myScreen < 768) {
                    this.smallMenu = !this.smallMenu;
                }

            },
            toggleMenus(myKey) {
                Object.keys(this.dropmenu).map((key,index) => {
                    if(key == myKey) { 
                        
                        this.dropmenu[key] =  this.dropmenu[key] ? false : true;
                    } 

                    else {
                        this.dropmenu[key] = false
                    }
                })
            }
        },

        mounted() {
            
        }
    }
</script>