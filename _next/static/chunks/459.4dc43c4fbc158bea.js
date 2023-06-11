"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[459],{7709:function(e,t,r){function n(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}r.d(t,{Z:function(){return n}})},7617:function(e,t,r){r.d(t,{Z:function(){return o}});var n=r(7709);function o(e){(0,n.Z)(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||"object"===typeof e&&"[object Date]"===t?new Date(e.getTime()):"number"===typeof e||"[object Number]"===t?new Date(e):("string"!==typeof e&&"[object String]"!==t||"undefined"===typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}},4045:function(e,t,r){r.d(t,{Ok:function(){return i},Hw:function(){return c},e5:function(){return u}});var n=r(3486);function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],n=!0,o=!1,a=void 0;try{for(var i,u=e[Symbol.iterator]();!(n=(i=u.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(c){o=!0,a=c}finally{try{n||null==u.return||u.return()}finally{if(o)throw a}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function a(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function i(e){try{var t=new URL(e),r=o(t.pathname.substr(1).split("/"),3),n=r[0],a=r[1],i=r[2];if("spreadsheets"===n&&"d"===a&&i&&t.host.match("google.com"))return!0}catch(u){}return!1}function u(e){var t=new URL(e);return t.pathname=a(t.pathname.substr(1).split("/").splice(0,3)).concat(["export"]).join("/"),String(t)}var c=function(e){var t=new URL(e),r=new URLSearchParams(t.search);return r.has("format")||r.set("format","csv"),t.search=r.toString(),function(e,t){return fetch(e,t).then((function(e){return e.body})).then((function(e){var t=null===e||void 0===e?void 0:e.getReader();return(0,n.k)(t,"missing stream body"),t}))}(u(t.toString()),{mode:"cors",redirect:"follow",headers:{accept:"text"}})}},6006:function(e,t,r){function n(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],n=!0,o=!1,a=void 0;try{for(var i,u=e[Symbol.iterator]();!(n=(i=u.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(c){o=!0,a=c}finally{try{n||null==u.return||u.return()}finally{if(o)throw a}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}r.d(t,{q:function(){return o}});var o=function(e){return function(t){var r=n(t,2),o=r[0],a=r[1];return["all",[">=",e,o],["<",e,a]]}}},8459:function(e,t,r){r.r(t),r.d(t,{getResources:function(){return J}});var n={};r.r(n),r.d(n,{combine:function(){return B},dateField:function(){return F},download:function(){return _},downloadGeoJSON:function(){return C},toGeoJSON:function(){return R}});var o={};r.r(o),r.d(o,{getLevels:function(){return G}});var a=r(4235),i=r.n(a),u=r(7617),c=r(7709);function s(e,t){(0,c.Z)(2,arguments);var r=(0,u.Z)(e);if(isNaN(Number(r)))return new Date(NaN);var n,o,a=r.getTime();return(null==t?[]:"function"===typeof t.forEach?t:Array.prototype.slice.call(t)).forEach((function(e){var t=(0,u.Z)(e);if(isNaN(Number(t)))return n=new Date(NaN),void(o=NaN);var r=Math.abs(a-t.getTime());(null==n||r<Number(o))&&(n=t,o=r)})),n}var f=r(4045),l=r(3486);function p(e,t,r,n,o,a,i){try{var u=e[a](i),c=u.value}catch(s){return void r(s)}u.done?t(c):Promise.resolve(c).then(n,o)}function d(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function v(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){d(e,t,r[t])}))}return e}var m,y=function(e){return parseInt(e)},h=function(e){return new Date(1e3*parseInt(e))},b=function(e){return parseFloat(e)},g=(m=i().mark((function e(t,r){var n,o,a,u,c,s;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=void 0===r?{records:[],partial:""}:r,e.next=3,t.read();case 3:return o=e.sent,a=o.done,((u=o.value)||a)&&(n.partial+="string"===typeof u?u:u?(new TextDecoder).decode(u):"",c=n.partial.split(/\n/g),s=c.length-1,c.forEach((function(e,t){if(s!==t||a){var r=e.split(",");if(n.headerIndiciesByName){var o="VOC (ppb)",i=r[n.headerIndiciesByName["VOC (ppb)"]],u=r[n.headerIndiciesByName.timestamp],c=r[n.headerIndiciesByName["pm 2.5 (ug/m3)"]];(0,l.k)(i,"voc missing (".concat(o,", value: ").concat(i,")")),(0,l.k)(u,"timestamp missing"),(0,l.k)(c,"pm25 missing"),n.records.push({voc_ppb:y(i),date:h(u),pm_2_5:b(c)}),a&&(n.partial="")}else n.headerIndiciesByName=r.reduce((function(e,t,r){return v({},e,d({},t.trim(),r))}),{})}else n.partial=e}))),e.abrupt("return",a?n:g(t,n));case 8:case"end":return e.stop()}}),e)})),function(){var e=this,t=arguments;return new Promise((function(r,n){var o=m.apply(e,t);function a(e){p(o,r,n,a,i,"next",e)}function i(e){p(o,r,n,a,i,"throw",e)}a(void 0)}))});function w(e,t,r,n,o,a,i){try{var u=e[a](i),c=u.value}catch(s){return void r(s)}u.done?t(c):Promise.resolve(c).then(n,o)}function O(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function N(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){O(e,t,r[t])}))}return e}var j=function(e){return 1e3*parseInt(e)},k=function(e){return parseFloat(e)},x=function(e){return parseFloat(e)},S=function(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var a=e.apply(t,r);function i(e){w(a,n,o,i,u,"next",e)}function u(e){w(a,n,o,i,u,"throw",e)}i(void 0)}))}}(i().mark((function e(t,r){var n,o,a,u,c,s;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=void 0===r?{records:[],partial:""}:r,e.next=3,t.read();case 3:return o=e.sent,a=o.done,((u=o.value)||a)&&(n.partial+="string"===typeof u?u:u?(new TextDecoder).decode(u):"",c=n.partial.split(/\n/g),s=c.length-1,c.forEach((function(e,t){if(s!==t||a){var r=e.split(",");n.headerIndiciesByName?(n.records.push({timestamp:j(r[n.headerIndiciesByName.timestamp]),latitude:k(r[n.headerIndiciesByName.latitude]),longitude:x(r[n.headerIndiciesByName.longitude])}),a&&(n.partial="")):n.headerIndiciesByName=r.reduce((function(e,t,r){return N({},e,O({},t.trim(),r))}),{})}else n.partial=e}))),e.abrupt("return",a?n:S(t,n));case 8:case"end":return e.stop()}}),e)}))),P=function(e,t){for(var r=[],n=0;n<e;)r.push(t[n]),++n;return r};function I(e,t,r,n,o,a,i){try{var u=e[a](i),c=u.value}catch(s){return void r(s)}u.done?t(c):Promise.resolve(c).then(n,o)}function A(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var a=e.apply(t,r);function i(e){I(a,n,o,i,u,"next",e)}function u(e){I(a,n,o,i,u,"throw",e)}i(void 0)}))}}function E(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function D(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){E(e,t,r[t])}))}return e}function T(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],n=!0,o=!1,a=void 0;try{for(var i,u=e[Symbol.iterator]();!(n=(i=u.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(c){o=!0,a=c}finally{try{n||null==u.return||u.return()}finally{if(o)throw a}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var B=A(i().mark((function e(t){var r,n,o,a,u,c,f,l,p,d,v,m;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=t.measures,n=t.positions,r.length!==n.length&&console.warn("lossy data - measures ".concat(r.length,", positions ").concat(n.length)),o=n.map((function(e){return e.timestamp})),a=function(e){for(var t=e.getTime();o[0]!==t;)o.shift()},u=function(e,t){var r=t.findIndex((function(t){return t>=e}));return-1===r?t:P(r+1,t)},c=[],f=!0,l=!1,p=void 0,e.prev=7,d=r[Symbol.iterator]();case 9:if(f=(v=d.next()).done){e.next=16;break}return m=v.value,e.next=13,new Promise((function(e,t){queueMicrotask((function(){try{var r=s(m.date,u(m.date.getTime(),o));a(r);var i=n.find((function(e){return e.timestamp===r.getTime()})),f=D({},m,{date:new Date(m.date),latitude:i.latitude,longitude:i.longitude,skip:Math.abs(i.timestamp-m.date.getTime())>6e4});return f.skip||c.push(f),e()}catch(l){return t(l)}}))}));case 13:f=!0,e.next=9;break;case 16:e.next=22;break;case 18:e.prev=18,e.t0=e.catch(7),l=!0,p=e.t0;case 22:e.prev=22,e.prev=23,f||null==d.return||d.return();case 25:if(e.prev=25,!l){e.next=28;break}throw p;case 28:return e.finish(25);case 29:return e.finish(22);case 30:return e.abrupt("return",c);case 31:case"end":return e.stop()}}),e,null,[[7,18,22,30],[23,,25,29]])}))),_=A(i().mark((function e(t,r){var n,o,a,u,c,s,p,d,v;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=(void 0===r?{}:r).omitPositions,o=T(t,2),a=o[0],u=o[1],(0,l.k)(a,""),(0,l.k)(u,""),e.t0=T,e.next=7,Promise.all([(0,f.Hw)(a).then(g),n?{records:[]}:(0,f.Hw)(u).then(S)]);case 7:return e.t1=e.sent,c=(0,e.t0)(e.t1,2),s=c[0],p=s.records,d=c[1],v=d.records,e.abrupt("return",n?p:B({measures:p,positions:v}));case 14:case"end":return e.stop()}}),e)}))),R=function(e){return{type:"FeatureCollection",features:e.map((function(e){return{type:"Feature",geometry:{type:"Point",coordinates:[e.longitude,e.latitude]},properties:e}}))}},C=function(e){return _(e).then(R)},F="date",M=r(6006);function Z(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var L=["#6fc400","#feff00","#ffaa00","#ff5600","#991113","#4d0173"],q="voc_ppb",U=[[0,2e3],[2e3,4e3],[4e3,6e3],[6e3,8e3],[8e3,1e4],[12e3,1e9]],H=["get",q],G=function(e){var t=e.isMinMaxDynamicRange,r=e.geojson,n=0,o=1/0,a=-1/0,i=!0,u=!1,c=void 0;try{for(var s,f=r.features[Symbol.iterator]();!(i=(s=f.next()).done);i=!0){(n=s.value.properties.pm_2_5)>a&&(a=n),n<o&&(o=n)}}catch(v){u=!0,c=v}finally{try{i||null==f.return||f.return()}finally{if(u)throw c}}var l=L.length,p=t?(a-o)/l:0,d=t?Z(new Array(l)).map((function(e,t){var r=o+t*p;return[r,r+p]})):U;return{circleCases:d.map((0,M.q)(H)).flatMap((function(e,t){return[e,L[t]]})),colors:L,fieldName:q,ranges:d}},J=function(){return{download:n,mapbox:o}}},3486:function(e,t,r){function n(e,t){if(null===e||void 0===e)throw Error(t)}r.d(t,{k:function(){return n}})}}]);