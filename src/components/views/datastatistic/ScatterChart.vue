<template>
  <div style="height: 738px;width: 100%"></div>
</template>

<script>
export default {
  name: "ScatterChart",
  data() {
    return {
      xData: this.$store.state.xAxis, //横坐标
      yData: this.$store.state.yData,  //数据
      scatterData: this.$store.state.allStatisticData.scatterData,  //数据
    };
  },
  mounted() {
    this.initEcharts();
  },
  methods: {
    initEcharts() {
      // 散点图
      const option = {
        title: this.$store.state.tittle,
        tooltip: {
          trigger: 'item'
        },
        xAxis: {
          type: 'value',
          scale: true
        },
        yAxis: {
          type: 'value',
          scale: true
        },
        series: [
          {
            symbolSize: 20,
            data: this.scatterData,
            type: 'scatter',
            markLine : {
              symbol: ['none'], //['none']表示是一条横线；['arrow', 'none']表示线的左边是箭头，右边没右箭头；['none','arrow']表示线的左边没有箭头，右边有箭头
              label:{
                position:"start" //将警示值放在哪个位置，三个值“start”,"middle","end" 开始 中点 结束
              },
              data : [{
                silent:false, //鼠标悬停事件 true没有，false有
                lineStyle:{ //警戒线的样式 ，虚实 颜色
                  type:"solid", //样式  ‘solid’和'dotted'
                  color:"#FA3934",
                  width: 3   //宽度
                },
                yAxis: 1 // 警戒线的标注值，可以有多个yAxis,多条警示线 或者采用 {type : 'average', name: '平均值'}，type值有 max min average，分为最大，最小，平均值
              }]
            },
          },
        ]
      };
      const myChart = this.$echarts.init(this.$el);
      this.scatterChart=myChart
      this.scatterChartOption = option
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
        this.scatterChart.setOption(this.scatterChartOption);
      },
    }
  }
}
</script>

<style scoped>

</style>