angular.module('yf_merchant.m_d_qtc_controllers', [])

    .controller('ManageDishesQtcCtrl', function ($scope, $state, $ionicLoading, $timeout, ManageDishesService) {

        console.log("ManageDishesQtcCtrl");

        $scope.items = [];

        $scope.addQtc = function () {
            $state.go("m_dishes_qtc_add");
        };

        $scope.load = function () {
            $ionicLoading.show({
                template: "正在载入数据，请稍后..."
            });

            $timeout(function () {
                $scope.$broadcast("scroll.refreshComplete");
                ManageDishesService.allDishes("888888888", "qtc");
            }, 500);

        };

        $scope.load();

        $scope.$on("yf-merchant-load-dishes-success", function (e, data) {
            $scope.items = data;
            console.log(data);
            //隐藏载入指示器
            $ionicLoading.hide();
        });

        $scope.$on("yf-merchant-load-dishes-error", function (e, data) {
            alert("系统错误");
            //隐藏载入指示器
            $ionicLoading.hide();
        });

        $scope.$on("yf-merchant-dishes-reload", function (e, data) {
            $scope.load();
            //隐藏载入指示器
            $ionicLoading.hide();
        });

    })

    .controller('ManageDishesQtcAddCtrl', function ($scope, $state, $ionicActionSheet, $ionicLoading, $timeout, KwService, ManageDishesService) {

        console.log("ManageDishesQtcAddCtrl");

        $scope.kwItems = KwService.all();

        $scope.dishes = {
            staple: false,
            picUrls: [],
            type: "qtc",
            name: "红烧北极熊",
            price: 888,
            stock: 8,
            description: "好吃，不上火",
            taste: 3,
            staple: true,
            features: ["保护动物", "开心果", "刘德华", "自行车"],
            sellerId: "888888888"
        };
        $scope.imgs = [{
            index: 0,
            url: "https://avatars3.githubusercontent.com/u/11214?v=3&s=460"
        }, {
            index: 1,
            url: "https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png"
        }];
        $scope.isActive = false;

        $scope.addQtcPic = function () {
            console.log("addQtcPic");
            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    {text: "<p class='text-center calm'>打开相机</p>"},
                    {text: "<p class='text-center calm'>打开相册</p>"}
                ],
                buttonClicked: function (index) {
                    if (!navigator.camera) {
                        alert('请在真机环境中使用相册功能。现在只是模拟一张图片')
                    }
                    $scope.imgs.push({
                        index: $scope.imgs.length,
                        url: "https://avatars3.githubusercontent.com/u/11214?v=3&s=460"
                    });
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

        $scope.doCheckDishes = function () {
            $scope.isActive = true;
            if ($scope.imgs.length == 0) {
                alert("请添加菜品图片");
                $scope.isActive = false;
            } else {
                $scope.doSave();
            }
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
                ManageDishesService.saveDishes($scope.dishes);
            }, 1000);

        };

        $scope.$on("yf-merchant-save-dishes-success", function () {
            $state.go("m_dishes.qtc");
        });

        $scope.$on("yf-merchant-save-dishes-error", function () {
            alert("系统错误");
            $ionicLoading.hide();
            $scope.isActive = false;
        });


    })

    .controller('ManageDishesQtcEditCtrl', function ($scope, $state, $stateParams, $ionicPopup, $ionicActionSheet, $ionicLoading, $timeout, KwService, ManageDishesService) {

        console.log("ManageDishesQtcEditCtrl");
        // 初始化参数
        $scope.paramObj.backType = "qtc";
        $scope.paramObj.menuId = $stateParams.menuId;
        $scope.dishes = {sale: true};
        $scope.imgs = [];
        $scope.isActive = false;

        $scope.addQtcPic = function () {
            console.log("addQtcPic");
            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    {text: "<p class='text-center calm'>打开相机</p>"},
                    {text: "<p class='text-center calm'>打开相册</p>"}
                ],
                buttonClicked: function (index) {
                    if (!navigator.camera) {
                        alert('请在真机环境中使用相册功能。现在只是模拟一张图片')
                    }
                    $scope.imgs.push({
                        index: $scope.imgs.length,
                        url: "https://avatars3.githubusercontent.com/u/11214?v=3&s=460"
                    });
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

        $scope.doCheckDishes = function () {
            $scope.isActive = true;
            if ($scope.imgs.length == 0) {
                alert("请添加菜品图片");
                $scope.isActive = false;
            } else {
                $scope.doSave();
            }
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

        $scope.confirmChangeDishes = function () {
            $ionicPopup.confirm({
                title: "<b>提示</b>",
                template: "是否要设置为拿手菜",
                cancelText: '否', // String (default: 'OK'). The text of the OK button.
                cancelType: 'button button-stable', // St
                okText: '是', // String (default: 'OK'). The text of the OK button.
                okType: 'button button-assertive' // St
            }).then(function (res) {
                if (res) {
                    $scope.doChangeDishes();
                }
            });
        };

        $scope.doChangeDishes = function () {
            $ionicLoading.show({
                template: "<ion-spinner icon='android'></ion-spinner>"
            });

            $timeout(function () {
                ManageDishesService.conversionDishesType($scope.dishes);
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

        $scope.$on("yf-merchant-save-dishes-error", function () {
            alert("系统错误");
            $ionicLoading.hide();
            $scope.isActive = false;
        });

    })
;