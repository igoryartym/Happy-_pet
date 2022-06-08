<template>
  <v-app>
    <Navbar />
    <v-card class="form-container" elevation="5">
      <p class="form-title indigo--text font-weight-bold">Log In</p>
      <Alert
        class="alert"
        @dismissed="onDismissed"
        v-if="error"
        :text="error"
      />
      <form class="form" @submit.prevent="onSignin">
        <v-text-field v-model="email" label="*E-mail" required> </v-text-field>

        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="*Password"
          @click:append="show1 = !show1"
        ></v-text-field>
        <v-btn
          class="my-2"
          type="submit"
          elevation="2"
          dark
          rounded
          medium
          color="indigo"
          :disabled="loading"
          :loading="loading4"
          @click="loader = 'loading4'"
        >
          Log In
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>mdi-cached</v-icon>
            </span>
          </template>
        </v-btn>
      </form>
    </v-card>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "../components/Navbar";
import Alert from "../components/Alert";

export default {
  name: "Login",
  components: {
    Navbar,
    Alert,
  },

  data() {
    return {
      email: "",
      password: "",
      show1: false,
      loader: null,
      loading4: false,
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
    test() {
      console.log(this.error);
    },
    onSignin() {
      this.$store.dispatch("signUserIn", {
        email: this.email,
        password: this.password,
      });
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    },
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    },
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 2000);

      this.loader = null;
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
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
@media (max-width: 768px) {
  .form-container {
    width: 95%;
  }
}
</style>
