/**
 * Created by perfection on 15-8-17.
 */
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('personinfo', personInfo)
        .factory("personInfoFn", function ($http) {
            return {
                saveUserInfo: function (person) {
                    return $http.post(
                        "http://127.0.0.1:8080/user/saveMerchantUserInfo", JSON.stringify(person),{"Content-Type": "application/json;charset=utf-8"}).then(function (response) {
                        //console.log(response.$state.value);
                        return response;
                    }, function (error) {
                        console.log(error)
                    });
                }
            }
        });


    function personInfo($scope, $filter, $state, personInfoFn,$ionicActionSheet, $ionicPopup,  $timeout) {
        $scope.show = function () {
            $ionicActionSheet.show({
                buttons: [
                    {text: '<p class="calm text-center"  >拍照</p>'},
                    {text: '<p class="calm text-center" >从相册中选取</p>'},
                ],
                cancelText: '<p  class="calm">取消</p>',
                buttonClicked: function (index) {
                    return true;
                }
            });


        };
        $scope.showPopup = function() {
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '  <ion-list><ion-item class="item" ng-repeat="age in ages" style="padding: 5px;"> {{age.name}}<div class="item-note"><input type="radio" name="$index" style="height:auto; " ng-model="person.realName" /></div></ion-item></ion-list>',
                title: '<p class="calm" style="padding: 10px;">选择年龄段</p>',
                scope: $scope,
                buttons: [

                    { text: '<b>确认</b>'},
                    { text: '<b>返回</b>'}
                ]

        });

            $scope.ages=[
                {name:"50后"} ,
                {  name:"60后"}, {  name:"70后"}, {  name:"80后"}, {  name:"90后"}];
            //$timeout(function() {
            //    myPopup.close(); //由于某种原因3秒后关闭弹出
            //}, 1500);


        };


        // $scope.saveUserInfo = function (person) {
        //    //person.id="0";
        //    //console.log(JSON.stringify(person));
        //    console.log(personInfoFn.saveUserInfo(person));
        //
        //};



        // $scope.saveUserInfo = function (person) {
        //    //person.id="0";
        //    //console.log(JSON.stringify(person));
        //    console.log(personInfoFn.saveUserInfo(person));
        //
        //};

        //$ionicHistory.clearHistory();
        //$scope.images = [];
        //console.log(firebaseio);
        //var fbAuth = firebaseio.getAuth();
        //if (fbAuth) {
        //    var userReference = firebaseio.child("users/" + fbAuth.uid);
        //    var syncArray = $firebaseArray(userReference.child("images"));
        //    $scope.images = syncArray;
        //} else {
        //    $state.go("firebase");
        //}
        //$scope.upload = function () {
        //    var options = {
        //        quality: 95,
        //        destinationType: Camera.DestinationType.DATA_URL,
        //        sourceType: Camera.PictureSourceType.CAMERA,
        //        allowEdit: true,
        //        encodingType: Camera.EncodingType.JPEG,
        //        popoverOptions: CameraPopoverOptions,
        //        targetWidth: 500,
        //        targetHeight: 500,
        //        saveToPhotoAlbum: false
        //    };
        //    $cordovaCamera.getPicture(options).then(function (imageData) {
        //        syncArray.$add({image: imageData}).then(function () {
        //            alert("图片已上传!");
        //        });
        //    }, function (error) {
        //        console.error(error);
        //    });
        //}
    }
})();
