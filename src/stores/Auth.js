import { defineStore } from 'pinia';
import axios from "axios";

axios.interceptors.response.use(
function(response) {
    let error = response.data.errors

    if ( error ) {
        if (error[0]) {
            if ( error[0].debugMessage == 'unsupported formate') {
                return false;
            }
        }
    }
    
    return response;
},
function(error) {
    if (error.response.status == 401) {
        self.$toaster.error("ERROR: Invalid token detected");
        self.logout();
    } else if (error.response.status == 503) {
        let access_token = localStorage.getItem('auth_token');

        if ( access_token ) {
            localStorage.removeItem('auth_token');
        }

        window.location.href = '/login';
    }

    throw new Error('Invalid token detected');

}
);

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            resetSuccessFlashMessage: null,
            user: {},
            userProfile: {},
            fetch: true,
            authorized: false,
            auth_token: localStorage.getItem('auth_token'),
            componenetLoading: false,
            menuTest: true
        }
    },
    getters: {
        getUser() {
            return this.user;
        }
    },
    actions: {
        isAuthed() {
            console.log(this.user)
            return this.user.id ? true : false;
        },

        myPriviledges(priviledges) {
            this.user.priviledges = [];
            for(var i = 0; i <= priviledges.length - 1; i++) {
                this.user.priviledges.push(parseInt(priviledges[i]['id']));
            }
        },
        hasToken() {
            return (localStorage.getItem('auth_token')) ? true : false;
        },

        async getAuthIfExist()  {
            let auth_token =  localStorage.getItem('auth_token');
            return new Promise((resolve,reject) => {   
                if ( auth_token  ) {
                    axios({
                        method: "POST",
                        url: import.meta.env.VITE_APP_END_POINT+'/graphql',
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${auth_token}`
                        },
                        data: {
                            query: `
                            query {
                                me
                                {
                                  id,
                                  name,
                                  email,
                                  avatar,
                                  cover,
                                  role {
                                    name,
                                    id,
                                    priviledges {
                                        id
                                    }
                                  }
                                }
                              }
                            `
                        }
                    }).then((response) => {
                        let me = response.data.data.me;

                        if ( me ) {
                            this.user = me;
                        }

                        resolve(response)
                    })
                }  
            })
        },

        login(payload) {
            return axios({
                method: "POST",
                url: import.meta.env.VITE_APP_END_POINT+'/graphql',
                headers: {"Content-Type": "application/json"},
                data: {
                    query: `
                    mutation {
                        login(input: {
                           email: "${payload.email}",
                           password: "${payload.password}"
                        }) 
                        {
                          access_token
                          user {
                            id,
                            name,
                            avatar,
                          }
                        }
                      }
                    `
                }
            })
        },

        upsert(payload) {
            return axios({
                method: "POST",
                url: import.meta.env.VITE_APP_END_POINT+'/graphql',
                headers: {"Content-Type": "application/json"},
                data: {
                    query: `
                    mutation {
                        upsert(input:{
                           email:"${payload.email}",
                           name:"${payload.name}",
                           id: ${payload.id || null}
                        }) {
                           email,
                           name,
                        }
                      }
                    `
                }
            })
        },

        getProfile(id) {
            return axios({
                method: "POST",
                url: import.meta.env.VITE_APP_END_POINT+'/graphql',
                headers: {
                    'Content-Type':  "application/json",
                    "Authorization": `Bearer ${this.auth_token}`
                },
                data: {
                    query: `
                        query {
                            user(id: ${id}) {
                                id,
                                name,
                                email,
                                avatar,
                                cover
                            }
                        }
                    `
                }
            })
        },

        modifyAvatar(avatar) {
            let avatarData = new FormData;
            let auth_token =  localStorage.getItem('auth_token');

            avatarData.append('operations','{"query":"mutation FileUpload ($file: Upload!){uploadAvatar(file: $file){avatar}}"}');
            avatarData.append('map','{"0":["variables.file"]}');
            avatarData.append('0',avatar);
            
            return axios({
                method: "POST",
                url: import.meta.env.VITE_APP_END_POINT+'/graphql',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": `Bearer ${auth_token}`
                },
                data: avatarData
            }).then((response) => {
                let data = response.data.data.uploadAvatar.avatar;
                this.user.avatar = data;
            })
        },


        modifyCover(cover) {
            let coverData = new FormData;
            let auth_token =  localStorage.getItem('auth_token');

            coverData.append('operations','{"query":"mutation FileUpload ($file: Upload!){uploadCover(file: $file){cover}}"}');
            coverData.append('map','{"0":["variables.file"]}');
            coverData.append('0',cover);
            
            return axios({
                method: "POST",
                url: import.meta.env.VITE_APP_END_POINT+'/graphql',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": `Bearer ${auth_token}`
                },
                data: coverData
            }).then((response) => {
                let data = response.data.data.uploadCover.cover;
                this.user.cover = data;
            })
        },

        toggleUserActive(id) {
            let auth_token =  localStorage.getItem('auth_token');
            return axios({
                method: "POST",
                url: import.meta.env.VITE_APP_END_POINT+'/graphql',
                headers: {
                    'Content-Type':  "application/json",
                    "Authorization": `Bearer ${this.auth_token}`
                },
                data: {
                    query: `
                    mutation {
                        toggleUserActivate(id:${id}) {
                          id
                          active
                       }
                    }
                    `
                }
            })
        },

        getUserData(id) {
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
                        user(id: ${id}) {
                            name,
                            email,
                            id
                         }
                      }
                    `
                }
            })
        },

        getUserList(payload) {
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
                        users(page:${payload.page},input:{
                            name: "${payload.name}"
                        }) {
                            paginatorInfo {
                                lastPage
                            }
                            data {
                                name
                                id
                                avatar,
                                email,
                                active
                            }
                        }
                      }
                    `
                }
            })
        },

        forgetPassword(payload) {
            return axios({
                method: "POST",
                url: import.meta.env.VITE_APP_END_POINT+'/graphql',
                headers: {"Content-Type": "application/json"},
                data: {
                    query: `
                    mutation {
                        forgetPassword (input: {email: "${payload.email}"})
                    }
                    `
                }
            })
        },

        resetPassword(payload) {
            return axios({
                method: "POST",
                url: import.meta.env.VITE_APP_END_POINT+'/graphql',
                headers: {"Content-Type": "application/json"},
                data: {
                    query: `
                    mutation {
                        resetPassword(input: {
                        email:"${payload.email}",
                        token:"${payload.token}"
                        password: "${payload.password}",
                        password_confirmation: "${payload.password_confirmation}"
                      })
                    }
                    `
                }
            })
        },

        deleteUser(deleteUserPayload) {
            let auth_token =  localStorage.getItem('auth_token');
            return axios({
                method: "POST",
                url: import.meta.env.VITE_APP_END_POINT+'/graphql',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth_token}`
                },
                data: {
                    query: `
                    mutation {
                        deleteUser(input: {
                            id: ${deleteUserPayload.id},
                            password: "${deleteUserPayload.password}"
                        }) {
                           id
                        }
                    }
                    `
                }
            })
        },

        downloadUsersFile(type)
        {
            let auth_token =  localStorage.getItem('auth_token');
            return axios({
                method: "POST",
                url: import.meta.env.VITE_APP_END_POINT+'/graphql',
                headers: {
                    "Authorization": `Bearer ${auth_token}`
                },
                data: {
                    query: `
                        query {
                            userExport(type: "${type}")
                        }
                    `
                }
            }).then((response) => {
                const link = document.createElement('a');
                const file = response.data.data.userExport;
                link.href =  import.meta.env.VITE_APP_END_POINT+'/download/'+file;
                link.target = "_blank";
                link.setAttribute('download','myusers.xlsx')
                link.click()
                // URL.revokeObjectURL(link.href)
            })
        }
    }
})