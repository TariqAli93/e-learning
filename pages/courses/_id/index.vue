<template>
  <div class="course-page">
    <v-data-table
      :headers="headers"
      :items="videos"
    >
      <template #top>
        <v-toolbar flat color="primary" class="shadow-1 radius-1">
          <div class="d-flex align-center justify-evenly" style="width: 100%">
            <v-toolbar-title style="flex: 1 1 auto">الفيديوات</v-toolbar-title>
            <v-text-field
              v-model="search"
              color="text"
              placeholder="الفيديوات..."
              style="flex: 1 1 auto"
              outlined
              hide-details
              dense
              clearable
            >
            </v-text-field>

            <v-tooltip
              v-if="lockCourseBtn"
              bottom
              transition="slide-y-transition"
              color="text"
            >
              <template #activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  icon
                  color="warning"
                  class="mr-10"
                  v-on="on"
                  @click="OpenVideos"
                >
                  <v-icon>mdi-lock-open</v-icon>
                </v-btn>
              </template>
              <span class="primary--text">فتح الفيديوات</span>
            </v-tooltip>

            <v-tooltip bottom transition="slide-y-transition" color="text">
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  color="text"
                  class="mr-2"
                  v-bind="attrs"
                  v-on="on"
                  @click="$router.push(`/courses/${$route.params.id}/add/`)"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <span class="primary--text">اضافة فيديو</span>
            </v-tooltip>

            <v-tooltip bottom transition="slide-y-transition" color="text">
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  color="text"
                  class="mr-2"
                  v-bind="attrs"
                  v-on="on"
                  @click="
                    $router.push(`/courses/${$route.params.id}/settings/`)
                  "
                >
                  <v-icon>mdi-tune</v-icon>
                </v-btn>
              </template>
              <span class="primary--text">اعدادات الكورس</span>
            </v-tooltip>

            <v-tooltip bottom transition="slide-y-transition" color="text">
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  color="text"
                  class="mr-2"
                  v-bind="attrs"
                  v-on="on"
                  @click="$router.push('/courses')"
                >
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
              </template>
              <span class="primary--text">الرجوع الى صفحة الكورسات</span>
            </v-tooltip>
          </div>
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [],
      videos: [],
    }
  },

  mounted() {
    this.getVideos()
  },

  methods: {
    async getVideos() {
      try {
        const courseId = await this.$route.params.id
        const course = await this.$axios.get(`course/${courseId}`)
        console.log(course.data.CourseVideo)
      } catch (error) {
        console.error(error.response)
      }
    },
  },
}
</script>

<style>
</style>