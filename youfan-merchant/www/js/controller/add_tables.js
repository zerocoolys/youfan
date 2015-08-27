/**
 * Created by Fzk lwek on 2015/8/20.
 */
(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('add_tables', add_tables);

    function add_tables($scope, $filter, $state, $ionicActionSheet,$ionicPopup) {

        $scope.show= function() {
            $ionicActionSheet.show({
                buttons: [
                    {text: '<p class="calm" >拍照</p>'},
                    {text: '<p class="calm" >从相册中选取</p>'},
                ],
                cancelText: '<p  class="calm">取消</p>',
                buttonClicked: function (index) {
                    return true;
                }
            });

        }


    }
})();