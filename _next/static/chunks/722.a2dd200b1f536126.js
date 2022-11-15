"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[722],{1988:function(e,t,r){r.d(t,{Ok:function(){return i},Hw:function(){return c},e5:function(){return u}});var n=r(5624);function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],n=!0,o=!1,a=void 0;try{for(var i,u=e[Symbol.iterator]();!(n=(i=u.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(c){o=!0,a=c}finally{try{n||null==u.return||u.return()}finally{if(o)throw a}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function a(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function i(e){try{var t=new URL(e),r=o(t.pathname.substr(1).split("/"),3),n=r[0],a=r[1],i=r[2];if("spreadsheets"===n&&"d"===a&&i&&t.host.match("google.com"))return!0}catch(u){}return!1}function u(e){var t=new URL(e);return t.pathname=a(t.pathname.substr(1).split("/").splice(0,3)).concat(["export"]).join("/"),String(t)}var c=function(e){var t=new URL(e),r=new URLSearchParams(t.search);return r.has("format")||r.set("format","csv"),t.search=r.toString(),function(e,t){return fetch(e,t).then((function(e){return e.body})).then((function(e){var t=null===e||void 0===e?void 0:e.getReader();return(0,n.k)(t,"missing stream body"),t}))}(u(t.toString()),{mode:"cors",redirect:"follow",headers:{accept:"text"}})}},8677:function(e,t,r){function n(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],n=!0,o=!1,a=void 0;try{for(var i,u=e[Symbol.iterator]();!(n=(i=u.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(c){o=!0,a=c}finally{try{n||null==u.return||u.return()}finally{if(o)throw a}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}r.d(t,{q:function(){return o}});var o=function(e){return function(t){var r=n(t,2),o=r[0],a=r[1];return["all",[">=",e,o],["<",e,a]]}}},3722:function(e,t,r){r.r(t),r.d(t,{getResources:function(){return E}});var n={};r.r(n),r.d(n,{getLevels:function(){return N}});var o=r(4235),a=r.n(o),i=r(1988),u=r(5624);function c(e,t,r,n,o,a,i){try{var u=e[a](i),c=u.value}catch(s){return void r(s)}u.done?t(c):Promise.resolve(c).then(n,o)}function s(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function f(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){s(e,t,r[t])}))}return e}var l,p=function(e){return parseInt(e)},d=function(e){return new Date(1e3*parseInt(e))},v=function(e){return parseFloat(e)},m=(l=a().mark((function e(t,r){var n,o,i,c,l,h;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=void 0===r?{records:[],partial:""}:r,e.next=3,t.read();case 3:return o=e.sent,i=o.done,((c=o.value)||i)&&(n.partial+="string"===typeof c?c:c?(new TextDecoder).decode(c):"",l=n.partial.split(/\n/g),h=l.length-1,l.forEach((function(e,t){if(h!==t||i){var r=e.split(",");if(n.headerIndiciesByName){var o="VOC (ppb)",a=r[n.headerIndiciesByName["VOC (ppb)"]],c=r[n.headerIndiciesByName.timestamp],l=r[n.headerIndiciesByName["pm 2.5 (ug/m3)"]];(0,u.k)(a,"voc missing (".concat(o,", value: ").concat(a,")")),(0,u.k)(c,"timestamp missing"),(0,u.k)(l,"pm25 missing"),n.records.push({voc_ppb:p(a),date:d(c),pm_2_5:v(l)}),i&&(n.partial="")}else n.headerIndiciesByName=r.reduce((function(e,t,r){return f({},e,s({},t.trim(),r))}),{})}else n.partial=e}))),e.abrupt("return",i?n:m(t,n));case 8:case"end":return e.stop()}}),e)})),function(){var e=this,t=arguments;return new Promise((function(r,n){var o=l.apply(e,t);function a(e){c(o,r,n,a,i,"next",e)}function i(e){c(o,r,n,a,i,"throw",e)}a(void 0)}))}),h=r(5205),y=function(e,t){for(var r=[],n=0;n<e;)r.push(t[n]),++n;return r};function b(e,t,r,n,o,a,i){try{var u=e[a](i),c=u.value}catch(s){return void r(s)}u.done?t(c):Promise.resolve(c).then(n,o)}function g(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var a=e.apply(t,r);function i(e){b(a,n,o,i,u,"next",e)}function u(e){b(a,n,o,i,u,"throw",e)}i(void 0)}))}}function w(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function O(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){w(e,t,r[t])}))}return e}function x(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],n=!0,o=!1,a=void 0;try{for(var i,u=e[Symbol.iterator]();!(n=(i=u.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(c){o=!0,a=c}finally{try{n||null==u.return||u.return()}finally{if(o)throw a}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var k=r(8677);function j(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var P=["#6fc400","#feff00","#ffaa00","#ff5600","#991113","#4d0173"],S="voc_ppb",I=[[0,2e3],[2e3,4e3],[4e3,6e3],[6e3,8e3],[8e3,1e4],[12e3,1e9]],A=["get",S],N=function(e){var t=e.isMinMaxDynamicRange,r=e.geojson,n=0,o=1/0,a=-1/0,i=!0,u=!1,c=void 0;try{for(var s,f=r.features[Symbol.iterator]();!(i=(s=f.next()).done);i=!0){(n=s.value.properties.pm_2_5)>a&&(a=n),n<o&&(o=n)}}catch(v){u=!0,c=v}finally{try{i||null==f.return||f.return()}finally{if(u)throw c}}var l=P.length,p=t?(a-o)/l:0,d=t?j(new Array(l)).map((function(e,t){var r=o+t*p;return[r,r+p]})):I;return{circleCases:d.map((0,k.q)(A)).flatMap((function(e,t){return[e,P[t]]})),colors:P,fieldName:S,pm2Ranges:d}},E=function(e){return{download:function(e){var t=g(a().mark((function e(t){var r,n,o,i,u,c,s,f,l,p,d,v,m;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=t.measures,n=t.positions,o=t.r,r.length!==n.length&&console.warn("lossy data - measures ".concat(r.length,", positions ").concat(n.length)),i=n.map((function(e){return e.timestamp})),u=function(e){for(var t=e.getTime();i[0]!==t;)i.shift()},c=function(e,t){var r=t.findIndex((function(t){return t>=e}));return-1===r?t:y(r+1,t)},s=[],f=!0,l=!1,p=void 0,e.prev=7,d=r[Symbol.iterator]();case 9:if(f=(v=d.next()).done){e.next=16;break}return m=v.value,e.next=13,new Promise((function(e,t){queueMicrotask((function(){try{var r=o.closestTo(m.date,c(m.date.getTime(),i));u(r);var a=n.find((function(e){return e.timestamp===r.getTime()})),f=O({},m,{date:new Date(m.date),latitude:a.latitude,longitude:a.longitude,skip:Math.abs(a.timestamp-m.date.getTime())>6e4});return f.skip||s.push(f),e()}catch(l){return t(l)}}))}));case 13:f=!0,e.next=9;break;case 16:e.next=22;break;case 18:e.prev=18,e.t0=e.catch(7),l=!0,p=e.t0;case 22:e.prev=22,e.prev=23,f||null==d.return||d.return();case 25:if(e.prev=25,!l){e.next=28;break}throw p;case 28:return e.finish(25);case 29:return e.finish(22);case 30:return e.abrupt("return",s);case 31:case"end":return e.stop()}}),e,null,[[7,18,22,30],[23,,25,29]])}))),r=g(a().mark((function r(n,o){var c,s,f,l,p,d,v,y,b;return a().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return c=(void 0===o?{}:o).omitPositions,s=x(n,2),f=s[0],l=s[1],(0,u.k)(f,""),(0,u.k)(l,""),r.t0=x,r.next=7,Promise.all([(0,i.Hw)(f).then(m),c?{records:[]}:(0,i.Hw)(l).then(h.Q)]);case 7:return r.t1=r.sent,p=(0,r.t0)(r.t1,2),d=p[0],v=d.records,y=p[1],b=y.records,r.abrupt("return",c?v:t({measures:v,positions:b,r:e}));case 14:case"end":return r.stop()}}),r)}))),n=function(e){return{type:"FeatureCollection",features:e.map((function(e){return{type:"Feature",geometry:{type:"Point",coordinates:[e.longitude,e.latitude]},properties:O({},e)}}))}};return{combine:t,download:r,downloadGeoJSON:function(e){return r(e).then(n)},dateField:"date",toGeoJSON:n}}(e),mapbox:n}}},5205:function(e,t,r){r.d(t,{Q:function(){return p}});var n=r(4235),o=r.n(n);function a(e,t,r,n,o,a,i){try{var u=e[a](i),c=u.value}catch(s){return void r(s)}u.done?t(c):Promise.resolve(c).then(n,o)}function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){i(e,t,r[t])}))}return e}var c,s=function(e){return 1e3*parseInt(e)},f=function(e){return parseFloat(e)},l=function(e){return parseFloat(e)},p=(c=o().mark((function e(t,r){var n,a,c,d,v,m;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=void 0===r?{records:[],partial:""}:r,e.next=3,t.read();case 3:return a=e.sent,c=a.done,((d=a.value)||c)&&(n.partial+="string"===typeof d?d:d?(new TextDecoder).decode(d):"",v=n.partial.split(/\n/g),m=v.length-1,v.forEach((function(e,t){if(m!==t||c){var r=e.split(",");n.headerIndiciesByName?(n.records.push({timestamp:s(r[n.headerIndiciesByName.timestamp]),latitude:f(r[n.headerIndiciesByName.latitude]),longitude:l(r[n.headerIndiciesByName.longitude])}),c&&(n.partial="")):n.headerIndiciesByName=r.reduce((function(e,t,r){return u({},e,i({},t.trim(),r))}),{})}else n.partial=e}))),e.abrupt("return",c?n:p(t,n));case 8:case"end":return e.stop()}}),e)})),function(){var e=this,t=arguments;return new Promise((function(r,n){var o=c.apply(e,t);function i(e){a(o,r,n,i,u,"next",e)}function u(e){a(o,r,n,i,u,"throw",e)}i(void 0)}))})},5624:function(e,t,r){function n(e,t){if(null===e||void 0===e)throw Error(t)}r.d(t,{k:function(){return n}})}}]);