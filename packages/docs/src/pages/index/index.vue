<template>
  <view class="index">
    <van-swipe-cell>
      <template #left>
        <van-button square type="primary" text="选择" />
      </template>
      <van-cell :border="false" title="单元格" value="内容" />
      <template #right>
        <van-button square type="danger" text="删除" />
        <van-button square type="primary" text="收藏" />
      </template>
    </van-swipe-cell>
  </view>
</template>

<script lang="ts" setup>
import VanSwipeCell from '@/components/swipe-cell/SwipeCell'
import VanButton from '@/components/button/Button'
import VanCell from '@/components/cell/Cell'
</script>

<style>
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 40px;
    line-height: 300px;
    text-align: center;
    background-color: #39a9ed;
  }
</style>
