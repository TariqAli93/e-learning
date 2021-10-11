/* eslint-disable camelcase */
<template>
  <ul class="navbar__list">
    <li v-for="list in NavList" :key="list.title" class="navbar__list__item">
      <NuxtLink
        :to="list.to"
        active-class="active-nav text--text"
        class="text--text"
      >
        <v-icon v-text="list.icon"></v-icon>
        <div v-if="list.title !== ''" class="d-block" style="width: 10px"></div>
        <span v-if="list.title !== ''">{{ list.title }}</span>
      </NuxtLink>
    </li>
  </ul>
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
        content: "";
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