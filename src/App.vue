<template>
  <div id="app">
    <Header/>
    <router-view name="main"></router-view>
    <router-view name="aside"></router-view>
    <!-- <Good/> -->
  </div>
</template>

<script>
import Header from './components/Header'
import PostList from './components/PostList'
import Good from './components/Good'

export default {
  name: 'App',
  components: {
    Header,
    PostList,
    Good
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
}
body{
  background: #e1e1e1;
}
*{
  margin: 0; padding: 0; list-style: none;
  box-sizing: border-box;
}

</style>
