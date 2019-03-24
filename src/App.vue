<template>
  <v-app>
    <v-navigation-drawer temporary v-model="drawer" app>
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-if="userIsAuthenticated"
          @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary" dark>
      <v-toolbar-side-icon
        @click.stop="drawer = !drawer"
        class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">PiggyDevil</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat  v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-icon left>{{ item.icon }}</v-icon>
          <!-- {{ item.title }} -->
        </v-btn>
        <v-btn
          v-if="userIsAuthenticated"
          flat
          @click="onLogout">
          <v-icon left dark>exit_to_app</v-icon>
          <!-- Logout -->
        </v-btn>
        <v-flex v-if="linkAvatar">
        <v-avatar
          size="38"
          color="red"
          align-end
        >
          <img :src="avatar" alt="alt">
        </v-avatar>
        </v-flex>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
import * as firebase from 'firebase'
export default {
  data () {
    return {
      drawer: false,
      avatar: this.linkAvatar
    }
  },
  computed: {
    linkAvatar () {
      let user = firebase.auth().currentUser
      if (user != null) {
        this.avatar = user.photoURL
        return true
      } else return false
    },
    menuItems () {
      let menuItems = [
        { icon: 'face', title: 'Sign up', link: '/signup' },
        { icon: 'lock_open', title: 'Sign in', link: '/signin' }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: 'supervisor_account', title: 'View Meetups', link: '/meetups' },
          { icon: 'room', title: 'Organize Meetup', link: '/meetup/new' },
          { icon: 'person', title: 'Profile', link: '/profile' },
          { icon: 'change_history', title: 'Amulet', link: '/amulets' },
          { icon: 'add_shopping_cart', title: 'Create', link: '/amulet/new' }
        ]
      }
      return menuItems
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>
