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

;