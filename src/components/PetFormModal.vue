<template>
  <ion-modal ref="modal" trigger="open-add-pet-modal">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="cancel()">Отмена</ion-button>
        </ion-buttons>
        <ion-title>Мой питомец</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <pet-form></pet-form>
    </ion-content>
  </ion-modal>
</template>

<script lang="ts" setup>
import {
  IonModal,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonButtons,
  modalController
} from "@ionic/vue";
import PetForm from "@/components/PetForm.vue";

const cancel = () => {
  modalController.dismiss()
}
</script>
