<template>
  <div id="LibraryPage">
    <v-dialog
      v-model="uploadFileDialog"
      max-width="750px"
      transition="slide-y-transition"
    >
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-toolbar color="primary" class="shadow-1 radius-1 mb-10">
          <h4>رفع ملف</h4>
          <v-spacer />
          <v-btn color="error" icon @click="uploadFileDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-form ref="uploadFileRef" v-model="uploadFileForm" lazy-validation @submit.prevent="uploadFile">
          <v-row>
            <v-col cols="12" sm="12" md="6" lg="6" xl="6">
              <v-text-field
                v-model="title"
                label="العنوان"
                outlined
                :rules="rules"
                color="text"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="6" lg="6" xl="6">
              <v-text-field
                v-model="subTitle"
                label="العنوان الثانوي"
                outlined
                :rules="rules"
                color="text"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-file-input
                v-model="document"
                label="الملفات"
                outlined
                :rules="rules"
                color="text"
                @change="saveImage"
              ></v-file-input>
            </v-col>
          </v-row>

          <v-btn
            block
            color="success"
            class="primary--text"
            :disabled="!uploadFileForm"
            type="submit"
          >
            رفع الملف
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>
    <v-data-table
      :headers="headers"
      :items.sync="files"
      :items-per-page="15"
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
                  @click="uploadFileDialog = true"
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
    uploadFileDialog: false,
    uploadFileForm: false,
    title: '',
    subTitle: '',
    document: '',
    tempImage: null,
    headers: [
      {
        text: 'المعرف',
        align: 'start',
        value: 'idLibrary',
        sortable: false,
      },
      { text: 'العنوان', value: 'title', sortable: false },
      { text: 'العنوان الثانوي', value: 'subTitle', sortable: false },
      { text: 'الملف', value: 'documentPath', sortable: false },
      { text: 'بواسطة', value: 'user.userName', sortable: false },
      { text: 'الاجرائات', value: 'actions', sortable: false },
    ],

    files: [],
    rules: [(v) => !!v || 'لا يمكن ترك الحقل فارغ'],
  }),

  mounted() {
    this.getFiles()
  },

  methods: {
    getFiles() {
      this.$axios
        .get('globalLibraries')
        .then((file) => {
          this.files = file.data
          console.log(file.data)
        })
        .catch((err) => {
          console.log(err.response)
        })
    },

    saveImage(event) {
      this.tempImage = event
    },

    async uploadFile() {
      if (this.$refs.uploadFileRef.validate()) {
        try {
          const form = new FormData()
          form.append('attachment', this.tempImage)
          const upload = await this.$axios.post('upload', form)
          const addFile = await this.$axios.post('addGlobalLibrary', {
            title: this.title,
            subTitle: this.subTitle,
            documentPath: upload.data.imagePath,
            downloaded: 0,
            createdBy: this.$auth.user.idUser * 1
          })

          this.getFiles()
          this.uploadFileDialog = false
        } catch (error) {
          console.log(error.response)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>