import { defineStore } from "pinia";
import {useAuthStore} from './Auth.js';
import axios from "axios";

export const useGuardStore = defineStore('guard', {
    state: () => {
        return {
           auth: useAuthStore().$state,
           auth_token: localStorage.getItem('auth_token'),
        }
    },
    getters: {
       
    },
    actions: {
        hasPriviledges(name) {
            if (!this.auth.user.role) {
                return false;
            }
            let priviledges = this.auth.user.role.priviledges;
            if ( this.auth.user.role.id == 1 || this.auth.user.role.id == 2 ) {
                return true;
            }

            if ( name == 'role' ) {
                return priviledges.find(x => x.id == 8 || 7);
            }

            if ( name == 'colleges' ) {
                return priviledges.find(x => x.id == 1 || x.id == 2 )
            }

            return true;
        },

        getPriviledges() {
            return axios({
                method: "POST",
                url: import.meta.env.VITE_APP_END_POINT+'/graphql',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.auth_token}`
                },
                data: {
                    query: `
                    query {
                        priviledges {
                           name,
                           parent,
                           id,
                           parent_id
                           children {
                             name,
                             id,
                             parent_id
                          }
                        }
                    }
                    `
                }
            })
        },

        arrification(json) {
            let array = [];

            for (var key in json){
                var value = json[key];
                array.push(value);
            }

            return array;
        },

        upsertRole(payload,search) {

            return axios({
                method: "POST",
                url: import.meta.env.VITE_APP_END_POINT+'/graphql',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.auth_token}`
                },
                data: {
                    query: `
                    mutation roleupsert($name: String,$priviledges: [ID],$id: ID) {
                        roleupsert(input: {name: $name,priviledges: $priviledges,id: $id}){
                            status
                                roles(page:${search.page},input: {
                                    name: "${search.name}",
                                    
                                    }) {
                                    data {
                                        name,
                                        id,
                                        users {
                                            id
                                        }
                                    }
                                }
                        }
                    }`,
                    variables: {
                        name: payload.name,
                        priviledges: payload.priviledges,
                        id: payload.id ?? null
                    }
                }
            })
        },

        getRole(role_id) {
            return axios({
                method: "POST",
                url: import.meta.env.VITE_APP_END_POINT+'/graphql',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.auth_token}`
                },
                data: {
                    query: `
                    query {
                        role(id: ${role_id}) {
                          name,
                          id,
                          priviledges {
                           id,
                        }
                       }
                    }
                    `
                }
            });
        },

        getRolesList(search) {
            return axios({
                    method: "POST",
                    url: import.meta.env.VITE_APP_END_POINT+'/graphql',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${this.auth_token}`
                    },
                    data: {
                        query: `
                        query {
                            roles(input:{
                                name: "${search.name}"
                              }) {
                               data {
                                 name,
                                 id
                                 users {
                                   name
                                }
                              }
                            }
                          }
                        `
                    }
            })
        },

        deleteRole(payload) {
            return axios({
                method: "POST",
                url: import.meta.env.VITE_APP_END_POINT+'/graphql',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.auth_token}`
                },
                data: {
                    query: `
                    mutation {
                        roledelete(id: ${payload.id},password:"${payload.password}") {
                            status,
                            roles(first:40) {
                                data {
                                    name
                                    users {
                                        id
                                    }
                                }
                            }
                        }
                    }
                    `
                }
            })
        }

    }
})