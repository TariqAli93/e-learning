<template>
  <div class="navbar">
    <div class="navbar__inner">
      <div class="navbar__inner__top primary">
        <v-container class="pa-0">
          <v-toolbar flat color="transparent">
            <NavBarLogo />

            <v-spacer></v-spacer>

            <v-menu bottom origin="top right" transition="slide-y-transition">
              <template #activator="{ on, attrs }">
                <v-btn
                  color="transparent"
                  depressed
                  link
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon class="ml-2">icon-profile</v-icon>
                  <span v-if="$auth.loggedIn">{{ $auth.user.userName }}</span>
                </v-btn>
              </template>

              <v-list dense color="primary">
                <v-list-item to="/settings">
                  <v-list-item-icon>
                    <v-icon>settings</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>الاعدادات</v-list-item-title>
                </v-list-item>

                <v-list-item @click="$auth.logout()">
                  <v-list-item-icon>
                    <v-icon>mdi-logout</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>تسجيل الخروج</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-container>
      </div>

      <div class="navbar__inner__bottom secondary">
        <v-container class="pa-0">
          <v-toolbar flat color="transparent" dense>
            <NavBarList :role-id="role" />
          </v-toolbar>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    role: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss">
.navbar {
  position: sticky;
  top: -70px;
  z-index: 100;
  box-shadow: 0 10px 10px 0 rgba(black, 0.1);

  &__inner {
    .v-toolbar {
      height: auto !important;

      &__content {
        height: auto !important;
      }
    }

    &__top {
      height: 70px !important;
    }
  }
}
</style>
