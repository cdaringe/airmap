(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{2268:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(510)}])},510:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return M}});var n=t(1250),o=t(9901);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function u(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var i,c,s=function(e){var r=e.className,t=u(e,["className"]);return(0,n.jsx)("select",function(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{},n=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),n.forEach((function(r){a(e,r,t[r])}))}return e}({className:"block text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ".concat(r||"")},t))};function l(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}(c=i||(i={})).googlesheetsurl="googlesheetsurl",c.csvurl="csvurl",c.googleDrive="googledrive";var f=function(e){return(0,n.jsxs)(s,function(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{},n=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),n.forEach((function(r){l(e,r,t[r])}))}return e}({},e,{children:[(0,n.jsx)("option",{value:i.googlesheetsurl,children:"Google Sheets URL"}),(0,n.jsx)("option",{disabled:!0,value:i.googleDrive,children:"Google Drive"}),(0,n.jsx)("option",{disabled:!0,value:i.csvurl,children:"CSV URL"})]}))},d=t(1750),p=t(1804),m=t(6529),h=t(4235),g=t.n(h),v=t(4221),b=t(9507),y=t(4168);function w(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function x(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{},n=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),n.forEach((function(r){w(e,r,t[r])}))}return e}var j=function(e){var r=e.pocketlabs,t=void 0===r?[]:r,n=e.strava,o=e.miniwras,a=function(e){for(;;){var r=n[0],t=null===r||void 0===r?void 0:r.date;if(!t||!r)return console.warn("no strava data, skipping, dropping miniwras point"),null;if(!(t<e))return t.getTime()-e.getTime()<6e4?(n.shift(),r):(console.warn("miniwras > 1 minute away from strava points, dropping miniwras point"),null);n.shift()}},u=function(e){for(;;){var r=t[0],n=null===r||void 0===r?void 0:r.date;if(!n||!r)return null;if(!(n<e))return n.getTime()-e.getTime()<6e4?(t.shift(),r):null;t.shift()}},i=[],c=!0,s=!1,l=void 0;try{for(var f,d=o[Symbol.iterator]();!(c=(f=d.next()).done);c=!0){var p=f.value,m=p.date,h=a(m),g=u(m);h&&i.push(x({latitude:h.lat,longitude:h.lon},h,p,{pocketlabsEntry:g||void 0}))}}catch(v){s=!0,l=v}finally{try{c||null==d.return||d.return()}finally{if(s)throw l}}return{type:"FeatureCollection",features:i.map((function(e){return{type:"Feature",geometry:{type:"Point",coordinates:[e.longitude,e.latitude]},properties:x({},e)}}))}};t(7236);function O(e,r,t,n,o,a,u){try{var i=e[a](u),c=i.value}catch(s){return void t(s)}i.done?r(c):Promise.resolve(c).then(n,o)}function S(e){return function(){var r=this,t=arguments;return new Promise((function(n,o){var a=e.apply(r,t);function u(e){O(a,n,o,u,i,"next",e)}function i(e){O(a,n,o,u,i,"throw",e)}u(void 0)}))}}function P(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var t=[],n=!0,o=!1,a=void 0;try{for(var u,i=e[Symbol.iterator]();!(n=(u=i.next()).done)&&(t.push(u.value),!r||t.length!==r);n=!0);}catch(c){o=!0,a=c}finally{try{n||null==i.return||i.return()}finally{if(o)throw a}}return t}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function k(e){return function(e){if(Array.isArray(e)){for(var r=0,t=new Array(e.length);r<e.length;r++)t[r]=e[r];return t}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var N=new Set(["dat","csv","gpx"]),T=function(e){var r=e.onInputRead,a=(0,v.useRouter)(),u=P(o.useState(!1),2),i=u[0],c=u[1],s=P(o.useState(""),2),l=s[0],f=s[1],d=P(o.useState(!1),2),m=d[0],h=d[1],w=P(o.useState(void 0),2),x=w[0],O=w[1],T=P(o.useState(void 0),2),E=T[0],R=T[1],C=P(o.useState(void 0),2),A=C[0],D=C[1];o.useEffect((function(){!l&&E&&A&&c(!0)}),[l,x,E,A,r]);var I=o.useCallback((function(e){var r,n;r=S(g().mark((function r(){return g().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return h(!0),r.next=3,Promise.all(Array.from(e).map(S(g().mark((function e(r){var n,o,a,u,i,c,s,l,f;return g().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o=null===(n=r.name.match(/\.(.*)$/))||void 0===n?void 0:n[1],N.has(o)){e.next=4;break}throw new Error("invalid filename. must end with ".concat(k(N).join(", ")));case 4:e.t0=o,e.next="csv"===e.t0?7:"dat"===e.t0?15:"gpx"===e.t0?23:32;break;case 7:return e.next=9,(0,y.SR)();case 9:return a=e.sent,e.next=12,a.stream.parse(r.stream().getReader());case 12:return u=e.sent.records,O(u),e.abrupt("break",33);case 15:return e.next=17,(0,y.pW)();case 17:return i=e.sent,e.next=20,i.stream.parse(r.stream().getReader());case 20:return c=e.sent,R(c.records),e.abrupt("break",33);case 23:return e.next=25,t.e(236).then(t.bind(t,6236));case 25:return s=e.sent,e.next=28,r.text();case 28:return l=e.sent,f=s.ofGpxString(l),D(f),e.abrupt("break",33);case 32:throw new Error("unhandled case: ".concat(o));case 33:case"end":return e.stop()}}),e)}))))).finally((function(){h(!1)}));case 3:case"end":return r.stop()}}),r)}))),n=function(e){return f(String(e))},Promise.resolve(r()).catch(n)}),[]);return(0,n.jsxs)(n.Fragment,{children:[l?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("h3",{children:"Error"}),(0,n.jsx)("p",{children:l}),(0,n.jsx)(p.Z,{onClick:function(){return f("")},children:"Try again?"})]}):(0,n.jsxs)(n.Fragment,{children:[m?(0,n.jsx)("p",{children:"Loading..."}):null,(0,n.jsx)(b.b,{disabled:m,multiple:!0,handleChange:I,name:"file",types:k(N)}),x?(0,n.jsx)("p",{className:"text-green-800",children:"\u2705 PocketLabs"}):(0,n.jsx)("p",{className:"text-red-800",children:"Missing pocketlab file"}),E?(0,n.jsx)("p",{className:"text-green-800",children:"\u2705 MiniWras"}):(0,n.jsx)("p",{className:"text-red-800",children:"Missing miniwras file"}),A?(0,n.jsx)("p",{className:"text-green-800",children:"\u2705 Strava"}):(0,n.jsx)("p",{className:"text-red-800",children:"Missing strava file"})]}),(0,n.jsx)(p.Z,{disabled:!i,className:"block m-auto mt-2",onClick:S(g().mark((function e(){var t;return g().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,y.pW)();case 2:if(e.sent,A&&E){e.next=5;break}throw new Error("expected Strava & MiniWras data");case 5:t=j({pocketlabs:x,strava:A,miniwras:E}),r(t),a.push("/map");case 8:case"end":return e.stop()}}),e)}))),children:"Submit"})]})},E=function(e){var r=e.datasource,t=e.isRenderingUrlErrorState,o=e.isSubmitDisabled,a=(e.luggage,e.onDatasourceSourceChange),u=(e.onKmlChange,e.onMiniWrasReady),i=e.onSubmit,c=e.onUrlsChange,l=e.onSensorTypeChange,h=e.sensorType,g=e.urls,v=h!==m.R3;return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("p",{className:"text-center text-gray-600 gray-200",children:"Enter your datasource"}),(0,n.jsxs)(s,{defaultValue:h,placeholder:"Select sensor type",className:"w-full mt-1",onMouseOver:function(){h===m.$C&&l(-1)},onMouseOut:function(){h<m.$C&&l(0)},onChange:function(e){var r=e.currentTarget.value;c([]),l(parseInt(r,10))},children:[(0,n.jsx)("option",{disabled:!0,value:m.$C,children:"Select sensor type..."}),(0,n.jsx)("option",{value:m.OS,children:"Flow"}),(0,n.jsx)("option",{value:m.p4,children:"PocketLabs"}),(0,n.jsx)("option",{value:m.R3,children:"MiniWRAS"}),(0,n.jsx)("option",{value:m.xV,children:"airmap\u2122 GPS"})]}),v?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(f,{required:!0,className:"w-full mt-1",value:r,onChange:a}),(0,n.jsx)(d.Z,{required:!0,error:t,className:"w-full mt-1",placeholder:h===m.OS?"User Measures: https://url/to/data":"https://url/to/data",defaultValue:g[0],onChange:function(e){return c([e.currentTarget.value,g[1]].filter(Boolean))}},"".concat(h,"-url-1"))]}):null,h===m.OS?(0,n.jsx)(d.Z,{required:!0,error:t,className:"w-full mt-1",placeholder:"User Positions: https://url/to/data",defaultValue:g[1],onChange:function(e){return c([g[0],e.currentTarget.value])}},"".concat(h,"-url-2")):null,t?(0,n.jsxs)("p",{className:"text-sm text-left text-red-600",children:["Sheets URL must have the form:",(0,n.jsx)("br",{}),"https://docs.google.com/spreadsheets/d/:id/gviz/tq"]}):null,h===m.R3?(0,n.jsx)("div",{className:"mt-1",children:(0,n.jsx)(T,{onInputRead:function(e){u(e)}})}):null,h===m.R3?null:(0,n.jsx)(p.Z,{disabled:o,className:"block m-auto mt-2",onClick:i,children:"Submit"})]})},R=t(2454),C=t(8833),A=t(2236);function D(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var I=[];function M(){var e=(0,C.wl)(),r=e.value,t=e.update,o=r.urls,a=r.datasource,u=r.sensorType,i=r.luggage,c=function(e,n){return t(function(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{},n=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),n.forEach((function(r){D(e,r,t[r])}))}return e}({},r,D({},e,n)))},s=(0,A.jU)(),l=s.value.accessToken,f=(s.update,o.every((function(e){return(0,R.Ok)(e)}))&&(u!==m.OS||2===o.length)),d=(0,v.useRouter)(),p=!(!o.length||f),h=!f||!l||0===u||u===m.R3&&!i;return(0,n.jsxs)("form",{className:"max-w-screen-md content home w-96",onSubmit:function(e){return e.preventDefault()},children:[(0,n.jsx)("h1",{className:"text-4xl text-center",children:"airmap!"}),(0,n.jsx)(E,{isSubmitDisabled:h,luggage:i,datasource:a,sensorType:u,isRenderingUrlErrorState:p,onDatasourceSourceChange:function(e){return c("datasource",e.currentTarget.value)},onSensorTypeChange:function(e){return t((function(t){return{datasource:t.datasource,luggage:I.includes(r.sensorType)?t.luggage:null,urls:[],sensorType:e}}))},onUrlsChange:function(e){return c("urls",e)},onKmlChange:function(e){return c("luggage",e)},onMiniWrasReady:function(e){return c("luggage",e)},urls:o,onSubmit:function(){h||(c("urls",o.map((function(e){return(0,R.e5)(e)}))),d.push("/map"))}}),null]})}},1804:function(e,r,t){"use strict";var n=t(1250),o=t(5789);t(9901);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function u(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var i="bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200",c="flex";r.Z=function(e){var r=e.styles,t=void 0===r?{}:r,s=t.bg,l=void 0===s?i:s,f=t.display,d=void 0===f?c:f,p=e.type,m=void 0===p?"button":p,h=e.className,g=u(e,["styles","type","className"]),v=(0,o.Z)(h,l,d,"py-2 px-4 justify-center items-center text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg",g.disabled?"bg-gray-400 hover:bg-gray-400 cursor-not-allowed":"");return(0,n.jsx)("button",function(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{},n=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),n.forEach((function(r){a(e,r,t[r])}))}return e}({type:m,className:v},g))}},1750:function(e,r,t){"use strict";var n=t(1250),o=(t(9901),t(5789));function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function u(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}r.Z=function(e){var r=e.error,t=e.className,i=u(e,["error","className"]);return(0,n.jsx)("input",function(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{},n=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),n.forEach((function(r){a(e,r,t[r])}))}return e}({className:(0,o.Z)("rounded-lg border-transparent flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent",r?"border-red-600":void 0,t)},i))}},4168:function(e,r,t){"use strict";t.d(r,{SR:function(){return s},pW:function(){return l},rk:function(){return f}});var n=t(4235),o=t.n(n),a=t(1371),u=t(6529);function i(e,r,t,n,o,a,u){try{var i=e[a](u),c=i.value}catch(s){return void t(s)}i.done?r(c):Promise.resolve(c).then(n,o)}function c(e){return function(){var r=this,t=arguments;return new Promise((function(n,o){var a=e.apply(r,t);function u(e){i(a,n,o,u,c,"next",e)}function c(e){i(a,n,o,u,c,"throw",e)}u(void 0)}))}}var s=function(){return t.e(491).then(t.bind(t,6491)).then((function(e){return e.getResources()}))},l=function(){return t.e(849).then(t.bind(t,7849)).then(c(o().mark((function e(r){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",r.getResources());case 1:case"end":return e.stop()}}),e)}))))},f=function(e){return(0,a.useQuery)({queryKey:"get-mapping-".concat(e),queryFn:c(o().mark((function r(){var n;return o().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e===u.p4?s():e===u.OS?t.e(339).then(t.bind(t,339)).then(c(o().mark((function e(r){var n;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([t.e(87),t.e(358)]).then(t.bind(t,358));case 2:return n=e.sent.closestTo,e.abrupt("return",r.getResources({closestTo:n}));case 4:case"end":return e.stop()}}),e)})))):e===u.R3?l():e===u.xV?t.e(981).then(t.bind(t,5981)).then(c(o().mark((function e(r){var n;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([t.e(87),t.e(358)]).then(t.bind(t,358));case 2:return n=e.sent.closestTo,e.abrupt("return",r.getResources({closestTo:n}));case 4:case"end":return e.stop()}}),e)})))):function(){throw new Error("unsupported sensor type ".concat(e))}();case 2:return n=r.sent,r.abrupt("return",n);case 4:case"end":return r.stop()}}),r)}))),cacheTime:1e9})}},2454:function(e,r,t){"use strict";t.d(r,{Ok:function(){return u},Hw:function(){return c},e5:function(){return i}});var n=t(6930);function o(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var t=[],n=!0,o=!1,a=void 0;try{for(var u,i=e[Symbol.iterator]();!(n=(u=i.next()).done)&&(t.push(u.value),!r||t.length!==r);n=!0);}catch(c){o=!0,a=c}finally{try{n||null==i.return||i.return()}finally{if(o)throw a}}return t}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function a(e){return function(e){if(Array.isArray(e)){for(var r=0,t=new Array(e.length);r<e.length;r++)t[r]=e[r];return t}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function u(e){try{var r=new URL(e),t=o(r.pathname.substr(1).split("/"),3),n=t[0],a=t[1],u=t[2];if("spreadsheets"===n&&"d"===a&&u&&r.host.match("google.com"))return!0}catch(i){}return!1}function i(e){var r=new URL(e);return r.pathname=a(r.pathname.substr(1).split("/").splice(0,3)).concat(["export"]).join("/"),String(r)}var c=function(e){var r=new URL(e),t=new URLSearchParams(r.search);return t.has("format")||t.set("format","csv"),r.search=t.toString(),function(e,r){return fetch(e,r).then((function(e){return e.body})).then((function(e){var r=null===e||void 0===e?void 0:e.getReader();return(0,n.k)(r,"missing stream body"),r}))}(i(r.toString()),{mode:"cors",redirect:"follow",headers:{accept:"text"}})}},7236:function(e,r,t){"use strict";t.r(r),t.d(r,{parse:function(){return p}});var n=t(4235),o=t.n(n),a=t(6930);function u(e,r,t,n,o,a,u){try{var i=e[a](u),c=i.value}catch(s){return void t(s)}i.done?r(c):Promise.resolve(c).then(n,o)}function i(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var t=[],n=!0,o=!1,a=void 0;try{for(var u,i=e[Symbol.iterator]();!(n=(u=i.next()).done)&&(t.push(u.value),!r||t.length!==r);n=!0);}catch(c){o=!0,a=c}finally{try{n||null==i.return||i.return()}finally{if(o)throw a}}return t}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var c,s=[6.842765,7.1751666,7.0114602,6.9088991,7.0263146,6.9180838,7.0393966,6.989318,6.9812267,5.2701795,14.0655402,13.8262107,14.1929174,14.0017841,13.8883794,13.9963284,14.0409634,14.2779903,13.8513492,13.898864,13.6873067,14.3390373,13.8184393,14.1478588,14.0655395,13.8262102,14.1929179,13.8296286,14.062005,13.9963317,14.040958,14.001345,13.96783,14,13.95533,14.00924,14,14,14,14,14],l=function(e,r,t){return 1800*(1e6*e/t*(Math.PI/6)*Math.pow(r/1e9,3))*1e9},f=function(e){return new Date(e.trim().split(" ").map((function(e,r){if(0===r){var t=i(e.split("/"),3),n=t[0],o=t[1],a=t[2],u=function(e){return 1===e.length?"0".concat(e):e};return"".concat(n,"-").concat(u(o),"-").concat(u(a))}return"T".concat(e,".000+01:00")})).join(""))},d=function(e){return parseFloat(e)},p=(c=o().mark((function e(r,t){var n,u,i,c,m,h,g;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=void 0===t?{records:[],partial:"",particleDiametersAscending:[]}:t,e.next=3,r.read();case 3:return u=e.sent,i=u.done,((c=u.value)||i)&&(n.partial+="string"===typeof c?c:c?(new TextDecoder).decode(c):"",m=n.partial.split(/\n/g),h=m.map((function(e){return e.trim()})).filter((function(e){return!!e})),g=h.length-1,h.forEach((function(e,r){if(g!==r||i){var t=e.includes(",")?e.split(","):e.split("\t");if(n.headerIndiciesByName){var o=t[n.headerIndiciesByName.Time],u=t[n.headerIndiciesByName["pm2.5 [ug/m3]"]];(0,a.k)(o,"date missing"),(0,a.k)(Number.isFinite(u),"column 'pm2.5 [ug/m3]' missing");for(var c=0,p=n.headerIndiciesByName["10.00 nm"],m=n.headerIndiciesByName["449.48 nm"],h=0,v=[],b=0;p<m;){var y,w=parseFloat(t[p]),x=(n.particleDiametersAscending[h]+n.particleDiametersAscending[h+1])/2;++b;var j=s[b],O=l(w,x,j);v.push({calibrationDivisor:j,diameterHeader:(null===(y=n.headerCells)||void 0===y?void 0:y[p])||"",diameterMidpointNm:x,"\u03bcg":O,numParticles:w}),c+=O,++h,++p}console.log({sampleNum:n.records.length,sub500nm:c,debug:v}),n.records.push({date:f(o),sub500nm:c,pm_2_5:d(u)}),i&&(n.partial="")}else n.headerCells=t,n.headerIndiciesByName=t.reduce((function(e,r,t){var o=r.trim();e[o]=t;var a=o.match(/\s*(\d+\.\d+)\s+nm/);return a&&n.particleDiametersAscending.push(parseInt(a[1],10)),e}),{})}else n.partial=e}))),e.abrupt("return",i?n:p(r,n));case 8:case"end":return e.stop()}}),e)})),function(){var e=this,r=arguments;return new Promise((function(t,n){var o=c.apply(e,r);function a(e){u(o,t,n,a,i,"next",e)}function i(e){u(o,t,n,a,i,"throw",e)}a(void 0)}))})},6930:function(e,r,t){"use strict";function n(e,r){if(null===e||void 0===e)throw Error(r)}t.d(r,{k:function(){return n}})}},function(e){e.O(0,[507,774,888,179],(function(){return r=2268,e(e.s=r);var r}));var r=e.O();_N_E=r}]);