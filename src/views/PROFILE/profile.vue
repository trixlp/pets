<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Профиль</ion-title>
        <ion-button class="exit-button" @click="logout">
          <ion-icon :icon="exitOutline"></ion-icon>
        </ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <profile-info :data="getProfile"></profile-info>
      <ion-button
          class="ion-margin-top ion-margin-bottom"
          id="open-add-pet-modal"
          expand="block"
          @click="addPet"
      >
        Добавить питомца
      </ion-button>

      <template v-if="myPets.length && myPets[0].kind_name">
        <pet-card
            v-for="(pet, idx) in myPets"
            :key="idx"
            :data="pet"
            @editPet="editPet"
        ></pet-card>
      </template>
      <pet-form-modal></pet-form-modal>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon, loadingController
} from "@ionic/vue";
import ProfileInfo from "@/components/ProfileInfo.vue";
import PetFormModal from "@/components/PetFormModal.vue";
import PetCard from "@/components/PetCard.vue";
import {exitOutline} from "ionicons/icons";
import {useProfileStore} from "@/store/profile";
import {storeToRefs} from "pinia";
import router from "@/router";

const profileStore = useProfileStore()

profileStore.fetchProfile()

const myPets = storeToRefs(profileStore).getPets
const { getProfile } = storeToRefs(profileStore)

const editPet = async (id: number) => {
  triggerClickById("open-add-pet-modal")
  await router.push(`/tabs/profile?pet_id=${id}`)
}

const addPet = () => {
  router.push('/tabs/profile')
}

const logout = () => {
  window.localStorage.removeItem('user_id')
  window.localStorage.removeItem('auth_token')
  window.localStorage.removeItem('refresh_token')
  window.location.reload()
}

function triggerClickById(buttonId: string): void {
  const button = document.getElementById(buttonId);
  if (button) {
    button.click();
  }
}

</script>

<style lang="scss" scoped>
.exit-button {
  margin-left: auto;
  display: block;
  width: 55px;
}
</style>
