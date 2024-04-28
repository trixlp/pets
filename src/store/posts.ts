import {defineStore} from "pinia";
// import api from "@/api";
import Posts from "@/views/POST/posts.vue";

import posts from "../api/posts.json";

type Post = {
    title: string,
    description: string,
    category: string,
    price: number,
    files: string[] | null,
    tags: string[] | null,
    likes: number,
    views: number,
    created_at: string
}

type Posts = Post[]

export const usePostsStore = defineStore({
    id: 'posts',
    state: () => ({
        posts: [] as Posts
    }),
    getters: {
        getPosts: (state) => state.posts
    },
    actions: {
        /* API: Fetch Posts */
        async fetchPosts() {
            this.posts = posts.posts;

            // await api.get('v1/posts?per_page=10&page=1').then((response: any) => {
            //     if (response.data.posts) {
            //         this.posts = response.data.posts
            //     }
            // }).catch((err: any) => {
            //     console.log(err)
            // })
        }
    }
})
