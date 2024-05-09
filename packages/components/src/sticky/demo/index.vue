<script setup lang="ts">
import { ref } from 'vue'
import VanSticky from '..'
import VanButton from '../../button'
import { useTranslate } from '../../../docs/site'

const t = useTranslate({
  'zh-CN': {
    offsetTop: '吸顶距离',
    offsetBottom: '吸底距离',
    setContainer: '指定容器',
  },
  'en-US': {
    offsetTop: 'Offset Top',
    offsetBottom: 'Offset Bottom',
    setContainer: 'Set Container',
  },
})

const container = ref<Element>()
</script>

<template>
  <demo-block :title="t('basicUsage')">
    <VanSticky>
      <VanButton type="primary" style="margin-left: 15px">
        {{ t('basicUsage') }}
      </VanButton>
    </VanSticky>
  </demo-block>

  <demo-block :title="t('offsetTop')">
    <VanSticky :offset-top="50">
      <VanButton type="primary" style="margin-left: 115px">
        {{ t('offsetTop') }}
      </VanButton>
    </VanSticky>
  </demo-block>

  <demo-block :title="t('setContainer')">
    <div
      ref="container"
      style="height: 150px; background-color: var(--van-background-2)"
    >
      <VanSticky :container="container">
        <VanButton type="warning" style="margin-left: 215px">
          {{ t('setContainer') }}
        </VanButton>
      </VanSticky>
    </div>
  </demo-block>

  <demo-block :title="t('offsetBottom')">
    <div style="height: 200px" />
    <VanSticky :offset-bottom="50" position="bottom">
      <VanButton type="primary" style="margin-left: 15px">
        {{ t('offsetBottom') }}
      </VanButton>
    </VanSticky>
  </demo-block>
</template>

<style lang="less">
.demo-sticky {
  height: 200vh;

  .van-button {
    margin-left: var(--van-padding-md);
  }
}
</style>
