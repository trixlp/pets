<template>
  <div class="image-upload-button">
    <input ref="file" id="upload" type="file" @change="handleUploadFile"/>
    <label for="upload" class="upload-loading">
      <ion-icon :icon="image"></ion-icon>
      <span>Загрузить фотографию</span>
    </label>
  </div>
  <div class="uploaded-images" v-if="getFileName">
    <div class="uploaded-images__item">
      <img :src="'https://pets.dev-incubator.kz/static/' + getFileName" alt="Post Img">
    </div>
  </div>
</template>

<script lang="ts" setup>
import {IonIcon} from "@ionic/vue";
import {image} from "ionicons/icons";
import {ref, Ref} from "vue";
import {useCreatingStore} from "@/store/creating";
const file: Ref<any> = ref(null);
const creatingStore = useCreatingStore()
import {storeToRefs} from "pinia";

const { getFileName } = storeToRefs(creatingStore)

function handleUploadFile() {
  creatingStore.uploadFile({ file: file.value.files[0], name: file.value.files[0].name });
}

</script>


<style lang="scss" scoped>
.image-upload-button {
  margin-top: 1rem;
  input {
    display: none;
  }
  label {
    background-image: linear-gradient(50deg, #C34C9B, transparent 50%), linear-gradient(50deg, #C34C9B, transparent 50%), linear-gradient(0deg, #C34C9B, transparent 50%), linear-gradient(0deg, #C34C9B, transparent 50%);
    background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
    background-size: 15px 2px, 15px 2px, 2px 15px, 2px 15px;
    background-position: left top, right bottom, left bottom, right top;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem 0;
    border-radius: 10px;
    color: #C34C9B;
    span {
      font-weight: 700;
      margin-left: 0.5rem;
    }
    ion-icon {
      font-size: 20px;
    }
  }
}

.upload-loading {
  animation: border-dance 0.5s infinite linear;
}
@keyframes border-dance {
  0% {
    background-position: left top, right bottom, left bottom, right   top;
  }
  100% {
    background-position: left 15px top, right 15px bottom , left bottom 15px , right   top 15px;
  }
}

.uploaded-images {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  &__item {
    width: 32.3%;
    margin-bottom: 5px;
    border-radius: 5px;
    border: 2px solid #C34C9B;
    img {
      border-radius: 5px;
      width: 100%;
      height: 80px;
      object-fit: cover;
      display: block;
    }
  }
}
</style>
