<template>
  <div id="distributors-page">
    <v-dialog
      v-model="createDistributorDialog"
      max-width="750px"
      transition="slide-y-transition"
    >
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-toolbar color="primary" class="shadow-1 radius-1 mb-10">
          <h4>انشاء موزع جديد</h4>
          <v-spacer />
          <v-btn color="error" icon @click="createDistributorDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-form
          ref="createDistributorRef"
          v-model="createDistributorModel"
          lazy-validation
          @submit.prevent="createDistributor"
        >
          <v-row>
            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-text-field
                v-model="username"
                prepend-inner-icon="person"
                color="text"
                outlined
                label="اسم المستخدم"
                :rules="rules"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-text-field
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                prepend-inner-icon="password"
                color="text"
                outlined
                label="كلمة المرور"
                :rules="rules"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-text-field
                v-model="phone"
                prepend-inner-icon="drag_indicator"
                color="text"
                outlined
                label="رقم الهاتف"
                :rules="rules"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-text-field
                v-model="libraryName"
                prepend-inner-icon="local_library"
                color="text"
                outlined
                label="اسم المكتبة"
                :rules="rules"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-text-field
                v-model="longitude"
                prepend-inner-icon="person_pin"
                color="text"
                outlined
                label="خط الطول (longitude)"
                :rules="rules"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-text-field
                v-model="latitude"
                prepend-inner-icon="person_pin"
                color="text"
                outlined
                label="خط العرض (latitude)"
                :rules="rules"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="6" lg="6" xl="6">
              <v-select
                v-model="provinceId"
                prepend-inner-icon="map"
                color="text"
                outlined
                label="المحافظة"
                :rules="rules"
                :items="provinces"
                item-color="text"
                item-value="idProvince"
                item-text="provinceName"
              ></v-select>
            </v-col>

            <v-col cols="12" md="6" lg="6" xl="6">
              <v-file-input
                prepend-icon="collections"
                color="text"
                outlined
                label="الصورة"
                :rules="rules"
                @change="saveImage"
              ></v-file-input>
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="distributorBio"
                prepend-inner-icon="format_size"
                color="text"
                outlined
                label="عن الموزع"
                :rules="rules"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-btn
            color="success"
            large
            block
            depressed
            :disabled="!createDistributorModel"
            type="submit"
          >
            حفظ المعلومات
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="updateDistributorDialog"
      max-width="750px"
      transition="slide-y-transition"
    >
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-toolbar color="primary" class="shadow-1 radius-1 mb-10">
          <h4>تحديث الموزعين</h4>
          <v-spacer />
          <v-btn color="error" icon @click="updateDistributorDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-form
          ref="updateDistributorRef"
          v-model="updateDistributorForm"
          lazy-validation
        >
          <v-row>
            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-text-field
                v-model="username"
                prepend-inner-icon="person"
                color="text"
                outlined
                label="اسم المستخدم"
                :rules="rules"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-text-field
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                prepend-inner-icon="password"
                color="text"
                outlined
                label="كلمة المرور"
                :rules="rules"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-text-field
                v-model="phone"
                prepend-inner-icon="drag_indicator"
                color="text"
                outlined
                label="رقم الهاتف"
                :rules="rules"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-text-field
                v-model="libraryName"
                prepend-inner-icon="local_library"
                color="text"
                outlined
                label="اسم المكتبة"
                :rules="rules"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-text-field
                v-model="longitude"
                prepend-inner-icon="person_pin"
                color="text"
                outlined
                label="خط الطول (longitude)"
                :rules="rules"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-text-field
                v-model="latitude"
                prepend-inner-icon="person_pin"
                color="text"
                outlined
                label="خط العرض (latitude)"
                :rules="rules"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="6" lg="6" xl="6">
              <v-select
                v-model="provinceId"
                prepend-inner-icon="map"
                color="text"
                outlined
                label="المحافظة"
                :rules="rules"
                :items="provinces"
                item-color="text"
                item-value="idProvince"
                item-text="provinceName"
              ></v-select>
            </v-col>

            <v-col cols="12" md="6" lg="6" xl="6">
              <v-file-input
                prepend-icon="collections"
                color="text"
                outlined
                label="الصورة"
                :rules="rules"
                @change="saveImage"
              ></v-file-input>
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="distributorBio"
                prepend-inner-icon="format_size"
                color="text"
                outlined
                label="عن الموزع"
                :rules="rules"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-btn
            color="success"
            large
            block
            depressed
            :disabled="!createDistributorModel"
            type="submit"
          >
            حفظ المعلومات
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>

    <v-data-table
      :headers="headers"
      :items.sync="distributors"
      :items-per-page="15"
      item-key="courseId"
      class="shadow-1 radius-1 pa-5 secondary"
      :search="search"
    >
      <template #top>
        <v-toolbar flat color="primary" class="shadow-1 radius-1">
          <div class="d-flex align-center justify-evenly" style="width: 100%">
            <v-toolbar-title style="flex: 1 1 auto">الموزعين</v-toolbar-title>
            <v-text-field
              v-model="search"
              color="text"
              placeholder="ابحث في الموزعين..."
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
                  @click="createDistributorDialog = true"
                >
                  <v-icon>add</v-icon>
                </v-btn>
              </template>
              <span class="primary--text">اضافة موزع جديد</span>
            </v-tooltip>
          </div>
        </v-toolbar>
      </template>

      <template #[`item.location`]="{ item }">
        <v-btn
          color="error"
          icon
          :href="`https://maps.google.com/?q=${item.lat},${item.lang}`"
          target="_blank"
        >
          <v-icon>location_on</v-icon>
        </v-btn>
      </template>

      <template #[`item.distributorPhoto`]="{ item }">
        <v-img
          :src="$axios.defaults.baseURL + item.distributorPhoto"
          max-width="50px"
          height="50px"
        ></v-img>
      </template>

      <template #[`item.actions`]="{ item }">
        <v-btn color="warning" icon @click="openUpdateDialog(item)">
          <v-icon>edit</v-icon>
        </v-btn>

        <v-btn color="error" icon @click="deleteDistributor(item)">
          <v-icon>delete</v-icon>
        </v-btn>
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
        value: 'idDistributor',
        sortable: false,
      },
      { text: 'الصورة', value: 'distributorPhoto', sortable: false },
      { text: 'اسم المستخدم', value: 'userName', sortable: false },
      { text: 'عن الموزع', value: 'distributorBio', sortable: false },
      { text: 'اسم المكتبة', value: 'libraryName', sortable: false },
      { text: 'الهاتف', value: 'phone', sortable: false },
      { text: 'المحافظة', value: 'province.provinceName', sortable: false },
      { text: 'الخريطة', value: 'location', sortable: false },
      { text: 'الاجرائات', value: 'actions', sortable: false },
    ],

    createDistributorDialog: false,
    createDistributorModel: false,
    updateDistributorDialog: false,
    updateDistributorForm: false,
    distributors: [],
    provinces: [],
    roles: [],
    provinceId: null,
    roleId: null,
    username: null,
    password: null,
    phone: null,
    distributorPhoto: null,
    uploadedImage: null,
    distributorBio: null,
    libraryName: null,
    showPassword: false,
    latitude: null,
    longitude: null,
    rules: [(v) => !!v || 'لا يمكن ترك الحقل فارغ'],
  }),

  mounted() {
    this.getDistributors()
    this.$axios.get('provinces').then((result) => {
      this.provinces = result.data
    })
  },

  methods: {
    saveImage(event) {
      this.uploadedImage = event !== null ? event : null
    },

    async createDistributor() {
      const uploadedImage = new FormData()
      uploadedImage.append('attachment', this.uploadedImage)

      try {
        const upload = await this.$axios.post('upload', uploadedImage)

        this.distributorPhoto = upload.data.imagePath

        const createUsers = await this.$axios.post('addUser', {
          userName: this.username,
          password: this.password,
          phone: this.phone,
          roleId: 4,
          provinceId: this.provinceId * 1,
        })

        const createDistributors = await this.$axios.post(
          'addDistributorInfo',
          {
            lang: this.longitude,
            lat: this.latitude,
            libraryName: this.libraryName,
            distributorPhoto: this.distributorPhoto,
            distributorBio: this.distributorBio,
            userId: createUsers.data.idUser,
          }
        )

        this.getDistributors()
        this.createDistributorDialog = false
      } catch (error) {
        console.log(error)
      }
    },

    async getDistributors() {
      this.$nuxt.$loading.start()
      try {
        const distributors = await this.$axios.get(`distributorInfos`)
        const users = []
        for (let i = 0; i < distributors.data.length; i++) {
          const user = await this.$axios.get(
            `user/${distributors.data[i].userId}`
          )
          users.push({
            ...user.data,
            ...distributors.data[i],
          })
        }

        this.distributors = users
        this.$nuxt.$loading.finish()
      } catch (e) {
        console.error(e.response)
        this.$nuxt.$loading.finish()
      }
    },

    async deleteDistributor(item) {
      if (confirm('هل تريد حذف الموزع ؟')) {
        try {
          const deleteDist = await this.$axios.delete(
            `distributorInfo/${item.idDistributor}`
          )
          this.getDistributors()
        } catch (error) {
          console.log(error.response)
        }
      }
    },

    openUpdateDialog(item) {
      console.log(item);
    }
  },
}
</script>

<style lang="scss" scoped>
</style>