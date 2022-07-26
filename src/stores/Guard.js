import { defineStore } from "pinia";
import {useAuthStore} from './Auth.js';

export const useGuardStore = defineStore('guard', {
    state: () => {
        return {
           priviledges: useAuthStore().user.priviledges
        }
    },
    getters: {
       
    },
    actions: {
       
    }
})