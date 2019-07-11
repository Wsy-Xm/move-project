<template>
  <div class="home">
    <!-- head顶部 -->
    <van-nav-bar title="首页" left-arrow fixed />
    <!-- 顶部tab切换 -->
    <van-tabs v-model="active">
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item" :title="item" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channels'

// 把封装的本地存储全部引进来
import * as auth from '@/utils/auth'

export default {
  name: 'AppHome',
  data () {
    return {
      active: 0, // tab切换默认
      // 刷新
      count: 0,
      isLoading: false,
      list: [],
      loading: false,
      finished: false,
      // 刷新
      channels: [] // 用户频道列表
    }
  },
  created () {
    // 加载用户频道列表
    this.loadChannels()
  },
  mounted () {},
  methods: {
    // 上拉刷新
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 1000)
    },
    // 下拉加载
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
    },
    // 加载用户频道列表
    async loadChannels () {
      // 接收容器token值
      let channels = []
      const { user } = this.$store.state
      // console.log(user)
      // 判断用户是否登陆
      if (user) {
        // console.log(getUserChannels)
        try {
          const data = await getUserChannels()
          // console.log(data)
          channels = data.channels
        } catch (err) {
          console.log(err)
          console.log('获取用户频道列表失败')
        }
      } else {
        // 查询时候有自己设置标签
        // 如果用户没有登陆判断用户时候本地存储有数据
        const loadChannels = auth.getUser('channels')
        if (loadChannels) {
          channels = loadChannels
        } else {
          try {
            const data = await getUserChannels()
            // console.log(data)
            channels = data.channels
            // console.log(channels)
          } catch (err) {
            console.log(err)
            console.log('获取用户频道列表失败')
          }
        }
        // 加载出来的列表给channels循环
        this.channels = channels
      }
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
