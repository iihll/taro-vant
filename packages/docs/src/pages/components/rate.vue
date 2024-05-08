<script lang='ts' setup>
import { Rate } from '../../components/index'
import { ref } from 'vue'

const value = ref(3)
const value1 = ref(3)
const value2 = ref(3)
const value3 = ref(3)
</script>

<template>
  <view>
    <Rate v-model="value" />
  </view>
  <view>
    <Rate
      v-model="value1"
      icon="like"
      void-icon="like-o"
    />
  </view>
  <view>
    <Rate
      v-model="value2"
      :size="25"
      color="#ffd21e"
      void-icon="star"
      void-color="#eee"
    />
  </view>
  <view>
    <Rate
      v-model="value3"
      allow-half
    />
  </view>

</template>

<style></style>
