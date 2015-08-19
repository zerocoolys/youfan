(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('my_bill', MyBill);

    function MyBill($scope, $filter, $state, $ionicTabsDelegate,$ionicModal) {


        $scope.selectTabWithIndex = function(index) {


            if(index ==2) {
                $scope.openModal();
            }

            $ionicTabsDelegate.select(index);
        }




        $ionicModal.fromTemplateUrl('/templates/income/modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function() {

            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        //当我们用到模型时，清除它！
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        // 当隐藏的模型时执行动作
        $scope.$on('modal.hide', function() {

        });
        // 当移动模型时执行动作
        $scope.$on('modal.removed', function() {

        });


    }
})();