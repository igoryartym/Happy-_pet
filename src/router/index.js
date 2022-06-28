import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import FindAnimals from "../views/FindAnimals.vue";
import Dog from "../views/Dog.vue";
import Cat from "../views/Cat.vue";
import Bird from "../views/Bird.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/findanimals",
    name: "FindAnimals",
    component: FindAnimals,
  },

  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/dog",
    name: "Dog",
    component: Dog,
  },
  {
    path: "/cat",
    name: "Cat",
    component: Cat,
  },
  {
    path: "/bird",
    name: "Bird",
    component: Bird,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
