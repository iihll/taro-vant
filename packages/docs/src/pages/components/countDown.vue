<script lang='ts' setup>
import { ref } from 'vue'
import { CountDown, Button as VanButton } from 'taro-vant'

const time1 = 30 * 60 * 60 * 1000
const time2 = ref(30 * 60 * 60 * 1000)

const countDown = ref<InstanceType<typeof CountDown>>()

function start() {
  countDown.value && countDown.value.start()
}
function pause() {
  countDown.value && countDown.value.pause()
}
function reset() {
  countDown.value && countDown.value.reset()
}
function onFinish() { }
</script>

<template>
  <CountDown :time="time1" />
  <CountDown
    :time="time1"
    format="HH:mm:ss:SS"
    millisecond
  />
  <CountDown
    :time="time1"
    format="DD 天 HH 时 mm 分 ss 秒"
  />
  <CountDown :time="time1">
    <template #default="data">
      <text class="block">
        {{ data.hours }}
      </text>
      <text class="colon">
        :
      </text>
      <text class="block">
        {{ data.minutes }}
      </text>
      <text class="colon">
        :
      </text>
      <text class="block">
        {{ data.seconds }}
      </text>
    </template>
  </CountDown>
  <CountDown
    ref="countDown"
    millisecond
    :time="time2"
    :auto-start="false"
    format="HH:mm:ss:SS"
    @finish="onFinish"
  />

  <VanButton
    icon="play-circle-o"
    @click="start"
  >
    开始
  </VanButton>
  <VanButton
    icon="pause-circle-o"
    @click="pause"
  >
    暂停
  </VanButton>
  <VanButton @click="reset">
    重置
  </VanButton>
</template>
