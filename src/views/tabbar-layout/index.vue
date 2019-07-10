<template>
  <div class="box">
    <router-view></router-view>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/">标签</van-tabbar-item>
      <van-tabbar-item icon="search" to="/">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'tabbar-layout',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less">
.van-tabs__content{
    margin-bottom: 100px;
}
</style>
