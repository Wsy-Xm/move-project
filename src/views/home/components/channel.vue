<template>
  <div>
    <van-popup
      :value="value"
      @input="$emit('input',$event)"
      position="bottom"
      :style="{ height: '97%' }"
    >
      <div class="headleContent">
        <div class="mychannel">
          我的频道
          <small>点击进入频道</small>
        </div>
        <van-button round type="danger" size="mini">编辑</van-button>
      </div>
      <van-grid :gutter="10">
        <van-grid-item
          v-for="channelsItem in channels"
          :key="channelsItem.id"
          :text="channelsItem.name"
        />
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'channelPopup',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    channels: {
      type: Array
    }
  },
  data() {
    return {
      // show: true
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.mychannel {
  padding: 20px;
  font-size: 30px;
  small {
    font-size: 12px;
    color: #ccc;
  }
}
.van-grid-item /deep/ .van-grid-item__content {
  background: #eee;
}
.headleContent {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .van-button--danger {
    background: #fff;
    color: red
  }
}
</style>
