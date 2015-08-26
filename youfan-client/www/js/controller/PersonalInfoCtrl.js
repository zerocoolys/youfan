/**
 * Created by ss on 2015/8/19.
 */
ControllerModule.controller('PersonalInfoCtrl', function ($scope, $stateParams, $ionicSlideBoxDelegate, $ionicActionSheet, $ionicLoading,$timeout) {
    $scope.showActionSexSheet = function (id) {
        if (id == 1) {
            $ionicActionSheet.show({
                buttons: [
                    {
                        text: '<p class="text-center">男</p>',
                        onclick: function () {
                            console.log('男' + id);
                        }
                    },
                    {
                        text: '<p class="text-center">女</p>',
                        onclick: function () {
                            console.log('女' + id);
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
                            console.log('60后' + id);
                        }
                    },
                    {
                        text: '<p class="text-center">70后</p>',
                        onclick: function () {
                            console.log('70后' + id);
                        }
                    },
                    {
                        text: '<p class="text-center">80后</p>',
                        onclick: function () {
                            console.log('80后' + id);
                        }
                    },
                    {
                        text: '<p class="text-center">90后</p>',
                        onclick: function () {
                            console.log('90后' + id);
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
        $ionicLoading.show({
            template: '<div><ion-spinner icon="bubbles" class="spinner-calm"></ion-spinner>保存中...</div>'
        });
        $timeout(function () {
            $ionicLoading.hide();
        }, 1000);
    };
});