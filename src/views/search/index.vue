<template>
  <div>
    <!-- 搜索框 -->
    <van-search placeholder="请输入搜索关键词" v-model="searchText" show-action />
    <!-- /搜索框 -->

    <!-- 联想建议 -->
    <van-cell-group>
      <van-cell v-for="item in associate" :key="item" :title="item" icon="search" />
    </van-cell-group>
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <!-- /历史记录 -->
  </div>
</template>
<script>
import { associateSearch } from '@/api/search'

export default {
  name: 'AppSearch',
  data() {
    return {
      searchText: '', // 输入框内容
      associate: [] // 搜索联想出来的内容
    }
  },
  watch: {
    async searchText(newValue, oldValue) {
      //   console.log(newValue, oldValue)
      newValue = newValue.trim()
      if (!newValue.length) {
        this.associate = []
        return
      }
      try {
        const data = await associateSearch(newValue)
        this.associate = data.options
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
