<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Питомцы</ion-title>
        <ion-button id="filter-modal" @click="getTypes">
          <ion-icon :icon="filter"></ion-icon>
        </ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-no-padding">
      <ion-fab slot="fixed" vertical="top" horizontal="start">
        <ion-fab-button>
          <ion-icon :icon="arrowForwardCircle"></ion-icon>
        </ion-fab-button>
        <ion-fab-list side="end">
          <ion-fab-button @click="goTo('clinic')">
            <ion-icon :icon="heart"></ion-icon>
          </ion-fab-button>
          <ion-fab-button @click="goTo('shops')">
            <ion-icon :icon="fastFood"></ion-icon>
          </ion-fab-button>
        </ion-fab-list>
      </ion-fab>
      <template v-if="getPosts.length">
        <router-link :to="'/tabs/posts/' + idx" v-for="(post, idx) in getPosts" :key="idx">
          <post-card
              :description="post.description"
              :title="post.title"
              :tags="post.tags ? post.tags : []"
              :file_url="post.files ? post.files[0] : ''"
          ></post-card>
        </router-link>
      </template>
      <p v-else class="no-post">Пока нет объявлений <span>🐶</span></p>
    </ion-content>
    <filter-modal></filter-modal>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonFab,
  IonFabList,
  IonIcon,
  IonFabButton,
  IonButton
} from "@ionic/vue";
import PostCard from "@/components/PostCard.vue";
import {heart, fastFood, arrowForwardCircle, filter } from "ionicons/icons";
import router from "@/router";
import FilterModal from "@/components/FilterModal.vue";
import {useCreatingStore} from "@/store/creating";
import {usePostsStore} from "@/store/posts";
import {storeToRefs} from "pinia";

const creatingStore = useCreatingStore()
const postsStore = usePostsStore()

postsStore.fetchPosts()

const { getPosts } = storeToRefs(postsStore)

const goTo = (route: string) => {
  router.push(`/tabs/posts/${route}`)
}

const getTypes = () => {
  creatingStore.fetchCategories()
  creatingStore.fetchTags()
  creatingStore.fetchTypes()
}
</script>

<style lang="scss">
a {
  text-decoration: none;
}
.no-post {
  height: calc(100vh - 150px);
  font-size: 20px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  span {
    display: block;
    font-size: 30px;
    margin-top: 10px;
  }
}
</style>
