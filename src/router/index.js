import Vue from 'vue'
import Article from '../components/Article'
import PostList from '../components/PostList'
import Router from 'vue-router'
import UserInfo from '../components/UserInfo'
import Aside from '../components/Aside'

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
      path: '/topic/:id&author=:name',
      components: {
        main: Article,
        aside: Aside
      }
    },
    {
      name: 'userinfo',
      path: '/userinfo/:name',
      components: {
        main: UserInfo
      }
    }
  ]

})