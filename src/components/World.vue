<template>
  <div class="world">
    <h1>{{ msg }}</h1>
    <h2>@Provide  提供  /  @Inject  注入(从父组件到子组件提供一些服务或数据时，您可以使用)</h2>
    <p>{{users}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject } from "vue-property-decorator";

@Component
export default class World extends Vue {
  @Prop() private msg!: string;

  @Inject('users') users: any;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
