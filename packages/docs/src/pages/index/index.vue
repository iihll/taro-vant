<template>
  <view class="index">
    <van-button type="primary" text="显示遮罩层" @click="show = true" />
    <van-overlay :show="show" @click="show = false" />
  </view>
</template>

<script lang="ts" setup>
import VanButton from '@/components/button/Button'
import VanOverlay from '@/components/overlay/Overlay'
import { ref } from 'vue';

const show = ref(false);
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
