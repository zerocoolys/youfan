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

                });

            $urlRouterProvider.otherwise('/login');


        });
})();