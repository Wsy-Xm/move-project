<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar title="标题" />
    <!-- 账户密码输入框 -->
    <form>
      <van-cell-group>
        <van-field
          v-model="user.account"
          required
          clearable
          label="用户名"
          right-icon="question-o"
          placeholder="请输入用户名"
          @click-right-icon="$toast('question')"
        />
        <van-field v-model="user.code" type="password" label="密码" placeholder="请输入密码" required />
      </van-cell-group>
      <van-button type="info" @click.prevent="headleLogin">信息按钮</van-button>
    </form>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'AppLogin',
  data () {
    return {
      user: {
        account: '',
        code: ''
      }
    }
  },
  methods: {
    headleLogin () {}
  }
}
</script>

<style lang="less" scoped>
.van-button {
  width: 100%;
}
</style>
