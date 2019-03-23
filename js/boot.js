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
/***/ (function(module, exports) {

	(function() {
		var browser = {
	        init: function() {
	            this.name = this.searchString(this.dataBrowser) || "an unknown browser";
	            this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
	            this.os = this.searchString(this.dataOS) || "an unknown OS";
	        },
	        searchString: function(b) {
	            for (var a = 0; a < b.length; a++) {
	                var c = b[a].string,
	                    d = b[a].prop;
	                this.versionSearchString = b[a].versionSearch || b[a].identity;
	                if (c) { if (-1 != c.indexOf(b[a].subString)) return b[a].identity; } else if (d) return b[a].identity;
	            }
	        },
	        searchVersion: function(b) { var a = b.indexOf(this.versionSearchString); if (-1 != a) return parseFloat(b.substring(a + this.versionSearchString.length + 1)); },
	        dataBrowser: [
	            { string: navigator.userAgent, subString: "OPR", identity: "Opera", versionSearch: "OPR" },
	            { string: navigator.userAgent, subString: "Chrome", identity: "Chrome" },
	            { string: navigator.userAgent, subString: "OmniWeb", versionSearch: "OmniWeb/", identity: "OmniWeb" },
	            { string: navigator.vendor, subString: "Apple", identity: "Safari", versionSearch: "Version" },
	            { prop: window.opera, identity: "Opera", versionSearch: "Version" },
	            { string: navigator.vendor, subString: "iCab", identity: "iCab" },
	            { string: navigator.vendor, subString: "KDE", identity: "Konqueror" },
	            { string: navigator.userAgent, subString: "FF", identity: "Firefox" },
	            { string: navigator.vendor, subString: "Camino", identity: "Camino" },
	            { string: navigator.userAgent, subString: "Netscape", identity: "Netscape" },
	            { string: navigator.userAgent, subString: "MSIE", identity: "IE", versionSearch: "MSIE" },
	            { string: navigator.userAgent, subString: "Gecko", identity: "Mozilla", versionSearch: "rv" },
	            { string: navigator.userAgent, subString: "Mozilla", identity: "Netscape", versionSearch: "Mozilla" }
	        ],
	        dataOS: [
	            { string: navigator.platform, subString: "Win", identity: "Windows" },
	            { string: navigator.platform, subString: "Mac", identity: "Mac" },
	            { string: navigator.userAgent, subString: "iPhone", identity: "iPhone/iPod" },
	            { string: navigator.platform, subString: "Linux", identity: "Linux" }
	        ]
	    };
	    browser.init();

		window.bootSettings = {
	        isDevMode: window.location.host.indexOf('localhost') !== -1,
	        browser: {
	            userAgent: navigator.userAgent,
	            userLanguage: navigator.userLanguage,
	            isMobileBrowser: (/Android|iPad|iPhone|Mobile|PalmOS|SymbOS|Windows Phone/i.test(navigator.userAgent)),
	            NOCACHE: Date.now(),
	            name: browser.name.toLowerCase(),
	            version: browser.version.toString().toLowerCase(),
	            os: browser.os.toLowerCase()
	        },
	        path: {
	            ROOT: ''
	        }
	    };

	    boot();

	    function boot() {
	        var linkInfo = getLinkInfo();
	        var pathname = linkInfo.pathname;

	        bootSettings.path.ROOT = pathname || '';
	        if (window.require)(window.require.moduleRoot = bootSettings.path.ROOT);

	        document.head.innerHTML =
	            '<title>...loading</title>' +

	            (bootSettings.browser.isMobileBrowser ? (
	                '<meta name="apple-mobile-web-app-status-bar-style" content="white"/>' +
	                '<meta name="apple-mobile-web-app-capable" content="yes">' +
	                '<meta name="mobile-web-app-capable" content="yes">' +
	                '<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width, minimal-ui">'
	            ) : '') +

				'<meta name="apple-mobile-web-app-status-bar-style" content="white">' +
				'<meta name="apple-mobile-web-app-capable" content="yes">' +
				'<meta name="mobile-web-app-capable" content="yes">' +
				'<meta data-n-head="true" charset="utf-8">' +
				'<meta data-n-head="true" name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width, minimal-ui">' +
				'<meta data-n-head="true" name="description" content="Telegram Contest: Charts">' +

				'<link href="data:image/png;base64,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" rel="icon" type="image/x-icon" />' +
	            '<link rel="stylesheet" href="' + getLinkNoCache('css/style.css') + '" type="text/css" charset="utf-8" />' +
	            '';

	        setTimeout(loadBundleJs, 0);

	        function loadBundleJs() {
	            var __JS__ = getLink('js/bundle.js', true); // Note: FALSE - for debug only (TRUE - for real)
	            addScript(__JS__);

				var rootClassNames = '';

	            if (isTouchDevice()) {
	                rootClassNames += 'touch-device';
				} else {
	                rootClassNames += 'desktop-pc';
				}

				rootClassNames += (' browser-name-' + bootSettings.browser.name + ' browser-version-' + bootSettings.browser.version + ' os-name-' + bootSettings.browser.os);
				document.querySelector('html').className = rootClassNames;
	        }
	    }

	    function isTouchDevice () {
	        try { 
				document.createEvent("TouchEvent"); 
				return true; 
			} catch(e) { 
				return false; 
			}
	    }

	    function getLinkInfo() {
	        var link = window.location.href;
	        var info = link.split('index.html')[0];
	        if (info === 'file:///') info = '';
	        return {
	            pathname: info
	        };
	    }

	    function getLink(link, nocache) {
	        if (nocache) {
	            return getLinkNoCache(link);
	        } else {
	            return bootSettings.path.ROOT + (link);
	        }
	    }

	    function getLinkNoCache(link) {
	        return bootSettings.path.ROOT + addNoCache(link);
	    }

	    function addNoCache(link) {
	        return link + '?' + bootSettings.browser.NOCACHE;
	    }

	    function addScript(src, async) {
	        var script = document.createElement('script');
	        if (async) script.async = true;
	        script.src = src;
	        document.head.appendChild(script);
	        return script;
		}
	})();

/***/ })
/******/ ]);