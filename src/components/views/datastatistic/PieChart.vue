<template>
  <div style="height: 738px;width: 100%"></div>
</template>

<script>
export default {
  name: "PieChart",
  data() {
    return {
      xData: this.$store.state.allStatisticData.taskData.pieData,
    };
  },
  mounted() {
    this.initEcharts();
  },
  methods: {
    initEcharts() {
      // 饼状图
      const option = {
        title: this.$store.state.tittle,
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            data: this.xData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      const myChart = this.$echarts.init(this.$el);
      this.pieChart=myChart
      this.pieChartOption = option
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
        this.pieChart.setOption(this.pieChartOption);
      },
    }
  }
}
</script>

<style scoped>

</style>