/**
 * Created by perfection on 15-9-14.
 */
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('approve_editkitchen', approve_editkitchen)
    ;

    function approve_editkitchen($scope, $http, YF_MERCHANT_HOST, $ionicPopup, YF_MERCHANT_INFO) {
           console.log(123);
        $scope.approve = function () {

            $http.post(
                YF_MERCHANT_HOST + "/user/approveAllInfo", YF_MERCHANT_INFO.mID, {"Content-Type": "application/json;charset=utf-8"}).success(function (data) {
                    var options;
                    if (Number(data.code) == 0) {
                        options = {
                            "title": "申请成功，敬请通知！",
                            "buttons": [{
                                text: "关闭",
                                type: "button-positive clam"
                            }]
                        };
                        $ionicPopup.alert(options);
                    } else {
                        options = {
                            "title": "申请失败！",
                            "buttons": [{
                                text: "关闭",
                                type: "button-positive clam"
                            }]
                        };
                        $ionicPopup.alert(options);
                    }
                }).error(function (data, status, headers, config) {
                    var options = {
                        "title": "服务器连接失败！",
                        "buttons": [{
                            text: "关闭",
                            type: "button-positive clam"
                        }]
                    };
                    $ionicPopup.alert(options);
                });
        }
    }
})();
