/**
 * Created by perfection on 15-8-17.
 */
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('personinfo', personInfo);

    function personInfo($scope, $filter, $state) {
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
