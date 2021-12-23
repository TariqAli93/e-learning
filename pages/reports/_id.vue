<template>
  <div class="details-page">
    <v-card class="shadow-1 radius-1 pa-5 mb-10" color="secondary">
      <v-row class="align-center justify-center">
        <v-col cols="12" sm="12" md="3" lg="3" xl="3">
          <span
            style="width: 100%; text-align: center"
            class="d-block shadow-1 primary pa-5 radius-1"
            >سعر الكورس: {{ coursePrice }}</span
          >
        </v-col>

        <v-col cols="12" sm="12" md="3" lg="3" xl="3">
          <span
            style="width: 100%; text-align: center"
            class="d-block shadow-1 primary pa-5 radius-1"
            >السعر الكلي للمنصة: {{ platformPriceTotal }}</span
          >
        </v-col>

        <v-col cols="12" sm="12" md="3" lg="3" xl="3">
          <span
            style="width: 100%; text-align: center"
            class="d-block shadow-1 primary pa-5 radius-1"
            >مبالغ غير مدفوعة: {{ platformPriceTotal }}</span
          >
        </v-col>

        <v-col cols="12" sm="12" md="3" lg="3" xl="3">
          <span
            style="width: 100%; text-align: center"
            class="d-block shadow-1 primary pa-5 radius-1"
            >مجموع الخصم: {{ discounts }}</span
          >
        </v-col>
      </v-row>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="details"
      :items-per-page="15"
      class="shadow-1 radius-1 pa-5 secondary"
      loading-text="جاري التحميل"
      :search="search"
    >
      <template #top>
        <v-toolbar flat color="primary" class="shadow-1 radius-1">
          <div class="d-flex align-center justify-evenly" style="width: 100%">
            <v-toolbar-title style="flex: 1 1 auto">{{
              courseName
            }}</v-toolbar-title>
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

      <template #[`item.id`]="{ item }">
        {{ item.student.user.idUser }}
      </template>

      <template #[`item.name`]="{ item }">
        {{ item.student.user.userName }}
      </template>

      <template #[`item.status`]="{ item }">
        <v-chip
          v-if="item.status.idStatus === 1"
          color="warning"
          class="primary--text"
        >
          {{ item.status.statusName }}
        </v-chip>

        <v-chip
          v-else-if="item.status.idStatus === 2"
          color="error"
          class="primary--text"
        >
          {{ item.status.statusName }}
        </v-chip>

        <v-chip v-else color="success" class="primary--text">
          {{ item.status.statusName }}
        </v-chip>
      </template>

      <template #[`item.distributor`]="{ item }">
        {{ item.distributor.userName }}
      </template>

      <template #[`item.createdAt`]="{ item }">
        {{ MomentDate(item.createdAt) }}
      </template>

      <template #[`item.actions`]="{ item }">
        <v-menu transition="slide-y-transition">
          <template #activator="{ on, attrs }">
            <v-btn color="warning" icon small v-bind="attrs" v-on="on">
              <v-icon>menu</v-icon>
            </v-btn>
          </template>

          <v-list nav dense color="primary">
            <v-list-item class="text--text" @click="changeStatus(item, 1)"
              >Pending</v-list-item
            >
            <v-divider class="secondary mb-2 mt-2" />
            <v-list-item class="text--text" @click="changeStatus(item, 2)"
              >Enrolled</v-list-item
            >
            <v-divider class="secondary mb-2 mt-2" />
            <v-list-item class="text--text" @click="changeStatus(item, 3)"
              >Active+</v-list-item
            >
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'المعرف',
          value: 'id',
          sortable: false,
          align: 'start',
        },
        {
          text: 'اسم الطالب',
          value: 'name',
          sortable: false,
          align: 'start',
        },
        {
          text: 'الحالة',
          value: 'status',
          sortable: false,
          align: 'start',
        },
        {
          text: 'الموزع',
          value: 'distributor',
          sortable: false,
          align: 'start',
        },
        {
          text: 'الخصم',
          value: 'discount',
          sortable: false,
          align: 'start',
        },
        {
          text: 'تاريخ الكورس',
          value: 'createdAt',
          sortable: false,
          align: 'start',
        },
        {
          text: 'تغير الحالة',
          value: 'actions',
          sortable: false,
          align: 'start',
        },
      ],
      details: [],
      courseName: '',
      coursePrice: '',
      platformPriceTotal: '',
      remainingPrice: '',
      discounts: '',
      isEmpty: false,
    }
  },

  mounted() {
    this.getDetails()
  },

  methods: {
    MomentDate(date) {
      return moment(date).format("YYYY-MM-DD")
    },

    async getDetails() {
      this.$nuxt.$loading.start()
      const id = this.$route.params.id
      try {
        const details = await this.$axios.get(`courseDetails/${id}`)
        this.details = details.data
        this.courseName = details.data[0].course.courseTitle
        this.coursePrice = details.data[0].course.coursePrice
        this.platformPriceTotal = this.$route.query.p
        this.remainingPrice = this.$route.query.r
        const countDiscount = []

        for (let i = 0; i < details.data.length; i++) {
          countDiscount.push(details.data[i].discount)
        }

        this.discounts = countDiscount.reduce((a, b) => a + b, 0)
        this.$nuxt.$loading.finish()
      } catch (error) {
        console.log(error.response)
        this.$router.go(-1)
        this.$toast.error('لا يمكن عرض الصفحة', {
          duration: 3000,
          position: 'top-center',
        })
        this.$nuxt.$loading.finish()
      }
    },

    async changeStatus(item, status) {
      const { idStudentCourse } = item
      try {
        const change = await this.$axios.put(
          `studentCourse/${idStudentCourse}`,
          {
            statusId: status,
          }
        )
        console.log(change.data)
        this.getDetails()
      } catch (error) {
        console.log(error.response)
      }
    },
  },
}
</script>

<style>
</style>
