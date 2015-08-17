/*
 * Map对象, 实现Map功能
 *
 * 接口:
 * size()     获取Map元素个数
 * isEmpty()    判断Map是否为空
 * clear()     删除Map所有元素
 * put(key, value)   向Map中增加元素（key, value)
 * remove(key)    删除指定key的元素，成功返回true, 失败返回false
 * get(key)    获取指定key的元素值value，失败返回NULL
 * element(index)   获取指定索引的元素(使用element.key, element.value获取key和value), 失败返回NULL
 * containsKey(key)  判断Map中是否含有指定KEY的元素
 * containsValue(value) 判断Map中是否含有指定VALUE的元素
 * values()    获取Map中所有value的数组（Array）
 * keys()     获取Map中所有key的数组（Array）
 *
 * ex:
 * var map = new Map();
 *
 * map.put("key", "value");
 * var val = map.get("key")
 * ……
 *
 */
function Map() {
    this.elements = [];

    //获取Map元素个数
    this.size = function () {
        return this.elements.length;
    };

    //判断Map是否为空
    this.isEmpty = function () {
        return (this.elements.length < 1);
    };

    //删除Map所有元素
    this.clear = function () {
        this.elements = [];
    };

    //向Map中增加元素（key, value)
    this.put = function (_key, _value) {
        if (this.get(_key) != null)
            this.remove(_key);
        this.elements.push({
            key: _key,
            value: _value
        });
    };

    //删除指定key的元素，成功返回true，失败返回false
    this.remove = function (_key) {
        var bln = false;
        try {
            for (var i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    this.elements.splice(i, 1);
                    return true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };

    //获取指定key的元素值value，失败返回NULL
    this.get = function (_key) {
        try {
            for (var i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    return this.elements[i].value;
                }
            }
        } catch (e) {
            return null;
        }
    };

    //获取指定索引的元素(使用element.key, element.value获取key和value), 失败返回NULL
    this.element = function (_index) {
        if (_index < 0 || _index >= this.elements.length) {
            return null;
        }
        return this.elements[_index];
    };

    //判断Map中是否含有指定key的元素
    this.containsKey = function (_key) {
        var bln = false;
        try {
            for (var i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    bln = true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };

    //判断Map中是否含有指定value的元素
    this.containsValue = function (_value) {
        var bln = false;
        try {
            for (var i = 0; i < this.elements.length; i++) {
                if (this.elements[i].value == _value) {
                    bln = true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };

    //获取Map中所有value的数组（Array）
    this.values = function () {
        var arr = [];
        for (var i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].value);
        }
        return arr;
    };

    //获取Map中所有key的数组（Array）
    this.keys = function () {
        var arr = [];
        for (var i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].key);
        }
        return arr;
    };
}