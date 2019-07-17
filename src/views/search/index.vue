<template>
  <div>
    <!-- 搜索框 -->
    <div class="headSearch">
      <div class="iconBut" @click="$router.push({path:'/'})">
        <van-icon name="arrow-left" />
      </div>
      <!-- <form action="/"> -->
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @search="headleSearchPrice(searchText)"
      >
        <div slot="action">搜索</div>
      </van-search>
      <!-- </form> -->
    </div>
    <!-- /搜索框 -->

    <!-- 联想建议 -->
    <van-cell-group>
      <van-cell v-for="item in associate" :key="item" icon="search">
        <div slot="title" v-html="headlHighlight(item,searchText)" @click="headleSearchPrice(item)"></div>
      </van-cell>
    </van-cell-group>
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <van-cell-group v-show="this.associate.length === 0">
      <div class="headRecord">
        <div>历史记录</div>
        <div>
          <van-icon name="cross" />
        </div>
      </div>
      <van-cell-group>
        <van-cell v-for="searchItemm in searchHistory" :key="searchItemm" :title="searchItemm" />
      </van-cell-group>
    </van-cell-group>
    <!-- /历史记录 -->
  </div>
</template>
<script>
import { associateSearch } from '@/api/search'

// lodash来解决函数防抖
import { debounce } from 'lodash'

// 本地存储全部加载
import * as auth from '@/utils/auth'

export default {
  name: 'AppSearch',
  data() {
    return {
      searchText: '', // 输入框内容
      associate: [], // 搜索联想出来的内容
      searchHistory: [] // 历史记录
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
    }, 500),

    searchHistory() {
      auth.setUser('searchHistory', this.searchHistory)
    }
  },
  created() {
    if (this.searchHistory.length === 0) {
      this.searchHistory = auth.getUser('searchHistory')
    }
  },
  methods: {
    // 处理搜索关键字高亮
    headlHighlight(item, searchText) {
      return item
        .toLowerCase()
        .split(searchText)
        .join(`<span style="color:red">${searchText}</span>`)
    },
    // 搜索跳转
    headleSearchPrice(q) {
      // console.log(q)
      if (!q.length) {
        return
      }
      if (this.searchHistory) {
        if (this.searchHistory.some(item => item === q)) {
          const historyId = this.searchHistory.findIndex(item => item === q)
          this.searchHistory.splice(historyId, 1)
        }
      }
      this.searchHistory.unshift(q)
      this.$router.push({
        name: 'searchLenovo',
        params: {
          q: q
        }
      })
      // this.$router.push(`/searchLenovo/${q}`)
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
.headRecord {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  font-size: 40px;
  color: #ccc;
}
</style>
