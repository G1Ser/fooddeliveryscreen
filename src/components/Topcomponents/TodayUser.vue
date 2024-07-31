<template>
    <div class="today-user">
        <CommonCard title="今日用户交易数" :value="ChartDataStore.TopCompList.userToday">
            <template #default>
                <v-chart :option="option"></v-chart>
            </template>
            <template #footer>
                <span>退货率</span>
                <span class="css1">{{ ChartDataStore.TopCompList.returnRate }}%</span>
            </template>
        </CommonCard>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CommonCard from './CommonCard.vue';
import { useChartDataStore } from '@/stores/counter'
const ChartDataStore = useChartDataStore();
const option = ref({})
onMounted(async () => {
    await ChartDataStore.GetTopcomp();
    option.value = {
        tooltip: {
        },
        xAxis: {
            type: 'category',
            show: false,
            data: ['00:00', '03:00', '05:00', '07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00', '23:00']
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
                name: '实时交易量',
                type: 'bar',
                barWidth: '60%',
                data: ChartDataStore.TopCompList.orderUserTrend
            }
        ]
    };
})
</script>

<style lang="scss" scoped></style>