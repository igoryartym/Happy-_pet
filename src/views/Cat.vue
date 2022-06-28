<template>
  <v-app class="meetups">
    <Navbar />
    <div class="search-field">
      <v-text-field
        v-model="userInput"
        label="Category"
        color="indigo"
        append-icon="mdi-magnify"
      ></v-text-field>
    </div>
    <div class="events-section">
      <NewsCard
        class="event"
        v-for="pet in cats"
        :key="pet.id"
        v-bind:pet="pet"
      />
    </div>
    <div class="no-events" v-if="cats.length === 0">
      <p class="no-event-text">Opps... No Animals Found:(</p>
      <img
        class="no-events-img"
        src="../assets/home/sheets-of-paper.png"
        alt="Sheets of paper"
      />
    </div>
    <Footer />
  </v-app>
</template>
<script>
import Navbar from "../components/Navbar";
import NewsCard from "../components/NewsCard";
import Footer from "@/components/Footer";

export default {
  name: "Cat",
  data() {
    return {
      userInput: "",
      cats: [
        {
          id: 0,
          title: "Жюлі",
          img: "cat_0.png",
          title_cont: "Замерзала біля магазину в Димер",
        },
        {
          id: 1,
          title: "Acя",
          img: "cat_2.png",
          title_cont:
            "Ви подивіться в її оченята, така ніжна та тендітна дівчинка. Асі 8 місяців, оброблена і щеплена. ",
        },
        {
          id: 2,
          title: "Боцман",
          img: "cat_1.png",
          title_cont:
            "Шикарний кіт Ботцман, якого знайшли на Бориспільській трасі. Котику 5-7 років.",
        },
      ],
    };
  },
  components: {
    Navbar,
    NewsCard,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
.meetups {
  background-color: #ecdc98;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  .search-field {
    width: 400px;
    margin: 0 auto;
  }
  .events-section {
    display: flex;
    justify-content: center;
    min-height: 100vh;
    flex-wrap: wrap;
  }
  .no-events {
    .no-events-img {
      display: block;
      width: 300px;
      margin: 5% auto;
    }
    .no-event-text {
      font-size: 28px;
      color: #3f51b5;
    }
  }
}
</style>
