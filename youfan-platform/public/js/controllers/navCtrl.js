/**
 * Created by Administrator on 2015/8/19.
 */
define(["./module"], function (ctrs) {
    ctrs.controller('navCtrl', function ($scope, $rootScope, $q, $state, $http,$window) {
        //console.log("navCtrl")
        //$state.go("login",{},{reload:true});
        $rootScope.curnav = "sys";
        $rootScope.curmenunum = 0;
        $rootScope.curmenus ;
        $scope.navnames = [
            {title: "运营平台管理", name: "sys", rurl: "./#/sys"},
            {title: "客户管理", name: "client", rurl: "./#/client"},
            {title: "商家管理", name: "merchant", rurl: "./#/merchant"}]
        $rootScope.selectedNav = 0;
        //选择Nav时操作 修改当前选中
        $rootScope.changeNav = function (index) {
            if(index!= $rootScope.selectedNav||$rootScope.curmenus==undefined||$rootScope.curmenunum!=0){//首次加载或者改变时候刷新左侧菜单栏
                $rootScope.selectedNav = index;
                $rootScope.curnav = $scope.navnames[index].name;
                //初始化当前左侧Menu
                $rootScope.initNavMenu( $rootScope.curnav);
                $rootScope.curmenunum = 0;
                console.log($rootScope.curnav)
                $state.go($rootScope.curnav, {});
            }
        }
    })
});
