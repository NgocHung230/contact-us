<template>
  <div class="p-10 max-w-4xl mx-auto">
    <div class="flex justify-between mb-4 space-x-4">
      <div class="relative flex-1">
        <input
          v-model="searchQuery"
          placeholder="Search..."
          class="w-full px-4 py-2 border rounded-lg pl-10"
        />
        <svg
          class="absolute left-3 top-2.5 h-5 w-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-4.35-4.35m1.85-4.65a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
      <button
        @click="fetchContacts"
        class="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
      >
        Search
      </button>
    </div>

    <!-- Table -->
    <div
      class="overflow-y-auto shadow-lg rounded-lg border border-gray-200"
      style="height: 500px"
    >
      <table
        class="w-full table-fixed bg-white border border-gray-300 text-left"
        style="height: 500px"
      >
        <thead class="bg-gray-700 text-white sticky top-0">
          <tr>
            <th class="px-6 py-3 w-1/6 text-center">No</th>
            <th
              class="px-6 py-3 w-1/5 text-center cursor-pointer"
              @click="setSort('name')"
            >
              Name
              <span v-if="sortBy === 'name'">{{
                sortOrder === "asc" ? "▼" : "▲"
              }}</span>
            </th>
            <th
              class="px-6 py-3 w-1/5 text-center cursor-pointer"
              @click="setSort('email')"
            >
              Email
              <span v-if="sortBy === 'email'">{{
                sortOrder === "asc" ? "▼" : "▲"
              }}</span>
            </th>
            <th
              class="px-6 py-3 w-1/6 text-center cursor-pointer"
              @click="setSort('subject')"
            >
              Subject
              <span v-if="sortBy === 'subject'">{{
                sortOrder === "asc" ? "▼" : "▲"
              }}</span>
            </th>
            <th class="px-6 py-3 w-1/3 text-center">Message</th>
          </tr>
        </thead>
        <tbody class="align-top">
          <tr
            v-for="(contact, index) in contacts"
            :key="contact._id"
            class="border-t hover:bg-gray-100"
          >
            <td class="px-6 py-3 text-center truncate">
              {{ (currentPage - 1) * itemsPerPage + index + 1 }}
            </td>
            <td class="px-6 py-3 text-center truncate" :title="contact.name">
              {{ contact.name }}
            </td>
            <td class="px-6 py-3 text-center truncate" :title="contact.email">
              {{ contact.email }}
            </td>
            <td class="px-6 py-3 text-center truncate" :title="contact.subject">
              {{ contact.subject }}
            </td>
            <td class="px-6 py-3 text-center truncate" :title="contact.message">
              {{ contact.message }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="mt-6 flex justify-center space-x-2">
      <button
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-3 py-2 text-gray-700 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &lt;
      </button>
      <button
        v-for="page in totalPages"
        :key="page"
        @click="changePage(page)"
        class="px-3 py-2 border rounded-lg"
        :class="{ 'bg-gray-700 text-white': page === currentPage }"
      >
        {{ page }}
      </button>
      <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-3 py-2 text-gray-700 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &gt;
      </button>
      <select
        v-model="itemsPerPage"
        @change="fetchContacts"
        class="text-center border rounded-lg bg-gray-300"
      >
        <option :value="5">5</option>
        <option :value="10">10</option>
        <option :value="20">20</option>
        <option :value="50">50</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const contacts = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalPages = ref(1);
const searchQuery = ref("");
const sortBy = ref("");
const sortOrder = ref("asc");

const fetchContacts = async () => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/getContactList",
      {
        page: currentPage.value,
        itemsPerPage: itemsPerPage.value,
        searchQuery: searchQuery.value,
        sortBy: sortBy.value,
        sortOrder: sortOrder.value,
      }
    );

    contacts.value = response.data.data;
    totalPages.value = response.data.pagination.totalPages;
    currentPage.value = response.data.pagination.currentPage;
  } catch (error) {
    console.error("Error fetching contacts:", error);
  }
};

const setSort = (column) => {
  if (sortBy.value === column) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortBy.value = column;
    sortOrder.value = "asc";
  }
  fetchContacts();
};
const changePage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page;
    fetchContacts();
  }
};

onMounted(fetchContacts);
</script>
