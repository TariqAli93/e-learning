<template>
  <div class="NotificationsGroups">
    <v-card color="secondary" class="pa-10" elevation="0">
      <v-form
        ref="notificationsRef"
        v-model="notificationsForm"
        lazy-validation
        @submit.prevent="sendNotification"
      >
        <v-row>
          <v-col cols="12" sm="12" md="4" lg="4" xl="4">
            <v-select
              v-model="notificationsTeacher"
              :items="teachers"
              item-color="text"
              color="text"
              label="الاستاذ"
              item-value="idUser"
              item-text="userName"
              outlined
              return-object
              @change="GetCourses"
              :rules="[(v) => !!v || 'لا يمكن ترك الحقل فارغ']"
            ></v-select>
          </v-col>

          <v-col cols="12" sm="12" md="4" lg="4" xl="4">
            <v-select
              v-model="notificationsCourse"
              :items="courses"
              item-color="text"
              color="text"
              label="الكورس"
              item-value="idCourse"
              item-text="courseTitle"
              outlined
              return-object
              @change="GetGroups"
              :disabled="!isTeacherSelected"
              :rules="[(v) => !!v || 'لا يمكن ترك الحقل فارغ']"
            ></v-select>
          </v-col>

          <v-col cols="12" sm="12" md="4" lg="4" xl="4">
            <v-select
              v-model="notificationsGroup"
              :items="groups"
              item-color="text"
              color="text"
              label="المجموعة"
              item-value="idGroup"
              item-text="groupName"
              :disabled="!isCourseSelected"
              outlined
              :rules="[(v) => !!v || 'لا يمكن ترك الحقل فارغ']"
            ></v-select>
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="notificationsTitle"
              label="العنوان"
              color="text"
              outlined
              :rules="[(v) => !!v || 'لا يمكن ترك الحقل فارغ']"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-textarea
              v-model="notificationsText"
              label="نص الاشعار"
              color="text"
              outlined
              :rules="[(v) => !!v || 'لا يمكن ترك الحقل فارغ']"
            ></v-textarea>
          </v-col>
        </v-row>

        <v-btn
          color="success"
          large
          block
          depressed
          type="submit"
          :disabled="!notificationsForm"
          >ارسال الاشعار</v-btn
        >
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'NotificationsGroups',
  data() {
    return {
      notificationsForm: false,
      notificationsTitle: null,
      notificationsText: null,
      notificationsCourse: null,
      notificationsTeacher: null,
      notificationsGroup: null,
      isTeacherSelected: false,
      isCourseSelected: false,
      groups: [],
      courses: [],
      teachers: [],
    }
  },

  mounted() {
    this.GetTeachers()
  },

  methods: {
    async GetTeachers() {
      const response = await this.$axios.get('userRoles/3')
      this.teachers = response.data
      console.log(response.data)
    },

    async GetCourses(item) {
      this.isTeacherSelected = true
      try {
        const courses = await this.$axios.get(`courseMoney/${item.idUser}`)
        this.courses = courses.data
        console.log(courses.data)
      } catch (error) {
        console.error(error)
      }
    },

    async GetGroups(item) {
      this.isCourseSelected = true
      try {
        const groups = await this.$axios.get(`courseGroups/${item.idCourse}`)
        this.groups = groups.data
        console.log(groups.data)
      } catch (error) {
        console.log(error)
      }
    },

    async sendNotification() {
      this.$nuxt.$loading.start()
      try {
        const send = await this.$axios.post('sendNotificationGroup', {
          title: this.notificationsTitle,
          content: this.notificationsText,
          id: this.notificationsGroup,
        })

        this.$toast.success('تم ارسال الاشعار', {
          position: 'top-center',
          duration: 3000,
        })

        console.log(send)
        this.$nuxt.$loading.finish()
      } catch (error) {
        this.$nuxt.$loading.finish()

        console.error(error)
      }
    },
  },
}
</script>

<style>
</style>
