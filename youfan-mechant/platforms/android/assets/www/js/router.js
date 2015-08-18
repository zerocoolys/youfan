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


            $stateProvider
                .state('overview', {
                    url: '/overview',
                    templateUrl: 'templates/overview/overview.html',
                    controller: 'overview'

                })
               .state('dishes', {
                    url: '/dishes',
                    templateUrl: 'templates/overview/dishes.html',
                    controller: 'dishes'

                })
               .state('today-order', {
                    url: '/today-order',
                    templateUrl: 'templates/overview/today-order.html',
                    controller: ''

                })
                .state('shop-course', {
                    url: '/shop-course',
                    templateUrl: 'templates/overview/shop-course.html',
                    controller: ''

                });


            $urlRouterProvider.otherwise('/login');


        });
})();