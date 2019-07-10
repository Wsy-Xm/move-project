<template>
  <div class="box">
    <!-- <van-nav-bar> -->
    <!-- <van-icon name="search" slot="right" /> -->

    <!-- </van-nav-bar> -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-search placeholder="请输入搜索关键词" v-model="value" />
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: 'AppHome',
  data () {
    return {
      value: '',
      isLoading: false
    }
  },
  created () {

  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 500)
    }
  }
}
</script>

<style lang="less">
.box,
.van-pull-refresh,
.van-pull-refresh__track {
  height: 100%;
}
.van-search {
  background: #3296fa !important;
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
