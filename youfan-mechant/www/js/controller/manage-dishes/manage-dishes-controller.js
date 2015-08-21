angular.module('yf_merchant.manage_dishes_controllers', ['yf_merchant.manage-dishes_service'])

    .controller('ManageDishesNscCtrl', function ($scope, $state, $ionicLoading, $timeout, ManageDishesService) {

        console.log("ManageDishesNscCtrl");

        $scope.items = [];

        $scope.addNsc = function () {
            $state.go("m_dishes_nsc_add");
        };

        $scope.load = function () {
            $ionicLoading.show({
                template: "正在载入数据，请稍后..."
            });

            ManageDishesService.allDishes("隔壁老王", "nsc");

        };

        $scope.load();

        $scope.$on("yf-merchant-load-dishes-success", function (e, data) {
            $scope.items = data;
            //隐藏载入指示器
            $ionicLoading.hide();
        });

    })

    .controller('ManageDishesXfzCtrl', function ($scope, $state, $ionicLoading, $timeout) {

        console.log("ManageDishesXfzCtrl");

        $scope.addXfz = function () {
            $state.go("m_dishes_xfz_add");
        };


    })

    .controller('ManageDishesQtcCtrl', function ($scope, $state, $ionicLoading, $timeout) {

        console.log("ManageDishesQtcCtrl");

        $scope.items = [];

        $scope.addQtc = function () {
            $state.go("m_dishes_qtc_add");
        };

        $scope.load = function () {
            $ionicLoading.show({
                template: "正在载入数据，请稍后..."
            });
            //延时2000ms来模拟载入的耗时行为
            var idx = 0;
            var max = Math.ceil(Math.random() * 7);
            $timeout(function () {
                for (var i = 0; i < max; i++, idx++) $scope.items.unshift({
                    name: "青椒肉丝",
                    price: Math.ceil(Math.random() * 100),
                    url: "https://avatars3.githubusercontent.com/u/11214?v=3&s=460"
                });
                //隐藏载入指示器
                $ionicLoading.hide();
            }, 2000);
            $scope.isActive = false;
        };

        $scope.load();


    })

    .controller('ManageDishesNscAddCtrl', function ($scope, $state, $ionicActionSheet, $ionicLoading, $timeout, KwService, ManageDishesService) {

        console.log("ManageDishesNscAddCtrl");

        $scope.kwItems = KwService.all();

        $scope.dishes = {staple: false};
        $scope.imgs = [];
        $scope.isActive = false;

        $scope.addNscPic = function () {
            console.log("addNscPic");
            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    {text: "打开相机"},
                    {text: "打开相册"}
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
                cancelText: "取消",
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
            $timeout(function () {
                ManageDishesService.saveDishes($scope.dishes);
            }, 1000);


        };

        $scope.$on("yf-merchant-save-dishes-success", function () {
            $state.go("m_dishes.nsc");
        });

        $scope.$on("yf-merchant-save-dishes-error", function () {
            alert("系统错误");
            $ionicLoading.hide();
            $scope.isActive = false;
        });

    })

    .controller('ManageDishesQtcAddCtrl', function ($scope, $state, $ionicActionSheet, $ionicLoading, $timeout, $cordovaImagePicker, KwService, ManageDishesService) {

        console.log("ManageDishesQtcAddCtrl");

        $scope.kwItems = KwService.all();

        $scope.dishes = {staple: false};
        $scope.imgs = [];
        $scope.isActive = false;

        $scope.addQtcPic = function () {
            console.log("addQtcPic");
            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    {text: "打开相机"},
                    {text: "打开相册"}
                ],
                buttonClicked: function (index) {
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
                            // error getting photos
                        });

                    return true;
                },
                cancelText: "取消",
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
            $timeout(function () {
                ManageDishesService.saveDishes($scope.dishes);
            }, 1000);


        };

        $scope.$on("yf-merchant-save-dishes-success", function () {
            $state.go("m_dishes.nsc");
        });

        $scope.$on("yf-merchant-save-dishes-error", function () {
            alert("系统错误");
            $ionicLoading.hide();
            $scope.isActive = false;
        });


    })

    .controller('ManageDishesXfzAddCtrl', function ($scope, $state, $ionicActionSheet, $ionicLoading, $timeout, KwService, ManageDishesService) {
        console.log("ManageDishesXfzAddCtrl");
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        // 设置
        $stateProvider
            .state('m_dishes', {
                url: '/manage/dishes',
                abstract: true,
                templateUrl: 'templates/manage-dishes/manage-dishes-entrance.html'
            })
            .state('m_dishes.nsc', {
                url: '/nsc',
                views: {
                    'm_dishes_nsc': {
                        controller: 'ManageDishesNscCtrl',
                        templateUrl: 'templates/manage-dishes/manage-dishes-nsc.html'
                    }
                }
            })
            .state('m_dishes.xfz', {
                url: '/xfz',
                views: {
                    'm_dishes_xfz': {
                        controller: 'ManageDishesXfzCtrl',
                        templateUrl: 'templates/manage-dishes/manage-dishes-xfz.html'
                    }
                }
            })
            .state('m_dishes.qtc', {
                url: '/qtc',
                views: {
                    'm_dishes_qtc': {
                        controller: 'ManageDishesQtcCtrl',
                        templateUrl: 'templates/manage-dishes/manage-dishes-qtc.html'
                    }
                }
            })
            .state('m_dishes_nsc_add', {
                url: '/manage/dishes/nsc/add',
                controller: 'ManageDishesNscAddCtrl',
                templateUrl: 'templates/manage-dishes/manage-dishes-nsc-add.html'
            })
            .state('m_dishes_qtc_add', {
                url: '/manage/dishes/qtc/add',
                controller: 'ManageDishesQtcAddCtrl',
                templateUrl: 'templates/manage-dishes/manage-dishes-qtc-add.html'
            })
            .state('m_dishes_xfz_add', {
                url: '/manage/dishes/xfz/add',
                controller: 'ManageDishesXfzAddCtrl',
                templateUrl: 'templates/manage-dishes/manage-dishes-xfz-add.html'
            })
        ;

    })
;