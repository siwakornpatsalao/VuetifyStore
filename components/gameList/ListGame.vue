<template>
  <div style="margin-left: 80px">
    <v-row>
  <v-col cols="9">
    <div>
      <v-select v-model="sort" @change="sorted" label="Show" :items="['Alphabetic','Release Date']" style="max-width: 150px;"></v-select>
    </div>
    <div class="container">
      <v-container>
        <v-row>
          <!--<pre>{{datas}}</pre>-->
          <v-col v-for="data in this.datas" :key="data.id">
            <v-card
              width="220"
              color="#121212"
              @click="goTo(data)">
              <v-img class="frame" cover :src="data.thumbnail" width="250.25" height="270.66" >
                <v-card width="60px" 
                        :class="{'blue1' : data.platform == 'PC (Windows)',
                        'red1' : data.platform == 'Web Browser', 
                        'green1' : data.platform !='PC (Windows)' && data.platform != 'Web Browser'}">
              <p>{{ data.platform == 'PC (Windows)' ? 'PC' : (data.platform == 'Web Browser' ? 'Web' : 'Web & PC') }}</p>
                </v-card>
                <v-icon v-if="data.platform== 'PC (Windows)'" class="icon1">mdi-monitor</v-icon>
                <v-icon v-if="data.platform== 'Web Browser'" class="icon1">mdi-web-box</v-icon>
                <v-icon v-if="data.platform !='PC (Windows)' && data.platform != 'Web Browser'" class="icon1">mdi-controller</v-icon>
                <v-card v-if="new Date(data.release_date).getFullYear() === new Date().getFullYear()" class="thisYear" height="20px" width="85px">
                  <p>New</p>
                </v-card>

              </v-img>
              <span style="font-size:9px;
              text-transform: uppercase;
              letter-spacing: 1px;"
              color="grey"
              >Base Game</span>
              <p size="14px">{{ data.title }}</p>
              <!-- <p size="14px">{{ data.id }}</p> -->
             <!--  <p size="14px">{{ data.genre }}</p>
              <p size="14px">{{ data.platform }}</p> -->
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-col>
  <v-col>
    <div style="margin-left: 20px">
      <div style="margin-top: 85px" >
      <v-btn style="margin-bottom: 10px" color="secondary" @click="reset">Reset</v-btn>
      <v-text-field v-model="search" 
                    prepend-inner-icon="mdi-magnify" 
                    outlined
                    placeholder="Keywords"
                    style="max-width: 200px;"
                    >
      </v-text-field>
      </div>
      <v-select v-model="genre" label="Genre" :items="genres" style="max-width: 200px;"></v-select>
      <v-select v-model="platform" label="Platform" :items="platforms" style="max-width: 200px"></v-select>
    </div>
  </v-col>
</v-row>

  <div class="text-center">
    <v-pagination v-model="page" :length="Math.ceil(filterList/perPage)" :total-visible="7">
    </v-pagination>
  </div>

  </div>
</template>

<script>
export default {
  name: "GamePage",
  data() {
    return {
      datas: [],
      search: "",
      genre: null,
      platform: null,
      sort: "",
      page: 1,
      perPage: 40,
    };
  },
  async created() { 
    try {
      /* if(localStorage.getItem('Data')){
        const data2 = JSON.parse(localStorage.getItem('Data'));
        console.log("hey"+data2)
        this.datas = data2;
      }else{ */
        const { data } = await this.$axios.get("/api/api1/games");
        console.log("hey2"+data);
        //data.sort((a, b) => a.id - b.id);
        this.datas = data;
      
    } catch (error) {
      console.error(error);
    }
  },
  computed: {
    filterList() {

      const start = (this.page - 1) * this.perPage;
      const end = start + this.perPage;

      let filteredData = this.datas.filter((data) => {
        return data.title.toLowerCase().includes(this.search.toLowerCase());
      });

      if (this.genre) {
        filteredData = filteredData.filter((data) => {
          return data.genre === this.genre;
        });
      }

      if (this.platform) {
        filteredData = filteredData.filter((data) => {
          return data.platform === this.platform;
        });
      }

      return filteredData.slice(start, end);
    },

    genres(){
      // แสดง genre ทั้งหมด
      const genree = this.datas.map((item) => item.genre)
      return genree
    },
    platforms(){
      // แสดง genre ทั้งหมด
      const platformm = this.datas.map((item) => item.platform)
      return platformm
    }
  },
  methods: {
    goTo(data){
      this.$router.push(`/${data.id}`);
    },
    sorted(){
      if(this.sort == 'Alphabetic'){
       return this.datas.sort((a, b) => {
        if (a.title < b.title) return -1; // a first
        if (a.title > b.title) return 1; // b first
        return 0;
      });
      }else if(this.sort == 'Release Date'){
        return this.datas.sort((a, b) => {
        return new Date(a.release_date) - new Date(b.release_date);
      });
      /* }else if(this.sort == 'Release Date (Descending)'){
        return this.datas.sort((c, d) => {
        return new Date(d.release_date) - new Date(c.release_date);
      }); */
      }else{
        return this.datas;
      }
    },
    update(pages){
      this.page = pages;
    },
    reset(){
      this.datas.sort((a, b) => a.id - b.id);
      this.search = "";
      this.genre = null;
      this.platform = null;
      this.sort = null;
    },
  },
  head() {
    return {
      title: "Game List",
    };
  },
  /* async fetch() {
    const { data } = await this.$axios.get("https://www.mmobomb.com/api1/games",{ mode: "no-cors" })
    //data.sort((a, b) => a.id - b.id);
    console.log(data)
    this.datas = data
  }, */
};
</script>

<style scoped>
@import '@/assets/tag.css';
@import '@/assets/frame.css';
</style>
