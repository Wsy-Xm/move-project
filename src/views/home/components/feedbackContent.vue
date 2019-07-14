<template>
  <div>
    <van-dialog
      :value="value"
      @input="$emit('input',$event)"
      :showConfirmButton="false"
      :closeOnClickOverlay="true"
    >
      <van-cell-group v-if="isShow">
        <van-cell icon="more-o" title="不感兴趣" />
        <van-cell icon="warning-o" title="反馈垃圾内容" is-link @click="isShow = false" />
        <van-cell icon="close" title="拉黑作者" />
      </van-cell-group>
      <van-cell-group v-else>
        <van-cell icon="arrow-left" @click="isShow = true" />
        <van-cell icon="close" title="拉黑作者" />
        <van-cell icon="close" title="拉黑作者" />
        <van-cell icon="close" title="拉黑作者" />
        <van-cell icon="close" title="拉黑作者" />
        <van-cell icon="close" title="拉黑作者" />
        <van-cell icon="close" title="拉黑作者" />
        <van-cell icon="close" title="拉黑作者" />
        <van-cell icon="close" title="拉黑作者" />
        <van-cell icon="close" title="拉黑作者" />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
// import { dislikeArticle } from '@/api/article'
export default {
  name: 'feedbackContent',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShow: true, // 控制两个弹出层
      // 举报类型： 0-其他问题，1-标题夸张，2-低俗色情，3-错别字多，4-旧闻重复，5-广告软文，6-内容不实，7-涉嫌违法犯罪，8-侵权'
      informText: [{}]
    }
  }
}
</script>

<style lang="less" scoped>
</style>
