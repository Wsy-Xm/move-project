<template>
  <div class="box">
    <div class="home">
      <van-nav-bar title="首页" left-arrow fixed/>
      <van-tabs v-model="active">
        <van-tab title="推荐">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <van-cell v-for="item in list" :key="item" :title="item" />
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="热门话题">内容 2</van-tab>
        <van-tab title="科技动态">内容 3</van-tab>
        <van-tab title="区块链">内容 4</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHome',
  data () {
    return {
      active: 0,
      count: 0,
      isLoading: false,
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 1000)
    },
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    }
  }
}
</script>

<style lang="less">
.van-tabs--line {
  margin-top: 92px;
}
.van-tabs__content {
  margin-top: 8px;
}
</style>
