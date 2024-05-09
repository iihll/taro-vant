<script lang="ts" setup>
import { Swipe, SwipeItem } from 'taro-vant'
</script>

<template>
  <view class="index">
    <Swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <SwipeItem>1</SwipeItem>
      <SwipeItem>2</SwipeItem>
      <SwipeItem>3</SwipeItem>
      <SwipeItem>4</SwipeItem>
    </Swipe>
  </view>
</template>

<style>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 40px;
  line-height: 300px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
