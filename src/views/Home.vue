<template>
  <div id="home">
    <div class="top">
      <Card v-for="(v,index) in data" :key="index" :item="v" />
    </div>
    <div ref="dataEcharts" class="bottom"></div>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import {getEchartsMsg} from "@/api/api"
export default {
  data() {
    return {
      data: [
        {
          imgUrl: require("@/assets/imgs/flie1.png"),
          title: "总订单",
          total: "2000,19",
        },
        {
          imgUrl: require("@/assets/imgs/qian.png"),
          title: "总销售额",
          total: "2000,19",
        },
        {
          imgUrl: require("@/assets/imgs/file2.png"),
          title: "今日订单数",
          total: "2000,19",
        },
        {
          imgUrl: require("@/assets/imgs/qian1.png"),
          title: "今日销售额",
          total: "2000,19",
        },
      ],
    };
  },
  components: {
    Card,
  },
  mounted() {
    getEchartsMsg().then(res=>{
      console.log(res);
       var myChart = this.$echarts.init(this.$refs.dataEcharts),
        option = {
          title: {
            text: "数据统计",
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
            data: ["订单统计", "销售统计"],
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
              data:res.data.xData
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: [
            {
              name: "销售统计",
              type: "line",
              stack: "总量",
              data:res.data.amountData
            },
            {
              name: "订单统计",
              type: "line",
              stack: "总量",
              data:res.data.orderData
            },
          ],
        };
      myChart.setOption(option);
    })
  },
};
</script>

<style lang="less" scoped>
#home {
  flex: 1;
  height: 100%;
  width: 100%;
  .top {
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: space-around;
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
