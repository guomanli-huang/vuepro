<template>
    <div id="layout">
      <div class="nav">
          <Nav/>
      </div>
      <div class="main">
          <Main/>
      </div>
    </div>
</template>

<script>
import Nav from "./Nav.vue"
import Main from "./Main/Main.vue"
    export default {
        components:{
            Nav,
            Main
        }
    }
</script>

<style lang="less" scoped>
#layout{
    display: flex;
    height: 100%;
    width: 100%;
    .nav{
        flex: 0 0 240px;
    }
    .main{
        width: 100%;
        height: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
    }
}
</style>