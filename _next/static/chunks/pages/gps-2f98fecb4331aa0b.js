(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[403],{9766:function(e,r,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/gps",function(){return n(2541)}])},2541:function(e,r,n){"use strict";n.r(r),n.d(r,{default:function(){return g}});var t=n(4235),o=n.n(t),i=n(1250),u=n(9901),c=n(9944),a=n(7210);function s(e,r,n,t,o,i,u){try{var c=e[i](u),a=c.value}catch(s){return void n(s)}c.done?r(a):Promise.resolve(a).then(t,o)}function l(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function f(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var n=[],t=!0,o=!1,i=void 0;try{for(var u,c=e[Symbol.iterator]();!(t=(u=c.next()).done)&&(n.push(u.value),!r||n.length!==r);t=!0);}catch(a){o=!0,i=a}finally{try{t||null==c.return||c.return()}finally{if(o)throw i}}return n}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function b(e){var r=e.fn,n=e.timeoutRef,t=e.duration,o=void 0===t?3e4:t,i=e.leadingEdge,u=void 0===i||i,c=e.isRecordingPausedRef;n.current=window.setTimeout((function(){return((null===c||void 0===c?void 0:c.current)?Promise.resolve():r()).finally((function(){Number.isFinite(n.current)&&b(function(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{},t=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),t.forEach((function(r){l(e,r,n[r])}))}return e}({},e,{leadingEdge:!1}))}))}),u?0:o)}function g(){var e,r=u.useRef(null),n=u.useRef(null),t=f(u.useState(!1),2),l=t[0],g=t[1],d=f(u.useState(1e4),2),y=d[0],p=d[1],v=u.useRef(l),m=u.useCallback((function(){v.current=!v.current,g(v.current)}),[g]),h=f(u.useState((new Date).getTime()),2),w=(h[0],h[1]),O=f(u.useState(""),2),j=O[0],k=O[1],x=u.useCallback((e=o().mark((function e(){var n,t;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return w((function(e){return e+1})),e.prev=1,e.next=4,new Promise((function(e,r){return navigator.geolocation.getCurrentPosition(e,r,{enableHighAccuracy:!1,timeout:5e3,maximumAge:0})}));case 4:if(n=e.sent,t=r.current){e.next=8;break}throw new Error("missing pre el");case 8:t.innerHTML+=[new Date(n.timestamp).toISOString(),n.coords.latitude,n.coords.longitude].map((function(e){return e.toString()})).join(",")+"\n",e.next=14;break;case 11:e.prev=11,e.t0=e.catch(1),k(String(e.t0));case 14:case"end":return e.stop()}}),e,null,[[1,11]])})),function(){var r=this,n=arguments;return new Promise((function(t,o){var i=e.apply(r,n);function u(e){s(i,t,o,u,c,"next",e)}function c(e){s(i,t,o,u,c,"throw",e)}u(void 0)}))}),[]),P=u.useCallback((function(){var e=r.current;e&&(e.innerHTML="timestamp,latitude,longitude\n",b({fn:x,timeoutRef:n,duration:y,isRecordingPausedRef:v}))}),[n,x,y]),S=f(u.useState(3),2),E=S[0],N=S[1],C=u.useCallback((function(){var e=function(){return N(3)},r=E-1;if(r){N(r);var t=setTimeout(e,2e3);return function(){return clearTimeout(t)}}clearTimeout(n.current),n.current=null,w(0),e()}),[E]),_=Number.isFinite(n.current);return u.useEffect((function(){try{var e=navigator.wakeLock;if(!e)throw new Error("no wake lock");if(!_)return;e.request("screen").then((function(){}),(function(e){k("WakeLock Error. This generally happens due to not using GOOGLE CHROME only, low battery or weird permissions on device:\n".concat(e))}))}catch(r){k("Please try Google Chrome. WakeLock API not available\n\n".concat(r))}}),[j,k,_]),(0,i.jsxs)("div",{className:"p-2",children:[(0,i.jsx)(c.Z,{disabled:v.current,styles:{bg:_?"bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200":"bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200",display:"inline-block"},className:"mr-1",onClick:function(){_?C():P()},children:_?"Stop".concat(3===E?"":" (Confirm quickly, ".concat(E,"x clicks)")):"Start"}),(0,i.jsx)(c.Z,{disabled:!_,styles:{bg:"bg-orange-600 hover:bg-orange-700 focus:ring-orange-500 focus:ring-offset-orange-200",display:"inline-block"},className:"mr-1",onClick:function(){return m()},children:v.current?"Resume":"Pause"}),(0,i.jsx)(c.Z,{styles:{bg:"bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200",display:"inline-block"},className:"mr-1",onClick:function(){var e,n=(null===(e=r.current)||void 0===e?void 0:e.textContent)||"",t=document.createElement("a");t.download="gps_data_".concat((new Date).toISOString(),".csv");var o=new Blob([n],{type:"text/csv"});t.href=window.URL.createObjectURL(o),t.click()},children:"Export"}),(0,i.jsx)("label",{htmlFor:"durationMs",children:"Interval (ms)"}),(0,i.jsx)(a.Z,{type:"number",name:"durationMs",value:y,disabled:_,onChange:function(e){var r=parseInt(e.currentTarget.value,10);Number.isInteger(r)&&p(r)}}),j?(0,i.jsx)("pre",{children:j}):null,(0,i.jsx)("pre",{className:"block",ref:r})]})}},9944:function(e,r,n){"use strict";var t=n(1250),o=n(5789);n(9901);function i(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function u(e,r){if(null==e)return{};var n,t,o=function(e,r){if(null==e)return{};var n,t,o={},i=Object.keys(e);for(t=0;t<i.length;t++)n=i[t],r.indexOf(n)>=0||(o[n]=e[n]);return o}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(t=0;t<i.length;t++)n=i[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c="bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200",a="flex";r.Z=function(e){var r=e.styles,n=void 0===r?{}:r,s=n.bg,l=void 0===s?c:s,f=n.display,b=void 0===f?a:f,g=e.type,d=void 0===g?"button":g,y=e.className,p=u(e,["styles","type","className"]),v=(0,o.Z)(y,l,b,"py-2 px-4 justify-center items-center text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg",p.disabled?"bg-gray-400 hover:bg-gray-400 cursor-not-allowed":"");return(0,t.jsx)("button",function(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{},t=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),t.forEach((function(r){i(e,r,n[r])}))}return e}({type:d,className:v},p))}},7210:function(e,r,n){"use strict";var t=n(1250),o=(n(9901),n(5789));function i(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function u(e,r){if(null==e)return{};var n,t,o=function(e,r){if(null==e)return{};var n,t,o={},i=Object.keys(e);for(t=0;t<i.length;t++)n=i[t],r.indexOf(n)>=0||(o[n]=e[n]);return o}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(t=0;t<i.length;t++)n=i[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}r.Z=function(e){var r=e.error,n=e.className,c=u(e,["error","className"]);return(0,t.jsx)("input",function(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{},t=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),t.forEach((function(r){i(e,r,n[r])}))}return e}({className:(0,o.Z)("rounded-lg border-transparent flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent",r?"border-red-600":void 0,n)},c))}}},function(e){e.O(0,[774,888,179],(function(){return r=9766,e(e.s=r);var r}));var r=e.O();_N_E=r}]);