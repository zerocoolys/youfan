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
                    templateUrl: 'templates/overview/dishes.html',
                    controller: 'today_order'

                })
                .state('tomorrow-order', {
                    url: '/tomorrow-order',
                    templateUrl: 'templates/overview/dishes.html',
                    controller: 'tomorrow_order'

                })
                .state('shop-course', {
                    url: '/shop-course',
                    templateUrl: 'templates/overview/shop-course.html',
                    controller:'shop'


                })
                .state('news', {
                    url: '/news',
                    templateUrl: 'templates/overview/news.html',
                    controller:'news'


                })
            .state('money', {
                url: '/money',
                templateUrl: 'templates/overview/money.html',
                controller:'money'


            });

            //????
            $stateProvider
                .state('all_order', {
                    url: '/all_order',
                    templateUrl: 'templates/order/all_order.html',
                    controller: 'all_order'

                })
                .state('order_Details', {
                    url: '/order_Details',
                    templateUrl: 'templates/order/order_Details.html',
                    controller: ''

                })
                .state('query_order', {
                    url: '/query_order',
                    templateUrl: 'templates/order/query_order.html',
                    controller: 'query_order'

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
                    controller: 'personinfo'
                })
                .state('kitcheninfo-story',{
                    url:'/kitcheninfo-story',
                    templateUrl: 'templates/editkitchen/editkitchen-kitcheninfo-story.html',
                    controller: 'kitcheninfo-story'
                })
                .state('kitcheninfo_story_myhobby',{
                    url:'/kitcheninfo_story_myhobby',
                    templateUrl: 'templates/editkitchen/editkitchen-kitcheninfo-story-myhobby.html',
                    controller: 'kitcheninfo_story_myhobby'
                })
                .state('kitcheninfo_story_mykitchenstory',{
                    url:'/kitcheninfo_story_mykitchenstory',
                    templateUrl: 'templates/editkitchen/editkitchen-kitcheninfo-story-mykitchenstory.html',
                    controller: 'kitcheninfo_story_mykitchenstory'
                })
                .state('kitcheninfo_pic',{
                    url:'/kitcheninfo_pic',
                    templateUrl: 'templates/editkitchen/editkitchen-kitcheninfo-pic.html',
                    controller: 'kitcheninfo_pic'
                })
            ;
            $stateProvider
                .state('manage-dishes-Stock', {
                    url: '/manage-dishes-Stock',
                    templateUrl: 'templates/manage-dishes/manage-dishes-Stock.html',
                    controller: ''

                });

            $urlRouterProvider.otherwise('/login');


        });
})();