import { defineStore } from 'pinia';

export const useCollectionStore = defineStore('collection', {
    state: () => {
        return {
            menu: true,
            smallMenu: false,
            myScreen: null
        }
    },
    getters: {
        menuToggle: (state) => (state.menu) ? false : true,
    },
    actions: {
        windowSize(state) {
            this.myScreen = window.innerWidth;
            window.addEventListener("resize", () => {
                this.myScreen = window.innerWidth;
            });
        }
    }
})