<template>
  <div class="home">
    <div class="container">
      <template v-for="x in size">
        <template v-for="y in size">
          <cell :row="x" :col="y" :key="`r${x}c${y}`" :ref="`r${x}c${y}`"/>
        </template>
        <br :key="x">
      </template>
    </div>
    <colors @changeColor="changeColor"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Cell from '@/components/Cell.vue'
import Colors from '@/components/Colors.vue'

@Component({
  components: {
    Cell,
    Colors
  }
})
export default class Home extends Vue {
  public size = 14

  private changeColor(color: number) {
    const cell = (this.$refs.r1c1 as any[])[0]

    cell.changeColor(color)
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: inline-block;
  box-shadow: 0 2px 32px rgba(black, 0.5);
  border-radius: 0.5rem;
  margin-top: 1rem;
  overflow: hidden;
}
</style>

