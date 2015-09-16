/**
 * Created by xiaowei on 15-8-17.
 */
ServiceModule.factory('CameraService', function ($ionicActionSheet, $ionicPopup,$ionicLoading, $cordovaCamera, $cordovaImagePicker) {
    return {
        createCameraPath: function ($scope, func) {
            $scope.createActionSheet = function () {
                $ionicActionSheet.show({
                    titleText: '图片选择',
                    buttons: [
                        {
                            text: '拍照',
                            onclick: function () {
                                if (!navigator.camera) {
                                    popup.alert($ionicPopup, {
                                        scope: $scope,
                                        template: '请在真机环境中使用拍照功能！'
                                    });
                                    return;
                                }
                                var options = {
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
                                    alert(imageURI);
                                    if (func) {
                                        func({getType: 0, pathData: imageURI})
                                    }
                                }, function (err) {
                                    console.log(err);
                                });
                            }
                        },
                        {
                            text: '从相册选择',
                            onclick: function () {
                                if (!window.imagePicker) {
                                    popup.alert($ionicPopup, {
                                        scope: $scope,
                                        template: '目前您的环境不支持相册上传！'
                                    });
                                    return;
                                }
                                var options = {
                                    maximumImagesCount: 1,
                                    width: 323,
                                    height: 600,
                                    quality: 80
                                };
                                //var options = {
                                //    quality: 100,
                                //    destinationType: Camera.DestinationType.FILE_URI,
                                //    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                                //    allowEdit: false,
                                //    encodingType: Camera.EncodingType.JPEG,
                                //    targetWidth: 323,
                                //    targetHeight: 600,
                                //    popoverOptions: CameraPopoverOptions,
                                //    correctOrientation: true,
                                //    saveToPhotoAlbum: false
                                //};

                                $cordovaImagePicker.getPictures(options).then(function (results) {
                                //$cordovaCamera.getPictures(options).then(function (results) {
                                    if (func) {
                                        func({getType: 1, pathData: results})
                                    }
                                }, function (error) {
                                    console.log(error);
                                });
                            }
                        }
                    ],
                    cancelText: '取 消',
                    buttonClicked: function (index) {
                        this.buttons[index].onclick();
                        return true;
                    }
                });
            }
        },
        upImg: function (fileUrl, cb) {
            if (!fileUrl) {
                popup.alert($ionicPopup, {
                    scope: $scope,
                    template: '请添加图片！'
                });
                return;
            }
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = fileUrl.substr(fileUrl.lastIndexOf('/') + 1);
            options.mimeType = "image/jpeg";
            options.chunkedMode = true;
            var baseObj = {
                "bucket": "youfan-merchant-img",
                "expiration": (Date.parse(new Date()) / 1000) + 3600,
                "save-key": "/{filemd5}{.suffix}"
            };
            var baseStr = JSON.stringify(baseObj);
            var policy = window.btoa(baseStr);
            var signature = md5(policy + "&+GJEDJwQ6qecG6Er+VrFEPektEo=");
            var params = {
                //bucket: "weiji",
                //expiration: 1438876740,
                //'save-key': "/test/{filename}{.suffix}",
                policy: policy,
                signature: signature
            }

            options.params = params;

            var ft = new FileTransfer();
            $ionicLoading.show({
                template: '上传中...'
            });
            ft.upload(fileUrl, "http://v0.api.upyun.com/youfan-merchant-img", function (data) {
                if (cb) {
                    cb(data)
                }
                $ionicLoading.hide();
            }, function (error) {
                if (cb) {
                    cb(error)
                }
                $ionicLoading.hide();
            }, options);
        }
    }
});