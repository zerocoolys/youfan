/**
 * Created by dolphineor on 2015-09-11.
 */
ServiceModule.factory('NotificationService', ['$q', '$ionicPlatform', '$cordovaLocalNotification', 'MSG_URL', function ($q, $ionicPlatform, $cordovaLocalNotification, MSG_URL) {
    var ready = $q.defer();

    var pushMsg = function (message) {
        $cordovaLocalNotification.add({
            id: "12345678",
            message: message,
            title: "This is a title",
            autoCancel: true,
            icon: 'http://sciactive.com/pnotify/includes/github-icon.png'
        }).then(function () {
            console.log("The notification has been set");
        });
    };

    $ionicPlatform.ready(function (device) {
        ready.resolve(device);

        document.addEventListener('deviceready', function () {
            var socket = io.connect(MSG_URL + '/news');
            socket.on('message', function (data) {
                pushMsg(JSON.stringify(data))
            });
        }, false);

    });

    return {
        ready: ready.promise
    }
}]);