ControllerModule.controller('ChatsCtrl', function ($scope, $rootScope, Chats, $http, REST_URL) {
    $rootScope.hideTabs = false;
    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    };

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