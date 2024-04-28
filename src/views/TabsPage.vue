<template>
  <ion-page id="main-content">
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="posts" href="/tabs/posts">
          <ion-icon aria-hidden="true" :icon="logoOctocat" />
          <ion-label>Питомцы</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="creating" href="/tabs/creating">
          <ion-icon aria-hidden="true" :icon="addCircle" />
          <ion-label>Создать</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="profile" href="/tabs/profile">
          <ion-icon aria-hidden="true" :icon="person" />
          <ion-label>Профиль</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet
} from '@ionic/vue';
import { person, addCircle, logoOctocat } from 'ionicons/icons';
import {computed} from "vue";
import router from "@/router";

// const isAuthorized = computed((): boolean => !!(window.localStorage.getItem('auth_token') && window.localStorage.getItem('refresh_token') && window.localStorage.getItem('user_id')));

const isAuthorized = computed((): boolean => window.localStorage.getItem('isAuthorized') === 'true');

if (!isAuthorized.value) {
  router.push('/');
}
</script>
