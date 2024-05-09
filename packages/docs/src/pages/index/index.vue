<script lang="ts" setup>
import { VanTag } from 'taro-vant'
</script>

<template>
  <view class="index">
    <VanTag type="primary">
      标签
    </VanTag>
    <VanTag type="success">
      标签
    </VanTag>
    <VanTag type="danger">
      标签
    </VanTag>
    <VanTag type="warning">
      标签
    </VanTag>
  </view>
</template>

<style>
.index {
  height: 200vh;
}
</style>
