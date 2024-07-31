<template>
  <div class="total-count">
    <CommonCard title="累计订单额" :value="ChartDataStore.TopCompList.orderToday">
      <template #default>
        <v-chart :option="option"></v-chart>
      </template>
      <template #footer>
        <span>昨日销售额</span>
        <span class="css1">￥{{ ChartDataStore.TopCompList.orderLastDay }}</span>
      </template>
    </CommonCard>
  </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue'
import CommonCard from './CommonCard.vue';
import { useChartDataStore } from '@/stores/counter'
const ChartDataStore = useChartDataStore();
const option = ref({});
onMounted(async () => {
  await ChartDataStore.GetTopcomp();
  option.value = {
    xAxis: {
      type: 'category',
      show: false,
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      show: false
    },
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    },
    series: [
      {
        data: ChartDataStore.TopCompList.orderTrend,
        type: 'line',
        areaStyle: { color: 'purple' },
        lineStyle: { width: 0 },
        itemStyle: { opacity: 0 },
        smooth: true
      }
    ]
  };
})
</script>
  
<style lang="scss" scoped></style>
  