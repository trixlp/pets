<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text="Назад" :style="{ display: 'block' }" @click="router.back()"></ion-back-button>
        </ion-buttons>
        <ion-title>
          Карта зоомагазинов
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="map">
        <div style="position:relative;overflow:hidden;">
          <iframe
              src="https://yandex.kz/map-widget/v1/?display-text=%D0%97%D0%BE%D0%BE%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD&ll=76.920160%2C43.240683&mode=search&sll=76.945465%2C43.238293&sspn=0.328217%2C0.175957&text=%7B%22text%22%3A%22%D0%97%D0%BE%D0%BE%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD%22%2C%22what%22%3A%5B%7B%22attr_name%22%3A%22category_id%22%2C%22attr_values%22%3A%5B%22184107222%22%5D%7D%5D%7D&z=13"
              frameborder="1"
              allowfullscreen="true"
              style="position:relative;">
          </iframe>
        </div>
      </div>
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
  IonButtons,
  IonBackButton
} from "@ionic/vue";
import router from "@/router";
</script>

<style lang="scss">
iframe {
  width: 100%;
  height: calc(100vh - 94px);
}
</style>
