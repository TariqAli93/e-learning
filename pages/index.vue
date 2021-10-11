<template>
  <div id="HomePage">
    <v-row class="mb-5">
      <v-col
        v-for="card in cards"
        :key="card.title"
        cols="12"
        lg="4"
        md="4"
        sm="12"
      >
        <HomeCards
          :title="card.title"
          :count="NumFormat(card.count)"
          :icon="card.icon"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" lg="8" md="8" sm="12">
        <v-data-table
          :headers="headers"
          :items="desserts"
          :items-per-page="5"
          class="shadow-1 radius-1 pa-5 secondary"
        >
          <template #top>
            <v-toolbar class="shadow-1 radius-1 mb-5" flat color="primary" dark>
              <v-toolbar-title>اخر الطلبة</v-toolbar-title>
            </v-toolbar>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="12" lg="4" md="4" sm="12">
        <v-data-table
          :headers="headers"
          :items="desserts"
          :items-per-page="5"
          class="shadow-1 radius-1 pa-5 secondary"
        >
          <template #top>
            <v-toolbar class="shadow-1 radius-1 mb-5" flat color="primary" dark>
              <v-toolbar-title>اخر التعليقات</v-toolbar-title>
            </v-toolbar>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" lg="4" md="4" sm="12">
        <v-data-table
          :headers="headers"
          :items="desserts"
          :items-per-page="5"
          class="shadow-1 radius-1 pa-5 secondary"
        >
          <template #top>
            <v-toolbar class="shadow-1 radius-1 mb-5" flat color="primary" dark>
              <v-toolbar-title>اخر المرفوعات</v-toolbar-title>
            </v-toolbar>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="12" lg="8" md="8" sm="12">
        <v-data-table
          :headers="headers"
          :items="desserts"
          :items-per-page="5"
          class="shadow-1 radius-1 pa-5 secondary"
        >
          <template #top>
            <v-toolbar class="shadow-1 radius-1 mb-5" flat color="primary" dark>
              <v-toolbar-title>اخر الكورسات</v-toolbar-title>
            </v-toolbar>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          title: 'الاساتذة',
          count: 7000,
          icon: 'icon-teacher',
        },

        {
          title: 'الكورسات',
          count: 7000,
          icon: 'icon-course',
        },

        {
          title: 'الطلبة',
          count: 7000,
          icon: 'icon-students',
        },
      ],
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
      ],

      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%',
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%',
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%',
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%',
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%',
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%',
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
      ],
    }
  },

  methods: {
    NumFormat(num) {
      if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(1) + 'K' // convert to K for number from > 1000 < 1 million
      } else if (num > 1000000) {
        return (num / 1000000).toFixed(1) + 'M' // convert to M for number from > 1 million
      } else if (num < 900) {
        return num // if value < 1000, nothing to do
      }
    },
  },
}
</script>

<style lang="scss">

</style>