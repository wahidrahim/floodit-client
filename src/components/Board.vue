<template lang="pug">
#board
  table
    tr(v-for='row in size')
      td(v-for='col in size' :style='{ backgroundColor: "red" }')
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Board extends Vue {
  private size = 2
}
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;

  tr {
    td {
      height: 1rem;
      width: 1rem;
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
