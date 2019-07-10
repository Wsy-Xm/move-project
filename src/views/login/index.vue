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
        <van-field
          v-model="user.code"
          center
          clearable
          left-icon="comment-o"
          placeholder="请输入短信验证码"
        >
          <van-button slot="button" size="small" type="default" round>获取验证码</van-button>
        </van-field>
        <van-cell-group></van-cell-group>
      </van-cell-group>
      <van-button class="login" type="info" @click.prevent="headleLogin">登陆</van-button>
    </form>
  </div>
</template>

<script>
// import axios from 'axios'
import { login } from '@/api/user'

import { Toast } from 'vant'

export default {
  name: 'AppLogin',
  data () {
    return {
      user: {
        mobile: '15097317238',
        code: '123456'
      }
    }
  },
  methods: {
    async headleLogin () {
      // console.log(login)
      try {
        const data = await login(this.user)
        console.log(data)
        Toast.success('登陆成功')
        // this.$router.push({
        //   path: '/'
        // })
      } catch (err) {
        console.log(err)
        console.log('登陆失败')
      }
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
