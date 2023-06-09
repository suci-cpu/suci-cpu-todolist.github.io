<template>
<div>
  <DataStatistic />
  <BarChart v-if="this.$store.state.whichChartType === '柱状图'"/>
  <LineChart v-if="this.$store.state.whichChartType === '折线图'"/>
  <PieChart v-if="this.$store.state.whichChartType === '饼状图'"/>
  <ScatterChart v-if="this.$store.state.whichChartType === '散点图'"/>
</div>
</template>

<script>
import DataStatistic from "@/components/pages/WordDataStatisticMenu";
import BarChart from "@/components/views/datastatistic/BarChart";
import LineChart from "@/components/views/datastatistic/LineChart";
import PieChart from "@/components/views/datastatistic/PieChart";
import ScatterChart from "@/components/views/datastatistic/ScatterChart";
export default {
  name: "WordReciteSituation",
  components: {BarChart, DataStatistic,LineChart,PieChart,ScatterChart},
}
</script>

<style scoped>

</style>