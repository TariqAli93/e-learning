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
          'align-center justify-center flex-grow-1': !$vuetify.breakpoint.mobile,
        }"
      >
        <v-list-item-title> {{ list.title }} </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  data() {
    return {
      NavList: [
        {
          title: 'الرئيسية',
          icon: 'mdi-home-outline',
          to: '/',
        },
        {
          title: 'الكورسات',
          icon: 'mdi-laptop',
          to: '/courses/',
        },
        {
          title: 'المكتبة',
          icon: 'mdi-book-outline',
          to: '/library',
        },
        {
          title: 'الموزعين',
          icon: 'mdi-sitemap',
          to: '/distributors',
        },
        {
          title: 'الاساتذة',
          icon: 'mdi-account-outline',
          to: '/teachers',
        },
        {
          title: 'الطلاب',
          icon: 'mdi-card-account-details-outline',
          to: '/studnets',
        },
        {
          title: 'المستخدمين',
          icon: 'mdi-account-group-outline',
          to: '/users',
        },
        {
          title: 'الاعدادات',
          icon: 'mdi-tune',
          to: '/settings',
        },
      ],
    }
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