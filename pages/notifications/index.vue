<template>
  <div class="notifications-page">
    <v-card color="secondary" class="shadow-1 radius-1 pa-10">
      <v-tabs
        color="transparent"
        background-color="secondary"
        grow
        centered
        center-active
      >
        <v-tab> اشعارات عامة </v-tab>

        <v-tab> اشعارات الكورسات </v-tab>

        <v-tab> اشعارات المجموعات </v-tab>

        <v-tab-item>
          <v-card color="secondary" class="pa-10" elevation="0">
            <v-form
              ref="notificationsRef"
              v-model="notificationsForm"
              lazy-validation
              @submit.prevent="sendNotification"
            >
              <v-row>
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

              <v-btn color="success" large block depressed type="submit"
                >ارسال الاشعار</v-btn
              >
            </v-form>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <NotificationsCourses></NotificationsCourses>
        </v-tab-item>

        <v-tab-item>
          <NotificationsGroups></NotificationsGroups>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notificationsForm: false,
      notificationsTitle: null,
      notificationsText: null,
    }
  },

  head() {
    return {
      title: 'الاشعارات',
    }
  },

  methods: {
    async sendNotification() {
      if (this.$refs.notificationsRef.validate()) {
        try {
          const notification = await this.$axios.post('sendNotification', {
            title: this.notificationsTitle,
            content: this.notificationsText,
          })
          console.log(notification)
          this.$toast.success('تم ارسال الاشعار', {
            duration: 3000,
            position: 'top-center',
          })
        } catch (error) {
          console.log(error)
        }
      }
    },
  },
}
</script>

<style>
</style>
