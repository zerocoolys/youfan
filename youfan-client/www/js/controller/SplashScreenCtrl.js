ControllerModule.controller('SplashScreenCtrl', ['$scope', '$state', '$ionicModal', '$ionicSlideBoxDelegate',
    function ($scope, $state, $ionicModal, $ionicSlideBoxDelegate) {

        $scope.aImages = [{
            'src': 'http://ionicframework.com/img/ionic_logo.svg',
            'msg': ''
        }, {
            'src': 'http://ionicframework.com/img/homepage/phones-weather-demo@2x.png',
            'msg': ''
        }];

        $scope.goToIndex = function () {
            $state.go('tab.dash');
        };

        $ionicModal.fromTemplateUrl('image-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
            //$scope.showSplashScreen();
            //setTimeout(function () {
            //    $scope.closeSplashScreen();
            //    $scope.goToIndex();
            //}, 3000);

        });

        $scope.showSplashScreen = function () {
            $ionicSlideBoxDelegate.slide(0);
            $scope.modal.show();
        };

        $scope.closeSplashScreen = function () {
            $scope.modal.hide();
        };

        // Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });

        // Execute action on hide modal
        $scope.$on('modal.hide', function () {
            // Execute action
        });

        // Execute action on remove modal
        $scope.$on('modal.removed', function () {
            // Execute action
        });
        $scope.$on('modal.shown', function () {
            //console.log('Modal is shown!');
        });

        // Call this functions if you need to manually control the slides
        $scope.next = function () {
            $ionicSlideBoxDelegate.next();
        };

        $scope.previous = function () {
            $ionicSlideBoxDelegate.previous();
        };

        $scope.goToSlide = function (index) {
            $scope.modal.show();
            $ionicSlideBoxDelegate.slide(index);
        };

        // Called each time the slide changes
        $scope.slideChanged = function (index) {
            $scope.slideIndex = index;
        };
    }]);