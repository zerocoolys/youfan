angular.module('yf_merchant.tutorial_controllers', [])

    .controller('TutorialCtrl', function ($scope, $state, $ionicHistory) {
        var startApp = function () {
            $ionicHistory.clearHistory
            // 默认进入“今天”的任务列表
            $state.go('overview');
            window.localStorage['didTutorial'] = true;
        };

        if (window.localStorage['didTutorial'] === "true") {
            console.log('Skip intro');
            // 向导页面只显示一次
            startApp();
        } else {
            setTimeout(function () {
                navigator.splashscreen.hide();
            }, 750);
        }

        // "立即体验"按钮Event
        $scope.gotoMain = function () {
            startApp();
        }

        $scope.slideHasChanged = function (index) {
        };

    })

    .config(function ($stateProvider) {

        $stateProvider
            .state('tutorial', {
                url: '/tutorial',
                templateUrl: 'templates/tutorial.html',
                controller: 'TutorialCtrl'
            });

    })

;
