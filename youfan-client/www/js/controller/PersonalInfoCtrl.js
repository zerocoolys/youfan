/**
 * Created by ss on 2015/8/19.
 */
ControllerModule.controller('PersonalInfoCtrl', function ($scope, $stateParams, $ionicSlideBoxDelegate,$ionicActionSheet) {
    $scope.showActionSexSheet = function (id) {
        if(id == 1){
            $ionicActionSheet.show({
                buttons: [
                    {
                        text: '男',
                        onclick: function () {
                            console.log('男' + id);
                        }
                    },
                    {
                        text: '女',
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
        }else if(id == 2){
            $ionicActionSheet.show({
                buttons: [
                    {
                        text: '60后',
                        onclick: function () {
                            console.log('60后' + id);
                        }
                    },
                    {
                        text: '70后',
                        onclick: function () {
                            console.log('70后' + id);
                        }
                    },
                    {
                        text: '80后',
                        onclick: function () {
                            console.log('80后' + id);
                        }
                    },
                    {
                        text: '90后',
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
});