<template>
  <div id="goodstotal">
    <div class="top">
      <span style="margin-right:10px">时间范围</span>
      <el-date-picker
        v-model="date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button type="primary" size="medium" style="margin-left:10px" @click="searchBtn">搜索</el-button>
    </div>
    <div class="bottom" ref="dataEcharts"></div>
  </div>
</template>

<script>
import { getGoodsEcharts } from "@/api/api";
import moment from "moment";
export default {
  data() {
    return {
      date: [],
    };
  },
  methods: {
    searchBtn() {
      getGoodsEcharts(JSON.stringify(this.date)).then((res) => {
        // console.log(res);
        var dateTime = res.data.data.map((v) => {
          return v.orderTime;
        });
        var dateTime = dateTime.map((v) => {
          return moment(v).format("YYYY:MM:DD HH:mm:ss");
        });

        var option = {
          title: {
            text: "商品统计图",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985",
              },
            },
          },
          legend: {
            data: ["商品统计"],
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: true,
              data: dateTime,
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: [
            {
              name: "商品统计",
              type: "bar",
              stack: "总量",
              data: res.data.data.map((v) => v.orderAmount),
            },
          ],
        };
        this.myChart.setOption(option);
      });
    },
  },
  mounted() {
    this.myChart = this.$echarts.init(this.$refs.dataEcharts);
    this.searchBtn()
  },
};
</script>

<style lang="less" scoped>
#goodstotal {
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  .top {
    height: 80px;
  }
  .bottom {
    width: 100%;
    height: 600px;
    background-color: #fff;
    padding: 10px;
    box-sizing: border-box;
  }
}
</style>