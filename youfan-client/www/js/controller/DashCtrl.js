ControllerModule.controller('DashCtrl', function ($scope, $ionicModal, $rootScope) {
    $rootScope.hideTabs = false;
    //下拉刷新
    $scope.doRefresh = function() {
     /*   $scope.todos.unshift({name: 'Incoming todo ' + Date.now()})*/
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$apply()
    };
    /**
     * 验证码登陆
     */
    $ionicModal.fromTemplateUrl('templates/tab-verifylogin.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.verifyLogin = modal;
    });

    /**
     * 密码登陆
     */
    $ionicModal.fromTemplateUrl('templates/tab-pwdlogin.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.pwdLogin = modal;
    });

    /**
     * 用户协议
     */
    $ionicModal.fromTemplateUrl('templates/user-agreement.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.userAgreement = modal;
    });


    //地图信息初始化
    $scope.mapObj = new AMap.Map('mapContainer', {
        resizeEnable: true
    });

    /**
     * 获取当前城市名称
     * 返回参数存放在 $rootScope.mapCity
     */
    mapTools.cityLocation($scope,$rootScope,$scope.mapObj);

});
