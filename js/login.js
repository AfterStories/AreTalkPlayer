

$(document).ready(function(){ 

layui.use(['layer', 'form'], function(){
  var layer = layui.layer;
  var form = layui.form();


form.verify({
  username: function(value, item){ //value：表单的值、item：表单的DOM对象
    if (value.length==0) {
      return '必填项不能为空';        
    }
    if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
      return '用户名不能有特殊字符';
    }
    if(/(^\_)|(\__)|(\_+$)/.test(value)){
      return '用户名首尾不能出现下划线\'_\'';
    }

    if(!(/^[\S]{1,50}$/.test(value))){
      return '用户名不能有空格';
    }



  }
  

});      
        
      

form.on('submit(PClogin)', function(data){

 Login()
        
})

});  //use      
      



})//ready
 





var LoginURL = "http://211.159.152.210:8188/AreTalkServer/Web/Login/"

var TheuserName,Thepassword;

function Login() {

        var userName = $("#username").val();
        TheuserName = userName;
        var password = hex_md5($("#Password").val());
        Thepassword = password;
    
    if (!userName || !password) {
           
            layer.msg('请输入您的用户名与密码。',{time:1500});
            return false;
        }else{
            $.ajax({
                    type: "GET",
                    url: LoginURL+"login.action?userName="+userName+"&password="+password+"&userType=1",
                    data: {},
                success: function (data) {                        
                CreateCookie(TheuserName, Thepassword, 30);
                CreateCookie("JSESSIONID", data.data.JSESSIONID, 30);

                if(data.data.status=="success"){
    
                   layer.msg('登陆成功',{time:1500}); 



                    setTimeout(function () {
                         location.href="../html/home.html?LoginedName="+TheuserName+'&stupsw='+Thepassword;
                    }, 1600);

                   
                    var isLogin = true;                           

                    }else{
                         layer.msg('用户名或密码错误，请重试');
                         }                        
                      
                        },
                    error: function (a,b,c) {
                        layer.msg('网络超时，请重试');
                         }
                    });

            }


}


function getSessionId(){  
    var c_name = 'JSESSIONID';  
    if(document.cookie.length>0){  
       c_start=document.cookie.indexOf(c_name + "=")  
       if(c_start!=-1){   
         c_start=c_start + c_name.length+1   
         c_end=document.cookie.indexOf(";",c_start)  
         if(c_end==-1) c_end=document.cookie.length  
         return unescape(document.cookie.substring(c_start,c_end));  
       }  
    }  
} 


function CreateCookie(name, value, days) {
    if (days) {
        var date = new Date;
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1E3);
        var expires = "; expires=" + date.toGMTString()
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/"

}   


function getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1) {
        c_value = null;
    }
    else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}


        
$(document).keypress(function (evt) {
    evt = (evt) ? evt : ((event) ? event : null);
    var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
    if ((evt.keyCode == 13) && (node.type == "text" || node.type == "password")) {
        if (node.id == "username" && node.value) {
            if ($("#Password").val()) {
                $(".submit_btn").click();
            } else {
                $("#Password").focus();
            }
        }
        if (node.id == "Password" && node.value) {
            if ($("#username").val()) {
                $(".submit_btn").click();
            } else {
                $("#username").focus();
            }
        }

        return false;
    }
    return true;
});

