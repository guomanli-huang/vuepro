<template>
  <div id="card">
    <div class="left">
      <img :src="item.imgUrl" width="100px" height="100px" style="margin-left:10px"/>
    </div>
    <div class="right">
      <p>{{item.title}}</p>
      <span>{{item.total}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props:["item"]
};
</script>

<style lang="less" scoped>
#card {
  width: 310px;
  height: 150px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;
  margin-top: 10px;
  .left{
   flex: 0 0 50px;
  }
  .right{
      flex: 1;
      font-size: 22px;
      margin-left: 20px;
      margin-right: 10px;
      p{
          color: #ccc;
          margin-bottom: 10px;
      }
  }
}
</style>