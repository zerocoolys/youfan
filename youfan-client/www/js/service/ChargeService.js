/**
 * Created on 2015-08-28.
 *
 * @author dolphineor
 */
ServiceModule.factory('ChargeService', function ($q, $http, localStorageService, REST_URL) {
    var q = $q.defer();

    return {
        getCharge: function (chargeParams) {
            $http.post(REST_URL + '/platform/pay?access_token=' + localStorageService.get('token'), chargeParams).then(function (charge) {
                q.resolve(charge);
            }, function (err) {
                q.resolve(err);
            });

            return q.promise;
        }
    }
});