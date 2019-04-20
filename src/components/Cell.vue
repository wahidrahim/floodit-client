<template lang="pug">
.cell(:style='{ backgroundColor: computedColor }')
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import store from '@/store'

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min // [min, max)
}

function getRandomColor(colors: string[]) {
  return colors[getRandomInt(0, colors.length)]
}

@Component
export default class Cell extends Vue {
  @Prop()
  public color!: string

  /**
   * Get all possible cell colors
   */
  get colors() {
    return this.$store.getters.colors
  }

  /**
   * If a color is provided - use that color;
   * otherwise, give itself a random color
   */
  get computedColor() {
    return this.color ? this.color : getRandomColor(this.colors)
  }

  // private color = 0
  // private neighbors = []
  // private notified = false
  // private width = 0
  // public setNeighbors(neighbors: any) {
  //   this.neighbors = neighbors
  // }
  // private get colorString() {
  //   return COLORS[this.color]
  // }
  // private changeColor(color: number) {
  //   this.notified = true
  //   // notifying neighbors
  //   this.neighbors.forEach((neighbor: any) => {
  //     if (neighbor && neighbor.color === this.color && !neighbor.notified) {
  //       neighbor.changeColor(color)
  //     }
  //   })
  //   this.color = color
  //   this.notified = false
  // }
  // private created() {
  //   this.color = getRandomColor()
  // }
  // private mounted() {
  //   console.log('cell mounted');
  //   // portrait
  //   this.width = this.containerWidth / this.size
  // }
}
</script>

<style lang="scss" scoped>
.cell {
  width: 100%;
  height: 100%;
}
</style>
