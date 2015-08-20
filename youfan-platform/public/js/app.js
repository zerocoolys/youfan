/**
 * Created by Administrator on 2015/8/14.
 */

define([
    "angular",
    "js002",
    "js003",
    "js006",
    "./angularjs/ui-bootstrap-tpls",
    "./angularjs/ui-grid-unstable.min",

    //业务模块控制器
    "./controllers/loginCtrl",
    "./controllers/leftMenuCtrl",
    "./controllers/navCtrl",
    "./controllers/tableCtrl",
    "./controllers/sys/module",
    "./controllers/client/module",
    "./controllers/merchant/module",
], function (angular) {
    'use strict';
    var myApp = angular.module("myApp", [
        "app.controllers",
        "sys.controllers",
        "client.controllers",
        "merchant.controllers",
        "ngRoute",
        'ui.grid',
        'ui.grid.autoResize',
        'ui.grid.grouping',
        'ui.grid.expandable',
        'ui.grid.pagination',
        'ui.grid.treeView',
        'ui.bootstrap',
        'ngDialog',
        'ngSanitize',
        'ui.select',
        'ui.grid.selection'
    ]);
    return myApp;
});