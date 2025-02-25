<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
      <h2 class="text-2xl font-semibold text-center text-gray-700">Login</h2>

      <form @submit.prevent="handleLogin" class="mt-6">
        <div class="mb-6 items-center space-x-4">
          <div class="flex items-center">
            <label for="email" class="w-24 text-sm font-medium text-gray-600"
              >Email:</label
            >
            <input
              v-model="email"
              type="email"
              id="email"
              class="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
            />
          </div>
          <div class="flex justify-center">
            <p v-if="errors.email" class="absolute text-red-500 text-sm">
              {{ errors.email }}
            </p>
          </div>
        </div>
        <div class="mb-6 items-center space-x-4">
          <div class="flex items-center">
            <label for="password" class="w-24 text-sm font-medium text-gray-600"
              >Password:</label
            >
            <input
              v-model="password"
              type="password"
              id="password"
              class="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
            />
          </div>
          <div class="flex justify-center">
            <p v-if="errors.password" class="absolute text-red-500 text-sm">
              {{ errors.password }}
            </p>
          </div>
        </div>
        <button
          type="submit"
          class="w-full mt-4 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-gray-600">
        Don't have an account?
        <router-link to="/register" class="text-blue-500 hover:underline">
          Register now.
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      errors: {},
    };
  },
  methods: {
    async handleLogin() {
      this.errors = {};

      if (!this.email) {
        this.errors.email = "Please enter email.";
      } else if (!/\S+@\S+\.\S+/.test(this.email)) {
        this.errors.email = "Invalid email.";
      }

      if (!this.password) {
        this.errors.password = "Please enter password.";
      } else if (this.password.length < 6) {
        this.errors.password = "Password must be at least 6 characters.";
      }

      if (Object.keys(this.errors).length === 0) {
        try {
          const response = await axios.post("http://localhost:5000/api/login", {
            email: this.email,
            password: this.password,
          });
          alert("Login successful!");
          localStorage.setItem("token", response.data.token);
          const user = response.data.user;

          window.location.reload();
        } catch (error) {
          alert(error.response?.data?.message || "Serve error!");
        }
      }
    },
  },
};
</script>

<style scoped></style>
