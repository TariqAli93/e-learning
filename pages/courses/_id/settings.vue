<template>
  <div class="AddNewCoursePage">
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
        <h4>تعديل الكورس</h4>
        <v-spacer></v-spacer>
        <v-tooltip bottom transition="slide-y-transition" color="text">
          <template #activator="{ on, attrs }">
            <v-btn icon color="text" v-bind="attrs" v-on="on" @click="$router.push(`/courses/${$route.params.id}`)">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </template>

          <span class="primary--text">الرجوع الى صفحة الكورس</span>
        </v-tooltip>
      </v-toolbar>

      <div>
        <v-form ref="newCourseForm" v-model="newCourseForm" lazy-validation>
          <v-row>
            <v-col cols="12" sm="12" md="12" lg="3" xl="3">
              <v-text-field
                v-model="courseNameField"
                label="اسم الكورس"
                :rules="rules"
                outlined
                dense
                color="text"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="3" xl="3">
              <v-select
                v-model="courseCategoryField"
                label="تصنيف الكورس"
                :rules="rules"
                outlined
                dense
                color="text"
                :items="[{ text: 'رياضيات', value: 'Math' }]"
                item-color="text"
                menu-props="{auto: true}"
              ></v-select>
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="3" xl="3">
              <v-select
                v-model="courseTeacherField"
                label="المدرس"
                :rules="rules"
                outlined
                dense
                color="text"
                :items="[{ text: 'خضير بتيتة', value: 1 }]"
                item-color="text"
              ></v-select>
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="3" xl="3">
              <v-text-field
                v-model="coursePriceField"
                label="سعر الكورس"
                :rules="rules"
                outlined
                dense
                type="number"
                color="text"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="12" xl="12">
              <v-file-input
                v-model="courseImageField"
                label="صورة الكورس"
                :rules="rules"
                outlined
                dense
                type="file"
                color="text"
                @change="previewImage($event)"
              ></v-file-input>
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="12" xl="12">
              <wysiwyg
                v-model="courseDescriptionField"
                placeholder="وصف الكورس"
                :rules="rules"
                class="
                  shadow-1
                  radius-1
                  primary
                  text
                  primary--text
                  custom__wysiwyg
                  mb-10
                "
              />
            </v-col>
          </v-row>

          <v-btn
            block
            color="success"
            class="primary--text"
            :disabled="!newCourseForm"
            @click.prevent="addNewCourse"
          >
            حفظ الكورس
          </v-btn>
        </v-form>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newCourseForm: false,
      courseNameField: '',
      courseCategoryField: '',
      courseTeacherField: '',
      coursePriceField: '',
      courseDescriptionField: '',
      courseImageField: [],

      previewImageUrl: '',

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
          text: 'تعديل الكورس',
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

  methods: {
    previewImage(event) {
      const output = event

      if (output === undefined || output === '' || output === null) {
        return
      }
      const url = URL.createObjectURL(output)
      this.previewImageUrl = url
    },

    addNewCourse() {
      const formFields = {
        courseName: this.courseNameField,
        courseTeacher: this.courseTeacherField,
        courseCategory: this.courseCategoryField,
        coursePrice: this.coursePriceField,
        courseDescription: this.courseDescriptionField,
      }

      if (this.$refs.newCourseForm.validate()) {
        console.log(formFields)
      }
    },
  },
}
</script>

<style lang="scss">
</style>
