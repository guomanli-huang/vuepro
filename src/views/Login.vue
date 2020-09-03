
<template>
  <div class="login">
    <div class="container-login">
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-ruleForm"
        size:small
      >
        <h3 class="title">闪云系统登陆</h3>
        <el-form-item label="账号" prop="account">
          <el-input
            type="text"
            v-model="loginForm.account"
            autocomplete="off"
            prefix-icon="iconfont icon-ren"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            :type="isOpen ? 'text':'password'"
            v-model="loginForm.password"
            autocomplete="off"
            prefix-icon="iconfont icon-suo"
            :suffix-icon="isOpen ? 'iconfont icon-yanjing1':'iconfont icon-yanjing'"
            @click.native="changeIcon"
            @keydown.native.enter="submitForm"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm" class="btn">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/api";
export default {
  data() {
    const CheckAccount = (rule, val, callback) => {
      if (!val) {
        callback(new Error("用户名不能为空"));
      } else if (!this.acc_reg.test(val)) {
        callback(new Error("请输入3到16位（字母，数字，下划线，减号）"));
      } else {
        callback();
      }
    };
    const CheckPwd = (rule, val, callback) => {
      if (!val) {
        callback(new Error("密码不能为空"));
      } else if (!this.acc_reg.test(val)) {
        callback(new Error("请输入3到16位（字母，数字，下划线，减号）"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        account: "",
        password: "",
      },
      acc_reg:/^[a-zA-Z0-9_-]{3,16}$/,
      rules: {
        account: [{ required: true, validator: CheckAccount, trigger: "blur" }],
        password: [{ required: true, validator: CheckPwd, trigger: "blur" }],
      },
      isOpen: false,
    };
  },
  methods: {
    changeIcon(e) {
      if (e.target.className.includes("icon-yanjing")) {
        this.isOpen = !this.isOpen;
      }
    },
    submitForm() {
      login(this.loginForm.account, this.loginForm.password).then((res) => {
        console.log(res)
          if (res.data.code === 0) {
            //把token存入本地
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", this.loginForm.account);
            localStorage.roles = res.data.role;
            localStorage.checkPass = this.loginForm.password;
            localStorage.ids = res.data.id;
            this.$router.push("/home");
          }else {
          console.log("error submit!!");
          return false;
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  width: 100%;
  background: url("../assets/imgs/1.jpg") no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .container-login {
    width: 400px;
    .title {
      color: skyblue;
      font-size: 24px;
      text-align: center;
      margin-bottom: 10px;
    }
    .el-form {
      .el-form-item {
        .el-input {
          background-color: skyblue;
        }
        .btn {
          width: 100%;
        }
      }
    }
  }
}
</style>