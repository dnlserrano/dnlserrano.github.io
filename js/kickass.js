/*
  Copyright (c) <2011, 2012> Rootof Creations HB, rootof.com, kickassapp.com
*/
(function(window) {
    /*!
      Raphael 1.5.2 - JavaScript Vector Library

      Copyright (c) 2010 Dmitry Baranovskiy (http://raphaeljs.com)
      Licensed under the MIT (http://raphaeljs.com/license.html) license.
     */
    (function() {
        function R() {
            if (R.is(arguments[0], array)) {
                var a = arguments[0],
                    cnv = create[apply](R, a.splice(0, 3 + R.is(a[0], nu))),
                    res = cnv.set();
                for (var i = 0, ii = a[length]; i < ii; i++) {
                    var j = a[i] || {};
                    elements[has](j.type) && res[push](cnv[j.type]().attr(j));
                }
                return res;
            }
            return create[apply](R, arguments);
        }
        R.version = "1.5.2";
        var separator = /[, ]+/,
            elements = {
                circle: 1,
                rect: 1,
                path: 1,
                ellipse: 1,
                text: 1,
                image: 1
            },
            formatrg = /\{(\d+)\}/g,
            proto = "prototype",
            has = "hasOwnProperty",
            doc = document,
            win = window,
            oldRaphael = {
                was: Object[proto][has].call(win, "Raphael"),
                is: win.Raphael
            },
            Paper = function() {
                this.customAttributes = {};
            },
            paperproto, appendChild = "appendChild",
            apply = "apply",
            concat = "concat",
            supportsTouch = "createTouch" in doc,
            E = "",
            S = " ",
            Str = String,
            split = "split",
            events = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend orientationchange touchcancel gesturestart gesturechange gestureend" [split](S),
            touchMap = {
                mousedown: "touchstart",
                mousemove: "touchmove",
                mouseup: "touchend"
            },
            join = "join",
            length = "length",
            lowerCase = Str[proto].toLowerCase,
            math = Math,
            mmax = math.max,
            mmin = math.min,
            abs = math.abs,
            pow = math.pow,
            PI = math.PI,
            nu = "number",
            string = "string",
            array = "array",
            toString = "toString",
            fillString = "fill",
            objectToString = Object[proto][toString],
            paper = {},
            push = "push",
            ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i,
            colourRegExp = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,
            isnan = {
                "NaN": 1,
                "Infinity": 1,
                "-Infinity": 1
            },
            bezierrg = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
            round = math.round,
            setAttribute = "setAttribute",
            toFloat = parseFloat,
            toInt = parseInt,
            ms = " progid:DXImageTransform.Microsoft",
            upperCase = Str[proto].toUpperCase,
            availableAttrs = {
                blur: 0,
                "clip-rect": "0 0 1e9 1e9",
                cursor: "default",
                cx: 0,
                cy: 0,
                fill: "#fff",
                "fill-opacity": 1,
                font: '10px "Arial"',
                "font-family": '"Arial"',
                "font-size": "10",
                "font-style": "normal",
                "font-weight": 400,
                gradient: 0,
                height: 0,
                href: "http://raphaeljs.com/",
                opacity: 1,
                path: "M0,0",
                r: 0,
                rotation: 0,
                rx: 0,
                ry: 0,
                scale: "1 1",
                src: "",
                stroke: "#000",
                "stroke-dasharray": "",
                "stroke-linecap": "butt",
                "stroke-linejoin": "butt",
                "stroke-miterlimit": 0,
                "stroke-opacity": 1,
                "stroke-width": 1,
                target: "_blank",
                "text-anchor": "middle",
                title: "Raphael",
                translation: "0 0",
                width: 0,
                x: 0,
                y: 0
            },
            availableAnimAttrs = {
                along: "along",
                blur: nu,
                "clip-rect": "csv",
                cx: nu,
                cy: nu,
                fill: "colour",
                "fill-opacity": nu,
                "font-size": nu,
                height: nu,
                opacity: nu,
                path: "path",
                r: nu,
                rotation: "csv",
                rx: nu,
                ry: nu,
                scale: "csv",
                stroke: "colour",
                "stroke-opacity": nu,
                "stroke-width": nu,
                translation: "csv",
                width: nu,
                x: nu,
                y: nu
            },
            rp = "replace",
            animKeyFrames = /^(from|to|\d+%?)$/,
            commaSpaces = /\s*,\s*/,
            hsrg = {
                hs: 1,
                rg: 1
            },
            p2s = /,?([achlmqrstvxz]),?/gi,
            pathCommand = /([achlmqstvz])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/ig,
            pathValues = /(-?\d*\.?\d*(?:e[-+]?\d+)?)\s*,?\s*/ig,
            radial_gradient = /^r(?:\(([^,]+?)\s*,\s*([^\)]+?)\))?/,
            sortByKey = function(a, b) {
                return a.key - b.key;
            };
        R.type = (win.SVGAngle || doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML");
        if (R.type == "VML") {
            var d = doc.createElement("div"),
                b;
            d.innerHTML = '<v:shape adj="1"/>';
            b = d.firstChild;
            b.style.behavior = "url(#default#VML)";
            if (!(b && typeof b.adj == "object")) {
                return R.type = null;
            }
            d = null;
        }
        R.svg = !(R.vml = R.type == "VML");
        Paper[proto] = R[proto];
        paperproto = Paper[proto];
        R._id = 0;
        R._oid = 0;
        R.fn = {};
        R.is = function(o, type) {
            type = lowerCase.call(type);
            if (type == "finite") {
                return !isnan[has](+o);
            }
            return (type == "null" && o === null) || (type == typeof o) || (type == "object" && o === Object(o)) || (type == "array" && Array.isArray && Array.isArray(o)) || objectToString.call(o).slice(8, -1).toLowerCase() == type;
        };
        R.angle = function(x1, y1, x2, y2, x3, y3) {
            if (x3 == null) {
                var x = x1 - x2,
                    y = y1 - y2;
                if (!x && !y) {
                    return 0;
                }
                return ((x < 0) * 180 + math.atan(-y / -x) * 180 / PI + 360) % 360;
            } else {
                return R.angle(x1, y1, x3, y3) - R.angle(x2, y2, x3, y3);
            }
        };
        R.rad = function(deg) {
            return deg % 360 * PI / 180;
        };
        R.deg = function(rad) {
            return rad * 180 / PI % 360;
        };
        R.snapTo = function(values, value, tolerance) {
            tolerance = R.is(tolerance, "finite") ? tolerance : 10;
            if (R.is(values, array)) {
                var i = values.length;
                while (i--)
                    if (abs(values[i] - value) <= tolerance) {
                        return values[i];
                    }
            } else {
                values = +values;
                var rem = value % values;
                if (rem < tolerance) {
                    return value - rem;
                }
                if (rem > values - tolerance) {
                    return value - rem + values;
                }
            }
            return value;
        };

        function createUUID() {
            var s = [],
                i = 0;
            for (; i < 32; i++) {
                s[i] = (~~(math.random() * 16))[toString](16);
            }
            s[12] = 4;
            s[16] = ((s[16] & 3) | 8)[toString](16);
            return "r-" + s[join]("");
        }
        R.setWindow = function(newwin) {
            win = newwin;
            doc = win.document;
        };
        var toHex = function(color) {
                if (R.vml) {
                    var trim = /^\s+|\s+$/g;
                    var bod;
                    try {
                        var docum = new ActiveXObject("htmlfile");
                        docum.write("<body>");
                        docum.close();
                        bod = docum.body;
                    } catch (e) {
                        bod = createPopup().document.body;
                    }
                    var range = bod.createTextRange();
                    toHex = cacher(function(color) {
                        try {
                            bod.style.color = Str(color)[rp](trim, E);
                            var value = range.queryCommandValue("ForeColor");
                            value = ((value & 255) << 16) | (value & 65280) | ((value & 16711680) >>> 16);
                            return "#" + ("000000" + value[toString](16)).slice(-6);
                        } catch (e) {
                            return "none";
                        }
                    });
                } else {
                    var i = doc.createElement("i");
                    i.title = "Rapha\xebl Colour Picker";
                    i.style.display = "none";
                    doc.body[appendChild](i);
                    toHex = cacher(function(color) {
                        i.style.color = color;
                        return doc.defaultView.getComputedStyle(i, E).getPropertyValue("color");
                    });
                }
                return toHex(color);
            },
            hsbtoString = function() {
                return "hsb(" + [this.h, this.s, this.b] + ")";
            },
            hsltoString = function() {
                return "hsl(" + [this.h, this.s, this.l] + ")";
            },
            rgbtoString = function() {
                return this.hex;
            };
        R.hsb2rgb = function(h, s, b, o) {
            if (R.is(h, "object") && "h" in h && "s" in h && "b" in h) {
                b = h.b;
                s = h.s;
                h = h.h;
                o = h.o;
            }
            return R.hsl2rgb(h, s, b / 2, o);
        };
        R.hsl2rgb = function(h, s, l, o) {
            if (R.is(h, "object") && "h" in h && "s" in h && "l" in h) {
                l = h.l;
                s = h.s;
                h = h.h;
            }
            if (h > 1 || s > 1 || l > 1) {
                h /= 360;
                s /= 100;
                l /= 100;
            }
            var rgb = {},
                channels = ["r", "g", "b"],
                t2, t1, t3, r, g, b;
            if (!s) {
                rgb = {
                    r: l,
                    g: l,
                    b: l
                };
            } else {
                if (l < .5) {
                    t2 = l * (1 + s);
                } else {
                    t2 = l + s - l * s;
                }
                t1 = 2 * l - t2;
                for (var i = 0; i < 3; i++) {
                    t3 = h + 1 / 3 * -(i - 1);
                    t3 < 0 && t3++;
                    t3 > 1 && t3--;
                    if (t3 * 6 < 1) {
                        rgb[channels[i]] = t1 + (t2 - t1) * 6 * t3;
                    } else if (t3 * 2 < 1) {
                        rgb[channels[i]] = t2;
                    } else if (t3 * 3 < 2) {
                        rgb[channels[i]] = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
                    } else {
                        rgb[channels[i]] = t1;
                    }
                }
            }
            rgb.r *= 255;
            rgb.g *= 255;
            rgb.b *= 255;
            rgb.hex = "#" + (16777216 | rgb.b | (rgb.g << 8) | (rgb.r << 16)).toString(16).slice(1);
            R.is(o, "finite") && (rgb.opacity = o);
            rgb.toString = rgbtoString;
            return rgb;
        };
        R.rgb2hsb = function(red, green, blue) {
            if (green == null && R.is(red, "object") && "r" in red && "g" in red && "b" in red) {
                blue = red.b;
                green = red.g;
                red = red.r;
            }
            if (green == null && R.is(red, string)) {
                var clr = R.getRGB(red);
                red = clr.r;
                green = clr.g;
                blue = clr.b;
            }
            if (red > 1 || green > 1 || blue > 1) {
                red /= 255;
                green /= 255;
                blue /= 255;
            }
            var max = mmax(red, green, blue),
                min = mmin(red, green, blue),
                hue, saturation, brightness = max;
            if (min == max) {
                return {
                    h: 0,
                    s: 0,
                    b: max,
                    toString: hsbtoString
                };
            } else {
                var delta = (max - min);
                saturation = delta / max;
                if (red == max) {
                    hue = (green - blue) / delta;
                } else if (green == max) {
                    hue = 2 + ((blue - red) / delta);
                } else {
                    hue = 4 + ((red - green) / delta);
                }
                hue /= 6;
                hue < 0 && hue++;
                hue > 1 && hue--;
            }
            return {
                h: hue,
                s: saturation,
                b: brightness,
                toString: hsbtoString
            };
        };
        R.rgb2hsl = function(red, green, blue) {
            if (green == null && R.is(red, "object") && "r" in red && "g" in red && "b" in red) {
                blue = red.b;
                green = red.g;
                red = red.r;
            }
            if (green == null && R.is(red, string)) {
                var clr = R.getRGB(red);
                red = clr.r;
                green = clr.g;
                blue = clr.b;
            }
            if (red > 1 || green > 1 || blue > 1) {
                red /= 255;
                green /= 255;
                blue /= 255;
            }
            var max = mmax(red, green, blue),
                min = mmin(red, green, blue),
                h, s, l = (max + min) / 2,
                hsl;
            if (min == max) {
                hsl = {
                    h: 0,
                    s: 0,
                    l: l
                };
            } else {
                var delta = max - min;
                s = l < .5 ? delta / (max + min) : delta / (2 - max - min);
                if (red == max) {
                    h = (green - blue) / delta;
                } else if (green == max) {
                    h = 2 + (blue - red) / delta;
                } else {
                    h = 4 + (red - green) / delta;
                }
                h /= 6;
                h < 0 && h++;
                h > 1 && h--;
                hsl = {
                    h: h,
                    s: s,
                    l: l
                };
            }
            hsl.toString = hsltoString;
            return hsl;
        };
        R._path2string = function() {
            return this.join(",")[rp](p2s, "$1");
        };

        function cacher(f, scope, postprocessor) {
            function newf() {
                var arg = Array[proto].slice.call(arguments, 0),
                    args = arg[join]("\u25ba"),
                    cache = newf.cache = newf.cache || {},
                    count = newf.count = newf.count || [];
                if (cache[has](args)) {
                    return postprocessor ? postprocessor(cache[args]) : cache[args];
                }
                count[length] >= 1e3 && delete cache[count.shift()];
                count[push](args);
                cache[args] = f[apply](scope, arg);
                return postprocessor ? postprocessor(cache[args]) : cache[args];
            }
            return newf;
        }
        R.getRGB = cacher(function(colour) {
            if (!colour || !!((colour = Str(colour)).indexOf("-") + 1)) {
                return {
                    r: -1,
                    g: -1,
                    b: -1,
                    hex: "none",
                    error: 1
                };
            }
            if (colour == "none") {
                return {
                    r: -1,
                    g: -1,
                    b: -1,
                    hex: "none"
                };
            }!(hsrg[has](colour.toLowerCase().substring(0, 2)) || colour.charAt() == "#") && (colour = toHex(colour));
            var res, red, green, blue, opacity, t, values, rgb = colour.match(colourRegExp);
            if (rgb) {
                if (rgb[2]) {
                    blue = toInt(rgb[2].substring(5), 16);
                    green = toInt(rgb[2].substring(3, 5), 16);
                    red = toInt(rgb[2].substring(1, 3), 16);
                }
                if (rgb[3]) {
                    blue = toInt((t = rgb[3].charAt(3)) + t, 16);
                    green = toInt((t = rgb[3].charAt(2)) + t, 16);
                    red = toInt((t = rgb[3].charAt(1)) + t, 16);
                }
                if (rgb[4]) {
                    values = rgb[4][split](commaSpaces);
                    red = toFloat(values[0]);
                    values[0].slice(-1) == "%" && (red *= 2.55);
                    green = toFloat(values[1]);
                    values[1].slice(-1) == "%" && (green *= 2.55);
                    blue = toFloat(values[2]);
                    values[2].slice(-1) == "%" && (blue *= 2.55);
                    rgb[1].toLowerCase().slice(0, 4) == "rgba" && (opacity = toFloat(values[3]));
                    values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
                }
                if (rgb[5]) {
                    values = rgb[5][split](commaSpaces);
                    red = toFloat(values[0]);
                    values[0].slice(-1) == "%" && (red *= 2.55);
                    green = toFloat(values[1]);
                    values[1].slice(-1) == "%" && (green *= 2.55);
                    blue = toFloat(values[2]);
                    values[2].slice(-1) == "%" && (blue *= 2.55);
                    (values[0].slice(-3) == "deg" || values[0].slice(-1) == "\xb0") && (red /= 360);
                    rgb[1].toLowerCase().slice(0, 4) == "hsba" && (opacity = toFloat(values[3]));
                    values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
                    return R.hsb2rgb(red, green, blue, opacity);
                }
                if (rgb[6]) {
                    values = rgb[6][split](commaSpaces);
                    red = toFloat(values[0]);
                    values[0].slice(-1) == "%" && (red *= 2.55);
                    green = toFloat(values[1]);
                    values[1].slice(-1) == "%" && (green *= 2.55);
                    blue = toFloat(values[2]);
                    values[2].slice(-1) == "%" && (blue *= 2.55);
                    (values[0].slice(-3) == "deg" || values[0].slice(-1) == "\xb0") && (red /= 360);
                    rgb[1].toLowerCase().slice(0, 4) == "hsla" && (opacity = toFloat(values[3]));
                    values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
                    return R.hsl2rgb(red, green, blue, opacity);
                }
                rgb = {
                    r: red,
                    g: green,
                    b: blue
                };
                rgb.hex = "#" + (16777216 | blue | (green << 8) | (red << 16)).toString(16).slice(1);
                R.is(opacity, "finite") && (rgb.opacity = opacity);
                return rgb;
            }
            return {
                r: -1,
                g: -1,
                b: -1,
                hex: "none",
                error: 1
            };
        }, R);
        R.getColor = function(value) {
            var start = this.getColor.start = this.getColor.start || {
                    h: 0,
                    s: 1,
                    b: value || .75
                },
                rgb = this.hsb2rgb(start.h, start.s, start.b);
            start.h += .075;
            if (start.h > 1) {
                start.h = 0;
                start.s -= .2;
                start.s <= 0 && (this.getColor.start = {
                    h: 0,
                    s: 1,
                    b: start.b
                });
            }
            return rgb.hex;
        };
        R.getColor.reset = function() {
            delete this.start;
        };
        R.parsePathString = cacher(function(pathString) {
            if (!pathString) {
                return null;
            }
            var paramCounts = {
                    a: 7,
                    c: 6,
                    h: 1,
                    l: 2,
                    m: 2,
                    q: 4,
                    s: 4,
                    t: 2,
                    v: 1,
                    z: 0
                },
                data = [];
            if (R.is(pathString, array) && R.is(pathString[0], array)) {
                data = pathClone(pathString);
            }
            if (!data[length]) {
                Str(pathString)[rp](pathCommand, function(a, b, c) {
                    var params = [],
                        name = lowerCase.call(b);
                    c[rp](pathValues, function(a, b) {
                        b && params[push](+b);
                    });
                    if (name == "m" && params[length] > 2) {
                        data[push]([b][concat](params.splice(0, 2)));
                        name = "l";
                        b = b == "m" ? "l" : "L";
                    }
                    while (params[length] >= paramCounts[name]) {
                        data[push]([b][concat](params.splice(0, paramCounts[name])));
                        if (!paramCounts[name]) {
                            break;
                        }
                    }
                });
            }
            data[toString] = R._path2string;
            return data;
        });
        R.findDotsAtSegment = function(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
            var t1 = 1 - t,
                x = pow(t1, 3) * p1x + pow(t1, 2) * 3 * t * c1x + t1 * 3 * t * t * c2x + pow(t, 3) * p2x,
                y = pow(t1, 3) * p1y + pow(t1, 2) * 3 * t * c1y + t1 * 3 * t * t * c2y + pow(t, 3) * p2y,
                mx = p1x + 2 * t * (c1x - p1x) + t * t * (c2x - 2 * c1x + p1x),
                my = p1y + 2 * t * (c1y - p1y) + t * t * (c2y - 2 * c1y + p1y),
                nx = c1x + 2 * t * (c2x - c1x) + t * t * (p2x - 2 * c2x + c1x),
                ny = c1y + 2 * t * (c2y - c1y) + t * t * (p2y - 2 * c2y + c1y),
                ax = (1 - t) * p1x + t * c1x,
                ay = (1 - t) * p1y + t * c1y,
                cx = (1 - t) * c2x + t * p2x,
                cy = (1 - t) * c2y + t * p2y,
                alpha = (90 - math.atan((mx - nx) / (my - ny)) * 180 / PI);
            (mx > nx || my < ny) && (alpha += 180);
            return {
                x: x,
                y: y,
                m: {
                    x: mx,
                    y: my
                },
                n: {
                    x: nx,
                    y: ny
                },
                start: {
                    x: ax,
                    y: ay
                },
                end: {
                    x: cx,
                    y: cy
                },
                alpha: alpha
            };
        };
        var pathDimensions = cacher(function(path) {
                if (!path) {
                    return {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0
                    };
                }
                path = path2curve(path);
                var x = 0,
                    y = 0,
                    X = [],
                    Y = [],
                    p;
                for (var i = 0, ii = path[length]; i < ii; i++) {
                    p = path[i];
                    if (p[0] == "M") {
                        x = p[1];
                        y = p[2];
                        X[push](x);
                        Y[push](y);
                    } else {
                        var dim = curveDim(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
                        X = X[concat](dim.min.x, dim.max.x);
                        Y = Y[concat](dim.min.y, dim.max.y);
                        x = p[5];
                        y = p[6];
                    }
                }
                var xmin = mmin[apply](0, X),
                    ymin = mmin[apply](0, Y);
                return {
                    x: xmin,
                    y: ymin,
                    width: mmax[apply](0, X) - xmin,
                    height: mmax[apply](0, Y) - ymin
                };
            }),
            pathClone = function(pathArray) {
                var res = [];
                if (!R.is(pathArray, array) || !R.is(pathArray && pathArray[0], array)) {
                    pathArray = R.parsePathString(pathArray);
                }
                for (var i = 0, ii = pathArray[length]; i < ii; i++) {
                    res[i] = [];
                    for (var j = 0, jj = pathArray[i][length]; j < jj; j++) {
                        res[i][j] = pathArray[i][j];
                    }
                }
                res[toString] = R._path2string;
                return res;
            },
            pathToRelative = cacher(function(pathArray) {
                if (!R.is(pathArray, array) || !R.is(pathArray && pathArray[0], array)) {
                    pathArray = R.parsePathString(pathArray);
                }
                var res = [],
                    x = 0,
                    y = 0,
                    mx = 0,
                    my = 0,
                    start = 0;
                if (pathArray[0][0] == "M") {
                    x = pathArray[0][1];
                    y = pathArray[0][2];
                    mx = x;
                    my = y;
                    start++;
                    res[push](["M", x, y]);
                }
                for (var i = start, ii = pathArray[length]; i < ii; i++) {
                    var r = res[i] = [],
                        pa = pathArray[i];
                    if (pa[0] != lowerCase.call(pa[0])) {
                        r[0] = lowerCase.call(pa[0]);
                        switch (r[0]) {
                            case "a":
                                r[1] = pa[1];
                                r[2] = pa[2];
                                r[3] = pa[3];
                                r[4] = pa[4];
                                r[5] = pa[5];
                                r[6] = +(pa[6] - x).toFixed(3);
                                r[7] = +(pa[7] - y).toFixed(3);
                                break;
                            case "v":
                                r[1] = +(pa[1] - y).toFixed(3);
                                break;
                            case "m":
                                mx = pa[1];
                                my = pa[2];
                            default:
                                for (var j = 1, jj = pa[length]; j < jj; j++) {
                                    r[j] = +(pa[j] - ((j % 2) ? x : y)).toFixed(3);
                                }
                        }
                    } else {
                        r = res[i] = [];
                        if (pa[0] == "m") {
                            mx = pa[1] + x;
                            my = pa[2] + y;
                        }
                        for (var k = 0, kk = pa[length]; k < kk; k++) {
                            res[i][k] = pa[k];
                        }
                    }
                    var len = res[i][length];
                    switch (res[i][0]) {
                        case "z":
                            x = mx;
                            y = my;
                            break;
                        case "h":
                            x += +res[i][len - 1];
                            break;
                        case "v":
                            y += +res[i][len - 1];
                            break;
                        default:
                            x += +res[i][len - 2];
                            y += +res[i][len - 1];
                    }
                }
                res[toString] = R._path2string;
                return res;
            }, 0, pathClone),
            pathToAbsolute = cacher(function(pathArray) {
                if (!R.is(pathArray, array) || !R.is(pathArray && pathArray[0], array)) {
                    pathArray = R.parsePathString(pathArray);
                }
                var res = [],
                    x = 0,
                    y = 0,
                    mx = 0,
                    my = 0,
                    start = 0;
                if (pathArray[0][0] == "M") {
                    x = +pathArray[0][1];
                    y = +pathArray[0][2];
                    mx = x;
                    my = y;
                    start++;
                    res[0] = ["M", x, y];
                }
                for (var i = start, ii = pathArray[length]; i < ii; i++) {
                    var r = res[i] = [],
                        pa = pathArray[i];
                    if (pa[0] != upperCase.call(pa[0])) {
                        r[0] = upperCase.call(pa[0]);
                        switch (r[0]) {
                            case "A":
                                r[1] = pa[1];
                                r[2] = pa[2];
                                r[3] = pa[3];
                                r[4] = pa[4];
                                r[5] = pa[5];
                                r[6] = +(pa[6] + x);
                                r[7] = +(pa[7] + y);
                                break;
                            case "V":
                                r[1] = +pa[1] + y;
                                break;
                            case "H":
                                r[1] = +pa[1] + x;
                                break;
                            case "M":
                                mx = +pa[1] + x;
                                my = +pa[2] + y;
                            default:
                                for (var j = 1, jj = pa[length]; j < jj; j++) {
                                    r[j] = +pa[j] + ((j % 2) ? x : y);
                                }
                        }
                    } else {
                        for (var k = 0, kk = pa[length]; k < kk; k++) {
                            res[i][k] = pa[k];
                        }
                    }
                    switch (r[0]) {
                        case "Z":
                            x = mx;
                            y = my;
                            break;
                        case "H":
                            x = r[1];
                            break;
                        case "V":
                            y = r[1];
                            break;
                        case "M":
                            mx = res[i][res[i][length] - 2];
                            my = res[i][res[i][length] - 1];
                        default:
                            x = res[i][res[i][length] - 2];
                            y = res[i][res[i][length] - 1];
                    }
                }
                res[toString] = R._path2string;
                return res;
            }, null, pathClone),
            l2c = function(x1, y1, x2, y2) {
                return [x1, y1, x2, y2, x2, y2];
            },
            q2c = function(x1, y1, ax, ay, x2, y2) {
                var _13 = 1 / 3,
                    _23 = 2 / 3;
                return [_13 * x1 + _23 * ax, _13 * y1 + _23 * ay, _13 * x2 + _23 * ax, _13 * y2 + _23 * ay, x2, y2];
            },
            a2c = function(x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
                var _120 = PI * 120 / 180,
                    rad = PI / 180 * (+angle || 0),
                    res = [],
                    xy, rotate = cacher(function(x, y, rad) {
                        var X = x * math.cos(rad) - y * math.sin(rad),
                            Y = x * math.sin(rad) + y * math.cos(rad);
                        return {
                            x: X,
                            y: Y
                        };
                    });
                if (!recursive) {
                    xy = rotate(x1, y1, -rad);
                    x1 = xy.x;
                    y1 = xy.y;
                    xy = rotate(x2, y2, -rad);
                    x2 = xy.x;
                    y2 = xy.y;
                    var cos = math.cos(PI / 180 * angle),
                        sin = math.sin(PI / 180 * angle),
                        x = (x1 - x2) / 2,
                        y = (y1 - y2) / 2;
                    var h = (x * x) / (rx * rx) + (y * y) / (ry * ry);
                    if (h > 1) {
                        h = math.sqrt(h);
                        rx = h * rx;
                        ry = h * ry;
                    }
                    var rx2 = rx * rx,
                        ry2 = ry * ry,
                        k = (large_arc_flag == sweep_flag ? -1 : 1) * math.sqrt(abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x))),
                        cx = k * rx * y / ry + (x1 + x2) / 2,
                        cy = k * -ry * x / rx + (y1 + y2) / 2,
                        f1 = math.asin(((y1 - cy) / ry).toFixed(9)),
                        f2 = math.asin(((y2 - cy) / ry).toFixed(9));
                    f1 = x1 < cx ? PI - f1 : f1;
                    f2 = x2 < cx ? PI - f2 : f2;
                    f1 < 0 && (f1 = PI * 2 + f1);
                    f2 < 0 && (f2 = PI * 2 + f2);
                    if (sweep_flag && f1 > f2) {
                        f1 = f1 - PI * 2;
                    }
                    if (!sweep_flag && f2 > f1) {
                        f2 = f2 - PI * 2;
                    }
                } else {
                    f1 = recursive[0];
                    f2 = recursive[1];
                    cx = recursive[2];
                    cy = recursive[3];
                }
                var df = f2 - f1;
                if (abs(df) > _120) {
                    var f2old = f2,
                        x2old = x2,
                        y2old = y2;
                    f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
                    x2 = cx + rx * math.cos(f2);
                    y2 = cy + ry * math.sin(f2);
                    res = a2c(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy]);
                }
                df = f2 - f1;
                var c1 = math.cos(f1),
                    s1 = math.sin(f1),
                    c2 = math.cos(f2),
                    s2 = math.sin(f2),
                    t = math.tan(df / 4),
                    hx = 4 / 3 * rx * t,
                    hy = 4 / 3 * ry * t,
                    m1 = [x1, y1],
                    m2 = [x1 + hx * s1, y1 - hy * c1],
                    m3 = [x2 + hx * s2, y2 - hy * c2],
                    m4 = [x2, y2];
                m2[0] = 2 * m1[0] - m2[0];
                m2[1] = 2 * m1[1] - m2[1];
                if (recursive) {
                    return [m2, m3, m4][concat](res);
                } else {
                    res = [m2, m3, m4][concat](res)[join]()[split](",");
                    var newres = [];
                    for (var i = 0, ii = res[length]; i < ii; i++) {
                        newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad).y : rotate(res[i], res[i + 1], rad).x;
                    }
                    return newres;
                }
            },
            findDotAtSegment = function(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
                var t1 = 1 - t;
                return {
                    x: pow(t1, 3) * p1x + pow(t1, 2) * 3 * t * c1x + t1 * 3 * t * t * c2x + pow(t, 3) * p2x,
                    y: pow(t1, 3) * p1y + pow(t1, 2) * 3 * t * c1y + t1 * 3 * t * t * c2y + pow(t, 3) * p2y
                };
            },
            curveDim = cacher(function(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
                var a = (c2x - 2 * c1x + p1x) - (p2x - 2 * c2x + c1x),
                    b = 2 * (c1x - p1x) - 2 * (c2x - c1x),
                    c = p1x - c1x,
                    t1 = (-b + math.sqrt(b * b - 4 * a * c)) / 2 / a,
                    t2 = (-b - math.sqrt(b * b - 4 * a * c)) / 2 / a,
                    y = [p1y, p2y],
                    x = [p1x, p2x],
                    dot;
                abs(t1) > "1e12" && (t1 = .5);
                abs(t2) > "1e12" && (t2 = .5);
                if (t1 > 0 && t1 < 1) {
                    dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
                    x[push](dot.x);
                    y[push](dot.y);
                }
                if (t2 > 0 && t2 < 1) {
                    dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
                    x[push](dot.x);
                    y[push](dot.y);
                }
                a = (c2y - 2 * c1y + p1y) - (p2y - 2 * c2y + c1y);
                b = 2 * (c1y - p1y) - 2 * (c2y - c1y);
                c = p1y - c1y;
                t1 = (-b + math.sqrt(b * b - 4 * a * c)) / 2 / a;
                t2 = (-b - math.sqrt(b * b - 4 * a * c)) / 2 / a;
                abs(t1) > "1e12" && (t1 = .5);
                abs(t2) > "1e12" && (t2 = .5);
                if (t1 > 0 && t1 < 1) {
                    dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
                    x[push](dot.x);
                    y[push](dot.y);
                }
                if (t2 > 0 && t2 < 1) {
                    dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
                    x[push](dot.x);
                    y[push](dot.y);
                }
                return {
                    min: {
                        x: mmin[apply](0, x),
                        y: mmin[apply](0, y)
                    },
                    max: {
                        x: mmax[apply](0, x),
                        y: mmax[apply](0, y)
                    }
                };
            }),
            path2curve = cacher(function(path, path2) {
                var p = pathToAbsolute(path),
                    p2 = path2 && pathToAbsolute(path2),
                    attrs = {
                        x: 0,
                        y: 0,
                        bx: 0,
                        by: 0,
                        X: 0,
                        Y: 0,
                        qx: null,
                        qy: null
                    },
                    attrs2 = {
                        x: 0,
                        y: 0,
                        bx: 0,
                        by: 0,
                        X: 0,
                        Y: 0,
                        qx: null,
                        qy: null
                    },
                    processPath = function(path, d) {
                        var nx, ny;
                        if (!path) {
                            return ["C", d.x, d.y, d.x, d.y, d.x, d.y];
                        }!(path[0] in {
                            T: 1,
                            Q: 1
                        }) && (d.qx = d.qy = null);
                        switch (path[0]) {
                            case "M":
                                d.X = path[1];
                                d.Y = path[2];
                                break;
                            case "A":
                                path = ["C"][concat](a2c[apply](0, [d.x, d.y][concat](path.slice(1))));
                                break;
                            case "S":
                                nx = d.x + (d.x - (d.bx || d.x));
                                ny = d.y + (d.y - (d.by || d.y));
                                path = ["C", nx, ny][concat](path.slice(1));
                                break;
                            case "T":
                                d.qx = d.x + (d.x - (d.qx || d.x));
                                d.qy = d.y + (d.y - (d.qy || d.y));
                                path = ["C"][concat](q2c(d.x, d.y, d.qx, d.qy, path[1], path[2]));
                                break;
                            case "Q":
                                d.qx = path[1];
                                d.qy = path[2];
                                path = ["C"][concat](q2c(d.x, d.y, path[1], path[2], path[3], path[4]));
                                break;
                            case "L":
                                path = ["C"][concat](l2c(d.x, d.y, path[1], path[2]));
                                break;
                            case "H":
                                path = ["C"][concat](l2c(d.x, d.y, path[1], d.y));
                                break;
                            case "V":
                                path = ["C"][concat](l2c(d.x, d.y, d.x, path[1]));
                                break;
                            case "Z":
                                path = ["C"][concat](l2c(d.x, d.y, d.X, d.Y));
                                break;
                        }
                        return path;
                    },
                    fixArc = function(pp, i) {
                        if (pp[i][length] > 7) {
                            pp[i].shift();
                            var pi = pp[i];
                            while (pi[length]) {
                                pp.splice(i++, 0, ["C"][concat](pi.splice(0, 6)));
                            }
                            pp.splice(i, 1);
                            ii = mmax(p[length], p2 && p2[length] || 0);
                        }
                    },
                    fixM = function(path1, path2, a1, a2, i) {
                        if (path1 && path2 && path1[i][0] == "M" && path2[i][0] != "M") {
                            path2.splice(i, 0, ["M", a2.x, a2.y]);
                            a1.bx = 0;
                            a1.by = 0;
                            a1.x = path1[i][1];
                            a1.y = path1[i][2];
                            ii = mmax(p[length], p2 && p2[length] || 0);
                        }
                    };
                for (var i = 0, ii = mmax(p[length], p2 && p2[length] || 0); i < ii; i++) {
                    p[i] = processPath(p[i], attrs);
                    fixArc(p, i);
                    p2 && (p2[i] = processPath(p2[i], attrs2));
                    p2 && fixArc(p2, i);
                    fixM(p, p2, attrs, attrs2, i);
                    fixM(p2, p, attrs2, attrs, i);
                    var seg = p[i],
                        seg2 = p2 && p2[i],
                        seglen = seg[length],
                        seg2len = p2 && seg2[length];
                    attrs.x = seg[seglen - 2];
                    attrs.y = seg[seglen - 1];
                    attrs.bx = toFloat(seg[seglen - 4]) || attrs.x;
                    attrs.by = toFloat(seg[seglen - 3]) || attrs.y;
                    attrs2.bx = p2 && (toFloat(seg2[seg2len - 4]) || attrs2.x);
                    attrs2.by = p2 && (toFloat(seg2[seg2len - 3]) || attrs2.y);
                    attrs2.x = p2 && seg2[seg2len - 2];
                    attrs2.y = p2 && seg2[seg2len - 1];
                }
                return p2 ? [p, p2] : p;
            }, null, pathClone),
            parseDots = cacher(function(gradient) {
                var dots = [];
                for (var i = 0, ii = gradient[length]; i < ii; i++) {
                    var dot = {},
                        par = gradient[i].match(/^([^:]*):?([\d\.]*)/);
                    dot.color = R.getRGB(par[1]);
                    if (dot.color.error) {
                        return null;
                    }
                    dot.color = dot.color.hex;
                    par[2] && (dot.offset = par[2] + "%");
                    dots[push](dot);
                }
                for (i = 1, ii = dots[length] - 1; i < ii; i++) {
                    if (!dots[i].offset) {
                        var start = toFloat(dots[i - 1].offset || 0),
                            end = 0;
                        for (var j = i + 1; j < ii; j++) {
                            if (dots[j].offset) {
                                end = dots[j].offset;
                                break;
                            }
                        }
                        if (!end) {
                            end = 100;
                            j = ii;
                        }
                        end = toFloat(end);
                        var d = (end - start) / (j - i + 1);
                        for (; i < j; i++) {
                            start += d;
                            dots[i].offset = start + "%";
                        }
                    }
                }
                return dots;
            }),
            getContainer = function(x, y, w, h) {
                var container;
                if (R.is(x, string) || R.is(x, "object")) {
                    container = R.is(x, string) ? doc.getElementById(x) : x;
                    if (container.tagName) {
                        if (y == null) {
                            return {
                                container: container,
                                width: container.style.pixelWidth || container.offsetWidth,
                                height: container.style.pixelHeight || container.offsetHeight
                            };
                        } else {
                            return {
                                container: container,
                                width: y,
                                height: w
                            };
                        }
                    }
                } else {
                    return {
                        container: 1,
                        x: x,
                        y: y,
                        width: w,
                        height: h
                    };
                }
            },
            plugins = function(con, add) {
                var that = this;
                for (var prop in add) {
                    if (add[has](prop) && !(prop in con)) {
                        switch (typeof add[prop]) {
                            case "function":
                                (function(f) {
                                    con[prop] = con === that ? f : function() {
                                        return f[apply](that, arguments);
                                    };
                                })(add[prop]);
                                break;
                            case "object":
                                con[prop] = con[prop] || {};
                                plugins.call(this, con[prop], add[prop]);
                                break;
                            default:
                                con[prop] = add[prop];
                                break;
                        }
                    }
                }
            },
            tear = function(el, paper) {
                el == paper.top && (paper.top = el.prev);
                el == paper.bottom && (paper.bottom = el.next);
                el.next && (el.next.prev = el.prev);
                el.prev && (el.prev.next = el.next);
            },
            tofront = function(el, paper) {
                if (paper.top === el) {
                    return;
                }
                tear(el, paper);
                el.next = null;
                el.prev = paper.top;
                paper.top.next = el;
                paper.top = el;
            },
            toback = function(el, paper) {
                if (paper.bottom === el) {
                    return;
                }
                tear(el, paper);
                el.next = paper.bottom;
                el.prev = null;
                paper.bottom.prev = el;
                paper.bottom = el;
            },
            insertafter = function(el, el2, paper) {
                tear(el, paper);
                el2 == paper.top && (paper.top = el);
                el2.next && (el2.next.prev = el);
                el.next = el2.next;
                el.prev = el2;
                el2.next = el;
            },
            insertbefore = function(el, el2, paper) {
                tear(el, paper);
                el2 == paper.bottom && (paper.bottom = el);
                el2.prev && (el2.prev.next = el);
                el.prev = el2.prev;
                el2.prev = el;
                el.next = el2;
            },
            removed = function(methodname) {
                return function() {
                    throw new Error("Rapha\xebl: you are calling to method \u201c" + methodname + "\u201d of removed object");
                };
            };
        R.pathToRelative = pathToRelative;
        if (R.svg) {
            paperproto.svgns = "http://www.w3.org/2000/svg";
            paperproto.xlink = "http://www.w3.org/1999/xlink";
            round = function(num) {
                return +num + (~~num === num) * .5;
            };
            var $ = function(el, attr) {
                if (attr) {
                    for (var key in attr) {
                        if (attr[has](key)) {
                            el[setAttribute](key, Str(attr[key]));
                        }
                    }
                } else {
                    el = doc.createElementNS(paperproto.svgns, el);
                    el.style.webkitTapHighlightColor = "rgba(0,0,0,0)";
                    return el;
                }
            };
            R[toString] = function() {
                return "Your browser supports SVG.\nYou are running Rapha\xebl " + this.version;
            };
            var thePath = function(pathString, SVG) {
                var el = $("path");
                SVG.canvas && SVG.canvas[appendChild](el);
                var p = new Element(el, SVG);
                p.type = "path";
                setFillAndStroke(p, {
                    fill: "none",
                    stroke: "#000",
                    path: pathString
                });
                return p;
            };
            var addGradientFill = function(o, gradient, SVG) {
                var type = "linear",
                    fx = .5,
                    fy = .5,
                    s = o.style;
                gradient = Str(gradient)[rp](radial_gradient, function(all, _fx, _fy) {
                    type = "radial";
                    if (_fx && _fy) {
                        fx = toFloat(_fx);
                        fy = toFloat(_fy);
                        var dir = ((fy > .5) * 2 - 1);
                        pow(fx - .5, 2) + pow(fy - .5, 2) > .25 && (fy = math.sqrt(.25 - pow(fx - .5, 2)) * dir + .5) && fy != .5 && (fy = fy.toFixed(5) - 1e-5 * dir);
                    }
                    return E;
                });
                gradient = gradient[split](/\s*\-\s*/);
                if (type == "linear") {
                    var angle = gradient.shift();
                    angle = -toFloat(angle);
                    if (isNaN(angle)) {
                        return null;
                    }
                    var vector = [0, 0, math.cos(angle * PI / 180), math.sin(angle * PI / 180)],
                        max = 1 / (mmax(abs(vector[2]), abs(vector[3])) || 1);
                    vector[2] *= max;
                    vector[3] *= max;
                    if (vector[2] < 0) {
                        vector[0] = -vector[2];
                        vector[2] = 0;
                    }
                    if (vector[3] < 0) {
                        vector[1] = -vector[3];
                        vector[3] = 0;
                    }
                }
                var dots = parseDots(gradient);
                if (!dots) {
                    return null;
                }
                var id = o.getAttribute(fillString);
                id = id.match(/^url\(#(.*)\)$/);
                id && SVG.defs.removeChild(doc.getElementById(id[1]));
                var el = $(type + "Gradient");
                el.id = createUUID();
                $(el, type == "radial" ? {
                    fx: fx,
                    fy: fy
                } : {
                    x1: vector[0],
                    y1: vector[1],
                    x2: vector[2],
                    y2: vector[3]
                });
                SVG.defs[appendChild](el);
                for (var i = 0, ii = dots[length]; i < ii; i++) {
                    var stop = $("stop");
                    $(stop, {
                        offset: dots[i].offset ? dots[i].offset : !i ? "0%" : "100%",
                        "stop-color": dots[i].color || "#fff"
                    });
                    el[appendChild](stop);
                }
                $(o, {
                    fill: "url(#" + el.id + ")",
                    opacity: 1,
                    "fill-opacity": 1
                });
                s.fill = E;
                s.opacity = 1;
                s.fillOpacity = 1;
                return 1;
            };
            var updatePosition = function(o) {
                var bbox = o.getBBox();
                $(o.pattern, {
                    patternTransform: R.format("translate({0},{1})", bbox.x, bbox.y)
                });
            };
            var setFillAndStroke = function(o, params) {
                var dasharray = {
                        "": [0],
                        "none": [0],
                        "-": [3, 1],
                        ".": [1, 1],
                        "-.": [3, 1, 1, 1],
                        "-..": [3, 1, 1, 1, 1, 1],
                        ". ": [1, 3],
                        "- ": [4, 3],
                        "--": [8, 3],
                        "- .": [4, 3, 1, 3],
                        "--.": [8, 3, 1, 3],
                        "--..": [8, 3, 1, 3, 1, 3]
                    },
                    node = o.node,
                    attrs = o.attrs,
                    rot = o.rotate(),
                    addDashes = function(o, value) {
                        value = dasharray[lowerCase.call(value)];
                        if (value) {
                            var width = o.attrs["stroke-width"] || "1",
                                butt = {
                                    round: width,
                                    square: width,
                                    butt: 0
                                }[o.attrs["stroke-linecap"] || params["stroke-linecap"]] || 0,
                                dashes = [];
                            var i = value[length];
                            while (i--) {
                                dashes[i] = value[i] * width + ((i % 2) ? 1 : -1) * butt;
                            }
                            $(node, {
                                "stroke-dasharray": dashes[join](",")
                            });
                        }
                    };
                params[has]("rotation") && (rot = params.rotation);
                var rotxy = Str(rot)[split](separator);
                if (!(rotxy.length - 1)) {
                    rotxy = null;
                } else {
                    rotxy[1] = +rotxy[1];
                    rotxy[2] = +rotxy[2];
                }
                toFloat(rot) && o.rotate(0, true);
                for (var att in params) {
                    if (params[has](att)) {
                        if (!availableAttrs[has](att)) {
                            continue;
                        }
                        var value = params[att];
                        attrs[att] = value;
                        switch (att) {
                            case "blur":
                                o.blur(value);
                                break;
                            case "rotation":
                                o.rotate(value, true);
                                break;
                            case "href":
                            case "title":
                            case "target":
                                var pn = node.parentNode;
                                if (lowerCase.call(pn.tagName) != "a") {
                                    var hl = $("a");
                                    pn.insertBefore(hl, node);
                                    hl[appendChild](node);
                                    pn = hl;
                                }
                                if (att == "target" && value == "blank") {
                                    pn.setAttributeNS(o.paper.xlink, "show", "new");
                                } else {
                                    pn.setAttributeNS(o.paper.xlink, att, value);
                                }
                                break;
                            case "cursor":
                                node.style.cursor = value;
                                break;
                            case "clip-rect":
                                var rect = Str(value)[split](separator);
                                if (rect[length] == 4) {
                                    o.clip && o.clip.parentNode.parentNode.removeChild(o.clip.parentNode);
                                    var el = $("clipPath"),
                                        rc = $("rect");
                                    el.id = createUUID();
                                    $(rc, {
                                        x: rect[0],
                                        y: rect[1],
                                        width: rect[2],
                                        height: rect[3]
                                    });
                                    el[appendChild](rc);
                                    o.paper.defs[appendChild](el);
                                    $(node, {
                                        "clip-path": "url(#" + el.id + ")"
                                    });
                                    o.clip = rc;
                                }
                                if (!value) {
                                    var clip = doc.getElementById(node.getAttribute("clip-path")[rp](/(^url\(#|\)$)/g, E));
                                    clip && clip.parentNode.removeChild(clip);
                                    $(node, {
                                        "clip-path": E
                                    });
                                    delete o.clip;
                                }
                                break;
                            case "path":
                                if (o.type == "path") {
                                    $(node, {
                                        d: value ? attrs.path = pathToAbsolute(value) : "M0,0"
                                    });
                                }
                                break;
                            case "width":
                                node[setAttribute](att, value);
                                if (attrs.fx) {
                                    att = "x";
                                    value = attrs.x;
                                } else {
                                    break;
                                }
                            case "x":
                                if (attrs.fx) {
                                    value = -attrs.x - (attrs.width || 0);
                                }
                            case "rx":
                                if (att == "rx" && o.type == "rect") {
                                    break;
                                }
                            case "cx":
                                rotxy && (att == "x" || att == "cx") && (rotxy[1] += value - attrs[att]);
                                node[setAttribute](att, value);
                                o.pattern && updatePosition(o);
                                break;
                            case "height":
                                node[setAttribute](att, value);
                                if (attrs.fy) {
                                    att = "y";
                                    value = attrs.y;
                                } else {
                                    break;
                                }
                            case "y":
                                if (attrs.fy) {
                                    value = -attrs.y - (attrs.height || 0);
                                }
                            case "ry":
                                if (att == "ry" && o.type == "rect") {
                                    break;
                                }
                            case "cy":
                                rotxy && (att == "y" || att == "cy") && (rotxy[2] += value - attrs[att]);
                                node[setAttribute](att, value);
                                o.pattern && updatePosition(o);
                                break;
                            case "r":
                                if (o.type == "rect") {
                                    $(node, {
                                        rx: value,
                                        ry: value
                                    });
                                } else {
                                    node[setAttribute](att, value);
                                }
                                break;
                            case "src":
                                if (o.type == "image") {
                                    node.setAttributeNS(o.paper.xlink, "href", value);
                                }
                                break;
                            case "stroke-width":
                                node.style.strokeWidth = value;
                                node[setAttribute](att, value);
                                if (attrs["stroke-dasharray"]) {
                                    addDashes(o, attrs["stroke-dasharray"]);
                                }
                                break;
                            case "stroke-dasharray":
                                addDashes(o, value);
                                break;
                            case "translation":
                                var xy = Str(value)[split](separator);
                                xy[0] = +xy[0] || 0;
                                xy[1] = +xy[1] || 0;
                                if (rotxy) {
                                    rotxy[1] += xy[0];
                                    rotxy[2] += xy[1];
                                }
                                translate.call(o, xy[0], xy[1]);
                                break;
                            case "scale":
                                xy = Str(value)[split](separator);
                                o.scale(+xy[0] || 1, +xy[1] || +xy[0] || 1, isNaN(toFloat(xy[2])) ? null : +xy[2], isNaN(toFloat(xy[3])) ? null : +xy[3]);
                                break;
                            case fillString:
                                var isURL = Str(value).match(ISURL);
                                if (isURL) {
                                    el = $("pattern");
                                    var ig = $("image");
                                    el.id = createUUID();
                                    $(el, {
                                        x: 0,
                                        y: 0,
                                        patternUnits: "userSpaceOnUse",
                                        height: 1,
                                        width: 1
                                    });
                                    $(ig, {
                                        x: 0,
                                        y: 0
                                    });
                                    ig.setAttributeNS(o.paper.xlink, "href", isURL[1]);
                                    el[appendChild](ig);
                                    var img = doc.createElement("img");
                                    img.style.cssText = "position:absolute;left:-9999em;top-9999em";
                                    img.onload = function() {
                                        $(el, {
                                            width: this.offsetWidth,
                                            height: this.offsetHeight
                                        });
                                        $(ig, {
                                            width: this.offsetWidth,
                                            height: this.offsetHeight
                                        });
                                        doc.body.removeChild(this);
                                        o.paper.safari();
                                    };
                                    doc.body[appendChild](img);
                                    img.src = isURL[1];
                                    o.paper.defs[appendChild](el);
                                    node.style.fill = "url(#" + el.id + ")";
                                    $(node, {
                                        fill: "url(#" + el.id + ")"
                                    });
                                    o.pattern = el;
                                    o.pattern && updatePosition(o);
                                    break;
                                }
                                var clr = R.getRGB(value);
                                if (!clr.error) {
                                    delete params.gradient;
                                    delete attrs.gradient;
                                    !R.is(attrs.opacity, "undefined") && R.is(params.opacity, "undefined") && $(node, {
                                        opacity: attrs.opacity
                                    });
                                    !R.is(attrs["fill-opacity"], "undefined") && R.is(params["fill-opacity"], "undefined") && $(node, {
                                        "fill-opacity": attrs["fill-opacity"]
                                    });
                                } else if ((({
                                        circle: 1,
                                        ellipse: 1
                                    })[has](o.type) || Str(value).charAt() != "r") && addGradientFill(node, value, o.paper)) {
                                    attrs.gradient = value;
                                    attrs.fill = "none";
                                    break;
                                }
                                clr[has]("opacity") && $(node, {
                                    "fill-opacity": clr.opacity > 1 ? clr.opacity / 100 : clr.opacity
                                });
                            case "stroke":
                                clr = R.getRGB(value);
                                node[setAttribute](att, clr.hex);
                                att == "stroke" && clr[has]("opacity") && $(node, {
                                    "stroke-opacity": clr.opacity > 1 ? clr.opacity / 100 : clr.opacity
                                });
                                break;
                            case "gradient":
                                (({
                                    circle: 1,
                                    ellipse: 1
                                })[has](o.type) || Str(value).charAt() != "r") && addGradientFill(node, value, o.paper);
                                break;
                            case "opacity":
                                if (attrs.gradient && !attrs[has]("stroke-opacity")) {
                                    $(node, {
                                        "stroke-opacity": value > 1 ? value / 100 : value
                                    });
                                }
                            case "fill-opacity":
                                if (attrs.gradient) {
                                    var gradient = doc.getElementById(node.getAttribute(fillString)[rp](/^url\(#|\)$/g, E));
                                    if (gradient) {
                                        var stops = gradient.getElementsByTagName("stop");
                                        stops[stops[length] - 1][setAttribute]("stop-opacity", value);
                                    }
                                    break;
                                }
                            default:
                                att == "font-size" && (value = toInt(value, 10) + "px");
                                var cssrule = att[rp](/(\-.)/g, function(w) {
                                    return upperCase.call(w.substring(1));
                                });
                                node.style[cssrule] = value;
                                node[setAttribute](att, value);
                                break;
                        }
                    }
                }
                tuneText(o, params);
                if (rotxy) {
                    o.rotate(rotxy.join(S));
                } else {
                    toFloat(rot) && o.rotate(rot, true);
                }
            };
            var leading = 1.2,
                tuneText = function(el, params) {
                    if (el.type != "text" || !(params[has]("text") || params[has]("font") || params[has]("font-size") || params[has]("x") || params[has]("y"))) {
                        return;
                    }
                    var a = el.attrs,
                        node = el.node,
                        fontSize = node.firstChild ? toInt(doc.defaultView.getComputedStyle(node.firstChild, E).getPropertyValue("font-size"), 10) : 10;
                    if (params[has]("text")) {
                        a.text = params.text;
                        while (node.firstChild) {
                            node.removeChild(node.firstChild);
                        }
                        var texts = Str(params.text)[split]("\n");
                        for (var i = 0, ii = texts[length]; i < ii; i++)
                            if (texts[i]) {
                                var tspan = $("tspan");
                                i && $(tspan, {
                                    dy: fontSize * leading,
                                    x: a.x
                                });
                                tspan[appendChild](doc.createTextNode(texts[i]));
                                node[appendChild](tspan);
                            }
                    } else {
                        texts = node.getElementsByTagName("tspan");
                        for (i = 0, ii = texts[length]; i < ii; i++) {
                            i && $(texts[i], {
                                dy: fontSize * leading,
                                x: a.x
                            });
                        }
                    }
                    $(node, {
                        y: a.y
                    });
                    var bb = el.getBBox(),
                        dif = a.y - (bb.y + bb.height / 2);
                    dif && R.is(dif, "finite") && $(node, {
                        y: a.y + dif
                    });
                },
                Element = function(node, svg) {
                    var X = 0,
                        Y = 0;
                    this[0] = node;
                    this.id = R._oid++;
                    this.node = node;
                    node.raphael = this;
                    this.paper = svg;
                    this.attrs = this.attrs || {};
                    this.transformations = [];
                    this._ = {
                        tx: 0,
                        ty: 0,
                        rt: {
                            deg: 0,
                            cx: 0,
                            cy: 0
                        },
                        sx: 1,
                        sy: 1
                    };
                    !svg.bottom && (svg.bottom = this);
                    this.prev = svg.top;
                    svg.top && (svg.top.next = this);
                    svg.top = this;
                    this.next = null;
                };
            var elproto = Element[proto];
            Element[proto].rotate = function(deg, cx, cy) {
                if (this.removed) {
                    return this;
                }
                if (deg == null) {
                    if (this._.rt.cx) {
                        return [this._.rt.deg, this._.rt.cx, this._.rt.cy][join](S);
                    }
                    return this._.rt.deg;
                }
                var bbox = this.getBBox();
                deg = Str(deg)[split](separator);
                if (deg[length] - 1) {
                    cx = toFloat(deg[1]);
                    cy = toFloat(deg[2]);
                }
                deg = toFloat(deg[0]);
                if (cx != null && cx !== false) {
                    this._.rt.deg = deg;
                } else {
                    this._.rt.deg += deg;
                }
                (cy == null) && (cx = null);
                this._.rt.cx = cx;
                this._.rt.cy = cy;
                cx = cx == null ? bbox.x + bbox.width / 2 : cx;
                cy = cy == null ? bbox.y + bbox.height / 2 : cy;
                if (this._.rt.deg) {
                    this.transformations[0] = R.format("rotate({0} {1} {2})", this._.rt.deg, cx, cy);
                    this.clip && $(this.clip, {
                        transform: R.format("rotate({0} {1} {2})", -this._.rt.deg, cx, cy)
                    });
                } else {
                    this.transformations[0] = E;
                    this.clip && $(this.clip, {
                        transform: E
                    });
                }
                $(this.node, {
                    transform: this.transformations[join](S)
                });
                return this;
            };
            Element[proto].hide = function() {
                !this.removed && (this.node.style.display = "none");
                return this;
            };
            Element[proto].show = function() {
                !this.removed && (this.node.style.display = "");
                return this;
            };
            Element[proto].remove = function() {
                if (this.removed) {
                    return;
                }
                tear(this, this.paper);
                this.node.parentNode.removeChild(this.node);
                for (var i in this) {
                    delete this[i];
                }
                this.removed = true;
            };
            Element[proto].getBBox = function() {
                if (this.removed) {
                    return this;
                }
                if (this.type == "path") {
                    return pathDimensions(this.attrs.path);
                }
                if (this.node.style.display == "none") {
                    this.show();
                    var hide = true;
                }
                var bbox = {};
                try {
                    bbox = this.node.getBBox();
                } catch (e) {} finally {
                    bbox = bbox || {};
                }
                if (this.type == "text") {
                    bbox = {
                        x: bbox.x,
                        y: Infinity,
                        width: 0,
                        height: 0
                    };
                    for (var i = 0, ii = this.node.getNumberOfChars(); i < ii; i++) {
                        var bb = this.node.getExtentOfChar(i);
                        (bb.y < bbox.y) && (bbox.y = bb.y);
                        (bb.y + bb.height - bbox.y > bbox.height) && (bbox.height = bb.y + bb.height - bbox.y);
                        (bb.x + bb.width - bbox.x > bbox.width) && (bbox.width = bb.x + bb.width - bbox.x);
                    }
                }
                hide && this.hide();
                return bbox;
            };
            Element[proto].attr = function(name, value) {
                if (this.removed) {
                    return this;
                }
                if (name == null) {
                    var res = {};
                    for (var i in this.attrs)
                        if (this.attrs[has](i)) {
                            res[i] = this.attrs[i];
                        }
                    this._.rt.deg && (res.rotation = this.rotate());
                    (this._.sx != 1 || this._.sy != 1) && (res.scale = this.scale());
                    res.gradient && res.fill == "none" && (res.fill = res.gradient) && delete res.gradient;
                    return res;
                }
                if (value == null && R.is(name, string)) {
                    if (name == "translation") {
                        return translate.call(this);
                    }
                    if (name == "rotation") {
                        return this.rotate();
                    }
                    if (name == "scale") {
                        return this.scale();
                    }
                    if (name == fillString && this.attrs.fill == "none" && this.attrs.gradient) {
                        return this.attrs.gradient;
                    }
                    return this.attrs[name];
                }
                if (value == null && R.is(name, array)) {
                    var values = {};
                    for (var j = 0, jj = name.length; j < jj; j++) {
                        values[name[j]] = this.attr(name[j]);
                    }
                    return values;
                }
                if (value != null) {
                    var params = {};
                    params[name] = value;
                } else if (name != null && R.is(name, "object")) {
                    params = name;
                }
                for (var key in this.paper.customAttributes)
                    if (this.paper.customAttributes[has](key) && params[has](key) && R.is(this.paper.customAttributes[key], "function")) {
                        var par = this.paper.customAttributes[key].apply(this, [][concat](params[key]));
                        this.attrs[key] = params[key];
                        for (var subkey in par)
                            if (par[has](subkey)) {
                                params[subkey] = par[subkey];
                            }
                    }
                setFillAndStroke(this, params);
                return this;
            };
            Element[proto].toFront = function() {
                if (this.removed) {
                    return this;
                }
                this.node.parentNode[appendChild](this.node);
                var svg = this.paper;
                svg.top != this && tofront(this, svg);
                return this;
            };
            Element[proto].toBack = function() {
                if (this.removed) {
                    return this;
                }
                if (this.node.parentNode.firstChild != this.node) {
                    this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild);
                    toback(this, this.paper);
                    var svg = this.paper;
                }
                return this;
            };
            Element[proto].insertAfter = function(element) {
                if (this.removed) {
                    return this;
                }
                var node = element.node || element[element.length - 1].node;
                if (node.nextSibling) {
                    node.parentNode.insertBefore(this.node, node.nextSibling);
                } else {
                    node.parentNode[appendChild](this.node);
                }
                insertafter(this, element, this.paper);
                return this;
            };
            Element[proto].insertBefore = function(element) {
                if (this.removed) {
                    return this;
                }
                var node = element.node || element[0].node;
                node.parentNode.insertBefore(this.node, node);
                insertbefore(this, element, this.paper);
                return this;
            };
            Element[proto].blur = function(size) {
                var t = this;
                if (+size !== 0) {
                    var fltr = $("filter"),
                        blur = $("feGaussianBlur");
                    t.attrs.blur = size;
                    fltr.id = createUUID();
                    $(blur, {
                        stdDeviation: +size || 1.5
                    });
                    fltr.appendChild(blur);
                    t.paper.defs.appendChild(fltr);
                    t._blur = fltr;
                    $(t.node, {
                        filter: "url(#" + fltr.id + ")"
                    });
                } else {
                    if (t._blur) {
                        t._blur.parentNode.removeChild(t._blur);
                        delete t._blur;
                        delete t.attrs.blur;
                    }
                    t.node.removeAttribute("filter");
                }
            };
            var theCircle = function(svg, x, y, r) {
                    var el = $("circle");
                    svg.canvas && svg.canvas[appendChild](el);
                    var res = new Element(el, svg);
                    res.attrs = {
                        cx: x,
                        cy: y,
                        r: r,
                        fill: "none",
                        stroke: "#000"
                    };
                    res.type = "circle";
                    $(el, res.attrs);
                    return res;
                },
                theRect = function(svg, x, y, w, h, r) {
                    var el = $("rect");
                    svg.canvas && svg.canvas[appendChild](el);
                    var res = new Element(el, svg);
                    res.attrs = {
                        x: x,
                        y: y,
                        width: w,
                        height: h,
                        r: r || 0,
                        rx: r || 0,
                        ry: r || 0,
                        fill: "none",
                        stroke: "#000"
                    };
                    res.type = "rect";
                    $(el, res.attrs);
                    return res;
                },
                theEllipse = function(svg, x, y, rx, ry) {
                    var el = $("ellipse");
                    svg.canvas && svg.canvas[appendChild](el);
                    var res = new Element(el, svg);
                    res.attrs = {
                        cx: x,
                        cy: y,
                        rx: rx,
                        ry: ry,
                        fill: "none",
                        stroke: "#000"
                    };
                    res.type = "ellipse";
                    $(el, res.attrs);
                    return res;
                },
                theImage = function(svg, src, x, y, w, h) {
                    var el = $("image");
                    $(el, {
                        x: x,
                        y: y,
                        width: w,
                        height: h,
                        preserveAspectRatio: "none"
                    });
                    el.setAttributeNS(svg.xlink, "href", src);
                    svg.canvas && svg.canvas[appendChild](el);
                    var res = new Element(el, svg);
                    res.attrs = {
                        x: x,
                        y: y,
                        width: w,
                        height: h,
                        src: src
                    };
                    res.type = "image";
                    return res;
                },
                theText = function(svg, x, y, text) {
                    var el = $("text");
                    $(el, {
                        x: x,
                        y: y,
                        "text-anchor": "middle"
                    });
                    svg.canvas && svg.canvas[appendChild](el);
                    var res = new Element(el, svg);
                    res.attrs = {
                        x: x,
                        y: y,
                        "text-anchor": "middle",
                        text: text,
                        font: availableAttrs.font,
                        stroke: "none",
                        fill: "#000"
                    };
                    res.type = "text";
                    setFillAndStroke(res, res.attrs);
                    return res;
                },
                setSize = function(width, height) {
                    this.width = width || this.width;
                    this.height = height || this.height;
                    this.canvas[setAttribute]("width", this.width);
                    this.canvas[setAttribute]("height", this.height);
                    return this;
                },
                create = function() {
                    var con = getContainer[apply](0, arguments),
                        container = con && con.container,
                        x = con.x,
                        y = con.y,
                        width = con.width,
                        height = con.height;
                    if (!container) {
                        throw new Error("SVG container not found.");
                    }
                    var cnvs = $("svg");
                    x = x || 0;
                    y = y || 0;
                    width = width || 512;
                    height = height || 342;
                    $(cnvs, {
                        xmlns: "http://www.w3.org/2000/svg",
                        version: 1.1,
                        width: width,
                        height: height
                    });
                    if (container == 1) {
                        cnvs.style.cssText = "position:absolute;left:" + x + "px;top:" + y + "px";
                        doc.body[appendChild](cnvs);
                    } else {
                        if (container.firstChild) {
                            container.insertBefore(cnvs, container.firstChild);
                        } else {
                            container[appendChild](cnvs);
                        }
                    }
                    container = new Paper;
                    container.width = width;
                    container.height = height;
                    container.canvas = cnvs;
                    plugins.call(container, container, R.fn);
                    container.clear();
                    return container;
                };
            paperproto.clear = function() {
                var c = this.canvas;
                while (c.firstChild) {
                    c.removeChild(c.firstChild);
                }
                this.bottom = this.top = null;
                (this.desc = $("desc"))[appendChild](doc.createTextNode("Created with Rapha\xebl"));
                c[appendChild](this.desc);
                c[appendChild](this.defs = $("defs"));
            };
            paperproto.remove = function() {
                this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
                for (var i in this) {
                    this[i] = removed(i);
                }
            };
        }
        if (R.vml) {
            var map = {
                    M: "m",
                    L: "l",
                    C: "c",
                    Z: "x",
                    m: "t",
                    l: "r",
                    c: "v",
                    z: "x"
                },
                bites = /([clmz]),?([^clmz]*)/gi,
                blurregexp = / progid:\S+Blur\([^\)]+\)/g,
                val = /-?[^,\s-]+/g,
                coordsize = 1e3 + S + 1e3,
                zoom = 10,
                pathlike = {
                    path: 1,
                    rect: 1
                },
                path2vml = function(path) {
                    var total = /[ahqstv]/ig,
                        command = pathToAbsolute;
                    Str(path).match(total) && (command = path2curve);
                    total = /[clmz]/g;
                    if (command == pathToAbsolute && !Str(path).match(total)) {
                        var res = Str(path)[rp](bites, function(all, command, args) {
                            var vals = [],
                                isMove = lowerCase.call(command) == "m",
                                res = map[command];
                            args[rp](val, function(value) {
                                if (isMove && vals[length] == 2) {
                                    res += vals + map[command == "m" ? "l" : "L"];
                                    vals = [];
                                }
                                vals[push](round(value * zoom));
                            });
                            return res + vals;
                        });
                        return res;
                    }
                    var pa = command(path),
                        p, r;
                    res = [];
                    for (var i = 0, ii = pa[length]; i < ii; i++) {
                        p = pa[i];
                        r = lowerCase.call(pa[i][0]);
                        r == "z" && (r = "x");
                        for (var j = 1, jj = p[length]; j < jj; j++) {
                            r += round(p[j] * zoom) + (j != jj - 1 ? "," : E);
                        }
                        res[push](r);
                    }
                    return res[join](S);
                };
            R[toString] = function() {
                return "Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\xebl " + this.version;
            };
            thePath = function(pathString, vml) {
                var g = createNode("group");
                g.style.cssText = "position:absolute;left:0;top:0;width:" + vml.width + "px;height:" + vml.height + "px";
                g.coordsize = vml.coordsize;
                g.coordorigin = vml.coordorigin;
                var el = createNode("shape"),
                    ol = el.style;
                ol.width = vml.width + "px";
                ol.height = vml.height + "px";
                el.coordsize = coordsize;
                el.coordorigin = vml.coordorigin;
                g[appendChild](el);
                var p = new Element(el, g, vml),
                    attr = {
                        fill: "none",
                        stroke: "#000"
                    };
                pathString && (attr.path = pathString);
                p.type = "path";
                p.path = [];
                p.Path = E;
                setFillAndStroke(p, attr);
                vml.canvas[appendChild](g);
                return p;
            };
            setFillAndStroke = function(o, params) {
                o.attrs = o.attrs || {};
                var node = o.node,
                    a = o.attrs,
                    s = node.style,
                    xy, newpath = (params.x != a.x || params.y != a.y || params.width != a.width || params.height != a.height || params.r != a.r) && o.type == "rect",
                    res = o;
                for (var par in params)
                    if (params[has](par)) {
                        a[par] = params[par];
                    }
                if (newpath) {
                    a.path = rectPath(a.x, a.y, a.width, a.height, a.r);
                    o.X = a.x;
                    o.Y = a.y;
                    o.W = a.width;
                    o.H = a.height;
                }
                params.href && (node.href = params.href);
                params.title && (node.title = params.title);
                params.target && (node.target = params.target);
                params.cursor && (s.cursor = params.cursor);
                "blur" in params && o.blur(params.blur);
                if (params.path && o.type == "path" || newpath) {
                    node.path = path2vml(a.path);
                }
                if (params.rotation != null) {
                    o.rotate(params.rotation, true);
                }
                if (params.translation) {
                    xy = Str(params.translation)[split](separator);
                    translate.call(o, xy[0], xy[1]);
                    if (o._.rt.cx != null) {
                        o._.rt.cx += +xy[0];
                        o._.rt.cy += +xy[1];
                        o.setBox(o.attrs, xy[0], xy[1]);
                    }
                }
                if (params.scale) {
                    xy = Str(params.scale)[split](separator);
                    o.scale(+xy[0] || 1, +xy[1] || +xy[0] || 1, +xy[2] || null, +xy[3] || null);
                }
                if ("clip-rect" in params) {
                    var rect = Str(params["clip-rect"])[split](separator);
                    if (rect[length] == 4) {
                        rect[2] = +rect[2] + (+rect[0]);
                        rect[3] = +rect[3] + (+rect[1]);
                        var div = node.clipRect || doc.createElement("div"),
                            dstyle = div.style,
                            group = node.parentNode;
                        dstyle.clip = R.format("rect({1}px {2}px {3}px {0}px)", rect);
                        if (!node.clipRect) {
                            dstyle.position = "absolute";
                            dstyle.top = 0;
                            dstyle.left = 0;
                            dstyle.width = o.paper.width + "px";
                            dstyle.height = o.paper.height + "px";
                            group.parentNode.insertBefore(div, group);
                            div[appendChild](group);
                            node.clipRect = div;
                        }
                    }
                    if (!params["clip-rect"]) {
                        node.clipRect && (node.clipRect.style.clip = E);
                    }
                }
                if (o.type == "image" && params.src) {
                    node.src = params.src;
                }
                if (o.type == "image" && params.opacity) {
                    node.filterOpacity = ms + ".Alpha(opacity=" + (params.opacity * 100) + ")";
                    s.filter = (node.filterMatrix || E) + (node.filterOpacity || E);
                }
                params.font && (s.font = params.font);
                params["font-family"] && (s.fontFamily = '"' + params["font-family"][split](",")[0][rp](/^['"]+|['"]+$/g, E) + '"');
                params["font-size"] && (s.fontSize = params["font-size"]);
                params["font-weight"] && (s.fontWeight = params["font-weight"]);
                params["font-style"] && (s.fontStyle = params["font-style"]);
                if (params.opacity != null || params["stroke-width"] != null || params.fill != null || params.stroke != null || params["stroke-width"] != null || params["stroke-opacity"] != null || params["fill-opacity"] != null || params["stroke-dasharray"] != null || params["stroke-miterlimit"] != null || params["stroke-linejoin"] != null || params["stroke-linecap"] != null) {
                    node = o.shape || node;
                    var fill = (node.getElementsByTagName(fillString) && node.getElementsByTagName(fillString)[0]),
                        newfill = false;
                    !fill && (newfill = fill = createNode(fillString));
                    if ("fill-opacity" in params || "opacity" in params) {
                        var opacity = ((+a["fill-opacity"] + 1 || 2) - 1) * ((+a.opacity + 1 || 2) - 1) * ((+R.getRGB(params.fill).o + 1 || 2) - 1);
                        opacity = mmin(mmax(opacity, 0), 1);
                        fill.opacity = opacity;
                    }
                    params.fill && (fill.on = true);
                    if (fill.on == null || params.fill == "none") {
                        fill.on = false;
                    }
                    if (fill.on && params.fill) {
                        var isURL = params.fill.match(ISURL);
                        if (isURL) {
                            fill.src = isURL[1];
                            fill.type = "tile";
                        } else {
                            fill.color = R.getRGB(params.fill).hex;
                            fill.src = E;
                            fill.type = "solid";
                            if (R.getRGB(params.fill).error && (res.type in {
                                    circle: 1,
                                    ellipse: 1
                                } || Str(params.fill).charAt() != "r") && addGradientFill(res, params.fill)) {
                                a.fill = "none";
                                a.gradient = params.fill;
                            }
                        }
                    }
                    newfill && node[appendChild](fill);
                    var stroke = (node.getElementsByTagName("stroke") && node.getElementsByTagName("stroke")[0]),
                        newstroke = false;
                    !stroke && (newstroke = stroke = createNode("stroke"));
                    if ((params.stroke && params.stroke != "none") || params["stroke-width"] || params["stroke-opacity"] != null || params["stroke-dasharray"] || params["stroke-miterlimit"] || params["stroke-linejoin"] || params["stroke-linecap"]) {
                        stroke.on = true;
                    }
                    (params.stroke == "none" || stroke.on == null || params.stroke == 0 || params["stroke-width"] == 0) && (stroke.on = false);
                    var strokeColor = R.getRGB(params.stroke);
                    stroke.on && params.stroke && (stroke.color = strokeColor.hex);
                    opacity = ((+a["stroke-opacity"] + 1 || 2) - 1) * ((+a.opacity + 1 || 2) - 1) * ((+strokeColor.o + 1 || 2) - 1);
                    var width = (toFloat(params["stroke-width"]) || 1) * .75;
                    opacity = mmin(mmax(opacity, 0), 1);
                    params["stroke-width"] == null && (width = a["stroke-width"]);
                    params["stroke-width"] && (stroke.weight = width);
                    width && width < 1 && (opacity *= width) && (stroke.weight = 1);
                    stroke.opacity = opacity;
                    params["stroke-linejoin"] && (stroke.joinstyle = params["stroke-linejoin"] || "miter");
                    stroke.miterlimit = params["stroke-miterlimit"] || 8;
                    params["stroke-linecap"] && (stroke.endcap = params["stroke-linecap"] == "butt" ? "flat" : params["stroke-linecap"] == "square" ? "square" : "round");
                    if (params["stroke-dasharray"]) {
                        var dasharray = {
                            "-": "shortdash",
                            ".": "shortdot",
                            "-.": "shortdashdot",
                            "-..": "shortdashdotdot",
                            ". ": "dot",
                            "- ": "dash",
                            "--": "longdash",
                            "- .": "dashdot",
                            "--.": "longdashdot",
                            "--..": "longdashdotdot"
                        };
                        stroke.dashstyle = dasharray[has](params["stroke-dasharray"]) ? dasharray[params["stroke-dasharray"]] : E;
                    }
                    newstroke && node[appendChild](stroke);
                }
                if (res.type == "text") {
                    s = res.paper.span.style;
                    a.font && (s.font = a.font);
                    a["font-family"] && (s.fontFamily = a["font-family"]);
                    a["font-size"] && (s.fontSize = a["font-size"]);
                    a["font-weight"] && (s.fontWeight = a["font-weight"]);
                    a["font-style"] && (s.fontStyle = a["font-style"]);
                    res.node.string && (res.paper.span.innerHTML = Str(res.node.string)[rp](/</g, "&#60;")[rp](/&/g, "&#38;")[rp](/\n/g, "<br>"));
                    res.W = a.w = res.paper.span.offsetWidth;
                    res.H = a.h = res.paper.span.offsetHeight;
                    res.X = a.x;
                    res.Y = a.y + round(res.H / 2);
                    switch (a["text-anchor"]) {
                        case "start":
                            res.node.style["v-text-align"] = "left";
                            res.bbx = round(res.W / 2);
                            break;
                        case "end":
                            res.node.style["v-text-align"] = "right";
                            res.bbx = -round(res.W / 2);
                            break;
                        default:
                            res.node.style["v-text-align"] = "center";
                            break;
                    }
                }
            };
            addGradientFill = function(o, gradient) {
                o.attrs = o.attrs || {};
                var attrs = o.attrs,
                    fill, type = "linear",
                    fxfy = ".5 .5";
                o.attrs.gradient = gradient;
                gradient = Str(gradient)[rp](radial_gradient, function(all, fx, fy) {
                    type = "radial";
                    if (fx && fy) {
                        fx = toFloat(fx);
                        fy = toFloat(fy);
                        pow(fx - .5, 2) + pow(fy - .5, 2) > .25 && (fy = math.sqrt(.25 - pow(fx - .5, 2)) * ((fy > .5) * 2 - 1) + .5);
                        fxfy = fx + S + fy;
                    }
                    return E;
                });
                gradient = gradient[split](/\s*\-\s*/);
                if (type == "linear") {
                    var angle = gradient.shift();
                    angle = -toFloat(angle);
                    if (isNaN(angle)) {
                        return null;
                    }
                }
                var dots = parseDots(gradient);
                if (!dots) {
                    return null;
                }
                o = o.shape || o.node;
                fill = o.getElementsByTagName(fillString)[0] || createNode(fillString);
                !fill.parentNode && o.appendChild(fill);
                if (dots[length]) {
                    fill.on = true;
                    fill.method = "none";
                    fill.color = dots[0].color;
                    fill.color2 = dots[dots[length] - 1].color;
                    var clrs = [];
                    for (var i = 0, ii = dots[length]; i < ii; i++) {
                        dots[i].offset && clrs[push](dots[i].offset + S + dots[i].color);
                    }
                    fill.colors && (fill.colors.value = clrs[length] ? clrs[join]() : "0% " + fill.color);
                    if (type == "radial") {
                        fill.type = "gradientradial";
                        fill.focus = "100%";
                        fill.focussize = fxfy;
                        fill.focusposition = fxfy;
                    } else {
                        fill.type = "gradient";
                        fill.angle = (270 - angle) % 360;
                    }
                }
                return 1;
            };
            Element = function(node, group, vml) {
                var Rotation = 0,
                    RotX = 0,
                    RotY = 0,
                    Scale = 1;
                this[0] = node;
                this.id = R._oid++;
                this.node = node;
                node.raphael = this;
                this.X = 0;
                this.Y = 0;
                this.attrs = {};
                this.Group = group;
                this.paper = vml;
                this._ = {
                    tx: 0,
                    ty: 0,
                    rt: {
                        deg: 0
                    },
                    sx: 1,
                    sy: 1
                };
                !vml.bottom && (vml.bottom = this);
                this.prev = vml.top;
                vml.top && (vml.top.next = this);
                vml.top = this;
                this.next = null;
            };
            elproto = Element[proto];
            elproto.rotate = function(deg, cx, cy) {
                if (this.removed) {
                    return this;
                }
                if (deg == null) {
                    if (this._.rt.cx) {
                        return [this._.rt.deg, this._.rt.cx, this._.rt.cy][join](S);
                    }
                    return this._.rt.deg;
                }
                deg = Str(deg)[split](separator);
                if (deg[length] - 1) {
                    cx = toFloat(deg[1]);
                    cy = toFloat(deg[2]);
                }
                deg = toFloat(deg[0]);
                if (cx != null) {
                    this._.rt.deg = deg;
                } else {
                    this._.rt.deg += deg;
                }
                cy == null && (cx = null);
                this._.rt.cx = cx;
                this._.rt.cy = cy;
                this.setBox(this.attrs, cx, cy);
                this.Group.style.rotation = this._.rt.deg;
                return this;
            };
            elproto.setBox = function(params, cx, cy) {
                if (this.removed) {
                    return this;
                }
                var gs = this.Group.style,
                    os = (this.shape && this.shape.style) || this.node.style;
                params = params || {};
                for (var i in params)
                    if (params[has](i)) {
                        this.attrs[i] = params[i];
                    }
                cx = cx || this._.rt.cx;
                cy = cy || this._.rt.cy;
                var attr = this.attrs,
                    x, y, w, h;
                switch (this.type) {
                    case "circle":
                        x = attr.cx - attr.r;
                        y = attr.cy - attr.r;
                        w = h = attr.r * 2;
                        break;
                    case "ellipse":
                        x = attr.cx - attr.rx;
                        y = attr.cy - attr.ry;
                        w = attr.rx * 2;
                        h = attr.ry * 2;
                        break;
                    case "image":
                        x = +attr.x;
                        y = +attr.y;
                        w = attr.width || 0;
                        h = attr.height || 0;
                        break;
                    case "text":
                        this.textpath.v = ["m", round(attr.x), ", ", round(attr.y - 2), "l", round(attr.x) + 1, ", ", round(attr.y - 2)][join](E);
                        x = attr.x - round(this.W / 2);
                        y = attr.y - this.H / 2;
                        w = this.W;
                        h = this.H;
                        break;
                    case "rect":
                    case "path":
                        if (!this.attrs.path) {
                            x = 0;
                            y = 0;
                            w = this.paper.width;
                            h = this.paper.height;
                        } else {
                            var dim = pathDimensions(this.attrs.path);
                            x = dim.x;
                            y = dim.y;
                            w = dim.width;
                            h = dim.height;
                        }
                        break;
                    default:
                        x = 0;
                        y = 0;
                        w = this.paper.width;
                        h = this.paper.height;
                        break;
                }
                cx = (cx == null) ? x + w / 2 : cx;
                cy = (cy == null) ? y + h / 2 : cy;
                var left = cx - this.paper.width / 2,
                    top = cy - this.paper.height / 2,
                    t;
                gs.left != (t = left + "px") && (gs.left = t);
                gs.top != (t = top + "px") && (gs.top = t);
                this.X = pathlike[has](this.type) ? -left : x;
                this.Y = pathlike[has](this.type) ? -top : y;
                this.W = w;
                this.H = h;
                if (pathlike[has](this.type)) {
                    os.left != (t = -left * zoom + "px") && (os.left = t);
                    os.top != (t = -top * zoom + "px") && (os.top = t);
                } else if (this.type == "text") {
                    os.left != (t = -left + "px") && (os.left = t);
                    os.top != (t = -top + "px") && (os.top = t);
                } else {
                    gs.width != (t = this.paper.width + "px") && (gs.width = t);
                    gs.height != (t = this.paper.height + "px") && (gs.height = t);
                    os.left != (t = x - left + "px") && (os.left = t);
                    os.top != (t = y - top + "px") && (os.top = t);
                    os.width != (t = w + "px") && (os.width = t);
                    os.height != (t = h + "px") && (os.height = t);
                }
            };
            elproto.hide = function() {
                !this.removed && (this.Group.style.display = "none");
                return this;
            };
            elproto.show = function() {
                !this.removed && (this.Group.style.display = "block");
                return this;
            };
            elproto.getBBox = function() {
                if (this.removed) {
                    return this;
                }
                if (pathlike[has](this.type)) {
                    return pathDimensions(this.attrs.path);
                }
                return {
                    x: this.X + (this.bbx || 0),
                    y: this.Y,
                    width: this.W,
                    height: this.H
                };
            };
            elproto.remove = function() {
                if (this.removed) {
                    return;
                }
                tear(this, this.paper);
                this.node.parentNode.removeChild(this.node);
                this.Group.parentNode.removeChild(this.Group);
                this.shape && this.shape.parentNode.removeChild(this.shape);
                for (var i in this) {
                    delete this[i];
                }
                this.removed = true;
            };
            elproto.attr = function(name, value) {
                if (this.removed) {
                    return this;
                }
                if (name == null) {
                    var res = {};
                    for (var i in this.attrs)
                        if (this.attrs[has](i)) {
                            res[i] = this.attrs[i];
                        }
                    this._.rt.deg && (res.rotation = this.rotate());
                    (this._.sx != 1 || this._.sy != 1) && (res.scale = this.scale());
                    res.gradient && res.fill == "none" && (res.fill = res.gradient) && delete res.gradient;
                    return res;
                }
                if (value == null && R.is(name, "string")) {
                    if (name == "translation") {
                        return translate.call(this);
                    }
                    if (name == "rotation") {
                        return this.rotate();
                    }
                    if (name == "scale") {
                        return this.scale();
                    }
                    if (name == fillString && this.attrs.fill == "none" && this.attrs.gradient) {
                        return this.attrs.gradient;
                    }
                    return this.attrs[name];
                }
                if (this.attrs && value == null && R.is(name, array)) {
                    var ii, values = {};
                    for (i = 0, ii = name[length]; i < ii; i++) {
                        values[name[i]] = this.attr(name[i]);
                    }
                    return values;
                }
                var params;
                if (value != null) {
                    params = {};
                    params[name] = value;
                }
                value == null && R.is(name, "object") && (params = name);
                if (params) {
                    for (var key in this.paper.customAttributes)
                        if (this.paper.customAttributes[has](key) && params[has](key) && R.is(this.paper.customAttributes[key], "function")) {
                            var par = this.paper.customAttributes[key].apply(this, [][concat](params[key]));
                            this.attrs[key] = params[key];
                            for (var subkey in par)
                                if (par[has](subkey)) {
                                    params[subkey] = par[subkey];
                                }
                        }
                    if (params.text && this.type == "text") {
                        this.node.string = params.text;
                    }
                    setFillAndStroke(this, params);
                    if (params.gradient && (({
                            circle: 1,
                            ellipse: 1
                        })[has](this.type) || Str(params.gradient).charAt() != "r")) {
                        addGradientFill(this, params.gradient);
                    }
                    (!pathlike[has](this.type) || this._.rt.deg) && this.setBox(this.attrs);
                }
                return this;
            };
            elproto.toFront = function() {
                !this.removed && this.Group.parentNode[appendChild](this.Group);
                this.paper.top != this && tofront(this, this.paper);
                return this;
            };
            elproto.toBack = function() {
                if (this.removed) {
                    return this;
                }
                if (this.Group.parentNode.firstChild != this.Group) {
                    this.Group.parentNode.insertBefore(this.Group, this.Group.parentNode.firstChild);
                    toback(this, this.paper);
                }
                return this;
            };
            elproto.insertAfter = function(element) {
                if (this.removed) {
                    return this;
                }
                if (element.constructor == Set) {
                    element = element[element.length - 1];
                }
                if (element.Group.nextSibling) {
                    element.Group.parentNode.insertBefore(this.Group, element.Group.nextSibling);
                } else {
                    element.Group.parentNode[appendChild](this.Group);
                }
                insertafter(this, element, this.paper);
                return this;
            };
            elproto.insertBefore = function(element) {
                if (this.removed) {
                    return this;
                }
                if (element.constructor == Set) {
                    element = element[0];
                }
                element.Group.parentNode.insertBefore(this.Group, element.Group);
                insertbefore(this, element, this.paper);
                return this;
            };
            elproto.blur = function(size) {
                var s = this.node.runtimeStyle,
                    f = s.filter;
                f = f.replace(blurregexp, E);
                if (+size !== 0) {
                    this.attrs.blur = size;
                    s.filter = f + S + ms + ".Blur(pixelradius=" + (+size || 1.5) + ")";
                    s.margin = R.format("-{0}px 0 0 -{0}px", round(+size || 1.5));
                } else {
                    s.filter = f;
                    s.margin = 0;
                    delete this.attrs.blur;
                }
            };
            theCircle = function(vml, x, y, r) {
                var g = createNode("group"),
                    o = createNode("oval"),
                    ol = o.style;
                g.style.cssText = "position:absolute;left:0;top:0;width:" + vml.width + "px;height:" + vml.height + "px";
                g.coordsize = coordsize;
                g.coordorigin = vml.coordorigin;
                g[appendChild](o);
                var res = new Element(o, g, vml);
                res.type = "circle";
                setFillAndStroke(res, {
                    stroke: "#000",
                    fill: "none"
                });
                res.attrs.cx = x;
                res.attrs.cy = y;
                res.attrs.r = r;
                res.setBox({
                    x: x - r,
                    y: y - r,
                    width: r * 2,
                    height: r * 2
                });
                vml.canvas[appendChild](g);
                return res;
            };

            function rectPath(x, y, w, h, r) {
                if (r) {
                    return R.format("M{0},{1}l{2},0a{3},{3},0,0,1,{3},{3}l0,{5}a{3},{3},0,0,1,{4},{3}l{6},0a{3},{3},0,0,1,{4},{4}l0,{7}a{3},{3},0,0,1,{3},{4}z", x + r, y, w - r * 2, r, -r, h - r * 2, r * 2 - w, r * 2 - h);
                } else {
                    return R.format("M{0},{1}l{2},0,0,{3},{4},0z", x, y, w, h, -w);
                }
            }
            theRect = function(vml, x, y, w, h, r) {
                var path = rectPath(x, y, w, h, r),
                    res = vml.path(path),
                    a = res.attrs;
                res.X = a.x = x;
                res.Y = a.y = y;
                res.W = a.width = w;
                res.H = a.height = h;
                a.r = r;
                a.path = path;
                res.type = "rect";
                return res;
            };
            theEllipse = function(vml, x, y, rx, ry) {
                var g = createNode("group"),
                    o = createNode("oval"),
                    ol = o.style;
                g.style.cssText = "position:absolute;left:0;top:0;width:" + vml.width + "px;height:" + vml.height + "px";
                g.coordsize = coordsize;
                g.coordorigin = vml.coordorigin;
                g[appendChild](o);
                var res = new Element(o, g, vml);
                res.type = "ellipse";
                setFillAndStroke(res, {
                    stroke: "#000"
                });
                res.attrs.cx = x;
                res.attrs.cy = y;
                res.attrs.rx = rx;
                res.attrs.ry = ry;
                res.setBox({
                    x: x - rx,
                    y: y - ry,
                    width: rx * 2,
                    height: ry * 2
                });
                vml.canvas[appendChild](g);
                return res;
            };
            theImage = function(vml, src, x, y, w, h) {
                var g = createNode("group"),
                    o = createNode("image");
                g.style.cssText = "position:absolute;left:0;top:0;width:" + vml.width + "px;height:" + vml.height + "px";
                g.coordsize = coordsize;
                g.coordorigin = vml.coordorigin;
                o.src = src;
                g[appendChild](o);
                var res = new Element(o, g, vml);
                res.type = "image";
                res.attrs.src = src;
                res.attrs.x = x;
                res.attrs.y = y;
                res.attrs.w = w;
                res.attrs.h = h;
                res.setBox({
                    x: x,
                    y: y,
                    width: w,
                    height: h
                });
                vml.canvas[appendChild](g);
                return res;
            };
            theText = function(vml, x, y, text) {
                var g = createNode("group"),
                    el = createNode("shape"),
                    ol = el.style,
                    path = createNode("path"),
                    ps = path.style,
                    o = createNode("textpath");
                g.style.cssText = "position:absolute;left:0;top:0;width:" + vml.width + "px;height:" + vml.height + "px";
                g.coordsize = coordsize;
                g.coordorigin = vml.coordorigin;
                path.v = R.format("m{0},{1}l{2},{1}", round(x * 10), round(y * 10), round(x * 10) + 1);
                path.textpathok = true;
                ol.width = vml.width;
                ol.height = vml.height;
                o.string = Str(text);
                o.on = true;
                el[appendChild](o);
                el[appendChild](path);
                g[appendChild](el);
                var res = new Element(o, g, vml);
                res.shape = el;
                res.textpath = path;
                res.type = "text";
                res.attrs.text = text;
                res.attrs.x = x;
                res.attrs.y = y;
                res.attrs.w = 1;
                res.attrs.h = 1;
                setFillAndStroke(res, {
                    font: availableAttrs.font,
                    stroke: "none",
                    fill: "#000"
                });
                res.setBox();
                vml.canvas[appendChild](g);
                return res;
            };
            setSize = function(width, height) {
                var cs = this.canvas.style;
                width == +width && (width += "px");
                height == +height && (height += "px");
                cs.width = width;
                cs.height = height;
                cs.clip = "rect(0 " + width + " " + height + " 0)";
                return this;
            };
            var createNode;
            doc.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
            try {
                !doc.namespaces.rvml && doc.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
                createNode = function(tagName) {
                    return doc.createElement('<rvml:' + tagName + ' class="rvml">');
                };
            } catch (e) {
                createNode = function(tagName) {
                    return doc.createElement('<' + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
                };
            }
            create = function() {
                var con = getContainer[apply](0, arguments),
                    container = con.container,
                    height = con.height,
                    s, width = con.width,
                    x = con.x,
                    y = con.y;
                if (!container) {
                    throw new Error("VML container not found.");
                }
                var res = new Paper,
                    c = res.canvas = doc.createElement("div"),
                    cs = c.style;
                x = x || 0;
                y = y || 0;
                width = width || 512;
                height = height || 342;
                width == +width && (width += "px");
                height == +height && (height += "px");
                res.width = 1e3;
                res.height = 1e3;
                res.coordsize = zoom * 1e3 + S + zoom * 1e3;
                res.coordorigin = "0 0";
                res.span = doc.createElement("span");
                res.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
                c[appendChild](res.span);
                cs.cssText = R.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", width, height);
                if (container == 1) {
                    doc.body[appendChild](c);
                    cs.left = x + "px";
                    cs.top = y + "px";
                    cs.position = "absolute";
                } else {
                    if (container.firstChild) {
                        container.insertBefore(c, container.firstChild);
                    } else {
                        container[appendChild](c);
                    }
                }
                plugins.call(res, res, R.fn);
                return res;
            };
            paperproto.clear = function() {
                this.canvas.innerHTML = E;
                this.span = doc.createElement("span");
                this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
                this.canvas[appendChild](this.span);
                this.bottom = this.top = null;
            };
            paperproto.remove = function() {
                this.canvas.parentNode.removeChild(this.canvas);
                for (var i in this) {
                    this[i] = removed(i);
                }
                return true;
            };
        }
        var version = navigator.userAgent.match(/Version\/(.*?)\s/);
        if ((navigator.vendor == "Apple Computer, Inc.") && (version && version[1] < 4 || navigator.platform.slice(0, 2) == "iP")) {
            paperproto.safari = function() {
                var rect = this.rect(-99, -99, this.width + 99, this.height + 99).attr({
                    stroke: "none"
                });
                win.setTimeout(function() {
                    rect.remove();
                });
            };
        } else {
            paperproto.safari = function() {};
        }
        var preventDefault = function() {
                this.returnValue = false;
            },
            preventTouch = function() {
                return this.originalEvent.preventDefault();
            },
            stopPropagation = function() {
                this.cancelBubble = true;
            },
            stopTouch = function() {
                return this.originalEvent.stopPropagation();
            },
            addEvent = (function() {
                if (doc.addEventListener) {
                    return function(obj, type, fn, element) {
                        var realName = supportsTouch && touchMap[type] ? touchMap[type] : type;
                        var f = function(e) {
                            if (supportsTouch && touchMap[has](type)) {
                                for (var i = 0, ii = e.targetTouches && e.targetTouches.length; i < ii; i++) {
                                    if (e.targetTouches[i].target == obj) {
                                        var olde = e;
                                        e = e.targetTouches[i];
                                        e.originalEvent = olde;
                                        e.preventDefault = preventTouch;
                                        e.stopPropagation = stopTouch;
                                        break;
                                    }
                                }
                            }
                            return fn.call(element, e);
                        };
                        obj.addEventListener(realName, f, false);
                        return function() {
                            obj.removeEventListener(realName, f, false);
                            return true;
                        };
                    };
                } else if (doc.attachEvent) {
                    return function(obj, type, fn, element) {
                        var f = function(e) {
                            e = e || win.event;
                            e.preventDefault = e.preventDefault || preventDefault;
                            e.stopPropagation = e.stopPropagation || stopPropagation;
                            return fn.call(element, e);
                        };
                        obj.attachEvent("on" + type, f);
                        var detacher = function() {
                            obj.detachEvent("on" + type, f);
                            return true;
                        };
                        return detacher;
                    };
                }
            })(),
            drag = [],
            dragMove = function(e) {
                var x = e.clientX,
                    y = e.clientY,
                    scrollY = doc.documentElement.scrollTop || doc.body.scrollTop,
                    scrollX = doc.documentElement.scrollLeft || doc.body.scrollLeft,
                    dragi, j = drag.length;
                while (j--) {
                    dragi = drag[j];
                    if (supportsTouch) {
                        var i = e.touches.length,
                            touch;
                        while (i--) {
                            touch = e.touches[i];
                            if (touch.identifier == dragi.el._drag.id) {
                                x = touch.clientX;
                                y = touch.clientY;
                                (e.originalEvent ? e.originalEvent : e).preventDefault();
                                break;
                            }
                        }
                    } else {
                        e.preventDefault();
                    }
                    x += scrollX;
                    y += scrollY;
                    dragi.move && dragi.move.call(dragi.move_scope || dragi.el, x - dragi.el._drag.x, y - dragi.el._drag.y, x, y, e);
                }
            },
            dragUp = function(e) {
                R.unmousemove(dragMove).unmouseup(dragUp);
                var i = drag.length,
                    dragi;
                while (i--) {
                    dragi = drag[i];
                    dragi.el._drag = {};
                    dragi.end && dragi.end.call(dragi.end_scope || dragi.start_scope || dragi.move_scope || dragi.el, e);
                }
                drag = [];
            };
        for (var i = events[length]; i--;) {
            (function(eventName) {
                R[eventName] = Element[proto][eventName] = function(fn, scope) {
                    if (R.is(fn, "function")) {
                        this.events = this.events || [];
                        this.events.push({
                            name: eventName,
                            f: fn,
                            unbind: addEvent(this.shape || this.node || doc, eventName, fn, scope || this)
                        });
                    }
                    return this;
                };
                R["un" + eventName] = Element[proto]["un" + eventName] = function(fn) {
                    var events = this.events,
                        l = events[length];
                    while (l--)
                        if (events[l].name == eventName && events[l].f == fn) {
                            events[l].unbind();
                            events.splice(l, 1);
                            !events.length && delete this.events;
                            return this;
                        }
                    return this;
                };
            })(events[i]);
        }
        elproto.hover = function(f_in, f_out, scope_in, scope_out) {
            return this.mouseover(f_in, scope_in).mouseout(f_out, scope_out || scope_in);
        };
        elproto.unhover = function(f_in, f_out) {
            return this.unmouseover(f_in).unmouseout(f_out);
        };
        elproto.drag = function(onmove, onstart, onend, move_scope, start_scope, end_scope) {
            this._drag = {};
            this.mousedown(function(e) {
                (e.originalEvent || e).preventDefault();
                var scrollY = doc.documentElement.scrollTop || doc.body.scrollTop,
                    scrollX = doc.documentElement.scrollLeft || doc.body.scrollLeft;
                this._drag.x = e.clientX + scrollX;
                this._drag.y = e.clientY + scrollY;
                this._drag.id = e.identifier;
                onstart && onstart.call(start_scope || move_scope || this, e.clientX + scrollX, e.clientY + scrollY, e);
                !drag.length && R.mousemove(dragMove).mouseup(dragUp);
                drag.push({
                    el: this,
                    move: onmove,
                    end: onend,
                    move_scope: move_scope,
                    start_scope: start_scope,
                    end_scope: end_scope
                });
            });
            return this;
        };
        elproto.undrag = function(onmove, onstart, onend) {
            var i = drag.length;
            while (i--) {
                drag[i].el == this && (drag[i].move == onmove && drag[i].end == onend) && drag.splice(i++, 1);
            }!drag.length && R.unmousemove(dragMove).unmouseup(dragUp);
        };
        paperproto.circle = function(x, y, r) {
            return theCircle(this, x || 0, y || 0, r || 0);
        };
        paperproto.rect = function(x, y, w, h, r) {
            return theRect(this, x || 0, y || 0, w || 0, h || 0, r || 0);
        };
        paperproto.ellipse = function(x, y, rx, ry) {
            return theEllipse(this, x || 0, y || 0, rx || 0, ry || 0);
        };
        paperproto.path = function(pathString) {
            pathString && !R.is(pathString, string) && !R.is(pathString[0], array) && (pathString += E);
            return thePath(R.format[apply](R, arguments), this);
        };
        paperproto.image = function(src, x, y, w, h) {
            return theImage(this, src || "about:blank", x || 0, y || 0, w || 0, h || 0);
        };
        paperproto.text = function(x, y, text) {
            return theText(this, x || 0, y || 0, Str(text));
        };
        paperproto.set = function(itemsArray) {
            arguments[length] > 1 && (itemsArray = Array[proto].splice.call(arguments, 0, arguments[length]));
            return new Set(itemsArray);
        };
        paperproto.setSize = setSize;
        paperproto.top = paperproto.bottom = null;
        paperproto.raphael = R;

        function x_y() {
            return this.x + S + this.y;
        }
        elproto.resetScale = function() {
            if (this.removed) {
                return this;
            }
            this._.sx = 1;
            this._.sy = 1;
            this.attrs.scale = "1 1";
        };
        elproto.scale = function(x, y, cx, cy) {
            if (this.removed) {
                return this;
            }
            if (x == null && y == null) {
                return {
                    x: this._.sx,
                    y: this._.sy,
                    toString: x_y
                };
            }
            y = y || x;
            !+y && (y = x);
            var dx, dy, dcx, dcy, a = this.attrs;
            if (x != 0) {
                var bb = this.getBBox(),
                    rcx = bb.x + bb.width / 2,
                    rcy = bb.y + bb.height / 2,
                    kx = abs(x / this._.sx),
                    ky = abs(y / this._.sy);
                cx = (+cx || cx == 0) ? cx : rcx;
                cy = (+cy || cy == 0) ? cy : rcy;
                var posx = this._.sx > 0,
                    posy = this._.sy > 0,
                    dirx = ~~(x / abs(x)),
                    diry = ~~(y / abs(y)),
                    dkx = kx * dirx,
                    dky = ky * diry,
                    s = this.node.style,
                    ncx = cx + abs(rcx - cx) * dkx * (rcx > cx == posx ? 1 : -1),
                    ncy = cy + abs(rcy - cy) * dky * (rcy > cy == posy ? 1 : -1),
                    fr = (x * dirx > y * diry ? ky : kx);
                switch (this.type) {
                    case "rect":
                    case "image":
                        var neww = a.width * kx,
                            newh = a.height * ky;
                        this.attr({
                            height: newh,
                            r: a.r * fr,
                            width: neww,
                            x: ncx - neww / 2,
                            y: ncy - newh / 2
                        });
                        break;
                    case "circle":
                    case "ellipse":
                        this.attr({
                            rx: a.rx * kx,
                            ry: a.ry * ky,
                            r: a.r * fr,
                            cx: ncx,
                            cy: ncy
                        });
                        break;
                    case "text":
                        this.attr({
                            x: ncx,
                            y: ncy
                        });
                        break;
                    case "path":
                        var path = pathToRelative(a.path),
                            skip = true,
                            fx = posx ? dkx : kx,
                            fy = posy ? dky : ky;
                        for (var i = 0, ii = path[length]; i < ii; i++) {
                            var p = path[i],
                                P0 = upperCase.call(p[0]);
                            if (P0 == "M" && skip) {
                                continue;
                            } else {
                                skip = false;
                            }
                            if (P0 == "A") {
                                p[path[i][length] - 2] *= fx;
                                p[path[i][length] - 1] *= fy;
                                p[1] *= kx;
                                p[2] *= ky;
                                p[5] = +(dirx + diry ? !!+p[5] : !+p[5]);
                            } else if (P0 == "H") {
                                for (var j = 1, jj = p[length]; j < jj; j++) {
                                    p[j] *= fx;
                                }
                            } else if (P0 == "V") {
                                for (j = 1, jj = p[length]; j < jj; j++) {
                                    p[j] *= fy;
                                }
                            } else {
                                for (j = 1, jj = p[length]; j < jj; j++) {
                                    p[j] *= (j % 2) ? fx : fy;
                                }
                            }
                        }
                        var dim2 = pathDimensions(path);
                        dx = ncx - dim2.x - dim2.width / 2;
                        dy = ncy - dim2.y - dim2.height / 2;
                        path[0][1] += dx;
                        path[0][2] += dy;
                        this.attr({
                            path: path
                        });
                        break;
                }
                if (this.type in {
                        text: 1,
                        image: 1
                    } && (dirx != 1 || diry != 1)) {
                    if (this.transformations) {
                        this.transformations[2] = "scale(" [concat](dirx, ",", diry, ")");
                        this.node[setAttribute]("transform", this.transformations[join](S));
                        dx = (dirx == -1) ? -a.x - (neww || 0) : a.x;
                        dy = (diry == -1) ? -a.y - (newh || 0) : a.y;
                        this.attr({
                            x: dx,
                            y: dy
                        });
                        a.fx = dirx - 1;
                        a.fy = diry - 1;
                    } else {
                        this.node.filterMatrix = ms + ".Matrix(M11=" [concat](dirx, ", M12=0, M21=0, M22=", diry, ", Dx=0, Dy=0, sizingmethod='auto expand', filtertype='bilinear')");
                        s.filter = (this.node.filterMatrix || E) + (this.node.filterOpacity || E);
                    }
                } else {
                    if (this.transformations) {
                        this.transformations[2] = E;
                        this.node[setAttribute]("transform", this.transformations[join](S));
                        a.fx = 0;
                        a.fy = 0;
                    } else {
                        this.node.filterMatrix = E;
                        s.filter = (this.node.filterMatrix || E) + (this.node.filterOpacity || E);
                    }
                }
                a.scale = [x, y, cx, cy][join](S);
                this._.sx = x;
                this._.sy = y;
            }
            return this;
        };
        elproto.clone = function() {
            if (this.removed) {
                return null;
            }
            var attr = this.attr();
            delete attr.scale;
            delete attr.translation;
            return this.paper[this.type]().attr(attr);
        };
        var curveslengths = {},
            getPointAtSegmentLength = function(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length) {
                var len = 0,
                    precision = 100,
                    name = [p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y].join(),
                    cache = curveslengths[name],
                    old, dot;
                !cache && (curveslengths[name] = cache = {
                    data: []
                });
                cache.timer && clearTimeout(cache.timer);
                cache.timer = setTimeout(function() {
                    delete curveslengths[name];
                }, 2000);
                if (length != null) {
                    var total = getPointAtSegmentLength(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y);
                    precision = ~~total * 10;
                }
                for (var i = 0; i < precision + 1; i++) {
                    if (cache.data[length] > i) {
                        dot = cache.data[i * precision];
                    } else {
                        dot = R.findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, i / precision);
                        cache.data[i] = dot;
                    }
                    i && (len += pow(pow(old.x - dot.x, 2) + pow(old.y - dot.y, 2), .5));
                    if (length != null && len >= length) {
                        return dot;
                    }
                    old = dot;
                }
                if (length == null) {
                    return len;
                }
            },
            getLengthFactory = function(istotal, subpath) {
                return function(path, length, onlystart) {
                    path = path2curve(path);
                    var x, y, p, l, sp = "",
                        subpaths = {},
                        point, len = 0;
                    for (var i = 0, ii = path.length; i < ii; i++) {
                        p = path[i];
                        if (p[0] == "M") {
                            x = +p[1];
                            y = +p[2];
                        } else {
                            l = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
                            if (len + l > length) {
                                if (subpath && !subpaths.start) {
                                    point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
                                    sp += ["C", point.start.x, point.start.y, point.m.x, point.m.y, point.x, point.y];
                                    if (onlystart) {
                                        return sp;
                                    }
                                    subpaths.start = sp;
                                    sp = ["M", point.x, point.y + "C", point.n.x, point.n.y, point.end.x, point.end.y, p[5], p[6]][join]();
                                    len += l;
                                    x = +p[5];
                                    y = +p[6];
                                    continue;
                                }
                                if (!istotal && !subpath) {
                                    point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
                                    return {
                                        x: point.x,
                                        y: point.y,
                                        alpha: point.alpha
                                    };
                                }
                            }
                            len += l;
                            x = +p[5];
                            y = +p[6];
                        }
                        sp += p;
                    }
                    subpaths.end = sp;
                    point = istotal ? len : subpath ? subpaths : R.findDotsAtSegment(x, y, p[1], p[2], p[3], p[4], p[5], p[6], 1);
                    point.alpha && (point = {
                        x: point.x,
                        y: point.y,
                        alpha: point.alpha
                    });
                    return point;
                };
            };
        var getTotalLength = getLengthFactory(1),
            getPointAtLength = getLengthFactory(),
            getSubpathsAtLength = getLengthFactory(0, 1);
        elproto.getTotalLength = function() {
            if (this.type != "path") {
                return;
            }
            if (this.node.getTotalLength) {
                return this.node.getTotalLength();
            }
            return getTotalLength(this.attrs.path);
        };
        elproto.getPointAtLength = function(length) {
            if (this.type != "path") {
                return;
            }
            return getPointAtLength(this.attrs.path, length);
        };
        elproto.getSubpath = function(from, to) {
            if (this.type != "path") {
                return;
            }
            if (abs(this.getTotalLength() - to) < "1e-6") {
                return getSubpathsAtLength(this.attrs.path, from).end;
            }
            var a = getSubpathsAtLength(this.attrs.path, to, 1);
            return from ? getSubpathsAtLength(a, from).end : a;
        };
        R.easing_formulas = {
            linear: function(n) {
                return n;
            },
            "<": function(n) {
                return pow(n, 3);
            },
            ">": function(n) {
                return pow(n - 1, 3) + 1;
            },
            "<>": function(n) {
                n = n * 2;
                if (n < 1) {
                    return pow(n, 3) / 2;
                }
                n -= 2;
                return (pow(n, 3) + 2) / 2;
            },
            backIn: function(n) {
                var s = 1.70158;
                return n * n * ((s + 1) * n - s);
            },
            backOut: function(n) {
                n = n - 1;
                var s = 1.70158;
                return n * n * ((s + 1) * n + s) + 1;
            },
            elastic: function(n) {
                if (n == 0 || n == 1) {
                    return n;
                }
                var p = .3,
                    s = p / 4;
                return pow(2, -10 * n) * math.sin((n - s) * (2 * PI) / p) + 1;
            },
            bounce: function(n) {
                var s = 7.5625,
                    p = 2.75,
                    l;
                if (n < (1 / p)) {
                    l = s * n * n;
                } else {
                    if (n < (2 / p)) {
                        n -= (1.5 / p);
                        l = s * n * n + .75;
                    } else {
                        if (n < (2.5 / p)) {
                            n -= (2.25 / p);
                            l = s * n * n + .9375;
                        } else {
                            n -= (2.625 / p);
                            l = s * n * n + .984375;
                        }
                    }
                }
                return l;
            }
        };
        var animationElements = [],
            animation = function() {
                var Now = +new Date;
                for (var l = 0; l < animationElements[length]; l++) {
                    var e = animationElements[l];
                    if (e.stop || e.el.removed) {
                        continue;
                    }
                    var time = Now - e.start,
                        ms = e.ms,
                        easing = e.easing,
                        from = e.from,
                        diff = e.diff,
                        to = e.to,
                        t = e.t,
                        that = e.el,
                        set = {},
                        now;
                    if (time < ms) {
                        var pos = easing(time / ms);
                        for (var attr in from)
                            if (from[has](attr)) {
                                switch (availableAnimAttrs[attr]) {
                                    case "along":
                                        now = pos * ms * diff[attr];
                                        to.back && (now = to.len - now);
                                        var point = getPointAtLength(to[attr], now);
                                        that.translate(diff.sx - diff.x || 0, diff.sy - diff.y || 0);
                                        diff.x = point.x;
                                        diff.y = point.y;
                                        that.translate(point.x - diff.sx, point.y - diff.sy);
                                        to.rot && that.rotate(diff.r + point.alpha, point.x, point.y);
                                        break;
                                    case nu:
                                        now = +from[attr] + pos * ms * diff[attr];
                                        break;
                                    case "colour":
                                        now = "rgb(" + [upto255(round(from[attr].r + pos * ms * diff[attr].r)), upto255(round(from[attr].g + pos * ms * diff[attr].g)), upto255(round(from[attr].b + pos * ms * diff[attr].b))][join](",") + ")";
                                        break;
                                    case "path":
                                        now = [];
                                        for (var i = 0, ii = from[attr][length]; i < ii; i++) {
                                            now[i] = [from[attr][i][0]];
                                            for (var j = 1, jj = from[attr][i][length]; j < jj; j++) {
                                                now[i][j] = +from[attr][i][j] + pos * ms * diff[attr][i][j];
                                            }
                                            now[i] = now[i][join](S);
                                        }
                                        now = now[join](S);
                                        break;
                                    case "csv":
                                        switch (attr) {
                                            case "translation":
                                                var x = pos * ms * diff[attr][0] - t.x,
                                                    y = pos * ms * diff[attr][1] - t.y;
                                                t.x += x;
                                                t.y += y;
                                                now = x + S + y;
                                                break;
                                            case "rotation":
                                                now = +from[attr][0] + pos * ms * diff[attr][0];
                                                from[attr][1] && (now += "," + from[attr][1] + "," + from[attr][2]);
                                                break;
                                            case "scale":
                                                now = [+from[attr][0] + pos * ms * diff[attr][0], +from[attr][1] + pos * ms * diff[attr][1], (2 in to[attr] ? to[attr][2] : E), (3 in to[attr] ? to[attr][3] : E)][join](S);
                                                break;
                                            case "clip-rect":
                                                now = [];
                                                i = 4;
                                                while (i--) {
                                                    now[i] = +from[attr][i] + pos * ms * diff[attr][i];
                                                }
                                                break;
                                        }
                                        break;
                                    default:
                                        var from2 = [].concat(from[attr]);
                                        now = [];
                                        i = that.paper.customAttributes[attr].length;
                                        while (i--) {
                                            now[i] = +from2[i] + pos * ms * diff[attr][i];
                                        }
                                        break;
                                }
                                set[attr] = now;
                            }
                        that.attr(set);
                        that._run && that._run.call(that);
                    } else {
                        if (to.along) {
                            point = getPointAtLength(to.along, to.len * !to.back);
                            that.translate(diff.sx - (diff.x || 0) + point.x - diff.sx, diff.sy - (diff.y || 0) + point.y - diff.sy);
                            to.rot && that.rotate(diff.r + point.alpha, point.x, point.y);
                        }
                        (t.x || t.y) && that.translate(-t.x, -t.y);
                        to.scale && (to.scale += E);
                        that.attr(to);
                        animationElements.splice(l--, 1);
                    }
                }
                R.svg && that && that.paper && that.paper.safari();
                animationElements[length] && setTimeout(animation);
            },
            keyframesRun = function(attr, element, time, prev, prevcallback) {
                var dif = time - prev;
                element.timeouts.push(setTimeout(function() {
                    R.is(prevcallback, "function") && prevcallback.call(element);
                    element.animate(attr, dif, attr.easing);
                }, prev));
            },
            upto255 = function(color) {
                return mmax(mmin(color, 255), 0);
            },
            translate = function(x, y) {
                if (x == null) {
                    return {
                        x: this._.tx,
                        y: this._.ty,
                        toString: x_y
                    };
                }
                this._.tx += +x;
                this._.ty += +y;
                switch (this.type) {
                    case "circle":
                    case "ellipse":
                        this.attr({
                            cx: +x + this.attrs.cx,
                            cy: +y + this.attrs.cy
                        });
                        break;
                    case "rect":
                    case "image":
                    case "text":
                        this.attr({
                            x: +x + this.attrs.x,
                            y: +y + this.attrs.y
                        });
                        break;
                    case "path":
                        var path = pathToRelative(this.attrs.path);
                        path[0][1] += +x;
                        path[0][2] += +y;
                        this.attr({
                            path: path
                        });
                        break;
                }
                return this;
            };
        elproto.animateWith = function(element, params, ms, easing, callback) {
            for (var i = 0, ii = animationElements.length; i < ii; i++) {
                if (animationElements[i].el.id == element.id) {
                    params.start = animationElements[i].start;
                }
            }
            return this.animate(params, ms, easing, callback);
        };
        elproto.animateAlong = along();
        elproto.animateAlongBack = along(1);

        function along(isBack) {
            return function(path, ms, rotate, callback) {
                var params = {
                    back: isBack
                };
                R.is(rotate, "function") ? (callback = rotate) : (params.rot = rotate);
                path && path.constructor == Element && (path = path.attrs.path);
                path && (params.along = path);
                return this.animate(params, ms, callback);
            };
        }

        function CubicBezierAtTime(t, p1x, p1y, p2x, p2y, duration) {
            var cx = 3 * p1x,
                bx = 3 * (p2x - p1x) - cx,
                ax = 1 - cx - bx,
                cy = 3 * p1y,
                by = 3 * (p2y - p1y) - cy,
                ay = 1 - cy - by;

            function sampleCurveX(t) {
                return ((ax * t + bx) * t + cx) * t;
            }

            function solve(x, epsilon) {
                var t = solveCurveX(x, epsilon);
                return ((ay * t + by) * t + cy) * t;
            }

            function solveCurveX(x, epsilon) {
                var t0, t1, t2, x2, d2, i;
                for (t2 = x, i = 0; i < 8; i++) {
                    x2 = sampleCurveX(t2) - x;
                    if (abs(x2) < epsilon) {
                        return t2;
                    }
                    d2 = (3 * ax * t2 + 2 * bx) * t2 + cx;
                    if (abs(d2) < 1e-6) {
                        break;
                    }
                    t2 = t2 - x2 / d2;
                }
                t0 = 0;
                t1 = 1;
                t2 = x;
                if (t2 < t0) {
                    return t0;
                }
                if (t2 > t1) {
                    return t1;
                }
                while (t0 < t1) {
                    x2 = sampleCurveX(t2);
                    if (abs(x2 - x) < epsilon) {
                        return t2;
                    }
                    if (x > x2) {
                        t0 = t2;
                    } else {
                        t1 = t2;
                    }
                    t2 = (t1 - t0) / 2 + t0;
                }
                return t2;
            }
            return solve(t, 1 / (200 * duration));
        }
        elproto.onAnimation = function(f) {
            this._run = f || 0;
            return this;
        };
        elproto.animate = function(params, ms, easing, callback) {
            var element = this;
            element.timeouts = element.timeouts || [];
            if (R.is(easing, "function") || !easing) {
                callback = easing || null;
            }
            if (element.removed) {
                callback && callback.call(element);
                return element;
            }
            var from = {},
                to = {},
                animateable = false,
                diff = {};
            for (var attr in params)
                if (params[has](attr)) {
                    if (availableAnimAttrs[has](attr) || element.paper.customAttributes[has](attr)) {
                        animateable = true;
                        from[attr] = element.attr(attr);
                        (from[attr] == null) && (from[attr] = availableAttrs[attr]);
                        to[attr] = params[attr];
                        switch (availableAnimAttrs[attr]) {
                            case "along":
                                var len = getTotalLength(params[attr]);
                                var point = getPointAtLength(params[attr], len * !!params.back);
                                var bb = element.getBBox();
                                diff[attr] = len / ms;
                                diff.tx = bb.x;
                                diff.ty = bb.y;
                                diff.sx = point.x;
                                diff.sy = point.y;
                                to.rot = params.rot;
                                to.back = params.back;
                                to.len = len;
                                params.rot && (diff.r = toFloat(element.rotate()) || 0);
                                break;
                            case nu:
                                diff[attr] = (to[attr] - from[attr]) / ms;
                                break;
                            case "colour":
                                from[attr] = R.getRGB(from[attr]);
                                var toColour = R.getRGB(to[attr]);
                                diff[attr] = {
                                    r: (toColour.r - from[attr].r) / ms,
                                    g: (toColour.g - from[attr].g) / ms,
                                    b: (toColour.b - from[attr].b) / ms
                                };
                                break;
                            case "path":
                                var pathes = path2curve(from[attr], to[attr]);
                                from[attr] = pathes[0];
                                var toPath = pathes[1];
                                diff[attr] = [];
                                for (var i = 0, ii = from[attr][length]; i < ii; i++) {
                                    diff[attr][i] = [0];
                                    for (var j = 1, jj = from[attr][i][length]; j < jj; j++) {
                                        diff[attr][i][j] = (toPath[i][j] - from[attr][i][j]) / ms;
                                    }
                                }
                                break;
                            case "csv":
                                var values = Str(params[attr])[split](separator),
                                    from2 = Str(from[attr])[split](separator);
                                switch (attr) {
                                    case "translation":
                                        from[attr] = [0, 0];
                                        diff[attr] = [values[0] / ms, values[1] / ms];
                                        break;
                                    case "rotation":
                                        from[attr] = (from2[1] == values[1] && from2[2] == values[2]) ? from2 : [0, values[1], values[2]];
                                        diff[attr] = [(values[0] - from[attr][0]) / ms, 0, 0];
                                        break;
                                    case "scale":
                                        params[attr] = values;
                                        from[attr] = Str(from[attr])[split](separator);
                                        diff[attr] = [(values[0] - from[attr][0]) / ms, (values[1] - from[attr][1]) / ms, 0, 0];
                                        break;
                                    case "clip-rect":
                                        from[attr] = Str(from[attr])[split](separator);
                                        diff[attr] = [];
                                        i = 4;
                                        while (i--) {
                                            diff[attr][i] = (values[i] - from[attr][i]) / ms;
                                        }
                                        break;
                                }
                                to[attr] = values;
                                break;
                            default:
                                values = [].concat(params[attr]);
                                from2 = [].concat(from[attr]);
                                diff[attr] = [];
                                i = element.paper.customAttributes[attr][length];
                                while (i--) {
                                    diff[attr][i] = ((values[i] || 0) - (from2[i] || 0)) / ms;
                                }
                                break;
                        }
                    }
                }
            if (!animateable) {
                var attrs = [],
                    lastcall;
                for (var key in params)
                    if (params[has](key) && animKeyFrames.test(key)) {
                        attr = {
                            value: params[key]
                        };
                        key == "from" && (key = 0);
                        key == "to" && (key = 100);
                        attr.key = toInt(key, 10);
                        attrs.push(attr);
                    }
                attrs.sort(sortByKey);
                if (attrs[0].key) {
                    attrs.unshift({
                        key: 0,
                        value: element.attrs
                    });
                }
                for (i = 0, ii = attrs[length]; i < ii; i++) {
                    keyframesRun(attrs[i].value, element, ms / 100 * attrs[i].key, ms / 100 * (attrs[i - 1] && attrs[i - 1].key || 0), attrs[i - 1] && attrs[i - 1].value.callback);
                }
                lastcall = attrs[attrs[length] - 1].value.callback;
                if (lastcall) {
                    element.timeouts.push(setTimeout(function() {
                        lastcall.call(element);
                    }, ms));
                }
            } else {
                var easyeasy = R.easing_formulas[easing];
                if (!easyeasy) {
                    easyeasy = Str(easing).match(bezierrg);
                    if (easyeasy && easyeasy[length] == 5) {
                        var curve = easyeasy;
                        easyeasy = function(t) {
                            return CubicBezierAtTime(t, +curve[1], +curve[2], +curve[3], +curve[4], ms);
                        };
                    } else {
                        easyeasy = function(t) {
                            return t;
                        };
                    }
                }
                animationElements.push({
                    start: params.start || +new Date,
                    ms: ms,
                    easing: easyeasy,
                    from: from,
                    diff: diff,
                    to: to,
                    el: element,
                    t: {
                        x: 0,
                        y: 0
                    }
                });
                R.is(callback, "function") && (element._ac = setTimeout(function() {
                    callback.call(element);
                }, ms));
                animationElements[length] == 1 && setTimeout(animation);
            }
            return this;
        };
        elproto.stop = function() {
            for (var i = 0; i < animationElements.length; i++) {
                animationElements[i].el.id == this.id && animationElements.splice(i--, 1);
            }
            for (i = 0, ii = this.timeouts && this.timeouts.length; i < ii; i++) {
                clearTimeout(this.timeouts[i]);
            }
            this.timeouts = [];
            clearTimeout(this._ac);
            delete this._ac;
            return this;
        };
        elproto.translate = function(x, y) {
            return this.attr({
                translation: x + " " + y
            });
        };
        elproto[toString] = function() {
            return "Rapha\xebl\u2019s object";
        };
        R.ae = animationElements;
        var Set = function(items) {
            this.items = [];
            this[length] = 0;
            this.type = "set";
            if (items) {
                for (var i = 0, ii = items[length]; i < ii; i++) {
                    if (items[i] && (items[i].constructor == Element || items[i].constructor == Set)) {
                        this[this.items[length]] = this.items[this.items[length]] = items[i];
                        this[length] ++;
                    }
                }
            }
        };
        Set[proto][push] = function() {
            var item, len;
            for (var i = 0, ii = arguments[length]; i < ii; i++) {
                item = arguments[i];
                if (item && (item.constructor == Element || item.constructor == Set)) {
                    len = this.items[length];
                    this[len] = this.items[len] = item;
                    this[length] ++;
                }
            }
            return this;
        };
        Set[proto].pop = function() {
            delete this[this[length] --];
            return this.items.pop();
        };
        for (var method in elproto)
            if (elproto[has](method)) {
                Set[proto][method] = (function(methodname) {
                    return function() {
                        for (var i = 0, ii = this.items[length]; i < ii; i++) {
                            this.items[i][methodname][apply](this.items[i], arguments);
                        }
                        return this;
                    };
                })(method);
            }
        Set[proto].attr = function(name, value) {
            if (name && R.is(name, array) && R.is(name[0], "object")) {
                for (var j = 0, jj = name[length]; j < jj; j++) {
                    this.items[j].attr(name[j]);
                }
            } else {
                for (var i = 0, ii = this.items[length]; i < ii; i++) {
                    this.items[i].attr(name, value);
                }
            }
            return this;
        };
        Set[proto].animate = function(params, ms, easing, callback) {
            (R.is(easing, "function") || !easing) && (callback = easing || null);
            var len = this.items[length],
                i = len,
                item, set = this,
                collector;
            callback && (collector = function() {
                !--len && callback.call(set);
            });
            easing = R.is(easing, string) ? easing : collector;
            item = this.items[--i].animate(params, ms, easing, collector);
            while (i--) {
                this.items[i] && !this.items[i].removed && this.items[i].animateWith(item, params, ms, easing, collector);
            }
            return this;
        };
        Set[proto].insertAfter = function(el) {
            var i = this.items[length];
            while (i--) {
                this.items[i].insertAfter(el);
            }
            return this;
        };
        Set[proto].getBBox = function() {
            var x = [],
                y = [],
                w = [],
                h = [];
            for (var i = this.items[length]; i--;) {
                var box = this.items[i].getBBox();
                x[push](box.x);
                y[push](box.y);
                w[push](box.x + box.width);
                h[push](box.y + box.height);
            }
            x = mmin[apply](0, x);
            y = mmin[apply](0, y);
            return {
                x: x,
                y: y,
                width: mmax[apply](0, w) - x,
                height: mmax[apply](0, h) - y
            };
        };
        Set[proto].clone = function(s) {
            s = new Set;
            for (var i = 0, ii = this.items[length]; i < ii; i++) {
                s[push](this.items[i].clone());
            }
            return s;
        };
        R.registerFont = function(font) {
            if (!font.face) {
                return font;
            }
            this.fonts = this.fonts || {};
            var fontcopy = {
                    w: font.w,
                    face: {},
                    glyphs: {}
                },
                family = font.face["font-family"];
            for (var prop in font.face)
                if (font.face[has](prop)) {
                    fontcopy.face[prop] = font.face[prop];
                }
            if (this.fonts[family]) {
                this.fonts[family][push](fontcopy);
            } else {
                this.fonts[family] = [fontcopy];
            }
            if (!font.svg) {
                fontcopy.face["units-per-em"] = toInt(font.face["units-per-em"], 10);
                for (var glyph in font.glyphs)
                    if (font.glyphs[has](glyph)) {
                        var path = font.glyphs[glyph];
                        fontcopy.glyphs[glyph] = {
                            w: path.w,
                            k: {},
                            d: path.d && "M" + path.d[rp](/[mlcxtrv]/g, function(command) {
                                return {
                                    l: "L",
                                    c: "C",
                                    x: "z",
                                    t: "m",
                                    r: "l",
                                    v: "c"
                                }[command] || "M";
                            }) + "z"
                        };
                        if (path.k) {
                            for (var k in path.k)
                                if (path[has](k)) {
                                    fontcopy.glyphs[glyph].k[k] = path.k[k];
                                }
                        }
                    }
            }
            return font;
        };
        paperproto.getFont = function(family, weight, style, stretch) {
            stretch = stretch || "normal";
            style = style || "normal";
            weight = +weight || {
                normal: 400,
                bold: 700,
                lighter: 300,
                bolder: 800
            }[weight] || 400;
            if (!R.fonts) {
                return;
            }
            var font = R.fonts[family];
            if (!font) {
                var name = new RegExp("(^|\\s)" + family[rp](/[^\w\d\s+!~.:_-]/g, E) + "(\\s|$)", "i");
                for (var fontName in R.fonts)
                    if (R.fonts[has](fontName)) {
                        if (name.test(fontName)) {
                            font = R.fonts[fontName];
                            break;
                        }
                    }
            }
            var thefont;
            if (font) {
                for (var i = 0, ii = font[length]; i < ii; i++) {
                    thefont = font[i];
                    if (thefont.face["font-weight"] == weight && (thefont.face["font-style"] == style || !thefont.face["font-style"]) && thefont.face["font-stretch"] == stretch) {
                        break;
                    }
                }
            }
            return thefont;
        };
        paperproto.print = function(x, y, string, font, size, origin, letter_spacing) {
            origin = origin || "middle";
            letter_spacing = mmax(mmin(letter_spacing || 0, 1), -1);
            var out = this.set(),
                letters = Str(string)[split](E),
                shift = 0,
                path = E,
                scale;
            R.is(font, string) && (font = this.getFont(font));
            if (font) {
                scale = (size || 16) / font.face["units-per-em"];
                var bb = font.face.bbox.split(separator),
                    top = +bb[0],
                    height = +bb[1] + (origin == "baseline" ? bb[3] - bb[1] + (+font.face.descent) : (bb[3] - bb[1]) / 2);
                for (var i = 0, ii = letters[length]; i < ii; i++) {
                    var prev = i && font.glyphs[letters[i - 1]] || {},
                        curr = font.glyphs[letters[i]];
                    shift += i ? (prev.w || font.w) + (prev.k && prev.k[letters[i]] || 0) + (font.w * letter_spacing) : 0;
                    curr && curr.d && out[push](this.path(curr.d).attr({
                        fill: "#000",
                        stroke: "none",
                        translation: [shift, 0]
                    }));
                }
                out.scale(scale, scale, top, height).translate(x - top, y - height);
            }
            return out;
        };
        R.format = function(token, params) {
            var args = R.is(params, array) ? [0][concat](params) : arguments;
            token && R.is(token, string) && args[length] - 1 && (token = token[rp](formatrg, function(str, i) {
                return args[++i] == null ? E : args[i];
            }));
            return token || E;
        };
        R.ninja = function() {
            oldRaphael.was ? (win.Raphael = oldRaphael.is) : delete Raphael;
            return R;
        };
        R.el = elproto;
        R.st = Set[proto];
        oldRaphael.was ? (win.Raphael = R) : (Raphael = R);
    })();
    (function(window, document, location, setTimeout, decodeURIComponent, encodeURIComponent) {
        var global = this;
        var channelId = Math.floor(Math.random() * 10000);
        var emptyFn = Function.prototype;
        var reURI = /^((http.?:)\/\/([^:\/\s]+)(:\d+)*)/;
        var reParent = /[\-\w]+\/\.\.\//;
        var reDoubleSlash = /([^:])\/\//g;
        var namespace = "";
        var easyXDM = {};
        var _easyXDM = window.easyXDM;
        var IFRAME_PREFIX = "easyXDM_";
        var HAS_NAME_PROPERTY_BUG;
        var useHash = false;
        var flashVersion;
        var HAS_FLASH_THROTTLED_BUG;

        function isHostMethod(object, property) {
            var t = typeof object[property];
            return t == 'function' || (!!(t == 'object' && object[property])) || t == 'unknown';
        }

        function isHostObject(object, property) {
            return !!(typeof(object[property]) == 'object' && object[property]);
        }

        function isArray(o) {
            return Object.prototype.toString.call(o) === '[object Array]';
        }

        function hasFlash() {
            try {
                var activeX = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                flashVersion = Array.prototype.slice.call(activeX.GetVariable("$version").match(/(\d+),(\d+),(\d+),(\d+)/), 1);
                HAS_FLASH_THROTTLED_BUG = parseInt(flashVersion[0], 10) > 9 && parseInt(flashVersion[1], 10) > 0;
                activeX = null;
                return true;
            } catch (notSupportedException) {
                return false;
            }
        }
        var on, un;
        if (isHostMethod(window, "addEventListener")) {
            on = function(target, type, listener) {
                target.addEventListener(type, listener, false);
            };
            un = function(target, type, listener) {
                target.removeEventListener(type, listener, false);
            };
        } else if (isHostMethod(window, "attachEvent")) {
            on = function(object, sEvent, fpNotify) {
                object.attachEvent("on" + sEvent, fpNotify);
            };
            un = function(object, sEvent, fpNotify) {
                object.detachEvent("on" + sEvent, fpNotify);
            };
        } else {
            throw new Error("Browser not supported");
        }
        var domIsReady = false,
            domReadyQueue = [],
            readyState;
        if ("readyState" in document) {
            readyState = document.readyState;
            domIsReady = readyState == "complete" || (~navigator.userAgent.indexOf('AppleWebKit/') && (readyState == "loaded" || readyState == "interactive"));
        } else {
            domIsReady = !!document.body;
        }

        function dom_onReady() {
            if (domIsReady) {
                return;
            }
            domIsReady = true;
            for (var i = 0; i < domReadyQueue.length; i++) {
                domReadyQueue[i]();
            }
            domReadyQueue.length = 0;
        }
        if (!domIsReady) {
            if (isHostMethod(window, "addEventListener")) {
                on(document, "DOMContentLoaded", dom_onReady);
            } else {
                on(document, "readystatechange", function() {
                    if (document.readyState == "complete") {
                        dom_onReady();
                    }
                });
                if (document.documentElement.doScroll && window === top) {
                    var doScrollCheck = function() {
                        if (domIsReady) {
                            return;
                        }
                        try {
                            document.documentElement.doScroll("left");
                        } catch (e) {
                            setTimeout(doScrollCheck, 1);
                            return;
                        }
                        dom_onReady();
                    };
                    doScrollCheck();
                }
            }
            on(window, "load", dom_onReady);
        }

        function whenReady(fn, scope) {
            if (domIsReady) {
                fn.call(scope);
                return;
            }
            domReadyQueue.push(function() {
                fn.call(scope);
            });
        }

        function getParentObject() {
            var obj = parent;
            if (namespace !== "") {
                for (var i = 0, ii = namespace.split("."); i < ii.length; i++) {
                    obj = obj[ii[i]];
                }
            }
            return obj.easyXDM;
        }

        function noConflict(ns) {
            window.easyXDM = _easyXDM;
            namespace = ns;
            if (namespace) {
                IFRAME_PREFIX = "easyXDM_" + namespace.replace(".", "_") + "_";
            }
            return easyXDM;
        }

        function getDomainName(url) {
            return url.match(reURI)[3];
        }

        function getPort(url) {
            return url.match(reURI)[4] || "";
        }

        function getLocation(url) {
            var m = url.toLowerCase().match(reURI);
            var proto = m[2],
                domain = m[3],
                port = m[4] || "";
            if ((proto == "http:" && port == ":80") || (proto == "https:" && port == ":443")) {
                port = "";
            }
            return proto + "//" + domain + port;
        }

        function resolveUrl(url) {
            url = url.replace(reDoubleSlash, "$1/");
            if (!url.match(/^(http||https):\/\//)) {
                var path = (url.substring(0, 1) === "/") ? "" : location.pathname;
                if (path.substring(path.length - 1) !== "/") {
                    path = path.substring(0, path.lastIndexOf("/") + 1);
                }
                url = location.protocol + "//" + location.host + path + url;
            }
            while (reParent.test(url)) {
                url = url.replace(reParent, "");
            }
            return url;
        }

        function appendQueryParameters(url, parameters) {
            var hash = "",
                indexOf = url.indexOf("#");
            if (indexOf !== -1) {
                hash = url.substring(indexOf);
                url = url.substring(0, indexOf);
            }
            var q = [];
            for (var key in parameters) {
                if (parameters.hasOwnProperty(key)) {
                    q.push(key + "=" + encodeURIComponent(parameters[key]));
                }
            }
            return url + (useHash ? "#" : (url.indexOf("?") == -1 ? "?" : "&")) + q.join("&") + hash;
        }
        var query = (function(input) {
            input = input.substring(1).split("&");
            var data = {},
                pair, i = input.length;
            while (i--) {
                pair = input[i].split("=");
                data[pair[0]] = decodeURIComponent(pair[1]);
            }
            return data;
        }(/xdm_e=/.test(location.search) ? location.search : location.hash));

        function undef(v) {
            return typeof v === "undefined";
        }
        var getJSON = function() {
            var cached = {};
            var obj = {
                    a: [1, 2, 3]
                },
                json = "{\"a\":[1,2,3]}";
            if (typeof JSON != "undefined" && typeof JSON.stringify === "function" && JSON.stringify(obj).replace((/\s/g), "") === json) {
                return JSON;
            }
            if (Object.toJSON) {
                if (Object.toJSON(obj).replace((/\s/g), "") === json) {
                    cached.stringify = Object.toJSON;
                }
            }
            if (typeof String.prototype.evalJSON === "function") {
                obj = json.evalJSON();
                if (obj.a && obj.a.length === 3 && obj.a[2] === 3) {
                    cached.parse = function(str) {
                        return str.evalJSON();
                    };
                }
            }
            if (cached.stringify && cached.parse) {
                getJSON = function() {
                    return cached;
                };
                return cached;
            }
            return null;
        };

        function apply(destination, source, noOverwrite) {
            var member;
            for (var prop in source) {
                if (source.hasOwnProperty(prop)) {
                    if (prop in destination) {
                        member = source[prop];
                        if (typeof member === "object") {
                            apply(destination[prop], member, noOverwrite);
                        } else if (!noOverwrite) {
                            destination[prop] = source[prop];
                        }
                    } else {
                        destination[prop] = source[prop];
                    }
                }
            }
            return destination;
        }

        function testForNamePropertyBug() {
            var form = document.body.appendChild(document.createElement("form")),
                input = form.appendChild(document.createElement("input"));
            input.name = IFRAME_PREFIX + "TEST" + channelId;
            HAS_NAME_PROPERTY_BUG = input !== form.elements[input.name];
            document.body.removeChild(form);
        }

        function createFrame(config) {
            if (undef(HAS_NAME_PROPERTY_BUG)) {
                testForNamePropertyBug();
            }
            var frame;
            if (HAS_NAME_PROPERTY_BUG) {
                frame = document.createElement("<iframe name=\"" + config.props.name + "\"/>");
            } else {
                frame = document.createElement("IFRAME");
                frame.name = config.props.name;
            }
            frame.id = frame.name = config.props.name;
            delete config.props.name;
            if (config.onLoad) {
                on(frame, "load", config.onLoad);
            }
            if (typeof config.container == "string") {
                config.container = document.getElementById(config.container);
            }
            if (!config.container) {
                apply(frame.style, {
                    position: "absolute",
                    top: "-2000px"
                });
                config.container = document.body;
            }
            var src = config.props.src;
            delete config.props.src;
            apply(frame, config.props);
            frame.border = frame.frameBorder = 0;
            frame.allowTransparency = true;
            config.container.appendChild(frame);
            frame.src = src;
            config.props.src = src;
            return frame;
        }

        function checkAcl(acl, domain) {
            if (typeof acl == "string") {
                acl = [acl];
            }
            var re, i = acl.length;
            while (i--) {
                re = acl[i];
                re = new RegExp(re.substr(0, 1) == "^" ? re : ("^" + re.replace(/(\*)/g, ".$1").replace(/\?/g, ".") + "$"));
                if (re.test(domain)) {
                    return true;
                }
            }
            return false;
        }

        function prepareTransportStack(config) {
            var protocol = config.protocol,
                stackEls;
            config.isHost = config.isHost || undef(query.xdm_p);
            useHash = config.hash || false;
            if (!config.props) {
                config.props = {};
            }
            if (!config.isHost) {
                config.channel = query.xdm_c;
                config.secret = query.xdm_s;
                config.remote = query.xdm_e;
                protocol = query.xdm_p;
                if (config.acl && !checkAcl(config.acl, config.remote)) {
                    throw new Error("Access denied for " + config.remote);
                }
            } else {
                config.remote = resolveUrl(config.remote);
                config.channel = config.channel || "default" + channelId++;
                config.secret = Math.random().toString(16).substring(2);
                if (undef(protocol)) {
                    if (getLocation(location.href) == getLocation(config.remote)) {
                        protocol = "4";
                    } else if (isHostMethod(window, "postMessage") || isHostMethod(document, "postMessage")) {
                        protocol = "1";
                    } else if (config.swf && isHostMethod(window, "ActiveXObject") && hasFlash()) {
                        protocol = "6";
                    } else if (navigator.product === "Gecko" && "frameElement" in window && navigator.userAgent.indexOf('WebKit') == -1) {
                        protocol = "5";
                    } else if (config.remoteHelper) {
                        config.remoteHelper = resolveUrl(config.remoteHelper);
                        protocol = "2";
                    } else {
                        protocol = "0";
                    }
                }
            }
            config.protocol = protocol;
            switch (protocol) {
                case "0":
                    apply(config, {
                        interval: 100,
                        delay: 2000,
                        useResize: true,
                        useParent: false,
                        usePolling: false
                    }, true);
                    if (config.isHost) {
                        if (!config.local) {
                            var domain = location.protocol + "//" + location.host,
                                images = document.body.getElementsByTagName("img"),
                                image;
                            var i = images.length;
                            while (i--) {
                                image = images[i];
                                if (image.src.substring(0, domain.length) === domain) {
                                    config.local = image.src;
                                    break;
                                }
                            }
                            if (!config.local) {
                                config.local = window;
                            }
                        }
                        var parameters = {
                            xdm_c: config.channel,
                            xdm_p: 0
                        };
                        if (config.local === window) {
                            config.usePolling = true;
                            config.useParent = true;
                            config.local = location.protocol + "//" + location.host + location.pathname + location.search;
                            parameters.xdm_e = config.local;
                            parameters.xdm_pa = 1;
                        } else {
                            parameters.xdm_e = resolveUrl(config.local);
                        }
                        if (config.container) {
                            config.useResize = false;
                            parameters.xdm_po = 1;
                        }
                        config.remote = appendQueryParameters(config.remote, parameters);
                    } else {
                        apply(config, {
                            channel: query.xdm_c,
                            remote: query.xdm_e,
                            useParent: !undef(query.xdm_pa),
                            usePolling: !undef(query.xdm_po),
                            useResize: config.useParent ? false : config.useResize
                        });
                    }
                    stackEls = [new easyXDM.stack.HashTransport(config), new easyXDM.stack.ReliableBehavior({}), new easyXDM.stack.QueueBehavior({
                        encode: true,
                        maxLength: 4000 - config.remote.length
                    }), new easyXDM.stack.VerifyBehavior({
                        initiate: config.isHost
                    })];
                    break;
                case "1":
                    stackEls = [new easyXDM.stack.PostMessageTransport(config)];
                    break;
                case "2":
                    stackEls = [new easyXDM.stack.NameTransport(config), new easyXDM.stack.QueueBehavior(), new easyXDM.stack.VerifyBehavior({
                        initiate: config.isHost
                    })];
                    break;
                case "3":
                    stackEls = [new easyXDM.stack.NixTransport(config)];
                    break;
                case "4":
                    stackEls = [new easyXDM.stack.SameOriginTransport(config)];
                    break;
                case "5":
                    stackEls = [new easyXDM.stack.FrameElementTransport(config)];
                    break;
                case "6":
                    if (!flashVersion) {
                        hasFlash();
                    }
                    stackEls = [new easyXDM.stack.FlashTransport(config)];
                    break;
            }
            stackEls.push(new easyXDM.stack.QueueBehavior({
                lazy: config.lazy,
                remove: true
            }));
            return stackEls;
        }

        function chainStack(stackElements) {
            var stackEl, defaults = {
                incoming: function(message, origin) {
                    this.up.incoming(message, origin);
                },
                outgoing: function(message, recipient) {
                    this.down.outgoing(message, recipient);
                },
                callback: function(success) {
                    this.up.callback(success);
                },
                init: function() {
                    this.down.init();
                },
                destroy: function() {
                    this.down.destroy();
                }
            };
            for (var i = 0, len = stackElements.length; i < len; i++) {
                stackEl = stackElements[i];
                apply(stackEl, defaults, true);
                if (i !== 0) {
                    stackEl.down = stackElements[i - 1];
                }
                if (i !== len - 1) {
                    stackEl.up = stackElements[i + 1];
                }
            }
            return stackEl;
        }

        function removeFromStack(element) {
            element.up.down = element.down;
            element.down.up = element.up;
            element.up = element.down = null;
        }
        apply(easyXDM, {
            version: "2.4.15.118",
            query: query,
            stack: {},
            apply: apply,
            getJSONObject: getJSON,
            whenReady: whenReady,
            noConflict: noConflict
        });
        easyXDM.DomHelper = {
            on: on,
            un: un,
            requiresJSON: function(path) {
                if (!isHostObject(window, "JSON")) {
                    document.write('<' + 'script type="text/javascript" src="' + path + '"><' + '/script>');
                }
            }
        };
        (function() {
            var _map = {};
            easyXDM.Fn = {
                set: function(name, fn) {
                    _map[name] = fn;
                },
                get: function(name, del) {
                    var fn = _map[name];
                    if (del) {
                        delete _map[name];
                    }
                    return fn;
                }
            };
        }());
        easyXDM.Socket = function(config) {
            var stack = chainStack(prepareTransportStack(config).concat([{
                    incoming: function(message, origin) {
                        config.onMessage(message, origin);
                    },
                    callback: function(success) {
                        if (config.onReady) {
                            config.onReady(success);
                        }
                    }
                }])),
                recipient = getLocation(config.remote);
            this.origin = getLocation(config.remote);
            this.destroy = function() {
                stack.destroy();
            };
            this.postMessage = function(message) {
                stack.outgoing(message, recipient);
            };
            stack.init();
        };
        easyXDM.Rpc = function(config, jsonRpcConfig) {
            if (jsonRpcConfig.local) {
                for (var method in jsonRpcConfig.local) {
                    if (jsonRpcConfig.local.hasOwnProperty(method)) {
                        var member = jsonRpcConfig.local[method];
                        if (typeof member === "function") {
                            jsonRpcConfig.local[method] = {
                                method: member
                            };
                        }
                    }
                }
            }
            var stack = chainStack(prepareTransportStack(config).concat([new easyXDM.stack.RpcBehavior(this, jsonRpcConfig), {
                callback: function(success) {
                    if (config.onReady) {
                        config.onReady(success);
                    }
                }
            }]));
            this.origin = getLocation(config.remote);
            this.destroy = function() {
                stack.destroy();
            };
            stack.init();
        };
        easyXDM.stack.SameOriginTransport = function(config) {
            var pub, frame, send, targetOrigin;
            return (pub = {
                outgoing: function(message, domain, fn) {
                    send(message);
                    if (fn) {
                        fn();
                    }
                },
                destroy: function() {
                    if (frame) {
                        frame.parentNode.removeChild(frame);
                        frame = null;
                    }
                },
                onDOMReady: function() {
                    targetOrigin = getLocation(config.remote);
                    if (config.isHost) {
                        apply(config.props, {
                            src: appendQueryParameters(config.remote, {
                                xdm_e: location.protocol + "//" + location.host + location.pathname,
                                xdm_c: config.channel,
                                xdm_p: 4
                            }),
                            name: IFRAME_PREFIX + config.channel + "_provider"
                        });
                        frame = createFrame(config);
                        easyXDM.Fn.set(config.channel, function(sendFn) {
                            send = sendFn;
                            setTimeout(function() {
                                pub.up.callback(true);
                            }, 0);
                            return function(msg) {
                                pub.up.incoming(msg, targetOrigin);
                            };
                        });
                    } else {
                        send = getParentObject().Fn.get(config.channel, true)(function(msg) {
                            pub.up.incoming(msg, targetOrigin);
                        });
                        setTimeout(function() {
                            pub.up.callback(true);
                        }, 0);
                    }
                },
                init: function() {
                    whenReady(pub.onDOMReady, pub);
                }
            });
        };
        easyXDM.stack.FlashTransport = function(config) {
            var pub, frame, send, targetOrigin, swf, swfContainer;

            function onMessage(message, origin) {
                setTimeout(function() {
                    pub.up.incoming(message, targetOrigin);
                }, 0);
            }

            function addSwf(domain) {
                var url = config.swf + "?host=" + config.isHost;
                var id = "easyXDM_swf_" + Math.floor(Math.random() * 10000);
                easyXDM.Fn.set("flash_loaded" + domain.replace(/[\-.]/g, "_"), function() {
                    easyXDM.stack.FlashTransport[domain].swf = swf = swfContainer.firstChild;
                    var queue = easyXDM.stack.FlashTransport[domain].queue;
                    for (var i = 0; i < queue.length; i++) {
                        queue[i]();
                    }
                    queue.length = 0;
                });
                if (config.swfContainer) {
                    swfContainer = (typeof config.swfContainer == "string") ? document.getElementById(config.swfContainer) : config.swfContainer;
                } else {
                    swfContainer = document.createElement('div');
                    apply(swfContainer.style, HAS_FLASH_THROTTLED_BUG && config.swfNoThrottle ? {
                        height: "20px",
                        width: "20px",
                        position: "fixed",
                        right: 0,
                        top: 0
                    } : {
                        height: "1px",
                        width: "1px",
                        position: "absolute",
                        overflow: "hidden",
                        right: 0,
                        top: 0
                    });
                    document.body.appendChild(swfContainer);
                }
                var flashVars = "callback=flash_loaded" + domain.replace(/[\-.]/g, "_") + "&proto=" + global.location.protocol + "&domain=" + getDomainName(global.location.href) + "&port=" + getPort(global.location.href) + "&ns=" + namespace;
                swfContainer.innerHTML = "<object height='20' width='20' type='application/x-shockwave-flash' id='" + id + "' data='" + url + "'>" + "<param name='allowScriptAccess' value='always'></param>" + "<param name='wmode' value='transparent'>" + "<param name='movie' value='" +
                    url + "'></param>" + "<param name='flashvars' value='" +
                    flashVars + "'></param>" + "<embed type='application/x-shockwave-flash' FlashVars='" +
                    flashVars + "' allowScriptAccess='always' wmode='transparent' src='" +
                    url + "' height='1' width='1'></embed>" + "</object>";
            }
            return (pub = {
                outgoing: function(message, domain, fn) {
                    swf.postMessage(config.channel, message.toString());
                    if (fn) {
                        fn();
                    }
                },
                destroy: function() {
                    try {
                        swf.destroyChannel(config.channel);
                    } catch (e) {}
                    swf = null;
                    if (frame) {
                        frame.parentNode.removeChild(frame);
                        frame = null;
                    }
                },
                onDOMReady: function() {
                    targetOrigin = config.remote;
                    easyXDM.Fn.set("flash_" + config.channel + "_init", function() {
                        setTimeout(function() {
                            pub.up.callback(true);
                        });
                    });
                    easyXDM.Fn.set("flash_" + config.channel + "_onMessage", onMessage);
                    config.swf = resolveUrl(config.swf);
                    var swfdomain = getDomainName(config.swf);
                    var fn = function() {
                        easyXDM.stack.FlashTransport[swfdomain].init = true;
                        swf = easyXDM.stack.FlashTransport[swfdomain].swf;
                        swf.createChannel(config.channel, config.secret, getLocation(config.remote), config.isHost);
                        if (config.isHost) {
                            if (HAS_FLASH_THROTTLED_BUG && config.swfNoThrottle) {
                                apply(config.props, {
                                    position: "fixed",
                                    right: 0,
                                    top: 0,
                                    height: "20px",
                                    width: "20px"
                                });
                            }
                            apply(config.props, {
                                src: appendQueryParameters(config.remote, {
                                    xdm_e: getLocation(location.href),
                                    xdm_c: config.channel,
                                    xdm_p: 6,
                                    xdm_s: config.secret
                                }),
                                name: IFRAME_PREFIX + config.channel + "_provider"
                            });
                            frame = createFrame(config);
                        }
                    };
                    if (easyXDM.stack.FlashTransport[swfdomain] && easyXDM.stack.FlashTransport[swfdomain].init) {
                        fn();
                    } else {
                        if (!easyXDM.stack.FlashTransport[swfdomain]) {
                            easyXDM.stack.FlashTransport[swfdomain] = {
                                queue: [fn]
                            };
                            addSwf(swfdomain);
                        } else {
                            easyXDM.stack.FlashTransport[swfdomain].queue.push(fn);
                        }
                    }
                },
                init: function() {
                    whenReady(pub.onDOMReady, pub);
                }
            });
        };
        easyXDM.stack.PostMessageTransport = function(config) {
            var pub, frame, callerWindow, targetOrigin;

            function _getOrigin(event) {
                if (event.origin) {
                    return getLocation(event.origin);
                }
                if (event.uri) {
                    return getLocation(event.uri);
                }
                if (event.domain) {
                    return location.protocol + "//" + event.domain;
                }
                throw "Unable to retrieve the origin of the event";
            }

            function _window_onMessage(event) {
                var origin = _getOrigin(event);
                if (origin == targetOrigin && event.data.substring(0, config.channel.length + 1) == config.channel + " ") {
                    pub.up.incoming(event.data.substring(config.channel.length + 1), origin);
                }
            }
            return (pub = {
                outgoing: function(message, domain, fn) {
                    callerWindow.postMessage(config.channel + " " + message, domain || targetOrigin);
                    if (fn) {
                        fn();
                    }
                },
                destroy: function() {
                    un(window, "message", _window_onMessage);
                    if (frame) {
                        callerWindow = null;
                        frame.parentNode.removeChild(frame);
                        frame = null;
                    }
                },
                onDOMReady: function() {
                    targetOrigin = getLocation(config.remote);
                    if (config.isHost) {
                        var waitForReady = function(event) {
                            if (event.data == config.channel + "-ready") {
                                callerWindow = ("postMessage" in frame.contentWindow) ? frame.contentWindow : frame.contentWindow.document;
                                un(window, "message", waitForReady);
                                on(window, "message", _window_onMessage);
                                setTimeout(function() {
                                    pub.up.callback(true);
                                }, 0);
                            }
                        };
                        on(window, "message", waitForReady);
                        apply(config.props, {
                            src: appendQueryParameters(config.remote, {
                                xdm_e: getLocation(location.href),
                                xdm_c: config.channel,
                                xdm_p: 1
                            }),
                            name: IFRAME_PREFIX + config.channel + "_provider"
                        });
                        frame = createFrame(config);
                    } else {
                        on(window, "message", _window_onMessage);
                        callerWindow = ("postMessage" in window.parent) ? window.parent : window.parent.document;
                        callerWindow.postMessage(config.channel + "-ready", targetOrigin);
                        setTimeout(function() {
                            pub.up.callback(true);
                        }, 0);
                    }
                },
                init: function() {
                    whenReady(pub.onDOMReady, pub);
                }
            });
        };
        easyXDM.stack.FrameElementTransport = function(config) {
            var pub, frame, send, targetOrigin;
            return (pub = {
                outgoing: function(message, domain, fn) {
                    send.call(this, message);
                    if (fn) {
                        fn();
                    }
                },
                destroy: function() {
                    if (frame) {
                        frame.parentNode.removeChild(frame);
                        frame = null;
                    }
                },
                onDOMReady: function() {
                    targetOrigin = getLocation(config.remote);
                    if (config.isHost) {
                        apply(config.props, {
                            src: appendQueryParameters(config.remote, {
                                xdm_e: getLocation(location.href),
                                xdm_c: config.channel,
                                xdm_p: 5
                            }),
                            name: IFRAME_PREFIX + config.channel + "_provider"
                        });
                        frame = createFrame(config);
                        frame.fn = function(sendFn) {
                            delete frame.fn;
                            send = sendFn;
                            setTimeout(function() {
                                pub.up.callback(true);
                            }, 0);
                            return function(msg) {
                                pub.up.incoming(msg, targetOrigin);
                            };
                        };
                    } else {
                        if (document.referrer && getLocation(document.referrer) != query.xdm_e) {
                            window.top.location = query.xdm_e;
                        }
                        send = window.frameElement.fn(function(msg) {
                            pub.up.incoming(msg, targetOrigin);
                        });
                        pub.up.callback(true);
                    }
                },
                init: function() {
                    whenReady(pub.onDOMReady, pub);
                }
            });
        };
        easyXDM.stack.NameTransport = function(config) {
            var pub;
            var isHost, callerWindow, remoteWindow, readyCount, callback, remoteOrigin, remoteUrl;

            function _sendMessage(message) {
                var url = config.remoteHelper + (isHost ? "#_3" : "#_2") + config.channel;
                callerWindow.contentWindow.sendMessage(message, url);
            }

            function _onReady() {
                if (isHost) {
                    if (++readyCount === 2 || !isHost) {
                        pub.up.callback(true);
                    }
                } else {
                    _sendMessage("ready");
                    pub.up.callback(true);
                }
            }

            function _onMessage(message) {
                pub.up.incoming(message, remoteOrigin);
            }

            function _onLoad() {
                if (callback) {
                    setTimeout(function() {
                        callback(true);
                    }, 0);
                }
            }
            return (pub = {
                outgoing: function(message, domain, fn) {
                    callback = fn;
                    _sendMessage(message);
                },
                destroy: function() {
                    callerWindow.parentNode.removeChild(callerWindow);
                    callerWindow = null;
                    if (isHost) {
                        remoteWindow.parentNode.removeChild(remoteWindow);
                        remoteWindow = null;
                    }
                },
                onDOMReady: function() {
                    isHost = config.isHost;
                    readyCount = 0;
                    remoteOrigin = getLocation(config.remote);
                    config.local = resolveUrl(config.local);
                    if (isHost) {
                        easyXDM.Fn.set(config.channel, function(message) {
                            if (isHost && message === "ready") {
                                easyXDM.Fn.set(config.channel, _onMessage);
                                _onReady();
                            }
                        });
                        remoteUrl = appendQueryParameters(config.remote, {
                            xdm_e: config.local,
                            xdm_c: config.channel,
                            xdm_p: 2
                        });
                        apply(config.props, {
                            src: remoteUrl + '#' + config.channel,
                            name: IFRAME_PREFIX + config.channel + "_provider"
                        });
                        remoteWindow = createFrame(config);
                    } else {
                        config.remoteHelper = config.remote;
                        easyXDM.Fn.set(config.channel, _onMessage);
                    }
                    callerWindow = createFrame({
                        props: {
                            src: config.local + "#_4" + config.channel
                        },
                        onLoad: function onLoad() {
                            var w = callerWindow || this;
                            un(w, "load", onLoad);
                            easyXDM.Fn.set(config.channel + "_load", _onLoad);
                            (function test() {
                                if (typeof w.contentWindow.sendMessage == "function") {
                                    _onReady();
                                } else {
                                    setTimeout(test, 50);
                                }
                            }());
                        }
                    });
                },
                init: function() {
                    whenReady(pub.onDOMReady, pub);
                }
            });
        };
        easyXDM.stack.HashTransport = function(config) {
            var pub;
            var me = this,
                isHost, _timer, pollInterval, _lastMsg, _msgNr, _listenerWindow, _callerWindow;
            var useParent, _remoteOrigin;

            function _sendMessage(message) {
                if (!_callerWindow) {
                    return;
                }
                var url = config.remote + "#" + (_msgNr++) + "_" + message;
                ((isHost || !useParent) ? _callerWindow.contentWindow : _callerWindow).location = url;
            }

            function _handleHash(hash) {
                _lastMsg = hash;
                pub.up.incoming(_lastMsg.substring(_lastMsg.indexOf("_") + 1), _remoteOrigin);
            }

            function _pollHash() {
                if (!_listenerWindow) {
                    return;
                }
                var href = _listenerWindow.location.href,
                    hash = "",
                    indexOf = href.indexOf("#");
                if (indexOf != -1) {
                    hash = href.substring(indexOf);
                }
                if (hash && hash != _lastMsg) {
                    _handleHash(hash);
                }
            }

            function _attachListeners() {
                _timer = setInterval(_pollHash, pollInterval);
            }
            return (pub = {
                outgoing: function(message, domain) {
                    _sendMessage(message);
                },
                destroy: function() {
                    window.clearInterval(_timer);
                    if (isHost || !useParent) {
                        _callerWindow.parentNode.removeChild(_callerWindow);
                    }
                    _callerWindow = null;
                },
                onDOMReady: function() {
                    isHost = config.isHost;
                    pollInterval = config.interval;
                    _lastMsg = "#" + config.channel;
                    _msgNr = 0;
                    useParent = config.useParent;
                    _remoteOrigin = getLocation(config.remote);
                    if (isHost) {
                        config.props = {
                            src: config.remote,
                            name: IFRAME_PREFIX + config.channel + "_provider"
                        };
                        if (useParent) {
                            config.onLoad = function() {
                                _listenerWindow = window;
                                _attachListeners();
                                pub.up.callback(true);
                            };
                        } else {
                            var tries = 0,
                                max = config.delay / 50;
                            (function getRef() {
                                if (++tries > max) {
                                    throw new Error("Unable to reference listenerwindow");
                                }
                                try {
                                    _listenerWindow = _callerWindow.contentWindow.frames[IFRAME_PREFIX + config.channel + "_consumer"];
                                } catch (ex) {}
                                if (_listenerWindow) {
                                    _attachListeners();
                                    pub.up.callback(true);
                                } else {
                                    setTimeout(getRef, 50);
                                }
                            }());
                        }
                        _callerWindow = createFrame(config);
                    } else {
                        _listenerWindow = window;
                        _attachListeners();
                        if (useParent) {
                            _callerWindow = parent;
                            pub.up.callback(true);
                        } else {
                            apply(config, {
                                props: {
                                    src: config.remote + "#" + config.channel + new Date(),
                                    name: IFRAME_PREFIX + config.channel + "_consumer"
                                },
                                onLoad: function() {
                                    pub.up.callback(true);
                                }
                            });
                            _callerWindow = createFrame(config);
                        }
                    }
                },
                init: function() {
                    whenReady(pub.onDOMReady, pub);
                }
            });
        };
        easyXDM.stack.ReliableBehavior = function(config) {
            var pub, callback;
            var idOut = 0,
                idIn = 0,
                currentMessage = "";
            return (pub = {
                incoming: function(message, origin) {
                    var indexOf = message.indexOf("_"),
                        ack = message.substring(0, indexOf).split(",");
                    message = message.substring(indexOf + 1);
                    if (ack[0] == idOut) {
                        currentMessage = "";
                        if (callback) {
                            callback(true);
                        }
                    }
                    if (message.length > 0) {
                        pub.down.outgoing(ack[1] + "," + idOut + "_" + currentMessage, origin);
                        if (idIn != ack[1]) {
                            idIn = ack[1];
                            pub.up.incoming(message, origin);
                        }
                    }
                },
                outgoing: function(message, origin, fn) {
                    currentMessage = message;
                    callback = fn;
                    pub.down.outgoing(idIn + "," + (++idOut) + "_" + message, origin);
                }
            });
        };
        easyXDM.stack.QueueBehavior = function(config) {
            var pub, queue = [],
                waiting = true,
                incoming = "",
                destroying, maxLength = 0,
                lazy = false,
                doFragment = false;

            function dispatch() {
                if (config.remove && queue.length === 0) {
                    removeFromStack(pub);
                    return;
                }
                if (waiting || queue.length === 0 || destroying) {
                    return;
                }
                waiting = true;
                var message = queue.shift();
                pub.down.outgoing(message.data, message.origin, function(success) {
                    waiting = false;
                    if (message.callback) {
                        setTimeout(function() {
                            message.callback(success);
                        }, 0);
                    }
                    dispatch();
                });
            }
            return (pub = {
                init: function() {
                    if (undef(config)) {
                        config = {};
                    }
                    if (config.maxLength) {
                        maxLength = config.maxLength;
                        doFragment = true;
                    }
                    if (config.lazy) {
                        lazy = true;
                    } else {
                        pub.down.init();
                    }
                },
                callback: function(success) {
                    waiting = false;
                    var up = pub.up;
                    dispatch();
                    up.callback(success);
                },
                incoming: function(message, origin) {
                    if (doFragment) {
                        var indexOf = message.indexOf("_"),
                            seq = parseInt(message.substring(0, indexOf), 10);
                        incoming += message.substring(indexOf + 1);
                        if (seq === 0) {
                            if (config.encode) {
                                incoming = decodeURIComponent(incoming);
                            }
                            pub.up.incoming(incoming, origin);
                            incoming = "";
                        }
                    } else {
                        pub.up.incoming(message, origin);
                    }
                },
                outgoing: function(message, origin, fn) {
                    if (config.encode) {
                        message = encodeURIComponent(message);
                    }
                    var fragments = [],
                        fragment;
                    if (doFragment) {
                        while (message.length !== 0) {
                            fragment = message.substring(0, maxLength);
                            message = message.substring(fragment.length);
                            fragments.push(fragment);
                        }
                        while ((fragment = fragments.shift())) {
                            queue.push({
                                data: fragments.length + "_" + fragment,
                                origin: origin,
                                callback: fragments.length === 0 ? fn : null
                            });
                        }
                    } else {
                        queue.push({
                            data: message,
                            origin: origin,
                            callback: fn
                        });
                    }
                    if (lazy) {
                        pub.down.init();
                    } else {
                        dispatch();
                    }
                },
                destroy: function() {
                    destroying = true;
                    pub.down.destroy();
                }
            });
        };
        easyXDM.stack.VerifyBehavior = function(config) {
            var pub, mySecret, theirSecret, verified = false;

            function startVerification() {
                mySecret = Math.random().toString(16).substring(2);
                pub.down.outgoing(mySecret);
            }
            return (pub = {
                incoming: function(message, origin) {
                    var indexOf = message.indexOf("_");
                    if (indexOf === -1) {
                        if (message === mySecret) {
                            pub.up.callback(true);
                        } else if (!theirSecret) {
                            theirSecret = message;
                            if (!config.initiate) {
                                startVerification();
                            }
                            pub.down.outgoing(message);
                        }
                    } else {
                        if (message.substring(0, indexOf) === theirSecret) {
                            pub.up.incoming(message.substring(indexOf + 1), origin);
                        }
                    }
                },
                outgoing: function(message, origin, fn) {
                    pub.down.outgoing(mySecret + "_" + message, origin, fn);
                },
                callback: function(success) {
                    if (config.initiate) {
                        startVerification();
                    }
                }
            });
        };
        easyXDM.stack.RpcBehavior = function(proxy, config) {
            var pub, serializer = config.serializer || getJSON();
            var _callbackCounter = 0,
                _callbacks = {};

            function _send(data) {
                data.jsonrpc = "2.0";
                pub.down.outgoing(serializer.stringify(data));
            }

            function _createMethod(definition, method) {
                var slice = Array.prototype.slice;
                return function() {
                    var l = arguments.length,
                        callback, message = {
                            method: method
                        };
                    if (l > 0 && typeof arguments[l - 1] === "function") {
                        if (l > 1 && typeof arguments[l - 2] === "function") {
                            callback = {
                                success: arguments[l - 2],
                                error: arguments[l - 1]
                            };
                            message.params = slice.call(arguments, 0, l - 2);
                        } else {
                            callback = {
                                success: arguments[l - 1]
                            };
                            message.params = slice.call(arguments, 0, l - 1);
                        }
                        _callbacks["" + (++_callbackCounter)] = callback;
                        message.id = _callbackCounter;
                    } else {
                        message.params = slice.call(arguments, 0);
                    }
                    if (definition.namedParams && message.params.length === 1) {
                        message.params = message.params[0];
                    }
                    _send(message);
                };
            }

            function _executeMethod(method, id, fn, params) {
                if (!fn) {
                    if (id) {
                        _send({
                            id: id,
                            error: {
                                code: -32601,
                                message: "Procedure not found."
                            }
                        });
                    }
                    return;
                }
                var success, error;
                if (id) {
                    success = function(result) {
                        success = emptyFn;
                        _send({
                            id: id,
                            result: result
                        });
                    };
                    error = function(message, data) {
                        error = emptyFn;
                        var msg = {
                            id: id,
                            error: {
                                code: -32099,
                                message: message
                            }
                        };
                        if (data) {
                            msg.error.data = data;
                        }
                        _send(msg);
                    };
                } else {
                    success = error = emptyFn;
                }
                if (!isArray(params)) {
                    params = [params];
                }
                try {
                    var result = fn.method.apply(fn.scope, params.concat([success, error]));
                    if (!undef(result)) {
                        success(result);
                    }
                } catch (ex1) {
                    error(ex1.message);
                }
            }
            return (pub = {
                incoming: function(message, origin) {
                    var data = serializer.parse(message);
                    if (data.method) {
                        if (config.handle) {
                            config.handle(data, _send);
                        } else {
                            _executeMethod(data.method, data.id, config.local[data.method], data.params);
                        }
                    } else {
                        var callback = _callbacks[data.id];
                        if (data.error) {
                            if (callback.error) {
                                callback.error(data.error);
                            }
                        } else if (callback.success) {
                            callback.success(data.result);
                        }
                        delete _callbacks[data.id];
                    }
                },
                init: function() {
                    if (config.remote) {
                        for (var method in config.remote) {
                            if (config.remote.hasOwnProperty(method)) {
                                proxy[method] = _createMethod(config.remote[method], method);
                            }
                        }
                    }
                    pub.down.init();
                },
                destroy: function() {
                    for (var method in config.remote) {
                        if (config.remote.hasOwnProperty(method) && proxy.hasOwnProperty(method)) {
                            delete proxy[method];
                        }
                    }
                    pub.down.destroy();
                }
            });
        };
        global.easyXDM = easyXDM;
    })(window, document, location, window.setTimeout, decodeURIComponent, encodeURIComponent);
    var JSONP = (function() {
        var counter = 0,
            head, query, key, window = this;

        function load(url) {
            var script = document.createElement('script'),
                done = false;
            script.src = url;
            script.async = true;
            script.onload = script.onreadystatechange = function() {
                if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                    done = true;
                    script.onload = script.onreadystatechange = null;
                    if (script && script.parentNode) {
                        script.parentNode.removeChild(script);
                    }
                }
            };
            if (!head) {
                head = document.getElementsByTagName('head')[0];
                if (!head)
                    head = document.body;
            }
            head.appendChild(script);
        }

        function jsonp(url, params, callback) {
            query = "?";
            params = params || {};
            for (key in params) {
                if (params.hasOwnProperty(key)) {
                    query += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
                }
            }
            var jsonp = "json" + (++counter);
            window[jsonp] = function(data) {
                callback(data);
                try {
                    delete window[jsonp];
                } catch (e) {}
                window[jsonp] = null;
            };
            load(url + query + "callback=" + jsonp);
            return jsonp;
        }
        return {
            get: jsonp
        };
    }());
    var Class = function(methods) {
        var ret = function() {
            if (ret.$prototyping) return this;
            if (typeof this.initialize == 'function')
                return this.initialize.apply(this, arguments);
        };
        if (methods.Extends) {
            ret.parent = methods.Extends;
            methods.Extends.$prototyping = true;
            ret.prototype = new methods.Extends;
            methods.Extends.$prototyping = false;
        }
        for (var key in methods)
            if (methods.hasOwnProperty(key))
                ret.prototype[key] = methods[key];
        return ret;
    };
    if (typeof exports != 'undefined') exports.Class = Class;
    var Vector = new Class({
        initialize: function(x, y) {
            if (typeof x == 'object') {
                this.x = x.x;
                this.y = x.y;
            } else {
                this.x = x;
                this.y = y;
            }
        },
        cp: function() {
            return new Vector(this.x, this.y);
        },
        mul: function(factor) {
            this.x *= factor;
            this.y *= factor;
            return this;
        },
        mulNew: function(factor) {
            return new Vector(this.x * factor, this.y * factor);
        },
        div: function(factor) {
            this.x /= factor;
            this.y /= factor;
            return this;
        },
        divNew: function(factor) {
            return new Vector(this.x / factor, this.y / factor);
        },
        add: function(vec) {
            this.x += vec.x;
            this.y += vec.y;
            return this;
        },
        addNew: function(vec) {
            return new Vector(this.x + vec.x, this.y + vec.y);
        },
        sub: function(vec) {
            this.x -= vec.x;
            this.y -= vec.y;
            return this;
        },
        subNew: function(vec) {
            return new Vector(this.x - vec.x, this.y - vec.y);
        },
        rotate: function(angle) {
            var x = this.x,
                y = this.y;
            this.x = x * Math.cos(angle) - Math.sin(angle) * y;
            this.y = x * Math.sin(angle) + Math.cos(angle) * y;
            return this;
        },
        rotateNew: function(angle) {
            return this.cp().rotate(angle);
        },
        setAngle: function(angle) {
            var l = this.len();
            this.x = Math.cos(angle) * l;
            this.y = Math.sin(angle) * l;
            return this;
        },
        setAngleNew: function(angle) {
            return this.cp().setAngle(angle);
        },
        setLength: function(length) {
            var l = this.len();
            if (l) this.mul(length / l);
            else this.x = this.y = length;
            return this;
        },
        setLengthNew: function(length) {
            return this.cp().setLength(length);
        },
        normalize: function() {
            var l = this.len();
            if (l == 0)
                return this;
            this.x /= l;
            this.y /= l;
            return this;
        },
        normalizeNew: function() {
            return this.cp().normalize();
        },
        angle: function() {
            return Math.atan2(this.y, this.x);
        },
        collidesWith: function(rect) {
            return this.x > rect.x && this.y > rect.y && this.x < rect.x + rect.width && this.y < rect.y + rect.height;
        },
        len: function() {
            var l = Math.sqrt(this.x * this.x + this.y * this.y);
            if (l < 0.005 && l > -0.005) return 0;
            return l;
        },
        is: function(test) {
            return typeof test == 'object' && this.x == test.x && this.y == test.y;
        },
        dot: function(v2) {
            return this.x * v2.x + this.y * v2.y;
        },
        inTriangle: function(a, b, c) {
            var v0 = c.subNew(a);
            var v1 = b.subNew(a);
            var v2 = p.subNew(a);
            var dot00 = v0.dot(v0);
            var dot01 = v0.dot(v1);
            var dot02 = v0.dot(v2);
            var dot11 = v1.dot(v1);
            var dot12 = v1.dot(v2);
            var invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
            var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
            var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
            return (u > 0) && (v > 0) && (u + v < 1);
        },
        distanceFrom: function(vec) {
            return Math.sqrt(Math.pow((this.x - vec.x), 2), Math.pow(this.y - vec.y, 2));
        },
        toString: function() {
            return '[Vector(' + this.x + ', ' + this.y + ') angle: ' + this.angle() + ', length: ' + this.len() + ']';
        }
    });
    if (typeof exports != 'undefined') exports.Vector = Vector;
    var Rect = new Class({
        initialize: function(x, y, w, h) {
            this.pos = new Vector(x, y);
            this.size = {
                width: w,
                height: h
            };
        },
        hasPoint: function(point) {
            return point.x > this.getLeft() && point.x < this.getRight() && point.y > this.getTop() && point.y < this.getBottom();
        },
        setLeft: function(left) {
            this.pos.x = left + this.size.width / 2;
        },
        setTop: function(top) {
            this.pos.y = top + this.size.height / 2;
        },
        getLeft: function() {
            return this.pos.x - this.size.width / 2;
        },
        getTop: function() {
            return this.pos.y - this.size.height / 2;
        },
        getRight: function() {
            return this.pos.x + this.size.width / 2;
        },
        getBottom: function() {
            return this.pos.y + this.size.height / 2;
        },
        cp: function() {
            return new Rect(this.pos.x, this.pos.y, this.size.width, this.size.height);
        }
    });
    if (typeof exports != 'undefined') exports.Rect = Rect;
    var Fx = new Class({
        initialize: function() {
            this.listeners = [];
            this.tweens = {};
            this.running = {};
        },
        addListener: function(listener) {
            this.listeners.push(listener);
        },
        add: function(key, props) {
            props = props || {};
            props.duration = props.duration || 500;
            props.transition = props.transition || Tween.Linear;
            props.repeats = typeof props.repeats == 'undefined' ? false : props.repeats;
            if (!props.tweens) {
                var start = props.start || 0;
                var end = typeof props.end == 'undefined' ? 1 : props.end;
                props.tweens = [
                    [start, end]
                ];
            }
            this.tweens[key] = props;
        },
        update: function(time) {
            time = typeof time === 'number' ? time : now();
            for (var key in this.tweens)
                if (this.tweens.hasOwnProperty(key)) {
                    if (!this.running[key]) {
                        this.tweenStart(key, time);
                        continue;
                    }
                    var tween = this.tweens[key];
                    var tdelta = time - this.running[key].startTime;
                    if (tdelta > tween.duration) {
                        this.tweenFinished(tween, key);
                        continue;
                    }
                    var delta = tween.transition(tdelta / tween.duration);
                    var changes = [];
                    for (var i = 0, t; t = tween.tweens[i]; i++) {
                        var x = delta * (t[1] - t[0]) + t[0];
                        changes.push(x);
                    }
                    this.fire(key, changes, delta);
                }
        },
        tweenStart: function(key, time) {
            this.running[key] = {
                startTime: time
            };
            var values = [];
            for (var i = 0, tween; tween = this.tweens[key].tweens[i]; i++)
                values.push(tween[0]);
            this.fire(key, values, 0);
        },
        tweenFinished: function(tween, key) {
            var values = [];
            for (var i = 0, t; t = tween.tweens[i]; i++)
                values.push(t[1]);
            this.fire(key, values, 1);
            if (!tween.repeats) {
                delete this.running[key];
                delete this.tweens[key];
                return;
            }
            this.tweenStart(key, now());
        },
        fire: function(key, values, delta) {
            for (var i = 0, listener; listener = this.listeners[i]; i++)
                listener.set.call(listener, key, values, delta);
        }
    });
    var Tween = {
        Linear: function(x) {
            return x;
        },
        Quadratic: function(x) {
            return x * x;
        },
        Quintic: function(x) {
            return x * x * x;
        },
        Shake: function(x) {
            return Math.sin(x);
        }
    };
    var GameGlobals = {
        FPS: 60,
        useAnimationFrame: false,
        boids: {
            flockRadius: 400,
            size: 100
        },
        path: function() {
            return document.location.protocol + "//kickassapp.com/" + Array.prototype.slice.call(arguments).join("");
        },
        hasCanvas: (typeof document.createElement('canvas').getContext !== 'undefined'),
        bulletColor: 'black'
    };
    GameGlobals.easyXDMFlash = GameGlobals.path('easyxdm.swf');
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(searchElement) {
            if (this === void 0 || this === null)
                throw new TypeError();
            var t = Object(this);
            var len = t.length >>> 0;
            if (len === 0)
                return -1;
            var n = 0;
            if (arguments.length > 0) {
                n = Number(arguments[1]);
                if (n !== n)
                    n = 0;
                else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0))
                    n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
            if (n >= len)
                return -1;
            var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
            for (; k < len; k++) {
                if (k in t && t[k] === searchElement)
                    return k;
            }
            return -1;
        };
    }

    function now() {
        return (new Date()).getTime();
    }

    function bind(bound, func) {
        return function() {
            return func.apply(bound, arguments);
        };
    }

    function each(arr, func, bindObject) {
        if (typeof arr.forEach == 'function') {
            arr.forEach(func, bindObject);
            return arr;
        }
        for (var key in arr)
            if (arr.hasOwnProperty(key))
                func.call(bindObject || window, arr[key], key);
        return arr;
    }

    function addEvent(obj, type, fn) {
        if (obj.addEventListener)
            obj.addEventListener(type, fn, false);
        else if (obj.attachEvent) {
            obj["e" + type + fn] = fn;
            obj[type + fn] = function() {
                return obj["e" + type + fn](window.event);
            };
            obj.attachEvent("on" + type, obj[type + fn]);
        }
    }

    function removeEvent(obj, type, fn) {
        if (obj.removeEventListener)
            obj.removeEventListener(type, fn, false);
        else if (obj.detachEvent) {
            obj.detachEvent("on" + type, obj[type + fn]);
            obj[type + fn] = null;
            obj["e" + type + fn] = null;
        }
    }

    function stopEvent(e) {
        if (e.stopPropogation)
            e.stopPropogation();
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    }

    function elementIsContainedIn(element1, element2) {
        if (element.contains)
            return element1.contains(element2);
        return !!(element1.compareDocumentPosition(element2) & 16);
    };

    function code(name) {
        var table = {
            38: 'up',
            40: 'down',
            37: 'left',
            39: 'right',
            27: 'esc'
        };
        if (table[name]) return table[name];
        return String.fromCharCode(name);
    };

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    function getRect(element) {
        if (typeof element.getBoundingClientRect === 'function') {
            var rect = element.getBoundingClientRect();
            var sx = window.pageXOffset;
            var sy = window.pageYOffset;
            return {
                width: rect.width,
                height: rect.height,
                left: rect.left + sx,
                top: rect.top + sy
            };
        }
        var rect = {
            width: element.offsetWidth,
            height: element.offsetHeight,
            left: 0,
            top: 0
        };
        var el = element;
        while (el) {
            rect.left += el.offsetLeft;
            rect.top += el.offsetTop;
            el = el.offsetParent;
        }
        return rect;
    }

    function getCompatElement() {
        var doc = document;
        return (!doc.compatMode || doc.compatMode == 'CSS1Compat') ? doc.documentElement : doc.body;
    }

    function getScrollSize() {
        var doc = getCompatElement();
        var min = {
            x: doc.clientWidth,
            y: doc.clientHeight
        };
        var body = document.body;
        return {
            x: Math.max(doc.scrollWidth, body.scrollWidth, min.x),
            y: Math.max(doc.scrollHeight, body.scrollHeight, min.y)
        };
    }

    function getStyle(element, prop) {
        if (element.style[prop])
            return element.style[prop];
        if (element.currentStyle)
            return element.currentStyle[prop];
        return document.defaultView.getComputedStyle(element, null).getPropertyValue(prop);
    }

    function setStyles(element, props) {
        for (var key in props)
            if (props.hasOwnProperty(key)) {
                var val = props[key];
                if (typeof val === "number" && key !== "opacity" && key !== "zIndex")
                    val = val + 'px';
                element.style[key] = val;
            }
    };

    function hasClass(ele, cls) {
        return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }

    function addClass(ele, cls) {
        if (!hasClass(ele, cls)) ele.className += " " + cls;
    }

    function removeClass(ele, cls) {
        if (hasClass(ele, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            ele.className = ele.className.replace(reg, ' ');
        }
    }

    function cloneElement(element) {
        return element.cloneNode(true);
    }

    function newElement(tag, props) {
        var el = document.createElement(tag);
        for (var key in props)
            if (props.hasOwnProperty(key)) {
                if (key === 'styles') {
                    setStyles(el, props[key]);
                } else {
                    el[key] = props[key];
                }
            }
        return el;
    }
    var requestAnimFrame = (function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback, element) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();

    function delay(d, func, bound) {
        return setTimeout(bind(bound, func), d);
    }
    var KickAss = new Class({
        initialize: function() {
            this.players = [];
            this.elements = [];
            this.weaponClass = Weapons[1].cannonClass;
            this.scrollPos = new Vector(0, 0);
            this.scrollSize = new Vector(0, 0);
            this.windowSize = {
                width: 0,
                height: 0
            };
            this.updateWindowInfo();
            this.world = new World(this);
            this.bulletManager = new BulletManager();
            this.bulletManager.game = this;
            this.bulletManager.updateEnemyIndex();
            this.explosionManager = new ExplosionManager();
            this.explosionManager.game = this;
            this.ui = new UIManager();
            this.ui.game = this;
            this.bombManager = new BombManager();
            this.bombManager.game = this;
            this.statisticsManager = new StatisticsManager();
            this.statisticsManager.game = this;
            GameGlobals.stats = this.statisticsManager;
            this.sessionManager = new SessionManager();
            this.sessionManager.game = this;
            this.alienManager = new AlienManager(this);
            this.lastUpdate = now();
            this.keyMap = {};
            this.keydownEvent = bind(this, this.keydown);
            this.keyupEvent = bind(this, this.keyup);
            this.multiplier = 10;
            if (window.KickAssStyle && window.KickAssStyle === "white")
                GameGlobals.bulletColor = "white";
            addEvent(document, 'keydown', this.keydownEvent);
            addEvent(document, 'keyup', this.keyupEvent);
            addEvent(document, 'keypress', this.keydownEvent);
        },
        begin: function() {
            this.addPlayer();
            this.sessionManager.isPlaying = true;
            if (!GameGlobals.useAnimationFrame)
                this.loopTimer = window.setInterval(bind(this, this.loop), 1000 / GameGlobals.FPS);
            if (GameGlobals.useAnimationFrame)
                requestAnimFrame(bind(this, this.loop));
        },
        keydown: function(e) {
            var c = code(e.keyCode);
            this.keyMap[c] = true;
            switch (c) {
                case 'left':
                case 'right':
                case 'up':
                case 'down':
                case 'esc':
                case ' ':
                    stopEvent(e);
                    break;
            }
            switch (c) {
                case 'esc':
                    this.destroy();
                    break;
            }
        },
        keyup: function(e) {
            var c = code(e.keyCode);
            this.keyMap[c] = false;
            switch (c) {
                case 'left':
                case 'right':
                case 'up':
                case 'down':
                case 'esc':
                case ' ':
                    if (e.stopPropogation)
                        e.stopPropogation();
                    if (e.preventDefault)
                        e.preventDefault();
                    e.returnValue = false;
                    break;
            }
        },
        loop: function() {
            var currentTime = now();
            var tdelta = (currentTime - this.lastUpdate) / 1000;
            this.updateWindowInfo();
            for (var i = 0, player; player = this.players[i]; i++)
                player.update(tdelta);
            this.world.update(tdelta);
            this.bulletManager.update(tdelta);
            this.bombManager.update(tdelta);
            this.explosionManager.update(tdelta);
            this.alienManager.update(tdelta);
            this.ui.update(tdelta);
            this.statisticsManager.update(tdelta);
            this.sessionManager.update(tdelta);
            this.lastUpdate = currentTime;
            if (GameGlobals.useAnimationFrame)
                requestAnimFrame(bind(this, this.loop));
        },
        addPlayer: function() {
            var data = false;
            var ship = Ships.Standard;
            if (window.KICKASSSHIP && KICKASSSHIP.points) {
                ship = KICKASSSHIP;
            }
            var player = new Player();
            player.game = this;
            player.setShip(ship);
            this.players.push(player);
            this.explosionManager.addExplosion(player.pos);
        },
        registerElement: function(el) {
            if (!el) {
                throw new Error("Can't register unexisting element.");
            }
            this.elements.push(el);
        },
        unregisterElement: function(el) {
            this.elements.splice(this.elements.indexOf(el), 1);
        },
        isKickAssElement: function(el) {
            for (var i = 0, element; element = this.elements[i]; i++) {
                if (el === element || elementIsContainedIn(element, el))
                    return true;
            }
            return false;
        },
        isKeyPressed: function(key) {
            return !!this.keyMap[key];
        },
        updateWindowInfo: function() {
            var isIEQuirks = (!!window.ActiveXObject) && document.compatMode == "BackCompat";
            this.windowSize = {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            };
            if (isIEQuirks) {
                this.windowSize.width = document.body.clientWidth;
                this.windowSize.height = document.body.clientHeight;
            }
            if (this.menuManager && this.menuManager.isVisible()) {
                this.windowSize.height -= this.menuManager.getHeight();
            }
            this.scrollPos.x = window.pageXOffset || document.documentElement.scrollLeft;
            this.scrollPos.y = window.pageYOffset || document.documentElement.scrollTop;
            this.scrollSize = getScrollSize();
        },
        hideAll: function() {
            for (var i = 0, el; el = this.elements[i]; i++)
                el.style.visibility = 'hidden';
        },
        showAll: function() {
            for (var i = 0, el; el = this.elements[i]; i++)
                el.style.visibility = 'visible';
        },
        updateShips: function(ship, isInitial) {
            if (!isInitial)
                this.ui.showMessage("You're now flying<br /><em>" + ship.name + "<em>!!");
            for (var i = 0, player; player = this.players[i]; i++)
                player.setShip(ship);
        },
        changeWeapon: function(weapon, isInitial) {
            this.weaponClass = weapon.cannonClass;
            if (!isInitial)
                this.ui.showMessage("Changed to " + weapon.name.toUpperCase() + "!!!!");
            for (var i = 0, player; player = this.players[i]; i++)
                player.setCannons(weapon.cannonClass);
        },
        changeWeaponById: function(id, isInitial) {
            if (!Weapons[id]) return;
            this.changeWeapon(Weapons[id], isInitial);
        },
        flyOutPlayers: function(x, y) {
            for (var i = 0, player; player = this.players[i]; i++) {
                player.flyTo(x, -player.size.height);
                player.isBound = false;
            }
        },
        flyInPlayers: function() {
            for (var i = 0, player; player = this.players[i]; i++) {
                player.flyTo(player.pos.x, 100, function() {
                    this.isBound = true;
                });
            }
        },
        newRank: function(rank) {
            this.ui.showMessage("OMG. You leveled up to: <strong>" + rank + '</strong>!<br /><small>Be sure to check what cool new stuff you get in the menu.</small>');
        },
        fireBomb: function() {
            this.bombManager.blow();
        },
        destroy: function() {
            removeEvent(document, 'keydown', this.keydownEvent);
            removeEvent(document, 'keypress', this.keydownEvent);
            removeEvent(document, 'keyup', this.keyupEvent);
            for (var i = 0, player; player = this.players[i]; i++)
                player.destroy();
            this.bulletManager.destroy();
            this.explosionManager.destroy();
            this.menuManager.destroy();
            if (!GameGlobals.useAnimationFrame)
                clearInterval(this.loopTimer);
            window.KICKASSGAME = false;
        }
    });
    var StatisticsManager = new Class({
        initialize: function() {
            this.data = {};
            this.data.startedPlaying = now();
            this.data.elementsDestroyed = 0;
            this.data.shotsFired = 0;
            this.data.distanceFlownInPixels = 0;
            this.data.totalPointsThisSession = 0;
            this.data.usedThrusters = 0;
            this.lastUpdate = 0;
        },
        usedThrusters: function() {
            this.data.usedThrusters = 1;
        },
        increaseDistanceWithPixels: function(px) {
            this.data.distanceFlownInPixels += px;
        },
        increasePointsGainedWithPoints: function(points) {
            this.data.totalPointsThisSession += points;
        },
        addShotFired: function() {
            this.data.shotsFired++;
        },
        addElementsDestroyed: function() {
            this.data.elementsDestroyed++;
        },
        update: function(tdelta) {
            this.lastUpdate += tdelta;
            if (this.lastUpdate > 0.25) {
                this.syncWithServer();
                this.lastUpdate = 0;
            }
        },
        syncWithServer: function() {
            var fragment = [];
            for (var key in this.data)
                if (this.data.hasOwnProperty(key)) {
                    fragment.push(key + ':' + this.data[key]);
                }
        }
    });
    var Menu = new Class({
        initialize: function() {
            this.size = {
                height: 300
            };
            this.url = GameGlobals.path('intermediate.html?url=' + encodeURIComponent(window.KICKASSURL || document.location.href));
        },
        generate: function(parent) {
            this.container = document.createElement('div');
            this.container.className = 'KICKASSELEMENT';
            this.container.id = 'kickass-profile-menu';
            parent.appendChild(this.container);
            this.isSocketReady = false;
            this.socket = new easyXDM.Socket({
                remote: this.url,
                remoteHelper: GameGlobals.path('name.html'),
                swf: GameGlobals.path('easyxdm.swf'),
                container: this.container,
                lazy: false,
                onMessage: bind(this, function(message) {
                    if (message === "ready") {
                        this.onGameReady();
                        return;
                    }
                    var t = message.split(':!');
                    if (t.length !== 2) return;
                    var type = t.shift().replace(/^./g, function(match) {
                        return match.charAt(0).toUpperCase();
                    });
                    if (this['messageType' + type])
                        this['messageType' + type](t.join(":!"));
                }),
                props: {
                    frameborder: '0',
                    'className': 'KICKASSELEMENT',
                    style: {
                        width: '100%',
                        height: this.size.height + 'px'
                    }
                }
            });
            this.game.registerElement(this.container);
        },
        onGameReady: function() {
            this.isSocketReady = true;
            this.game.registerElement(this.container.getElementsByTagName('iframe')[0]);
            this.socket.postMessage("url:!" + (window.KICKASSURL || document.location.href));
            this.game.statisticsManager.syncWithServer();
        },
        sendMessage: function(message) {
            if (!this.isSocketReady) return;
            if (message != this.lastMessage) {
                try {
                    this.socket.postMessage(message);
                } catch (e) {}
                this.lastMessage = message;
            }
        },
        messageTypeChangeShip: function(pieces) {
            pieces = pieces.split(",");
            var shipId = pieces[0];
            var weaponId = pieces[1];
            var isInitial = pieces[2] === 'initial';
            if (this.shipId === shipId)
                return;
            if (isInitial && window.KICKASSSHIP)
                return;
            this.shipId = shipId;
            JSONP.get(GameGlobals.path('designer/ship/' + shipId + '/construction.jsonp'), {
                ship_id: shipId,
                is_initial: isInitial ? '1' : '0'
            }, bind(this, function(data) {
                this.game.updateShips(data.data, isInitial);
                try {
                    window.focus();
                } catch (e) {}
            }));
            if (!isInitial)
                this.parent.hideMenu();
        },
        messageTypeChangeWeapon: function(weaponId, isInitial) {
            this.game.changeWeaponById(weaponId, isInitial);
        },
        messageTypeSetMultiplier: function(mod) {
            mod = parseInt(mod, 10);
            if (isNaN(mod) || !mod)
                return;
            this.game.multiplier = mod;
        },
        messageTypeNewRank: function(rank) {
            this.game.newRank(rank);
        },
        messageTypePlayerMessage: function(message) {
            this.game.ui.showMessage(message);
        },
        destroy: function() {
            this.game.unregisterElement(this.container);
            this.game.unregisterElement(this.iframe);
            this.container.parentNode.removeChild(this.container);
        }
    });
    var UIManager = new Class({
        initialize: function() {
            this.UNIQID = 0;
            this.pointBubbles = {};
            this.messages = {};
            this.fx = new Fx();
            this.fx.addListener(this);
        },
        update: function(tdelta) {
            this.fx.update();
        },
        set: function(key, value, delta) {
            var type = key.split('-')[0];
            var id = key.split('-')[1];
            if (this.pointBubbles[id]) {
                var bubble = this.pointBubbles[id];
                bubble.style.top = value[0] + 'px';
                bubble.style.opacity = value[1];
                if (delta == 1 && bubble.parentNode) {
                    bubble.parentNode.removeChild(bubble);
                    delete this.pointBubbles[id];
                }
            } else if (this.messages[id] && type == 'messagedown') {
                var message = this.messages[id];
                message.style.top = value[0] + 'px';
                if (delta == 1) {
                    setTimeout(bind(this, function() {
                        this.fx.add('messageup-' + id, {
                            tweens: [
                                [value[0], -100]
                            ],
                            transition: Tween.Quadratic,
                            duration: 300
                        });
                    }), message.staytime || 4000);
                }
            } else if (this.messages[id] && type == 'messageup') {
                var message = this.messages[id];
                message.style.top = value[0] + 'px';
                if (delta == 1) {
                    message.parentNode.removeChild(message);
                    delete this.messages[id];
                }
            }
        },
        addPointsBubbleAt: function(pos, points) {
            var id = 'bubble' + (this.UNIQID++);
            var y = this.game.scrollPos.y + pos.y;
            var bubble = newElement('span', {
                innerHTML: points,
                className: 'KICKASSELEMENT',
                styles: {
                    position: 'absolute',
                    font: "20px Arial",
                    fontWeight: "bold",
                    opacity: "1",
                    color: "black",
                    textShadow: "#fff 1px 1px 3px",
                    top: y,
                    zIndex: "10000000"
                }
            });
            bubble.style.left = pos.x - bubble.offsetWidth / 2 + 'px';
            document.body.appendChild(bubble);
            this.pointBubbles[id] = bubble;
            this.fx.add('bubble-' + id, {
                tweens: [
                    [y, y - 15],
                    [1, 0]
                ]
            });
        },
        showMessage: function(html, staytime) {
            staytime = staytime || false;
            var width = 300;
            var id = this.UNIQID++;
            var message = newElement('div', {
                innerHTML: html,
                className: 'KICKASSELEMENT',
                id: 'kickass-message-' + id,
                styles: {
                    position: 'fixed',
                    top: -100,
                    left: '50%',
                    marginLeft: -width / 2,
                    width: width,
                    background: '#222',
                    opacity: 0.8,
                    padding: '10px',
                    color: '#fff',
                    textAlign: 'center',
                    borderRadius: 15,
                    font: '20px Arial',
                    fontWeight: 'bold',
                    zIndex: "10000000"
                }
            });
            message.staytime = staytime;
            document.body.appendChild(message);
            var to = this.getLowestBubbleY();
            message.kickassto = to;
            this.fx.add('messagedown-' + id, {
                duration: 300,
                tweens: [
                    [-100, to]
                ],
                transition: Tween.Quadratic
            });
            this.messages[id] = message;
            return message;
        },
        getLowestBubbleY: function() {
            var top = 100;
            for (var id in this.messages)
                if (this.messages.hasOwnProperty(id))
                    top = Math.max(this.messages[id].kickassto + this.messages[id].offsetHeight + 10, top);
            return top;
        }
    });
    var World = new Class({
        initialize: function(game) {
            return;
            this.game = game;
            var b2Vec2 = Box2D.Common.Math.b2Vec2,
                b2AABB = Box2D.Collision.b2AABB,
                b2BodyDef = Box2D.Dynamics.b2BodyDef,
                b2Body = Box2D.Dynamics.b2Body,
                b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
                b2Fixture = Box2D.Dynamics.b2Fixture,
                b2World = Box2D.Dynamics.b2World,
                b2MassData = Box2D.Collision.Shapes.b2MassData,
                b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
                b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
                b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
                b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef;
            this.world = new b2World(new b2Vec2(10, 10), true);
            var screenWidth = this.game.windowSize.x;
            var screenHeight = this.game.windowSize.y;
            var bodyDef = new b2BodyDef;
            bodyDef.position.Set(10, screenWidth / 30 + 1.0);
            bodyDef.type = b2Body.b2_staticBody;
            var fixDef = new b2FixtureDef;
            fixDef.density = 1.0;
            fixDef.friction = 0.5;
            fixDef.restitution = 0.2;
            fixDef.shape = new b2PolygonShape;
            fixDef.shape.SetAsBox(20, 2);
            this.world.CreateBody(bodyDef).CreateFixture(fixDef);
            bodyDef.position.Set(10, -1.8);
            this.world.CreateBody(bodyDef).CreateFixture(fixDef);
            fixDef.shape.SetAsBox(2, 14);
            bodyDef.position.Set(-1.8, 13);
            this.world.CreateBody(bodyDef).CreateFixture(fixDef);
            bodyDef.position.Set(21.8, 13);
            this.world.CreateBody(bodyDef).CreateFixture(fixDef);
            bodyDef.type = b2Body.b2_dynamicBody;
            var all = document.getElementsByTagName('*');
            for (var i = 0, el; el = all[i]; i++) {
                var w = el.offsetWidth,
                    h = el.offsetHeight;
                var x = el.offsetLeft,
                    y = el.offsetTop;
                fixDef.shape = new b2PolygonShape;
                fixDef.shape.SetAsBox(w / 10, h / 10);
                bodyDef.position.x = x / 10;
                bodyDef.position.y = y / 10;
                var body = this.world.CreateBody(bodyDef);
                body.element = el;
                body.CreateFixture(fixDef);
            }
        },
        render: function() {
            return;
            var i = 0;
            var b;
            var f;
            var s;
            var j;
            var bp;
            var invQ = new b2Vec2;
            var x1 = new b2Vec2;
            var x2 = new b2Vec2;
            var b1 = new b2AABB();
            var b2 = new b2AABB();
            var vs = [new b2Vec2(), new b2Vec2(), new b2Vec2(), new b2Vec2()];
            var color = new b2Color(0, 0, 0);
            for (b = this.m_bodyList; b; b = b.m_next) {
                var xf = b.m_xf;
                for (f = b.GetFixtureList(); f; f = f.m_next) {
                    s = f.GetShape();
                    if (b.IsActive() == false) {
                        color.Set(0.5, 0.5, 0.3);
                        this.DrawShape(s, xf, color);
                    } else if (b.GetType() == b2Body.b2_staticBody) {
                        color.Set(0.5, 0.9, 0.5);
                        this.DrawShape(s, xf, color);
                    } else if (b.GetType() == b2Body.b2_kinematicBody) {
                        color.Set(0.5, 0.5, 0.9);
                        this.DrawShape(s, xf, color);
                    } else if (b.IsAwake() == false) {
                        color.Set(0.6, 0.6, 0.6);
                        this.DrawShape(s, xf, color);
                    } else {
                        color.Set(0.9, 0.7, 0.7);
                        this.DrawShape(s, xf, color);
                    }
                }
            }
            for (j = this.m_jointList; j; j = j.m_next) {
                this.DrawJoint(j);
            }
            for (var c = this.m_controllerList; c; c = c.m_next) {
                c.Draw(this.m_debugDraw);
            }
            color.Set(0.3, 0.9, 0.9);
            for (var contact = this.m_contactManager.m_contactList; contact; contact = contact.GetNext()) {
                var fixtureA = contact.GetFixtureA();
                var fixtureB = contact.GetFixtureB();
                var cA = fixtureA.GetAABB().GetCenter();
                var cB = fixtureB.GetAABB().GetCenter();
                this.m_debugDraw.DrawSegment(cA, cB, color);
            }
            bp = this.m_contactManager.m_broadPhase;
            vs = [new b2Vec2(), new b2Vec2(), new b2Vec2(), new b2Vec2()];
            for (b = this.m_bodyList; b; b = b.GetNext()) {
                if (b.IsActive() == false)
                    continue;
                for (f = b.GetFixtureList(); f; f = f.GetNext()) {
                    var aabb = bp.GetFatAABB(f.m_proxy);
                    vs[0].Set(aabb.lowerBound.x, aabb.lowerBound.y);
                    vs[1].Set(aabb.upperBound.x, aabb.lowerBound.y);
                    vs[2].Set(aabb.upperBound.x, aabb.upperBound.y);
                    vs[3].Set(aabb.lowerBound.x, aabb.upperBound.y);
                    this.m_debugDraw.DrawPolygon(vs, 4, color);
                }
            }
            for (b = this.m_bodyList; b; b = b.m_next) {
                var xf = b2World.s_xf;
                xf.R = b.m_xf.R;
                xf.position = b.GetWorldCenter();
                this.m_debugDraw.DrawTransform(xf);
            }
        },
        update: function(delta) {
            return;
            this.world.Step(delta, 10, 10);
            this.world.ClearForces();
        }
    });
    var Ships = {
        Standard: {
            points: [
                [-10, 10],
                [0, -15],
                [10, 10]
            ],
            thrusters: [{
                s: {
                    w: 20,
                    h: 7
                },
                p: {
                    x: 0,
                    y: 14
                },
                a: 0
            }],
            cannons: [{
                p: {
                    x: 0,
                    y: -15
                },
                a: 0
            }]
        }
    };
    var PLAYERIDS = 0;
    var Player = new Class({
        initialize: function() {
            this.id = PLAYERIDS++;
            this.tween = false;
            this.isBound = true;
            this.pos = new Vector(200, 200);
            this.vel = new Vector(0, 0);
            this.acc = new Vector(0, 0);
            this.dir = new Vector(0, 1);
            this.currentRotation = 0;
            this.isBroken = false;
            this.lineOffsets = [];
            this.deadTime = 0;
            this.friction = 0.8;
            this.terminalVelocity = 2000;
            this.lastPos = new Vector(0, 0);
        },
        setShip: function(ship) {
            this.ship = ship;
            this.verts = [];
            for (var i = 0, vert; vert = this.ship.points[i]; i++)
                this.verts.push(new Vector(vert[0], vert[1]));
            this.verts.push(this.verts[0]);
            this.thrusters = [];
            this.cannons = [];
            this.addThrusters(this.ship.thrusters);
            this.addCannons(this.ship.cannons);
            this.size = this.getSizeFromVertsAndObjects();
            this.bounds = this.calculateBounds();
            if (this.sheet) {
                this.sheet.destroy();
            }
            this.sheet = new Sheet(new Rect(100, 100, this.bounds.x, this.bounds.y));
            this.forceRedraw = true;
        },
        setCannons: function(cannonClass) {
            var newCannons = [];
            for (var i = 0, cannon; cannon = this.cannons[i]; i++) {
                var newCannon = new cannonClass(cannon.pos.x, cannon.pos.y, cannon.angle);
                newCannon.player = this;
                newCannon.game = this.game;
                newCannons.push(newCannon);
                cannon.destroy();
            }
            this.cannons = newCannons;
        },
        addThrusters: function(thrusters) {
            for (var i = 0, data; data = thrusters[i]; i++) {
                var thruster = new Thruster(data);
                this.thrusters.push(thruster);
            }
        },
        addCannons: function(cannons) {
            for (var i = 0, data; data = cannons[i]; i++) {
                var weaponClass = WeaponMap[data.m] || WeaponMap.cannon;
                var cannon = new weaponClass.cannonClass(data.p.x, data.p.y, data.a);
                cannon.player = this;
                cannon.game = this.game;
                this.cannons.push(cannon);
            }
        },
        update: function(tdelta) {
            if (this.isBroken) {
                if (!this.lineOffsets.length) {
                    for (var i = 0; i < (this.verts.length - 1); i++)
                        this.lineOffsets[i] = {
                            pos: new Vector(0, 0),
                            dir: (new Vector(1, 1)).setAngle(Math.PI * 2 * Math.random())
                        };
                }
                for (var i = 0; i < this.lineOffsets.length; i++) {
                    this.lineOffsets[i].pos.add(this.lineOffsets[i].dir.cp().setLength(50).mul(tdelta));
                }
                this.sheet.clear();
                this.sheet.setAngle(this.dir.angle());
                this.sheet.setPosition(this.pos);
                this.sheet.drawBrokenPlayer(this.verts, this.lineOffsets);
                if (now() - this.deadTime > 1000.0) {
                    this.isBroken = false;
                    this.lineOffsets = [];
                    this.randomPos();
                }
                return;
            }
            if (!this.tween) {
                if (this.game.isKeyPressed('left') || this.game.isKeyPressed('right')) {
                    if (this.game.isKeyPressed('left'))
                        this.rotateLeft(tdelta);
                    if (this.game.isKeyPressed('right'))
                        this.rotateRight(tdelta);
                } else {
                    this.stopRotate();
                }
                if (this.game.isKeyPressed('up'))
                    this.activateThrusters();
                else
                    this.stopThrusters();
            }
            if (this.game.isKeyPressed(' ')) {
                this.isShooting = true;
                if (!this.isBroken)
                    this.shootPressed();
            } else if (this.isShooting) {
                this.isShooting = false;
                this.shootReleased();
            }
            if (this.currentRotation)
                this.dir.setAngle(this.dir.angle() + this.currentRotation * tdelta);
            var frictionedAcc = this.acc.mulNew(tdelta).sub(this.vel.mulNew(tdelta * this.friction));
            this.vel.add(frictionedAcc);
            if (this.vel.len() > this.terminalVelocity)
                this.vel.setLength(this.terminalVelocity);
            var posDelta = this.vel.mulNew(tdelta);
            this.pos.add(posDelta);
            GameGlobals.stats.increaseDistanceWithPixels(posDelta.len());
            var showFlames = !this.acc.is({
                x: 0,
                y: 0
            });
            for (var i = 0, thruster; thruster = this.thrusters[i]; i++) {
                thruster.setIsShown(showFlames);
                thruster.update(tdelta);
            }
            if (this.isBound)
                this.checkBounds();
            if (!this.lastPos.is(this.pos) || this.currentRotation || this.forceRedraw) {
                this.forceRedraw = false;
                this.sheet.clear();
                this.sheet.setAngle(this.dir.angle() + Math.PI / 2);
                this.sheet.setPosition(this.pos);
                if (showFlames) {
                    for (var i = 0, thruster; thruster = this.thrusters[i]; i++)
                        thruster.drawTo(this.sheet);
                }
                this.sheet.drawPlayer(this.verts);
                this.lastPos = this.pos.cp();
            }
            for (var i = 0, cannon; cannon = this.cannons[i]; i++) {
                cannon.update(tdelta);
            }
        },
        randomPos: function() {
            var w = this.game.windowSize.width;
            var h = this.game.windowSize.height;
            this.pos = new Vector(random(0, w), random(0, h));
        },
        checkBounds: function() {
            if (this.tween)
                return;
            var w = this.game.windowSize.width;
            var h = this.game.windowSize.height;
            var rightBound = this.pos.x + this.sheet.rect.size.width / 2;
            var bottomBound = this.pos.y + this.sheet.rect.size.height / 2;
            if (rightBound > w) {
                window.scrollTo(this.game.scrollPos.x + 50, this.game.scrollPos.y);
                this.pos.x = 0;
            } else if (this.pos.x < 0) {
                window.scrollTo(this.game.scrollPos.x - 50, this.game.scrollPos.y);
                this.pos.x = w - this.sheet.rect.size.width / 2;
            }
            if (bottomBound > h) {
                window.scrollTo(this.game.scrollPos.x, this.game.scrollPos.y + h * 0.75);
                this.pos.y = 0;
            } else if (this.pos.y < 0) {
                window.scrollTo(this.game.scrollPos.x, this.game.scrollPos.y - h * 0.75);
                this.pos.y = h - this.sheet.rect.size.height / 2;
            }
        },
        inRect: function(rect) {
            var ret = false;
            for (var i = 0, vert; vert = this.verts[i]; i++) {
                if (rect.hasPoint(new Vector(vert.x + this.pos.x, vert.y + this.pos.y)))
                    ret = true;
            }
            return ret;
        },
        hit: function(by) {
            if (this.isBroken) return;
            this.isBroken = true;
            this.deadTime = now();
        },
        activateThrusters: function() {
            this.game.statisticsManager.usedThrusters();
            this.acc = (new Vector(500, 0)).setAngle(this.dir.angle());
        },
        stopThrusters: function() {
            this.acc = new Vector(0, 0);
        },
        rotateLeft: function(tdelta) {
            this.currentRotation = Math.max(-Math.PI * 2, this.currentRotation - Math.PI * 10 * tdelta);
        },
        rotateRight: function(tdelta) {
            this.currentRotation = Math.min(Math.PI * 2, this.currentRotation + Math.PI * 10 * tdelta);
        },
        stopRotate: function() {
            this.currentRotation = 0;
        },
        getSizeFromVertsAndObjects: function() {
            var largestDistance = 0;
            for (var i = 0, vert; vert = this.verts[i]; i++)
                largestDistance = Math.max(largestDistance, (new Vector(vert)).len());
            for (var i = 0, obj; obj = this.thrusters[i]; i++) {
                var p1 = (new Vector(obj.pos.x - obj.size.width / 2, obj.pos.y - obj.size.height / 2)).rotate(obj.angle);
                var p2 = (new Vector(obj.pos.x + obj.size.width / 2, obj.pos.y - obj.size.height / 2)).rotate(obj.angle);
                var p3 = (new Vector(obj.pos.x - obj.size.width / 2, obj.pos.y + obj.size.height / 2)).rotate(obj.angle);
                var p4 = (new Vector(obj.pos.x + obj.size.width / 2, obj.pos.y + obj.size.height / 2)).rotate(obj.angle);
                largestDistance = Math.max(largestDistance, p1.len(), p2.len(), p3.len(), p4.len());
            }
            return {
                width: largestDistance * 2,
                height: largestDistance * 2
            };
        },
        calculateBounds: function() {
            return {
                x: Math.max(this.size.width, this.size.height) * 1,
                y: Math.max(this.size.height, this.size.width) * 1
            };
        },
        shootPressed: function() {
            for (var i = 0, cannon; cannon = this.cannons[i]; i++)
                cannon.shootPressed();
        },
        shootReleased: function() {
            for (var i = 0, cannon; cannon = this.cannons[i]; i++)
                cannon.shootReleased();
        },
        flyTo: function(x, y, callback) {
            this.tween = {
                start: {
                    pos: this.pos.cp(),
                    dir: this.dir.cp()
                },
                to: new Vector(x, y),
                callback: callback || function() {}
            };
            this.tween.time = this.getTimeforTween();
        },
        destroy: function() {
            this.sheet.destroy();
        }
    });
    var Thruster = new Class({
        initialize: function(data, ship) {
            this.pos = new Vector(data.p);
            this.size = {
                width: data.s.w,
                height: data.s.h
            };
            this.angle = data.a || 0;
            this.ship = ship;
            this.isShown = false;
            this.flameY = 1;
            this.fx = new Fx();
            this.fx.addListener(this);
            this.flames = {
                r: [],
                y: []
            };
            this.lastFrameUpdate = 0;
            this.generateFlames();
        },
        update: function(tdelta) {
            this.fx.update();
            if (now() - this.lastFrameUpdate > 1000 / 60)
                this.generateFlames();
        },
        set: function(key, value) {
            switch (key) {
                case 'flames':
                    this.flameY = value;
                    break;
            }
        },
        setIsShown: function(isShown) {
            if (!this.isShown && isShown) {
                this.flameY = 0.0;
                this.generateFlames();
                this.fx.add('flames', {
                    start: this.flameY,
                    end: 1,
                    duration: 250,
                    transition: Tween.Quintic
                });
            }
            this.isShown = isShown;
        },
        drawTo: function(sheet) {
            sheet.drawFlames(this.flames, this.angle);
        },
        generateFlames: function() {
            var redWidth = this.size.width,
                redIncrease = this.size.width * 0.05,
                yellowWidth = this.size.width * 0.8,
                yellowIncrease = yellowWidth * 0.1,
                halfRed = redWidth / 2,
                halfYellow = yellowWidth / 2,
                offsetY = -this.size.height / 2,
                metaY = 0;
            var px = this.pos.x;
            var py = this.pos.y - this.size.height / 2;

            function vec(x, y) {
                return new Vector(x, y);
            }
            this.flames.r = [vec(-halfRed + px, py)];
            this.flames.y = [vec(-halfYellow + px, py)];
            this.flames.self = this;
            for (var x = 0; x < redWidth; x += redIncrease)
                this.flames.r.push(vec(x - halfRed + px, this.flameY * random(this.size.height * 0.7, this.size.height) + py));
            this.flames.r.push(vec(halfRed + px, py));
            for (var x = 0; x < yellowWidth; x += yellowIncrease)
                this.flames.y.push(vec(x - halfYellow + px, this.flameY * random(this.size.height * 0.4, this.size.height * 0.7) + py));
            this.flames.y.push(vec(halfYellow + px, py));
            this.lastFrameUpdate = now();
            var pos = vec(px, py);
            for (var i = 0, p; p = this.flames.r[i]; i++)
                p.sub(pos).rotate(this.angle).add(pos);
            for (var i = 0, p; p = this.flames.y[i]; i++)
                p.sub(pos).rotate(this.angle).add(pos);
        }
    });
    var BombManager = new Class({
        initialize: function() {
            this.bombShowDelay = 30;
            this.nextBomb = this.bombShowDelay;
        },
        update: function(tdelta) {
            if (this.game.isKeyPressed('F') && this.isReady()) {
                this.blow();
            }
            if (this.nextBomb === -1 || !this.game.sessionManager.isPlaying)
                return;
            this.nextBomb -= tdelta;
            if (this.nextBomb < 0) {
                this.nextBomb = -1;
                this.game.ui.showMessage("BOMB IS READY<br />(press F to explode)");
            }
        },
        blow: function() {
            var message = this.game.ui.showMessage("3...", 5000);
            delay(1000, function() {
                message.innerHTML = "2...";
            }, this);
            delay(2000, function() {
                message.innerHTML = "1...";
            }, this);
            delay(3000, function() {
                message.innerHTML = "boom";
            }, this);
            delay(3000, this.blowStuffUp, this);
            this.nextBomb = this.bombShowDelay;
        },
        blowStuffUp: function() {
            this.game.bulletManager.updateEnemyIndex();
            var index = this.game.bulletManager.enemyIndex;
            for (var i = 0, el;
                (el = index[i]) && i < 10; i++) {
                var rect = getRect(el);
                var center = new Vector(rect.left + rect.width / 2, rect.top + rect.height / 2);
                this.game.explosionManager.addExplosion(center, el, MegaParticleExplosion);
                el.parentNode.removeChild(el);
            }
            this.nextBomb = this.bombShowDelay;
        },
        isReady: function() {
            return this.nextBomb === -1;
        }
    });
    var ELEMENTSTHATARENOTTOBEINCLUDED = ['BR', 'SCRIPT', 'STYLE', 'TITLE', 'META', 'HEAD', 'OPTION', 'OPTGROUP', 'LINK'];
    var ELEMENTSIZETHRESHOLD = 5;
    var BulletManager = new Class({
        initialize: function() {
            this.lastBlink = 0;
            this.blinkActive = false;
            this.enemyIndex = [];
            this.updateDelay = 2.5;
            this.nextUpdate = this.updateDelay;
        },
        update: function(tdelta) {
            if (this.game.isKeyPressed('B')) {
                this.blink();
            } else if (this.blinkActive) {
                this.endBlink();
            }
            this.nextUpdate -= tdelta;
            if (this.nextUpdate < 0) {
                this.updateEnemyIndex();
            }
        },
        blink: function() {
            if (now() - this.lastBlink > 250) {
                for (var i = 0, el; el = this.enemyIndex[i]; i++) {
                    if (!this.blinkActive)
                        el.style.outline = '1px solid red';
                    else
                        el.style.outline = el.KICKASSOLDBORDER;
                }
                this.blinkActive = !this.blinkActive;
                this.lastBlink = now();
                if (!this.blinkActive) {
                    this.updateEnemyIndex();
                }
            }
        },
        endBlink: function() {
            for (var i = 0, el; el = this.enemyIndex[i]; i++)
                el.style.outline = el.KICKASSOLDBORDER;
            this.lastBlink = 0;
            this.blinkActive = false;
        },
        updateEnemyIndex: function() {
            var all = document.getElementsByTagName('*');
            this.enemyIndex = [];
            for (var i = 0, el; el = all[i]; i++) {
                if (this.isDestroyable(el)) {
                    this.enemyIndex.push(el);
                    el.KICKASSOLDBORDER = el.style.outline || (document.defaultView.getComputedStyle(el, null).outline);
                }
            }
            this.nextUpdate = this.updateDelay;
        },
        isDestroyable: function(element, ignoreSize) {
            if (this.shouldIgnoreElement(element, ignoreSize))
                return false;
            for (var i = 0, child; child = element.childNodes[i]; i++) {
                if (child.nodeType === 1 && ELEMENTSTHATARENOTTOBEINCLUDED.indexOf(child.tagName) === -1 && (child.offsetWidth >= ELEMENTSIZETHRESHOLD && child.offsetHeight >= ELEMENTSIZETHRESHOLD) && document.defaultView.getComputedStyle(child, null).visibility !== 'hidden') {
                    return false;
                }
            }
            return true;
        },
        isDestroyableFromCollision: function(element) {
            return this.isDestroyable(element, true);
        },
        shouldIgnoreElement: function(element, ignoreSize) {
            if (element.nodeType !== 1)
                return true;
            if (element == document.documentElement || element == document.body)
                return true;
            if (ELEMENTSTHATARENOTTOBEINCLUDED.indexOf(element.tagName) !== -1)
                return true;
            if (element.style.visibility == 'hidden' || element.style.display == 'none')
                return true;
            if (typeof element.className == "string" && element.className.indexOf('KICKASSELEMENT') != -1)
                return true;
            if (!ignoreSize) {
                if (element.offsetWidth < ELEMENTSIZETHRESHOLD || element.offsetHeight < ELEMENTSIZETHRESHOLD)
                    return true;
            }
            var rect;
            if (element.offsetLeft < 0 || element.offsetTop < 0) {
                rect = getRect(element);
                if (rect.left + rect.width < 0 || rect.top + rect.height < 0)
                    return true;
            }
            if (!rect)
                rect = getRect(element);
            if (rect.top >= this.game.scrollSize.y)
                return true;
            return false;
        },
        destroy: function() {
            for (var key in this.bullets)
                if (this.bullets.hasOwnProperty(key))
                    for (var i = 0, bullet; bullet = this.bullets[key][i]; i++)
                        bullet.destroy();
            this.bullets = {};
        }
    });
    var SessionManager = new Class({
        initialize: function() {
            this.isPlaying = false;
        },
        update: function(tdelta) {
            if (this.isPlaying && this.game.bulletManager.enemyIndex.length == 0) {
                this.weHaveWon();
            }
        },
        weHaveWon: function() {
            this.isPlaying = false;
            this.game.ui.showMessage("You're done!");
        }
    });
    var AlienManager = Class({
        initialize: function() {
            this.aliens = [];
        },
        update: function(tdelta) {
            if (!this.aliens.length)
                return;
            for (var i = 0, alien; alien = this.aliens[i]; i++) {
                alien.update(tdelta);
                alien.render();
            }
        }
    });
    var alienImage = (function() {
        var image = new Image();
        image.src = GameGlobals.path("css/gfx/kickass/alien.png");
        return image;
    });
    var alienSize = {
        w: 41,
        h: 30
    };
    var Alien = new Class({
        initialize: function() {
            this.pos = new Vector(100, 100);
            this.sprite = new Sheet(new Rect(this.pos.x, this.pos.y, alienSize.w, alienSize.h));
        },
        update: function(tdelta) {},
        render: function() {}
    });
    var ExplosionManager = new Class({
        initialize: function() {
            this.explosions = [];
        },
        update: function(tdelta) {
            var time = now();
            for (var i = 0, explosion; explosion = this.explosions[i]; i++) {
                if (time - explosion.bornAt > (explosion.ttl || 500)) {
                    explosion.destroy();
                    this.explosions.splice(i, 1);
                    continue;
                }
                explosion.update(tdelta);
            }
        },
        addExplosion: function(pos, forElement, explosionClass) {
            explosionClass = explosionClass || ParticleExplosion;
            var explosion = new explosionClass(pos, forElement);
            explosion.game = this.game;
            explosion.checkBounds();
            this.explosions.push(explosion);
        },
        destroy: function() {
            for (var i = 0, explosion; explosion = this.explosions[i]; i++)
                explosion.destroy();
            this.explosions = [];
        }
    });
    var Cannon = new Class({
        initialize: function(x, y, angle) {
            this.pos = new Vector(x, y);
            this.angle = angle || 0;
        },
        shootPressed: function() {},
        shootReleased: function() {},
        checkCollisions: function() {},
        getExplosionClass: function() {
            return ParticleExplosion;
        },
        update: function(tdelta) {
            this.game.hideAll();
            this.checkCollisions(tdelta);
            this.game.showAll();
        },
        checkCollision: function(bullet) {
            var hit = bullet.checkCollision();
            if (!hit)
                return false;
            this.game.explosionManager.addExplosion(bullet.pos, hit, this.getExplosionClass());
            if (!hit.isShot) {
                hit.parentNode.removeChild(hit);
            }
            GameGlobals.stats.addElementsDestroyed();
            return true;
        },
        createBullet: function(bulletClass) {
            var pos = this.getABulletPos();
            var dir = this.getABulletDir();
            var bullet = new bulletClass(pos, dir);
            bullet.game = this.game;
            bullet.manager = this;
            bullet.initCanvas();
            bullet.vel.add(bullet.vel.cp().setLength(this.player.vel.len()));
            return bullet;
        },
        getABulletPos: function() {
            return this.player.pos.cp().add(this.pos.cp().rotate(this.player.dir.angle() + Math.PI / 2));
        },
        getABulletDir: function() {
            return this.player.dir.cp().rotate(this.angle);
        },
        destroy: function() {}
    });
    var LaserCannon = new Class({
        Extends: Cannon,
        initialize: function(x, y, angle) {
            Cannon.prototype.initialize.apply(this, arguments);
            this.lasers = [];
        },
        getExplosionClass: function() {
            return SplitExplosion;
        },
        update: function(tdelta) {
            if (!this.lasers.length)
                return;
            this.removeOld();
            Cannon.prototype.update.call(this, tdelta);
        },
        checkCollisions: function(tdelta) {
            for (var i = 0, laser; laser = this.lasers[i]; i++) {
                laser.update(tdelta);
                if (this.checkCollision(laser)) {}
            }
        },
        removeOld: function() {
            for (var i = 0, laser; laser = this.lasers[i]; i++) {
                if (laser.outOfBounds) {
                    laser.destroy();
                    this.lasers.splice(i, 1);
                }
            }
        },
        shootPressed: function() {
            if (this.lasers.length > 5)
                return;
            if (now() - this.lastFired < 500)
                return;
            this.lastFired = now();
            GameGlobals.stats.addShotFired();
            this.lasers.push(this.createBullet(LaserBullet));
        },
        destroy: function() {
            if (this.lasers.length) {
                for (var i = 0, laser; laser = this.lasers[i]; i++)
                    laser.destroy();
                this.lasers = [];
            }
        }
    });
    var BallCannon = new Class({
        Extends: Cannon,
        initialize: function() {
            Cannon.prototype.initialize.apply(this, arguments);
            this.lastFired = 0;
            this.bullets = [];
        },
        getExplosionClass: function() {
            return ParticleExplosion;
        },
        update: function(tdelta) {
            if (!this.bullets.length)
                return;
            this.removeOld();
            Cannon.prototype.update.call(this, tdelta);
        },
        removeOld: function() {
            var time = now();
            for (var i = 0, bullet; bullet = this.bullets[i]; i++) {
                if (time - bullet.bornAt > 2000) {
                    bullet.destroy();
                    this.bullets.splice(i, 1);
                }
            }
        },
        checkCollisions: function(tdelta) {
            for (var i = 0, bullet; bullet = this.bullets[i]; i++) {
                bullet.update(tdelta);
                if (this.checkCollision(bullet)) {
                    bullet.destroy();
                    this.bullets.splice(i, 1);
                }
            }
        },
        shootPressed: function() {
            if (now() - this.lastFired < 200)
                return;
            this.lastFired = now();
            this.addBullet();
            GameGlobals.stats.addShotFired();
        },
        addBullet: function() {
            if (this.bullets.length > 7) {
                this.bullets[0].destroy();
                this.bullets.shift();
            }
            var bullet = this.createBullet(Bullet);
            this.bullets.push(bullet);
        },
        destroy: function() {
            for (var i = 0, bullet; bullet = this.bullets[i]; i++) {
                bullet.destroy();
            }
            this.bullets = [];
        }
    });
    var Bullet = new Class({
        initialize: function(pos, dir) {
            this.pos = pos.cp();
            this.dir = dir;
            this.vel = new Vector(500, 500);
            this.bornAt = now();
        },
        initCanvas: function() {
            this.sheet = new Sheet(new Rect(this.pos.x, this.pos.y, 5, 5));
            this.sheet.drawBullet();
        },
        draw: function() {
            this.sheet.setPosition(this.pos);
        },
        update: function(tdelta) {
            this.pos.add(this.vel.setAngle(this.dir.angle()).mulNew(tdelta));
            this.checkBounds();
            this.draw();
        },
        checkCollision: function() {
            var element = document.elementFromPoint(this.pos.x, this.pos.y);
            if (element && element.nodeType == 3)
                element = element.parentNode;
            var didFind = element && this.game.bulletManager.isDestroyableFromCollision(element) ? element : false;
            return didFind;
        },
        checkBounds: function() {
            var w = this.game.windowSize.width;
            var h = this.game.windowSize.height;
            var rightBound = this.pos.x + this.sheet.rect.size.width / 2;
            var bottomBound = this.pos.y + this.sheet.rect.size.height / 2;
            if (rightBound > w)
                this.pos.x = 0;
            else if (this.pos.x < 0)
                this.pos.x = w - this.sheet.rect.size.width / 2;
            if (bottomBound > h)
                this.pos.y = 0;
            else if (this.pos.y < 0)
                this.pos.y = h - this.sheet.rect.size.height / 2;
        },
        destroy: function() {
            this.sheet.destroy();
        }
    });
    var LaserBullet = new Class({
        Extends: Bullet,
        initialize: function() {
            Bullet.prototype.initialize.apply(this, arguments);
            this.vel = new Vector(750, 750);
            this.lastDrawPos = this.pos.cp();
        },
        initCanvas: function() {
            var s = Math.max(GameGlobals.laserImage.width, GameGlobals.laserImage.height);
            this.sheet = new Sheet(new Rect(0, 0, s, s));
        },
        update: function(tdelta) {
            Bullet.prototype.update.apply(this, arguments);
        },
        draw: function() {
            this.sheet.drawLaser(this.pos, this.dir);
            this.lastDrawPos = this.pos.cp();
        },
        checkBounds: function() {
            var w = this.game.windowSize.width;
            var h = this.game.windowSize.height;
            var rightBound = this.pos.x + this.sheet.rect.size.width / 2;
            var bottomBound = this.pos.y + this.sheet.rect.size.height / 2;
            if (rightBound > w || this.pos.x < 0)
                this.outOfBounds = true;
            if (bottomBound > h || this.pos.y < 0)
                this.outOfBounds = true;
        },
        destroy: function() {
            this.sheet.destroy();
        }
    });
    GameGlobals.laserImage = document.createElement('img');
    GameGlobals.laserImage.src = GameGlobals.path('css/gfx/kickass/laser.png');
    var Explosion = new Class({
        initialize: function(pos, element) {
            this.bornAt = now();
            this.pos = pos.cp();
        },
        update: function(tdelta) {},
        checkBounds: function() {},
        destroy: function() {}
    });
    var ParticleExplosion = new Class({
        Extends: Explosion,
        initialize: function(pos, element) {
            Explosion.prototype.initialize.apply(this, arguments);
            this.particleVel = new Vector(150, 0);
            this.particles = [];
            this.generateParticles();
            this.sheet = new Sheet(new Rect(pos.x, pos.y, 250, 250));
        },
        update: function(tdelta) {
            for (var i = 0, particle; particle = this.particles[i]; i++)
                particle.pos.add(particle.vel.mulNew(tdelta).mul(random(0.5, 1.0)).setAngle(particle.dir.angle()));
            this.sheet.clear();
            this.sheet.drawExplosion(this.particles);
        },
        generateParticles: function() {
            for (var i = 0, j = !GameGlobals.hasCanvas ? 10 : 40; i < j; i++) {
                this.particles.push({
                    dir: (new Vector(random(0, 20) - 10, random(0, 20) - 10)).normalize(),
                    vel: this.particleVel.cp(),
                    pos: new Vector(0, 0),
                    color: ['yellow', 'red'][random(0, 1)]
                });
            }
        },
        checkBounds: function() {
            var right = this.sheet.rect.getRight();
            var bottom = this.sheet.rect.getBottom();
            var w = this.game.windowSize.width;
            var h = this.game.windowSize.height;
            if (right > w)
                this.pos.x -= right - w;
            if (bottom > h)
                this.pos.y -= bottom - h;
            this.sheet.setPosition(this.pos);
        },
        destroy: function() {
            this.sheet.destroy();
        }
    });
    var MegaParticleExplosion = new Class({
        Extends: ParticleExplosion,
        initialize: function(pos, element) {
            Explosion.prototype.initialize.apply(this, arguments);
            this.particleVel = new Vector(200, 0);
            this.particles = [];
            this.generateParticles();
            this.sheet = new Sheet(new Rect(pos.x, pos.y, 500, 500));
            this.ttl = 2000;
            this.generationDelay = 0.6;
            this.generationTimes = 2;
            this.nextGenerate = this.generationDelay;
        },
        update: function(tdelta) {
            this.nextGenerate -= tdelta;
            if (this.nextGenerate <= 0 && this.generationTimes > 0) {
                this.nextGenerate = this.generationDelay;
                this.generateParticles();
                this.generationTimes--;
            }
            ParticleExplosion.prototype.update.call(this, tdelta);
        }
    });
    var SplitExplosion = new Class({
        Extends: Explosion,
        initialize: function(pos, element) {
            if (!element) return;
            Explosion.prototype.initialize.apply(this, arguments);
            this.element = element;
            this.fx = new Fx();
            this.fx.addListener(this);
            this.start();
        },
        update: function(tdelta) {
            if (!this.element) return;
            this.fx.update();
        },
        set: function(key, value) {
            if (key == 'opacity') {}
        },
        start: function() {
            var pieces = this.createClones();
            var left = pieces[0],
                right = pieces[1];
            var lT = 'rotate(-' + random(30, 50) + 'deg) translate(-100px, 40px)';
            var rT = 'rotate(' + random(30, 50) + 'deg) translate(100px, 40px)';
            setStyles(left, {
                'WebkitTransform': lT,
                'MozTransform': lT,
                'OTransform': lT,
                'MsTransform': lT
            });
            setStyles(right, {
                'WebkitTransform': rT,
                'MozTransform': rT,
                'OTransform': rT,
                'MsTransform': rT
            });
            this.left = left;
            this.right = right;
            this.fx.add('opacity', {
                start: 1,
                end: 0.5,
                duration: 500
            });
        },
        createClones: function() {
            var coords = getRect(this.element);
            var leftContainer = this.createContainer(coords);
            var rightContainer = this.createContainer(coords);
            var left = cloneElement(this.element);
            var right = cloneElement(this.element);
            addClass(left, 'KICKASSELEMENT');
            addClass(right, 'KICKASSELEMENT');
            var styles = {
                margin: 0,
                overflow: 'hidden'
            };
            setStyles(left, styles);
            setStyles(right, styles);
            leftContainer.appendChild(left);
            rightContainer.appendChild(right);
            rightContainer.style.left = coords.left + coords.width / 2 + 'px';
            rightContainer.scrollLeft += coords.width / 2;
            this.element.style.opacity = 0;
            this.element.style.visibility = 'hidden';
            this.element.style.display = 'none';
            return each([leftContainer, rightContainer], function(el) {
                el.style.WebkitTransition = '-webkit-transform 500ms ease-in';
                el.style.OTransition = '-o-transform 500ms ease-in';
                el.style.MozTransition = '-moz-transform 500ms ease-in';
                el.style.MsTransition = '-ms-transform 500ms ease-in';
            });
        },
        createContainer: function(coords) {
            var ret = document.createElement('div');
            setStyles(ret, {
                position: 'absolute',
                left: coords.left,
                top: coords.top,
                width: coords.width * 0.5,
                height: coords.height,
                overflow: 'hidden'
            });
            document.body.appendChild(ret);
            return ret;
        },
        destroy: function() {
            try {
                this.left.parentNode.removeChild(this.left);
                this.right.parentNode.removeChild(this.right);
                this.element.parentNode.removeChild(this.element);
            } catch (e) {}
        }
    });
    var Weapons = {
        1: {
            name: 'Cannon',
            id: 'cannon',
            cannonClass: BallCannon
        },
        2: {
            name: 'Laser',
            id: 'laser',
            cannonClass: LaserCannon
        }
    };
    var WeaponMap = {
        'cannon': Weapons[1],
        'laser': Weapons[2]
    };
    var SheetRaphael = new Class({
        initialize: function(rect) {
            this.rect = rect;
            this.fillColor = 'black';
            this.strokeColor = 'black';
            this.lineWidth = 1.0;
            this.polyString = '';
            this.raphael = Raphael(this.rect.pos.x - this.rect.size.width / 2, this.rect.pos.y - this.rect.size.height / 2, this.rect.size.width, this.rect.size.height);
            this.raphael.canvas.style.zIndex = '10000';
            this.raphael.canvas.className = 'KICKASSELEMENT';
            GameGlobals.kickass.registerElement(this.raphael.canvas);
        },
        tracePoly: function(verts) {
            if (!verts[0]) return;
            this.polyString = 'M' + verts[0].x + ' ' + verts[0].y;
            for (var i = 0; i < verts.length; i++)
                this.polyString += 'L' + verts[i].x + ' ' + verts[i].y;
        },
        setAngle: function(angle) {
            this.angle = angle;
        },
        updateCanvas: function() {
            this.raphael.canvas.width = this.rect.size.width;
            this.raphael.canvas.height = this.rect.size.height;
            this.raphael.canvas.style.left = GameGlobals.kickass.scrollPos.x + (this.rect.pos.x - this.rect.size.width / 2) + 'px';
            this.raphael.canvas.style.top = GameGlobals.kickass.scrollPos.y + (this.rect.pos.y - this.rect.size.height / 2) + 'px';
        },
        drawLine: function(xFrom, yFrom, xTo, yTo) {
            this.tracePoly([
                [xFrom, yFrom],
                [xTo, yTo]
            ]);
            this.strokePath();
        },
        drawCircle: function(radius, pos) {
            pos = pos || {
                x: 0,
                y: 0
            };
            this.currentElement = this.raphael.circle(pos.x, pos.y, radius);
            this.currentElement.attr('fill', this.fillColor);
        },
        setFillColor: function(color) {
            this.fillColor = color;
        },
        setStrokeColor: function(color) {
            this.strokeColor = color;
        },
        setLineWidth: function(width) {
            this.lineWidth = width;
        },
        fillPath: function() {
            this.currentElement = this.raphael.path(this.polyString);
            this.currentElement.translate(this.rect.size.width / 2, this.rect.size.height / 2);
            this.currentElement.attr('fill', this.fillColor);
            this.currentElement.attr('stroke', this.fillColor);
            this.currentElement.rotate(Raphael.deg(this.angle), this.rect.size.width / 2, this.rect.size.height / 2);
        },
        strokePath: function() {
            this.currentElement = this.raphael.path(this.polyString);
            this.currentElement.attr('stroke', this.strokeColor);
            this.currentElement.attr('stroke-width', this.lineWidth);
            this.currentElement.translate(this.rect.size.width / 2, this.rect.size.height / 2);
            this.currentElement.rotate(Raphael.deg(this.angle), this.rect.size.width / 2, this.rect.size.height / 2);
        },
        clear: function() {
            this.raphael.clear();
        },
        destroy: function() {
            GameGlobals.kickass.unregisterElement(this.raphael.canvas);
            this.raphael.remove();
        }
    });
    var SheetCanvas = new Class({
        initialize: function(rect) {
            this.canvas = document.createElement('canvas');
            this.canvas.className = 'KICKASSELEMENT';
            with(this.canvas.style) {
                position = 'absolute';
                zIndex = '1000000';
            }
            GameGlobals.kickass.registerElement(this.canvas);
            if (this.canvas.getContext)
                this.ctx = this.canvas.getContext('2d');
            this.rect = rect;
            this.angle = 0;
            this.updateCanvas();
            document.body.appendChild(this.canvas);
        },
        tracePoly: function(verts) {
            if (!verts[0]) return;
            this.ctx.save();
            this.ctx.translate(this.rect.size.width / 2, this.rect.size.height / 2);
            this.ctx.rotate(this.angle);
            this.ctx.beginPath();
            this.ctx.moveTo(verts[0].x, verts[0].y);
            for (var i = 0; i < verts.length; i++) {
                this.ctx.lineTo(verts[i].x, verts[i].y);
            }
            this.ctx.restore();
        },
        setAngle: function(angle) {
            this.angle = angle;
        },
        updateCanvas: function() {
            if (this.canvas.width != this.rect.size.width)
                this.canvas.width = this.rect.size.width;
            if (this.canvas.height != this.rect.size.height)
                this.canvas.height = this.rect.size.height;
            this.canvas.style.left = GameGlobals.kickass.scrollPos.x + (this.rect.pos.x - this.rect.size.width / 2) + 'px';
            this.canvas.style.top = GameGlobals.kickass.scrollPos.y + (this.rect.pos.y - this.rect.size.height / 2) + 'px';
        },
        drawLine: function(xFrom, yFrom, xTo, yTo) {
            this.ctx.save();
            this.ctx.translate(this.rect.size.width / 2, this.rect.size.height / 2);
            this.ctx.beginPath();
            this.ctx.moveTo(xFrom, yFrom);
            this.ctx.lineTo(xTo, yTo);
            this.ctx.closePath();
            this.ctx.stroke();
            this.ctx.restore();
        },
        drawCircle: function(radius, pos) {
            pos = pos || {
                x: 0,
                y: 0
            };
            this.ctx.save();
            this.ctx.translate(this.rect.size.width / 2, this.rect.size.height / 2);
            if (pos)
                this.ctx.translate(pos.x, pos.y);
            this.ctx.beginPath();
            this.ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
            this.ctx.fill();
            this.ctx.closePath();
            this.ctx.restore();
        },
        drawRect: function(x, y, w, h) {
            this.ctx.save();
            this.ctx.translate(this.rect.size.width / 2, this.rect.size.height / 2);
            this.ctx.translate(x, y);
            this.ctx.fillRect(x, y, w, h);
            this.ctx.restore();
            this.ctx.fill();
        },
        drawImageFull: function(image) {
            this.ctx.drawImage(image, 0, 0, this.rect.size.width, this.rect.size.height);
        },
        drawImage: function(image, x, y) {
            this.ctx.save();
            this.ctx.translate(this.rect.size.width / 2 + x, this.rect.size.height / 2 + y);
            this.ctx.rotate(this.angle);
            this.ctx.drawImage(image, 0, -11);
            this.ctx.restore();
        },
        setFillColor: function(color) {
            this.ctx.fillStyle = color;
        },
        setStrokeColor: function(color) {
            this.ctx.strokeStyle = color;
        },
        setLineWidth: function(width) {
            this.ctx.lineWidth = width;
        },
        fillPath: function() {
            this.ctx.fill();
        },
        strokePath: function() {
            this.ctx.stroke();
        },
        clear: function() {
            this.ctx.clearRect(0, 0, this.rect.size.width, this.rect.size.height);
        },
        destroy: function() {
            GameGlobals.kickass.unregisterElement(this.canvas);
            this.canvas.parentNode.removeChild(this.canvas);
        }
    });
    var Sheet = new Class({
        initialize: function(rect) {
            this.rect = rect;
            if (!GameGlobals.hasCanvas)
                this.drawer = new SheetRaphael(rect);
            else
                this.drawer = new SheetCanvas(rect);
        },
        clear: function() {
            this.drawer.clear();
        },
        setPosition: function(pos) {
            this.rect.pos = pos.cp();
            this.drawer.rect = this.rect;
            this.drawer.updateCanvas();
        },
        setAngle: function(angle) {
            this.drawer.setAngle(angle);
        },
        drawPlayer: function(verts) {
            this.drawer.setFillColor('white');
            this.drawer.setStrokeColor('black');
            this.drawer.setLineWidth(1.5);
            this.drawer.tracePoly(verts);
            this.drawer.fillPath();
            this.drawer.tracePoly(verts);
            this.drawer.strokePath();
        },
        drawBrokenPlayer: function(verts, lineOffsets) {
            this.drawer.setStrokeColor('black');
            this.drawer.setLineWidth(1.5);
            for (var i = 1, vert, lastVert = verts[0]; vert = verts[i]; i++, lastVert = vert) {
                var o = lineOffsets[i - 1];
                this.drawer.drawLine(lastVert.x + o.pos.x, lastVert.x + o.pos.y, vert.x + o.pos.x, vert.y + o.pos.y);
            }
        },
        drawFlames: function(flames, angle) {
            this.drawer.setLineWidth(1.5);
            this.drawer.setFillColor('red');
            this.drawer.tracePoly(flames.r);
            this.drawer.fillPath();
            this.drawer.setFillColor('yellow');
            this.drawer.tracePoly(flames.y);
            this.drawer.fillPath();
        },
        drawBullet: function() {
            this.drawer.setFillColor(GameGlobals.bulletColor);
            this.drawer.drawCircle(2.5);
        },
        drawExplosion: function(particles) {
            for (var i = 0, particle; particle = particles[i]; i++) {
                this.drawer.setFillColor(particle.color);
                this.drawer.drawRect(particle.pos.x, particle.pos.y, 3, 3);
            }
        },
        drawFace: function(face) {
            this.drawer.drawImageFull(face);
        },
        drawLaser: function(pos, dir) {
            this.clear();
            this.setPosition(pos);
            this.drawer.setAngle(dir.angle());
            this.drawer.drawImage(GameGlobals.laserImage, 0, 0);
        },
        transformToSheetCoordinates: function(vec) {
            var ret = vec.cp().sub(new Vector(this.rect.size.width / 2, this.rect.size.height / 2));
            return ret;
        },
        destroy: function() {
            this.drawer.destroy();
        }
    });
    var initKickAss = function() {
        // If an instance of KickAss is already present, we add a player
        if (!window.KICKASSGAME) {
            window.KICKASSGAME = GameGlobals.kickass = new KickAss();
            window.KICKASSGAME.begin();
        } else
            window.KICKASSGAME.addPlayer();
    };

    initKickAss();
})(typeof exports != 'undefined' ? exports : window);