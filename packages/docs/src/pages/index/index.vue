<template>
  <view class="index">
    <Popover />
    <Rate />
    <Loading />
  </view>
</template>

<script setup>
import { ref } from 'vue'
import './index.less'
import Popover from '../components/popover.vue'
import Rate from '../components/rate.vue'
import Loading from '../components/loading.vue'
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
