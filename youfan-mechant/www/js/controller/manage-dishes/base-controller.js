angular.module('yf_merchant.manage_dishes_controllers', ['yf_merchant.m_d_qtc_controllers', 'yf_merchant.m_d_xfz_controllers', 'yf_merchant.m_d_nsc_controllers', 'yf_merchant.manage_dishes_service'])

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
            .state('m_dishes_nsc_edit', {
                url: '/manage/dishes/nsc/edit/:menuId',
                controller: 'ManageDishesNscEditCtrl',
                templateUrl: 'templates/manage-dishes/manage-dishes-nsc-edit.html'
            })
            .state('m_dishes_qtc_add', {
                url: '/manage/dishes/qtc/add',
                controller: 'ManageDishesQtcAddCtrl',
                templateUrl: 'templates/manage-dishes/manage-dishes-qtc-add.html'
            })
            .state('m_dishes_qtc_edit', {
                url: '/manage/dishes/qtc/edit/:menuId',
                controller: 'ManageDishesQtcEditCtrl',
                templateUrl: 'templates/manage-dishes/manage-dishes-qtc-edit.html'
            })
            .state('m_dishes_xfz_add', {
                url: '/manage/dishes/xfz/add/:xfzNum',
                controller: 'ManageDishesXfzAddCtrl',
                templateUrl: 'templates/manage-dishes/manage-dishes-xfz-add.html'
            })
            .state('m_dishes_xfz_edit', {
                url: '/manage/dishes/xfz/edit/:menuId',
                controller: 'ManageDishesXfzEditCtrl',
                templateUrl: 'templates/manage-dishes/manage-dishes-xfz-edit.html'
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