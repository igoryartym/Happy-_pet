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
        v-for="pet in birds"
        :key="pet.id"
        v-bind:pet="pet"
      />
    </div>
    <div class="no-events" v-if="birds.length === 0">
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
import Footer from "@/components/Footer";
import NewsCard from "../components/NewsCard";

export default {
  name: "Bird",
  data() {
    return {
      userInput: "",
      birds: [
        {
          id: 0,
          title: "Пепі",
          img: "parrot_01.png",
          title_cont: "Новий гість. Відбитий у сірих ворон.",
        },
        {
          id: 1,
          title: "Клайд і Боні",
          img: "parrot_1.png",
          title_cont: "Красива пара знайдена на смітнику.",
        },
        {
          id: 2,
          title: "Геша",
          img: "parrot_2.png",
          title_cont: "Покинути на призволяще на окупованій території.",
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
