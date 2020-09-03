<template>
  <div id="accountlist">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账号列表</span>
      </div>
      <el-table
        ref="tableData"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%;margin-bottom:20px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="100"></el-table-column>
        <el-table-column prop="account" label="账号" width="200"></el-table-column>
        <el-table-column prop="userGroup" label="用户组" width="200"></el-table-column>
        <el-table-column prop="ctime" label="创建时间" width="200"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit( scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="margin-bottom:20px"
      ></el-pagination>
      <div>
        <el-button type="primary" @click="allDel">批量删除</el-button>
        <el-button type="danger" @click="confirmSelect">取消选择</el-button>
      </div>
      <el-dialog title="编辑账号列表" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="账号" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="用户组" :label-width="formLabelWidth">
            <el-select v-model="form.groups" placeholder="请选择活动区域" style="width:300px">
              <el-option label="超级管理员" value="超级管理员"></el-option>
              <el-option label="普通管理员" value="普通管理员"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-left:220px">
            <template>
              <el-button type="primary" @click="confirmBtn()">确 定</el-button>
              <el-button @click="dialogFormVisible = false">取 消</el-button>
            </template>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import moment from "moment";
import { getAccList, delAcc, editAcc, btcAccList } from "@/api/api";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 10,
      dialogFormVisible: false,
      form: { name: "", groups: "" },
      formLabelWidth: "80px",
    };
  },
  created() {
    this.fetchdata();
  },
  methods: {
    allDel() {
      this.$confirm("此操作将永久删除选中的账号列表, 是否继续?", "闪云温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          btcAccList(JSON.stringify(this.ids)).then((res) => {
            if (res.data.code == 0) {
              this.fetchdata();
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    confirmSelect() {
      this.$refs.tableData.clearSelection();
    },
    handleEdit(row) {
      this.dialogFormVisible = true;
      this.form = { ...row };
    },
    confirmBtn() {
      editAcc(this.form.id, this.form.name, this.form.groups).then((res) => {
        if (res.data.code == 0) {
          this.fetchdata();
          this.dialogFormVisible = false;
        }
      });
    },
    handleSelectionChange(rows) {
      console.log(rows);
      this.ids = rows.map((v) => v.id);
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.fetchdata();
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.fetchdata();
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除该账号, 是否继续?", "闪云温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          delAcc(id).then((res) => {
            if (res.data.code == 0) {
              this.fetchdata();
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    fetchdata() {
      getAccList(this.currentPage, this.pageSize).then((res) => {
        res.data.data.forEach((v) => {
          v.ctime = moment(v.ctime).format("YYYY/MM/DD");
        });
        this.total = res.data.total;
        this.tableData = res.data.data;
      });
    },
  },
};
</script>

<style lang="less" scoped>
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
  height: 700px;
}
</style>