<template>
  <div class="avatars-page">
    <v-card color="secondary" class="shadow-1 radius-1 pa-10">
      <v-toolbar color="primary" class="shadow-1 radius-1 mb-10">
        <h4>الافتارات</h4>
        <v-spacer />
        <v-file-input
          ref="uploader"
          type="file"
          style="display: none"
          accept="image/*"
          @change="saveImage"
        ></v-file-input>

        <v-btn icon color="white" @click="openUploader">
          <v-icon>upload</v-icon>
        </v-btn>
      </v-toolbar>

      <v-row>
        <v-col
          v-for="item in avatars"
          :key="item.idAvatar"
          cols="12"
          sm="12"
          md="4"
          lg="4"
          xl="4"
        >
          <v-card
            color="secondary"
            class="shadow-1 radius-1"
            @mouseenter="isHoverd = true"
            @mouseleave="isHoverd = false"
          >
            <v-img
              :src="$axios.defaults.baseURL + item.imagePath"
              min-height="400px"
              max-height="400px"
            ></v-img>

            <v-card-actions>
              <v-btn color="error" @click="deleteAvataar(item)">
                <span>حذف</span>
                <v-icon>delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatars: [],
      tempFile: null,
      file: '',
      isHoverd: false,
    }
  },

  mounted() {
    this.getAvaatars()
  },

  head() {
    return {
      title: 'الافتارات',
    }
  },

  methods: {
    async saveImage(event) {
      this.tempFile = event
      this.$nuxt.$loading.start()
      try {
        const form = new FormData()
        form.append('attachment', this.tempFile)
        const upload = await this.$axios.post('upload', form)
        console.log(upload)
        const addAvatar = await this.$axios.post('addAvatar', {
          imagePath: upload.data.imagePath,
        })
        this.$nuxt.$loading.finish()
        this.getAvaatars()
      } catch (error) {
        this.$nuxt.$loading.finish()
        console.log(error.response)
      }
    },

    async getAvaatars() {
      this.$nuxt.$loading.start()
      try {
        const avatars = await this.$axios.get('avatars')
        this.avatars = avatars.data
        this.$nuxt.$loading.finish()
      } catch (error) {
        console.log(error)
        this.$nuxt.$loading.finish()
      }
    },

    openUploader() {
      this.$refs.uploader.$refs.input.click()
    },

    async deleteAvataar(item) {
      if (confirm('هل تريد حذف الافتار ؟')) {
        try {
          const remove = await this.$axios.delete(`avatar/${item.idAvatar}`)
          this.$toast.success('تم حذف الملف', {
            duration: 3000,
            position: 'top-center',
          })
          this.getAvaatars()
        } catch (error) {
          console.log(error.response)
        }
      }
    },
  },
}
</script>

<style>
</style>
