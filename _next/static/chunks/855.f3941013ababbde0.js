"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[855],{1988:function(r,t,n){n.d(t,{Ok:function(){return i},Hw:function(){return c},e5:function(){return u}});var e=n(5624);function o(r,t){return function(r){if(Array.isArray(r))return r}(r)||function(r,t){var n=[],e=!0,o=!1,a=void 0;try{for(var i,u=r[Symbol.iterator]();!(e=(i=u.next()).done)&&(n.push(i.value),!t||n.length!==t);e=!0);}catch(c){o=!0,a=c}finally{try{e||null==u.return||u.return()}finally{if(o)throw a}}return n}(r,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function a(r){return function(r){if(Array.isArray(r)){for(var t=0,n=new Array(r.length);t<r.length;t++)n[t]=r[t];return n}}(r)||function(r){if(Symbol.iterator in Object(r)||"[object Arguments]"===Object.prototype.toString.call(r))return Array.from(r)}(r)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function i(r){try{var t=new URL(r),n=o(t.pathname.substr(1).split("/"),3),e=n[0],a=n[1],i=n[2];if("spreadsheets"===e&&"d"===a&&i&&t.host.match("google.com"))return!0}catch(u){}return!1}function u(r){var t=new URL(r);return t.pathname=a(t.pathname.substr(1).split("/").splice(0,3)).concat(["export"]).join("/"),String(t)}var c=function(r){var t=new URL(r),n=new URLSearchParams(t.search);return n.has("format")||n.set("format","csv"),t.search=n.toString(),function(r,t){return fetch(r,t).then((function(r){return r.body})).then((function(r){var t=null===r||void 0===r?void 0:r.getReader();return(0,e.k)(t,"missing stream body"),t}))}(u(t.toString()),{mode:"cors",redirect:"follow",headers:{accept:"text"}})}},8677:function(r,t,n){function e(r,t){return function(r){if(Array.isArray(r))return r}(r)||function(r,t){var n=[],e=!0,o=!1,a=void 0;try{for(var i,u=r[Symbol.iterator]();!(e=(i=u.next()).done)&&(n.push(i.value),!t||n.length!==t);e=!0);}catch(c){o=!0,a=c}finally{try{e||null==u.return||u.return()}finally{if(o)throw a}}return n}(r,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}n.d(t,{q:function(){return o}});var o=function(r){return function(t){var n=e(t,2),o=n[0],a=n[1];return["all",[">=",r,o],["<",r,a]]}}},855:function(r,t,n){n.r(t),n.d(t,{dateField:function(){return m},download:function(){return d},downloadGeoJSON:function(){return v},getResources:function(){return j},toGeoJSON:function(){return y}});var e={};n.r(e),n.d(e,{dateField:function(){return m},download:function(){return d},downloadGeoJSON:function(){return v},toGeoJSON:function(){return y}});var o={};n.r(o),n.d(o,{getLevels:function(){return S}});var a=n(4235),i=n.n(a),u=n(3415),c=n(1988);function f(r,t,n,e,o,a,i){try{var u=r[a](i),c=u.value}catch(f){return void n(f)}u.done?t(c):Promise.resolve(c).then(e,o)}function l(r,t,n){return t in r?Object.defineProperty(r,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):r[t]=n,r}function s(r){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},e=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(e=e.concat(Object.getOwnPropertySymbols(n).filter((function(r){return Object.getOwnPropertyDescriptor(n,r).enumerable})))),e.forEach((function(t){l(r,t,n[t])}))}return r}var p,d=(p=i().mark((function r(t){var n;return i().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,(0,c.Hw)(t[0]).then(u.parse);case 2:return n=r.sent,r.abrupt("return",n.records);case 4:case"end":return r.stop()}}),r)})),function(){var r=this,t=arguments;return new Promise((function(n,e){var o=p.apply(r,t);function a(r){f(o,n,e,a,i,"next",r)}function i(r){f(o,n,e,a,i,"throw",r)}a(void 0)}))}),y=function(r){return{type:"FeatureCollection",features:r.map((function(r,t){var n=r.humidity/100,e=function(r,t){return.0534*r-.0844*t+5.604}(r.pm_2_5,n);return{type:"Feature",geometry:{type:"Point",coordinates:[r.longitude,r.latitude]},properties:s({},r,{pm_2_5:e})}}))}},v=function(r){return d(r).then(y)},m="date",h=n(8677);function b(r){return function(r){if(Array.isArray(r)){for(var t=0,n=new Array(r.length);t<r.length;t++)n[t]=r[t];return n}}(r)||function(r){if(Symbol.iterator in Object(r)||"[object Arguments]"===Object.prototype.toString.call(r))return Array.from(r)}(r)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var g="pm_2_5",w=["#4d0173","#991113","#ff5600","#ffaa00","#feff00","#6fc400","#3aa702"].reverse(),O=["get",g],A=[0,.25,.5,1,2.5,5,20].map((function(r,t,n){return[r,n[t+1]||1/0]})),S=function(r){var t=r.isMinMaxDynamicRange,n=r.geojson,e=0,o=1/0,a=-1/0,i=!0,u=!1,c=void 0;try{for(var f,l=n.features[Symbol.iterator]();!(i=(f=l.next()).done);i=!0){(e=f.value.properties.pm_2_5)>a&&(a=e),e<o&&(o=e)}}catch(y){u=!0,c=y}finally{try{i||null==l.return||l.return()}finally{if(u)throw c}}var s=w.length,p=t?(a-o)/s:0,d=t?b(new Array(s)).map((function(r,t){var n=o+t*p;return[n,n+p]})):A;return{fieldName:g,colors:w,ranges:d,circleCases:d.map((0,h.q)(O)).flatMap((function(r,t){return[r,w[t]]}))}},j=function(){return{download:e,mapbox:o,stream:u}}},3415:function(r,t,n){n.r(t),n.d(t,{parse:function(){return O}});var e,o,a=n(4235),i=n.n(a);function u(r,t,n,e,o,a,i){try{var u=r[a](i),c=u.value}catch(f){return void n(f)}u.done?t(c):Promise.resolve(c).then(e,o)}function c(r,t,n){return t in r?Object.defineProperty(r,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):r[t]=n,r}function f(r){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},e=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(e=e.concat(Object.getOwnPropertySymbols(n).filter((function(r){return Object.getOwnPropertyDescriptor(n,r).enumerable})))),e.forEach((function(t){c(r,t,n[t])}))}return r}function l(r,t){return function(r){if(Array.isArray(r))return r}(r)||function(r,t){var n=[],e=!0,o=!1,a=void 0;try{for(var i,u=r[Symbol.iterator]();!(e=(i=u.next()).done)&&(n.push(i.value),!t||n.length!==t);e=!0);}catch(c){o=!0,a=c}finally{try{e||null==u.return||u.return()}finally{if(o)throw a}}return n}(r,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function s(r){return function(r){if(Array.isArray(r)){for(var t=0,n=new Array(r.length);t<r.length;t++)n[t]=r[t];return n}}(r)||function(r){if(Symbol.iterator in Object(r)||"[object Arguments]"===Object.prototype.toString.call(r))return Array.from(r)}(r)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function p(r,t){if(null===r||void 0===r)throw Error(t)}var d,y=new Set(s(["Date","Lat","Lng","PM1.0 (\xb5g/m\xb3)","PM2.5 (\xb5g/m\xb3)","t (s)"]).concat(s(["Lat","Lng","t (s)","Relative Humidity (%)"]))),v={Date:"date",Lat:"latitude",Lng:"longitude","t (s)":"counter_t","PM1.0 (\xb5g/m\xb3)":"pm_1_0","PM2.5 (\xb5g/m\xb3)":"pm_2_5","Relative Humidity (%)":"humidity"},m={Date:function(r){return new Date(r)},Lat:parseFloat,Lng:parseFloat,"t (s)":function(r){return parseInt(r)},"PM1.0 (\xb5g/m\xb3)":parseFloat,"PM2.5 (\xb5g/m\xb3)":parseFloat,"Relative Humidity (%)":parseFloat},h=["a","A","z","Z"],b=(e=Math).min.apply(e,s(h.map((function(r){return r.charCodeAt(0)})))),g=(o=Math).max.apply(o,s(h.map((function(r){return r.charCodeAt(0)})))),w=function(r){var t=r.charCodeAt(0);return b<=t&&t<=g},O=(d=i().mark((function r(t,n){var e,o,a,u,s,d;return i().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return e=void 0===n?{headerIndiciesByName:{},partial:"",records:[]}:n,r.next=3,t.read();case 3:return o=r.sent,a=o.done,u=o.value,e.partial+="string"===typeof u?u:u?(new TextDecoder).decode(u):"",s=e.partial.split(/\n/g),d=s.length-1,s.forEach((function(r,t){if(d!==t||a){var n=r.split(",").map((function(r){return r.trim()}));if(w(r[0]||""))e.headerIndiciesByName=n.reduce((function(r,t,n){return y.has(t)?f({},r,c({},t,n)):r}),{});else if(""===n[0]);else{var o=Object.entries(e.headerIndiciesByName).reduce((function(r,t){var e=l(t,2),o=e[0],a=e[1];return f({},r,c({},v[o],m[o](n[a])))}),{});p(!Number.isNaN(o.counter_t),"NaN"),p(Number.isFinite(o.counter_t),"t (s) not ok"),e.records[o.counter_t]=f({},e.records[o.counter_t]||{},o),a&&(e.partial="")}}else e.partial=r})),r.abrupt("return",a?e:O(t,e));case 11:case"end":return r.stop()}}),r)})),function(){var r=this,t=arguments;return new Promise((function(n,e){var o=d.apply(r,t);function a(r){u(o,n,e,a,i,"next",r)}function i(r){u(o,n,e,a,i,"throw",r)}a(void 0)}))})},5624:function(r,t,n){function e(r,t){if(null===r||void 0===r)throw Error(t)}n.d(t,{k:function(){return e}})}}]);