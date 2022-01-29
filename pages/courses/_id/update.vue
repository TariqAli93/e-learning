<template>
  <div class="update-page">
    <v-card color="secondary" class="shadow-1 radius-1 pa-10">
      <v-toolbar color="primary" class="shadow-1 radius-1 mb-10">
        <h4>تعديل الكورس</h4>
        <v-spacer />
        <v-btn color="text" icon @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form
        ref="updateCourseRef"
        v-model="updateCourseModel"
        lazy-validation
        @submit.prevent="updateCourse"
      >
        <v-row>
          <v-col cols="12" sm="12" md="6" lg="6" xl="6">
            <v-text-field
              v-model="courseTitle"
              background-color="secondary"
              color="text"
              outlined
              label="عنوان الكورس"
              :rules="rules"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="12" md="6" lg="6" xl="6">
            <v-text-field
              v-model="coursePrice"
              background-color="secondary"
              color="text"
              outlined
              label="سعر الكورس"
              :rules="rules"
              type="number"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="12" md="6" lg="6" xl="6">
            <v-select
              v-model="courseClass"
              background-color="secondary"
              color="text"
              outlined
              label="الصف"
              :items="classes"
              item-text="className"
              item-value="idClass"
              :rules="rules"
              item-color="text"
            ></v-select>
          </v-col>

          <v-col cols="12" sm="12" md="6" lg="6" xl="6">
            <v-select
              v-model="courseSubject"
              background-color="secondary"
              color="text"
              outlined
              label="المادة"
              :rules="rules"
              :items="subjects"
              item-text="subjectName"
              item-value="idSubject"
              item-color="text"
            ></v-select>
          </v-col>

          <v-col cols="12" sm="12" md="4" lg="4" xl="4">
            <v-select
              v-model="courseCreator"
              background-color="secondary"
              color="text"
              outlined
              label="المدرس"
              :rules="rules"
              :items="teachers"
              item-text="userName"
              item-value="roleId"
            ></v-select>
          </v-col>

          <v-col cols="12" sm="12" md="4" lg="4" xl="4">
            <v-text-field
              v-model="coursePlatformPrice"
              background-color="secondary"
              color="text"
              outlined
              label="سعر المنصة"
              :rules="rules"
              type="number"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="3" md="4" lg="4" xl="4">
            <v-file-input
              v-model="courseImage"
              background-color="secondary"
              color="text"
              outlined
              label="الصورة"
              :rules="rules"
              @change="saveImage"
            >
              <template #prepend-inner>
                <v-img
                  :src="$axios.defaults.baseURL + courseImage"
                  width="30px"
                  height="30px"
                />
              </template>
            </v-file-input>
          </v-col>

          <v-col cols="12">
            <v-rating
              v-model="courseRate"
              color="yellow darken-3"
              background-color="grey darken-1"
              empty-icon="$ratingFull"
              half-increments
              hover
              large
              readonly
            ></v-rating>
          </v-col>

          <v-col cols="12" sm="12" md="12" lg="12" xl="12">
            <v-textarea
              v-model="courseDescription"
              background-color="secondary"
              color="text"
              outlined
              label="وصف الكورس"
              :rules="rules"
            ></v-textarea>
          </v-col>
        </v-row>

        <v-btn
          block
          color="success"
          class="primary--text"
          :disabled="!updateCourseModel"
          type="submit"
        >
          حفظ الكورس
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      updateCourseModel: false,
      courseTitle: '',
      coursePrice: '',
      courseClass: '',
      courseSubject: '',
      courseCreator: '',
      coursePlatformPrice: '',
      courseImage: '',
      courseRate: '',
      courseDescription: '',

      //
      teachers: [],
      classes: [],
      subjects: [],
      classId: null,
      rules: [(v) => !!v || 'لا يمكن ترك الحقل فارغ'],

      //
      isClassSelected: false,
      tempImage: null,
      courses: {},
      isImageChanged: false,
    }
  },

  head() {
    return {
      title: 'الكورسات'
    }
  },

  mounted() {
    this.getClasses()
    this.getTeachers()
    this.GetCourses()
  },

  methods: {
    GetCourses() {
      this.$axios
        .get(`course/${this.$route.params.id}`)
        .then((res) => {
          this.courses = res.data
          console.log(res.data)
          this.courseTitle = res.data.courseTitle
          this.coursePrice = res.data.coursePrice
          this.courseClass = res.data.classId
          this.courseSubject = res.data.subjectId
          this.courseCreator = res.data.user.idUser
          this.coursePlatformPrice = res.data.platformPrice
          this.courseImage = res.data.coursePath
          this.courseRate = res.data.courseRate
          this.courseDescription = res.data.courseDescription

          this.$axios.get(`subjects`).then((sub) => {
            this.subjects = sub.data
          })
        })
        .catch((err) => {
          console.log(err)
        })
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

    getTeachers() {
      this.$axios
        .get(`userRoles/3`)
        .then((result) => {
          this.teachers = result.data
          console.log(result.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    saveImage(event) {
      this.tempImage = event
      this.isImageChanged = true
    },

    async updateCourse() {
      if (this.$refs.updateCourseRef.validate()) {
        try {
          if (this.isImageChanged) {
            const form = new FormData()
            form.append('attachment', this.tempImage)
            const upload = await this.$axios.post('upload', form)
            const update = await this.$axios.put(
                `course/${this.$route.params.id}`,
                {
                  courseTitle: this.courseTitle,
                  courseDescription: this.courseDescription,
                  courseRate: this.courseRate * 1,
                  coursePrice: this.coursePrice * 1,
                  classId: this.courseClass * 1,
                  coursePath: upload.data.imagePath,
                  subjectId: this.courseSubject * 1,
                  platformPrice: this.coursePlatformPrice * 1,
                  createdBy: this.courseCreator * 1,
                }
              )
          } else {
              const update = await this.$axios.put(
                `course/${this.$route.params.id}`,
                {
                  courseTitle: this.courseTitle,
                  courseDescription: this.courseDescription,
                  courseRate: this.courseRate * 1,
                  coursePrice: this.coursePrice * 1,
                  classId: this.courseClass * 1,
                  coursePath: this.courseImage,
                  subjectId: this.courseSubject * 1,
                  platformPrice: this.coursePlatformPrice * 1,
                  createdBy: this.courseCreator * 1,
                }
              )
          }

          this.$toast.success('تم تحديث الكورس', {
            duration: 3000,
            position: 'top-center',
          })
          this.GetCourses()
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
