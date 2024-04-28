<template>
  <ion-card class="ion-no-margin ion-margin-top">
    <ion-card-header>
      <ion-card-title>Комментарий</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <textarea placeholder="Ваше сообщение"></textarea>
      <ion-button expand="block">Отправить</ion-button>
      <ion-list>
        <ion-item class="ion-no-padding">
          <ion-label>
            <h3>Елена</h3>
            <p>Какой милый котик!</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts" setup>
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonItem,
  IonLabel,
  IonButton
} from "@ionic/vue";
</script>

<style lang="scss" scoped>
textarea {
  width: 100%;
  background: none;
  border: 1px solid #bfbfbf;
  padding: 10px;
  border-radius: 8px;
  max-width: 100%;
  min-width: 100%;
  min-height: 70px;
}
h3 {
  font-weight: 700;
  font-size: 18px;
}
p {
  font-size: 16px;
}
</style>
