<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>
          Создание объявления
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list class="ion-padding-bottom">
        <ion-item class="ion-no-padding">
          <ion-input
              label="Заголовок"
              type="text"
              label-placement="stacked"
              :clear-input="true"
              placeholder="Пример: Продаю красивых щенят"
              v-model="postForm.title"
          >
          </ion-input>
        </ion-item>

        <ion-item
            class="ion-no-padding">
          <ion-textarea
              label="Описание"
              placeholder="Введите описание"
              label-placement="stacked"
              v-model="postForm.description"
          ></ion-textarea>
        </ion-item>

        <ion-item class="ion-no-padding" mode="ios">
          <ion-select
              aria-label="category"
              interface="action-sheet"
              placeholder="Категория"
              cancel-text="Отмена"
              @ionChange="categoryHandler($event.detail.value)"
          >
            <ion-select-option v-for="category in categories" :key="category.id" :value="category">
              {{ category.name }}
            </ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item class="ion-no-padding" mode="ios">
          <ion-select aria-label="tags" placeholder="Теги" v-model="postForm.tags" :multiple="true" cancel-text="Отмена" ok-text="Добавить">
            <ion-select-option v-for="tag in tags" :value="tag.name" :key="tag.id">{{ tag.name }}</ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item class="ion-no-padding" v-if="postForm.category_id === 3">
          <ion-input
              label="Цена"
              type="number"
              label-placement="stacked"
              :clear-input="true"
              placeholder="Введите стоимость"
              v-model="postForm.price"
          >
          </ion-input>
        </ion-item>
      </ion-list>

      <ion-item class="ion-no-padding" mode="ios" v-if="postForm.category_id === 3 && pets.length > 1">
        <ion-select aria-label="tags" v-model="petId" placeholder="Выбрать питомца" cancel-text="Отмена" ok-text="Добавить">
          <ion-select-option
              v-for="(pet, idx) in pets"
              :key="idx"
              :value="pet.id">
            {{pet.name}}
          </ion-select-option>
        </ion-select>
      </ion-item>

      <ion-button v-if="postForm.category_id === 3 && pets.length" :disabled="!petId" mode="ios" @click="bindPet" class="ion-margin-top" color="primary" expand="block">
        Привязать данные питомца
      </ion-button>

      <pet-form v-if="postForm.category_id === 3 && !pets.length"></pet-form>
      <pet-card v-if="hasPet" :data="petData" type="post"></pet-card>
      <upload-image></upload-image>

      <ion-button mode="ios" class="ion-margin-top" color="primary" expand="block" @click="createPost">
        Создать
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton, loadingController
} from "@ionic/vue";
import PetForm from "@/components/PetForm.vue";
import PetCard from "@/components/PetCard.vue";
import UploadImage from "@/components/UploadImage.vue";
import {reactive, ref, Ref} from "vue";
import {useCreatingStore} from "@/store/creating";
import {useProfileStore} from "@/store/profile";
import {storeToRefs} from "pinia";
import router from "@/router";

const creatingStore = useCreatingStore()
const profileStore = useProfileStore()

const postForm = reactive({
  title: '',
  description: '',
  category_id: 0,
  category_name: '',
  tags: [],
  file_url: '',
  pet_id: '',
  price: ''
});

const petData = reactive({
  name: '',
  type: {
    name: ''
  },
  kind: {
    name: ''
  },
  sex: '',
  height: 0,
  weight: 0,
  birthday_date: ''
});
const petId: Ref<string> = ref('');

creatingStore.fetchCategories()
creatingStore.fetchTags()

const { categories, tags } = storeToRefs(creatingStore)
const { pets, pet } = storeToRefs(profileStore)

const hasPet: Ref<boolean> = ref(false);

const categoryHandler = (category: { id: number, name: string }) => {
  postForm.category_id = category.id
  postForm.category_name = category.name
  if (category.id === 3) {
    profileStore.fetchPets().then(() => {
      if (pets.value.length === 1) {
        petId.value = pets.value[0].id
      }
    })
  }
}

const presentLoading = async (message: string) => {
  const loading = await loadingController.create({
    message,
    spinner: 'crescent'
  });

  await loading.present();
}

const bindPet = () => {
  presentLoading('Загружаем данные питомца...')
  profileStore.fetchPetById(petId.value).then(() => {
    petData.birthday_date = pet.value.birthDate
    petData.sex = pet.value.sex
    petData.height = pet.value.height
    petData.weight = pet.value.weight
    petData.kind.name = pet.value.kind_name
    petData.type.name = pet.value.type_name
    postForm.pet_id = petId.value

    loadingController.dismiss()

    hasPet.value = true;
  })
}

const createPost = async () => {
  await presentLoading('Создаем объявление...')
  await creatingStore.createPost(postForm)
  await loadingController.dismiss()
  await router.push('/tabs/posts')
}

</script>
