<template>
  <div class="home__page__cards">
    <div class="home__page__cards__inner secondary">
      <div class="home__page__cards__inner__content">
        <h1>{{ count }}</h1>
        <h4>{{ title }}</h4>
      </div>

      <div class="home__page__cards__inner__icon text">
        <v-icon color="secondary">{{ icon }}</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    count: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.home__page__cards {
  padding: 0;

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: 0 1em;
    max-height: 300px;
    height: 100px;
    border-radius: 1em;
    box-shadow: 0 10px 10px 0 rgba(black, 0.1);

    &__content {
      display: flex;
      flex-direction: column;

      h1 {
        font-size: 2em;
      }

      h4 {
        font-size: 0.9em;
      }
    }

    &__icon {
      position: absolute;
      height: 90px;
      width: 90px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5em;
      left: 1em;
      top: -0.8em;
      border-radius: 1em;
      box-shadow: 0 10px 10px 0 rgba(black, 0.1);

      i {
        font-size: 2em;
      }
    }
  }
}
</style>