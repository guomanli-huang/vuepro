<template>
  <div id="goodscate">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品分类</span>
        <el-button style="float: right; padding: 10px" type="primary" @click="addGoodsCate">添加分类</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%;margin-bottom:20px">
        <el-table-column label="序号">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分类名称">
          <template slot-scope="scope">
            <div slot="reference">
              <span v-show="!scope.row.isEdit">{{ scope.row.cateName }}</span>
              <input
                type="text"
                v-show="scope.row.isEdit"
                v-model="scope.row.cateName"
                style="width:200px;height:20px"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="是否启用">
          <template slot-scope="scope">
            <el-switch
              :disabled="!scope.row.isEdit"
              v-model="scope.row.state"
              prop="state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :type="scope.row.isEdit?'success':'primary'"
              @click="handleEdit(scope.row)"
            >{{scope.row.isEdit?"完成":"编辑"}}</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 3, 6, 9]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="分类名称" :label-width="formLabelWidth">
            <el-input v-model="form.catename" autocomplete="off" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="是否启用" :label-width="formLabelWidth">
            <el-switch v-model="form.state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmBtn()">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { addCate, getCateList, delCate, editCate } from "@/api/api";
export default {
  data() {
    return {
      tableData: [],
      state: true,
      dialogFormVisible: false,
      form: {
        catename: "",
        state: true,
      },
      formLabelWidth: "90px",
      currentPage: 1,
      pageSize: 9,
      total: 18,
      isEdit: false,
    };
  },
  methods: {
    fetchData() {
      getCateList(this.currentPage, this.pageSize).then((res) => {
        res.data.data.forEach((v) => {
          v.isEdit = false;
          v.state = v.state == 1 ? true : false;
        });

        this.total = res.data.total;
        this.tableData = res.data.data;

        // console.log(res);
      });
    },
    handleEdit(row) {
      row.isEdit = !row.isEdit;
      console.log(row.isEdit);
      if (!row.isEdit) {
        editCate(row.id, row.cateName, row.state).then((res) => {
          console.log(res);
          if (res.data.code == 0) {
            this.$message({
              message: "恭喜你，修改分类成功",
              type: "success",
            });
            this.fetchData();
          }
        });
      }
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "闪云温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          delCate(id).then((res) => {
            if (res.data.code == 0) {
              this.fetchData();
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
    addGoodsCate(row) {
      this.dialogFormVisible = !this.dialogFormVisible;
      this.form = { ...row };
    },
    confirmBtn() {
      addCate(this.form.catename, this.form.state).then((res) => {
        // console.log(res);
        if (res.data.code == 0) {
          this.fetchData();
          this.dialogFormVisible = false;
        }
      });
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.fetchData();
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.fetchData();
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style lang="less" scoped>
#goodscate {
  width: 100%;
  height: 100%;
}
.box-card {
  height: 700px;
}
</style>