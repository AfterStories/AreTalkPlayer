 layui.use('layer', function(){
  var layer = layui.layer;
});


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

 var BuyLessonId = GetQueryString("lessonId");

$(document).ready(function() {
          
        $(document.body).css({
            "overflow-x":"hidden"       
           });


      $.ajax({
        type: "GET",
        url: 'http://211.159.152.210:8188/AreTalkServer/Web/Api/getLessonDetail.action;jsessionid='+Sessionid,
        data: {lessonId:BuyLessonId,userType:"1"},
        success: function (data) {
              var singlePrice = data.data.lesson.lessonPrice.singlePrice;
              var totalPrice = data.data.lesson.lessonPrice.totalPrice;
              var lessonTitle = data.data.lesson.lessonInfo.title;


              $(".lesson-title").html(lessonTitle);
              
              $("#buyAll").html("购买整套课程:"+totalPrice+"AT");
              $(".lesson-price").html(singlePrice+'AT/节');
              var isBuyAllClass = false;
              for(var i = 0 ; i < data.data.lesson.lessonBuyList.length; i ++){
                if(data.data.lesson.lessonBuyList[i].classNo == 0){
                  isBuyAllClass = true;
                  break;
                }
              }

              for(var i=0;i<data.data.lesson.lessonDetail.length;i++){

                var classtitle = data.data.lesson.lessonDetail[i].title;
                var classNo = data.data.lesson.lessonDetail[i].classNo;
                var startTime = (data.data.lesson.lessonDetail[i].startTime).replace(/T/g,' ');
                var classDec = data.data.lesson.lessonDetail[i].lessonDescribe;

                if(isBuyAllClass == true){
                  var Lessonclass = '<div class="MsgBox" id='+classNo+'><li class="Msgfrom" >第'+classNo+'节'+"  "+classtitle+'<span class="msgTime">'+startTime+'</span></li><div class="Msgcontent">'+classDec+'</div><div class="buy-btn">已购买</div></div>';
                }
                else{
                  var isBuyThisClass = false;
                    for(var j = 0 ; j < data.data.lesson.lessonBuyList.length; j ++){
                      if(data.data.lesson.lessonBuyList[j].classNo == data.data.lesson.lessonDetail[i].classNo){
                        isBuyThisClass = true;
                        break;
                      }
                    }
                    if(isBuyThisClass == true){
                      var Lessonclass = '<div class="MsgBox" id='+classNo+'><li class="Msgfrom" >第'+classNo+'节'+"  "+classtitle+'<span class="msgTime">'+startTime+'</span></li><div class="Msgcontent">'+classDec+'</div><div class="buy-btn">已购买</div></div>';
                
                    }
                    else{
                        var Lessonclass = '<div class="MsgBox" id='+classNo+'><li class="Msgfrom" >第'+classNo+'节'+"  "+classtitle+'<span class="msgTime">'+startTime+'</span></li><div class="Msgcontent">'+classDec+'</div><div class="buy-btn">购买</div></div>';
                
                    }

                }

                
                  $("#everyclass").append(Lessonclass); 

              }
            


/*买小课按钮*/
$(".buy-btn").click(function(){

var self = this;
  var buyClassNo = $(this).parent('.MsgBox').attr("id");
  
    $.ajax({
        type: "GET",
        url: 'http://211.159.152.210:8188/AreTalkServer/Web/Api/buyLesson.action;jsessionid='+Sessionid,
        data: {lessonId:BuyLessonId,buyType:"2",classNo:buyClassNo},
        success: function (data) {                        

        if(data.data.status=="success"){

           layer.msg('购买成功,请在我的课程中查看',{time:1500});
            
                 $(self).html("已购买");
            }else{

                 layer.msg(data.data.info);
         
                 }                        
              
                },
            error: function (a,b,c) {
                layer.msg('网络超时，请重试');
                 }
            });

  
});





        },
        error: function () {
                  /*alert("登陆超时，请重新登陆");*/
                 }
        });


    });

$('#buyAll').click(function(){

    $.ajax({
        type: "GET",
        url: 'http://211.159.152.210:8188/AreTalkServer/Web/Api/buyLesson.action;jsessionid='+Sessionid,
        data: {lessonId:BuyLessonId,buyType:"1",classNo:"0"},
        success: function (data) {                        

        if(data.data.status=="success"){

           layer.msg('购买成功',{time:1500});
           $(".buy-btn").html("已购买")
            }else if(data.data.status=="false"){
                 layer.msg(data.data.info);
                 
                 }                        
              
                },
            error: function (a,b,c) {
                layer.msg('网络超时，请重试');
                 }
            });
});







/*var lessonId = parent.document.getElementById("layui-layer-iframe1").contentWindow.location.href;
*/



function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}




