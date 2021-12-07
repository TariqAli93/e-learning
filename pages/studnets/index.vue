<template>
  <div id="students-page">
    <v-dialog
      v-model="createStudentDialog"
      max-width="750px"
      transition="slide-y-transition"
    >
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-toolbar color="primary" class="shadow-1 radius-1 mb-10">
          <h4>انشاء طالب جديد</h4>
          <v-spacer />
          <v-btn color="error" icon @click="createStudentDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-form
          ref="createStudentsRef"
          v-model="createStudentModel"
          lazy-validation
          @submit.prevent="createStudents"
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
                prepend-inner-icon="tag"
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

            <v-col cols="12" sm="12" md="6" lg="6" xl="6">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="dob"
                    prepend-inner-icon="calendar_today"
                    color="text"
                    outlined
                    label="تاريخ الميلاد"
                    :rules="rules"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="dob"
                  color="text"
                  header-color="secondary"
                  :active-picker.sync="activePicker"
                  :max="datePickerMax"
                  min="1950-01-01"
                  @change="save"
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" sm="12" md="6" lg="6" xl="6">
              <v-select
                name="courseClass"
                background-color="secondary"
                color="text"
                outlined
                label="الصف"
                prepend-inner-icon="dashboard"
                :items="classes"
                item-text="className"
                item-value="idClass"
                :rules="rules"
                item-color="text"
                return-object
                @change="getSubjects"
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

    <v-dialog
      v-model="updateStudentDialog"
      max-width="750px"
      transition="slide-y-transition"
    >
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-toolbar color="primary" class="shadow-1 radius-1 mb-10">
          <h4>تحديث الطلاب</h4>
          <v-spacer />
          <v-btn color="error" icon @click="closeUpdateDialog">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-form
          ref="updateStudentsRef"
          v-model="updateStudentModel"
          lazy-validation
          @submit.prevent="updateStudents"
        >
          <v-row>
            <v-col cols="12" sm="12" md="6" lg="6" xl="6">
              <v-text-field
                v-model="username"
                prepend-inner-icon="person"
                color="text"
                outlined
                label="اسم المستخدم"
                :rules="rules"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="6" lg="6" xl="6">
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
                prepend-inner-icon="tag"
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

            <v-col cols="12" sm="12" md="6" lg="6" xl="6">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="dob"
                    prepend-inner-icon="calendar_today"
                    color="text"
                    outlined
                    label="تاريخ الميلاد"
                    :rules="rules"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="dob"
                  color="text"
                  header-color="secondary"
                  :active-picker.sync="activePicker"
                  :max="datePickerMax"
                  min="1950-01-01"
                  @change="save"
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" sm="12" md="6" lg="6" xl="6">
              <v-select
                v-model="idClass"
                prepend-inner-icon="dashboard"
                color="text"
                outlined
                label="الصف"
                :rules="rules"
                :items="classes"
                item-color="text"
                item-value="idClass"
                item-text="className"
              ></v-select>
            </v-col>
          </v-row>

          <v-btn
            color="success"
            large
            block
            depressed
            :disabled="!updateStudentModel"
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
      loading-text="جاري التحميل"
      :loading="tableLoading"
    >
      <template #top>
        <v-toolbar flat color="primary" class="shadow-1 radius-1">
          <div class="d-flex align-center justify-evenly" style="width: 100%">
            <v-toolbar-title style="flex: 1 1 auto">الطلاب</v-toolbar-title>
            <v-text-field
              v-model="search"
              color="text"
              placeholder="ابحث في الطلاب..."
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

      <template #[`item.actions`]="{ item }">
        <v-btn color="warning" icon @click="openUpdateDialog(item)">
          <v-icon>edit</v-icon>
        </v-btn>

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
        value: 'students.idStudent',
        sortable: false,
      },
      { text: 'اسم المستخدم', value: 'user.userName', sortable: false },
      { text: 'الهاتف', value: 'user.phone', sortable: false },
      { text: 'اسم المدرسة', value: 'students.schoolName', sortable: false },
      { text: 'الصف', value: 'class.className', sortable: false },
      { text: 'المعدل', value: 'students.grade', sortable: false },
      { text: 'عدد الكورسات', value: 'courses.totalCourses', sortable: false },
      {
        text: 'المحافظة',
        value: 'user.province.provinceName',
        sortable: false,
      },
      { text: 'الاجرائات', value: 'actions', sortable: false },
    ],

    students: [],
    provinces: [],
    classes: [],
    subjects: [],
    isClassSelected: false,

    createStudentDialog: false,
    createStudentModel: false,
    updateStudentDialog: false,
    updateStudentModel: false,

    provinceId: null,
    classId: null,
    username: null,
    password: null,
    phone: null,
    showPassword: false,
    grade: null,
    schoolName: null,
    activePicker: null,
    dob: null,
    menu: false,
    datePickerMax: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    rules: [(v) => !!v || 'لا يمكن ترك الحقل فارغ'],
    tableLoading: true,
    userId: null,
    idStudent: null,
    idClass: null,
  }),

  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },

  mounted() {
    this.getProvinces()
    this.getStudents()
    this.getClasses()
  },

  methods: {
    save(date) {
      this.$refs.menu.save(date)
    },

    async getProvinces() {
      try {
        const provinces = await this.$axios.get('provinces')
        this.provinces = provinces.data
      } catch (error) {
        console.log(error.response)
      }
    },

    getClasses() {
      this.$axios
        .get(`classes`)
        .then((c) => {
          this.classes = c.data
        })
        .catch((error) => {
          console.log(error)
        })
    },

    getSubjects(item) {
      this.classId = item.idClass
    },

    async getStudents() {
      this.$nuxt.$loading.start()
      try {
        const students = await this.$axios.get(`studentInfos`)
        const users = []

        for (let i = 0; i < students.data.length; i++) {
          const user = await this.$axios.get(`user/${students.data[i].userId}`)
          const courses = await this.$axios.get(
            `coursesForStudent/${students.data[i].idStudent}`
          )
          const classes = await this.$axios.get(`classes`)
          const filterdClasses = classes.data.filter((cls) => {
            return cls.idClass === students.data[i].classId
          })

          users.push({
            class: {
              ...filterdClasses.map((cls) => {
                return {
                  className: cls.className,
                  idClass: cls.idClass,
                }
              })[0],
            },
            courses: { ...courses.data },
            user: { ...user.data },
            students: { ...students.data[i] },
          })
        }

        this.students = users
        this.tableLoading = false
        this.$nuxt.$loading.finish()
      } catch (e) {
        console.error(e.response)
        this.$nuxt.$loading.finish()
      }
    },

    async createStudents() {
      if (this.$refs.createStudentsRef.validate()) {
        this.$nuxt.$loading.start()
        try {
          const createUsers = await this.$axios.post('addUser', {
            userName: this.username,
            password: this.password,
            phone: this.phone,
            roleId: 2,
            provinceId: this.provinceId * 1,
          })

          const createTeacher = await this.$axios.post('addStudentInfo', {
            grade: this.grade * 1,
            schoolName: this.schoolName,
            dob: this.dob,
            classId: this.classId,
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
            `studentInfo/${item.students.idStudent}`
          )
          this.getStudents()
        } catch (error) {
          console.log(error.response)
        }
      }
    },

    openUpdateDialog(item) {
      this.updateStudentDialog = true
      this.username = item.user.userName
      this.phone = item.user.phone
      this.grade = item.students.grade
      this.schoolName = item.students.schoolName
      this.provinceId = item.user.provinceId
      this.dob = item.students.dob
      this.idClass = item.class.idClass
      this.idStudent = item.students.idStudent
      this.userId = item.students.userId
    },

    closeUpdateDialog() {
      this.updateStudentDialog = false
      this.username = null
      this.phone = null
      this.grade = null
      this.schoolName = null
      this.provinceId = null
      this.dob = null
      this.idClass = null
      this.idStudent = null
      this.userId = null
    },

    async updateStudents() {
      try {
        if (this.$refs.updateStudentsRef.validate()) {
          const updateStudentInfo = await this.$axios.put(
            `studentInfo/${this.idStudent}`,
            {
              schoolName: this.schoolName,
              dob: this.dob,
              grade: this.grade,
              classId: this.idClass,
              userId: this.userId,
            }
          )

          const updateUsertInfo = await this.$axios.put(`user/${this.userId}`, {
            userName: this.username,
            phone: this.phone,
            provinceId: this.provinceId,
          })

          this.closeUpdateDialog()
          this.getStudents()
        }
      } catch (error) {
        console.log(error.response)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>