import axios from 'axios'
const res = axios.create({
    // baseURL:'http://project.x-zd.net:3001/apis',
    baseURL:'https://43.139.219.105/apis',
    timeout:10000
})

res.interceptors.response.use((res)=>{
    if(res.status === 200){
        return res.data
    }
    throw Error("请求数据失败")
},(err)=>{return Promise.reject(err)})

export default res