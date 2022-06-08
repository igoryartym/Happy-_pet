<template>
  <v-app>
    <v-content>
      <Navbar />
      <v-breadcrumbs :items="items">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
            class="bread-crumbs"
            :href="item.href"
            :disabled="item.disabled"
          >
            {{ item.text.toUpperCase() }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>

      <v-container>
        <v-row class="event">
          <v-col cols="auto">
            <v-card class="mx-auto text-left event-organizer" width="100%">
              <v-card-text>
                <v-row justify="center">
                  <v-avatar size="80">
                    <img
                      src="https://i0.wp.com/www.hadviser.com/wp-content/uploads/2019/04/28-natural-waves-for-square-face-BaFK4-OgHH8.jpg?resize=987%2C1038&ssl=1"
                      alt="John"
                    />
                  </v-avatar>
                </v-row>
                <v-row justify="center">Joe Doe</v-row>
                <v-divider class="my-3"></v-divider>
                <div class="event-organizer__details">
                  <div class="event-organizer__detail">
                    <v-icon>mdi-calendar-month-outline</v-icon>
                    {{ events.date }}
                  </div>
                  <div class="event-organizer__detail">
                    <v-icon>mdi-clock-time-eight-outline</v-icon>
                    {{ events.time }}
                  </div>
                  <div class="event-organizer__detail">
                    <v-icon>mdi-map-marker</v-icon>
                    {{ events.topic }}
                  </div>
                </div>
              </v-card-text>
            </v-card>
            <br />
            <EditNews :event="events" v-if="canEdit" />
          </v-col>
          <v-col>
            <v-card class="mx-auto text-left" width="100%">
              <v-card-text>
                <h1 class="text-h4 text--primary">{{ events.title }}</h1>
                <br />
                <div class="event-img">
                  <img :src="events.imageUrl" alt="" />
                </div>
                <p>
                  {{ events.description }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <Footer class="footer" />
  </v-app>
</template>

<script>
import Navbar from "../components/Navbar";
import EditNews from "../components/EditNews";

import { mapGetters } from "vuex";
export default {
  props: ["id"],
  components: {
    Navbar,
    EditNews,
  },
  computed: {
    ...mapGetters(["getMeetupById"]),
    events() {
      return this.getMeetupById(parseFloat(this.id));
    },
    canEdit() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
  },
  data() {
    return {
      items: [
        {
          text: "Home",
          href: "/",
        },
        {
          text: "News",
          href: "/news",
        },
        {
          text: this.$store.getters.getMeetupById(parseFloat(this.id)).title,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.bread-crumbs {
  color: #3f51b5;
}
.avatar {
  text-align: center;
  margin: 0 50%;
}
.event-organizer {
  .event-organizer__details {
    width: fit-content;
    margin: 5% auto;
    .event-organizer__detail {
      margin: 30px;
    }
  }
}
.event-img {
  margin: 30px auto;
  width: fit-content;
  img {
    width: 500px;
    border-radius: 10px;
  }
}
@media (max-width: 1024px) {
  .event {
    flex-direction: column;
    .event-organizer__details {
      width: 100%;
    }
  }
  .event-img {
    img {
      width: 400px;
    }
  }
}
@media (max-width: 550px) {
  .event-img {
    img {
      width: 300px;
    }
  }
}
</style>
