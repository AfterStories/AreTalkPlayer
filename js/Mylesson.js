



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

function GetQueryString_parent(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.parent.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

/*根据获取到的课程的北京时间 显示本地区时间*/
 function ShowLocalTime(Year,M,D,h,m,s){
        //设置时间对象时间
        var TimeObj = new Date();
        TimeObj.setFullYear(Year,M-1,D);
        TimeObj.setHours(h,m,s);
        var d = new Date()
		var i = d.getTimezoneOffset()/60;
		console.log(i)

        //得到1970年1月1日到课程时间的秒数
        var len = TimeObj.getTime();
        //与GMT时间偏移差
        var offset = -480 * 60000;/*(课程时间是按照北京时间上传 GTM-8，即480分钟)*/
        //得到1970年1月1日到现在本时区的秒数
        var utcTime = len + offset;
        var getTime = new Date(utcTime+(-3600000 * i));


        //获取当地年
        var Localyear=getTime.getFullYear();
        //获取当地月
        var Localmonth=getTime.getMonth()+1;
        //获取当地日
        var Localriqi=getTime.getDate(); 
        //获取当地时间
        var Localh=getTime.getHours();     //获取小时数(0-23)
        var Localm=getTime.getMinutes();   //获取分钟数(0-59)
        var Locals=getTime.getSeconds();   //获取秒数(0-59)
        if (Localm<10) {
            Localm = "0"+Localm
        }
        if (Locals<10) {
           Locals = "0"+Locals
        }
        if (Localh<10) {
           Localh = "0"+Localh
        }        


        var NYR=Localyear+'-'+Localmonth+"-"+Localriqi;
        var ZTime = " "+Localh+":"+Localm+":"+Locals;
        var LocalTime = NYR+" "+ZTime;

        return LocalTime;  

}


var Sessionid = getCookie("JSESSIONID");
var LoginedName = GetQueryString_parent("LoginedName");
var stupsw = GetQueryString_parent("stupsw");


$(document).ready(function(){
    $.ajax({
        async: false,
        type: "POST",
        url: 'http://211.159.152.210:8188/AreTalkServer/Web/Api/getMyLessons.action;jsessionid='+Sessionid+"?type=1",
        data: {},
        success: function (data) {

        	
        	/*-----------------------------小图课-----------------------------*/
 			var headurl;var showTime;
      var isFirstClass = false;
        	for (var i = 0; i<data.data.lessonList.length; i++) {
              if(data.data.lessonList[i].status !=1){
                continue;
              }
              if(isFirstClass == false){
                isFirstClass = true;

          // 大图课
          $("#remind-lesson #remind-lesson-img").attr("src","http://211.159.152.210:8188"+data.data.lessonList[i].headurl);

          $("#lesson-name").html(data.data.lessonList[i].title);

          for (var j = 0; j<data.data.lessonList[i].lessonLabel.length; j++) {
            if(j == 0){
              $("#lv-tag").append(data.data.lessonList[i].lessonLabel[j].label);
              
              }
              else{
              $("#lv-tag").append(" " + data.data.lessonList[i].lessonLabel[j].label);
            }
          }
          $("#remind-lesson-dec").html(data.data.lessonList[i].lessonDescribe);
          $("#les-dur").html(data.data.lessonList[i].duration+"Min");  
          $("#les-num").html(data.data.lessonList[i].currentStudents+"/"+data.data.lessonList[i].maxStudents);              
          $("#teacher-name").html("教师："+data.data.lessonList[i].name);
          $("#teacherHead img").attr("src","http://211.159.152.210:8188"+data.data.lessonList[i].userImgUrl);
          var lessonId = data.data.lessonList[i].lessonId;
          var entryclassNo = data.data.lessonList[i].currentLesson;
          var Biglessoning = data.data.lessonList[i].realStartTime;
        if (Biglessoning==null) {
            
          $("#enrty-btn").text("未到上课时间");
            $("#enrty-btn").attr("onclick","#");
          }else{
            $("#enrty-btn").attr("onclick",'openLive("'+LoginedName+'","'+stupsw+'",'+lessonId+','+entryclassNo+')');
          }
                continue;


              }



        	var theclassNo = data.data.lessonList[i].currentLesson;

        	var starTime = data.data.lessonList[i].time;
            var lessonDayArry = starTime.slice(0,10).split("-");
            var lessonTimeArry = starTime.slice(11,19).split(":");

           var showTime = ShowLocalTime(lessonDayArry[0],lessonDayArry[1],lessonDayArry[2],lessonTimeArry[0],lessonTimeArry[1],lessonTimeArry[2]);
            console.log("服务器存课程时间"+starTime)

            console.log("计算时差后显示当地时间"+showTime);
          
        	var thelessonId = data.data.lessonList[i].lessonId;
        	var lessoning = data.data.lessonList[i].realStartTime;
        	

        		if(data.data.lessonList[i].headurl!==null){                   
               		 headurl = 'http://211.159.152.210:8188'+data.data.lessonList[i].headurl;                   
              	  }else{
                	headurl = "../img/card.png" 
              	};


var Les_Card ='<div class="Card mask-wrapper"><div class="card-pic"><img src='+headurl+'></div><div class="card-text">'+data.data.lessonList[i].name+'老师：'+data.data.lessonList[i].title+'</div><div class="card-info"><img src="../img/clock.png" alt=""><span>'+showTime+'</span></div><img class="card-teacherImg" src="http://211.159.152.210:8188'+data.data.lessonList[i].userImgUrl+'" alt=""><div class="mask-inner">'+data.data.lessonList[i].lessonDescribe+'<div id="baoming">'+data.data.lessonList[i].currentStudents+'人已报名</div><div class="entryClass" onclick=openLive("'+LoginedName+'","'+stupsw+'","'+thelessonId+'","'+theclassNo+'")>进入教室</div></div></div>'
var Les_Card_No ='<div class="Card mask-wrapper"><div class="card-pic"><img src='+headurl+'></div><div class="card-text">'+data.data.lessonList[i].name+'老师：'+data.data.lessonList[i].title+'</div><div class="card-info"><img src="../img/clock.png" alt=""><span>'+showTime+'</span></div><img class="card-teacherImg" src="http://211.159.152.210:8188'+data.data.lessonList[i].userImgUrl+'" alt=""><div class="mask-inner">'+data.data.lessonList[i].lessonDescribe+'<div id="baoming">'+data.data.lessonList[i].currentStudents+'人已报名</div><div class="entryClass">未到上课时间</div></div></div>'
			     
				
			
			if (lessoning==null) {
            $("#CARD").append(Les_Card_No);  
        	}else{
            $("#CARD").append(Les_Card);             
          }
        
 
			 		



        	}//循环结束
       if(isFirstClass == false){
            $("#showBOX").hide();
            $("#nobuybox").show();

       }
          
        },
        error: function () {
          /*        alert("登陆超时，请重新登陆");
                  parent.location.href="../html/index.html";*/
                 }
        });

				

})


function openLive(LoginedName,stupsw,thelessonId,theclassNo){
  
top.location.href= 'EnterAreTalkRoom?userName='+LoginedName+'&password='+stupsw+'&lessonId='+thelessonId+'&classNo='+theclassNo

}