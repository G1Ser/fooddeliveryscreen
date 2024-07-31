<template>
  <div class="app">
    <TopComp></TopComp>
    <SecondComp></SecondComp>
    <ThirdComp></ThirdComp>
    <MapComp></MapComp>
  </div>
</template>

<script setup>
import TopComp from './components/Topcomponents/index.vue'
import SecondComp from './components/Secondcomponents/index.vue'
import ThirdComp from './components/Thirdcomponetns/index.vue'
import MapComp from './components/Mapcomponents/index.vue'
</script>

<style lang="scss" scoped>
.app{
  width: 100%;
  padding: 20px;
  background-color: #eee;
}
</style>