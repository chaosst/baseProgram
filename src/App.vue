<style scoped>
</style>
<template>
  <div class="pageBox" v-cloak>
    <router-view style="width:100%;height:100%;"></router-view>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    methods:{
    },
    mounted(){
      window.$vueEl = this;
    }
  }
</script>

