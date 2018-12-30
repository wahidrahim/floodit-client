<template>
  <div
    class="cell"
    :style="{ 'background-color': color }"
  ></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

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
  public color: string = '#000'

  @Prop()
  public row!: number

  @Prop()
  public col!: number

  public created() {
    this.color = getRandomColor()
  }
}
</script>

<style lang="scss" scoped>
.cell {
  display: inline-block;
  vertical-align: top;
  width: 2rem;
  height: 2rem;
}

</style>
