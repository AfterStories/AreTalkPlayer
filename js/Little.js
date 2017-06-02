// Little.js
layui.use('layer', function(){
  var layer = layui.layer;      


});

function buylesson(lessonid){

      layer.open({
        type: 2,
        title: "课程目录",
        shadeClose: true,
        resize:false,
        shade: false,
        maxmin: false, 
        scrollbar: false,
        area: ['770px', '525px'],
        content: 'catalog.html?lessonId='+lessonid
      });
    
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



var Sessionid = getCookie("JSESSIONID");



 function getLocalTime(i,day) {
        //参数i为时区值数字，比如北京为东八区则i为8,西5为-5
        if (typeof i !== 'number') return;
        var d = new Date();
        //得到1970年一月一日到现在的秒数
        var len = d.getTime()+(day*24*3600000);
        //本地时间与GMT时间的时间偏移差
        var offset = d.getTimezoneOffset() * 60000;
        //得到现在的格林尼治时间
        var utcTime = len + offset;

         var sendTime = new Date(utcTime + 3600000 * i);

         //获取当前年
        var year=sendTime.getFullYear();
        //获取当前月
        var month=sendTime.getMonth()+1;
        //获取当前日
        var riqi=sendTime.getDate(); 
        
        var h=sendTime.getHours();     //获取小时数(0-23)
        var m=sendTime.getMinutes();   //获取分钟数(0-59)
        var s=sendTime.getSeconds();   //获取秒数(0-59)
        if (m<10) {
            m = "0"+m
        }
        if (s<10) {
           s = "0"+s
        }
        var NY=year+'-'+month+"-";
        var ZTime = " "+h+":"+m+":"+s;
        var NowRiQi = NY+riqi+ZTime;

        return NowRiQi

    }



function GetLesson(minD,maxD){


	$.ajax({
        async: false,
        type: "POST",
        url: 'http://211.159.152.210:8188/AreTalkServer/Web/Api/getLessonsByDate.action;jsessionid='+Sessionid,
        data: {minDate:minD,maxDate:maxD,type:1},
        success: function (data) {
          $(".owl-carousel").empty();//清空之前内容再添加
          $("#remind-lesson").empty();//清空之前大图课内容再添加 


var BigLesCARD = '<img src="http://211.159.152.210:8188'+data.data.lessonList[0].headurl+'" alt="" id="remind-lesson-img"><div id="remind-lesson-detail"><span id="lesson-name">'+data.data.lessonList[0].title+'</span><span id="lv-tag"></span></div><div id="remind-lesson-dec">'+data.data.lessonList[0].lessonDescribe+'</div><div id="remind-lesson-info"><img src="../img/clock.png" alt="" id="time"><div id="les-dur">'+data.data.lessonList[0].duration+'Min</div><img src="../img/stundent.png" alt="" id="stuNum"><div id="les-num">'+data.data.lessonList[0].currentStudents+'</div></div><div id="lesson-entry"><div id="teacherHead"><img src="http://211.159.152.210:8188'+data.data.lessonList[0].userImgUrl+'" alt="teacher"></div><span id="teacher-name">教师：'+data.data.lessonList[0].name+'</span><span id="buy-info"></span><div id="enrty-btn" onclick="buylesson('+data.data.lessonList[0].lessonId+')">购买</div><div class="clear"></div>'

 $("#remind-lesson").append(BigLesCARD);
          for (var i = 0; i<data.data.lessonList[0].lessonLabel.length; i++) {
              if(i==data.data.lessonList[0].lessonLabel.length){
                $("#lv-tag").text(data.data.lessonList[0].lessonLabel[i].label);
              }else{
                $("#lv-tag").text(data.data.lessonList[0].lessonLabel[i].label+"、");
              }
              
            }



/*        	$("#remind-lesson #remind-lesson-img").attr("src","http://211.159.152.210:8188"+data.data.lessonList[0].headurl);
        	$("#lesson-name").html(data.data.lessonList[0].title);
          $("#remind-lesson-dec").html(data.data.lessonList[0].lessonDescribe);

        	$("#les-dur").html(data.data.lessonList[0].duration+"Min");
          $("#les-num").html(data.data.lessonList[0].currentStudents);
           	
        	$("#teacher-name").html("教师："+data.data.lessonList[0].name);
        	$("#teacherHead img").attr("src","http://211.159.152.210:8188"+data.data.lessonList[0].userImgUrl);*/
 

  /*小图课*/
 
    var headurl;var Time;
    for (var i = 1; i<data.data.lessonList.length; i++) {
         var Time = data.data.lessonList[i].time.slice(11,19);            
        if(data.data.lessonList[i].headurl!==null){                   
          headurl = 'http://211.159.152.210:8188'+data.data.lessonList[i].headurl;                   
        }else{
        headurl = "../img/card.png"                  
        };

      var Les_Card ='<div class="Card mask-wrapper"><div class="card-pic" style="background-image:url('+headurl+')";></div><div class="card-text">'+data.data.lessonList[i].name+'老师：'+data.data.lessonList[i].title+'</div><div class="card-info"><img src="../img/clock.png" alt=""><span>'+Time+'</span></div><img class="card-teacherImg" src="http://211.159.152.210:8188'+data.data.lessonList[i].userImgUrl+'" alt=""><div class="mask-inner">'+data.data.lessonList[i].lessonDescribe+'<div class="buybuybuy" onclick="buylesson('+data.data.lessonList[i].lessonId+')">购买本课</div></div></div>'
      $("#CARD").append(Les_Card);
          };  

         var owl = $('.owl-carousel');
          owl.owlCarousel({             
                margin: 10,
                nav: true,
                loop: true,
                dots:false,
                items:4,
                autoplay:true,
                autoplayTimeout:3000,
                autoplayHoverPause:true,
                stopOnHover:true
              })
                 
       },
        error: function (a,b,c) {

                	/*alert("登陆超时，请重新登陆");*/
          }
        });

  

}



$(document).ready(function() {
  var star = getLocalTime(8,0);
  var end =  getLocalTime(8,1);
  GetLesson(star,end);

  console.log(star);
  console.log(end);


})


$(".live-remind-text").click(function(){
  var day  = $(this).attr("DayNo");
  var nextday = parseInt(day)+1;
  var star = getLocalTime(8,day);
  var end =  getLocalTime(8,nextday);
  GetLesson(star,end);
  console.log(day);
  console.log(nextday);
  console.log(star);
  console.log(end);

});

/*
$(".byubuybuy").onclick(function({


}))

*/
