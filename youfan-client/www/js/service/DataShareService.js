ServiceModule
    .factory('Order', function () {
        return {
            details: {}
        }
    })
    .factory('Seller', function () {
        return {
            id: 0
        }
    })
    .factory('User', function () {
        return {
            token: null
        }
    });