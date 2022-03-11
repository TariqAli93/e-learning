<template>
  <v-app dark>
    <NavBar :role="role" />
    <v-main class="pt-10">
      <v-container>
        <transition name="slide-y-reverse-transition">
          <Nuxt />
        </transition>
      </v-container>
    </v-main>

    <v-footer color="secondary">
      <v-container>
        <v-row>
          <v-col cols="6">
            <span
              ><strong>&copy; {{ new Date().getFullYear() }}</strong> منصة خطوة
            </span>
          </v-col>

          <v-col cols="6">
            <span class="float-left">الاصدار : {{version}}</span>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import 'material-design-icons-iconfont/dist/material-design-icons.css'
export default {
  data() {
    return {
      version: '1.0.0',
    }
  },
  computed: {
    role() {
      return this.$auth.user.roleId ?? 1
    },
  },
  mounted() {
    this.$auth.$storage.syncUniversal(
      'user',
      this.$auth.$storage.getUniversal('user')
    )

    this.$axios.get('settings').then((res) => {
      this.version = res.data[0].version
    })
  },
}
</script>

<style lang="scss" scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}

.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.5s;
}
.layout-enter,
.layout-leave-to {
  opacity: 0;
}
</style>
