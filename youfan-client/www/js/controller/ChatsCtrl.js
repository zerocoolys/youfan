ControllerModule.controller('ChatsCtrl', function ($scope, $rootScope, Chats, $http, REST_URL) {
    $rootScope.hideTabs = false;
    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    };

    $http({
        method: 'GET',
        url: REST_URL + "127.0.0.1:8080/notice/getCount?userId=2",
        dataType: "json"
    }).success(function (dataConfig) {
        $scope.msgNumber = dataConfig.rows
    })
});