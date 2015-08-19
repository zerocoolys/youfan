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

                })
                .state('my_bill', {
                    url: '/my_bill',
                    templateUrl: 'templates/income/my_bill.html',
                    controller: 'my_bill'

                });


            $stateProvider
                .state('customer_comment', {
                    url: '/customer_comment',
                    templateUrl: 'templates/comment/customer_comment.html',
                    controller: 'customer_comment'

                });

            $stateProvider
                .state('editkitchen', {
                    url: '/editkitchen',
                    templateUrl: 'templates/editkitchen/editkitchen.html'
                })
                .state('kitcheninfo',{
                    url:'/kitcheninfo',
                    templateUrl: 'templates/editkitchen/editkitchen-kitcheninfo.html',
                    controller: 'kitcheninfo'
                })
                .state('personinfo',{
                    url:'/personinfo',
                    templateUrl: 'templates/editkitchen/editkitchen-personinfo.html',
                    controller: 'kitcheninfo'
                })
            ;

            $urlRouterProvider.otherwise('/login');


        });
})();