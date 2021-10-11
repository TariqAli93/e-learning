<template>
  <v-app dark>
    <NavBar />
    <v-main class="pt-10">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer color="secondary">
      <v-container>
        <v-row>
          <v-col cols="6">
            <span
              ><strong>&copy; {{ new Date().getFullYear() }}</strong> اسم
              البرنامج</span
            >
          </v-col>

          <v-col cols="6">
            <span class="float-left">الاصدار: 1.0.0</span>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {}
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