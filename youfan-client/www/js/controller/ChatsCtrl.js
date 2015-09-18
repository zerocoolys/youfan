ControllerModule.controller('ChatsCtrl', function ($scope, $rootScope, Chats, $stateParams, UserService, User, localStorageService, $http, $state, REST_URL, AuthenticationService) {
    $rootScope.hideTabs = false;
    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    };

    if (AuthenticationService.isLogged) {
        UserService.userInfo(localStorageService.get("userid")).success(function (data) {
            //console.log(data);
            $scope.user = {
                id: data.payload.id,
                name: data.payload.name
            };
        }).error(function (status, data) {
            console.log(status);
            console.log(data);
        });
    }
    $scope.isShow = AuthenticationService.isLogged;

    $http({
        method: 'GET',
        url: REST_URL + "/notice/getCount/" + User.id,
        dataType: "json"
    }).success(function (dataConfig) {
        if (dataConfig.code == 0) {
            $scope.msgNumber = dataConfig.payload
        }
    });

    $scope.order = function () {
        if (AuthenticationService.isLogged) {
            $state.go('order');
        } else {
            $state.go('pwd-login');
        }
    };
    $scope.wallet = function () {
        if (AuthenticationService.isLogged) {
            $state.go('tab.wallet');
        } else {
            $state.go('pwd-login');
        }
    };
    $scope.care = function () {
        if (AuthenticationService.isLogged) {
            $state.go('tab.care');
        } else {
            $state.go('pwd-login');
        }
    };
    $scope.messages = function () {
        if (AuthenticationService.isLogged) {
            $state.go('tab.message');
        } else {
            $state.go('pwd-login');
        }
    };
    $scope.mealsAddress = function () {
        if (AuthenticationService.isLogged) {
            $state.go('tab.address');
        } else {
            $state.go('pwd-login');
        }
    };

    ////href="#/tab/chats/{{chat.id}}"
    //$scope.chats = function () {
    //    if (AuthenticationService.isLogged) {
    //        $state.go('tab.chats/' + Chats.get($stateParams.chatId));
    //    } else {
    //        $state.go('tab.pwd-login');
    //    }
    //};

});