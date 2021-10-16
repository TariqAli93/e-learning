<template>
  <div id="LibraryPage">
    <v-data-table
      :headers="headers"
      :items.sync="attachments"
      :items-per-page="15"
      item-key="courseId"
      class="shadow-1 radius-1 pa-5 secondary"
      :search="search"
    >
      <template #top>
        <v-toolbar flat color="primary" class="shadow-1 radius-1">
          <div class="d-flex align-center justify-evenly" style="width: 100%">
            <v-toolbar-title style="flex: 1 1 auto">المكتبة</v-toolbar-title>
            <v-text-field
              v-model="search"
              color="text"
              placeholder="ابحث في المكتبة..."
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
                  v-bind="attrs"
                  class="mr-10"
                  v-on="on"
                  @click="$router.push('/courses/add')"
                >
                  <v-icon>mdi-upload</v-icon>
                </v-btn>
              </template>
              <span class="primary--text">رفع ملف</span>
            </v-tooltip>
          </div>
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    search: '',
    headers: [
      {
        text: 'المعرف',
        align: 'start',
        value: 'attachemntId',
        sortable: false,
      },
      { text: 'اسم الملف', value: 'attachmentName', sortable: false },
      { text: 'المادة', value: 'attachmentSubject', sortable: false },
      { text: 'التاريخ', value: 'createdAt', sortable: false },
      { text: 'الاجرائات', value: 'actions', sortable: false },
    ],

    attachments: [],
  }),
}
</script>

<style lang="scss" scoped>
</style>