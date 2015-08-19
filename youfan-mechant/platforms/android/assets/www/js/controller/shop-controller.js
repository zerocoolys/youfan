/**
 * Created by Fzk lwek on 2015/8/18.
 */
(function () {
    'use strict';

    angular.module('yf_merchant',['ionic', 'ionic-datepicker']).controller('shop', shop);

    function shop($scope, $filter, $timeout,$ionicBackdrop) {
        console.log(1111);

        $scope.reretain=function(){
            console.log(1111);
            $ionicBackdrop.retain();
            $timeout(function() {
                $ionicBackdrop.release();
            }, 1000);


        };
        $scope.datepickerObject = {
            titleLabel: 'Title',  //Optional
            todayLabel: 'Today',  //Optional
            closeLabel: 'Close',  //Optional
            setLabel: 'Set',  //Optional
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
        var disabledDates = [
            new Date(1437719836326),
            new Date(),
            new Date(2015, 7, 10), //months are 0-based, this is August, 10th!
            new Date('Wednesday, August 12, 2015'), //Works with any valid Date formats like long format
            new Date("08-14-2015"), //Short format
            new Date(1439676000000) //UNIX format
        ];
        var monthList = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        var datePickerCallback = function (val) {
            if (typeof(val) === 'undefined') {
                console.log('No date selected');
            } else {
                console.log('Selected date is : ', val)
            }
        };


    }
})();