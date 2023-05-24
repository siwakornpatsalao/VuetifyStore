<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="secondary"
    >
    <!-- ด้านบน-->
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
         
      </v-btn>
      <v-toolbar-title style="margin-right: 20px">{{ title }}</v-toolbar-title>
      
      <v-list color="secondary" style="display: flex; flex-direction: row;">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          link
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-spacer></v-spacer>

      <a v-if="username">Welcome, {{ username }}</a>
      <a v-else></a>

      <v-list color="secondary" style="display: flex;  margin-left:40px; flex-direction: row;">
        <v-list-item
          v-for="(item, i) in items2"
          :key="i"
          :to="item.to"
          link
          @click="username ? dialog = true : login()"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>

            <v-list-item-title v-if="username">
              <v-dialog
              v-model="dialog"
              width="500px"
              height="500px"
            >
              <template v-slot:activator="{ props }">
           <v-list-item-title type="submit" @click="dialog = true"
                  v-bind="props"> Logout </v-list-item-title></template>
                  <v-card
                  width="800px"
                  height="200px">
                    <v-col>
                      <h1 style="margin-top: 20px">You are Logging out</h1>
                <v-card-actions style="margin-top:20px">
                  <v-btn color="primary" height="50px" width="150px" @click="logout()">Yes</v-btn>
                  <v-btn color="grey" style="margin-left: 100px" height="50px" width="150px" @click="dialog=false">Cancel</v-btn>
                </v-card-actions>
                    </v-col>
              </v-card>
            </v-dialog> 
            
            </v-list-item-title>

            <v-list-item-title v-else>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-app-bar>
    <v-main class="custom">
      <v-container>
        <Nuxt></Nuxt>
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; Version: {{version }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import ver from '../package.json'
export default {
  name: 'DefaultLayout',
  data () {
    return {
      dialog: false,
      username: "",
      version: ver.version,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-plus-circle-outline',
          title: 'Add Game',
          to: '/add'
        },
      ],
      items2: [
        {
          icon: 'mdi-account-multiple',
          title: 'Login',
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Game Store'
    }
  },
  created() {
    this.username = localStorage.getItem("username")
  },
  methods:{
    logout(){
      const a = localStorage.setItem("username","");
      this.username =  a;
    },
    login(){
      this.$router.push({name:"login"});
    }
  }
}
</script>

<style scoped>
.custom {
  background: linear-gradient(to bottom right, #080B5D, #641513);
}
</style>