import Vue from 'vue'
import { AxiosStatic } from 'axios'

declare module 'vue/types/vue' {
  /* tslint:disable */
  interface Vue {
    $api: AxiosStatic
  }
}
