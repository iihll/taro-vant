<template>
  <VanButton
    icon="play-circle-o"
    @click="showPopup"
  >
    开始
  </VanButton>
  <VanPopup
    v-model:show="show"
    :style="{ padding: '64px' }"
  >内容</VanPopup>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
import { VanPopup, VanButton } from 'taro-vant'
const show = ref(false)
const showPopup = () => {
  console.log('123')

  show.value = true
};

</script>