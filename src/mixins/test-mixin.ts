import {Component, Vue} from 'vue-property-decorator'
declare module 'vue/types/vue' {
  interface Vue {
    testName: string
    testMethod(abc: string): string
  }
}
@Component
export default class TestMixin extends Vue {
  testName: string = 'ABCDEFG'
  testMethod(abc: string) {
    console.log('test mixin method', abc)
    return 'abcdefg'
  }
}
