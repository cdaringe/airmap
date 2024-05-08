"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[330],{4045:function(r,t,n){n.d(t,{Ok:function(){return i},Hw:function(){return c},e5:function(){return u}});var e=n(3486);function o(r,t){return function(r){if(Array.isArray(r))return r}(r)||function(r,t){var n=[],e=!0,o=!1,a=void 0;try{for(var i,u=r[Symbol.iterator]();!(e=(i=u.next()).done)&&(n.push(i.value),!t||n.length!==t);e=!0);}catch(c){o=!0,a=c}finally{try{e||null==u.return||u.return()}finally{if(o)throw a}}return n}(r,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function a(r){return function(r){if(Array.isArray(r)){for(var t=0,n=new Array(r.length);t<r.length;t++)n[t]=r[t];return n}}(r)||function(r){if(Symbol.iterator in Object(r)||"[object Arguments]"===Object.prototype.toString.call(r))return Array.from(r)}(r)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function i(r){try{var t=new URL(r),n=o(t.pathname.substr(1).split("/"),3),e=n[0],a=n[1],i=n[2];if("spreadsheets"===e&&"d"===a&&i&&t.host.match("google.com"))return!0}catch(u){}return!1}function u(r){var t=new URL(r);return t.pathname=a(t.pathname.substr(1).split("/").splice(0,3)).concat(["export"]).join("/"),String(t)}var c=function(r){var t=new URL(r),n=new URLSearchParams(t.search);return n.has("format")||n.set("format","csv"),t.search=n.toString(),function(r,t){return fetch(r,t).then((function(r){return r.body})).then((function(r){var t=null===r||void 0===r?void 0:r.getReader();return(0,e.k)(t,"missing stream body"),t}))}(u(t.toString()),{mode:"cors",redirect:"follow",headers:{accept:"text"}})}},8330:function(r,t,n){n.r(t),n.d(t,{getResources:function(){return w}});var e={};n.r(e),n.d(e,{getLevels:function(){return m}});var o=n(4235),a=n.n(o),i=n(4045),u=n(3486);function c(r,t,n,e,o,a,i){try{var u=r[a](i),c=u.value}catch(f){return void n(f)}u.done?t(c):Promise.resolve(c).then(e,o)}function f(r){return function(){var t=this,n=arguments;return new Promise((function(e,o){var a=r.apply(t,n);function i(r){c(a,e,o,i,u,"next",r)}function u(r){c(a,e,o,i,u,"throw",r)}i(void 0)}))}}function l(r,t,n){return t in r?Object.defineProperty(r,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):r[t]=n,r}function s(r){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},e=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(e=e.concat(Object.getOwnPropertySymbols(n).filter((function(r){return Object.getOwnPropertyDescriptor(n,r).enumerable})))),e.forEach((function(t){l(r,t,n[t])}))}return r}function d(r,t){return function(r){if(Array.isArray(r))return r}(r)||function(r,t){var n=[],e=!0,o=!1,a=void 0;try{for(var i,u=r[Symbol.iterator]();!(e=(i=u.next()).done)&&(n.push(i.value),!t||n.length!==t);e=!0);}catch(c){o=!0,a=c}finally{try{e||null==u.return||u.return()}finally{if(o)throw a}}return n}(r,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var p=n(6006),h=["#6fc400"],y=[[0,2e3]],v=["get","_"],m=function(r){r.isMinMaxDynamicRange,r.geojson;var t=y;return{circleCases:t.map((0,p.q)(v)).flatMap((function(r,t){return[r,h[t]]})),colors:h,fieldName:"_",ranges:t}},w=function(){return{download:function(){var r=f(a().mark((function r(t){var n,e,o,c,p;return a().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n=d(t,1),e=n[0],(0,u.k)(e,"missing airmap gps url"),r.t0=d,r.next=5,Promise.all([(0,i.Hw)(e).then(function(r){var t=f(a().mark((function r(t,e){var o,i,c,f,d,p;return a().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return o=void 0===e?{records:[],partial:""}:e,r.next=3,t.read();case 3:return i=r.sent,c=i.done,((f=i.value)||c)&&(o.partial+="string"===typeof f?f:f?(new TextDecoder).decode(f):"",d=o.partial.split(/\n/g),p=d.length-1,d.forEach((function(r,t){if(p!==t||c){var n=r.split(",");if(o.headerIndiciesByName){var e=n[o.headerIndiciesByName.latitude],a=n[o.headerIndiciesByName.timestamp],i=n[o.headerIndiciesByName.longitude];(0,u.k)(e,"lat :("),(0,u.k)(i,"long :("),(0,u.k)(a,"timestamp :("),o.records.push({latitude:parseFloat(e),longitude:parseFloat(i),timestamp:new Date(a),_:0}),c&&(o.partial="")}else o.headerIndiciesByName=n.reduce((function(r,t,n){return s({},r,l({},t.trim(),n))}),{})}else o.partial=r}))),r.abrupt("return",c?o:n(t,o));case 8:case"end":return r.stop()}}),r)})));function n(){return t.apply(this,arguments)}return n}())]);case 5:return r.t1=r.sent,o=(0,r.t0)(r.t1,1),c=o[0],p=c.records,r.abrupt("return",p);case 10:case"end":return r.stop()}}),r)}))),t=function(r){return{type:"FeatureCollection",features:r.map((function(r){return{type:"Feature",geometry:{type:"Point",coordinates:[r.longitude,r.latitude]},properties:s({},r)}}))}};return{download:r,downloadGeoJSON:function(n){return r(n).then(t)},dateField:"date",toGeoJSON:t}}(),mapbox:e}}},6006:function(r,t,n){function e(r,t){return function(r){if(Array.isArray(r))return r}(r)||function(r,t){var n=[],e=!0,o=!1,a=void 0;try{for(var i,u=r[Symbol.iterator]();!(e=(i=u.next()).done)&&(n.push(i.value),!t||n.length!==t);e=!0);}catch(c){o=!0,a=c}finally{try{e||null==u.return||u.return()}finally{if(o)throw a}}return n}(r,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}n.d(t,{q:function(){return o}});var o=function(r){return function(t){var n=e(t,2),o=n[0],a=n[1];return["all",[">=",r,o],["<",r,a]]}}},3486:function(r,t,n){function e(r,t){if(null===r||void 0===r)throw Error(t)}n.d(t,{k:function(){return e}})}}]);