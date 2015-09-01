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

    .controller('SettingsCardCtrl', function ($scope, $state) {
        console.log("SettingsCardCtrl");

        $scope.items = [];

        $scope.addCard = function () {
            $state.go("settings.card_add");
        };
    })

    .controller('SettingsCardAddCtrl', function ($scope, CardService) {
        console.log("SettingsCardAddCtrl");

        $scope.isActive = false;
        $scope.card = {bankName: "银行名称", areaName: "银行所在地", cardName: "", cardNumber: ""};

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

            var reg = /^\d{19}$/g; // 以19位数字开头，以19位数字结尾
            if (!reg.test($scope.card.cardNumber)) {
                $scope.isActive = false;
                $scope.$emit("youfan-merchant-show-msg", "请输入正确的银行卡号");
                return;
            }

        };


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
;
