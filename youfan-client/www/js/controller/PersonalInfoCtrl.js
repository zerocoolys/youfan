/**
 * Created by ss on 2015/8/19.
 */
ControllerModule.controller('PersonalInfoCtrl', function ($scope, $rootScope, $window, $state, $stateParams, $ionicSlideBoxDelegate, $ionicActionSheet, $ionicLoading, $timeout, $http) {

    $scope.sex = "待完善";
    $scope.age = "待完善";
    $scope.user = {
        name: "优饭1343",
        jobs: "待完善"
    };
    $scope.showActionSexSheet = function (id) {
        if (id == 1) {
            $ionicActionSheet.show({
                buttons: [
                    {
                        text: '<p class="text-center">男</p>',
                        onclick: function () {
                            $scope.sex = '男';
                        }
                    },
                    {
                        text: '<p class="text-center">女</p>',
                        onclick: function () {
                            $scope.sex = '女';
                        }
                    }
                ],
                cancelText: '取消',
                buttonClicked: function (index) {
                    this.buttons[index].onclick();
                    return true;
                }
            })
        } else if (id == 2) {
            $ionicActionSheet.show({
                buttons: [
                    {
                        text: '<p class="text-center">60后</p>',
                        onclick: function () {
                            $scope.age = "60后";
                        }
                    },
                    {
                        text: '<p class="text-center">70后</p>',
                        onclick: function () {
                            $scope.age = "70后";
                        }
                    },
                    {
                        text: '<p class="text-center">80后</p>',
                        onclick: function () {
                            $scope.age = "80后";
                        }
                    },
                    {
                        text: '<p class="text-center">90后</p>',
                        onclick: function () {
                            $scope.age = "90后";
                        }
                    }
                ],
                cancelText: '取消',
                buttonClicked: function (index) {
                    this.buttons[index].onclick();
                    return true;
                }
            })
        }

    }

    $scope.show = function () {
        var userModel = {
            name: $scope.user.name,
            sex: $scope.sex,
            age: $scope.age,
            jobs: $scope.user.jobs,
            token: $window.sessionStorage.token
        };

        console.log(userModel.name);

        var urlStr = "http://localhost:8080/cuser/binfo";

        $http.post(urlStr, JSON.stringify(userModel))
            .success(function (data) {
                console.log(data);
                if (data.code == 0) {
                    $state.go('tab.chats');
                } else {
                    var updateErr = $ionicPopup.show({
                        title: '网络异常,请重设密码',
                        scope: $scope
                    });
                    $timeout(function () {
                        updateErr.close();
                    }, 2000);
                }

            })
            .error(function (data) {

            });

        $ionicLoading.show({
            template: '<div><ion-spinner icon="bubbles" class="spinner-calm"></ion-spinner>保存中...</div>'
        });
        $timeout(function () {
            $ionicLoading.hide();
        }, 1000);
    };
});