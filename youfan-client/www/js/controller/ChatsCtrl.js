ControllerModule.controller('ChatsCtrl', function ($scope, $rootScope, Chats, $http, HTTP_HEAD) {
    $rootScope.hideTabs = false;
    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    };

    $http({
        method: 'GET',
        url: HTTP_HEAD + "127.0.0.1:8080/notice/getCount/2",
        dataType: "json"
    }).success(function (dataConfig) {
        if(dataConfig.code == 1){
            $scope.msgNumber = dataConfig.payload
        }
    })
});