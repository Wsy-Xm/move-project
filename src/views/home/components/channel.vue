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
          <van-button round type="danger" size="mini">编辑</van-button>
        </div>
        <van-grid :gutter="10">
          <van-grid-item v-for="(channelsItem,index) in channels" :key="channelsItem.id">
            <span slot="text" :class="{active:active===index}" id="fzi">{{ channelsItem.name }}</span>
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
            v-for="allChannels in allChannels"
            :key="allChannels.id"
            :text="allChannels.name"
          />
        </van-grid>
      </div>
    </van-popup>
  </div>
</template>

<script>
// 加载所有的频道列表
import { getAllChannels } from '@/api/channels'

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
      allChannels: []
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
        this.allChannels = data.channels
        console.log(data)
      } catch (err) {
        console.log(err)
        console.log('全部频道列表加载失败')
      }
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
