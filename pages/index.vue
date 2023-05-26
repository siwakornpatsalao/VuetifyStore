<template>
  <div>
    <head-game></head-game>
    <br>
    <hr/>
    <br><br>
    <h1 class="feature">Game List</h1>
    <list-game></list-game>
  </div>
</template>

<script>
import ListGame from '@/components/gameList/ListGame.vue'
import headGame from '@/components/gameList/headGame.vue'
export default{
  name: "index",
  components: { ListGame, headGame }
}
</script>

<style scoped>
@import '@/assets/frame.css';
@import '@/assets/head.css';
</style>
