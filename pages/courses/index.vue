<template>
  <div id="CoursesPage">
    <v-dialog
      v-model="distributorsDialog"
      transition="slide-y-transition"
      max-width="750px"
    >
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-toolbar color="primary" class="shadow-1 radius-1 mb-10">
          <h4>الموزعين</h4>
          <v-spacer />
          <v-btn color="error" icon @click="distributorsDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-data-table
          :headers="distributorsHeaders"
          :items.sync="distributors"
          :items-per-page="15"
          class="pa-5 secondary courses__table"
        >
          <template #[`item.distributorStatus`]="{ item }">
            <v-chip :color="item.distributorStatus | theStatus">{{
              item.distributorStatus
            }}</v-chip>
          </template>

          <template #[`item.actions`]="{ item }">
            <v-menu transition="slide-y-transition">
              <template #activator="{ on, attrs }">
                <v-btn color="warning" icon small v-bind="attrs" v-on="on">
                  <v-icon>published_with_changes</v-icon>
                </v-btn>
              </template>

              <v-list nav dense color="primary">
                <v-list-item
                  class="text--text"
                  @click="changeStatus(item, 'ACCEPTED')"
                  >ACCEPTED</v-list-item
                >
                <v-divider class="secondary mb-2 mt-2" />
                <v-list-item
                  class="text--text"
                  @click="changeStatus(item, 'PENDING')"
                  >PENDING</v-list-item
                >
                <v-divider class="secondary mb-2 mt-2" />
                <v-list-item
                  class="text--text"
                  @click="changeStatus(item, 'CANCELLED')"
                  >CANCELLED</v-list-item
                >
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="commentsDialog"
      transition="slide-y-transition"
      max-width="750px"
    >
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-toolbar color="primary" class="shadow-1 radius-1 mb-10">
          <h4>التعليقات</h4>
          <v-spacer />
          <v-btn color="error" icon @click="commentsDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-data-table
          :headers="commentsHeaders"
          :items.sync="comments"
          :items-per-page="15"
          group-by="videoTitle"
          class="pa-5 secondary courses__table"
        >
          <template #[`item.actions`]="{ item }">
            <v-btn icon color="warning" @click="deleteComment(item)">
              <v-icon>delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
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

        <v-btn
          icon
          color="warning"
          @click.prevent="$router.push(`/courses/${item.idCourse}/update`)"
        >
          <v-icon>edit</v-icon>
        </v-btn>

        <v-btn icon color="error" @click.prevent="deleteCourse(item)">
          <v-icon>delete</v-icon>
        </v-btn>

        <!-- <v-btn
          icon
          color="info"
          @click.prevent="getDistributors(item.idCourse)"
        >
          <v-icon>people</v-icon>
        </v-btn>

        <v-btn icon color="success" @click.prevent="getComments(item)">
          <v-icon>mark_chat_unread</v-icon>
        </v-btn> -->
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

      commentsDialog: false,
      comments: [],
      commentsHeaders: [
        {
          text: '#',
          value: 'idVideoComment',
        },
        {
          text: 'الاسم',
          value: 'user.userName',
        },
        {
          text: 'التعليق',
          value: 'userComment',
        },
        {
          text: 'التاريخ',
          value: 'createdAt',
        },
        {
          text: 'الاجرائات',
          value: 'actions',
        },
      ],

      distributorsDialog: false,
      distributors: [],
      distributorsHeaders: [
        {
          text: 'المعرف',
          align: 'start',
          value: 'user.idUser',
          sortable: false,
        },
        {
          text: 'اسم الموزع',
          align: 'start',
          value: 'user.userName',
          sortable: false,
        },
        {
          text: 'رقم الهاتف',
          align: 'start',
          value: 'user.phone',
          sortable: false,
        },
        {
          text: 'المحافطة',
          align: 'start',
          value: 'user.province.provinceName',
          sortable: false,
        },
        {
          text: 'الحالة',
          align: 'start',
          value: 'distributorStatus',
          sortable: false,
        },
        {
          text: 'الاجرائات',
          align: 'start',
          value: 'actions',
          sortable: false,
        },
      ],

      headers: [
        {
          text: 'الصورة',
          align: 'start',
          value: 'coursePath',
          sortable: false,
        },
        { text: 'المعرف', align: 'start', value: 'idCourse', sortable: false },
        { text: 'اسم الكورس', value: 'courseTitle', sortable: false },
        { text: 'التقيم', value: 'courseRate', sortable: false },
        { text: 'عدد الفيديوات', value: 'CourseVideo.length', sortable: false },
        { text: 'سعر الكورس', value: 'coursePrice', sortable: false },
        { text: 'سعر المنصة', value: 'platformPrice', sortable: false },
        { text: 'المادة', value: 'subject.subjectName', sortable: false },
        { text: 'الصف', value: 'subject.class.className', sortable: false },
        { text: 'التاريخ', value: 'createdAt', sortable: false },
        { text: 'الاجرائات', value: 'actions', sortable: false, width: 300 },
      ],

      courses: [],
    }
  },

  computed: {
    dateRangeText() {
      return this.dates.join(' ~ ')
    },
  },

  filters: {
    theStatus(status) {
      if (status === 'ACCEPTED') {
        return 'success'
      } else if (status === 'PENDING') {
        return 'warning'
      } else {
        return 'error'
      }
    },
  },

  mounted() {
    this.GetCourses()
  },

  head() {
    return {
      title: 'الكورسات',
    }
  },

  methods: {
    async GetCourses() {
      try {
        const courses = await this.$axios.get('courses')
        console.log(courses.data)
        this.courses = courses.data.map((course) => {
          return {
            ...course,
            createdAt: course.createdAt.split('T')[0],
          }
        })
      } catch (error) {
        console.log(error)
      }
    },

    OpenCourse(item) {
      const width = window.innerWidth
      const height = window.innerHeight
      window.open(
        `/courses/${item.idCourse}/`,
        '_blank',
        `location=yes,height=${height},width=${width},scrollbars=yes,status=yes`
      )
      // this.$router.push({ path: `/courses/${item.idCourse}/` })
    },

    deleteCourse(item) {
      if (confirm('هل تريد حذف الكورس ؟')) {
        this.$axios
          .delete(`course/${item.idCourse}`)
          .then((res) => {
            this.GetCourses()
          })
          .catch((err) => {
            console.error(err.response)
          })
      }
    },

    SaveDate(date) {
      this.$refs.datesMenuRef.save(date)
    },

    async getDistributors(id) {
      const idCourse = id
      this.$nuxt.$loading.start()
      try {
        const dist = await this.$axios.get(`courseDistributors/${idCourse}`)
        this.$nuxt.$loading.finish()
        this.distributorsDialog = true
        this.distributors = dist.data
        console.log(dist.data)
      } catch (error) {
        console.error(error.response)
        this.$toast.error('لا يوجد موزعين', {
          position: 'top-center',
          duration: 3000,
        })
        this.$nuxt.$loading.finish()
      }
    },

    getComments(item) {
      console.log('%cindex.vue line:361 item', 'color: #007acc;', item)
      this.comments = []
      this.commentsDialog = true
    },

    deleteComment(id) {
      console.log('%cindex.vue line:385 id', 'color: #007acc;', id)
    },

    async changeStatus(item, status) {
      try {
        const update = await this.$axios.put(
          `courseDistributor/${item.idCourseDistributor}`,
          {
            courseId: item.courseId,
            distributorId: item.distributorId,
            distributorStatus: status,
          }
        )

        console.log(update.data)
        this.getDistributors(item.courseId)
        this.distributorsDialog = false
        this.distributorsDialog = true
      } catch (error) {
        console.error(error.response)
      }
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
