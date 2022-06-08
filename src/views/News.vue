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
        v-for="event in events"
        :key="event.id"
        v-bind:event="event"
      />
    </div>
    <div class="no-events" v-if="events.length === 0">
      <p class="no-event-text">Opps... No Animals Found:(</p>
      <img
        class="no-events-img"
        src="../assets/meetups/sheets-of-paper.png"
        alt="Sheets of paper"
      />
    </div>
    <Footer class="footer" />
  </v-app>
</template>
<script>
import Navbar from "../components/Navbar";
import NewsCard from "../components/NewsCard";

import { mapGetters } from "vuex";

export default {
  name: "News",
  components: {
    Navbar,
    NewsCard,
  },
  computed: {
    ...mapGetters(["getMeetups"]),
    events() {
      this.$store.dispatch("loadMeetups");
      return this.getMeetups(this.userInput);
    },
  },
  data() {
    return {
      userInput: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.meetups {
  height: 100vh;
  .search-field {
    width: 400px;
    margin: 0 auto;
  }
  .events-section {
    display: flex;
    margin: 0 2%;
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
  .footer {
    margin-bottom: 0;
  }
}
@media (max-width: 481px) {
  .search-field {
    width: 300px !important;
  }
  .no-events-img {
    width: 180px;
  }
}
</style>
