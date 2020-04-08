import Vue from 'vue'
import Article from '../components/Article'
import PostList from '../components/PostList'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'root',
      path: '/',
      components: {
        main: PostList
      }
    },
    {
      name: 'post_content',
      path: '/topic/:id',
      components: {
        main: Article
      }
    }
  ]

})