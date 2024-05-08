<script lang='ts' setup>
import { Loading } from '../../components/index'
</script>

<template>
  <View class="flex">
    <Loading />
    <Loading type="spinner" />
    <Loading color="#1989fa" />
    <Loading
      type="spinner"
      color="#1989fa"
    />
    <Loading size="24" />
    <Loading
      type="spinner"
      size="24px"
    />
  </View>
</template>

<style>
.flex {
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
