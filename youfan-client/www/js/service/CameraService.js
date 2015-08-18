/**
 * Created by xiaowei on 15-8-17.
 */
ServiceModule.factory('CameraService', function ($ionicActionSheet, $ionicLoading) {
    return {
        initCameraService: function ($scope,$cordovaCamera) {
            $scope.createActionSheet = function () {
                $ionicActionSheet.show({
                    titleText: '图片选择',
                    buttons: [
                        {
                            text: '拍照',
                            onclick: function () {
                                //if (!navigator.camera) {
                                //    alert('请在真机环境中使用拍照上传。');
                                //    return;
                                //}
                                alert("开始拍照");
                            }
                        },
                        {
                            text:'从相册选择',
                            onclick:function(){
                                if (!navigator.camera) {
                                    alert('请在真机环境中使用相册功能。');
                                    return;
                                }
                                alert("选择图片")
                            }
                        }
                    ]
                });
            }
        }
    }
});