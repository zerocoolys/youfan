/**
 * Created by MrDeng on 2015/9/5.
 */
define(["./module"], function (ctrs) {
    ctrs.controller('dateCtrl', function ($scope, $rootScope, $q, $state, $http, $location, $location, $state) {

        console.log("dateCtrl")
        $rootScope.chooseDate = function(){
            console.log("chooseDate")
        }
    })
})