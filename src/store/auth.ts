import {defineStore} from "pinia";
import api from "@/api";
import router from "@/router";

export interface User {
    first_name: string,
    last_name: string,
    sex: string,
    email: string,
    phone: string,
    password: string,
    password_repeat?: string
}

export interface UserAuth {
    email: string,
    password: string
}

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: {
            first_name: '',
            last_name: '',
            sex: '',
            email: '',
            phone: '',
            password: '',
        },
        userId: ''
    }),
    getters: {
        getUserData: (state) => state.user
    },
    actions: {
        /* API: Creating user */
        async createUser(user: User) {
            await api.post('/v1/sign-up', {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                phone: user.phone,
                password: user.password,
                sex: user.sex
            })
            .then(response => {
                window.localStorage.setItem('auth_token', response.data.access_token)
                window.localStorage.setItem('refresh_token', response.data.refresh_token)
                window.localStorage.setItem('user_id', response.data.id)
                router.push('/tabs/posts')
            })
            .catch(err => {
                console.log(err)
            })
        },

        /* API: Login user */
        async loginUser(user: UserAuth) {
            router.push('/tabs/posts');
            // await api.post('/v1/sign-in', { ...user })
            // .then(response => {
            //     window.localStorage.setItem('auth_token', response.data.access_token)
            //     window.localStorage.setItem('refresh_token', response.data.refresh_token)
            //     window.localStorage.setItem('user_id', response.data.id)
            //     router.push('/tabs/posts');
            // })
            // .catch(err => {
            //     console.log(err)
            // })
        },
    }
})
