<script lang='ts' setup>
import { VanRollingText } from 'taro-vant'
</script>

<template>
  <VanRollingText
    class="my-rolling-text"
    :height="54"
    :start-num="12345"
    :target-num="54321"
  />
</template>
