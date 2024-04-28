<template>
  <ion-list class="ion-padding-bottom">
    <ion-item class="ion-no-padding">
      <ion-input
          label="Имя"
          type="text"
          label-placement="stacked"
          :clear-input="true"
          placeholder="Имя питомца"
          v-model="pet.name"
      >
      </ion-input>
    </ion-item>

    <ion-item class="ion-no-padding" mode="ios">
      <ion-select aria-label="type" :selected-text="pet.type_name" interface="action-sheet" v-model="pet.type_name" placeholder="Вид" @ionChange="getKinds($event.detail.value)" cancel-text="Отмена">
        <ion-select-option v-for="type in types" :key="type.id" :value="{ id: type.id, name: type.name }">{{ type.name }}</ion-select-option>
      </ion-select>
    </ion-item>

    <ion-item class="ion-no-padding" mode="ios">
      <ion-select aria-label="kind" :selected-text="pet.kind_name" interface="action-sheet" v-model="pet.kind_name" placeholder="Порода" cancel-text="Отмена">
        <ion-select-option v-for="kind in kinds" :key="kind.id" :value="kind.id">
          {{ kind.kind_name }}
        </ion-select-option>
      </ion-select>
    </ion-item>

    <ion-item class="ion-no-padding" mode="ios">
      <ion-select aria-label="sex" interface="action-sheet" v-model="pet.sex" placeholder="Пол питомца" cancel-text="Отмена">
        <ion-select-option value="male">Самец</ion-select-option>
        <ion-select-option value="female">Самка</ion-select-option>
      </ion-select>
    </ion-item>

    <ion-item class="ion-no-padding">
      <ion-input
          label="Вес"
          type="number"
          label-placement="stacked"
          :clear-input="true"
          placeholder="Введите вес питомца"
          v-model="pet.weight"
      >
      </ion-input>
    </ion-item>

    <ion-item class="ion-no-padding">
      <ion-input
          label="Рост"
          type="number"
          label-placement="stacked"
          :clear-input="true"
          placeholder="Введите рост питомца"
          v-model="pet.height"
      >
      </ion-input>
    </ion-item>
    <div class="datetime-field">
      <label>Дата рождения питомца</label>
      <ion-datetime-button datetime="datetime" color="primary"></ion-datetime-button>
    </div>
  </ion-list>
  <ion-modal :keep-contents-mounted="true">
    <ion-datetime
        mode="ios"
        id="datetime"
        v-model="pet.birthDate"
    ></ion-datetime>
  </ion-modal>
  <ion-button expand="block" mode="ios" @click="handleData">{{ buttonName }}</ion-button>
</template>

<script lang="ts" setup>
import {useCreatingStore} from "@/store/creating";
import {useProfileStore} from "@/store/profile";

import {
  IonList,
  IonItem,
  IonInput,
  IonDatetimeButton,
  IonDatetime,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonButton, loadingController, modalController
} from "@ionic/vue";
import {reactive, computed, onMounted} from "vue";
import {storeToRefs} from "pinia";
import router from "@/router";

const creatingStore = useCreatingStore()
const profileStore = useProfileStore()

const pet = reactive({
  id: '',
  name: '',
  kind_name: '',
  type_name: '',
  sex: '',
  weight: 0,
  height: 0,
  birthDate: (new Date()).toISOString(),
  type_id: 0
})

const presentLoading = async (message: string) => {
  const loading = await loadingController.create({
    message: message,
    spinner: 'crescent'
  });

  await loading.present();
}

onMounted(() => {
  if (typeof router.currentRoute.value.query.pet_id === "string") {
    presentLoading("Загружаем данные вашего питомца...")
    profileStore.fetchPetById(router.currentRoute.value.query.pet_id).then(() => {
      const { getPetData } = storeToRefs(profileStore)

      pet.id = getPetData.value.id
      pet.name = getPetData.value.name
      pet.kind_name = getPetData.value.kind_name
      pet.type_name = getPetData.value.type_name
      pet.sex = getPetData.value.sex
      pet.height = getPetData.value.height
      pet.weight = getPetData.value.weight
      pet.birthDate = new Date(getPetData.value.birthDate).toISOString()
      pet.type_id = getPetData.value.type_id

      creatingStore.fetchKinds(getPetData.value.type_id)

      loadingController.dismiss()
    })
  }
})

const buttonName = computed((): string => router.currentRoute.value.query.pet_id ? "Изменить данные питомца" : "Добавить данные питомца")

creatingStore.fetchTypes()
const getKinds = (type: { id: number, name: string }) => {
  creatingStore.fetchKinds(type.id)
  pet.type_name = type.name
}

const { kinds, types } = storeToRefs(creatingStore)

const handleData = async () => {
  profileStore.SET_PET_DATA(pet)
  if (typeof router.currentRoute.value.query.pet_id === "string") {
    await presentLoading("Обновляем данные вашего питомца...")
    await profileStore.updatePet(router.currentRoute.value.query.pet_id)
  } else {
    await presentLoading("Добавляем данные вашего питомца...")
    await profileStore.createPet()
  }

  await profileStore.fetchPets()
  await loadingController.dismiss()
  await modalController.dismiss()
}
</script>

<style lang="scss">
ion-datetime {
  --placeholder-color: #0f9;
  &:not(.datetime-placeholder) {
     color: #616161;
 }
}

.datetime-field {
  margin-top: 5px;
  label {
    font-size: 12px;
  }
  ion-datetime-button {
    display: block;
    margin-top: 10px;
  }
}
</style>
