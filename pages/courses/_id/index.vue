<template>
  <div class="course-page">
    <v-dialog v-model="updateViedoDialog">
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-toolbar color="primary" class="shadow-1 radius-">
          <h4>تحديث الفيديو</h4>
          <v-spacer />
          <v-btn icon color="accent" @click="updateViedoDialog = false"></v-btn>
        </v-toolbar>
      </v-card>
    </v-dialog>

    <v-card color="secondary" class="shadow-1 radius-1">
      <v-data-table :headers="headers" :items="videos" :search="search" class="shadow-1 radius-1 pa-5 secondary courses__table">
        <template #top>
          <v-toolbar flat color="primary" class="shadow-1 radius-1">
            <div class="d-flex align-center justify-evenly" style="width: 100%">
              <v-toolbar-title style="flex: 1 1 auto"
                >الفيديوات</v-toolbar-title
              >
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

        <template #[`item.videoLink`]="{ item }">
          <v-btn color="transparent" depressed :href="item.videoLink" target="_blank">
            <v-icon class="ml-2" color="error">mdi-youtube</v-icon>
            <span>عرض الفيديو</span>
          </v-btn>
        </template>

        <template #[`item.actions`]="{ item }">
          <v-btn icon color="warning" @click="editVideo(item)">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn icon color="error" @click="deleteVideo(item)">
            <v-icon>delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      headers: [
        {
          text: '#',
          sortable: false,
          align: 'start',
          value: 'idCourseVideo'
        },
        {
          text: 'عنوان الفيديو',
          sortable: false,
          align: 'start',
          value: 'videoTitle'
        },
        {
          text: 'رابط الفيديو',
          sortable: false,
          align: 'start',
          value: 'videoLink'
        },
        {
          text: 'الوصف',
          sortable: false,
          align: 'start',
          value: 'videoDescription'
        },
        {
          text: 'الاجرائات',
          sortable: false,
          align: 'start',
          value: 'actions'
        }
      ],
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
        this.videos = course.data.CourseVideo
      } catch (error) {
        console.error(error.response)
      }
    },
  },
}
</script>

<style>
</style>