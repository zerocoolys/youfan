/**
 * Created by perfection on 15-9-1.
 */
var imageUrlPrefix = "http://youfan-merchant-img.b0.upaiyun.com/";
var upYunForm_API_key = "+GJEDJwQ6qecG6Er+VrFEPektEo=";
var upYunSpaceName = "youfan-merchant-img";
var upYunSavePath = "{filemd5}{.suffix}";
var createActionSheet = function (buttonId,$ionicActionSheet, $scope, $cordovaCamera,$cordovaImagePicker) {
    $ionicActionSheet.show({
        buttons: [
            {text: '<p class="calm text-center"  >拍照</p>'},
            {text: '<p class="calm text-center" >从相册中选取</p>'}
        ],
        cancelText: '<p  class="calm">取消</p>',
        buttonClicked: function (index) {
            var options;
            switch (index) {
                case 0:
                    options = {
                        quality: 100,
                        destinationType: Camera.DestinationType.FILE_URI,
                        sourceType: Camera.PictureSourceType.CAMERA,
                        allowEdit: false,
                        encodingType: Camera.EncodingType.JPEG,
                        targetWidth: 323,
                        targetHeight: 600,
                        popoverOptions: CameraPopoverOptions,
                        correctOrientation: true,
                        saveToPhotoAlbum: false
                    };
                    $cordovaCamera.getPicture(options).then(function (imageURI) {
                        $scope.getImg(buttonId,imageURI);
                    }, function (err) {
                        // error
                    });
                    break;
                case 1:
                    if (!window.imagePicker) {
                        alert('目前您的环境不支持相册上传。');
                        return;
                    }
                    var options = {
                        maximumImagesCount: 1,
                        width: 323,
                        height: 600,
                        quality: 80
                    };

                    $cordovaImagePicker.getPictures(options).then(function (results) {
                        $scope.getImg(buttonId,results[0]);
                    }, function (error) {
                        alert(error);
                    });
                    break;
                case 2:
                    return;
                    break;
            }
            return true;
        }
    });
};
var uploadImg = function (buttonId, imageUrl,$ionicLoading,$scope) {
    var fileURL = imageUrl;
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    options.chunkedMode = true;
    var baseObj = {
        "bucket": upYunSpaceName,
        "expiration": (Date.parse(new Date()) / 1000) + 3600,
        "save-key": upYunSavePath
    };
    var baseStr = JSON.stringify(baseObj);
    var policy = base64.base64encode(baseStr);
    var signature = md5(policy + "&"+upYunForm_API_key);
    var params = {
        //bucket: "weiji",
        //expiration: (Date.parse(new Date()) / 1000) + 3600,
        //'save-key': "/test/{random}{.suffix}",
        policy: policy,
        signature: signature
    };
    options.params = params;

    $ionicLoading.show({
        template: '上传中...'
    });


    var ft = new FileTransfer();
    ft.upload(fileURL, "http://v0.api.upyun.com/"+upYunSpaceName, function (data) {
        alert(JSON.stringify(data))
        var result = JSON.parse(data.response);
        if (result.code == 200) {
            $ionicLoading.hide();
            var htmlImageUrl = imageUrlPrefix+result.url;
            $scope.saveImagePath(buttonId, htmlImageUrl.split("?")[0]);

        } else {
            $ionicLoading.hide();
            alert("上传失败");
        }

    }, function (error) {
        alert(JSON.stringify(error));
        $ionicLoading.hide();
    }, options);

};
