<template>
  <view>nomorl</view>
  <VanImage
    width="100"
    height="100"
    src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
  />
  <view>aspectFill</view>
  <VanImage
    width="10rem"
    height="10rem"
    fit="aspectFill"
    src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
  />
  <view>aspectFit</view>
  <VanImage
    width="10rem"
    height="10rem"
    fit="aspectFit"
    src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
  />
  <view>round</view>
  <VanImage
    round
    width="10rem"
    height="10rem"
    src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
  />
  <view>loading</view>
  <VanImage
    width="10rem"
    height="10rem"
  >
    <template v-slot:loading>
      <Loading
        type="spinner"
        size="20"
      />
    </template>
  </VanImage>
  <view>error</view>
  <VanImage
    width="10rem"
    height="10rem"
    src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg1"
  >
    <template v-slot:error>加载失败</template>
  </VanImage>
</template>

<script lang='ts' setup>
import { Image as VanImage, Loading } from 'taro-vant'
</script>