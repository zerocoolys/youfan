(function () {
    'use strict';

    angular.module('yf_merchant') .controller('query_order', AllOrder);
    function AllOrder($scope, $filter, $state) {
        var  disabledDates = [
            new Date(1437719836326),
            new Date(),
            new Date(2015, 7, 10), //months are 0-based, this is August, 10th!
            new Date('Wednesday, August 12, 2015'), //Works with any valid Date formats like long format
            new Date("08-14-2015"), //Short format
            new Date(1439676000000) //UNIX format
        ];
        var  monthList =
            ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
        var datePickerCallback = function (val) {
            if (typeof(val) === 'undefined') {
                console.log('No date selected');
            } else {
                console.log('Selected date is : ', val)
            }
        };
        $scope.datepickerObject = {
            titleLabel: ' 请择日期',  //Optional
            todayLabel: '今天',  //Optional
            closeLabel: '关闭',  //Optional
            setLabel: '确认',  //Optional
            errorMsgLabel : 'Please select time.',    //Optional
            setButtonType : 'button-assertive',  //Optional
            inputDate: new Date(),    //Optional
            mondayFirst: true,    //Optional
            disabledDates:disabledDates,  //Optional
            monthList:monthList,  //Optional
            from: new Date(2015, 7, 2),   //Optional
            to: new Date(2015, 7, 29),    //Optional
            callback: function (val) {    //Mandatory
                datePickerCallback(val);
            }
        };

    }
})();