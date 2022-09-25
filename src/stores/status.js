import { defineStore } from "pinia";
import {useAuthStore} from './Auth.js';
import axios from "axios";

export const useStatusestore = defineStore('statuses', {
    state: () => {
        return {
            auth_token: localStorage.getItem('auth_token'),
        }
    },

    actions: {
        getStatus(payload) {
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
                        status(id:${payload.id}) {
                           name,
                           color
                        }
                    }
                    `
                }
            })
        },

        getStatusesList(payload,page) {
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
                        statuses(page:${payload.page},input: {
                            name: "${payload.name}"
                        }) {
                            data {
                               name,
                               id,
                               color
                            }
                        }
                    }
                    `
                }
            })
        },

        getAllStatuses() {
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
                        statusesall {
                            name,
                            id,
                        }
                    }
                    `
                }
            })
        },

        upsertStatuses(payload,search) {
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
                            statusupsert(input:{
                            name: "${payload.name}",
                            color: "${payload.color}"
                            id: ${payload.id}
                        }) {
                            status,
                            statuses(page: ${search.page} ,input: {
                                name: "${search.name}"
                            }) {
                                data {
                                    id,
                                    name,
                                    color
                                }
                            }
                        }
                    }`,
                }
            })
        },

        deleteStatuses(payload,search) {
            console.log(search)
            console.log(search.name)
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
                        statusdelete(id: ${payload.id},password:"${payload.password}") {
                            status,
                            statuses(page:${search.page},input:{
                                name: "${search.name}" ,
                            }) {
                                data {
                                    id,
                                    name,
                                    color
                                }
                            }
                        }
                    }`,
                }
            })
        }
    }
});