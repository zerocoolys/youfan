/**
 * Created by hydm on 2015/8/17.
 */
angular.module('yf_merchant.settings_service', [])

    .factory('HelpService', function () {
        // Some fake testing data
        var helps = [{
            id: 0,
            type: 0,
            showTextOne: '如何开通厨房',
            lastText: 'You on your way?',
            face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
            steps: [{des: "1001"}, {des: "1002"}, {des: "1003"}, {des: "1004"}]
        }, {
            id: 1,
            type: 0,
            showTextOne: '如何查询订单',
            lastText: 'Hey, it\'s me',
            face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460',
            steps: [{des: "2001"}, {des: "2002"}, {des: "2003"}, {des: "2004"}, {des: "2005"}]
        }, {
            id: 2,
            type: 0,
            showTextOne: '如何拒绝订单',
            lastText: 'I should buy a boat',
            face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg',
            steps: [{des: "3001"}, {des: "3002"}, {des: "3003"}]
        }, {
            id: 3,
            type: 0,
            showTextOne: '如何处理订单',
            lastText: 'Look at my mukluks!',
            face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
        }, {
            id: 4,
            type: 0,
            showTextOne: '如何提取现金',
            lastText: 'This is wicked good ice cream.',
            face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
        }, {
            id: 5,
            type: 0,
            showTextOne: '如何管理菜品库存',
            lastText: 'This is wicked good ice cream.',
            face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
        }, {
            id: 6,
            type: 1,
            showTextOne: '客服电话',
            showTextTwo: '449598723'
        }];

        return {
            all: function () {
                return helps;
            },
            get: function (helpId) {
                for (var i = 0; i < helps.length; i++) {
                    if (helps[i].id === parseInt(helpId)) {
                        return helps[i];
                    }
                }
                return null;
            }
        };

    })

    .factory("CardService", function () {
        var bankNameArray = [];
        bankNameArray.push("银行名称");
        bankNameArray.push("招商银行");
        bankNameArray.push("中国工商银行");
        bankNameArray.push("中国农业银行");
        bankNameArray.push("中国银行");
        bankNameArray.push("中国建设银行");
        bankNameArray.push("交通银行");
        bankNameArray.push("城市商业银行");
        bankNameArray.push("中信银行");
        bankNameArray.push("光大银行");
        bankNameArray.push("华夏银行");
        bankNameArray.push("中国民生银行");
        bankNameArray.push("广发银行");
        bankNameArray.push("平安银行");
        bankNameArray.push("兴业银行");
        bankNameArray.push("上海浦发发展银行");
        bankNameArray.push("农村信用合作社");
        bankNameArray.push("珠海南通银行");
        bankNameArray.push("宁波通商银行");
        bankNameArray.push("福建亚洲银行");
        bankNameArray.push("恒丰银行银行");
        bankNameArray.push("浙商银行");
        bankNameArray.push("农村商业银行");
        bankNameArray.push("城市信用合作社");
        bankNameArray.push("农村合作银行");
        bankNameArray.push("浙江商业银行");
        bankNameArray.push("徽商银行");
        bankNameArray.push("渤海银行");
        bankNameArray.push("中国邮政储蓄银行");
        bankNameArray.push("东亚银行");
        bankNameArray.push("新韩银行");
        bankNameArray.push("新韩银行");
        bankNameArray.push("北京银行");
        bankNameArray.push("南京银行");
        bankNameArray.push("江苏银行");
        bankNameArray.push("宁波银行");
        bankNameArray.push("上海银行");
        bankNameArray.push("杭州银行");
        bankNameArray.push("东莞农村商业银行");
        bankNameArray.push("国泰君安证券");
        bankNameArray.push("中国农业发展银行");
        bankNameArray.push("上海农村商业银行");
        bankNameArray.push("韩亚银行");
        bankNameArray.push("友利银行");
        bankNameArray.push("韩国企业银行");
        bankNameArray.push("汇丰银行");
        bankNameArray.push("国家开发银行");
        bankNameArray.push("中国进出口银行");
        bankNameArray.push("村镇银行");
        bankNameArray.push("三峡银行");
        bankNameArray.push("渣打银行");
        bankNameArray.push("瑞士银行有限公司");
        bankNameArray.push("丰业银行");
        bankNameArray.push("厦门国际银行");
        bankNameArray.push("上海-巴黎国际银行");
        bankNameArray.push("华商银行");
        bankNameArray.push("华一银行");
        bankNameArray.push("广东华兴银行");
        bankNameArray.push("花旗银行");
        bankNameArray.push("宁波东海银行");
        bankNameArray.push("宁波鄞州农村合作银行(鄞州银行)");
        bankNameArray.push("其它");

        var areaNameArray = [];
        areaNameArray.push("银行所在地");
        areaNameArray.push("北京市");
        areaNameArray.push("天津市");
        areaNameArray.push("上海市");
        areaNameArray.push("重庆市");
        areaNameArray.push("河北省");
        areaNameArray.push("山西省");
        areaNameArray.push("辽宁省");
        areaNameArray.push("吉林省");
        areaNameArray.push("黑龙江省");
        areaNameArray.push("浙江省");
        areaNameArray.push("江苏省");
        areaNameArray.push("安徽省");
        areaNameArray.push("福建省");
        areaNameArray.push("江西省");
        areaNameArray.push("山东省");
        areaNameArray.push("河南省");
        areaNameArray.push("湖北省");
        areaNameArray.push("湖南省");
        areaNameArray.push("广东省");
        areaNameArray.push("海南省");
        areaNameArray.push("四川省");
        areaNameArray.push("贵州省");
        areaNameArray.push("云南省");
        areaNameArray.push("陕西省");
        areaNameArray.push("甘肃省");
        areaNameArray.push("青海省");
        areaNameArray.push("内蒙古自治区");
        areaNameArray.push("新疆维吾尔自治区");
        areaNameArray.push("宁夏回族自治区");
        areaNameArray.push("广西壮族自治区");
        areaNameArray.push("西藏自治区");
        areaNameArray.push("台湾省");
        areaNameArray.push("香港特别行政区");
        areaNameArray.push("澳门特别行政区");
        function loadBankNameArray() {
            return bankNameArray;
        }

        function loadAreaNameArray() {
            return areaNameArray;
        }

        return {
            loadBankNameArray: loadBankNameArray,
            loadAreaNameArray: loadAreaNameArray
        }
    })

;
