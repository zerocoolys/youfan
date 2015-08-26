angular.module('yf_merchant.manage_dishes_controllers', ['yf_merchant.manage-dishes_service'])

    .controller('ManageDishesCtrl', function ($scope, $state, $ionicLoading, ManageDishesService) {
        console.log("ManageDishesCtrl");
        $scope.upSale = function (obj) {
            console.log("upSale");

            $ionicLoading.show({
                template: "正在载入数据，请稍后..."
            });

            ManageDishesService.conversionSale({
                menuId: obj.menuId,
                sale: true
            });
        };

        $scope.downSale = function (obj) {
            console.log("downSale");

            $ionicLoading.show({
                template: "正在载入数据，请稍后..."
            });

            ManageDishesService.conversionSale({
                menuId: obj.menuId,
                sale: false
            });
        };

        $scope.goDishesStock = function (backState) {
            $state.go("m_dishes_stock", {backType: backType});
        };

    })

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

            ManageDishesService.allDishes("888888888", "nsc");

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

            ManageDishesService.allDishes("888888888", "xfz");

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

            ManageDishesService.allDishes("888888888", "qtc");

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

    .controller('ManageDishesNscAddCtrl', function ($scope, $state, $ionicActionSheet, $ionicLoading, $timeout, KwService, ManageDishesService) {

        console.log("ManageDishesNscAddCtrl");

        $scope.kwItems = KwService.all();

        $scope.dishes = {
            staple: false,
            picUrls: [],
            type: "nsc",
            name: "红烧北极熊",
            price: 666,
            stock: 3,
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

        $scope.addNscPic = function () {
            console.log("addNscPic");
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
            console.log($scope.dishes);
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

    //今日余量
    .controller("ManageDishesStockJrCtrl", function ($scope, $timeout, $stateParams, $ionicLoading, ManageDishesService) {
        console.log("ManageDishesStockJrCtrl");
        $scope.backType = $stateParams.backType;
        $scope.init = function () {
            $scope.isActive = false;
            $scope.nscItems = [];
            $scope.xfzItems = [];
            $scope.qtcItems = [];
            $scope.nscItemsBase = [];
            $scope.xfzItemsBase = [];
            $scope.qtcItemsBase = [];
        };

        $scope.subStock = function (item) {
            if (item.restNum > 0) {
                item.restNum--;
            }
        };

        $scope.plusStock = function (item) {
            if (item.restNum < 99) {
                item.restNum++;
            }
        };

        $scope.load = function () {

            $ionicLoading.show({
                template: "正在载入数据，请稍后..."
            });

            $timeout(function () {
                $scope.init();
                ManageDishesService.allSaleDishes("888888888");
            }, 1000);

        };

        $scope.doCheckStock = function () {
            $scope.isActive = true;
            $scope.changeItem = [];
            for (var i = 0; i < $scope.nscItems.length; i++) {
                if ($scope.nscItems[i].restNum != $scope.nscItemsBase[i].restNum) {
                    $scope.changeItem.push({
                        menuId: $scope.nscItems[i].menuId,
                        restNum: $scope.nscItems[i].restNum
                    });
                }
            }
            for (var i = 0; i < $scope.qtcItems.length; i++) {
                if ($scope.qtcItems[i].restNum != $scope.qtcItemsBase[i].restNum) {
                    $scope.changeItem.push({
                        menuId: $scope.qtcItems[i].menuId,
                        restNum: $scope.qtcItems[i].restNum
                    });
                }
            }
            for (var i = 0; i < $scope.xfzItems.length; i++) {
                if ($scope.xfzItems[i].restNum != $scope.xfzItemsBase[i].restNum) {
                    $scope.changeItem.push({
                        menuId: $scope.xfzItems[i].menuId,
                        restNum: $scope.xfzItems[i].restNum
                    });
                }
            }
            if ($scope.changeItem.length == 0) {
                alert("库存没有变化");
                $scope.isActive = false;
            } else {
                $scope.doSave();
            }
        };

        $scope.doSave = function () {
            $ionicLoading.show({
                template: "正在载入数据，请稍后..."
            });
            console.log($scope.changeItem);

            ManageDishesService.changeDishesRestNum($scope.changeItem);
        };

        $scope.$on("yf-merchant-load-dishes-success", function (e, data) {
            angular.forEach(data, function (e) {
                if (e.type == "nsc") {
                    $scope.nscItems.push(e);
                    $scope.nscItemsBase.push(angular.copy(e));
                } else if (e.type == "qtc") {
                    $scope.qtcItems.push(e);
                    $scope.qtcItemsBase.push(angular.copy(e));
                } else if (e.type == "xfz") {
                    $scope.xfzItems.push(e);
                    $scope.xfzItemsBase.push(angular.copy(e));
                } else {
                    console.log("你是啥.....");
                }
            });
            console.log(data);
            //隐藏载入指示器
            $ionicLoading.hide();
        });

        $scope.$on("yf-merchant-load-dishes-error", function (e, data) {
            alert("系统错误");
            $scope.isActive = false;
            //隐藏载入指示器
            $ionicLoading.hide();
        });

        $scope.$on("yf-merchant-dishes-reload", function (e, data) {
            //隐藏载入指示器
            $ionicLoading.hide();
            $scope.load();
        });


    })

    //每日余量
    .controller("ManageDishesStockMrCtrl", function ($scope, $timeout, $stateParams, $ionicLoading, ManageDishesService) {
        console.log("ManageDishesStockMrCtrl");
        $scope.backType = $stateParams.backType;

        $scope.init = function () {
            $scope.isActive = false;
            $scope.nscItems = [];
            $scope.xfzItems = [];
            $scope.qtcItems = [];
            $scope.nscItemsBase = [];
            $scope.xfzItemsBase = [];
            $scope.qtcItemsBase = [];
        };

        $scope.subStock = function (item) {
            if (item.stock > 0) {
                item.stock--;
            }
        };

        $scope.plusStock = function (item) {
            if (item.stock < 99) {
                item.stock++;
            }
        };

        $scope.load = function () {

            $ionicLoading.show({
                template: "正在载入数据，请稍后..."
            });

            $timeout(function () {
                $scope.init();
                ManageDishesService.allSaleDishes("888888888");
            }, 1000);

        };

        $scope.doCheckStock = function () {
            $scope.isActive = true;
            $scope.changeItem = [];
            for (var i = 0; i < $scope.nscItems.length; i++) {
                if ($scope.nscItems[i].stock != $scope.nscItemsBase[i].stock) {
                    $scope.changeItem.push({
                        menuId: $scope.nscItems[i].menuId,
                        stock: $scope.nscItems[i].stock
                    });
                }
            }
            for (var i = 0; i < $scope.qtcItems.length; i++) {
                if ($scope.qtcItems[i].stock != $scope.qtcItemsBase[i].stock) {
                    $scope.changeItem.push({
                        menuId: $scope.qtcItems[i].menuId,
                        stock: $scope.qtcItems[i].stock
                    });
                }
            }
            for (var i = 0; i < $scope.xfzItems.length; i++) {
                if ($scope.xfzItems[i].stock != $scope.xfzItemsBase[i].stock) {
                    $scope.changeItem.push({
                        menuId: $scope.xfzItems[i].menuId,
                        stock: $scope.xfzItems[i].stock
                    });
                }
            }
            if ($scope.changeItem.length == 0) {
                alert("库存没有变化");
                $scope.isActive = false;
            } else {
                $scope.doSave();
            }
        };

        $scope.doSave = function () {
            $ionicLoading.show({
                template: "正在载入数据，请稍后..."
            });
            console.log($scope.changeItem);

            ManageDishesService.changeDishesStock($scope.changeItem);

        };

        $scope.$on("yf-merchant-load-dishes-success", function (e, data) {
            angular.forEach(data, function (e) {
                if (e.type == "nsc") {
                    $scope.nscItems.push(e);
                    $scope.nscItemsBase.push(angular.copy(e));
                } else if (e.type == "qtc") {
                    $scope.qtcItems.push(e);
                    $scope.qtcItemsBase.push(angular.copy(e));
                } else if (e.type == "xfz") {
                    $scope.xfzItems.push(e);
                    $scope.xfzItemsBase.push(angular.copy(e));
                } else {
                    console.log("你是啥.....");
                }
            });
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
            //隐藏载入指示器
            $ionicLoading.hide();
            $scope.load();
        });


    })

    .config(function ($stateProvider, $urlRouterProvider) {

        // 设置
        $stateProvider
            .state('m_dishes', {
                url: '/manage/dishes',
                abstract: true,
                controller: 'ManageDishesCtrl',
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
                url: '/manage/dishes/xfz/add/:xfzNum',
                controller: 'ManageDishesXfzAddCtrl',
                templateUrl: 'templates/manage-dishes/manage-dishes-xfz-add.html'
            })
            .state('m_dishes_jr_stock', {//今日库存
                url: '/manage/dishes/jr/stock/:backType',
                controller: 'ManageDishesStockJrCtrl',
                templateUrl: 'templates/manage-dishes/manage-dishes-jr-stock.html'
            })
            .state('m_dishes_mr_stock', {//每日库存
                url: '/manage/dishes/mr/stock/:backType',
                controller: 'ManageDishesStockMrCtrl',
                templateUrl: 'templates/manage-dishes/manage-dishes-mr-stock.html'
            })
        ;

    })
;