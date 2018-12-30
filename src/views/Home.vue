<template>
  <div class="home">
    <div class="container">
      <template v-for="x in 14">
        <template v-for="y in 14">
          <cell :row="x" :col="y" :key="x*y"/>
        </template>
        <br :key="x">
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Cell from '@/components/Cell.vue'

@Component({
  components: {
    Cell,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.container {
  display: inline-block;
  box-shadow: 0 2px 32px rgba(black, 0.5);
}
</style>

