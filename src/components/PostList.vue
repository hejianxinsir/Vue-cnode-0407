// https://cnodejs.org/api/v1/topics
<template>
  <div class="postlist">
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif" />
    </div>
    <div v-else>
      <header>
        <span>全部</span>
        <span>精华</span>
        <span>分享</span>
        <span>问答</span>
        <span>招聘</span>
        <span>客户端测试</span>
      </header>
      <ul>
        <li v-for="item in lists">
          <img :src="item.author.avatar_url">
          <span class="loginname">{{item.author.loginname}}</span>
          <span class="reply_count">{{item.reply_count}} /&nbsp</span>
          <span class="visit_count">{{item.visit_count}}</span>
          <!-- 标签 -->
          <span :class="[{put_good: (item.good === true), put_top: (item.top === true),
          put_tab: (item.good !== true && item.top !== true)}]">
            <span>{{ item | tabFormatter}}</span>
          </span>
          <!-- 用 router 包裹 title -->
          <span>{{item.title}}</span>
          <span class="create_at">{{item.create_at | formatTime}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostList",
  data() {
    return {
      isLoading: false,
      lists: []
    };
  },
  methods: {
    getData() {
      this.$http
        .get("https://cnodejs.org/api/v1/topics", {
          params: {
            page: 1,
            limit: 15
          }
        })
        .then(res => {
          this.isLoading = false
          console.log("PostList get");
          console.log(res);

          this.lists = res.data.data  // 数组
          console.log(this.lists[0].author.avatar_url)
          console.log('item')
          console.log(this.lists[0])
        })
        .catch( err => console.log(err) )
    }
  },
  beforeMount() {
    this.isLoading = true;
    this.getData();
  }
}
</script>


<style scoped>
.postlist{
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  max-width: 70%;
  margin-left: 5%;
  font-size: 16px;
}
.postlist div ul{
  padding: 20px;
}
.postlist div ul li{
  padding: 7px 0;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 15px;
  display: flex;
  align-items: center;

  position: relative;
}
.postlist div ul li .loginname{
  margin: 0 10px;
  font-size: 14px;
}
.postlist div ul li .visit_count{
  color: gray;
}
.postlist div ul li img{
  width: 30px; height: 30px;
}
.postlist ul li .create_at{
  position: absolute;
  right: 10px;
  color: #999;
  font-size: 14px
}

.postlist ul .put_good, .postlist ul .put_top, .postlist ul .put_tab {
  margin: 0 10px;
  padding: 2px 4px;
  border-radius: 3px;
  background: #80bd01;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
} 
.postlist ul .put_tab{
  background: #e5e5e5;
  color: #999;
}
.postlist header{
  background: #f6f6f6;
  padding: 10px;
}
.postlist header span{
  color: #80bd01;
  font-size: 14px;
  margin: 0 10px;
  font-weight: bold;
  padding: 3px 5px;
}

.postlist header span:nth-child(1){
  background: #80bd01;
  color: #fff;
  border-radius: 3px;
}
.postlist header span:hover{
  background: #80bd01;
  color: #fff;
  border-radius: 3px;
}
</style>