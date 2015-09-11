/**
 * Created by xiaowei on 15-9-10.
 */
var popup = {
    alert: function ($ionicPopup, alertConfg,cb) {
        alertConfg["cssClass"] = alertConfg.cssClass ? alertConfg.cssClass : "zan_popup";
        var myPopup = $ionicPopup.show(alertConfg);
        setTimeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
            if(cb){
                cb()
            }
        }, 1000);
    }
}