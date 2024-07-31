<template>
    <v-chart :option="option"></v-chart>
</template>

<script setup>
import 'echarts-liquidfill'
import { ref, onMounted } from 'vue'
import { useChartDataStore } from '@/stores/counter'
const ChartDataStore = useChartDataStore();
const option = ref({})
function renderliquidfill(data) {
    return {
        series: [{
            type: 'liquidFill',
            data: [data],
            radius: '80%',
            color: ['red'],
            amplitude: '4%',
            outline: { borderDistance: 2, itemStyle: { borderWidth: 2 } }
        }]
    }
}
onMounted(async () => {
    await ChartDataStore.GetTopcomp();
    option.value = renderliquidfill((ChartDataStore.TopCompList.salesGrowLastDay/100).toFixed(2))
})
</script>

<style lang="scss" scoped></style>