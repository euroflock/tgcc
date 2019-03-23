/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(3);
	__webpack_require__(5);
	__webpack_require__(2);
	__webpack_require__(4);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(9);
	module.exports = __webpack_require__(8);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var ClientApp = __webpack_require__(2).ClientApp;

	(function AppEntryPoint() {
	    window.clientApp = new ClientApp();
	    clientApp.run();
	})();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	var Utils = __webpack_require__(3);
	var EventDriven = __webpack_require__(4).EventDriven;
	var Chart = __webpack_require__(5).Chart;
	var MainView = __webpack_require__(9).MainView;

	var ClientApp = function () {
		this.device = null;
	    this.mainView = null;
		this.chartsData = null;
	};

	Utils.extend(ClientApp, EventDriven);

	ClientApp.prototype.run = function () {
		Utils.getElement('body').innerHTML = '';
		Utils.getElement('title').innerText = "TELEGRAM CONTEST CHARTS";

		Utils.on('body', 'contextmenu', function (e) {
	        Utils.no(e, true);
		});
		
		try { 
			document.createEvent("TouchEvent"); 
			this.device = 'touch'; 
		} catch(e) { 
			this.device = 'mouse'; 
		}

		this.fetchRemoteData(function (data) {
			this.chartsData = data;
			this.mainView = new MainView({
				app: this,
				className: 'charts-container',
				appendTo: Utils.getElement('body')
			});
		
			for (var i = 1; i <= (this.chartsData.length); i++) {
				var id = 'chart' + i;
				this[id] = new Chart({
					id: id, 
					title: "Chart " + i,
					app: this,
					chartData: this.chartsData[i - 1],
					appendTo: this.mainView
				});
			}

			window.onresize = function () {
				this.onViewResize();
			}.bind(this);
		}.bind(this));
	};

	ClientApp.prototype.onViewResize = function () {
		this.trigger('resize');
	};

	ClientApp.prototype.fetchRemoteData = function (fetchRemoteDataCallback) {
		Utils.remoteRequest('/tgcc/chart_data.json', function (json_string) {
			var t, i, temps, temp, remote_data, chart, keys, key, data, name;
			var week = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
			var month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
			try {
				temps = JSON.parse(json_string);
				remote_data = [];
				for (t in temps) {
					temp = temps[t];
					chart = {
						lines: {},
						names: temp.names,
						actives: [],
						keys: Object.keys(temp.names),
						colors: temp.colors
					};
					if (temp.names) {
						keys = Object.keys(temp.columns);
						for (i in keys) {
							key = keys[i];
							data = temp.columns[key];
							name = data[0];
							data.shift();
							if (name === 'x') {
								data = data.map(function (v) {
									var d = new Date(v);
									return week[d.getDay()] + ', ' + month[d.getMonth()] + ' ' + d.getDate();
								});
							}
							data.push(null);
							chart.lines[name] = data;
							chart.actives[name] = true;
						}
					}
					remote_data.push(chart);
				}
			} catch (e) {
				remote_data = null;
			}
			fetchRemoteDataCallback(remote_data);
		});
	};

	exports.ClientApp = ClientApp;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	//----------
	// CanvasRenderingContext2D.prototype upgrade
	//----------
	var CanvasRenderingContext2D_prototype_moveTo = CanvasRenderingContext2D.prototype.moveTo;
	var CanvasRenderingContext2D_prototype_lineTo = CanvasRenderingContext2D.prototype.lineTo;
	var CanvasRenderingContext2D_prototype_fillRect = CanvasRenderingContext2D.prototype.fillRect;
	var CanvasRenderingContext2D_prototype_strokeRect = CanvasRenderingContext2D.prototype.strokeRect;
	var CanvasRenderingContext2D_prototype_rect = CanvasRenderingContext2D.prototype.rect;
	var CanvasRenderingContext2D_prototype_clearRect = CanvasRenderingContext2D.prototype.clearRect;

	CanvasRenderingContext2D.prototype.moveTo = function (x, y) {
	    x = x > 0 ? ~~(x) : x;
	    y = y > 0 ? ~~(y) : y;
	    if (this.lineWidth % 2 !== 0) {
	        x += 0.5;
	        y += 0.5;
	    }
	    CanvasRenderingContext2D_prototype_moveTo.apply(this, arguments);
	};

	CanvasRenderingContext2D.prototype.lineTo = function (x, y) {
	    x = x > 0 ? ~~(x) : x;
	    y = y > 0 ? ~~(y) : y;
	    if (this.lineWidth % 2 !== 0) {
	        x += 0.5;
	        y += 0.5;
	    }
	    CanvasRenderingContext2D_prototype_lineTo.apply(this, arguments);
	};

	CanvasRenderingContext2D.prototype.fillRect = function (x, y, w, h) {
	    x = ~~(x);
	    y = ~~(y);
	    w = ~~(w);
	    h = ~~(h);
	    CanvasRenderingContext2D_prototype_fillRect.apply(this, arguments);
	};

	CanvasRenderingContext2D.prototype.strokeRect = function (x, y, w, h) {
	    x = ~~(x);
	    y = ~~(y);
	    w = ~~(w);
	    h = ~~(h);
	    CanvasRenderingContext2D_prototype_strokeRect.apply(this, arguments);
	};

	CanvasRenderingContext2D.prototype.rect = function (x, y, w, h) {
	    x = ~~(x);
	    y = ~~(y);
	    w = ~~(w);
	    h = ~~(h);
	    CanvasRenderingContext2D_prototype_rect.apply(this, arguments);
	};

	/** 
	 * Draws a rounded rectangle using the current state of the canvas.  
	 * If you omit the last three params, it will draw a rectangle  
	 * outline with a 5 pixel border radius  
	 * @param {Number} x The top left x coordinate 
	 * @param {Number} y The top left y coordinate  
	 * @param {Number} width The width of the rectangle  
	 * @param {Number} height The height of the rectangle 
	 * @param {Object} radius All corner radii. Defaults to 0,0,0,0; 
	 * @param {Boolean} fill Whether to fill the rectangle. Defaults to false. 
	 * @param {Boolean} stroke Whether to stroke the rectangle. Defaults to true. 
	 */
	CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius, fill, stroke) {
	    var cornerRadius = { upperLeft: 0, upperRight: 0, lowerLeft: 0, lowerRight: 0 };
	    if (typeof stroke == "undefined") {
	        stroke = true;
	    }
	    var side;
	    if (typeof radius === "object") {
	        for (side in radius) {
	            cornerRadius[side] = radius[side];
	        }
	    }
	    if (typeof radius === "number") {
	        for (side in cornerRadius) {
	            cornerRadius[side] = radius;
	        }
	    }

	    this.beginPath();
	    this.moveTo(x + cornerRadius.upperLeft, y);
	    this.lineTo(x + width - cornerRadius.upperRight, y);
	    this.quadraticCurveTo(x + width, y, x + width, y + cornerRadius.upperRight);
	    this.lineTo(x + width, y + height - cornerRadius.lowerRight);
	    this.quadraticCurveTo(x + width, y + height, x + width - cornerRadius.lowerRight, y + height);
	    this.lineTo(x + cornerRadius.lowerLeft, y + height);
	    this.quadraticCurveTo(x, y + height, x, y + height - cornerRadius.lowerLeft);
	    this.lineTo(x, y + cornerRadius.upperLeft);
	    this.quadraticCurveTo(x, y, x + cornerRadius.upperLeft, y);
	    this.closePath();
	    if (stroke) {
	        this.stroke();
	    }
	    if (fill) {
	        this.fill();
	    }
	};

	CanvasRenderingContext2D.prototype.clearRect = function (x, y, w, h) {
	    x = ~~(x);
	    y = ~~(y);
	    w = ~~(w);
	    h = ~~(h);
	    CanvasRenderingContext2D_prototype_clearRect.apply(this, arguments);
	};

	//----------
	// Cross-browser requestAnimationFrame
	//----------
	if (!window.requestAnimationFrame) {
	    window.requestAnimationFrame = (function() {
	        return window.webkitRequestAnimationFrame ||
	            window.mozRequestAnimationFrame ||
	            window.oRequestAnimationFrame ||
	            window.msRequestAnimationFrame ||
	            function(callback, element) {
	                var currTime = new Date().getTime();
	                var timeToCall = Math.max(0, 16 - (currTime - (typeof lastTime != 'undefined' ? lastTime : 0)));
	                var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
	                lastTime = currTime + timeToCall;
	                return id;
	            };
	    })();
	}

	//----------
	// Cross-browser cancelAnimationFrame
	//----------
	if (!window.cancelAnimationFrame) {
	    window.cancelAnimationFrame = function (id) {
	        clearTimeout(id);
	    };
	}

	//----------
	// IE11 NodeList.forEach (nodes collection iterator)
	//----------
	if ('NodeList' in window && !NodeList.prototype.forEach) {
		NodeList.prototype.forEach = function (callback, givenArguments) {
			givenArguments = givenArguments || window;
			for (var i = 0; i < this.length; i++) {
				callback.call(givenArguments, this[i], i, this);
			}
		};
	}

	exports.inherit = function (Child, Parent) {
	    if (!Child) throw 'Inherit - child undefined!';
	    if (!Parent) throw 'Inherit - parent undefined!';
	    var childProto = Child.prototype,
	        i, desc;
	    Child.prototype = Object.create(Parent.prototype);
	    var props = Object.getOwnPropertyNames(childProto);
	    for (i = props.length; i--;) {
	        if (childProto.hasOwnProperty(props[i])) {
	            desc = Object.getOwnPropertyDescriptor(childProto, props[i]);
	            Object.defineProperty(Child.prototype, props[i], desc);
	        }
	    }
	    Child.prototype.constructor = Child;
	    Child.superclass = Parent.prototype;
	};

	exports.extend = function extend(clazz, trait, isDirect) {
	    if (!clazz) throw 'Extend - class undefined!';
	    if (!trait) throw 'Extend - trait undefined!';
	    var from = trait,
	        to = isDirect ? clazz : clazz.prototype;
	    if (trait.prototype) extend(clazz, trait.prototype, isDirect);
	    for (var prop in from) {
	        var descriptor = Object.getOwnPropertyDescriptor(from, prop);
	        if (!descriptor) continue;
	        Object.defineProperty(to, prop, descriptor);
	    }
	};

	exports.no = function (e, bubbles) {
		/// <summary>Prevent Default Events</summary>
		/// <param name="e" type="Event">Event</param>
		/// <param name="bubbles" type="Boolean">Cancel Bubbles and Stop Propagation</param>
	    if (typeof e.preventDefault !== 'undefined') e.preventDefault();
	    if (typeof e.returnValue !== 'undefined') e.returnValue = false;
	    if (bubbles === true) {
	        if (typeof e.stopPropagation !== 'undefined') e.stopPropagation();
	        if (typeof e.cancelBubble !== 'undefined') e.cancelBubble = true;
	    }
	};

	exports.calculateWidth = function (text, config) {
		if (!this.canvas) {
			this.canvas = live({tag: 'canvas', class_name: 'technical', attributes: [{width: '100'}, {height: '100'}]});
			this.ctx = this.canvas.getContext('2d');
			this.fontFamily = 'Tahoma';
			this.fontSize = 12;
			this.paddingLeft = 5;
			this.paddingRight = 5;
			this.ctx.font = this.fontSize + 'px ' + this.fontFamily;
		}
		text = text || '';
		config = config || {};
		var changes = false;
		if (config.fontFamily && (typeof config.fontFamily == 'string')) {
			this.fontFamily = config.fontFamily;
			changes = true;
		}
		if (config.fontSize && (typeof config.fontSize == 'number')) {
			this.fontSize = config.fontSize;
			changes = true;
		}
		if (changes) {
			this.ctx.font = this.fontSize + 'px ' + this.fontFamily;
		}
		if (config.paddingLeft != null && typeof config.paddingLeft == 'number') { this.paddingLeft = config.paddingLeft; }
		if (config.paddingRight != null && typeof config.paddingRight == 'number') { this.paddingRight = config.paddingRight; }

		var measureText = this.ctx.measureText(text);
		return (this.paddingLeft + measureText.width + this.paddingRight);
	};

	var getDOMElement = function (queryString) {
		/// <summary>Get DOM HTMLElement object</summary>
		/// <param name="el" type="String|HTMLElement">Query String or HTML Element</param>
		if (typeof queryString === 'undefined' || !queryString) {
			return null;
		}
		if (typeof queryString === 'string') {
			return document.querySelector(queryString);
		} else if (queryString instanceof HTMLElement) {
			return queryString;
		} else {
			return null;
		}
	};
	exports.getElement = getDOMElement;

	var live = function (parameters_object) {
		/// <summary>Create DOM Element (return successfull created element)</summary>
		/// <param name="tag" type="string">tag name: 'div', 'span' etc.</param>
		/// <param name="id" type="string|null">element id ('?' - autogenerate id; empty - create without id)</param>
		/// <param name="target" type="string|DOM|null">target: id|DOM element|null - document.body</param>
		/// <param name="display" type="boolean|null">show element after create (null - yes)</param>
		/// <param name="class_name" type="string|null">add inline className attribute (null - no)</param>
		/// <param name="style" type="string|null">add inline style attribute (null - no)</param>
		/// <param name="attributes" type="objects array">add inline attributes [{key1:value1}, {key2:value2}]</param>
		/// <param name="html" type="string|null">add innerHTML to element (null - nothing)</param>
		/// <param name="insertBefore_target" type="number|string|DOM|null">to insert before this sibling element (number - index of parentElement.children array; strind - id; DOM - element; null - append to end)</param>
		if (typeof parameters_object != 'object') return null;
		var tag, id, target, display, class_name, style, attributes, html, insertBefore_target;
		if (typeof parameters_object.tag != 'string')
			tag = 'DIV'; // default
		else
			tag = parameters_object.tag.toUpperCase();
		if (tag.toLowerCase() == 'br') return null;
		id = parameters_object.id || null;
		if (id == '?') id = (tag + exports.uid());
		if (typeof parameters_object.target == 'undefined' || parameters_object.target == null) {
			target = document.getElementsByTagName("body")[0];
		} else if (typeof target == 'string') target = getDOMElement(target);
		else target = parameters_object.target;
		if (typeof target == 'undefined' || target == null) {
			target = document.getElementsByTagName("body")[0];
		}
		if (typeof parameters_object.display != 'undefined') {
			display = (parameters_object.display === true);
		} else display = null;
		class_name = parameters_object.class_name || null;
		style = parameters_object.style || null;
		attributes = parameters_object.attributes || null;
		insertBefore_target = parameters_object.before || null;
		html = parameters_object.html || null;

		var d = document.createElement(tag);
		if (id !== null) d.id = id;
		if (class_name !== null) d.className = class_name;
		if (html !== null) d.innerHTML = html;
		if (style !== null) d.setAttribute("style", style);
		if (display === false) d.style.display = "none";
		if (attributes !== null && attributes.length > 0) {
			attributes.forEach(function(item) {
				d.setAttribute(Object.keys(item)[0], item[Object.keys(item)[0]]);
			});
		}
		if (typeof insertBefore_target != 'undefined') { // insert before element
			if (typeof insertBefore_target == 'number') {
				insertBefore_target = target.children[insertBefore_target];
			} else if (typeof insertBefore_target == 'string') {
				insertBefore_target = getDOMElement(insertBefore_target);
			}
			target.insertBefore(d, insertBefore_target);
		} else { // append to end
			target.appendChild(d);
		}

		return d;
	};
	exports.createElement = live;

	exports.hasClass = function (el, class_style) {
		/// <summary>Has class style name</summary>
		/// <param name="el" type="string|DOM">string - element; DOM - DOM element object</param>
		/// <param name="class_style" type="string">style class name to detect</param>
		if (typeof class_style == 'undefined') return false;
		el = getDOMElement(el);
		if (!el) return false;
		return el.className.indexOf(class_style) !== -1;
	};

	exports.addClass = function (el, class_to_add) {
		/// <summary>Add style class (and return [el] after success add)</summary>
		/// <param name="el" type="string|DOM">string - element; DOM - DOM element object</param>
		/// <param name="class_to_add" type="string">style class name to add</param>
		if (typeof class_to_add == 'undefined') return false;
		el = getDOMElement(el);
		if (!el) return false;
		if (el.className.indexOf(class_to_add) !== -1) return false;
		el.className = (el.className + ' ' + class_to_add).trim();
		return el;
	};

	exports.removeClass = function (el, class_to_remove) {
		/// <summary>Remove style class (and return [el] after success remove)</summary>
		/// <param name="el" type="string|DOM">string - element; DOM - DOM element object</param>
		/// <param name="class_to_remove" type="string">style class name to remove (if absent - remove [class] attribute)</param>
		el = getDOMElement(el);
		if (!el) return false;
		if (typeof class_to_remove != 'undefined') {
			var cls = el.className;
			el.className = cls.replace(class_to_remove, '').trim();
			return el;
		}
	};

	exports.toggleClass = function (el, class_to_toggle, force) {
		/// <summary>Remove style class (and return [el] after success remove)</summary>
		/// <param name="el" type="string|DOM">string - element; DOM - DOM element object</param>
		/// <param name="class_to_remove" type="string">style class name to remove (if absent - remove [class] attribute)</param>
		/// <param name="force" type="Boolean">true or false - for Set or Remove class</param>
		el = getDOMElement(el);
		if (!el) return false;
		if (typeof class_to_toggle != 'undefined') {
			if (typeof force != 'undefined') {
				if (force === true) {
					return exports.addClass(el, class_to_toggle);
				} else {
					return exports.removeClass(el, class_to_toggle);
				}
			} else {
				if (exports.hasClass(el, class_to_toggle)) {
					return exports.removeClass(el, class_to_toggle);
				} else {
					return exports.addClass(el, class_to_toggle);
				}
			}
		}
	};

	var offsetSum = function (el) {
		/// <summary>Get offset position of Element (by summ offsets of all parent elements)</summary>
		/// <param name="el" type="DOM">DOM element object</param>
		var left = 0,
			top = 0;
		while (el) {
			top = top + parseInt(el.offsetTop, 10);
			left = left + parseInt(el.offsetLeft, 10);
			el = el_.offsetParent;
		}
		return { left: left, top: top };
	};

	 var offsetRect = function (el) {
		/// <summary>Get offset position of Element (by use getBoundingClientRect of element)</summary>
		/// <param name="el" type="DOM">DOM element object</param>
		var box = el.getBoundingClientRect();
		var body = document.body;
		var docElem = document.documentElement;
		var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
		var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
		var clientTop = docElem.clientTop || body.clientTop || 0;
		var clientLeft = docElem.clientLeft || body.clientLeft || 0;
		var top = box.top + scrollTop - clientTop;
		var left = box.left + scrollLeft - clientLeft;
		return { left: Math.round(left), top: Math.round(top) };
	};

	var offset = function (el) {
		/// <summary>Cross-browser OFFSET position of Element (return object {l:left, t:top})</summary>
		/// <param name="el" type="string|DOM">string - element id; DOM - DOM element object</param>
		el = getDOMElement(el);
		if (!el) return false;
		if (el.getBoundingClientRect) {
			return offsetRect(el);
		} else { // for old browsers
			return offsetSum(el);
		}
	};

	exports.box = function (el, obj_ltwh, doNotChangePositonToAbsolute) {
		/// <summary>SET|GET one or multiply parameters of Left_Top_Width_Height object of Element (return: DOM element (or false if error))</summary>
		/// <param name="el" type="string|DOM">string - element id; DOM - DOM element object</param>
		/// <param name="obj_ltwh" type="object">to Set { l: left, t: top, w: width, h: height } (or empty to Get)</param>
		/// <param name="doNotChangePositonToAbsolute" type="boolean">true for not set position of element to Absolute</param>
		el = getDOMElement(el);
		if (!el) return false;
		if (typeof obj_ltwh == 'undefined' || typeof obj_ltwh != 'object') {
			var _offset = offset(el);
			var l = _offset.left;
			var t = _offset.top;
			var w = el.offsetWidth;
			var h = el.offsetHeight;
			return { /*short*/ l: l, t: t, w: w, h: h, /*full*/ left: l, top: t, width: w, height: h };
		} else {
			// position
			if (doNotChangePositonToAbsolute !== true) el.style.position = 'absolute';
			// left
			if (typeof obj_ltwh.l != 'undefined') {
				el.style.left = '' + obj_ltwh.l + 'px';
			} else if (typeof obj_ltwh.left != 'undefined') {
				el.style.left = '' + obj_ltwh.left + 'px';
			}
			// top
			if (typeof obj_ltwh.t != 'undefined') {
				el.style.top = '' + obj_ltwh.t + 'px';
			} else if (typeof obj_ltwh.top != 'undefined') {
				el.style.top = '' + obj_ltwh.top + 'px';
			}
			// width
			if (typeof obj_ltwh.w != 'undefined') {
				el.style.width = '' + obj_ltwh.w + 'px';
			} else if (typeof obj_ltwh.width != 'undefined') {
				el.style.width = '' + obj_ltwh.width + 'px';
			}
			//height
			if (typeof obj_ltwh.h != 'undefined') {
				el.style.height = '' + obj_ltwh.h + 'px';
			} else if (typeof obj_ltwh.height != 'undefined') {
				el.style.height = '' + obj_ltwh.height + 'px';
			}
		}
		return el;
	};

	exports.isPointInBox = function (point, elementLTWH, clipperLTWH) {
		var x = point.x || point.pageX;
		var y = point.y || point.pageY;
		var res = false;
		if (x >= elementLTWH.l && x <= (elementLTWH.l + elementLTWH.w) &&
			y >= elementLTWH.t && y <= (elementLTWH.t + elementLTWH.h)) {
			res = true;
		}
		if (res && typeof clipperLTWH != 'undefined') {
			res = exports.isPointInBox(point, clipperLTWH);
		}
		return res;
	};

	// Cross-browser implementation of Attach|Remove Event
	var on, off;
	if (document.addEventListener) {
		on = function (el, type, handler, capture) {
			el = getDOMElement(el);
			if (!el) return false;
			el.addEventListener(type, handler, !!capture);
			return handler; // ex. for remove
		};
		off = function (el, type, handler, capture) {
			el = getDOMElement(el);
			if (!el) return false;
			el.removeEventListener(type, handler, !!capture);
			return true;
		};
	} else if (document.attachEvent) {
		on = function (el, type, handler) {
			el = getDOMElement(el);
			if (!el) return false;
			type = "on" + type;
			var withHandler = function () {
				return handler.apply(el, arguments);
			};
			el.attachEvent(type, withHandler);
			return withHandler;
		};
		off = function (el, type, handler) {
			el = getDOMElement(el);
			if (!el) return false;
			type = "on" + type;
			el.detachEvent(type, handler);
			return true;
		};
	} else {
		on = function (el, type, handler) {
			el = getDOMElement(el);
			if (!el) return false;
			type = "on" + type;
			el.store = el.store || {};
			if (!el.store[type]) {
				el.store[type] = { counter: 1 };
				el[type] = function () {
					for (var key in item) {
						if (item.hasOwnProperty(key)) {
							if (typeof item[key] == "function") {
								item[key].apply(this, arguments);
							}
						}
					}
				};
			}
			var item = el.store[type],
				id = item.counter++;
			item[id] = handler;
			return id;
		};
		off = function (el, type, handlerId) {
			el = getDOMElement(el);
			if (!el) return false;
			type = "on" + type;
			if (el.store && el.store[type] && el.store[type][handlerId]) el.store[type][handlerId] = undefined;
			return true;
		};
	}
	exports.on = on;
	exports.off = off;

	exports.remoteRequest = function (url, callback, data, cache) {
		var uri = function (o, cache) {
			var x, y = '',
				e = encodeURIComponent;
			for (x in o) {
				y += '&' + e(x) + '=' + e(o[x]);
			}
			return y.slice(1) + (!cache ? '&_t=' + Date.now() : '');
		};

		if (data && typeof(data) === 'object') {
			data = uri(data, cache);
		}
		try {
			var x = new(XMLHttpRequest)('MSXML2.XMLHTTP.3.0');
			x.open((data ? 'POST' : 'GET'), url, 1);
			x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			x.setRequestHeader('Content-type', (data ? 'application/x-www-form-urlencoded' : 'application/json') + '; charset=UTF-8');
			x.onreadystatechange = function () {
				if (x.readyState > 3 && callback) callback(x.responseText, x);
			};
			x.send(data);
		} catch (e) {
			console.error(e.message);
		}
	};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	var EventDriven = function EventDriven() {
	    this._events = {};
	};

	var EventDriven_calls;
	var EventDriven_list;
	var EventDriven_args;
	var EventDriven_argsToSend;
	var EventDriven_i;
	var EventDriven_length;
	var EventDriven_context;

	EventDriven.prototype.on = function __method(eventName, data, callback, context) {
	    var _callback_;

	    if (typeof data === 'function') {
	        context = callback;
	        callback = data;
	        data = undefined;
	    }

	    var calls = this._events || (this._events = {});
	    var list = calls[eventName] || (calls[eventName] = []);

	    list.push([_callback_ || callback, context, data]);
	    return this;
	};

	EventDriven.prototype.off = function(eventName, context) {
	    var calls = this._events || (this._events = {}),
	        list = calls[eventName] || (calls[eventName] = []);

	    calls[eventName] = list.filter(function(listItem) {
	        return context !== undefined && listItem[1] !== context;
	    });

	    return this;
	};

	EventDriven.prototype.destroy = function() {
	    this._events = {};
	};

	EventDriven.prototype.execute = function(eventName) {
	    EventDriven_calls = this._events || (this._events = {});
	    EventDriven_list = EventDriven_calls[eventName] || (EventDriven_calls[eventName] = []);
	    EventDriven_args = Array.prototype.splice.call(arguments, 1);
	    EventDriven_length = EventDriven_list.length;

	    for (EventDriven_i = 0; EventDriven_i < EventDriven_length; EventDriven_i++) {
	        EventDriven_context = EventDriven_list[EventDriven_i][1] || this;
	        if (typeof EventDriven_list[EventDriven_i][2] !== 'undefined') {
	            EventDriven_argsToSend = EventDriven_args.concat([EventDriven_list[EventDriven_i][2]]);
	        } else {
	            EventDriven_argsToSend = EventDriven_args;
	        }
	        EventDriven_list[EventDriven_i][0].apply(EventDriven_context, EventDriven_argsToSend);
	    }
	};

	EventDriven.prototype.trigger = function(eventName, data) {
	    this.execute.apply(this, arguments);
	};

	exports.EventDriven = EventDriven;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	var Utils = __webpack_require__(3);
	var EventDriven = __webpack_require__(4).EventDriven;
	var Interaction = __webpack_require__(6).Interaction;
	var ChartView = __webpack_require__(7).ChartView;

	var Chart = function(params) {
		this.id = params.id;
		this.app = params.app;
		this.title = params.title;
		this.data = params.chartData || [];
		this.container = params.appendTo;
		this.isModelRefreshed = false;
		this.animationDuration = 170;
		this.currentAnimationCancel = null;

		this.model = {
			id: this.id,
			data: this.data,
			title: this.title,
			renderStyle: "dark", // this.id === "chart2" || this.id === "chart4" ? "dark" : "light",
			style: {
				light: {
					bgColor: "#ffffff",
					title: "#222222",
					tooltipBg: "#ffffff",
					tooltipShadow: "#999",
					tooltipTitle: "#222222",
					axisColor: "#ecf0f3",
					gridColor: "#f2f4f5",
					timeColor: "#96a2aa",
					gridValuesColor: "#96a2aa",
					crosshairColor: "#dfe6eb",
					bottomColor: "rgba(243,248,250,0.81)",
					caretColor: "rgba(184,211,230,0.47)",
					labelBorder: "#e6ecf0",
					labelText: "#43484b"
				},
				dark: {
					bgColor: "#242f3e",
					title: "#ffffff",
					tooltipBg: "#253241",
					tooltipShadow: "#111",
					tooltipTitle: "#ffffff",
					axisColor: "#313d4d",
					gridColor: "#293544",
					timeColor: "#546778",
					gridValuesColor: "#546778",
					crosshairColor: "#3b4a5a",
					bottomColor: "rgba(30,41,54,0.81)",
					caretColor: "rgba(95,129,157,0.47)",
					labelBorder: "#344658",
					labelText: "#e8ecee"
				}
			},
			renderMode: 1,
			draggingMode: false,
			startIndex: null,
			shiftX: 0,
			count: 20,
			countShift: 1,
			space: 20,
			lineWidth: 2,
			scale: 1,
			paddingTop: 40,
			paddingBottom: 110,
			paddingLeft: 0,
			paddingRight: 0,
			digits: 0,

			interactionDownX: null,
			interactionDownY: null,
			interactionDownStartIndex: null,
			interactionMoveX: null,
			interactionMoveY: null,
			interactionActivated: false,

			bottomChart: {
				top: 0,
				left: 0,
				height: 34,
				width: 0,
				lineWidth: 1,
				paddingLeft: 10,
				paddingRight: 10,
				caret: {
					left: { x: 0, y: 0, w: 0, h: 0 },
					right: { x: 0, y: 0, w: 0, h: 0 },
					frame: { 
						x: 0, y: 0, w: 0, h: 0,
						left: { x: 0, y: 0, w: 0, h: 0 },
						right: { x: 0, y: 0, w: 0, h: 0 }
					}
				}
			},

			labels: [],
			theme: {}
		};

		this.view = new ChartView({
			app: this.app,
			className: "chart " + this.id,
			extraClassName: this.model.renderStyle,
			appendTo: this.container
		});

		this.interaction = new Interaction({
			app: this.app,
			view: this.view
		});

		this.bindEvents();
	};

	Utils.extend(Chart, EventDriven);

	Chart.prototype.bindEvents = function() {
		this.app.on("resize", this.onViewResize, this);
		this.view.on("ready", this.onViewReady, this);
	};

	Chart.prototype.onViewReady = function() {
		this.model.startIndex = this.model.data.lines.x.length - this.model.count;

		if (!this.interactionActivated) {
			// only once activate the interactions
			this.model.interactionActivated = true;
			this.bindInteractionEvents();
			this.interaction.activate();
		}

		this.onViewResize();
	};

	Chart.prototype.onViewResize = function() {
		if (!this.data) return;

		this.view.resize();
		this.refreshModel();
	};

	Chart.prototype.bindInteractionEvents = function() {
		this.interaction.on("down", this.onInteractionDown, this);
		this.interaction.on("move", this.onInteractionMove, this);
		this.interaction.on("up", this.onInteractionUp, this);
	};

	Chart.prototype.unBindInteractionEvents = function() {
		this.interaction.off("down", this);
		this.interaction.off("move", this);
		this.interaction.off("up", this);
		// this.interaction.off("wheel", this);
	};

	Chart.prototype.getXFromEvent = function(e) {
		if (e.targetTouches) {
			if (e.targetTouches.length) {
				return e.targetTouches[0].pageX - this.view.left;
			}
			if (e.changedTouches.length) {
				return e.changedTouches[0].pageX - this.view.left;
			}
		} else {
			return (e.pageX || 0) - this.view.left;
		}
	};

	Chart.prototype.getYFromEvent = function(e) {
		if (e.targetTouches) {
			if (e.targetTouches.length) {
				return e.targetTouches[0].pageY - this.view.top;
			}
			if (e.changedTouches.length) {
				return e.changedTouches[0].pageY - this.view.top;
			}
		} else {
			return (e.pageY || 0) - this.view.top;
		}
	};

	Chart.prototype.onInteractionDown = function(e) {
		this.interactionPart = null;
		var x = this.getXFromEvent(e);
		var y = this.getYFromEvent(e);

		var topChartBox = {
			l: this.model.left,
			t: this.model.top,
			w: this.model.width,
			h: this.model.height
		};
		if (Utils.isPointInBox({x: x, y: y}, topChartBox)) {
			this.interactionPart = 'topChart';
			if (this.app.device === 'mouse') {
				this.model.draggingMode = true;
			}
			this.model.interactionDownX = this.getXFromEvent(e) - this.model.shiftX;
			this.model.interactionDownY = this.getYFromEvent(e);
			var minStartIndex = this.model.data.lines.x.length - this.model.count;
			this.model.interactionDownStartIndex = this.model.startIndex || minStartIndex;
			if (this.model.startIndex == null) {
				this.model.interactionDownStartIndex = minStartIndex;
			} else {
				this.model.interactionDownStartIndex = this.model.startIndex;
			}
			return;
		}

		var caretFrameLeftBox = {
			l: this.model.bottomChart.caret.frame.left.x - 1,
			t: this.model.bottomChart.caret.frame.left.y - 1,
			w: this.model.bottomChart.caret.frame.left.w + 2,
			h: this.model.bottomChart.caret.frame.left.h + 2
		};
		if (Utils.isPointInBox({x: x, y: y}, caretFrameLeftBox)) {
			this.interactionPart = 'caretFrameLeft';
			this.model.interactionDownX = this.getXFromEvent(e) + this.model.shiftX * this.model.bottomChart.space / this.model.space;
			this.model.interactionDownY = this.getYFromEvent(e);
			this.model.interactionDownStartIndex = this.model.startIndex;
			this.model.interactionDownStartCount = this.model.count;
			return;
		}

		var caretFrameRightBox = {
			l: this.model.bottomChart.caret.frame.right.x - 1,
			t: this.model.bottomChart.caret.frame.right.y - 1,
			w: this.model.bottomChart.caret.frame.right.w + 2,
			h: this.model.bottomChart.caret.frame.right.h + 2
		};
		if (Utils.isPointInBox({x: x, y: y}, caretFrameRightBox)) {
			this.interactionPart = 'caretFrameRight';
			this.model.interactionDownX = this.getXFromEvent(e) + this.model.shiftX * this.model.bottomChart.space / this.model.space;
			this.model.interactionDownY = this.getYFromEvent(e);
			this.model.interactionDownStartIndex = this.model.startIndex;
			this.model.interactionDownStartCount = this.model.count;
			return;
		}

		var caretFrameBox = {
			l: this.model.bottomChart.caret.frame.x - 1,
			t: this.model.bottomChart.caret.frame.y - 1,
			w: this.model.bottomChart.caret.frame.w + 2,
			h: this.model.bottomChart.caret.frame.h + 2
		};
		if (Utils.isPointInBox({x: x, y: y}, caretFrameBox)) {
			this.interactionPart = 'caretFrame';
			this.model.interactionDownX = this.getXFromEvent(e) + this.model.shiftX * this.model.bottomChart.space / this.model.space;
			this.model.interactionDownY = this.getYFromEvent(e);
			this.model.interactionDownStartIndex = this.model.startIndex;
			return;
		}

		var caretLeftBox = {
			l: this.model.bottomChart.caret.left.x - 1,
			t: this.model.bottomChart.caret.left.y - 1,
			w: this.model.bottomChart.caret.left.w + 2,
			h: this.model.bottomChart.caret.left.h + 2
		};
		var indexByX;
		if (Utils.isPointInBox({x: x, y: y}, caretLeftBox)) {
			this.interactionPart = 'caretLeft';
			this.model.interactionDownX = this.getXFromEvent(e) + this.model.shiftX * this.model.bottomChart.space / this.model.space;

			indexByX = (this.model.interactionDownX - this.model.bottomChart.paddingLeft) / this.model.bottomChart.space;
			this.model.startIndex = Math.floor(indexByX - this.model.count / 2);
			this.correctPosition();
			return;
		}

		var caretRightBox = {
			l: this.model.bottomChart.caret.right.x - 1,
			t: this.model.bottomChart.caret.right.y - 1,
			w: this.model.bottomChart.caret.right.w + 2,
			h: this.model.bottomChart.caret.right.h + 2
		};
		if (Utils.isPointInBox({x: x, y: y}, caretRightBox)) {
			this.interactionPart = 'caretRight';
			this.model.interactionDownX = this.getXFromEvent(e) + this.model.shiftX * this.model.bottomChart.space / this.model.space;

			indexByX = (this.model.interactionDownX - this.model.bottomChart.paddingLeft) / this.model.bottomChart.space;
			this.model.startIndex = Math.floor(indexByX - this.model.count / 2);
			this.correctPosition();
			return;
		}

		// labels:
		for (var i in this.model.labels) {
			var label = this.model.labels[i];
			var labelBox = {
				l: label.x,
				t: label.y,
				w: label.w,
				h: label.h
			};
			if (Utils.isPointInBox({x: x, y: y}, labelBox)) {
				this.interactionPart = label.id;
				return;
			}
		}

		// theme:
		var themeBox = {
			l: this.model.theme.x,
			t: this.model.theme.y,
			w: this.model.theme.w,
			h: this.model.theme.h
		};
		if (Utils.isPointInBox({x: x, y: y}, themeBox)) {
			this.interactionPart = 'theme';
		}
	};

	Chart.prototype.onInteractionMove = function(e) {
		requestAnimationFrame(
			function() {
				var shiftX, indexShift;
				this.model.interactionMoveX = this.getXFromEvent(e);
				this.model.interactionMoveY = this.getYFromEvent(e);
			
				if (this.interactionPart === 'topChart') {
					if (this.app.device != 'touch' && this.model.interactionDownX != null && this.model.interactionDownY != null && this.model.interactionDownStartIndex != null) {
						shiftX = this.model.interactionMoveX - this.model.interactionDownX;
						indexShift = shiftX >= 0 ? Math.floor(shiftX / this.model.space) : Math.ceil(shiftX / this.model.space);
						this.model.startIndex = this.model.interactionDownStartIndex - indexShift;
						this.model.shiftX = shiftX - Math.floor(indexShift * this.model.space);
					}
				}
				if (this.interactionPart === 'caretFrame') {
					if (this.model.interactionDownX != null && this.model.interactionDownY != null && this.model.interactionDownStartIndex != null) {
						shiftX = this.model.interactionMoveX - this.model.interactionDownX;
						indexShift = shiftX >= 0 ? Math.floor(shiftX / this.model.bottomChart.space) : Math.ceil(shiftX / this.model.bottomChart.space);
						this.model.startIndex = this.model.interactionDownStartIndex + indexShift;
						this.model.shiftX = (-shiftX + Math.floor(indexShift * this.model.bottomChart.space)) * this.model.space / this.model.bottomChart.space;

						this.correctPosition();
					}
				}
				if (this.interactionPart === 'caretFrameLeft') {
					if (this.model.interactionDownX != null && this.model.interactionDownY != null && this.model.interactionDownStartIndex != null && this.model.interactionDownStartCount != null) {
						shiftX = this.model.interactionMoveX - this.model.interactionDownX;
						indexShift = shiftX >= 0 ? Math.floor(shiftX / this.model.bottomChart.space) : Math.ceil(shiftX / this.model.bottomChart.space);
						if (this.model.interactionDownStartIndex + indexShift < 0) {
							this.model.startIndex = 0;
							this.model.shiftX = 0;	
						} else if (this.model.interactionDownStartCount - shiftX / this.model.bottomChart.space > 20) {
							this.model.startIndex = this.model.interactionDownStartIndex + indexShift;
							this.model.shiftX = (-shiftX + indexShift * this.model.bottomChart.space) * this.model.space / this.model.bottomChart.space;
							indexShift = shiftX / this.model.bottomChart.space;
							this.model.count = this.model.interactionDownStartCount - indexShift;
						}

						this.correctPosition();
					}
				}
				if (this.interactionPart === 'caretFrameRight') {
					if (this.model.interactionDownX != null && this.model.interactionDownY != null && this.model.interactionDownStartIndex != null && this.model.interactionDownStartCount != null) {
						shiftX = this.model.interactionMoveX - this.model.interactionDownX;
						indexShift = shiftX / this.model.bottomChart.space;
						this.model.count = this.model.interactionDownStartCount + indexShift;
						if (this.model.interactionDownStartIndex + this.model.count >= this.model.data.lines.x.length) {
							this.model.count = this.model.data.lines.x.length - this.model.interactionDownStartIndex;
						}

						this.correctPosition();
					}
				}
			
				this.correctPosition();
				this.refreshModel();
			}.bind(this)
		);
	};

	Chart.prototype.correctPosition = function () {
		var minStartIndex = this.model.data.lines.x.length - this.model.count;
		if (this.model.startIndex >= minStartIndex) {
			this.model.startIndex = ~~minStartIndex;
			this.model.count = ~~this.model.count;
			this.model.shiftX = 0;
		} else if (this.model.startIndex <= 0) {
			this.model.startIndex = 0;
			this.model.shiftX = 0;
		}
		if (this.model.count < 20) {
			this.model.count = 20;
		}
	};

	Chart.prototype.onInteractionUp = function(e) {
		this.model.paddingRight = 0;
		this.model.draggingMode = false;
		Utils.toggleClass(this.view.canvas, "grabbing", false);
		if (this.app.device != 'touch') {
			this.model.interactionMoveX = null;
			this.model.interactionMoveY = null;
		}
		this.model.interactionDownX = null;
		this.model.interactionDownY = null;
		this.model.interactionDownStartIndex = null;
		this.model.interactionDownStartCount = null;

		// labels:
		var x = this.getXFromEvent(e);
		var y = this.getYFromEvent(e);
		for (var i in this.model.labels) {
			var label = this.model.labels[i];
			var labelBox = {
				l: label.x,
				t: label.y,
				w: label.w,
				h: label.h
			};
			if (Utils.isPointInBox({x: x, y: y}, labelBox) && this.interactionPart === label.id) {
				this.model.data.actives[label.id] = !this.model.data.actives[label.id];
			}
		}

		// theme:
		var themeBox = {
			l: this.model.theme.x,
			t: this.model.theme.y,
			w: this.model.theme.w,
			h: this.model.theme.h
		};
		if (Utils.isPointInBox({x: x, y: y}, themeBox) && this.interactionPart === 'theme') {
			Utils.toggleClass(this.view.$container, "dark", false);
			Utils.toggleClass(this.view.$container, "light", false);
			this.model.renderStyle = (this.model.renderStyle === 'dark' ? 'light' : 'dark');
			Utils.toggleClass(this.view.$container, this.model.renderStyle, true);
		}

		this.interactionPart = null;
		
		requestAnimationFrame(
			function() {
				this.refreshModel();
			}.bind(this)
		);
	};

	Chart.prototype.refreshModel = function() {
		var prevState = null;

		this.correctPosition();

		if (this.isModelRefreshed) {
			prevState = {
				scale: this.model.scale,
				min: this.model.min,
				max: this.model.max
			};
		}

		// top chart
		var values_length = this.model.data.lines.x.length;
		var len = Math.min(this.model.count, values_length);
		this.model.max = -999999999;
		this.model.min = 999999999;
		var line, i, k, active;
		for (i = this.model.startIndex; i < this.model.startIndex + len; i++) {
			for (k = 0; k < this.model.data.keys.length; k++) {
				line = this.model.data.keys[k];
				active = this.model.data.actives[line];
				if (active && this.model.data.lines[line][i] !== null) {
					if (this.model.data.lines[line][i] < this.model.min) {
						this.model.min = this.model.data.lines[line][i];
					}
					if (this.model.data.lines[line][i] > this.model.max) {
						this.model.max = this.model.data.lines[line][i];
					}
				}
			}
		}
		if (this.model.max === -999999999) this.model.max = 1;
		if (this.model.min === 999999999) this.model.min = 0;

		this.model.left = this.model.paddingLeft;
		this.model.top = this.model.paddingTop;
		this.model.width = this.view.canvas.width - this.model.paddingLeft - this.model.paddingRight;
		this.model.height = this.view.canvas.height - this.model.paddingTop - this.model.paddingBottom;
		this.model.space = this.model.width / (this.model.count - 1);
		this.model.scale = (this.model.max - this.model.min) / this.model.height;

		this.model.axisXValues = [];
		var tempXIndex = values_length - 1;
		for (i = values_length - 1; i > 0; i--) {
			if ((tempXIndex - i) * this.model.space > 60) {
				this.model.axisXValues.push(i);
				tempXIndex = i;
			}
		}

		var divider = 2;
		var digits = this.model.max.toString().length;
		if (digits === 2) {
			divider = 5;
		} else if (digits >= 3) {
			divider = Math.pow(10, digits - 2);
		}
		var tempYValue = this.model.min;
		var tempY = this.view.getYByValue(tempYValue, this.model);
		this.model.axisYValues = [tempYValue];
		tempYValue = Math.floor(tempYValue / divider) * divider;
		for (i = tempYValue; i <= this.model.max; i += divider) {
			if (i % divider === 0) {
				var iY = this.view.getYByValue(i, this.model);
				if (tempY - iY >= 40) {
					this.model.axisYValues.push(i);
					tempY = iY;
				}
			}
		}

		this.model.crosshairX = null;
		this.model.crosshairY = null;
		this.model.hoveredIndex = null;
		if (this.model.interactionMoveX != null && this.model.interactionMoveY != null) {
			this.model.crosshairX = this.model.interactionMoveX;
			this.model.crosshairY = this.model.interactionMoveY;
			this.model.hoveredIndex = Math.round(this.model.crosshairX / this.model.space);
		}

		// bottom chart
		if (this.model.bottomChart.startIndex < 0) {
			this.model.bottomChart.startIndex = 0;
		}
		this.model.bottomChart.max = -999999999;
		this.model.bottomChart.min = 999999999;
		for (i = 0; i < values_length; i++) {
			for (k = 0; k < this.model.data.keys.length; k++) {
				line = this.model.data.keys[k];
				active = this.model.data.actives[line];
				if (active && this.model.data.lines[line][i] !== null) {
					if (this.model.data.lines[line][i] < this.model.bottomChart.min) {
						this.model.bottomChart.min = this.model.data.lines[line][i];
					}
					if (this.model.data.lines[line][i] > this.model.bottomChart.max) {
						this.model.bottomChart.max = this.model.data.lines[line][i];
					}
				}
			}
		}
		if (this.model.bottomChart.max === -999999999) this.model.bottomChart.max = 0;
		if (this.model.bottomChart.min === 999999999) this.model.bottomChart.min = 0;

		this.model.bottomChart.paddingTop = this.model.height + this.model.paddingTop + 30;
		this.model.bottomChart.count = values_length;
		this.model.bottomChart.left = this.model.bottomChart.paddingLeft;
		this.model.bottomChart.width = this.view.canvas.width - this.model.bottomChart.paddingLeft - this.model.bottomChart.paddingRight;
		this.model.bottomChart.space = this.model.bottomChart.width / (values_length - 1);
		this.model.bottomChart.scale = (this.model.bottomChart.max - this.model.bottomChart.min) / this.model.bottomChart.height;

		var botShiftX = this.model.bottomChart.space * this.model.shiftX / this.model.space;
		var x = this.model.bottomChart.paddingLeft + (this.model.startIndex) * this.model.bottomChart.space - botShiftX;
		var y = this.model.bottomChart.paddingTop - 3;
		var w = Math.floor((this.model.count) * this.model.bottomChart.space);
		var h = this.model.bottomChart.height + 6;

		this.model.bottomChart.caret.left = {
			x: this.model.bottomChart.paddingLeft, 
			y: y, 
			w: x - this.model.bottomChart.paddingLeft, 
			h: h
		};

		this.model.bottomChart.caret.right = {
			x: x + w, 
			y: y, 
			w: this.model.bottomChart.width - (x + w) + this.model.bottomChart.paddingLeft + 2, 
			h: h
		};

		this.model.bottomChart.caret.frame = {
			left: {
				x: x, 
				y: y, 
				w: 6, 
				h: h
			},
			right: {
				x: x + w - 6, 
				y: y, 
				w: 6, 
				h: h
			},
			top: {
				x: x + 6, 
				y: y, 
				w: w - 12,
				h: 1
			},
			bottom: {
				x: x + 6, 
				y: y + h - 1, 
				w: w - 12, 
				h: 1
			},
			x: x, 
			y: y, 
			w: w, 
			h: h
		};

		this.model.labels = [];
		var left = this.model.bottomChart.caret.left.x;
		y = this.model.bottomChart.caret.left.y + this.model.bottomChart.caret.left.h + 8;
		h = 26;
		for (i in this.model.data.keys) {
			var key = this.model.data.keys[i];
			var name = this.model.data.names[key];
			w = Utils.calculateWidth(name, {fontFamily: 'Tahoma, Verdana, sans-serif', fontSize: 14, paddingLeft: 26, paddingRight: 7});
			x = left + i * (w + 8);
			var label = {
				id: key,
				name: name,
				x: x,
				y: y,
				w: w,
				h: h,
				active: this.model.data.actives[key]
			};
			this.model.labels.push(label);
		}

		var right = left + this.model.bottomChart.width;
		this.model.theme = {
			id: 'theme',
			x: right - 26,
			y: y,
			w: 26,
			h: h,
			style: this.model.renderStyle
		};

		this.isModelRefreshed = true;

		var nextState = null;
		if (prevState) {
			nextState = {
				scale: this.model.scale,
				min: this.model.min,
				max: this.model.max
			};
			this.prevState = nextState;
		}

		// animate transition if changed some of expected values
		if (prevState && nextState && this.hasDiff(prevState, nextState)) {
			this.animateTransition(prevState, nextState);
		} else {
			this.view.refresh(this.model);
		}
	};

	Chart.prototype.hasDiff = function(a, b) {
		if (a.scale !== b.scale) return true;
		if (a.min !== b.min) return true;
		if (a.max !== b.max) return true;

		return false;
	};

	Chart.prototype.animateTransition = function(a, b) {
		var _this = this;
		var start = performance.now();
		var duration = this.animationDuration;

		if (this.raf) {
			duration = this.animationDuration / 2;
			cancelAnimationFrame(this.raf);
			this.raf = null;
		}
		if (this.rafInRaf) {
			duration = this.animationDuration / 4;
			cancelAnimationFrame(this.rafInRaf);
			this.rafInRaf = null;
		}
		this.raf = requestAnimationFrame(function animate(time) {
			var progress = (time - start) / duration;
			if (progress > 1) progress = 1;
			_this.view.render(_this.transition(a, b, progress));
			if (progress < 1) {
				_this.rafInRaf = requestAnimationFrame(animate);
			} else {
				_this.raf = null;
				_this.rafInRaf = null;
			}
		});
	};

	Chart.prototype.transition = function(a, b, progress) {
		if (a.scale !== b.scale) this.model.scale = a.scale + (b.scale - a.scale) * progress;
		if (a.min !== b.min) this.model.min = a.min + (b.min - a.min) * progress;
		if (a.max !== b.max) this.model.max = a.max + (b.max - a.max) * progress;
		return this.model;
	};

	Chart.prototype.getModel = function() {
		return this.model;
	};

	exports.Chart = Chart;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var Utils = __webpack_require__(3);
	var EventDriven = __webpack_require__(4).EventDriven;

	var Interaction = function (params) {
		this.app = params.app;
	    this.view = params.view;
	    this.active = false;
	};

	Utils.extend(Interaction, EventDriven);

	Interaction.prototype.activate = function () {
	    if (!this.view) return;
	    this.active = true;
	    this.bindViewEvents();
	};

	Interaction.prototype.deActivate = function () {
	    if (!this.view) return;
	    this.active = false;
	    this.unBindViewEvents();
	};

	Interaction.prototype.bindViewEvents = function () {
	    if (!this.view) return;
		// desktop mouse events
		if (this.app.device === 'mouse') {
			Utils.on(this.view.$container, 'mousedown', this.onEventDown.bind(this));
			Utils.on(this.view.$container, 'mousemove', this.onEventMove.bind(this));
			Utils.on(this.view.$container, 'mouseup', this.onEventUp.bind(this));
			Utils.on(this.view.$container, 'mouseout', this.onEventUp.bind(this));
			Utils.on(this.view.$container, 'mouseleave', this.onEventUp.bind(this));
		} else
	    // touch device events
		if (this.app.device === 'touch') {
			Utils.on(this.view.$container, 'touchstart', this.onEventDown.bind(this));
			Utils.on(this.view.$container, 'touchmove', this.onEventMove.bind(this));
			Utils.on(this.view.$container, 'touchend', this.onEventUp.bind(this));
		}
	};

	Interaction.prototype.unBindViewEvents = function () {
	    if (!this.view) return;

		if (this.app.device === 'mouse') {
			Utils.off(this.view.$container, 'mousedown');
			Utils.off(this.view.$container, 'mousemove');
			Utils.off(this.view.$container, 'mouseup');
			Utils.off(this.view.$container, 'mouseout');
			Utils.off(this.view.$container, 'mouseleave');
			Utils.off(this.view.$container, 'mousewheel');
		} else if (this.app.device === 'touch') {
			Utils.off(this.view.$container, 'touchstart');
			Utils.off(this.view.$container, 'touchmove');
			Utils.off(this.view.$container, 'touchend');
		}
	};

	Interaction.prototype.onEventDown = function (e) {
	    this.trigger('down', e);
	};

	Interaction.prototype.onEventMove = function (e) {
	    this.trigger('move', e);
	};

	Interaction.prototype.onEventUp = function (e) {
	    this.trigger('up', e);
	};

	exports.Interaction = Interaction;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var Utils = __webpack_require__(3);
	var UI = __webpack_require__(8).UI;

	var ChartView = function (params) {
	    ChartView.superclass.constructor.call(this, params);
		this.app = params.app;
	    this.canvas = null;
	    this.ctx = null;
	    this.left = 0;
		this.top = 0;
		this.ready = false;
	    this.createView();
	};

	Utils.inherit(ChartView, UI);

	ChartView.prototype.createView = function () {
		this.canvas = Utils.createElement({tag: "canvas", target: this.$container});
	    this.ctx = this.canvas.getContext('2d');
	    this.ctx.lineCap = 'round';
		this.ctx.lineJoin = 'round';
		
		// wait for DOM composited to first resize canvas
		var initInterval = setInterval(function () {
			if (this.$container.offsetWidth && this.$container.offsetHeight) {
				clearInterval(initInterval);
				this.resize();
				this.ready = true;
				this.trigger('ready');
			}
		}.bind(this), 10);
	};

	ChartView.prototype.resize = function () {
	    var box = Utils.box(this.$container);
	    this.left = box.left;
	    this.top = box.top;
	    this.canvas.width = box.width;
	    this.canvas.height = box.height;
	};

	ChartView.prototype.refresh = function (model) {
	    if (!this.ready) return;
	    window.requestAnimationFrame(function() {
	        this.render(model);
	    }.bind(this));
	};

	ChartView.prototype.getYByValue = function (value, model) {
	    return model.paddingTop + (model.max - value) / model.scale;
	};

	ChartView.prototype.getXByIndex = function (index, model) {
		return model.paddingLeft + model.shiftX + (index - model.startIndex) * model.space;
	};

	ChartView.prototype.getIndexByX = function (x, model) {
		return model.startIndex + Math.floor((x - model.shiftX - model.paddingLeft) / model.space);
	};

	ChartView.prototype.render = function (model) {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

	    this.drawAxisY(this.ctx, model);
	    this.drawAxisX(this.ctx, model);
		this.drawTitle(this.ctx, model);
		this.drawTopChart(this.ctx, model);
		if (!model.draggingMode) {
			this.drawCrosshair(this.ctx, model);
		}
		this.drawBottomChart(this.ctx, model);
		this.drawLabels(this.ctx, model);
		this.drawThemeSwitch(this.ctx, model);
	};

	ChartView.prototype.drawTopChart = function (ctx, model) {
		var i, line, data, active;
		for (i in model.data.keys) {
			line = model.data.keys[i];
			data = model.data.lines[line];
			active = model.data.actives[line];

			if (active) {
				ctx.beginPath();
				ctx.lineCap = 'round';
				ctx.lineJoin = 'round';
				ctx.lineWidth = model.lineWidth;
				ctx.strokeStyle = model.data.colors[line];
			
				this.drawTopLine(ctx, model, data);
			}
		}
	};

	ChartView.prototype.drawBottomChart = function (ctx, model) {
		var i, line, data, active;
		for (i in model.data.keys) {
			line = model.data.keys[i];
			data = model.data.lines[line];
			active = model.data.actives[line];

			if (active) {
				ctx.beginPath();
				ctx.lineCap = 'round';
				ctx.lineJoin = 'round';
				ctx.lineWidth = model.bottomChart.lineWidth;
				ctx.strokeStyle = model.data.colors[line];
			
				this.drawBottomLine(ctx, model, data);
			}
		}
		this.drawBottomCaret(ctx, model);
	};

	ChartView.prototype.drawAxisY = function (ctx, model) {
	    var xLeft = model.paddingLeft;
	    var xRight = model.paddingLeft + model.width;
	    var y;  

	    // grid lines and values
	    ctx.beginPath();
	    ctx.lineWidth = 1;
	    ctx.font = "normal 12px Tahoma, Verdana, sans-serif";
		ctx.strokeStyle = model.style[model.renderStyle].gridColor;
		ctx.fillStyle = model.style[model.renderStyle].gridValuesColor;
	    for (var i in model.axisYValues) {
			var value = model.axisYValues[i];
	        y = this.getYByValue(value, model);
			ctx.moveTo(xLeft + 10, y);
			ctx.lineTo(xRight - 10, y);
	        ctx.fillText(value.toFixed(model.digits), xLeft + 10, y - 6);
	    }
	    ctx.stroke();
	};

	ChartView.prototype.drawAxisX = function (ctx, model) {
		var minIndex = model.startIndex;
		if (minIndex < 0) minIndex = 0;
	    var maxIndex = minIndex + model.count + 1;
		var yBottom = model.paddingTop + model.height;
	    var x, data;

		data = model.data.lines.x;

	    // times
	    ctx.beginPath();
	    ctx.font = "normal 12px Tahoma, Verdana, sans-serif";
		ctx.fillStyle = model.style[model.renderStyle].timeColor;
	    for (var index = minIndex; index < maxIndex; index++) {
			if (data[index] && model.axisXValues.indexOf(index) !== -1) {
				x = Math.floor((index - minIndex) * model.space) + model.shiftX;
				var time = data[index].split(', ')[1];
				ctx.fillText(time, x, yBottom + 20);
			}
		}

	    // horizontal axis X
		ctx.beginPath();
		ctx.strokeStyle = model.style[model.renderStyle].axisColor;
	    ctx.lineWidth = 1;
	    ctx.moveTo(model.paddingLeft, model.paddingTop + model.height);
	    ctx.lineTo(model.paddingLeft + model.width, model.paddingTop + model.height);
	    ctx.stroke();
	    ctx.closePath();
	};

	ChartView.prototype.drawTitle = function (ctx, model) {
		ctx.save();
		ctx.beginPath();
		ctx.textBaseline = 'top';
		ctx.font = "bold 18px Tahoma, Verdana, sans-serif";
		ctx.fillStyle = model.style[model.renderStyle].title;
		ctx.fillText(model.title, 10, 10);
		ctx.restore();
	};

	ChartView.prototype.drawCrosshair = function (ctx, model) {
	    if (model.crosshairX == null || model.crosshairY == null) return;
	    var yTop = model.paddingTop;
	    var yBottom = model.paddingTop + model.height;
	    var x = model.crosshairX;
		var y = model.crosshairY;
		var index0 = this.getIndexByX(x, model);
		var index1 = index0 + 1;
		var index0x = this.getXByIndex(index0, model);
		var index1x = this.getXByIndex(index1, model);
		var dist0 = Math.abs(x - index0x); 
		var dist1 = Math.abs(x - index1x);
		var index = index0;
		var iX = index0x;
		if (dist1 < dist0) {
			index = index1;
			iX = index1x;
		}
		if (!model.data.lines.x[index]) return;

	    ctx.beginPath();
	    ctx.strokeStyle = model.style[model.renderStyle].crosshairColor;
	    ctx.fillStyle = model.style[model.renderStyle].crosshairColor;
	    ctx.lineWidth = 1;
	    if (y >= yTop && y <= yBottom) {
			// vertical line
			ctx.moveTo(iX, yTop);
			ctx.lineTo(iX, yBottom);
			ctx.stroke();

			// lines points
			var visibleLines = [];
			ctx.save();
			var i, key, line, bg, color, active, lineY;
			for (i in model.data.keys) {
				key = model.data.keys[i];
				line = model.data.lines[key];
				bg = model.style[model.renderStyle].bgColor;
				color = model.data.colors[key];
				active = model.data.actives[key];
				if (active) {
					visibleLines.push({
						id: model.data.names[key],
						value: line[index],
						color: model.data.colors[key]
					});
					lineY = this.getYByValue(line[index], model);

					ctx.beginPath();
					ctx.lineWidth = 2;
					ctx.fillStyle = bg;
					ctx.strokeStyle = color;
					ctx.arc(iX, lineY, 4, 0, 2 * Math.PI);
					ctx.fill();
					ctx.stroke();
				}
			}

			// tooltip
			var boxW = 90;
			var maxValue = 0;
			if (visibleLines.length) visibleLines.reduce(function (x, item) { 
				if (item.value > maxValue) maxValue = item.value;
			});
			var minWidth = 0;
			if (maxValue > 0) {
				minWidth = Utils.calculateWidth(maxValue.toString(), {
					fontFamily: 'Tahoma, Verdana, sans-serif', 
					fontSize: 12, 
					paddingLeft: 5, 
					paddingRight: 5
				});
			}
			var rows = 0;
			if (visibleLines.length === 1) {
				boxW = Math.max(boxW, minWidth);
				rows = 2;
			} else if (visibleLines.length > 1) {
				boxW = Math.max(boxW, minWidth * 2 + 5);
				rows = Math.ceil(visibleLines.length / 2);
				if (rows === 1) rows = 2;
			}
			var boxH = Math.max(38, 20 + rows * 18);

			ctx.fillStyle = model.style[model.renderStyle].tooltipBg;
			ctx.shadowColor = model.style[model.renderStyle].tooltipShadow;
			ctx.shadowBlur = 3;

			var boxX = iX - boxW / 2;
			var boxY = yTop - model.paddingTop + 3;
			if (boxX < 3) boxX = 3;
			if (boxX + boxW > model.width - 3) boxX = model.width - 3 - boxW;
			ctx.roundRect(boxX, boxY, boxW, boxH, 5, true, false);

			ctx.beginPath();
			ctx.shadowBlur = 0;
			ctx.fillStyle = model.style[model.renderStyle].tooltipTitle;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'top';
			ctx.font = "bold 13px Tahoma, Verdana, sans-serif";
			ctx.fillText(model.data.lines.x[index], boxX + boxW / 2, boxY + 4);

			if (visibleLines.length === 1) {
				ctx.fillStyle = visibleLines[0].color;
				ctx.font = "bold 12px Tahoma, Verdana, sans-serif";
				ctx.fillText(visibleLines[0].value, boxX + boxW / 2, boxY + 25);
				ctx.font = "normal 12px Tahoma, Verdana, sans-serif";
				ctx.fillText(visibleLines[0].id, boxX + boxW / 2, boxY + 37);
			} else if (visibleLines.length === 2) {
				ctx.fillStyle = visibleLines[0].color;
				ctx.font = "bold 12px Tahoma, Verdana, sans-serif";
				ctx.fillText(visibleLines[0].value, boxX + boxW / 4, boxY + 25);
				ctx.font = "normal 12px Tahoma, Verdana, sans-serif";
				ctx.fillText(visibleLines[0].id, boxX + boxW / 4, boxY + 37);

				ctx.fillStyle = visibleLines[1].color;
				ctx.font = "bold 12px Tahoma, Verdana, sans-serif";
				ctx.fillText(visibleLines[1].value, boxX + boxW - boxW / 4, boxY + 25);
				ctx.font = "normal 12px Tahoma, Verdana, sans-serif";
				ctx.fillText(visibleLines[1].id, boxX + boxW - boxW / 4, boxY + 37);
			} else if (visibleLines.length === 3) {
				ctx.fillStyle = visibleLines[0].color;
				ctx.font = "bold 12px Tahoma, Verdana, sans-serif";
				ctx.fillText(visibleLines[0].value, boxX + boxW / 4, boxY + 25);

				ctx.fillStyle = visibleLines[1].color;
				ctx.font = "bold 12px Tahoma, Verdana, sans-serif";
				ctx.fillText(visibleLines[1].value, boxX + boxW - boxW / 4, boxY + 25);

				ctx.fillStyle = visibleLines[2].color;
				ctx.font = "bold 12px Tahoma, Verdana, sans-serif";
				ctx.fillText(visibleLines[2].value, boxX + boxW / 2, boxY + 37);
			} else if (visibleLines.length === 4) {
				ctx.fillStyle = visibleLines[0].color;
				ctx.font = "bold 12px Tahoma, Verdana, sans-serif";
				ctx.fillText(visibleLines[0].value, boxX + boxW / 4, boxY + 25);

				ctx.fillStyle = visibleLines[1].color;
				ctx.font = "bold 12px Tahoma, Verdana, sans-serif";
				ctx.fillText(visibleLines[1].value, boxX + boxW - boxW / 4, boxY + 25);

				ctx.fillStyle = visibleLines[2].color;
				ctx.font = "bold 12px Tahoma, Verdana, sans-serif";
				ctx.fillText(visibleLines[2].value, boxX + boxW / 4, boxY + 37);

				ctx.fillStyle = visibleLines[3].color;
				ctx.font = "bold 12px Tahoma, Verdana, sans-serif";
				ctx.fillText(visibleLines[3].value, boxX + boxW - boxW / 4, boxY + 37);
			}
			ctx.restore();
		}
	};

	ChartView.prototype.drawTopLine = function (ctx, model, data) {
		var i, x, y, len = model.startIndex + model.count + 1;
		if (len > data.length) {
			len = data.length;
		}

	    var preX = model.paddingLeft + model.shiftX - (model.startIndex >= 0 ? model.space : 0);
	    var preY = this.getYByValue(data[model.startIndex > 0 ? model.startIndex - 1 : 0], model);

		ctx.moveTo(preX, preY);
		for (i = model.startIndex; i < len; i++) {
			if (data[i] !== null) {
				x = preX + model.space;
				y = this.getYByValue(data[i], model);
				ctx.lineTo(x, y);
				preX = x;
				preY = y;
			}
		}
		ctx.stroke();
	};

	ChartView.prototype.drawBottomLine = function (ctx, model, data) {
		var i, x, y, len = model.bottomChart.count;
		if (len > data.length - 1) {
			len = data.length - 1;
		}
	    var preX = model.bottomChart.paddingLeft;
	    var preY = this.getYByValue(data[0], model.bottomChart);

		ctx.moveTo(preX, preY);
		for (i = 0; i < len; i++) {
			if (data[i] !== null) {
				x = preX + model.bottomChart.space;
				y = this.getYByValue(data[i], model.bottomChart);
				ctx.lineTo(x, y);
				preX = x;
				preY = y;
			}
		}
		ctx.stroke();
	};

	ChartView.prototype.drawBottomCaret = function (ctx, model) {
		// left
		ctx.beginPath();
		ctx.fillStyle = model.style[model.renderStyle].bottomColor;
		ctx.fillRect(
			model.bottomChart.caret.left.x, 
			model.bottomChart.caret.left.y, 
			model.bottomChart.caret.left.w, 
			model.bottomChart.caret.left.h
		);

		// frame
		ctx.beginPath();
		ctx.fillStyle = model.style[model.renderStyle].caretColor;
		ctx.fillRect(
			model.bottomChart.caret.frame.left.x, 
			model.bottomChart.caret.frame.left.y, 
			model.bottomChart.caret.frame.left.w, 
			model.bottomChart.caret.frame.left.h
		);
		ctx.fillRect(
			model.bottomChart.caret.frame.right.x, 
			model.bottomChart.caret.frame.right.y, 
			model.bottomChart.caret.frame.right.w, 
			model.bottomChart.caret.frame.right.h
		);
		ctx.fillRect(
			model.bottomChart.caret.frame.top.x, 
			model.bottomChart.caret.frame.top.y, 
			model.bottomChart.caret.frame.top.w, 
			model.bottomChart.caret.frame.top.h
		);
		ctx.fillRect(
			model.bottomChart.caret.frame.bottom.x, 
			model.bottomChart.caret.frame.bottom.y, 
			model.bottomChart.caret.frame.bottom.w, 
			model.bottomChart.caret.frame.bottom.h
		);

		if (model.bottomChart.width - (model.bottomChart.caret.right.x) + model.bottomChart.paddingLeft > 0) {
			// right
			ctx.beginPath();
			ctx.fillStyle = model.style[model.renderStyle].bottomColor;
			ctx.fillRect(
				model.bottomChart.caret.right.x, 
				model.bottomChart.caret.right.y, 
				model.bottomChart.caret.right.w, 
				model.bottomChart.caret.right.h
			);
		}

		ctx.closePath();
	};

	ChartView.prototype.drawLabels = function (ctx, model) {
		ctx.save();
		var i, x, y, w, h, label, name;
		for (i in model.labels) {
			label = model.labels[i];
			name = label.name;
			x = label.x;
			y = label.y;
			w = label.w;
			h = label.h;
			ctx.beginPath();
			ctx.lineWidth = 2;
			ctx.strokeStyle = model.style[model.renderStyle].labelBorder;
			ctx.roundRect(x, y, w, h, 14, false, true);

			if (label.active) {
				ctx.beginPath();
				ctx.lineWidth = 1;
				ctx.fillStyle = model.data.colors[label.id];
				ctx.arc(x + 13, y + 13, 8, 0, 2 * Math.PI);
				ctx.fill();

				ctx.beginPath();
				ctx.lineWidth = 2;
				ctx.strokeStyle = '#fff';
				ctx.moveTo(x + 10, y + 13);
				ctx.lineTo(x + 12, y + 16);
				ctx.lineTo(x + 17, y + 11);
				ctx.stroke();
			} else {
				ctx.beginPath();
				ctx.lineWidth = 2;
				ctx.strokeStyle = model.data.colors[label.id];
				ctx.arc(x + 13, y + 13, 8, 0, 2 * Math.PI);
				ctx.stroke();
			}

			ctx.beginPath();
			ctx.textBaseline = 'middle';
			ctx.font = "normal 14px Tahoma, Verdana, sans-serif";
			ctx.fillStyle = model.style[model.renderStyle].labelText;
			ctx.fillText(name, x + 26, y + 14);
		}
		ctx.restore();
	};

	ChartView.prototype.drawThemeSwitch = function (ctx, model) {
		var x = model.theme.x;
		var y = model.theme.y;
		var w = model.theme.w;
		var h = model.theme.h;
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.strokeStyle = model.style[model.renderStyle].labelBorder;
		ctx.roundRect(x, y, w, h, 14, false, true);

		ctx.beginPath();
		ctx.lineWidth = 1;
		if (model.theme.style === 'light') {
			ctx.fillStyle = model.style.dark.bgColor;
		} else {
			ctx.fillStyle = model.style.light.bgColor;
		}
		ctx.arc(x + 13, y + 13, 8, 0, 2 * Math.PI);
		ctx.fill();
	};

	exports.ChartView = ChartView;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var Utils = __webpack_require__(3);
	var EventDriven = __webpack_require__(4).EventDriven;

	var UI = function(params) {
		params = params || {};
		var classes = params.className;
	    if (params.extraClassName) {
	        classes += ' ' + params.extraClassName;
		}
		var attributes = null;
	    if (params.noDisplayOnCreate === true) {
	        attributes = [{display: 'none'}];
	    }
	    this.$container = (params.container == null ? Utils.createElement({class_name: classes, attributes: attributes}) : Utils.getElement(params.container));
	    this.parent = params.parent;

	    this.appendTo(params.appendTo || this.parent);
	};

	Utils.extend(UI, EventDriven);

	UI.prototype.appendTo = function(parent) {
	    if (!parent) return;
	    if (parent instanceof Element) {
	        parent.appendChild(this.$container);
	    } else if (parent instanceof UI) {
			if (parent.$container.append) {
				parent.$container.append(this.$container);
			} else {
				parent.$container.appendChild(this.$container);
			}
	    } else {
	        console.trace('ERROR: UI want to append to unsupported parent', parent);
	    }
	};

	UI.prototype.show = function() {
	    if (!this.hidden) {
	        return this;
	    }
	    this.hidden = false;
		Utils.show(this.$container);
	    return this;
	};

	UI.prototype.hide = function() {
	    if (this.hidden) {
	        return this;
	    }
	    this.hidden = true;
		Utils.hide(this.$container);
	    return this;
	};

	UI.prototype.destroy = function() {
	    if (this.$container) {
			Utils.removeElement(this.$container);
	        this.$container = null;
	    }
	};

	exports.UI = UI;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var Utils = __webpack_require__(3);
	var UI = __webpack_require__(8).UI;

	var MainView = function (params) {
	    MainView.superclass.constructor.call(this, params);
	    this.app = params.app;
	    this.createView();
	};

	Utils.inherit(MainView, UI);

	MainView.prototype.createView = function () {
	    // container for all charts
	};

	exports.MainView = MainView;

/***/ })
/******/ ]);