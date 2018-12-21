import 'whatwg-fetch'
import $ from 'jquery'
import httpFetch from 'http-fetch'
var url = 'http://life.microger.com:8086/'
//获取坐标
// httpFetch.requestOptions = {
//     headers: {
//       // 配置请求头
//       'Content-Type': 'application/json'
//     },
//     // 配置跨域模式
//     // mode: 'no-cors'
//   }

export function getLngAndLat(a){
  
 
    return httpFetch.get(url+'api/v2/device/getAllPlaceList?diviceType='+a)
}
//油枪对象列表
export function getgaslist(id){
    return httpFetch.get(url+'api/v2/device/getAllDeviceOilGunListByPlaceId/'+id)
}
//电枪列表
export function getEnergylist(id){
    return httpFetch.get(url+'api/v2/device/getAllDeviceOilGunListByPlaceId/'+id)
}
//排序
export function nearfall(id,a,b){
    return httpFetch.get(url+'api/v2/device/getAllPlaceListByCoord?diviceType='+id+'&longitude='+a+'&latitude='+b)
}
