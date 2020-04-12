<template>
  <div class="goods">
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif" />
    </div>
    <div v-else>
      <header>
        <router-link :to="{name: 'root'}">
          <span>全部</span>
        </router-link>
        <router-link :to="{name: 'goods'}">
          <span class="good">精华</span>
        </router-link>
        <span>分享</span>
        <span>问答</span>
        <span>招聘</span>
        <span>客户端测试</span>
      </header>
      <ul>
        <li v-for="item in goodsList">
          <router-link :to="{name: 'userinfo', params: {id: item.id, name: item.author.loginname}}">
            <img :src="item.author.avatar_url">
          </router-link>
          <router-link :to="{name: 'userinfo', params: {id: item.id, name: item.author.loginname}}">
            <span class="loginname">{{item.author.loginname}}</span>
          </router-link>
          <span class="reply_count">{{item.reply_count}} /</span>
          <span class="visit_count">{{item.visit_count}}</span>
          <router-link :to="{name: 'post_content', params: {id: item.id, name: item.author.loginname}}">
            <span class="title">{{item.title}}</span>
          </router-link>
          <span class="last_reply">{{item.last_reply_at | formatTime}}</span>
        </li>
      </ul> 
    </div>

  </div>
</template>



<script>
export default {
  name: 'Goods',
  data(){
    return {
      isLoading: false,
      allList: [],    // 所有主题
      goodsList: []   // 精华数组
    }
  },
  methods: {
    getData(){
      this.$http.get('https://cnodejs.org/api/v1/topics')
        .then( res => {
          let _this = this
          console.log('以下是 Good res')
          this.isLoading = false
          this.allList = res.data.data
          this.allList.map(function(item){
            if(item.good === true){
              _this.goodsList.push(item)
            }else{}
          })
          console.log('goodsList')
          console.log(this.goodsList)
        })
        .catch( err => console.log(err))
    }
  },
  beforeMount(){
    this.isLoading = true
    this.getData()
  }
}
</script>



<style scoped>
.goods{
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  max-width: 70%;
  margin-left: 5%;
  font-size: 16px;
  background: #fff;
}

.goods div ul{
  padding: 20px;
}
.goods div ul li{
  position: relative;
}
.goods div ul li .title{
  margin: 0 10px;
}
.goods div ul li .last_reply{
  position: absolute;
  right: 10px;
}
.goods div ul li a{    /*注意看 DOM 中给你自动生成的 a 标签，这是去掉router-link下划线的关键*/ 
  text-decoration: none;
}
.goods div ul li{
  padding: 15px 0;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  font-size: 16px;

  position: relative;
}
.goods div ul li .loginname{
  margin: 0 10px;
  font-size: 14px;
}
.goods div ul li .visit_count{
  color: #808080;
}
.goods div ul li .reply_count{
  color: #000;
}
.goods div ul li img{
  width: 30px; height: 30px;
}
.goods ul li .create_at{
  position: absolute;
  right: 10px;
  color: #999;
  font-size: 14px
}

.goods header{
  background: #f6f6f6;
  padding: 10px;
}
.goods header span{
  color: #80bd01;
  font-size: 14px;
  margin: 0 10px;
  font-weight: bold;
  padding: 3px 5px;
}


.goods header span:hover{
  background: #80bd01;
  color: #fff;
  border-radius: 3px;
}
.goods header a{
  text-decoration: none;
}
.goods header span.good{
  background: #80bd01;
  color: #fff;
  border-radius: 3px;
}
</style>