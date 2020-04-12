<template>
  <div class="header clearfix">
    <router-link :to="{name: 'root'}">
      <img src="../assets/cnode.svg" width=138 height=35>
    </router-link>
    <input type="text" value="搜索">
    <ul>
      <li>
        <router-link :to="{name: 'root'}">
          <span>首页</span>
        </router-link>
      </li>
      <li>新手入门</li>
      <li>API</li>
      <li>关于</li>
      <li>注册</li>
      <li>登录</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data(){
    return {
      msg: '我是 Header'
    }
  }
}
</script>


<style scoped>
.clearfix::after{
  clear: both;
  content: '';
  display: block;
}
.header{
  border: 1px solid gray;
  background: #444;
  display: flex;
  align-items: center;
  position: relative;
  padding: 7px 0 9px 0;
  margin-bottom: 30px;
}
.header img{
  margin-left: 60px;
  margin-top: -3px;
}
.header ul{
  position: absolute;
  right: 85px;
  margin: 0;
}
.header ul li{
  display: inline-block;
  color: #ccc;
  font-size: 14px;
  margin: 0 15px;
  font-weight: bold;
}
.header ul li a{
  text-decoration: none;
  color: #ccc;
}
.header ul li a:hover{
  color: #fff;
}

.header ul li:hover{
  color: #fff;
}
.header input {
  border-radius: 12px;
  padding: 2px 10px;
  border: 1px solid #888;
  background: #888;
  color: lightgray;
  margin: 3px 14px 0 14px;
  height: 25px;
  width: 232px;
}

.header input:focus {
  outline: none;
  background: #fff;
}
</style>