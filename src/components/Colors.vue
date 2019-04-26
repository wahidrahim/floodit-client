<template lang="pug">
ul#colors
  li(v-for='(color, i) in colors' :key='i',
  :style='{ backgroundColor: color }',
  @click='$store.dispatch(`changeColor`, i)')
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Colors extends Vue {
  get colors() {
    return this.$store.getters.colors
  }
}
</script>

<style lang="scss" scoped>
#colors {
  list-style-type: none;
  margin: 2rem 0 0;
  padding: 0;

  li {
    display: inline-block;
    width: calc((100% - 32px) / 6);
    height: 4rem;

    &:first-child {
      border-radius: 0.5rem 0 0 0.5rem;
    }

    &:last-child {
      border-radius: 0 0.5rem 0.5rem 0;
    }
  }
}
</style>
