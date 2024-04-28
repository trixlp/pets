<template>
  <div class="description">
    {{ value }}
  </div>
  <ion-list class="ion-margin-top">
    <ion-item>
      <ion-label>Вид</ion-label>
      <ion-badge color="primary">{{ type }}</ion-badge>
    </ion-item>
    <ion-item>
      <ion-label>Порода</ion-label>
      <ion-badge color="secondary">{{ kind }}</ion-badge>
    </ion-item>
    <ion-item>
      <ion-label>Пол</ion-label>
      <ion-badge color="tertiary">{{ petData === 'male' ? 'Самец' : 'Самка' }}</ion-badge>
    </ion-item>
    <ion-item>
      <ion-label>Рост</ion-label>
      <ion-badge color="success">{{ petData.height }} см</ion-badge>
    </ion-item>
    <ion-item>
      <ion-label>Вес</ion-label>
      <ion-badge color="warning">{{ petData.weight }} кг</ion-badge>
    </ion-item>
    <ion-item>
      <ion-label>Возраст</ion-label>
      <ion-badge color="danger">{{ age }} год</ion-badge>
    </ion-item>
  </ion-list>
</template>

<script lang="ts" setup>
import {IonList, IonItem, IonBadge, IonLabel} from "@ionic/vue";
import {computed} from "vue";
import {kinds, types} from "@/mocks";

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  petData: {
    type: Object
  }
})
const kind = computed((): string => {
  return kinds.filter((kind: { id: number, name: string }) => kind.id === props.petData?.kind_id)[0].name
})

const type = computed((): string => {
  return types.filter((type: { id: number, name: string }) => type.id === props.petData?.type_id)[0].name
})

const age = computed((): number => {
  return calculateAge(props.petData?.birthDate)
})

function calculateAge(birthDate) {
  const dob = new Date(birthDate);
  const diffMs = Date.now() - dob.getTime();
  const calcAge = Math.floor(diffMs / 31557600000);
  return calcAge;
}
</script>

<style lang="scss" scoped>
.description {
  font-size: 18px;
  line-height: 25px;
  margin-top: 1.25rem;
  font-weight: 400;
  color: #4d4b4b;
}

ion-item {
  ion-label {
    font-size: 15px;
    font-weight: 700;
  }
  ion-badge {
    font-size: 15px;
  }
}
</style>
