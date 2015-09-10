angular.module('yf_merchant.m_d_xfz_controllers', [])

    .controller('ManageDishesXfzCtrl', function ($scope, $state, $ionicLoading, $timeout, $ionicActionSheet, ManageDishesService, YF_MERCHANT_INFO,$ionicModal) {

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
                ManageDishesService.allDishes(YF_MERCHANT_INFO.mID, "xfz");
            }, 800);

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
        $ionicModal.fromTemplateUrl('templates/dishPic.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.dishPic = modal;
        });
        $scope.replacePic = function (_index) {

            $scope.imgs.unshift($scope.imgs[_index]);
            $scope.imgs.splice(_index+1,1);
            $ionicLoading.show({
                template:"设置成功"
            });
            $timeout(function () {
                $ionicLoading.hide();
            }, 1000);
            //$scope.imgs.splice(0,1,[$scope.imgs[_index]]);


        };
        $ionicModal.fromTemplateUrl('templates/dishPic.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.dishPic = modal;
        });
        $scope.replacePic = function (_index) {

            $scope.imgs.unshift($scope.imgs[_index]);
            $scope.imgs.splice(_index+1,1);
            $ionicLoading.show({
                template:"设置成功"
            });
            $timeout(function () {
                $ionicLoading.hide();
            }, 1000);
            //$scope.imgs.splice(0,1,[$scope.imgs[_index]]);


        };

    })

    .controller('ManageDishesXfzAddCtrl', function ($scope, $state, $ionicActionSheet, $stateParams, $ionicLoading, $ionicModal, $timeout, PhotoService, ManageDishesService, $cordovaCamera,  $cordovaImagePicker, YF_MERCHANT_INFO) {
        console.log("ManageDishesXfzAddCtrl");

        $scope.xfzNum = $stateParams.xfzNum;
        $scope.dishes = {
            price: 8889,
            stock: 3,
            type: "xfz",
            xfzNum: $scope.xfzNum,
            sellerId: YF_MERCHANT_INFO.mID
        };
        $scope.imgs = [];
        $scope.isActive = false;

        $scope.removePic = function (_index) {
            $scope.imgs.splice(_index, 1);
        };

        $scope.addXfzPic = function () {
            console.log("addXfzPic");
            if (!navigator.camera) {
                $scope.$emit("youfan-merchant-show-msg", "请在真机环境中使用相册功能。现在只是模拟一张图片");
                $scope.imgs.push({
                    index: $scope.imgs.length,
                    url: PhotoService.randomPhoto()
                });
            } else {
                createActionSheet("weims", $ionicActionSheet, $scope, $cordovaCamera, $cordovaImagePicker);
            }

        };

        $scope.getImg = function (buttonId, url) {
            uploadImg(buttonId, url, $ionicLoading, $scope);
        };

        $scope.saveImagePath = function (buttonId, url) {
            $scope.imgs.push({
                index: $scope.imgs.length,
                url: url
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

        $scope.$on("yf-merchant-save-dishes-error", function (e, msg) {
            $scope.$emit("youfan-merchant-show-msg", msg);
            $ionicLoading.hide();
            $scope.isActive = false;
        });
        $ionicModal.fromTemplateUrl('templates/dishPic.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.dishPic = modal;
        });
        $scope.replacePic = function (_index) {

            $scope.imgs.unshift($scope.imgs[_index]);
            $scope.imgs.splice(_index+1,1);
            $ionicLoading.show({
                template:"设置成功"
            });
            $timeout(function () {
                $ionicLoading.hide();
            }, 1000);
            //$scope.imgs.splice(0,1,[$scope.imgs[_index]]);


        };
    })

    .controller("ManageDishesXfzEditCtrl", function ($scope, $state, $stateParams, $ionicLoading, $ionicPopup, $ionicActionSheet, $timeout, PhotoService, ManageDishesService, $cordovaCamera, $cordovaImagePicker, $ionicModal) {
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
            if (!navigator.camera) {
                $scope.$emit("youfan-merchant-show-msg", "请在真机环境中使用相册功能。现在只是模拟一张图片");
                $scope.imgs.push({
                    index: $scope.imgs.length,
                    url: PhotoService.randomPhoto()
                });
            } else {
                createActionSheet("weims", $ionicActionSheet, $scope, $cordovaCamera, $cordovaImagePicker);
            }

        };

        $scope.getImg = function (buttonId, url) {
            uploadImg(buttonId, url, $ionicLoading, $scope);
        };

        $scope.saveImagePath = function (buttonId, url) {
            $scope.imgs.push({
                index: $scope.imgs.length,
                url: url
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
        $ionicModal.fromTemplateUrl('templates/dishPic.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.dishPic = modal;
        });
        $scope.replacePic = function (_index) {

            $scope.imgs.unshift($scope.imgs[_index]);
            $scope.imgs.splice(_index+1,1);
            $ionicLoading.show({
                template:"设置成功"
            });
            $timeout(function () {
                $ionicLoading.hide();
            }, 1000);
            //$scope.imgs.splice(0,1,[$scope.imgs[_index]]);


        };
    })

;
