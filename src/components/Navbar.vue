<template>
  <nav>
    <v-app-bar-nav-icon
      class="navbar__burger"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>
    <v-toolbar class="navbar" elevation="0">
      <v-toolbar-title>
        <router-link to="/" style="text-decoration: none; color: inherit">
          <span class="font-weight-bold black--text">Happy Pet</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn
        class="ma-2"
        plain
        color="indigo"
        v-for="item in menuItems"
        :key="item.id"
      >
        <router-link
          :to="item.link"
          style="text-decoration: none; color: black"
        >
          <span>{{ item.title }}</span></router-link
        >
        <v-icon right>{{ item.icon }}</v-icon>
      </v-btn>
      <v-btn
        class="ma-2"
        plain
        color="indigo"
        v-if="userIsAuthenticated"
        @click="onLogout"
      >
        <span>LOG OUT</span>
        <v-icon right>mdi-account-plus-outlinet</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" absolute temporary left>
      <v-list nav flat>
        <v-list-item-group active-class="deep-indigo--text text--accent-4">
          <router-link style="text-decoration: none; color: inherit" to="/">
            <v-btn
              class="my-8 elevation-0 mobile-nav-btn"
              color="indigo--text"
              plain
            >
              <span class="mobile-title">Happy Pet</span>
            </v-btn>
          </router-link>
          <v-btn
            class="ma-2"
            plain
            color="indigo"
            v-for="item in menuItems"
            :key="item.id"
          >
            <router-link
              :to="item.link"
              style="text-decoration: none; color: inherit"
              ><span>{{ item.title }}</span></router-link
            >
            <v-icon right>{{ item.icon }}</v-icon>
          </v-btn>

          <v-btn
            class="ma-2"
            plain
            color="indigo"
            v-if="userIsAuthenticated"
            @click="onLogout"
          >
            <span>LOG OUT</span>
            <v-icon right>mdi-account-plus-outlinet</v-icon>
          </v-btn>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    menuItems() {
      let menuItems = [
        {
          id: 1,
          icon: "mdi-magnify",
          title: "Find Animals",
          link: "/news",
        },
        {
          id: 2,
          icon: "mdi-account-arrow-right",
          title: "Log in",
          link: "/login",
        },
        {
          id: 3,
          icon: "mdi-account-plus-outline",
          title: "Sign Up",
          link: "/signup",
        },
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          {
            id: 1,
            icon: "mdi-magnify",
            title: "Find Animals",
            link: "/news",
          },
          {
            id: 3,
            icon: "mdi-account-plus-outline",
            title: "Add News",
            link: "/new-news",
          },
        ];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar__burger {
  display: none;
}
.mobile-title {
  font-weight: 800;
  color: #000000;
}

@media (max-width: 769px) {
  .navbar {
    display: none;
  }
  .navbar__burger {
    display: block;
  }
}
</style>
