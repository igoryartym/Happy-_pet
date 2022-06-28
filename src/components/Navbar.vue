<template>
  <nav>
    <v-app-bar-nav-icon
      class="navbar__burger"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>
    <v-toolbar class="navbar" elevation="0">
      <v-toolbar-title>
        <router-link to="/" style="text-decoration: none">
          <img src="../assets/home/logo.svg" alt="" />
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
    </v-toolbar>
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
          link: "/findanimals",
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

      return menuItems;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar img {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
}
.navbar__burger {
  display: none;
}
</style>
