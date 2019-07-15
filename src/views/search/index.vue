<template>
  <div>
    <!-- 搜索框 -->
    <div class="headSearch">
      <div class="iconBut" @click="$router.push({path:'/'})">
        <van-icon name="arrow-left" />
      </div>
      <van-search v-model="searchText" placeholder="请输入搜索关键词" show-action shape="round">
        <div slot="action">搜索</div>
      </van-search>
    </div>
    <!-- /搜索框 -->

    <!-- 联想建议 -->
    <van-cell-group>
      <van-cell v-for="item in associate" :key="item" icon="search">
        <div slot="title" v-html="headlHighlight(item,searchText)">
          <span style="color:red">holle</span>
        </div>
      </van-cell>
    </van-cell-group>
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <!-- /历史记录 -->
  </div>
</template>
<script>
import { associateSearch } from '@/api/search'

// lodash来解决函数防抖
import { debounce } from 'lodash'

export default {
  name: 'AppSearch',
  data() {
    return {
      searchText: '', // 输入框内容
      associate: [] // 搜索联想出来的内容
    }
  },
  watch: {
    // 搜索联想
    searchText: debounce(async function(text) {
      //   console.log(newValue, oldValue)
      text = text.trim()
      if (!text.length) {
        this.associate = []
        return
      }
      try {
        const data = await associateSearch(text)
        this.associate = data.options
        // console.log(data)
      } catch (err) {
        console.log(err)
      }
    }, 500)
  },
  methods: {
    headlHighlight(item, searchText) {
      return item
        .toLowerCase()
        .split(searchText)
        .join(`<span style="color:red">${searchText}</span>`)
    }
  }
}
</script>

<style lang="less" scoped>
.headSearch {
  display: flex;
  justify-content: space-between;
  .van-search {
    flex: 1;
  }
  .iconBut {
    margin-top: 28px;
    margin-left: 20px;
  }
}
</style>
