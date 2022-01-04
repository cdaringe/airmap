(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[54],{9173:function(r){function t(r,t){var n=e(r,t);return n.whole+"\xb0 "+(n.minutes?n.minutes+"' ":"")+(n.seconds?n.seconds+'" ':"")+n.dir}function e(r,t){var e=({lat:["N","S"],lon:["E","W"]}[t]||"")[r>=0?0:1],n=Math.abs(r),o=Math.floor(n),u=60*(n-o),i=Math.floor(u);return{whole:o,minutes:i,seconds:Math.floor(60*(u-i)),dir:e}}function n(r,t){if(t||(t="NSEW"),"string"!==typeof r)return null;var e=(r=r.toUpperCase()).match(/^[\s\,]*([NSEW])?\s*([\-|\\u2014|\\u2015]?[0-9.]+)[\xb0\xba\u02da]?\s*(?:([0-9.]+)['\u2019\u2032\u2018]\s*)?(?:([0-9.]+)(?:''|"|\u201d|\u2033)\s*)?([NSEW])?/);if(!e)return null;var n,o=e[0];if(e[1]&&e[5]?(n=e[1],o=o.slice(0,-1)):n=e[1]||e[5],n&&-1===t.indexOf(n))return null;var u=e[2]?parseFloat(e[2]):0,i=e[3]?parseFloat(e[3])/60:0,a=e[4]?parseFloat(e[4])/3600:0,s=u<0?-1:1;return"S"!==n&&"W"!==n||(s*=-1),{val:(Math.abs(u)+i+a)*s,dim:n,matched:o,remain:r.slice(o.length)}}r.exports=function(r,t){var e=n(r,t);return null===e?null:e.val},r.exports.pair=function(r,t){var e=n(r=r.trim(),t);if(!e)return null;var o=n(r=e.remain.trim(),t);if(!o||o.remain)return null;return e.dim?function(r,t,e){if("N"===e||"S"===e)return[r,t];if("W"===e||"E"===e)return[t,r]}(e.val,o.val,e.dim):[e.val,o.val]},r.exports.format=t,r.exports.formatPair=function(r){return t(r.lat,"lat")+" "+t(r.lon,"lon")},r.exports.coordToDMS=e},9206:function(r,t,e){"use strict";var n=e(980),o=e(9173),u=/(Lat)(itude)?/gi,i=/(L)(on|ng)(gitude)?/i;function a(r,t){var e,n,o;for(var u in r)(n=u.match(t))&&(!e||n[0].length/u.length>o)&&(o=n[0].length/u.length,e=u);return e}function s(r){return a(r,u)}function c(r){return a(r,i)}function f(r){return"object"==typeof r?Object.keys(r).length:0}function l(r){var t=[];return[",",";","\t","|"].forEach((function(e){var o=n.dsvFormat(e).parse(r);if(o.length>=1){for(var u=f(o[0]),i=0;i<o.length;i++)if(f(o[i])!==u)return;t.push({delimiter:e,arity:Object.keys(o[0]).length})}})),t.length?t.sort((function(r,t){return t.arity-r.arity}))[0].delimiter:null}r.exports={isLon:function(r){return!!r.match(i)},isLat:function(r){return!!r.match(u)},guessLatHeader:s,guessLonHeader:c,csv:n.csvParse,tsv:n.tsvParse,dsv:n,auto:function(r){var t=l(r);return t?function(r){return delete r.columns,r}(n.dsvFormat(t).parse(r)):null},csv2geojson:function(r,t,e){e||(e=t,t={}),t.delimiter=t.delimiter||",";var u=t.latfield||"",i=t.lonfield||"",a=t.crs||"",f=[],p={type:"FeatureCollection",features:f};if(""!==a&&(p.crs={type:"name",properties:{name:a}}),"auto"!==t.delimiter||"string"!=typeof r||(t.delimiter=l(r),t.delimiter)){var v=t.numericFields?t.numericFields.split(","):null,d="string"==typeof r?n.dsvFormat(t.delimiter).parse(r,(function(r){if(v)for(var t in r)v.includes(t)&&(r[t]=+r[t]);return r})):r;if(d.length){var m,h=[];if(u||(u=s(d[0])),i||(i=c(d[0])),!u||!i){for(m=0;m<d.length;m++)f.push({type:"Feature",properties:d[m],geometry:null});e(h.length?h:null,p)}else{for(m=0;m<d.length;m++)if(void 0!==d[m][i]&&void 0!==d[m][u]){var g,y,w,F=d[m][i],P=d[m][u];(w=o(F,"EW"))&&(F=w),(w=o(P,"NS"))&&(P=w),g=parseFloat(F),y=parseFloat(P),isNaN(g)||isNaN(y)?h.push({message:"A row contained an invalid value for latitude or longitude",row:d[m],index:m}):(t.includeLatLon||(delete d[m][i],delete d[m][u]),f.push({type:"Feature",properties:d[m],geometry:{type:"Point",coordinates:[parseFloat(g),parseFloat(y)]}}))}e(h.length?h:null,p)}}else e(null,p)}else e({type:"Error",message:"Could not autodetect delimiter"})},toLine:function(r){for(var t=r.features,e={type:"Feature",geometry:{type:"LineString",coordinates:[]}},n=0;n<t.length;n++)e.geometry.coordinates.push(t[n].geometry.coordinates);return e.properties=t.reduce((function(r,t){for(var e in t.properties)r[e]||(r[e]=[]),r[e].push(t.properties[e]);return r}),{}),{type:"FeatureCollection",features:[e]}},toPolygon:function(r){for(var t=r.features,e={type:"Feature",geometry:{type:"Polygon",coordinates:[[]]}},n=0;n<t.length;n++)e.geometry.coordinates[0].push(t[n].geometry.coordinates);return e.properties=t.reduce((function(r,t){for(var e in t.properties)r[e]||(r[e]=[]),r[e].push(t.properties[e]);return r}),{}),{type:"FeatureCollection",features:[e]}}}},980:function(r,t,e){"use strict";function n(r){return new Function("d","return {"+r.map((function(r,t){return JSON.stringify(r)+": d["+t+"]"})).join(",")+"}")}function o(r){var t=new RegExp('["'+r+"\n]"),e=r.charCodeAt(0);function o(r,t){var n,o,u={},i={},a=[],s=r.length,c=0,f=0;function l(){if(c>=s)return i;if(o)return o=!1,u;var t,n=c;if(34===r.charCodeAt(n)){for(var a=n;a++<s;)if(34===r.charCodeAt(a)){if(34!==r.charCodeAt(a+1))break;++a}return c=a+2,13===(t=r.charCodeAt(a+1))?(o=!0,10===r.charCodeAt(a+2)&&++c):10===t&&(o=!0),r.slice(n+1,a).replace(/""/g,'"')}for(;c<s;){var f=1;if(10===(t=r.charCodeAt(c++)))o=!0;else if(13===t)o=!0,10===r.charCodeAt(c)&&(++c,++f);else if(t!==e)continue;return r.slice(n,c-f)}return r.slice(n)}for(;(n=l())!==i;){for(var p=[];n!==u&&n!==i;)p.push(n),n=l();t&&null==(p=t(p,f++))||a.push(p)}return a}function u(t){return t.map(i).join(r)}function i(r){return null==r?"":t.test(r+="")?'"'+r.replace(/\"/g,'""')+'"':r}return{parse:function(r,t){var e,u,i=o(r,(function(r,o){if(e)return e(r,o-1);u=r,e=t?function(r,t){var e=n(r);return function(n,o){return t(e(n),o,r)}}(r,t):n(r)}));return i.columns=u,i},parseRows:o,format:function(t,e){return null==e&&(e=function(r){var t=Object.create(null),e=[];return r.forEach((function(r){for(var n in r)n in t||e.push(t[n]=n)})),e}(t)),[e.map(i).join(r)].concat(t.map((function(t){return e.map((function(r){return i(t[r])})).join(r)}))).join("\n")},formatRows:function(r){return r.map(u).join("\n")}}}e.r(t),e.d(t,{csvFormat:function(){return s},csvFormatRows:function(){return c},csvParse:function(){return i},csvParseRows:function(){return a},dsvFormat:function(){return o},tsvFormat:function(){return v},tsvFormatRows:function(){return d},tsvParse:function(){return l},tsvParseRows:function(){return p}});var u=o(","),i=u.parse,a=u.parseRows,s=u.format,c=u.formatRows,f=o("\t"),l=f.parse,p=f.parseRows,v=f.format,d=f.formatRows},2029:function(r,t,e){"use strict";e.d(t,{L7:function(){return c},Sm:function(){return l}});var n=e(7383),o=e.n(n),u=e(9206),i=function(r,t){var e=r.match(/[^\r\n]+/g),n=[t],o=[],u=!0,i=!0,a=!1,s=void 0;try{for(var c,f=function(r,e){var i=e.value,a=i[0];if(!a||","===a)return"continue";if("-"===a||a.match(/\d/)){if(u)return"continue";var s=i.split(",");return n.push(o.map((function(r){return s[r]}))),"continue"}var c=i.split(",");o=t.map((function(r){return c.findIndex((function(t){return t===r}))})).filter((function(r){return r>=0})),u=o.length!==t.length},l=e[Symbol.iterator]();!(i=(c=l.next()).done);i=!0)f(0,c)}catch(p){a=!0,s=p}finally{try{i||null==l.return||l.return()}finally{if(a)throw s}}return n};function a(r,t,e,n,o,u,i){try{var a=r[u](i),s=a.value}catch(c){return void e(c)}a.done?t(s):Promise.resolve(s).then(n,o)}var s,c=function(r){var t=new URL(r),e=new URLSearchParams(t.search);return e.has("format")||e.set("format","csv"),t.search=e.toString(),fetch(t.toString(),{mode:"cors",redirect:"follow",headers:{accept:"text"}}).then((function(r){return r.text()}))},f=function(r){var t,e=function(r){return r.map((function(r){return r.join(",")})).join("\n")}(r);return t=e,new Promise((function(r,e){return(0,u.csv2geojson)(t,{latfield:"Lat",lonfield:"Lng",delimiter:","},(function(t,n){return t?e(t):r(n)}))}))},l=(s=o().mark((function r(t,e){var n,u;return o().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,c(t);case 2:return n=r.sent,r.next=5,f(i(n,e));case 5:return u=r.sent,r.abrupt("return",u);case 7:case"end":return r.stop()}}),r)})),function(){var r=this,t=arguments;return new Promise((function(e,n){var o=s.apply(r,t);function u(r){a(o,e,n,u,i,"next",r)}function i(r){a(o,e,n,u,i,"throw",r)}u(void 0)}))})},6054:function(r,t,e){"use strict";e.r(t),e.d(t,{download:function(){return d}});var n=e(7383),o=e.n(n),u=e(2029);function i(r,t,e,n,o,u,i){try{var a=r[u](i),s=a.value}catch(c){return void e(c)}a.done?t(s):Promise.resolve(s).then(n,o)}var a,s=["Lat","Lng","PM1.0 (\xb5g/m\xb3)","PM2.5 (\xb5g/m\xb3)"],c=["get","PM2.5"],f=["#4d0173","#991113","#ff5600","#ffaa00","#feff00","#6fc400","#3aa702"].reverse(),l=[["<=",c,.25],["all",[">",c,.25],["<=",c,.5]],["all",[">",c,.5],["<=",c,1]],["all",[">",c,1],["<=",c,2.5]],["all",[">",c,2.5],["<=",c,5]],["all",[">",c,5],["<=",c,20]],[">",c,20]],p=function(r){return{pm2Str:r["PM2.5 (\xb5g/m\xb3)"],pm1Str:r["PM1.0 (\xb5g/m\xb3)"],humidityStr:null}},v=function(r,t){return.0534*r-.0844*t+5.604},d=(a=o().mark((function r(t){var e;return o().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,(0,u.Sm)(t[0],s);case 2:return(e=r.sent).features.forEach((function(r){var t=r.properties||{},e=p(t),n=e.pm2Str,o=e.pm1Str,u=e.humidityStr,i=parseInt(n),a=parseInt(o),s=u?parseFloat(u):0;t["PM2.5"]=i,t.PM1=a,s&&(t["PM2.5 Corrected"]=v(i,s)),s&&(t["PM1 Corrected"]=v(a,s))})),r.abrupt("return",{circleCases:l.flatMap((function(r,t){return[r,f[t]]})),geojson:e});case 5:case"end":return r.stop()}}),r)})),function(){var r=this,t=arguments;return new Promise((function(e,n){var o=a.apply(r,t);function u(r){i(o,e,n,u,s,"next",r)}function s(r){i(o,e,n,u,s,"throw",r)}u(void 0)}))})}}]);