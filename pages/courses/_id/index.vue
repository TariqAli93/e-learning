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

            <v-col cols="12">
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
    }
  },

  mounted() {
    this.getVideos()
  },

  methods: {
    async getVideos() {
      this.$nuxt.$loading.start()
      try {
        const courseId = await this.$route.params.id
        const course = await this.$axios.get(`course/${courseId}`)
        this.videos = course.data.CourseVideo
        this.$nuxt.$loading.finish()
      } catch (error) {
        console.error(error.response)
        this.$nuxt.$loading.finish()
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
      try {
        const data = Object.fromEntries(new FormData(event.target))
        const myObj = {
          ...data,
          courseId: this.$route.params.id * 1,
          createdBy: this.$auth.user.idUser * 1,
          unlockAt: new Date(data.unlockAt),
        }

        if (this.$refs.createVideoRef.validate()) {
          // eslint-disable-next-line no-unused-vars
          const create = await this.$axios.post(`addCourseVideo`, myObj)
          this.getVideos()
          this.createVideoDialog = false
        }
      } catch (error) {
        console.log(error.response)
      }
    },

    openQuizDialog(item) {
      this.videoId = item.idCourseVideo
      this.addQuizDialog = true
      console.log(item);
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
        this.idChoiceCorrect = choices.filter((choice) => choice.correctAnswer)[0].idChoice
        this.idChoiceWrong = choices.filter((choice) => !choice.correctAnswer)[0].idChoice
        this.idChoiceWrong2 = choices.filter((choice) => !choice.correctAnswer)[1].idChoice

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

            const currectAnswer = await this.$axios.put(`choice/${this.idChoiceCorrect}`, {
              questionChoice: this.quizAnswerCurrect,
              correctAnswer: true,
              quizId: quiz.data.idQuiz,
            })

            const wrongAnswer = await this.$axios.put(`choice/${this.idChoiceWrong}`, {
              questionChoice: this.quizAnswerWrong,
              correctAnswer: false,
              quizId: quiz.data.idQuiz,
            })

            const wrongAnswer2 = await this.$axios.put(`choice/${this.idChoiceWrong2}`, {
              questionChoice: this.quizAnswerWrong2,
              correctAnswer: false,
              quizId: quiz.data.idQuiz,
            })

            this.addQuizDialog = false
            this.getVideos()
          }
        }
      } catch (error) {
        console.log(error.response)
      }
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