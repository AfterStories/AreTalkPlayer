var protocol;
var sexinput ;
var username;
var PhoneNumber;
var fromValue;
var PhoneArea;
var wait=60;  



layui.use(['layer', 'form','laydate'], function(){

    var layer = layui.layer;
    var form = layui.form();
    var laydate = layui.laydate;
    var start = {istoday: false};

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

 document.getElementById('LAY_demorange_s').onclick = function(){
    start.elem = this;
    laydate(start);
  }

  form.on('checkbox(protocol)', function(data){ 
  protocol = data.elem.checked;
  });//勾选条款


form.on('select(sexinput)', function(data){
  console.log(data.value); //得到被选中的值
  sexinput = data.value
});      
      
form.on('submit(getCode)', function(data){


  PhoneArea = data.field.countryId;
  GetCode();
});  

  form.on('submit(register)', function(data){
  fromValue = data.field;
   //当前容器的全部表单字段，名值对形式：{name: value}    

  register();
});







}); //layui.use结束





$(document).ready(function(){ 

//获取电话区号
$.ajax({                    
        type:'GET',
        data:{},       
        url: 'http://211.159.152.210:8188/AreTalkServer/Verify/getCountryAreacode.action',
        success:function(data) {
          
              for (var i = 0;i<data.data.areacode.length; i++) {
               var areacode = '<option value="'+data.data.areacode[i].countryId+'">+'+data.data.areacode[i].areaCode+'</option>';
               $('#PhoneNmuAre').append(areacode);                              
                  var form = layui.form();
                  form.render();
                }
            },
        error: function () {                  

      }                        
}); 

//获取国家
  $.ajax({
        type:'GET',
        data:{},       
        url: 'http://211.159.152.210:8188/AreTalkServer/Api/AreTalk/getCountryInfo.action',
        success:function(data) {
              for (var i = 0;i<data.data.countryInfo.length; i++) {
               var countryInfo = '<option value="'+data.data.countryInfo[i].countryId+'">'+data.data.countryInfo[i].countryNameSelf+'</option>';
               $('#motherlandId').append(countryInfo);                              
                  var form = layui.form();
                  form.render();
                }
            },
        error: function () {
      }                        
}); 





$("#reLoginText").click(function(){
  window.location.href = "login.html"
})



})//ready结束





function register(){
var IDcode = $("#IDcode").val();
if (!IDcode) {
   layer.msg('未填写验证码',{time:1500});
   return
}

fromValue.password = hex_md5(fromValue.password);
fromValue.userName = fromValue.userName.toLowerCase();


    $.ajax({                    
        type:'POST',
        data:fromValue,       
        url: 'http://211.159.152.210:8188/AreTalkServer/Web/Login/register.action?userType=1',
        success:function(data) {
            if(data.data.status=="success"){          
              layer.msg("注册成功，请返回登陆");
             
              
            }else{
              layer.msg('请重试',{time:1500});
            }

            },
        error: function () {                  
            
      
      }                        
        }); 
}






var checkInfoValid;
function GetCode(){

  username = $("#username").val();
  PhoneNumber = $("#PhoneNumber").val();
  var PhoneLocaltion = $('#PhoneNmuAre option:selected').val();//Select选中的值
  console.log(username);console.log(PhoneNumber);

  if (username&&PhoneNumber){


      $.ajax({
          async:false,
              type:'POST',
              data:{userName:username,phoneNo:PhoneNumber,type:1},       
              url: 'http://211.159.152.210:8188/AreTalkServer/Web/Login/checkInfoValid.action',
              success:function(data) {
                  
                  if(data.status="success"){
                    checkInfoValid = true;
                      
                      $.ajax({
                          async:false,                  
                          type:'POST',
                          data:{countryId:PhoneLocaltion,phoneNo:PhoneNumber,type:1},       
                          url: 'http://211.159.152.210:8188/AreTalkServer/Verify/sendPhoneNoVerifyCode.action',
                          success:function(data) {
                                if (data.status="success") {
                                    time();
                                   layer.msg('正在发送验证码，请查收手机短信',{time:1500});
                                }
                              
                              },
                          error: function () {                  
            
                            }                        
                      }); 

                  }else if(data.status="failed"){

                        if (data.item="userName") {
                            layer.msg('用户名已被注册',{time:1500});
                        }else if(data.item="phoneNO"){
                            layer.msg('手机号已注册',{time:1500});
                        }
                  }
                    

                  },
              error: function () {
              
              }                        
          }); 

  }else{
  
    layer.msg('用户名或手机号不得为空，请重试',{time:1500});
  }






}

function time(){
          if (wait == 0) { 
            $("#sendCode").removeAttr("disabled");           
            $("#sendCode").html("获取验证码");
            $("#sendCode").css("background-color", "#39b0ef"); 
            wait = 60;  
        } else {  
            $("#sendCode").attr("disabled", "true");  
            $("#sendCode").css("background-color", "#9da2a7"); 
            $("#sendCode").html("重新获取"+wait);  
            wait--;  
            setTimeout(function() {  
                time()  
            },  
            1000)  
        }  

}