import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
  }),
  getters: {
    isAuthenticated: (state) => {
      if (!state.token) return false;

      try {
        const decoded = jwtDecode(state.token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded.exp < currentTime) {
          useAuthStore().logout();
          return false;
        }

        return true;
      } catch (error) {
        return false;
      }
    },
    userRole: (state) => {
      if (!state.token) return null;

      try {
        const decoded = jwtDecode(state.token);
        return decoded.role || null;
      } catch (error) {
        return null;
      }
    },
  },
  actions: {
    login(token) {
      this.token = token;
      localStorage.setItem("token", token);
    },
    logout() {
      this.token = null;
      localStorage.removeItem("token");
    },
  },
});
