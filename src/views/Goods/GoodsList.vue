<template>
  <div id="goodslist">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品列表</span>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品ID">
                <span>{{ props.row.id}}</span>
              </el-form-item>
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属分类">
                <span>{{ props.row.category}}</span>
              </el-form-item>
              <el-form-item label="商品价格">
                <span>{{ props.row.price}}</span>
              </el-form-item>
              <el-form-item label="商品图片">
                <span>{{ props.row.id}}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.ctime }}</span>
              </el-form-item>
              <el-form-item label="商品评价">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="店铺销量">
                <span>{{ props.row.sellCount }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.goodsDesc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="所属分类" prop="category"></el-table-column>
        <el-table-column label="商品价格" prop="price"></el-table-column>
        <el-table-column label="商品图片" prop="imgUrl">
          <template slot-scope="scope">
            <img :src="baseImgUrl+scope.row.imgUrl" width="50px" />
          </template>
        </el-table-column>
        <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
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
        style="margin-top:40px"
      ></el-pagination>
      <el-dialog title="编辑账号列表" :visible.sync="dialogFormVisible">
        <el-form label-position="left" :model="form">
          <el-form-item label="商品名称">
            <el-input v-model="form.name" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="所属分类">
            <el-select placeholder="请选择商品分类" v-model="form.category">
              <el-option
                v-for="item in categories"
                :key="item.cateName"
                :label="item.label"
                :value="item.cateName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.price" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="商品图片">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:5000/goods/goods_img_upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="form.imgUrl" :src="baseImgUrl+form.imgUrl" class="avatar" width="50px" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品描述">
            <textarea v-model="form.goodsDesc" style="width:300px;height:50px"></textarea>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="confirmBtn">确认</el-button>
            <el-button type="primary" @click="dialogFormVisible=false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { goodsList, delGoodsList, editGoods, goodsCate } from "@/api/api";
export default {
  data() {
    return {
      categories: [],
      tableData: [],
      value: true,
      currentPage: 1,
      total: 10,
      pageSize: 5,
      baseImgUrl: "http://127.0.0.1:5000/upload/imgs/goods_img/",
      dialogFormVisible: false,
      form: {
        name: "",
        price: "",
        imgUrl: "",
        goodsDesc: "",
        id: "",
        category: "",
      },
    };
  },
  methods: {
    confirmBtn() {
      editGoods(
        this.form.name,
        this.form.category,
        this.form.price,
        this.form.imgUrl,
        this.form.goodsDesc,
        this.form.id
      ).then((res) => {
        this.dialogFormVisible = false;
        // console.log(res);
        this.fetchData();
       
      });
    },
    handleEdit(row) {
      this.dialogFormVisible = true;
      this.form = { ...row };
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "闪云温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          delGoodsList(id).then((res) => {
            this.fetchData();
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
    handleSizeChange(size) {
      this.pageSize = size;
      this.fetchData();
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.fetchData();
    },
    fetchData() {
      goodsList(this.currentPage, this.pageSize).then((res) => {
        // console.log(res);
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    handleAvatarSuccess(res) {
      this.form.imgUrl = res.imgUrl;
    },
  },
  created() {
    this.fetchData();
    goodsCate().then((res) => {
      this.categories = res.data.categories;
      console.log(res.data.categories);
    });
  },
};
</script>

<style lang="less" scoped>
#goodslist {
  width: 100%;
  height: 100%;
}
.box-card {
  height: 1000px;
  overflow: scroll;
}
/deep/.demo-table-expand {
  font-size: 0;
}
/deep/.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>