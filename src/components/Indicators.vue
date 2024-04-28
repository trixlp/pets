<template>
  <div class="indicators">
    <div class="indicators__views">
      Просмотры:
      <span>1</span>
    </div>
    <div class="indicators__likes">
      Нравится:
      <span>0</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.indicators {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  span {
    font-weight: 700;
  }
}
</style>
