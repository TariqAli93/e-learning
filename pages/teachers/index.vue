<template>
  <div id="teachers-page">
    <v-dialog
      v-model="createTeacherDialog"
      max-width="750px"
      transition="slide-y-transition"
    >
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-toolbar color="primary" class="shadow-1 radius-1 mb-10">
          <h4>انشاء استاذ جديد</h4>
          <v-spacer />
          <v-btn color="error" icon @click="createTeacherDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-form
          ref="createTeacherRef"
          v-model="createTeacherModel"
          lazy-validation
          @submit.prevent="createTeachers"
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
                v-model="specialty"
                prepend-inner-icon="menu_book"
                color="text"
                outlined
                label="التخصص"
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

            <v-col cols="12" md="12" lg="12" xl="12">
              <v-file-input
                prepend-icon="collections"
                color="text"
                outlined
                label="الصورة"
                :rules="rules"
                @change="saveImage"
              ></v-file-input>
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="bio"
                prepend-inner-icon="format_size"
                color="text"
                outlined
                label="عن الاستاذ"
                :rules="rules"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-btn
            color="success"
            large
            block
            depressed
            :disabled="!createTeacherModel"
            type="submit"
          >
            حفظ المعلومات
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="updateTeacherDialog"
      max-width="750px"
      transition="slide-y-transition"
      persistent
    >
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-toolbar color="primary" class="shadow-1 radius-1 mb-10">
          <h4>تحديث الاستاذة</h4>
          <v-spacer />
          <v-btn color="error" icon @click="closeUpdateDialog">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-form
          ref="updateTeacherRef"
          v-model="updateTeacherModel"
          lazy-validation
          @submit.prevent="updateTeachers"
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
                v-model="specialty"
                prepend-inner-icon="menu_book"
                color="text"
                outlined
                label="التخصص"
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

            <v-col cols="12">
              <v-textarea
                v-model="bio"
                prepend-inner-icon="format_size"
                color="text"
                outlined
                label="عن الاستاذ"
                :rules="rules"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-btn
            color="success"
            large
            block
            depressed
            :disabled="!updateTeacherModel"
            type="submit"
          >
            حفظ المعلومات
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="addAssistantDialog"
      persistent
      max-width="750px"
      transition="slide-y-transition"
    >
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-toolbar color="primary" class="shadow-1 radius-1 mb-10">
          <h4>اضافة مساعد استاذ</h4>
          <v-spacer />
          <v-btn
            color="error"
            icon
            @click="
              addAssistantDialog = false
              userId = null
            "
          >
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-form
          ref="assistantRef"
          v-model="assistantForm"
          lazy-validation
          @submit.prevent="saveAssistant"
        >
          <v-row>
            <v-col cols="12">
              <v-select
                v-model="assistantId"
                label="المساعدين"
                outlined
                color="white"
                :items="assistants"
                item-text="userName"
                item-value="idUser"
                item-color="white"
                :rules="[(v) => !!v || 'لا يمكن ترك الحقل فارغ']"
              ></v-select>
            </v-col>
          </v-row>

          <v-btn
            block
            large
            color="success"
            depressed
            type="submit"
            :disabled="!assistantForm"
          >
            حفظ المعلومات
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="AssistanceTeacherDialog"
      persistent
      max-width="750px"
      transition="slide-y-transition"
    >
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-toolbar color="primary" class="shadow-1 radius-1 mb-10">
          <h4>المساعدين</h4>
          <v-spacer />
          <v-btn color="error" icon @click="AssistanceTeacherDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-data-table
          :headers="AssistanceTeacherHeaders"
          :items.sync="AssistanceTeacher"
          :items-per-page="15"
          class="pa-5 secondary"
        >
        <template #[`item.actions`]="{ item }">
          <v-btn color="error" icon @click="deleteAssistanceTeacher(item)">
            <v-icon>delete</v-icon>
          </v-btn>
        </template>
        </v-data-table>
      </v-card>
    </v-dialog>

    <v-data-table
      :headers="headers"
      :items.sync="teachers"
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
                  @click="createTeacherDialog = true"
                >
                  <v-icon>add</v-icon>
                </v-btn>
              </template>
              <span class="primary--text">اضافة استاذ جديد</span>
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
        <v-btn color="warning" icon @click="openUpdateDialog(item)">
          <v-icon>edit</v-icon>
        </v-btn>

        <v-btn color="error" icon @click="deleteTeachers(item)">
          <v-icon>delete</v-icon>
        </v-btn>

        <v-btn
          color="info"
          icon
          @click="
            addAssistantDialog = true
            userId = item.userId
          "
        >
          <v-icon>assistant</v-icon>
        </v-btn>

        <v-btn color="success" icon @click="openAssistantListDialog(item)">
          <v-icon>view_list</v-icon>
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
        value: 'userId',
        sortable: false,
      },
      { text: 'الصورة', value: 'photoPath', sortable: false, width: 350},
      { text: 'اسم المستخدم', value: 'userName', sortable: false, width: 350},
      { text: 'عن الاستاذ', value: 'bio', sortable: false, width: 350},
      { text: 'اسم المدرسة', value: 'schoolName', sortable: false, width: 350},
      { text: 'الهاتف', value: 'phone', sortable: false, width: 350},
      { text: 'المحافظة', value: 'province.provinceName', sortable: false, width: 350},
      { text: 'الاجرائات', value: 'actions', sortable: false, width: 350},
    ],

    teachers: [],
    provinces: [],
    assistants: [],
    assistantId: null,

    createTeacherDialog: false,
    createTeacherModel: false,
    updateTeacherDialog: false,
    updateTeacherModel: false,

    provinceId: null,
    username: null,
    password: null,
    phone: null,
    uploadedImage: null,
    showPassword: false,
    specialty: null,
    schoolName: null,
    bio: null,
    photoPath: null,
    idTeacherInfo: null,
    userId: null,
    rules: [(v) => !!v || 'لا يمكن ترك الحقل فارغ'],
    addAssistantDialog: false,
    assistantForm: false,
    AssistanceTeacher: [],
    AssistanceTeacherDialog: false,
    AssistanceTeacherHeaders: [
      {
        text: 'المعرف',
        align: 'start',
        value: 'assistance.idUser',
        sortable: false,
      },
      { text: 'اسم المستخدم', value: 'assistance.userName', sortable: false },
      { text: 'رقم الهاتف', value: 'assistance.phone', sortable: false },
      { text: 'الاجرائات', value: 'actions', sortable: false },
    ],
  }),

  mounted() {
    this.getProvinces()
    this.getTeachers()
    this.getAssistants()
  },

  methods: {
    saveImage(event) {
      this.uploadedImage = event !== null ? event : null
    },

    async getProvinces() {
      try {
        const provinces = await this.$axios.get('provinces')
        this.provinces = provinces.data
      } catch (error) {
        console.log(error.response)
      }
    },

    async getAssistants() {
      try {
        const assistants = await this.$axios.get('userRoles/6')
        this.assistants = assistants.data
      } catch (error) {
        console.log(error.response)
      }
    },

    async getTeachers() {
      this.$nuxt.$loading.start()
      try {
        const teachers = await this.$axios.get(`teacherInfos`)
        const users = []

        for (let i = 0; i < teachers.data.length; i++) {
          const user = await this.$axios.get(`user/${teachers.data[i].userId}`)
          users.push({
            ...user.data,
            ...teachers.data[i],
          })
        }

        this.teachers = users
        console.log(users)
        this.$nuxt.$loading.finish()
      } catch (e) {
        console.error(e.response)
        this.$nuxt.$loading.finish()
      }
    },

    async createTeachers() {
      if (this.$refs.createTeacherRef.validate()) {
        const uploadedImage = new FormData()
        uploadedImage.append('attachment', this.uploadedImage)

        try {
          const upload = await this.$axios.post('upload', uploadedImage)

          this.photoPath = upload.data.imagePath

          const createUsers = await this.$axios.post('addUser', {
            userName: this.username,
            password: this.password,
            phone: this.phone,
            roleId: 3,
            provinceId: this.provinceId * 1,
          })

          const createTeacher = await this.$axios.post('addTeacherInfo', {
            specialty: this.specialty,
            schoolName: this.schoolName,
            photoPath: this.photoPath,
            bio: this.bio,
            userId: createUsers.data.idUser,
          })

          this.getTeachers()
          this.createTeacherDialog = false
        } catch (error) {
          console.error(error.response)
        }
      }
    },

    async deleteTeachers(item) {
      if (confirm('هل تريد حذف الاستاذ ؟')) {
        try {
          const deleteTeacher = await this.$axios.delete(
            `teacherInfo/${item.idTeacher}`
          )
          this.getTeachers()
        } catch (error) {
          console.log(error.response)
        }
      }
    },

    openUpdateDialog(item) {
      this.username = item.userName
      this.phone = item.phone
      this.specialty = item.specialty
      this.schoolName = item.schoolName
      this.provinceId = item.provinceId
      this.bio = item.bio
      this.idTeacherInfo = item.idTeacher
      this.userId = item.userId
      this.updateTeacherDialog = true
    },

    closeUpdateDialog() {
      this.username = null
      this.phone = null
      this.specialty = null
      this.schoolName = null
      this.provinceId = null
      this.bio = null
      this.idTeacherInfo = null
      this.userId = null
      this.updateTeacherDialog = false
    },

    async updateTeachers() {
      try {
        const updateTeacherInfo = await this.$axios.put(
          `teacherInfo/${this.idTeacherInfo}`,
          {
            specialty: this.specialty,
            schoolName: this.schoolName,
            bio: this.bio,
            userId: this.userId,
          }
        )

        const updateUserInfo = await this.$axios.put(`user/${this.userId}`, {
          userName: this.username,
          phone: this.phone,
          provinceId: this.provinceId,
        })

        this.getTeachers()
        this.closeUpdateDialog()
      } catch (error) {
        console.log(error.response)
      }
    },

    async saveAssistant() {
      if (this.$refs.assistantRef.validate()) {
        console.log(this.userId)
        try {
          const create = await this.$axios.post('addAssistanceTeacher', {
            teacherId: this.userId * 1,
            assistanceId: this.assistantId * 1,
          })
          this.addAssistantDialog = false
          this.userId = null
          this.getTeachers()
        } catch (error) {
          console.log(error)
        }
      }
    },

    openAssistantListDialog(item) {
      this.AssistanceTeacher = item.user.AssistanceTeacher
      this.AssistanceTeacherDialog = true
    },

    async deleteAssistanceTeacher(item) {
      const { idAssistanceTeacher } = item
      if(confirm('هل تريد ازالة المساعد من الاستاذ ؟')) {
        try {
          const remove = await this.$axios.delete(`assistanceTeacher/${idAssistanceTeacher}`)
          this.AssistanceTeacherDialog = false
          this.AssistanceTeacher = []
          this.getTeachers()
        } catch (error) {
          console.log(error)
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>
</style>