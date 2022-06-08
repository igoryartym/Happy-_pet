import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import { store } from "./store";
import Vuelidate from "vuelidate";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  Vuelidate,
  created() {
    const firebaseConfig = {
      apiKey: "AIzaSyD0hI38F6F4bckPN5jAgXK3OSahpkAjGe8",
      authDomain: "vue-meetup-e56bb.firebaseapp.com",
      databaseURL:
        "https://vue-meetup-e56bb-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "vue-meetup-e56bb",
      storageBucket: "vue-meetup-e56bb.appspot.com",
      messagingSenderId: "394580470064",
      appId: "1:394580470064:web:593d0b5f03cac43ba200f5",
    };
    initializeApp(firebaseConfig);
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.$store.dispatch("autoSignIn", user);
      }
    });
  },
  render: (h) => h(App),
}).$mount("#app");
