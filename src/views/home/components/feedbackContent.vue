<template>
  <div>
    <van-dialog
      :value="value"
      @input="$emit('input',$event)"
      :showConfirmButton="false"
      :closeOnClickOverlay="true"
    >
      <van-cell-group v-if="isShow && !elseIssue">
        <van-cell icon="more-o" title="不感兴趣" @click="dislikeArticle" />
        <van-cell icon="warning-o" title="反馈垃圾内容" is-link @click="isShow = false" />
        <van-cell icon="close" title="拉黑作者" @click="blacklistAuthor" />
      </van-cell-group>
      <van-cell-group v-else-if="isShow === false && !elseIssue">
        <van-cell icon="arrow-left" @click="isShow = true" />
        <van-cell
          v-for="item in informTypeL"
          :key="item.value"
          :title="item.type"
          @click="informArticle(item)"
        />
      </van-cell-group>
      <van-cell-group v-if="elseIssue">
        <van-cell icon="arrow-left" @click="elseIssue = false" />
        <van-cell-group>
          <van-field v-model="message" type="textarea" placeholder="请输入反馈内容" rows="1" autosize />
          <van-button type="info" @click="informArticle">提交</van-button>
        </van-cell-group>
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
// 不感兴趣和举报文章
import { dislikeArticle, informArticle } from '@/api/article'
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
      isShow: true, // 控制两个弹出层
      informTypeL: [
        { value: 1, type: '标题夸张' },
        { value: 2, type: '低俗色情' },
        { value: 3, type: '错别字多' },
        { value: 4, type: '旧闻重复' },
        { value: 5, type: '广告软文' },
        { value: 6, type: '内容不实' },
        { value: 7, type: '涉嫌违法犯罪' },
        { value: 8, type: '侵权' },
        { value: 0, type: '其他问题' }
      ], // 举报类型： 0-其他问题，1-标题夸张，2-低俗色情，3-错别字多，4-旧闻重复，5-广告软文，6-内容不实，7-涉嫌违法犯罪，8-侵权'
      message: '', // 举报其他问题
      elseIssue: false // 控制其他问题
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
    },
    // 反馈垃圾内容
    async informArticle(item) {
      // console.log(item)
      // 判断是否点击的其他反馈
      if (item.value === 0) {
        this.elseIssue = true
        return
      }
      // 判断如果item有值就正常执行 没值就手动赋值
      var itemId = 0
      var remark = ''
      if (!item.value) {
        itemId = 0
        remark = this.message
      } else {
        itemId = item.value
      }
      const reports = {
        target: this.dislikeId.art_id,
        type: itemId,
        remark: remark
      }
      console.log(reports)
      try {
        const reports = {
          target: this.dislikeId.art_id,
          type: itemId,
          remark: ''
        }
        // 举报文章
        await informArticle(reports)
        this.$emit('input', false)
        Toast.success('举报成功')
        this.isShow = true
        this.elseIssue = false
      } catch (err) {
        if (err.response.status === 409) {
          Toast.fail('该文章已经被举报过')
          this.$emit('input', false)
          this.isShow = true
          this.elseIssue = false
          return
        }
        console.log(err)
        Toast.fail('举报文章失败')
        this.isShow = true
        this.elseIssue = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-cell-group /deep/ .van-button {
  margin: 40px 0px 40px 260px !important;
}
</style>
