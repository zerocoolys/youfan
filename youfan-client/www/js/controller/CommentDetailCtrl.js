ControllerModule.controller('CommentDetailCtrl', function ($scope, $stateParams, $ionicSlideBoxDelegate) {
    $scope.$root.tabsHidden = "tabs-hide";
    $scope.comments = [
        {img: "img/2.jpeg", name: 'Record album', content: '味道很好呀，下次还要来吃', time: "2015年2月3日 14:59:03"},
        {img: "img/2.jpeg", name: 'Record album', content: '味道很好呀，下次还要来吃', time: "2015年2月3日 14:59:03"},
        {img: "img/2.jpeg", name: 'Record album', content: '味道很好呀，下次还要来吃', time: "2015年2月3日 14:59:03"},
        {img: "img/2.jpeg", name: 'Record album', content: '味道很好呀，下次还要来吃', time: "2015年2月3日 14:59:03"},
        {img: "img/2.jpeg", name: 'Record album', content: '味道很好呀，下次还要来吃', time: "2015年2月3日 14:59:03"}
    ]
});