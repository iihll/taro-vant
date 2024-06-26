<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useCascaderAreaData } from '@vant/area-data'
import VanField from '../../field'
import VanPopup from '../../popup'
import type { CascaderOption } from '..'
import VanCascader from '..'
import { useTranslate } from '../../../docs/site'
import { deepClone } from '../../utils/deep-clone'
import { useCurrentLang } from '../../locale'
import { closeToast, showLoadingToast } from '../../toast'
import type { Numeric } from '../../utils'
import zhCNOptions from './area-zh-CN'
import enUSOptions from './area-en-US'

const lang = useCurrentLang()

const cascaderAreaData = useCascaderAreaData()

const t = useTranslate({
  'zh-CN': {
    area: '地区',
    options: zhCNOptions,
    selectArea: '请选择地区',
    customColor: '自定义颜色',
    asyncOptions: '异步加载选项',
    asyncOptions1: [
      {
        text: '浙江省',
        value: '330000',
        children: [],
      },
    ],
    asyncOptions2: [
      { text: '杭州市', value: '330100' },
      { text: '宁波市', value: '330200' },
    ],
    currentLevel: (level: number) => `当前为第 ${level} 级`,
    chinaAreaData: '中国省市区数据',
    customContent: '自定义选项上方内容',
    customFieldNames: '自定义字段名',
  },
  'en-US': {
    area: 'Area',
    options: enUSOptions,
    selectArea: 'Select Area',
    customColor: 'Custom Color',
    asyncOptions: 'Async Options',
    asyncOptions1: [
      {
        text: 'Zhejiang',
        value: '330000',
        children: [],
      },
    ],
    asyncOptions2: [
      { text: 'Hangzhou', value: '330100' },
      { text: 'Ningbo', value: '330200' },
    ],
    currentLevel: (level: number) => `Current level is ${level}`,
    chinaAreaData: 'China Area Data',
    customContent: 'Custom Content',
    customFieldNames: 'Custom Field Names',
  },
})

interface StateItem {
  show: boolean
  value: Numeric | undefined
  result: string
  options?: CascaderOption[]
  tabIndex?: number
}

const baseState = reactive<StateItem>({
  show: false,
  value: '',
  result: '',
})
const chinaAreaDataState = reactive<StateItem>({
  show: false,
  value: '',
  result: '',
})
const customColorState = reactive<StateItem>({
  show: false,
  value: undefined,
  result: '',
})
const asyncState = reactive<StateItem>({
  show: false,
  value: undefined,
  result: '',
  options: t('asyncOptions1'),
})
const customFieldState = reactive<StateItem>({
  show: false,
  value: undefined,
  result: '',
})

const fieldNames = {
  text: 'name',
  value: 'code',
  children: 'items',
}

const customContentState = reactive<StateItem>({
  show: false,
  value: undefined,
  result: '',
})

const customFieldOptions = computed(() => {
  const options = deepClone(t('options'))
  const adjustFieldName = (item: CascaderOption) => {
    if ('text' in item) {
      item.name = item.text
      delete item.text
    }
    if ('value' in item) {
      item.code = item.value
      delete item.value
    }
    if ('children' in item) {
      item.items = item.children
      delete item.children
      item.items.forEach(adjustFieldName)
    }
  }
  options.forEach(adjustFieldName)
  return options
})

function loadDynamicOptions({ value }: CascaderOption) {
  if (value === '330000' && asyncState.options![0].children?.length === 0) {
    showLoadingToast(t('loading'))
    setTimeout(() => {
      asyncState.options![0].children = t('asyncOptions2')
      closeToast()
    }, 1000)
  }
}

function onFinish(state: StateItem,
  {
    value,
    selectedOptions,
  }: { value: Numeric; selectedOptions: CascaderOption[] }) {
  const result = selectedOptions
    .map(option => option.text || option.name)
    .join('/')

  state.show = false
  state.value = value
  state.result = result
}
</script>

<template>
  <demo-block card :title="t('basicUsage')">
    <VanField
      v-model="baseState.result"
      is-link
      readonly
      :label="t('area')"
      :placeholder="t('selectArea')"
      @click="baseState.show = true"
    />
    <VanPopup
      v-model:show="baseState.show"
      round
      teleport="body"
      position="bottom"
    >
      <VanCascader
        v-model="baseState.value"
        :title="t('selectArea')"
        :options="t('options')"
        @close="baseState.show = false"
        @finish="onFinish(baseState, $event)"
      />
    </VanPopup>
  </demo-block>

  <demo-block v-if="lang === 'zh-CN'" card :title="t('chinaAreaData')">
    <VanField
      v-model="chinaAreaDataState.result"
      is-link
      readonly
      :label="t('area')"
      :placeholder="t('selectArea')"
      @click="chinaAreaDataState.show = true"
    />
    <VanPopup
      v-model:show="chinaAreaDataState.show"
      round
      teleport="body"
      position="bottom"
    >
      <VanCascader
        v-model="chinaAreaDataState.value"
        :title="t('selectArea')"
        :options="cascaderAreaData"
        @close="chinaAreaDataState.show = false"
        @finish="onFinish(chinaAreaDataState, $event)"
      />
    </VanPopup>
  </demo-block>

  <demo-block card :title="t('customColor')">
    <VanField
      v-model="customColorState.result"
      is-link
      readonly
      :label="t('area')"
      :placeholder="t('selectArea')"
      @click="customColorState.show = true"
    />
    <VanPopup
      v-model:show="customColorState.show"
      round
      teleport="body"
      position="bottom"
    >
      <VanCascader
        v-model="customColorState.value"
        :title="t('selectArea')"
        :options="t('options')"
        active-color="#ee0a24"
        @close="customColorState.show = false"
        @finish="onFinish(customColorState, $event)"
      />
    </VanPopup>
  </demo-block>

  <demo-block card :title="t('asyncOptions')">
    <VanField
      v-model="asyncState.result"
      is-link
      readonly
      :label="t('area')"
      :placeholder="t('selectArea')"
      @click="asyncState.show = true"
    />
    <VanPopup
      v-model:show="asyncState.show"
      round
      teleport="body"
      position="bottom"
    >
      <VanCascader
        v-model="asyncState.value"
        :title="t('selectArea')"
        :options="asyncState.options"
        @close="asyncState.show = false"
        @change="loadDynamicOptions"
        @finish="onFinish(asyncState, $event)"
      />
    </VanPopup>
  </demo-block>

  <demo-block card :title="t('customFieldNames')">
    <VanField
      v-model="customFieldState.result"
      is-link
      readonly
      :label="t('area')"
      :placeholder="t('selectArea')"
      @click="customFieldState.show = true"
    />
    <VanPopup
      v-model:show="customFieldState.show"
      round
      teleport="body"
      position="bottom"
      safe-area-inset-bottom
    >
      <VanCascader
        v-model="customFieldState.value"
        :title="t('selectArea')"
        :options="customFieldOptions"
        :field-names="fieldNames"
        @close="customFieldState.show = false"
        @finish="onFinish(customFieldState, $event)"
      />
    </VanPopup>
  </demo-block>

  <demo-block card :title="t('customContent')">
    <VanField
      v-model="customContentState.result"
      is-link
      readonly
      :label="t('area')"
      :placeholder="t('selectArea')"
      @click="customContentState.show = true"
    />
    <VanPopup
      v-model:show="customContentState.show"
      round
      teleport="body"
      position="bottom"
      safe-area-inset-bottom
    >
      <VanCascader
        v-model="customContentState.value"
        :title="t('selectArea')"
        :options="customFieldOptions"
        :field-names="fieldNames"
        @close="customContentState.show = false"
        @finish="onFinish(customContentState, $event)"
      >
        <template #options-top="{ tabIndex }">
          <div class="current-level">
            {{ t('currentLevel', tabIndex + 1) }}
          </div>
        </template>
      </VanCascader>
    </VanPopup>
  </demo-block>
</template>

<style lang="less">
.current-level {
  font-size: 14px;
  padding: 16px 16px 0;
  color: var(--van-gray-6);
}
</style>
