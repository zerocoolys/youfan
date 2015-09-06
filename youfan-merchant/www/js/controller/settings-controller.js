angular.module('yf_merchant.settings_controllers', ['yf_merchant.settings_service'])

    .controller('SettingsIndexCtrl', function ($scope, $ionicModal, $timeout, $cordovaImagePicker) {
        $scope.items = [{
            "title": "我的银行卡",
            "description": "我的银行卡",
            "img": "https://avatars3.githubusercontent.com/u/11214?v=3&s=460"
        }, {
            "title": "帮助",
            "description": "帮助", "img": "https://avatars3.githubusercontent.com/u/11214?v=3&s=460"
        }, {"title": "免责声明", "description": "免责声明", "img": "https://avatars3.githubusercontent.com/u/11214?v=3&s=460"}];

        //image picker
        $scope.pickImage = function () {

            console.log("haha");

            var options = {
                maximumImagesCount: 1,
                width: 800,
                height: 800,
                quality: 80
            };
            alert($cordovaImagePicker.getPictures);

            $cordovaImagePicker.getPictures(options)
                .then(function (results) {
                    console.log(results);
                    $scope.imgSrc = results[0];
                }, function (error) {
                    // error getting photos
                });

        }

    })

    .controller('SettingsHelpCtrl', function ($scope, HelpService) {
        $scope.help_items = HelpService.all();
    })

    .controller('SettingsHelpDetailCtrl', function ($scope, $stateParams, HelpService) {

        $scope.obj = HelpService.get($stateParams["helpId"]);

    })

    .controller('SettingsDisclaimerCtrl', function ($scope) {
        $scope.disclaimerText = "10000001";
        $scope.doRefresh = function () {
            $scope.disclaimerText = "时间煮雨";
            $scope.$broadcast("scroll.refreshComplete");
        };
    })

    .controller('SettingsCardCtrl', function ($scope, $state, $ionicLoading, $timeout, CardHttpService, YF_MERCHANT_LOADING_COMMENT, YF_MERCHANT_INFO) {
        console.log("SettingsCardCtrl");

        $scope.items = [];

        $scope.load = function () {

            $ionicLoading.show({
                templateUrl: YF_MERCHANT_LOADING_COMMENT
            });

            $timeout(function () {
                $scope.$broadcast("scroll.refreshComplete");
                CardHttpService.list(YF_MERCHANT_INFO.mID);
            }, 800);

        };

        $scope.addCard = function () {
            $state.go("settings.card_add");
        };

        $scope.$on("yf-merchant-load-card-success", function (e, data) {
            $scope.items = data;
            $ionicLoading.hide();
        });

        $scope.$on("yf-merchant-save-card-error", function () {
            $ionicLoading.hide();
            $scope.$emit("youfan-merchant-show-msg", "远程连接出错");
        });
    })

    .controller('SettingsCardAddCtrl', function ($scope, $state, $ionicLoading, $timeout, CardService, CardHttpService, ValidationService, YF_MERCHANT_LOADING_COMMENT, YF_MERCHANT_INFO) {
        console.log("SettingsCardAddCtrl");

        $scope.isActive = false;
        $scope.card = {
            sellerId: YF_MERCHANT_INFO.mID,
            bankName: "银行名称",
            areaName: "银行所在地",
            cardName: "",
            cardNumber: "",
            identityName: "",
            identityNumber: ""
        };

        $scope.bankNames = CardService.loadBankNameArray();
        $scope.areaNames = CardService.loadAreaNameArray();

        $scope.doCheckCard = function () {
            $scope.isActive = true;
            if ($scope.card.bankName == "银行名称") {
                $scope.isActive = false;
                $scope.$emit("youfan-merchant-show-msg", "请选择银行名称");
                return;
            }

            if ($scope.card.areaName == "银行所在地") {
                $scope.isActive = false;
                $scope.$emit("youfan-merchant-show-msg", "请选择银行所在地");
                return;
            }

            if ($scope.card.cardName == "") {
                $scope.isActive = false;
                $scope.$emit("youfan-merchant-show-msg", "开户行名称不能为空");
                return;
            }

            var card_num = $scope.card.cardNumber;

            if (card_num == "") {
                $scope.isActive = false;
                $scope.$emit("youfan-merchant-show-msg", "银行卡号不能为空");
                return;
            }

            if (!ValidationService.checkLuhmNumber(card_num)) {
                $scope.isActive = false;
                $scope.$emit("youfan-merchant-show-msg", "银行卡卡号格式不正确");
                return;
            }

            if ($scope.card.identityName == "") {
                $scope.isActive = false;
                $scope.$emit("youfan-merchant-show-msg", "持卡人姓名不能为空");
                return;
            }

            var id_num = $scope.card.identityNumber;
            if (id_num == "") {
                $scope.isActive = false;
                $scope.$emit("youfan-merchant-show-msg", "证件号码不能为空");
                return;
            }

            if (!ValidationService.checkIdCardNumber(id_num) && !ValidationService.checkPostNumber(id_num)) {
                $scope.isActive = false;
                $scope.$emit("youfan-merchant-show-msg", "证件号码格式不正确");
                return;
            }

            $scope.doSaveCard();
        };

        $scope.doSaveCard = function () {
            $ionicLoading.show({
                templateUrl: YF_MERCHANT_LOADING_COMMENT
            });

            $timeout(function () {
                CardHttpService.saveCard($scope.card);
            }, 1000);

        };

        $scope.$on("yf-merchant-save-card-success", function () {
            $state.go("settings.card");
        });

        $scope.$on("yf-merchant-save-card-error", function () {
            $scope.$emit("youfan-merchant-show-msg", "远程连接出错");
            $ionicLoading.hide();
            $scope.isActive = false;
        })

    })

    .controller('SettingsCardEditCtrl', function ($scope, $state, $ionicLoading, $timeout, $stateParams, CardService, CardHttpService, ValidationService, YF_MERCHANT_LOADING_COMMENT) {
        console.log("SettingsCardEditCtrl");

        $scope.isActive = false;
        $scope.cardId = $stateParams.cardId;
        $scope.card = {};

        $scope.bankNames = CardService.loadBankNameArray();
        $scope.areaNames = CardService.loadAreaNameArray();

        $scope.load = function () {
            console.log("!23");
            $ionicLoading.show({
                templateUrl: YF_MERCHANT_LOADING_COMMENT
            });

            $timeout(function () {
                CardHttpService.findCard($scope.cardId);
            }, 1000);

        };

        $scope.doCheckCard = function () {
            $scope.isActive = true;
            if ($scope.card.bankName == "银行名称") {
                $scope.isActive = false;
                $scope.$emit("youfan-merchant-show-msg", "请选择银行名称");
                return;
            }

            if ($scope.card.areaName == "银行所在地") {
                $scope.isActive = false;
                $scope.$emit("youfan-merchant-show-msg", "请选择银行所在地");
                return;
            }

            if ($scope.card.cardName == "") {
                $scope.isActive = false;
                $scope.$emit("youfan-merchant-show-msg", "开户行名称不能为空");
                return;
            }

            var card_num = $scope.card.cardNumber;

            if (card_num == "") {
                $scope.isActive = false;
                $scope.$emit("youfan-merchant-show-msg", "银行卡号不能为空");
                return;
            }

            if (!ValidationService.checkLuhmNumber(card_num)) {
                $scope.isActive = false;
                $scope.$emit("youfan-merchant-show-msg", "银行卡卡号格式不正确");
                return;
            }

            if ($scope.card.identityName == "") {
                $scope.isActive = false;
                $scope.$emit("youfan-merchant-show-msg", "持卡人姓名不能为空");
                return;
            }

            var id_num = $scope.card.identityNumber;
            if (id_num == "") {
                $scope.isActive = false;
                $scope.$emit("youfan-merchant-show-msg", "证件号码不能为空");
                return;
            }

            if (!ValidationService.checkIdCardNumber(id_num) && !ValidationService.checkPostNumber(id_num)) {
                $scope.isActive = false;
                $scope.$emit("youfan-merchant-show-msg", "证件号码格式不正确");
                return;
            }

            $scope.doSaveCard();
        };

        $scope.doSaveCard = function () {
            $ionicLoading.show({
                templateUrl: YF_MERCHANT_LOADING_COMMENT
            });

            $timeout(function () {
                CardHttpService.updateCard($scope.card);
            }, 1000);

        };

        $scope.$on("yf-merchant-load-card-success", function (e, data) {
            $scope.card = data;
            $ionicLoading.hide();
            $scope.isActive = false;
        });

        $scope.$on("yf-merchant-load-card-error", function () {
            $scope.$emit("youfan-merchant-show-msg", "远程连接出错");
            $state.go("settings.card");
        });

        $scope.$on("yf-merchant-update-card-success", function () {
            $state.go("settings.card");
        });

        $scope.$on("yf-merchant-update-card-error", function () {
            $scope.$emit("youfan-merchant-show-msg", "远程连接出错");
            $ionicLoading.hide();
            $scope.isActive = false;
        })

    })

    .config(function ($stateProvider, $urlRouterProvider) {

        // 设置
        $stateProvider
            .state('settings', {
                url: '/settings',
                abstract: true,
                templateUrl: 'templates/settings/settings.html'
            })
            .state('settings.index', {
                url: '/index',
                templateUrl: 'templates/settings/index.html',
                controller: 'SettingsIndexCtrl'
            })
            .state('settings.card', {
                url: '/card',
                templateUrl: 'templates/settings/card/card-list.html',
                controller: 'SettingsCardCtrl'
            })
            .state('settings.card_add', {
                url: '/card/add',
                templateUrl: 'templates/settings/card/card-add.html',
                controller: 'SettingsCardAddCtrl'
            })
            .state('settings.card_edit', {
                url: '/card/edit/:cardId',
                templateUrl: 'templates/settings/card/card-edit.html',
                controller: 'SettingsCardEditCtrl'
            })
            .state('settings.helps', {
                url: '/helps',
                templateUrl: 'templates/settings/help/help.html',
                controller: 'SettingsHelpCtrl'
            })
            .state('settings.help-detail', {
                url: '/helps/:helpId',
                templateUrl: 'templates/settings/help/help-detail.html',
                controller: 'SettingsHelpDetailCtrl'
            })
            .state('settings.disclaimer', {
                url: '/disclaimer',
                templateUrl: 'templates/settings/disclaimer.html',
                controller: 'SettingsDisclaimerCtrl'
            });

    })

    .filter("identity", function () {
        return function () {
            return "123123";
        }
    })
;
