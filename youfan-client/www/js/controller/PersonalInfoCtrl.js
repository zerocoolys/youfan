/**
 * Created by ss on 2015/8/19.
 */
ControllerModule.controller('PersonalInfoCtrl', function ($scope, $rootScope, $window, $state, $stateParams, AuthenticationService, localStorageService, $ionicSlideBoxDelegate, $ionicActionSheet, $ionicLoading, $ionicPopup, $timeout, $http, UserService, $cordovaCamera, $cordovaImagePicker) {

    if (AuthenticationService.isLogged) {
        UserService.userInfo(localStorageService.get("userid")).success(function (data) {
            //console.log(data);
            $scope.post = {
                uid: data.payload.id,
                name: data.payload.name,
                sex: data.payload.sex,
                age: data.payload.age,
                jobs: data.payload.jobs
            };
        }).error(function (status, data) {
            console.log(status);
            console.log(data);
        });
    }

    //$scope.post={}

    $scope.showActionSexSheet = function (id) {
        if (id == 1) {
            $ionicActionSheet.show({
                buttons: [
                    {
                        text: '<p class="text-center mainColor">男</p>',
                        onclick: function () {
                            $scope.post.sex = '男';
                        }
                    },
                    {
                        text: '<p class="text-center mainColor">女</p>',
                        onclick: function () {
                            $scope.post.sex = '女';
                        }
                    }
                ],
                cancelText: '取消',
                buttonClicked: function (index) {
                    this.buttons[index].onclick();
                    return true;
                }
            })
        } else if (id == 2) {
            $ionicActionSheet.show({
                buttons: [
                    {
                        text: '<p class="text-center mainColor">60后</p>',
                        onclick: function () {
                            $scope.post.age = "60后";
                        }
                    },
                    {
                        text: '<p class="text-center mainColor">70后</p>',
                        onclick: function () {
                            $scope.post.age = "70后";
                        }
                    },
                    {
                        text: '<p class="text-center mainColor">80后</p>',
                        onclick: function () {
                            $scope.post.age = "80后";
                        }
                    },
                    {
                        text: '<p class="text-center mainColor">90后</p>',
                        onclick: function () {
                            $scope.post.age = "90后";
                        }
                    }
                ],
                cancelText: '取消',
                buttonClicked: function (index) {
                    this.buttons[index].onclick();
                    return true;
                }
            })
        }else if(id == 3){
            $ionicActionSheet.show({
                buttons: [
                    {
                        text: '<p class="text-center mainColor">拍摄</p>',
                        onclick: function () {
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
//                                $scope.getImg(buttonId,imageURI); 上传图片的函数
                            }, function (err) {
                                // error
                                alert(JSON.stringify(err))
                            });

                        }
                    },
                    {
                        text: '<p class="text-center mainColor">相册选取</p>',
                        onclick: function () {
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
//                                $scope.getImg(buttonId,results[0]); 上传图片的函数
                            }, function (error) {
                                alert(error);
                            });

                        }
                    }
                ],
                cancelText: '取消',
                buttonClicked: function (index) {
                    this.buttons[index].onclick();
                    return true;
                }
            })
        }

    };

    $scope.show = function (post) {
        UserService.updateInfo(post).success(function (data) {

            //console.log(data);

            if (data.code == 0) {
                $state.go('tab.chats');
            } else {
                var updateErr = $ionicPopup.show({
                    title: '网络异常,请重设密码',
                    scope: $scope
                });
                $timeout(function () {
                    updateErr.close();
                }, 2000);
            }

        })
            .error(function (status, data) {
                console.log(status);
                console.log(data);
            });


        $ionicLoading.show({
            template: '<div><ion-spinner icon="bubbles" class="spinner-calm"></ion-spinner>保存中...</div>'
        });
        $timeout(function () {
            $ionicLoading.hide();
        }, 1000);
    };
});