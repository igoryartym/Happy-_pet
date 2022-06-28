<template>
  <v-app>
    <Navbar />
    <div class="home">
      <div class="main">
        <div class="main__text">
          <h1 class="main__title">Твій новий друг</h1>
          <div class="main__content">
            Онлайн-притулок домашніх тварин Прийми правильне рішення не виходячи
            з дому. Дій!
          </div>
          <v-btn class="my-6" elevation="2" dark rounded x-large color="#F80E0E"
            ><router-link
              to="/findanimals"
              style="text-decoration: none; color: white"
              >Подивитись друзів</router-link
            ></v-btn
          >
        </div>
      </div>
    </div>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    Navbar,
    Footer,
  },
  computed: {
    ...mapGetters(["getMeetups"]),
    events() {
      this.$store.dispatch("loadMeetups");
      return this.getMeetups(this.userInput);
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  background-image: url("../assets/home/backpage.png");

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
}
.main {
  position: absolute;
  width: 400px;
  height: 282px;
  left: 216px;
  top: 248px;
  .main__text {
    text-align: left;
    font-size: 24px;
    .main__title {
      font-size: 36px;
    }
    .main__content {
      font-size: 24px;
    }
  }
}
</style>
