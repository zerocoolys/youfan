/**
 * Created by icepros on 15-9-8.
 */

var api = {
    base_url: "http://localhost:8080"
};


ServiceModule
    .factory('AuthenticationService', function(){
        var auth = {
            isLogged: false
        }
        return auth;
    })
    .factory('TokenInterceptor', function ($q, $window, $location, AuthenticationService) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = $window.sessionStorage.token;
                }
                return config;
            },

            requestError: function(rejection) {
                return $q.reject(rejection);
            },

            /* 如果返回 200 通过身份验证 */
            response: function (response) {
                if (response != null && response.status == 200 && $window.sessionStorage.token && !AuthenticationService.isAuthenticated) {
                    AuthenticationService.isAuthenticated = true;
                }
                return response || $q.when(response);
            },

            /* 如果返回 401 撤销客户端身份验证 */
            responseError: function(rejection) {
                if (rejection != null && rejection.status === 401 && ($window.sessionStorage.token || AuthenticationService.isAuthenticated)) {
                    delete $window.sessionStorage.token;
                    AuthenticationService.isAuthenticated = false;
                    $location.path("tab.pwd-login");
                }

                return $q.reject(rejection);
            }
        };
    })
    .factory('UserService', function($http){
        return {
            register: function(){
                return $http.post(api.base_url + '/client/register', {tel: tel, password: password});
            },
            signIn: function(tel, password) {
                return $http.post(api.base_url + '/client/login', {tel: tel, password: password});
            },
            signOut: function() {
                return $http.post(api.base_url + '/client/', {tel: tel, password: password});
            },
            resetPassword: function(token, password){
                return $http.post(api.base_url + '/cuser/pinfo', {password: password});
            },
            updateInfo: function(){
                return $http.post(api.base_url + '/cuser/binfo', {tel: tel, password: password});
            },
            mealsAddress: function(){
                return $http.post(api.base_url + '/cuser/mealsaddress', {tel: tel, password: password});
            },
            attention: function(){
                return $http.post(api.base_url + '/cuser/attention', {tel: tel, password: password});
            },
            praise: function(){
                return $http.post(api.base_url + '/cuser/praise', {tel: tel, password: password});
            }
        }
    });
