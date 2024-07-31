import { ref} from 'vue'
import { defineStore } from 'pinia'
import request from './axios'

export const useChartDataStore = defineStore('chart-data', () => {
  const TopCompList = ref([]);
  const SecondCompList = ref([]);
  const ThirdCompList = ref([]);
  const PieChartList = ref([]);
  const MapChartList = ref([]);
  const GetTopcomp = async() =>{
    TopCompList.value = await request.get('/reportdata')
  }
  const GetSecondcomp = async() =>{
    SecondCompList.value = await request.get('/saledata')
  }
  const GetThirdcomp = async() =>{
    ThirdCompList.value = await request.get('/keyworddata')
  }
  const GetPiechart = async() =>{
    PieChartList.value = await request.get('/categorydata')
    for(const key in PieChartList.value){
      PieChartList.value[key].forEach((item)=>{
        item.name = item.title + '|' + item.value
      })
    }
  }
  function convertData(citys,geodatas){
    const res = [];
    citys.forEach(city=>{
      const geodata = geodatas[city.name];
      if(geodata){
        res.push({
          name: city.name,
          value:geodata.concat(city.value)
        })
      }
    })
    return res
    }
  const GetMapchart = async() =>{
    const res = await request.get('/mapdata')
    MapChartList.value = convertData(res.city,res.geodata)
  }
  return{
    TopCompList,
    SecondCompList,
    ThirdCompList,
    PieChartList,
    MapChartList,
    GetTopcomp,
    GetSecondcomp,
    GetThirdcomp,
    GetPiechart,
    GetMapchart
  }
})
