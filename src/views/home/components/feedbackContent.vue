<template>
  <div>
    <van-dialog
      :value="value"
      @input="$emit('input',$event)"
      :showConfirmButton="false"
      :closeOnClickOverlay="true"
    >
      <van-cell-group v-if="isShow">
        <van-cell icon="more-o" title="不感兴趣" @click="dislikeArticle" />
        <van-cell icon="warning-o" title="反馈垃圾内容" is-link @click="isShow = false" />
        <van-cell icon="close" title="拉黑作者" @click="blacklistAuthor" />
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
// 不感兴趣
import { dislikeArticle } from '@/api/article'
// 拉黑作者
import { blacklistAuthor } from '@/api/user'
// 提示消息
import { Toast } from 'vant'

export default {
  name: 'feedbackContent',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    dislikeId: {
      type: Object
    }
  },
  data() {
    return {
      isShow: true // 控制两个弹出层
      // 举报类型： 0-其他问题，1-标题夸张，2-低俗色情，3-错别字多，4-旧闻重复，5-广告软文，6-内容不实，7-涉嫌违法犯罪，8-侵权'
    }
  },
  methods: {
    // 不感兴趣
    async dislikeArticle() {
      //   console.log(this.dislikeId)
      try {
        //   移除不感兴趣的文章
        await dislikeArticle(this.dislikeId.art_id)
        // console.log(data)
        this.$emit('dislikeRemove')
        Toast.success('拉黑作者成功')
      } catch (err) {
        console.log(err)
        Toast.fail('拉黑作者失败')
      }
    },
    // 拉黑作者
    async blacklistAuthor() {
      console.log(this.dislikeId)
      try {
        await blacklistAuthor(this.dislikeId.aut_id)
        this.$emit('dislikeRemove')
        Toast.success('拉黑作者成功')
      } catch (err) {
        console.log(err)
        Toast.fail('拉黑作者失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
