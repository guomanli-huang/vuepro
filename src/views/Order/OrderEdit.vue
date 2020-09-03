<template>
  <div id="orderEdit">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>编辑订单</span>
      </div>
      <el-form :model="formInline">
        <el-form-item label="订单号" :label-width="formLabelWidth">
          <el-input v-model="formInline.orderNo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="下单时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="formInline.orderTime"
            type="datetime"
            autocomplete="off"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="formInline.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货人" :label-width="formLabelWidth">
          <el-input v-model="formInline.consignee" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="送货地址" :label-width="formLabelWidth">
          <el-input v-model="formInline.deliverAddress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="送达时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="formInline.deliveryTime"
            type="datetime"
            autocomplete="off"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="formInline.remarks" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="订单金额" :label-width="formLabelWidth">
          <el-input v-model="formInline.orderAmount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="formInline.orderState" placeholder="请选择活动区域">
            <el-option value="派送中">派送中</el-option>
            <el-option value="已受理">已受理</el-option>
            <el-option value="已完成">已完成</el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-left:120px">
          <el-button type="primary" @click="confirmBtn">点击编辑</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { editOrder } from "@/api/api";
export default {
  data() {
    return {
      formInline: {
        id:"",
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        deliverAddress: "",
        deliveryTime: "",
        remarks: "",
        orderAmount: "",
        orderTime: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    confirmBtn() {
      editOrder(
        this.formInline.id,
        this.formInline.orderNo,
        this.formInline.orderTime,
        this.formInline.phone,
        this.formInline.consignee,
        this.formInline.deliverAddress,
        this.formInline.deliveryTime,
        this.formInline.remarks,
        this.formInline.orderAmount,
        this.formInline.orderState
      ).then((res) => {
          this.formInline=res.data.data
          this.$router.push("/order/orderlist")
      });
    },
  },
  created(){
    this.formInline=JSON.parse(localStorage.getItem("rows"));
  }
};
</script>

<style scoped>
#orderEdit {
  width: 100%;
  height: 100%;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}
.el-input {
  width: 400px;
}
</style>