<template>
  <div class="assistants-page">
    <v-dialog
      v-model="createAssistDialog"
      max-width="750px"
      transition="slide-y-transition"
    >
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-toolbar color="primary" class="shadow-1 radius-1 mb-10">
          <h4>انشاء مساعد جديد</h4>
          <v-spacer />
          <v-btn color="error" icon @click="createAssistDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-form
          ref="createRef"
          v-model="createModel"
          lazy-validation
          @submit.prevent="saveAssistant"
        >
          <v-row>
            <v-col cols="12">
              <v-select
                v-model="teacherId"
                color="white"
                outlined
                label="الاساتذة"
                :items="teachers"
                item-value="idUser"
                item-text="userName"
                item-color="white"
              ></v-select>
            </v-col>

            <v-col cols="12">
              <v-select
                v-model="assistantId"
                color="white"
                outlined
                label="المساعدين"
                :items="assistants"
                item-value="idUser"
                item-text="userName"
                item-color="white"
              ></v-select>
            </v-col>
          </v-row>

          <v-btn color="success" block large depressed type="submit">
            حفظ المعلومات
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>

    <v-data-table
      :headers="headers"
      :items.sync="assistants"
      :items-per-page="15"
      item-key="idUser"
      class="shadow-1 radius-1 pa-5 secondary"
      :search="search"
      loading-text="جاري التحميل"
    >
      <template #top>
        <v-toolbar flat color="primary" class="shadow-1 radius-1">
          <div class="d-flex align-center justify-evenly" style="width: 100%">
            <v-toolbar-title style="flex: 1 1 auto">المساعدين</v-toolbar-title>
            <v-text-field
              v-model="search"
              color="text"
              placeholder="ابحث في المساعدين..."
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
                  @click="createAssistDialog = true"
                >
                  <v-icon>add</v-icon>
                </v-btn>
              </template>
              <span class="primary--text">اضافة مساعد جديد</span>
            </v-tooltip>
          </div>
        </v-toolbar>
      </template>

      <template #[`item.actions`]="{ item }">
        <v-row justify="center" align="center">
          <v-btn color="warning" icon @click="openUpdateDialog(item)">
            <v-icon>edit</v-icon>
          </v-btn>

          <v-btn color="error" icon @click="deleteStudents(item)">
            <v-icon>delete</v-icon>
          </v-btn>

          <v-btn color="white" icon @click="deleteStudents(item)">
            <v-icon>info</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'المعرف',
          align: 'start',
          value: 'idUser',
          sortable: false,
        },
        { text: 'اسم المستخدم', value: 'userName', sortable: false },
        { text: 'الهاتف', value: 'phone', sortable: false },
        {
          text: 'المحافظة',
          value: 'province.provinceName',
          sortable: false,
        },
        { text: 'الاجرائات', value: 'actions', sortable: false, width: 200 },
      ],
      assistants: [],
      teachers: [],
      teacherId: null,
      assistantId: null,
      createAssistDialog: false,
      createModel: false,
    }
  },

  mounted() {
    this.GetAssistants()
    this.GetTeachers()
  },

  head() {
    return {
      title: 'المساعدين',
    }
  },

  methods: {
    async GetAssistants() {
      try {
        const assistants = await this.$axios.get('userRoles/6')
        this.assistants = assistants.data
      } catch (error) {
        console.log(error)
      }
    },

    async GetTeachers() {
      try {
        const teachers = await this.$axios.get('userRoles/3')
        this.teachers = teachers.data
      } catch (error) {
        console.log(error)
      }
    },

    async saveAssistant() {
      if (this.$refs.createRef.validate()) {
        try {
          const create = await this.$axios.post('addAssistanceTeacher', {
            teacherId: this.teacherId * 1,
            assistanceId: this.assistantId * 1,
          })
          console.log(create.data)
          this.GetAssistants()
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
