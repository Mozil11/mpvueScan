import 'whatwg-fetch'
import httpFetch from 'http-fetch'
// import Promise from 'promise-polyfill';
// // To add to window  
// if (!window.Promise) {  
//     window.Promise = Promise;  
// }  
var url = '47.96.38.14:8086'
// var url = '192.168.5.180:8085'
    //修改商品
    export  function  changeGoodsNum(a){
        return httpFetch.post('http://'+url+'/api/share/leaseCar/addToLeaseCar',httpFetch.jsonToUrlParams(a))
    };
    //获取商品
    export  function getGoods (){
        return httpFetch.get('http://'+url+'/api/deviceModel/leaseableDeviceList')
    }
    //获取购物车列表
    export  function getbuycar (a){
        return httpFetch.post('http://'+url+'/api/share/leaseCar/queryLeaseCarList',httpFetch.jsonToUrlParams(a))
    }
    //获取投放点列表
    export function getplace (a){
        return httpFetch.post('http://'+url+'/api/share/leaseCar/deviceDeliveryPlaceList',httpFetch.jsonToUrlParams(a))
    }
    //更新租赁车中设备信息
    export function updateGoods(a){
        return httpFetch.post('http://'+url+'/api/share/leaseCar/updateLeaseCarItemById',httpFetch.jsonToUrlParams(a))
    }
    // 从租赁车中移除设备  
    export function delGoods(a){
        return httpFetch.post('http://'+url+'/api/share/leaseCar/removeItemFromLeaseCar',httpFetch.jsonToUrlParams(a))
    }
    //修改投放地点
    export function changeplace(a){
        return httpFetch.post('http://'+url+'/api/share/leaseCar/updateDeliveryPlaceById',httpFetch.jsonToUrlParams(a))
    }
    //添加投放点
    export function addplace(a){
        return httpFetch.post('http://'+url+'/api/share/leaseCar/addDeliveryPlace',httpFetch.jsonToUrlParams(a))
    }
    //去下单
    export function gotopay(a){
        return httpFetch.post('http://'+url+'/api/share/leaseCar/preLeaseOrder',httpFetch.jsonToUrlParams(a))
    }
    //登陆注册
    export function login(a){
        return httpFetch.post('http://'+url+'/api/loginRegister/loginSys',httpFetch.jsonToUrlParams(a))
    }
    