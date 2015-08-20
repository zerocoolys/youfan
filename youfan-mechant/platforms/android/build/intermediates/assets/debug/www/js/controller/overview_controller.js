(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('overview', Overview);

    function Overview($scope, $filter, $state) {
        console.log(1111);
        $scope.callPhone=function(){
            $window.location.href="http://my.oschina.net/u/1416844/blog/tel:10085";
        }


    }
})();