function editInfoBtn(){
        layer.open({
        type: 2,
        title: "编辑资料",
        shadeClose: true,
        resize:false,
        shade: false,
        maxmin: false, 
        scrollbar: false,
        area: ['1146px', '600px'],
        content: 'editInfo.html'
      });
}

function logout(){

    CreateCookie(TheuserName, "", -1);
    
    CreateCookie("JSESSIONID","",-1);

     location.href="../../../OfficialWebsite/Login.html";

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


	//左侧导航按钮切换
	$('#MyLesson').click(function(){
		
		$('.MyLesson-selected').show();
		$('.MyLesson').hide();
		
	});

	$('.MyLesson').click(function(){		
		$('.MyLesson-selected').show();
		$('.MyLesson').hide();
		$('.little-selected').hide();
		$('.little').show();
		$('.myinfo-selected').hide();
		$('.myinfo').show();		
		$('.one-selected').hide();
		$('.one').show();
		$('#MyUl').show().siblings('.layui-tab-title').hide();
	});


	$('#one').click(function(){
		$('.MyLesson-selected').hide();
		$('.MyLesson').show();
		$('.little-selected').hide();
		$('.little').show();
		$('.myinfo-selected').hide();
		$('.myinfo').show();		
		$('.one-selected').show();
		$('.one').hide();
		$('#OneToOneUl').show().siblings('.layui-tab-title').hide();

		
	});


	$('#little').click(function(){
		$('.MyLesson-selected').hide();
		$('.MyLesson').show();
		$('.little-selected').show();
		$('.little').hide();
		$('.myinfo-selected').hide();
		$('.myinfo').show();			
		$('.one-selected').hide();
		$('.one').show();
		$('#littleUl').show().siblings('.layui-tab-title').hide();
	});

	$('#myinfo').click(function(){
		$('.MyLesson-selected').hide();
		$('.MyLesson').show();
		$('.little-selected').hide();
		$('.little').show();
		$('.myinfo-selected').show();
		$('.myinfo').hide();		
		$('.one-selected').hide();
		$('.one').show();
		$('#infoUl').show().siblings('.layui-tab-title').hide();	
	});



    $(document).ready(function() {
		var Sessionid = getCookie("JSESSIONID");


    	$(document.body).css({
				"overflow-x":"hidden",
				"overflow-y":"hidden"
			});
    
			$('#Lessoniframe').css({
				"overflow-x":"hidden",
				"overflow-y":"hidden"
			});
        
           //显示用户头像用户名
            $.ajax({
                type: "POST",
                url: 'http://211.159.152.210:8188/AreTalkServer/Web/Api/getMyInfo.action;jsessionid='+Sessionid,
                data: {},
                success: function (data) {
                	if (data.data==undefined) {
                   layer.confirm('登录超时，请重新登陆', {
                      btn: ['好的'] //按钮
                    }, function(){
                      location.href="../html/login.html"
                    })
                };
                $('#Head img').attr('src','http://211.159.152.210:8188'+data.data.userInfo.avatar);
                $('#username').html(data.data.userInfo.user.nickname);

                },
                error: function () {
                   layer.confirm('登录超时，请重新登陆', {
                      btn: ['好的'] //按钮
                    }, function(){
                      location.href="../html/login.html"
                    })
                         }
                });
                     



    });

	layui.use(['jquery','layer','element'],function(){
	var element = layui.element(); //Tab的切换功能，切换事件监听等，需要依赖element模块
	var layer = layui.layer;

$("#userHeadImg").bind("click",function(){  

      layer.tips('<li style="cursor:pointer" class="tipsBtn" id="editInfoBtn" onclick="editInfoBtn()">编辑资料</li><li style="cursor:pointer" class="tipsBtn" id="logoutBtn" onclick="logout()">退出登录</li>', '#userHeadImg', {
      tips: 3,
      time: 4000
      });




 });



//消息弹窗
function tanchuang(Title_name,page){

  	  layer.open({
  	  	/*move: false,*/
  	    type: 2,
  	    title: Title_name,
  	    shadeClose: true,
  	    resize:false,
  	    shade: false,
  	    maxmin: false, 
  	    scrollbar: false,
  	    area: ['770px', '525px'],
  	    content: page+'.html'
  	  });
  	
}
$(function(){ 


$(".tips").click(function(e) {  
    $(this).show();  
        e.stopPropagation();  
});  
$(document).click(function(e) {  
  
    $(".tips").hide();  
      e.stopPropagation();  
});


$("#menu .menu-open").bind("click",function(){  

	var Li_title = $(this).find("a").html();
	var openpage = $(this).attr('id');

	tanchuang(Li_title,openpage);
 });

$(".inner-menu").bind("click",function(){  

	var Li_title = $(this).html();
	var openpage = $(this).attr('id');

	tanchuang(Li_title,openpage);
 });

$(".menu-tips").bind("click",function(e){  
$(".tips").toggle();
  e.stopPropagation();  
 });


}) 

})
