<script lang='ts' setup>
import { Highlight } from 'taro-vant'

const text = '慢慢来，不要急，生活给你出了难题，可也终有一天会给出答案。'
const keywords = '难题'

const text1 = '慢慢来，不要急，生活给你出了难题，可也终有一天会给出答案。'
const keywords1 = ['难题', '终有一天', '答案']
</script>

<template>
  <Highlight
    :keywords="keywords"
    :source-string="text"
  />
  <Highlight
    :keywords="keywords1"
    :source-string="text1"
  />

</template>
