<script lang="ts" setup>
import { Cascader } from 'taro-vant'
import { View } from '@tarojs/components'
import { ref } from 'vue'

const cascaderValue = ref('')
// 选项列表，children 代表子选项，支持多级嵌套
const options = [
  {
    text: '浙江省',
    value: '330000',
    children: [{ text: '杭州市', value: '330100' }],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [{ text: '南京市', value: '320100' }],
  },
]
// 全部选项选择完毕后，会触发 finish 事件
function onFinish({ selectedOptions }) {
  console.log('selectedOptions', selectedOptions)
}
</script>

<template>
  <View class="index">
    <Cascader
      v-model="cascaderValue"
      title="请选择所在地区"
      :options="options"
      @finish="onFinish"
    />
  </View>
</template>

<style>
.index {
  height: 200vh;
}
</style>
