<template lang="pug">
  pre {{ scores }}
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Scores extends Vue {
  public scores: any[] = []

  private async created() {
    const res = await this.$api.get('/scores')

    this.scores = res.data
  }
}
</script>

