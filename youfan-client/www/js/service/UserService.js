/**
 * Created by icepros on 15-9-8.
 */
ServiceModule
    .factory('AuthenticationService', function () {
        var auth = {
            isLogged: false
        }
        return auth;
    })
    .factory('TokenInterceptor', function ($q, $window, $location, AuthenticationService, localStorageService) {
        return {
            request: function (config) {

                config.headers = config.headers || {};
                if (localStorageService.get("token")) {
                    config.headers.Authorization = localStorageService.get("token");
                }
                return config;
            },

            requestError: function (rejection) {
                return $q.reject(rejection);
            },

            /* 如果返回 200 通过身份验证 */
            response: function (response) {
                if (response != null && response.status == 200 && localStorageService.get("token") && !AuthenticationService.isAuthenticated) {
                    AuthenticationService.isAuthenticated = true;
                }
                return response || $q.when(response);
            },

            /* 如果返回 401 撤销客户端身份验证 */
            responseError: function (rejection) {
                if (rejection != null && rejection.status === 401 && (localStorageService.get("token") || AuthenticationService.isAuthenticated)) {
                    localStorageService.remove("token");
                    AuthenticationService.isAuthenticated = false;
                    $location.path("tab.pwd-login");
                }

                return $q.reject(rejection);
            }
        };
    })
    .factory('SMSService', function ($http, REST_URL) {
        var code = "";
        var codeLength = 4;
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
                return $http.post(REST_URL + '/captcha/alive', {captchaKey: "client_reg" + tel, captcha: code});
            },
            registerCaptchaVerify: function (tel) {
                return $http.post(REST_URL + '/captcha/verify', {captchaKey: "client_reg" + tel});
            },
            /**************************************************/
            /*****************客户端--忘记密码********************/
            /**************************************************/
            forgetPasswordCaptchaAlive: function (tel) {
                return $http.post(REST_URL + '/captcha/alive', {
                    captchaKey: "client_forgetpwd" + tel,
                    captcha: code
                });
            },
            forgetPasswordCaptchaVerify: function (tel) {
                return $http.post(REST_URL + '/captcha/verify', {captchaKey: "client_forgetpwd" + tel});
            }
        }
    })
    .factory('UserService', function ($http, REST_URL) {
        return {
            register: function (tel, password) {
                return $http.post(REST_URL + '/client/register', {tel: tel, password: password});
            },
            signIn: function (tel, password) {
                return $http.post(REST_URL + '/client/login', {tel: tel, password: password});
            },
            signOut: function () {
                return $http.post(REST_URL + '/client/logout', {});
            },
            resetPassword: function (tel, password) {
                return $http.post(REST_URL + '/cuser/pinfo', {tel: tel, password: password});
            },
            updateInfo: function (post) {
                return $http.post(REST_URL + '/cuser/binfo', post);
            },
            attention: function () {
                return $http.post(REST_URL + '/cuser/attention', {});
            },
            praise: function () {
                return $http.post(REST_URL + '/cuser/praise', {});
            },
            userInfo: function (id) {
                return $http.get(REST_URL + '/cuser/' + id);
            }
        }
    })
    .factory('MealsAddressService', function ($http, REST_URL) {
        return {
            add: function (post) {
                return $http.post(REST_URL + '/address/a_info', post);
            },
            query: function (uid) {
                return $http.get(REST_URL + '/address/info/' + uid);
            },
            update: function (post) {
                return $http.post(REST_URL + '/address/u_info/' + post);
            },
            remove: function (id, dataStatus) {
                return $http.get(REST_URL + '/address/r_info/' + {id: id, dataStatus: dataStatus});
            }
        }
    })
    .factory('ResponseUser', function () {
        return {
            id: null,
            name: null,
            age: null,
            tel: null,
            sex: null,
            jobs: null

        }
    });
