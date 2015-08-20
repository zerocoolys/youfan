ControllerModule.controller('ChatsCtrl', function ($scope, $rootScope, Chats) {
    $rootScope.hideTabs = false;
    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    };
});