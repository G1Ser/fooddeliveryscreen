<template>
    <div class="second-comp">
        <el-card shadow="hover">
            <template #header>
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="1">销售额</el-menu-item>
                    <el-menu-item index="2">访问量</el-menu-item>
                </el-menu>
                <div class="right">
                    <el-radio-group v-model="time">
                        <el-radio-button label="今日" />
                        <el-radio-button label="本周" />
                        <el-radio-button label="本月" />
                        <el-radio-button label="今年" />
                    </el-radio-group>
                    <el-date-picker v-model="picktime" type="datetimerange" :shortcuts="shortcuts" range-separator="至"
                        start-placeholder="开始日期" end-placeholder="结束日期" />
                </div>
            </template>
            <div class="card-content">
                <div class="left-chart">
                    <v-chart :option="option"></v-chart>
                </div>
                <div class="right-list">
                    <h3>排行榜</h3>
                    <div class="list-item" v-for="(list,index) in lists" :key="index">
                        <span :class="index>2?'':'top3'" style="width: 20px;height: 20px;border-radius: 10px;text-align: center;line-height: 20px;">{{ list.no }}</span>
                        <span style="flex:1">{{ list.title }}</span>
                        <span>{{ list.sales }}</span>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useChartDataStore } from '@/stores/counter'
const ChartDataStore = useChartDataStore();
const option = ref({})
const lists = ref([])
function renderoption(x, y) {
    option.value = {
        title: {
            text: "年度销售额",
            textStyle: {
                fontWeight: 600,
                fontSize: 14
            }
        },
        xAxis: {
            type: 'category',
            data: x,
            axisTick: {
                alignWithLabel: true
            }
        },
        yAxis: {
            type: 'value',
        },
        grid: {
            left: 40
        },
        series: [
            {
                type: 'bar',
                barWidth: '40%',
                data: y
            }
        ],
        color: 'skyblue'
    };
}
onMounted(async () => {
    await ChartDataStore.GetSecondcomp();
    renderoption(ChartDataStore.SecondCompList.saleFulleYearAxis,ChartDataStore.SecondCompList.saleFulleYear)
    lists.value = ChartDataStore.SecondCompList.saleRank
})
const activeIndex = ref("1")
const time = ref("今日")
const picktime = ref("")
const shortcuts = [
    {
        text: '最近一周',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
        },
    },
    {
        text: '最近一个月',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
        },
    },
    {
        text: '最近三个月',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
        },
    },
]
function handleSelect(index) {
    activeIndex.value = index
    if(activeIndex.value === "1"){
        renderoption(ChartDataStore.SecondCompList.saleFulleYearAxis,ChartDataStore.SecondCompList.saleFulleYear)
        lists.value = ChartDataStore.SecondCompList.saleRank
    } 
    if(activeIndex.value === "2"){
        renderoption(ChartDataStore.SecondCompList.visitFullYeadAxis,ChartDataStore.SecondCompList.visitFullYear)
        lists.value = ChartDataStore.SecondCompList.visitRank
    }
}
</script>

<style lang="scss" scoped>
.second-comp {
    position: relative;
    margin-top: 20px;

    .right {
        display: flex;
        align-items: center;
        position: absolute;
        top: 15px;
        right: 2%;

        .el-radio-group {
            margin-right: 20px;
        }
    }

    .el-card ::v-deep .el-card__header {
        padding: 0;
        border-bottom: none
    }

    .el-menu {
        padding-left: 50px;
    }
}

.card-content {
    display: flex;

    .left-chart {
        width: 70%;
        height: 434px;
    }
    .right-list{
        width: 30%;
        height: 434px;
        h3{
            margin-bottom: 10px;
            font-size: 14px;
            font-weight: 600;
        }
        .list-item{
            margin: 20px 0;
            display: flex;
            gap:20px
        }
    }
}</style>