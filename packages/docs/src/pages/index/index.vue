<template>
  <view class="index">
    <text>{{ msg }}</text>
    <VantButton icon="plus" square type="primary">方形按钮</VantButton>
    <VantButton icon="https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png" round type="success">圆形按钮</VantButton>
  </view>
</template>

<script>
import { ref } from 'vue'
import './index.less'
import VantButton from '../../components/button/Button'

export default {
  components: { VantButton },
  setup () {
    const msg = ref('Hello world')
    return {
      msg
    }
  }
}
</script>
