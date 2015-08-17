(function() {
    'use strict';


    angular
        .module('yf_merchant')
        .config(function ($stateProvider, $urlRouterProvider) {



            // login
            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'templates/login/login.html'

                });

            //??
            $stateProvider
                .state('overview', {
                    url: '/overview',
                    templateUrl: 'templates/overview/overview.html',
                    controller: 'overview'

                });

            //????
            $stateProvider
                .state('all_order', {
                    url: '/all_order',
                    templateUrl: 'templates/order/all_order.html',
                    controller: 'all_order'

                });

            //????
            $stateProvider
                .state('my_income', {
                    url: '/my_income',
                    templateUrl: 'templates/income/my_income.html',
                    controller: 'my_income'

                });

            //????
            $stateProvider
                .state('customer_comment', {
                    url: '/customer_comment',
                    templateUrl: 'templates/comment/customer_comment.html',
                    controller: 'customer_comment'

                });

            $urlRouterProvider.otherwise('/login');


        });
})();