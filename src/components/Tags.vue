<template>
  <div class="tags">
    <ion-chip class="ion-no-margin" v-for="(tag, idx) in tags" :key="idx">
      <ion-icon :icon="ticket" color="primary"></ion-icon>
      <ion-label>{{ tag }}</ion-label>
    </ion-chip>
  </div>
</template>

<script lang="ts" setup>
import {IonChip, IonLabel, IonIcon} from "@ionic/vue";
import {ticket} from "ionicons/icons";
import {defineProps} from "vue";

defineProps({
  tags: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="scss" scoped>
ion-chip {
  margin-right: 5px;
}
</style>
