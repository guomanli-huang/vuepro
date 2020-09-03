<template>
  <div id="nav">
    <div class="eleCenter">
      <i class="el-icon-platform-eleme"></i>
      <span slot="title">闪云外卖管理中心</span>
    </div>
    <el-menu
      :default-active="curactive"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#001529"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      unique-opened
    >
      <div v-for="item in arrgroups" :key="item.url">
        <!-- 没有儿子 -->
        <el-menu-item :index="item.url" v-if="!item.children">
          <span :class="item.icon"></span>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
        <!-- 有儿子的 -->
        <el-submenu :index="item.url" v-else>
          <template slot="title">
            <span :class="item.icon"></span>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item-group v-for="v in item.children" :key="v.url">
            <el-menu-item :index="v.url">{{v.name}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </div>
    </el-menu>
  </div>
</template>

<script>
import LoginVue from '../Login.vue';
export default {
  data() {
    return {
      list: [
        {
          url: "/home",
          icon: "el-icon-s-home",
          name: "后台首页",
          roles: ["super", "normal"],
        },
        {
          url: "/order/orderlist",
          icon: "el-icon-document",
          name: "订单管理",
          roles: ["super", "normal"],
        },
        {
          url: "/goods",
          icon: "el-icon-suitcase",
          name: "商品管理",
          roles: ["super", "normal"],
          children: [
            {
              url: "/goods/goodsadd",
              name: "商品添加",
            },
            {
              url: "/goods/goodslist",
              name: "商品列表",
            },
            {
              url: "/goods/goodscate",
              name: "商品分类",
            },
          ],
        },
        {
          url: "/account",
          icon: "el-icon-user-solid",
          name: "账号管理",
          roles: ["super"],
          children: [
            { name: "账号添加", url: "/account/accountadd" },
            {
              name: "账号列表",
              url: "/account/accountlist",
            },
            {
              name: "账号修改",
              url: "/account/accountedit",
            },
            {
              name: "个人中心",
              url: "/account/personal",
            },
          ],
        },
        {
          url: "/shop",
          icon: "el-icon-s-shop",
          name: "店铺管理",
          roles: ["super"],
        },
        {
          url: "/total",
          icon: "el-icon-odometer",
          name: "销售统计",
          roles: ["super"],
          children: [
            { name: "商品统计", url: "/total/goodstotal" },
            {
              name: "订单统计",
              url: "/order/ordertotal",
            },
          ],
        },
      ],
      curactive:"/home"
    };
  },
  methods: {
    handleOpen() {},
    handleClose() {},
  },
  computed: {
    arrgroups() {
      let newarr = this.list.filter((item) => {
        return item.roles.includes(localStorage.roles);
      });
      return newarr;
    },
  },
  created(){
    this.curactive=this.$route.fullPath
    // console.log(this.$route)
  }
};
</script>

<style scoped>
#nav {
  height: 100%;
  background-color: #001529;
  flex: 0 0 220px;
  padding: 10px;
  box-sizing: border-box;
}
.el-menu {
  border: 0;
}
.el-menu-item {
  font-size: 16px;
}
.el-submenu__title {
  font-size: 16px !important;
}
.eleCenter {
  height: 30px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
i {
  color: skyblue;
  font-size: 30px;
}
span {
  display: inline-block;
  font-size: 20px;
  line-height: 30px;
  /* margin-left: 10px; */
}
</style>