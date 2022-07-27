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
       hasPriviledges(name) {
            if ( name == 'role' ) {
                return this.priviledges.includes(7 || 8)
            }

            if ( name == 'colleges' ) {
                return this.priviledges.some(x => x.id == 1 || x.id == 2 )
            }

            return true;
       }
    }
})