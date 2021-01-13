<template>
  <img :src="result && result.message" />
</template>
<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
export default defineComponent({
  async setup() {
    // const { data } = await axios.get("https://dog.ceo/api/breeds/image/random");
    const { data } = await axios.get("https://dog.ceo/api/breeds/image");
    return {
      result: data,
    };
  },
});
</script>
