ControllerModule.controller('ChatsCtrl', function ($scope, $rootScope, Chats, $http, REST_URL,AuthenticationService) {
    $rootScope.hideTabs = false;
    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    };

    $scope.isShow = AuthenticationService.isLogged;

    $http({
        method: 'GET',
        url: REST_URL +"/notice/getCount/2",
        dataType: "json"
    }).success(function (dataConfig) {
        if(dataConfig.code == 1){
            $scope.msgNumber = dataConfig.payload
        }
    })
});