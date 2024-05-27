<script lang='ts' setup>
import { VanButton, VanProgress } from 'taro-vant'
import { ref } from 'vue'

const percentage = ref(50)

function add() {
  percentage.value <= 100 && (percentage.value += 10)
}

function subtract() {
  percentage.value > 0 && (percentage.value -= 10)
}
</script>

<template>
  <view :style="{ padding: '30px' }">
    <VanProgress class="vanprogress" :percentage="50" />
    <VanProgress class="vanprogress" :percentage="50" stroke-width="8" />
    <VanProgress class="vanprogress" inactive :percentage="50" />

    <VanProgress class="vanprogress" pivot-text="橙色" color="#f2826a" :percentage="25" />
    <VanProgress class="vanprogress" pivot-text="红色" color="#ee0a24" :percentage="50" />
    <VanProgress
      class="vanprogress"
      :percentage="percentage"
      pivot-text="紫色"
      pivot-color="#7232dd"
      color="linear-gradient(to right, #be99ff, #7232dd)"
    />
    <VanButton @click="add">
      增加
    </VanButton>
    <VanButton @click="subtract">
      减少
    </VanButton>
  </view>
</template>

<style>
  .vanprogress {
    margin-bottom: 50px
  }
</style>
