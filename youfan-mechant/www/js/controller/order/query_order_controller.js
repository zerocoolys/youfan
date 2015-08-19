(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('query_order', AllOrder);

    function AllOrder($scope, $filter, $state) {


    alert("查询订单");
    }
})();