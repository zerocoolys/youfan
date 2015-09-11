/**
 * Created by icepros on 15-9-8.
 */

var api = {
    base_url: "http://localhost:8080"
};

ServiceModule
    .factory('AuthenticationService', function () {
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

            requestError: function (rejection) {
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
            responseError: function (rejection) {
                if (rejection != null && rejection.status === 401 && ($window.sessionStorage.token || AuthenticationService.isAuthenticated)) {
                    delete $window.sessionStorage.token;
                    AuthenticationService.isAuthenticated = false;
                    $location.path("tab.pwd-login");
                }

                return $q.reject(rejection);
            }
        };
    })
    .factory('SMSService', function ($http) {
        var code = "";
        var codeLength = 6;
        //生成 6 位随机数验证码
        for (var i = 0; i < codeLength; i++) {
            code += parseInt(Math.random() * 9).toString();
        }
        return {
            sendSMS: function (tel) {
                var smsUrl = "http://192.168.1.107:8080/platform/sendSMS/1/" + code + "/" + tel;
                return $http.get(smsUrl);
            },
            /**************************************************/
            /*****************客户端--注册***********************/
            /**************************************************/
            registerCaptchaAlive: function (tel) {
                return $http.post(api.base_url + '/captcha/alive', {captchaKey: "client_reg" + tel, captcha: code});
            },
            registerCaptchaVerify: function (tel) {
                return $http.post(api.base_url + '/captcha/verify', {captchaKey: "client_reg" + tel});
            },
            /**************************************************/
            /*****************客户端--忘记密码********************/
            /**************************************************/
            forgetPasswordCaptchaAlive: function (tel) {
                return $http.post(api.base_url + '/captcha/alive', {
                    captchaKey: "client_forgetpwd" + tel,
                    captcha: code
                });
            },
            forgetPasswordCaptchaVerify: function (tel) {
                return $http.post(api.base_url + '/captcha/verify', {captchaKey: "client_forgetpwd" + tel});
            }
        }
    })
    .factory('UserService', function ($http) {
        return {
            register: function (tel, password) {
                return $http.post(api.base_url + '/client/register', {tel: tel, password: password});
            },
            signIn: function (tel, password) {
                return $http.post(api.base_url + '/client/login', {tel: tel, password: password});
            },
            signOut: function () {
                return $http.post(api.base_url + '/client/logout', {});
            },
            resetPassword: function (tel, password) {
                return $http.post(api.base_url + '/cuser/pinfo', {tel: tel, password: password});
            },
            updateInfo: function (post) {
                return $http.post(api.base_url + '/cuser/binfo', post);
            },
            mealsAddress: function () {
                return $http.post(api.base_url + '/cuser/mealsaddress', {});
            },
            attention: function () {
                return $http.post(api.base_url + '/cuser/attention', {});
            },
            praise: function () {
                return $http.post(api.base_url + '/cuser/praise', {});
            }
        }
    })
    .factory('ResponseUser', function(){
        return {
            id: null,
            name: null,
            age: null,
            tel: null,
            sex: null,
            jobs: null

        }
    });
