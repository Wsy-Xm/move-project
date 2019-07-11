<template>
  <div class="box">
    <!-- 入口 -->
    <router-view></router-view>
    <!-- 首页底部 -->
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
      active: 0 // 底部默认选项
    }
  }
}
</script>

<style lang="less">
.van-tabs__content{
    margin-bottom: 100px;
}
</style>
