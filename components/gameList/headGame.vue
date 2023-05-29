<template>
  <div style="margin-left:90px">
    <br>
    <v-row>
      <v-col cols="8">
        <v-carousel hide-delimiters height="500">
          <v-carousel-item v-for="data in datas2" :key="data.id" @click="goTo(data)" :src="data.thumbnail" cover contain>
          </v-carousel-item>
        </v-carousel>
      </v-col>

      <v-col cols="4" >
        <h1 class="feature">Feature Game</h1>
        <br><br><br>
        <v-row>
          <v-col cols="4" v-for="dataa in new1" :key="dataa.id">
            <v-img class="head" @click="goTo(dataa)" cover width="150.25" height="150.66" :src="dataa.thumbnail">
              <p class="thisYear">New Release</p>
            </v-img>
            <p>{{dataa.title}}</p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>


<script>
export default{
    name: "headGame",
    data(){
        return{
            model: null,
            datas2: [],
            datas3: [],
        }
    },
    async created() {
    try {
      if(localStorage.getItem('Data')){
          const a = JSON.parse(localStorage.getItem('Data'))
          a.sort((a, b) => Date.parse(b.release_date) - Date.parse(a.release_date));
          this.datas2 = a.slice(0,10);
      }else{
          const { data } = await this.$axios.get("/api/api1/games");
          data.sort((a, b) => Date.parse(b.release_date) - Date.parse(a.release_date));
          this.datas2 = data.slice(0,10);
      }
    } catch (error) {
      console.error(error);
    }
  },
  computed:{
    new1() {
      const a = this.datas2;
      a.sort((a, b) => Date.parse(b.release_date) - Date.parse(a.release_date));
      this.datas3 = a.slice(0, 5);
      return this.datas3;
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
@import '@/assets/tag.css'
</style>







