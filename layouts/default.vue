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
        {
          icon: 'mdi-account-multiple-plus-outline',
          title: 'Register',
          to: '/register'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Game Store'
    }
  }
}
</script>

<style scoped>
.custom {
  background: linear-gradient(to bottom right, #080B5D, #641513);
}
</style>