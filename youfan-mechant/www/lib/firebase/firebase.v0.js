/**
 * Created by perfection on 15-8-18.
 */
/*! @license Firebase v2.0.4 - License: https://www.firebase.com/terms/terms-of-service.html */
(function () {
    var h, aa = this;

    function n(a) {
        return void 0 !== a
    }

    function ba() {
    }

    function ca(a) {
        a.Qb = function () {
            return a.ef ? a.ef : a.ef = new a
        }
    }

    function da(a) {
        var b = typeof a;
        if ("object" == b)if (a) {
            if (a instanceof Array)return "array";
            if (a instanceof Object)return b;
            var c = Object.prototype.toString.call(a);
            if ("[object Window]" == c)return "object";
            if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice"))return "array";
            if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call"))return "function"
        } else return "null";
        else if ("function" == b && "undefined" == typeof a.call)return "object";
        return b
    }

    function ea(a) {
        return "array" == da(a)
    }

    function fa(a) {
        var b = da(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    }

    function p(a) {
        return "string" == typeof a
    }

    function ga(a) {
        return "number" == typeof a
    }

    function ha(a) {
        return "function" == da(a)
    }

    function ia(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    }

    function ja(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }

    function ka(a, b, c) {
        if (!a)throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function () {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c)
            }
        }
        return function () {
            return a.apply(b, arguments)
        }
    }

    function q(a, b, c) {
        q = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ja : ka;
        return q.apply(null, arguments)
    }

    function la(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function () {
            var b = c.slice();
            b.push.apply(b, arguments);
            return a.apply(this, b)
        }
    }

    var ma = Date.now || function () {
            return +new Date
        };

    function na(a, b) {
        function c() {
        }

        c.prototype = b.prototype;
        a.oc = b.prototype;
        a.prototype = new c;
        a.Ag = function (a, c, f) {
            return b.prototype[c].apply(a, Array.prototype.slice.call(arguments, 2))
        }
    };
    function oa(a) {
        a = String(a);
        if (/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, "")))try {
            return eval("(" + a + ")")
        } catch (b) {
        }
        throw Error("Invalid JSON string: " + a);
    }

    function pa() {
        this.Id = void 0
    }

    function qa(a, b, c) {
        switch (typeof b) {
            case "string":
                ra(b, c);
                break;
            case "number":
                c.push(isFinite(b) && !isNaN(b) ? b : "null");
                break;
            case "boolean":
                c.push(b);
                break;
            case "undefined":
                c.push("null");
                break;
            case "object":
                if (null == b) {
                    c.push("null");
                    break
                }
                if (ea(b)) {
                    var d = b.length;
                    c.push("[");
                    for (var e = "", f = 0; f < d; f++)c.push(e), e = b[f], qa(a, a.Id ? a.Id.call(b, String(f), e) : e, c), e = ",";
                    c.push("]");
                    break
                }
                c.push("{");
                d = "";
                for (f in b)Object.prototype.hasOwnProperty.call(b, f) && (e = b[f], "function" != typeof e && (c.push(d), ra(f, c),
                    c.push(":"), qa(a, a.Id ? a.Id.call(b, f, e) : e, c), d = ","));
                c.push("}");
                break;
            case "function":
                break;
            default:
                throw Error("Unknown type: " + typeof b);
        }
    }

    var sa = {
        '"': '\\"',
        "\\": "\\\\",
        "/": "\\/",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t",
        "\x0B": "\\u000b"
    }, ta = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;

    function ra(a, b) {
        b.push('"', a.replace(ta, function (a) {
            if (a in sa)return sa[a];
            var b = a.charCodeAt(0), e = "\\u";
            16 > b ? e += "000" : 256 > b ? e += "00" : 4096 > b && (e += "0");
            return sa[a] = e + b.toString(16)
        }), '"')
    };
    function ua(a) {
        return "undefined" !== typeof JSON && n(JSON.parse) ? JSON.parse(a) : oa(a)
    }

    function t(a) {
        if ("undefined" !== typeof JSON && n(JSON.stringify))a = JSON.stringify(a); else {
            var b = [];
            qa(new pa, a, b);
            a = b.join("")
        }
        return a
    };
    function u(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    }

    function v(a, b) {
        if (Object.prototype.hasOwnProperty.call(a, b))return a[b]
    }

    function va(a, b) {
        for (var c in a)Object.prototype.hasOwnProperty.call(a, c) && b(c, a[c])
    }

    function wa(a) {
        var b = {};
        va(a, function (a, d) {
            b[a] = d
        });
        return b
    };
    function xa(a) {
        this.xc = a;
        this.Hd = "firebase:"
    }

    h = xa.prototype;
    h.set = function (a, b) {
        null == b ? this.xc.removeItem(this.Hd + a) : this.xc.setItem(this.Hd + a, t(b))
    };
    h.get = function (a) {
        a = this.xc.getItem(this.Hd + a);
        return null == a ? null : ua(a)
    };
    h.remove = function (a) {
        this.xc.removeItem(this.Hd + a)
    };
    h.ff = !1;
    h.toString = function () {
        return this.xc.toString()
    };
    function ya() {
        this.ia = {}
    }

    ya.prototype.set = function (a, b) {
        null == b ? delete this.ia[a] : this.ia[a] = b
    };
    ya.prototype.get = function (a) {
        return u(this.ia, a) ? this.ia[a] : null
    };
    ya.prototype.remove = function (a) {
        delete this.ia[a]
    };
    ya.prototype.ff = !0;
    function za(a) {
        try {
            if ("undefined" !== typeof window && "undefined" !== typeof window[a]) {
                var b = window[a];
                b.setItem("firebase:sentinel", "cache");
                b.removeItem("firebase:sentinel");
                return new xa(b)
            }
        } catch (c) {
        }
        return new ya
    }

    var Aa = za("localStorage"), Ba = za("sessionStorage");

    function Ca(a, b, c, d, e) {
        this.host = a.toLowerCase();
        this.domain = this.host.substr(this.host.indexOf(".") + 1);
        this.Cb = b;
        this.yb = c;
        this.yg = d;
        this.Gd = e || "";
        this.Ka = Aa.get("host:" + a) || this.host
    }

    function Da(a, b) {
        b !== a.Ka && (a.Ka = b, "s-" === a.Ka.substr(0, 2) && Aa.set("host:" + a.host, a.Ka))
    }

    Ca.prototype.toString = function () {
        var a = (this.Cb ? "https://" : "http://") + this.host;
        this.Gd && (a += "<" + this.Gd + ">");
        return a
    };
    function Ea() {
        this.Ta = -1
    };
    function Fa() {
        this.Ta = -1;
        this.Ta = 64;
        this.R = [];
        this.be = [];
        this.Af = [];
        this.Dd = [];
        this.Dd[0] = 128;
        for (var a = 1; a < this.Ta; ++a)this.Dd[a] = 0;
        this.Rd = this.Tb = 0;
        this.reset()
    }

    na(Fa, Ea);
    Fa.prototype.reset = function () {
        this.R[0] = 1732584193;
        this.R[1] = 4023233417;
        this.R[2] = 2562383102;
        this.R[3] = 271733878;
        this.R[4] = 3285377520;
        this.Rd = this.Tb = 0
    };
    function Ga(a, b, c) {
        c || (c = 0);
        var d = a.Af;
        if (p(b))for (var e = 0; 16 > e; e++)d[e] = b.charCodeAt(c) << 24 | b.charCodeAt(c + 1) << 16 | b.charCodeAt(c + 2) << 8 | b.charCodeAt(c + 3), c += 4; else for (e = 0; 16 > e; e++)d[e] = b[c] << 24 | b[c + 1] << 16 | b[c + 2] << 8 | b[c + 3], c += 4;
        for (e = 16; 80 > e; e++) {
            var f = d[e - 3] ^ d[e - 8] ^ d[e - 14] ^ d[e - 16];
            d[e] = (f << 1 | f >>> 31) & 4294967295
        }
        b = a.R[0];
        c = a.R[1];
        for (var g = a.R[2], k = a.R[3], l = a.R[4], m, e = 0; 80 > e; e++)40 > e ? 20 > e ? (f = k ^ c & (g ^ k), m = 1518500249) : (f = c ^ g ^ k, m = 1859775393) : 60 > e ? (f = c & g | k & (c | g), m = 2400959708) : (f = c ^ g ^ k, m = 3395469782), f = (b <<
            5 | b >>> 27) + f + l + m + d[e] & 4294967295, l = k, k = g, g = (c << 30 | c >>> 2) & 4294967295, c = b, b = f;
        a.R[0] = a.R[0] + b & 4294967295;
        a.R[1] = a.R[1] + c & 4294967295;
        a.R[2] = a.R[2] + g & 4294967295;
        a.R[3] = a.R[3] + k & 4294967295;
        a.R[4] = a.R[4] + l & 4294967295
    }

    Fa.prototype.update = function (a, b) {
        n(b) || (b = a.length);
        for (var c = b - this.Ta, d = 0, e = this.be, f = this.Tb; d < b;) {
            if (0 == f)for (; d <= c;)Ga(this, a, d), d += this.Ta;
            if (p(a))for (; d < b;) {
                if (e[f] = a.charCodeAt(d), ++f, ++d, f == this.Ta) {
                    Ga(this, e);
                    f = 0;
                    break
                }
            } else for (; d < b;)if (e[f] = a[d], ++f, ++d, f == this.Ta) {
                Ga(this, e);
                f = 0;
                break
            }
        }
        this.Tb = f;
        this.Rd += b
    };
    function Ha() {
        return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ ma()).toString(36)
    };
    var w = Array.prototype, Ia = w.indexOf ? function (a, b, c) {
        return w.indexOf.call(a, b, c)
    } : function (a, b, c) {
        c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
        if (p(a))return p(b) && 1 == b.length ? a.indexOf(b, c) : -1;
        for (; c < a.length; c++)if (c in a && a[c] === b)return c;
        return -1
    }, Ja = w.forEach ? function (a, b, c) {
        w.forEach.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e = p(a) ? a.split("") : a, f = 0; f < d; f++)f in e && b.call(c, e[f], f, a)
    }, Ka = w.filter ? function (a, b, c) {
        return w.filter.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e = [], f = 0, g = p(a) ?
            a.split("") : a, k = 0; k < d; k++)if (k in g) {
            var l = g[k];
            b.call(c, l, k, a) && (e[f++] = l)
        }
        return e
    }, La = w.map ? function (a, b, c) {
        return w.map.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e = Array(d), f = p(a) ? a.split("") : a, g = 0; g < d; g++)g in f && (e[g] = b.call(c, f[g], g, a));
        return e
    }, Ma = w.reduce ? function (a, b, c, d) {
        d && (b = q(b, d));
        return w.reduce.call(a, b, c)
    } : function (a, b, c, d) {
        var e = c;
        Ja(a, function (c, g) {
            e = b.call(d, e, c, g, a)
        });
        return e
    }, Na = w.every ? function (a, b, c) {
        return w.every.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e =
            p(a) ? a.split("") : a, f = 0; f < d; f++)if (f in e && !b.call(c, e[f], f, a))return !1;
        return !0
    };

    function Oa(a, b) {
        var c = Pa(a, b, void 0);
        return 0 > c ? null : p(a) ? a.charAt(c) : a[c]
    }

    function Pa(a, b, c) {
        for (var d = a.length, e = p(a) ? a.split("") : a, f = 0; f < d; f++)if (f in e && b.call(c, e[f], f, a))return f;
        return -1
    }

    function Qa(a, b) {
        var c = Ia(a, b);
        0 <= c && w.splice.call(a, c, 1)
    }

    function Ra(a, b, c, d) {
        return w.splice.apply(a, Sa(arguments, 1))
    }

    function Sa(a, b, c) {
        return 2 >= arguments.length ? w.slice.call(a, b) : w.slice.call(a, b, c)
    }

    function Ta(a, b) {
        a.sort(b || Ua)
    }

    function Ua(a, b) {
        return a > b ? 1 : a < b ? -1 : 0
    };
    var Va;
    a:{
        var Wa = aa.navigator;
        if (Wa) {
            var Xa = Wa.userAgent;
            if (Xa) {
                Va = Xa;
                break a
            }
        }
        Va = ""
    }
    function Ya(a) {
        return -1 != Va.indexOf(a)
    };
    var Za = Ya("Opera") || Ya("OPR"), $a = Ya("Trident") || Ya("MSIE"), ab = Ya("Gecko") && -1 == Va.toLowerCase().indexOf("webkit") && !(Ya("Trident") || Ya("MSIE")), bb = -1 != Va.toLowerCase().indexOf("webkit");
    (function () {
        var a = "", b;
        if (Za && aa.opera)return a = aa.opera.version, ha(a) ? a() : a;
        ab ? b = /rv\:([^\);]+)(\)|;)/ : $a ? b = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : bb && (b = /WebKit\/(\S+)/);
        b && (a = (a = b.exec(Va)) ? a[1] : "");
        return $a && (b = (b = aa.document) ? b.documentMode : void 0, b > parseFloat(a)) ? String(b) : a
    })();
    var cb = null, db = null, eb = null;

    function fb(a, b) {
        if (!fa(a))throw Error("encodeByteArray takes an array as a parameter");
        gb();
        for (var c = b ? db : cb, d = [], e = 0; e < a.length; e += 3) {
            var f = a[e], g = e + 1 < a.length, k = g ? a[e + 1] : 0, l = e + 2 < a.length, m = l ? a[e + 2] : 0, r = f >> 2, f = (f & 3) << 4 | k >> 4, k = (k & 15) << 2 | m >> 6, m = m & 63;
            l || (m = 64, g || (k = 64));
            d.push(c[r], c[f], c[k], c[m])
        }
        return d.join("")
    }

    function gb() {
        if (!cb) {
            cb = {};
            db = {};
            eb = {};
            for (var a = 0; 65 > a; a++)cb[a] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a), db[a] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a), eb[db[a]] = a
        }
    };
    var hb = function () {
        var a = 1;
        return function () {
            return a++
        }
    }();

    function x(a, b) {
        if (!a)throw ib(b);
    }

    function ib(a) {
        return Error("Firebase INTERNAL ASSERT FAILED:" + a)
    }

    function jb(a) {
        try {
            var b;
            if ("undefined" !== typeof atob)b = atob(a); else {
                gb();
                for (var c = eb, d = [], e = 0; e < a.length;) {
                    var f = c[a.charAt(e++)], g = e < a.length ? c[a.charAt(e)] : 0;
                    ++e;
                    var k = e < a.length ? c[a.charAt(e)] : 64;
                    ++e;
                    var l = e < a.length ? c[a.charAt(e)] : 64;
                    ++e;
                    if (null == f || null == g || null == k || null == l)throw Error();
                    d.push(f << 2 | g >> 4);
                    64 != k && (d.push(g << 4 & 240 | k >> 2), 64 != l && d.push(k << 6 & 192 | l))
                }
                if (8192 > d.length)b = String.fromCharCode.apply(null, d); else {
                    a = "";
                    for (c = 0; c < d.length; c += 8192)a += String.fromCharCode.apply(null, Sa(d, c,
                        c + 8192));
                    b = a
                }
            }
            return b
        } catch (m) {
            kb("base64Decode failed: ", m)
        }
        return null
    }

    function lb(a) {
        var b = mb(a);
        a = new Fa;
        a.update(b);
        var b = [], c = 8 * a.Rd;
        56 > a.Tb ? a.update(a.Dd, 56 - a.Tb) : a.update(a.Dd, a.Ta - (a.Tb - 56));
        for (var d = a.Ta - 1; 56 <= d; d--)a.be[d] = c & 255, c /= 256;
        Ga(a, a.be);
        for (d = c = 0; 5 > d; d++)for (var e = 24; 0 <= e; e -= 8)b[c] = a.R[d] >> e & 255, ++c;
        return fb(b)
    }

    function nb(a) {
        for (var b = "", c = 0; c < arguments.length; c++)b = fa(arguments[c]) ? b + nb.apply(null, arguments[c]) : "object" === typeof arguments[c] ? b + t(arguments[c]) : b + arguments[c], b += " ";
        return b
    }

    var ob = null, pb = !0;

    function kb(a) {
        !0 === pb && (pb = !1, null === ob && !0 === Ba.get("logging_enabled") && qb(!0));
        if (ob) {
            var b = nb.apply(null, arguments);
            ob(b)
        }
    }

    function rb(a) {
        return function () {
            kb(a, arguments)
        }
    }

    function sb(a) {
        if ("undefined" !== typeof console) {
            var b = "FIREBASE INTERNAL ERROR: " + nb.apply(null, arguments);
            "undefined" !== typeof console.error ? console.error(b) : console.log(b)
        }
    }

    function tb(a) {
        var b = nb.apply(null, arguments);
        throw Error("FIREBASE FATAL ERROR: " + b);
    }

    function z(a) {
        if ("undefined" !== typeof console) {
            var b = "FIREBASE WARNING: " + nb.apply(null, arguments);
            "undefined" !== typeof console.warn ? console.warn(b) : console.log(b)
        }
    }

    function ub(a) {
        var b = "", c = "", d = "", e = !0, f = "https", g = "";
        if (p(a)) {
            var k = a.indexOf("//");
            0 <= k && (f = a.substring(0, k - 1), a = a.substring(k + 2));
            k = a.indexOf("/");
            -1 === k && (k = a.length);
            b = a.substring(0, k);
            a = a.substring(k + 1);
            var l = b.split(".");
            if (3 === l.length) {
                k = l[2].indexOf(":");
                e = 0 <= k ? "https" === f || "wss" === f : !0;
                c = l[1];
                d = l[0];
                g = "";
                a = ("/" + a).split("/");
                for (k = 0; k < a.length; k++)if (0 < a[k].length) {
                    l = a[k];
                    try {
                        l = decodeURIComponent(l.replace(/\+/g, " "))
                    } catch (m) {
                    }
                    g += "/" + l
                }
                d = d.toLowerCase()
            } else 2 === l.length && (c = l[0])
        }
        return {
            host: b,
            domain: c, vg: d, Cb: e, scheme: f, Pc: g
        }
    }

    function vb(a) {
        return ga(a) && (a != a || a == Number.POSITIVE_INFINITY || a == Number.NEGATIVE_INFINITY)
    }

    function wb(a) {
        if ("complete" === document.readyState)a(); else {
            var b = !1, c = function () {
                document.body ? b || (b = !0, a()) : setTimeout(c, Math.floor(10))
            };
            document.addEventListener ? (document.addEventListener("DOMContentLoaded", c, !1), window.addEventListener("load", c, !1)) : document.attachEvent && (document.attachEvent("onreadystatechange", function () {
                "complete" === document.readyState && c()
            }), window.attachEvent("onload", c))
        }
    }

    function xb(a, b) {
        if (a === b)return 0;
        if ("[MIN_NAME]" === a || "[MAX_NAME]" === b)return -1;
        if ("[MIN_NAME]" === b || "[MAX_NAME]" === a)return 1;
        var c = yb(a), d = yb(b);
        return null !== c ? null !== d ? 0 == c - d ? a.length - b.length : c - d : -1 : null !== d ? 1 : a < b ? -1 : 1
    }

    function zb(a, b) {
        if (b && a in b)return b[a];
        throw Error("Missing required key (" + a + ") in object: " + t(b));
    }

    function Ab(a) {
        if ("object" !== typeof a || null === a)return t(a);
        var b = [], c;
        for (c in a)b.push(c);
        b.sort();
        c = "{";
        for (var d = 0; d < b.length; d++)0 !== d && (c += ","), c += t(b[d]), c += ":", c += Ab(a[b[d]]);
        return c + "}"
    }

    function Bb(a, b) {
        if (a.length <= b)return [a];
        for (var c = [], d = 0; d < a.length; d += b)d + b > a ? c.push(a.substring(d, a.length)) : c.push(a.substring(d, d + b));
        return c
    }

    function Cb(a, b) {
        if (ea(a))for (var c = 0; c < a.length; ++c)b(c, a[c]); else A(a, b)
    }

    function Db(a) {
        x(!vb(a), "Invalid JSON number");
        var b, c, d, e;
        0 === a ? (d = c = 0, b = -Infinity === 1 / a ? 1 : 0) : (b = 0 > a, a = Math.abs(a), a >= Math.pow(2, -1022) ? (d = Math.min(Math.floor(Math.log(a) / Math.LN2), 1023), c = d + 1023, d = Math.round(a * Math.pow(2, 52 - d) - Math.pow(2, 52))) : (c = 0, d = Math.round(a / Math.pow(2, -1074))));
        e = [];
        for (a = 52; a; a -= 1)e.push(d % 2 ? 1 : 0), d = Math.floor(d / 2);
        for (a = 11; a; a -= 1)e.push(c % 2 ? 1 : 0), c = Math.floor(c / 2);
        e.push(b ? 1 : 0);
        e.reverse();
        b = e.join("");
        c = "";
        for (a = 0; 64 > a; a += 8)d = parseInt(b.substr(a, 8), 2).toString(16), 1 === d.length &&
        (d = "0" + d), c += d;
        return c.toLowerCase()
    }

    var Eb = /^-?\d{1,10}$/;

    function yb(a) {
        return Eb.test(a) && (a = Number(a), -2147483648 <= a && 2147483647 >= a) ? a : null
    }

    function Fb(a) {
        try {
            a()
        } catch (b) {
            setTimeout(function () {
                throw b;
            }, Math.floor(0))
        }
    }

    function B(a, b) {
        if (ha(a)) {
            var c = Array.prototype.slice.call(arguments, 1).slice();
            Fb(function () {
                a.apply(null, c)
            })
        }
    };
    function Gb(a, b, c, d) {
        this.me = b;
        this.Ld = c;
        this.Rc = d;
        this.nd = a
    }

    Gb.prototype.Rb = function () {
        var a = this.Ld.hc();
        return "value" === this.nd ? a.path : a.parent().path
    };
    Gb.prototype.oe = function () {
        return this.nd
    };
    Gb.prototype.Pb = function () {
        return this.me.Pb(this)
    };
    Gb.prototype.toString = function () {
        return this.Rb().toString() + ":" + this.nd + ":" + t(this.Ld.Xe())
    };
    function Hb(a, b, c) {
        this.me = a;
        this.error = b;
        this.path = c
    }

    Hb.prototype.Rb = function () {
        return this.path
    };
    Hb.prototype.oe = function () {
        return "cancel"
    };
    Hb.prototype.Pb = function () {
        return this.me.Pb(this)
    };
    Hb.prototype.toString = function () {
        return this.path.toString() + ":cancel"
    };
    function Ib(a, b, c) {
        this.Kb = a;
        this.mb = b;
        this.vc = c || null
    }

    h = Ib.prototype;
    h.pf = function (a) {
        return "value" === a
    };
    h.createEvent = function (a, b) {
        var c = b.w.m;
        return new Gb("value", this, new C(a.Wa, b.hc(), c))
    };
    h.Pb = function (a) {
        var b = this.vc;
        if ("cancel" === a.oe()) {
            x(this.mb, "Raising a cancel event on a listener with no cancel callback");
            var c = this.mb;
            return function () {
                c.call(b, a.error)
            }
        }
        var d = this.Kb;
        return function () {
            d.call(b, a.Ld)
        }
    };
    h.Te = function (a, b) {
        return this.mb ? new Hb(this, a, b) : null
    };
    h.matches = function (a) {
        return a instanceof Ib && (!a.Kb || !this.Kb || a.Kb === this.Kb) && a.vc === this.vc
    };
    h.cf = function () {
        return null !== this.Kb
    };
    function Jb(a, b, c) {
        this.ca = a;
        this.mb = b;
        this.vc = c
    }

    h = Jb.prototype;
    h.pf = function (a) {
        a = "children_added" === a ? "child_added" : a;
        return ("children_removed" === a ? "child_removed" : a)in this.ca
    };
    h.Te = function (a, b) {
        return this.mb ? new Hb(this, a, b) : null
    };
    h.createEvent = function (a, b) {
        var c = b.hc().k(a.nb);
        return new Gb(a.type, this, new C(a.Wa, c, b.w.m), a.Rc)
    };
    h.Pb = function (a) {
        var b = this.vc;
        if ("cancel" === a.oe()) {
            x(this.mb, "Raising a cancel event on a listener with no cancel callback");
            var c = this.mb;
            return function () {
                c.call(b, a.error)
            }
        }
        var d = this.ca[a.nd];
        return function () {
            d.call(b, a.Ld, a.Rc)
        }
    };
    h.matches = function (a) {
        if (a instanceof Jb) {
            if (this.ca && a.ca) {
                var b = Kb(a.ca);
                if (b === Kb(this.ca)) {
                    if (1 === b) {
                        var b = Lb(a.ca), c = Lb(this.ca);
                        return c === b && (!a.ca[b] || !this.ca[c] || a.ca[b] === this.ca[c])
                    }
                    return Mb(this.ca, function (b, c) {
                        return a.ca[c] === b
                    })
                }
                return !1
            }
            return !0
        }
        return !1
    };
    h.cf = function () {
        return null !== this.ca
    };
    function mb(a) {
        for (var b = [], c = 0, d = 0; d < a.length; d++) {
            var e = a.charCodeAt(d);
            55296 <= e && 56319 >= e && (e -= 55296, d++, x(d < a.length, "Surrogate pair missing trail surrogate."), e = 65536 + (e << 10) + (a.charCodeAt(d) - 56320));
            128 > e ? b[c++] = e : (2048 > e ? b[c++] = e >> 6 | 192 : (65536 > e ? b[c++] = e >> 12 | 224 : (b[c++] = e >> 18 | 240, b[c++] = e >> 12 & 63 | 128), b[c++] = e >> 6 & 63 | 128), b[c++] = e & 63 | 128)
        }
        return b
    };
    function D(a, b, c, d) {
        var e;
        d < b ? e = "at least " + b : d > c && (e = 0 === c ? "none" : "no more than " + c);
        if (e)throw Error(a + " failed: Was called with " + d + (1 === d ? " argument." : " arguments.") + " Expects " + e + ".");
    }

    function E(a, b, c) {
        var d = "";
        switch (b) {
            case 1:
                d = c ? "first" : "First";
                break;
            case 2:
                d = c ? "second" : "Second";
                break;
            case 3:
                d = c ? "third" : "Third";
                break;
            case 4:
                d = c ? "fourth" : "Fourth";
                break;
            default:
                throw Error("errorPrefix called with argumentNumber > 4.  Need to update it?");
        }
        return a = a + " failed: " + (d + " argument ")
    }

    function F(a, b, c, d) {
        if ((!d || n(c)) && !ha(c))throw Error(E(a, b, d) + "must be a valid function.");
    }

    function Nb(a, b, c) {
        if (n(c) && (!ia(c) || null === c))throw Error(E(a, b, !0) + "must be a valid context object.");
    };
    var Ob = /[\[\].#$\/\u0000-\u001F\u007F]/, Pb = /[\[\].#$\u0000-\u001F\u007F]/;

    function Qb(a) {
        return p(a) && 0 !== a.length && !Ob.test(a)
    }

    function Rb(a) {
        return null === a || p(a) || ga(a) && !vb(a) || ia(a) && u(a, ".sv")
    }

    function Sb(a, b, c) {
        c && !n(b) || Tb(E(a, 1, c), b)
    }

    function Tb(a, b, c, d) {
        c || (c = 0);
        d = d || [];
        if (!n(b))throw Error(a + "contains undefined" + Ub(d));
        if (ha(b))throw Error(a + "contains a function" + Ub(d) + " with contents: " + b.toString());
        if (vb(b))throw Error(a + "contains " + b.toString() + Ub(d));
        if (1E3 < c)throw new TypeError(a + "contains a cyclic object value (" + d.slice(0, 100).join(".") + "...)");
        if (p(b) && b.length > 10485760 / 3 && 10485760 < mb(b).length)throw Error(a + "contains a string greater than 10485760 utf8 bytes" + Ub(d) + " ('" + b.substring(0, 50) + "...')");
        if (ia(b))for (var e in b)if (u(b,
                e)) {
            var f = b[e];
            if (".priority" !== e && ".value" !== e && ".sv" !== e && !Qb(e))throw Error(a + " contains an invalid key (" + e + ")" + Ub(d) + '.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');
            d.push(e);
            Tb(a, f, c + 1, d);
            d.pop()
        }
    }

    function Ub(a) {
        return 0 == a.length ? "" : " in property '" + a.join(".") + "'"
    }

    function Vb(a, b) {
        if (!ia(b) || ea(b))throw Error(E(a, 1, !1) + " must be an Object containing the children to replace.");
        Sb(a, b, !1)
    }

    function Wb(a, b, c) {
        if (vb(c))throw Error(E(a, b, !1) + "is " + c.toString() + ", but must be a valid Firebase priority (a string, finite number, server value, or null).");
        if (!Rb(c))throw Error(E(a, b, !1) + "must be a valid Firebase priority (a string, finite number, server value, or null).");
    }

    function Xb(a, b, c) {
        if (!c || n(b))switch (b) {
            case "value":
            case "child_added":
            case "child_removed":
            case "child_changed":
            case "child_moved":
                break;
            default:
                throw Error(E(a, 1, c) + 'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".');
        }
    }

    function Yb(a, b, c, d) {
        if ((!d || n(c)) && !Qb(c))throw Error(E(a, b, d) + 'was an invalid key: "' + c + '".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").');
    }

    function Zb(a, b) {
        if (!p(b) || 0 === b.length || Pb.test(b))throw Error(E(a, 1, !1) + 'was an invalid path: "' + b + '". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"');
    }

    function $b(a, b) {
        if (".info" === G(b))throw Error(a + " failed: Can't modify data under /.info/");
    }

    function ac(a, b) {
        if (!p(b))throw Error(E(a, 1, !1) + "must be a valid credential (a string).");
    }

    function bc(a, b, c) {
        if (!p(c))throw Error(E(a, b, !1) + "must be a valid string.");
    }

    function cc(a, b, c, d) {
        if (!d || n(c))if (!ia(c) || null === c)throw Error(E(a, b, d) + "must be a valid object.");
    }

    function dc(a, b, c) {
        if (!ia(b) || null === b || !u(b, c))throw Error(E(a, 1, !1) + 'must contain the key "' + c + '"');
        if (!p(v(b, c)))throw Error(E(a, 1, !1) + 'must contain the key "' + c + '" with type "string"');
    };
    function ec(a, b) {
        return xb(a.name, b.name)
    }

    function fc(a, b) {
        return xb(a, b)
    };
    function gc() {
    }

    var hc = {};

    function H(a) {
        return q(a.compare, a)
    }

    gc.prototype.df = function (a, b) {
        return 0 !== this.compare(new I("[MIN_NAME]", a), new I("[MIN_NAME]", b))
    };
    gc.prototype.Ae = function () {
        return ic
    };
    function jc(a) {
        this.Vb = a
    }

    na(jc, gc);
    h = jc.prototype;
    h.se = function (a) {
        return !a.B(this.Vb).e()
    };
    h.compare = function (a, b) {
        var c = a.K.B(this.Vb), d = b.K.B(this.Vb), c = c.he(d);
        return 0 === c ? xb(a.name, b.name) : c
    };
    h.ye = function (a, b) {
        var c = J(a), c = K.I(this.Vb, c);
        return new I(b, c)
    };
    h.ze = function () {
        var a = K.I(this.Vb, kc);
        return new I("[MAX_NAME]", a)
    };
    h.toString = function () {
        return this.Vb
    };
    var L = new jc(".priority");

    function lc() {
    }

    na(lc, gc);
    h = lc.prototype;
    h.compare = function (a, b) {
        return xb(a.name, b.name)
    };
    h.se = function () {
        throw ib("KeyIndex.isDefinedOn not expected to be called.");
    };
    h.df = function () {
        return !1
    };
    h.Ae = function () {
        return ic
    };
    h.ze = function () {
        return new I("[MAX_NAME]", K)
    };
    h.ye = function (a) {
        x(p(a), "KeyIndex indexValue must always be a string.");
        return new I(a, K)
    };
    h.toString = function () {
        return ".key"
    };
    var mc = new lc;

    function nc() {
        this.yc = this.na = this.nc = this.ha = this.ka = !1;
        this.xb = 0;
        this.Hb = "";
        this.Bc = null;
        this.Xb = "";
        this.Ac = null;
        this.Ub = "";
        this.m = L
    }

    var oc = new nc;

    function pc(a) {
        x(a.ha, "Only valid if start has been set");
        return a.Bc
    }

    function qc(a) {
        x(a.ha, "Only valid if start has been set");
        return a.nc ? a.Xb : "[MIN_NAME]"
    }

    function rc(a) {
        x(a.na, "Only valid if end has been set");
        return a.Ac
    }

    function sc(a) {
        x(a.na, "Only valid if end has been set");
        return a.yc ? a.Ub : "[MAX_NAME]"
    }

    function tc(a) {
        x(a.ka, "Only valid if limit has been set");
        return a.xb
    }

    function uc(a) {
        var b = new nc;
        b.ka = a.ka;
        b.xb = a.xb;
        b.ha = a.ha;
        b.Bc = a.Bc;
        b.nc = a.nc;
        b.Xb = a.Xb;
        b.na = a.na;
        b.Ac = a.Ac;
        b.yc = a.yc;
        b.Ub = a.Ub;
        b.m = a.m;
        return b
    }

    h = nc.prototype;
    h.ve = function (a) {
        var b = uc(this);
        b.ka = !0;
        b.xb = a;
        b.Hb = "";
        return b
    };
    h.we = function (a) {
        var b = uc(this);
        b.ka = !0;
        b.xb = a;
        b.Hb = "l";
        return b
    };
    h.xe = function (a) {
        var b = uc(this);
        b.ka = !0;
        b.xb = a;
        b.Hb = "r";
        return b
    };
    h.Md = function (a, b) {
        var c = uc(this);
        c.ha = !0;
        c.Bc = a;
        null != b ? (c.nc = !0, c.Xb = b) : (c.nc = !1, c.Xb = "");
        return c
    };
    h.md = function (a, b) {
        var c = uc(this);
        c.na = !0;
        c.Ac = a;
        n(b) ? (c.yc = !0, c.Ub = b) : (c.Dg = !1, c.Ub = "");
        return c
    };
    function vc(a, b) {
        var c = uc(a);
        c.m = b;
        return c
    }

    function wc(a) {
        return !(a.ha || a.na || a.ka)
    };
    function M(a, b, c, d) {
        this.g = a;
        this.path = b;
        this.w = c;
        this.dc = d
    }

    function xc(a) {
        var b = null, c = null;
        a.ha && (b = pc(a));
        a.na && (c = rc(a));
        if (a.m === mc) {
            if (a.ha) {
                if ("[MIN_NAME]" != qc(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");
                if (null != b && "string" !== typeof b)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");
            }
            if (a.na) {
                if ("[MAX_NAME]" != sc(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");
                if (null !=
                    c && "string" !== typeof c)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");
            }
        } else if (a.m === L) {
            if (null != b && !Rb(b) || null != c && !Rb(c))throw Error("Query: When ordering by priority, the first argument passed to startAt(), endAt(), or equalTo() must be a valid priority value (null, a number, or a string).");
        } else if (x(a.m instanceof jc, "unknown index type."), null != b && "object" === typeof b || null != c && "object" === typeof c)throw Error("Query: First argument passed to startAt(), endAt(), or equalTo() cannot be an object.");
    }

    function yc(a) {
        if (a.ha && a.na && a.ka && (!a.ka || "" === a.Hb))throw Error("Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead.");
    }

    function zc(a, b) {
        if (!0 === a.dc)throw Error(b + ": You can't combine multiple orderBy calls.");
    }

    M.prototype.hc = function () {
        D("Query.ref", 0, 0, arguments.length);
        return new O(this.g, this.path)
    };
    M.prototype.ref = M.prototype.hc;
    M.prototype.zb = function (a, b, c, d) {
        D("Query.on", 2, 4, arguments.length);
        Xb("Query.on", a, !1);
        F("Query.on", 2, b, !1);
        var e = Ac("Query.on", c, d);
        if ("value" === a)Bc(this.g, this, new Ib(b, e.cancel || null, e.Ha || null)); else {
            var f = {};
            f[a] = b;
            Bc(this.g, this, new Jb(f, e.cancel, e.Ha))
        }
        return b
    };
    M.prototype.on = M.prototype.zb;
    M.prototype.bc = function (a, b, c) {
        D("Query.off", 0, 3, arguments.length);
        Xb("Query.off", a, !0);
        F("Query.off", 2, b, !0);
        Nb("Query.off", 3, c);
        var d = null, e = null;
        "value" === a ? d = new Ib(b || null, null, c || null) : a && (b && (e = {}, e[a] = b), d = new Jb(e, null, c || null));
        e = this.g;
        d = ".info" === G(this.path) ? e.ud.hb(this, d) : e.M.hb(this, d);
        Cc(e.Z, this.path, d)
    };
    M.prototype.off = M.prototype.bc;
    M.prototype.gg = function (a, b) {
        function c(g) {
            f && (f = !1, e.bc(a, c), b.call(d.Ha, g))
        }

        D("Query.once", 2, 4, arguments.length);
        Xb("Query.once", a, !1);
        F("Query.once", 2, b, !1);
        var d = Ac("Query.once", arguments[2], arguments[3]), e = this, f = !0;
        this.zb(a, c, function (b) {
            e.bc(a, c);
            d.cancel && d.cancel.call(d.Ha, b)
        })
    };
    M.prototype.once = M.prototype.gg;
    M.prototype.ve = function (a) {
        z("Query.limit() being deprecated. Please use Query.limitToFirst() or Query.limitToLast() instead.");
        D("Query.limit", 1, 1, arguments.length);
        if (!ga(a) || Math.floor(a) !== a || 0 >= a)throw Error("Query.limit: First argument must be a positive integer.");
        if (this.w.ka)throw Error("Query.limit: Limit was already set (by another call to limit, limitToFirst, orlimitToLast.");
        var b = this.w.ve(a);
        yc(b);
        return new M(this.g, this.path, b, this.dc)
    };
    M.prototype.limit = M.prototype.ve;
    M.prototype.we = function (a) {
        D("Query.limitToFirst", 1, 1, arguments.length);
        if (!ga(a) || Math.floor(a) !== a || 0 >= a)throw Error("Query.limitToFirst: First argument must be a positive integer.");
        if (this.w.ka)throw Error("Query.limitToFirst: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");
        return new M(this.g, this.path, this.w.we(a), this.dc)
    };
    M.prototype.limitToFirst = M.prototype.we;
    M.prototype.xe = function (a) {
        D("Query.limitToLast", 1, 1, arguments.length);
        if (!ga(a) || Math.floor(a) !== a || 0 >= a)throw Error("Query.limitToLast: First argument must be a positive integer.");
        if (this.w.ka)throw Error("Query.limitToLast: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");
        return new M(this.g, this.path, this.w.xe(a), this.dc)
    };
    M.prototype.limitToLast = M.prototype.xe;
    M.prototype.hg = function (a) {
        D("Query.orderByChild", 1, 1, arguments.length);
        if ("$key" === a)throw Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');
        if ("$priority" === a)throw Error('Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');
        Yb("Query.orderByChild", 1, a, !1);
        zc(this, "Query.orderByChild");
        var b = vc(this.w, new jc(a));
        xc(b);
        return new M(this.g, this.path, b, !0)
    };
    M.prototype.orderByChild = M.prototype.hg;
    M.prototype.ig = function () {
        D("Query.orderByKey", 0, 0, arguments.length);
        zc(this, "Query.orderByKey");
        var a = vc(this.w, mc);
        xc(a);
        return new M(this.g, this.path, a, !0)
    };
    M.prototype.orderByKey = M.prototype.ig;
    M.prototype.jg = function () {
        D("Query.orderByPriority", 0, 0, arguments.length);
        zc(this, "Query.orderByPriority");
        var a = vc(this.w, L);
        xc(a);
        return new M(this.g, this.path, a, !0)
    };
    M.prototype.orderByPriority = M.prototype.jg;
    M.prototype.Md = function (a, b) {
        D("Query.startAt", 0, 2, arguments.length);
        Sb("Query.startAt", a, !0);
        Yb("Query.startAt", 2, b, !0);
        var c = this.w.Md(a, b);
        yc(c);
        xc(c);
        if (this.w.ha)throw Error("Query.startAt: Starting point was already set (by another call to startAt or equalTo).");
        n(a) || (b = a = null);
        return new M(this.g, this.path, c, this.dc)
    };
    M.prototype.startAt = M.prototype.Md;
    M.prototype.md = function (a, b) {
        D("Query.endAt", 0, 2, arguments.length);
        Sb("Query.endAt", a, !0);
        Yb("Query.endAt", 2, b, !0);
        var c = this.w.md(a, b);
        yc(c);
        xc(c);
        if (this.w.na)throw Error("Query.endAt: Ending point was already set (by another call to endAt or equalTo).");
        return new M(this.g, this.path, c, this.dc)
    };
    M.prototype.endAt = M.prototype.md;
    M.prototype.Of = function (a, b) {
        D("Query.equalTo", 1, 2, arguments.length);
        Sb("Query.equalTo", a, !1);
        Yb("Query.equalTo", 2, b, !0);
        if (this.w.ha)throw Error("Query.equalTo: Starting point was already set (by another call to endAt or equalTo).");
        if (this.w.na)throw Error("Query.equalTo: Ending point was already set (by another call to endAt or equalTo).");
        return this.Md(a, b).md(a, b)
    };
    M.prototype.equalTo = M.prototype.Of;
    function Dc(a) {
        a = a.w;
        var b = {};
        a.ha && (b.sp = a.Bc, a.nc && (b.sn = a.Xb));
        a.na && (b.ep = a.Ac, a.yc && (b.en = a.Ub));
        if (a.ka) {
            b.l = a.xb;
            var c = a.Hb;
            "" === c && (c = a.ha ? "l" : "r");
            b.vf = c
        }
        a.m !== L && (b.i = a.m.toString());
        return b
    }

    M.prototype.Da = function () {
        var a = Ab(Dc(this));
        return "{}" === a ? "default" : a
    };
    function Ac(a, b, c) {
        var d = {cancel: null, Ha: null};
        if (b && c)d.cancel = b, F(a, 3, d.cancel, !0), d.Ha = c, Nb(a, 4, d.Ha); else if (b)if ("object" === typeof b && null !== b)d.Ha = b; else if ("function" === typeof b)d.cancel = b; else throw Error(E(a, 3, !0) + " must either be a cancel callback or a context object.");
        return d
    };
    function P(a, b) {
        if (1 == arguments.length) {
            this.n = a.split("/");
            for (var c = 0, d = 0; d < this.n.length; d++)0 < this.n[d].length && (this.n[c] = this.n[d], c++);
            this.n.length = c;
            this.ba = 0
        } else this.n = a, this.ba = b
    }

    function G(a) {
        return a.ba >= a.n.length ? null : a.n[a.ba]
    }

    function Q(a) {
        return a.n.length - a.ba
    }

    function R(a) {
        var b = a.ba;
        b < a.n.length && b++;
        return new P(a.n, b)
    }

    P.prototype.toString = function () {
        for (var a = "", b = this.ba; b < this.n.length; b++)"" !== this.n[b] && (a += "/" + this.n[b]);
        return a || "/"
    };
    P.prototype.parent = function () {
        if (this.ba >= this.n.length)return null;
        for (var a = [], b = this.ba; b < this.n.length - 1; b++)a.push(this.n[b]);
        return new P(a, 0)
    };
    P.prototype.k = function (a) {
        for (var b = [], c = this.ba; c < this.n.length; c++)b.push(this.n[c]);
        if (a instanceof P)for (c = a.ba; c < a.n.length; c++)b.push(a.n[c]); else for (a = a.split("/"), c = 0; c < a.length; c++)0 < a[c].length && b.push(a[c]);
        return new P(b, 0)
    };
    P.prototype.e = function () {
        return this.ba >= this.n.length
    };
    var S = new P("");

    function T(a, b) {
        var c = G(a);
        if (null === c)return b;
        if (c === G(b))return T(R(a), R(b));
        throw Error("INTERNAL ERROR: innerPath (" + b + ") is not within outerPath (" + a + ")");
    }

    P.prototype.da = function (a) {
        if (Q(this) !== Q(a))return !1;
        for (var b = this.ba, c = a.ba; b <= this.n.length; b++, c++)if (this.n[b] !== a.n[c])return !1;
        return !0
    };
    P.prototype.contains = function (a) {
        var b = this.ba, c = a.ba;
        if (Q(this) > Q(a))return !1;
        for (; b < this.n.length;) {
            if (this.n[b] !== a.n[c])return !1;
            ++b;
            ++c
        }
        return !0
    };
    function Ec() {
        this.children = {};
        this.dd = 0;
        this.value = null
    }

    function Fc(a, b, c) {
        this.yd = a ? a : "";
        this.Oc = b ? b : null;
        this.D = c ? c : new Ec
    }

    function Gc(a, b) {
        for (var c = b instanceof P ? b : new P(b), d = a, e; null !== (e = G(c));)d = new Fc(e, d, v(d.D.children, e) || new Ec), c = R(c);
        return d
    }

    h = Fc.prototype;
    h.ta = function () {
        return this.D.value
    };
    function Hc(a, b) {
        x("undefined" !== typeof b, "Cannot set value to undefined");
        a.D.value = b;
        Ic(a)
    }

    h.clear = function () {
        this.D.value = null;
        this.D.children = {};
        this.D.dd = 0;
        Ic(this)
    };
    h.pd = function () {
        return 0 < this.D.dd
    };
    h.e = function () {
        return null === this.ta() && !this.pd()
    };
    h.ea = function (a) {
        var b = this;
        A(this.D.children, function (c, d) {
            a(new Fc(d, b, c))
        })
    };
    function Jc(a, b, c, d) {
        c && !d && b(a);
        a.ea(function (a) {
            Jc(a, b, !0, d)
        });
        c && d && b(a)
    }

    function Kc(a, b) {
        for (var c = a.parent(); null !== c && !b(c);)c = c.parent()
    }

    h.path = function () {
        return new P(null === this.Oc ? this.yd : this.Oc.path() + "/" + this.yd)
    };
    h.name = function () {
        return this.yd
    };
    h.parent = function () {
        return this.Oc
    };
    function Ic(a) {
        if (null !== a.Oc) {
            var b = a.Oc, c = a.yd, d = a.e(), e = u(b.D.children, c);
            d && e ? (delete b.D.children[c], b.D.dd--, Ic(b)) : d || e || (b.D.children[c] = a.D, b.D.dd++, Ic(b))
        }
    };
    function Lc(a, b) {
        this.Ga = a;
        this.pa = b ? b : Mc
    }

    h = Lc.prototype;
    h.Ja = function (a, b) {
        return new Lc(this.Ga, this.pa.Ja(a, b, this.Ga).W(null, null, !1, null, null))
    };
    h.remove = function (a) {
        return new Lc(this.Ga, this.pa.remove(a, this.Ga).W(null, null, !1, null, null))
    };
    h.get = function (a) {
        for (var b, c = this.pa; !c.e();) {
            b = this.Ga(a, c.key);
            if (0 === b)return c.value;
            0 > b ? c = c.left : 0 < b && (c = c.right)
        }
        return null
    };
    function Nc(a, b) {
        for (var c, d = a.pa, e = null; !d.e();) {
            c = a.Ga(b, d.key);
            if (0 === c) {
                if (d.left.e())return e ? e.key : null;
                for (d = d.left; !d.right.e();)d = d.right;
                return d.key
            }
            0 > c ? d = d.left : 0 < c && (e = d, d = d.right)
        }
        throw Error("Attempted to find predecessor key for a nonexistent key.  What gives?");
    }

    h.e = function () {
        return this.pa.e()
    };
    h.count = function () {
        return this.pa.count()
    };
    h.Ic = function () {
        return this.pa.Ic()
    };
    h.Zb = function () {
        return this.pa.Zb()
    };
    h.Ba = function (a) {
        return this.pa.Ba(a)
    };
    h.Aa = function (a) {
        return new Oc(this.pa, null, this.Ga, !1, a)
    };
    h.rb = function (a, b) {
        return new Oc(this.pa, a, this.Ga, !1, b)
    };
    h.Sb = function (a, b) {
        return new Oc(this.pa, a, this.Ga, !0, b)
    };
    h.bf = function (a) {
        return new Oc(this.pa, null, this.Ga, !0, a)
    };
    function Oc(a, b, c, d, e) {
        this.qf = e || null;
        this.te = d;
        this.ac = [];
        for (e = 1; !a.e();)if (e = b ? c(a.key, b) : 1, d && (e *= -1), 0 > e)a = this.te ? a.left : a.right; else if (0 === e) {
            this.ac.push(a);
            break
        } else this.ac.push(a), a = this.te ? a.right : a.left
    }

    function U(a) {
        if (0 === a.ac.length)return null;
        var b = a.ac.pop(), c;
        c = a.qf ? a.qf(b.key, b.value) : {key: b.key, value: b.value};
        if (a.te)for (b = b.left; !b.e();)a.ac.push(b), b = b.right; else for (b = b.right; !b.e();)a.ac.push(b), b = b.left;
        return c
    }

    function Pc(a, b, c, d, e) {
        this.key = a;
        this.value = b;
        this.color = null != c ? c : !0;
        this.left = null != d ? d : Mc;
        this.right = null != e ? e : Mc
    }

    h = Pc.prototype;
    h.W = function (a, b, c, d, e) {
        return new Pc(null != a ? a : this.key, null != b ? b : this.value, null != c ? c : this.color, null != d ? d : this.left, null != e ? e : this.right)
    };
    h.count = function () {
        return this.left.count() + 1 + this.right.count()
    };
    h.e = function () {
        return !1
    };
    h.Ba = function (a) {
        return this.left.Ba(a) || a(this.key, this.value) || this.right.Ba(a)
    };
    function Qc(a) {
        return a.left.e() ? a : Qc(a.left)
    }

    h.Ic = function () {
        return Qc(this).key
    };
    h.Zb = function () {
        return this.right.e() ? this.key : this.right.Zb()
    };
    h.Ja = function (a, b, c) {
        var d, e;
        e = this;
        d = c(a, e.key);
        e = 0 > d ? e.W(null, null, null, e.left.Ja(a, b, c), null) : 0 === d ? e.W(null, b, null, null, null) : e.W(null, null, null, null, e.right.Ja(a, b, c));
        return Rc(e)
    };
    function Sc(a) {
        if (a.left.e())return Mc;
        a.left.aa() || a.left.left.aa() || (a = Tc(a));
        a = a.W(null, null, null, Sc(a.left), null);
        return Rc(a)
    }

    h.remove = function (a, b) {
        var c, d;
        c = this;
        if (0 > b(a, c.key))c.left.e() || c.left.aa() || c.left.left.aa() || (c = Tc(c)), c = c.W(null, null, null, c.left.remove(a, b), null); else {
            c.left.aa() && (c = Uc(c));
            c.right.e() || c.right.aa() || c.right.left.aa() || (c = Vc(c), c.left.left.aa() && (c = Uc(c), c = Vc(c)));
            if (0 === b(a, c.key)) {
                if (c.right.e())return Mc;
                d = Qc(c.right);
                c = c.W(d.key, d.value, null, null, Sc(c.right))
            }
            c = c.W(null, null, null, null, c.right.remove(a, b))
        }
        return Rc(c)
    };
    h.aa = function () {
        return this.color
    };
    function Rc(a) {
        a.right.aa() && !a.left.aa() && (a = Wc(a));
        a.left.aa() && a.left.left.aa() && (a = Uc(a));
        a.left.aa() && a.right.aa() && (a = Vc(a));
        return a
    }

    function Tc(a) {
        a = Vc(a);
        a.right.left.aa() && (a = a.W(null, null, null, null, Uc(a.right)), a = Wc(a), a = Vc(a));
        return a
    }

    function Wc(a) {
        return a.right.W(null, null, a.color, a.W(null, null, !0, null, a.right.left), null)
    }

    function Uc(a) {
        return a.left.W(null, null, a.color, null, a.W(null, null, !0, a.left.right, null))
    }

    function Vc(a) {
        return a.W(null, null, !a.color, a.left.W(null, null, !a.left.color, null, null), a.right.W(null, null, !a.right.color, null, null))
    }

    function Xc() {
    }

    h = Xc.prototype;
    h.W = function () {
        return this
    };
    h.Ja = function (a, b) {
        return new Pc(a, b, null)
    };
    h.remove = function () {
        return this
    };
    h.count = function () {
        return 0
    };
    h.e = function () {
        return !0
    };
    h.Ba = function () {
        return !1
    };
    h.Ic = function () {
        return null
    };
    h.Zb = function () {
        return null
    };
    h.aa = function () {
        return !1
    };
    var Mc = new Xc;

    function I(a, b) {
        this.name = a;
        this.K = b
    }

    function Yc(a, b) {
        return new I(a, b)
    };
    function Zc(a, b) {
        this.A = a;
        x(null !== this.A, "LeafNode shouldn't be created with null value.");
        this.ga = b || K;
        $c(this.ga);
        this.wb = null
    }

    h = Zc.prototype;
    h.P = function () {
        return !0
    };
    h.O = function () {
        return this.ga
    };
    h.ib = function (a) {
        return new Zc(this.A, a)
    };
    h.B = function (a) {
        return ".priority" === a ? this.ga : K
    };
    h.$ = function (a) {
        return a.e() ? this : ".priority" === G(a) ? this.ga : K
    };
    h.Y = function () {
        return !1
    };
    h.af = function () {
        return null
    };
    h.I = function (a, b) {
        return ".priority" === a ? this.ib(b) : K.I(a, b).ib(this.ga)
    };
    h.L = function (a, b) {
        var c = G(a);
        if (null === c)return b;
        x(".priority" !== c || 1 === Q(a), ".priority must be the last token in a path");
        return this.I(c, K.L(R(a), b))
    };
    h.e = function () {
        return !1
    };
    h.Ua = function () {
        return 0
    };
    h.N = function (a) {
        return a && !this.O().e() ? {".value": this.ta(), ".priority": this.O().N()} : this.ta()
    };
    h.hash = function () {
        if (null === this.wb) {
            var a = "";
            this.ga.e() || (a += "priority:" + ad(this.ga.N()) + ":");
            var b = typeof this.A, a = a + (b + ":"), a = "number" === b ? a + Db(this.A) : a + this.A;
            this.wb = lb(a)
        }
        return this.wb
    };
    h.ta = function () {
        return this.A
    };
    h.he = function (a) {
        if (a === K)return 1;
        if (a instanceof bd)return -1;
        x(a.P(), "Unknown node type");
        var b = typeof a.A, c = typeof this.A, d = Ia(cd, b), e = Ia(cd, c);
        x(0 <= d, "Unknown leaf type: " + b);
        x(0 <= e, "Unknown leaf type: " + c);
        return d === e ? "object" === c ? 0 : this.A < a.A ? -1 : this.A === a.A ? 0 : 1 : e - d
    };
    var cd = ["object", "boolean", "number", "string"];
    Zc.prototype.Wd = function () {
        return this
    };
    Zc.prototype.Yb = function () {
        return !0
    };
    Zc.prototype.da = function (a) {
        return a === this ? !0 : a.P() ? this.A === a.A && this.ga.da(a.ga) : !1
    };
    Zc.prototype.toString = function () {
        return "string" === typeof this.A ? this.A : '"' + this.A + '"'
    };
    function dd(a, b) {
        this.td = a;
        this.Wb = b
    }

    dd.prototype.get = function (a) {
        var b = v(this.td, a);
        if (!b)throw Error("No index defined for " + a);
        return b === hc ? null : b
    };
    function ed(a, b, c) {
        var d = fd(a.td, function (d, f) {
            var g = v(a.Wb, f);
            x(g, "Missing index implementation for " + f);
            if (d === hc) {
                if (g.se(b.K)) {
                    for (var k = [], l = c.Aa(Yc), m = U(l); m;)m.name != b.name && k.push(m), m = U(l);
                    k.push(b);
                    return gd(k, H(g))
                }
                return hc
            }
            g = c.get(b.name);
            k = d;
            g && (k = k.remove(new I(b.name, g)));
            return k.Ja(b, b.K)
        });
        return new dd(d, a.Wb)
    }

    function hd(a, b, c) {
        var d = fd(a.td, function (a) {
            if (a === hc)return a;
            var d = c.get(b.name);
            return d ? a.remove(new I(b.name, d)) : a
        });
        return new dd(d, a.Wb)
    }

    var id = new dd({".priority": hc}, {".priority": L});

    function bd(a, b, c) {
        this.j = a;
        (this.ga = b) && $c(this.ga);
        this.sb = c;
        this.wb = null
    }

    h = bd.prototype;
    h.P = function () {
        return !1
    };
    h.O = function () {
        return this.ga || K
    };
    h.ib = function (a) {
        return new bd(this.j, a, this.sb)
    };
    h.B = function (a) {
        if (".priority" === a)return this.O();
        a = this.j.get(a);
        return null === a ? K : a
    };
    h.$ = function (a) {
        var b = G(a);
        return null === b ? this : this.B(b).$(R(a))
    };
    h.Y = function (a) {
        return null !== this.j.get(a)
    };
    h.I = function (a, b) {
        x(b, "We should always be passing snapshot nodes");
        if (".priority" === a)return this.ib(b);
        var c = new I(a, b), d;
        b.e() ? (d = this.j.remove(a), c = hd(this.sb, c, this.j)) : (d = this.j.Ja(a, b), c = ed(this.sb, c, this.j));
        return new bd(d, this.ga, c)
    };
    h.L = function (a, b) {
        var c = G(a);
        if (null === c)return b;
        x(".priority" !== G(a) || 1 === Q(a), ".priority must be the last token in a path");
        var d = this.B(c).L(R(a), b);
        return this.I(c, d)
    };
    h.e = function () {
        return this.j.e()
    };
    h.Ua = function () {
        return this.j.count()
    };
    var jd = /^(0|[1-9]\d*)$/;
    h = bd.prototype;
    h.N = function (a) {
        if (this.e())return null;
        var b = {}, c = 0, d = 0, e = !0;
        this.ea(L, function (f, g) {
            b[f] = g.N(a);
            c++;
            e && jd.test(f) ? d = Math.max(d, Number(f)) : e = !1
        });
        if (!a && e && d < 2 * c) {
            var f = [], g;
            for (g in b)f[g] = b[g];
            return f
        }
        a && !this.O().e() && (b[".priority"] = this.O().N());
        return b
    };
    h.hash = function () {
        if (null === this.wb) {
            var a = "";
            this.O().e() || (a += "priority:" + ad(this.O().N()) + ":");
            this.ea(L, function (b, c) {
                var d = c.hash();
                "" !== d && (a += ":" + b + ":" + d)
            });
            this.wb = "" === a ? "" : lb(a)
        }
        return this.wb
    };
    h.af = function (a, b, c) {
        return (c = kd(this, c)) ? (a = Nc(c, new I(a, b))) ? a.name : null : Nc(this.j, a)
    };
    function ld(a, b) {
        var c;
        c = (c = kd(a, b)) ? (c = c.Ic()) && c.name : a.j.Ic();
        return c ? new I(c, a.j.get(c)) : null
    }

    function md(a, b) {
        var c;
        c = (c = kd(a, b)) ? (c = c.Zb()) && c.name : a.j.Zb();
        return c ? new I(c, a.j.get(c)) : null
    }

    h.ea = function (a, b) {
        var c = kd(this, a);
        return c ? c.Ba(function (a) {
            return b(a.name, a.K)
        }) : this.j.Ba(b)
    };
    h.Aa = function (a) {
        return this.rb(a.Ae(), a)
    };
    h.rb = function (a, b) {
        var c = kd(this, b);
        return c ? c.rb(a, function (a) {
            return a
        }) : this.j.rb(a.name, Yc)
    };
    h.bf = function (a) {
        return this.Sb(a.ze(), a)
    };
    h.Sb = function (a, b) {
        var c = kd(this, b);
        return c ? c.Sb(a, function (a) {
            return a
        }) : this.j.Sb(a.name, Yc)
    };
    h.he = function (a) {
        return this.e() ? a.e() ? 0 : -1 : a.P() || a.e() ? 1 : a === kc ? -1 : 0
    };
    h.Wd = function (a) {
        if (a === mc || nd(this.sb.Wb, a.toString()))return this;
        var b = this.sb, c = this.j;
        x(a !== mc, "KeyIndex always exists and isn't meant to be added to the IndexMap.");
        for (var d = [], e = !1, c = c.Aa(Yc), f = U(c); f;)e = e || a.se(f.K), d.push(f), f = U(c);
        d = e ? gd(d, H(a)) : hc;
        e = a.toString();
        c = od(b.Wb);
        c[e] = a;
        a = od(b.td);
        a[e] = d;
        return new bd(this.j, this.ga, new dd(a, c))
    };
    h.Yb = function (a) {
        return a === mc || nd(this.sb.Wb, a.toString())
    };
    h.da = function (a) {
        if (a === this)return !0;
        if (a.P())return !1;
        if (this.O().da(a.O()) && this.j.count() === a.j.count()) {
            var b = this.Aa(L);
            a = a.Aa(L);
            for (var c = U(b), d = U(a); c && d;) {
                if (c.name !== d.name || !c.K.da(d.K))return !1;
                c = U(b);
                d = U(a)
            }
            return null === c && null === d
        }
        return !1
    };
    function kd(a, b) {
        return b === mc ? null : a.sb.get(b.toString())
    }

    h.toString = function () {
        var a = "{", b = !0;
        this.ea(L, function (c, d) {
            b ? b = !1 : a += ", ";
            a += '"' + c + '" : ' + d.toString()
        });
        return a += "}"
    };
    function J(a, b) {
        if (null === a)return K;
        var c = null;
        "object" === typeof a && ".priority"in a ? c = a[".priority"] : "undefined" !== typeof b && (c = b);
        x(null === c || "string" === typeof c || "number" === typeof c || "object" === typeof c && ".sv"in c, "Invalid priority type found: " + typeof c);
        "object" === typeof a && ".value"in a && null !== a[".value"] && (a = a[".value"]);
        if ("object" !== typeof a || ".sv"in a)return new Zc(a, J(c));
        if (a instanceof Array) {
            var d = K, e = a;
            A(e, function (a, b) {
                if (u(e, b) && "." !== b.substring(0, 1)) {
                    var c = J(a);
                    if (c.P() || !c.e())d =
                        d.I(b, c)
                }
            });
            return d.ib(J(c))
        }
        var f = [], g = !1, k = a;
        va(k, function (a) {
            if ("string" !== typeof a || "." !== a.substring(0, 1)) {
                var b = J(k[a]);
                b.e() || (g = g || !b.O().e(), f.push(new I(a, b)))
            }
        });
        var l = gd(f, ec, function (a) {
            return a.name
        }, fc);
        if (g) {
            var m = gd(f, H(L));
            return new bd(l, J(c), new dd({".priority": m}, {".priority": L}))
        }
        return new bd(l, J(c), id)
    }

    var pd = Math.log(2);

    function qd(a) {
        this.count = parseInt(Math.log(a + 1) / pd, 10);
        this.Ve = this.count - 1;
        this.Jf = a + 1 & parseInt(Array(this.count + 1).join("1"), 2)
    }

    function rd(a) {
        var b = !(a.Jf & 1 << a.Ve);
        a.Ve--;
        return b
    }

    function gd(a, b, c, d) {
        function e(b, d) {
            var f = d - b;
            if (0 == f)return null;
            if (1 == f) {
                var m = a[b], r = c ? c(m) : m;
                return new Pc(r, m.K, !1, null, null)
            }
            var m = parseInt(f / 2, 10) + b, f = e(b, m), s = e(m + 1, d), m = a[m], r = c ? c(m) : m;
            return new Pc(r, m.K, !1, f, s)
        }

        a.sort(b);
        var f = function (b) {
            function d(b, g) {
                var k = r - b, s = r;
                r -= b;
                var s = e(k + 1, s), k = a[k], y = c ? c(k) : k, s = new Pc(y, k.K, g, null, s);
                f ? f.left = s : m = s;
                f = s
            }

            for (var f = null, m = null, r = a.length, s = 0; s < b.count; ++s) {
                var y = rd(b), N = Math.pow(2, b.count - (s + 1));
                y ? d(N, !1) : (d(N, !1), d(N, !0))
            }
            return m
        }(new qd(a.length));
        return null !== f ? new Lc(d || b, f) : new Lc(d || b)
    }

    function ad(a) {
        return "number" === typeof a ? "number:" + Db(a) : "string:" + a
    }

    function $c(a) {
        if (a.P()) {
            var b = a.N();
            x("string" === typeof b || "number" === typeof b || "object" === typeof b && u(b, ".sv"), "Priority must be a string or number.")
        } else x(a === kc || a.e(), "priority of unexpected type.");
        x(a === kc || a.O().e(), "Priority nodes can't have a priority of their own.")
    }

    var K = new bd(new Lc(fc), null, id);

    function sd() {
        bd.call(this, new Lc(fc), K, id)
    }

    na(sd, bd);
    h = sd.prototype;
    h.he = function (a) {
        return a === this ? 0 : 1
    };
    h.da = function (a) {
        return a === this
    };
    h.O = function () {
        throw ib("Why is this called?");
    };
    h.B = function () {
        return K
    };
    h.e = function () {
        return !1
    };
    var kc = new sd, ic = new I("[MIN_NAME]", K);

    function C(a, b, c) {
        this.D = a;
        this.U = b;
        this.m = c
    }

    C.prototype.N = function () {
        D("Firebase.DataSnapshot.val", 0, 0, arguments.length);
        return this.D.N()
    };
    C.prototype.val = C.prototype.N;
    C.prototype.Xe = function () {
        D("Firebase.DataSnapshot.exportVal", 0, 0, arguments.length);
        return this.D.N(!0)
    };
    C.prototype.exportVal = C.prototype.Xe;
    C.prototype.Qf = function () {
        D("Firebase.DataSnapshot.exists", 0, 0, arguments.length);
        return !this.D.e()
    };
    C.prototype.exists = C.prototype.Qf;
    C.prototype.k = function (a) {
        D("Firebase.DataSnapshot.child", 0, 1, arguments.length);
        ga(a) && (a = String(a));
        Zb("Firebase.DataSnapshot.child", a);
        var b = new P(a), c = this.U.k(b);
        return new C(this.D.$(b), c, L)
    };
    C.prototype.child = C.prototype.k;
    C.prototype.Y = function (a) {
        D("Firebase.DataSnapshot.hasChild", 1, 1, arguments.length);
        Zb("Firebase.DataSnapshot.hasChild", a);
        var b = new P(a);
        return !this.D.$(b).e()
    };
    C.prototype.hasChild = C.prototype.Y;
    C.prototype.O = function () {
        D("Firebase.DataSnapshot.getPriority", 0, 0, arguments.length);
        return this.D.O().N()
    };
    C.prototype.getPriority = C.prototype.O;
    C.prototype.forEach = function (a) {
        D("Firebase.DataSnapshot.forEach", 1, 1, arguments.length);
        F("Firebase.DataSnapshot.forEach", 1, a, !1);
        if (this.D.P())return !1;
        var b = this;
        return !!this.D.ea(this.m, function (c, d) {
            return a(new C(d, b.U.k(c), L))
        })
    };
    C.prototype.forEach = C.prototype.forEach;
    C.prototype.pd = function () {
        D("Firebase.DataSnapshot.hasChildren", 0, 0, arguments.length);
        return this.D.P() ? !1 : !this.D.e()
    };
    C.prototype.hasChildren = C.prototype.pd;
    C.prototype.name = function () {
        z("Firebase.DataSnapshot.name() being deprecated. Please use Firebase.DataSnapshot.key() instead.");
        D("Firebase.DataSnapshot.name", 0, 0, arguments.length);
        return this.key()
    };
    C.prototype.name = C.prototype.name;
    C.prototype.key = function () {
        D("Firebase.DataSnapshot.key", 0, 0, arguments.length);
        return this.U.key()
    };
    C.prototype.key = C.prototype.key;
    C.prototype.Ua = function () {
        D("Firebase.DataSnapshot.numChildren", 0, 0, arguments.length);
        return this.D.Ua()
    };
    C.prototype.numChildren = C.prototype.Ua;
    C.prototype.hc = function () {
        D("Firebase.DataSnapshot.ref", 0, 0, arguments.length);
        return this.U
    };
    C.prototype.ref = C.prototype.hc;
    function td(a) {
        x(ea(a) && 0 < a.length, "Requires a non-empty array");
        this.Bf = a;
        this.Gc = {}
    }

    td.prototype.Td = function (a, b) {
        for (var c = this.Gc[a] || [], d = 0; d < c.length; d++)c[d].sc.apply(c[d].Ha, Array.prototype.slice.call(arguments, 1))
    };
    td.prototype.zb = function (a, b, c) {
        ud(this, a);
        this.Gc[a] = this.Gc[a] || [];
        this.Gc[a].push({sc: b, Ha: c});
        (a = this.pe(a)) && b.apply(c, a)
    };
    td.prototype.bc = function (a, b, c) {
        ud(this, a);
        a = this.Gc[a] || [];
        for (var d = 0; d < a.length; d++)if (a[d].sc === b && (!c || c === a[d].Ha)) {
            a.splice(d, 1);
            break
        }
    };
    function ud(a, b) {
        x(Oa(a.Bf, function (a) {
            return a === b
        }), "Unknown event: " + b)
    };
    function vd() {
        td.call(this, ["visible"]);
        var a, b;
        "undefined" !== typeof document && "undefined" !== typeof document.addEventListener && ("undefined" !== typeof document.hidden ? (b = "visibilitychange", a = "hidden") : "undefined" !== typeof document.mozHidden ? (b = "mozvisibilitychange", a = "mozHidden") : "undefined" !== typeof document.msHidden ? (b = "msvisibilitychange", a = "msHidden") : "undefined" !== typeof document.webkitHidden && (b = "webkitvisibilitychange", a = "webkitHidden"));
        this.qc = !0;
        if (b) {
            var c = this;
            document.addEventListener(b,
                function () {
                    var b = !document[a];
                    b !== c.qc && (c.qc = b, c.Td("visible", b))
                }, !1)
        }
    }

    na(vd, td);
    ca(vd);
    vd.prototype.pe = function (a) {
        x("visible" === a, "Unknown event type: " + a);
        return [this.qc]
    };
    function wd() {
        td.call(this, ["online"]);
        this.Lc = !0;
        if ("undefined" !== typeof window && "undefined" !== typeof window.addEventListener) {
            var a = this;
            window.addEventListener("online", function () {
                a.Lc || a.Td("online", !0);
                a.Lc = !0
            }, !1);
            window.addEventListener("offline", function () {
                a.Lc && a.Td("online", !1);
                a.Lc = !1
            }, !1)
        }
    }

    na(wd, td);
    ca(wd);
    wd.prototype.pe = function (a) {
        x("online" === a, "Unknown event type: " + a);
        return [this.Lc]
    };
    function A(a, b) {
        for (var c in a)b.call(void 0, a[c], c, a)
    }

    function fd(a, b) {
        var c = {}, d;
        for (d in a)c[d] = b.call(void 0, a[d], d, a);
        return c
    }

    function Mb(a, b) {
        for (var c in a)if (!b.call(void 0, a[c], c, a))return !1;
        return !0
    }

    function Kb(a) {
        var b = 0, c;
        for (c in a)b++;
        return b
    }

    function Lb(a) {
        for (var b in a)return b
    }

    function xd(a) {
        var b = [], c = 0, d;
        for (d in a)b[c++] = a[d];
        return b
    }

    function yd(a) {
        var b = [], c = 0, d;
        for (d in a)b[c++] = d;
        return b
    }

    function nd(a, b) {
        for (var c in a)if (a[c] == b)return !0;
        return !1
    }

    function zd(a, b, c) {
        for (var d in a)if (b.call(c, a[d], d, a))return d
    }

    function Ad(a, b) {
        var c = zd(a, b, void 0);
        return c && a[c]
    }

    function Bd(a) {
        for (var b in a)return !1;
        return !0
    }

    function Cd(a, b) {
        return b in a ? a[b] : void 0
    }

    function od(a) {
        var b = {}, c;
        for (c in a)b[c] = a[c];
        return b
    }

    var Dd = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

    function Ed(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d)a[c] = d[c];
            for (var f = 0; f < Dd.length; f++)c = Dd[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    };
    function Fd() {
        this.wc = {}
    }

    function Gd(a, b, c) {
        n(c) || (c = 1);
        u(a.wc, b) || (a.wc[b] = 0);
        a.wc[b] += c
    }

    Fd.prototype.get = function () {
        return od(this.wc)
    };
    function Hd(a) {
        this.Kf = a;
        this.vd = null
    }

    Hd.prototype.get = function () {
        var a = this.Kf.get(), b = od(a);
        if (this.vd)for (var c in this.vd)b[c] -= this.vd[c];
        this.vd = a;
        return b
    };
    function Id(a, b) {
        this.uf = {};
        this.Nd = new Hd(a);
        this.S = b;
        var c = 1E4 + 2E4 * Math.random();
        setTimeout(q(this.nf, this), Math.floor(c))
    }

    Id.prototype.nf = function () {
        var a = this.Nd.get(), b = {}, c = !1, d;
        for (d in a)0 < a[d] && u(this.uf, d) && (b[d] = a[d], c = !0);
        c && (a = this.S, a.ja && (b = {c: b}, a.f("reportStats", b), a.wa("s", b)));
        setTimeout(q(this.nf, this), Math.floor(6E5 * Math.random()))
    };
    var Jd = {}, Kd = {};

    function Ld(a) {
        a = a.toString();
        Jd[a] || (Jd[a] = new Fd);
        return Jd[a]
    }

    function Md(a, b) {
        var c = a.toString();
        Kd[c] || (Kd[c] = b());
        return Kd[c]
    };
    var Nd = null;
    "undefined" !== typeof MozWebSocket ? Nd = MozWebSocket : "undefined" !== typeof WebSocket && (Nd = WebSocket);
    function Od(a, b, c) {
        this.ie = a;
        this.f = rb(this.ie);
        this.frames = this.Cc = null;
        this.kb = this.lb = this.Oe = 0;
        this.Qa = Ld(b);
        this.Za = (b.Cb ? "wss://" : "ws://") + b.Ka + "/.ws?v=5";
        "undefined" !== typeof location && location.href && -1 !== location.href.indexOf("firebaseio.com") && (this.Za += "&r=f");
        b.host !== b.Ka && (this.Za = this.Za + "&ns=" + b.yb);
        c && (this.Za = this.Za + "&s=" + c)
    }

    var Pd;
    Od.prototype.open = function (a, b) {
        this.fb = b;
        this.cg = a;
        this.f("Websocket connecting to " + this.Za);
        this.zc = !1;
        Aa.set("previous_websocket_failure", !0);
        try {
            this.oa = new Nd(this.Za)
        } catch (c) {
            this.f("Error instantiating WebSocket.");
            var d = c.message || c.data;
            d && this.f(d);
            this.eb();
            return
        }
        var e = this;
        this.oa.onopen = function () {
            e.f("Websocket connected.");
            e.zc = !0
        };
        this.oa.onclose = function () {
            e.f("Websocket connection was disconnected.");
            e.oa = null;
            e.eb()
        };
        this.oa.onmessage = function (a) {
            if (null !== e.oa)if (a = a.data, e.kb +=
                    a.length, Gd(e.Qa, "bytes_received", a.length), Qd(e), null !== e.frames)Rd(e, a); else {
                a:{
                    x(null === e.frames, "We already have a frame buffer");
                    if (6 >= a.length) {
                        var b = Number(a);
                        if (!isNaN(b)) {
                            e.Oe = b;
                            e.frames = [];
                            a = null;
                            break a
                        }
                    }
                    e.Oe = 1;
                    e.frames = []
                }
                null !== a && Rd(e, a)
            }
        };
        this.oa.onerror = function (a) {
            e.f("WebSocket error.  Closing connection.");
            (a = a.message || a.data) && e.f(a);
            e.eb()
        }
    };
    Od.prototype.start = function () {
    };
    Od.isAvailable = function () {
        var a = !1;
        if ("undefined" !== typeof navigator && navigator.userAgent) {
            var b = navigator.userAgent.match(/Android ([0-9]{0,}\.[0-9]{0,})/);
            b && 1 < b.length && 4.4 > parseFloat(b[1]) && (a = !0)
        }
        return !a && null !== Nd && !Pd
    };
    Od.responsesRequiredToBeHealthy = 2;
    Od.healthyTimeout = 3E4;
    h = Od.prototype;
    h.wd = function () {
        Aa.remove("previous_websocket_failure")
    };
    function Rd(a, b) {
        a.frames.push(b);
        if (a.frames.length == a.Oe) {
            var c = a.frames.join("");
            a.frames = null;
            c = ua(c);
            a.cg(c)
        }
    }

    h.send = function (a) {
        Qd(this);
        a = t(a);
        this.lb += a.length;
        Gd(this.Qa, "bytes_sent", a.length);
        a = Bb(a, 16384);
        1 < a.length && this.oa.send(String(a.length));
        for (var b = 0; b < a.length; b++)this.oa.send(a[b])
    };
    h.Yc = function () {
        this.ub = !0;
        this.Cc && (clearInterval(this.Cc), this.Cc = null);
        this.oa && (this.oa.close(), this.oa = null)
    };
    h.eb = function () {
        this.ub || (this.f("WebSocket is closing itself"), this.Yc(), this.fb && (this.fb(this.zc), this.fb = null))
    };
    h.close = function () {
        this.ub || (this.f("WebSocket is being closed"), this.Yc())
    };
    function Qd(a) {
        clearInterval(a.Cc);
        a.Cc = setInterval(function () {
            a.oa && a.oa.send("0");
            Qd(a)
        }, Math.floor(45E3))
    };
    function Sd(a) {
        this.cc = a;
        this.Fd = [];
        this.Mb = 0;
        this.ge = -1;
        this.Ab = null
    }

    function Td(a, b, c) {
        a.ge = b;
        a.Ab = c;
        a.ge < a.Mb && (a.Ab(), a.Ab = null)
    }

    function Ud(a, b, c) {
        for (a.Fd[b] = c; a.Fd[a.Mb];) {
            var d = a.Fd[a.Mb];
            delete a.Fd[a.Mb];
            for (var e = 0; e < d.length; ++e)if (d[e]) {
                var f = a;
                Fb(function () {
                    f.cc(d[e])
                })
            }
            if (a.Mb === a.ge) {
                a.Ab && (clearTimeout(a.Ab), a.Ab(), a.Ab = null);
                break
            }
            a.Mb++
        }
    };
    function Vd() {
        this.set = {}
    }

    h = Vd.prototype;
    h.add = function (a, b) {
        this.set[a] = null !== b ? b : !0
    };
    h.contains = function (a) {
        return u(this.set, a)
    };
    h.get = function (a) {
        return this.contains(a) ? this.set[a] : void 0
    };
    h.remove = function (a) {
        delete this.set[a]
    };
    h.clear = function () {
        this.set = {}
    };
    h.e = function () {
        return Bd(this.set)
    };
    h.count = function () {
        return Kb(this.set)
    };
    function Wd(a, b) {
        A(a.set, function (a, d) {
            b(d, a)
        })
    };
    function Xd(a, b, c) {
        this.ie = a;
        this.f = rb(a);
        this.kb = this.lb = 0;
        this.Qa = Ld(b);
        this.Kd = c;
        this.zc = !1;
        this.bd = function (a) {
            b.host !== b.Ka && (a.ns = b.yb);
            var c = [], f;
            for (f in a)a.hasOwnProperty(f) && c.push(f + "=" + a[f]);
            return (b.Cb ? "https://" : "http://") + b.Ka + "/.lp?" + c.join("&")
        }
    }

    var Yd, Zd;
    Xd.prototype.open = function (a, b) {
        this.Ue = 0;
        this.fa = b;
        this.gf = new Sd(a);
        this.ub = !1;
        var c = this;
        this.ob = setTimeout(function () {
            c.f("Timed out trying to connect.");
            c.eb();
            c.ob = null
        }, Math.floor(3E4));
        wb(function () {
            if (!c.ub) {
                c.Na = new $d(function (a, b, d, k, l) {
                    ae(c, arguments);
                    if (c.Na)if (c.ob && (clearTimeout(c.ob), c.ob = null), c.zc = !0, "start" == a)c.id = b, c.mf = d; else if ("close" === a)b ? (c.Na.Jd = !1, Td(c.gf, b, function () {
                        c.eb()
                    })) : c.eb(); else throw Error("Unrecognized command received: " + a);
                }, function (a, b) {
                    ae(c, arguments);
                    Ud(c.gf, a, b)
                }, function () {
                    c.eb()
                }, c.bd);
                var a = {start: "t"};
                a.ser = Math.floor(1E8 * Math.random());
                c.Na.Ud && (a.cb = c.Na.Ud);
                a.v = "5";
                c.Kd && (a.s = c.Kd);
                "undefined" !== typeof location && location.href && -1 !== location.href.indexOf("firebaseio.com") && (a.r = "f");
                a = c.bd(a);
                c.f("Connecting via long-poll to " + a);
                be(c.Na, a, function () {
                })
            }
        })
    };
    Xd.prototype.start = function () {
        var a = this.Na, b = this.mf;
        a.Xf = this.id;
        a.Yf = b;
        for (a.Zd = !0; ce(a););
        a = this.id;
        b = this.mf;
        this.$b = document.createElement("iframe");
        var c = {dframe: "t"};
        c.id = a;
        c.pw = b;
        this.$b.src = this.bd(c);
        this.$b.style.display = "none";
        document.body.appendChild(this.$b)
    };
    Xd.isAvailable = function () {
        return !Zd && !("object" === typeof window && window.chrome && window.chrome.extension && !/^chrome/.test(window.location.href)) && !("object" === typeof Windows && "object" === typeof Windows.zg) && (Yd || !0)
    };
    h = Xd.prototype;
    h.wd = function () {
    };
    h.Yc = function () {
        this.ub = !0;
        this.Na && (this.Na.close(), this.Na = null);
        this.$b && (document.body.removeChild(this.$b), this.$b = null);
        this.ob && (clearTimeout(this.ob), this.ob = null)
    };
    h.eb = function () {
        this.ub || (this.f("Longpoll is closing itself"), this.Yc(), this.fa && (this.fa(this.zc), this.fa = null))
    };
    h.close = function () {
        this.ub || (this.f("Longpoll is being closed."), this.Yc())
    };
    h.send = function (a) {
        a = t(a);
        this.lb += a.length;
        Gd(this.Qa, "bytes_sent", a.length);
        a = mb(a);
        a = fb(a, !0);
        a = Bb(a, 1840);
        for (var b = 0; b < a.length; b++) {
            var c = this.Na;
            c.Qc.push({og: this.Ue, wg: a.length, We: a[b]});
            c.Zd && ce(c);
            this.Ue++
        }
    };
    function ae(a, b) {
        var c = t(b).length;
        a.kb += c;
        Gd(a.Qa, "bytes_received", c)
    }

    function $d(a, b, c, d) {
        this.bd = d;
        this.fb = c;
        this.Fe = new Vd;
        this.Qc = [];
        this.ke = Math.floor(1E8 * Math.random());
        this.Jd = !0;
        this.Ud = hb();
        window["pLPCommand" + this.Ud] = a;
        window["pRTLPCB" + this.Ud] = b;
        a = document.createElement("iframe");
        a.style.display = "none";
        if (document.body) {
            document.body.appendChild(a);
            try {
                a.contentWindow.document || kb("No IE domain setting required")
            } catch (e) {
                a.src = "javascript:void((function(){document.open();document.domain='" + document.domain + "';document.close();})())"
            }
        } else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
        a.contentDocument ? a.$a = a.contentDocument : a.contentWindow ? a.$a = a.contentWindow.document : a.document && (a.$a = a.document);
        this.va = a;
        a = "";
        this.va.src && "javascript:" === this.va.src.substr(0, 11) && (a = '<script>document.domain="' + document.domain + '";\x3c/script>');
        a = "<html><body>" + a + "</body></html>";
        try {
            this.va.$a.open(), this.va.$a.write(a), this.va.$a.close()
        } catch (f) {
            kb("frame writing exception"), f.stack && kb(f.stack), kb(f)
        }
    }

    $d.prototype.close = function () {
        this.Zd = !1;
        if (this.va) {
            this.va.$a.body.innerHTML = "";
            var a = this;
            setTimeout(function () {
                null !== a.va && (document.body.removeChild(a.va), a.va = null)
            }, Math.floor(0))
        }
        var b = this.fb;
        b && (this.fb = null, b())
    };
    function ce(a) {
        if (a.Zd && a.Jd && a.Fe.count() < (0 < a.Qc.length ? 2 : 1)) {
            a.ke++;
            var b = {};
            b.id = a.Xf;
            b.pw = a.Yf;
            b.ser = a.ke;
            for (var b = a.bd(b), c = "", d = 0; 0 < a.Qc.length;)if (1870 >= a.Qc[0].We.length + 30 + c.length) {
                var e = a.Qc.shift(), c = c + "&seg" + d + "=" + e.og + "&ts" + d + "=" + e.wg + "&d" + d + "=" + e.We;
                d++
            } else break;
            de(a, b + c, a.ke);
            return !0
        }
        return !1
    }

    function de(a, b, c) {
        function d() {
            a.Fe.remove(c);
            ce(a)
        }

        a.Fe.add(c);
        var e = setTimeout(d, Math.floor(25E3));
        be(a, b, function () {
            clearTimeout(e);
            d()
        })
    }

    function be(a, b, c) {
        setTimeout(function () {
            try {
                if (a.Jd) {
                    var d = a.va.$a.createElement("script");
                    d.type = "text/javascript";
                    d.async = !0;
                    d.src = b;
                    d.onload = d.onreadystatechange = function () {
                        var a = d.readyState;
                        a && "loaded" !== a && "complete" !== a || (d.onload = d.onreadystatechange = null, d.parentNode && d.parentNode.removeChild(d), c())
                    };
                    d.onerror = function () {
                        kb("Long-poll script failed to load: " + b);
                        a.Jd = !1;
                        a.close()
                    };
                    a.va.$a.body.appendChild(d)
                }
            } catch (e) {
            }
        }, Math.floor(1))
    };
    function ee(a) {
        fe(this, a)
    }

    var ge = [Xd, Od];

    function fe(a, b) {
        var c = Od && Od.isAvailable(), d = c && !(Aa.ff || !0 === Aa.get("previous_websocket_failure"));
        b.yg && (c || z("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."), d = !0);
        if (d)a.$c = [Od]; else {
            var e = a.$c = [];
            Cb(ge, function (a, b) {
                b && b.isAvailable() && e.push(b)
            })
        }
    }

    function he(a) {
        if (0 < a.$c.length)return a.$c[0];
        throw Error("No transports available");
    };
    function ie(a, b, c, d, e, f) {
        this.id = a;
        this.f = rb("c:" + this.id + ":");
        this.cc = c;
        this.Kc = d;
        this.fa = e;
        this.De = f;
        this.Q = b;
        this.Ed = [];
        this.Se = 0;
        this.xf = new ee(b);
        this.Pa = 0;
        this.f("Connection created");
        je(this)
    }

    function je(a) {
        var b = he(a.xf);
        a.J = new b("c:" + a.id + ":" + a.Se++, a.Q);
        a.He = b.responsesRequiredToBeHealthy || 0;
        var c = ke(a, a.J), d = le(a, a.J);
        a.ad = a.J;
        a.Xc = a.J;
        a.C = null;
        a.vb = !1;
        setTimeout(function () {
            a.J && a.J.open(c, d)
        }, Math.floor(0));
        b = b.healthyTimeout || 0;
        0 < b && (a.rd = setTimeout(function () {
            a.rd = null;
            a.vb || (a.J && 102400 < a.J.kb ? (a.f("Connection exceeded healthy timeout but has received " + a.J.kb + " bytes.  Marking connection healthy."), a.vb = !0, a.J.wd()) : a.J && 10240 < a.J.lb ? a.f("Connection exceeded healthy timeout but has sent " +
                a.J.lb + " bytes.  Leaving connection alive.") : (a.f("Closing unhealthy connection after timeout."), a.close()))
        }, Math.floor(b)))
    }

    function le(a, b) {
        return function (c) {
            b === a.J ? (a.J = null, c || 0 !== a.Pa ? 1 === a.Pa && a.f("Realtime connection lost.") : (a.f("Realtime connection failed."), "s-" === a.Q.Ka.substr(0, 2) && (Aa.remove("host:" + a.Q.host), a.Q.Ka = a.Q.host)), a.close()) : b === a.C ? (a.f("Secondary connection lost."), c = a.C, a.C = null, a.ad !== c && a.Xc !== c || a.close()) : a.f("closing an old connection")
        }
    }

    function ke(a, b) {
        return function (c) {
            if (2 != a.Pa)if (b === a.Xc) {
                var d = zb("t", c);
                c = zb("d", c);
                if ("c" == d) {
                    if (d = zb("t", c), "d"in c)if (c = c.d, "h" === d) {
                        var d = c.ts, e = c.v, f = c.h;
                        a.Kd = c.s;
                        Da(a.Q, f);
                        0 == a.Pa && (a.J.start(), me(a, a.J, d), "5" !== e && z("Protocol version mismatch detected"), c = a.xf, (c = 1 < c.$c.length ? c.$c[1] : null) && ne(a, c))
                    } else if ("n" === d) {
                        a.f("recvd end transmission on primary");
                        a.Xc = a.C;
                        for (c = 0; c < a.Ed.length; ++c)a.Bd(a.Ed[c]);
                        a.Ed = [];
                        oe(a)
                    } else"s" === d ? (a.f("Connection shutdown command received. Shutting down..."),
                    a.De && (a.De(c), a.De = null), a.fa = null, a.close()) : "r" === d ? (a.f("Reset packet received.  New host: " + c), Da(a.Q, c), 1 === a.Pa ? a.close() : (pe(a), je(a))) : "e" === d ? sb("Server Error: " + c) : "o" === d ? (a.f("got pong on primary."), qe(a), re(a)) : sb("Unknown control packet command: " + d)
                } else"d" == d && a.Bd(c)
            } else if (b === a.C)if (d = zb("t", c), c = zb("d", c), "c" == d)"t"in c && (c = c.t, "a" === c ? se(a) : "r" === c ? (a.f("Got a reset on secondary, closing it"), a.C.close(), a.ad !== a.C && a.Xc !== a.C || a.close()) : "o" === c && (a.f("got pong on secondary."),
                a.tf--, se(a))); else if ("d" == d)a.Ed.push(c); else throw Error("Unknown protocol layer: " + d); else a.f("message on old connection")
        }
    }

    ie.prototype.wa = function (a) {
        te(this, {t: "d", d: a})
    };
    function oe(a) {
        a.ad === a.C && a.Xc === a.C && (a.f("cleaning up and promoting a connection: " + a.C.ie), a.J = a.C, a.C = null)
    }

    function se(a) {
        0 >= a.tf ? (a.f("Secondary connection is healthy."), a.vb = !0, a.C.wd(), a.C.start(), a.f("sending client ack on secondary"), a.C.send({
            t: "c",
            d: {t: "a", d: {}}
        }), a.f("Ending transmission on primary"), a.J.send({
            t: "c",
            d: {t: "n", d: {}}
        }), a.ad = a.C, oe(a)) : (a.f("sending ping on secondary."), a.C.send({t: "c", d: {t: "p", d: {}}}))
    }

    ie.prototype.Bd = function (a) {
        qe(this);
        this.cc(a)
    };
    function qe(a) {
        a.vb || (a.He--, 0 >= a.He && (a.f("Primary connection is healthy."), a.vb = !0, a.J.wd()))
    }

    function ne(a, b) {
        a.C = new b("c:" + a.id + ":" + a.Se++, a.Q, a.Kd);
        a.tf = b.responsesRequiredToBeHealthy || 0;
        a.C.open(ke(a, a.C), le(a, a.C));
        setTimeout(function () {
            a.C && (a.f("Timed out trying to upgrade."), a.C.close())
        }, Math.floor(6E4))
    }

    function me(a, b, c) {
        a.f("Realtime connection established.");
        a.J = b;
        a.Pa = 1;
        a.Kc && (a.Kc(c), a.Kc = null);
        0 === a.He ? (a.f("Primary connection is healthy."), a.vb = !0) : setTimeout(function () {
            re(a)
        }, Math.floor(5E3))
    }

    function re(a) {
        a.vb || 1 !== a.Pa || (a.f("sending ping on primary."), te(a, {t: "c", d: {t: "p", d: {}}}))
    }

    function te(a, b) {
        if (1 !== a.Pa)throw"Connection is not connected";
        a.ad.send(b)
    }

    ie.prototype.close = function () {
        2 !== this.Pa && (this.f("Closing realtime connection."), this.Pa = 2, pe(this), this.fa && (this.fa(), this.fa = null))
    };
    function pe(a) {
        a.f("Shutting down all connections");
        a.J && (a.J.close(), a.J = null);
        a.C && (a.C.close(), a.C = null);
        a.rd && (clearTimeout(a.rd), a.rd = null)
    };
    function ue(a) {
        var b = {}, c = {}, d = {}, e = "";
        try {
            var f = a.split("."), b = ua(jb(f[0]) || ""), c = ua(jb(f[1]) || ""), e = f[2], d = c.d || {};
            delete c.d
        } catch (g) {
        }
        return {Bg: b, fe: c, data: d, sg: e}
    }

    function ve(a) {
        a = ue(a).fe;
        return "object" === typeof a && a.hasOwnProperty("iat") ? v(a, "iat") : null
    }

    function we(a) {
        a = ue(a);
        var b = a.fe;
        return !!a.sg && !!b && "object" === typeof b && b.hasOwnProperty("iat")
    };
    function xe(a, b, c, d) {
        this.id = ye++;
        this.f = rb("p:" + this.id + ":");
        this.Eb = !0;
        this.ua = {};
        this.la = [];
        this.Nc = 0;
        this.Jc = [];
        this.ja = !1;
        this.Va = 1E3;
        this.xd = 3E5;
        this.Cd = b;
        this.Ad = c;
        this.Ee = d;
        this.Q = a;
        this.Ke = null;
        this.Tc = {};
        this.ng = 0;
        this.Dc = this.ue = null;
        ze(this, 0);
        vd.Qb().zb("visible", this.fg, this);
        -1 === a.host.indexOf("fblocal") && wd.Qb().zb("online", this.dg, this)
    }

    var ye = 0, Ae = 0;
    h = xe.prototype;
    h.wa = function (a, b, c) {
        var d = ++this.ng;
        a = {r: d, a: a, b: b};
        this.f(t(a));
        x(this.ja, "sendRequest call when we're not connected not allowed.");
        this.La.wa(a);
        c && (this.Tc[d] = c)
    };
    function Be(a, b, c, d, e) {
        var f = b.Da(), g = b.path.toString();
        a.f("Listen called for " + g + " " + f);
        a.ua[g] = a.ua[g] || {};
        x(!a.ua[g][f], "listen() called twice for same path/queryId.");
        b = {H: e, qd: c, kg: Dc(b), tag: d};
        a.ua[g][f] = b;
        a.ja && Ce(a, g, f, b)
    }

    function Ce(a, b, c, d) {
        a.f("Listen on " + b + " for " + c);
        var e = {p: b};
        d.tag && (e.q = d.kg, e.t = d.tag);
        e.h = d.qd();
        a.wa("q", e, function (e) {
            if ((a.ua[b] && a.ua[b][c]) === d) {
                a.f("listen response", e);
                var g = e.s;
                "ok" !== g && De(a, b, c);
                e = e.d;
                d.H && d.H(g, e)
            }
        })
    }

    h.T = function (a, b, c) {
        this.Lb = {Mf: a, Ye: !1, sc: b, cd: c};
        this.f("Authenticating using credential: " + a);
        Ee(this);
        (b = 40 == a.length) || (a = ue(a).fe, b = "object" === typeof a && !0 === v(a, "admin"));
        b && (this.f("Admin auth credential detected.  Reducing max reconnect time."), this.xd = 3E4)
    };
    h.Pe = function (a) {
        delete this.Lb;
        this.ja && this.wa("unauth", {}, function (b) {
            a(b.s, b.d)
        })
    };
    function Ee(a) {
        var b = a.Lb;
        a.ja && b && a.wa("auth", {cred: b.Mf}, function (c) {
            var d = c.s;
            c = c.d || "error";
            "ok" !== d && a.Lb === b && delete a.Lb;
            b.Ye ? "ok" !== d && b.cd && b.cd(d, c) : (b.Ye = !0, b.sc && b.sc(d, c))
        })
    }

    function Fe(a, b, c, d) {
        a.ja ? Ge(a, "o", b, c, d) : a.Jc.push({Pc: b, action: "o", data: c, H: d})
    }

    function He(a, b, c, d) {
        a.ja ? Ge(a, "om", b, c, d) : a.Jc.push({Pc: b, action: "om", data: c, H: d})
    }

    h.Ce = function (a, b) {
        this.ja ? Ge(this, "oc", a, null, b) : this.Jc.push({Pc: a, action: "oc", data: null, H: b})
    };
    function Ge(a, b, c, d, e) {
        c = {p: c, d: d};
        a.f("onDisconnect " + b, c);
        a.wa(b, c, function (a) {
            e && setTimeout(function () {
                e(a.s, a.d)
            }, Math.floor(0))
        })
    }

    h.put = function (a, b, c, d) {
        Ie(this, "p", a, b, c, d)
    };
    function Ke(a, b, c, d) {
        Ie(a, "m", b, c, d, void 0)
    }

    function Ie(a, b, c, d, e, f) {
        d = {p: c, d: d};
        n(f) && (d.h = f);
        a.la.push({action: b, of: d, H: e});
        a.Nc++;
        b = a.la.length - 1;
        a.ja ? Le(a, b) : a.f("Buffering put: " + c)
    }

    function Le(a, b) {
        var c = a.la[b].action, d = a.la[b].of, e = a.la[b].H;
        a.la[b].lg = a.ja;
        a.wa(c, d, function (d) {
            a.f(c + " response", d);
            delete a.la[b];
            a.Nc--;
            0 === a.Nc && (a.la = []);
            e && e(d.s, d.d)
        })
    }

    h.Bd = function (a) {
        if ("r"in a) {
            this.f("from server: " + t(a));
            var b = a.r, c = this.Tc[b];
            c && (delete this.Tc[b], c(a.b))
        } else {
            if ("error"in a)throw"A server-side error has occurred: " + a.error;
            "a"in a && (b = a.a, c = a.b, this.f("handleServerMessage", b, c), "d" === b ? this.Cd(c.p, c.d, !1, c.t) : "m" === b ? this.Cd(c.p, c.d, !0, c.t) : "c" === b ? Me(this, c.p, c.q) : "ac" === b ? (a = c.s, b = c.d, c = this.Lb, delete this.Lb, c && c.cd && c.cd(a, b)) : "sd" === b ? this.Ke ? this.Ke(c) : "msg"in c && "undefined" !== typeof console && console.log("FIREBASE: " + c.msg.replace("\n",
                    "\nFIREBASE: ")) : sb("Unrecognized action received from server: " + t(b) + "\nAre you using the latest client?"))
        }
    };
    h.Kc = function (a) {
        this.f("connection ready");
        this.ja = !0;
        this.Dc = (new Date).getTime();
        this.Ee({serverTimeOffset: a - (new Date).getTime()});
        Ne(this);
        this.Ad(!0)
    };
    function ze(a, b) {
        x(!a.La, "Scheduling a connect when we're already connected/ing?");
        a.Nb && clearTimeout(a.Nb);
        a.Nb = setTimeout(function () {
            a.Nb = null;
            Oe(a)
        }, Math.floor(b))
    }

    h.fg = function (a) {
        a && !this.qc && this.Va === this.xd && (this.f("Window became visible.  Reducing delay."), this.Va = 1E3, this.La || ze(this, 0));
        this.qc = a
    };
    h.dg = function (a) {
        a ? (this.f("Browser went online.  Reconnecting."), this.Va = 1E3, this.Eb = !0, this.La || ze(this, 0)) : (this.f("Browser went offline.  Killing connection; don't reconnect."), this.Eb = !1, this.La && this.La.close())
    };
    h.jf = function () {
        this.f("data client disconnected");
        this.ja = !1;
        this.La = null;
        for (var a = 0; a < this.la.length; a++) {
            var b = this.la[a];
            b && "h"in b.of && b.lg && (b.H && b.H("disconnect"), delete this.la[a], this.Nc--)
        }
        0 === this.Nc && (this.la = []);
        if (this.Eb)this.qc ? this.Dc && (3E4 < (new Date).getTime() - this.Dc && (this.Va = 1E3), this.Dc = null) : (this.f("Window isn't visible.  Delaying reconnect."), this.Va = this.xd, this.ue = (new Date).getTime()), a = Math.max(0, this.Va - ((new Date).getTime() - this.ue)), a *= Math.random(), this.f("Trying to reconnect in " +
            a + "ms"), ze(this, a), this.Va = Math.min(this.xd, 1.3 * this.Va); else for (var c in this.Tc)delete this.Tc[c];
        this.Ad(!1)
    };
    function Oe(a) {
        if (a.Eb) {
            a.f("Making a connection attempt");
            a.ue = (new Date).getTime();
            a.Dc = null;
            var b = q(a.Bd, a), c = q(a.Kc, a), d = q(a.jf, a), e = a.id + ":" + Ae++;
            a.La = new ie(e, a.Q, b, c, d, function (b) {
                z(b + " (" + a.Q.toString() + ")");
                a.Eb = !1
            })
        }
    }

    h.tb = function () {
        this.Eb = !1;
        this.La ? this.La.close() : (this.Nb && (clearTimeout(this.Nb), this.Nb = null), this.ja && this.jf())
    };
    h.kc = function () {
        this.Eb = !0;
        this.Va = 1E3;
        this.La || ze(this, 0)
    };
    function Me(a, b, c) {
        c = c ? La(c, function (a) {
            return Ab(a)
        }).join("$") : "default";
        (a = De(a, b, c)) && a.H && a.H("permission_denied")
    }

    function De(a, b, c) {
        b = (new P(b)).toString();
        var d = a.ua[b][c];
        delete a.ua[b][c];
        0 === Kb(a.ua[b]) && delete a.ua[b];
        return d
    }

    function Ne(a) {
        Ee(a);
        A(a.ua, function (b, d) {
            A(b, function (b, c) {
                Ce(a, d, c, b)
            })
        });
        for (var b = 0; b < a.la.length; b++)a.la[b] && Le(a, b);
        for (; a.Jc.length;)b = a.Jc.shift(), Ge(a, b.action, b.Pc, b.data, b.H)
    };
    function Pe() {
        this.j = this.A = null
    }

    Pe.prototype.ic = function (a, b) {
        if (a.e())this.A = b, this.j = null; else if (null !== this.A)this.A = this.A.L(a, b); else {
            null == this.j && (this.j = new Vd);
            var c = G(a);
            this.j.contains(c) || this.j.add(c, new Pe);
            c = this.j.get(c);
            a = R(a);
            c.ic(a, b)
        }
    };
    function Qe(a, b) {
        if (b.e())return a.A = null, a.j = null, !0;
        if (null !== a.A) {
            if (a.A.P())return !1;
            var c = a.A;
            a.A = null;
            c.ea(L, function (b, c) {
                a.ic(new P(b), c)
            });
            return Qe(a, b)
        }
        return null !== a.j ? (c = G(b), b = R(b), a.j.contains(c) && Qe(a.j.get(c), b) && a.j.remove(c), a.j.e() ? (a.j = null, !0) : !1) : !0
    }

    function Re(a, b, c) {
        null !== a.A ? c(b, a.A) : a.ea(function (a, e) {
            var f = new P(b.toString() + "/" + a);
            Re(e, f, c)
        })
    }

    Pe.prototype.ea = function (a) {
        null !== this.j && Wd(this.j, function (b, c) {
            a(b, c)
        })
    };
    function Se() {
        this.Wc = K
    }

    Se.prototype.toString = function () {
        return this.Wc.toString()
    };
    function Te() {
        this.qb = []
    }

    function Ue(a, b) {
        for (var c = null, d = 0; d < b.length; d++) {
            var e = b[d], f = e.Rb();
            null === c || f.da(c.Rb()) || (a.qb.push(c), c = null);
            null === c && (c = new Ve(f));
            c.add(e)
        }
        c && a.qb.push(c)
    }

    function Cc(a, b, c) {
        Ue(a, c);
        We(a, function (a) {
            return a.da(b)
        })
    }

    function Xe(a, b, c) {
        Ue(a, c);
        We(a, function (a) {
            return a.contains(b) || b.contains(a)
        })
    }

    function We(a, b) {
        for (var c = !0, d = 0; d < a.qb.length; d++) {
            var e = a.qb[d];
            if (e)if (e = e.Rb(), b(e)) {
                for (var e = a.qb[d], f = 0; f < e.od.length; f++) {
                    var g = e.od[f];
                    if (null !== g) {
                        e.od[f] = null;
                        var k = g.Pb();
                        ob && kb("event: " + g.toString());
                        Fb(k)
                    }
                }
                a.qb[d] = null
            } else c = !1
        }
        c && (a.qb = [])
    }

    function Ve(a) {
        this.Ca = a;
        this.od = []
    }

    Ve.prototype.add = function (a) {
        this.od.push(a)
    };
    Ve.prototype.Rb = function () {
        return this.Ca
    };
    var Ye = "auth.firebase.com";

    function Ze(a, b, c) {
        this.ed = a || {};
        this.Sd = b || {};
        this.lc = c || {};
        this.ed.remember || (this.ed.remember = "default")
    }

    var $e = ["remember", "redirectTo"];

    function af(a) {
        var b = {}, c = {};
        va(a || {}, function (a, e) {
            0 <= Ia($e, a) ? b[a] = e : c[a] = e
        });
        return new Ze(b, {}, c)
    };
    var bf = {
        NETWORK_ERROR: "Unable to contact the Firebase server.",
        SERVER_ERROR: "An unknown server error occurred.",
        TRANSPORT_UNAVAILABLE: "There are no login transports available for the requested method.",
        REQUEST_INTERRUPTED: "The browser redirected the page before the login request could complete.",
        USER_CANCELLED: "The user cancelled authentication."
    };

    function V(a) {
        var b = Error(v(bf, a), a);
        b.code = a;
        return b
    };
    function cf() {
        var a = window.opener.frames, b;
        for (b = a.length - 1; 0 <= b; b--)try {
            if (a[b].location.protocol === window.location.protocol && a[b].location.host === window.location.host && "__winchan_relay_frame" === a[b].name)return a[b]
        } catch (c) {
        }
        return null
    }

    function df(a, b, c) {
        a.attachEvent ? a.attachEvent("on" + b, c) : a.addEventListener && a.addEventListener(b, c, !1)
    }

    function ef(a, b, c) {
        a.detachEvent ? a.detachEvent("on" + b, c) : a.removeEventListener && a.removeEventListener(b, c, !1)
    }

    function ff(a) {
        /^https?:\/\//.test(a) || (a = window.location.href);
        var b = /^(https?:\/\/[\-_a-zA-Z\.0-9:]+)/.exec(a);
        return b ? b[1] : a
    }

    function gf(a) {
        var b = "";
        try {
            a = a.replace("#", "");
            var c = {}, d = a.replace(/^\?/, "").split("&");
            for (a = 0; a < d.length; a++)if (d[a]) {
                var e = d[a].split("=");
                c[e[0]] = e[1]
            }
            c && u(c, "__firebase_request_key") && (b = v(c, "__firebase_request_key"))
        } catch (f) {
        }
        return b
    }

    function hf(a) {
        var b = [], c;
        for (c in a)if (u(a, c)) {
            var d = v(a, c);
            if (ea(d))for (var e = 0; e < d.length; e++)b.push(encodeURIComponent(c) + "=" + encodeURIComponent(d[e])); else b.push(encodeURIComponent(c) + "=" + encodeURIComponent(v(a, c)))
        }
        return b.join("&")
    }

    function jf() {
        var a = ub(Ye);
        return a.scheme + "://" + a.host + "/v2"
    };
    function kf() {
        return !!(window.cordova || window.phonegap || window.PhoneGap) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(navigator.userAgent)
    }

    function lf() {
        var a = navigator.userAgent;
        if ("Microsoft Internet Explorer" === navigator.appName) {
            if ((a = a.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/)) && 1 < a.length)return 8 <= parseFloat(a[1])
        } else if (-1 < a.indexOf("Trident") && (a = a.match(/rv:([0-9]{2,2}[\.0-9]{0,})/)) && 1 < a.length)return 8 <= parseFloat(a[1]);
        return !1
    };
    function mf(a) {
        a = a || {};
        a.method || (a.method = "GET");
        a.headers || (a.headers = {});
        a.headers.content_type || (a.headers.content_type = "application/json");
        a.headers.content_type = a.headers.content_type.toLowerCase();
        this.options = a
    }

    mf.prototype.open = function (a, b, c) {
        function d() {
            c && (c(V("REQUEST_INTERRUPTED")), c = null)
        }

        var e = new XMLHttpRequest, f = this.options.method.toUpperCase(), g;
        df(window, "beforeunload", d);
        e.onreadystatechange = function () {
            if (c && 4 === e.readyState) {
                var a;
                if (200 <= e.status && 300 > e.status) {
                    try {
                        a = ua(e.responseText)
                    } catch (b) {
                    }
                    c(null, a)
                } else 500 <= e.status && 600 > e.status ? c(V("SERVER_ERROR")) : c(V("NETWORK_ERROR"));
                c = null;
                ef(window, "beforeunload", d)
            }
        };
        if ("GET" === f)a += (/\?/.test(a) ? "" : "?") + hf(b), g = null; else {
            var k = this.options.headers.content_type;
            "application/json" === k && (g = t(b));
            "application/x-www-form-urlencoded" === k && (g = hf(b))
        }
        e.open(f, a, !0);
        a = {"X-Requested-With": "XMLHttpRequest", Accept: "application/json;text/plain"};
        Ed(a, this.options.headers);
        for (var l in a)e.setRequestHeader(l, a[l]);
        e.send(g)
    };
    mf.isAvailable = function () {
        return !!window.XMLHttpRequest && "string" === typeof(new XMLHttpRequest).responseType && (!(navigator.userAgent.match(/MSIE/) || navigator.userAgent.match(/Trident/)) || lf())
    };
    mf.prototype.uc = function () {
        return "json"
    };
    function nf(a) {
        a = a || {};
        this.Uc = Ha() + Ha() + Ha();
        this.kf = a || {}
    }

    nf.prototype.open = function (a, b, c) {
        function d() {
            c && (c(V("USER_CANCELLED")), c = null)
        }

        var e = this, f = ub(Ye), g;
        b.requestId = this.Uc;
        b.redirectTo = f.scheme + "://" + f.host + "/blank/page.html";
        a += /\?/.test(a) ? "" : "?";
        a += hf(b);
        (g = window.open(a, "_blank", "location=no")) && ha(g.addEventListener) ? (g.addEventListener("loadstart", function (a) {
            var b;
            if (b = a && a.url)a:{
                var f = a.url;
                try {
                    var r = document.createElement("a");
                    r.href = f;
                    b = r.host === ub(Ye).host && "/blank/page.html" === r.pathname;
                    break a
                } catch (s) {
                }
                b = !1
            }
            b && (a = gf(a.url), g.removeEventListener("exit",
                d), g.close(), a = new Ze(null, null, {
                requestId: e.Uc,
                requestKey: a
            }), e.kf.requestWithCredential("/auth/session", a, c), c = null)
        }), g.addEventListener("exit", d)) : c(V("TRANSPORT_UNAVAILABLE"))
    };
    nf.isAvailable = function () {
        return kf()
    };
    nf.prototype.uc = function () {
        return "redirect"
    };
    function of(a) {
        a = a || {};
        if (!a.window_features || -1 !== navigator.userAgent.indexOf("Fennec/") || -1 !== navigator.userAgent.indexOf("Firefox/") && -1 !== navigator.userAgent.indexOf("Android"))a.window_features = void 0;
        a.window_name || (a.window_name = "_blank");
        a.relay_url || (a.relay_url = jf() + "/auth/channel");
        this.options = a
    }

    of.prototype.open = function (a, b, c) {
        function d(a) {
            g && (document.body.removeChild(g), g = void 0);
            r && (r = clearInterval(r));
            ef(window, "message", e);
            ef(window, "unload", d);
            if (m && !a)try {
                m.close()
            } catch (b) {
                k.postMessage("die", l)
            }
            m = k = void 0
        }

        function e(a) {
            if (a.origin === l)try {
                var b = ua(a.data);
                "ready" === b.a ? k.postMessage(s, l) : "error" === b.a ? (d(!1), c && (c(b.d), c = null)) : "response" === b.a && (d(b.forceKeepWindowOpen), c && (c(null, b.d), c = null))
            } catch (e) {
            }
        }

        var f = lf(), g, k, l = ff(a);
        if (l !== ff(this.options.relay_url))c && setTimeout(function () {
                c(Error("invalid arguments: origin of url and relay_url must match"))
            },
            0); else {
            f && (g = document.createElement("iframe"), g.setAttribute("src", this.options.relay_url), g.style.display = "none", g.setAttribute("name", "__winchan_relay_frame"), document.body.appendChild(g), k = g.contentWindow);
            a += (/\?/.test(a) ? "" : "?") + hf(b);
            var m = window.open(a, this.options.window_name, this.options.window_features);
            k || (k = m);
            var r = setInterval(function () {
                m && m.closed && (d(!1), c && (c(V("USER_CANCELLED")), c = null))
            }, 500), s = t({a: "request", d: b});
            df(window, "unload", d);
            df(window, "message", e)
        }
    };
    of.isAvailable = function () {
        return "postMessage"in window && !/^file:\//.test(location.href) && !(kf() || navigator.userAgent.match(/Windows Phone/) || window.Windows && /^ms-appx:/.test(location.href) || navigator.userAgent.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i) || navigator.userAgent.match(/CriOS/) || navigator.userAgent.match(/Twitter for iPhone/) || navigator.userAgent.match(/FBAN\/FBIOS/) || window.navigator.standalone) && !navigator.userAgent.match(/PhantomJS/)
    };
    of.prototype.uc = function () {
        return "popup"
    };
    function pf(a) {
        a = a || {};
        a.callback_parameter || (a.callback_parameter = "callback");
        this.options = a;
        window.__firebase_auth_jsonp = window.__firebase_auth_jsonp || {}
    }

    pf.prototype.open = function (a, b, c) {
        function d() {
            c && (c(V("REQUEST_INTERRUPTED")), c = null)
        }

        function e() {
            setTimeout(function () {
                window.__firebase_auth_jsonp[f] = void 0;
                Bd(window.__firebase_auth_jsonp) && (window.__firebase_auth_jsonp = void 0);
                try {
                    var a = document.getElementById(f);
                    a && a.parentNode.removeChild(a)
                } catch (b) {
                }
            }, 1);
            ef(window, "beforeunload", d)
        }

        var f = "fn" + (new Date).getTime() + Math.floor(99999 * Math.random());
        b[this.options.callback_parameter] = "__firebase_auth_jsonp." + f;
        a += (/\?/.test(a) ? "" : "?") + hf(b);
        df(window, "beforeunload", d);
        window.__firebase_auth_jsonp[f] = function (a) {
            c && (c(null, a), c = null);
            e()
        };
        qf(f, a, c)
    };
    function qf(a, b, c) {
        setTimeout(function () {
            try {
                var d = document.createElement("script");
                d.type = "text/javascript";
                d.id = a;
                d.async = !0;
                d.src = b;
                d.onerror = function () {
                    var b = document.getElementById(a);
                    null !== b && b.parentNode.removeChild(b);
                    c && c(V("NETWORK_ERROR"))
                };
                var e = document.getElementsByTagName("head");
                (e && 0 != e.length ? e[0] : document.documentElement).appendChild(d)
            } catch (f) {
                c && c(V("NETWORK_ERROR"))
            }
        }, 0)
    }

    pf.isAvailable = function () {
        return !kf()
    };
    pf.prototype.uc = function () {
        return "json"
    };
    function rf(a, b) {
        this.Ge = ["session", a.Gd, a.yb].join(":");
        this.Pd = b
    }

    rf.prototype.set = function (a, b) {
        if (!b)if (this.Pd.length)b = this.Pd[0]; else throw Error("fb.login.SessionManager : No storage options available!");
        b.set(this.Ge, a)
    };
    rf.prototype.get = function () {
        var a = La(this.Pd, q(this.Tf, this)), a = Ka(a, function (a) {
            return null !== a
        });
        Ta(a, function (a, c) {
            return ve(c.token) - ve(a.token)
        });
        return 0 < a.length ? a.shift() : null
    };
    rf.prototype.Tf = function (a) {
        try {
            var b = a.get(this.Ge);
            if (b && b.token)return b
        } catch (c) {
        }
        return null
    };
    rf.prototype.clear = function () {
        var a = this;
        Ja(this.Pd, function (b) {
            b.remove(a.Ge)
        })
    };
    function sf(a) {
        a = a || {};
        this.Uc = Ha() + Ha() + Ha();
        this.kf = a || {}
    }

    sf.prototype.open = function (a, b) {
        Ba.set("redirect_request_id", this.Uc);
        b.requestId = this.Uc;
        b.redirectTo = b.redirectTo || window.location.href;
        a += (/\?/.test(a) ? "" : "?") + hf(b);
        window.location = a
    };
    sf.isAvailable = function () {
        return !/^file:\//.test(location.href) && !kf()
    };
    sf.prototype.uc = function () {
        return "redirect"
    };
    function tf(a, b, c, d) {
        td.call(this, ["auth_status"]);
        this.Q = a;
        this.Re = b;
        this.xg = c;
        this.Be = d;
        this.mc = new rf(a, [Aa, Ba]);
        this.jb = null;
        uf(this)
    }

    na(tf, td);
    h = tf.prototype;
    h.ne = function () {
        return this.jb || null
    };
    function uf(a) {
        Ba.get("redirect_request_id") && vf(a);
        var b = a.mc.get();
        b && b.token ? (wf(a, b), a.Re(b.token, function (c, d) {
            xf(a, c, d, !1, b.token, b)
        }, function (b, d) {
            yf(a, "resumeSession()", b, d)
        })) : wf(a, null)
    }

    function zf(a, b, c, d, e, f) {
        "firebaseio-demo.com" === a.Q.domain && z("Firebase authentication is not supported on demo Firebases (*.firebaseio-demo.com). To secure your Firebase, create a production Firebase at https://www.firebase.com.");
        a.Re(b, function (f, k) {
            xf(a, f, k, !0, b, c, d || {}, e)
        }, function (b, c) {
            yf(a, "auth()", b, c, f)
        })
    }

    function Af(a, b) {
        a.mc.clear();
        wf(a, null);
        a.xg(function (a, d) {
            if ("ok" === a)B(b, null); else {
                var e = (a || "error").toUpperCase(), f = e;
                d && (f += ": " + d);
                f = Error(f);
                f.code = e;
                B(b, f)
            }
        })
    }

    function xf(a, b, c, d, e, f, g, k) {
        "ok" === b ? (d && (b = c.auth, f.auth = b, f.expires = c.expires, f.token = we(e) ? e : "", c = null, b && u(b, "uid") ? c = v(b, "uid") : u(f, "uid") && (c = v(f, "uid")), f.uid = c, c = "custom", b && u(b, "provider") ? c = v(b, "provider") : u(f, "provider") && (c = v(f, "provider")), f.provider = c, a.mc.clear(), we(e) && (g = g || {}, c = Aa, "sessionOnly" === g.remember && (c = Ba), "none" !== g.remember && a.mc.set(f, c)), wf(a, f)), B(k, null, f)) : (a.mc.clear(), wf(a, null), f = a = (b || "error").toUpperCase(), c && (f += ": " + c), f = Error(f), f.code = a, B(k, f))
    }

    function yf(a, b, c, d, e) {
        z(b + " was canceled: " + d);
        a.mc.clear();
        wf(a, null);
        a = Error(d);
        a.code = c.toUpperCase();
        B(e, a)
    }

    function Bf(a, b, c, d, e) {
        Cf(a);
        var f = [mf, pf];
        c = new Ze(d || {}, {}, c || {});
        Df(a, f, "/auth/" + b, c, e)
    }

    function Ef(a, b, c, d) {
        Cf(a);
        var e = [of, nf];
        c = af(c);
        "anonymous" === b || "password" === b ? setTimeout(function () {
            B(d, V("TRANSPORT_UNAVAILABLE"))
        }, 0) : (c.Sd.window_features = "menubar=yes,modal=yes,alwaysRaised=yeslocation=yes,resizable=yes,scrollbars=yes,status=yes,height=625,width=625,top=" + ("object" === typeof screen ? .5 * (screen.height - 625) : 0) + ",left=" + ("object" === typeof screen ? .5 * (screen.width - 625) : 0), c.Sd.relay_url = jf() + "/" + a.Q.yb + "/auth/channel", c.Sd.requestWithCredential = q(a.Vc, a), Df(a, e, "/auth/" + b, c, d))
    }

    function vf(a) {
        var b = Ba.get("redirect_request_id");
        if (b) {
            var c = Ba.get("redirect_client_options");
            Ba.remove("redirect_request_id");
            Ba.remove("redirect_client_options");
            var d = [mf, pf], b = {requestId: b, requestKey: gf(document.location.hash)}, c = new Ze(c, {}, b);
            try {
                document.location.hash = document.location.hash.replace(/&__firebase_request_key=([a-zA-z0-9]*)/, "")
            } catch (e) {
            }
            Df(a, d, "/auth/session", c)
        }
    }

    h.je = function (a, b) {
        Cf(this);
        var c = af(a);
        c.lc._method = "POST";
        this.Vc("/users", c, function (a) {
            B(b, a)
        })
    };
    h.Ie = function (a, b) {
        var c = this;
        Cf(this);
        var d = "/users/" + encodeURIComponent(a.email), e = af(a);
        e.lc._method = "DELETE";
        this.Vc(d, e, function (a, d) {
            !a && d && d.uid && c.jb && c.jb.uid && c.jb.uid === d.uid && Af(c);
            B(b, a)
        })
    };
    h.ee = function (a, b) {
        Cf(this);
        var c = "/users/" + encodeURIComponent(a.email) + "/password", d = af(a);
        d.lc._method = "PUT";
        d.lc.password = a.newPassword;
        this.Vc(c, d, function (a) {
            B(b, a)
        })
    };
    h.Je = function (a, b) {
        Cf(this);
        var c = "/users/" + encodeURIComponent(a.email) + "/password", d = af(a);
        d.lc._method = "POST";
        this.Vc(c, d, function (a) {
            B(b, a)
        })
    };
    h.Vc = function (a, b, c) {
        Ff(this, [mf, pf], a, b, c)
    };
    function Df(a, b, c, d, e) {
        Ff(a, b, c, d, function (b, c) {
            !b && c && c.token && c.uid ? zf(a, c.token, c, d.ed, function (a, b) {
                a ? B(e, a) : B(e, null, b)
            }) : B(e, b || V("UNKNOWN_ERROR"))
        })
    }

    function Ff(a, b, c, d, e) {
        b = Ka(b, function (a) {
            return "function" === typeof a.isAvailable && a.isAvailable()
        });
        0 === b.length ? setTimeout(function () {
            B(e, V("TRANSPORT_UNAVAILABLE"))
        }, 0) : (b = new (b.shift())(d.Sd), d = wa(d.lc), d.v = "js-2.0.4", d.transport = b.uc(), d.suppress_status_codes = !0, a = jf() + "/" + a.Q.yb + c, b.open(a, d, function (a, b) {
            if (a)B(e, a); else if (b && b.error) {
                var c = Error(b.error.message);
                c.code = b.error.code;
                c.details = b.error.details;
                B(e, c)
            } else B(e, null, b)
        }))
    }

    function wf(a, b) {
        var c = null !== a.jb || null !== b;
        a.jb = b;
        c && a.Td("auth_status", b);
        a.Be(null !== b)
    }

    h.pe = function (a) {
        x("auth_status" === a, 'initial event must be of type "auth_status"');
        return [this.jb]
    };
    function Cf(a) {
        var b = a.Q;
        if ("firebaseio.com" !== b.domain && "firebaseio-demo.com" !== b.domain && "auth.firebase.com" === Ye)throw Error("This custom Firebase server ('" + a.Q.domain + "') does not support delegated login.");
    };
    function Gf(a, b) {
        return a && "object" === typeof a ? (x(".sv"in a, "Unexpected leaf node or priority contents"), b[a[".sv"]]) : a
    }

    function Hf(a, b) {
        var c = new Pe;
        Re(a, new P(""), function (a, e) {
            c.ic(a, If(e, b))
        });
        return c
    }

    function If(a, b) {
        var c = a.O().N(), c = Gf(c, b), d;
        if (a.P()) {
            var e = Gf(a.ta(), b);
            return e !== a.ta() || c !== a.O().N() ? new Zc(e, J(c)) : a
        }
        d = a;
        c !== a.O().N() && (d = d.ib(new Zc(c)));
        a.ea(L, function (a, c) {
            var e = If(c, b);
            e !== c && (d = d.I(a, e))
        });
        return d
    };
    function W(a, b, c, d) {
        this.type = a;
        this.Wa = b;
        this.nb = c;
        this.Rc = null;
        this.$f = d
    };
    function Jf() {
    }

    var Kf = new Jf;

    function Lf(a, b, c, d) {
        var e, f;
        f = X(c);
        e = X(b);
        if (d.e())return c.u ? (a = [], e ? e.da(f) || (e.P() ? a = Mf(f) : f.P() ? (a = [], e.P() || e.e() || a.push(new W("children_removed", e))) : a = Nf(e, f), a.push(new W("value", f))) : (a = Mf(f), a.push(new W("value", f))), 0 !== a.length || b.u || a.push(new W("value", f)), a) : e ? Nf(e, f) : Mf(f);
        if (".priority" === G(d))return !c.u || e && e.da(f) ? [] : [new W("value", f)];
        if (c.u || 1 === Q(d))return e = G(d), f = f.B(e), a.kd(b, c, e, f);
        e = G(d);
        return f.Y(e) ? (f = f.B(e), a.kd(b, c, e, f)) : []
    }

    Jf.prototype.kd = function (a, b, c, d) {
        (a = X(a)) ? a.Y(c) ? (a = a.B(c), c = a.da(d) ? [] : d.e() ? [new W("child_removed", a, c)] : [new W("child_changed", d, c, a)]) : c = d.e() ? [] : [new W("child_added", d, c)] : c = d.e() ? [] : [new W("child_added", d, c)];
        0 < c.length && b.u && c.push(new W("value", X(b)));
        return c
    };
    function Mf(a) {
        var b = [];
        a.P() || a.e() || b.push(new W("children_added", a));
        return b
    }

    function Nf(a, b) {
        var c = [], d = [], e = [], f = [], g = {}, k = {}, l, m, r, s;
        l = a.Aa(L);
        r = U(l);
        m = b.Aa(L);
        s = U(m);
        for (var y = H(L); null !== r || null !== s;) {
            var N;
            N = r ? s ? y(r, s) : -1 : 1;
            0 > N ? (N = v(g, r.name), n(N) ? (f.push(d[N]), d[N] = null) : (k[r.name] = e.length, e.push(r)), r = U(l)) : (0 < N ? (N = v(k, s.name), n(N) ? (f.push(s), e[N] = null) : (g[s.name] = d.length, d.push(s))) : ((r = r.K.hash() !== s.K.hash()) && f.push(s), r = U(l)), s = U(m))
        }
        for (g = 0; g < e.length; g++)(k = e[g]) && c.push(new W("child_removed", k.K, k.name));
        for (g = 0; g < d.length; g++)(e = d[g]) && c.push(new W("child_added",
            e.K, e.name));
        for (g = 0; g < f.length; g++)d = f[g], c.push(new W("child_changed", d.K, d.name, a.B(d.name)));
        return c
    }

    function Of(a, b, c) {
        this.bb = a;
        this.Ma = c;
        this.m = b
    }

    na(Of, Jf);
    Of.prototype.kd = function (a, b, c, d) {
        var e = X(a) || K, f = X(b) || K;
        if (e.Ua() < this.bb || f.Ua() < this.bb)return Of.oc.kd.call(this, a, b, c, d);
        x(!e.P() && !f.P(), "If it's a leaf node, we should have hit the above case.");
        a = [];
        var g = e.B(c);
        g.e() ? f.Y(c) && (e = this.Ma ? ld(e, this.m) : md(e, this.m), a.push(new W("child_removed", e.K, e.name)), a.push(new W("child_added", d, c))) : f.Y(c) ? d.da(g) || a.push(new W("child_changed", d, c, e.B(c))) : (a.push(new W("child_removed", g, c)), e = this.Ma ? ld(f, this.m) : md(f, this.m), a.push(new W("child_added",
            e.K, e.name)));
        0 < a.length && b.u && a.push(new W("value", f));
        return a
    };
    function Pf() {
    }

    h = Pf.prototype;
    h.Xa = function (a, b, c, d) {
        var e;
        if (b.type === Qf) {
            if (b.source.$e)return this.Fa(a, b.path, b.Oa, c, d);
            x(b.source.Ze, "Unknown source.");
            e = b.source.wf;
            return this.Sa(a, b.path, b.Oa, c, d, e)
        }
        if (b.type === Rf) {
            if (b.source.$e)return this.ae(a, b.path, b.children, c, d);
            x(b.source.Ze, "Unknown source.");
            e = b.source.wf;
            return this.$d(a, b.path, b.children, c, d, e)
        }
        if (b.type === Sf) {
            if (b.sf)a:{
                var f = b.path;
                Tf(this, a);
                b = a.u;
                e = a.X;
                if (a.F) {
                    x(a.u, "Must have event snap if we have server snap");
                    var g = c.Ya(f, a.u, a.F);
                    if (g)if (b = a.u.L(f,
                            g), f.e())b = this.G(b); else {
                        e = G(f);
                        b = b.B(e);
                        a = this.Ra(a, e, b, a.F, a.o, c, d);
                        break a
                    }
                } else if (a.o)if (a.u)(d = c.Ob()) ? b = this.G(d) : (c = c.Ya(f, a.u, a.o)) && (b = this.G(b.L(f, c))); else {
                    if (x(a.X, "We must at least have complete children"), x(!f.e(), "If the path were empty, we would have an event snap from the set"), c = c.Ya(f, a.X, a.o))e = a.X.L(f, c), e = this.G(e)
                } else if (a.u)(c = c.Ob()) && (b = this.G(c)); else if (a.X) {
                    x(!f.e(), "If the path was empty, we would have an event snap");
                    g = G(f);
                    if (a.X.Y(g)) {
                        a = (b = c.Ib.Ob(c.Gb.k(g))) ? this.Ra(a,
                            g, b, a.F, a.o, c, d) : this.Ra(a, g, K, a.F, a.o, c, null);
                        break a
                    }
                    x(1 < Q(f), "Must be a deep set being reverted")
                }
                a = new Uf(a.F, a.o, b, e)
            } else a = this.Ea(a, b.path, c, d);
            return a
        }
        if (b.type === Vf)return b = b.path, Tf(this, a), this.Sa(a, b, (a.ab() || K).$(b), c, d, !1);
        throw ib("Unknown operation type: " + b.type);
    };
    function Tf(a, b) {
        Wf(a, b.F);
        Wf(a, b.o);
        Wf(a, b.u);
        Wf(a, b.X)
    }

    function Wf(a, b) {
        x(!b || a.Yb(b), "Expected an indexed snap")
    }

    h.Fa = function (a, b, c, d, e) {
        Tf(this, a);
        if (b.e())return b = this.G(c), new Uf(a.F, a.o, b, null);
        var f = X(a) || K, g = G(b);
        return 1 === Q(b) || a.u || f.Y(g) ? (c = f.B(G(b)).L(R(b), c), this.Ra(a, G(b), c, a.F, a.o, d, e)) : a
    };
    h.ae = function (a, b, c, d, e) {
        Tf(this, a);
        var f = this, g = a;
        Xf(c, function (c, l) {
            var m = b.k(c);
            Yf(a, G(m)) && (g = f.Fa(g, m, l, d, e))
        });
        Xf(c, function (c, l) {
            var m = b.k(c);
            Yf(a, G(m)) || (g = f.Fa(g, m, l, d, e))
        });
        return g
    };
    h.Ea = function (a, b, c, d) {
        var e = a.u, f = a.X, g;
        Tf(this, a);
        if (a.F) {
            x(e, "If we have a server snap, we must have an event snap");
            var k = c.Ya(b, a.u, a.F);
            if (k)if (b.e())e = this.G(k); else return g = G(b), b = e.L(b, k).B(g), this.Ra(a, g, b, a.F, a.o, c, d)
        } else if (a.o)if (e) {
            var l = !1;
            a.o.ea(L, function (a, b) {
                l || e.B(a).da(b) || (l = !0);
                l && (e = e.I(a, b))
            });
            l && (e = this.G(e))
        } else if (f && (x(0 < Q(b), "If it were an empty path, we would have an event snap"), g = G(b), 1 === Q(b) || f.Y(g)) && (k = c.Ya(b, f, a.o)))return b = f.L(b, k).B(g), this.Ra(a, g, b, a.F,
            a.o, c, d);
        return new Uf(a.F, a.o, e, f)
    };
    h.Sa = function (a, b, c, d, e, f) {
        var g;
        Tf(this, a);
        var k = a.F, l = a.o;
        if (a.F)k = b.e() ? this.G(c, f) : this.G(a.F.L(b, c), f); else if (b.e())k = this.G(c, f), l = null; else if (1 === Q(b) && (a.o || !c.e()))l = a.o || this.Ia(K), l = this.G(l.L(b, c), f); else if (a.o && (g = G(b), a.o.Y(g)))var m = a.o.B(g).L(R(b), c), l = this.G(a.o.I(g, m), f);
        g = !1;
        f = a.u;
        m = a.X;
        if (k !== a.F || l !== a.o)if (k && !f)f = this.G(d.xa(k)), m = null; else if (k && f && !c.e() && k.$(b).da(f.$(b)))g = !0; else if (c = d.Ya(b, f, k || l))if (b.e())f = this.G(c), m = null; else {
            g = G(b);
            b = R(b);
            a:{
                f = g;
                if (a.u)m = a.u.B(f);
                else if (a.X)a.X.Y(f) ? m = a.X.B(f) : (x(b.e(), "According to precondition, this must be true"), m = K); else {
                    if (b.e()) {
                        m = c;
                        break a
                    }
                    x(a.F || a.o, "If we do not have event data, we must have server data");
                    m = (a.F || a.o).B(f)
                }
                m = m.e() && a.ab() ? a.ab().B(f).L(b, c) : m.L(b, c)
            }
            return this.Ra(a, g, m, k, l, d, e)
        } else g = !0;
        x(!g || f === a.u && m === a.X, "We thought we could skip diffing, but we changed the eventCache.");
        return new Uf(k, l, f, m)
    };
    h.$d = function (a, b, c, d, e, f) {
        if (!a.F && !a.o && b.e())return a;
        Tf(this, a);
        var g = this, k = a;
        Xf(c, function (c, m) {
            var r = b.k(c);
            Yf(a, G(r)) && (k = g.Sa(k, r, m, d, e, f))
        });
        Xf(c, function (c, m) {
            var r = b.k(c);
            Yf(a, G(r)) || (k = g.Sa(k, r, m, d, e, f))
        });
        return k
    };
    h.Ra = function (a, b, c, d, e) {
        var f = a.u;
        a = a.X;
        f ? f = this.G(f.I(b, c)) : (a || (a = this.Ia(K)), a = this.G(a.I(b, c)));
        return new Uf(d, e, f, a)
    };
    h.G = function (a) {
        return this.Ia(a)
    };
    function Yf(a, b) {
        var c = X(a), d = a.ab();
        return !!(c && c.Y(b) || d && d.Y(b))
    };
    function Zf(a) {
        this.gb = a;
        this.index = a.m;
        this.gb.ha && n(pc(this.gb)) ? (a = qc(this.gb), a = this.index.ye(pc(this.gb), a)) : a = this.index.Ae();
        this.Fb = a;
        this.gb.na && n(rc(this.gb)) ? (a = sc(this.gb), a = this.index.ye(rc(this.gb), a)) : a = this.index.ze();
        this.pb = a
    }

    na(Zf, Pf);
    Zf.prototype.Ia = function (a) {
        return a.Wd(this.index)
    };
    Zf.prototype.Yb = function (a) {
        return a.Yb(this.index)
    };
    Zf.prototype.G = function (a, b) {
        if (!1 === b)return Zf.oc.G.call(this, a, !1);
        if (a.P())return this.Ia(K);
        for (var c = this.Ia(a), d = this.Fb, e = this.pb, f = H(this.index), g = c.Aa(this.index), k = U(g); k && 0 < f(d, k);)c = c.I(k.name, K), k = U(g);
        g = c.rb(e, this.index);
        for ((k = U(g)) && 0 >= f(k, e) && (k = U(g)); k;)c = c.I(k.name, K), k = U(g);
        return c
    };
    Zf.prototype.Fa = function (a, b, c, d, e) {
        Tf(this, a);
        if (1 < Q(b)) {
            var f = G(b);
            if ((null !== X(a) ? X(a) : K).Y(f))return Zf.oc.Fa.call(this, a, b, c, d, e);
            var g = null !== e ? e : a.ab(), g = null !== g && g.Y(f) ? g.B(f) : null, g = d.k(f).xa(g);
            return null !== g ? (b = g.L(R(b), c), this.Ra(a, f, b, a.F, a.o, d, e)) : a
        }
        return Zf.oc.Fa.call(this, a, b, c, d, e)
    };
    function $f(a) {
        Zf.call(this, a);
        this.Ma = !("" === a.Hb ? a.ha : "l" === a.Hb);
        this.bb = tc(a)
    }

    na($f, Zf);
    $f.prototype.G = function (a, b) {
        if (!1 === b)return $f.oc.G.call(this, a, !1);
        if (a.P())return this.Ia(K);
        var c = this.Ia(a), d, e, f, g;
        if (2 * this.bb < a.Ua())for (d = this.Ia(K.ib(a.O())), c = this.Ma ? c.Sb(this.pb, this.index) : c.rb(this.Fb, this.index), e = U(c), f = 0; e && f < this.bb;)if (g = this.Ma ? 0 >= H(this.index)(this.Fb, e) : 0 >= H(this.index)(e, this.pb))d = d.I(e.name, e.K), f++, e = U(c); else break; else {
            d = this.Ia(a);
            var k, l, m = H(this.index);
            if (this.Ma) {
                c = c.bf(this.index);
                k = this.pb;
                l = this.Fb;
                var r = m, m = function (a, b) {
                    return -1 * r(a, b)
                }
            } else c =
                c.Aa(this.index), k = this.Fb, l = this.pb;
            f = 0;
            var s = !1;
            for (e = U(c); e;)!s && 0 >= m(k, e) && (s = !0), (g = s && f < this.bb && 0 >= m(e, l)) ? f++ : d = d.I(e.name, K), e = U(c)
        }
        return d
    };
    $f.prototype.Ra = function (a, b, c, d, e, f, g) {
        var k = X(a);
        return !k || k.Ua() < this.bb ? $f.oc.Ra.call(this, a, b, c, d, e, f, g) : (b = ag(this, a, b, c, f, g || d)) ? a.u ? new Uf(d, e, b, null) : new Uf(d, e, null, b) : new Uf(d, e, a.u, a.X)
    };
    function ag(a, b, c, d, e, f) {
        var g = H(a.index), k;
        k = a.Ma ? function (a, b) {
            return -1 * g(a, b)
        } : g;
        b = X(b);
        x(b.Ua() === a.bb, "Limit should be full.");
        var l = new I(c, d), m = a.Ma ? ld(b, a.index) : md(b, a.index);
        x(null != m, "Shouldn't be null, since oldEventCache shouldn't be empty.");
        var r = 0 >= H(a.index)(a.Fb, l) && 0 >= H(a.index)(l, a.pb);
        if (b.Y(c)) {
            f = e.de(f, m, 1, a.Ma, a.index);
            e = null;
            0 < f.length && (e = f[0], e.name === c && (e = 2 <= f.length ? f[1] : null));
            k = null == e ? 1 : k(e, l);
            if (r && !d.e() && 0 <= k)return b.I(c, d);
            c = b.I(c, K);
            return null != e && 0 >= H(a.index)(a.Fb,
                e) && 0 >= H(a.index)(e, a.pb) ? c.I(e.name, e.K) : c
        }
        return d.e() ? null : r ? 0 <= k(m, l) ? b.I(c, d).I(m.name, K) : null : null
    };
    function bg(a) {
        this.m = a
    }

    na(bg, Pf);
    bg.prototype.Ia = function (a) {
        return a.Wd(this.m)
    };
    bg.prototype.Yb = function (a) {
        return a.Yb(this.m)
    };
    function cg(a) {
        this.U = a;
        this.m = a.w.m
    }

    function dg(a, b, c, d) {
        var e = [], f = a.m, g = La(Ka(b, function (a) {
            return "child_changed" === a.type && f.df(a.$f, a.Wa)
        }), function (a) {
            return new W("child_moved", a.Wa, a.nb)
        }), k = Pa(b, function (a) {
            return "child_removed" !== a.type && "child_added" !== a.type
        });
        for (la(Ra, b, k, 0).apply(null, g); 0 < b.length;) {
            var g = b[0].type, k = eg(b, g), l = b.slice(0, k);
            b = b.slice(k);
            "value" === g || "children_added" === g || "children_removed" === g ? x(1 === l.length, "We should not have more than one of these at a view") : Ta(l, q(a.Lf, a));
            e = e.concat(fg(a, d, l, c))
        }
        return e
    }

    function eg(a, b) {
        var c = Pa(a, function (a) {
            return a.type !== b
        });
        return -1 === c ? a.length : c
    }

    function fg(a, b, c, d) {
        for (var e = [], f = 0; f < c.length; ++f)for (var g = c[f], k = null, l = null, m = 0; m < b.length; ++m) {
            var r = b[m];
            if (r.pf(g.type)) {
                if (!k && !l)if ("children_added" === g.type) {
                    var s = a, y = g.Wa, l = [];
                    if (!y.P() && !y.e())for (var s = y.Aa(s.m), y = null, N = U(s); N;) {
                        var Je = new W("child_added", N.K, N.name);
                        Je.Rc = y;
                        l.push(Je);
                        y = N.name;
                        N = U(s)
                    }
                } else if ("children_removed" === g.type) {
                    if (s = a, y = g.Wa, l = [], !y.P() && !y.e())for (s = y.Aa(s.m), y = U(s); y;)l.push(new W("child_removed", y.K, y.name)), y = U(s)
                } else k = g, "value" !== k.type && "child_removed" !==
                k.type && (k.Rc = d.af(k.nb, k.Wa, a.m));
                if (k)e.push(r.createEvent(k, a.U)); else for (s = 0; s < l.length; ++s)e.push(r.createEvent(l[s], a.U))
            }
        }
        return e
    }

    cg.prototype.Lf = function (a, b) {
        if (null == a.nb || null == b.nb)throw ib("Should only compare child_ events.");
        return this.m.compare(new I(a.nb, a.Wa), new I(b.nb, b.Wa))
    };
    function gg(a, b) {
        this.U = a;
        var c = a.w;
        wc(c) ? (this.ec = new bg(c.m), this.ld = Kf) : c.ka ? (this.ec = new $f(c), this.ld = new Of(tc(c), c.m, this.ec.Ma)) : (this.ec = new Zf(c), this.ld = Kf);
        c = this.ec;
        this.ia = new Uf(b.F && c.G(b.F, !1), b.o && c.G(b.o, !1), b.u && c.G(b.u), b.X && c.G(b.X));
        this.ya = [];
        this.le = new cg(a)
    }

    function hg(a) {
        return a.U
    }

    h = gg.prototype;
    h.ab = function () {
        return this.ia.ab()
    };
    h.za = function (a) {
        var b = this.ia.za();
        return b && (wc(this.U.w) || !a.e() && !b.B(G(a)).e()) ? b.$(a) : null
    };
    h.e = function () {
        return 0 === this.ya.length
    };
    h.Jb = function (a) {
        this.ya.push(a)
    };
    h.hb = function (a, b) {
        var c = [];
        if (b) {
            x(null == a, "A cancel should cancel all event registrations.");
            var d = this.U.path;
            Ja(this.ya, function (a) {
                (a = a.Te(b, d)) && c.push(a)
            })
        }
        if (a) {
            for (var e = [], f = 0; f < this.ya.length; ++f) {
                var g = this.ya[f];
                if (!g.matches(a))e.push(g); else if (a.cf()) {
                    e = e.concat(this.ya.slice(f + 1));
                    break
                }
            }
            this.ya = e
        } else this.ya = [];
        return c
    };
    h.Xa = function (a, b, c) {
        a.type === Rf && null !== a.source.fc && (x(this.ia.za(), "We should always have a full cache before handling merges"), x(!!this.ia.u, "Missing event cache, even though we have a server cache"));
        var d = this.ia;
        b = this.ec.Xa(d, a, b, c);
        Tf(this.ec, b);
        this.ia = b;
        return X(b) !== X(d) ? (a = Lf(this.ld, d, b, a.path), d = X(b), dg(this.le, a, d, this.ya)) : b.u && !d.u ? (x(X(b) === X(d), "Caches should be the same."), d = X(b), dg(this.le, [new W("value", d)], d, this.ya)) : []
    };
    function Uf(a, b, c, d) {
        this.F = a;
        this.o = b;
        this.u = c;
        this.X = d;
        x(null == a || null == b, "Only one of serverSnap / serverChildren can be non-null.");
        x(null == c || null == d, "Only one of eventSnap / eventChildren can be non-null.")
    }

    function X(a) {
        return a.u || a.X
    }

    Uf.prototype.ab = function () {
        return this.F || this.o
    };
    Uf.prototype.za = function () {
        return this.F
    };
    var ig = new Uf(null, null, null, null);

    function jg(a, b) {
        this.value = a;
        this.children = b || kg
    }

    var kg = new Lc(function (a, b) {
        return a === b ? 0 : a < b ? -1 : 1
    }), lg = new jg(null);

    function mg(a) {
        var b = lg;
        A(a, function (a, d) {
            b = b.set(new P(d), a)
        });
        return b
    }

    h = jg.prototype;
    h.e = function () {
        return null === this.value && this.children.e()
    };
    function ng(a, b, c) {
        if (null != a.value && c(a.value))return {path: S, value: a.value};
        if (b.e())return null;
        var d = G(b);
        a = a.children.get(d);
        return null !== a ? (b = ng(a, R(b), c), null != b ? {path: (new P(d)).k(b.path), value: b.value} : null) : null
    }

    function og(a, b) {
        return ng(a, b, function () {
            return !0
        })
    }

    h.subtree = function (a) {
        if (a.e())return this;
        var b = this.children.get(G(a));
        return null !== b ? b.subtree(R(a)) : lg
    };
    h.set = function (a, b) {
        if (a.e())return new jg(b, this.children);
        var c = G(a), d = (this.children.get(c) || lg).set(R(a), b), c = this.children.Ja(c, d);
        return new jg(this.value, c)
    };
    h.remove = function (a) {
        if (a.e())return this.children.e() ? lg : new jg(null, this.children);
        var b = G(a), c = this.children.get(b);
        return c ? (a = c.remove(R(a)), b = a.e() ? this.children.remove(b) : this.children.Ja(b, a), null === this.value && b.e() ? lg : new jg(this.value, b)) : this
    };
    h.get = function (a) {
        if (a.e())return this.value;
        var b = this.children.get(G(a));
        return b ? b.get(R(a)) : null
    };
    function pg(a, b, c) {
        if (b.e())return c;
        var d = G(b);
        b = pg(a.children.get(d) || lg, R(b), c);
        d = b.e() ? a.children.remove(d) : a.children.Ja(d, b);
        return new jg(a.value, d)
    }

    function qg(a, b) {
        return rg(a, S, b)
    }

    function rg(a, b, c) {
        var d = {};
        a.children.Ba(function (a, f) {
            d[a] = rg(f, b.k(a), c)
        });
        return c(b, a.value, d)
    }

    function sg(a, b, c) {
        return tg(a, b, S, c)
    }

    function tg(a, b, c, d) {
        var e = a.value ? d(c, a.value) : !1;
        if (e)return e;
        if (b.e())return null;
        e = G(b);
        return (a = a.children.get(e)) ? tg(a, R(b), c.k(e), d) : null
    }

    function ug(a, b, c) {
        if (!b.e()) {
            var d = !0;
            a.value && (d = c(S, a.value));
            !0 === d && (d = G(b), (a = a.children.get(d)) && vg(a, R(b), S.k(d), c))
        }
    }

    function vg(a, b, c, d) {
        if (b.e())return a;
        a.value && d(c, a.value);
        var e = G(b);
        return (a = a.children.get(e)) ? vg(a, R(b), c.k(e), d) : lg
    }

    function Xf(a, b) {
        wg(a, S, b)
    }

    function wg(a, b, c) {
        a.children.Ba(function (a, e) {
            wg(e, b.k(a), c)
        });
        a.value && c(b, a.value)
    }

    function xg(a, b) {
        a.children.Ba(function (a, d) {
            d.value && b(a, d.value)
        })
    };
    function yg() {
        this.qa = {}
    }

    h = yg.prototype;
    h.e = function () {
        return Bd(this.qa)
    };
    h.Xa = function (a, b, c) {
        var d = a.source.fc;
        if (null !== d)return d = v(this.qa, d), x(null != d, "SyncTree gave us an op for an invalid query."), d.Xa(a, b, c);
        var e = [];
        A(this.qa, function (d) {
            e = e.concat(d.Xa(a, b, c))
        });
        return e
    };
    h.Jb = function (a, b, c, d, e) {
        var f = a.Da(), g = v(this.qa, f);
        g || (c = (g = c.xa(d)) ? null : c.ce(e), d = new Uf(d, e, g, c), g = new gg(a, d), this.qa[f] = g);
        g.Jb(b);
        a = g;
        (f = X(a.ia)) ? (d = Lf(a.ld, ig, a.ia, S), b = dg(a.le, d, f, b ? [b] : a.ya)) : b = [];
        return b
    };
    h.hb = function (a, b, c) {
        var d = a.Da(), e = [], f = [], g = null != zg(this);
        if ("default" === d) {
            var k = this;
            A(this.qa, function (a, d) {
                f = f.concat(a.hb(b, c));
                a.e() && (delete k.qa[d], wc(a.U.w) || e.push(a.U))
            })
        } else {
            var l = v(this.qa, d);
            l && (f = f.concat(l.hb(b, c)), l.e() && (delete this.qa[d], wc(l.U.w) || e.push(l.U)))
        }
        g && null == zg(this) && e.push(new O(a.g, a.path));
        return {mg: e, Pf: f}
    };
    function Ag(a) {
        return Ka(xd(a.qa), function (a) {
            return !wc(a.U.w)
        })
    }

    h.za = function (a) {
        var b = null;
        A(this.qa, function (c) {
            b = b || c.za(a)
        });
        return b
    };
    function Bg(a, b) {
        if (wc(b.w))return zg(a);
        var c = b.Da();
        return v(a.qa, c)
    }

    function zg(a) {
        return Ad(a.qa, function (a) {
                return wc(a.U.w)
            }) || null
    };
    function Cg() {
        this.V = lg;
        this.ra = [];
        this.Ec = -1
    }

    function Dg(a, b) {
        var c = Pa(a.ra, function (a) {
            return a.Xd === b
        });
        x(0 <= c, "removeWrite called with nonexistent writeId.");
        var d = a.ra[c];
        a.ra.splice(c, 1);
        for (var e = !1, f = !1, g = !1, k = a.ra.length - 1; !e && 0 <= k;) {
            var l = a.ra[k];
            k >= c && Eg(l, d.path) ? e = !0 : !f && d.path.contains(l.path) && (k >= c ? f = !0 : g = !0);
            k--
        }
        e || (f || g ? Fg(a) : d.Oa ? a.V = a.V.remove(d.path) : A(d.children, function (b, c) {
            a.V = a.V.remove(d.path.k(c))
        }));
        c = d.path;
        if (og(a.V, c)) {
            if (g)return c;
            x(e, "Must have found a shadow");
            return null
        }
        return c
    }

    h = Cg.prototype;
    h.Ob = function (a) {
        var b = og(this.V, a);
        if (b) {
            var c = b.value;
            a = T(b.path, a);
            return c.$(a)
        }
        return null
    };
    h.xa = function (a, b, c, d) {
        var e, f;
        if (c || d)return e = this.V.subtree(a), !d && e.e() ? b : d || null !== b || null !== e.value ? (e = Gg(this.ra, function (b) {
            return (b.visible || d) && (!c || !(0 <= Ia(c, b.Xd))) && (b.path.contains(a) || a.contains(b.path))
        }, a), f = b || K, Xf(e, function (a, b) {
            f = f.L(a, b)
        }), f) : null;
        if (e = og(this.V, a))return b = T(e.path, a), e.value.$(b);
        e = this.V.subtree(a);
        return e.e() ? b : b || e.value ? (f = b || K, Xf(e, function (a, b) {
            f = f.L(a, b)
        }), f) : null
    };
    h.ce = function (a, b) {
        var c = !1, d = K, e = this.Ob(a);
        if (e)return e.P() || e.ea(L, function (a, b) {
            d = d.I(a, b)
        }), d;
        if (b)return d = b, xg(this.V.subtree(a), function (a, b) {
            d = d.I(a, b)
        }), d;
        xg(this.V.subtree(a), function (a, b) {
            c = !0;
            d = d.I(a, b)
        });
        return c ? d : null
    };
    h.Ya = function (a, b, c, d) {
        x(c || d, "Either existingEventSnap or existingServerSnap must exist");
        a = a.k(b);
        if (og(this.V, a))return null;
        a = this.V.subtree(a);
        if (a.e())return d.$(b);
        var e;
        c ? (e = !1, Xf(a, function (a, b) {
            e || c.$(a).da(b) || (e = !0)
        })) : e = !0;
        if (e) {
            var f = d.$(b);
            Xf(a, function (a, b) {
                f = f.L(a, b)
            });
            return f
        }
        return null
    };
    h.de = function (a, b, c, d, e, f) {
        var g;
        a = this.V.subtree(a);
        a.value ? g = a.value : b && (g = b, Xf(a, function (a, b) {
            g = g.L(a, b)
        }));
        if (g) {
            b = [];
            g = g.Wd(f);
            a = H(f);
            e = e ? g.Sb(c, f) : g.rb(c, f);
            for (f = U(e); f && b.length < d;)0 !== a(f, c) && b.push(f), f = U(e);
            return b
        }
        return []
    };
    function Eg(a, b) {
        return a.Oa ? a.path.contains(b) : !!zd(a.children, function (c, d) {
            return a.path.k(d).contains(b)
        })
    }

    function Fg(a) {
        a.V = Gg(a.ra, Hg, S);
        a.Ec = 0 < a.ra.length ? a.ra[a.ra.length - 1].Xd : -1
    }

    function Hg(a) {
        return a.visible
    }

    function Gg(a, b, c) {
        for (var d = lg, e = 0; e < a.length; ++e) {
            var f = a[e];
            if (b(f)) {
                var g = f.path, k;
                f.Oa ? (c.contains(g) ? (k = T(c, g), f = f.Oa) : (k = S, f = f.Oa.$(T(g, c))), d = Ig(d, k, f)) : d = Jg(d, f.path, f.children)
            }
        }
        return d
    }

    function Ig(a, b, c) {
        var d = og(a, b);
        if (d) {
            var e = d.value, d = d.path;
            b = T(d, b);
            c = e.L(b, c);
            a = pg(a, d, new jg(c))
        } else a = pg(a, b, new jg(c));
        return a
    }

    function Jg(a, b, c) {
        var d = og(a, b);
        if (d) {
            var e = d.value, d = d.path, f = T(d, b), g = e;
            A(c, function (a, b) {
                g = g.L(f.k(b), a)
            });
            a = pg(a, d, new jg(g))
        } else A(c, function (c, d) {
            a = pg(a, b.k(d), new jg(c))
        });
        return a
    }

    function Kg(a, b) {
        this.Gb = a;
        this.Ib = b
    }

    h = Kg.prototype;
    h.Ob = function () {
        return this.Ib.Ob(this.Gb)
    };
    h.xa = function (a, b, c) {
        return this.Ib.xa(this.Gb, a, b, c)
    };
    h.ce = function (a) {
        return this.Ib.ce(this.Gb, a)
    };
    h.Ya = function (a, b, c) {
        return this.Ib.Ya(this.Gb, a, b, c)
    };
    h.de = function (a, b, c, d, e) {
        return this.Ib.de(this.Gb, a, b, c, d, e)
    };
    h.k = function (a) {
        return new Kg(this.Gb.k(a), this.Ib)
    };
    function Lg(a, b, c) {
        this.type = Qf;
        this.source = a;
        this.path = b;
        this.Oa = c
    }

    Lg.prototype.Mc = function (a) {
        return this.path.e() ? new Lg(this.source, S, this.Oa.B(a)) : new Lg(this.source, R(this.path), this.Oa)
    };
    function Mg(a, b) {
        this.type = Sf;
        this.source = Ng;
        this.path = a;
        this.sf = b
    }

    Mg.prototype.Mc = function () {
        return this.path.e() ? this : new Mg(R(this.path), this.sf)
    };
    function Og(a, b) {
        this.type = Vf;
        this.source = a;
        this.path = b
    }

    Og.prototype.Mc = function () {
        return this.path.e() ? new Og(this.source, S) : new Og(this.source, R(this.path))
    };
    function Pg(a, b, c) {
        this.type = Rf;
        this.source = a;
        this.path = b;
        this.children = c
    }

    Pg.prototype.Mc = function (a) {
        if (this.path.e())return a = this.children.subtree(new P(a)), a.e() ? null : a.value ? new Lg(this.source, S, a.value) : new Pg(this.source, S, a);
        x(G(this.path) === a, "Can't get a merge for a child not on the path of the operation");
        return new Pg(this.source, R(this.path), this.children)
    };
    var Qf = 0, Rf = 1, Sf = 2, Vf = 3;

    function Qg(a, b, c, d) {
        this.$e = a;
        this.Ze = b;
        this.fc = c;
        this.wf = d;
        x(!d || b, "Tagged queries must be from server.")
    }

    var Ng = new Qg(!0, !1, null, !1), Rg = new Qg(!1, !0, null, !1);

    function Sg(a) {
        this.ma = lg;
        this.Bb = new Cg;
        this.Zc = {};
        this.gc = {};
        this.Fc = a
    }

    h = Sg.prototype;
    h.Fa = function (a, b, c, d) {
        var e = this.Bb, f = d;
        x(c > e.Ec, "Stacking an older write on top of newer ones");
        n(f) || (f = !0);
        e.ra.push({path: a, Oa: b, Xd: c, visible: f});
        f && (e.V = Ig(e.V, a, b));
        e.Ec = c;
        return d ? Tg(this, new Lg(Ng, a, b)) : []
    };
    h.ae = function (a, b, c) {
        var d = this.Bb;
        x(c > d.Ec, "Stacking an older merge on top of newer ones");
        d.ra.push({path: a, children: b, Xd: c, visible: !0});
        d.V = Jg(d.V, a, b);
        d.Ec = c;
        b = mg(b);
        return Tg(this, new Pg(Ng, a, b))
    };
    h.Ea = function (a, b) {
        b = b || !1;
        var c = Dg(this.Bb, a);
        return null == c ? [] : Tg(this, new Mg(c, b))
    };
    h.Sa = function (a, b) {
        return Tg(this, new Lg(Rg, a, b))
    };
    h.$d = function (a, b) {
        var c = mg(b);
        return Tg(this, new Pg(Rg, a, c))
    };
    function Ug(a, b, c, d) {
        d = Cd(a.Zc, "_" + d);
        if (null != d) {
            var e = Vg(d);
            d = e.path;
            e = e.fc;
            b = T(d, b);
            c = new Lg(new Qg(!1, !0, e, !0), b, c);
            return Wg(a, d, c)
        }
        return []
    }

    function Xg(a, b, c, d) {
        if (d = Cd(a.Zc, "_" + d)) {
            var e = Vg(d);
            d = e.path;
            e = e.fc;
            b = T(d, b);
            c = mg(c);
            c = new Pg(new Qg(!1, !0, e, !0), b, c);
            return Wg(a, d, c)
        }
        return []
    }

    h.Jb = function (a, b) {
        var c = a.path, d = null, e = !1;
        ug(this.ma, c, function (a, b) {
            var f = T(a, c);
            d = b.za(f);
            e = e || null != zg(b);
            return !d
        });
        var f = this.ma.get(c);
        f ? (e = e || null != zg(f), d = d || f.za(S)) : (f = new yg, this.ma = this.ma.set(c, f));
        var g = null;
        if (!d) {
            var k = !1, g = K;
            xg(this.ma.subtree(c), function (a, b) {
                var c = b.za(S);
                c && (k = !0, g = g.I(a, c))
            });
            k || (g = null)
        }
        var l = null != Bg(f, a);
        if (!l && !wc(a.w)) {
            var m = Yg(a);
            x(!(m in this.gc), "View does not exist, but we have a tag");
            var r = Zg++;
            this.gc[m] = r;
            this.Zc["_" + r] = m
        }
        m = f.Jb(a, b, new Kg(c, this.Bb),
            d, g);
        l || e || (f = Bg(f, a), m = m.concat($g(this, a, f)));
        return m
    };
    h.hb = function (a, b, c) {
        var d = a.path, e = this.ma.get(d), f = [];
        if (e && ("default" === a.Da() || null != Bg(e, a))) {
            f = e.hb(a, b, c);
            e.e() && (this.ma = this.ma.remove(d));
            e = f.mg;
            f = f.Pf;
            b = -1 !== Pa(e, function (a) {
                    return wc(a.w)
                });
            var g = sg(this.ma, d, function (a, b) {
                return null != zg(b)
            });
            if (b && !g && (d = this.ma.subtree(d), !d.e()))for (var d = ah(d), k = 0; k < d.length; ++k) {
                var l = d[k], m = l.U, l = bh(this, l);
                this.Fc.Le(m, ch(this, m), l.qd, l.H)
            }
            if (!g && 0 < e.length && !c)if (b)this.Fc.Od(a, null); else {
                var r = this;
                Ja(e, function (a) {
                    a.Da();
                    var b = r.gc[Yg(a)];
                    r.Fc.Od(a, b)
                })
            }
            dh(this, e)
        }
        return f
    };
    h.xa = function (a, b) {
        var c = this.Bb, d = sg(this.ma, a, function (b, c) {
            var d = T(b, a);
            if (d = c.za(d))return d
        });
        return c.xa(a, d, b, !0)
    };
    function ah(a) {
        return qg(a, function (a, c, d) {
            if (c && null != zg(c))return [zg(c)];
            var e = [];
            c && (e = Ag(c));
            A(d, function (a) {
                e = e.concat(a)
            });
            return e
        })
    }

    function dh(a, b) {
        for (var c = 0; c < b.length; ++c) {
            var d = b[c];
            if (!wc(d.w)) {
                var d = Yg(d), e = a.gc[d];
                delete a.gc[d];
                delete a.Zc["_" + e]
            }
        }
    }

    function $g(a, b, c) {
        var d = b.path, e = ch(a, b);
        c = bh(a, c);
        b = a.Fc.Le(b, e, c.qd, c.H);
        d = a.ma.subtree(d);
        if (e)x(null == zg(d.value), "If we're adding a query, it shouldn't be shadowed"); else for (e = qg(d, function (a, b, c) {
            if (!a.e() && b && null != zg(b))return [hg(zg(b))];
            var d = [];
            b && (d = d.concat(La(Ag(b), function (a) {
                return a.U
            })));
            A(c, function (a) {
                d = d.concat(a)
            });
            return d
        }), d = 0; d < e.length; ++d)c = e[d], a.Fc.Od(c, ch(a, c));
        return b
    }

    function bh(a, b) {
        var c = b.U, d = ch(a, c);
        return {
            qd: function () {
                return (b.ab() || K).hash()
            }, H: function (b, f) {
                if ("ok" === b) {
                    if (f && "object" === typeof f && u(f, "w")) {
                        var g = v(f, "w");
                        ea(g) && 0 <= Ia(g, "no_index") && z("Using an unspecified index. Consider adding " + ('".indexOn": "' + c.w.m.toString() + '"') + " at " + c.path.toString() + " to your security rules for better performance")
                    }
                    if (d) {
                        var k = c.path;
                        if (g = Cd(a.Zc, "_" + d))var l = Vg(g), g = l.path, l = l.fc, k = T(g, k), k = new Og(new Qg(!1, !0, l, !0), k), g = Wg(a, g, k); else g = []
                    } else g = Tg(a, new Og(Rg,
                        c.path));
                    return g
                }
                g = "Unknown Error";
                "too_big" === b ? g = "The data requested exceeds the maximum size that can be accessed with a single request." : "permission_denied" == b ? g = "Client doesn't have permission to access the desired data." : "unavailable" == b && (g = "The service is unavailable");
                g = Error(b + ": " + g);
                g.code = b.toUpperCase();
                return a.hb(c, null, g)
            }
        }
    }

    function Yg(a) {
        return a.path.toString() + "$" + a.Da()
    }

    function Vg(a) {
        var b = a.indexOf("$");
        x(-1 !== b && b < a.length - 1, "Bad queryKey.");
        return {fc: a.substr(b + 1), path: new P(a.substr(0, b))}
    }

    function ch(a, b) {
        var c = Yg(b);
        return v(a.gc, c)
    }

    var Zg = 1;

    function Wg(a, b, c) {
        var d = a.ma.get(b);
        x(d, "Missing sync point for query tag that we're tracking");
        return d.Xa(c, new Kg(b, a.Bb), null)
    }

    function Tg(a, b) {
        return eh(a, b, a.ma, null, new Kg(S, a.Bb))
    }

    function eh(a, b, c, d, e) {
        if (b.path.e())return fh(a, b, c, d, e);
        var f = c.get(S);
        null == d && null != f && (d = f.za(S));
        var g = [], k = G(b.path), l = b.Mc(k);
        if ((c = c.children.get(k)) && l)var m = d ? d.B(k) : null, k = e.k(k), g = g.concat(eh(a, l, c, m, k));
        f && (g = g.concat(f.Xa(b, e, d)));
        return g
    }

    function fh(a, b, c, d, e) {
        var f = c.get(S);
        null == d && null != f && (d = f.za(S));
        var g = [];
        c.children.Ba(function (c, f) {
            var m = d ? d.B(c) : null, r = e.k(c), s = b.Mc(c);
            s && (g = g.concat(fh(a, s, f, m, r)))
        });
        f && (g = g.concat(f.Xa(b, e, d)));
        return g
    };
    function gh(a) {
        this.Q = a;
        this.Qa = Ld(a);
        this.Z = new Te;
        this.zd = 1;
        this.S = new xe(this.Q, q(this.Cd, this), q(this.Ad, this), q(this.Ee, this));
        this.ug = Md(a, q(function () {
            return new Id(this.Qa, this.S)
        }, this));
        this.pc = new Fc;
        this.qe = new Se;
        var b = this;
        this.ud = new Sg({
            Le: function (a, d, e, f) {
                d = [];
                e = b.qe.Wc.$(a.path);
                e.e() || (d = b.ud.Sa(a.path, e), setTimeout(function () {
                    f("ok")
                }, 0));
                return d
            }, Od: ba
        });
        hh(this, "connected", !1);
        this.fa = new Pe;
        this.T = new tf(a, q(this.S.T, this.S), q(this.S.Pe, this.S), q(this.Be, this));
        this.jd = 0;
        this.re = null;
        this.M = new Sg({
            Le: function (a, d, e, f) {
                Be(b.S, a, e, d, function (d, e) {
                    var l = f(d, e);
                    Xe(b.Z, a.path, l)
                });
                return []
            }, Od: function (a, d) {
                var e = b.S, f = a.path.toString(), g = a.Da();
                e.f("Unlisten called for " + f + " " + g);
                if (De(e, f, g) && e.ja) {
                    var k = Dc(a);
                    e.f("Unlisten on " + f + " for " + g);
                    f = {p: f};
                    d && (f.q = k, f.t = d);
                    e.wa("n", f)
                }
            }
        })
    }

    h = gh.prototype;
    h.toString = function () {
        return (this.Q.Cb ? "https://" : "http://") + this.Q.host
    };
    h.name = function () {
        return this.Q.yb
    };
    function ih(a) {
        var b = new P(".info/serverTimeOffset");
        a = a.qe.Wc.$(b).N() || 0;
        return (new Date).getTime() + a
    }

    function jh(a) {
        a = a = {timestamp: ih(a)};
        a.timestamp = a.timestamp || (new Date).getTime();
        return a
    }

    h.Cd = function (a, b, c, d) {
        this.jd++;
        var e = new P(a);
        b = this.re ? this.re(a, b) : b;
        a = [];
        d ? c ? (b = fd(b, function (a) {
            return J(a)
        }), a = Xg(this.M, e, b, d)) : (b = J(b), a = Ug(this.M, e, b, d)) : c ? (d = fd(b, function (a) {
            return J(a)
        }), a = this.M.$d(e, d)) : (d = J(b), a = this.M.Sa(e, d));
        d = e;
        0 < a.length && (d = kh(this, e));
        Xe(this.Z, d, a)
    };
    h.Ad = function (a) {
        hh(this, "connected", a);
        !1 === a && lh(this)
    };
    h.Ee = function (a) {
        var b = this;
        Cb(a, function (a, d) {
            hh(b, d, a)
        })
    };
    h.Be = function (a) {
        hh(this, "authenticated", a)
    };
    function hh(a, b, c) {
        b = new P("/.info/" + b);
        c = J(c);
        var d = a.qe;
        d.Wc = d.Wc.L(b, c);
        c = a.ud.Sa(b, c);
        Xe(a.Z, b, c)
    }

    h.Db = function (a, b, c, d) {
        this.f("set", {path: a.toString(), value: b, Cg: c});
        var e = jh(this);
        b = J(b, c);
        var e = If(b, e), f = this.zd++, e = this.M.Fa(a, e, f, !0);
        Ue(this.Z, e);
        var g = this;
        this.S.put(a.toString(), b.N(!0), function (b, c) {
            var e = "ok" === b;
            e || z("set at " + a + " failed: " + b);
            e = g.M.Ea(f, !e);
            Xe(g.Z, a, e);
            mh(d, b, c)
        });
        e = nh(this, a);
        kh(this, e);
        Xe(this.Z, e, [])
    };
    h.update = function (a, b, c) {
        this.f("update", {path: a.toString(), value: b});
        var d = !0, e = jh(this), f = {};
        A(b, function (a, b) {
            d = !1;
            var c = J(a);
            f[b] = If(c, e)
        });
        if (d)kb("update() called with empty data.  Don't do anything."), mh(c, "ok"); else {
            var g = this.zd++, k = this.M.ae(a, f, g);
            Ue(this.Z, k);
            var l = this;
            Ke(this.S, a.toString(), b, function (b, d) {
                x("ok" === b || "permission_denied" === b, "merge at " + a + " failed.");
                var e = "ok" === b;
                e || z("update at " + a + " failed: " + b);
                var e = l.M.Ea(g, !e), f = a;
                0 < e.length && (f = kh(l, a));
                Xe(l.Z, f, e);
                mh(c, b, d)
            });
            b = nh(this, a);
            kh(this, b);
            Xe(this.Z, a, [])
        }
    };
    function lh(a) {
        a.f("onDisconnectEvents");
        var b = jh(a), c = [];
        Re(Hf(a.fa, b), S, function (b, e) {
            c = c.concat(a.M.Sa(b, e));
            var f = nh(a, b);
            kh(a, f)
        });
        a.fa = new Pe;
        Xe(a.Z, S, c)
    }

    h.Ce = function (a, b) {
        var c = this;
        this.S.Ce(a.toString(), function (d, e) {
            "ok" === d && Qe(c.fa, a);
            mh(b, d, e)
        })
    };
    function oh(a, b, c, d) {
        var e = J(c);
        Fe(a.S, b.toString(), e.N(!0), function (c, g) {
            "ok" === c && a.fa.ic(b, e);
            mh(d, c, g)
        })
    }

    function ph(a, b, c, d, e) {
        var f = J(c, d);
        Fe(a.S, b.toString(), f.N(!0), function (c, d) {
            "ok" === c && a.fa.ic(b, f);
            mh(e, c, d)
        })
    }

    function qh(a, b, c, d) {
        var e = !0, f;
        for (f in c)e = !1;
        e ? (kb("onDisconnect().update() called with empty data.  Don't do anything."), mh(d, "ok")) : He(a.S, b.toString(), c, function (e, f) {
            if ("ok" === e)for (var l in c) {
                var m = J(c[l]);
                a.fa.ic(b.k(l), m)
            }
            mh(d, e, f)
        })
    }

    function Bc(a, b, c) {
        c = ".info" === G(b.path) ? a.ud.Jb(b, c) : a.M.Jb(b, c);
        Cc(a.Z, b.path, c)
    }

    h.tb = function () {
        this.S.tb()
    };
    h.kc = function () {
        this.S.kc()
    };
    h.Me = function (a) {
        if ("undefined" !== typeof console) {
            a ? (this.Nd || (this.Nd = new Hd(this.Qa)), a = this.Nd.get()) : a = this.Qa.get();
            var b = Ma(yd(a), function (a, b) {
                return Math.max(b.length, a)
            }, 0), c;
            for (c in a) {
                for (var d = a[c], e = c.length; e < b + 2; e++)c += " ";
                console.log(c + d)
            }
        }
    };
    h.Ne = function (a) {
        Gd(this.Qa, a);
        this.ug.uf[a] = !0
    };
    h.f = function (a) {
        kb("r:" + this.S.id + ":", arguments)
    };
    function mh(a, b, c) {
        a && Fb(function () {
            if ("ok" == b)a(null); else {
                var d = (b || "error").toUpperCase(), e = d;
                c && (e += ": " + c);
                e = Error(e);
                e.code = d;
                a(e)
            }
        })
    };
    function rh(a, b, c, d, e) {
        function f() {
        }

        a.f("transaction on " + b);
        var g = new O(a, b);
        g.zb("value", f);
        c = {
            path: b, update: c, H: d, status: null, lf: hb(), Qe: e, rf: 0, Vd: function () {
                g.bc("value", f)
            }, Yd: null, sa: null, fd: null, gd: null, hd: null
        };
        d = a.M.xa(b, void 0) || K;
        c.fd = d;
        d = c.update(d.N());
        if (n(d)) {
            Tb("transaction failed: Data returned ", d);
            c.status = 1;
            e = Gc(a.pc, b);
            var k = e.ta() || [];
            k.push(c);
            Hc(e, k);
            "object" === typeof d && null !== d && u(d, ".priority") ? (k = v(d, ".priority"), x(Rb(k), "Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")) :
                k = (a.M.xa(b) || K).O().N();
            e = jh(a);
            d = J(d, k);
            e = If(d, e);
            c.gd = d;
            c.hd = e;
            c.sa = a.zd++;
            c = a.M.Fa(b, e, c.sa, c.Qe);
            Xe(a.Z, b, c);
            sh(a)
        } else c.Vd(), c.gd = null, c.hd = null, c.H && (a = new C(c.fd, new O(a, c.path), L), c.H(null, !1, a))
    }

    function sh(a, b) {
        var c = b || a.pc;
        b || th(a, c);
        if (null !== c.ta()) {
            var d = uh(a, c);
            x(0 < d.length, "Sending zero length transaction queue");
            Na(d, function (a) {
                return 1 === a.status
            }) && vh(a, c.path(), d)
        } else c.pd() && c.ea(function (b) {
            sh(a, b)
        })
    }

    function vh(a, b, c) {
        for (var d = La(c, function (a) {
            return a.sa
        }), e = a.M.xa(b, d) || K, d = e, e = e.hash(), f = 0; f < c.length; f++) {
            var g = c[f];
            x(1 === g.status, "tryToSendTransactionQueue_: items in queue should all be run.");
            g.status = 2;
            g.rf++;
            var k = T(b, g.path), d = d.L(k, g.gd)
        }
        d = d.N(!0);
        a.S.put(b.toString(), d, function (d) {
            a.f("transaction put response", {path: b.toString(), status: d});
            var e = [];
            if ("ok" === d) {
                d = [];
                for (f = 0; f < c.length; f++) {
                    c[f].status = 3;
                    e = e.concat(a.M.Ea(c[f].sa));
                    if (c[f].H) {
                        var g = c[f].hd, k = new O(a, c[f].path);
                        d.push(q(c[f].H,
                            null, null, !0, new C(g, k, L)))
                    }
                    c[f].Vd()
                }
                th(a, Gc(a.pc, b));
                sh(a);
                Xe(a.Z, b, e);
                for (f = 0; f < d.length; f++)Fb(d[f])
            } else {
                if ("datastale" === d)for (f = 0; f < c.length; f++)c[f].status = 4 === c[f].status ? 5 : 1; else for (z("transaction at " + b.toString() + " failed: " + d), f = 0; f < c.length; f++)c[f].status = 5, c[f].Yd = d;
                kh(a, b)
            }
        }, e)
    }

    function kh(a, b) {
        var c = wh(a, b), d = c.path(), c = uh(a, c);
        xh(a, c, d);
        return d
    }

    function xh(a, b, c) {
        if (0 !== b.length) {
            for (var d = [], e = [], f = La(b, function (a) {
                return a.sa
            }), g = 0; g < b.length; g++) {
                var k = b[g], l = T(c, k.path), m = !1, r;
                x(null !== l, "rerunTransactionsUnderNode_: relativePath should not be null.");
                if (5 === k.status)m = !0, r = k.Yd, e = e.concat(a.M.Ea(k.sa, !0)); else if (1 === k.status)if (25 <= k.rf)m = !0, r = "maxretry", e = e.concat(a.M.Ea(k.sa, !0)); else {
                    var s = a.M.xa(k.path, f) || K;
                    k.fd = s;
                    var y = b[g].update(s.N());
                    n(y) ? (Tb("transaction failed: Data returned ", y), l = J(y), "object" === typeof y && null != y && u(y,
                        ".priority") || (l = l.ib(s.O())), s = k.sa, y = jh(a), y = If(l, y), k.gd = l, k.hd = y, k.sa = a.zd++, Qa(f, s), e = e.concat(a.M.Fa(k.path, y, k.sa, k.Qe)), e = e.concat(a.M.Ea(s, !0))) : (m = !0, r = "nodata", e = e.concat(a.M.Ea(k.sa, !0)))
                }
                Xe(a.Z, c, e);
                e = [];
                m && (b[g].status = 3, setTimeout(b[g].Vd, Math.floor(0)), b[g].H && ("nodata" === r ? (k = new O(a, b[g].path), d.push(q(b[g].H, null, null, !1, new C(b[g].fd, k, L)))) : d.push(q(b[g].H, null, Error(r), !1, null))))
            }
            th(a, a.pc);
            for (g = 0; g < d.length; g++)Fb(d[g]);
            sh(a)
        }
    }

    function wh(a, b) {
        for (var c, d = a.pc; null !== (c = G(b)) && null === d.ta();)d = Gc(d, c), b = R(b);
        return d
    }

    function uh(a, b) {
        var c = [];
        yh(a, b, c);
        c.sort(function (a, b) {
            return a.lf - b.lf
        });
        return c
    }

    function yh(a, b, c) {
        var d = b.ta();
        if (null !== d)for (var e = 0; e < d.length; e++)c.push(d[e]);
        b.ea(function (b) {
            yh(a, b, c)
        })
    }

    function th(a, b) {
        var c = b.ta();
        if (c) {
            for (var d = 0, e = 0; e < c.length; e++)3 !== c[e].status && (c[d] = c[e], d++);
            c.length = d;
            Hc(b, 0 < c.length ? c : null)
        }
        b.ea(function (b) {
            th(a, b)
        })
    }

    function nh(a, b) {
        var c = wh(a, b).path(), d = Gc(a.pc, b);
        Kc(d, function (b) {
            zh(a, b)
        });
        zh(a, d);
        Jc(d, function (b) {
            zh(a, b)
        });
        return c
    }

    function zh(a, b) {
        var c = b.ta();
        if (null !== c) {
            for (var d = [], e = [], f = -1, g = 0; g < c.length; g++)4 !== c[g].status && (2 === c[g].status ? (x(f === g - 1, "All SENT items should be at beginning of queue."), f = g, c[g].status = 4, c[g].Yd = "set") : (x(1 === c[g].status, "Unexpected transaction status in abort"), c[g].Vd(), e = e.concat(a.M.Ea(c[g].sa, !0)), c[g].H && d.push(q(c[g].H, null, Error("set"), !1, null))));
            -1 === f ? Hc(b, null) : c.length = f + 1;
            Xe(a.Z, b.path(), e);
            for (g = 0; g < d.length; g++)Fb(d[g])
        }
    };
    function Ah() {
        this.jc = {}
    }

    ca(Ah);
    Ah.prototype.tb = function () {
        for (var a in this.jc)this.jc[a].tb()
    };
    Ah.prototype.interrupt = Ah.prototype.tb;
    Ah.prototype.kc = function () {
        for (var a in this.jc)this.jc[a].kc()
    };
    Ah.prototype.resume = Ah.prototype.kc;
    function Bh(a) {
        var b = this;
        this.tc = a;
        this.Qd = "*";
        lf() ? this.Hc = this.sd = cf() : (this.Hc = window.opener, this.sd = window);
        if (!b.Hc)throw"Unable to find relay frame";
        df(this.sd, "message", q(this.cc, this));
        df(this.sd, "message", q(this.hf, this));
        try {
            Ch(this, {a: "ready"})
        } catch (c) {
            df(this.Hc, "load", function () {
                Ch(b, {a: "ready"})
            })
        }
        df(window, "unload", q(this.eg, this))
    }

    function Ch(a, b) {
        b = t(b);
        lf() ? a.Hc.doPost(b, a.Qd) : a.Hc.postMessage(b, a.Qd)
    }

    Bh.prototype.cc = function (a) {
        var b = this, c;
        try {
            c = ua(a.data)
        } catch (d) {
        }
        c && "request" === c.a && (ef(window, "message", this.cc), this.Qd = a.origin, this.tc && setTimeout(function () {
            b.tc(b.Qd, c.d, function (a, c) {
                b.If = !c;
                b.tc = void 0;
                Ch(b, {a: "response", d: a, forceKeepWindowOpen: c})
            })
        }, 0))
    };
    Bh.prototype.eg = function () {
        try {
            ef(this.sd, "message", this.hf)
        } catch (a) {
        }
        this.tc && (Ch(this, {a: "error", d: "unknown closed window"}), this.tc = void 0);
        try {
            window.close()
        } catch (b) {
        }
    };
    Bh.prototype.hf = function (a) {
        if (this.If && "die" === a.data)try {
            window.close()
        } catch (b) {
        }
    };
    var Y = {
        Rf: function () {
            Yd = Pd = !0
        }
    };
    Y.forceLongPolling = Y.Rf;
    Y.Sf = function () {
        Zd = !0
    };
    Y.forceWebSockets = Y.Sf;
    Y.rg = function (a, b) {
        a.g.S.Ke = b
    };
    Y.setSecurityDebugCallback = Y.rg;
    Y.Me = function (a, b) {
        a.g.Me(b)
    };
    Y.stats = Y.Me;
    Y.Ne = function (a, b) {
        a.g.Ne(b)
    };
    Y.statsIncrementCounter = Y.Ne;
    Y.jd = function (a) {
        return a.g.jd
    };
    Y.dataUpdateCount = Y.jd;
    Y.Vf = function (a, b) {
        a.g.re = b
    };
    Y.interceptServerData = Y.Vf;
    Y.bg = function (a) {
        new Bh(a)
    };
    Y.onPopupOpen = Y.bg;
    Y.pg = function (a) {
        Ye = a
    };
    Y.setAuthenticationServer = Y.pg;
    function Z(a, b) {
        this.Sc = a;
        this.Ca = b
    }

    Z.prototype.cancel = function (a) {
        D("Firebase.onDisconnect().cancel", 0, 1, arguments.length);
        F("Firebase.onDisconnect().cancel", 1, a, !0);
        this.Sc.Ce(this.Ca, a || null)
    };
    Z.prototype.cancel = Z.prototype.cancel;
    Z.prototype.remove = function (a) {
        D("Firebase.onDisconnect().remove", 0, 1, arguments.length);
        $b("Firebase.onDisconnect().remove", this.Ca);
        F("Firebase.onDisconnect().remove", 1, a, !0);
        oh(this.Sc, this.Ca, null, a)
    };
    Z.prototype.remove = Z.prototype.remove;
    Z.prototype.set = function (a, b) {
        D("Firebase.onDisconnect().set", 1, 2, arguments.length);
        $b("Firebase.onDisconnect().set", this.Ca);
        Sb("Firebase.onDisconnect().set", a, !1);
        F("Firebase.onDisconnect().set", 2, b, !0);
        oh(this.Sc, this.Ca, a, b)
    };
    Z.prototype.set = Z.prototype.set;
    Z.prototype.Db = function (a, b, c) {
        D("Firebase.onDisconnect().setWithPriority", 2, 3, arguments.length);
        $b("Firebase.onDisconnect().setWithPriority", this.Ca);
        Sb("Firebase.onDisconnect().setWithPriority", a, !1);
        Wb("Firebase.onDisconnect().setWithPriority", 2, b);
        F("Firebase.onDisconnect().setWithPriority", 3, c, !0);
        ph(this.Sc, this.Ca, a, b, c)
    };
    Z.prototype.setWithPriority = Z.prototype.Db;
    Z.prototype.update = function (a, b) {
        D("Firebase.onDisconnect().update", 1, 2, arguments.length);
        $b("Firebase.onDisconnect().update", this.Ca);
        if (ea(a)) {
            for (var c = {}, d = 0; d < a.length; ++d)c["" + d] = a[d];
            a = c;
            z("Passing an Array to Firebase.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")
        }
        Vb("Firebase.onDisconnect().update", a);
        F("Firebase.onDisconnect().update", 2, b, !0);
        qh(this.Sc,
            this.Ca, a, b)
    };
    Z.prototype.update = Z.prototype.update;
    var $ = {};
    $.rc = xe;
    $.DataConnection = $.rc;
    xe.prototype.tg = function (a, b) {
        this.wa("q", {p: a}, b)
    };
    $.rc.prototype.simpleListen = $.rc.prototype.tg;
    xe.prototype.Nf = function (a, b) {
        this.wa("echo", {d: a}, b)
    };
    $.rc.prototype.echo = $.rc.prototype.Nf;
    xe.prototype.interrupt = xe.prototype.tb;
    $.zf = ie;
    $.RealTimeConnection = $.zf;
    ie.prototype.sendRequest = ie.prototype.wa;
    ie.prototype.close = ie.prototype.close;
    $.Uf = function (a) {
        var b = xe.prototype.put;
        xe.prototype.put = function (c, d, e, f) {
            n(f) && (f = a());
            b.call(this, c, d, e, f)
        };
        return function () {
            xe.prototype.put = b
        }
    };
    $.hijackHash = $.Uf;
    $.yf = Ca;
    $.ConnectionTarget = $.yf;
    $.Da = function (a) {
        return a.Da()
    };
    $.queryIdentifier = $.Da;
    $.Wf = function (a) {
        return a.g.S.ua
    };
    $.listens = $.Wf;
    var Dh = function () {
        var a = 0, b = [];
        return function (c) {
            var d = c === a;
            a = c;
            for (var e = Array(8), f = 7; 0 <= f; f--)e[f] = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c % 64), c = Math.floor(c / 64);
            x(0 === c, "Cannot push at time == 0");
            c = e.join("");
            if (d) {
                for (f = 11; 0 <= f && 63 === b[f]; f--)b[f] = 0;
                b[f]++
            } else for (f = 0; 12 > f; f++)b[f] = Math.floor(64 * Math.random());
            for (f = 0; 12 > f; f++)c += "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);
            x(20 === c.length, "NextPushId: Length should be 20.");
            return c
        }
    }();

    function O(a, b) {
        var c, d, e;
        if (a instanceof gh)c = a, d = b; else {
            D("new Firebase", 1, 2, arguments.length);
            d = ub(arguments[0]);
            c = d.vg;
            "firebase" === d.domain && tb(d.host + " is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead");
            c || tb("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com");
            d.Cb || "undefined" !== typeof window && window.location && window.location.protocol && -1 !== window.location.protocol.indexOf("https:") && z("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");
            c = new Ca(d.host, d.Cb, c, "ws" === d.scheme || "wss" === d.scheme);
            d = new P(d.Pc);
            e = d.toString();
            var f;
            !(f = !p(c.host) || 0 === c.host.length || !Qb(c.yb)) && (f = 0 !== e.length) && (e && (e = e.replace(/^\/*\.info(\/|$)/, "/")), f = !(p(e) && 0 !== e.length && !Pb.test(e)));
            if (f)throw Error(E("new Firebase", 1, !1) + 'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".');
            if (b)if (b instanceof Ah)e = b; else if (p(b))e = Ah.Qb(), c.Gd = b; else throw Error("Expected a valid Firebase.Context for second argument to new Firebase()");
            else e = Ah.Qb();
            f = c.toString();
            var g = v(e.jc, f);
            g || (g = new gh(c), e.jc[f] = g);
            c = g
        }
        M.call(this, c, d, oc, !1)
    }

    na(O, M);
    var Eh = O, Fh = ["Firebase"], Gh = aa;
    Fh[0]in Gh || !Gh.execScript || Gh.execScript("var " + Fh[0]);
    for (var Hh; Fh.length && (Hh = Fh.shift());)!Fh.length && n(Eh) ? Gh[Hh] = Eh : Gh = Gh[Hh] ? Gh[Hh] : Gh[Hh] = {};
    O.prototype.name = function () {
        z("Firebase.name() being deprecated. Please use Firebase.key() instead.");
        D("Firebase.name", 0, 0, arguments.length);
        return this.key()
    };
    O.prototype.name = O.prototype.name;
    O.prototype.key = function () {
        D("Firebase.key", 0, 0, arguments.length);
        var a;
        this.path.e() ? a = null : (a = this.path, a = a.ba < a.n.length ? a.n[a.n.length - 1] : null);
        return a
    };
    O.prototype.key = O.prototype.key;
    O.prototype.k = function (a) {
        D("Firebase.child", 1, 1, arguments.length);
        if (ga(a))a = String(a); else if (!(a instanceof P))if (null === G(this.path)) {
            var b = a;
            b && (b = b.replace(/^\/*\.info(\/|$)/, "/"));
            Zb("Firebase.child", b)
        } else Zb("Firebase.child", a);
        return new O(this.g, this.path.k(a))
    };
    O.prototype.child = O.prototype.k;
    O.prototype.parent = function () {
        D("Firebase.parent", 0, 0, arguments.length);
        var a = this.path.parent();
        return null === a ? null : new O(this.g, a)
    };
    O.prototype.parent = O.prototype.parent;
    O.prototype.root = function () {
        D("Firebase.ref", 0, 0, arguments.length);
        for (var a = this; null !== a.parent();)a = a.parent();
        return a
    };
    O.prototype.root = O.prototype.root;
    O.prototype.toString = function () {
        D("Firebase.toString", 0, 0, arguments.length);
        var a;
        if (null === this.parent())a = this.g.toString(); else {
            a = this.parent().toString() + "/";
            var b = this.key();
            a += encodeURIComponent(String(b))
        }
        return a
    };
    O.prototype.toString = O.prototype.toString;
    O.prototype.set = function (a, b) {
        D("Firebase.set", 1, 2, arguments.length);
        $b("Firebase.set", this.path);
        Sb("Firebase.set", a, !1);
        F("Firebase.set", 2, b, !0);
        this.g.Db(this.path, a, null, b || null)
    };
    O.prototype.set = O.prototype.set;
    O.prototype.update = function (a, b) {
        D("Firebase.update", 1, 2, arguments.length);
        $b("Firebase.update", this.path);
        if (ea(a)) {
            for (var c = {}, d = 0; d < a.length; ++d)c["" + d] = a[d];
            a = c;
            z("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")
        }
        Vb("Firebase.update", a);
        F("Firebase.update", 2, b, !0);
        if (u(a, ".priority"))throw Error("update() does not currently support updating .priority.");
        this.g.update(this.path, a, b || null)
    };
    O.prototype.update = O.prototype.update;
    O.prototype.Db = function (a, b, c) {
        D("Firebase.setWithPriority", 2, 3, arguments.length);
        $b("Firebase.setWithPriority", this.path);
        Sb("Firebase.setWithPriority", a, !1);
        Wb("Firebase.setWithPriority", 2, b);
        F("Firebase.setWithPriority", 3, c, !0);
        if (".length" === this.key() || ".keys" === this.key())throw"Firebase.setWithPriority failed: " + this.key() + " is a read-only object.";
        this.g.Db(this.path, a, b, c || null)
    };
    O.prototype.setWithPriority = O.prototype.Db;
    O.prototype.remove = function (a) {
        D("Firebase.remove", 0, 1, arguments.length);
        $b("Firebase.remove", this.path);
        F("Firebase.remove", 1, a, !0);
        this.set(null, a)
    };
    O.prototype.remove = O.prototype.remove;
    O.prototype.transaction = function (a, b, c) {
        D("Firebase.transaction", 1, 3, arguments.length);
        $b("Firebase.transaction", this.path);
        F("Firebase.transaction", 1, a, !1);
        F("Firebase.transaction", 2, b, !0);
        if (n(c) && "boolean" != typeof c)throw Error(E("Firebase.transaction", 3, !0) + "must be a boolean.");
        if (".length" === this.key() || ".keys" === this.key())throw"Firebase.transaction failed: " + this.key() + " is a read-only object.";
        "undefined" === typeof c && (c = !0);
        rh(this.g, this.path, a, b || null, c)
    };
    O.prototype.transaction = O.prototype.transaction;
    O.prototype.qg = function (a, b) {
        D("Firebase.setPriority", 1, 2, arguments.length);
        $b("Firebase.setPriority", this.path);
        Wb("Firebase.setPriority", 1, a);
        F("Firebase.setPriority", 2, b, !0);
        this.g.Db(this.path.k(".priority"), a, null, b)
    };
    O.prototype.setPriority = O.prototype.qg;
    O.prototype.push = function (a, b) {
        D("Firebase.push", 0, 2, arguments.length);
        $b("Firebase.push", this.path);
        Sb("Firebase.push", a, !0);
        F("Firebase.push", 2, b, !0);
        var c = ih(this.g), c = Dh(c), c = this.k(c);
        "undefined" !== typeof a && null !== a && c.set(a, b);
        return c
    };
    O.prototype.push = O.prototype.push;
    O.prototype.fb = function () {
        $b("Firebase.onDisconnect", this.path);
        return new Z(this.g, this.path)
    };
    O.prototype.onDisconnect = O.prototype.fb;
    O.prototype.T = function (a, b, c) {
        z("FirebaseRef.auth() being deprecated. Please use FirebaseRef.authWithCustomToken() instead.");
        D("Firebase.auth", 1, 3, arguments.length);
        ac("Firebase.auth", a);
        F("Firebase.auth", 2, b, !0);
        F("Firebase.auth", 3, b, !0);
        zf(this.g.T, a, {}, {remember: "none"}, b, c)
    };
    O.prototype.auth = O.prototype.T;
    O.prototype.Pe = function (a) {
        D("Firebase.unauth", 0, 1, arguments.length);
        F("Firebase.unauth", 1, a, !0);
        Af(this.g.T, a)
    };
    O.prototype.unauth = O.prototype.Pe;
    O.prototype.ne = function () {
        D("Firebase.getAuth", 0, 0, arguments.length);
        return this.g.T.ne()
    };
    O.prototype.getAuth = O.prototype.ne;
    O.prototype.ag = function (a, b) {
        D("Firebase.onAuth", 1, 2, arguments.length);
        F("Firebase.onAuth", 1, a, !1);
        Nb("Firebase.onAuth", 2, b);
        this.g.T.zb("auth_status", a, b)
    };
    O.prototype.onAuth = O.prototype.ag;
    O.prototype.Zf = function (a, b) {
        D("Firebase.offAuth", 1, 2, arguments.length);
        F("Firebase.offAuth", 1, a, !1);
        Nb("Firebase.offAuth", 2, b);
        this.g.T.bc("auth_status", a, b)
    };
    O.prototype.offAuth = O.prototype.Zf;
    O.prototype.Df = function (a, b, c) {
        D("Firebase.authWithCustomToken", 2, 3, arguments.length);
        ac("Firebase.authWithCustomToken", a);
        F("Firebase.authWithCustomToken", 2, b, !1);
        cc("Firebase.authWithCustomToken", 3, c, !0);
        zf(this.g.T, a, {}, c || {}, b)
    };
    O.prototype.authWithCustomToken = O.prototype.Df;
    O.prototype.Ef = function (a, b, c) {
        D("Firebase.authWithOAuthPopup", 2, 3, arguments.length);
        bc("Firebase.authWithOAuthPopup", 1, a);
        F("Firebase.authWithOAuthPopup", 2, b, !1);
        cc("Firebase.authWithOAuthPopup", 3, c, !0);
        Ef(this.g.T, a, c, b)
    };
    O.prototype.authWithOAuthPopup = O.prototype.Ef;
    O.prototype.Ff = function (a, b, c) {
        D("Firebase.authWithOAuthRedirect", 2, 3, arguments.length);
        bc("Firebase.authWithOAuthRedirect", 1, a);
        F("Firebase.authWithOAuthRedirect", 2, b, !1);
        cc("Firebase.authWithOAuthRedirect", 3, c, !0);
        var d = this.g.T;
        Cf(d);
        var e = [sf], f = af(c);
        "anonymous" === a || "firebase" === a ? B(b, V("TRANSPORT_UNAVAILABLE")) : (Ba.set("redirect_client_options", f.ed), Df(d, e, "/auth/" + a, f, b))
    };
    O.prototype.authWithOAuthRedirect = O.prototype.Ff;
    O.prototype.Gf = function (a, b, c, d) {
        D("Firebase.authWithOAuthToken", 3, 4, arguments.length);
        bc("Firebase.authWithOAuthToken", 1, a);
        F("Firebase.authWithOAuthToken", 3, c, !1);
        cc("Firebase.authWithOAuthToken", 4, d, !0);
        p(b) ? (bc("Firebase.authWithOAuthToken", 2, b), Bf(this.g.T, a + "/token", {access_token: b}, d, c)) : (cc("Firebase.authWithOAuthToken", 2, b, !1), Bf(this.g.T, a + "/token", b, d, c))
    };
    O.prototype.authWithOAuthToken = O.prototype.Gf;
    O.prototype.Cf = function (a, b) {
        D("Firebase.authAnonymously", 1, 2, arguments.length);
        F("Firebase.authAnonymously", 1, a, !1);
        cc("Firebase.authAnonymously", 2, b, !0);
        Bf(this.g.T, "anonymous", {}, b, a)
    };
    O.prototype.authAnonymously = O.prototype.Cf;
    O.prototype.Hf = function (a, b, c) {
        D("Firebase.authWithPassword", 2, 3, arguments.length);
        cc("Firebase.authWithPassword", 1, a, !1);
        dc("Firebase.authWithPassword", a, "email");
        dc("Firebase.authWithPassword", a, "password");
        F("Firebase.authAnonymously", 2, b, !1);
        cc("Firebase.authAnonymously", 3, c, !0);
        Bf(this.g.T, "password", a, c, b)
    };
    O.prototype.authWithPassword = O.prototype.Hf;
    O.prototype.je = function (a, b) {
        D("Firebase.createUser", 2, 2, arguments.length);
        cc("Firebase.createUser", 1, a, !1);
        dc("Firebase.createUser", a, "email");
        dc("Firebase.createUser", a, "password");
        F("Firebase.createUser", 2, b, !1);
        this.g.T.je(a, b)
    };
    O.prototype.createUser = O.prototype.je;
    O.prototype.Ie = function (a, b) {
        D("Firebase.removeUser", 2, 2, arguments.length);
        cc("Firebase.removeUser", 1, a, !1);
        dc("Firebase.removeUser", a, "email");
        dc("Firebase.removeUser", a, "password");
        F("Firebase.removeUser", 2, b, !1);
        this.g.T.Ie(a, b)
    };
    O.prototype.removeUser = O.prototype.Ie;
    O.prototype.ee = function (a, b) {
        D("Firebase.changePassword", 2, 2, arguments.length);
        cc("Firebase.changePassword", 1, a, !1);
        dc("Firebase.changePassword", a, "email");
        dc("Firebase.changePassword", a, "oldPassword");
        dc("Firebase.changePassword", a, "newPassword");
        F("Firebase.changePassword", 2, b, !1);
        this.g.T.ee(a, b)
    };
    O.prototype.changePassword = O.prototype.ee;
    O.prototype.Je = function (a, b) {
        D("Firebase.resetPassword", 2, 2, arguments.length);
        cc("Firebase.resetPassword", 1, a, !1);
        dc("Firebase.resetPassword", a, "email");
        F("Firebase.resetPassword", 2, b, !1);
        this.g.T.Je(a, b)
    };
    O.prototype.resetPassword = O.prototype.Je;
    O.goOffline = function () {
        D("Firebase.goOffline", 0, 0, arguments.length);
        Ah.Qb().tb()
    };
    O.goOnline = function () {
        D("Firebase.goOnline", 0, 0, arguments.length);
        Ah.Qb().kc()
    };
    function qb(a, b) {
        x(!b || !0 === a || !1 === a, "Can't turn on custom loggers persistently.");
        !0 === a ? ("undefined" !== typeof console && ("function" === typeof console.log ? ob = q(console.log, console) : "object" === typeof console.log && (ob = function (a) {
            console.log(a)
        })), b && Ba.set("logging_enabled", !0)) : a ? ob = a : (ob = null, Ba.remove("logging_enabled"))
    }

    O.enableLogging = qb;
    O.ServerValue = {TIMESTAMP: {".sv": "timestamp"}};
    O.SDK_VERSION = "2.0.4";
    O.INTERNAL = Y;
    O.Context = Ah;
    O.TEST_ACCESS = $;
})();
