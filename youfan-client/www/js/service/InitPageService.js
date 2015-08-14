ServiceModule.factory('InitPageService', ['$ionicModal', '$ionicSlideBoxDelegate', function ($ionicModal, $ionicSlideBoxDelegate) {
    return {
        create: function ($scope) {
            $ionicModal.fromTemplateUrl('image-modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
            })
        },
        show: function ($scope) {
            $ionicSlideBoxDelegate.slide(0);
            $scope.modal.show();
        },

        close: function ($scope) {
            $scope.modal.hide();
        },
        next: function () {
            $ionicSlideBoxDelegate.next();
        },

        previous: function () {
            $ionicSlideBoxDelegate.previous();
        },

        goToSlide: function ($scope, index) {
            $scope.modal.show();
            $ionicSlideBoxDelegate.slide(index);
        },

        slideChanged: function ($scope, index) {
            $scope.slideIndex = index;
        }
    }
}]);