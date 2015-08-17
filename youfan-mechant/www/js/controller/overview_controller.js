(function () {
    'use strict';

    angular
        .module('yf_merchant')
        .controller('overview', Overview);

    function Overview($scope, $filter, $state) {
        $scope.orders=[
            {
                phone:"138-114-8670",
                ways:"堂食",
                time:"15:00"
            },
            {
                phone:"131-124-8620",
                ways:"自取",
                time:"13:00"
            },
            {
                phone:"185-114-2570",
                ways:"堂食",
                time:"18:00"
            },
            {
                phone:"151-154-8650",
                ways:"自取",
                time:"20:00"
            }
        ];

    }
})();