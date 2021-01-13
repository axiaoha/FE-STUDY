<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <!-- <h1>{{ data.count }}</h1>
    <h1>{{ data.double }}</h1> -->
    <!-- <button @click="data.increase">👍+1</button> -->
    <h1>x:{{ x }} y:{{ y }}</h1>
    <h1>x:{{ data1.x }} y:{{ data1.y }}</h1>
    <h1 v-if="loading">Loading</h1>
    <img
      v-if="loaded"
      :src="result[0].url"
      :width="result[0].width"
      :height="result[0].height"
    />
    <h1>{{ count }}</h1>
    <h1>{{ double }}</h1>
    <ul>
      <li v-for="n in numbers" :key="n">{{ n }}</li>
    </ul>
    <h1>{{ person.name }}</h1>
    <Modal :isOpen="modalIsOpen" @close-modal="onModalClose">my modal</Modal>
    <button @click="increase">👍+1</button>
    <button @click="updateGreeting">update title</button>
    <button @click="openModal">open modal</button>
  </div>
</template>

<script lang="ts">
import Modal from "../src/components/Modal.vue";
import useMousePosition from "./hooks/useMousePosition";
import useURLLoader from "./hooks/useURLLoader";
import {
  ref,
  computed,
  reactive,
  toRefs,
  onMounted,
  onUpdated,
  onRenderTriggered,
  watch,
  onUnmounted,
} from "vue";
interface DataProps {
  count: number;
  double: number;
  increase: () => void;
  numbers: number[];
  person: { name?: string };
}
interface DogResult {
  message: string;
  status: string;
}
interface CatResult {
  id: string;
  url: string;
  width: number;
  height: number;
}
export default {
  name: "App",
  components: { Modal },
  // ---vue2.0---
  // data() {
  //   return {
  //     count: 0,
  //   };
  // },
  // methods: {
  //   increase() {
  //     this.count++;
  //   },
  // },

  // ---vue3.0---
  // 在执行 setup 时尚未创建组件实例，因此在 setup 选项中没有 this。除了 props 之外，无法访问组件中声明的任何属性——本地状态、计算属性或方法。相当于vue2里面的created和beforeCreate
  setup() {
    // 生命周期函数
    // onMounted(() => {
    //   console.log("mounted");
    // });
    // onUpdated(() => {
    //   console.log("updated");
    // });
    // onRenderTriggered((event) => {
    //   console.log(event);
    // });
    // ref：接受一个内部值并返回一个响应式且可变的 ref 对象。ref 对象具有指向内部值的单个 property.value。
    // const count = ref(0);
    // const double = computed(() => {
    //   return count.value * 2;
    // });
    // const increase = () => {
    //   count.value++;
    // };

    // reactive：
    const data: DataProps = reactive({
      count: 0,
      increase: () => {
        data.count++;
      },
      double: computed(() => data.count * 2),
      numbers: [0, 1, 2],
      person: { name: "axiaoha" },
    });
    const { x, y, data: data1 } = useMousePosition();
    // const { result, loading, loaded } = useURLLoader<DogResult>(
    //   "https://dog.ceo/api/breeds/image/random"
    // );
    const { result, loading, loaded } = useURLLoader<CatResult[]>(
      "https://api.thecatapi.com/v1/images/search?limit=1"
    );
    console.log("data1", data1);
    const greetings = ref("");
    const updateGreeting = () => {
      greetings.value += "Hello!";
    };
    watch([greetings, data, () => data.count], (newVal, oldVal) => {
      console.log("new:", newVal);
      console.log("old:", oldVal);
      document.title = "update" + greetings.value + data.count;
    });
    watch(result, () => {
      // 需要做到运行时检查类型，需要用到泛型
      if (result.value) {
        // console.log(result.value.message);
        console.log(result.value[0].url);
      }
    });
    // 响应式对象，vue2使用的Object.defineProperty（对于已经创建的实例，Vue 不允许动态添加根级别的响应式 property。但是，可以使用 Vue.set(object, propertyName, value) 方法向嵌套对象添加响应式 property），
    // 而vue3使用的Proxy，解决了vue2的上述问题，完美支持对象和数据的修改操作
    data.numbers[0] = 5;
    data.person.name = "zerobeak";
    const refData = toRefs(data);
    const modalIsOpen = ref(false);
    const openModal = () => {
      modalIsOpen.value = true;
    };
    const onModalClose = () => {
      modalIsOpen.value = false;
    };
    return {
      // ---ref---
      // count,
      // double,
      // increase,

      // ---reactive---
      // data,
      // 因为 props 是响应式的，不能使用 ES6 解构(解构出来的内容就是普通的数据，只有响应式的数据在模板中的表现才是响应式的)，这会消除 prop 的响应性。视图渲染的数据不会根据操作而产生变化
      // ...data,
      // count: data.count,
      // double: data.double,
      // increase: data.increase,
      ...refData,
      greetings,
      updateGreeting,
      x,
      y,
      data1,
      result,
      loading,
      loaded,
      modalIsOpen,
      openModal,
      onModalClose,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
