<template>
    <div id="Main">
      <div class="header">
          <Header/>
      </div>
      <div class="mainContent">
          <router-view></router-view>
      </div>
    </div>
</template>

<script>
import Header from "./Header.vue"
    export default {
        components:{
            Header
        }
    }
</script>

<style lang="less" scoped>
#Main{
    width: 100%;
    flex: 1;
    height: 100%;
    background-color:#F0F2F5;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    .header{
        flex: 0 0 50px;
    }
    .mainContent{
        width: 100%;
        height: 100%;
        flex: 1;
        padding: 10px;
        box-sizing: border-box;
    }
}
</style>