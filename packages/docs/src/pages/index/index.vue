<template>
  <view class="index">
    <text>{{ msg }}</text>
    <VantButton type="primary">test</VantButton>
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
