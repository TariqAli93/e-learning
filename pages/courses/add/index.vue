<template>
  <div class="AddNewCoursePage">
    <Breadcrumbs :items="breadcrumbs" />

    <v-card class="shadow-1 radius-1 pa-5 secondary">
      <v-toolbar flat color="primary" class="shadow-1 radius-1 mb-5">
        <h4>اضافة كورس جديد</h4>
        <v-spacer></v-spacer>
        <v-tooltip bottom transition="slide-y-transition" color="text">
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              color="text"
              v-bind="attrs"
              v-on="on"
              @click="$router.push('/courses')"
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </template>

          <span class="primary--text">الرجوع الى صفحة الكورسات</span>
        </v-tooltip>
      </v-toolbar>

      <div>
        <v-form
          ref="newCourseForm"
          v-model="newCourseForm"
          lazy-validation
          @submit.prevent="createCourse"
        >
          <v-row>
            <v-col cols="12" sm="12" md="3" lg="3" xl="3">
              <v-text-field
                name="courseTitle"
                background-color="secondary"
                color="text"
                outlined
                label="عنوان الكورس"
                :rules="rules"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="3" lg="3" xl="3">
              <v-text-field
                name="coursePrice"
                background-color="secondary"
                color="text"
                outlined
                label="سعر الكورس"
                :rules="rules"
                type="number"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="3" lg="3" xl="3">
              <v-select
                name="courseClass"
                background-color="secondary"
                color="text"
                outlined
                label="الصف"
                :items="classes"
                item-text="className"
                item-value="idClass"
                :rules="rules"
                item-color="text"
                return-object
                @change="getSubjects"
              ></v-select>
            </v-col>

            <v-col cols="12" sm="12" md="3" lg="3" xl="3">
              <v-select
                name="courseSubject"
                background-color="secondary"
                color="text"
                outlined
                label="المادة"
                :rules="rules"
                :disabled="!isClassSelected"
                :items="subjects"
                item-text="subjectName"
                item-value="idSubject"
                item-color="text"
              ></v-select>
            </v-col>

            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-select
                name="courseCreator"
                background-color="secondary"
                color="text"
                outlined
                label="المدرس"
                :rules="rules"
                :items="teachers"
                item-text="userName"
                item-value="idUser"
              ></v-select>
            </v-col>

            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-text-field
                name="coursePlatformPrice"
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
                background-color="secondary"
                name="courseImage"
                color="text"
                outlined
                label="الصورة"
                :rules="rules"
                prepend-icon="mdi-image"
                @change="saveImage"
              ></v-file-input>
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
              ></v-rating>
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="12" xl="12">
              <v-textarea
                name="courseDescription"
                value="لا يوجد"
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
            :disabled="!newCourseForm"
            type="submit"
          >
            حفظ الكورس
          </v-btn>
        </v-form>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newCourseForm: false,
      isClassSelected: false,
      tempImage: null,

      breadcrumbs: [
        {
          text: 'الكورسات',
          disabled: false,
          href: '/courses',
          color: 'primary--text',
          bgColor: 'text pa-3 shadow-1 radius-1',
        },
        {
          text: 'اضافة كورس جديد',
          disabled: true,
          href: '',
          color: 'text--text',
          bgColor: 'transparent',
        },
      ],

      rules: [(v) => !!v || 'لا يمكن ترك الحقل فارغ'],

      teachers: [],
      classes: [],
      subjects: [],
      classId: null,
      courseRate: 0,
    }
  },

  mounted() {
    this.getClasses()
    this.getTeachers()
  },

  head() {
    return {
      title: 'اضافة كورس جديد'
    }
  },

  methods: {
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

    getSubjects(item) {
      this.isClassSelected = true
      this.subjects = item.Subject
      this.classId = item.idClass
    },

    saveImage(event) {
      this.tempImage = event
    },

    async createCourse(event) {
      let course = {}
      if (this.$refs.newCourseForm.validate()) {
        course = {
          ...Object.fromEntries(new FormData(event.target)),
          courseClass: this.classId,
          courseImage: '',
        }

        const form = new FormData()
        form.append('attachment', this.tempImage)

        try {
          const upload = await this.$axios.post('upload', form)
          if (upload.data.imagePath) {
            const data = {
              courseTitle: course.courseTitle,
              courseDescription: course.courseDescription,
              courseRate: this.courseRate,
              coursePrice: parseFloat(course.coursePrice),
              classId: course.courseClass * 1,
              createdBy: course.courseCreator * 1,
              coursePath: upload.data.imagePath,
              subjectId: course.courseSubject * 1,
              platformPrice: parseFloat(course.coursePlatformPrice),
            }

            this.$axios.post('addCourse', data).then(course => {
              this.$toast.success('تم اضافة كورس جديد', {
                duration: 3000,
                position: 'top-center'
              })

              this.$refs.newCourseForm.reset()
            }).catch(err => {
              console.error(err.response)
            })
          }
        } catch (error) {
          console.error(error.response)
        }
      }
    },
  },
}
</script>

<style lang="scss">
</style>
