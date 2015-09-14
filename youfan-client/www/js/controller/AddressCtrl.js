ControllerModule.controller('AddressCtrl', function ($scope, $stateParams, $ionicSlideBoxDelegate, AuthenticationService, localStorageService, $ionicModal, $ionicPopup, $timeout, UserService, $state) {
    $ionicModal.fromTemplateUrl('templates/personalcenter/add-address.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.slideIndex = 0;
    // Called each time the slide changes
    $scope.slideChanged = function (index) {
        $scope.slideIndex = index;
    }

    $scope.activeSlide = function (index) {
        $ionicSlideBoxDelegate.slide(index);
    };


    //if (AuthenticationService.isLogged) {
    //    UserService.userInfo(localStorageService.get("userid")).success(function (data) {
    //        console.log(data);
    //        //$scope.post = {
    //        //    uid: data.payload.id,
    //        //    contact: "",
    //        //    tel: "",
    //        //    address: "",
    //        //    houseNumber: "",
    //        //    label: {
    //        //        home: "",
    //        //        company: ""
    //        //    }
    //        //};
    //    }).error(function (status, data) {
    //        console.log(status);
    //        console.log(data);
    //    });
    //}

    $scope.post = {
        id: localStorageService.get("userid"),
        contact: "",
        tel: "",
        address: "",
        houseNumber: "",
        label: ""
    };

    $scope.labelHome = function () {
        $scope.post.label = "家";
    };
    $scope.labelCompany = function () {
        $scope.post.label = "公司";
    };

    $scope.modifyMa = function (post) {
        if ($scope.post.contact != "") {
            if ($scope.post.tel != "") {
                //if ($scope.post.address != "") {
                if ($scope.post.houseNumber != "") {
                    if ($scope.post.label != "") {
                        UserService.mealsAddress(post).success(function (data) {
                            console.log(data);
                        }).error(function (status, data) {

                        });
                    } else {
                        var labelNull = $ionicPopup.show({
                            title: '请填选择标签',
                            scope: $scope
                        });
                        $timeout(function () {
                            labelNull.close(); //由于某种原因2秒后关闭弹出
                        }, 2000);
                    }
                } else {
                    var hnNull = $ionicPopup.show({
                        title: '请填写门牌号',
                        scope: $scope
                    });
                    $timeout(function () {
                        hnNull.close(); //由于某种原因2秒后关闭弹出
                    }, 2000);
                }
                //} else {
                //    var addressNull = $ionicPopup.show({
                //        title: '请填写地址',
                //        scope: $scope
                //    });
                //    $timeout(function () {
                //        addressNull.close(); //由于某种原因2秒后关闭弹出
                //    }, 2000);
                //}
            } else {
                var telNull = $ionicPopup.show({
                    title: '请填写手机号',
                    scope: $scope
                });
                $timeout(function () {
                    telNull.close(); //由于某种原因2秒后关闭弹出
                }, 2000);
            }
        } else {
            var contactNull = $ionicPopup.show({
                title: '请填写联系人',
                scope: $scope
            });
            $timeout(function () {
                contactNull.close(); //由于某种原因2秒后关闭弹出
            }, 2000);
        }
    };


});