<template>
  <div>
    <!-- 弹出层 -->
    <van-popup
      :value="value"
      @input="$emit('input',$event)"
      position="bottom"
      :style="{ height: '97%' }"
    >
      <!-- 我的频道 -->
      <div class="myChannelBox">
        <div class="headleContent">
          <div class="mychannel">
            我的频道
            <small>点击进入频道</small>
          </div>
          <van-button
            round
            type="danger"
            size="mini"
            @click="isEdit = !isEdit"
          >{{ isEdit ? '完成':'编辑' }}</van-button>
        </div>
        <van-grid :gutter="10">
          <van-grid-item
            v-for="(channelsItem,index) in channels"
            :key="channelsItem.id"
            @click="userChannels(channelsItem,index)"
          >
            <div slot="text" :class="{active:active===index}" id="fzi">
              {{ channelsItem.name }}
              <van-icon name="close" v-show="isEdit && channelsItem.name !== '推荐'" class="delicon" />
            </div>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 推荐频道 -->
      <div class="recommendChannel">
        <van-grid :gutter="10">
          <div class="recommend">
            推荐频道
            <small>点击添加频道</small>
          </div>
          <van-grid-item
            v-for="(allChannels,index) in screenChannels"
            :key="allChannels.id"
            :text="allChannels.name"
            @click="headleAddChannels(allChannels,index)"
          />
        </van-grid>
      </div>
    </van-popup>
  </div>
</template>

<script>
// 加载所有的频道列表
import { getAllChannels, amendChannels, delUserChannels } from '@/api/channels'

// 把封装的本地存储全部引进来
import * as auth from '@/utils/auth'

export default {
  name: 'channelPopup',
  props: {
    // 控制弹出层
    value: {
      type: Boolean,
      default: false
    },
    // 频道数据
    channels: {
      type: Array
    },
    // 高亮处理
    active: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      allChannels: [], // 所有的频道列表
      isEdit: false
    }
  },
  computed: {
    screenChannels() {
      const duplicates = this.channels.map(item => item.id)
      return this.allChannels.filter(item => !duplicates.includes(item.id))
    }
  },
  created() {
    // 加载所有的频道列表
    this.loadAllchannels()
  },
  methods: {
    // 加载所有的频道列表
    async loadAllchannels() {
      try {
        const data = await getAllChannels()
        data.channels.forEach(item => {
          item.article = [] // 用来存储当前文章列表
          item.timestamp = Date.now() // 用来存储下一次的时间戳
          item.downPullLoading = false // 控制当前频道的下拉刷新Loading状态
          item.upPullLoading = false // 控制当前频道的上拉加载更多Loading状态
          item.upPullFinished = false // 控制列表是否加载完成
        })
        this.allChannels = data.channels
        // console.log(data)
      } catch (err) {
        console.log(err)
        console.log('全部频道列表加载失败')
      }
    },
    // 推荐频道添加
    async headleAddChannels(item, index) {
      console.log(item)
      this.channels.push(item)
      // 判断时候是登陆状态
      const { user } = this.$store.state
      if (user) {
        const data = [{ id: item.id, seq: index }]
        await amendChannels(data)
      } else {
        // console.log(this.channels)
        auth.setUser('channels', this.channels)
      }
    },
    // 用户频道编辑
    userChannels(item, index) {
      if (this.isEdit) {
        // 编辑状态
        this.delUserChannels(item, index)
      } else {
        // 完成跳转
        this.skipChannels(item, index)
      }
    },
    async delUserChannels(item, index) {
      // console.log(item, index)
      // console.log('删除')
      if (item.name === '推荐') {
        return
      }
      const { user } = this.$store.state
      if (user) {
        await delUserChannels(item.id)
        // console.log(data)
      } else {
        this.channels.splice(index, 1)
        auth.setUser('channels', this.channels)
      }
    },
    // 点击挑战频道
    skipChannels(item, index) {
      // console.log(item, index)
      // console.log('跳转')
      this.$emit('update:active', index)
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="less" scoped>
.myChannelBox {
  .mychannel {
    padding: 20px;
    font-size: 30px;
    small {
      font-size: 12px;
      color: #ccc;
    }
  }
  .headleContent {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .van-button--danger {
      background: #fff;
      color: red;
    }
  }
  .active {
    color: red;
  }
  #fzi {
    font-size: 12px;
  }
  .van-grid-item /deep/ .van-grid-item__content {
    background: #eee !important;
  }
  .van-grid-item {
    position: relative;
    .delicon {
      position: absolute;
      top: -9px;
      right: -6px;
      font-size: 18px;
    }
  }
}
// .van-grid-item /deep/ .van-grid-item__content {
//   background: #eee;
// }
.recommendChannel {
  .recommend {
    width: 100%;
    padding: 20px;
    font-size: 30px;
    small {
      font-size: 12px;
      color: #ccc;
    }
  }
}
</style>
