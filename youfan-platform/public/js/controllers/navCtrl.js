/**
 * Created by Administrator on 2015/8/19.
 */
define(["./module"], function (ctrs) {
    ctrs.controller('navCtrl', function ($scope, $rootScope, $q, $state, $http, $location) {
        //console.log("navCtrl")
        $rootScope.curnav = "sys";
        $rootScope.navnames = [
            {title: "运营平台管理", name: "sys", rurl: "./#/sys"},
            {title: "客户管理", name: "client", rurl: "./#/client"},
            {title: "商家管理", name: "merchant", rurl: "./#/merchant"}]
        $rootScope.selectedNav = 0;
        //选择Nav时操作 修改当前选中
        $rootScope.changeNav = function (index) {
            $rootScope.selectedNav = index;
            $rootScope.curnav = $rootScope.navnames[index].name;
            //初始化当前左侧Menu
            $rootScope.initNavMenu( $rootScope.curnav);
        }
    })
});
