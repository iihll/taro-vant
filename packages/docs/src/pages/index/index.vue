<script lang="ts" setup>
import { VanButton, VanCellGroup, VanField, VanForm } from 'taro-vant'
import { ref } from 'vue'
import { View } from '@tarojs/components'

const username = ref('')
const password = ref('')
function onSubmit(values) {
  console.log('submit', values)
}
</script>

<template>
  <view class="index">
    <VanForm @submit="onSubmit">
      <VanCellGroup inset>
        <VanField
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <VanField
          v-model="password"
          type="safe-password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </VanCellGroup>
      <View style="margin: 16px;">
        <VanButton round block type="primary">
          提交
        </VanButton>
      </View>
    </VanForm>
  </view>
</template>

<style>
.index {
  height: 200vh;
}
</style>
