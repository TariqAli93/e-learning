<template>
  <div class="reports-page">
    <v-card class="shadow-1 radius-1 pa-5 mb-10" color="secondary">
      <v-form ref="filterFormRef" @submit.prevent="filterFinancialDetails">
        <v-row class="align-center justify-space-between">
          <v-col cols="12" sm="12" md="3" lg="3" xl="3">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="dateRangeText"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="dateRangeText"
                  label="التاريخ (من و الى)"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  color="text"
                  outlined
                  name="dates"
                  hide-details
                  clearable
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="dates" range no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="text" @click="menu = false"> Cancel </v-btn>
                <v-btn text color="text" @click="$refs.menu.save(dates)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" sm="12" md="3" lg="3" xl="3">
            <v-select
              :items="teachers"
              item-color="text"
              color="text"
              label="الاساتذة"
              item-value="idUser"
              item-text="userName"
              name="createdBy"
              outlined
              clearable
              hide-details
            ></v-select>
          </v-col>

          <v-col cols="12" sm="12" md="3" lg="3" xl="3">
            <v-select
              :items="subjects"
              item-color="text"
              color="text"
              label="المادة"
              outlined
              item-value="idSubject"
              item-text="subjectName"
              name="subjectId"
              clearable
              hide-details
            ></v-select>
          </v-col>

          <v-col cols="12" sm="12" md="3" lg="3" xl="3">
            <v-btn color="info" class="secondary--text shadow-1" type="submit">
              <v-icon class="ml-2">search</v-icon>
              <span>بحث</span>
            </v-btn>

            <v-btn
              color="info"
              class="secondary--text shadow-1"
              @click="getFinancialDetails"
            >
              <v-icon class="ml-2">refresh</v-icon>
              <span>اعادة تعين</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="financialDetails"
      :items-per-page="15"
      class="shadow-1 radius-1 pa-5 secondary"
      loading-text="جاري التحميل"
      :search="search"
      @dblclick:row="openDetailsPage"
    >
      <template #top>
        <v-toolbar flat color="primary" class="shadow-1 radius-1">
          <div class="d-flex align-center justify-evenly" style="width: 100%">
            <v-toolbar-title style="flex: 1 1 auto"
              >التقارير المالية</v-toolbar-title
            >
            <v-text-field
              v-model="search"
              color="text"
              placeholder="ابحث في التقارير..."
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

      <template #[`item.coursePath`]="{ item }">
        <v-img
          :src="$axios.defaults.baseURL + item.coursePath"
          max-width="40px"
          max-height="40px"
        ></v-img>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dates: [],
      menu: false,
      filterFormModel: false,
      search: '',
      headers: [
        {
          text: 'المعرف',
          value: 'idCourse',
          sortable: false,
          align: 'start',
          width: 150,
        },
        {
          text: 'الصورة',
          value: 'coursePath',
          sortable: false,
          align: 'start',
          width: 150,
        },
        {
          text: 'عنوان الكورس',
          value: 'courseTitle',
          sortable: false,
          align: 'start',
          width: 150,
        },
        {
          text: 'وصف الكورس',
          value: 'courseDescription',
          sortable: false,
          align: 'start',
          width: 150,
        },
        {
          text: 'سعر الكورس',
          value: 'coursePrice',
          sortable: false,
          align: 'start',
          width: 150,
        },
        {
          text: 'المادة',
          value: 'subject.subjectName',
          sortable: false,
          align: 'start',
          width: 150,
        },
        {
          text: 'الصف',
          value: 'class.className',
          sortable: false,
          align: 'start',
          width: 200,
        },
        {
          text: 'التقيم',
          value: 'courseRate',
          sortable: false,
          align: 'start',
          width: 150,
        },
        {
          text: 'سعر المنصة',
          value: 'platformPrice',
          sortable: false,
          align: 'start',
          width: 150,
        },
        {
          text: 'السعر الكلي',
          value: 'totalPrice',
          sortable: false,
          align: 'start',
          width: 150,
        },
        {
          text: 'السعر المتبقي',
          value: 'remainingPrice',
          sortable: false,
          align: 'start',
          width: 150,
        },
      ],

      financialDetails: [],
      subjects: [],
      teachers: [],
    }
  },

  computed: {
    dateRangeText: {
      get() {
        return this.dates.join('/')
      },

      set() {
        this.dates.join('/')
      },
    },
  },

  mounted() {
    this.getFinancialDetails()
    this.getTeachers()
    this.getSubjects()
  },

  methods: {
    async getFinancialDetails() {
      this.$nuxt.$loading.start()
      try {
        const financial = await this.$axios.get('financialDetails')
        this.financialDetails = financial.data
        console.log(financial.data)
        this.$nuxt.$loading.finish()
      } catch (error) {
        console.error(error.response)
        this.$nuxt.$loading.finish()
      }
    },

    async filterFinancialDetails(event) {
      this.$nuxt.$loading.start()
      const data = Object.fromEntries(new FormData(event.target))
      const filters = {}

      if (data.dates) {
        filters.dates = data.dates.toString()
      }

      if (data.subjectId) {
        filters.subjectId = data.subjectId
      }

      if (data.createdBy) {
        filters.createdBy = data.createdBy
      }

      const queryString = Object.keys(filters)
        .map(
          (key) =>
            encodeURIComponent(key) + '=' + encodeURIComponent(filters[key])
        )
        .join('&')

      try {
        const financial = await this.$axios.get(
          `financialDetails?${queryString}`
        )
        this.financialDetails = financial.data
        this.$nuxt.$loading.finish()
      } catch (error) {
        console.error(error.response)
        this.$nuxt.$loading.finish()
      }
    },

    async getTeachers() {
      this.$nuxt.$loading.start()
      try {
        const teachers = await this.$axios.get('userRoles/3')
        this.teachers = teachers.data
        this.$nuxt.$loading.finish()
      } catch (error) {
        console.log(error.response)
        this.$nuxt.$loading.finish()
      }
    },

    async getSubjects() {
      this.$nuxt.$loading.start()
      try {
        const subjects = await this.$axios.get('subjects')
        this.subjects = subjects.data
        this.$nuxt.$loading.finish()
      } catch (error) {
        console.log(error.response)
        this.$nuxt.$loading.finish()
      }
    },

    openDetailsPage(event, item) {
      const { idCourse } = item.item
      this.$router.push({
        path: `reports/${idCourse}`,
        query: {
          p: item.item.platformPriceTotal,
          r: item.item.remainingPrice
        },
      })
    },
  },
}
</script>

<style>
</style>