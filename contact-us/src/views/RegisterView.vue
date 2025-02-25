<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
      <h2 class="text-2xl font-semibold text-center text-gray-700">Register</h2>

      <form @submit.prevent="handleRegister" class="mt-6">
        <div class="mb-4 flex items-center">
          <label for="email" class="w-24 text-sm font-medium text-gray-600">
            Email:
          </label>
          <div class="flex-1">
            <input
              v-model="email"
              type="email"
              id="email"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
            />
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">
              {{ errors.email }}
            </p>
          </div>
        </div>

        <div class="mb-4 flex items-center">
          <label for="password" class="w-24 text-sm font-medium text-gray-600">
            Password:
          </label>
          <div class="flex-1">
            <input
              v-model="password"
              type="password"
              id="password"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
            />
            <p v-if="errors.password" class="text-red-500 text-sm mt-1">
              {{ errors.password }}
            </p>
          </div>
        </div>

        <div class="mb-4 flex items-center">
          <label
            for="confirmPassword"
            class="w-24 text-sm font-medium text-gray-600"
          >
            Confirm:
          </label>
          <div class="flex-1">
            <input
              v-model="confirmPassword"
              type="password"
              id="confirmPassword"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm password"
            />
            <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">
              {{ errors.confirmPassword }}
            </p>
          </div>
        </div>

        <div class="mb-4 flex items-center">
          <input
            v-model="isAdmin"
            type="checkbox"
            id="isAdmin"
            class="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring focus:ring-blue-300"
          />
          <label for="isAdmin" class="ml-2 text-sm font-medium text-gray-700">
            Register as Admin
          </label>
        </div>

        <button
          type="submit"
          class="w-full mt-4 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Register
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-gray-600">
        <router-link to="/" class="text-blue-500 hover:underline">
          Go to login
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
      confirmPassword: "",
      isAdmin: false,
      message: "",
      errors: {},
    };
  },
  methods: {
    async handleRegister() {
      this.errors = {};
      if (!this.email) {
        this.errors.email = "Email is required";
      } else if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.email)
      ) {
        this.errors.email = "Invalid email format";
      }

      if (!this.password) {
        this.errors.password = "Password is required";
      } else if (this.password.length < 6) {
        this.errors.password = "Password must be at least 6 characters";
      }

      if (!this.confirmPassword) {
        this.errors.confirmPassword = "Confirm password is required";
      } else if (this.confirmPassword !== this.password) {
        this.errors.confirmPassword = "Passwords do not match";
      }

      if (Object.keys(this.errors).length === 0) {
        try {
          const response = await axios.post(
            "http://localhost:5000/api/register",
            {
              email: this.email,
              password: this.password,
              role: this.isAdmin ? "Admin" : "User",
            }
          );
          alert("Registration successful!");
          this.$router.push("/");
        } catch (error) {
          alert(error.response?.data?.message || "Serve error!");
        }
      }
    },
  },
};
</script>
