<template>
  <div v-if="show">
    <v-card class="shadow-1 radius-1 pa-5 secondary">
      <v-toolbar flat color="primary" class="shadow-1 radius-1 mb-10">
        <v-toolbar-title style="flex: 1 1 auto">الاعدادات</v-toolbar-title>
      </v-toolbar>

      <v-form
        ref="settingsForm"
        v-model="settingsForm"
        @submit.prevent="saveData"
      >
        <v-row>
          <v-col cols="12" sm="12" md="6" lg="6" xl="6">
            <v-text-field
              v-model="setting.appName"
              background-color="secondary"
              color="text"
              outlined
              label="اسم المنصة"
              :rules="rules"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="12" md="6" lg="6" xl="6">
            <v-text-field
              v-model="setting.version"
              background-color="secondary"
              color="text"
              outlined
              label="رقم الاصدار"
              :rules="rules"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="12" md="6" lg="6" xl="6">
            <v-file-input
              v-model="setting.logo"
              background-color="secondary"
              color="text"
              outlined
              label="شعار المنصة"
              :rules="rules"
            ></v-file-input>
          </v-col>

          <v-col cols="12" sm="12" md="6" lg="6" xl="6">
            <v-switch
              v-model="setting.inReview"
              label="قيد المعاينة"
              color="info"
              inset
              hide-details
            ></v-switch>
          </v-col>
        </v-row>

        <v-btn
          block
          color="success"
          class="primary--text"
          type="submit"
          :disabled="!settingsForm"
        >
          حفظ المعلومات
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    setting: null,
    show: false,
    settingsForm: false,
    rules: [(v) => !!v || 'لا يمكن ترك الحقل فارغ'],
  }),
  mounted() {
    this.initialData()
  },
  methods: {
    async initialData() {
      try {
        const settings = await this.$axios.get('settings')
        console.log(settings.data[0])
        this.setting = settings.data[0]
        this.show = true
      } catch (error) {
        console.error(error)
      }
    },

    async saveData() {
      try {
        const save = await this.$axios.put(
          `setting/${this.setting.idSetting}`,
          this.setting
        )
        this.$toast.success('تم حفظ البيانات', {
          duration: 3000,
          position: 'top-center',
        })

        console.log(save.data)
      } catch (error) {
        console.error(error)
        this.$toast.error('لم يتم حفظ البيانات', {
          duration: 3000,
          position: 'top-center',
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>
