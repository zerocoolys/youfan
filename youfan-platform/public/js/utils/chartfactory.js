/**
 * Created by XiaoWei on 2015/4/9.
 */
var checked = [0, 1];
var cf = {
    renderChart: function (data, chartConfig) {
        var _self = op;
        if (!chartConfig)console.error("chartConfig is required");
        var chartType = !chartConfig.chartType ? "line" : chartConfig.chartType;
        switch (chartType) {
            case "line":
                _self.lineChart(data, chartConfig);
                break;
            case"bar":
                _self.barChart(data, chartConfig);
                break;
            case "pie":
                _self.pieChart(data, chartConfig);
                break;
            case "map":
                _self.mapChart(data, chartConfig);
                break;
            default :
                _self.lineChart(data, chartConfig);
                break;
        }
    }
}
var init = {
    lineChart: function (chartConfig) {
        if (!chartConfig.instance)return;
        var instance = chartConfig.instance;
        var option = {
            legend: {
                show: false,
                selectedMode: false,
                orient: !chartConfig.ledLayout ? "horizontal" : chartConfig.ledLayout,
                data: !chartConfig.legendData ? [data.label] : chartConfig.legendData
            },
            tooltip: {
                trigger: !chartConfig.tt ? "axis" : chartConfig.tt
            },
            calculable: true,
            xAxis: [
                {
                    type: !chartConfig.xType ? "category" : chartConfig.xType,
                    boundaryGap: !chartConfig.bGap ? false : chartConfig.bGap,
                    data: []
                }
            ],
            yAxis: [
                {
                    type: !chartConfig.yType ? "value" : chartConfig.yType,
                    axisLabel: {
                        formatter: chartConfig.axFormat
                    }
                },
                {
                    'type': !chartConfig.yType ? "value" : chartConfig.yType
                }
            ],
            series: []
        }
        chartConfig.toolShow = !chartConfig.toolShow ? false : true;
        if (chartConfig.toolShow) {
            option["toolbox"] = {
                show: true,
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            }
        }

        chartConfig.legendData.forEach(function (legend) {
            var serie = {
                name: legend,
                type: !chartConfig.chartType ? "line" : chartConfig.chartType,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: []
            };
            option.series.push(serie);
        });
        instance.setOption(option);
    }
}
var op = {
    lineChart: function (data, chartConfig) {
        util.chartResize(chartConfig);//charts 自适应
        var _legendTmp = [];
        if (!data.length) {
            def.defData(chartConfig);
            return;
        }
        var json, labelData = [], labelDataText = [];
        if (chartConfig.noFormat) {
            json = data;
            _legendTmp = chartConfig.legendData;
            chartConfig.legendData = labelData;
        } else {
            json = JSON.parse(eval('(' + data + ')').toString());
        }
        var count = 0;
        json.forEach(function (j) {
            j.quota.forEach(function (q) {
                count += Number(q);
            });
        });
        if (count == 0) {
            chartConfig.instance = echarts.init(document.getElementById(chartConfig.id));
            def.defData(chartConfig);
            chartConfig.legendData = _legendTmp;
            return;
        }
        if (!json[0]) {
            chartConfig.instance = echarts.init(document.getElementById(chartConfig.id));
            def.defData(chartConfig);
            chartConfig.legendData = _legendTmp;
            return;
        }
        if (!json[0].key.length) {
            def.defData(chartConfig);
            chartConfig.legendData = _legendTmp;
            return;
        }
        json.forEach(function (item) {
            var data = chartUtils.convertType(item.label);
            labelData.push(data);
            labelDataText.push(data.label);
        });
        if (!chartConfig.instance)return;
        var chartObj = chartConfig.instance;
        if (chartConfig.chartType == "bar") {
            if (chartConfig.barClick) {
                chartObj.on("click", chartConfig.barClick);
            }else if (chartConfig.dblClick) {
                chartObj.on("dblclick", function(param){
                    chartConfig.dblClick(param,chartConfig.quota);
                });
            }
        }
        chartObj.xAxis = [];
        var option = {
            legend: {
                show: false,
                selectedMode: false,
                orient: !chartConfig.ledLayout ? "horizontal" : chartConfig.ledLayout,
                data: !chartConfig.legendData ? labelDataText : chartConfig.legendData
            },
            tooltip: {
                trigger: !chartConfig.tt ? "axis" : chartConfig.tt,
                backgroundColor: 'rgba(255,255,255,0.8)',
                borderColor: '#ededed',
                borderWidth: 1,
                padding: 0,
                textStyle: {
                    color: '#000',
                    decoration: 'none',
                    fontSize: 12
                },
                formatter: function (params, ticket, callback) {
                    if (option.tooltip.trigger == "axis") {
                        var xName = params[0].name.toString();
                        var res = '<li>' + xName + '</li>';
                        if (xName.indexOf("/点") > -1) {
                            xName = xName.split("/点")[0];
                        }
                        if (chartConfig.compare || chartConfig.compareCustom) {
                            if (chartConfig.chartType == "line") {
                                res = '<li>' + xName + ':00-' + xName + ':59</li>';
                            }
                        } else {
                            if (chartConfig.keyFormat == "none") {
                                if (!chartConfig.half) {
                                    res = '<li>' + xName + ':00-' + xName + ':59</li>';
                                }
                            }
                        }
                        for (var i = 0, l = params.length; i < l; i++) {
                            var formatType = labelDataText[i];
                            if (chartConfig.compare || chartConfig.compareCustom) {
                                var baseSerieName = params[i].seriesName.split(":");
                                var re = /[^\x00-\xff]/;//判断是否有中文
                                if (re.test(baseSerieName[1])) {
                                    res += '<li class=chartstyle' + i + '>' + baseSerieName[0] + baseSerieName[1] + ' : ' + ad.formatFunc(params[i].value, baseSerieName[1]) + '</li>';
                                } else {
                                    res += '<li class=chartstyle' + i + '>' + baseSerieName[0] + chartUtils.convertChinese(baseSerieName[1]) + ' : ' + ad.formatFunc(params[i].value, baseSerieName[1]) + '</li>';
                                }
                            } else {
                                if (chartConfig.toolTip == undefined) {
                                    res += '<li class=chartstyle' + i + '>' + params[i].seriesName + ' : ' + ad.formatFunc(params[i].value, formatType) + '</li>';
                                } else {
                                    res += '<li class=chartstyle' + i + '>' + params[i].seriesName + ' : ' + params[i].value + '</li>';
                                }
                            }

                        }
                        return res;
                    } else {
                        if (chartConfig.itemHover) {
                            var _typeTotal = 0;
                            var _allTotal = 0;
                            json.forEach(function (item) {
                                item.quota.forEach(function (q) {
                                    if (item.label == params[0]) {
                                        _typeTotal += Number(q);
                                    }
                                    _allTotal += Number(q);
                                });
                            });
                            return chartConfig.itemHover(params, _typeTotal, _allTotal);
                        } else {
                            var xName = params[1].toString();
                            var res = '<li>' + xName + ':00-' + xName + ':59</li>';
                            res += '<li>' + params[2] + '</li>';
                            return res;
                        }
                    }
                },
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        color: '#01AFEF',
                        width: 1,
                        type: 'solid'
                    }
                }
            },
            grid: {
                borderColor: '#F0F0F0'
            },
            xAxis: [
                {
                    type: !chartConfig.xType ? "category" : chartConfig.xType,
                    boundaryGap: !chartConfig.bGap ? false : chartConfig.bGap,
                    axisLine: {    // 轴线
                        lineStyle: {
                            color: '#01AFEF',
                            type: 'solid',
                            width: 1
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#F0F0F0',
                            type: 'solid',
                            width: 1
                        }
                    },
                    data: []
                }
            ],
            yAxis: [
                {
                    type: !chartConfig.yType ? "value" : chartConfig.yType,
                    splitLine: {
                        lineStyle: {
                            color: '#F0F0F0',
                            type: 'solid',
                            width: 1
                        }
                    },
                    splitNumber: 5,
                    axisLine: {
                        lineStyle: {
                            color: '#01AFEF',
                            type: 'solid',
                            width: 1
                        }
                    }
                },
                {
                    'type': !chartConfig.yType ? "value" : chartConfig.yType
                }
            ],
            series: []
        };
        if (chartConfig.auotHidex) {
            option.xAxis[0]["axisLabel"] = {
                interval: 0
            }
        }
        if (chartConfig.qingXie) {
            option.xAxis[0]["axisLabel"] = {
                interval: 0,
                rotate: chartConfig.qxv ? chartConfig.qxv : 25,
                textStyle: {
                    color: '#0D0D0D',
                    fontFamily: '微软雅黑'
                }
            }

        }
        chartConfig.toolShow = !chartConfig.toolShow ? false : true;
        if (chartConfig.toolShow) {
            option["toolbox"] = {
                show: true,
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            }
        }
        chartConfig.dataKey = !chartConfig.dataKey ? "key" : chartConfig.dataKey;
        chartConfig.dataValue = !chartConfig.dataValue ? "quota" : chartConfig.dataValue;
        var xData = [];
        var select = {};
        json.forEach(function (item) {
            select[chartUtils.convertChinese(item.label)] = true;
            var serie = {
                name: !chartConfig.noFormat ? chartUtils.convertChinese(item.label) : item.label,
                type: !chartConfig.chartType ? "line" : chartConfig.chartType,
                data: item[chartConfig.dataValue],
                barMaxWidth: 25,
                barGap: "10%",
                symbolSize: 1.5
            };
            if (chartConfig.lineType == undefined) {
                serie.itemStyle = {
                    normal: {
                        lineStyle: {
                            width: 2
                        }
                    }
                }
            } else {
                serie.itemStyle = {
                    normal: {
                        lineStyle: {
                            width: 1.5
                        }
                    }
                }
            }
            if (chartConfig.min_max == undefined && chartConfig.chartType == 'line') {
                serie["markPoint"] = {
                    large: false,
                    data: [
                        {
                            type: 'max',
                            name: '最大',
                            width: 10,
                            symbol: 'Circle',
                            symbolSize: 5,
                            itemStyle: {normal: {label: {show: false}}}
                        },
                        {
                            type: 'min',
                            name: '最小',
                            symbol: 'emptyCircle',
                            symbolSize: 4,
                            itemStyle: {normal: {label: {show: false}}}
                        }
                    ]
                }
            }
            var x = util.getX(item, chartConfig, option);
            if (chartConfig.keyFormat == "week") {
                if (chartConfig.time) {
                    var hasChange = [];
                    x[0] = chartConfig.time[0].split("-")[0] + "-" + x[0].split("-")[1];
                    x[x.length - 1] = x[x.length - 1].split("-")[0] + "-" + chartConfig.time[1].split("-")[0];
                }
            }
            xData.push(x);
            option.series.push(serie);
        });
        if (!chartConfig.twoYz) {
            var legendType = false;
            if (labelData.length > 1) {
                if (labelData[0].type == labelData[1].type) {
                    legendType = true;
                }
            }
            for (var i = 0; i < labelData.length; i++) {
                var formatType = labelData[i].label;
                if (!legendType)
                    option.series[i]["yAxisIndex"] = i;
                else
                    option.series[i]["yAxisIndex"] = 0;

                option.yAxis[i]["axisLine"] = {
                    lineStyle: {
                        color: '#01AFEF',
                        type: 'solid',
                        width: 1
                    }
                };
                option.yAxis[i]["splitNumber"] = 5;
                option.yAxis[i]["splitLine"] = {
                    lineStyle: {
                        color: '#F0F0F0',
                        type: 'solid',
                        width: 1
                    }
                }
                if (chartConfig.compare) {
                    var baseSerieName = formatType.split(":");
                    ad.renderFormat(option, i, baseSerieName[1]);
                } else {
                    ad.renderFormat(option, i, formatType);
                }

            }
        }
        option.xAxis[0].data = xData[0];
        option.legend.selected = select;
        chartObj.setOption(option);
        chartConfig.legendData = _legendTmp;
        chartConfig.instance.hideLoading();
    },
    barChart: function (data, chartConfig) {
        util.chartResize(chartConfig);//charts 自适应
        chartConfig.interval = 0;
        this.lineChart(data, chartConfig);
    },
    pieChart: function (data, chartConfig) {
        util.chartResize(chartConfig);//charts 自适应
        if (!chartConfig.instance)return;
        var chartObj = chartConfig.instance;
        if (chartConfig.onHover) {
            chartObj.on("hover", function (params) {
                if (data.length) {
                    chartConfig.onHover(params, data[0].label);
                } else {
                    chartConfig.onHover(params);
                }
            });
        }
        var labelData = [];
        if (data[0]) {
            if (data[0].key.length == 0) {
                //chartObj = echarts.init(document.getElementById(chartConfig.id));
                def.mapDef(chartConfig);
                return;
            }
        } else {
            def.mapDef(chartConfig);
            return;
        }
        data.forEach(function (item) {
            labelData.push(item.label);
        });
        var option = {
            //  animation :false,
            tooltip: {
                trigger: !chartConfig.tt ? "item" : chartConfig.tt,
                backgroundColor: 'rgba(255,255,255,0.8)',
                borderColor: '#ededed',
                borderWidth: 1,
                padding: 10,
                textStyle: {
                    color: '#000',
                    decoration: 'none',
                    fontSize: 12
                },
                formatter: function (params, ticket, callback) {
                    var formatType = labelData[0];
                    var res = chartUtils.convertChinese(formatType) + "：";
                    if (chartConfig.toolTip == undefined) {
                        res += ad.formatFunc(params.value, formatType) + '<br/>' + '占比：' + params[3] + '%<br/>';
                    } else {
                        res += params.value + '<br/>' + '占比：' + params[3] + '%<br/>';
                    }
                    return res;
                }
            },
            //color: [
            //    '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
            //    '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
            //    '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
            //    '#6b8e23', '#ff00ff', '#3cb371', '#b8860b', '#30e0e0'
            //],
            legend: {
                selectedMode: false,
                show: chartConfig.legendShow ? chartConfig.legendShow : false,
                orient: !chartConfig.ledLayout ? "vertical" : chartConfig.ledLayout,
                x: 'left',
                data: !chartConfig.legendData ? data.label : chartConfig.legendData
            },
            series: []
        };
        chartConfig.toolShow = !chartConfig.toolShow ? false : true;
        if (chartConfig.toolShow) {
            option["toolbox"] = {
                show: true,
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    magicType: {
                        show: true,
                        type: ['pie', 'funnel'],
                        option: {
                            funnel: {
                                x: '25%',
                                width: '50%',
                                funnelAlign: 'left',
                                max: 1548
                            }
                        }
                    },
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            }
        }
        var serie = {
            name: !chartConfig.serieName ? "请配置图例说明" : chartConfig.serieName,
            type: "pie",
            radius: '55%',
            center: ['50%', '60%'],
            data: [],
            legendHoverLink: true,
            itemStyle: {
                emphasis: {
                    borderWidth: 2,
                    borderColor: "#fff"
                }
            }
        };
        if (chartConfig.status) {
            switch (chartConfig.status) {
                case "hu":
                    serie = {
                        name: !chartConfig.serieName ? "请配置图例说明" : chartConfig.serieName,
                        type: "pie",
                        radius: [40, 80],
                        roseType: 'area',
                        data: []
                    }
                    break;
                default :
                    serie = serie;
                    break;
            }
        }
        if (chartConfig.pieStyle == undefined) {
            serie["itemStyle"] =
            {
                normal: {
                    label: {
                        position: 'inner',
                        formatter: function (params) {
                            return (params.percent - 0).toFixed(0) + '%'
                        }
                    },
                    labelLine: {
                        show: false
                    }
                },
                emphasis: {
                    borderWidth: 2,
                    borderColor: "#fff",
                    label: {
                        show: true,
                        formatter: "{d}%"
                    }
                }
            };
        }
        chartConfig.dataKey = !chartConfig.dataKey ? "key" : chartConfig.dataKey;
        chartConfig.dataValue = !chartConfig.dataValue ? "quota" : chartConfig.dataValue;
        data.forEach(function (e) {
            for (var i = 0; i < e[chartConfig.dataKey].length; i++) {
                var _val = {};
                _val["name"] = e[chartConfig.dataKey][i]
                _val["value"] = Number(e[chartConfig.dataValue][i]);
                serie.data.push(_val);
            }
        })
        option.series.push(serie);
        chartObj.setOption(option);
        chartConfig.instance.hideLoading();
    },
    mapChart: function (data, chartConfig) {
        util.chartResize(chartConfig);//charts 自适应
        if (!chartConfig.instance)return;
        var chartObj = chartConfig.instance
        var option = {
            title: {
                text: !chartConfig.titleText ? "暂无说明" : chartConfig.titleText,
                x: 'center'
            },
            tooltip: {
                trigger: !chartConfig.tt ? 'item' : chartConfig.tt
            },
            legend: {
                orient: !chartConfig.ledLayout ? 'vertical' : chartConfig.ledLayout,
                x: 'left',
                data: !chartConfig.legendData ? [data.label] : chartConfig.legendData
            },
            series: []
        };
        chartConfig.toolbox = !chartConfig.toolbox ? false : chartConfig.toolbox;
        if (chartConfig.toolbox) {
            option["toolbox"] = {
                show: true,
                orient: 'vertical',
                x: 'right',
                y: 'center',
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            }
        }
        if (chartConfig.dataRange == undefined) {
            option["dataRange"] = {
                min: 0,
                max: 2500,
                x: 'left',
                y: 'bottom',
                text: ['高', '低'],           // 文本，默认为数值文本
                calculable: true
            }
        }
        chartConfig.roamController = !chartConfig.roamController ? false : chartConfig.roamController;
        if (chartConfig.roamController) {
            option["roamController"] = {
                show: true,
                x: 'right',
                mapTypeControl: {
                    'china': true
                }
            }
        }
        var serie = {
            //name: chartConfig.serieName,
            type: chartConfig.chartType,
            mapType: 'china',
            roam: false,
            itemStyle: {
                normal: {label: {show: true}},
                emphasis: {label: {show: true}}
            },
            data: []
        }
        chartConfig.dataKey = !chartConfig.dataKey ? "name" : chartConfig.dataKey;
        chartConfig.dataValue = !chartConfig.dataValue ? "value" : chartConfig.dataValue;
        if (data.data) {
            if (data.data[0]) {
                data.data.forEach(function (e) {
                    serie['name'] = data.label;
                    var push_data = {};
                    push_data[chartConfig.dataKey] = e[chartConfig.dataKey];
                    push_data[chartConfig.dataValue] = e[chartConfig.dataValue];
                    push_data["value"]
                    serie.data.push(push_data);
                });
                option.series.push(serie);
            }
        }
        chartObj.hideLoading();
        chartObj.setOption(option);
    }
}
var ad = {
    addData: function (data, chartObj, chartConfig) {
        if (!chartObj)return;
        if (!data.data)return;
        if (data.data[0]) {
            var option = chartObj.getOption();
            //var option = chartObj.getOption();
            //var s_index = option.series.length - 1;
            //var c_type = option.series[s_index].type;
            //var json = data.data;
            //var serie = {
            //    name: chartConfig.showTarget,
            //    itemStyle: {normal: {areaStyle: {type: 'default'}}},
            //    type: c_type,
            //    data: []
            //};
            //if (data.label != "uv") {
            //    serie["yAxisIndex"] = 1;
            //    option.yAxis[1]["axisLabel"] = {
            //        formatter: function (value) {
            //            return ad.formatFunc(value, !chartConfig.axFormat ? undefined : chartConfig.axFormat);
            //        }
            //    };
            //} else {
            //    serie["yAxisIndex"] = 0;
            //}
            //json.forEach(function (item) {
            //    serie.data.push(item[chartConfig.dataValue]);
            //});
            //option.series.push(serie);
            //chartObj.hideLoading();
            //chartObj.setOption(option);
            //console.log(option);
        }
    },
    seriesExist: function (chartObj, target) {
        var option = chartObj.getOption();
        var old_series = option.series;
        var result = true;
        old_series.forEach(function (e) {
            if (e.name == target) {
                result = false;
            }
        });
        return result;
    },
    formatFunc: function (value, formatType) {
        switch (formatType) {
            case "avgTime":
                var days = Math.floor(value / 1440 / 60);
                var hours = Math.floor((value - days * 1440 * 60) / 3600);
                var minutes = Math.floor((value - days * 1440 * 60 - hours * 3600) / 60);
                var seconds = Math.floor((value - days * 1440 * 60 - hours * 3600 - minutes * 60));
                return this.getDoubleInteger(hours) + ":" + this.getDoubleInteger(minutes) + ":" + this.getDoubleInteger(seconds);
                break;
            case "平均访问时长":
                var days = Math.floor(value / 1440 / 60);
                var hours = Math.floor((value - days * 1440 * 60) / 3600);
                var minutes = Math.floor((value - days * 1440 * 60 - hours * 3600) / 60);
                var seconds = Math.floor((value - days * 1440 * 60 - hours * 3600 - minutes * 60));
                return this.getDoubleInteger(hours) + ":" + this.getDoubleInteger(minutes) + ":" + this.getDoubleInteger(seconds);
                break;
            case "outRate":
                return value + "%";
                break;
            case "nuvRate":
                return value + "%";
                break;
            case "arrivedRate":
                return value + "%";
                break;
            case "ctr":
                return value + "%";
                break;
            case "点击率":
                return value + "%";
                break;
            case "新访客比率":
                return value + "%";
                break;
            case "跳出率":
                return value + "%";
                break;
            case "抵达率":
                return value + "%";
                break;
            default :
                return value;
                break;
        }
    },
    renderFormat: function (option, index, matchType) {
        switch (matchType) {
            case "avgTime":
                option.yAxis[index]["axisLabel"] = {
                    formatter: function (value) {
                        return ad.formatFunc(value, "avgTime");
                    }
                };
                break;
            case "outRate":
                option.yAxis[index]["axisLabel"] = {
                    formatter: function (value) {
                        return value + "%";
                    }
                };
                break;
            case "nuvRate":
                option.yAxis[index]["axisLabel"] = {
                    formatter: function (value) {
                        return value + "%";
                    }
                };
                break;
            case "arrivedRate":
                option.yAxis[index]["axisLabel"] = {
                    formatter: function (value) {
                        return value + "%";
                    }
                };
                break;
            case "ctr":
                option.yAxis[index]["axisLabel"] = {
                    formatter: function (value) {
                        return value + "%";
                    }
                };
                break;
            case "平均访问时长":
                option.yAxis[index]["axisLabel"] = {
                    formatter: function (value) {
                        return ad.formatFunc(value, "平均访问时长");
                    }
                };
                break;
            case "跳出率":
                option.yAxis[index]["axisLabel"] = {
                    formatter: function (value) {
                        return value + "%";
                    }
                };
                break;
            case "新访客比率":
                option.yAxis[index]["axisLabel"] = {
                    formatter: function (value) {
                        return value + "%";
                    }
                };
                break;
            case "抵达率":
                option.yAxis[index]["axisLabel"] = {
                    formatter: function (value) {
                        return value + "%";
                    }
                };
                break;
            case "点击率":
                option.yAxis[index]["axisLabel"] = {
                    formatter: function (value) {
                        return value + "%";
                    }
                };
                break;
            default :
                option.yAxis[index]["axisLabel"] = {
                    formatter: function (value) {
                        return value;
                    }
                };
                break;
        }
    },
    getDoubleInteger: function (val) {
        val = val.toString();
        if (val.length < 2) {
            val = "0" + val.toString();
        }
        return val.toString();
    }
}
var clear = {
    lineChart: function (chartConfig, checkedVal) {
        if (!chartConfig.instance) return;
        var instance = chartConfig.instance, option = instance.getOption();
        var select = {};
        chartConfig.legendData.forEach(function (e) {
            select[e] = false;
        })
        if (checkedVal) {
            checkedVal.forEach(function (item) {
                select[chartUtils.convertChinese(item)] = true;
            });
        }
        option.series = [];
        //option.legend.selected = select;
        instance.setOption(option);
        instance.restore();
    }
}
var def = {
    defData: function (chartConfig) {
        var instance = chartConfig.instance;
        var option = {
            legend: {
                show: false,
                selectedMode: false,
                orient: !chartConfig.ledLayout ? "horizontal" : chartConfig.ledLayout,
                data: ['暂无数据']
            },
            tooltip: {
                trigger: !chartConfig.tt ? "axis" : chartConfig.tt
            },
            xAxis: [
                {
                    type: !chartConfig.xType ? "category" : chartConfig.xType,
                    boundaryGap: !chartConfig.bGap ? false : chartConfig.bGap,
                    data: []
                }
            ],
            yAxis: [
                {
                    type: !chartConfig.yType ? "value" : chartConfig.yType,
                    axisLabel: {
                        formatter: chartConfig.axFormat
                    }
                },
                {
                    'type': !chartConfig.yType ? "value" : chartConfig.yType
                }
            ],
            series: [{
                name: '暂无数据',
                type: !chartConfig.chartType ? "line" : chartConfig.chartType,
                data: []
            }]
        }
        var timeType = 24;
        if (chartConfig.keyFormat) {
            if (chartConfig.keyFormat == "day") {
                timeType = 7;
            }
        }
        for (var i = 0; i < timeType; i++) {
            option.xAxis[0].data.push('');
        }
        //serie.data.push(0);
        //option.xAxis[0].data = xData;
        //option.series.push(serie);
        //if (chartConfig.chartType == "bar") {
        //    option.legend.data = ["暂无数据"];
        //}
        instance.setOption(option);
        util.chartEmpty(chartConfig);
    },
    mapDef: function (chartConfig) {
        var charObj = chartConfig.instance;
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
            },
            series: [
                {
                    name: '暂无数据',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: []
                }
            ]
        };
        charObj.setOption(option);
        //console.log(option);
        util.chartEmpty(chartConfig);
    }
}
var util = {
    getX: function (item, chartConfig, option) {
        var _time = [];
        var key = item[chartConfig.dataKey];
        if (chartConfig.keyFormat) {
            if (chartConfig.keyFormat == "none") {
                if (chartConfig.allShowChart) {
                    var xAxis = [];
                    key.forEach(function (k) {
                        if (k.length > chartConfig.allShowChart) {
                            xAxis.push(k.substring(0, chartConfig.allShowChart) + "...");
                        } else {
                            xAxis.push(k);
                        }
                    });
                    return xAxis;
                } else {
                    var _time = [];
                    if (key[0].toString().length == 13) {
                        key.forEach(function (time) {
                            var t = new Date(time).Format("yyyy-MM-dd hh:mm:ss");
                            _time.push(t.toString().substring(10, 13));
                        });
                    } else {
                        _time = key;
                    }
                    if (chartConfig.half == undefined) {
                        if (_time[_time.length - 1].toString().indexOf("/点") == -1) {
                            _time[_time.length - 1] = _time[_time.length - 1] + "/点";
                        }
                    }
                    //console.log(key);
                    return _time;
                }
            }
            if (chartConfig.keyFormat == "eq") {
                return key;
            }
            if (chartConfig.keyFormat == "day") {
                if (chartConfig.compareCustom) {
                    var _time = [];
                    _time = key;
                } else {
                    var _time = [];
                    key.forEach(function (time) {
                        var t = new Date(time).Format("yyyy-MM-dd hh:mm:ss");
                        _time.push(t.toString().substr(0, 10));
                    });
                }
            } else if (chartConfig.keyFormat == "week") {
                key.forEach(function (time) {
                    var t = new Date(time).Format("yyyy-MM-dd hh:mm:ss");
                    _time.push(util.getYearWeekState(t.toString().substring(0, 10)));
                });
            } else if (chartConfig.keyFormat == "month") {
                key.forEach(function (time) {
                    var t = new Date(time).Format("yyyy-MM-dd hh:mm:ss");
                    _time.push(t.toString().substr(0, 7));
                });
            } else {
                var _time = [];
                key.forEach(function (time) {
                    var t = new Date(time).Format("yyyy-MM-dd hh:mm:ss");
                    _time.push(Number(t.toString().substring(10, 13)));
                });
            }
        } else {
            var _time = [];
            key.forEach(function (time) {
                var t = new Date(time).Format("yyyy-MM-dd hh:mm:ss");
                _time.push(Number(t.toString().substring(10, 13)));
            });
            return _time;
        }
        return _time;
    },
    renderLegend: function (chartObj, c) {
        if (c.legendMultiData) {
            this.addEventMore(chartObj, c);
        } else {
            if (c.legendData.length > 0 && (c.chartType == "line" || c.chartType == "bar")) {
                if (c.legendAllowCheckCount > 1) {
                    this.makeEvent("checkBox", chartObj, c);
                } else {
                    this.makeEvent("radio", chartObj, c);
                }
            }
        }
    }
    ,
    makeEvent: function (renderType, chartObj, c) {
        if (c.legendDefaultChecked) {
            checked = [];
            c.legendDefaultChecked.forEach(function (checkedItem) {
                checked.push(checkedItem);
            });
        }
        var chartDiv = $("#" + c.legendId);
        chartDiv.empty();
        var legendDiv = $("<div/>");
        legendDiv.attr("id", renderType + "_" + c.id);
        legendDiv.attr("style", "width:100%;position:absolute;margin:0px auto;text-align:center;z-index:10;background: #ffffff;");
        //var colorY = [-77, -51];
        for (var i = 0; i < c.legendData.length; i++) {
            var lab = $("<label/>");
            var spn = $("<b/>");
            var rad = $("<input/>");
            rad.attr("type", renderType);
            if (renderType == "checkBox") {
                checked.forEach(function (def) {
                    if (def == i) {
                        $(rad).parents().append("<span>fuck</span>");
                        rad.prop("checked", true);
                    }
                });
            } else {
                if (i == 0) {
                    rad.prop("checked", true);
                }
            }
            rad.attr("name", renderType + "_" + c.id);
            rad.attr("value", chartUtils.convertEnglish(c.legendData[i]));
            rad.attr("asc", c.legendAllowCheckCount);
            rad.attr("index", i + "");
            rad.attr("chart", c.id);
            rad.attr("class", "styled");
            if (window.addEventListener) {
                rad.bind("click", function () {
                    if (renderType == "checkBox") {
                        util.allowItem(this);
                    } else {
                        util.radioBtn(this);
                    }
                    var checkVal = util.legStr(this);
                    if (c.legendClickListener) {
                        c.legendClickListener(this, chartObj, c, checkVal);
                    }
                });
            }
            lab.append(rad);
            spn.html("&nbsp;" + c.legendData[i] + "&nbsp;&nbsp;");
            lab.append(spn);
            legendDiv.append(lab);
        }
        if (renderType == "checkBox") {
            legendDiv.append("<span>*最多只能勾选2项</span>");
        }
        else {
            legendDiv.append("<span>*可同时选择1项</span>");
        }
        chartDiv.append(legendDiv);
    }
    ,
    addEventMore: function (chartObj, c) {
        if (c.legendDefaultChecked) {
            checked = [];
            c.legendDefaultChecked.forEach(function (checkedItem) {
                checked.push(checkedItem);
            });
        }
        var legendDiv = $("#" + c.legendId);
        legendDiv.attr("style", "width:100%;position:absolute;margin:0px auto;text-align:center;z-index:10;background: #ffffff;");
        var button = $("<button/>");
        button.attr({
            type: "button",
            class: "btn btn-default fr btn-sm custom_btn",
            value: "指标："
        })
        var _target = false;
        button.bind("click", function () {
            var checkBoxDiv = $("#" + c.legendId + "_check");
            if (_target) {
                checkBoxDiv.attr("class", "plancheckbox collapse")
                _target = false;
            } else {
                checkBoxDiv.attr("class", "plancheckbox collapse in");
                _target = true;
            }
        });
        var b = $("<b/>");
        b.html("<b>请选择指标</b>");
        var caret = $("<span/>");
        caret.attr("class", "caret");
        button.append(b);
        button.append(caret);
        var checkBoxDiv = $("<div/>");
        checkBoxDiv.attr("class", "plancheckbox collapse");
        checkBoxDiv.attr("id", c.legendId + "_check")
        for (var i = 0; i < c.legendMultiData.length; i++) {
            var lab = $("<label/>");
            var spn = $("<span/>");
            var rad = $("<input/>");
            rad.attr({
                type: "checkBox",
                name: "checkBox_" + c.id,
                value: c.legendMultiData[i].name,
                asc: c.legendAllowCheckCount,
                index: i + "",
                chart: c.id,
                class: "styled"
            });
            checked.forEach(function (def) {
                if (def == i) {
                    rad.prop("checked", true);
                }
            });
            rad.bind("click", function () {
                util.allowItem(this);
            });
            lab.append(rad);
            spn.html("&nbsp;" + c.legendMultiData[i].label + "&nbsp;&nbsp;");
            lab.append(spn);
            checkBoxDiv.append(lab);
        }
        var submitBtn = $("<button/>");
        submitBtn.html("确定");
        submitBtn.attr("class", "btn btn-primary btn-xs");
        submitBtn.bind("click", function () {
            var checkBoxDiv = $("#" + c.legendId + "_check");
            _target = false;
            checkBoxDiv.attr("class", "plancheckbox collapse");
            var checkVal = [], checkText = [];
            var multiChecks = $("input[name='checkBox_" + c.id + "']");
            for (var i = 0; i < multiChecks.length; i++) {
                if (multiChecks[i].checked == true) {
                    checkVal.push(multiChecks[i].value);
                    checkText.push($(multiChecks[i]).next("span").html());
                }
            }
            if (checkText.length) {
                button.html("<b>" + checkText.toString() + "</b>");
            } else {
                button.empty();
                button.append(b);
                button.append(caret);
            }
            if (c.legendClickListener) {
                c.legendClickListener(multiChecks, chartObj, c, checkVal);
            }
        });
        checkBoxDiv.append(submitBtn);
        checkBoxDiv.append("<span>*可同时选择2项</span>");
        legendDiv.append(checkBoxDiv);
        legendDiv.prepend(button);

    }
    ,
    allowItem: function (radioObj) {
        var checks = $("input[name='" + radioObj.name + "']");
        var row = parseInt(radioObj.getAttribute("index"))//获取选中下标
        var a = checked.indexOf(row);//获取当前下标在legend数组的位置
        var allowSelectedCount = parseInt(radioObj.getAttribute("asc"));//获取该legend组允许选中的个数
        if (a != -1) {//如果当前选中的位置存在
            checked.splice(a, 1);//
        } else {
            if (checked.length >= allowSelectedCount) {
                var _shift = checked.shift();
                $(checks[_shift]).prev("span").css("background-position", "0px 0px");
                checked.push(row);
            } else {
                checked.push(row);
            }
        }
        checks.each(function (i, o) {
            $(o).prev("span").css("background-position", "0px 0px");
            $(o).prop("checked", false);
        });
        var position = ["0px -77px", "0px -51px"];

        checked.forEach(function (c, i) {
            $(checks[c]).prop("checked", true);
        });
        var customCheck = [];
        checks.each(function (i, check) {
            if ($(check).prop("checked")) {
                var c = $(check).attr("index");
                customCheck.push(c);
            }
        });
        customCheck.forEach(function (c, i) {
            switch (i) {
                case 0:
                    $(checks[c]).prev("span").css("background-position", "0px -77px");
                    break;
                case 1:
                    $(checks[c]).prev("span").css("background-position", "0px -51px");
                    break;
            }
        });
        return checked;
    }
    ,
    radioBtn: function (radioObj) {
        var checks = $("input[name='" + radioObj.name + "']");
        checks.each(function (i, o) {
            $(o).prev("span").css("background-position", "0px 0px");
            $(o).prop("checked", false);
        });
        $(radioObj).prev("span").css("background-position", "0px -51px");

    }
    ,
    legStr: function (radio) {
        var checkedVal = [];
        var type = radio.getAttribute("type");
        if (type == "checkBox") {
            var radios = document.getElementsByName(radio.getAttribute("name"));
            for (var i = 0; i < radios.length; i++) {
                if (radios[i].checked == true) {
                    checkedVal.push(radios[i].value);
                }
            }
            return checkedVal;
        } else {
            return [radio.value];
        }

    }
    ,
    getYearWeekState: function (dateStr) {
        if (dateStr != "") {
            var dateArray = dateStr.split("-");
            var a = dateArray[0];
            var b = dateArray[1];
            var c = dateArray[2];
            /*
             date1是当前日期
             date2是当年第一天
             d是当前日期是今年第多少天
             用d + 当前年的第一天的周差距的和在除以7就是本年第几周
             */
            var date1 = new Date(a, parseInt(b) - 1, c), date2 = new Date(a, 0, 1),
                d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
            //console.log( util.getWeekStartDate(date1)+ ":::" + util.getWeekEndDate(date1));
            //console.log(date1.Format("yyyy-MM-dd"));
            return util.getWeekStartDate(date1) + "-" + util.getWeekEndDate(date1);
            //return dateStr;
            //return a.substr(2, 4) + "年第" + Math.ceil((d + ((date2.getDay() + 1) - 1)) / 7) +
            //    "周";
        } else {
            return "";
        }
    }
    ,
//获得本周的开端日期
    getWeekStartDate: function (date) {
        var year = date.getYear();
        year += (year < 2000) ? 1900 : 0; //
        var weekStartDate = new Date(year, date.getMonth(), date.getDate() - date.getDay() + 1);
        return util.formatDate(weekStartDate);
    }
    ,
    getWeekEndDate: function (date) {
        var year = date.getYear();
        year += (year < 2000) ? 1900 : 0; //
        var weekEndDate = new Date(year, date.getMonth(), date.getDate() + (7 - date.getDay()));
        return util.formatDate(weekEndDate);
    }
    ,
    formatDate: function (date) {
        var myyear = date.getFullYear();
        var mymonth = date.getMonth() + 1;
        var myweekday = date.getDate();

        if (mymonth < 10) {
            mymonth = "0" + mymonth;
        }
        if (myweekday < 10) {
            myweekday = "0" + myweekday;
        }
        return (myyear + "/" + mymonth + "/" + myweekday);
    }
    ,
    chartEmpty: function (chartConfig) {
        var _emptyDiv = $("<div/>");
        _emptyDiv.attr({
            style: 'width:100%;height:100%;z-index:9;background:#f0f0f0; position:relative; '

        });
        var _spn = $("<span/>");
        _spn.attr({
            style: ' display:block;vertical-align: middle; color:#000;text-align:center;z-index:9; position:absolute; top:45%;  left:45% '

        });
        _spn.html("暂无数据");
        _emptyDiv.append(_spn);
        $("#" + chartConfig.id).empty().append(_emptyDiv);
    }
    ,
    existData: function (final_result) {
        var count = false;
        if (final_result.length) {
            final_result.forEach(function (item) {
                item.quota.forEach(function (q) {
                    if (q > 0) {
                        count = true;
                    }
                });
            });
        }
        return count;
    }
    ,
    getEquipmentData: function (json, selected) {
        var count = util.existData(json);
        if (count) {
            json.forEach(function (e) {
                var tmpData = [];
                var _value = []
                for (var i = 0; i < e.key.length; i++) {
                    var _key = e.key[i] == "-" ? "未知 " : e.key[i];
                    if (selected) {
                        tmpData.push(chartUtils.getCustomDevice(_key, selected.field));
                    } else {
                        tmpData.push(_key);
                    }
                    _value.push(e.quota[i]);
                }
                e.key = tmpData;
                e.quota = _value;
                e.label = chartUtils.convertChinese(e.label);
            });
        }
    }
    ,
    getEquipmentDataCompare: function (data, selected, _dateTime) {
        var final_result = [];
        data.forEach(function (q, index) {
            var json = JSON.parse(eval("(" + q.data + ")").toString());
            json.forEach(function (item) {
                var _label = _dateTime[index] + ":" + chartUtils.convertChinese(item.label);
                var _key = [];
                var _val = [];
                item.key.forEach(function (k, i) {
                    var _formatKey = item.key[i] == "-" ? "未知 " : item.key[i];
                    if (selected) {
                        _key.push(chartUtils.getCustomDevice(_formatKey, selected.field));
                    } else {
                        _key.push(_formatKey);
                    }
                });
                item.key = _key;
                item.label = _label;
                final_result.push(item);
            });
        });
        return final_result;
    }
    ,
    chartResize: function (chartConfig) {
        chartConfig.instance = echarts.init(document.getElementById(chartConfig.id));
        window.addEventListener("resize", function () {
            chartConfig.instance.resize()
        })
    }
}