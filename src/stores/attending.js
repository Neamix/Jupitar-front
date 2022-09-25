import { defineStore } from "pinia";
import {useAuthStore} from './Auth.js';
import axios from "axios";

export const useAttendingStore = defineStore('attending', {
    state: () => {
        return {
            auth_token: localStorage.getItem('auth_token'),
        }
    },

    actions: {
        getAttending(payload) {
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
                        attending(id:${payload.id}) {
                           name,
                           attendingType {
                             type,
                             id
                          }
                        }
                    }
                    `
                }
            })
        },

        getAttendingsList(payload,page) {
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
                        attendings(page:${payload.page},input: {
                            name: "${payload.name}"
                        }) {
                            data {
                               name,
                               id,
                            }
                        }
                    }
                    `
                }
            })
        },

        upsertAttending(payload) {
            console.log(payload.status)
            return axios({
                method: "POST",
                url: import.meta.env.VITE_APP_END_POINT+'/graphql',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.auth_token}`
                },
                data: {
                    query: `
                    mutation attendingupsert ($name: String,$requests: [AttendingRequest],$status: [ID],$id: ID) {
                        attendingupsert(input:{
                                name: $name,
                                request: $requests,
                                status: $status,
                                id: $id
                        }) {
                                status
                            }
                        }
                    `,
                    variables: {
                        requests: payload.requests,
                        name: payload.name,
                        status: payload.status
                    }
                }
            })
        },

        deleteAttending(payload,search) {
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
                        attendingdelete(id: ${payload.id},password:"${payload.password}") {
                            status,
                            attendings(page:${search.page},input:{
                                name: "${search.name}" ,
                            }) {
                                data {
                                    id,
                                    name,
                                    attendingType {
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