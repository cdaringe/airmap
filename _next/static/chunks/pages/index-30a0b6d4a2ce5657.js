(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{2268:function(e,r,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(8622)}])},1988:function(e,r,n){"use strict";n.d(r,{Ok:function(){return u},Hw:function(){return c},e5:function(){return s}});var t=n(5624);function o(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var n=[],t=!0,o=!1,a=void 0;try{for(var u,s=e[Symbol.iterator]();!(t=(u=s.next()).done)&&(n.push(u.value),!r||n.length!==r);t=!0);}catch(c){o=!0,a=c}finally{try{t||null==s.return||s.return()}finally{if(o)throw a}}return n}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function a(e){return function(e){if(Array.isArray(e)){for(var r=0,n=new Array(e.length);r<e.length;r++)n[r]=e[r];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function u(e){try{var r=new URL(e),n=o(r.pathname.substr(1).split("/"),3),t=n[0],a=n[1],u=n[2];if("spreadsheets"===t&&"d"===a&&u&&r.host.match("google.com"))return!0}catch(s){}return!1}function s(e){var r=new URL(e);return r.pathname=a(r.pathname.substr(1).split("/").splice(0,3)).concat(["export"]).join("/"),String(r)}var c=function(e){var r=new URL(e),n=new URLSearchParams(r.search);return n.has("format")||n.set("format","csv"),r.search=n.toString(),function(e,r){return fetch(e,r).then((function(e){return e.body})).then((function(e){var r=null===e||void 0===e?void 0:e.getReader();return(0,t.k)(r,"missing stream body"),r}))}(s(r.toString()),{mode:"cors",redirect:"follow",headers:{accept:"text"}})}},5624:function(e,r,n){"use strict";function t(e,r){if(null===e||void 0===e)throw Error(r)}n.d(r,{k:function(){return t}})},8622:function(e,r,n){"use strict";n.r(r),n.d(r,{default:function(){return U}});var t=n(1250),o=n(9901);function a(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function u(e,r){if(null==e)return{};var n,t,o=function(e,r){if(null==e)return{};var n,t,o={},a=Object.keys(e);for(t=0;t<a.length;t++)n=a[t],r.indexOf(n)>=0||(o[n]=e[n]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(t=0;t<a.length;t++)n=a[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s,c,i=function(e){var r=e.className,n=u(e,["className"]);return(0,t.jsx)("select",function(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{},t=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),t.forEach((function(r){a(e,r,n[r])}))}return e}({className:"block text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ".concat(r||"")},n))};function l(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}(c=s||(s={})).googlesheetsurl="googlesheetsurl",c.csvurl="csvurl",c.googleDrive="googledrive";var f=function(e){return(0,t.jsxs)(i,function(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{},t=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),t.forEach((function(r){l(e,r,n[r])}))}return e}({},e,{children:[(0,t.jsx)("option",{value:s.googlesheetsurl,children:"Google Sheets URL"}),(0,t.jsx)("option",{disabled:!0,value:s.googleDrive,children:"Google Drive"}),(0,t.jsx)("option",{disabled:!0,value:s.csvurl,children:"CSV URL"})]}))},p=n(7210),d=n(9944),g=n(797),h=n(4235),b=n.n(h),m=n(4221),y=n(9507),v=n(615);function x(e,r,n,t,o,a,u){try{var s=e[a](u),c=s.value}catch(i){return void n(i)}s.done?r(c):Promise.resolve(c).then(t,o)}function w(e){return function(){var r=this,n=arguments;return new Promise((function(t,o){var a=e.apply(r,n);function u(e){x(a,t,o,u,s,"next",e)}function s(e){x(a,t,o,u,s,"throw",e)}u(void 0)}))}}function j(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var n=[],t=!0,o=!1,a=void 0;try{for(var u,s=e[Symbol.iterator]();!(t=(u=s.next()).done)&&(n.push(u.value),!r||n.length!==r);t=!0);}catch(c){o=!0,a=c}finally{try{t||null==s.return||s.return()}finally{if(o)throw a}}return n}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function O(e){return function(e){if(Array.isArray(e)){for(var r=0,n=new Array(e.length);r<e.length;r++)n[r]=e[r];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var S=new Set(["dat","csv","gpx"]),P=function(e){var r=e.onInputRead,a=(0,m.useRouter)(),u=j(o.useState(!1),2),s=u[0],c=u[1],i=j(o.useState(""),2),l=i[0],f=i[1],p=j(o.useState(!1),2),g=p[0],h=p[1],x=j(o.useState(null),2),P=x[0],k=x[1],N=j(o.useState(null),2),R=N[0],E=N[1],T=j(o.useState(null),2),C=T[0],A=T[1];o.useEffect((function(){!l&&R&&C&&c(!0)}),[l,P,R,C,r]);var U=o.useCallback((function(e){var r,t;r=w(b().mark((function r(){return b().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return h(!0),r.next=3,Promise.all(Array.from(e).map(w(b().mark((function e(r){var t,o,a,u,s,c,i,l,f;return b().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o=null===(t=r.name.match(/\.(.*)$/))||void 0===t?void 0:t[1],S.has(o)){e.next=4;break}throw new Error("invalid filename. must end with ".concat(O(S).join(", ")));case 4:e.t0=o,e.next="csv"===e.t0?7:"dat"===e.t0?15:"gpx"===e.t0?23:32;break;case 7:return e.next=9,(0,v.SR)();case 9:return a=e.sent,e.next=12,a.stream.parse(r.stream().getReader());case 12:return u=e.sent.records,k(u),e.abrupt("break",33);case 15:return e.next=17,(0,v.pW)();case 17:return s=e.sent,e.next=20,s.stream.parse(r.stream().getReader());case 20:return c=e.sent.records,E(c),e.abrupt("break",33);case 23:return e.next=25,n.e(86).then(n.bind(n,1086));case 25:return i=e.sent,e.next=28,r.text();case 28:return l=e.sent,f=i.ofGpxString(l),A(f),e.abrupt("break",33);case 32:throw new Error("unhandled case: ".concat(o));case 33:case"end":return e.stop()}}),e)}))))).finally((function(){h(!1)}));case 3:case"end":return r.stop()}}),r)}))),t=function(e){return f(String(e))},Promise.resolve(r()).catch(t)}),[]);return(0,t.jsxs)(t.Fragment,{children:[l?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("h3",{children:"Error"}),(0,t.jsx)("p",{children:l}),(0,t.jsx)(d.Z,{onClick:function(){return f("")},children:"Try again?"})]}):(0,t.jsxs)(t.Fragment,{children:[g?(0,t.jsx)("p",{children:"Loading..."}):null,(0,t.jsx)(y.b,{disabled:g,multiple:!0,handleChange:U,name:"file",types:O(S)}),P?(0,t.jsx)("p",{className:"text-green-800",children:"\u2705 PocketLabs"}):(0,t.jsx)("p",{className:"text-red-800",children:"Missing pocketlab file"}),R?(0,t.jsx)("p",{className:"text-green-800",children:"\u2705 MiniWras"}):(0,t.jsx)("p",{className:"text-red-800",children:"Missing miniwras file"}),C?(0,t.jsx)("p",{className:"text-green-800",children:"\u2705 Strava"}):(0,t.jsx)("p",{className:"text-red-800",children:"Missing strava file"})]}),(0,t.jsx)(d.Z,{disabled:!s,className:"block m-auto mt-2",onClick:w(b().mark((function e(){var n,t;return b().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,v.pW)();case 2:n=e.sent,t=n.download.combine({pocketlabs:P,strava:C,miniwras:R}),r(t),a.push("/map");case 6:case"end":return e.stop()}}),e)}))),children:"Submit"})]})},k=function(e){var r=e.datasource,n=e.isRenderingUrlErrorState,o=e.isSubmitDisabled,a=(e.luggage,e.onDatasourceSourceChange),u=(e.onKmlChange,e.onMiniWrasReady),s=e.onSubmit,c=e.onUrlsChange,l=e.onSensorTypeChange,h=e.sensorType,b=e.urls,m=h!==g.R3;return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("p",{className:"text-center text-gray-600 gray-200",children:"Enter your datasource"}),(0,t.jsxs)(i,{defaultValue:h,placeholder:"Select sensor type",className:"w-full mt-1",onMouseOver:function(){h===g.$C&&l(-1)},onMouseOut:function(){h<g.$C&&l(0)},onChange:function(e){var r=e.currentTarget.value;c([]),l(parseInt(r,10))},children:[(0,t.jsx)("option",{disabled:!0,value:g.$C,children:"Select sensor type..."}),(0,t.jsx)("option",{value:g.OS,children:"Flow"}),(0,t.jsx)("option",{value:g.p4,children:"PocketLabs"}),(0,t.jsx)("option",{value:g.R3,children:"MiniWRAS"}),(0,t.jsx)("option",{value:g.xV,children:"airmap\u2122 GPS"})]}),m?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(f,{required:!0,className:"w-full mt-1",value:r,onChange:a}),(0,t.jsx)(p.Z,{required:!0,error:n,className:"w-full mt-1",placeholder:h===g.OS?"User Measures: https://url/to/data":"https://url/to/data",defaultValue:b[0],onChange:function(e){return c([e.currentTarget.value,b[1]].filter(Boolean))}},"".concat(h,"-url-1"))]}):null,h===g.OS?(0,t.jsx)(p.Z,{required:!0,error:n,className:"w-full mt-1",placeholder:"User Positions: https://url/to/data",defaultValue:b[1],onChange:function(e){return c([b[0],e.currentTarget.value])}},"".concat(h,"-url-2")):null,n?(0,t.jsxs)("p",{className:"text-sm text-left text-red-600",children:["Sheets URL must have the form:",(0,t.jsx)("br",{}),"https://docs.google.com/spreadsheets/d/:id/gviz/tq"]}):null,h===g.R3?(0,t.jsx)("div",{className:"mt-1",children:(0,t.jsx)(P,{onInputRead:function(e){u(e)}})}):null,h===g.R3?null:(0,t.jsx)(d.Z,{disabled:o,className:"block m-auto mt-2",onClick:s,children:"Submit"})]})},N=n(1988),R=n(2168),E=n(8247);function T(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function C(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{},t=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),t.forEach((function(r){T(e,r,n[r])}))}return e}var A=[];function U(){var e=(0,R.wl)(),r=e.value,n=e.update,o=r.urls,a=r.datasource,u=r.sensorType,s=r.luggage,c=function(e,t){return n(C({},r,T({},e,t)))},i=(0,E.jU)(),l=i.value.accessToken,f=(i.update,o.every((function(e){return(0,N.Ok)(e)}))&&(u!==g.OS||2===o.length)),p=(0,m.useRouter)(),d=!(!o.length||f),h=!f||!l||0===u||u===g.R3&&!s;return(0,t.jsxs)("form",{className:"max-w-screen-md content home w-96",onSubmit:function(e){return e.preventDefault()},children:[(0,t.jsx)("h1",{className:"text-4xl text-center",children:"airmap!"}),(0,t.jsx)(k,{isSubmitDisabled:h,luggage:s,datasource:a,sensorType:u,isRenderingUrlErrorState:d,onDatasourceSourceChange:function(e){return c("datasource",e.currentTarget.value)},onSensorTypeChange:function(e){return n((function(n){return C({},n,{luggage:A.includes(r.sensorType)?n.luggage:null,urls:[],sensorType:e})}))},onUrlsChange:function(e){return c("urls",e)},onKmlChange:function(e){return c("luggage",e)},onMiniWrasReady:function(e){return c("luggage",e)},urls:o,onSubmit:function(){h||(c("urls",o.map((function(e){return(0,N.e5)(e)}))),p.push("/map"))}}),null]})}},9944:function(e,r,n){"use strict";var t=n(1250),o=n(5789);n(9901);function a(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function u(e,r){if(null==e)return{};var n,t,o=function(e,r){if(null==e)return{};var n,t,o={},a=Object.keys(e);for(t=0;t<a.length;t++)n=a[t],r.indexOf(n)>=0||(o[n]=e[n]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(t=0;t<a.length;t++)n=a[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s="bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200",c="flex";r.Z=function(e){var r=e.styles,n=void 0===r?{}:r,i=n.bg,l=void 0===i?s:i,f=n.display,p=void 0===f?c:f,d=e.type,g=void 0===d?"button":d,h=e.className,b=u(e,["styles","type","className"]),m=(0,o.Z)(h,l,p,"py-2 px-4 justify-center items-center text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg",b.disabled?"bg-gray-400 hover:bg-gray-400 cursor-not-allowed":"");return(0,t.jsx)("button",function(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{},t=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),t.forEach((function(r){a(e,r,n[r])}))}return e}({type:g,className:m},b))}},7210:function(e,r,n){"use strict";var t=n(1250),o=(n(9901),n(5789));function a(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function u(e,r){if(null==e)return{};var n,t,o=function(e,r){if(null==e)return{};var n,t,o={},a=Object.keys(e);for(t=0;t<a.length;t++)n=a[t],r.indexOf(n)>=0||(o[n]=e[n]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(t=0;t<a.length;t++)n=a[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}r.Z=function(e){var r=e.error,n=e.className,s=u(e,["error","className"]);return(0,t.jsx)("input",function(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{},t=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),t.forEach((function(r){a(e,r,n[r])}))}return e}({className:(0,o.Z)("rounded-lg border-transparent flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent",r?"border-red-600":void 0,n)},s))}},615:function(e,r,n){"use strict";n.d(r,{SR:function(){return i},pW:function(){return l},rk:function(){return f}});var t=n(4235),o=n.n(t),a=n(1371),u=n(797);function s(e,r,n,t,o,a,u){try{var s=e[a](u),c=s.value}catch(i){return void n(i)}s.done?r(c):Promise.resolve(c).then(t,o)}function c(e){return function(){var r=this,n=arguments;return new Promise((function(t,o){var a=e.apply(r,n);function u(e){s(a,t,o,u,c,"next",e)}function c(e){s(a,t,o,u,c,"throw",e)}u(void 0)}))}}var i=function(){return n.e(855).then(n.bind(n,855)).then((function(e){return e.getResources()}))},l=function(){return n.e(422).then(n.bind(n,6422)).then(c(o().mark((function e(r){var t;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([n.e(87),n.e(358)]).then(n.bind(n,358));case 2:return t=e.sent.closestTo,e.abrupt("return",r.getResources({closestTo:t}));case 4:case"end":return e.stop()}}),e)}))))},f=function(e){return(0,a.useQuery)({queryKey:"get-mapping-".concat(e),queryFn:c(o().mark((function r(){var t;return o().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e===u.p4?i():e===u.OS?n.e(848).then(n.bind(n,7848)).then(c(o().mark((function e(r){var t;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([n.e(87),n.e(358)]).then(n.bind(n,358));case 2:return t=e.sent.closestTo,e.abrupt("return",r.getResources({closestTo:t}));case 4:case"end":return e.stop()}}),e)})))):e===u.R3?l():e===u.xV?n.e(463).then(n.bind(n,3463)).then(c(o().mark((function e(r){var t;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([n.e(87),n.e(358)]).then(n.bind(n,358));case 2:return t=e.sent.closestTo,e.abrupt("return",r.getResources({closestTo:t}));case 4:case"end":return e.stop()}}),e)})))):function(){throw new Error("unsupported sensor type ".concat(e))}();case 2:return t=r.sent,r.abrupt("return",t);case 4:case"end":return r.stop()}}),r)}))),cacheTime:1e9})}}},function(e){e.O(0,[507,774,888,179],(function(){return r=2268,e(e.s=r);var r}));var r=e.O();_N_E=r}]);