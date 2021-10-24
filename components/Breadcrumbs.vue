<template>
  <v-breadcrumbs :items="items" class="text--text">
    <template #divider>
      <v-icon>mdi-arrow-left</v-icon>
    </template>
    <template #item="{ item }">
      <v-breadcrumbs-item
        :class="item.bgColor"
        :href="item.href"
        :disabled="item.disabled"
      >
        <span :class="item.color">
          {{ item.text }}
        </span>
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
</style>