/**
 * Created by ss on 2015/8/19.
 */
ControllerModule.controller('PersonalInfoCtrl', function ($scope, $rootScope, $window, $state, $stateParams, $ionicSlideBoxDelegate, $ionicActionSheet, $ionicLoading,$ionicPopup, $timeout, $http,UserService) {

    $scope.sex = "待完善";
    $scope.age = "待完善";
    $scope.user = {
        name: "优饭1343",
        jobs: "待完善"
    };

    $scope.post = {};

    $scope.showActionSexSheet = function (id) {
        if (id == 1) {
            $ionicActionSheet.show({
                buttons: [
                    {
                        text: '<p class="text-center">男</p>',
                        onclick: function () {
                            $scope.post.sex = '男';
                        }
                    },
                    {
                        text: '<p class="text-center">女</p>',
                        onclick: function () {
                            $scope.post.sex = '女';
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
                            $scope.post.age = "60后";
                        }
                    },
                    {
                        text: '<p class="text-center">70后</p>',
                        onclick: function () {
                            $scope.post.age = "70后";
                        }
                    },
                    {
                        text: '<p class="text-center">80后</p>',
                        onclick: function () {
                            $scope.post.age = "80后";
                        }
                    },
                    {
                        text: '<p class="text-center">90后</p>',
                        onclick: function () {
                            $scope.post.age = "90后";
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

    };

    $scope.show = function (post) {
        UserService.updateInfo(post).success(function (data) {
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
        .error(function (status, data) {
            console.log(status);
            console.log(data);
        });


        $ionicLoading.show({
            template: '<div><ion-spinner icon="bubbles" class="spinner-calm"></ion-spinner>保存中...</div>'
        });
        $timeout(function () {
            $ionicLoading.hide();
        }, 1000);
    };
});