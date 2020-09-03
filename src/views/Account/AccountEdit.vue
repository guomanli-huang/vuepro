<template>
  <div id="accountadd">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>修改密码</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="原密码" prop="oldpass">
          <el-input type="text" v-model="ruleForm.oldpass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass" width="200">
          <el-input type="text" v-model="ruleForm.newPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {checkOldPass,editPass} from "@/api/api"
export default {
  data() {
    var newPass = (rule, value, callback) => {
      if (!value) {
       callback(new Error("新密码不能为空"));
      }else if(!this.acc_reg.test(value)){
        callback(new Error("3到16位（字母，数字，下划线，减号)"))
      }else{
        callback()
      }
     
    };
    var oldPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }else{
        checkOldPass(localStorage.getItem("checkPass"),localStorage.getItem("ids")).then((res)=>{
          console.log(res)
          if(!(res.data.code==0)){
          callback(new Error("输入的原密码有错误，请重新输入"));
          }else{
            callback()
          }
        })
      }
    };
    var checkPass = (rule, value, callback) => {
      if (value === "") {
       callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newPass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldpass: "",
        newPass: "",
        checkPass: "",
      },
      acc_reg: /^[a-zA-Z0-9_-]{3,16}$/,
      rules: {
        oldpass: [{ require: true, validator: oldPass, trigger: "blur" }],
        newPass: [{ require: true, validator: newPass, trigger: "blur" }],
        checkPass: [{ require: true, validator: checkPass, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm() {
      editPass(localStorage.getItem("ids"),this.ruleForm.newPass).then((res)=>{
        console.log(res)
        if(res.data.code==0){
          localStorage.clear()
          this.$router.push("/");
          
        }
      })
    },
    resetForm() {},
  },
};
</script>

<style lang="less" scoped>
.el-input {
  width: 250px;
}
</style>