<template>
  <div id="header">
    <div class="left">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in breadList" :key="item">{{item}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{username}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="personBtn">个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="quitBtn">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-avatar :size="size" :src="circleUrl"></el-avatar>
    </div>
  </div>
</template>

<script>
import { checktoken, personalMsg } from "@/api/api";
export default {
  data() {
    return {
      circleUrl: "",
      size: "medium",
      username: "",
      breadList: [],
    };
  },
  methods: {
    fetchData() {
      personalMsg(localStorage.ids).then((res) => {
        this.circleUrl = res.data.accountInfo.imgUrl;
      });
    },
    personBtn() {
      this.$router.push("/account/personal");
    },
    quitBtn() {
      this.$message({ message: "欢迎下次再来", type: "success" });
      localStorage.clear();
      this.$router.push("/");
    },
  },
  created() {
    checktoken(localStorage.token).then((res) => {
      if (res.data.code == 0) {
        this.username = localStorage.getItem("username");
      } else {
        this.username = "请登录";
      }
    });
    this.fetchData();
    this.$bus.$on("imguploadfinish", () => {
      this.fetchData();
    });
    this.breadList = this.$route.meta.breadList;
  },
  watch: {
    $route(to) {
      this.breadList = to.meta.breadList;
    },
  },
};
</script>

<style lang="less" scoped>
#header {
  width: 100%;
  line-height: 50px;
  text-align: center;
  flex: 0 0 50px;
  background-color: #fff;
  height: 50px;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    .el-breadcrumb {
      margin-left: 10px;
      font-size: 20px;
    }
  }
  .right {
    display: flex;
    justify-content: flex-end;
    margin-right: 40px;
    align-items: center;
    .el-dropdown-link {
      cursor: pointer;
      margin-right: 15px;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
  }
}
</style>