(function () {
    'use strict';

    angular
        .module('yf_mechant')
        .controller('customer_comment', CustomerComment);

    function CustomerComment($scope, $filter, $state) {

        alert("customerComment");
    }
})();