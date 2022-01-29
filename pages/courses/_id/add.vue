<template>
  <div class="addNewVideoPage">
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

    <v-card class="shadow-1 radius-1 pa-5 secondary">
      <v-toolbar flat color="primary" class="shadow-1 radius-1 mb-5">
        <h4>اضافة فيديو جديد</h4>
        <v-spacer></v-spacer>
        <v-tooltip bottom transition="slide-y-transition" color="text">
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              color="text"
              v-bind="attrs"
              v-on="on"
              @click="$router.push('/courses/' + $route.params.id)"
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </template>

          <span class="primary--text">الرجوع الى صفحة الكورس</span>
        </v-tooltip>
      </v-toolbar>

      <v-form ref="AddNewVideoToCourse" v-model="newVideoForm" lazy-validation>
        <v-row>
          <v-col cols="12" sm="12" md="6" lg="6" xl="6">
            <v-text-field
              v-model="videoTitleField"
              label="عنوان الفيديو"
              :rules="rules"
              outlined
              color="text"
              prepend-inner-icon="title"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="12" md="6" lg="6" xl="6">
            <v-text-field
              v-model="videoUrlField"
              label="رابط الفيديو"
              :rules="rules"
              outlined
              color="text"
              prepend-inner-icon="mdi-youtube"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="12" md="12" lg="12" xl="12">
            <v-textarea
              v-model="videoDescriptionField"
              label="رابط الفيديو"
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
          :disabled="!newVideoForm"
        >
          حفظ الفيديو
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newVideoForm: false,

      videoTitleField: '',
      videoUrlField: '',
      videoDescriptionField: '',
      videoAttachemntsField: [],

      rules: [(v) => !!v || 'لا يمكن ترك الحقل فارغ'],

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
          disabled: false,
          href: `/courses/${this.$route.params.id}`,
          color: 'text--text',
          bgColor: 'transparent',
        },
        {
          text: 'اضافة فيديو',
          disabled: true,
          href: '',
          color: 'text--text',
          bgColor: 'transparent',
        },
      ],
    }
  },

  head() {
    return {
      title: 'الكورسات'
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
