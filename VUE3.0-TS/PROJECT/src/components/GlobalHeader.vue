<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <a class="navbar-brand" href="#">专栏</a>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <RouterLink to="/login" class="btn btn-outline-light my-2"
          >登陆</RouterLink
        >
      </li>
      <li class="list-inline-item">
        <RouterLink to="/signup" class="btn btn-outline-light my-2"
          >注册</RouterLink
        >
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <DropDown :title="`你好 ${user.name}`">
          <DropDownItem>
            <RouterLink to="/create" class="dropdown-item">新建文章</RouterLink>
          </DropDownItem>
          <DropDownItem>
            <a href="#" class="dropdown-item">编辑资料 </a>
          </DropDownItem>
          <DropDownItem>
            <a href="#" class="dropdown-item">退出登陆 </a>
          </DropDownItem>
        </DropDown>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import DropDown from './DropDown.vue'
import DropDownItem from './DropDownItem.vue'

export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}
export default defineComponent({
  name: 'GlobalHeader',
  components: { DropDown, DropDownItem },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  }
})
</script>
