<script lang="ts" setup>
import { Sticky, VanButton } from 'taro-vant'
</script>

<template>
  <view class="index">
    <Sticky>
      <VanButton type="primary">
        基础用法
      </VanButton>
    </Sticky>
  </view>
</template>

<style>
.index {
  height: 200vh;
}
</style>
