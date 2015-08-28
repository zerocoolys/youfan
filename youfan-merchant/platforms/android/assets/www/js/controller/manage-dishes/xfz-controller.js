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

    .controller('ManageDishesXfzAddCtrl', function ($scope, $state, $ionicActionSheet, $stateParams, $ionicLoading, $timeout, KwService, ManageDishesService) {
        console.log("ManageDishesXfzAddCtrl");

        $scope.xfzNum = $stateParams.xfzNum;
        $scope.dishes = {
            price: 8889,
            stock: 3,
            type: "xfz",
            xfzNum: $scope.xfzNum,
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

        $scope.addXfzPic = function () {
            $ionicActionSheet.show({
                buttons: [
                    {text: '<p class="calm text-center">拍照</p>'},
                    {text: '<p class="calm text-center">从相册中选取</p>'}
                ],
                cancelText: '<p class="calm">取消</p>',
                buttonClicked: function () {
                    if (!navigator.camera) {
                        alert('请在真机环境中使用相册功能。现在只是模拟一张图片')
                    }
                    $scope.imgs.push({
                        index: $scope.imgs.length,
                        url: "https://avatars3.githubusercontent.com/u/11214?v=3&s=460"
                    });
                    return true;
                }
            });

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
            alert("系统错误");
            $ionicLoading.hide();
            $scope.isActive = false;
        });
    })

    .controller("ManageDishesXfzEditCtrl", function ($scope, $state, $stateParams, $ionicLoading, $ionicPopup, $ionicActionSheet, $timeout, ManageDishesService) {
        console.log("ManageDishesXfzEditCtrl");

        $scope.paramObj.backType = "xfz";
        $scope.paramObj.menuId = $stateParams.menuId;
        $scope.isActive = false;
        $scope.dishes = {sale: true};

        $scope.addXfzPic = function () {
            $ionicActionSheet.show({
                buttons: [
                    {text: '<p class="calm text-center">拍照</p>'},
                    {text: '<p class="calm text-center">从相册中选取</p>'}
                ],
                cancelText: '<p class="calm">取消</p>',
                buttonClicked: function () {
                    if (!navigator.camera) {
                        alert('请在真机环境中使用相册功能。现在只是模拟一张图片')
                    }
                    $scope.imgs.push({
                        index: $scope.imgs.length,
                        url: "https://avatars3.githubusercontent.com/u/11214?v=3&s=460"
                    });
                    return true;
                }
            });

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
            $state.go("m_dishes.xfz");
        });
    })

;