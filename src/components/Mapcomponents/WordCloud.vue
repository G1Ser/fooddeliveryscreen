<template>
    <v-chart :option="option"></v-chart>
</template>

<script setup>
import 'echarts-wordcloud';
import { ref, onMounted } from 'vue'
import { useChartDataStore } from '@/stores/counter'
const ChartDataStore = useChartDataStore();
const option = ref({})
function renderwordcloud(data) {
    return {
        series: [{
            type: 'wordCloud',
            shape:"cardioid",
            data:data,
            width:'100%',
            height:'100%',
            textStyle:{
                color:function(){
                    return 'rgb(' + [
                        Math.round(Math.random()*255),
                        Math.round(Math.random()*255),
                        Math.round(Math.random()*255),
                    ].join(',') + ')'
                }
            },
            emphasis:{
                focus:'self',
                textStyle:{
                    textShadowBlur:5,
                    textShadowColor:"#333"
                }
            },
        }],
        tooltip:{}
    }
}
onMounted(async () => {
    await ChartDataStore.GetThirdcomp();
    let response = ChartDataStore.ThirdCompList
    response = response.map(item =>{
        const res = {}
        res.name = item.keyWord
        res.value = item.totalSearch
        return res
    }).slice(0,6)
    option.value=renderwordcloud(response)
})
</script>

<style lang="scss" scoped></style>