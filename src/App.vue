<template>
  <div id="app">
    <Header/>
    <router-view name="main"></router-view>
  </div>
</template>

<script>
import Header from './components/Header'
import PostList from './components/PostList'

export default {
  name: 'App',
  components: {
    Header,
    PostList
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #e1e1e1;
}
*{
  margin: 0; padding: 0; list-style: none;
  box-sizing: border-box;
}

</style>
