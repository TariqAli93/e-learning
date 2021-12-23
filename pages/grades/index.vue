<template>
  <div class="subjects-page">
    <v-dialog
      v-model="createGradeDialog"
      persistent
      max-width="750px"
      transition="slide-y-transition"
    >
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-toolbar flat color="primary" class="shadow-1 radius-1 mb-10">
          <div class="d-flex align-center justify-evenly" style="width: 100%">
            <v-toolbar-title style="flex: 1 1 auto"
              >اضافة مراحل</v-toolbar-title
            >

            <v-spacer />

            <v-btn icon color="error" @click="createGradeDialog = false">
              <v-icon>close</v-icon>
            </v-btn>
          </div>
        </v-toolbar>

        <v-form
          ref="createRef"
          v-model="createForm"
          lazy-validation
          @submit.prevent="createGrades"
        >
          <v-row>
            <v-col cols="12" sm="6" md="6" lg="6" xl="6">
              <v-text-field
                v-model="className"
                outlined
                label="اسم الصف"
                color="text"
                type="text"
                :rules="rules"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="6" lg="6" xl="6">
              <v-file-input
                v-model="classImage"
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
      v-model="updateClassDialog"
      persistent
      max-width="750px"
      transition="slide-y-transition"
    >
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-toolbar flat color="primary" class="shadow-1 radius-1 mb-10">
          <div class="d-flex align-center justify-evenly" style="width: 100%">
            <v-toolbar-title style="flex: 1 1 auto"
              >تحديث الصفوف</v-toolbar-title
            >

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
          @submit.prevent="updateGrades"
        >
          <v-row>
            <v-col cols="12" sm="12" md="6" lg="6" xl="6">
              <v-text-field
                v-model="className"
                outlined
                label="اسم الصف"
                color="text"
                type="text"
                :rules="rules"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="6" lg="6" xl="6">
              <v-file-input
                v-model="classImage"
                outlined
                label="الصورة"
                color="text"
                :rules="rules"
                @change="saveUpdateImage"
              >
                <template #prepend-inner>
                  <v-img
                    :src="$axios.defaults.baseURL + classImage"
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
      :items.sync="classes"
      :items-per-page="15"
      item-key="courseId"
      class="shadow-1 radius-1 pa-5 secondary"
      :search="search"
    >
      <template #top>
        <v-toolbar flat color="primary" class="shadow-1 radius-1">
          <div class="d-flex align-center justify-evenly" style="width: 100%">
            <v-toolbar-title style="flex: 1 1 auto">الصفوف</v-toolbar-title>
            <v-text-field
              v-model="search"
              color="text"
              placeholder="ابحث في الصفوف..."
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
                  @click="createGradeDialog = true"
                >
                  <v-icon>add</v-icon>
                </v-btn>
              </template>
              <span class="primary--text">اضافة صف</span>
            </v-tooltip>
          </div>
        </v-toolbar>
      </template>

      <template #[`item.classImage`]="{ item }">
        <v-img
          :src="$axios.defaults.baseURL + item.classImage"
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
    createGradeDialog: false,
    updateClassDialog: false,
    isImageChanged: false,
    rules: [(v) => !!v || 'لا يمكن ترك الحقل فارغ'],

    className: null,
    classImage: null,
    tempClassImage: null,
    classId: null,
    classes: [],
    headers: [
      {
        text: '#',
        value: 'idClass',
        sortable: true,
        align: 'start',
      },
      {
        text: 'صورة الصف',
        value: 'classImage',
      },
      {
        text: 'اسم الصف',
        value: 'className',
      },
      {
        text: 'الاجرائات',
        value: 'actions',
      },
    ],
  }),

  mounted() {
    this.GetClasses()
  },

  methods: {
    saveImage(event) {
      this.tempClassImage = event
    },

    saveUpdateImage(event) {
      this.tempClassImage = event
      this.isImageChanged = true
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
      this.updateClassDialog = true
      this.className = item.className
      this.classId = item.idClass
      this.classImage = item.classImage
    },

    closeUpdateDialog() {
      this.updateClassDialog = false
      this.className = null
      this.classId = null
      this.classImage = null
    },

    async deleteItem(item) {
      this.$nuxt.$loading.start()
      try {
        if (confirm('هل تريد حذف الصف')) {
          const remove = await this.$axios.delete(`class/${item.idClass}`)
          this.$toast.success('تم حذف الصف', {
            duration: 3000,
            position: 'top-center',
          })
          this.GetClasses()
          this.$nuxt.$loading.finish()
        }
      } catch (error) {
        this.$nuxt.$loading.finish()
        console.log(error.response)
      }
    },

    async updateGrades() {
      this.$nuxt.$loading.start()
      try {
        if (this.isImageChanged) {
          const form = new FormData()
          form.append('attachment', this.tempClassImage)
          const upload = await this.$axios.post('upload', form)
          this.classImage = upload.data.imagePath
        }

        const classes = await this.$axios.put(`class/${this.classId}`, {
          className: this.className,
          classImage: this.classImage,
        })

        this.$toast.success('تم حفظ المعلومات', {
          duration: 3000,
          position: 'top-center',
        })
        this.GetClasses()
        this.closeUpdateDialog()
        this.$nuxt.$loading.finish()
      } catch (error) {
        this.$nuxt.$loading.finish()
        console.log(error.response)
      }
    },

    async createGrades() {
      this.$nuxt.$loading.start()
      const form = new FormData()
      form.append('attachment', this.tempClassImage)
      try {
        const upload = await this.$axios.post('upload', form)
        this.classImage = upload.data.imagePath

        const classes = await this.$axios.post('addClass', {
          className: this.className,
          classImage: this.classImage,
        })

        this.$toast.success('تم حفظ المعلومات', {
          duration: 3000,
          position: 'top-center',
        })
        this.GetClasses()
        this.closeUpdateDialog()
        this.createGradeDialog = false
        this.$nuxt.$loading.finish()
      } catch (error) {
        this.$nuxt.$loading.finish()
        console.log(error.response)
      }
    },
  },
}
</script>

<style>
</style>