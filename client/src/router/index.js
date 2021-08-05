import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/SignUp.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/posts",
    name: "Posts",
    component: () => 
      import(/* webpackChunkName: "posts" */ "../views/Posts.vue")
  },
  {
    path: "/createposts",
    name: "CreatePosts",
    component: () => 
      import(/* webpackChunkName: "createposts" */ "../views/CreatePosts.vue")
  },
];

const router = new VueRouter({
  mode:"history",
  routes:routes,
});

export default router;
