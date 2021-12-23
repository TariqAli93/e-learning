<template>
  <div class="promo-page">
    <v-dialog
      v-model="newCodeDialog"
      max-width="750px"
      transition="slide-y-transition"
    >
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-toolbar flat color="primary" class="shadow-1 radius-1 mb-10">
          <div class="d-flex align-center justify-evenly" style="width: 100%">
            <v-toolbar-title style="flex: 1 1 auto"
              >انشاء كود خصم</v-toolbar-title
            >

            <v-spacer />

            <v-btn icon color="error" @click="newCodeDialog = false">
              <v-icon>close</v-icon>
            </v-btn>
          </div>
        </v-toolbar>

        <v-form
          ref="newCodeRef"
          v-model="newCodeForm"
          lazy-validation
          @submit.prevent="createPromoCode"
        >
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="usedCount"
                outlined
                label="عدد الاكواد"
                color="text"
                type="number"
                :rules="rules"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-text-field
                v-model="discountAmount"
                outlined
                label="مبلغ الخصم"
                color="text"
                type="number"
                :rules="rules"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-select
                v-model="userId"
                :items="distributors"
                item-color="text"
                item-text="userName"
                item-value="idUser"
                outlined
                label="الاستاذ"
                color="text"
                :rules="rules"
              ></v-select>
            </v-col>

            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-select
                v-model="courseId"
                :items="courses"
                item-color="text"
                item-text="courseTitle"
                item-value="idCourse"
                outlined
                label="الكورس"
                color="text"
                :rules="rules"
              ></v-select>
            </v-col>
          </v-row>

          <v-btn
            block
            color="success"
            class="mt-10"
            large
            depressed
            :disabled="!newCodeForm"
            type="submit"
          >
            حفظ المعلومات
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="studentsUsedCodeDialog"
      max-width="750px"
      transition="slide-y-reverse-transition"
    >
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-toolbar flat color="primary" class="shadow-1 radius-1 mb-5">
          <div class="d-flex align-center justify-evenly" style="width: 100%">
            <v-toolbar-title style="flex: 1 1 auto"
              >مستخدمين كود الخصم</v-toolbar-title
            >

            <v-spacer />

            <v-btn icon color="error" @click="studentsUsedCodeDialog = false">
              <v-icon>close</v-icon>
            </v-btn>
          </div>
        </v-toolbar>

        <v-data-table
          :headers="studentsUsedCodeHeaders"
          :items="studentsUsedCode"
          :items-per-page="15"
          class="radius-1 pa-5 secondary"
          loading-text="جاري التحميل"
        ></v-data-table>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialog"
      persistent
      max-width="750px"
      transition="slide-y-transition"
    >
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-toolbar flat color="primary" class="shadow-1 radius-1 mb-10">
          <div class="d-flex align-center justify-evenly" style="width: 100%">
            <v-toolbar-title style="flex: 1 1 auto"
              >الاكواد الجديدة</v-toolbar-title
            >

            <v-spacer />

            <v-btn icon color="error" @click="dialog = false">
              <v-icon>close</v-icon>
            </v-btn>
          </div>
        </v-toolbar>
        <v-list nav dense color="transparent">
          <v-list-item v-for="codes in newCodes" :key="codes" color="transparent" style="border-bottom: 1px solid rgba(0, 0, 0, 0.20); border-radius: 0 !important">
            <v-list-item-title>{{ codes.code }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>

    <v-data-table
      :headers="headers"
      :items="coupons"
      :items-per-page="15"
      class="shadow-1 radius-1 pa-5 secondary"
      loading-text="جاري التحميل"
      :search="search"
    >
      <template #top>
        <v-toolbar flat color="primary" class="shadow-1 radius-1">
          <div class="d-flex align-center justify-evenly" style="width: 100%">
            <v-toolbar-title style="flex: 1 1 auto">الخصومات</v-toolbar-title>
            <v-text-field
              v-model="search"
              color="text"
              placeholder="ابحث في الخصومات..."
              style="flex: 1 1 auto"
              hide-details
              outlined
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
                  @click="newCodeDialog = true"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <span class="primary--text">انشاء كود خصم</span>
            </v-tooltip>
          </div>
        </v-toolbar>
      </template>

      <template #[`item.actions`]="{ item }">
        <v-btn color="info" icon @click="showUsedStudents(item)">
          <v-icon>visibility</v-icon>
        </v-btn>

        <v-btn color="error" icon @click="deleteCode(item)">
          <v-icon>delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      newCodeForm: false,
      newCodeDialog: false,
      studentsUsedCodeDialog: false,
      dialog: false,
      studentsUsedCodeHeaders: [
        {
          text: 'المعرف',
          value: 'user.idUser',
          sortable: false,
          width: 150,
          align: 'start',
        },
        {
          text: 'اسم المستخدم',
          value: 'user.userName',
          sortable: false,
          width: 150,
          align: 'start',
        },
        {
          text: 'كود الخصم',
          value: 'code',
          sortable: false,
          width: 150,
          align: 'start',
        },
        {
          text: 'مبلغ الخصم',
          value: 'discountAmount',
          sortable: false,
          width: 150,
          align: 'start',
        },
      ],
      headers: [
        {
          text: 'المعرف',
          value: 'idPromoCode',
          sortable: false,
          width: 150,
          align: 'start',
        },
        {
          text: 'كود الخصم',
          value: 'code',
          sortable: false,
          width: 150,
          align: 'start',
        },
        {
          text: 'مبلغ الخصم',
          value: 'discountAmount',
          sortable: false,
          width: 150,
          align: 'start',
        },
        {
          text: 'عنوان الكورس',
          value: 'course.courseTitle',
          sortable: false,
          width: 150,
          align: 'start',
        },
        {
          text: 'عدد المستفيدين',
          value: 'usedCount',
          sortable: false,
          width: 150,
          align: 'start',
        },
        {
          text: 'الاجرائات',
          value: 'actions',
          sortable: false,
          width: 150,
          align: 'start',
        },
      ],
      coupons: [],
      courses: [],
      distributors: [],
      studentsUsedCode: [],
      code: '',
      usedCount: '',
      discountAmount: '',
      userId: '',
      courseId: '',
      rules: [(v) => !!v || 'لا يمكن ترك الحقل فارغ'],
      newCodes: [],
    }
  },

  mounted() {
    this.getCoupons()
    this.getCourses()
    this.getDistributors()
  },

  methods: {
    generateNewCode() {
      const code = Math.random().toString(15).substr(2, 8)
      return code
    },

    async getCoupons() {
      this.$nuxt.$loading.start()
      try {
        const coupons = await this.$axios.get('promoCodes')
        this.coupons = coupons.data
        this.$nuxt.$loading.finish()
        console.log(coupons.data)
      } catch (error) {
        console.log(error.response)
        this.$nuxt.$loading.finish()
      }
    },

    async getCourses() {
      try {
        const courses = await this.$axios.get('courses')
        this.courses = courses.data
        console.log(courses.data)
      } catch (error) {
        console.log(error.response)
      }
    },

    async getDistributors() {
      try {
        const distributors = await this.$axios.get('userRoles/3')
        this.distributors = distributors.data
      } catch (error) {
        console.log(error.response)
      }
    },

    async createPromoCode() {
      try {
        if (this.$refs.newCodeRef.validate()) {
          const usedCount = []
          let data = {}
          for (let i = 0; i < this.usedCount; i++) {
            data = {
              code: this.generateNewCode(),
              usedCount: 1,
              discountAmount: this.discountAmount * 1,
              userId: this.userId,
              courseId: this.courseId,
            }

            usedCount.push(data)
            const promo = await this.$axios.post('addManyPromoCode', data)
            this.newCodes.push({ code: data.code })
          }

          this.$toast.success('تم انشاء الكود', {
            duration: 3000,
            position: 'top-center',
          })

          this.newCodeDialog = false
          this.getCoupons()
          this.dialog = true
        }
      } catch (error) {
        console.log(error.response)
      }
    },

    showUsedStudents(item) {
      const used = item
      if (used.UsedCode.length > 0) {
        this.studentsUsedCode = used.UsedCode.map((use) => {
          return {
            ...use,
            code: used.code,
            discountAmount: used.discountAmount,
          }
        })

        console.log(used)
        this.studentsUsedCodeDialog = true
      } else {
        this.$toast.error('لا يوجد مستخدمين للكود', {
          duration: 3000,
          position: 'top-center',
        })
      }
    },

    async deleteCode(item) {
      if (confirm('هل تريد حذف كود الخصم ؟')) {
        try {
          const deletePromo = await this.$axios.delete(
            `promoCode/${item.idPromoCode}`
          )
          this.getCoupons()
          console.log(deletePromo.data)
        } catch (error) {
          console.log(error.response)
        }
      }
    },
  },
}
</script>

<style>
</style>
