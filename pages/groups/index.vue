<template>
  <div id="GroupsPage">
    <v-dialog
      v-model="coursesDialog"
      transition="slide-y-transition"
      max-width="750px"
    >
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-toolbar color="primary" class="shadow-1 radius-1 mb-10">
          <h4>الكورسات</h4>
          <v-spacer />
          <v-btn color="error" icon @click="coursesDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-data-table
          :headers="coursesHeaders"
          :items.sync="courses"
          :items-per-page="15"
          class="pa-5 secondary courses__table"
        >
          <template #[`item.actions`]="{ item }">
            <v-btn icon color="success" @click="GetGroups(item)">
              <v-icon>people</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="groupsDialog"
      transition="slide-y-transition"
      max-width="750px"
    >
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-toolbar color="primary" class="shadow-1 radius-1 mb-10">
          <h4>المجموعات</h4>
          <v-spacer />
          <v-btn color="error" icon @click="groupsDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-data-table
          :headers="groupsHeaders"
          :items.sync="groups"
          :items-per-page="15"
          class="pa-5 secondary courses__table"
        >
          <template #[`item.actions`]="{ item }">
            <v-btn icon color="success" @click="GetStudents(item)">
              <v-icon>person_pin</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="studentsDialog"
      transition="slide-y-transition"
      max-width="750px"
    >
      <v-card color="secondary" class="shadow-1 radius-1 pa-10">
        <v-toolbar color="primary" class="shadow-1 radius-1 mb-10">
          <h4>الطلاب</h4>
          <v-spacer />
          <v-btn color="error" icon @click="studentsDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-data-table
          :headers="studentsHeaders"
          :items.sync="students"
          :items-per-page="15"
          class="pa-5 secondary courses__table"
        >
        </v-data-table>
      </v-card>
    </v-dialog>

    <v-data-table
      :headers="headers"
      :items.sync="teachers"
      :items-per-page="15"
      class="shadow-1 radius-1 pa-5 secondary"
      :search="search"
    >
      <template #top>
        <v-toolbar flat color="primary" class="shadow-1 radius-1">
          <div class="d-flex align-center justify-evenly" style="width: 100%">
            <v-toolbar-title style="flex: 1 1 auto">المجموعات</v-toolbar-title>
          </div>
        </v-toolbar>
      </template>

      <template #[`item.actions`]="{ item }">
        <v-btn icon color="success" @click="GetCourses(item)">
          <v-icon>mdi-eye</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: 'المعرف',
          align: 'start',
          value: 'idUser',
          sortable: false,
        },
        {
          text: 'اسم الاستاذ',
          value: 'userName',
          sortable: false,
        },
        { text: 'الهاتف', value: 'phone', sortable: false },
        {
          text: 'المحافظة',
          value: 'provinceName',
          sortable: false,
        },
        { text: 'الاجرائات', value: 'actions', sortable: false },
      ],
      coursesHeaders: [
        { text: 'المعرف', align: 'start', value: 'idCourse', sortable: false },
        { text: 'اسم الكورس', value: 'courseTitle', sortable: false },
        { text: 'المادة', value: 'subject.subjectName', sortable: false },
        { text: 'الاجرائات', value: 'actions', sortable: false, width: 200 },
      ],
      groupsHeaders: [
        { text: 'المعرف', align: 'start', value: 'idGroup', sortable: false },
        { text: 'اسم المجموعة', value: 'groupName', sortable: false },
        { text: 'عدد الطلاب', value: 'StudentGroup.length', sortable: false },
        { text: 'التاريخ', value: 'createdAt', sortable: false },
        { text: 'الاجرائات', value: 'actions', sortable: false, width: 200 },
      ],
      studentsHeaders: [
        { text: 'المعرف', align: 'start', value: 'user.idUser', sortable: false },
        { text: 'اسم الطالب', value: 'user.userName', sortable: false },
        { text: 'رقم الهاتف', value: 'user.phone', sortable: false },
      ],
      groups: [],
      courses: [],
      teachers: [],
      students: [],
      search: '',
      coursesDialog: false,
      groupsDialog: false,
      studentsDialog: false,
    }
  },
  mounted() {
    this.GetTeachers()
  },
  methods: {
    async GetGroups(item) {
      try {
        const groups = await this.$axios.get(`courseGroups/${item.idCourse}`)
        this.groups = groups.data.map((group) => {
          return {
            ...group,
            createdAt: group.createdAt.split('T')[0],
          }
        })
        this.groupsDialog = true
      } catch (error) {
        console.error(error)
      }
    },

    async GetCourses(item) {
      try {
        const courses = await this.$axios.get(`courseMoney/${item.idUser}`)
        this.courses = courses.data
        this.coursesDialog = true
      } catch (error) {
        console.error(error)
      }
    },

    GetStudents(item) {
      const { StudentGroup } = item
      this.students = StudentGroup
      this.studentsDialog = true
    },

    async GetTeachers() {
      try {
        const teachers = await this.$axios.get('userRoles/3')
        this.teachers = teachers.data.map((teacher) => {
          return {
            idUser: teacher.idUser,
            userName: teacher.userName,
            phone: teacher.phone,
            provinceName: teacher.province.provinceName,
          }
        })
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style>
</style>