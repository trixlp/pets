<template>
  <ion-page>
    <ion-content class="ion-padding">
      <img src="@/assets/images/Logo.png" alt="Logo">
      <ion-list class="ion-padding-bottom">
        <ion-item class="ion-no-padding">
            <ion-input
                label="Email"
                type="email"
                label-placement="stacked"
                :clear-input="true"
                placeholder="Введите email"
                v-model="loginData.email"
            >
            </ion-input>
        </ion-item>

        <ion-item class="ion-no-padding">
          <ion-input
              label="Пароль"
              type="password"
              label-placement="stacked"
              :clear-input="true"
              placeholder="Введите пароль"
              v-model="loginData.password"
          >
          </ion-input>
        </ion-item>
      </ion-list>

      <ion-button mode="ios" @click="login" :disabled="disabledButton" class="ion-margin-top" expand="block">Войти</ion-button>
      <ion-button mode="ios" @click="goRegister()" class="ion-margin-top" expand="block">Регистрация</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {IonPage, IonContent, IonList, IonItem, IonInput, IonButton, loadingController} from "@ionic/vue";
import router from "@/router";
import { UserAuth } from "@/store/auth";
import {computed, reactive} from "vue";

// const authStore = useAuthStore();

const loginData = reactive({
  email: '',
  password: ''
}) as UserAuth

const isAuthorized = computed((): boolean => window.localStorage.getItem('isAuthorized') === 'true');

if (isAuthorized.value) {
  router.push({ name: 'Posts' })
}

const presentLoading = async () => {
  const loading = await loadingController.create({
    message: 'Проверяем ваши данные',
    spinner: 'crescent'
  });

  await loading.present();
}


const login = async () => {
  await presentLoading();

  if (loginData.email === 'admin' && loginData.password === '12345') {

    setTimeout(() => {
      localStorage.setItem('isAuthorized', 'true');
      loadingController.dismiss();    
      router.push({ name: 'Posts' });
    }, 3000);
  }

  // authStore.loginUser(loginData).then(() => {
  //   console.log('tutu')
  // }).finally(() => {
  //   loadingController.dismiss();
  // });
}

const goRegister = () => {
  router.push('/register');
}

const disabledButton = computed((): boolean => {
  let condition = false;

  if (loginData.email.length < 4) {
    condition = true;
  }
  if (loginData.password.length < 5) {
    condition = true;
  }

  return condition;
});
</script>

<style lang="scss" scoped>
  img {
    display: block;
    width: 100%;
    max-width: 250px;
    margin: 5rem auto 0 auto;
  }
</style>
