<template lang="pug">
#board
  table(:style='{ width: `${boardWidth}px`, height: `${boardWidth}px` }')
    tr(v-for='row in size')
      td(v-for='col in size')
        //- give the cell a color (static), or the cell will give itself a random color (live)
        cell
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import Cell from '@/components/Cell.vue'

@Component({
  components: { Cell }
})
export default class Board extends Vue {
  private size = 2
  private boardWidth = 0

  private beforeMount() {
    const MAX_WIDTH = 480
    const PADDING = 32

    this.boardWidth =
      document.body.clientWidth < MAX_WIDTH
        ? document.body.clientWidth - PADDING
        : MAX_WIDTH - PADDING
  }
}
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  margin: 1rem auto;

  tr {
    td {
      overflow: hidden; // makes the corner border radius visible
      padding: 0;
    }

    &:first-child {
      td:first-child {
        border-top-left-radius: 0.5rem;
      }

      td:last-child {
        border-top-right-radius: 0.5rem;
      }
    }

    &:last-child {
      td:first-child {
        border-bottom-left-radius: 0.5rem;
      }
      td:last-child {
        border-bottom-right-radius: 0.5rem;
      }
    }
  }
}
</style>
