import {defineStore} from "pinia";
import api from "@/api";

import pets from "../api/pets.json";
import users from "../api/users.json";

interface Pet {
    id: string,
    name: string,
    kind_name: string,
    type_name: string,
    sex: string,
    weight: number,
    height: number,
    birthDate: string,
    type_id: number
}

export const useProfileStore = defineStore({
    id: 'profile',
    state: () => ({
        profile: {
            first_name: '',
            last_name: '',
            phone: '',
            sex: '',
            email: '',
            birthday: '',
            pets: [{} as Pet]
        },
        pet: {
            id: '',
            name: '',
            kind_name: '',
            type_name: '',
            sex: '',
            weight: 0,
            height: 0,
            birthDate: '',
            type_id: 0
        } as Pet,
        pets: [{} as Pet]
    }),
    getters: {
        getPetData: (state) => state.pet,
        getPets: (state) => state.pets,
        getProfile: (state) => state.profile
    },
    actions: {
        SET_PET_DATA(pet: Pet) {
            this.pet = pet
        },

        /* API: Create Pet */
        async createPet() {
            await api.post('v1/pets', {
                first_name: this.pet.name,
                kind: this.pet.kind_name,
                type: this.pet.type_name,
                sex: this.pet.sex,
                weight: parseInt(String(this.pet.weight)),
                height: parseInt(String(this.pet.height)),
                birthday_date: this.pet.birthDate.replace("T", " ")
            }).then((response: any) => {
                console.log(response)
            }).catch((err: any) => {
                console.log(err)
            })
        },

        /* API: Update Pet */
        async updatePet(id: string) {
            await api.put(`v1/pets/${id}`, {
                first_name: this.pet.name,
                kind: this.pet.kind_name,
                type: this.pet.type_name,
                sex: this.pet.sex,
                weight: parseInt(String(this.pet.weight)),
                height: parseInt(String(this.pet.height)),
                birthday_date: this.pet.birthDate.replace("T", " ").split(".")[0]
            }).then((response: any) => {
                console.log(response)
            }).catch((err: any) => {
                console.log(err)
            })
        },

        /* API: Fetch Pets */
        async fetchPets() {
            this.pets = pets.pets;
            // await api.get('v1/pets').then((response: any) => {
            //     if (response.data?.pets) {
            //         this.pets = response.data.pets
            //     }
            // }).catch((err: any) => {
            //     console.log(err)
            // })
        },

        /* API: Fetch Pet By Id */
        async fetchPetById(id: string) {
            await api.get(`v1/pets/${id}`).then((response: any) => {
                this.pet = {
                    id: response.data.pet.id,
                    name: response.data.pet.name,
                    type_name: response.data.pet.type.name,
                    kind_name: response.data.pet.kind.name,
                    birthDate: response.data.pet.birthday_date,
                    sex: response.data.pet.sex,
                    height: response.data.pet.height,
                    weight: response.data.pet.weight,
                    type_id: response.data.pet.type.id
                }
            }).catch((err: any) => {
                console.log(err)
            })
        },

        /* API: Fetch Profile */
        async fetchProfile() {
            this.profile = users;

            // await api.get('v1/profile').then((response: any) => {
            //     if (response.data?.pets) {
            //         this.pets = response.data.pets
            //     }
            //     this.profile = {
            //         first_name: response.data.first_name,
            //         last_name: response.data.last_name,
            //         birthday: response.data.date,
            //         sex: response.data.sex,
            //         email: response.data.email,
            //         phone: response.data.phone
            //     }
            // }).catch((err: any) => {
            //     console.log(err)
            // })
        }
    }
})
