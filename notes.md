## Vue 文档/笔记

- 值得注意的是只有当实例被创建时就已经存在于 data 中的属性才是响应式的。当你添加一个新属性，比如 vm.b = 'hi'，接着你改变 b 的值，并不会触发更新。

- 接上。所以，如果你知道你会在晚些时候需要一个属性，但是一开始它为空或不存在，那么你仅需要设置一些初始值。比如：
```
var app = new Vue({
el: '#app',
data: {
count: 0,
name: ''
}
})
```
唯一的例外是使用 Object.freeze()，这会阻止修改现有的属性。Vue 的响应式系统无法再追踪变化。

- 计算属性与方法的区别：计算属性基于响应式依赖进行缓存，如果计算属性依赖的原数据没有变化，那么你再次取计算属性的值，会立刻拿到 之前缓存的值。而方法虽然也能得到同样的值，但总是会再次执行函数。

- 为什么要用计算属性？如果有个计算属性的性能开销比较大，那么有缓存就相当方便了，不用再次执行计算属性的 getter 。

- watch 的使用
```
// 以下用 computed 会简洁些，案例只做方法的使用参考。
<div id="app">{{fullName}}</div>

var vm = new Vue({
el: '#app',
data: {
firstName: 'Foo',
lastName: 'Bar',
fullName: 'Foo Bar'
},
watch: {
firstName: function(val){
this.fullName = val + ' ' + this.lastName
},
lastName: function(val){
this.fullName = this.firstName + ' ' + val
}
}
})
```

- 计算属性的 setter
```
computed: {
// getter
get: function(){
return this.firstName + ' ' + this.lastName
},
// setter
set: function(newValue){
var names = newValue.split(' ')
this.firstName = names[0]
this.lastName = names[names.length - 1]
}
}
```

- 侦听器：计算属性在大多情况下更适合，但有时也需要侦听器。当需要在数据变化时执行异步，或开销较大的操作时，这个方式是最有用的。

- key 的使用
```
<ul id="app">
<li v-for="item in items" :key="item.message">
{{item.messge}}
</li>
</ul>
```

- v-for 可以使用 for 这个单词作为分隔符，比如 <div v-for="item for items"></div>

- v-for 也可以用来遍历对象
```
<div v-for="value in obj">{{value}}</div>

data(){
return {
obj: {
one: '111',
two: '222',
three: '333'
}    
}
}

// 111
// 222
// 333

// 遍历对象的时候还可以接受第二个参数 property 作为属性名

<div v-for="(value, name) in obj">{{name}} : {{value}}</div>

// 还可以用第三个参数作为索引
<div v-for="(value, name, index) in obj">{{index}} : {{name}} : {{value}}</div>
```

- 建议尽可能在使用 v-for 的时候提供 key attrbute . key 是 Vue 识别节点的一个通用机制。另外，要使用字符串或数字作为 key 的值。
```
<div v-for="item for items" v-bind:key="item.id"></div>
```

- Vue 将被侦听的数组的变异方法进行了包裹，所以它们也将会触发视图更新。变异方法，顾名思义，会改变调用了这些方法的原始数组。如 push pop shift 等等。

- 在 Vue 中用 post 方法
跟 get 方法相似。axios 请求中用 post 传递参数时必须用 form-data 格式，我们需要安装 qs 插件才能用 form-data 格式

npm install qs
import qs from 'qs'

```
// get 方法
this.$http.get(url, {
params: {}
})

// post 方法
this.$http.post(url, qs.stringify({
page: 1,
limit: 20
}))

// 用了 qs 之后，传递的参数就是 form-data ?page=1&limit=20 这样的
```

- vuex 创建一个状态仓库。比如你在淘宝已经登录账户了，在不同的页面，该页面都会显示你已经登录。这就是 vuex 的应用。组件需要共享状态，就用得到 vuex。

如何使用？

第一步，引入 vuex 并通过 use 方法使用它。 npm i vuex
第二步，创建状态仓库。
第三步， 通过 this.$store.state.xxx 拿到需要的数据
```
var store = new Vuex.Store({
state: {
xxx: yyy
}
})
```

## Vue 笔记 - 内置指令

- v-cloak 用来解决初始化慢导致页面闪动；在 Vue 实例编译结束之后再渲染。v-cloak 要与 display: none 绑定

- v-if 会复用代码，如果不想要复用，加唯一的key即可，如 key="pad" 

- v-if 和 v-show 的区别：v-if 中如果 if 的条件不成立，那么这个元素是完全不会渲染在页面上的，页面没有这个元素；v-show 中，无论条件成立与否，其他它都在页面中，只是改变了 display 属性。条件为false就不显现出来，当条件为真，才显现出来。v-show 就像物理定律，定律本来就存在，只是人类发没发现而已；v-if 就像手机，世界本来没有手机，当满足某些条件了，手机就被创造到这个世界了。

- 频繁切换页面，用 v-show ；要实时渲染，用 v-if

- 改变数组的length、改变数组的指定项内容，Vue 都是检测不到的。此时，要用 Vue.set() 方法。

```
// 在 js 里写
// 改变数组内容的方法
Vue.set(app.Arr, 1, 'car')    // 参数分别是，实例的数组、数组内容的下标、更改的内容
Vue.set(app.Arr, 1, {
// 也可以这样写
})

// 改变数组长度的方法用 splice
// 比如在控制台里写
app.arr.splice(0)    // 清空数组
```

- Vue 的 methods 里定义了一个方法，在 HTML 文件中写这个方法的时候，一般要加括号（）；如果你定义的方法里有参数，就一定要加括号。如果不加括号，默认传入的就是 event 对象


## Vue 笔记

- 计算属性：如果表达式过长，或逻辑很复杂时，就会变得臃肿导致难以维护，这时候就要用到计算属性了(conputed)。一般把复杂的逻辑写在计算属性里面。

```
<div id="app">
{{ reverseText }}
</div>

// computed
var app = new Vue({
el: '#app',
data: {
text: '111,222,333'
},
computed: {
reverseText: function(){
return this.text.split(',').reverse().join(',')
}
}
})
```

- 每一个计算属性都包含一个 getter 和 setter；如果计算属性后面跟一个 function ，那么默认的就是 getter 函数，这是计算属性的默认用法。

- 计算属性也可以拿其他 Vue 实例的属性来操作。

- methods 里自定义方法也可以做 计算属性 能做的事，但两者的区别是什么？方法，只要页面重新渲染，方法就会重新执行（如果 data 里有属性未渲染到页面，data 的这个属性改变了，方法也不会重新执行，因为页面没有重新渲染）；而计算属性所依赖的数据未改变，不管页面是否渲染，则计算属性不会改变。

- 用计算属性能做的事，用方法都能做。那什么情况下使用计算属性，什么情况使用方法呢？如果你需要缓存，用计算属性。反之用方法。