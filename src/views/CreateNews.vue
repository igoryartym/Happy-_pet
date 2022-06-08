<template>
  <v-app>
    <v-content>
      <Navbar />
      <v-card class="form-container" elevation="5">
        <p class="form-title indigo--text font-weight-bold">Add News</p>
        <form class="form" @submit.prevent="addMeetup">
          <v-text-field
            v-model="title"
            :error-messages="titleErrors"
            :counter="60"
            label="*Title"
            required
            @input="$v.title.$touch()"
            @blur="$v.title.$touch()"
          >
          </v-text-field>
          <v-text-field
            v-model="topic"
            :error-messages="topicErrors"
            label="*Topic"
            required
          ></v-text-field>
          <v-text-field v-model="imageUrl" label="Image url"></v-text-field>
          <div class="form-img">
            <img :src="imageUrl" height="250" />
          </div>
          <v-textarea
            v-model="description"
            :error-messages="descriptionErrors"
            counter
            required
            label="*Description"
          ></v-textarea>
          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="date"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Picker in dialog"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              scrollable
              header-color="indigo"
              color="indigo"
            >
              <v-spacer></v-spacer>
              <v-btn text color="indigo" @click="modal = false"> Cancel </v-btn>
              <v-btn text color="indigo" @click="$refs.dialog.save(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
          <v-dialog
            ref="dialogTime"
            v-model="modal2"
            :return-value.sync="time"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="time"
                label="Picker in dialog"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="modal2"
              v-model="time"
              full-width
              header-color="indigo"
              color="indigo"
            >
              <v-spacer></v-spacer>
              <v-btn text color="indigo" @click="modal2 = false">
                Cancel
              </v-btn>
              <v-btn text color="indigo" @click="$refs.dialogTime.save(time)">
                OK
              </v-btn>
            </v-time-picker>
          </v-dialog>
          <v-btn
            class="my-2"
            type="submit"
            elevation="2"
            dark
            rounded
            medium
            color="indigo"
          >
            Add News
          </v-btn>
        </form>
      </v-card>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "../components/Navbar";

import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  name: "CreateNews",
  components: {
    Navbar,
  },
  mixins: [validationMixin],
  validations: {
    title: { required, maxLength: maxLength(60) },
    topic: { required },
    description: { required },
  },

  data() {
    return {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      modal: false,
      modal2: false,
      title: "",
      topic: "",
      description: "",
      imageUrl: "",
      time: null,
    };
  },
  computed: {
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.maxLength &&
        errors.push("Title must be at most 60 characters long");
      !this.$v.title.required && errors.push("Name is required.");
      return errors;
    },
    topicErrors() {
      const errors = [];
      if (!this.$v.topic.$dirty) return errors;
      !this.$v.topic.required && errors.push("topic is required.");
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) return errors;
      !this.$v.description.required && errors.push("Description is required.");
      return errors;
    },
  },

  methods: {
    ...mapActions(["addMeetupAction"]),
    addMeetup() {
      const meetupData = {
        id: new Date().getTime(),
        title: this.title,
        topic: this.topic,
        imageUrl: this.imageUrl,
        description: this.description,
        date: this.date,
        time: this.time,
      };
      let us = this.$store.getters.user;
      console.log(us);
      this.addMeetupAction(meetupData);
      this.$router.push("/animals");
    },
  },
};
</script>

<style lang="scss" scoped>
.form-container {
  width: 70%;
  margin: 5% auto;
  padding: 2%;
  .form-title {
    font-size: 24px;
  }
  .form-img {
    text-align: left;
    img {
      border-radius: 5px;
    }
  }
}
@media (max-width: 768px) {
  .form-container {
    width: 95%;
    .form-img {
      img {
        width: 350px;
      }
    }
  }
}
@media (max-width: 350px) {
  .form-container {
    .form-img {
      img {
        width: 300px;
      }
    }
  }
}
</style>
