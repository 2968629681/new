<template>
  <div id="app">
    <StatusBar/>
    <MainContent/>
  </div>
</template>

<script>
import StatusBar from './components/StatusBar.vue'
import MainContent from "./components/MainContent.vue";

export default {
  name: 'App',
  components: {
    StatusBar,
    MainContent
  }
}
</script>

<style>

</style>
