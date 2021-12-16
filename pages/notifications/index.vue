<template>
  <div class="notifications-page">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="750px"
      transition="slide-y-transition"
    >
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-toolbar flat color="primary" class="shadow-1 radius-1 mb-10">
          <h4>اضافة اشعار جديد</h4>
          <v-spacer />
          <v-btn color="text" icon @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-form
          v-model="notificationsForm"
          ref="notificationsRef"
          lazy-validation
        >
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="notificationsTitle"
                label="العنوان"
                color="text"
                outlined
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="notificationsText"
                label="نص الاشعار"
                color="text"
                outlined
              ></v-textarea>
            </v-col>
          </v-row>

          <v-btn color="success" large block depressed>ارسال الاشعار</v-btn>
        </v-form>
      </v-card>
    </v-dialog>

    <v-data-table
      :headers="headers"
      :items="notifications"
      :items-per-page="15"
      class="shadow-1 radius-1 pa-5 secondary"
    >
      <template #top>
        <v-toolbar flat color="primary" class="shadow-1 radius-1">
          <div class="d-flex align-center justify-evenly" style="width: 100%">
            <v-toolbar-title style="flex: 1 1 auto">الاشعارات</v-toolbar-title>
            <v-text-field
              color="text"
              placeholder="ابحث في الاشعارات..."
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
                  @click="dialog = true"
                >
                  <v-icon>notifications</v-icon>
                </v-btn>
              </template>
              <span class="primary--text">اضافة اشعار جديد</span>
            </v-tooltip>
          </div>
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      notificationsForm: false,
      notificationsTitle: null,
      notificationsText: null,
      headers: [
        {
          text: '#',
          value: '',
          sortable: false,
          align: 'start',
        },

        {
          text: 'العنوان',
          value: '',
          sortable: false,
          align: 'start',
        },

        {
          text: 'نص الاشعار',
          value: '',
          sortable: false,
          align: 'start',
        },

        {
          text: 'بواسطة',
          value: '',
          sortable: false,
          align: 'start',
        },
      ],
    }
  },
}
</script>

<style>
</style>
