<script lang='ts' setup>
import { ref } from 'vue'
import { VanButton, VanSkeleton, VanSkeletonImage, VanSkeletonParagraph } from 'taro-vant'

const loading = ref(true)
</script>

<template>
  <VanSkeleton title :row="6" />
  <VanSkeleton title avatar :row="3" />

  <VanButton @click="loading = !loading">
    取反
  </VanButton>
  <VanSkeleton title avatar :row="3" :loading="loading">
    <view>实际内容</view>
  </VanSkeleton>

  <VanSkeleton :row="5" :loading="loading">
    <template #template>
      <view :style="{ display: 'flex', width: '100%' }">
        <VanSkeletonImage />
        <view :style="{ flex: 1, marginLeft: '16px' }">
          <VanSkeletonParagraph row-width="60%" />
          <VanSkeletonParagraph />
          <VanSkeletonParagraph />
          <VanSkeletonParagraph />
        </view>
      </view>
    </template>
  </VanSkeleton>
</template>
