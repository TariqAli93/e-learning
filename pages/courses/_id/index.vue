<template>
  <div class="course-page">
    <v-dialog
      v-model="updateVideoDialog"
      max-width="750px"
      transition="slide-y-transition"
    >
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-toolbar color="primary" class="shadow-1 radius-1 mb-10">
          <h4>تحديث الفيديو</h4>
          <v-spacer />
          <v-btn icon color="accent" @click="updateVideoDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-form
          ref="updateVideoRef"
          v-model="updateForm"
          lazy-validation
          @submit.prevent="updateVideo"
        >
          <v-row>
            <v-col cols="12" sm="12" md="6" lg="6" xl="6">
              <v-text-field
                v-model="updatedVideo.videoTitle"
                name="videoTitle"
                :rules="rules"
                label="عنوان الفيديو"
                outlined
                color="text"
                clearable
                prepend-inner-icon="title"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="6" lg="6" xl="6">
              <v-text-field
                v-model="updatedVideo.videoLink"
                name="videoLink"
                :rules="rules"
                label="رابط الفيديو"
                outlined
                color="text"
                clearable
                prepend-inner-icon="mdi-youtube"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="updatedVideo.videoDescription"
                name="videoDescription"
                :rules="rules"
                label="وصف الفيديو"
                outlined
                color="text"
                clearable
                prepend-inner-icon="text_fields"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-btn
            block
            large
            color="success"
            depressed
            type="submit"
            :disabled="!updateForm"
            >حفظ الفيديو</v-btn
          >
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="uploadDialog"
      max-width="750px"
      transition="slide-y-transition"
    >
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-toolbar color="primary" class="shadow-1 radius-1 mb-10">
          <h4>اضافة فيديو جديد</h4>
          <v-spacer />
          <v-btn icon color="accent" @click="uploadDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-form
          ref="uploadVideoRef"
          v-model="uploadForm"
          lazy-validation
          @submit.prevent="uploadVideo"
        >
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="uploadVideoLink"
                :rules="rules"
                label="رابط الفيديو"
                outlined
                color="text"
                clearable
                prepend-inner-icon="mdi-youtube"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-btn
            block
            large
            color="success"
            depressed
            type="submit"
            :disabled="!uploadForm"
            >حفظ الفيديو</v-btn
          >
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="createVideoDialog"
      max-width="750px"
      transition="slide-y-transition"
    >
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-toolbar color="primary" class="shadow-1 radius-1 mb-10">
          <h4>اضافة فيديو جديد</h4>
          <v-spacer />
          <v-btn icon color="accent" @click="createVideoDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-form
          ref="createVideoRef"
          v-model="createForm"
          lazy-validation
          @submit.prevent="createVideo($event)"
        >
          <v-row>
            <v-col cols="12" sm="12" md="6" lg="6" xl="6">
              <v-text-field
                name="videoTitle"
                label="عنوان الفيديو"
                :rules="rules"
                outlined
                color="text"
                prepend-inner-icon="title"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="6" lg="6" xl="6">
              <v-text-field
                name="videoLink"
                label="رابط الفيديو"
                :rules="rules"
                outlined
                color="text"
                prepend-inner-icon="mdi-youtube"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="6" lg="6" xl="6">
              <v-text-field
                name="unlockAt"
                label="تاريخ الفتح"
                :rules="rules"
                outlined
                color="text"
                type="datetime-local"
                prepend-inner-icon="mdi-youtube"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="6" lg="6" xl="6">
              <v-file-input
                v-model="videoPhotoTmp"
                label="صورة الفيديو"
                :rules="rules"
                outlined
                color="text"
                prepend-inner-icon="mdi-image"
              ></v-file-input>
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="12" xl="12">
              <v-textarea
                name="videoDescription"
                label="وصف الفيديو"
                :rules="rules"
                outlined
                color="text"
                prepend-inner-icon="text_fields"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-btn
            block
            color="success"
            class="primary--text"
            type="submit"
            :disabled="!createForm"
          >
            حفظ الفيديو
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="addQuizDialog"
      persistent
      max-width="750px"
      transition="slide-y-transition"
    >
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-toolbar color="primary" class="shadow-1 radius-1 mb-10">
          <h4 v-if="!isUpdateQuiz">اضافة سؤال</h4>
          <h4 v-else>تحديث السؤال</h4>

          <v-spacer />

          <v-btn icon color="accent" @click="closeQuizDialog">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-form
          ref="addQuizRef"
          v-model="addQuizForm"
          lazy-validation
          @submit.prevent="addQuiz"
        >
          <v-row>
            <v-col cols="12" sm="12" md="12" lg="12" xl="12">
              <v-text-field
                v-model="quizQuestion"
                label="السؤال"
                color="text"
                outlined
                :rules="rules"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-text-field
                v-model="quizAnswerCurrect"
                label="الجواب الصحيح"
                color="text"
                outlined
                :rules="rules"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-text-field
                v-model="quizAnswerWrong"
                label="جواب غير صحيح"
                color="text"
                outlined
                :rules="rules"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-text-field
                v-model="quizAnswerWrong2"
                label="جواب غير صحيح"
                color="text"
                outlined
                :rules="rules"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-btn
            block
            color="success"
            class="primary--text"
            type="submit"
            :disabled="!addQuizForm"
          >
            حفظ السؤال
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialog"
      persistent
      max-width="750px"
      transition="slide-y-transition"
    >
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-toolbar color="primary" class="shadow-1 radius-1 mb-10">
          <h4>التعليقات</h4>

          <v-spacer />

          <v-btn icon color="accent" @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-data-table
          class="secondary"
          :headers="commentsHeaders"
          :items="comments"
        >
          <template #[`item.actions`]="{ item }">
            <v-btn icon color="warning" @click="deleteComment(item)">
              <v-icon>delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-dialog>

    <v-card color="secondary" class="shadow-1 radius-1">
      <v-data-table
        :headers="headers"
        :items="videos"
        :search="search"
        class="shadow-1 radius-1 pa-5 secondary courses__table"
      >
        <template #top>
          <v-toolbar flat color="primary" class="shadow-1 radius-1">
            <div class="d-flex align-center justify-evenly" style="width: 100%">
              <v-toolbar-title style="flex: 1 1 auto">{{
                courseName
              }}</v-toolbar-title>
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
                    @click="createVideoDialog = true"
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
                    v-bind="attrs"
                    class="mr-2"
                    v-on="on"
                    @click="$router.push(`library`)"
                  >
                    <v-icon>library_books</v-icon>
                  </v-btn>
                </template>
                <span class="primary--text">المكتبة</span>
              </v-tooltip>

              <v-tooltip bottom transition="slide-y-transition" color="text">
                <template #activator="{ on, attrs }">
                  <v-btn
                    icon
                    color="text"
                    v-bind="attrs"
                    class="mr-2"
                    v-on="on"
                    @click="$router.push(`homework`)"
                  >
                    <v-icon>auto_stories</v-icon>
                  </v-btn>
                </template>
                <span class="primary--text">الواجبات</span>
              </v-tooltip>

              <v-tooltip bottom transition="slide-y-transition" color="text">
                <template #activator="{ on, attrs }">
                  <v-btn
                    icon
                    color="text"
                    class="mr-2"
                    v-bind="attrs"
                    v-on="on"
                    @click="closeCoursePage"
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
          <v-btn
            color="transparent"
            depressed
            :href="item.videoLink"
            target="_blank"
          >
            <v-icon class="ml-2" color="error">mdi-youtube</v-icon>
            <span>عرض الفيديو</span>
          </v-btn>
        </template>

        <template #[`item.actions`]="{ item }">
          <v-btn icon color="warning" @click="initUpdateVideo(item)">
            <v-icon>edit</v-icon>
          </v-btn>

          <v-btn icon color="error" @click="deleteVideo(item)">
            <v-icon>delete</v-icon>
          </v-btn>

          <v-btn icon color="info" @click="openQuizDialog(item)">
            <v-icon>quiz</v-icon>
          </v-btn>

          <v-btn icon color="success" @click="initVideoComments(item)">
            <v-icon>feedback</v-icon>
          </v-btn>

          <v-btn icon color="success" @click="openUploadDialog(item)">
            <v-icon>mdi-youtube</v-icon>
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
      uploadDialog: false,
      uploadForm: false,
      uploadVideoLink: '',
      courseVideoId: '',
      updateVideoDialog: false,
      createVideoDialog: false,
      updateForm: false,
      createForm: false,
      addQuizDialog: false,
      addQuizForm: false,
      quizQuestion: null,
      quizAnswerCurrect: null,
      quizAnswerWrong: null,
      quizAnswerWrong2: null,
      videoPhotoTmp: null,
      rules: [(v) => !!v || 'لا يمكن ترك الحقل فارغ'],
      headers: [
        {
          text: '#',
          sortable: false,
          align: 'start',
          value: 'idCourseVideo',
        },
        {
          text: 'عنوان الفيديو',
          sortable: false,
          align: 'start',
          value: 'videoTitle',
        },
        {
          text: 'رابط الفيديو',
          sortable: false,
          align: 'start',
          value: 'videoLink',
        },
        {
          text: 'رابط الفيديو الثاني',
          sortable: false,
          align: 'start',
          value: 'secondVideoLink',
        },
        {
          text: 'الوصف',
          sortable: false,
          align: 'start',
          value: 'videoDescription',
        },
        {
          text: 'الاجرائات',
          sortable: false,
          align: 'start',
          value: 'actions',
        },
      ],
      videos: [],
      updatedVideo: {},
      choices: [],
      videoId: null,
      isUpdateQuiz: false,
      idQuiz: null,
      idChoiceCorrect: null,
      idChoiceWrong: null,
      idChoiceWrong2: null,
      courseName: null,
      dialog: false,
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
    }
  },

  head() {
    return {
      title: 'الكورسات',
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
        this.courseName = course.data.courseTitle
        console.log(course.data)
      } catch (error) {
        console.error(error.response)
      }
    },

    async initVideoComments(item, id = null) {
      const videoId = id ?? item.idCourseVideo
      try {
        const comments = await this.$axios.get(`commentVideoId/${videoId}`)
        this.comments = comments.data
        this.dialog = true
      } catch (error) {
        console.log(error.response)
      }
    },

    async deleteComment(item) {
      if (confirm('هل تريد حذف التعليق ؟')) {
        console.log(item)
        try {
          const comments = await this.$axios.delete(
            `videoComment/${item.idVideoComment}`
          )
          this.$toast.success('تم حذف التعليق', {
            duration: 3000,
            position: 'top-center',
          })

          this.initVideoComments(item, item.videoId)
        } catch (error) {
          console.log(error.response)
        }
      }
    },

    initUpdateVideo(item) {
      this.updateVideoDialog = true
      this.updatedVideo = item
    },

    async updateVideo() {
      if (this.$refs.updateVideoRef.validate()) {
        const videoId = this.updatedVideo.idCourseVideo
        try {
          // eslint-disable-next-line no-unused-vars
          const update = await this.$axios.put(
            `courseVideo/${videoId}`,
            this.updatedVideo
          )
          this.updateVideoDialog = false
          this.getVideos()
        } catch (error) {
          console.log(error.response)
        }
      }
    },

    async deleteVideo(item) {
      if (confirm('هل تريد حذف الفيديو ؟')) {
        const videoId = item.idCourseVideo
        try {
          // eslint-disable-next-line no-unused-vars
          const deleteVideo = await this.$axios.delete(`courseVideo/${videoId}`)
          this.getVideos()
        } catch (error) {
          console.log(error.response)
        }
      }
    },

    async createVideo(event) {
      this.$nuxt.$loading.start()
      try {
        const data = Object.fromEntries(new FormData(event.target))
        const form = new FormData()
        form.append('attachment', this.videoPhotoTmp)
        const upload = await this.$axios.post('upload', form)

        const myObj = {
          ...data,
          courseId: this.$route.params.id * 1,
          createdBy: this.$auth.user.idUser * 1,
          unlockAt: new Date(data.unlockAt),
          secondVideoLink: 'link',
          videoPhoto: upload.data.imagePath,
        }

        if (this.$refs.createVideoRef.validate()) {
          // eslint-disable-next-line no-unused-vars
          const create = await this.$axios.post(`addCourseVideo`, myObj)
          this.getVideos()
          this.createVideoDialog = false

          this.$nuxt.$loading.finish()
        }
      } catch (error) {
        this.$nuxt.$loading.finish()

        console.log(error.response)
      }
    },

    openQuizDialog(item) {
      this.videoId = item.idCourseVideo
      this.addQuizDialog = true
      console.log(item)
      if (item.quiz !== undefined) {
        const quiz = item.quiz
        const choices = quiz.Choice
        this.quizAnswerCurrect = choices.filter(
          (choice) => choice.correctAnswer
        )[0].questionChoice
        this.quizAnswerWrong = choices.filter(
          (choice) => !choice.correctAnswer
        )[0].questionChoice
        this.quizAnswerWrong2 = choices.filter(
          (choice) => !choice.correctAnswer
        )[1].questionChoice

        this.idQuiz = quiz.idQuiz
        this.idChoiceCorrect = choices.filter(
          (choice) => choice.correctAnswer
        )[0].idChoice
        this.idChoiceWrong = choices.filter(
          (choice) => !choice.correctAnswer
        )[0].idChoice
        this.idChoiceWrong2 = choices.filter(
          (choice) => !choice.correctAnswer
        )[1].idChoice

        this.quizQuestion = quiz.quizQuestion
        this.isUpdateQuiz = true
      } else {
        this.isUpdateQuiz = false
        this.idQuiz = null
        this.idChoiceCorrect = null
        this.idChoiceWrong = null
        this.idChoiceWrong2 = null
        this.quizAnswerCurrect = null
        this.quizAnswerWrong = null
        this.quizAnswerWrong2 = null
        this.quizQuestion = null
      }
    },

    closeQuizDialog() {
      this.videoId = null
      this.addQuizDialog = false
      this.quizAnswerCurrect = null
      this.quizAnswerWrong = null
      this.quizAnswerWrong2 = null
      this.quizQuestion = null
      this.isUpdateQuiz = false
      this.$refs.addQuizRef.reset()
    },

    async addQuiz() {
      try {
        if (this.$refs.addQuizRef.validate()) {
          if (!this.isUpdateQuiz) {
            const quiz = await this.$axios.post('addQuiz', {
              quizQuestion: this.quizQuestion,
              videoId: this.videoId,
              createdBy: this.$auth.user.idUser * 1,
            })

            const currectAnswer = await this.$axios.post('addChoice', {
              questionChoice: this.quizAnswerCurrect,
              correctAnswer: true,
              quizId: quiz.data.idQuiz,
            })

            const wrongAnswer = await this.$axios.post('addChoice', {
              questionChoice: this.quizAnswerWrong,
              correctAnswer: false,
              quizId: quiz.data.idQuiz,
            })

            const wrongAnswer2 = await this.$axios.post('addChoice', {
              questionChoice: this.quizAnswerWrong2,
              correctAnswer: false,
              quizId: quiz.data.idQuiz,
            })

            this.addQuizDialog = false
            this.getVideos()
          } else {
            const quiz = await this.$axios.put(`quiz/${this.idQuiz}`, {
              quizQuestion: this.quizQuestion,
              videoId: this.videoId,
              createdBy: this.$auth.user.idUser * 1,
            })

            const currectAnswer = await this.$axios.put(
              `choice/${this.idChoiceCorrect}`,
              {
                questionChoice: this.quizAnswerCurrect,
                correctAnswer: true,
                quizId: quiz.data.idQuiz,
              }
            )

            const wrongAnswer = await this.$axios.put(
              `choice/${this.idChoiceWrong}`,
              {
                questionChoice: this.quizAnswerWrong,
                correctAnswer: false,
                quizId: quiz.data.idQuiz,
              }
            )

            const wrongAnswer2 = await this.$axios.put(
              `choice/${this.idChoiceWrong2}`,
              {
                questionChoice: this.quizAnswerWrong2,
                correctAnswer: false,
                quizId: quiz.data.idQuiz,
              }
            )

            this.addQuizDialog = false
            this.getVideos()
          }
        }
      } catch (error) {
        console.log(error.response)
      }
    },
    openUploadDialog(item) {
      this.courseVideoId = item.idCourseVideo
      this.uploadDialog = true
    },
    async uploadVideo() {
      this.$nuxt.$loading.start()
      try {
        if (this.$refs.uploadVideoRef.validate()) {
          const upload = await this.$axios.post('uploadFromUrl', {
            videoUrl: this.uploadVideoLink,
            courseVideoId: this.courseVideoId,
          })

          console.log(upload.data)
          this.uploadDialog = false
          this.getVideos()

          this.$nuxt.$loading.finish()
        }
      } catch (error) {
        console.log(error.response)
        this.$nuxt.$loading.finish()
      }
    },

    closeCoursePage() {
      window.close()
    },
  },
}
</script>

<style lang="scss">
input[type='datetime-local']::-webkit-calendar-picker-indicator {
  display: none;
}

.custom__list {
  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  }
}
</style>
