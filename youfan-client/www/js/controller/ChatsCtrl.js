ControllerModule.controller('ChatsCtrl', function ($scope, $rootScope, Chats, $stateParams, UserService, localStorageService, $http, $state, REST_URL, AuthenticationService) {
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
        url: REST_URL + "/notice/getCount/2",
        dataType: "json"
    }).success(function (dataConfig) {
        if (dataConfig.code == 1) {
            $scope.msgNumber = dataConfig.payload
        }
    });

    $scope.order = function () {
        $state.go('tab.order');
        //if (AuthenticationService.isLogged) {
        //    $state.go('tab.order');
        //} else {
        //    $state.go('tab.pwd-login');
        //}
    };
    $scope.wallet = function () {
        if (AuthenticationService.isLogged) {
            $state.go('tab.wallet');
        } else {
            $state.go('tab.pwd-login');
        }
    };
    $scope.care = function () {
        if (AuthenticationService.isLogged) {
            $state.go('tab.care');
        } else {
            $state.go('tab.pwd-login');
        }
    };
    $scope.messages = function () {
        if (AuthenticationService.isLogged) {
            $state.go('tab.message');
        } else {
            $state.go('tab.pwd-login');
        }
    };
    $scope.address = function () {
        if (AuthenticationService.isLogged) {
            $state.go('tab.address');
        } else {
            $state.go('tab.pwd-login');
        }
    };

    //href="#/tab/chats/{{chat.id}}"
    $scope.chats = function () {
        if (AuthenticationService.isLogged) {
            $state.go('tab.chats/' + Chats.get($stateParams.chatId));
        } else {
            $state.go('tab.pwd-login');
        }
    };
});