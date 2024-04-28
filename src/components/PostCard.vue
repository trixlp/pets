<template>
  <template v-if="type === 'post-id'">
    <h3>{{ title }}</h3>
    <span>25.10.23 13:00</span>
    <ion-card class="ion-no-margin">
      <img alt="Silhouette of mountains" :src="file_url" />
      <ion-card-content>
        <tags :tags="tags"></tags>
        <indicators></indicators>
        <div style="margin-top: 1rem;">{{ description }}</div>
        <ion-button expand="block" class="ion-margin-top" @click="like">
          <ion-icon :icon="!isLike ? heart : heartDislike" style="margin-right: 5px; margin-top: 3px"></ion-icon>
          {{ !isLike ? 'Нравится' : 'Уже не нравится' }}
        </ion-button>
      </ion-card-content>
    </ion-card>
  </template>
  <ion-card v-else>
    <img alt="Silhouette of mountains" :src="file_url" />
    <ion-card-header>
      <ion-card-title>{{ title }}</ion-card-title>
      <ion-card-subtitle>25.10.23 13:00</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <tags :tags="tags"></tags>
      <indicators></indicators>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts" setup>
import {defineProps, ref} from "vue";
import {IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon} from "@ionic/vue";
import Tags from "@/components/Tags.vue";
import Indicators from "@/components/Indicators.vue";
import {heart, heartDislike} from "ionicons/icons";

defineProps({
  type: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  file_url: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  tags: {
    type: Array,
    default: () => []
  }
})

const isLike = ref(false);

const like = () => {
  isLike.value = !isLike.value
}
</script>

<style lang="scss" scoped>
h3 {
  font-size: 28px;
  color: #000;
  font-weight: 800;
  margin-top: 5px;
}
span {
  display: block;
  margin-bottom: 15px;
  font-size: 14px;
  font-weight: 700;
  color: #666;
}
</style>
