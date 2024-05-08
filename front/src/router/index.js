import * as VueRouter from "vue-router";

const routes = [
  {
    path: "/",
    name: "RegeneratingView",
    component: () => import("../views/RegeneratingView.vue"),
  },
  {
    path: "/thinking",
    name: "ThinkingView",
    component: () => import("../views/ThinkingView.vue"),
  },
  {
    path: "/discovering",
    name: "DiscoveringView",
    component: () => import("../views/DiscoveringView.vue"),
  },
  {
    path: "/maintaining",
    name: "MaintainingView",
    component: () => import("../views/MaintainingView.vue"),
  },
  {
    path: "/us",
    name: "UsView",
    component: () => import("../views/UsView.vue"),
  },
  {
    path: "/contact",
    name: "ContactView",
    component: () => import("../views/ContactView.vue"),
  },
  {
    path: "/admin",
    name: "AdminView",
    component: () => import("../views/AdminView.vue"),
  },
  {
    path: "/login",
    name: "LoginView",
    component: () => import("../views/LoginView.vue"),
  },
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(process.env.BASE_URL),
  routes
})

export default router
