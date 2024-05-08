<template>
  <view class="index">
    <van-tabs>
      <van-tab title="标签 1">
        内容 1
        <template #title>slot title</template>
      </van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
  </view>
</template>

<script lang="ts" setup>
import VanTabs from '@/components/tabs/Tabs'
import VanTab from '@/components/tab/Tab'
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
