<template>
  <div id="LibraryPage">
    <v-data-table
      :headers="headers"
      :items="users"
      :items-per-page="15"
      class="shadow-1 radius-1 pa-5 secondary"
      :search="search"
    >
      <template #top>
        <v-toolbar flat color="primary" class="shadow-1 radius-1">
          <div class="d-flex align-center justify-evenly" style="width: 100%">
            <v-toolbar-title style="flex: 1 1 auto">المستخدمين</v-toolbar-title>
            <v-text-field
              v-model="search"
              color="text"
              placeholder="ابحث في المستخدمين..."
              style="flex: 1 1 auto"
              outlined
              hide-details
              dense
              clearable
            >
            </v-text-field>
          </div>
        </v-toolbar>
      </template>

      <template #[`item.actions`]="{ item }">
        <v-btn color="error" icon @click="deleteUser(item)">
          <v-icon>delete</v-icon>
        </v-btn>
      </template>

      <template #[`item.role.roleName`]="{ item }">
        <v-chip color="primary" label class="text--text">
          {{ item.role.roleName.toLowerCase() }}
        </v-chip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    search: '',
    headers: [
      { text: 'اسم المستخدم', value: 'userName', sortable: false },
      { text: 'رقم الهاتف', value: 'phone', sortable: false },
      { text: 'المحافظة', value: 'province.provinceName', sortable: false },
      { text: 'نوع الحساب', value: 'role.roleName', sortable: false },
      { text: 'الاجرائات', value: 'actions', sortable: false },
    ],

    users: [],
  }),

  mounted() {
    this.getUsers()
  },

  methods: {
    async getUsers() {
      this.$nuxt.$loading.start()
      try {
        const users = await this.$axios.get('users')
        this.users = users.data
        this.$nuxt.$loading.finish()
      } catch (error) {
        console.error(error.response)
        this.$nuxt.$loading.finish()
      }
    },

    deleteUser(item) {
      console.log(item)
    }
  },
}
</script>

<style lang="scss" scoped>
</style>