<template>
  <div>
    <van-nav-bar title="标题" fixed />
    <div class="headlist">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in list" :key="item" :title="item" />
      </van-list>
    </div>
  </div>
</template>

<script>
// 搜索结果
import { searchResult } from '@/api/search'

export default {
  name: 'searchLenove',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: null
    }
  },
  methods: {
    async onLoad() {
      const res = { q: this.$route.params.q }
      console.log(this.$route.params.q)
      const data = await searchResult(res)
      console.log(data)
      //   // 异步更新数据
      //   setTimeout(() => {
      //     for (let i = 0; i < 10; i++) {
      //       this.list.push(this.list.length + 1)
      //     }
      //     // 加载状态结束
      //     this.loading = false

      //     // 数据全部加载完成
      //     if (this.list.length >= 40) {
      //       this.finished = true
      //     }
      //   }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
.headlist {
  margin-top: 96px;
}
</style>
