<template>
    <div>
        <v-stepper v-model="e4" vertical>
    <v-stepper-step :complete="e4 > 1" step="1">
      Basic Information
      <small>Summarize if needed</small>
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-card color="#121212" class="mb-5" height="550px">
        <v-card-text>
            <v-text-field v-model="title"
                          label="Game Title">
            </v-text-field>
            <v-select v-model="genre"
                :items="genres"
                label="Select Genre">
            </v-select> 
            <v-icon v-if=!this.thumbnail width="250.25" height="270.66"></v-icon>
            <v-img v-if=!this.thumbnail ></v-img>
            <v-img v-else cover :src="url" width="250.25" height="270.66"></v-img>
            <v-file-input @change="pre_thumbnail"
                          style="max-width: 200px;"
                          v-model="thumbnail" 
                          label="Input thumbnail"></v-file-input>
            
        </v-card-text>
      </v-card>
      <v-btn color="primary" @click="e4=2">Continue</v-btn>

      <v-btn @click="e4=1">Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e4 > 2" step="2">Specification</v-stepper-step>

    <v-stepper-content step="2">
        <v-card color="#121212" class="mb-5" height="500px">
          <v-card-text>
            <v-select v-model="platform"
                :items="platforms"
                label="Select Platform">
            </v-select> 
            <v-text-field v-model="publisher" label="Publisher">
            </v-text-field>
            <v-text-field v-model="developer" label="Developer">
            </v-text-field>
            <v-text-field v-model="game_url" label="Game URL (Optional)">
            </v-text-field>
            <v-col>
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="Pick Game Released Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on">
                    </v-text-field>
                  </template>
                  <v-date-picker  v-model="date" 
                      :max="new Date().toISOString().substr(0, 10)" 
                      @input="menu = false"
                      locale="th"
                  ></v-date-picker>
                </v-menu>
              </v-col>

          </v-card-text>
        <!-- Publisher and Game URL Data -->
        </v-card>
      <v-btn color="primary" @click="e4 = 3">Continue</v-btn>
      <v-btn @click="e4 = 1">Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e4 > 3" step="3">Add Game Description</v-stepper-step>

    <v-stepper-content step="3">
      <v-card color="#121212" class="mb-5" height="200px">
        <v-card-text>
          <v-text-field v-model="short_description" label="Game Description"></v-text-field>
        </v-card-text>ั
      </v-card>
      <v-btn color="primary" @click="e4 = 4">Continue</v-btn>
      <v-btn @click="e4 = 2">Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step step="4">Optional Information</v-stepper-step>
    <v-stepper-content step="4">
      <v-card color="grey lighten-1" class="mb-5" height="200px">
        <!--GAMEURL-->
      </v-card>
      <v-btn color="primary" @click="save">Continue</v-btn>
      <v-btn @click="retrieve">Cancel</v-btn>
    </v-stepper-content>
  </v-stepper>
    </div>
</template>

<script>
import Item from '../classes/item';

//import Game from '@/models/Game'
export default {
    data(){
        return{
            e4: 1,
            datas: [],
            datas2: [],
            title: "",
            genre: "",
            thumbnail: "",
            url: null,
            platform: "",
            publisher: "",
            developer: "",
            short_description: "",
            game_url: "",
            id: "",
            date: new Date().toISOString().substr(0, 10),
            menu: false,
        }
    },
    async created() {
    try {
      if(localStorage.getItem('Data')){
        const a = JSON.parse(localStorage.getItem('Data'))
        //localStorage.clear();
        this.datas = a
      }else{
        const { data } = await this.$axios.get("/api/api1/games");
        //console.log(data);
        //localStorage.clear();
        data.sort((a, b) => a.id - b.id);
        this.datas = data;
        //localStorage.setItem('Data', JSON.stringify(data));
      }
    } catch (error) {
        console.error(error);
        }
    },
    computed:{
        genres(){
            const genree = this.datas.map((item) => item.genre)
            return genree
        },
        platforms(){
            const platformm = this.datas.map((item) => item.platform)
            return platformm
        },
        form(){
            return{
              title: this.title,
              genre: this.genre,
              thumbnail: this.url,
              platform: this.platform,
              game_url: this.game_url,
              publisher: this.publisher,
              developer: this.developer,
              short_description: this.short_description,
              id: this.id,
              release_date: this.date,
            }
        }/* ,
        items(){
          return Item.all()
        } */
    },
    methods: {
        pre_thumbnail(){
          const file = this.thumbnail;
      
          const reader = new FileReader();
          reader.onload = () => {
            this.url = reader.result;
          };
          reader.readAsDataURL(file);
        },
        save(){
          this.id = this.getMaxId() + 1;
          this.datas.push(this.form)
          //this.datas2.push(this.datas)
          localStorage.setItem('Data', JSON.stringify(this.datas));
          console.log('Max ID:', this.getMaxId());
        },
        getMaxId() {
          const maxId = this.datas.reduce(
            (max, item) => (item.id > max ? item.id : max),this.datas[0].id);
          return maxId;
        },
        retrieve(){
          const data = localStorage.getItem('Data');
          console.log(data);
        },
        add(){
            Item.insert({data : this.form})
        },
        getData(){
          return Item.all()
        }
    }
}
</script>

