export function setlocalStorage(key,value,t){
    var curTime = new Date().getTime()+1000*60*60*24*t;
    localStorage.setItem(key,JSON.stringify({data:value,time:curTime}));
}
export function getlocalStorage(key){
    var data = localStorage.getItem(key);
    var dataObj = JSON.parse(data);
    if(data==null){
        return undefined
    }else{

        if (new Date().getTime() > dataObj.time) {
           localStorage.clear();
            //alert("信息已过期")
        }else{
            //console.log("data="+dataObj.data);
            //console.log(JSON.parse(dataObj.data));
            var dataObjDatatoJson = dataObj.data
            return dataObjDatatoJson;
        }
    }
}

export function setCookie(name, value) 
{ 
    var exp = new Date();  
        exp.setTime(exp.getTime() + 60 * 60 * 1000*24*7);  
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";  
}

export function getCookie(name) 
{ 
    var arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");  
  
    if (arr = document.cookie.match(reg))  

        return unescape(arr[2]);  
    else  
        return null;  
} 

   
export function deleteCookie(name) 
{ 
    var exp = new Date();  
    exp.setTime(exp.getTime() - 60 * 60 * 1000*24*7);  
    var cval = getCookie(name);  
    if (cval != null)  
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";  
} 