<template>
  <form action="" class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'
type ValidateFunc = () => boolean
export const emitter = mitt()
export default defineComponent({
  name: 'ValidateForm',
  emits: ['submit-form'],
  setup (props, context) {
    let funcArr: ValidateFunc[] = []
    const submitForm = () => {
      const result = funcArr
        .map(func => {
          return func()
        })
        .every(res => res)
      context.emit('submit-form', result)
    }
    const callback = (func: ValidateFunc = () => false) => {
      funcArr.push(func)
    }
    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
      funcArr = []
    })
    return {
      submitForm
    }
  }
})
</script>
