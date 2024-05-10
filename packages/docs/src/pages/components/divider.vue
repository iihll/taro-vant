<script lang='ts' setup>
import { Divider } from 'taro-vant'
</script>

<template>
  <Divider dashed></Divider>
  <Divider dashed>文本</Divider>
  <Divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
    文本
  </Divider>
  <Divider vertical />
  文本
  <Divider
    vertical
    dashed
  />
  文本
  <Divider
    vertical
    :hairline="false"
  />
  文本
  <Divider
    vertical
    :style="{ borderColor: '#1989fa' }"
  />
</template>
