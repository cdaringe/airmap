(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[196],{9173:function(t){function e(t,e){var n=r(t,e);return n.whole+"\xb0 "+(n.minutes?n.minutes+"' ":"")+(n.seconds?n.seconds+'" ':"")+n.dir}function r(t,e){var r=({lat:["N","S"],lon:["E","W"]}[e]||"")[t>=0?0:1],n=Math.abs(t),o=Math.floor(n),i=60*(n-o),a=Math.floor(i);return{whole:o,minutes:a,seconds:Math.floor(60*(i-a)),dir:r}}function n(t,e){if(e||(e="NSEW"),"string"!==typeof t)return null;var r=(t=t.toUpperCase()).match(/^[\s\,]*([NSEW])?\s*([\-|\\u2014|\\u2015]?[0-9.]+)[\xb0\xba\u02da]?\s*(?:([0-9.]+)['\u2019\u2032\u2018]\s*)?(?:([0-9.]+)(?:''|"|\u201d|\u2033)\s*)?([NSEW])?/);if(!r)return null;var n,o=r[0];if(r[1]&&r[5]?(n=r[1],o=o.slice(0,-1)):n=r[1]||r[5],n&&-1===e.indexOf(n))return null;var i=r[2]?parseFloat(r[2]):0,a=r[3]?parseFloat(r[3])/60:0,u=r[4]?parseFloat(r[4])/3600:0,c=i<0?-1:1;return"S"!==n&&"W"!==n||(c*=-1),{val:(Math.abs(i)+a+u)*c,dim:n,matched:o,remain:t.slice(o.length)}}t.exports=function(t,e){var r=n(t,e);return null===r?null:r.val},t.exports.pair=function(t,e){var r=n(t=t.trim(),e);if(!r)return null;var o=n(t=r.remain.trim(),e);if(!o||o.remain)return null;return r.dim?function(t,e,r){if("N"===r||"S"===r)return[t,e];if("W"===r||"E"===r)return[e,t]}(r.val,o.val,r.dim):[r.val,o.val]},t.exports.format=e,t.exports.formatPair=function(t){return e(t.lat,"lat")+" "+e(t.lon,"lon")},t.exports.coordToDMS=r},9206:function(t,e,r){"use strict";var n=r(980),o=r(9173),i=/(Lat)(itude)?/gi,a=/(L)(on|ng)(gitude)?/i;function u(t,e){var r,n,o;for(var i in t)(n=i.match(e))&&(!r||n[0].length/i.length>o)&&(o=n[0].length/i.length,r=i);return r}function c(t){return u(t,i)}function s(t){return u(t,a)}function f(t){return"object"==typeof t?Object.keys(t).length:0}function l(t){var e=[];return[",",";","\t","|"].forEach((function(r){var o=n.dsvFormat(r).parse(t);if(o.length>=1){for(var i=f(o[0]),a=0;a<o.length;a++)if(f(o[a])!==i)return;e.push({delimiter:r,arity:Object.keys(o[0]).length})}})),e.length?e.sort((function(t,e){return e.arity-t.arity}))[0].delimiter:null}t.exports={isLon:function(t){return!!t.match(a)},isLat:function(t){return!!t.match(i)},guessLatHeader:c,guessLonHeader:s,csv:n.csvParse,tsv:n.tsvParse,dsv:n,auto:function(t){var e=l(t);return e?function(t){return delete t.columns,t}(n.dsvFormat(e).parse(t)):null},csv2geojson:function(t,e,r){r||(r=e,e={}),e.delimiter=e.delimiter||",";var i=e.latfield||"",a=e.lonfield||"",u=e.crs||"",f=[],p={type:"FeatureCollection",features:f};if(""!==u&&(p.crs={type:"name",properties:{name:u}}),"auto"!==e.delimiter||"string"!=typeof t||(e.delimiter=l(t),e.delimiter)){var m=e.numericFields?e.numericFields.split(","):null,d="string"==typeof t?n.dsvFormat(e.delimiter).parse(t,(function(t){if(m)for(var e in t)m.includes(e)&&(t[e]=+t[e]);return t})):t;if(d.length){var v,h=[];if(i||(i=c(d[0])),a||(a=s(d[0])),!i||!a){for(v=0;v<d.length;v++)f.push({type:"Feature",properties:d[v],geometry:null});r(h.length?h:null,p)}else{for(v=0;v<d.length;v++)if(void 0!==d[v][a]&&void 0!==d[v][i]){var g,y,w,b=d[v][a],F=d[v][i];(w=o(b,"EW"))&&(b=w),(w=o(F,"NS"))&&(F=w),g=parseFloat(b),y=parseFloat(F),isNaN(g)||isNaN(y)?h.push({message:"A row contained an invalid value for latitude or longitude",row:d[v],index:v}):(e.includeLatLon||(delete d[v][a],delete d[v][i]),f.push({type:"Feature",properties:d[v],geometry:{type:"Point",coordinates:[parseFloat(g),parseFloat(y)]}}))}r(h.length?h:null,p)}}else r(null,p)}else r({type:"Error",message:"Could not autodetect delimiter"})},toLine:function(t){for(var e=t.features,r={type:"Feature",geometry:{type:"LineString",coordinates:[]}},n=0;n<e.length;n++)r.geometry.coordinates.push(e[n].geometry.coordinates);return r.properties=e.reduce((function(t,e){for(var r in e.properties)t[r]||(t[r]=[]),t[r].push(e.properties[r]);return t}),{}),{type:"FeatureCollection",features:[r]}},toPolygon:function(t){for(var e=t.features,r={type:"Feature",geometry:{type:"Polygon",coordinates:[[]]}},n=0;n<e.length;n++)r.geometry.coordinates[0].push(e[n].geometry.coordinates);return r.properties=e.reduce((function(t,e){for(var r in e.properties)t[r]||(t[r]=[]),t[r].push(e.properties[r]);return t}),{}),{type:"FeatureCollection",features:[r]}}}},980:function(t,e,r){"use strict";function n(t){return new Function("d","return {"+t.map((function(t,e){return JSON.stringify(t)+": d["+e+"]"})).join(",")+"}")}function o(t){var e=new RegExp('["'+t+"\n]"),r=t.charCodeAt(0);function o(t,e){var n,o,i={},a={},u=[],c=t.length,s=0,f=0;function l(){if(s>=c)return a;if(o)return o=!1,i;var e,n=s;if(34===t.charCodeAt(n)){for(var u=n;u++<c;)if(34===t.charCodeAt(u)){if(34!==t.charCodeAt(u+1))break;++u}return s=u+2,13===(e=t.charCodeAt(u+1))?(o=!0,10===t.charCodeAt(u+2)&&++s):10===e&&(o=!0),t.slice(n+1,u).replace(/""/g,'"')}for(;s<c;){var f=1;if(10===(e=t.charCodeAt(s++)))o=!0;else if(13===e)o=!0,10===t.charCodeAt(s)&&(++s,++f);else if(e!==r)continue;return t.slice(n,s-f)}return t.slice(n)}for(;(n=l())!==a;){for(var p=[];n!==i&&n!==a;)p.push(n),n=l();e&&null==(p=e(p,f++))||u.push(p)}return u}function i(e){return e.map(a).join(t)}function a(t){return null==t?"":e.test(t+="")?'"'+t.replace(/\"/g,'""')+'"':t}return{parse:function(t,e){var r,i,a=o(t,(function(t,o){if(r)return r(t,o-1);i=t,r=e?function(t,e){var r=n(t);return function(n,o){return e(r(n),o,t)}}(t,e):n(t)}));return a.columns=i,a},parseRows:o,format:function(e,r){return null==r&&(r=function(t){var e=Object.create(null),r=[];return t.forEach((function(t){for(var n in t)n in e||r.push(e[n]=n)})),r}(e)),[r.map(a).join(t)].concat(e.map((function(e){return r.map((function(t){return a(e[t])})).join(t)}))).join("\n")},formatRows:function(t){return t.map(i).join("\n")}}}r.r(e),r.d(e,{csvFormat:function(){return c},csvFormatRows:function(){return s},csvParse:function(){return a},csvParseRows:function(){return u},dsvFormat:function(){return o},tsvFormat:function(){return m},tsvFormatRows:function(){return d},tsvParse:function(){return l},tsvParseRows:function(){return p}});var i=o(","),a=i.parse,u=i.parseRows,c=i.format,s=i.formatRows,f=o("\t"),l=f.parse,p=f.parseRows,m=f.format,d=f.formatRows},8645:function(t,e,r){"use strict";r.d(e,{L7:function(){return s},DF:function(){return f}});var n=r(7383),o=r.n(n),i=r(9206),a=r(8424);function u(t,e,r,n,o,i,a){try{var u=t[i](a),c=u.value}catch(s){return void r(s)}u.done?e(c):Promise.resolve(c).then(n,o)}var c,s=function(t){var e=new URL(t),r=new URLSearchParams(e.search);return r.has("format")||r.set("format","csv"),e.search=r.toString(),fetch(e.toString(),{mode:"cors",redirect:"follow",headers:{accept:"text"}}).then((function(t){return t.text()}))},f=function(t){var e,r=(0,a.B)(t);return e=r,new Promise((function(t,r){return(0,i.csv2geojson)(e,{latfield:"Lat",lonfield:"Lng",delimiter:","},(function(e,n){return e?r(e):t(n)}))}))};c=o().mark((function t(e,r){var n,i;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s(e);case 2:return n=t.sent,t.next=5,f((0,a.U)(n,r));case 5:return i=t.sent,t.abrupt("return",i);case 7:case"end":return t.stop()}}),t)}))},8424:function(t,e,r){"use strict";r.d(e,{U:function(){return n},B:function(){return o}});var n=function(t,e){var r=t.match(/[^\r\n]+/g),n=[e],o=[],i=!0,a=!0,u=!1,c=void 0;try{for(var s,f=function(t,r){var a=r.value,u=a[0];if(!u||","===u)return"continue";if("-"===u||u.match(/\d/)){if(i)return"continue";var c=a.split(",");return n.push(o.map((function(t){return c[t]}))),"continue"}var s=a.split(",");o=e.map((function(t){return s.findIndex((function(e){return e===t}))})).filter((function(t){return t>=0})),i=o.length!==e.length},l=r[Symbol.iterator]();!(a=(s=l.next()).done);a=!0)f(0,s)}catch(p){u=!0,c=p}finally{try{a||null==l.return||l.return()}finally{if(u)throw c}}return n},o=function(t){return t.map((function(t){return t.join(",")})).join("\n")}},5196:function(t,e,r){"use strict";r.r(e),r.d(e,{download:function(){return S}});var n=r(7383),o=r.n(n),i=r(8645);function a(t,e){if(e.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+e.length+" present")}function u(t){a(1,arguments);var e=Object.prototype.toString.call(t);return t instanceof Date||"object"===typeof t&&"[object Date]"===e?new Date(t.getTime()):"number"===typeof t||"[object Number]"===e?new Date(t):("string"!==typeof t&&"[object String]"!==e||"undefined"===typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function c(t,e){a(2,arguments);var r=u(t);if(isNaN(Number(r)))return new Date(NaN);var n,o,i=r.getTime();return(null==e?[]:"function"===typeof e.forEach?e:Array.prototype.slice.call(e)).forEach((function(t){var e=u(t);if(isNaN(Number(e)))return n=new Date(NaN),void(o=NaN);var r=Math.abs(i-e.getTime());(null==n||r<Number(o))&&(n=e,o=r)})),n}var s=r(8658);function f(t){if(Array.isArray(t))return t}function l(t,e,r,n,o,i,a){try{var u=t[i](a),c=u.value}catch(s){return void r(s)}u.done?e(c):Promise.resolve(c).then(n,o)}function p(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function m(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function d(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function v(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable})))),n.forEach((function(e){p(t,e,r[e])}))}return t}function h(t,e){return f(t)||function(t,e){var r=[],n=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(n=(a=u.next()).done)&&(r.push(a.value),!e||r.length!==e);n=!0);}catch(c){o=!0,i=c}finally{try{n||null==u.return||u.return()}finally{if(o)throw i}}return r}(t,e)||d()}function g(t){return function(t){if(Array.isArray(t)){for(var e=0,r=new Array(t.length);e<t.length;e++)r[e]=t[e];return r}}(t)||m(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var y,w=["#6fc400","#feff00","#ffaa00","#ff5600","#991113","#4d0173"],b="VOC (ppb)",F=[[0,2e3],[2e3,4e3],[4e3,6e3],[6e3,8e3],[8e3,1e4],[12e3,1e9]],j=["get",b],N=function(t,e){var r,n=f(r=t)||m(r)||d(),o=n[0],i=n.slice(1),a=Object.entries(e).map((function(t){var e=h(t,2),r=e[0],n=e[1],i=o.findIndex((function(t){return t===r}));if(i<0)throw new Error("header ".concat(r," not found"));return[r,i,n]}));return i.map((function(t){return a.reduce((function(e,r){var n=h(r,3),o=n[0],i=n[1],a=n[2];return e[o]=a(t[i]),e}),{})}))},S=(y=o().mark((function t(e){var r,n,a,u,f,l,p,m,d,y,S,x,P;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=function(t){return g(t.match(/[^\r\n]+/g)).map((function(t){return t.split(",")}))},t.t0=h,t.next=4,Promise.all([(0,i.L7)(e[0]).then(r),(0,i.L7)(e[1]).then(r)]);case 4:if(t.t1=t.sent,n=(0,t.t0)(t.t1,2),a=n[0],u=n[1],l=N(a,{timestamp:f=function(t){return 1e3*parseInt(t)},"VOC (ppb)":parseInt}),p=N(u,{timestamp:f,latitude:parseFloat,longitude:parseFloat}),u.length&&a.length){t.next=13;break}throw new Error("missing data");case 13:return m=p.map((function(t){return t.timestamp})),d=l.map((function(t){var e=c(t.timestamp,m),r=p.find((function(t){return t.timestamp===e.getTime()}));return v({},t,{date:new Date(r.timestamp).toUTCString(),latitude:r.latitude,longitude:r.longitude,skip:Math.abs(r.timestamp-t.timestamp)>6e4})})).filter((function(t){return delete t.skip,delete t.timestamp,!t.skip})),(y=l.length-d.length)>0&&console.warn("lossy data: ".concat((y/l.length).toFixed(1))),S=1/0,x=-1/0,P={type:"FeatureCollection",features:d.map((function(t){var e={type:"Feature",geometry:{type:"Point",coordinates:[t.longitude,t.latitude]},properties:t};delete t.longitude,delete t.latitude;var r=t["VOC (ppb)"];return r>x&&(x=r),r<S&&(S=r),e}))},t.abrupt("return",{geojson:P,getLevels:function(t){var e=w.length,r=t?(x-S)/e:0,n=t?g(new Array(e)).map((function(t,e){var n=S+e*r;return[n,n+r]})):F;return{fieldName:b,colors:w,pm2Ranges:n,circleCases:n.map((0,s.q7)(j)).flatMap((function(t,e){return[t,w[e]]}))}}});case 21:case"end":return t.stop()}}),t)})),function(){var t=this,e=arguments;return new Promise((function(r,n){var o=y.apply(t,e);function i(t){l(o,r,n,i,a,"next",t)}function a(t){l(o,r,n,i,a,"throw",t)}i(void 0)}))})}}]);