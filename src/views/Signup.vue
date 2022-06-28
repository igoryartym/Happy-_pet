<template>
  <v-app class="signup_container">
    <Navbar />
    <div class="section-singup">
      <v-card class="form-container" elevation="5">
        <p class="form-title indigo--text font-weight-bold">Sign Up</p>
        <Alert
          class="alert"
          @dismissed="onDismissed"
          v-if="error"
          :text="error.message"
        />
        <form class="form" @submit.prevent="onSignup">
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="*E-mail"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          >
          </v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="*Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-text-field
            v-model="confirmedPassword"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.comparePasswords]"
            :type="show2 ? 'text' : 'password'"
            name="input-10-1"
            label="*Confirm Password"
            hint="At least 8 characters"
            counter
            @click:append="show2 = !show2"
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
            Sign Up
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon light>mdi-cached</v-icon>
              </span>
            </template>
          </v-btn>
        </form>
      </v-card>
    </div>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "../components/Navbar";
import Alert from "../components/Alert";
import Footer from "@/components/Footer";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "Signup",
  components: {
    Navbar,
    Alert,
    Footer,
  },
  mixins: [validationMixin],

  data() {
    return {
      email: "",
      password: "",
      confirmedPassword: "",
      show1: false,
      show2: false,
      displayError: false,
      loader: null,
      loading4: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        comparePasswords: (value) =>
          value === this.password || "Password do not match",
      },
    };
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
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

  validations: {
    email: { required, email },
  },
  methods: {
    onSignup() {
      this.$store.dispatch("signUserUp", {
        email: this.email,
        password: this.password,
      });
    },
    onDismissed() {
      this.displayError = true;
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
.signup_container {
  background-color: #ecdc98;
}
.section-singup {
  min-height: 100vh;
}
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
</style>
