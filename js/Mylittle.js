
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


var Sessionid = getCookie("JSESSIONID");
var LoginedName = GetQueryString_parent("LoginedName");
var stupsw = GetQueryString_parent("stupsw");

$(document).ready(function(){
    $.ajax({
        async: false,
        type: "POST",
        url: 'http://211.159.152.210:8188/AreTalkServer/Web/Api/getMyLessons.action;jsessionid='+Sessionid+"?type=2",
        data: {},
        success: function (data) {

          /*-----------------------------小图课-----------------------------*/
      var headurl;var showTime;
var isFirstClass = false;
          for (var i = 1; i<data.data.lessonList.length; i++) {

              if(data.data.lessonList[i].status !=1){
                continue;
              }
              if(isFirstClass == false){
                isFirstClass = true;

       // 大图课
          $("#remind-lesson #remind-lesson-img").attr("src","http://211.159.152.210:8188"+data.data.lessonList[i].headurl);
          $("#lesson-name").html(data.data.lessonList[i].title);
          $("#remind-lesson-dec").html(data.data.lessonList[i].lessonDescribe);
          for (var j = 0; i<data.data.lessonList[i].lessonLabel.length; j++) {

            if(j == 0){
              $("#lv-tag").append(data.data.lessonList[i].lessonLabel[j].label);
              
              }
              else{
              $("#lv-tag").append(" " + data.data.lessonList[i].lessonLabel[j].label);
            }
                          
            }

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
            var showTime = starTime.slice(0,10)+" "+starTime.slice(11,19);            
          var thelessonId = data.data.lessonList[i].lessonId;
          var lessoning = data.data.lessonList[i].realStartTime;
          

            if(data.data.lessonList[i].headurl!==null){                   
                headurl = 'http://211.159.152.210:8188'+data.data.lessonList[i].headurl;                   
              }else{
                headurl = "../img/card.png" 
              };


var Les_Card ='<div class="Card mask-wrapper"><div class="card-pic"><img src='+headurl+'></div><div class="card-text">'+data.data.lessonList[i].name+'老师：'+data.data.lessonList[i].title+'</div><div class="card-info"><img src="../img/clock.png" alt=""><span>'+showTime+'</span></div><img class="card-teacherImg" src="http://211.159.152.210:8188'+data.data.lessonList[i].userImgUrl+'" alt=""><div class="mask-inner">'+data.data.lessonList[i].lessonDescribe+'<div id="baoming">'+data.data.lessonList[i].currentStudents+'人已报名</div><div class="entryClass" onclick=openLive('+LoginedName+','+stupsw+','+thelessonId+','+theclassNo+')>进入教室</div></div></div>'
           
        $("#CARD").append(Les_Card);  
      
      if (lessoning==null) {
          
            $(".entryClass").text("未到上课时间");
            $(".entryClass").attr("onclick","#");
          }
        

          
          }
       if(isFirstClass == false){
            $("#showBOX").hide();
            $("#nobuybox").show();

       }       
          
        },
        error: function () {
              /*    alert("登陆超时，请重新登陆");
                  parent.location.href="../html/index.html";*/
                 }
        });

        

})
