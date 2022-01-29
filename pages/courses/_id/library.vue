<template>
  <div class="course-library">
    <v-dialog
      v-model="uploadFileDialog"
      max-width="750px"
      transition="slide-y-transition"
    >
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-toolbar flat color="primary" class="shadow-1 radius-1 mb-10">
          <h4>رفع ملف جديد</h4>
          <v-spacer />
          <v-btn icon color="text" @click="uploadFileDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-form
          ref="uploadNewFileRef"
          v-model="uploadNewFileForm"
          lazy-validation
          @submit.prevent="uploadFile"
        >
          <v-row>
            <v-col cols="12" sm="12" md="6" lg="6" xl="6">
              <v-text-field
                v-model="fileTitle"
                label="العنوان"
                outlined
                color="text"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="6" lg="6" xl="6">
              <v-text-field
                v-model="fileSubTitle"
                label="العنوان الثانوي"
                outlined
                color="text"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="6" lg="6" xl="6">
              <v-select
                v-model="uploadType"
                :items="libraryType"
                item-color="text"
                label="النوع"
                outlined
                color="text"
              ></v-select>
            </v-col>

            <v-col
              v-if="uploadType === 1"
              cols="12"
              sm="12"
              md="6"
              lg="6"
              xl="6"
            >
              <v-text-field
                v-model="fileUploaded"
                label="الرابط"
                outlined
                color="text"
              ></v-text-field>
            </v-col>

            <v-col
              v-if="uploadType === 2"
              cols="12"
              sm="12"
              md="6"
              lg="6"
              xl="6"
            >
              <v-file-input
                v-model="fileUploaded"
                label="الملف"
                outlined
                color="text"
                @change="getFile"
              ></v-file-input>
            </v-col>
          </v-row>

          <v-btn block large color="success" type="submit"> رفع الملف </v-btn>
        </v-form>
      </v-card>
    </v-dialog>

    <v-card color="secondary" class="shadow-1 radius-1 pa-5">
      <v-toolbar flat color="primary" class="shadow-1 radius-1 mb-10">
        <div class="d-flex align-center justify-evenly" style="width: 100%">
          <v-toolbar-title style="flex: 1 1 auto">
            {{ courseName }} <v-icon>arrow_left</v-icon> المكتبة
          </v-toolbar-title>
          <v-text-field
            v-model="search"
            color="text"
            placeholder="الملفات..."
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
                class="mr-2"
                v-bind="attrs"
                v-on="on"
                @click="uploadFileDialog = true"
              >
                <v-icon>upload</v-icon>
              </v-btn>
            </template>
            <span class="primary--text">رفع الملفات</span>
          </v-tooltip>

          <v-tooltip bottom transition="slide-y-transition" color="text">
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                color="text"
                class="mr-2"
                v-bind="attrs"
                v-on="on"
                @click="$router.go(-1)"
              >
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
            </template>
            <span class="primary--text">الرجوع الى الكورس</span>
          </v-tooltip>
        </div>
      </v-toolbar>

      <v-row v-if="courseLibraries.length > 0">
        <v-col
          v-for="file in courseLibraries"
          :key="file.idLibrary"
          cols="12"
          sm="12"
          md="4"
          lg="4"
          xl="4"
        >
          <v-card color="primary" class="shadow-1 radius-1 pa-5">
            <img
              style="width: 100%; display: block; border-radius: 75px"
              class="shadow-1"
              src="~/static/noImage.png"
            />
            <v-card-title>{{ file.title }}</v-card-title>
            <v-card-text>{{ file.subTitle }}</v-card-text>

            <v-divider />

            <v-card-actions>
              <v-btn
                color="success"
                text
                :href="$axios.defaults.baseURL + file.documentPath"
              >
                تحميل
              </v-btn>
              <v-spacer />
              <v-btn color="error" text @click="removeFile(file)"> حذف </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-alert v-else colored-border type="warning" color="warning" class="shadow-1 radius-1">
        <h1>المكتبة فارغة</h1>
      </v-alert>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      courseId: null,
      search: '',
      courseName: null,
      courseLibraries: [],
      uploadFileDialog: false,
      uploadNewFileForm: false,
      fileTitle: null,
      fileSubTitle: null,
      fileUploaded: null,
      fileTemp: null,
      uploadType: 1,
      libraryType: [
        {
          text: 'رابط',
          value: 1,
        },
        {
          text: 'ملف',
          value: 2,
        },
      ],
    }
  },

  head() {
    return {
      title: 'الكورسات'
    }
  },

  created() {
    this.courseId = this.$route.params.id
    this.courseDetails()
  },

  methods: {
    getFile($event) {
      this.fileTemp = $event
    },

    async removeFile(item) {
      if (confirm('هل تريد حذف الملف')) {
        try {
          const remove = await this.$axios.delete(`library/${item.idLibrary}`)
          this.$toast.success('تم حذف الملف', {
            duration: 3000,
            position: 'top-center',
          })
          this.courseDetails()
        } catch (error) {
          console.error(error.response)
        }
      }
    },

    async uploadFile() {
      if (this.$refs.uploadNewFileRef.validate()) {
        try {
          if (this.uploadType === 2) {
            const form = new FormData()
            form.append('attachment', this.fileTemp)

            const upload = await this.$axios.post('upload', form)
            this.fileUploaded = upload.data.imagePath
          }

          const addLibrary = await this.$axios.post('addLibrary', {
            title: this.fileTitle,
            subTitle: this.fileSubTitle,
            documentPath: this.fileUploaded,
            courseId: this.$route.params.id * 1,
            createdBy: this.$auth.user.idUser * 1,
            downloaded: 0,
          })

          this.$toast.success('تم رفع الملف', {
            duration: 3000,
            position: 'top-center',
          })

          this.courseDetails()
          this.uploadFileDialog = false
          this.$refs.uploadNewFileRef.reset()
        } catch (error) {
          console.error(error.response)
        }
      }
    },

    async courseDetails() {
      try {
        const course = await this.$axios.get(`course/${this.courseId}`)
        this.courseName = course.data.courseTitle
        this.courseLibraries = course.data.Library
      } catch (error) {
        console.error(error.response)
      }
    },
  },
}
</script>

<style>
</style>
