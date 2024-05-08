<template>
  <view class="index">
    <Popover />
    <Rate />
    <text>{{ msg }}</text>
    <VantButton
      icon="plus"
      square
      type="primary"
      @click="click"
    >方形按钮</VantButton>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import './index.less'
import VantButton from '../../components/button/Button'
import VantIcon from '../../components/icon/Icon'
import Popover from '../components/popover.vue'
import Rate from '../components/rate.vue'

const msg = ref('Hello world')
</script>
