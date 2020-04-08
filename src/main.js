// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import Axios from 'axios'
Vue.prototype.$http = Axios;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { 
    App 
  },
  template: '<App/>'
})

// 自定义一个过滤器，用 Vue.filter('filterName', function(){})
Vue.filter('formatTime', function(str){
  if(!str) return ''
  let date = new Date(str)
  let time = new Date().getTime() - date.getTime()  // 此刻时间 - 传入的时间 = 时间差(毫秒)

  if((time / 1000) < 60){  // 秒
    return '刚刚'
  }else if((time / 6000) < 60){  // 分钟
    return parseInt( (time/6000) ) + ' 分钟前' 
  }else if((time / 3600000) < 24){    // 小时
    return parseInt(time/3600000) + ' 小时前'
  }else if((time/86400000) < 31){   // 天前
    return parseInt(time/86400000) + ' 天前'
  }else if((time / 2592000000) < 12){   // 月前
    return parseInt(time/2592000000) + ' 月前'
  }else{
    return parseInt(time/31104000000) + ' 年前'
  }
})

Vue.filter('tabFormatter', function(item){
  if(item.good === true){
    return '精华'
  }else if(item.top === true){
    return '置顶'
  }else if(item.tab === 'share'){
    return '分享'
  }else if(item.tab === '招聘'){
    return '招聘'
  }else if(item.tab === 'ask'){
    return '问答'
  }else{
    return '其他'
  }
})

// Vue.filter('formatDate', function (str) {
//   if (!str) return ''
//   var date = new Date(str)
//   var time = new Date().getTime() - date.getTime() //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
//   if (time < 0) {
//     return ''
//   } else if ((time / 1000 < 30)) {
//     return '刚刚'
//   } else if (time / 1000 < 60) {
//     return parseInt((time / 1000)) + '秒前'
//   } else if ((time / 60000) < 60) {
//     return parseInt((time / 60000)) + '分钟前'
//   } else if ((time / 3600000) < 24) {
//     return parseInt(time / 3600000) + '小时前'
//   } else if ((time / 86400000) < 31) {
//     return parseInt(time / 86400000) + '天前'
//   } else if ((time / 2592000000) < 12) {
//     return parseInt(time / 2592000000) + '月前'
//   } else {
//     return parseInt(time / 31536000000) + '年前'
//   }
// }
// )