/**
 * Created by yousheng on 15/3/24.
 */
//typeOption={type:"xxxxx",data:object....}
var chartUtils = {
    convertEnglish: function (chi) {
        switch (chi) {
            case "访客数(UV)":
                return "uv";
            case "跳出率":
                return "outRate";
            case "抵达率":
                return "arrivedRate";
                break;
            case "平均访问时长":
                return "avgTime";
                break;
            case "页面转化":
                return "pageConversion";
                break;
            case "转化次数":
                return "conversions";
                break;
            case "IP数":
                return "ip";
                break;
            case "访问次数":
                return "vc";
                break;
            case "新访客数":
                return "nuv";
                break;
            case "新访客比率":
                return "nuvRate";
                break;
            case "消费":
                return "cost";
                break;
            case "点击量":
                return "click";
                break;
            case "点击率":
                return "ctr";
                break;
            case "展现量":
                return "impression";
                break;
            case "平均点击价格":
                return "cpc";
                break;
            case "平均访问页数":
                return "avgPage";
                break;
            case "平均转化成本(事件)":
                return "transformCost";
                break;
            case "转化率":
                return "crate";
                break;
            case "事件点击总数":
                return "clickTotal";
            case "唯一访客事件数":
                return "visitNum";
            case "平均转化成本(页面)":
                return "avgCost";
                break;
            case "收益":
                return "benefit";
                break;
            case "利润":
                return "profit";
                break;
            case "订单数":
                return "orderNum";
                break;
            case "订单金额":
                return "orderMoney";
                break;
            case "订单转化率":
                return "orderNumRate";
                break;
            default :
                return "pv";
        }
    },
    convertChinese: function (eng) {
        switch (eng) {
            case "uv":
                return "访客数(UV)";
            case "outRate":
                return "跳出率";
            case "arrivedRate":
                return "抵达率";
                break;
            case "avgTime":
                return "平均访问时长";
                break;
            case "pageConversion":
                return "页面转化";
            case "conversions":
                return "转化次数";
            case "ip":
                return "IP数";
            case "vc":
                return "访问次数";
            case "nuv":
                return "新访客数";
            case "nuvRate":
                return "新访客比率";
            case "cost":
                return "消费";
            case "click":
                return "点击量";
            case "ctr":
                return "点击率";
            case "impression":
                return "展现量";
            case "cpc":
                return "平均点击价格";
            case "avgPage":
                return "平均访问页数";
                break;
            case "transformCost":
                return "平均转化成本(事件)";
                break;
            case "avgCost":
                return "平均转化成本(页面)";
                break;
            case "crate":
                return "转化率";
                break;
            case "clickTotal":
                return "事件点击总数";
            case "visitNum":
                return "唯一访客事件数";
            case "benefit":
                return "收益";
                break;
            case "profit":
                return "利润";
                break;
            case "orderNum":
                return "订单数";
                break;
            case "orderMoney":
                return "订单金额";
                break;
            case "orderNumRate":
                return "订单转化率";
                break;
            default :
                return "浏览量(PV)";
        }
    },
    getDevice: function (number) {
        switch (Number(number)) {
            case 0:
                return "PC"
                break;
            case 1:
                return "移动";
                break;
            default :
                return "其他";
                break;
        }
    },
    getLinked: function (number) {
        switch (Number(number)) {
            case 0:
                return "内站访问";
                break;
            case 1:
                return "直接访问";
                break;
            case 2:
                return "搜索引擎";
                break;
            default :
                return "外部链接";
        }
    },
    getLanguage: function (str) {
        switch (str) {
            case "zh-CN":
                return "简体中文";
                break;
            case "zh-cn":
                return "繁体中文";
                break;
            case "en-US":
                return "英文";
                break;
            default :
                return "其他";
        }
    },
    getCustomDevice: function (val, dimension) {
        switch (dimension.toString()) {
            case "pm":
                return this.getDevice(val);
                break;
            case "ja":
                return this.getSupport(val);
                break;
            case "ck":
                return this.getSupport(val);
                break;
            case "lg":
                return this.getLanguage(val);
                break;
            default :
                return val;
        }
    },
    getSupport: function (number) {
        if (number == "1") {
            return "支持";
        } else {
            return "不支持";
        }
    },
    convertType: function (str) {
        switch (str) {
            case "跳出率":
                return {label: str, type: 'percent'}
                break;
            case "抵达率":
                return {label: str, type: 'percent'}
                break;
            case "新访客比率":
                return {label: str, type: 'percent'}
                break;
            case "平均访问时长":
                return {label: str, type: 'time'}
                break;
            default:
                return {label: str, type: 'number'}
        }
    },
    getObjectTime: function (json, _times, config) {
        if (config.keyFormat == "day") {
            var time = [];
            json.forEach(function (e) {
                var _time = new Date(e.key).Format("yyyy-MM-dd hh:mm:ss");
                if ((_times[1] - _times[0]) == 0) {
                    config.keyFormat = "none";
                    time.push(Number(_time.substring(10, 13)));
                } else {
                    time.push(_time.substr(0, 10));
                }
            });
            return time
        }
        if ((_times[1] - _times[0]) > 0) {
            var time = [];
            json.forEach(function (e) {
                time.push((e.key_as_string).toString());
            });
            config.keyFormat = "day";
            return time
        } else {
            var time = [];
            json.forEach(function (e) {
                var _time = new Date(e.key).Format("yyyy-MM-dd hh:mm:ss");
                if ((_times[1] - _times[0]) == 0) {
                    time.push(Number(_time.substring(10, 13)));
                } else {
                    time.push(_time.substr(0, 10));
                }
            });
            return time
        }

    },
    getObject: function (json, key, types) {
        var val = [];
        json.forEach(function (e) {
            var _val = 0;
            var buckets = e.dimension.buckets
            if (buckets) {
                buckets.forEach(function (buc) {
                    if (buc) {
                        if (buc.key == key) {
                            var aggs = types.toString();
                            _val = chartUtils.getAggs(buc, aggs);
                        }
                    }
                })
            }
            val.push(_val);
        });
        return val;
    },
    getRf_type: function (json, times, labelType, types, config, topN) {
        var time = chartUtils.getObjectTime(json, times, config);
        var label = chartUtils.getLabel(json);//去重
        var result = [];
        label.forEach(function (label) {
            var tmp = {};
            var val = chartUtils.getObject(json, label, types);
            if (labelType) {
                tmp['label'] = label;
            } else {
                tmp['label'] = chartUtils.getLinked(label);
            }
            tmp['key'] = time;
            tmp['quota'] = val;
            result.push(tmp);
        });
        //排序top10
        result.forEach(function (item) {
            var count = 0;
            item.quota.forEach(function (q) {
                count += Number(q);
            });
            item.totalCount = count;
        });
        result.sort(chartUtils.by("totalCount"));
        var baseResult = result;
        if (topN) {
            if (result.length > topN) {
                result = result.slice(0, topN);
            }
            return [result, baseResult.slice(0, 10)];
        } else {
            if (result.length > 3) {
                result = result.slice(0, 3);
            }
            return result;
        }
    },
    getLabel: function (json) {
        var label = [];
        json.forEach(function (e) {
            var buckets = e.dimension.buckets;
            if (buckets) {
                buckets.forEach(function (item) {
                    if (item.key != '-')
                        label.push(item.key);
                });
            } else {
                label.push("暂无数据");
            }
        });
        return label.removal();
    },
    getAggs: function (buc, aggs) {
        switch (aggs) {
            case "nuv":
                return buc.new_visitor_aggs.nuv_aggs.value;
                break;
            case "uv":
                return buc.uv_aggs.value;
                break;
            case "vc":
                return buc.vc_aggs.vc_aggs.value;
                break;
            default :
                if (buc[aggs + "_aggs"]) {
                    return buc[aggs + "_aggs"].value;
                } else {
                    return 0;
                }
        }
    },
    arrayMerge: function (a, b) {
        if (b.length > a.length) {
            var t = a
            a = b
            b = t
        }
        return a.map(function (v, i) {
            return v + (b[i] || 0)
        })
    },
    getEnginePie: function (data, split, chart) {
        if (data) {
            var result_data = [];
            var _label = [];
            var _data = []
            var result = {};
            data.forEach(function (e) {

                var _val = 0;
                e.quota.forEach(function (val) {
                    if (val != 0) {
                        _val += val;
                    }
                });
                if (_val != 0) {
                    _data.push(_val);
                    if (split) {
                        _label.push(e.label.split(split)[0]);
                    } else {
                        _label.push(e.label);
                    }
                }
            });
            result["key"] = _label;
            result["quota"] = _data;
            result["label"] = chart.types.toString();
            result_data.push(result);
            return result_data;
        }
        return data;
    },
    getByHourByDayData: function (data) {
        var json = JSON.parse(eval("(" + data + ")").toString());
        var final_result = [];
        json.forEach(function (data) {
            var tmp = {};
            var label = [];
            var key = [];
            var quota = [];
            label.push(data.label);
            var time = [];
            for (var i = 0; i < data.key.length; i++) {
                for (var j = 0; j < 24; j++) {
                    if (i == j) {
                        time.push(j);
                    }
                }
            }
            var length = data.quota.length / 24;
            var final_tmp = [];
            for (var i = 0; i < 24; i++) {
                final_tmp.push(0);
            }
            for (var i = 0; i < length; i++) {
                var _tmp = [];
                for (var j = i * 24; j < (i + 1) * 24; j++) {
                    switch (data.label) {
                        case "avgTime":
                            _tmp.push(parseInt(data.quota[j] / length));
                            break;
                        case "outRate":
                            _tmp.push(parseInt(data.quota[j] / length));
                            break;
                        case "nuvRate":
                            _tmp.push(parseInt(data.quota[j] / length));
                            break;
                        default :
                            _tmp.push(parseInt(data.quota[j]));
                            break;
                    }

                }
                final_tmp = chartUtils.arrayMerge(final_tmp, _tmp);
            }
            tmp["label"] = chartUtils.convertChinese(data.label);
            tmp["key"] = time;
            tmp["quota"] = final_tmp;
            final_result.push(tmp);
        });
        return final_result;
    },
    getDataByDay: function (data) {//按日数据累加
        var json = JSON.parse(eval("(" + data + ")").toString());
        var final_result = [];
        json.forEach(function (item) {
            var _tmp = {};
            var count = 0;
            var type = item.label;
            item.quota.forEach(function (quota) {
                if (type == "avgTime" || type == "outRate" || type == "arrivedRate" || type == "nuvRate", type == "avgPage") {
                    count += Number(quota);
                } else {
                    count += quota;
                }
            });
            if (type == "avgTime" || type == "outRate" || type == "arrivedRate" || type == "nuvRate", type == "avgPage") {
                count = parseFloat(count / item.quota.length).toFixed(2);
            }
            _tmp["label"] = chartUtils.convertChinese(item.label);
            _tmp["quota"] = [count];
            if (item.key[0]) {
                item.key[0] = new Date(item.key[0]).Format("yyyy-MM-dd hh:mm:ss")
                _tmp["key"] = [item.key[0].substring(0, 10)];
            } else {
                _tmp["key"] = [new Date().Format("yyyy-MM-dd")];
            }
            final_result.push(_tmp);
        });
        return final_result;
    },
    getHistoryData: function (data, quotas) {
        var final_result = [];
        quotas.forEach(function (quota) {
            var _tmp = {};
            var _key = [];
            var _val = [];
            data.forEach(function (item) {
                if (quota == "arrivedRate" || quota == "outRate" || quota == "nuvRate") {
                    _val.push(Number(item[quota].split("%")[0]));
                    _key.push(item["period"]);
                } else if (quota == "avgTime") {
                    var hour = _val.push(Number(item[quota].split(":")[0]));
                    var min = _val.push(Number(item[quota].split(":")[1]));
                    var sec = _val.push(Number(item[quota].split(":")[2]));
                    var count = (((hour * 60) * 60) + (min * 60) + sec) / 1000;
                    _val.push(count);
                    _key.push(item["period"]);
                } else {
                    _val.push(item[quota]);
                    _key.push(item["period"]);
                }
            });
            _tmp["label"] = chartUtils.convertChinese(quota);
            _tmp["quota"] = _val;
            _tmp["key"] = _key;
            final_result.push(_tmp);
        });
        return final_result;
    },
    getExternalinkPie: function (result, split) {
        if (result) {
            var regex = /(baidu)+|(sogou)+|(haosou)+/, final_result = [];
            result.forEach(function (e) {
                var _val = {}
                if (!regex.test(e.label) && e.label != '-') {
                    var _label = e.label;
                    if (_label) {
                        if (split) {
                            if (_label.indexOf(split) > -1) {
                                _label = _label.split(split)[0];
                            }
                        }
                    }
                    _val['label'] = _label;
                    _val['key'] = e.key;
                    _val['quota'] = e.quota;
                    final_result.push(_val);
                }
            });
            return final_result;
        }
        return result
    },
    by: function (name) {
        return function (o, p) {
            var a, b;
            if (typeof o === "object" && typeof p === "object" && o && p) {
                a = o[name];
                b = p[name];
                if (a === b) {
                    return 0;
                }
                if (typeof a === typeof b) {
                    return a < b ? 1 : -1;
                }
                return typeof a < typeof b ? 1 : -1;
            }
            else {
                throw ("error");
            }
        }
    },
    NumAscSort: function (a, b) {
        return a - b;
    },

    NumDescSort: function (a, b) {
        return b - a;
    },
    addStep: function (json, number) {
        json.forEach(function (e) {
            var _key = [];
            var _value = [];
            for (var i = 0; i < number / 2; i++) {
                _key.push("");
                _value.push(0);
            }
            for (var i = 0; i < e.key.length; i++) {
                _key.push(e.key[i]);
                _value.push(e.quota[i]);
            }
            for (var i = number / 2; i < number; i++) {
                _key.push("");
                _value.push(0);
            }

            e.key = _key;
            e.quota = _value;
        });

    },
    noFormatConvertLabel: function (json) {
        json.forEach(function (i, o) {
            i.label = chartUtils.convertChinese(i.label);
        });
    },
    formatDate: function (esJson) {
        esJson.forEach(function (a) {
            var formatKey = [];
            a.key.forEach(function (e) {
                e = new Date(e).Format("yyyy-MM-dd hh:mm:ss")
                formatKey.push(e.substring(0, 10));
            });
            a.key = formatKey;
            a.label = chartUtils.convertChinese(a.label);
        });
    },
    addSemData: function (esJson, semJson, semType) {
        var _tmp = {};
        var _value = [];
        //console.log(semJson.data.length);
        if (semJson.data.length > 0 && esJson.length) {
            esJson[0].key.forEach(function (esItem, index) {
                _value.push(semJson.data[index][semType]);
            });
            _tmp["label"] = chartUtils.convertChinese(semType);
            _tmp["key"] = esJson[0].key;
            _tmp["quota"] = _value;
            esJson.push(_tmp);
        }
        else {
            var key = [];
            esJson[0].key.forEach(function (esItem, index) {
                _value.push(0);
                key.push(esItem.substring(0, 10));
            });
            _tmp["label"] = chartUtils.convertChinese(semType);
            _tmp["key"] = key;
            _tmp["quota"] = _value;
            esJson.push(_tmp);
        }
    },
    getSemBaseData: function (quotas, final_result, semName) {
        var total_result = [];
        quotas.forEach(function (quota) {
            var _key = [];
            var _value = [];
            var _tmp = {};
            final_result[0].data.forEach(function (e, i) {
                _key.push(e[semName]);
                if (e[quota]) {
                    _value.push(e[quota]);
                } else {
                    _value.push(0);
                }
            });
            _tmp["label"] = chartUtils.convertChinese(quota);
            _tmp["key"] = _key;
            _tmp["quota"] = _value;
            total_result.push(_tmp);
        });
        return total_result;
    }
    ,
    getTimeOffset: function (start, end) {
        var d = new Date();
        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        var times = year + "-" + month + "-" + day;
        var newstr_start = (start + " 00:00:00").replace(/-/g, '/');
        var newstr_end = (end + " 00:00:00").replace(/-/g, '/');
        var newstr_now = (times + " 00:00:00").replace(/-/g, '/');

        var date_start = new Date(newstr_start);
        var date_end = new Date(newstr_end);
        var date_now = new Date(newstr_now);

        var _finalStart = date_start.getTime().toString().substr(0, 10);
        var _finalEnd = date_end.getTime().toString().substr(0, 10);
        var _finalNow = date_now.getTime().toString().substr(0, 10);
        var times = Math.round(new Date().getTime() / 1000)
        return [(_finalStart - _finalNow) / (24 * 3600), (_finalEnd - _finalNow) / (24 * 3600)];
    },
    getSetOffTime: function (start, end, formattype) {
        var d = new Date();
        var timeSet = d.getTime();
        var startTime = start * 86400000;
        var endTime = end * 86400000;
        var date1 = timeSet + startTime;
        var date2 = timeSet + endTime;
        var a = new Date(date1).Format("yyyy-MM-dd");
        var b = new Date(date2).Format("yyyy-MM-dd");
        if (formattype) {
            a = new Date(date1).Format("yyyy/MM/dd");
            b = new Date(date2).Format("yyyy/MM/dd");
        }
        return [a, b];
    },
    getWeekTime: function (start, end) {
        return chartUtils.getSetOffTime(start, end, "/");
    },
    getQuotaType: function (quota) {
        switch (quota) {
            case "click":
                return "sem";
                break;
            case "impression":
                return "sem";
                break;
            case "cost":
                return "sem";
                break;
            case "ctr":
                return "sem";
                break;
            case "cpc":
                return "sem";
                break;
            default:
                return "es";
                break;
        }
    }
    ,
    qAll: function (quotas) {
        var quotaArray = [];
        var semQuota = [];
        var esQuota = [];
        quotas.forEach(function (quota) {
            var quotaType = chartUtils.getQuotaType(quota);
            if (quotaType == "sem") {
                semQuota.push(quota);
            } else {
                esQuota.push(quota);
            }
        });
        quotaArray.push(semQuota);
        quotaArray.push(esQuota);
        var requestParams = []
        var semParams = "";
        var esParams = [];
        quotaArray[0].forEach(function (quota) {
            semParams += quota + "-";
        });
        quotaArray[1].forEach(function (quota) {
            esParams.push(quota);
        });
        requestParams.push(semParams);
        requestParams.push(esParams);
        return requestParams;
    },
    getSearchTypeResult: function (quotas, res) {
        var final_result = [];
        if (res.length > 1) {
            quotas.forEach(function (i, o) {
                var _tmp = {};
                if (o == 0) {
                    var semCount = 0;
                    res[o].data.forEach(function (j) {
                        semCount += j[i];
                    });
                    if (i == "ctr" || i == "cpc") {
                        semCount = parseFloat(semCount / res[o].data.length).toFixed(2);
                    }
                    _tmp["label"] = chartUtils.convertChinese(i);
                    _tmp["quota"] = [semCount];
                    _tmp["key"] = ["搜索推广"];
                    final_result.push(_tmp);
                } else {
                    var esJson = JSON.parse(eval("(" + res[o].data + ")").toString());
                    if (esJson[0]) {
                        var esCount = 0;
                        esJson[0].quota.forEach(function (j) {
                            if (i == "outRate" || i == "nuvRate" || i == "avgPage") {
                                esCount += parseFloat(j);
                            } else {
                                esCount += j;
                            }
                        });
                        _tmp["label"] = chartUtils.convertChinese(i);
                        _tmp["quota"] = [esCount];
                        _tmp["key"] = ["搜索推广"];
                        final_result.push(_tmp);
                    } else {
                        _tmp["label"] = chartUtils.convertChinese(i);
                        _tmp["quota"] = [0];
                        _tmp["key"] = ["搜索推广"];
                        final_result.push(_tmp);
                    }
                }
            });
        } else {
            if (res[0].data.indexOf("label") > -1) {
                var esJson = JSON.parse(eval("(" + res[0].data + ")").toString());
                if (esJson.length) {
                    quotas.forEach(function (quota, i) {
                        var esCount = 0;
                        var _tmp = {};
                        if (esJson[i]) {
                            esJson[i].quota.forEach(function (k) {
                                if (quota == "outRate" || quota == "nuvRate" || quota == "avgPage") {
                                    esCount += parseFloat(k);
                                } else {
                                    esCount += k;
                                }
                            });
                            _tmp["label"] = chartUtils.convertChinese(quota)
                            _tmp["quota"] = [esCount];
                            _tmp["key"] = ["搜索推广"];
                            final_result.push(_tmp);
                        } else {
                            _tmp["label"] = chartUtils.convertChinese(quota)
                            _tmp["quota"] = [0];
                            _tmp["key"] = ["搜索推广"];
                            final_result.push(_tmp);
                        }
                    });
                }
            } else {
                if (res.length) {
                    quotas.forEach(function (quota, o) {
                        var _tmp = {};
                        var semCount = 0;
                        if (res[0].data.indexOf('[') == -1) {
                            //console.log(res[0].data);
                            res[0].data.forEach(function (i) {
                                semCount += i[quota];
                            });
                            if (quota == "ctr" || quota == "cpc") {
                                semCount = parseFloat(semCount / res[0].data.length).toFixed(2);
                            }
                        }
                        _tmp["label"] = chartUtils.convertChinese(quota);
                        _tmp["key"] = ["搜索推广"];
                        _tmp["quota"] = [semCount];
                        final_result.push(_tmp);
                    });
                }
            }
        }
        return final_result;
    }
    ,
    getXType: function (config, interval, start) {
        switch (interval) {
            case 604800000:
                config["keyFormat"] = "week";
                break;
            case 2592000000:
                config["keyFormat"] = "month";
                break;
            default :
                config["keyFormat"] = "day";
        }
    }
    ,
    compareTo: function (res, compareStr) {
        var final_result = [];
        res.forEach(function (item, o) {
            var json = JSON.parse(eval("(" + item.data + ")").toString());
            if (o == 0) {
                json[0].label = compareStr[0] + ":" + json[0].label;
            } else {
                json[0].label = compareStr[1] + ":" + json[0].label;
            }
            final_result.push(json[0]);
        });
        return final_result;
    },
    getDateStampCount: function (AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
        var startStr = dd.getFullYear() + "-" + (dd.getMonth() + 1) + "-" + dd.getDate();
        return startStr;
    },
    getDateStamp: function (count) {
        return [chartUtils.getDateStampCount(count), chartUtils.getDateStampCount(count - 1)];
    },
    getSurveryDataByOneDay: function (final_result, quota, estype) {
        var chart_result = [];
        var tmp = [];
        var _semData = {};
        var esJson = JSON.parse(eval("(" + final_result[1].data + ")").toString());
        var esDate = !esJson.length ? null : esJson[0].key[0];
        //console.log(esJson);
        if (final_result[0].data.length) {
            if (quota == "impression") {
                tmp.push(final_result[0].data[0][quota]);
            } else {
                tmp.push(parseFloat(final_result[0].data[0][quota]).toFixed(2));
            }
            _semData["label"] = chartUtils.convertChinese(quota);
            _semData["quota"] = tmp;
            _semData["key"] = [final_result[0].data[0].date];
            chart_result.push(_semData);
        } else {
            if (esDate) {
                esDate = new Date(esDate).Format("yyyy-MM-dd hh:mm:ss")
                chart_result.push({
                    label: chartUtils.convertChinese(quota),
                    quota: [0],
                    key: [esDate.substring(0, 10)]
                });
            } else {
                chart_result.push({
                    label: chartUtils.convertChinese(quota),
                    quota: [0],
                    key: ['']
                });
            }
        }
        var totalCount = 0;
        var _esData = {};
        if (esJson.length) {
            esJson[0].quota.forEach(function (e) {
                totalCount += Number(e);
            });

            if (estype == "outRate") {
                totalCount = parseFloat(totalCount / esJson[0].quota.length).toFixed(2);
            }
        }
        _esData["label"] = chartUtils.convertChinese(estype);
        _esData["quota"] = [totalCount];
        if (esDate) {
            esDate = new Date(esDate).Format("yyyy-MM-dd hh:mm:ss");
            _esData["key"] = [esDate.substring(0, 10)];
        } else {
            _esData["key"] = [''];
        }
        chart_result.push(_esData);
        return chart_result;
    }
}
var formUtils = {
    vaildateSubmit: function (ele) {
        var formData = {};
        $(ele).find("input[type='text']").each(function (i, o) {
            var _inputName = $(o).attr('name');
            if (_inputName) {
                if ($(o).val()) {
                    formData[_inputName] = $(o).val();
                }
            }
        });

        //$(ele).find("input[type='time']").each(function (i, o) {
        //    var _inputName = $(o).attr('name');
        //    if (_inputName) {
        //        if ($(o).val()) {
        //            formData[_inputName] = $(o).val();
        //        }
        //    }
        //});

        $(ele).find("input[type='radio']").each(function (i, o) {
            var _inputName = $(o).attr('name');
            if ($(o).prop('checked')) {
                formData[_inputName] = $(o).val();
            }
        });

        $(ele).find("select").each(function (i, o) {
            var _inputName = $(o).attr('name');
            if (_inputName) {
                formData[_inputName] = $(o).val();
            }
        });

        return formData;
    },
    validateEmail: function (str, formData) {
        var errorCount = {ec: 1, info: '邮箱地址不能为空!'};
        var regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        var adData = [];
        var mailData = [];
        if (str) {
            if (str.indexOf(",") > -1) {
                adData = str.split(",");
                adData.forEach(function (item, index) {
                    var email = regex.test(item);
                    if (!email) {
                        errorCount["ec"]++;
                        errorCount["info"] = "第" + (index + 1) + "个邮箱地址输入不正确!请检查邮箱地址!";
                    } else {
                        mailData.push(item);
                        errorCount["ec"] = 0;
                    }
                });
                formData.mail_address = mailData;
                return errorCount;
            }
            else {
                var email = regex.test(str);
                if (email) {
                    mailData.push(str);
                    errorCount["ec"] = 0
                    formData.mail_address = mailData;
                    return errorCount;
                } else {
                    errorCount["ec"] = 1;
                    errorCount["info"] = "邮箱地址输入不正确!";
                    return errorCount;
                }
            }
        } else {
            return errorCount;
        }
    },
    rendererMailData: function (docs, ele) {
        if (docs.length) {
            var mailData = docs[0];
            ele.find("input[type='text']").each(function (i, o) {
                var _name = $(o).attr('name');
                if (_name) {
                    $(o).val(mailData[_name]);
                }
                var _type = $(o).attr("ng-model");
                if (_type) {
                    var time = mailData["schedule_date"].split(":");
                    switch (_type) {
                        case "hours":
                            $(o).val(time[0]);
                            break;
                        case "minutes":
                            $(o).val(time[1]);
                            break;
                    }
                }
            });


            var radioArray = [];
            ele.find("input[type='radio']").each(function (i, o) {
                var _name = $(o).attr('name');
                radioArray.push(_name);
            });
            radioArray = radioArray.removal();

            radioArray.forEach(function (item) {
                $("input[name='" + item + "']:eq(" + mailData[item] + ")").attr("checked", "checked");
            });
        }
    }
}
//去重
Array.prototype.removal = function () {
    this.sort();
    var re = [this[0]];
    for (var i = 1; i < this.length; i++) {
        if (this[i] !== re[re.length - 1]) {
            re.push(this[i]);
        }
    }
    return re;
}
function chart_factory(params) {


    params['type']
    var options = {
        calculable: false,
        animation: true,
        title: {
            show: true
        },
        toolbox: {
            show: false
        },
        tooltip: {
            show: true,
            trigger: 'item'
        },
        legend: {
            show: true,
            orient: "horizontal" // vertical
        }
    }
}