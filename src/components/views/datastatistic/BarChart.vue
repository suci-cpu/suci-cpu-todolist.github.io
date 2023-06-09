<template>
  <div style="height: 738px;width: 100%"></div>
</template>

<script>
export default {
  name: "BarChart",
  data() {
    return {
      xData: this.$store.state.xAxis, //横坐标
      yData: this.$store.state.yData, //数据
    };
  },
  mounted() {
    this.initEcharts();
  },
  methods: {
    initEcharts() {
      // 基本柱状图
      const option = {
        title: this.$store.state.tittle,
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [{
          data: this.xData
        },
        ],
        yAxis: {},
        series: [
          {
            type: "bar", //形状为柱状图
            showBackground: true,
            data: this.yData
          }
        ]
      };
      const myChart = this.$echarts.init(this.$el);
      this.barChart = myChart
      this.barChartOption = option
      myChart.clear();
      myChart.resize()
      myChart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    }
  },
  watch: {
    xData: {
      handler: function () {
        this.barChart.setOption(this.barChartOption);
      },
    }
  }
}
</script>

<style scoped>

</style>