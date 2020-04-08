// https://cnodejs.org/api/v1/user/loginname
<template>
  <div class="userinfo">

    <div v-if="isLoading">
      <img src="../assets/loading.gif" />
    </div>

    <div class="main">
      <div class="header">主页 <span>/</span></div>
      <section>
        <div class="roleWrapper">
          <img :src="userMsg.avatar_url">
          <span class="loginname">{{userMsg.loginname}}</span>
        </div>
        <p class="accumulate_score">{{userMsg.score}} 积分</p>
        <p class="topic_collect">{{userCollect.length}} 个话题收藏</p>
        <p class="signIn_time">注册时间：{{userMsg.create_at | formatTime}}</p>
      </section>
    </div>

    <div class="create_topic">
      <p class="header">最近创建的话题</p>
      <ul>
        <li v-for="item in createtopics">
          <router-link :to="{name: 'userinfo', params: {name: item.author.loginname}}">
            <img :src="item.author.avatar_url">
          </router-link>
          <router-link :to="{name: 'post_content', params:{id:item.id, name: item.author.loginname}}">
            <span class="item-title">{{item.title}}</span>
          </router-link>
          <span class="last_reply_at">{{item.last_reply_at | formatTime}}</span>
        </li>
      </ul>
    </div>

    <div class="topic_join">
      <p class="header">最近参与的话题</p>
      <ul>
        <li v-for="item in jointopics">
          <router-link :to="{name: 'userinfo', params: {name: item.author.loginname, id: item.id}}">
            <img :src="item.author.avatar_url">
          </router-link>
          <router-link :to="{name: 'post_content', params:{id:item.id, name: item.author.loginname}}">
            <span class="item-title">{{item.title}}</span>
          </router-link>
          <span class="last_reply_at">{{item.last_reply_at | formatTime}}</span>
        </li>
      </ul>
    </div>

  </div>
</template>


<script>
import Aside from './Aside'

export default {
  name: 'UserInfo',
  components: {
    Aside
  },
  data(){
    return {
      isLoading: false,
      userMsg: [],   //每个用户的信息
      userCollect: [],
      createtopics: [],
      jointopics: []
    }
  },
  methods: {
    getData(){
      // 用户信息
      this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`, {
        params: {
          page: 1,
          limit: 5
        }
      })
        .then( res => {
          this.isLoading = false
          console.log('UserInfo res')
          console.log(res)
          this.userMsg = res.data.data  // 每个用户的信息
          console.log('this.userMsg')
          console.log(this.userMsg)
          this.createtopics = res.data.data.recent_topics
          this.jointopics = res.data.data.recent_replies

          console.log('createtopics')
          console.log(this.createtopics)
          console.log('jointopics')
          console.log(this.jointopics)
          if(this.createtopics.length > 5){
            this.createtopics = this.createtopics.slice(0,5)
          }else{

          }
          if(this.jointopics.length > 5){
            this.jointopics = this.jointopics.slice(0,5)
          }
        })
        .catch( err => console.log(err) )

      // 用户收藏信息
      this.$http.get(`https://cnodejs.org/api/v1/topic_collect/${this.$route.params.name}`)
        .then( res => {
          console.log('用户收藏信息')
          console.log(res)
          this.userCollect = res.data.data  //  用户收藏的主题，数组形式

        })
        .catch( err => console.log(err))
    }
  },
  beforeMount(){
    this.isLoading = true
    this.getData()
  },
  // 检测路由的变化，这是犯过错的地方，牢牢记住！！！！！！！！！！！！！！！！！！！！！
  watch: {
    '$route'(to, from){
        this.getData()
    }
  }
}
</script>



<style scoped>
  .userinfo{
    max-width: 70%;
    margin-left: 5%;
  }
  .userinfo .header{
    background: #f6f6f6;
    padding: 10px;
    color: #80bd01;
  }
  .userinfo .main .header span{
    color: #ccc;
  }
  .userinfo .main img{
    width: 48px; height: 48px;
    margin-right: 5px;
  } 
  .userinfo .main .topic_collect{
    color: #778087;
  }
  .userinfo .main .signIn_time{
    color: #ababab;
    margin-top: 5px;
  }

  .userinfo .main {
    font-size: 14px;
    background: #fff;
  } 
  .userinfo .main section{
    padding: 10px;
  }
  .userinfo .main section .roleWrapper{
    display: flex;
    align-items: center;
  }
  .userinfo .main .loginname{
    vertical-align: top;
  }
  .userinfo .main .accumulate_score{
    color: #333;
    margin: 5px 0;
  } 

  /* 最近创建主题相关 li*/ 
.userinfo>.create_topic{
  font-size: 16px;
  border: 1px solid lightgray;
  margin: 20px 0;
  background: #fff;
}
.userinfo>.topic_join{
  background: #fff;
  font-size: 16px;
  border: 1px solid lightgray;
}
.userinfo ul {
  padding: 10px;
}
.userinfo ul li a{    /*注意看 DOM 中给你自动生成的 a 标签，这是去掉router-link下划线的关键*/ 
  text-decoration: none;
}
.userinfo ul li{
  padding: 15px 0 5px 0;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  align-items: center;

  position: relative;
}
.userinfo ul li .last_reply_at{
  position: absolute;
  right: 10px;
  color: #999;
  font-size: 14px
}
.userinfo ul li img{
  width: 30px; height: 30px;
  margin-right: 10px;
}
</style>