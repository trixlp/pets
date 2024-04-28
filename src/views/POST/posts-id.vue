<template>
  <ion-page>
    <ion-header mode="ios">
      <ion-toolbar color="primary" mode="ios">
        <ion-buttons slot="start">
          <ion-back-button text="Назад" :style="{ display: 'block' }" @click="backButton"></ion-back-button>
        </ion-buttons>
        <ion-title class="ion-no-padding">{{ post.title }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <post-card
          type="post-id"
          :description="post.description"
          :file_url="post.files[0]"
          :title="post.title"
          :tags="post.tags"
      ></post-card>
      <!-- <description
          :value="post.description"
          :pet-data="post"
      ></description> -->
      <!-- <ion-item class="ion-no-padding ion-margin-top">
        <ion-icon :icon="ticket"></ion-icon>
        <ion-label class="ion-margin-start price">
          {{ parseInt(post.price).toLocaleString() }} ₸
        </ion-label>
      </ion-item> -->

      <ion-button expand="block" class="ion-margin-top">
        <ion-grid>
          <ion-row>Позвонить хозяйну</ion-row>
          <ion-row class="name">Андрей</ion-row>
        </ion-grid>
      </ion-button>

      <comments></comments>
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
  IonButtons,
  IonBackButton,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
  IonRow,
  IonGrid
} from "@ionic/vue";
import PostCard from "@/components/PostCard.vue";
import Description from "@/components/Description.vue";
import Comments from "@/components/Comments.vue";
import {ticket} from "ionicons/icons";
import {reactive} from "vue";
import { useRouter } from "vue-router";

import posts from "../../api/posts.json";

const router = useRouter();

const { id } = router.currentRoute.value.params;

const post = posts.posts[Number(id)];

const backButton = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
.price {
  font-size: 20px;
  font-weight: 800;
}
ion-button {
  height: 60px;
  ion-row {
    justify-content: center;
    font-weight: 700;
  }
  .name {
    font-size: 14px;
    font-weight: 400;
    margin-top: 5px;
  }
}
</style>
