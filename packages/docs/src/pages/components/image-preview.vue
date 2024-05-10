<template>
  <view id="image-preview-box">
    <VanButton @click="showPopup">
      组件方式调用
    </VanButton>
    <VanButton @click="showApiPopup">
      api方式调用
    </VanButton>
    <VanImagePreview
      v-model:show="show"
      :images="images"
      @change="onChange"
    >
      <template v-slot:index>第{{ index + 1 }}页</template>
    </VanImagePreview>
  </view>
</template>

<script lang='ts' setup>
import { showImagePreview, VanImagePreview, VanButton } from 'taro-vant'
import { ref } from 'vue'

const show = ref(false)
const index = ref(0)
const images = [
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
]
const onChange = (newIndex) => {
  index.value = newIndex
}

const showPopup = () => {
  show.value = true
}
const showApiPopup = () => {
  showImagePreview({ teleport: '#image-preview-box', images: ['https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg'] })
}
</script>