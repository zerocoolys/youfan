/**
 * Created by weims on 2015/5/15.
 */
define(['angular','angular-cookies'], function (ng) {
    'use strict';
    var ngModule=ng.module('app.controllers', ['ngCookies']);

    ngModule.controller('loginCtrl', function ($scope, $rootScope, $q) {
        console.log("loginCtrl")
    })
    return ngModule;
});