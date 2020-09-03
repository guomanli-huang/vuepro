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
      <el-button type="primary" size="medium" style="margin-left:10px" @click="drawLineCharts">主要按钮</el-button>
    </div>
    <div class="bottom" ref="dataEcharts"></div>
  </div>
</template>

<script>
import { getGoodsEcharts } from "@/api/api";
import moment from "moment"
export default {
  data() {
    return {
      date: [],
    };
  },
  methods: {
    drawLineCharts() {
      getGoodsEcharts(JSON.stringify(this.date)).then((res) => {
        console.log(res)
        var dateTime = res.data.data.map((v) => {
          return v.orderTime;
        });
        var dateTime = dateTime.map((v) => {
          return moment(v).format("YYYY:MM:DD HH:mm:ss");
        });
        var option = {
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
            data: ["订单统计"],
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
              boundaryGap: false,
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
              name: "订单统计",
              type: "line",
              data: res.data.data.map((v) => {
               return v.orderAmount;
              }),
            },
          ],
        };

        this.myChart.setOption(option);
      });
    },
  },
  mounted() {
    this.myChart = this.$echarts.init(this.$refs.dataEcharts);
    this.drawLineCharts();
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