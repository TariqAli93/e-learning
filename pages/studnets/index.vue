<template>
  <div id="students-page">
    <v-dialog
      v-model="createStudentDialog"
      max-width="750px"
      transition="slide-y-transition"
    >
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-toolbar color="primary" class="shadow-1 radius-1 mb-10">
          <h4>انشاء استاذ جديد</h4>
          <v-spacer />
          <v-btn color="error" icon @click="createStudentDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-form
          ref="createStudentsRef"
          v-model="createStudentModel"
          lazy-validation
          @submit.prevent="createstudents"
        >
          <v-row>
            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-text-field
                v-model="username"
                prepend-inner-icon="person"
                color="text"
                outlined
                label="اسم المستخدم"
                :rules="rules"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-text-field
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                prepend-inner-icon="password"
                color="text"
                outlined
                label="كلمة المرور"
                :rules="rules"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-text-field
                v-model="phone"
                prepend-inner-icon="drag_indicator"
                color="text"
                outlined
                label="رقم الهاتف"
                :rules="rules"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-text-field
                v-model="grade"
                prepend-inner-icon="menu_book"
                color="text"
                outlined
                label="الدرجة"
                :rules="rules"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-text-field
                v-model="schoolName"
                prepend-inner-icon="title"
                color="text"
                outlined
                label="اسم المدرسة"
                :rules="rules"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-select
                v-model="provinceId"
                prepend-inner-icon="map"
                color="text"
                outlined
                label="المحافظة"
                :rules="rules"
                :items="provinces"
                item-color="text"
                item-value="idProvince"
                item-text="provinceName"
              ></v-select>
            </v-col>

            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-text-field
                v-model="dob"
                prepend-inner-icon="title"
                color="text"
                outlined
                label="تاريخ الميلاد"
                :rules="rules"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-select
                v-model="provinceId"
                prepend-inner-icon="map"
                color="text"
                outlined
                label="الصف"
                :rules="rules"
                :items="provinces"
                item-color="text"
                item-value="idProvince"
                item-text="provinceName"
              ></v-select>
            </v-col>
          </v-row>

          <v-btn
            color="success"
            large
            block
            depressed
            :disabled="!createStudentModel"
            type="submit"
          >
            حفظ المعلومات
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>

    <v-data-table
      :headers="headers"
      :items.sync="students"
      :items-per-page="15"
      item-key="courseId"
      class="shadow-1 radius-1 pa-5 secondary"
      :search="search"
    >
      <template #top>
        <v-toolbar flat color="primary" class="shadow-1 radius-1">
          <div class="d-flex align-center justify-evenly" style="width: 100%">
            <v-toolbar-title style="flex: 1 1 auto">الاساتذة</v-toolbar-title>
            <v-text-field
              v-model="search"
              color="text"
              placeholder="ابحث في الاساتذة..."
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
                  @click="createStudentDialog = true"
                >
                  <v-icon>add</v-icon>
                </v-btn>
              </template>
              <span class="primary--text">اضافة طالب جديد</span>
            </v-tooltip>
          </div>
        </v-toolbar>
      </template>

      <template #[`item.photoPath`]="{ item }">
        <v-img
          :src="$axios.defaults.baseURL + item.photoPath"
          max-width="50px"
          height="50px"
        ></v-img>
      </template>

      <template #[`item.actions`]="{ item }">
        <v-btn color="error" icon @click="deleteStudents(item)">
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
        value: 'idTeacher',
        sortable: false,
      },
      { text: 'الصورة', value: 'photoPath', sortable: false },
      { text: 'اسم المستخدم', value: 'userName', sortable: false },
      { text: 'عن الاستاذ', value: 'bio', sortable: false },
      { text: 'اسم المدرسة', value: 'schoolName', sortable: false },
      { text: 'الهاتف', value: 'phone', sortable: false },
      { text: 'المحافظة', value: 'province.provinceName', sortable: false },
      { text: 'الاجرائات', value: 'actions', sortable: false },
    ],

    students: [],
    provinces: [],
    classes: [],

    createStudentDialog: false,
    createStudentModel: false,

    provinceId: null,
    classId: null,
    username: null,
    password: null,
    phone: null,
    showPassword: false,
    grade: null,
    schoolName: null,
    photoPath: null,
    rules: [(v) => !!v || 'لا يمكن ترك الحقل فارغ'],
  }),

  mounted() {
    this.getProvinces()
    this.getStudents()
  },

  methods: {
    async getProvinces() {
      try {
        const provinces = await this.$axios.get('provinces')
        this.provinces = provinces.data
      } catch (error) {
        console.log(error.response)
      }
    },

    async getStudents() {
      try {
        const students = await this.$axios.get(`studentInfos`)
        const users = []

        for (let i = 0; i < students.data.length; i++) {
          const user = await this.$axios.get(`user/${students.data[i].userId}`)
          const courses = await this.$axios.get(`coursesForStudent/${students.data[i].idStudent}`)
          const classes = await this.$axios.get(`class/${students.data[i].classId}`)

          users.push({
            ...user.data,
            ...classes.data,
            ...courses.data,
            ...students.data[i],
          })
        }

        this.students = users
        console.log(users)
      } catch (e) {
        console.error(e.response)
      }
    },

    async createstudents() {
      if (this.$refs.createStudentsRef.validate()) {
        try {
          const createUsers = await this.$axios.post('addUser', {
            userName: this.username,
            password: this.password,
            phone: this.phone,
            roleId: 2,
            provinceId: this.provinceId * 1,
          })

          const createTeacher = await this.$axios.post('addStudentInfo', {
            grade: this.grade,
            schoolName: this.schoolName,
            userId: createUsers.data.idUser,
          })

          this.getStudents()
          this.createStudentDialog = false
        } catch (error) {
          console.error(error.response)
        }
      }
    },

    async deleteStudents(item) {
      if (confirm('هل تريد حذف الطالب ؟')) {
        try {
          const deleteStudent = await this.$axios.delete(
            `studentInfo/${item.idTeacher}`
          )
          this.getStudents()
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