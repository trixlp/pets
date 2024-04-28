<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text="Назад" :style="{ display: 'block' }" @click="backButton"></ion-back-button>
        </ion-buttons>
        <ion-title class="ion-no-padding">Регистрация</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list class="ion-padding-bottom">
        <ion-item class="ion-no-padding">
          <ion-input
              label="Имя"
              type="text"
              label-placement="stacked"
              :clear-input="true"
              placeholder="Введите имя"
              v-model="userData.first_name"
          >
          </ion-input>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-input
              label="Фамилия"
              type="text"
              label-placement="stacked"
              :clear-input="true"
              placeholder="Введите фамилию"
              v-model="userData.last_name"
          >
          </ion-input>
        </ion-item>
        <ion-item class="ion-no-padding" mode="ios">
          <ion-select v-model="userData.sex" aria-label="gender" interface="action-sheet" placeholder="Укажите пол" cancel-text="Отмена">
            <ion-select-option value="male">Мужчина</ion-select-option>
            <ion-select-option value="female">Женщина</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-input
              label="Email"
              type="email"
              label-placement="stacked"
              :clear-input="true"
              placeholder="Введите email"
              v-model="userData.email"
          >
          </ion-input>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-input
              label="Телефон"
              type="tel"
              :maxlength="12"
              label-placement="stacked"
              :clear-input="true"
              placeholder="Введите телефон"
              v-model="userData.phone"
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
              v-model="userData.password"
          >
          </ion-input>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-input
              label="Повторите пароль"
              type="password"
              label-placement="stacked"
              :clear-input="true"
              placeholder="Введите пароль повторно"
              v-model="userData.password_repeat"
          >
          </ion-input>
        </ion-item>
      </ion-list>
      <ion-button mode="ios" @click="registerAccount()" :disabled="disabledButton" class="ion-margin-top" expand="block">Зарегистрироваться</ion-button>
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
  IonList,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonButtons,
  IonBackButton,
  loadingController
}
  from "@ionic/vue";
import {computed, reactive} from "vue";
import {User, useAuthStore} from "@/store/auth";
import router from "@/router";

const authStore = useAuthStore();

const isAuthorized = computed((): boolean => window.localStorage.getItem('isAuthorized') === 'true');

if (isAuthorized.value) {
  router.push({ name: 'Posts' })
}


const userData = reactive({
  first_name: '',
  last_name: '',
  sex: '',
  email: '',
  phone: '',
  password: '',
  password_repeat: ''
}) as User;

const disabledButton = computed((): boolean => {
  let condition = false;

  if (userData.first_name.length <= 1) {
    condition = true;
  }
  if (userData.last_name.length <= 1) {
    condition = true;
  }
  if (!userData.sex.length) {
    condition = true;
  }
  if (userData.email.length < 4) {
    condition = true;
  }
  if (userData.phone.length < 10) {
    condition = true;
  }
  if (userData.password.length < 5 || userData.password !== userData.password_repeat) {
    condition = true;
  }

  return condition;
});

const presentLoading = async () => {
  const loading = await loadingController.create({
    message: 'Регистрируем ваш аккаунт...',
    spinner: 'crescent'
  });

  await loading.present();
}

const registerAccount = () => {
  presentLoading()
  authStore.createUser(userData);
}

const backButton = () => {
  router.back();
}
</script>
