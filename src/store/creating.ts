import {defineStore} from "pinia";
import api from "@/api";

import categories from "../api/categories.json";
import tags from "../api/tags.json";
import types from "../api/types.json";
import kinds from "../api/kinds.json";

interface Item {
    id: number,
    name: string
}

interface Kind {
    id: number,
    kind_name: string
}

interface Post {
    title: string,
    description: string,
    category_id: number,
    category_name: string,
    tags: string[],
    file_url: string,
    pet_id: string,
    price: string
}

export const useCreatingStore = defineStore({
    id: 'creating',
    state: () => ({
        tags: [{} as Item],
        categories: [{} as Item],
        types: [{} as Item],
        kinds: [{} as Kind],
        fileName: ''
    }),
    getters: {
        getTags: (state) => state.tags,
        getCategories: (state) => state.categories,
        getTypes: (state) => state.types,
        getKinds: (state) => state.kinds,
        getFileName: (state) => state.fileName
    },
    actions: {
        setFile(fileName: string) {
            this.fileName = fileName
        },

        /* API: Get Tags */
        async fetchTags() {
            this.tags = tags.types;
            // api.get('/v1/types/tag').then((response: any) => {
            //     this.tags = response.data.types
            // })
        },

        /* API: Get Categories */
        async fetchCategories() {
            this.categories = categories.types;
            // api.get('/v1/types/category').then((response: any) => {
            //     this.categories = response.data.types
            // })
        },

        /* API: Get Types */
        async fetchTypes() {
            this.types = types.types;
            // api.get('/v1/types/type').then((response: any) => {
            //     this.types = response.data.types
            // })
        },

        /* API: Get Kinds */
        async fetchKinds(typeId: number) {
            this.kinds = kinds.kinds;
            // api.get(`/v1/type/${typeId}/kinds`).then((response: any) => {
            //     this.kinds = response.data.kinds
            // })
        },

        /* API: Create Post */
        async uploadFile(file: any) {
            const formData = new FormData()
            formData.set('file', file.file, file.name)

            const requestOptions = {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: 'Bearer fb250092-974c-44a7-b4ed-4e71b5875886'
                }
            };

            await fetch("https://pets.dev-incubator.kz/upload_file", requestOptions)
                .then(async (data: any) => {
                    const response = await data.json()
                    this.setFile(`${response.filename}.${response.file_type}`)
                })
                .catch(error => console.log('error', error));

        },

        /* API: Create Post */
        async createPost(post: Post) {
            await api.post('/v1/posts', {
                title: post.title,
                description: post.description,
                category: post.category_name,
                tags : post.tags,
                files: [this.fileName],
                pets: [post.pet_id]
            }).then((response: any) => {
                console.log(response)
            }).catch((err: any) => {
                console.log(err)
            })
        },
    }
})
