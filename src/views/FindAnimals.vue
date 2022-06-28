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
      <div class="wrapper" v-for="pet in pets" :key="pet.id" v-bind:pet="pet">
        <router-link :to="pet.link" style="color: black">
          <div class="img_container">
            <img :src="require(`@/assets/cards/${pet.img}`)" alt="" />
          </div>
          <div class="title">
            <p>{{ pet.title }}</p>
          </div>
        </router-link>
      </div>
    </div>
    <div class="no-events" v-if="pets.length === 0">
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
  name: "FindAnimals",
  data() {
    return {
      userInput: "",
      pets: [
        {
          id: 0,
          title: "Собаки",
          img: "dog.svg",
          link: "/dog",
        },
        {
          id: 1,
          title: "Папуги",
          img: "p.png",
          link: "/bird",
        },
        {
          id: 2,
          title: "Коти",
          img: "cat.svg",
          link: "/cat",
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
.wrapper {
  background-color: white;
  box-shadow: 5px;
  padding: 10px;
  outline: 1px solid grey;
  border-radius: 10px;
  text-align: center;
  margin: 20px;
  height: fit-content;
}

.title p {
  font-size: 20px;
  font-weight: bold;
  margin: 10px;
}

.img_container img {
  width: 200px;
  height: 220px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
.meetups {
  background-color: #ecdc98;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
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
</style>
