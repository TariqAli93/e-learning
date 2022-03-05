<template>
  <v-app>
    <svg class="svg1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill-opacity="1"
        d="M0,288L26.7,277.3C53.3,267,107,245,160,208C213.3,171,267,117,320,101.3C373.3,85,427,107,480,101.3C533.3,96,587,64,640,48C693.3,32,747,32,800,58.7C853.3,85,907,139,960,138.7C1013.3,139,1067,85,1120,96C1173.3,107,1227,181,1280,213.3C1333.3,245,1387,235,1413,229.3L1440,224L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"
      ></path>
    </svg>

    <div class="login__page">
      <v-card
        color="primary"
        class="rounded-1 shadow-1 mt-10 pa-5"
        width="500px"
      >
        <img src="~/static/logo.png" />
        <v-form
          ref="LoginForm"
          v-model="loginForm"
          class="pa-5"
          lazy-validation
          @submit.prevent="login"
        >
          <v-text-field
            v-model="username"
            :rules="rules"
            color="text"
            outlined
            label="اسم المستخدم"
            background-color="secondary"
            prepend-inner-icon="mdi-account"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="rules"
            color="text"
            :type="showPassword ? 'text' : 'password'"
            outlined
            label="كلمة المرور"
            background-color="secondary"
            prepend-inner-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-btn
            type="submit"
            color="text"
            :disabled="!loginForm"
            block
            depressed
            large
          >
            <span class="primary--text font-weight-bold">تسجيل الدخول</span>
          </v-btn>
        </v-form>
      </v-card>
    </div>
  </v-app>
</template>

<script>
export default {
  layout: 'login',
  data() {
    return {
      loginForm: false,
      username: '',// 784356
      password: '',// 123
      showPassword: false,
      rules: [(v) => !!v || 'لا يمكن ترك الحقل فارغ'],
    }
  },

  head() {
    return {
      title: 'تسجيل الدخول',
    }
  },

  methods: {
    parseToken(token) {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          })
          .join('')
      )

      return JSON.parse(jsonPayload)
    },

    async login() {
      if (this.$refs.LoginForm.validate()) {
        this.$nuxt.$loading.start()
        // 784356
        const showMessage = this.$toast.show('جاري تسجيل الدخول...', {
          position: 'top-center',
          duration: 3000
        })

        try {
          const user = await this.$auth.loginWith('local', {
            data: {
              phone: this.username,
              password: this.password
            },
          })


          if(this.parseToken(user.data.token).roleId === 1 || this.parseToken(user.data.token).roleId === 5) {
            this.$auth.setUser(this.parseToken(user.data.token))
            this.$auth.strategy.token.set(user.data.token)
            this.$auth.$storage.setUniversal('user',this.parseToken(user.data.token))

            showMessage.goAway()

            this.$nuxt.$loading.finish()

            this.$toast.success('تم تسجيل الدخول', {
              duration: 3000,
              position: 'top-center',
            })
          } else {
            this.$toast.error('لا تملك الصلاحيات لاكمال تسجيل الدخول', {
              duration: 3000,
              position: 'top-center',
            })
            this.$auth.logout()
          }

        } catch (e) {
          this.$toast.error('خطأ في تسجيل الدخول', {
            duration: 3000,
            position: 'top-center',
          })

          showMessage.goAway()

          this.$nuxt.$loading.finish()

          console.log(e.response.data.errorMessage)
        }
      }
    },
  },
}
</script>

<style lang="scss">
.theme--dark.v-application {
  background: $secondary !important;
}

.login__page {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1003;

  img {
    display: block;
    width: 100px;
    height: 100px;
    margin: 0 auto;
    margin-bottom: 30px;
    position: relative;
    z-index: 1;
  }
}

svg {
  position: absolute;
  width: 100%;
  z-index: 1001;
  opacity: 0.5;

  path {
    fill: $primary;
  }
}
</style>
