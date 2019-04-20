<template lang="pug">
.cell(:style='{ backgroundColor: colorString }')
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import store from '@/store'

@Component
export default class Cell extends Vue {
  public neighbors = []

  @Prop()
  public color!: number

  /**
   * Get all possible cell colors
   */
  get colors(): string[] {
    return this.$store.getters.colors
}

  /**
   * Index of the color from the possible colors
   */
  get colorIndex() {
    return this.colors.indexOf(this.colorString)
  }

  /**
   * If a color is provided - use that color as an index;
   * otherwise, give itself a random color
   */
  public get colorString() {
    const min = 0
    const max = this.colors.length
    const randomInt = Math.floor(Math.random() * (max - min)) + min // [min, max)
    const randomColor = this.colors[randomInt]

    return this.color ? this.colors[this.color] : randomColor
  }

  /**
   * Setting
   */
  public setNeighbors(neighbors: []) {
    this.neighbors = neighbors
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
