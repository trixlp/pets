<template>
  <ion-list>
    <ion-item class="ion-no-padding">
      <ion-avatar slot="start">
        <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
      </ion-avatar>
      <ion-label>
        {{ data.first_name }} {{ data.last_name }}
      </ion-label>
    </ion-item>
    <ion-item class="ion-no-padding">
      <ion-label>
        <h3>{{ data.sex === 'male' ? 'Мужчина' : 'Женщина' }}</h3>
        <p>Пол</p>
      </ion-label>
    </ion-item>
    <ion-item class="ion-no-padding">
      <ion-label>
        <h3>{{ data.phone }}</h3>
        <p>Телефон</p>
      </ion-label>
    </ion-item>
    <ion-item class="ion-no-padding">
      <ion-label>
        <h3>{{ data.email }}</h3>
        <p>Email</p>
      </ion-label>
    </ion-item>
  </ion-list>
</template>

<script lang="ts" setup>
import {IonList, IonItem, IonAvatar, IonLabel} from "@ionic/vue";
import { defineProps } from 'vue';

defineProps({
  data: {
    type: Object
  }
})
</script>
