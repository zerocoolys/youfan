/**
 * Created by perfection on 15-9-1.
 */
var createActionSheet = function () {
    $ionicActionSheet.show({
        buttons: [
            {text: '<p class="calm text-center"  >拍照</p>'},
            {text: '<p class="calm text-center" >从相册中选取</p>'},
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
                        $scope.uploadImg(imageURI);
                        //$scope.imageUrl = imageURI;
                        ////var img = document.getElementById("myImg");
                        ////img.src = "data:image/jpeg;base64," + imageURI;
                        //$scope.allowUpload = false;
                    }, function (err) {
                        // error
                    });
                    break;
                case 1:
                    if (!navigator.camera) {
                        alert('请在真机环境中使用相册功能。');
                        return;
                    }
                    options = {
                        quality: 100,
                        destinationType: Camera.DestinationType.FILE_URI,
                        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                        allowEdit: false,
                        encodingType: Camera.EncodingType.JPEG,
                        targetWidth: 323,
                        targetHeight: 600,
                        popoverOptions: CameraPopoverOptions,
                        correctOrientation: true,
                        saveToPhotoAlbum: false
                    };

                    $cordovaCamera.getPicture(options).then(function (imageURI) {
                        $scope.imageUrl = imageURI;
                        //var img = document.getElementById("myImg");
                        //img.src = "data:image/jpeg;base64," + imageURI;
                        $scope.allowUpload = false;
                    }, function (err) {
                        // error
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
var uploadImg = function () {
    var fileURL = $scope.imageUrl;
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    options.chunkedMode = true;
    var baseObj = {
        "bucket": "youfan-pic",
        "expiration": (Date.parse(new Date()) / 1000) + 3600,
        "save-key": "/test/{random}{.suffix}"
    };
    var baseStr = JSON.stringify(baseObj);
    var policy = base64.base64encode(baseStr);
    var signature = md5(policy + "&SEsEvErVbibUJ0IPLY9hH+IvCwQ=");
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
    ft.upload(fileURL, "http://v0.api.upyun.com/youfan-pic", function (data) {
        var result = JSON.parse(data.response);
        if (result.code == 200) {
            alert("上传成功");
            $ionicLoading.hide();
        } else {
            $ionicLoading.hide();
            alert("上传失败");
        }

    }, function (error) {
        alert(JSON.stringify(error));
        $ionicLoading.hide();
    }, options);

};
