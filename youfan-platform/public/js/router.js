define(["angular", "./app"], function (angular, myApp) {
    'use strict';
    myApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/sys/profile',
                templateUrl: 'sys/profile.html',
                resolve: {
                    load: loadDeps([
                        'controllers/sys/profileCtrl'
                    ])
                }
            })
            .state('sys', {
                url: '/sys/profile',
                templateUrl: 'sys/profile.html',
                resolve: {
                    load: loadDeps([
                        'controllers/sys/profileCtrl'
                    ])
                }
            })
            .state('profile', {
                url: '/sys/profile',
                templateUrl: 'sys/profile.html',
                resolve: {
                    load: loadDeps([
                        'controllers/sys/profileCtrl'
                    ])
                }
            })
            .state('message', {
                url: '/sys/message',
                templateUrl: 'sys/message.html',
                resolve: {
                    load: loadDeps([
                        'controllers/sys/messageCtrl'
                    ])
                }
            })
            .state('pay', {
                url: '/sys/pay',
                templateUrl: 'sys/pay.html',
                resolve: {
                    load: loadDeps([
                        'controllers/sys/payCtrl'
                    ])
                }
            })
            .state('activity', {
                url: 'sys/activity',
                templateUrl: 'sys/activity.html',
                resolve: {
                    load: loadDeps([
                        'controllers/sys/activityCtrl'
                    ])
                }
            })

            //用户
            .state('client', {
                url: 'client/clientinfo',
                templateUrl: 'client/clientinfo.html',
                resolve: {
                    load: loadDeps([
                        'controllers/client/clientinfoCtrl'
                    ])
                }
            })
            .state('clientinfo', {
                url: 'client/clientinfo',
                templateUrl: 'client/clientinfo.html',
                resolve: {
                    load: loadDeps([
                        'controllers/client/clientinfoCtrl'
                    ])
                }
            })
            .state('clientcheck', {
                url: 'client/clientcheck',
                templateUrl: 'client/clientcheck.html',
                resolve: {
                    load: loadDeps([
                        'controllers/client/clientCheckCtrl'
                    ])
                }
            })
            //商家
            .state('merchant', {
                url: 'merchant/merchantinfo',
                templateUrl: 'merchant/merchantinfo.html',
                resolve: {
                    load: loadDeps([
                        'controllers/merchant/merchantInfoCtrl'
                    ])
                }
            })
            .state('merchantinfo', {
                url: 'merchant/merchantinfo',
                templateUrl: 'merchant/merchantinfo.html',
                resolve: {
                    load: loadDeps([
                        'controllers/merchant/merchantInfoCtrl'
                    ])
                }
            })
            .state('merchantcheck', {
                url: 'merchant/merchantcheck',
                templateUrl: 'merchant/merchantcheck.html',
                resolve: {
                    load: loadDeps([
                        'controllers/merchant/merchantCheckCtrl'
                    ])
                }
            })
        function loadDeps(deps) {
            return [
                '$q', function ($q) {
                    var def = $q.defer();
                    require(deps, function () {
                        def.resolve();
                    });
                    return def.promise;
                }
            ];
        }
    }]);
});
