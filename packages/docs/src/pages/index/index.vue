<script lang="ts" setup>
import { Cascader } from 'taro-vant'
import { View } from '@tarojs/components'
</script>

<template>
  <View class="index">
    <Cascader switch-mode="year-month" />
  </View>
</template>

<style>
.index {
  height: 200vh;
}
</style>
