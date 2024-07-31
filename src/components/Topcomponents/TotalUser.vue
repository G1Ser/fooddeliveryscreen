<template>
    <div class="total-user">
        <CommonCard title="累计用户数" :value="ChartDataStore.TopCompList.totalUser">
            <template #default>
                <v-chart :option="option"></v-chart>
            </template>
            <template #footer>
                <div class="wrapper">
                    <div>
                        <span>日同比</span>
                        <span class="css1">{{ChartDataStore.TopCompList.userGrowLastDay}}%</span>
                        <span :class="ChartDataStore.TopCompList.userGrowLastDay>0?'increase':'decrease'"></span>
                    </div>
                    <div>
                        <span>月同比</span>
                        <span class="css1">{{ChartDataStore.TopCompList.userGrowLastMonth}}%</span>
                        <span :class="ChartDataStore.TopCompList.userGrowLastMonth>0?'increase':'decrease'"></span>
                    </div>
                </div>
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
        xAxis: {
            type: 'value',
            show: false,
        },
        yAxis: {
            type: 'category',
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
                type: 'bar',
                data: [ChartDataStore.TopCompList.userLastMonth],
                barWidth:10,
                itemStyle:{color:'green'},
                stack:'总量'
            },
            {
                type:'bar',
                data:[ChartDataStore.TopCompList.userToday],
                barWidth:10,
                itemStyle:{color:'#ddd'},
                stack:'总量'
            }
        ]
    };
})
</script>

<style lang="scss" scoped>
.wrapper{
    display: flex;
    gap: 3%;
}
</style>