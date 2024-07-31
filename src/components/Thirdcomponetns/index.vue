<template>
    <div class="third-comp">
        <div class="left">
            <el-card shadow="hover">
                <template #header>
                    <span style="font-weight: 600;">关键词搜索</span>
                </template>
                <div class="main">
                    <div class="charts">
                        <div class="left-chart">
                            <div class="title">搜索用户量</div>
                            <div class="number" style="margin-top: 10px;">933</div>
                            <v-chart :option="option1"></v-chart>
                        </div>
                        <div class="right-chart">
                            <div class="title">搜索量</div>
                            <div class="number" style="margin-top: 10px;">10626</div>
                            <v-chart :option="option2"></v-chart>
                        </div>
                    </div>
                    <div class="table">
                        <el-table :data="tableData" style="width: 100%">
                            <el-table-column prop="rank" label="排名" width="60" align="center" />
                            <el-table-column prop="keyWord" label="关键词" align="center" />
                            <el-table-column prop="totalSearch" label="总搜索量" align="center" />
                            <el-table-column prop="totalUser" label="搜索用户数" align="center" />
                        </el-table>
                        <el-pagination background layout="prev, pager, next" :total="40" @current-change="changepage" />
                    </div>
                </div>
            </el-card>
        </div>
        <div class="right">
            <el-card shadow="hover">
                <template #header>
                    <span style="font-weight: 600;">分类销售排行</span>
                    <el-radio-group v-model="type" @change="clickbutton">
                        <el-radio-button label="品类" />
                        <el-radio-button label="商品" />
                    </el-radio-group>
                </template>
                <div style="height: 470px;">
                    <v-chart :option="option3"></v-chart>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useChartDataStore } from '@/stores/counter'
const ChartDataStore = useChartDataStore();
const tableData = ref([])
const totalData = ref([])
const option1 = ref({})
const option2 = ref({})
const option3 = ref({})
const data1 = ref()
const data2 = ref()
const type = ref("品类")
function changepage(index) {
    tableData.value = totalData.value.slice((index - 1) * 6, index * 6)
}
function renderoption(data) {
    return {
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
                type: 'line',
                data: data,
                areaStyle: { color: 'skyblue' },
                itemStyle: { opacity: 0 },
                smooth: true
            }
        ],
    }
}
function renderpiechart(data) {
    const total = data.reduce((sum,v)=>{
        return sum + v.value
    },0)
    return {
        title: [{
            text: '品类分布',
            textStyle: {
                fontSize: 14,
                color: '#666'
            },
            left: 20,
            top: 20
        }, {
            text: '累计订单量',
            subtext: total,
            x: '40%',
            y: '45%',
            textAlign: 'center',
            textStyle: { fontSize: 14, color: '#999' },
            subtextStyle: { fontSize: 28, color: '#333' }
        }],
        tooltip: {
            formatter:(params) =>{
                return params.seriesName + '<br>' + params.marker + params.data.title + '<br>' + params.marker + `销售额：${params.data.value}`
            }
        },
        legend:{
            orient:'vertical',
            left:'80%',
            top:'top',
            textStyle:{color:"#888"}
        },
        series: {
            type: 'pie',
            name: '品类分布',
            data: data,
            radius: ['45%', '60%'],
            center: ['40%', '50%'],
            itemStyle: { borderWidth: 8, borderColor: '#fff' },
            label:{show:true,position:'outside',formatter:(params)=>{
                return params.data.title
            }}
        }
    }
}
function clickbutton(radio){
    if(radio==="品类"){
        option3.value=renderpiechart(ChartDataStore.PieChartList.data1)
    }else{
        option3.value=renderpiechart(ChartDataStore.PieChartList.data2)
    }
}
onMounted(async () => {
    await ChartDataStore.GetThirdcomp();
    await ChartDataStore.GetPiechart();
    totalData.value = ChartDataStore.ThirdCompList
    data1.value = totalData.value.map(item => item.totalUser).slice(0, 10).reverse()
    data2.value = totalData.value.map(item => item.totalSearch).slice(0, 10).reverse()
    option1.value = renderoption(data1.value)
    option2.value = renderoption(data2.value)
    changepage("1")
    clickbutton("品类")
})
</script>

<style lang="scss" scoped>
.third-comp {
    display: flex;
    margin-top: 20px;
    gap: 20px;

    .left {
        width: 50%;

        .main {
            padding: 20px;

            .charts {
                display: flex;
                gap: 20px;

                .left-chart {
                    width: 50%;
                }

                .right-chart {
                    width: 50%;
                }

                .title {
                    font-size: 14px;
                    color: #727171
                }

                .number {
                    font-size: 20px;
                    font-weight: 600;
                }

                .echarts {
                    height: 50px;
                }
            }

            .table {
                .el-pagination {
                    display: flex;
                    justify-content: flex-end;
                    margin-top: 16px;
                }
            }
        }
    }

    .right {
        width: 50%;

        .el-card ::v-deep .el-card__header {
            position: relative;
        }

        .el-radio-group {
            position: absolute;
            right: 2%;
            top: 25%
        }
    }
}
</style>