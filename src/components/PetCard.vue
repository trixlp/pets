<template>
  <ion-card class="ion-no-margin ion-margin-bottom" color="primary" mode="ios">
    <ion-card-header mode="ios">
      <ion-card-subtitle mode="ios">{{ data.kind.name }}</ion-card-subtitle>
      <ion-card-subtitle mode="ios">{{ data.sex === 'male' ? 'Самец' : 'Самка' }}</ion-card-subtitle>
      <ion-card-subtitle mode="ios">Рост: {{ data.height }} см.</ion-card-subtitle>
      <ion-card-subtitle mode="ios">Вес: {{ data.weight }} кг.</ion-card-subtitle>
      <ion-card-title mode="ios">{{ data.type.name }}: {{ age }}</ion-card-title>
    </ion-card-header>
    <ion-card-content v-if="type !== 'post'">
      <ion-button expand="block" color="light" @click="edit">
        <ion-icon :icon="pencil" style="margin-right: 8px;"></ion-icon>
        Редактировать
      </ion-button>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts" setup>
import {IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonButton, IonIcon} from "@ionic/vue";
import {pencil} from "ionicons/icons";
import {computed, defineProps, defineEmits} from "vue";

const emit = defineEmits(["editPet"])

const props = defineProps({
  data: {
    type: Object
  },
  type: {
    type: String
  }
})

const age = computed((): string => {
  return calculateAge(props.data?.birthday_date)
})

function calculateAge(birthDate: string) {
  const dob = new Date(birthDate);
  const diffMs = Date.now() - dob.getTime();
  const calcAge = Math.floor(diffMs / 31557600000);

  if (calcAge === 0) {
    const diffMonth = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30.4375));
    return diffMonth + ' месяцев';
  }

  return calcAge + " год";
}

const edit = () => {
  emit("editPet", props.data?.id)
}
</script>
