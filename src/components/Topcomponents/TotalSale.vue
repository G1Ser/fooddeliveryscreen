<template>
    <div class="total-sale">
        <commoncard title="累计销售额" :value="ChartDataStore.TopCompList.salesToday">
            <template #default>
                <div>
                    <span>日同比</span>
                    <span class="css1">{{ChartDataStore.TopCompList.salesGrowLastDay}}%</span>
                    <span :class="ChartDataStore.TopCompList.salesGrowLastDay>0?'increase':'decrease'"></span>
                </div>
                <div>
                    <span>月同比</span>
                    <span class="css1">{{ChartDataStore.TopCompList.saleSGrowLastMonth}}%</span>
                    <span :class="ChartDataStore.TopCompList.saleSGrowLastMonth>0?'increase':'decrease'"></span>
                </div>
            </template>
            <template #footer>
                <span>昨日销售额</span>
                <span class="css1">￥{{ ChartDataStore.TopCompList.salesLastDay }}</span>
            </template>
        </commoncard>
    </div>
</template>

<script setup>
import commoncard from'./CommonCard.vue'
import {useChartDataStore} from '@/stores/counter'
const ChartDataStore = useChartDataStore();
ChartDataStore.GetTopcomp();
</script>

<style lang="scss" scoped></style>
