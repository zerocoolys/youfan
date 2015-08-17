/**
 * Created by weims on 2015/5/15.
 */
require.config({
    baseUrl: 'js',
    paths: {
        "angular": [
            'http://cdn.bootcss.com/angular.js/1.3.15/angular.min'
        ],
        "angular-cookies": [
            'http://cdn.bootcss.com/angular.js/1.3.15/angular-cookies.min'
        ],
        "js001": [
            "http://cdn.bootcss.com/jquery/1.11.3/jquery.min"
        ],
        "js002": [
            "http://cdn.bootcss.com/angular.js/1.4.0-beta.6/angular-sanitize.min"
        ],
        "js003": [
            "http://cdn.bootcss.com/angular-ui-select/0.11.2/select"
        ],
        "js004": [
            "http://cdn.bootcss.com/angular-ui-router/0.2.13/angular-ui-router.min"
        ],
        "js005": [
            "http://cdn.bootcss.com/angular-i18n/1.2.15/angular-locale_zh-cn"
        ],
        "js006": [
            "http://cdn.bootcss.com/ng-dialog/0.3.12/js/ngDialog.min"
        ],
        "js007": [
            "http://cdn.bootcss.com/echarts/2.2.1/echarts-all"
        ],
        "js008": [
            "http://ui-grid.info/docs/grunt-scripts/vfs_fonts"
        ]
    },
    shim: {
        "angular": {
            exports: "angular",
            init: function () {
                // ---------------------重要代码段！------------------------------
                // 应用启动后不能直接用 module.controller 等方法，否则会报控制器未定义的错误，
                // 见 http://stackoverflow.com/questions/20909525/load-controller-dynamically-based-on-route-group
                var _module = angular.module;
                angular.module = function () {
                    var newModule = _module.apply(angular, arguments);
                    if (arguments.length >= 2) {
                        newModule.config([
                            '$controllerProvider',
                            '$compileProvider',
                            '$filterProvider',
                            '$provide',
                            function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
                                newModule.controller = function () {
                                    $controllerProvider.register.apply(this, arguments);
                                    return this;
                                };
                                newModule.directive = function () {
                                    $compileProvider.directive.apply(this, arguments);
                                    return this;
                                };
                                newModule.filter = function () {
                                    $filterProvider.register.apply(this, arguments);
                                    return this;
                                };
                                newModule.factory = function () {
                                    $provide.factory.apply(this, arguments);
                                    return this;
                                };
                                newModule.service = function () {
                                    $provide.service.apply(this, arguments);
                                    return this;
                                };
                                newModule.provider = function () {
                                    $provide.provider.apply(this, arguments);
                                    return this;
                                };
                                newModule.value = function () {
                                    $provide.value.apply(this, arguments);
                                    return this;
                                };
                                newModule.constant = function () {
                                    $provide.constant.apply(this, arguments);
                                    return this;
                                };
                                newModule.decorator = function () {
                                    $provide.decorator.apply(this, arguments);
                                    return this;
                                };
                            }
                        ]);
                    }
                    return newModule;
                };
            }
        },
        "angular-cookies": {
            deps: ["angular"],
            exports: "angular-cookies"
        },
        // 确保angular在ui-select之前载入
        "js002": ["angular"],
        'js003': ['angular'],
        'js004': ["angular"],
        "js005": ["angular"],
        "angularjs/vfs_fonts": ["angularjs/pdfmake", "angularjs/csv"],
        "angularjs/ui-bootstrap-tpls": ["angular", "angularjs/ui-bootstrap.min"],
        "angularjs/ui-bootstrap.min": ["angular", "js001"],
        "angularjs/tooltip": ["angular", "js001"],
        "angularjs/csv": ["angular"],
        "angularjs/pdfmake": ["angular"],
        "angularjs/checkbox": ["angular"],
        "angularjs/moment.min": ["angular"],
        "angularjs/daterangepicker": ["angular"],
        "angularjs/angular-ui-router": ["angular"]
    }
});

require([
    "js001",
    "angular-bootstrap",
    //"./angularjs/checkbox",
    //"./angularjs/daterangepicker",
    //"./angularjs/tooltip",
], function () {
    "use strict";
});