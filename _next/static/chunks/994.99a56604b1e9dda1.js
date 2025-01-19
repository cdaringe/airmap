"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[994],{22483:(e,t,r)=>{r.d(t,{A:()=>n});function n(e,t){if(t.length<e)throw TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}},93504:(e,t,r)=>{r.d(t,{A:()=>n});function n(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}},77031:(e,t,r)=>{r.d(t,{A:()=>o});var n=r(70573),a=r(22483);function o(e){(0,a.A)(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||(void 0===e?"undefined":(0,n._)(e))==="object"&&"[object Date]"===t?new Date(e.getTime()):"number"==typeof e||"[object Number]"===t?new Date(e):(("string"==typeof e||"[object String]"===t)&&"undefined"!=typeof console&&(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn(Error().stack)),new Date(NaN))}},60502:(e,t,r)=>{r.d(t,{zB:()=>i,k8:()=>s,DM:()=>u});var n=r(12551),a=r(61760),o=r(69152);function i(e){try{var t=new URL(e),r=(0,n._)(t.pathname.substr(1).split("/"),3),a=r[0],o=r[1],i=r[2];if("spreadsheets"===a&&"d"===o&&i&&t.host.match("google.com"))return!0}catch(e){}return!1}function u(e){var t=new URL(e);return t.pathname=(0,a._)(t.pathname.substr(1).split("/").splice(0,3)).concat(["export"]).join("/"),String(t)}var s=function(e){var t=new URL(e),r=new URLSearchParams(t.search);return r.has("format")||r.set("format","csv"),t.search=r.toString(),fetch(u(t.toString()),{mode:"cors",redirect:"follow",headers:{accept:"text"}}).then(function(e){return e.body}).then(function(e){var t=null==e?void 0:e.getReader();return(0,o.V)(t,"missing stream body"),t})}},56347:(e,t,r)=>{r.d(t,{t:()=>a});var n=r(12551),a=function(e){return function(t){var r=(0,n._)(t,2);return["all",[">=",e,r[0]],["<",e,r[1]]]}}},26994:(e,t,r)=>{r.r(t),r.d(t,{dateField:()=>E,download:()=>k,downloadGeoJSON:()=>P,getResources:()=>B,toGeoJSON:()=>R});var n,a,o={};r.r(o),r.d(o,{parse:()=>j});var i={};r.r(i),r.d(i,{dateField:()=>E,download:()=>k,downloadGeoJSON:()=>P,toGeoJSON:()=>R});var u={};r.r(u),r.d(u,{getLevels:()=>I});var s=r(34618),c=r(92831),l=r(48967),f=r(65959),d=r(60502),p=r(14952),m=r(12551),h=r(61760),g=r(70573),v=r(93504),_=r(77031),y=r(22483),N=function(e){var t=new Date(e.trim().split(" ").map(function(e,t){if(0===t){var r=(0,m._)(e.split("/"),3),n=r[0],a=r[1],o=r[2],i=function(e){return 1===e.length?"0".concat(e):e};return"".concat(o,"-").concat(i(n),"-").concat(i(a))}return"T".concat(e,"-07:00")}).join(""));if(isNaN(t.getTime()))throw Error("invalid date ".concat(t));return 7==t.getTimezoneOffset()/60?t:function(e,t){if((0,y.A)(2,arguments),!t||(void 0===t?"undefined":(0,g._)(t))!=="object")return new Date(NaN);var r=t.years?(0,v.A)(t.years):0,n=t.months?(0,v.A)(t.months):0,a=t.weeks?(0,v.A)(t.weeks):0,o=t.days?(0,v.A)(t.days):0,i=t.hours?(0,v.A)(t.hours):0,u=t.minutes?(0,v.A)(t.minutes):0,s=t.seconds?(0,v.A)(t.seconds):0,c=(0,_.A)(e),l=n||r?function(e,t){(0,y.A)(2,arguments);var r=(0,_.A)(e),n=(0,v.A)(t);if(isNaN(n))return new Date(NaN);if(!n)return r;var a=r.getDate(),o=new Date(r.getTime());return(o.setMonth(r.getMonth()+n+1,0),a>=o.getDate())?o:(r.setFullYear(o.getFullYear(),o.getMonth(),a),r)}(c,n+12*r):c;return new Date((o||a?function(e,t){(0,y.A)(2,arguments);var r=(0,_.A)(e),n=(0,v.A)(t);return isNaN(n)?new Date(NaN):(n&&r.setDate(r.getDate()+n),r)}(l,o+7*a):l).getTime()+1e3*(s+60*(u+60*i)))}(t,{hours:1})};function w(e,t){if(null==e)throw Error(t)}var b=new Set((0,h._)(["Date","Lat","Lng","PM1.0 (\xb5g/m\xb3)","PM2.5 (\xb5g/m\xb3)","t (s)"]).concat((0,h._)(["Lat","Lng","t (s)","Relative Humidity (%)"]))),A={Date:"date",Lat:"latitude",Lng:"longitude","t (s)":"counter_t","PM1.0 (\xb5g/m\xb3)":"pm_1_0","PM2.5 (\xb5g/m\xb3)":"pm_2_5","Relative Humidity (%)":"humidity"},D={Date:function(e){return N(e)},Lat:parseFloat,Lng:parseFloat,"t (s)":function(e){return parseInt(e)},"PM1.0 (\xb5g/m\xb3)":parseFloat,"PM2.5 (\xb5g/m\xb3)":parseFloat,"Relative Humidity (%)":parseFloat},M=["a","A","z","Z"],S=(n=Math).min.apply(n,(0,h._)(M.map(function(e){return e.charCodeAt(0)}))),L=(a=Math).max.apply(a,(0,h._)(M.map(function(e){return e.charCodeAt(0)}))),F=function(e){var t=e.charCodeAt(0);return S<=t&&t<=L},j=function(){var e=(0,l._)(function(e){var t,r,n,a,o,i,u=arguments;return(0,f.YH)(this,function(l){switch(l.label){case 0:return t=u.length>1&&void 0!==u[1]?u[1]:{headerIndiciesByName:{},partial:"",records:[]},[4,e.read()];case 1:return n=(r=l.sent()).done,a=r.value,t.partial+="string"==typeof a?a:a?new TextDecoder().decode(a):"",i=(o=t.partial.split(/\n/g)).length-1,o.forEach(function(e,r){if(i!==r||n){var a=e.split(",").map(function(e){return e.trim()});if(F(e[0]||""))t.headerIndiciesByName=a.reduce(function(e,t,r){return b.has(t)?(0,c._)((0,s._)({},e),(0,p._)({},t,r)):e},{});else if(""===a[0]);else{var o=Object.entries(t.headerIndiciesByName).reduce(function(e,t){var r=(0,m._)(t,2),n=r[0],o=r[1];return(0,c._)((0,s._)({},e),(0,p._)({},A[n],D[n](a[o])))},{});w(!Number.isNaN(o.counter_t),"NaN"),w(Number.isFinite(o.counter_t),"t (s) not ok"),t.records[o.counter_t]=(0,s._)({},t.records[o.counter_t]||{},o),n&&(t.partial="")}}else t.partial=e}),[2,n?t:j(e,t)]}})});return function(t){return e.apply(this,arguments)}}(),k=function(){var e=(0,l._)(function(e){return(0,f.YH)(this,function(t){switch(t.label){case 0:return[4,(0,d.k8)(e[0]).then(j)];case 1:return[2,t.sent().records]}})});return function(t){return e.apply(this,arguments)}}(),R=function(e){return{type:"FeatureCollection",features:e.map(function(e){var t=e.humidity/100,r=.0534*e.pm_2_5-.0844*t+5.604;return{type:"Feature",geometry:{type:"Point",coordinates:[e.longitude,e.latitude]},properties:(0,c._)((0,s._)({},e),{pm_2_5:r})}})}},P=function(e){return k(e).then(R)},E="date",O=r(56347),T="pm_2_5",x=["#4d0173","#991113","#ff5600","#ffaa00","#feff00","#6fc400","#3aa702"].reverse(),C=["get",T],H=[0,.25,.5,1,2.5,5,20].map(function(e,t,r){return[e,r[t+1]||1/0]}),I=function(e){var t=e.isMinMaxDynamicRange,r=e.geojson,n=0,a=1/0,o=-1/0,i=!0,u=!1,s=void 0;try{for(var c,l=r.features[Symbol.iterator]();!(i=(c=l.next()).done);i=!0)(n=c.value.properties.pm_2_5)>o&&(o=n),n<a&&(a=n)}catch(e){u=!0,s=e}finally{try{i||null==l.return||l.return()}finally{if(u)throw s}}var f=x.length,d=t?(o-a)/f:0,p=t?(0,h._)(Array(f)).map(function(e,t){var r=a+t*d;return[r,r+d]}):H;return{fieldName:T,colors:x,ranges:p,circleCases:p.map((0,O.t)(C)).flatMap(function(e,t){return[e,x[t]]})}},B=function(){return(0,c._)((0,s._)({},{download:i,mapbox:u}),{stream:o})}},69152:(e,t,r)=>{r.d(t,{V:()=>n});function n(e,t){if(null==e)throw Error(t)}}}]);