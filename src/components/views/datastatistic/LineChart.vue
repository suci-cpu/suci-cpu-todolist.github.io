<template>
  <div style="height: 738px;width: 100%"></div>
</template>

<script>
export default {
  name: "LineChart",
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
      // 折线图
      const option = {
        title: this.$store.state.tittle,
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: this.xData
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.yData,
            type: 'line'
          }
        ]
      };
      const myChart = this.$echarts.init(this.$el);
      this.lineChart=myChart
      this.lineChartOption = option
      myChart.clear();
      myChart.resize()
      myChart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    }
  },
  watch:{
    xData:{
      handler:function () {
        console.log('监测到computedXData变化')
        this.lineChart.setOption(this.lineChartOption);
      },
    }
  }
}
</script>

<style scoped>

</style>