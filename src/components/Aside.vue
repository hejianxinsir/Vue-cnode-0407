<template>
  <div class="aside">
    <div v-if="isLoading">
      <img src="../assets/loading.gif" />
    </div>
    <div class="personal">
      <p class="header">个人信息</p>
      <p class="imgAndName">
        <router-link :to="{name: 'userinfo', params: {name: userInfo.loginname}}">
          <img :src="userInfo.avatar_url">
        </router-link>
        <router-link :to="{name: 'userinfo', params: {name: userInfo.loginname}}">
          <span>{{userInfo.loginname}}</span>
        </router-link>
      </p>  
      <p class="accumulate_score">积分：{{userInfo.score}}</p>
      <p class="quote">「没文化，想不出个性签名」</p>
    </div>
    <div class="otherTopic">
      <p class="header">作者的其他话题</p>
      <ul>
        <li v-for="item in otherTopics">
          <router-link :to="{name: 'post_content',
            params: {id: item.id, name: item.author.loginname}}">
            {{item.title}}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="scanCode">
      <p class="header">作者的联系方式</p>
      <img src="../assets/me.jpeg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Aside',
  data(){
    return {
      isLoading: false,
      userInfo: []
    }
  },
  methods: {
    getData(){
      let self = this
      this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`) 

        .then( res => {
          this.isLoading = false
          this.userInfo = res.data.data
          console.log('Aside res')
          console.log(res)
          console.log('Aside userinfo')
          console.log(res.data.data)
        })
        .catch( err => console.log(err))
    }
  },
  computed: {
    otherTopics: function(){
      let otherTopics = this.userInfo.recent_topics
      if(otherTopics && otherTopics.length > 5){

        otherTopics = otherTopics.slice(0,5)
        return otherTopics
      }else{
        return otherTopics
      }
    }
  },
  beforeMount(){
    this.isLoading = true
    this.getData()
  }
}
</script>

<style scoped>
.aside{
  max-width: 20%;
  font-size: 14px;

  position: absolute;
  right: 3%;;
  top: 87px;
}

/* otherTopic */
.aside .otherTopic{
  margin: 30px 0;
}
.aside .otherTopic li{
  padding: 8px 10px;
  color: #778087;
}
.aside div p.quote{
  padding: 5px 3px;
  padding-bottom: 10px;
  font-style: italic;
}
.aside > div{
  background: #fff;
}
.aside .header{
  background: #f6f6f6;
  color: #444;
  padding: 10px;
}
.aside .personal p img{
  width: 48px; height: 48px;
  margin-right: 10px;
}
.aside .personal .imgAndName{
  display: flex;
  align-items: center;
  margin: 8px 10px;
}
.aside .personal .accumulate_score{
  color: #333;
  margin: 5px 10px;

}

.aside .scanCode img{
  width: 200px; height: 200px;
  margin: 20px 0;
  margin-left: calc(50% - 100px);
}
</style>