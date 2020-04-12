<template>
  <div class="article">
    <div v-if="isLoading">
      <img src="../assets/loading.gif" />
    </div>

    <div class="content" v-else>
      <div class="header">
        <h3>{{post.title}}</h3>
        <ul>
          <li>* 发布于 {{post.create_at | formatTime}}</li>
          <li>* 作者: {{post.author.loginname}}</li>
          <li>* {{post.visit_count}} 次浏览</li>
          <li>* 上次编辑在 {{post.last_reply_at | formatTime}}</li>
          <li>
            * 来自
            <span
              :class="[{put_good: (post.good === true), put_top: (post.top === true),
          put_tab: (post.good !== true && post.top !== true)}]"
            >{{post | tabFormatter}}</span>
          </li>
        </ul>
      </div>
      <section v-html="post.content"></section>
      <div class="reply">
        <p class="title">{{this.replies.length}} 个回复</p>
        <ul>
          <li v-for="(reply,index) in replies">
            <div class="none-content">
              <router-link :to="{name: 'userinfo', params: {name:reply.author.loginname}}">
                <img :src="reply.author.avatar_url" />
              </router-link>
              <router-link :to="{name: 'userinfo', params: {name:reply.author.loginname}}">
                <span class="loginname">{{reply.author.loginname}}</span>
              </router-link>
              <span class="rank-floor">{{index + 1}}楼</span>
              <span>{{reply.create_at | formatTime}}</span>
            </div>
            <p v-html="reply.content"></p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Article",
  data() {
    return {
      isLoading: false,
      post: {}, // 当前文章的内容结构
      replies: []
    };
  },
  methods: {
    getData() {
      let self = this
      this.$http
        .get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`) 
        .then(res => {
          console.log("Article res");
          console.log(res);
          this.isLoading = false;
          this.post = res.data.data; // 每一篇文章的内容、结构
          console.log("this.post");
          console.log(this.post);
          console.log(this.post.content);

          this.replies = this.post.replies;
          console.log("post replies");
          console.log(this.replies);
        })
        .catch(err => console.log(err));
    }
  },
  beforeMount() {
    this.isLoading = true;
    this.getData();
  },
  watch: {
    '$route'(to, from){
      this.getData()
    }
  }
};
</script>



<style>
@import url('../assets/github.css');

/* @import url('../assets/markdown-github.css'); */

body{
  padding: 0;
}

ul,li{
  margin: 0;
}
.article {
  max-width: 70%;
  margin-left: 5%;
}
.article section {
  margin-bottom: 20px;
  padding: 10px 20px;
  background: #fff;
}
.article .reply{
  background: #fff;
}
.article .reply .title {
  font-size: 16px;
  color: #444;
  background: #f6f6f6;
  padding: 10px 20px;
}
.article .reply ul {
  margin: 10px 20px;
}
.article .reply ul li {
  margin: 20px 0;
  border-bottom: 1px solid lightgray;
  padding-bottom: 15px;
}
.article .reply ul li .loginname{
  margin: 0 7px;
}
.article .reply ul li .rank-floor{
  margin-right: 7px;
}
.article .reply ul li .none-content{
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 10px;
}
.article .reply ul li img {
  width: 30px;
  height: 30px;
}
.article ul .put_good,
.article ul .put_top,
.article ul .put_tab {
  background: #80bd01;
  color: #fff;
  border-radius: 3px;
  padding: 1px 3px;
  font-weight: bold;
}
.article ul .put_tab {
  background: #e5e5e5;
  color: #999;
}

.article .content .header {
  border-bottom: 1px solid lightgray;
  padding: 10px 20px;
  background: #fff;
}
.article .content .header ul {
  display: flex;
  font-size: 14px;
  color: gray;
}
.article .content .header ul li {
  margin-right: 12px;
}

.article .header h3 {
  font-size: 22px;
  color: #333;
}
</style>