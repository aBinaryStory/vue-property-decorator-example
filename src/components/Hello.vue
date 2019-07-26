<template>
  <div class="Hello">
    <h2>@Components</h2>
    <World msg="world msg" />

    <p>ValA : {{ ValA }}</p>
    <p>ValB : {{ ValB }}</p>
    <h2></h2>
    <p>ValC : {{ ValC }}</p>

    <h2>@Watch(监听数据变化)</h2>
    <p>{{WatchText}}</p>
    <h2>@Prop & @PropSync (父子组件之间传值)</h2>
    <button @click="clickHandler">改变ValB值</button>
    <p>父传值:</p>
    <p>propA: {{propA}}</p>
    <p>propB: {{propB}}</p>
    <p>name: {{name}}</p>
    <p>syncedName: {{syncedName}}</p>
    <h2>@Model(数据双向绑定)</h2>
    <p>
      <input type="checkbox" :checked="checked" @change="change" />
      {{ checked }}
    </p>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Emit,
  Watch,
  PropSync,
  Model,
  Provide,
  Mixins
} from "vue-property-decorator";
import World from "@/components/World.vue";
import TestMixin from '../mixins/test-mixin'

@Component({
  components: {
    World
  },
  mixins: [TestMixin]
})
export default class Hello extends Vue{
  ValA: string = "hello";
  ValB: number = 1;
  WatchText: string = "";
  // value:string = ''

  // computed
  get ValC() {
    return 1000;
  }

  created() {
    console.log(this.testMethod('1234'));
  }

  mounted() {
    this.$on("emit-todo", function(n: any) {
      console.log(n);
    });

    this.emitTodo("world");
  }

  clickHandler() {
    this.ValB++;
  }

  // 触发事件
  @Emit()
  emitTodo(n: string) {
    console.log("hello");
  }

  // watch
  @Watch("ValB")
  onChangeValue(newVal: string, oldVal: string) {
    console.log(`${oldVal}-> change -> ${newVal}`);
    this.WatchText = `${oldVal}-> change -> ${newVal}`;
  }

  // @Prop 父子传值 !和可选参数?是相反的, !告诉TypeScript我这里一定有值
  @Prop(Number) propA!: number;
  @PropSync("name", { type: String }) syncedName!: string;
  @Prop({ default: "default value" }) propB!: string;
  @Prop([String, Boolean]) propC?: string | boolean;

  @Model("change", {
    type: Boolean
  })
  checked!: boolean;

  @Emit("change")
  change(e: MouseEvent) {
    this.checked = !this.checked;
  }

  @Provide("users")
  users = [
    {
      name: "test",
      id: 0
    }
  ];

  // https://www.jianshu.com/p/d8ed3aa76e9b
}
</script>

<style scoped>
</style>
