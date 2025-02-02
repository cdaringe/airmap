"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[12],{53876:(e,r,t)=>{t.d(r,{DM:()=>i,k8:()=>s,zB:()=>u});var n=t(12551),o=t(61760),a=t(944);function u(e){try{var r=new URL(e),t=(0,n._)(r.pathname.substr(1).split("/"),3),o=t[0],a=t[1],u=t[2];if("spreadsheets"===o&&"d"===a&&u&&r.host.match("google.com"))return!0}catch(e){}return!1}function i(e){var r=new URL(e);return r.pathname=(0,o._)(r.pathname.substr(1).split("/").splice(0,3)).concat(["export"]).join("/"),String(r)}var s=function(e){var r=new URL(e),t=new URLSearchParams(r.search);return t.has("format")||t.set("format","csv"),r.search=t.toString(),(0,a.f)(i(r.toString()),{mode:"cors",redirect:"follow",headers:{accept:"text"}})}},59197:(e,r,t)=>{t.r(r),t.d(r,{combine:()=>p,dateField:()=>d,download:()=>l,downloadGeoJSON:()=>f,toGeoJSON:()=>c});var n=t(48967),o=t(34618),a=t(12551),u=t(65959),i=t(53876),s=t(13614),l=function(){var e=(0,n._)(function(e){return(0,u.YH)(this,function(r){switch(r.label){case 0:return[4,Promise.all([(0,i.k8)(e[0]).then(s.parse)])];case 1:return[2,a._.apply(void 0,[r.sent(),1])[0]]}})});return function(r){return e.apply(this,arguments)}}(),c=function(e){return{type:"FeatureCollection",features:e.map(function(e){return{type:"Feature",geometry:{type:"Point",coordinates:[e.longitude,e.latitude]},properties:e}})}},f=function(e){throw Error("!unimplemented")},p=function(e){var r=e.aeroqualS500,t=e.strava,n=[],a=!0,u=!1,i=void 0;try{for(var s,l=r[Symbol.iterator]();!(a=(s=l.next()).done);a=!0){var f=s.value,p=f.date,d=function(e){for(;;){var r=t[0],n=null==r?void 0:r.date;if(!n||!r)return console.warn("no strava data, skipping, dropping src point"),null;if(n<e)t.shift();else if(n.getTime()-e.getTime()<6e4)return t.shift(),r;else return console.warn("src > 1 minute away from strava points, dropping src point"),null}}(p);d&&n.push((0,o._)({latitude:d.lat,longitude:d.lon},d,f))}}catch(e){u=!0,i=e}finally{try{a||null==l.return||l.return()}finally{if(u)throw i}}return c(n)},d="date"},11012:(e,r,t)=>{t.r(r),t.d(r,{combine:()=>u.combine,dateField:()=>u.dateField,download:()=>u.download,downloadGeoJSON:()=>u.downloadGeoJSON,getResources:()=>h,toGeoJSON:()=>u.toGeoJSON});var n={};t.r(n),t.d(n,{getLevels:()=>d});var o=t(34618),a=t(92831),u=t(59197),i=t(61760),s=t(33925),l="tvoc",c=["#4d0173","#991113","#ff5600","#ffaa00","#feff00","#6fc400","#3aa702"].reverse(),f=["get",l],p=[0,1,5,10,15,20,30].map(function(e,r,t){return[e,t[r+1]||1/0]}),d=function(e){var r=e.isMinMaxDynamicRange,t=e.geojson,n=0,o=1/0,a=-1/0,u=!0,d=!1,v=void 0;try{for(var h,y=t.features[Symbol.iterator]();!(u=(h=y.next()).done);u=!0)(n=h.value.properties[l])>a&&(a=n),n<o&&(o=n)}catch(e){d=!0,v=e}finally{try{u||null==y.return||y.return()}finally{if(d)throw v}}var m=c.length,w=r?(a-o)/m:0,b=r?(0,i._)(Array(m)).map(function(e,r){var t=o+r*w;return[t,t+w]}):p;return{fieldName:l,colors:c,ranges:b,circleCases:b.map((0,s.t3)(f)).flatMap(function(e,r){return[e,c[r]]})}},v=t(13614),h=function(){return(0,a._)((0,o._)({},{download:u,mapbox:n,processGeoJSONMemoKey:function(){var e,r;return null!==(r=null===(e=window.__AEROQUAL_S500_SCALAR__)||void 0===e?void 0:e.toString())&&void 0!==r?r:""},processGeoJSON:function(e){var r=window.__AEROQUAL_S500_SCALAR__;return null==r?e:(0,a._)((0,o._)({},e),{features:e.features.map(function(e){return(0,a._)((0,o._)({},e),{properties:(0,a._)((0,o._)({},e.properties),{tvoc:e.properties.tvoc*r})})})})}}),{stream:v})}},13614:(e,r,t)=>{function n(e){function r(e){if(Object(e)!==e)return Promise.reject(TypeError(e+" is not an object."));var r=e.done;return Promise.resolve(e.value).then(function(e){return{value:e,done:r}})}return(n=function(e){this.s=e,this.n=e.next}).prototype={s:null,n:null,next:function(){return r(this.n.apply(this.s,arguments))},return:function(e){var t=this.s.return;return void 0===t?Promise.resolve({value:e,done:!0}):r(t.apply(this.s,arguments))},throw:function(e){var t=this.s.return;return void 0===t?Promise.reject(e):r(t.apply(this.s,arguments))}},new n(e)}t.r(r),t.d(r,{parse:()=>s});var o=t(48967),a=t(12551),u=t(65959),i=t(944),s=function(){var e=(0,o._)(function(e){var r,t,o,s,l,c,f,p,d,v,h,y,m,w;return(0,u.YH)(this,function(u){switch(u.label){case 0:r=[],t=void 0,o=!1,s=!1,u.label=1;case 1:u.trys.push([1,6,7,12]),c=function(e){var r,t,o,a=2;for("undefined"!=typeof Symbol&&(t=Symbol.asyncIterator,o=Symbol.iterator);a--;){if(t&&null!=(r=e[t]))return r.call(e);if(o&&null!=(r=e[o]))return new n(r.call(e));t="@@asyncIterator",o="@@iterator"}throw TypeError("Object is not async iterable")}((0,i.S)(e)),u.label=2;case 2:return[4,c.next()];case 3:if(!(o=!(f=u.sent()).done))return[3,5];if(p=f.value.split(","),!t)return t=p,[3,4];v=(d=(0,a._)(p,2))[0],h=d[1],y=new Date(v),m=Number(h),r.push({date:y,tvoc:m}),u.label=4;case 4:return o=!1,[3,2];case 5:return[3,12];case 6:return w=u.sent(),s=!0,l=w,[3,12];case 7:if(u.trys.push([7,,10,11]),!(o&&null!=c.return))return[3,9];return[4,c.return()];case 8:u.sent(),u.label=9;case 9:return[3,11];case 10:if(s)throw l;return[7];case 11:return[7];case 12:return[2,r]}})});return function(r){return e.apply(this,arguments)}}()},944:(e,r,t)=>{function n(e){this.wrapped=e}function o(e){var r,t;function o(r,t){try{var u=e[r](t),i=u.value,s=i instanceof n;Promise.resolve(s?i.wrapped:i).then(function(e){if(s){o("next",e);return}a(u.done?"return":"normal",e)},function(e){o("throw",e)})}catch(e){a("throw",e)}}function a(e,n){switch(e){case"return":r.resolve({value:n,done:!0});break;case"throw":r.reject(n);break;default:r.resolve({value:n,done:!1})}(r=r.next)?o(r.key,r.arg):t=null}this._invoke=function(e,n){return new Promise(function(a,u){var i={key:e,arg:n,resolve:a,reject:u,next:null};t?t=t.next=i:(r=t=i,o(e,n))})},"function"!=typeof e.return&&(this.return=void 0)}t.d(r,{f:()=>i,S:()=>s}),"function"==typeof Symbol&&Symbol.asyncIterator&&(o.prototype[Symbol.asyncIterator]=function(){return this}),o.prototype.next=function(e){return this._invoke("next",e)},o.prototype.throw=function(e){return this._invoke("throw",e)},o.prototype.return=function(e){return this._invoke("return",e)};var a=t(65959),u=t(69152),i=function(e,r){return fetch(e,r).then(function(e){return e.body}).then(function(e){var r=null==e?void 0:e.getReader();return(0,u.V)(r,"missing stream body"),r})};function s(e){return l.apply(this,arguments)}function l(){var e;return e=function(e){var r,t,o,u,i,s,l,c,f,p,d,v,h;return(0,a.YH)(this,function(a){switch(a.label){case 0:r=new TextDecoder,t="",a.label=1;case 1:return[4,new n(e.read())];case 2:if(u=(o=a.sent()).done,i=o.value,!u)return[3,5];if(!t)return[3,4];return[4,t];case 3:a.sent(),a.label=4;case 4:return[3,14];case 5:t+=r.decode(i,{stream:!0}),t=null!==(l=(s=t.split("\n")).pop())&&void 0!==l?l:"",c=!0,f=!1,p=void 0,a.label=6;case 6:a.trys.push([6,11,12,13]),d=s[Symbol.iterator](),a.label=7;case 7:if(c=(v=d.next()).done)return[3,10];return[4,v.value];case 8:a.sent(),a.label=9;case 9:return c=!0,[3,7];case 10:return[3,13];case 11:return h=a.sent(),f=!0,p=h,[3,13];case 12:try{c||null==d.return||d.return()}finally{if(f)throw p}return[7];case 13:return[3,1];case 14:return[2]}})},(l=function(){return new o(e.apply(this,arguments))}).apply(this,arguments)}},69152:(e,r,t)=>{t.d(r,{V:()=>n});function n(e,r){if(null==e)throw Error(r)}}}]);