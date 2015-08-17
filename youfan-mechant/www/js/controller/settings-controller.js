angular.module('starter.settings_controllers', [])

    .controller('SettingsIndexCtrl', function ($scope) {
        $scope.items = [{
            "title": "我的银行卡",
            "description": "我的银行卡",
            "img": "https://avatars3.githubusercontent.com/u/11214?v=3&s=460"
        }, {
            "title": "帮助",
            "description": "帮助", "img": "https://avatars3.githubusercontent.com/u/11214?v=3&s=460"
        }, {"title": "免责声明", "description": "免责声明", "img": "https://avatars3.githubusercontent.com/u/11214?v=3&s=460"}];
        console.log("22222");

    })

    .controller('SettingsHelpCtrl', function ($scope) {

        console.log("1111111111");

    })

    .controller('SettingsDisclaimerCtrl', function ($scope) {

        console.log("333333");

    })

;