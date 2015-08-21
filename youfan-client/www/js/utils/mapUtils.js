/**
 * Created by subdong on 15-8-20.
 */
var mapApiUtils = {
    //地图点标记
    setMarker: function (dataXY,mapObj) {
        console.log(dataXY)
        if(dataXY.length != 0){
            dataXY.forEach(function(item, i){
                var marker = new AMap.Marker({
                    icon: "http://webapi.amap.com/images/marker_sprite.png",
                    position: new AMap.LngLat(item.x, item.y)
                });
                marker.setMap(mapObj);  //在地图上添加点
            })
        }
    },
    //地图中添加地图操作ToolBar插件(比例工具尺定位)
    toolBar:function(mapObj){
        mapObj.plugin(["AMap.ToolBar"],function(){
            toolBar = new AMap.ToolBar(); //设置地位标记为自定义标记
            mapObj.addControl(toolBar);
            AMap.event.addListener(toolBar,'location',function callback(e){
                locationInfo = e.lnglat;
            });
        });
    }
}