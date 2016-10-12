/**
 * Created by ls-pc on 2016/10/12.
 */
$(document).on("pageinit","#index",function(){
    bindEvent();
    var url11="https://crossorigin.me/http://www.webxml.com.cn/WebServices/TrainTimeWebService.asmx/getStationAndTimeByTrainCode?TrainCode=G1&UserID="
        $("#ajaxBtn").on("click",function() {

        $.mobile.loading("show");
        $.get(url11, {TrainCode: "G1"}, function (data) {
            console.log(data);
            $.mobile.loading("hide");
        });
    });



});