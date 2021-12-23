<template>
  <div class="subjects-page">
    <v-dialog
      v-model="createSubjectDialog"
      persistent
      max-width="750px"
      transition="slide-y-transition"
    >
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-toolbar flat color="primary" class="shadow-1 radius-1 mb-10">
          <div class="d-flex align-center justify-evenly" style="width: 100%">
            <v-toolbar-title style="flex: 1 1 auto">اضافة مواد</v-toolbar-title>

            <v-spacer />

            <v-btn icon color="error" @click="createSubjectDialog = false">
              <v-icon>close</v-icon>
            </v-btn>
          </div>
        </v-toolbar>

        <v-form
          ref="createRef"
          v-model="createForm"
          lazy-validation
          @submit.prevent="createSubjects"
        >
          <v-row>
            <v-col cols="12" sm="6" md="6" lg="6" xl="6">
              <v-text-field
                v-model="subjectName"
                outlined
                label="اسم المادة"
                color="text"
                type="text"
                :rules="rules"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="6" lg="6" xl="6">
              <v-select
                v-model="classId"
                :items="classes"
                item-value="idClass"
                item-text="className"
                outlined
                label="الصف"
                color="text"
                item-color="text"
                :rules="rules"
              ></v-select>
            </v-col>

            <v-col cols="12">
              <v-file-input
                v-model="subjectImage"
                outlined
                label="الصورة"
                color="text"
                :rules="rules"
                @change="saveImage"
              ></v-file-input>
            </v-col>
          </v-row>

          <v-btn
            block
            color="success"
            class="mt-10"
            large
            depressed
            :disabled="!createForm"
            type="submit"
          >
            حفظ المعلومات
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="updateSubjectDialog"
      persistent
      max-width="750px"
      transition="slide-y-transition"
    >
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-toolbar flat color="primary" class="shadow-1 radius-1 mb-10">
          <div class="d-flex align-center justify-evenly" style="width: 100%">
            <v-toolbar-title style="flex: 1 1 auto">تحديث مواد</v-toolbar-title>

            <v-spacer />

            <v-btn icon color="error" @click="closeUpdateDialog">
              <v-icon>close</v-icon>
            </v-btn>
          </div>
        </v-toolbar>

        <v-form
          ref="createRef"
          v-model="updateForm"
          lazy-validation
          @submit.prevent="updateSubjects"
        >
          <v-row>
            <v-col cols="12" sm="6" md="6" lg="6" xl="6">
              <v-text-field
                v-model="subjectName"
                outlined
                label="اسم المادة"
                color="text"
                type="text"
                :rules="rules"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="6" lg="6" xl="6">
              <v-select
                v-model="classId"
                :items="classes"
                item-value="idClass"
                item-text="className"
                outlined
                label="الصف"
                color="text"
                item-color="text"
                :rules="rules"
              ></v-select>
            </v-col>

            <v-col cols="12">
              <v-file-input
                v-model="subjectImage"
                outlined
                label="الصورة"
                color="text"
                :rules="rules"
                @change="saveUpdateImage"
              >
                <template #prepend-inner>
                  <v-img
                    :src="$axios.defaults.baseURL + subjectImage"
                    width="30px"
                    height="30px"
                  />
                </template>
              </v-file-input>
            </v-col>
          </v-row>

          <v-btn
            block
            color="success"
            class="mt-10"
            large
            depressed
            :disabled="!updateForm"
            type="submit"
          >
            حفظ المعلومات
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>
    <v-data-table
      :headers="headers"
      :items.sync="subjects"
      :items-per-page="15"
      item-key="courseId"
      class="shadow-1 radius-1 pa-5 secondary"
      :search="search"
    >
      <template #top>
        <v-toolbar flat color="primary" class="shadow-1 radius-1">
          <div class="d-flex align-center justify-evenly" style="width: 100%">
            <v-toolbar-title style="flex: 1 1 auto">المواد</v-toolbar-title>
            <v-text-field
              v-model="search"
              color="text"
              placeholder="ابحث في المواد..."
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
                  @click="createSubjectDialog = true"
                >
                  <v-icon>add</v-icon>
                </v-btn>
              </template>
              <span class="primary--text">اضافة مواد</span>
            </v-tooltip>
          </div>
        </v-toolbar>
      </template>

      <template #[`item.subjectImage`]="{ item }">
        <v-img
          :src="$axios.defaults.baseURL + item.subjectImage"
          max-width="50px"
          height="50px"
        ></v-img>
      </template>

      <template #[`item.actions`]="{ item }">
        <v-btn color="warning" icon @click="openUpdateDialog(item)">
          <v-icon>edit</v-icon>
        </v-btn>

        <v-btn color="error" icon @click="deleteItem(item)">
          <v-icon>delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    createForm: false,
    updateForm: false,
    search: '',
    createSubjectDialog: false,
    updateSubjectDialog: false,
    isImageChanged: false,
    rules: [(v) => !!v || 'لا يمكن ترك الحقل فارغ'],

    subjects: [],
    subjectName: null,
    subjectImage: null,
    tempSubjectImage: null,
    classId: null,
    subjectId: null,
    classes: [],
    headers: [
      {
        text: '#',
        value: 'idSubject',
        sortable: true,
        align: 'start',
      },
      {
        text: 'صورة المادة',
        value: 'subjectImage',
      },
      {
        text: 'اسم المادة',
        value: 'subjectName',
      },
      {
        text: 'الصف',
        value: 'class.className',
      },
      {
        text: 'الاجرائات',
        value: 'actions',
      },
    ],
  }),

  mounted() {
    this.GetSubjects()
    this.GetClasses()
  },

  methods: {
    saveImage(event) {
      this.tempSubjectImage = event
    },

    saveUpdateImage(event) {
      this.tempSubjectImage = event
      this.isImageChanged = true
    },

    async GetSubjects() {
      try {
        const subject = await this.$axios.get('subjects')
        this.subjects = subject.data
      } catch (error) {
        console.log(error.response)
      }
    },

    async GetClasses() {
      try {
        const classes = await this.$axios.get('classes')
        this.classes = classes.data
      } catch (error) {
        console.log(error.response)
      }
    },

    openUpdateDialog(item) {
      this.updateSubjectDialog = true
      this.subjectName = item.subjectName
      this.classId = item.classId
      this.subjectImage = item.subjectImage
      this.subjectId = item.idSubject
    },

    closeUpdateDialog() {
      this.updateSubjectDialog = false
      this.subjectName = null
      this.classId = null
      this.subjectImage = null
    },

    async deleteItem(item) {
      try {
        if (confirm('هل تريد حذف المادة')) {
          const remove = await this.$axios.delete(`subject/${item.idSubject}`)
          this.$toast.success('تم حذف المادة', {
            duration: 3000,
            position: 'top-center',
          })
          this.GetSubjects()
        }
      } catch (error) {
        console.log(error.response)
      }
    },

    async updateSubjects() {
      try {
        if (this.isImageChanged) {
          const form = new FormData()
          form.append('attachment', this.tempSubjectImage)
          const upload = await this.$axios.post('upload', form)
          this.subjectImage = upload.data.imagePath
        }

        const subject = await this.$axios.put(`subject/${this.subjectId}`, {
          subjectName: this.subjectName,
          subjectImage: this.subjectImage,
          classId: this.classId,
          createdBy: this.$auth.user.idUser * 1,
        })

        this.updateSubjectDialog = false
        this.$toast.success('تم حفظ المعلومات', {
          duration: 3000,
          position: 'top-center',
        })
        this.GetSubjects()
      } catch (error) {
        console.log(error.response)
      }
    },

    async createSubjects() {
      const form = new FormData()
      form.append('attachment', this.tempSubjectImage)
      try {
        const upload = await this.$axios.post('upload', form)
        this.subjectImage = upload.data.imagePath

        const subject = await this.$axios.post('addSubject', {
          subjectName: this.subjectName,
          subjectImage: this.subjectImage,
          classId: this.classId,
          createdBy: this.$auth.user.idUser * 1,
        })

        this.createSubjectDialog = false
        this.$toast.success('تم حفظ المعلومات', {
          duration: 3000,
          position: 'top-center',
        })
        this.GetSubjects()
      } catch (error) {
        console.log(error.response)
      }
    },
  },
}
</script>

<style>
</style>