<template>
    <div>
        <v-slide-group>
            <v-slide-group-item v-for="data in datas2" :key="data.id">
                <div class="slide-item">
                    <v-img class="head" @click="goTo(data)" :src="data.thumbnail"></v-img>
                </div>
            </v-slide-group-item>
        </v-slide-group>
    </div>
</template>

<script>
export default{
    name: "headGame",
    data(){
        return{
            model: null,
            datas2: [],
        }
    },
    async created() {
    try {
      const { data } = await this.$axios.get("/api/api1/games");
      console.log(data);
      data.sort((a, b) => a.id - b.id);
      this.datas2 = data.slice(0,10);
    } catch (error) {
      console.error(error);
    }
  },
  methods:{
    goTo(data){
       this.$router.push(`/${data.id}`);
    }
  }
}
</script>

<style scoped>
@import '@/assets/head.css';
</style>







