var wait=60;  

layui.use(['layer','laydate'], function(){

  var layer = layui.layer;

  var laydate = layui.laydate;
  var start = {istoday: false};

/*form.verify({
  username: function(value, item){ //value：表单的值、item：表单的DOM对象
    if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
      return '用户名不能有特殊字符';
    }
    if(/(^\_)|(\__)|(\_+$)/.test(value)){
      return '用户名首尾不能出现下划线\'_\'';
    }

  }
  

  ,pass: [
    /^[\S]{1,50}$/
    ,'不能出现空格'
  ] 
}); */

 document.getElementById('birthday').onclick = function(){
    start.elem = this;
    laydate(start);
  }
/*    form.on('submit(Register)', function(data){

})
  */
});

	var username;
	var Password = $("#Password").val();
	var PhoneNumber;
	var PhoneIdentifying  = $("#PhoneIdentifying").val(); 
	var nickname = $("#nickname").val();  
	var birthday = $("#birthday").val();  
	var Sexvalue  = $('input[name="Sex"]:checked').val(); //获取被选中Radio的Value值
	var PhoneLocaltion = $('#ChooseBox option:selected') .val();//Select选中的值
	var CountryLocaltion = $('#CountryLocaltion option:selected') .val();//Select选中的值



$(document).ready(function() {
//获取电话区号
              $.ajax({                    
                    type:'GET',
                    data:{},       
                    url: 'http://211.159.152.210:8188/AreTalkServer/Verify/getCountryAreacode.action',
                    success:function(data) {
                          for (var i = 0;i<data.data.areacode.length; i++) {
                           var areacode = '<option value="'+data.data.areacode[i].countryId+'">+'+data.data.areacode[i].areaCode+'</option>';
                           $('#PhoneLocaltion').append(areacode);                              
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


})


var checkInfoValid;
function GetCode(){


	username = $("#username").val();
	PhoneNumber = $("#PhoneNumber").val();
	PhoneLocaltion = $('.ChooseBox option:selected') .val();//Select选中的值



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


function Register(){
	username = $("#username").val();
	PhoneNumber = $("#PhoneNumber").val();	 
	var password = hex_md5($("#Password").val());
	 PhoneIdentifying  = $("#PhoneIdentifying").val(); 
	 nickname = $("#nickname").val();  
	 birthday = $("#birthday").val();  
	 Sexvalue  = $('input[name="Sex"]:checked').val(); //获取被选中Radio的Value值
	 PhoneLocaltion = $('.ChooseBox option:selected').val();//Select选中的值
	 CountryLocaltion = $('#CountryLocaltion option:selected').val();//Select选中的值

	  $.ajax({                    
        type:'POST',

        data:{userName:username,password:password,phoneNo:PhoneNumber,nickname:nickname,countryId:CountryLocaltion,motherlandId:CountryLocaltion,birthday:birthday,userType:1,verifyCode:PhoneIdentifying,sex:Sexvalue},       
        url: 'http://211.159.152.210:8188/AreTalkServer/Web/Login/register.action',
        success:function(data) {
        		if(data.data.status=="success"){
        	
        			layer.msg('注册成功',{time:1500});
        		}else{
        			layer.msg('请重试',{time:1500});
        		}

            },
        error: function () {                  
            
      
      }                        
        }); 
}








function time(){
	        if (wait == 0) { 
            $("#GetCode").removeAttr("disabled");           
            $("#GetCode").html("获取验证码");
            $("#GetCode").css("background-color", "#509ee1"); 
            wait = 60;  
        } else {  
            $("#GetCode").attr("disabled", "true");  
            $("#GetCode").css("background-color", "#9da2a7"); 
            $("#GetCode").html("重新发送"+ wait);  
            wait--;  
            setTimeout(function() {  
                time()  
            },  
            1000)  
        }  

}