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
      <van-tab title="标签 5">内容 5</van-tab>
    </van-tabs>
    <van-row>
      <van-col span="8">span: 8</van-col>
      <van-col span="8">span: 8</van-col>
      <van-col span="8">span: 8</van-col>
    </van-row>

    <van-row>
      <van-col span="4">span: 4</van-col>
      <van-col span="10" offset="4">offset: 4, span: 10</van-col>
    </van-row>

    <van-row>
      <van-col offset="12" span="12">offset: 12, span: 12</van-col>
    </van-row>
  </view>
</template>

<script lang="ts" setup>
import VanTabs from '@/components/tabs/Tabs'
import VanTab from '@/components/tab/Tab'
import VanRow from '@/components/row/Row'
import VanCol from '@/components/col/Col'
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
