(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[421],{61153:(t,n,e)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/convert",function(){return e(61410)}])},61410:(t,n,e)=>{"use strict";e.r(n),e.d(n,{default:()=>a});var r=e(48967),c=e(65959),u=e(65723),o=e(57277),i=e(22774);let a=function(){function t(){return(t=(0,r._)(function(t){return(0,c.YH)(this,function(n){switch(n.label){case 0:return[4,(0,i.getPocket)()];case 1:return[4,n.sent().stream.parse(t.stream().getReader())];case 2:var e,r,c,u,o,a,s;return e=n.sent().records.map(function(t){return{lat:t.latitude,lon:t.longitude,date:t.date}}),r='<?xml version="1.0" encoding="UTF-8"?>\n<gpx creator="StravaGPX iPhone" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd" version="1.1" xmlns="http://www.topografix.com/GPX/1/1">\n  <metadata>\n    <time>'.concat(e[0].date.toISOString(),"</time>\n  </metadata>\n  <trk>\n    <name>Walk</name>\n    <type>10</type>\n    <trkseg>\n").concat(e.map(function(t){return'\n<trkpt lat="'.concat(t.lat,'" lon="').concat(t.lon,'">\n  <ele>0</ele>\n  <time>').concat(t.date.toISOString(),"</time>\n</trkpt>\n").trim()}).join("\n"),"\n    </trkseg>\n  </trk>\n</gpx>\n"),c="text",u="converted.gpx",o=document.createElement("a"),a=new Blob([r],{type:c}),s=URL.createObjectURL(a),o.setAttribute("href",s),o.setAttribute("download",u),o.click(),[2]}})})).apply(this,arguments)}return(0,u.jsxs)("div",{children:[(0,u.jsx)("h2",{children:"PocketLabs to GPX"}),(0,u.jsx)(o.l,{handleChange:function(n){return t.apply(this,arguments)}})]})}},22774:(t,n,e)=>{"use strict";e.r(n),e.d(n,{getAeroqualS5000:()=>h,getAirmapGps:()=>p,getFlow:()=>a,getMiniWras:()=>s,getPocket:()=>i,useSensorMappingResources:()=>f});var r=e(48967),c=e(65959),u=e(29928),o=e(33925),i=function(){return e.e(994).then(e.bind(e,26994)).then(function(t){return t.getResources()})},a=function(){var t;return e.e(881).then(e.bind(e,66881)).then((t=(0,r._)(function(t){return(0,c.YH)(this,function(n){return[2,t.getResources()]})}),function(n){return t.apply(this,arguments)}))},s=function(){var t;return e.e(867).then(e.bind(e,67867)).then((t=(0,r._)(function(t){return(0,c.YH)(this,function(n){return[2,t.getResources()]})}),function(n){return t.apply(this,arguments)}))},p=function(){var t;return e.e(109).then(e.bind(e,38109)).then((t=(0,r._)(function(t){return(0,c.YH)(this,function(n){return[2,t.getResources()]})}),function(n){return t.apply(this,arguments)}))},h=function(){var t;return e.e(12).then(e.bind(e,11012)).then((t=(0,r._)(function(t){return(0,c.YH)(this,function(n){return[2,t.getResources()]})}),function(n){return t.apply(this,arguments)}))},f=function(t){return(0,u.useQuery)({queryKey:"get-mapping-".concat(t),queryFn:(0,r._)(function(){return(0,c.YH)(this,function(n){switch(n.label){case 0:return[4,t===o.Ke?i():t===o.tH?a():t===o.Dr?s():t===o.cZ?p():t===o.cf?h():function(){throw Error("unsupported sensor type ".concat(t))}()];case 1:return[2,n.sent()]}})}),cacheTime:1e9})}}},t=>{var n=n=>t(t.s=n);t.O(0,[277,636,593,792],()=>n(61153)),_N_E=t.O()}]);