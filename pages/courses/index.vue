<template>
  <div id="CoursesPage">
    <div class="courses__filter mb-10">
      <v-card class="shadow-1 radius-1 secondary pa-5">
        <div class="d-flex">
          <h4>فرز الكورسات</h4>
          <v-spacer></v-spacer>
          <h4>نتائج البحث: {{ courses.length }}</h4>
        </div>
        <v-divider class="mt-5 mb-5"></v-divider>
        <v-row>
          <v-col cols="12" xs="12" sm="12" md="12" lg="3" xl="3">
            <v-menu
              ref="datesMenuRef"
              v-model="datesMenu"
              transition="scale-transition"
              offset-y
              left
              max-width="290px"
              min-width="auto"
              :close-on-content-click="false"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="dateRangeText"
                  label="التاريخ (من و الى)"
                  readonly
                  outlined
                  color="text"
                  dark
                  v-bind="attrs"
                  dense
                  hide-details
                  clearable
                  v-on="on"
                >
                </v-text-field>
              </template>

              <v-card color="white" elevation="0">
                <v-date-picker
                  v-model="dates"
                  range
                  color="secondary"
                  light
                  header-color="secondary"
                  @change="SaveDate"
                ></v-date-picker>
              </v-card>
            </v-menu>
          </v-col>

          <v-col cols="12" xs="12" sm="12" md="12" lg="3" xl="3">
            <v-select
              v-model="subject"
              :items="[{ text: 'subject', value: 'subject' }]"
              color="text"
              outlined
              dense
              label="المادة"
              hide-details
            ></v-select>
          </v-col>

          <v-col cols="12" xs="12" sm="12" md="12" lg="3" xl="3">
            <v-select
              v-model="filterTeachers"
              :items="[{ text: 'Teacher', value: 'Teacher' }]"
              color="text"
              outlined
              dense
              label="المدرس"
              hide-details
            ></v-select>
          </v-col>

          <v-col cols="12" xs="12" sm="12" md="12" lg="3" xl="3">
            <v-btn
              color="text"
              width="45%"
              light
              depressed
              @click="FilterTheCourses"
            >
              تطبيق الفرز
            </v-btn>

            <v-btn
              color="warning"
              class="primary--text w-50"
              width="45%"
              depressed
              @click.stop="GetCourses"
            >
              اعادة الضبط
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </div>
    <!-- course table -->
    <v-data-table
      :headers="headers"
      :items.sync="courses"
      :items-per-page="15"
      item-key="courseId"
      class="shadow-1 radius-1 pa-5 secondary courses__table"
      :search="search"
    >
      <template #top>
        <v-toolbar flat color="primary" class="shadow-1 radius-1">
          <div class="d-flex align-center justify-evenly" style="width: 100%">
            <v-toolbar-title style="flex: 1 1 auto">الكورسات</v-toolbar-title>
            <v-text-field
              v-model="search"
              color="text"
              placeholder="الكورسات..."
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
                  @click="$router.push('/courses/add')"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <span class="primary--text">اضافة كورس</span>
            </v-tooltip>
          </div>
        </v-toolbar>
      </template>

      <template #[`item.featuredImage`]="{ item }">
        <img
          :src="item.featuredImage"
          :alt="item.courseName"
          class="table__image shadow-1"
        />

        <div class="hover__preview">
          <div class="hover__preview__content primary shadow-1 radius-1">
            <img
              :src="item.featuredImage"
              :alt="item.courseName"
              class="hover__preview__img"
            />
          </div>
        </div>
      </template>

      <template #[`item.actions`]="{ item }">
        <v-btn icon color="success" @click.prevent="OpenCourse(item)">
          <v-icon>mdi-eye</v-icon>
        </v-btn>
      </template>

      <template #[`item.createdAt`]="{ item }">
        {{ FormateDate(item.createdAt) }}
      </template>
    </v-data-table>
    <!-- course table -->
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import moment from 'moment'
export default {
  data() {
    return {
      search: '',
      dates: [],
      datesMenu: false,
      subject: '',
      filterTeachers: '',
      headers: [
        {
          text: 'الصورة',
          align: 'start',
          value: 'featuredImage',
          sortable: false,
        },
        { text: 'المعرف', align: 'start', value: 'courseId' },
        { text: 'اسم الكورس', value: 'courseName', sortable: false },
        { text: 'المادة', value: 'courseSubject', sortable: false },
        { text: 'المدرس', value: 'teacher', sortable: false },
        { text: 'عدد الطلاب', value: 'students.length' },
        { text: 'عدد الفيديوات', value: 'videos.length' },
        { text: 'سعر الكورس', value: 'price' },
        { text: 'التاريخ', value: 'createdAt' },
        { text: 'الاجرائات', value: 'actions', sortable: false },
      ],

      courses: [],
    }
  },

  computed: {
    dateRangeText() {
      return this.dates.join(' ~ ')
    },
  },

  mounted() {
    this.GetCourses()
  },

  methods: {
    GetCourses() {
      this.$axios
        .get('courses')
        .then((res) => {
          this.courses = res.data
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    OpenCourse(item) {
      this.$router.push({ path: `/courses/${item.courseId}/` })
    },

    SaveDate(date) {
      this.$refs.datesMenuRef.save(date)
    },

    FilterTheCourses() {
      if (!!this.dateRangeText && this.dateRangeText.length > 0) {
        const dates = this.dateRangeText.split('~')
        const from = dates[0]
        const to = dates[1]

        const filterd = this.courses.filter((course) => {
          const courseDate = moment(course.createdAt).format('DD-MM-YYYY')
          return moment(courseDate).isBetween(from, to)
        })

        this.courses = filterd
      }
    },

    FormateDate(date) {
      return moment(date).format('DD-MM-YYYY')
    },
  },
}
</script>

<style lang="scss">
.hover__preview {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  visibility: hidden;
  opacity: 0;
  z-index: 2000;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  &__content {
    width: 300px;
    height: 300px;
    margin-right: auto;
    position: absolute;
    top: 50px;
    left: 50px;

    img {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 1em;
      position: relative;
      z-index: 500;
    }
  }
}

.table__image {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 0.3em;

  &:hover ~ .hover__preview {
    visibility: visible;
    opacity: 1;
    display: block;
  }
}
</style>