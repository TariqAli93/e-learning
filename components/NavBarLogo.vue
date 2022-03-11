<template>
  <div class="logo">
    <v-list dense nav flat elevation="0" color="transparent">
      <v-list-item to="/">
        <img src="../static/logo.png" alt="Logo" />
        <span>منصة خطوة</span>
      </v-list-item>
    </v-list>
  </div>
</template>

<style lang="scss">
.logo {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 65px;
  width: 200px;
  padding: 0.5em 0;

  img {
    display: block;
    width: 40px;
    height: 56px;
    margin-left: 0.5em;
  }
}
</style>
