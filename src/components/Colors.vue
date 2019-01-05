<template>
  <ul class="colors">
    <li class="color-1"></li>
    <li class="color-2"></li>
    <li class="color-3"></li>
    <li class="color-4"></li>
    <li class="color-5"></li>
    <li class="color-6"></li>
  </ul>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Colors extends Vue {}
</script>

<style lang="scss" scoped>
$color-1: #ff00e7;
$color-2: #ff8100;
$color-3: #e3ff00;
$color-4: #00ff57;
$color-5: #00c5ff;
$color-6: #a300ff;

.colors {
  list-style-type: none;
  margin: 2rem 0 0;
  padding: 0;

  li {
    display: inline-block;
    width: 4rem;
    height: 4rem;

    &:first-child {
      border-radius: 8px 0 0 8px;
    }

    &:last-child {
      border-radius: 0 8px 8px 0;
    }

    &.color-1 {
      background-color: $color-1;
    }
    &.color-2 {
      background-color: $color-2;
    }
    &.color-3 {
      background-color: $color-3;
    }
    &.color-4 {
      background-color: $color-4;
    }
    &.color-5 {
      background-color: $color-5;
    }
    &.color-6 {
      background-color: $color-6;
    }
  }
}
</style>
