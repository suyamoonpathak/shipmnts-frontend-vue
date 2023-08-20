import { createRouter, createWebHistory } from "vue-router";
import SignUp from "../components/pages/SignUp";
import SignIn from "../components/pages/SignIn";
import ErrorPage from "../components/pages/ErrorPage.vue";


const routes = [
  {
    path: "/signup",
    component: SignUp,
  },
  {
    path: "/",
    component: SignUp,
  },
  {
    path: "/signin",
    component: SignIn,
  },
  {
    path: "/:catchAll(.*)", // Use a param with a custom regexp
    component: ErrorPage,
  },

];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
