<template>
  <div class="cell" :style="{ 'background-color': color }">hi</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min // [min, max)
}

const getRandomColor = () => {
  const colors = [
    '#ff00e7',
    '#ff8100',
    '#e3ff00',
    '#00ff57',
    '#00c5ff',
    '#a300ff',
  ]

  return colors[getRandomInt(0, colors.length)]
}

@Component
export default class Cell extends Vue {
  public color: string = '#000000'

  public created() {
    this.color = getRandomColor()
  }
}
</script>

<style lang="scss" scoped>
.cell {
  display: inline-block;
  width: 2rem;
  height: 2rem;
}
</style>
