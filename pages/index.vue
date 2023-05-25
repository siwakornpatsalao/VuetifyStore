<template>
  <div>
    <head-game></head-game>
    <br>
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
