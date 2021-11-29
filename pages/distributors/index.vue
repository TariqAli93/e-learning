<template>
  <div id="distributors-page">
    <v-dialog v-model="createDistributorDialog" max-width="750px" transition="slide-y-transition">
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-form ref="createDistributorRef" v-model="createDistributor" lazy-validation>
          <v-row>
            <v-col cols="12" sm="12" md="6" lg="6" xl="6"></v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>

    <v-data-table
      :headers="headers"
      :items.sync="distributors"
      :items-per-page="15"
      item-key="courseId"
      class="shadow-1 radius-1 pa-5 secondary"
      :search="search"
    >
      <template #top>
        <v-toolbar flat color="primary" class="shadow-1 radius-1">
          <div class="d-flex align-center justify-evenly" style="width: 100%">
            <v-toolbar-title style="flex: 1 1 auto">الموزعين</v-toolbar-title>
            <v-text-field
              v-model="search"
              color="text"
              placeholder="ابحث في الموزعين..."
              style="flex: 1 1 auto"
              outlined
              hide-details
              dense
              clearable
            >
            </v-text-field>

            <v-tooltip bottom transition="slide-y-transition" color="text">
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  color="text"
                  v-bind="attrs"
                  class="mr-10"
                  v-on="on"
                  @click="$router.push('/courses/add')"
                >
                  <v-icon>add</v-icon>
                </v-btn>
              </template>
              <span class="primary--text">اضافة موزع جديد</span>
            </v-tooltip>
          </div>
        </v-toolbar>
      </template>

      <template #[`item.location`]="{ item }">
        <v-btn
          color="error"
          icon
          :href="`https://www.google.com/maps/@${item.lang},${item.lat}`"
          target="_blank"
        >
          <v-icon>location_on</v-icon>
        </v-btn>
      </template>

      <template #[`item.distributorPhoto`]="{ item }">
        <v-img
          :src="$axios.defaults.baseURL + item.distributorPhoto"
          max-width="50px"
          height="50px"
        ></v-img>
      </template>

      <template #[`item.actions`]="{ item }">
        <v-btn color="error" icon @click="deleteDistributor(item)">
          <v-icon>delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    search: '',
    headers: [
      {
        text: 'المعرف',
        align: 'start',
        value: 'idDistributor',
        sortable: false,
      },
      { text: 'الصورة', value: 'distributorPhoto', sortable: false },
      { text: 'اسم المستخدم', value: 'userName', sortable: false },
      { text: 'عن الموزع', value: 'distributorBio', sortable: false },
      { text: 'اسم المكتبة', value: 'libraryName', sortable: false },
      { text: 'الهاتف', value: 'phone', sortable: false },
      { text: 'المحافظة', value: 'province.provinceName', sortable: false },
      { text: 'الخريطة', value: 'location', sortable: false },
      { text: 'الاجرائات', value: 'actions', sortable: false },
    ],

    distributors: [],
    provinces: [],
    roles: [],
    provinceId: null,
    roleId: null,
    username: null,
    password: null,
    phone: null,
    distributorPhoto: null,
    distributorBio: null,
    libraryName: null,
  }),

  mounted() {
    this.getDistributors()
  },

  methods: {
    async getDistributors() {
      try {
        const distributors = await this.$axios.get(`distributorInfos`)
        const users = []
        for (let i = 0; i < distributors.data.length; i++) {
          const user = await this.$axios.get(
            `user/${distributors.data[i].userId}`
          )
          users.push({
            ...user.data,
            ...distributors.data[i],
          })
        }

        this.distributors = users
      } catch (e) {
        console.error(e.response)
      }
    },

    async deleteDistributor(item) {
      if (confirm('هل تريد حذف الموزع ؟')) {
        try {
          const deleteDist = await this.$axios.delete(
            `distributorInfo/${item.idDistributor}`
          )
          console.log(deleteDist)
        } catch (error) {
          console.log(error.response)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>