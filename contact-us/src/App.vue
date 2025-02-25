<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "./stores/auth";
const isLoggedIn = ref(false);
const authStore = useAuthStore();
onMounted(() => {
  if (authStore.isAuthenticated) {
    isLoggedIn.value = true;
  } else {
    authStore.logout();
    isLoggedIn.value = false;
  }
});

const handleLogout = () => {
  authStore.logout();
  isLoggedIn.value = false;
  window.location.reload();
};
</script>

<template>
  <div class="relative min-h-screen bg-gray-100">
    <button
      v-if="isLoggedIn"
      @click="handleLogout"
      class="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
    >
      Logout
    </button>

    <div class="">
      <router-view></router-view>
    </div>
  </div>
</template>
