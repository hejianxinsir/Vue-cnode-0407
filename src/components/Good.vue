<template>
  <div class="goods">
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif" />
    </div>

    <div v-else>

    </div>

  </div>
</template>



<script>
export default {
  name: 'Goods',
  data(){
    return {
      isLoading: false
    }
  },
  methods: {

  },
  beforeMount(){
    
  }
}
</script>



<style scoped>

</style>