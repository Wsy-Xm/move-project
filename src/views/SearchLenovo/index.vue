<template>
  <div>
    <van-nav-bar left-arrow left-text="返回" title="标题" fixed @click-left="$router.back()" />
    <div class="headlist">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in searchData" :key="item.art_id">
          <div>{{item.title}}</div>
          <template v-if="item.cover.images.length !== 0">
            <van-image
              width="100"
              height="100"
              v-for="(item,index) in item.cover.images"
              :key="index"
              :src="item"
            >
              <template v-slot:error>加载失败</template>
            </van-image>
          </template>
          <div class="boxArticletext">
            <div class="articletext">
              <!-- 作者 -->
              <span>{{item.aut_name}}</span>
              <!-- 评论数量 -->
              <span>{{item.comm_count + '评论'}}</span>
              <!-- 时间 -->
              <span>{{item.pubdate | dateTime}}</span>
            </div>
            <!-- 反馈图标按钮 -->
            <!-- <div>
              <van-icon name="cross" @click="feedbackButton(articleItem)" />
            </div>-->
          </div>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
// 搜索结果
import { searchResult } from '@/api/search'

export default {
  name: 'searchLenove',
  data() {
    return {
      searchData: [], // 搜索到的数据
      loading: false, // 加载的状态
      finished: false, // 加载状态结束
      page: 1, // 页码数
      per_page: 20 // 每页显示的数据个数
    }
  },
  // 该钩子在服务器端渲染期间不被调用。
  deactivated() {
    this.$destroy()
  },
  methods: {
    //   异步加载搜索结果
    async onLoad() {
      const res = {
        page: this.page,
        perPage: this.per_page,
        q: this.$route.params.q
      }
      //   console.log(this.$route.params.q)
      // 获取搜索到的结果
      const data = await searchResult(res)
      console.log(data.results)
      //   this.searchData = data.results

      // 判断如果没有了数据定制loading
      if (!data.results.length) {
        this.loading = false
        this.finished = false
      }
      //   如果有值push到数组里循环展示
      if (data.results.length) {
        await this.$sleep(800)
        this.searchData.push(...data.results)
        this.page += 1
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.headlist {
  margin-top: 96px;
}
.articletext {
  font-size: 12px;
  color: #ccc;
  span {
    margin-left: 15px;
  }
}
</style>
