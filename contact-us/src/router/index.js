import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

import Login from "../views/LoginPageView.vue";
import ContactView from "../views/ContactView.vue";
import ContactListView from "../views/ContactListView.vue";
import RegisterView from "../views/RegisterView.vue";

const routes = [
  { path: "/", component: Login },
  {
    path: "/contact",
    component: ContactView,
    meta: { requiresAuth: true, role: "User" },
  },
  {
    path: "/admin/contact-list",
    component: ContactListView,
    meta: { requiresAuth: true, role: "Admin" },
  },
  { path: "/register", component: RegisterView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (
    authStore.isAuthenticated &&
    (to.path === "/" || to.path === "/register")
  ) {
    if (authStore.userRole === "Admin") return next("/admin/contact-list");
    return next("/contact");
  }
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      return next("/");
    }

    if (to.meta.role && to.meta.role !== authStore.userRole) {
      if (authStore.userRole === "Admin") {
        return next("/admin/contact-list");
      }
      if (authStore.userRole === "User") {
        return next("/contact");
      }
    }
  }
  next();
});

export default router;
