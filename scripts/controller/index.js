/**
 * Created by ls-pc on 2016/10/12.
 */
var urlPre="https://crossorigin.me/";
var url1="http://www.webxml.com.cn/WebServices/TrainTimeWebService.asmx/getStationAndTimeByStationName?UserID=";
var url2="http://www.webxml.com.cn/WebServices/TrainTimeWebService.asmx/getStationAndTimeDataSetByLikeTrainCode?UserID=";
var url3="http://www.webxml.com.cn/WebServices/TrainTimeWebService.asmx/getDetailInfoByTrainCode?UserID=";
var url11="https://crossorigin.me/http://www.webxml.com.cn/WebServices/TrainTimeWebService.asmx/getStationAndTimeByTrainName?UserID="
var getTrainList=function(){
    if($('#search-nu').val()||($('#search-begin').val()&&$('#search-end').val())){
        var searchBtn=$('#search-submit');
        searchBtn.attr('disabled',true);
        $.mobile.loading('show');
        var data={};
        var url=url1;
        if (!$('#search-nu').val()){
            data.StartStation=$('#search-begin').val();
            data.ArriveStation=$('#search-end').val();
        }else {
            data.TrainCode=$('#search-nu').val();
            url=url2;
        }
        $.get(urlPre+url,data,function(data){
            console.log(urlPre+url)
            var list=$('#list');
            var timeTables=$(data).find('TimeTable');
            var arr=[];
            timeTables.each(function(index,obj){
                var i=index;
                if (i>10)return false;
                var that=$(this);
                if (that.find('FirstStation').text()=="数据没有被发现"){
                    alert('您查询的车次不存在');
                    return false;
                }
                var html='<li><a href="#" data-no="'+that.find("TrainCode").text()+'">'+
                        '<h2>'+that.find("TrainCode").text()+'</h2>'+
                        '<p>'+that.find("FirstStation").text()+'-'+that.find("LastStation").text()+'</p>'+
                        '<p>用时：'+that.find("UseDate").text()+'</p>'+
                    '<p class="ui-li-aside">'+that.find("StartTime").text()+'开</p>'+
                    '</a></li>';
                arr.push(html);
            });
            if (arr.length>0){
                list.html(arr.join(''));
                list.listview('refresh');
            }
            $.mobile.loading('hide');
            searchBtn.attr('disabled',false);
        });
    }else {
        alert("请同时输入发车站和终点站，或输入您想查询的车次！");
        console.log($('#search-nu').val())
    }
};
var getInfoBytrainCode=function(){

};
var bindEvent=function() {
    $('#search-submit').on('click', getTrainList);
    $('#list').on('click', 'a', getInfoBytrainCode);
};
$(document).on("pageinit","#index",function(){
    bindEvent();



    });

