import { defineStore } from "pinia";
import {useAuthStore} from './Auth.js';
import axios from "axios";

export const useRequestStore = defineStore('request', {
    state: () => {
        return {
            auth_token: localStorage.getItem('auth_token'),
        }
    },

    actions: {
        getRequest(payload) {
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
                        request(id:${payload.id}) {
                           name,
                           requestType {
                             type,
                             id
                          }
                        }
                    }
                    `
                }
            })
        },

        getRequestsList(payload,page) {
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
                        requests(page:${payload.page},input: {
                            name: "${payload.name}"
                        }) {
                            data {
                               name,
                               id,
                               requestType {
                                 id,
                                 type
                              }
                            }
                        }
                    }
                    `
                }
            })
        },

        getAllRequests() {
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
                        requestall {
                            name,
                            id,
                            requestType {
                              id,
                              type
                            }
                        }
                    }
                    `
                }
            })
        },

        upsertRequest(payload,search) {
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
                            requestupsert(input:{
                            name: "${payload.name}",
                            type: ${payload.type_id},
                            id: ${payload.id}
                        }) {
                            status,
                            requests(page: ${search.page} ,input: {
                                name: "${search.name}"
                            }) {
                                data {
                                    id,
                                    name,
                                    requestType {
                                        id,
                                        type
                                    }
                                }
                            }
                        }
                    }`,
                }
            })
        },

        deleteRequest(payload,search) {
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
                        requestdelete(id: ${payload.id},password:"${payload.password}") {
                            status,
                            requests(page:${search.page},input:{
                                name: "${search.name}" ,
                            }) {
                                data {
                                    id,
                                    name,
                                    requestType {
                                        id,
                                        type
                                    }
                                }
                            }
                        }
                    }`,
                }
            })
        }
    }
});