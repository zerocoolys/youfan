angular.module('yf_merchant.m_d_xfz_controllers', [])

    .controller('ManageDishesXfzCtrl', function ($scope, $state, $ionicLoading, $timeout, $ionicActionSheet, ManageDishesService) {

        console.log("ManageDishesXfzCtrl");

        $scope.addXfz = function () {
            $ionicActionSheet.show({
                buttons: [
                    {text: "<p class='text-center calm'>2人小饭桌</p>"},
                    {text: "<p class='text-center calm'>3人小饭桌</p>"},
                    {text: "<p class='text-center calm'>5人小饭桌</p>"}
                ],
                buttonClicked: function (index) {
                    var temp = [2, 3, 5];
                    $state.go("m_dishes_xfz_add", {xfzNum: temp[index]});
                },
                cancelText: "<p class='calm'>取消</p>",
                cancel: function () {
                    // add cancel code..
                }
            });
        };

        $scope.load = function () {
            $ionicLoading.show({
                template: "正在载入数据，请稍后..."
            });

            $timeout(function () {
                $scope.$broadcast("scroll.refreshComplete");
                ManageDishesService.allDishes("888888888", "xfz");
            }, 500);

        };

        $scope.load();

        $scope.$on("yf-merchant-load-dishes-success", function (e, data) {
            $scope.items = data;
            //隐藏载入指示器
            $ionicLoading.hide();
        });

        $scope.$on("yf-merchant-load-dishes-error", function (e, data) {
            $scope.$emit("youfan-merchant-show-msg", "远程连接出错");
            //隐藏载入指示器
            $ionicLoading.hide();
        });

        $scope.$on("yf-merchant-dishes-reload", function (e, data) {
            $scope.load();
            //隐藏载入指示器
            $ionicLoading.hide();
        });

    })

    .controller('ManageDishesXfzAddCtrl', function ($scope, $state, $ionicActionSheet, $stateParams, $ionicLoading, $ionicModal, $timeout, PhotoService, ManageDishesService, $cordovaCamera, $cordovaImagePicker) {
        console.log("ManageDishesXfzAddCtrl");

        $scope.xfzNum = $stateParams.xfzNum;
        $scope.dishes = {
            price: 8889,
            stock: 3,
            type: "xfz",
            xfzNum: $scope.xfzNum,
            sellerId: "888888888"
        };
        $scope.imgs = [];
        $scope.isActive = false;

        $scope.removePic = function (_index) {
            $scope.imgs.splice(_index, 1);
        };

        $scope.addXfzPic = function () {
            console.log("addXfzPic");
            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    {text: "<p class='text-center calm'>打开相机</p>"},
                    {text: "<p class='text-center calm'>打开相册</p>"}
                ],
                buttonClicked: function (index) {
                    if (!navigator.camera) {
                        alert('请在真机环境中使用相册功能。现在只是模拟一张图片')
                        $scope.imgs.push({
                            index: $scope.imgs.length,
                            url: PhotoService.randomPhoto()
                        });
                    } else {
                        if (index == 0) {
                            $scope.cameraImage();
                        }
                        if (index == 1) {
                            $scope.photoImage();
                        }
                    }
                    return true;
                },
                cancelText: "<p class='calm'>取消</p>",
                cancel: function () {
                    // add cancel code..
                }
            });

            // For example's sake, hide the sheet after two seconds
            $timeout(function () {
                //	hideSheet();
            }, 2000);

        };

        $scope.cameraImage = function () {
            var options = {
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA
            };

            $cordovaCamera.getPicture(options).then(function (imageURI) {
                $scope.imgs.push({
                    index: $scope.imgs.length,
                    url: imageURI
                });
            }, function (err) {
                // error
            });
        };

        $scope.photoImage = function () {
            var options = {
                maximumImagesCount: 1,
                width: 800,
                height: 800,
                quality: 80
            };

            $cordovaImagePicker.getPictures(options)
                .then(function (results) {
                    $scope.imgs.push({
                        index: $scope.imgs.length,
                        url: results[0]
                    });
                }, function (error) {
                    // error
                });
        };

        $scope.doCheckDishes = function () {
            $scope.isActive = true;

            if ($scope.imgs.length == 0) {
                $scope.$emit("youfan-merchant-show-msg", "请添加菜品图片");
                $scope.isActive = false;
                return;
            }

            if (!$scope.dishes.price || $scope.dishes.price == "") {
                $scope.$emit("youfan-merchant-show-msg", "请输入小饭桌的价格");
                $scope.isActive = false;
                return;
            }

            if (!$scope.dishes.stock || $scope.dishes.stock == "") {
                $scope.$emit("youfan-merchant-show-msg", "请输入小饭桌的库存");
                $scope.isActive = false;
                return;
            }

            $scope.doSave();

        };

        $scope.doSave = function () {
            $ionicLoading.show({
                template: "保存菜品中，请稍后..."
            });
            $scope.dishes.picUrls = [];// 清空
            angular.forEach($scope.imgs, function (e) {
                $scope.dishes.picUrls.push(e.url);
            });
            if ($scope.dishes.xfzNum == 2) {
                $scope.dishes.name = "两人小饭桌";
            } else if ($scope.dishes.xfzNum == 3) {
                $scope.dishes.name = "三人小饭桌";
            } else if ($scope.dishes.xfzNum == 5) {
                $scope.dishes.name = "五人小饭桌";
            }
            $timeout(function () {
                ManageDishesService.saveDishes($scope.dishes);
            }, 1000);

        };

        $scope.$on("yf-merchant-save-dishes-success", function () {
            $state.go("m_dishes.xfz");
        });

        $scope.$on("yf-merchant-save-dishes-error", function () {
            $scope.$emit("youfan-merchant-show-msg", "远程连接出错");
            $ionicLoading.hide();
            $scope.isActive = false;
        });
    })

    .controller("ManageDishesXfzEditCtrl", function ($scope, $state, $stateParams, $ionicLoading, $ionicPopup, $ionicActionSheet, $timeout, PhotoService, ManageDishesService, $cordovaCamera, $cordovaImagePicker) {
        console.log("ManageDishesXfzEditCtrl");

        $scope.paramObj.backType = "xfz";
        $scope.paramObj.menuId = $stateParams.menuId;
        $scope.isActive = false;
        $scope.dishes = {sale: true};

        $scope.removePic = function (_index) {
            $scope.imgs.splice(_index, 1);
        };

        $scope.addXfzPic = function () {
            console.log("addXfzPic");
            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    {text: "<p class='text-center calm'>打开相机</p>"},
                    {text: "<p class='text-center calm'>打开相册</p>"}
                ],
                buttonClicked: function (index) {
                    if (!navigator.camera) {
                        alert('请在真机环境中使用相册功能。现在只是模拟一张图片')
                        $scope.imgs.push({
                            index: $scope.imgs.length,
                            url: PhotoService.randomPhoto()
                        });
                    } else {
                        if (index == 0) {
                            $scope.cameraImage();
                        }
                        if (index == 1) {
                            $scope.photoImage();
                        }
                    }
                    return true;
                },
                cancelText: "<p class='calm'>取消</p>",
                cancel: function () {
                    // add cancel code..
                }
            });

            // For example's sake, hide the sheet after two seconds
            $timeout(function () {
                //	hideSheet();
            }, 2000);

        };

        $scope.cameraImage = function () {
            var options = {
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA
            };

            $cordovaCamera.getPicture(options).then(function (imageURI) {
                $scope.imgs.push({
                    index: $scope.imgs.length,
                    url: imageURI
                });
            }, function (err) {
                // error
            });
        };

        $scope.photoImage = function () {
            var options = {
                maximumImagesCount: 1,
                width: 800,
                height: 800,
                quality: 80
            };

            $cordovaImagePicker.getPictures(options)
                .then(function (results) {
                    $scope.imgs.push({
                        index: $scope.imgs.length,
                        url: results[0]
                    });
                }, function (error) {
                    // error
                });
        };

        $scope.doCheckDishes = function () {
            $scope.isActive = true;

            if ($scope.imgs.length == 0) {
                $scope.$emit("youfan-merchant-show-msg", "请添加菜品图片");
                $scope.isActive = false;
                return;
            }

            if (!$scope.dishes.price || $scope.dishes.price == "") {
                $scope.$emit("youfan-merchant-show-msg", "请输入小饭桌的价格");
                $scope.isActive = false;
                return;
            }

            if (!$scope.dishes.stock || $scope.dishes.stock == "") {
                $scope.$emit("youfan-merchant-show-msg", "请输入小饭桌的库存");
                $scope.isActive = false;
                return;
            }

            $scope.doSave();

        };

        $scope.doSave = function () {
            $ionicLoading.show({
                template: "保存菜品中，请稍后..."
            });
            $scope.dishes.picUrls = [];// 清空
            angular.forEach($scope.imgs, function (e) {
                $scope.dishes.picUrls.push(e.url);
            });
            $timeout(function () {
                ManageDishesService.updateDishes($scope.dishes);
            }, 1000);

        };

        $scope.$on("yf-merchant-load-dishes-success", function (e, msg) {
            $scope.dishes = msg;
            $scope.imgs = [];

            for (var i = 0; i < $scope.dishes.picUrls.length; i++) {
                $scope.imgs.push({
                    index: i,
                    url: $scope.dishes.picUrls[i]
                });
            }

            $ionicLoading.hide();
        });

        $scope.$on("yf-merchant-error", function () {
            $scope.$emit("youfan-merchant-show-msg", "远程连接出错");
            $state.go("m_dishes.xfz");
        });
    })

;
