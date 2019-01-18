<template lang="pug">
  ul.colors
    li.color-0(@click="$emit('changeColor', 0)")
    li.color-1(@click="$emit('changeColor', 1)")
    li.color-2(@click="$emit('changeColor', 2)")
    li.color-3(@click="$emit('changeColor', 3)")
    li.color-4(@click="$emit('changeColor', 4)")
    li.color-5(@click="$emit('changeColor', 5)")
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Colors extends Vue {}
</script>

<style lang="sass" scoped>
$color-0: #ff00e7
$color-1: #ff8100
$color-2: #e3ff00
$color-3: #00ff57
$color-4: #00c5ff
$color-5: #a300ff

.colors
  list-style-type: none
  margin: 2rem 0 0
  padding: 0

  li
    display: inline-block
    width: calc((100% - 32px) / 6)
    height: 4rem

    &:first-child
      border-radius: 8px 0 0 8px
    &:last-child
      border-radius: 0 8px 8px 0

    &.color-0
      background-color: $color-0
    &.color-1
      background-color: $color-1
    &.color-2
      background-color: $color-2
    &.color-3
      background-color: $color-3
    &.color-4
      background-color: $color-4
    &.color-5
      background-color: $color-5
</style>
