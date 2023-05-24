<template>
  <div>

    <v-toolbar  class="mx-auto" width="850px" color="rgb(28, 123, 139)" >
      <v-toolbar-title>Add Game</v-toolbar-title>
    </v-toolbar>
        <v-stepper  class="mx-auto" style="max-width: 850px"  v-model="e4" vertical>
    <v-stepper-step :complete="e4 > 1" step="1">
      Basic Information
      <small>Summarize if needed</small>
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-card color="#121212" class="mb-5" height="550px">
        <v-card-text>
          <v-form ref="form" v-model="isFormValid">
            <v-text-field v-model="title"
                          outlined
                          label="Game Title"
                          :rules="[() => !!title || 'Game Title Required']">>
            </v-text-field>
            <v-select v-model="genre"
                outlined
                :items="genres"
                label="Select Genre"
                :rules="[() => !!genre || 'Genre Required']">
            </v-select> 
            <v-icon v-if=!this.thumbnail width="250.25" height="270.66"></v-icon>
            <v-img v-else cover :src="url" width="250.25" height="270.66"></v-img>
            <v-file-input @change="pre_thumbnail"
                          style="max-width: 200px;"
                          v-model="thumbnail" 
                          label="Input thumbnail"
                          :rules="[() => !!thumbnail || 'Game Image Required']"></v-file-input>
            </v-form>
            
        </v-card-text>
      </v-card>
      <v-btn color="rgb(28, 123, 139)" :disabled="!isFormValid" @click="e4=2">Continue</v-btn> <!-- :disabled="!check1" -->

      <v-btn @click="e4=1">Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e4 > 2" step="2">Specification</v-stepper-step>

    <v-stepper-content step="2">
        <v-card color="#121212" class="mb-5" height="500px">
          <v-card-text>
            <v-form ref="form2" v-model="isFormValid2">
            <v-select v-model="platform"
                :items="platforms"
                label="Select Platform"
                outlined
                :rules="[() => !!platform || 'Game Platform Required']">
            </v-select> 
            <v-text-field outlined v-model="publisher" label="Publisher"
            :rules="[() => !!publisher || 'Publisher Required']">
            </v-text-field>
            <v-text-field outlined v-model="developer" label="Developer"
            :rules="[() => !!developer || 'Developer Required']">
            </v-text-field>
            <v-text-field outlined v-model="game_url" label="Game URL (Optional)">
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
            </v-form>

          </v-card-text>
        </v-card>
      <v-btn color="primary" :disabled="!isFormValid2" @click="e4 = 3">Continue</v-btn>
      <v-btn @click="e4 = 1">Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e4 > 3" step="3">Add Game Description</v-stepper-step>

    <v-stepper-content step="3">
      <v-card color="#121212" class="mb-5" height="200px">
        <v-card-text>
          <v-form ref="form3" v-model="isFormValid3">
          <v-text-field outlined v-model="short_description" label="Game Description"
          :rules="[() => !!short_description || 'Description Required']"></v-text-field>
        </v-form>
        </v-card-text>
      </v-card>

      <v-dialog
              v-model="dialog"
              width="550px"
              height="500px">
              <template v-slot:activator="{ props }">
                <v-btn color="primary"  v-bind="props" 
              :disabled="!isFormValid3" @click="dialog = true" >Continue</v-btn></template>
                  <v-card width="600px"
              height="150px">
                <v-card-text>
                 <h1 style="margin-top: 50px"> You are Adding Game, Are you sure?</h1>
                </v-card-text>
                <v-card-actions style="margin-top:20px">
                  <v-btn color="primary" width="220px" @click="goIndex()">Yes</v-btn>
                  <v-btn style="margin-left: 50px"  color="grey" width="220px" @click="reset">Add New Game</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

      <v-btn @click="e4 = 2">Cancel</v-btn>
    </v-stepper-content>
  </v-stepper>
    </div>
</template>

<script>
import Item from '../database/models/Item';

//import Game from '@/models/Game'
export default {
    data(){
        return{
            e4: 1,
            dialog: false,
            isFormValid: false,
            isFormValid2: false,
            isFormValid3: false,
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
          this.datas = a
        }else{
          const { data } = await this.$axios.get("/api/api1/games");
          //localStorage.clear();
          data.sort((a, b) => a.id - b.id);
          this.datas = data;
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
        },
        check1(){
          return Object.values(this.form).every((value) => !!value);
        }
    },
    methods: {
        goIndex(){
          this.id = this.getMaxId() + 1;
          this.datas.push(this.form);
          //Item.insert({data: this.datas});
          localStorage.setItem('Data', JSON.stringify(this.datas));

          this.$router.push({name:"index"});
          //this.$router.push(`/`,this.username);
          console.log(this.username)
        },
        pre_thumbnail(){
          const file = this.thumbnail;

          if(file){
            const reader = new FileReader();
          reader.onload = () => {
            this.url = reader.result;
          };
          reader.readAsDataURL(file);
          }else{
            this.url = null;
          }
        },
        getMaxId() {
          const maxId = this.datas.reduce(
            (max, item) => (item.id > max ? item.id : max),this.datas[0].id);
          return maxId;
        },
        reset(){
          this.e4 = 1;
          this.$refs.form.reset();
          this.$refs.form2.reset();
          this.$refs.form3.reset();
          this.date =  new Date().toISOString().substr(0, 10);
          this.dialog = false;
        },
       /*  save(){
          this.id = this.getMaxId() + 1;
          this.datas.push(this.form);
          //Item.insert({data: this.datas});
          localStorage.setItem('Data', JSON.stringify(this.datas));
        },
        retrieve(){
          const data = localStorage.getItem('Data');
          console.log(data);
          console.log(Item.all());
        }, */
    }
}
</script>

