<script lang='ts' setup>
import { ref } from 'vue'
import { VanButton, VanStep, VanSteps } from 'taro-vant'

const active = ref(1)

function next() {
  if (active.value === 3)
    active.value = 0
  else
    active.value += 1
}
</script>

<template>
  <VanButton @click="next">
    下一步
  </VanButton>
  <VanSteps :active="active">
    <VanStep>买家下单</VanStep>
    <VanStep>商家接单</VanStep>
    <VanStep>买家提货</VanStep>
    <VanStep>交易完成</VanStep>
  </VanSteps>
  <VanSteps :active="active" active-icon="success" active-color="#07c160">
    <VanStep>商家接单</VanStep>
    <VanStep>买家下单</VanStep>
    <VanStep>商家接单</VanStep>
    <VanStep>买家提货</VanStep>
    <VanStep>交易完成</VanStep>
  </VanSteps>
  <VanSteps direction="vertical" :active="active">
    <VanStep>
      <view>【城市】物流状态1</view>
      <view>2016-07-12 12:40</view>
    </VanStep>
    <VanStep>
      <view>【城市】物流状态2</view>
      <view>2016-07-11 10:00</view>
    </VanStep>
    <VanStep>
      <view>快件已发货</view>
      <view>2016-07-10 09:30</view>
    </VanStep>
  </VanSteps>
</template>
