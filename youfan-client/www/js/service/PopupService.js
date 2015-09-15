ServiceModule.factory('PopupService', ['$ionicPopup', '$timeout', function ($ionicPopup, $timeout) {
    return {
        showAlert: function ($scope, msg) {
            var alertPopup = $ionicPopup.alert({
                cssClass: 'zan_popup',
                template: msg,
                scope: $scope,
                buttons: []
            });

            $timeout(function () {
                alertPopup.close();
            }, 1000);
        }
    };
}]);