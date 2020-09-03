<template>
  <div id="accountadd">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账号添加</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="acc">
          <el-input type="text" v-model="ruleForm.acc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="checkPass" width="200">
          <el-input type="text" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户组" prop="groups">
          <el-select v-model="ruleForm.groups" placeholder="请选择用户组">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="普通管理员" value="普通管理员"></el-option>
          </el-select>
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
import {addAcc} from "@/api/api"
export default {
  data() {
    var checkGroups = (rule, value, callback) => {
       if(!value){
          callback(new Error("需要选择用户组类型"));
       }
    };
    var checkAcc = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (!this.acc_reg.test(value)) {
          callback(new Error("输入的密码要超过3位数字"));
        }
        callback();
      }
    };
    var checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!this.acc_reg.test(value)) {
        callback(new Error("输入的密码要超过3位数字"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
       acc: "",
        checkPass: "",
        groups: "",
      },
      acc_reg:/^[a-zA-Z0-9_-]{3,16}$/,
      rules: {
        acc: [{require:true, validator:checkAcc, trigger: "blur" }],
        checkPass: [{ require:true,validator: checkPass, trigger: "blur" }],
        groups: { required: true, message: '请选择账号管理员', trigger: 'blur' },
      },
    };
  },
  methods: {
    submitForm() {
      addAcc(this.ruleForm.acc,this.ruleForm.checkPass,this.ruleForm.groups).then((res)=>{
        if(res.data.code==0){
          this.$message({
              message: "恭喜你，添加账号成功",
              type: "success",
            });
          this.$router.push("/account/accountlist")
        }else{
          alert("请重新添加")
        }
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    },
  },
};
</script>

<style lang="less" scoped>
.box-card {
  width:100%;
  height: 350px;
  .el-input {
    width: 250px;
  }
}
</style>