<template>
    <nav class="navbar bg-white dark:bg-dark-300  main w-full px-4 flex items-center z-2000 ">
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
            <li class="px-2" @click="toggleDarkMode()">
                <img src="@/assets/img/icon/moon.png" alt="person" class=" w-5 mx-4 " v-if="!dark">
                <img src="@/assets/img/icon/sun.png" alt="person" class=" w-5 mx-4 " v-if="dark">
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
                dark: true,
                html: document.documentElement,
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
            },

            toggleDarkMode() {
                let theme = localStorage.getItem("theme");
                if ( theme ) {
                    let alternate = (theme == 'dark') ? 'light' : 'dark'; 
                    this.html.classList.add(alternate);
                    this.html.classList.remove(theme);
                    localStorage.setItem('theme',alternate);
                    this.dark = (theme == 'dark') ? false : true; 
                } else {
                    localStorage.setItem('theme','light');
                }
            }
        },

        mounted() {
            let theme = localStorage.getItem("theme");

            if ( theme == 'dark' ) {
                this.html.classList.add('dark');
                this.html.classList.remove('light');
                this.dark = true;
            } else {
                this.html.classList.remove('dark');
                this.html.classList.add('light');
                this.dark = false;
            }
        }
    }
</script>