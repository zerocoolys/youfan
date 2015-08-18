(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('customer_comment', CustomerComment);

    function CustomerComment($scope, $filter, $state) {

        alert("customerComment");
    }
})();