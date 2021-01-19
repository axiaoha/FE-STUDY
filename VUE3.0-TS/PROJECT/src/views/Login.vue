<template>
  <div class="login-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">登录</h5>
    <ValidateForm @submit-form="onSubmitForm">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <ValidateInput
          :rules="emailRules"
          v-model="emailVal"
          placeholder="请输入邮箱地址"
          type="text"
        ></ValidateInput>
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <ValidateInput
          :rules="passwordRules"
          v-model="passwordVal"
          placeholder="请输入密码"
          type="password"
        ></ValidateInput>
      </div>
      <template #submit>
        <span class="btn btn-primary">Submit</span>
      </template>
    </ValidateForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
// 定义路由的一系列行为
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'

export default defineComponent({
  name: 'Login',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    console.log('store', useStore)
    const store = useStore<GlobalDataProps>()
    const router = useRouter()
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]
    const emailVal = ref('')
    const passwordVal = ref('')
    const onSubmitForm = (res: boolean) => {
      console.log('res', res)
      if (res) {
        router.push('/')
        store.commit('login')
      }
    }
    return {
      emailRules,
      emailVal,
      passwordRules,
      passwordVal,
      onSubmitForm
    }
  }
})
</script>
