<template>
  <div id="CoursesPage">
    <v-dialog v-model="updateCourseDialog" max-width="750px" transition="slide-y-transition">
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-toolbar color="primary" class="shadow-1 radius-1">
          <h4>تعديل الكورس</h4>
          <v-spacer />
          <v-btn color="error" icon @click="updateCourseDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
      </v-card>
    </v-dialog>

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

      <template #[`item.coursePath`]="{ item }">
        <img
          :src="$axios.defaults.baseURL + item.coursePath"
          class="table__image shadow-1"
        />

        <div class="hover__preview">
          <div class="hover__preview__content primary shadow-1 radius-1">
            <img
              :src="$axios.defaults.baseURL + item.coursePath"
              class="hover__preview__img"
            />
          </div>
        </div>
      </template>

      <template #[`item.actions`]="{ item }">
        <v-btn icon color="success" @click.prevent="OpenCourse(item)">
          <v-icon>mdi-eye</v-icon>
        </v-btn>

        <v-btn icon color="warning" @click.prevent="initUpdateCourse(item)">
          <v-icon>edit</v-icon>
        </v-btn>

        <v-btn icon color="error" @click.prevent="deleteCourse(item)">
          <v-icon>delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <!-- course table -->
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
export default {
  data() {
    return {
      search: '',
      dates: [],
      datesMenu: false,
      updateCourseDialog: false,
      headers: [
        {
          text: 'الصورة',
          align: 'start',
          value: 'coursePath',
          sortable: false,
        },
        { text: 'المعرف', align: 'start', value: 'idCourse', sortable: false, },
        { text: 'اسم الكورس', value: 'courseTitle', sortable: false },
        { text: 'التقيم', value: 'courseRate', sortable: false, },
        { text: 'عدد الفيديوات', value: 'CourseVideo.length', sortable: false, },
        { text: 'سعر الكورس', value: 'coursePrice', sortable: false, },
        { text: 'سعر المنصة', value: 'platformPrice', sortable: false, },
        { text: 'المادة', value: 'subject.subjectName', sortable: false, },
        { text: 'التاريخ', value: 'createdAt', sortable: false, },
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
      this.$router.push({ path: `/courses/${item.idCourse}/` })
    },

    initUpdateCourse(item) {
      console.log(item)
      this.updateCourseDialog = true
    },

    deleteCourse(item) {
      console.log(item)
    },

    SaveDate(date) {
      this.$refs.datesMenuRef.save(date)
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