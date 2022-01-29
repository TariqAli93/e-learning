<template>
  <div id="LibraryPage">
    <v-dialog
      v-model="createUserDialog"
      persistent
      max-width="750px"
      transition="slide-y-transition"
    >
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-toolbar color="primary" class="shadow-1 radius-1 mb-10">
          <h4>اضافة مستخدم جديد</h4>

          <v-spacer />

          <v-btn icon color="error" @click="createUserDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-form
          ref="createUserRef"
          v-model="createUserForm"
          lazy-validation
          @submit.prevent="createUsers"
        >
          <v-row>
            <v-col cols="12" sm="12" md="6" lg="6" xl="6">
              <v-text-field
                v-model="username"
                label="اسم المستخدم"
                outlined
                color="white"
                :rules="[(v) => !!v || 'لا يمكن ترك الحقل فارغ']"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="6" lg="6" xl="6">
              <v-text-field
                v-model="password"
                type="password"
                label="كلمة المرور"
                outlined
                :rules="[(v) => !!v || 'لا يمكن ترك الحقل فارغ']"
                color="white"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-text-field
                v-model="phone"
                label="رقم الهاتف"
                outlined
                color="white"
                :rules="[(v) => !!v || 'لا يمكن ترك الحقل فارغ']"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-select
                v-model="provinceId"
                label="المحافظة"
                outlined
                color="white"
                :items="provinces"
                item-value="idProvince"
                item-text="provinceName"
                item-color="white"
                :rules="[(v) => !!v || 'لا يمكن ترك الحقل فارغ']"
              ></v-select>
            </v-col>

            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-select
                v-model="roleId"
                label="نوع الحساب"
                outlined
                color="white"
                :items="roles"
                item-value="idRole"
                item-text="roleName"
                item-color="white"
                :rules="[(v) => !!v || 'لا يمكن ترك الحقل فارغ']"
              ></v-select>
            </v-col>
          </v-row>

          <v-btn
            block
            large
            color="success"
            depressed
            type="submit"
            :disabled="!createUserForm"
          >
            حفط المعلومات
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="updateUserDialog"
      persistent
      max-width="750px"
      transition="slide-y-transition"
    >
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-toolbar color="primary" class="shadow-1 radius-1 mb-10">
          <h4>تحديث المستخدم</h4>

          <v-spacer />

          <v-btn icon color="error" @click="closeUpdateDialog">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-form
          ref="updateUserRef"
          v-model="updateUserForm"
          lazy-validation
          @submit.prevent="updateUsers"
        >
          <v-row>
            <v-col cols="12" sm="12" md="6" lg="6" xl="6">
              <v-text-field
                v-model="username"
                label="اسم المستخدم"
                outlined
                color="white"
                :rules="[(v) => !!v || 'لا يمكن ترك الحقل فارغ']"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="6" lg="6" xl="6">
              <v-text-field
                v-model="password"
                type="password"
                label="كلمة المرور"
                outlined
                :rules="[(v) => !!v || 'لا يمكن ترك الحقل فارغ']"
                color="white"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-text-field
                v-model="phone"
                label="رقم الهاتف"
                outlined
                color="white"
                :rules="[(v) => !!v || 'لا يمكن ترك الحقل فارغ']"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-select
                v-model="provinceId"
                label="المحافظة"
                outlined
                color="white"
                :items="provinces"
                item-value="idProvince"
                item-text="provinceName"
                item-color="white"
                :rules="[(v) => !!v || 'لا يمكن ترك الحقل فارغ']"
              ></v-select>
            </v-col>

            <v-col cols="12" sm="12" md="4" lg="4" xl="4">
              <v-select
                v-model="roleId"
                label="نوع الحساب"
                outlined
                color="white"
                :items="roles"
                item-value="idRole"
                item-text="roleName"
                item-color="white"
                :rules="[(v) => !!v || 'لا يمكن ترك الحقل فارغ']"
              ></v-select>
            </v-col>
          </v-row>

          <v-btn
            block
            large
            color="success"
            depressed
            type="submit"
            :disabled="!updateUserForm"
          >
            حفط المعلومات
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>

    <v-data-table
      :headers="headers"
      :items="users"
      :items-per-page="15"
      class="shadow-1 radius-1 pa-5 secondary"
      :search="search"
    >
      <template #top>
        <v-toolbar flat color="primary" class="shadow-1 radius-1">
          <div class="d-flex align-center justify-evenly" style="width: 100%">
            <v-toolbar-title style="flex: 1 1 auto">المستخدمين</v-toolbar-title>
            <v-text-field
              v-model="search"
              color="text"
              placeholder="ابحث في المستخدمين..."
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
                  @click="createUserDialog = true"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <span class="primary--text">انشاء حساب جديد</span>
            </v-tooltip>
          </div>
        </v-toolbar>
      </template>

      <template #[`item.actions`]="{ item }">
        <v-btn color="warning" icon @click="openUpdateDialog(item)">
          <v-icon>edit</v-icon>
        </v-btn>

        <v-btn color="error" icon @click="deleteUser(item)">
          <v-icon>delete</v-icon>
        </v-btn>
      </template>

      <template #[`item.role.roleName`]="{ item }">
        <v-chip color="primary" label class="text--text">
          {{ item.role.roleName.toLowerCase() }}
        </v-chip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    search: '',
    createUserForm: false,
    updateUserForm: false,
    createUserDialog: false,
    updateUserDialog: false,
    username: null,
    password: null,
    phone: null,
    provinceId: null,
    roleId: null,
    headers: [
      { text: '#', value: 'idUser', sortable: false },
      { text: 'اسم المستخدم', value: 'userName', sortable: false },
      { text: 'رقم الهاتف', value: 'phone', sortable: false },
      { text: 'المحافظة', value: 'province.provinceName', sortable: false },
      { text: 'نوع الحساب', value: 'role.roleName', sortable: false },
      { text: 'الاجرائات', value: 'actions', sortable: false },
    ],

    users: [],
    provinces: [],
    roles: [],
    idUser: null,
  }),

  head() {
    return {
      title: 'المستخدمين',
    }
  },


  mounted() {
    this.getUsers()
    this.getProvinces()
    this.getRoles()
  },

  methods: {
    async getUsers() {
      this.$nuxt.$loading.start()
      try {
        const users = await this.$axios.get('users')
        const roleInArray = [1, 5, 6]
        const filter = users.data.filter((user) => {
          return roleInArray.includes(user.roleId)
        })
        this.users = filter
        this.$nuxt.$loading.finish()
      } catch (error) {
        console.error(error.response)
        this.$nuxt.$loading.finish()
      }
    },

    async getProvinces() {
      try {
        const provinces = await this.$axios.get('provinces')
        this.provinces = provinces.data
      } catch (error) {
        console.error(error.response)
      }
    },

    async getRoles() {
      try {
        const roles = await this.$axios.get('roles')
        const roleInArray = [1, 5, 6]
        const filter = roles.data.filter((role) => {
          return roleInArray.includes(role.idRole)
        })
        this.roles = filter
      } catch (error) {
        console.error(error.response)
      }
    },

    openUpdateDialog(item) {
      this.updateUserDialog = true
      this.username = item.userName
      this.phone = item.phone
      this.provinceId = item.provinceId
      this.roleId = item.roleId
      this.idUser = item.idUser

      console.log(item.roleId)
    },

    closeUpdateDialog(item) {
      this.updateUserDialog = false
      this.username = null
      this.phone = item.phone
      this.provinceId = null
      this.roleId = null
      this.idUser = null
    },

    async deleteUser(item) {
      if (confirm('هل تريد حذف المستخدم ؟')) {
        try {
          const deleteUser = await this.$axios.delete(`user/${item.idUser}`)
          this.$toast.success('تم حذف الحساب', {
            duration: 3000,
            position: 'top-center',
          })

          this.getUsers()
        } catch (error) {
          console.log(error)
        }
      }
    },

    async createUsers() {
      if (this.$refs.createUserRef.validate()) {
        try {
          const data = {
            userName: this.username,
            password: this.password,
            phone: this.phone,
            provinceId: this.provinceId * 1,
            roleId: this.roleId * 1,
            canLogin: true,
          }

          const user = await this.$axios.post('addUser', data)

          this.$toast.success('تم حفظ المعلومات', {
            duration: 3000,
            position: 'top-center',
          })

          this.getUsers()
          this.createUserDialog = false
        } catch (error) {
          console.log(error.response)
        }
      }
    },

    async updateUsers() {
      if (this.$refs.updateUserRef.validate()) {
        try {
          const data = {
            userName: this.username,
            password: this.password,
            phone: this.phone,
            provinceId: this.provinceId * 1,
            roleId: this.roleId * 1,
            canLogin: true,
          }

          const user = await this.$axios.put(`user/${this.idUser}`, data)

          this.$toast.success('تم حفظ المعلومات', {
            duration: 3000,
            position: 'top-center',
          })

          this.getUsers()
          this.closeUpdateDialog()
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
