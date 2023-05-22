<template>
  <div>
    <head-game></head-game>
    <br>
    <list-game></list-game>
  </div>
</template>

<script>
import ListGame from '@/components/gameList/ListGame.vue'
import HeadGame from '@/components/gameList/headGame.vue'
export default{
  components: { ListGame, HeadGame },
}
</script>
