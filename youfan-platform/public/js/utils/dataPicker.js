/**
 * Created by guochunyan on 2015/6/30.
 */
var dataPicker = {
    picker: function (domId, timeNumber) {
        $('#' + domId).on('apply.daterangepicker', function (ev, picker) {
            var time = chartUtils.getTimeOffset(picker.startDate.format('YYYY-MM-DD'), picker.endDate.format('YYYY-MM-DD'));
            var startTime = time[0];
            var endTime = time[0] + timeNumber;
            var dateTime = chartUtils.getSetOffTime(startTime, endTime);
            var newtime = timeNumber >= 6 ? dateTime[0] + "至" + dateTime[1] : dateTime[0];
            $("#" + domId + " span").html(newtime);
            $('#' + domId).data('daterangepicker').setStartDate(dateTime[0]);
            $('#' + domId).data('daterangepicker').setEndDate(dateTime[1]);

        });
    }
}

