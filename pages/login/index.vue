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
        color="transparent"
        class="pa-15 custome__card shadow-1"
        elevation="0"
        width="500px"
      >
        <img src="~/static/vuetify-logo.svg" />
        <v-form
          ref="LoginForm"
          v-model="loginForm"
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

    <svg class="svg2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill-opacity="1"
        d="M0,288L26.7,277.3C53.3,267,107,245,160,208C213.3,171,267,117,320,101.3C373.3,85,427,107,480,101.3C533.3,96,587,64,640,48C693.3,32,747,32,800,58.7C853.3,85,907,139,960,138.7C1013.3,139,1067,85,1120,96C1173.3,107,1227,181,1280,213.3C1333.3,245,1387,235,1413,229.3L1440,224L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"
      ></path>
    </svg>
  </v-app>
</template>

<script>
export default {
  layout: 'login',
  data() {
    return {
      loginForm: false,
      username: '',
      password: '',
      showPassword: false,
      rules: [(v) => !!v || 'لا يمكن ترك الحقل فارغ'],
    }
  },

  methods: {
    login() {
      if (this.$refs.LoginForm.validate()) {
        console.log(true)
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

  &.svg1 {
    top: 0;
    right: 0;
  }

  &.svg2 {
    bottom: 0;
    right: 0;
    transform: rotateY(360deg) rotateX(180deg) !important;
  }

  path {
    fill: $primary;
  }
}

.custome__card {
  position: relative;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 60%;
    left: 0;
    right: 0;
    margin: 0 auto;
    transform: translateY(-50%) scale(1.5);
    background: {
      image: url('~/static/custome__login__svg.svg');
      size: 100%;
      position: center center;
      repeat: no-repeat;
    }
  }
}
</style>