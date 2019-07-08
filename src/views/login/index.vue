<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar title="登陆" />
    <!-- 账户密码输入框 -->
    <form class="formBox">
      <van-cell-group>
        <van-field
          v-model="user.mobile"
          required
          clearable
          left-icon="phone-o"
          right-icon="question-o"
          placeholder="请输入手机号"
          @click-right-icon="$toast('请输入输入号')"
        />
        <van-field v-model="user.code" center clearable  left-icon="comment-o" placeholder="请输入短信验证码">
          <van-button slot="button" size="small" type="default" round>获取验证码</van-button>
        </van-field>
        <van-cell-group></van-cell-group>
      </van-cell-group>
      <van-button class="login" type="info" @click.prevent="headleLogin">登陆</van-button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AppLogin',
  data () {
    return {
      user: {
        mobile: '15097317238',
        code: '246810'
      }
    }
  },
  methods: {
    async headleLogin () {
      // console.log(111)
      const res = await axios({
        method: 'POST',
        url: 'http://toutiao.course.itcast.cn/app/v1_0/authorizations',
        data: this.user
      })
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.van-button {
  width: 100%;
}
.formBox {
  padding: 0 10px 0px 10px;
  .login {
    border-radius: 10px;
  }
}
</style>
