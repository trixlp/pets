<template>
  <ion-modal ref="modal" trigger="filter-modal" :initial-breakpoint="0.75" :breakpoints="[0, 0.25, 0.5, 0.75]">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="cancel()">Отмена</ion-button>
        </ion-buttons>
        <ion-title>Фильтры</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list class="ion-no-padding">
        <ion-item class="ion-no-padding" mode="ios">
          <ion-select aria-label="category" interface="action-sheet" v-model="filters.category_id" placeholder="Категория" cancel-text="Отмена">
            <ion-select-option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item class="ion-no-padding" mode="ios">
          <ion-select aria-label="tag" interface="action-sheet" v-model="filters.kind_id" placeholder="Теги" cancel-text="Отмена">
            <ion-select-option v-for="tag in tags" :key="tag.id" :value="tag.id">
              {{ tag.name }}
            </ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item class="ion-no-padding" mode="ios">
          <ion-select aria-label="type" interface="action-sheet" v-model="filters.type_id" placeholder="Вид" @ionChange="getKinds" cancel-text="Отмена">
            <ion-select-option v-for="type in types" :key="type.id" :value="type.id">
              {{ type.name }}
            </ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item class="ion-no-padding" mode="ios">
          <ion-select aria-label="kind" interface="action-sheet" v-model="filters.kind_id" placeholder="Порода" cancel-text="Отмена">
            <ion-select-option v-for="kind in kinds" :key="kind.id" :value="kind.id">
              {{ kind.kind_name }}
            </ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>

      <ion-button class="ion-margin-top" @click="apply" expand="block">Применить</ion-button>
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
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
  modalController,
} from "@ionic/vue";
import {storeToRefs} from "pinia";
import {useCreatingStore} from "@/store/creating";
import {reactive} from "vue";

const creatingStore = useCreatingStore()
const filters = reactive({
  category_id: 0,
  tag_id: 0,
  kind_id: 0,
  type_id: 0
})

const { categories, tags, kinds, types } = storeToRefs(creatingStore)

const cancel = () => {
  modalController.dismiss()
}

const getKinds = () => {
  creatingStore.fetchKinds(filters.kind_id)
}

const apply = () => {
  console.log(filters)
  modalController.dismiss()
}
</script>
