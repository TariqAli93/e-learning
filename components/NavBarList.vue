<template>
  <v-list
    nav
    dense
    color="transparent"
    flat
    class="d-flex align-center justify-space-around"
    width="100%"
  >
    <v-list-item
      v-for="list in NavList"
      v-if="list.show"
      :key="list.title"
      style="margin: 0 10px"
      :to="list.to"
      dense
      exact-active-class="primary text--text shadow-1"
      :class="{
        'pa-0 ma-0 align-center justify-center': $vuetify.breakpoint.mobile,
        'align-center justify-center': !$vuetify.breakpoint.mobile,
      }"
    >
      <v-list-item-avatar :class="{ 'mr-0 ml-0': $vuetify.breakpoint.mobile }">
        <v-icon>{{ list.icon }}</v-icon>
      </v-list-item-avatar>

      <v-list-item-content
        v-if="!$vuetify.breakpoint.mobile"
        :class="{
          'align-center justify-center flex-grow-1':
            !$vuetify.breakpoint.mobile,
        }"
      >
        <v-list-item-title> {{ list.title }} </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-menu transition="slide-y-transition">
      <template #activator="{ on, attrs }">
        <v-list
          nav
          dense
          color="transparent"
          flat
          class="d-flex align-center justify-space-around"
          width="100%"
        >
          <v-list-item
            style="margin: 0 10px"
            dense
            v-bind="attrs"
            :class="{
              'pa-0 ma-0 align-center justify-center':
                $vuetify.breakpoint.mobile,
              'align-center justify-center': !$vuetify.breakpoint.mobile,
            }"
            v-on="on"
          >
            <v-list-item-avatar
              :class="{ 'mr-0 ml-0': $vuetify.breakpoint.mobile }"
            >
              <v-icon>menu</v-icon>
            </v-list-item-avatar>

            <v-list-item-content
              v-if="!$vuetify.breakpoint.mobile"
              :class="{
                'align-center justify-center flex-grow-1':
                  !$vuetify.breakpoint.mobile,
              }"
            >
              <v-list-item-title>المزيد</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
      <v-card>
        <v-list nav dense>
          <v-list-item
            v-for="list in dropdown"
            v-if="list.show"
            :key="list.title"
            style="margin: 10px 0"
            :to="list.to"
            dense
            exact-active-class="primary text--text shadow-1"
            :class="{
              'pa-0 ma-0 align-center justify-center':
                $vuetify.breakpoint.mobile,
              'align-center justify-center': !$vuetify.breakpoint.mobile,
            }"
          >
            <v-list-item-avatar
              :class="{ 'mr-0 ml-0': $vuetify.breakpoint.mobile }"
            >
              <v-icon>{{ list.icon }}</v-icon>
            </v-list-item-avatar>

            <v-list-item-content
              v-if="!$vuetify.breakpoint.mobile"
              :class="{
                'align-center justify-center flex-grow-1':
                  !$vuetify.breakpoint.mobile,
              }"
            >
              <v-list-item-title> {{ list.title }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-list>
</template>

<script>
export default {
  props: {
    roleId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      NavList: [
        {
          title: 'الرئيسية',
          icon: 'mdi-home-outline',
          to: '/',
          show: true,
        },
        {
          title: 'الكورسات',
          icon: 'mdi-laptop',
          to: '/courses/',
          show: true,
        },
        {
          title: 'المكتبة',
          icon: 'mdi-book-outline',
          to: '/library',
          show: true,
        },
        {
          title: 'المراحل',
          icon: 'list_alt',
          to: '/grades',
          show: true,
        },
        {
          title: 'المواد',
          icon: 'import_contacts',
          to: '/subjects',
          show: true,
        },
        {
          title: 'الخصومات',
          icon: 'mdi-sale',
          to: '/promo',
          show: true,
        },
        {
          title: 'الاشعارات',
          icon: 'notifications',
          to: '/notifications',
          show: true,
        },
        {
          title: 'التقارير المالية',
          icon: 'table_chart',
          to: '/reports',
          show: this.roleId === 1,
        },
      ],
      dropdown: [
        {
          title: 'الموزعين',
          icon: 'mdi-sitemap',
          to: '/distributors',
          show: true,
        },
        {
          title: 'الاساتذة',
          icon: 'mdi-account-outline',
          to: '/teachers',
          show: true,
        },
        {
          title: 'الطلاب',
          icon: 'mdi-card-account-details-outline',
          to: '/studnets',
          show: true,
        },
        {
          title: 'الافتارات',
          icon: 'account_circle',
          to: '/avatars',
          show: true,
        },
        {
          title: 'المستخدمين',
          icon: 'mdi-account-group-outline',
          to: '/users',
          show: true,
        },
      ],
    }
  },

  mounted() {
    console.log(this.$auth.user)
  },
}
</script>

<style lang="scss">
.navbar__list {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  position: relative;

  &__item {
    list-style-type: none;
    // border: 1px solid white;

    a {
      text-decoration: none;
      padding: 1em 0.5em;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 5px;
        border-top-left-radius: 50px;
        border-top-right-radius: 50px;
        background-color: currentColor;
        bottom: 0;
        right: 0;
        visibility: hidden;
        opacity: 0;
        transform: translateY(20%);
        transition: all ease-in-out 300ms;
      }

      &.nuxt-link-exact-active {
        &:before {
          visibility: visible;
          opacity: 1;
          transform: translateY(0);
        }
      }

      i,
      span {
        font-size: 1.1em;
      }

      i {
        font-size: 1.5em;
      }
    }
  }
}
</style>
