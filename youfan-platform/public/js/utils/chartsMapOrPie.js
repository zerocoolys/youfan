/**
 * Created by SubDong on 2015/4/14.
 */
var mixingMap = {
    mapOrPie: function (data, chart, dataValueSum, dataValueName) {
        var max = 200;
        if (data) {
            if (data.chart_data.length) {
                max = data.chart_data.sort(chartUtils.by("value"))[0].value;
            }
        }
        max = Number(max * 1.3).toFixed(0);
        if (!chart) return;
        var option = {
            loadingText: "数据读取中...",
            tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(255,255,255,0.8)',
                borderColor: '#ededed',
                borderWidth: 1,
                padding: 0,
                textStyle: {
                    color: '#000',
                    decoration: 'none',
                    fontSize: 12
                }
            },
            //color:[
            //    '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
            //    '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
            //    '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
            //    '#6b8e23', '#ff00ff', '#3cb371', '#b8860b', '#30e0e0'
            //],
            legend: {
                x: 'right',
                orient: 'vertical',
                data: data.data_name,
                selectedMode: false
            },
            animation: false,
            dataRange: {
                orient: 'horizontal',
                min: 0,
                max: max,
                text: [chart.quota + ":", ''],
                selectedMode: false
            },
            series: [
                {
                    name: data.title_name,
                    type: 'map',
                    mapType: 'china',
                    mapLocation: {
                        x: '10%'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: function (params) {
                            var returnValue = 0
                            if (parseInt(params.value) != 0 && !isNaN(params.value)) {
                                returnValue = ((parseInt(params.value) / dataValueSum) * 100).toFixed(2)
                            }
                            var value = "<p>" + params.name + "</p><p>" + dataValueName + " : " + params.value + "</p><p>占比：" + returnValue + "%</p>";
                            return value;
                        }
                    },
                    itemStyle: {
                        emphasis: {label: {show: true}},
                        normal: {
                            borderWidth: 1,
                            borderColor: '#fff',
                            color: '#E6E6E6',
                            label: {
                                show: false
                            }
                        }
                    },
                    data: data.chart_data
                },
                {
                    name: data.title_name,
                    type: 'pie',
                    tooltip: {
                        trigger: 'item',
                        formatter: "<p>{b}</p><p>{a}: {c}</p> <p>占比:{d}%</p>"
                    },
                    center: ['80%', '50%'],
                    radius: ["0", "50%"],
                    selectedMode: false,
                    selected: true,
                    data: data.chart_data,
                    itemStyle: {
                        emphasis: {
                            borderWidth: 2,
                            borderColor: "#fff"
                        }
                    }
                }
            ]
        };
        chart.setOption(option);
    }
};