import { validationMixin } from "vuelidate";

export default (await import("vue")).defineComponent({
  name: "Signup",
  components: {
    Navbar,
    Alert,
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
});
