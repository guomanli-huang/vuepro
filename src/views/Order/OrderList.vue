<template>
  <div id="accountadd">
    <el-card class="box-card">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="订单号">
          <el-input v-model="form.orderNo" placeholder="订单号"></el-input>
        </el-form-item>
        <el-form-item label="收货人">
          <el-input v-model="form.consignee" placeholder="收货人"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <span style="font-size:14px;color:grey;margin-right:10px">订单管理</span>
        <el-select v-model="form.orderState" placeholder="订单状态">
          <el-option value="派送中">派送中</el-option>
          <el-option value="已受理">已受理</el-option>
          <el-option value="已完成">已完成</el-option>
        </el-select>
      </el-form>
      <div style="margin-bottom:10px">
        <span style="margin-right:10px">选择时间</span>
        <el-date-picker
          v-model="form.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-button type="primary" size="small" style="margin-left:10px" @click="checkBtn">查询</el-button>
      </div>
      <el-table :data="tableData" style="width:1250px;margin-bottom:30px" v-loading="loading">
        <el-table-column fixed prop="orderNo" label="订单号" width="150"></el-table-column>
        <el-table-column prop="orderTime" label="下单时间" width="200"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
        <el-table-column prop="consignee" label="收货人" width="120"></el-table-column>
        <el-table-column prop="deliverAddress" label="配送地址" width="200"></el-table-column>
        <el-table-column prop="deliveryTime" label="送达时间" width="180"></el-table-column>
        <el-table-column prop="remarks" label="用户备注" width="180"></el-table-column>
        <el-table-column prop="orderAmount" label="订单金额" width="180"></el-table-column>
        <el-table-column prop="orderState" label="订单状态" width="180"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="seeBtn(scope.row.id)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10,15, 20]"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total,prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <el-dialog title="查看订单详情" :visible.sync="dialogFormVisible">
        <el-form :model="formInline">
          <el-form-item label="订单号" :label-width="formLabelWidth">
            <el-input v-model="formInline.orderNo" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="下单时间" :label-width="formLabelWidth">
            <el-input v-model="formInline.orderTime" autocomplete="off"></el-input>
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
            <el-input v-model="formInline.deliveryTime" autocomplete="off"></el-input>
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
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import moment from "moment";
import { getOrderList, checkOrder, getOrderDetetil } from "@/api/api";
export default {
  data() {
    return {
      value: "",
      pageSize: 5,
      formInline: {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        deliverAddress: "",
        deliveryTime: "",
        remarks: "",
        orderAmount: "",
        date: [],
      },
      currentPage: 1,
      loading: true,
      total: 10,
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        date: [],
      },
    };
  },
  methods: {
    checkBtn() {
      checkOrder(
        this.currentPage,
        this.pageSize,
        this.form.orderNo,
        this.form.consignee,
        this.form.phone,
        this.form.orderState,
        this.form.date == null
          ? JSON.stringify([])
          : JSON.stringify(this.form.date)
      ).then((res) => {
        res.data.data.forEach((v) => {
          v.orderTime = moment(v.orderTime).format("YYYY:MM:DD HH:mm:ss");
        });
        res.data.data.forEach((v) => {
          v.deliveryTime = moment(v.deliveryTime).format("YYYY:MM:DD HH:mm:ss");
        });
        this.tableData = res.data.data;
        // console.log(this.formInline)
        this.total = res.data.total;
        // this.fetchData()
      });
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.fetchData();
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.fetchData();
    },
    handleEdit(row) {
      localStorage.setItem("rows", JSON.stringify(row));
      this.$router.push("/order/orderedit");
    },
    seeBtn(id) {
      getOrderDetetil(id).then((res) => {
        res.data.data.orderTime = moment(res.data.data.orderTime).format(
          "YYYY:MM:DD HH:mm:ss"
        );
        res.data.data.deliveryTime = moment(res.data.data.deliveryTime).format(
          "YYYY:MM:DD HH:mm:ss"
        );
        this.dialogFormVisible = true;
        // this.formInline=JSON.parse(JSON.stringify(this.formInline))
        this.formInline = res.data.data;
        console.log(res);
      });
    },
    fetchData() {
      setTimeout(() => {
        getOrderList(
          this.currentPage,
          this.pageSize,
          this.formInline.orderNo,
          this.formInline.consignee,
          this.formInline.phone,
          this.formInline.orderState,
          this.formInline.date == null
            ? JSON.stringify([])
            : JSON.stringify(this.formInline.date)
        ).then((res) => {
          //  console.log(res)
          res.data.data.forEach((v) => {
            v.orderTime = moment(v.orderTime).format("YYYY/MM/DD HH:mm:ss");
            v.deliveryTime = moment(v.deliveryTime).format(
              "YYYY/MM/DD HH:mm:ss"
            );
          });
          this.total = res.data.total;
          this.tableData = res.data.data;
          this.loading=false
          // console.log(this.formInline);
          this.checkBtn();
        });
      }, 2000);
      
   
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style lang="less" scoped>
#accountadd {
  width: 100%;
  height: 100%;
  .el-card {
    width: 100%;
    height: 800px;
    .el-table {
      height: 600px;
    }
    .el-input {
      width: 200px;
      height: 20px;
    }
  }
}
</style>