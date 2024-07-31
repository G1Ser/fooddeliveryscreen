<template>
    <v-chart :option="option"></v-chart>
</template>

<script setup>
import 'echarts-extension-amap'
import { ref, onMounted } from 'vue'
import { useChartDataStore } from '@/stores/counter'
const ChartDataStore = useChartDataStore();
const option = ref({})
function renderAMap(data) {
    return {
        amap: {
            center: [108.39, 39.9],
            zoom: 4,
            // 禁用缩放
            zoomEnable: false,
            mapStyle: "amap://styles/grey"
        },
        title: {
            text: '新中地网点地图',
            top: '20px',
            left: 'center',
            textStyle: { color: "#999" }
        },
        tooltip: {},
        series: [{
            name: 'Top10',
            coordinateSystem: 'amap',
            type: 'effectScatter',
            data: data.sort((a, b) => { return b.value[2] - a.value[2] }).slice(0, 10),
            //使用编码进行渲染scatter
            encode: { value: 2 },
            symbolSize: function (value) {
                return value[2] / 15
            },
            rippleEffect: {
                brushType: 'stroke',
                color: "#999"
            },
            itemStyle: { color: '#999', shadowBlur: 10, shadowColor: '#333' },
            zlevel: 1
        },
        {
            name: '新中地外卖',
            coordinateSystem: 'amap',
            type: 'scatter',
            data: data.sort((a, b) => { return b.value[2] - a.value[2] }).slice(10),
            //使用编码进行渲染scatter
            encode: { value: 2 },
            symbolSize: function (value) {
                return value[2] / 15
            },
            itemStyle: { color: '#666', shadowBlur: 10, shadowColor: '#333' },
        }
        ]
    }
}
onMounted(async () => {
    await ChartDataStore.GetMapchart()
    option.value = renderAMap(ChartDataStore.MapChartList)
})
</script>

<style lang="scss" scoped></style>