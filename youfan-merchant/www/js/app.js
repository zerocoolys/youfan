// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('yf_merchant', ['ionic', 'ionic-datepicker', 'ngCordova', 'yf_merchant.settings_controllers', 'yf_merchant.manage_dishes_controllers'])
    .run(function ($rootScope, $ionicPlatform, $state) {
        $rootScope.goState = function (state) {
            $state.go(state);
        };
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
        });

    })

    .directive('youFanMsg', function ($timeout) {
        return {
            restrict: 'EA',
            templateUrl: 'templates/comment/msg_comment.html',
            link: function (scope, element, attrs, ngModel) {
                scope.msgObj = {flag: false, msg: ""};
                element.css({
                    "z-index": 10,
                    "width": "100%",
                    "position": "fixed",
                    "bottom": "10%"
                });

                scope.$on("youfan-merchant-show-msg", function (e, msg) {
                    scope.msgObj.flag = true;
                    scope.msgObj.msg = msg;
                    $timeout(function () {
                        scope.msgObj = {flag: false, msg: ""};
                    }, 1000);
                });
            }
        }
    })

    .factory('YF_MERCHANT_HOST', function () {
        return "http://192.168.1.111:8080";
    })

    .factory('YF_MERCHANT_INFO', function () {
        var m_info = {
            mID: "888888888"
        };
        return m_info;
    })

    .factory('YF_MERCHANT_LOADING_COMMENT', function () {
        return "templates/comment/loading_comment.html";
    })

    .factory("ValidationService", function () {
        function checkIdCardNumber(num) {
            var factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
            var parityBit = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
            var varArray = new Array();
            var intValue;
            var lngProduct = 0;
            var intCheckDigit;
            var intStrLen = num.length;
            var idNumber = num;
            // initialize
            if ((intStrLen != 15) && (intStrLen != 18)) {
                return false;
            }
            // check and set value
            for (var i = 0; i < intStrLen; i++) {
                varArray[i] = idNumber.charAt(i);
                if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
                    return false;
                } else if (i < 17) {
                    varArray[i] = varArray[i] * factorArr[i];
                }
            }
            if (intStrLen == 18) {
                //check date
                var date8 = idNumber.substring(6, 14);
                if (isDate8(date8) == false) {
                    return false;
                }
                // calculate the sum of the products
                for (var i = 0; i < 17; i++) {
                    lngProduct = lngProduct + varArray[i];
                }
                // calculate the check digit
                intCheckDigit = parityBit[lngProduct % 11];
                // check last digit
                if (varArray[17] != intCheckDigit) {
                    return false;
                }
            }
            else {        //length is 15
                //check date
                var date6 = idNumber.substring(6, 12);
                if (isDate6(date6) == false) {
                    return false;
                }
            }
            return true;
        }

        function isDate6(sDate) {
            if (!/^[0-9]{6}$/.test(sDate)) {
                return false;
            }
            var year, month, day;
            year = sDate.substring(0, 4);
            month = sDate.substring(4, 6);
            if (year < 1700 || year > 2500) return false
            if (month < 1 || month > 12) return false
            return true
        }

        function isDate8(sDate) {
            if (!/^[0-9]{8}$/.test(sDate)) {
                return false;
            }
            var year, month, day;
            year = sDate.substring(0, 4);
            month = sDate.substring(4, 6);
            day = sDate.substring(6, 8);
            var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            if (year < 1700 || year > 2500) return false
            if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) iaMonthDays[1] = 29;
            if (month < 1 || month > 12) return false
            if (day < 1 || day > iaMonthDays[month - 1]) return false
            return true
        }

        // 护照
        function checkPostNumber(number) {
            var str = number;
            var expression = /(P\d{7})|(G\d{8})/;
            return expression.test(str);
        }

        // 银行卡
        function checkLuhmNumber(bankno) {
            var lastNum = bankno.substr(bankno.length - 1, 1);//取出最后一位（与luhm进行比较）

            var first15Num = bankno.substr(0, bankno.length - 1);//前15或18位
            var newArr = new Array();
            for (var i = first15Num.length - 1; i > -1; i--) {    //前15或18位倒序存进数组
                newArr.push(first15Num.substr(i, 1));
            }
            var arrJiShu = new Array();  //奇数位*2的积 <9
            var arrJiShu2 = new Array(); //奇数位*2的积 >9

            var arrOuShu = new Array();  //偶数位数组
            for (var j = 0; j < newArr.length; j++) {
                if ((j + 1) % 2 == 1) {//奇数位
                    if (parseInt(newArr[j]) * 2 < 9)
                        arrJiShu.push(parseInt(newArr[j]) * 2);
                    else
                        arrJiShu2.push(parseInt(newArr[j]) * 2);
                }
                else //偶数位
                    arrOuShu.push(newArr[j]);
            }

            var jishu_child1 = new Array();//奇数位*2 >9 的分割之后的数组个位数
            var jishu_child2 = new Array();//奇数位*2 >9 的分割之后的数组十位数
            for (var h = 0; h < arrJiShu2.length; h++) {
                jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
                jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
            }

            var sumJiShu = 0; //奇数位*2 < 9 的数组之和
            var sumOuShu = 0; //偶数位数组之和
            var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
            var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
            var sumTotal = 0;
            for (var m = 0; m < arrJiShu.length; m++) {
                sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
            }

            for (var n = 0; n < arrOuShu.length; n++) {
                sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
            }

            for (var p = 0; p < jishu_child1.length; p++) {
                sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
                sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
            }
            //计算总和
            sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

            //计算Luhm值
            var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
            var luhm = 10 - k;

            return lastNum == luhm;
        }

        return {
            checkPostNumber: checkPostNumber,
            checkIdCardNumber: checkIdCardNumber,
            checkLuhmNumber: checkLuhmNumber
        }
    });
;
/*
 全局firebaseio
 */
//var firebaseio = new Firebase("https://youfan-mechant.firebaseio.com/");
