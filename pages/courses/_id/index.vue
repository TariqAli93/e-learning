<template>
  <div id="CourseSinglePage">
    <v-breadcrumbs :items="breadcrumbs" class="text--text">
      <template #divider>
        <v-icon>mdi-arrow-left</v-icon>
      </template>
      <template #item="{ item }">
        <v-breadcrumbs-item
          :class="item.bgColor"
          :href="item.href"
          :disabled="item.disabled"
        >
          <span :class="item.color">
            {{ item.text }}
          </span>
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>

    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="videos"
      :search="search"
      class="shadow-1 radius-1 secondary pa-5"
      show-select
      :single-select="false"
      item-key="videoId"
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

      <template #[`item.attachments`]="{ item }">
        <v-btn
          text
          color="text"
          class="primary--text"
          depressed
          rounded
          small
          @click="item"
        >
          <v-icon>mdi-download</v-icon>
          <span>تحميل المرفات</span>
        </v-btn>
      </template>

      <template #[`item.videoURI`]="{ item }">
        <v-btn
          text
          color="warning"
          class="primary--text"
          depressed
          rounded
          small
          @click="item"
        >
          <v-icon>mdi-play</v-icon>
          <span>عرض الفيديو</span>
        </v-btn>
      </template>

      <template #[`item.actions`]="{ item }">
        <v-btn
          icon
          color="warning"
          class="primary--text"
          small
          @click="
            $router.push(`/courses/${$route.params.id}/videos/${item.videoId}`)
          "
        >
          <v-icon>mdi-circle-edit-outline</v-icon>
        </v-btn>

        <v-btn icon color="error" class="primary--text" small @click="item">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>

      <template #[`item.isLocked`]="{ item }">
        <v-chip :color="item.isLocked ? 'warning': 'success'">
          <span class="primary--text">{{ item.isLocked ? 'مقفل' : 'مفتوح'}}</span>
        </v-chip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      lockCourseBtn: false,
      selected: [],
      course: [],
      videos: [],
      breadcrumbs: [
        {
          text: 'الكورسات',
          disabled: false,
          href: '/courses',
          color: 'primary--text',
          bgColor: 'text pa-3 shadow-1 radius-1',
        },
        {
          text: this.$route.params.id,
          disabled: true,
          href: '',
          color: 'text--text',
          bgColor: 'transparent',
        },
      ],
      headers: [
        {
          text: '#',
          value: 'videoId',
          sortable: false,
          align: 'start',
        },
        {
          text: 'عنوان الفيديو',
          value: 'videoTitle',
          sortable: false,
          align: 'start',
        },
        {
          text: 'حالة الفيديو',
          value: 'isLocked',
          sortable: false,
          align: 'start',
        },
        {
          text: 'المرفقات',
          value: 'attachments',
          sortable: false,
          align: 'start',
        },
        {
          text: 'عرض الفيديو',
          value: 'videoURI',
          sortable: false,
          align: 'start',
        },
        {
          text: 'الاجرائات',
          value: 'actions',
          sortable: false,
          align: 'start',
        },
      ],
    }
  },

  watch: {
    selected(val) {
      if (!!val && val.length > 0) {
        this.lockCourseBtn = true
      } else {
        this.lockCourseBtn = false
      }
    },
  },

  mounted() {
    const courseId = this.$route.params.id
    this.$axios
      .get(`courses/${courseId}`)
      .then((result) => {
        this.course = result.data[0]
        this.videos = this.course.videos
      })
      .catch((error) => {
        throw new Error(error)
      })
  },

  methods: {
    OpenVideos() {
      let item;
      for(let i = 0; i < this.selected.length; i++) {
        item = this.videos.filter(video => {
          return video === this.selected[i]
        })

        console.log(item[0].isLocked = false);
      }
    }
  }
}
</script>