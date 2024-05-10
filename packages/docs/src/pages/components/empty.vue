<script lang='ts' setup>
import { Empty as VanEmpty, VanButton } from 'taro-vant'
</script>

<template>
  <VanEmpty description="默认" />
  <VanEmpty
    image="network"
    description="网络"
  />
  <VanEmpty
    image="search"
    description="搜索"
  />
  <VanEmpty
    image="error"
    description="error"
  />
  <VanEmpty
    image-size="100"
    description="描述文字"
  />
  <VanEmpty description="描述文字">
    <VanButton
      round
      type="primary"
      class="bottom-button"
    >
      按钮
    </VanButton>
  </VanEmpty>
</template>
