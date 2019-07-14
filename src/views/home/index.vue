<template>
  <div class="home">
    <!-- head顶部 -->
    <van-nav-bar title="首页" left-arrow fixed />
    <!-- 顶部tab切换 -->
    <van-tabs v-model="active">
      <div slot="nav-right" class="bread" @click="isChannelShow = true">
        <van-icon name="wap-nav" />
      </div>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <van-pull-refresh v-model="channelsActive.downPullLoading" @refresh="onRefresh">
          <van-list
            v-model="channelsActive.upPullLoading"
            :finished="channelsActive.upPullFinished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell v-for="articleItem in channelsActive.article" :key="articleItem.art_id">
              <div>{{articleItem.title}}</div>
              <template v-if="articleItem.cover.images.length !== 0">
                <van-image
                  width="100"
                  height="100"
                  v-for="(imgItem,index) in articleItem.cover.images"
                  :key="index"
                  :src="imgItem"
                >
                  <template v-slot:error>加载失败</template>
                </van-image>
              </template>
              <div class="boxArticletext">
                <div class="articletext">
                  <!-- 作者 -->
                  <span>{{articleItem.aut_name}}</span>
                  <!-- 评论数量 -->
                  <span>{{articleItem.comm_count + '评论'}}</span>
                  <!-- 时间 -->
                  <span>{{articleItem.pubdate | dateTime}}</span>
                </div>
                <!-- 反馈图标按钮 -->
                <div>
                  <van-icon name="cross" @click="feedbackIsSShow = true" />
                </div>
              </div>
              <div></div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!-- 引入组件 -->
    <!-- 这个相当于下面的 v-model="isChannelShow" 复杂写法 -->
    <!-- <channel :value="isChannelShow" @input="ff"></channel> -->

    <!-- :active.sync="active" -->
    <!-- 相当于下面的两个的缩写 -->
    <!-- @update:active="active = $event" -->
    <!-- :active="active" -->
    <!-- 频道管理组件 -->
    <channel v-model="isChannelShow" :channels="channels" :active.sync="active"></channel>

    <!-- 反馈组件 -->
    <feedbackContent v-model="feedbackIsSShow"></feedbackContent>
  </div>
</template>

<script>
// 用户频道列表
import { getUserChannels } from '@/api/channels'
// 频道新闻推荐
import { getArticle } from '@/api/article'
/**
 * 加载组件
 */
// 频道组件
import channel from './components/channel'
// 反馈弹框组件
import feedbackContent from './components/feedbackContent'

// 把封装的本地存储全部引进来
import * as auth from '@/utils/auth'

export default {
  name: 'AppHome',
  components: {
    channel,
    feedbackContent
  },
  data() {
    return {
      active: 0, // tab切换默认
      channels: [], // 用户频道列表
      isChannelShow: false, // 控制弹出层
      feedbackIsSShow: false // 控制反馈的弹出框
    }
  },
  watch: {
    // 监听用户是否登陆
    async '$store.state.user'() {
      this.loadChannels()
      this.upPullLoading = true
      await this.onLoad()
      this.upPullLoading = true
      await this.onLoad()
    }
  },
  computed: {
    // 获取当前选中的列表页
    channelsActive() {
      return this.channels[this.active]
    }
  },
  created() {
    // 加载用户频道列表
    this.loadChannels()
  },
  methods: {
    // 下拉刷新
    async onRefresh() {
      await this.$sleep(800)
      const { channelsActive } = this
      // 记录上次的时间戳 如果没有最新的数据还是加载上次的时间戳
      const timestamp = channelsActive.timestamp
      // 获取最新的时间戳
      channelsActive.timestamp = Date.now()
      // 加载文章
      let data = []
      data = await this.loadArticles()
      // console.log(data)
      // 判断是否有最新的数据
      if (data.results.length === 0) {
        channelsActive.timestamp = timestamp
        data = await this.loadArticles()
        // console.log(data)
        this.onLoad()
      }
      // console.log(data)
      channelsActive.article = data.results
      channelsActive.downPullLoading = false
      this.$toast('刷新成功')
    },
    // 上拉加载
    async onLoad() {
      // 控制下拉每次延迟800毫秒
      await this.$sleep(800)
      // console.log('下拉加载成功')
      let data = [] // 获取文章
      // 调用文章列表
      data = await this.loadArticles()
      // console.log(data)

      // 判断数据是否加载完毕
      if (!data.pre_timestamp && !data.results.length) {
        // 加载完成
        this.channelsActive.upPullFinished = true
        // loading取消
        this.channelsActive.upPullLoading = false
        return
      }

      // 判断时候有新的数据
      if (data.pre_timestamp && !data.results.length) {
        this.channelsActive.timestamp = data.pre_timestamp
        // 加载下一页数据
        data = await this.loadArticles()
      }
      // 显示成功以后记录下一次的时间戳
      this.channelsActive.timestamp = data.pre_timestamp
      // 将数据更新到文章频道中
      this.channelsActive.article.push(...data.results)
      this.channelsActive.upPullLoading = false
      // console.log(data)
    },
    // 加载用户频道列表
    async loadChannels() {
      // 接收容器token值
      let channels = []
      const { user } = this.$store.state
      // console.log(user)
      // 判断用户是否登陆
      if (user) {
        // console.log('登陆了')
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
        // console.log('没登陆')
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
      }
      channels.forEach(item => {
        item.article = [] // 用来存储当前文章列表
        item.timestamp = Date.now() // 用来存储下一次的时间戳
        item.downPullLoading = false // 控制当前频道的下拉刷新Loading状态
        item.upPullLoading = false // 控制当前频道的上拉加载更多Loading状态
        item.upPullFinished = false // 控制列表是否加载完成
      })
      // 加载出来的列表给channels循环
      this.channels = channels
      // console.log(this.channels)
      // console.log(this.channelsActive.article)
    },
    // 加载文章
    async loadArticles() {
      try {
        const { id: channelId, timestamp } = this.channelsActive
        const data = await getArticle({
          channelId, // 频道ID
          timestamp,
          withTop: 1 // 是否包含置顶 0 否 1 是
        })
        return data
      } catch (err) {
        console.log(err)
        console.log('文章加载失败')
      }
    }
  }
}
</script>

<style lang="less">
.van-tabs--line {
  margin-top: 92px;
}
.van-tabs /deep/ .van-tabs__wrap {
  position: fixed;
  margin-top: 92px;
}
.bread {
  position: fixed;
  right: 0;
  top: 110px;
  background: #fff;
  width: 64px;
  .van-icon {
    display: flex;
    justify-content: center;
  }
}
.van-tabs__nav:last-of-type {
  margin-right: 50px;
}
.articletext {
  font-size: 12px;
  color: #ccc;
  span {
    margin-left: 15px;
  }
}
.boxArticletext {
  display: flex;
  justify-content: space-between;
}
</style>
