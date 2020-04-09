<template>
  <div class="pagination">
      <button>«</button>
      <button v-if="judge">...</button>
      <button v-for="page in pages"
        @click="selected(page)"
        :class="['pageBtn', {current: page === currentPage}]"
      >
        {{page}}
      </button>
      <button>»</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  data(){
    return {
      pages: [1,2,3,4,5, '...'],
      currentPage: 1,
      judge: false
    }
  },
  methods: {
    selected(page){
      this.currentPage = page

      if(page > 4){
        this.judge = true
      }else{
        this.judge = false
      }

      if(page === this.pages[4]){
        // 后面加一个，前面移除一个
        this.pages.shift()
        this.pages.splice(4,0, this.pages[3]+1)
      }else if(page === this.pages[0] && page !== 1){
        // 前面加一个，后面减一个
        this.pages.splice(4,1)
        this.pages.unshift(this.pages[0]-1)
      }

      this.$emit('xxx', this.currentPage)
    }
  }
}
</script>


<style scoped>
.pagination{
  font-size: 14px;
}
.pagination .pageBtn, button{
  width: 33px; height: 30px; 
  color: #000;
  border-radius: 3px;
  margin: 0 3px;
  outline: none;
}
button.current{
  background: #e1e1e1;
  font-weight: bold;
}
</style>