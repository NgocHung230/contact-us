<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-lg p-6 bg-white shadow-md rounded-lg">
      <h2 class="text-2xl font-bold text-center mb-4">Contact Us</h2>
      <form @submit.prevent="submitForm">
        <!-- Name -->
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Name</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <p v-if="errors.name" class="text-red-500 text-sm mt-1">
            {{ errors.name }}
          </p>
        </div>

        <!-- Email -->
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">
            {{ errors.email }}
          </p>
        </div>

        <!-- Subject -->
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Subject</label>
          <input
            v-model="form.subject"
            type="text"
            class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <p v-if="errors.subject" class="text-red-500 text-sm mt-1">
            {{ errors.subject }}
          </p>
        </div>

        <!-- Message -->
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Message</label>
          <textarea
            v-model="form.message"
            class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
          ></textarea>
          <p v-if="errors.message" class="text-red-500 text-sm mt-1">
            {{ errors.message }}
          </p>
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="mb-4 text-center">
          <p class="text-green-500">{{ successMessage }}</p>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        subject: "",
        message: "",
      },
      errors: {},
      successMessage: "",
    };
  },
  methods: {
    validateForm() {
      this.errors = {};
      this.successMessage = "";
      if (!this.form.name) this.errors.name = "Name is required";
      if (!this.form.email) this.errors.email = "Email is required";
      else if (!/.+@.+\..+/.test(this.form.email))
        this.errors.email = "Invalid email format";
      if (!this.form.subject) this.errors.subject = "Subject is required";
      if (!this.form.message) this.errors.message = "Message is required";
      return Object.keys(this.errors).length === 0;
    },
    async submitForm() {
      if (!this.validateForm()) return;
      try {
        await axios.post("http://localhost:5000/api/send-message", this.form);
        this.successMessage = "Message sent successfully!";
        this.form = { name: "", email: "", subject: "", message: "" };
      } catch (error) {
        console.error("Error sending message:", error);
      }
    },
  },
};
</script>
