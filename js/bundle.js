!function(t){function e(i){if(o[i])return o[i].exports;var n=o[i]={exports:{},id:i,loaded:!1};return t[i].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var o={};return e.m=t,e.c=o,e.p="",e(0)}([function(t,e,o){o(1),o(3),o(5),o(2),o(4),o(6),o(7),o(9),t.exports=o(8)},function(t,e,o){var i=o(2).ClientApp;!function(){window.clientApp=new i,clientApp.run()}()},function(t,e,o){var i=o(3),n=o(4).EventDriven,a=o(5).Chart,r=o(9).MainView,s=function(){this.device=null,this.mainView=null,this.chartsData=null};i.extend(s,n),s.prototype.run=function(){i.getElement("body").innerHTML="",i.getElement("title").innerText="TELEGRAM CONTEST CHARTS",i.on("body","contextmenu",function(t){i.no(t,!0)});try{document.createEvent("TouchEvent"),this.device="touch"}catch(t){this.device="mouse"}this.fetchRemoteData(function(t){this.chartsData=t,this.mainView=new r({app:this,className:"charts-container",appendTo:i.getElement("body")});for(var e=1;e<=this.chartsData.length;e++){var o="chart"+e;this[o]=new a({id:o,title:"Chart "+e,app:this,chartData:this.chartsData[e-1],appendTo:this.mainView})}window.onresize=function(){this.onViewResize()}.bind(this)}.bind(this))},s.prototype.onViewResize=function(){this.trigger("resize")},s.prototype.fetchRemoteData=function(t){i.remoteRequest("/tgcc/chart_data.json",function(e){var o,i,n,a,r,s,h,l,d,m,c=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],f=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];try{n=JSON.parse(e),r=[];for(o in n){if(a=n[o],s={lines:{},names:a.names,actives:[],keys:Object.keys(a.names),colors:a.colors},a.names){h=Object.keys(a.columns);for(i in h)l=h[i],d=a.columns[l],m=d[0],d.shift(),"x"===m&&(d=d.map(function(t){var e=new Date(t);return c[e.getDay()]+", "+f[e.getMonth()]+" "+e.getDate()})),d.push(null),s.lines[m]=d,s.actives[m]=!0}r.push(s)}}catch(t){r=null}t(r)})},e.ClientApp=s},function(t,e){var o=CanvasRenderingContext2D.prototype.moveTo,i=CanvasRenderingContext2D.prototype.lineTo,n=CanvasRenderingContext2D.prototype.fillRect,a=CanvasRenderingContext2D.prototype.strokeRect,r=CanvasRenderingContext2D.prototype.rect,s=CanvasRenderingContext2D.prototype.clearRect;CanvasRenderingContext2D.prototype.moveTo=function(t,e){t=t>0?~~t:t,e=e>0?~~e:e,this.lineWidth%2!==0&&(t+=.5,e+=.5),o.apply(this,arguments)},CanvasRenderingContext2D.prototype.lineTo=function(t,e){t=t>0?~~t:t,e=e>0?~~e:e,this.lineWidth%2!==0&&(t+=.5,e+=.5),i.apply(this,arguments)},CanvasRenderingContext2D.prototype.fillRect=function(t,e,o,i){t=~~t,e=~~e,o=~~o,i=~~i,n.apply(this,arguments)},CanvasRenderingContext2D.prototype.strokeRect=function(t,e,o,i){t=~~t,e=~~e,o=~~o,i=~~i,a.apply(this,arguments)},CanvasRenderingContext2D.prototype.rect=function(t,e,o,i){t=~~t,e=~~e,o=~~o,i=~~i,r.apply(this,arguments)},CanvasRenderingContext2D.prototype.roundRect=function(t,e,o,i,n,a,r){var s={upperLeft:0,upperRight:0,lowerLeft:0,lowerRight:0};"undefined"==typeof r&&(r=!0);var h;if("object"==typeof n)for(h in n)s[h]=n[h];if("number"==typeof n)for(h in s)s[h]=n;this.beginPath(),this.moveTo(t+s.upperLeft,e),this.lineTo(t+o-s.upperRight,e),this.quadraticCurveTo(t+o,e,t+o,e+s.upperRight),this.lineTo(t+o,e+i-s.lowerRight),this.quadraticCurveTo(t+o,e+i,t+o-s.lowerRight,e+i),this.lineTo(t+s.lowerLeft,e+i),this.quadraticCurveTo(t,e+i,t,e+i-s.lowerLeft),this.lineTo(t,e+s.upperLeft),this.quadraticCurveTo(t,e,t+s.upperLeft,e),this.closePath(),r&&this.stroke(),a&&this.fill()},CanvasRenderingContext2D.prototype.clearRect=function(t,e,o,i){t=~~t,e=~~e,o=~~o,i=~~i,s.apply(this,arguments)},window.requestAnimationFrame||(window.requestAnimationFrame=function(){return window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t,e){var o=(new Date).getTime(),i=Math.max(0,16-(o-("undefined"!=typeof lastTime?lastTime:0))),n=window.setTimeout(function(){t(o+i)},i);return lastTime=o+i,n}}()),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)}),"NodeList"in window&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=function(t,e){e=e||window;for(var o=0;o<this.length;o++)t.call(e,this[o],o,this)}),e.inherit=function(t,e){if(!t)throw"Inherit - child undefined!";if(!e)throw"Inherit - parent undefined!";var o,i,n=t.prototype;t.prototype=Object.create(e.prototype);var a=Object.getOwnPropertyNames(n);for(o=a.length;o--;)n.hasOwnProperty(a[o])&&(i=Object.getOwnPropertyDescriptor(n,a[o]),Object.defineProperty(t.prototype,a[o],i));t.prototype.constructor=t,t.superclass=e.prototype},e.extend=function t(e,o,i){if(!e)throw"Extend - class undefined!";if(!o)throw"Extend - trait undefined!";var n=o,a=i?e:e.prototype;o.prototype&&t(e,o.prototype,i);for(var r in n){var s=Object.getOwnPropertyDescriptor(n,r);s&&Object.defineProperty(a,r,s)}},e.no=function(t,e){"undefined"!=typeof t.preventDefault&&t.preventDefault(),"undefined"!=typeof t.returnValue&&(t.returnValue=!1),e===!0&&("undefined"!=typeof t.stopPropagation&&t.stopPropagation(),"undefined"!=typeof t.cancelBubble&&(t.cancelBubble=!0))},e.calculateWidth=function(t,e){this.canvas||(this.canvas=l({tag:"canvas",class_name:"technical",attributes:[{width:"100"},{height:"100"}]}),this.ctx=this.canvas.getContext("2d"),this.fontFamily="Tahoma",this.fontSize=12,this.paddingLeft=5,this.paddingRight=5,this.ctx.font=this.fontSize+"px "+this.fontFamily),t=t||"",e=e||{};var o=!1;e.fontFamily&&"string"==typeof e.fontFamily&&(this.fontFamily=e.fontFamily,o=!0),e.fontSize&&"number"==typeof e.fontSize&&(this.fontSize=e.fontSize,o=!0),o&&(this.ctx.font=this.fontSize+"px "+this.fontFamily),null!=e.paddingLeft&&"number"==typeof e.paddingLeft&&(this.paddingLeft=e.paddingLeft),null!=e.paddingRight&&"number"==typeof e.paddingRight&&(this.paddingRight=e.paddingRight);var i=this.ctx.measureText(t);return this.paddingLeft+i.width+this.paddingRight};var h=function(t){return"undefined"!=typeof t&&t?"string"==typeof t?document.querySelector(t):t instanceof HTMLElement?t:null:null};e.getElement=h;var l=function(t){if("object"!=typeof t)return null;var o,i,n,a,r,s,l,d,m;if(o="string"!=typeof t.tag?"DIV":t.tag.toUpperCase(),"br"==o.toLowerCase())return null;i=t.id||null,"?"==i&&(i=o+e.uid()),n="undefined"==typeof t.target||null==t.target?document.getElementsByTagName("body")[0]:"string"==typeof n?h(n):t.target,"undefined"!=typeof n&&null!=n||(n=document.getElementsByTagName("body")[0]),a="undefined"!=typeof t.display?t.display===!0:null,r=t.class_name||null,s=t.style||null,l=t.attributes||null,m=t.before||null,d=t.html||null;var c=document.createElement(o);return null!==i&&(c.id=i),null!==r&&(c.className=r),null!==d&&(c.innerHTML=d),null!==s&&c.setAttribute("style",s),a===!1&&(c.style.display="none"),null!==l&&l.length>0&&l.forEach(function(t){c.setAttribute(Object.keys(t)[0],t[Object.keys(t)[0]])}),"undefined"!=typeof m?("number"==typeof m?m=n.children[m]:"string"==typeof m&&(m=h(m)),n.insertBefore(c,m)):n.appendChild(c),c};e.createElement=l,e.hasClass=function(t,e){return"undefined"!=typeof e&&(t=h(t),!!t&&t.className.indexOf(e)!==-1)},e.addClass=function(t,e){return"undefined"!=typeof e&&(!!(t=h(t))&&(t.className.indexOf(e)===-1&&(t.className=(t.className+" "+e).trim(),t)))},e.removeClass=function(t,e){if(t=h(t),!t)return!1;if("undefined"!=typeof e){var o=t.className;return t.className=o.replace(e,"").trim(),t}},e.toggleClass=function(t,o,i){return t=h(t),!!t&&("undefined"!=typeof o?"undefined"!=typeof i?i===!0?e.addClass(t,o):e.removeClass(t,o):e.hasClass(t,o)?e.removeClass(t,o):e.addClass(t,o):void 0)};var d=function(t){for(var e=0,o=0;t;)o+=parseInt(t.offsetTop,10),e+=parseInt(t.offsetLeft,10),t=el_.offsetParent;return{left:e,top:o}},m=function(t){var e=t.getBoundingClientRect(),o=document.body,i=document.documentElement,n=window.pageYOffset||i.scrollTop||o.scrollTop,a=window.pageXOffset||i.scrollLeft||o.scrollLeft,r=i.clientTop||o.clientTop||0,s=i.clientLeft||o.clientLeft||0,h=e.top+n-r,l=e.left+a-s;return{left:Math.round(l),top:Math.round(h)}},c=function(t){return t=h(t),!!t&&(t.getBoundingClientRect?m(t):d(t))};e.box=function(t,e,o){if(t=h(t),!t)return!1;if("undefined"==typeof e||"object"!=typeof e){var i=c(t),n=i.left,a=i.top,r=t.offsetWidth,s=t.offsetHeight;return{l:n,t:a,w:r,h:s,left:n,top:a,width:r,height:s}}return o!==!0&&(t.style.position="absolute"),"undefined"!=typeof e.l?t.style.left=""+e.l+"px":"undefined"!=typeof e.left&&(t.style.left=""+e.left+"px"),"undefined"!=typeof e.t?t.style.top=""+e.t+"px":"undefined"!=typeof e.top&&(t.style.top=""+e.top+"px"),"undefined"!=typeof e.w?t.style.width=""+e.w+"px":"undefined"!=typeof e.width&&(t.style.width=""+e.width+"px"),"undefined"!=typeof e.h?t.style.height=""+e.h+"px":"undefined"!=typeof e.height&&(t.style.height=""+e.height+"px"),t},e.isPointInBox=function(t,o,i){var n=t.x||t.pageX,a=t.y||t.pageY,r=!1;return n>=o.l&&n<=o.l+o.w&&a>=o.t&&a<=o.t+o.h&&(r=!0),r&&"undefined"!=typeof i&&(r=e.isPointInBox(t,i)),r};var f,p;document.addEventListener?(f=function(t,e,o,i){return!!(t=h(t))&&(t.addEventListener(e,o,!!i),o)},p=function(t,e,o,i){return!!(t=h(t))&&(t.removeEventListener(e,o,!!i),!0)}):document.attachEvent?(f=function(t,e,o){if(t=h(t),!t)return!1;e="on"+e;var i=function(){return o.apply(t,arguments)};return t.attachEvent(e,i),i},p=function(t,e,o){return!!(t=h(t))&&(e="on"+e,t.detachEvent(e,o),!0)}):(f=function(t,e,o){if(t=h(t),!t)return!1;e="on"+e,t.store=t.store||{},t.store[e]||(t.store[e]={counter:1},t[e]=function(){for(var t in i)i.hasOwnProperty(t)&&"function"==typeof i[t]&&i[t].apply(this,arguments)});var i=t.store[e],n=i.counter++;return i[n]=o,n},p=function(t,e,o){return!!(t=h(t))&&(e="on"+e,t.store&&t.store[e]&&t.store[e][o]&&(t.store[e][o]=void 0),!0)}),e.on=f,e.off=p,e.remoteRequest=function(t,e,o,i){var n=function(t,e){var o,i="",n=encodeURIComponent;for(o in t)i+="&"+n(o)+"="+n(t[o]);return i.slice(1)+(e?"":"&_t="+Date.now())};o&&"object"==typeof o&&(o=n(o,i));try{var a=new XMLHttpRequest("MSXML2.XMLHTTP.3.0");a.open(o?"POST":"GET",t,1),a.setRequestHeader("X-Requested-With","XMLHttpRequest"),a.setRequestHeader("Content-type",(o?"application/x-www-form-urlencoded":"application/json")+"; charset=UTF-8"),a.onreadystatechange=function(){a.readyState>3&&e&&e(a.responseText,a)},a.send(o)}catch(t){console.error(t.message)}}},function(t,e){var o,i,n,a,r,s,h,l=function(){this._events={}};l.prototype.on=function(t,e,o,i){var n;"function"==typeof e&&(i=o,o=e,e=void 0);var a=this._events||(this._events={}),r=a[t]||(a[t]=[]);return r.push([n||o,i,e]),this},l.prototype.off=function(t,e){var o=this._events||(this._events={}),i=o[t]||(o[t]=[]);return o[t]=i.filter(function(t){return void 0!==e&&t[1]!==e}),this},l.prototype.destroy=function(){this._events={}},l.prototype.execute=function(t){for(o=this._events||(this._events={}),i=o[t]||(o[t]=[]),n=Array.prototype.splice.call(arguments,1),s=i.length,r=0;r<s;r++)h=i[r][1]||this,a="undefined"!=typeof i[r][2]?n.concat([i[r][2]]):n,i[r][0].apply(h,a)},l.prototype.trigger=function(t,e){this.execute.apply(this,arguments)},e.EventDriven=l},function(t,e,o){var i=o(3),n=o(4).EventDriven,a=o(6).Interaction,r=o(7).ChartView,s=function(t){this.id=t.id,this.app=t.app,this.title=t.title,this.data=t.chartData||[],this.container=t.appendTo,this.isModelRefreshed=!1,this.animationDuration=170,this.currentAnimationCancel=null,this.model={id:this.id,data:this.data,title:this.title,renderStyle:"dark",style:{light:{bgColor:"#ffffff",title:"#222222",tooltipBg:"#ffffff",tooltipShadow:"#999",tooltipTitle:"#222222",axisColor:"#ecf0f3",gridColor:"#f2f4f5",timeColor:"#96a2aa",gridValuesColor:"#96a2aa",crosshairColor:"#dfe6eb",bottomColor:"rgba(243,248,250,0.81)",caretColor:"rgba(184,211,230,0.47)",labelBorder:"#e6ecf0",labelText:"#43484b"},dark:{bgColor:"#242f3e",title:"#ffffff",tooltipBg:"#253241",tooltipShadow:"#111",tooltipTitle:"#ffffff",axisColor:"#313d4d",gridColor:"#293544",timeColor:"#546778",gridValuesColor:"#546778",crosshairColor:"#3b4a5a",bottomColor:"rgba(30,41,54,0.81)",caretColor:"rgba(95,129,157,0.47)",labelBorder:"#344658",labelText:"#e8ecee"}},renderMode:1,draggingMode:!1,startIndex:null,shiftX:0,count:20,countShift:1,minCount:20,space:20,lineWidth:2,scale:1,paddingTop:40,paddingBottom:110,paddingLeft:0,paddingRight:0,digits:0,interactionDownX:null,interactionDownY:null,interactionDownStartIndex:null,interactionMoveX:null,interactionMoveY:null,interactionActivated:!1,bottomChart:{top:0,left:0,height:34,width:0,lineWidth:1,paddingLeft:10,paddingRight:10,caret:{left:{x:0,y:0,w:0,h:0},right:{x:0,y:0,w:0,h:0},frame:{x:0,y:0,w:0,h:0,left:{x:0,y:0,w:0,h:0},right:{x:0,y:0,w:0,h:0}}}},labels:[],theme:{}},this.view=new r({app:this.app,className:"chart "+this.id,extraClassName:this.model.renderStyle,appendTo:this.container}),this.interaction=new a({app:this.app,view:this.view}),this.bindEvents()};i.extend(s,n),s.prototype.bindEvents=function(){this.app.on("resize",this.onViewResize,this),this.view.on("ready",this.onViewReady,this)},s.prototype.onViewReady=function(){this.model.startIndex=this.model.data.lines.x.length-this.model.count,this.interactionActivated||(this.model.interactionActivated=!0,this.bindInteractionEvents(),this.interaction.activate()),this.onViewResize()},s.prototype.onViewResize=function(){this.data&&(this.view.resize(),this.refreshModel())},s.prototype.bindInteractionEvents=function(){this.interaction.on("down",this.onInteractionDown,this),this.interaction.on("move",this.onInteractionMove,this),this.interaction.on("up",this.onInteractionUp,this)},s.prototype.unBindInteractionEvents=function(){this.interaction.off("down",this),this.interaction.off("move",this),this.interaction.off("up",this)},s.prototype.getXFromEvent=function(t){return t.targetTouches?t.targetTouches.length?t.targetTouches[0].pageX-this.view.left:t.changedTouches.length?t.changedTouches[0].pageX-this.view.left:void 0:(t.pageX||0)-this.view.left},s.prototype.getYFromEvent=function(t){return t.targetTouches?t.targetTouches.length?t.targetTouches[0].pageY-this.view.top:t.changedTouches.length?t.changedTouches[0].pageY-this.view.top:void 0:(t.pageY||0)-this.view.top},s.prototype.onInteractionDown=function(t){this.interactionPart=null;var e=this.getXFromEvent(t),o=this.getYFromEvent(t),n={l:this.model.left,t:this.model.top,w:this.model.width,h:this.model.height};if(i.isPointInBox({x:e,y:o},n)){this.interactionPart="topChart","mouse"===this.app.device&&(this.model.draggingMode=!0),this.model.interactionDownX=this.getXFromEvent(t)-this.model.shiftX,this.model.interactionDownY=this.getYFromEvent(t);var a=this.model.data.lines.x.length-this.model.count;return this.model.interactionDownStartIndex=this.model.startIndex||a,void(null==this.model.startIndex?this.model.interactionDownStartIndex=a:this.model.interactionDownStartIndex=this.model.startIndex)}var r={l:this.model.bottomChart.caret.frame.left.x-1,t:this.model.bottomChart.caret.frame.left.y-1,w:this.model.bottomChart.caret.frame.left.w+2,h:this.model.bottomChart.caret.frame.left.h+2};if(i.isPointInBox({x:e,y:o},r))return this.interactionPart="caretFrameLeft",this.model.interactionDownX=this.getXFromEvent(t)+this.model.shiftX*this.model.bottomChart.space/this.model.space,this.model.interactionDownY=this.getYFromEvent(t),this.model.interactionDownStartIndex=this.model.startIndex,void(this.model.interactionDownStartCount=this.model.count);var s={l:this.model.bottomChart.caret.frame.right.x-1,t:this.model.bottomChart.caret.frame.right.y-1,w:this.model.bottomChart.caret.frame.right.w+2,h:this.model.bottomChart.caret.frame.right.h+2};if(i.isPointInBox({x:e,y:o},s))return this.interactionPart="caretFrameRight",this.model.interactionDownX=this.getXFromEvent(t)+this.model.shiftX*this.model.bottomChart.space/this.model.space,this.model.interactionDownY=this.getYFromEvent(t),this.model.interactionDownStartIndex=this.model.startIndex,void(this.model.interactionDownStartCount=this.model.count);var h={l:this.model.bottomChart.caret.frame.x-1,t:this.model.bottomChart.caret.frame.y-1,w:this.model.bottomChart.caret.frame.w+2,h:this.model.bottomChart.caret.frame.h+2};if(i.isPointInBox({x:e,y:o},h))return this.interactionPart="caretFrame",this.model.interactionDownX=this.getXFromEvent(t)+this.model.shiftX*this.model.bottomChart.space/this.model.space,this.model.interactionDownY=this.getYFromEvent(t),void(this.model.interactionDownStartIndex=this.model.startIndex);var l,d={l:this.model.bottomChart.caret.left.x-1,t:this.model.bottomChart.caret.left.y-1,w:this.model.bottomChart.caret.left.w+2,h:this.model.bottomChart.caret.left.h+2};if(i.isPointInBox({x:e,y:o},d))return this.interactionPart="caretLeft",this.model.interactionDownX=this.getXFromEvent(t)+this.model.shiftX*this.model.bottomChart.space/this.model.space,l=(this.model.interactionDownX-this.model.bottomChart.paddingLeft)/this.model.bottomChart.space,this.model.startIndex=Math.floor(l-this.model.count/2),void this.correctPosition();var m={l:this.model.bottomChart.caret.right.x-1,t:this.model.bottomChart.caret.right.y-1,w:this.model.bottomChart.caret.right.w+2,h:this.model.bottomChart.caret.right.h+2};if(i.isPointInBox({x:e,y:o},m))return this.interactionPart="caretRight",this.model.interactionDownX=this.getXFromEvent(t)+this.model.shiftX*this.model.bottomChart.space/this.model.space,l=(this.model.interactionDownX-this.model.bottomChart.paddingLeft)/this.model.bottomChart.space,this.model.startIndex=Math.floor(l-this.model.count/2),void this.correctPosition();for(var c in this.model.labels){var f=this.model.labels[c],p={l:f.x,t:f.y,w:f.w,h:f.h};if(i.isPointInBox({x:e,y:o},p))return void(this.interactionPart=f.id)}var u={l:this.model.theme.x,t:this.model.theme.y,w:this.model.theme.w,h:this.model.theme.h};i.isPointInBox({x:e,y:o},u)&&(this.interactionPart="theme")},s.prototype.onInteractionMove=function(t){requestAnimationFrame(function(){var e,o;this.model.interactionMoveX=this.getXFromEvent(t),this.model.interactionMoveY=this.getYFromEvent(t),"topChart"===this.interactionPart&&"touch"!=this.app.device&&null!=this.model.interactionDownX&&null!=this.model.interactionDownY&&null!=this.model.interactionDownStartIndex&&(e=this.model.interactionMoveX-this.model.interactionDownX,o=e>=0?Math.floor(e/this.model.space):Math.ceil(e/this.model.space),this.model.startIndex=this.model.interactionDownStartIndex-o,this.model.shiftX=e-Math.floor(o*this.model.space)),"caretFrame"===this.interactionPart&&null!=this.model.interactionDownX&&null!=this.model.interactionDownY&&null!=this.model.interactionDownStartIndex&&(e=this.model.interactionMoveX-this.model.interactionDownX,o=e>=0?Math.floor(e/this.model.bottomChart.space):Math.ceil(e/this.model.bottomChart.space),this.model.startIndex=this.model.interactionDownStartIndex+o,this.model.shiftX=(-e+Math.floor(o*this.model.bottomChart.space))*this.model.space/this.model.bottomChart.space,this.correctPosition()),"caretFrameLeft"===this.interactionPart&&null!=this.model.interactionDownX&&null!=this.model.interactionDownY&&null!=this.model.interactionDownStartIndex&&null!=this.model.interactionDownStartCount&&(e=this.model.interactionMoveX-this.model.interactionDownX,o=e>=0?Math.floor(e/this.model.bottomChart.space):Math.ceil(e/this.model.bottomChart.space),this.model.interactionDownStartIndex+o<0?(this.model.startIndex=0,this.model.shiftX=0):this.model.interactionDownStartCount-e/this.model.bottomChart.space>this.model.minCount&&(this.model.startIndex=this.model.interactionDownStartIndex+o,this.model.shiftX=(-e+o*this.model.bottomChart.space)*this.model.space/this.model.bottomChart.space,o=e/this.model.bottomChart.space,this.model.count=this.model.interactionDownStartCount-o),this.correctPosition()),"caretFrameRight"===this.interactionPart&&null!=this.model.interactionDownX&&null!=this.model.interactionDownY&&null!=this.model.interactionDownStartIndex&&null!=this.model.interactionDownStartCount&&(e=this.model.interactionMoveX-this.model.interactionDownX,o=e/this.model.bottomChart.space,this.model.count=this.model.interactionDownStartCount+o,this.model.interactionDownStartIndex+this.model.count>=this.model.data.lines.x.length&&(this.model.count=this.model.data.lines.x.length-this.model.interactionDownStartIndex),this.correctPosition()),this.correctPosition(),this.refreshModel()}.bind(this))},s.prototype.correctPosition=function(){var t=this.model.data.lines.x.length-this.model.count;this.model.startIndex>=t?(this.model.startIndex=~~t,this.model.count=~~this.model.count,this.model.shiftX=0):this.model.startIndex<=0&&(this.model.startIndex=0,this.model.shiftX=0),this.model.count<this.model.minCount&&(this.model.count=this.model.minCount)},s.prototype.onInteractionUp=function(t){this.model.paddingRight=0,this.model.draggingMode=!1,i.toggleClass(this.view.canvas,"grabbing",!1),"touch"!=this.app.device&&(this.model.interactionMoveX=null,this.model.interactionMoveY=null),this.model.interactionDownX=null,this.model.interactionDownY=null,this.model.interactionDownStartIndex=null,this.model.interactionDownStartCount=null;var e=this.getXFromEvent(t),o=this.getYFromEvent(t);for(var n in this.model.labels){var a=this.model.labels[n],r={l:a.x,t:a.y,w:a.w,h:a.h};i.isPointInBox({x:e,y:o},r)&&this.interactionPart===a.id&&(this.model.data.actives[a.id]=!this.model.data.actives[a.id])}var s={l:this.model.theme.x,t:this.model.theme.y,w:this.model.theme.w,h:this.model.theme.h};i.isPointInBox({x:e,y:o},s)&&"theme"===this.interactionPart&&(i.toggleClass(this.view.$container,"dark",!1),i.toggleClass(this.view.$container,"light",!1),this.model.renderStyle="dark"===this.model.renderStyle?"light":"dark",i.toggleClass(this.view.$container,this.model.renderStyle,!0)),this.interactionPart=null,requestAnimationFrame(function(){this.refreshModel()}.bind(this))},s.prototype.refreshModel=function(){var t=null;this.correctPosition(),this.isModelRefreshed&&(t={scale:this.model.scale,min:this.model.min,max:this.model.max});var e=this.model.data.lines.x.length,o=Math.min(this.model.count,e);this.model.max=-999999999,this.model.min=999999999;var n,a,r,s;for(a=this.model.startIndex;a<this.model.startIndex+o;a++)for(r=0;r<this.model.data.keys.length;r++)n=this.model.data.keys[r],s=this.model.data.actives[n],s&&null!==this.model.data.lines[n][a]&&(this.model.data.lines[n][a]<this.model.min&&(this.model.min=this.model.data.lines[n][a]),this.model.data.lines[n][a]>this.model.max&&(this.model.max=this.model.data.lines[n][a]));this.model.max===-999999999&&(this.model.max=1),999999999===this.model.min&&(this.model.min=0),this.model.left=this.model.paddingLeft,this.model.top=this.model.paddingTop,this.model.width=this.view.canvas.width-this.model.paddingLeft-this.model.paddingRight,this.model.height=this.view.canvas.height-this.model.paddingTop-this.model.paddingBottom,this.model.space=this.model.width/(this.model.count-1),this.model.scale=(this.model.max-this.model.min)/this.model.height,this.model.axisXValues=[];var h=e-1,l=Math.ceil(60/this.model.space),d=Math.pow(2,Math.ceil(Math.log2(l)));for(a=e-1;a>0;a--)(h-a)%d===0&&(this.model.axisXValues.push(a),h=a);d=2;var m=this.model.max.toString().length;2===m?d=5:m>=3&&(d=Math.pow(10,m-2));var c=this.model.min,f=this.view.getYByValue(c,this.model);for(this.model.axisYValues=[c],c=Math.floor(c/d)*d,a=c;a<=this.model.max;a+=d)if(a%d===0){var p=this.view.getYByValue(a,this.model);f-p>=40&&(this.model.axisYValues.push(a),f=p)}for(this.model.crosshairX=null,this.model.crosshairY=null,this.model.hoveredIndex=null,null!=this.model.interactionMoveX&&null!=this.model.interactionMoveY&&(this.model.crosshairX=this.model.interactionMoveX,this.model.crosshairY=this.model.interactionMoveY,this.model.hoveredIndex=Math.round(this.model.crosshairX/this.model.space)),this.model.bottomChart.startIndex<0&&(this.model.bottomChart.startIndex=0),this.model.bottomChart.max=-999999999,this.model.bottomChart.min=999999999,a=0;a<e;a++)for(r=0;r<this.model.data.keys.length;r++)n=this.model.data.keys[r],s=this.model.data.actives[n],s&&null!==this.model.data.lines[n][a]&&(this.model.data.lines[n][a]<this.model.bottomChart.min&&(this.model.bottomChart.min=this.model.data.lines[n][a]),this.model.data.lines[n][a]>this.model.bottomChart.max&&(this.model.bottomChart.max=this.model.data.lines[n][a]));this.model.bottomChart.max===-999999999&&(this.model.bottomChart.max=0),999999999===this.model.bottomChart.min&&(this.model.bottomChart.min=0),this.model.bottomChart.paddingTop=this.model.height+this.model.paddingTop+30,this.model.bottomChart.count=e,this.model.bottomChart.left=this.model.bottomChart.paddingLeft,this.model.bottomChart.width=this.view.canvas.width-this.model.bottomChart.paddingLeft-this.model.bottomChart.paddingRight,this.model.bottomChart.space=this.model.bottomChart.width/(e-1),this.model.bottomChart.scale=(this.model.bottomChart.max-this.model.bottomChart.min)/this.model.bottomChart.height,this.model.minCount=Math.floor(50/this.model.bottomChart.space);var u=this.model.bottomChart.space*this.model.shiftX/this.model.space,v=this.model.bottomChart.paddingLeft+this.model.startIndex*this.model.bottomChart.space-u,g=this.model.bottomChart.paddingTop-3,y=Math.floor(this.model.count*this.model.bottomChart.space),w=this.model.bottomChart.height+6;this.model.bottomChart.caret.left={x:this.model.bottomChart.paddingLeft,y:g,w:v-this.model.bottomChart.paddingLeft,h:w},this.model.bottomChart.caret.right={x:v+y,y:g,w:this.model.bottomChart.width-(v+y)+this.model.bottomChart.paddingLeft+2,h:w},this.model.bottomChart.caret.frame={left:{x:v,y:g,w:6,h:w},right:{x:v+y-6,y:g,w:6,h:w},top:{x:v+6,y:g,w:y-12,h:1},bottom:{x:v+6,y:g+w-1,w:y-12,h:1},x:v,y:g,w:y,h:w},this.model.labels=[];var x=this.model.bottomChart.caret.left.x;g=this.model.bottomChart.caret.left.y+this.model.bottomChart.caret.left.h+8,w=26;for(a in this.model.data.keys){var b=this.model.data.keys[a],C=this.model.data.names[b];y=i.calculateWidth(C,{fontFamily:"Tahoma, Verdana, sans-serif",fontSize:14,paddingLeft:26,paddingRight:7}),v=x+a*(y+8);var T={id:b,name:C,x:v,y:g,w:y,h:w,active:this.model.data.actives[b]};this.model.labels.push(T)}var S=x+this.model.bottomChart.width;this.model.theme={id:"theme",x:S-26,y:g,w:26,h:w,style:this.model.renderStyle},this.isModelRefreshed=!0;var D=null;t&&(D={scale:this.model.scale,min:this.model.min,max:this.model.max},this.prevState=D),t&&D&&this.hasDiff(t,D)?this.animateTransition(t,D):this.view.refresh(this.model)},s.prototype.hasDiff=function(t,e){return t.scale!==e.scale||(t.min!==e.min||t.max!==e.max)},s.prototype.animateTransition=function(t,e){var o=this,i=performance.now(),n=this.animationDuration;this.raf&&(n=this.animationDuration/2,cancelAnimationFrame(this.raf),this.raf=null),this.rafInRaf&&(n=this.animationDuration/4,cancelAnimationFrame(this.rafInRaf),this.rafInRaf=null),this.raf=requestAnimationFrame(function a(r){var s=(r-i)/n;s>1&&(s=1),o.view.render(o.transition(t,e,s)),s<1?o.rafInRaf=requestAnimationFrame(a):(o.raf=null,o.rafInRaf=null)})},s.prototype.transition=function(t,e,o){return t.scale!==e.scale&&(this.model.scale=t.scale+(e.scale-t.scale)*o),t.min!==e.min&&(this.model.min=t.min+(e.min-t.min)*o),t.max!==e.max&&(this.model.max=t.max+(e.max-t.max)*o),this.model},s.prototype.getModel=function(){return this.model},e.Chart=s},function(t,e,o){var i=o(3),n=o(4).EventDriven,a=function(t){this.app=t.app,this.view=t.view,this.active=!1};i.extend(a,n),a.prototype.activate=function(){this.view&&(this.active=!0,this.bindViewEvents())},a.prototype.deActivate=function(){this.view&&(this.active=!1,this.unBindViewEvents())},a.prototype.bindViewEvents=function(){this.view&&("mouse"===this.app.device?(i.on(this.view.$container,"mousedown",this.onEventDown.bind(this)),i.on(this.view.$container,"mousemove",this.onEventMove.bind(this)),i.on(this.view.$container,"mouseup",this.onEventUp.bind(this)),i.on(this.view.$container,"mouseout",this.onEventUp.bind(this)),i.on(this.view.$container,"mouseleave",this.onEventUp.bind(this))):"touch"===this.app.device&&(i.on(this.view.$container,"touchstart",this.onEventDown.bind(this)),i.on(this.view.$container,"touchmove",this.onEventMove.bind(this)),i.on(this.view.$container,"touchend",this.onEventUp.bind(this))))},a.prototype.unBindViewEvents=function(){this.view&&("mouse"===this.app.device?(i.off(this.view.$container,"mousedown"),i.off(this.view.$container,"mousemove"),i.off(this.view.$container,"mouseup"),i.off(this.view.$container,"mouseout"),i.off(this.view.$container,"mouseleave"),i.off(this.view.$container,"mousewheel")):"touch"===this.app.device&&(i.off(this.view.$container,"touchstart"),i.off(this.view.$container,"touchmove"),i.off(this.view.$container,"touchend")))},a.prototype.onEventDown=function(t){this.trigger("down",t)},a.prototype.onEventMove=function(t){this.trigger("move",t)},a.prototype.onEventUp=function(t){this.trigger("up",t)},e.Interaction=a},function(t,e,o){var i=o(3),n=o(8).UI,a=function(t){a.superclass.constructor.call(this,t),this.app=t.app,this.canvas=null,this.ctx=null,this.left=0,this.top=0,this.ready=!1,this.createView()};i.inherit(a,n),a.prototype.createView=function(){this.canvas=i.createElement({tag:"canvas",target:this.$container}),this.ctx=this.canvas.getContext("2d"),this.ctx.lineCap="round",this.ctx.lineJoin="round";var t=setInterval(function(){this.$container.offsetWidth&&this.$container.offsetHeight&&(clearInterval(t),this.resize(),this.ready=!0,this.trigger("ready"))}.bind(this),10)},a.prototype.resize=function(){var t=i.box(this.$container);this.left=t.left,this.top=t.top,this.canvas.width=t.width,this.canvas.height=t.height},a.prototype.refresh=function(t){this.ready&&window.requestAnimationFrame(function(){this.render(t)}.bind(this))},a.prototype.getYByValue=function(t,e){return e.paddingTop+(e.max-t)/e.scale},a.prototype.getXByIndex=function(t,e){return e.paddingLeft+e.shiftX+(t-e.startIndex)*e.space},a.prototype.getIndexByX=function(t,e){return e.startIndex+Math.floor((t-e.shiftX-e.paddingLeft)/e.space)},a.prototype.render=function(t){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.drawAxisY(this.ctx,t),this.drawAxisX(this.ctx,t),this.drawTitle(this.ctx,t),this.drawTopChart(this.ctx,t),t.draggingMode||this.drawCrosshair(this.ctx,t),this.drawBottomChart(this.ctx,t),this.drawLabels(this.ctx,t),this.drawThemeSwitch(this.ctx,t)},a.prototype.drawTopChart=function(t,e){var o,i,n,a;for(o in e.data.keys)i=e.data.keys[o],n=e.data.lines[i],a=e.data.actives[i],a&&(t.beginPath(),t.lineCap="round",t.lineJoin="round",t.lineWidth=e.lineWidth,t.strokeStyle=e.data.colors[i],this.drawTopLine(t,e,n))},a.prototype.drawBottomChart=function(t,e){var o,i,n,a;for(o in e.data.keys)i=e.data.keys[o],n=e.data.lines[i],a=e.data.actives[i],a&&(t.beginPath(),t.lineCap="round",t.lineJoin="round",t.lineWidth=e.bottomChart.lineWidth,t.strokeStyle=e.data.colors[i],this.drawBottomLine(t,e,n));this.drawBottomCaret(t,e)},a.prototype.drawAxisY=function(t,e){var o,i=e.paddingLeft,n=e.paddingLeft+e.width;t.beginPath(),t.lineWidth=1,t.font="normal 12px Tahoma, Verdana, sans-serif",t.strokeStyle=e.style[e.renderStyle].gridColor,t.fillStyle=e.style[e.renderStyle].gridValuesColor;for(var a in e.axisYValues){var r=e.axisYValues[a];o=this.getYByValue(r,e),t.moveTo(i+10,o),t.lineTo(n-10,o),t.fillText(r.toFixed(e.digits),i+10,o-6)}t.stroke()},a.prototype.drawAxisX=function(t,e){var o=e.startIndex;o<0&&(o=0);var i,n,a=o+e.count+1,r=e.paddingTop+e.height;n=e.data.lines.x,t.beginPath(),t.font="normal 12px Tahoma, Verdana, sans-serif",t.fillStyle=e.style[e.renderStyle].timeColor;for(var s=o;s<a;s++)if(n[s]&&e.axisXValues.indexOf(s)!==-1){i=Math.floor((s-o)*e.space)+e.shiftX;var h=n[s].split(", ")[1];t.fillText(h,i,r+20)}t.beginPath(),t.strokeStyle=e.style[e.renderStyle].axisColor,t.lineWidth=1,t.moveTo(e.paddingLeft,e.paddingTop+e.height),t.lineTo(e.paddingLeft+e.width,e.paddingTop+e.height),t.stroke(),t.closePath()},a.prototype.drawTitle=function(t,e){t.save(),t.beginPath(),t.textBaseline="top",t.font="bold 18px Tahoma, Verdana, sans-serif",t.fillStyle=e.style[e.renderStyle].title,t.fillText(e.title,10,10),
t.restore()},a.prototype.drawCrosshair=function(t,e){if(null!=e.crosshairX&&null!=e.crosshairY){var o=e.paddingTop,n=e.paddingTop+e.height,a=e.crosshairX,r=e.crosshairY,s=this.getIndexByX(a,e),h=s+1,l=this.getXByIndex(s,e),d=this.getXByIndex(h,e),m=Math.abs(a-l),c=Math.abs(a-d),f=s,p=l;if(c<m&&(f=h,p=d),e.data.lines.x[f]&&(t.beginPath(),t.strokeStyle=e.style[e.renderStyle].crosshairColor,t.fillStyle=e.style[e.renderStyle].crosshairColor,t.lineWidth=1,r>=o&&r<=n)){t.moveTo(p,o),t.lineTo(p,n),t.stroke();var u=[];t.save();var v,g,y,w,x,b,C;for(v in e.data.keys)g=e.data.keys[v],y=e.data.lines[g],w=e.style[e.renderStyle].bgColor,x=e.data.colors[g],b=e.data.actives[g],b&&(u.push({id:e.data.names[g],value:y[f],color:e.data.colors[g]}),C=this.getYByValue(y[f],e),t.beginPath(),t.lineWidth=2,t.fillStyle=w,t.strokeStyle=x,t.arc(p,C,4,0,2*Math.PI),t.fill(),t.stroke());var T=90,S=0;u.length&&u.reduce(function(t,e){e.value>S&&(S=e.value)});var D=0;S>0&&(D=i.calculateWidth(S.toString(),{fontFamily:"Tahoma, Verdana, sans-serif",fontSize:12,paddingLeft:5,paddingRight:5}));var I=0;1===u.length?(T=Math.max(T,D),I=2):u.length>1&&(T=Math.max(T,2*D+5),I=Math.ceil(u.length/2),1===I&&(I=2));var R=Math.max(38,20+18*I);t.fillStyle=e.style[e.renderStyle].tooltipBg,t.shadowColor=e.style[e.renderStyle].tooltipShadow,t.shadowBlur=3;var M=p-T/2,X=o-e.paddingTop+3;M<3&&(M=3),M+T>e.width-3&&(M=e.width-3-T),t.roundRect(M,X,T,R,5,!0,!1),t.beginPath(),t.shadowBlur=0,t.fillStyle=e.style[e.renderStyle].tooltipTitle,t.textAlign="center",t.textBaseline="top",t.font="bold 13px Tahoma, Verdana, sans-serif",t.fillText(e.data.lines.x[f],M+T/2,X+4),1===u.length?(t.fillStyle=u[0].color,t.font="bold 12px Tahoma, Verdana, sans-serif",t.fillText(u[0].value,M+T/2,X+25),t.font="normal 12px Tahoma, Verdana, sans-serif",t.fillText(u[0].id,M+T/2,X+37)):2===u.length?(t.fillStyle=u[0].color,t.font="bold 12px Tahoma, Verdana, sans-serif",t.fillText(u[0].value,M+T/4,X+25),t.font="normal 12px Tahoma, Verdana, sans-serif",t.fillText(u[0].id,M+T/4,X+37),t.fillStyle=u[1].color,t.font="bold 12px Tahoma, Verdana, sans-serif",t.fillText(u[1].value,M+T-T/4,X+25),t.font="normal 12px Tahoma, Verdana, sans-serif",t.fillText(u[1].id,M+T-T/4,X+37)):3===u.length?(t.fillStyle=u[0].color,t.font="bold 12px Tahoma, Verdana, sans-serif",t.fillText(u[0].value,M+T/4,X+25),t.fillStyle=u[1].color,t.font="bold 12px Tahoma, Verdana, sans-serif",t.fillText(u[1].value,M+T-T/4,X+25),t.fillStyle=u[2].color,t.font="bold 12px Tahoma, Verdana, sans-serif",t.fillText(u[2].value,M+T/2,X+37)):4===u.length&&(t.fillStyle=u[0].color,t.font="bold 12px Tahoma, Verdana, sans-serif",t.fillText(u[0].value,M+T/4,X+25),t.fillStyle=u[1].color,t.font="bold 12px Tahoma, Verdana, sans-serif",t.fillText(u[1].value,M+T-T/4,X+25),t.fillStyle=u[2].color,t.font="bold 12px Tahoma, Verdana, sans-serif",t.fillText(u[2].value,M+T/4,X+37),t.fillStyle=u[3].color,t.font="bold 12px Tahoma, Verdana, sans-serif",t.fillText(u[3].value,M+T-T/4,X+37)),t.restore()}}},a.prototype.drawTopLine=function(t,e,o){var i,n,a,r=e.startIndex+e.count+1;r>o.length&&(r=o.length);var s=e.paddingLeft+e.shiftX-(e.startIndex>=0?e.space:0),h=this.getYByValue(o[e.startIndex>0?e.startIndex-1:0],e);for(t.moveTo(s,h),i=e.startIndex;i<r;i++)null!==o[i]&&(n=s+e.space,a=this.getYByValue(o[i],e),t.lineTo(n,a),s=n,h=a);t.stroke()},a.prototype.drawBottomLine=function(t,e,o){var i,n,a,r=e.bottomChart.count;r>o.length-1&&(r=o.length-1);var s=e.bottomChart.paddingLeft,h=this.getYByValue(o[0],e.bottomChart);for(t.moveTo(s,h),i=0;i<r;i++)null!==o[i]&&(n=s+e.bottomChart.space,a=this.getYByValue(o[i],e.bottomChart),t.lineTo(n,a),s=n,h=a);t.stroke()},a.prototype.drawBottomCaret=function(t,e){t.beginPath(),t.fillStyle=e.style[e.renderStyle].bottomColor,t.fillRect(e.bottomChart.caret.left.x,e.bottomChart.caret.left.y,e.bottomChart.caret.left.w,e.bottomChart.caret.left.h),t.beginPath(),t.fillStyle=e.style[e.renderStyle].caretColor,t.fillRect(e.bottomChart.caret.frame.left.x,e.bottomChart.caret.frame.left.y,e.bottomChart.caret.frame.left.w,e.bottomChart.caret.frame.left.h),t.fillRect(e.bottomChart.caret.frame.right.x,e.bottomChart.caret.frame.right.y,e.bottomChart.caret.frame.right.w,e.bottomChart.caret.frame.right.h),t.fillRect(e.bottomChart.caret.frame.top.x,e.bottomChart.caret.frame.top.y,e.bottomChart.caret.frame.top.w,e.bottomChart.caret.frame.top.h),t.fillRect(e.bottomChart.caret.frame.bottom.x,e.bottomChart.caret.frame.bottom.y,e.bottomChart.caret.frame.bottom.w,e.bottomChart.caret.frame.bottom.h),e.bottomChart.width-e.bottomChart.caret.right.x+e.bottomChart.paddingLeft>0&&(t.beginPath(),t.fillStyle=e.style[e.renderStyle].bottomColor,t.fillRect(e.bottomChart.caret.right.x,e.bottomChart.caret.right.y,e.bottomChart.caret.right.w,e.bottomChart.caret.right.h)),t.closePath()},a.prototype.drawLabels=function(t,e){t.save();var o,i,n,a,r,s,h;for(o in e.labels)s=e.labels[o],h=s.name,i=s.x,n=s.y,a=s.w,r=s.h,t.beginPath(),t.lineWidth=2,t.strokeStyle=e.style[e.renderStyle].labelBorder,t.roundRect(i,n,a,r,14,!1,!0),s.active?(t.beginPath(),t.lineWidth=1,t.fillStyle=e.data.colors[s.id],t.arc(i+13,n+13,8,0,2*Math.PI),t.fill(),t.beginPath(),t.lineWidth=2,t.strokeStyle="#fff",t.moveTo(i+10,n+13),t.lineTo(i+12,n+16),t.lineTo(i+17,n+11),t.stroke()):(t.beginPath(),t.lineWidth=2,t.strokeStyle=e.data.colors[s.id],t.arc(i+13,n+13,8,0,2*Math.PI),t.stroke()),t.beginPath(),t.textBaseline="middle",t.font="normal 14px Tahoma, Verdana, sans-serif",t.fillStyle=e.style[e.renderStyle].labelText,t.fillText(h,i+26,n+14);t.restore()},a.prototype.drawThemeSwitch=function(t,e){var o=e.theme.x,i=e.theme.y,n=e.theme.w,a=e.theme.h;t.beginPath(),t.lineWidth=2,t.strokeStyle=e.style[e.renderStyle].labelBorder,t.roundRect(o,i,n,a,14,!1,!0),t.beginPath(),t.lineWidth=1,"light"===e.theme.style?t.fillStyle=e.style.dark.bgColor:t.fillStyle=e.style.light.bgColor,t.arc(o+13,i+13,8,0,2*Math.PI),t.fill()},e.ChartView=a},function(t,e,o){var i=o(3),n=o(4).EventDriven,a=function(t){t=t||{};var e=t.className;t.extraClassName&&(e+=" "+t.extraClassName);var o=null;t.noDisplayOnCreate===!0&&(o=[{display:"none"}]),this.$container=null==t.container?i.createElement({class_name:e,attributes:o}):i.getElement(t.container),this.parent=t.parent,this.appendTo(t.appendTo||this.parent)};i.extend(a,n),a.prototype.appendTo=function(t){t&&(t instanceof Element?t.appendChild(this.$container):t instanceof a?t.$container.append?t.$container.append(this.$container):t.$container.appendChild(this.$container):console.trace("ERROR: UI want to append to unsupported parent",t))},a.prototype.show=function(){return this.hidden?(this.hidden=!1,i.show(this.$container),this):this},a.prototype.hide=function(){return this.hidden?this:(this.hidden=!0,i.hide(this.$container),this)},a.prototype.destroy=function(){this.$container&&(i.removeElement(this.$container),this.$container=null)},e.UI=a},function(t,e,o){var i=o(3),n=o(8).UI,a=function(t){a.superclass.constructor.call(this,t),this.app=t.app,this.createView()};i.inherit(a,n),a.prototype.createView=function(){},e.MainView=a}]);