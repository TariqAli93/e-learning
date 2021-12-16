<template>
  <div class="course-library">
    <v-dialog v-model="uploadFileDialog" max-width="750px" transition="slide-y-transition">
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-toolbar flat color="primary" class="shadow-1 radius-1 mb-10">
          <h4>رفع ملف جديد</h4>
          <v-spacer />
          <v-btn icon color="text" @click="uploadFileDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
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

      <v-row>
        <v-col
          cols="12"
          sm="12"
          md="3"
          lg="3"
          xl="3"
          v-for="file in courseLibraries"
          :key="file.idLibrary"
        >
          <v-card color="primary" class="shadow-1 radius-1 pa-5">
            <img style="width: 100%; display: block; border-radius: 75px" class="shadow-1" src="~/static/noImage.png" />
            <v-card-title>{{ file.title }}</v-card-title>
            <v-card-text>{{ file.subTitle }}</v-card-text>

            <v-divider />

            <v-card-actions>
              <v-btn color="warning" text @click="editable = true">
                تعديل
              </v-btn>

              <v-btn color="error" text>
                حذف
              </v-btn>

              <v-spacer />

              <v-btn color="success" text>
                تحميل
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      courseId: null,
      courseName: null,
      courseLibraries: [],
      uploadFileDialog: false
    }
  },

  created() {
    this.courseId = this.$route.params.id
    this.courseDetails()
  },

  methods: {
    async courseDetails() {
      try {
        const course = await this.$axios.get(`course/${this.courseId}`)
        this.courseName = course.data.courseTitle
        this.courseLibraries = course.data.Library
        console.log(course.data)
      } catch (error) {
        console.error(error.response)
      }
    },
  },
}
</script>

<style>
</style>
