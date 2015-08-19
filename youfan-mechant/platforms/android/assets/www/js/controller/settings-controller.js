angular.module('yf_merchant.settings_controllers', ['yf_merchant.settings_service'])

    .controller('SettingsIndexCtrl', function ($scope) {
        $scope.items = [{
            "title": "我的银行卡",
            "description": "我的银行卡",
            "img": "https://avatars3.githubusercontent.com/u/11214?v=3&s=460"
        }, {
            "title": "帮助",
            "description": "帮助", "img": "https://avatars3.githubusercontent.com/u/11214?v=3&s=460"
        }, {"title": "免责声明", "description": "免责声明", "img": "https://avatars3.githubusercontent.com/u/11214?v=3&s=460"}];

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
            $
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
                views: {
                    'weims': {
                        templateUrl: 'templates/settings/index.html',
                        controller: 'SettingsIndexCtrl'
                    }
                }
            })
            .state('settings.helps', {
                url: '/helps',
                views: {
                    'weims': {
                        templateUrl: 'templates/settings/help/help.html',
                        controller: 'SettingsHelpCtrl'
                    }
                }
            })
            .state('settings.help-detail', {
                url: '/helps/:helpId',
                views: {
                    'weims': {
                        templateUrl: 'templates/settings/help/help-detail.html',
                        controller: 'SettingsHelpDetailCtrl'
                    }
                }
            })
            .state('settings.disclaimer', {
                url: '/disclaimer',
                views: {
                    'weims': {
                        templateUrl: 'templates/settings/disclaimer.html',
                        controller: 'SettingsDisclaimerCtrl'
                    }
                }
            });

    })
;