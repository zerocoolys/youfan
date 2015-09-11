ServiceModule
    .factory('Order', function () {
        return {
            id: 20,
            comment:{},
            cart: [],
            details: {}
        }
    })
    .factory('Merchant', function () {
        return {
            sellerId: 888888888,
            name: "河马堂药膳厨房",
            telNo: 13552080549,
            address: "北京市朝阳区百子湾32号院苹果社区"
        }
    })
    .factory('User', function () {
        return {
            id: 22305304567,
            name: "张三",
            telNo: "15602800105",
            token: null
        }
    })
    .factory('MapAddr', function () {
        return {
            mapKey: {}
        }
    });