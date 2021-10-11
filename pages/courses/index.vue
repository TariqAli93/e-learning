<template>
  <div id="CoursesPage">
    <!-- course table -->
    <v-data-table
      :headers="headers"
      :items.sync="courses"
      :items-per-page="15"
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
                  class="mr-10"
                  v-bind="attrs"
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
    </v-data-table>
    <!-- course table -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'الصورة',
          align: 'start',
          value: 'featuredImage',
          sortable: false,
        },
        { text: 'المعرف', align: 'start', value: 'courseId' },
        { text: 'اسم الكورس', value: 'courseName', sortable: false },
        { text: 'المدرس', value: 'teacher', sortable: false },
        { text: 'عدد الطلاب', value: 'students.length' },
        { text: 'عدد الفيديوات', value: 'videos.length' },
        { text: 'التاريخ', value: 'createdAt' },
        { text: 'الاجرائات', value: 'actions', sortable: false },
      ],

      courses: [],
    }
  },

  mounted() {
    this.$axios
      .get('courses')
      .then((res) => {
        this.courses = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },

  methods: {
    OpenCourse(item) {
      this.$router.push({ path: `/courses/${item.courseId}/` })
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