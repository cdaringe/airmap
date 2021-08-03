(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[538],{8779:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return q}});var n=r(4637),o=r(1384),c=r(2205),a=r.n(c),i=r(606),s=r(2468),u=r(1691),l=r(9496),p=r(5262),f=r(8626),d=r(419),h=r(9206),b=function(e){return fetch(e,{mode:"cors",redirect:"follow",headers:{accept:"text"}}).then((function(e){return e.text()}))},v=function(e,t){return.0534*e-.0844*t+5.604},m=function(e){return new Promise((function(t,r){return(0,h.csv2geojson)(e,{latfield:"Latitude",lonfield:"Longitude",delimiter:","},(function(e,n){return e?r(e):t(n)}))}))},g=function(){var e=(0,i.Z)(a().mark((function e(t){var r,n,o,c,i;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=new URL(t),(n=new URLSearchParams(r.search)).has("tqx")||n.set("tqx","out:csv"),n.has("sheet")||n.set("sheet","data"),r.search=n.toString(),e.next=7,b(r.toString());case 7:if(!(o=e.sent).startsWith('"VOC')){e.next=15;break}return e.next=11,m(o);case 11:return c=e.sent,e.abrupt("return",c);case 15:return e.next=17,m(o.replace(new RegExp("&#179;","g"),"^3").replace(new RegExp("&#x2082;","g"),"\u2082").replace(new RegExp("&#x2083;","g"),"\u2083").replace(new RegExp("&#x2103;","g"),"\u2103"));case 17:return(i=e.sent).features.forEach((function(e){var t=e.properties;if(!t)throw new Error("missing properties");var r=t["Particulate Matter-PM2.5 (ug/m^3)"],n=t["Particulate Matter-PM1.0 (ug/m^3)"],o=t["Humidity-Humidity (%RH)"],c=parseInt(r),a=parseInt(n),i=parseFloat(o);t["PM2.5"]=c,t.PM1=a,t["PM2.5 Corrected"]=v(c,i),t["PM1 Corrected"]=v(a,i)})),e.abrupt("return",i);case 20:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),y=r(6817),x=r(7254),j=r(3988);function w(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var O=["get","PM2.5 Corrected"],P=["#4d0173","#991113","#ff5600","#ffaa00","#feff00","#6fc400","#3aa702"].reverse(),k=[["<=",O,.25],["all",[">",O,.25],["<=",O,.5]],["all",[">",O,.5],["<=",O,1]],["all",[">",O,1],["<=",O,2.5]],["all",[">",O,2.5],["<=",O,5]],["all",[">",O,5],["<=",O,20]],[">",O,20]],C={visibility:"visible"},E={"circle-color":["case"].concat((0,j.Z)(k.flatMap((function(e,t){return[e,P[t]]}))),["black"]),"circle-radius":5},M={"circle-color":["case"].concat((0,j.Z)(k.flatMap((function(e,t){return[e,P[t]]}))),["black"]),"circle-radius":5},S=function(e){var t=e.geojson,r=e.onSelectFeature,c=e.type,a=l.useCallback((function(e){e.preventDefault();var t=e.target.queryRenderedFeatures(e.point),n=(0,s.Z)(t,1)[0];"Point"===(null===n||void 0===n?void 0:n.geometry.type)?r(n):console.error("no feature found under pointer :thinking:",n)}),[r]),i=l.useCallback((function(e){e.target.getCanvas().style.cursor="pointer"}),[]),u=l.useCallback((function(e){e.target.getCanvas().style.cursor=""}),[]);return(0,n.jsx)(p.Wy,function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?w(Object(r),!0).forEach((function(t){(0,o.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):w(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},{id:"pm2"===c?"pm25Corrected":c,data:t,circleLayout:C,circlePaint:"pm2"===c?E:M,circleOnClick:a,circleOnMouseEnter:i,circleOnMouseLeave:u}))},R=r(2530),Z=r(4942);function N(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function D(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?N(Object(r),!0).forEach((function(t){(0,o.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):N(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var _=(0,y.default)((function(){return r.e(171).then(r.bind(r,1171))}),{loadableGenerated:{webpack:function(){return[1171]},modules:["../src/components/pages/map.tsx -> ../MeasurementPopup"]}}),L=function(e,t){return{url:"api.mapbox.com"===e.slice(8,22)||"tiles.mapbox.com"===e.slice(10,26)?e.replace("?","?pluginName=sheetMapper&"):e}};function q(){var e;!function(){var e=(0,d.wl)().value.url,t=(0,Z.useRouter)();(0,l.useEffect)((function(){return(e?void 0:t.push("/"))&&void 0}),[e,t])}();var t=(0,d.wl)().value.url,o=(0,f.useQuery)({queryKey:["map-csv"],queryFn:function(){return g(t)}}),c=o.isLoading,h=o.error,b=o.data,v=l.useState(),m=(0,s.Z)(v,2),y=m[0],j=m[1],w=l.useState([-122.66155,45.54846]),O=(0,s.Z)(w,2),P=O[0],k=O[1];!function(e,t){(0,l.useEffect)((function(){if(e){var r=(0,R.VWR)(e);r[0]<=-1/0||r[0]>=1/0?console.error("infitity detected. bounds skipped"):t(r)}}),[e])}(b,j);var C=l.useRef((0,p.ZP)({accessToken:"pk.eyJ1IjoicGR4Y2xlYW5haXIiLCJhIjoiY2tweDFuZmxpMjFmbzJ3bXVkajd4dDQ4dSJ9.LYiRB4TgOAckcqZGi-cUXg",transformRequest:L})).current,E=l.useState(null),M=(0,s.Z)(E,2),N=M[0],q=M[1],F=l.useCallback((function(){return N&&q(null)}),[N,q]);return h?(0,n.jsxs)("div",{children:[(0,n.jsx)("h1",{children:"Error"}),(0,n.jsx)("p",{children:"string"===typeof h?h:JSON.stringify(h,null,2)})]}):c?(0,n.jsx)("div",{className:"flex flex-column w-full content justify-center",children:(0,n.jsx)(x.Z,{className:"animate-spin w-20"})}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(u.default,{children:(0,n.jsx)("link",{href:"https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css",rel:"stylesheet"})}),0===(null===b||void 0===b?void 0:b.features.length)?(0,n.jsxs)("div",{className:"p-4",children:[(0,n.jsx)("h1",{className:"text-xl",children:"Missing data"}),(0,n.jsx)("p",{children:"The data has been downloaded, but is empty :/"})]}):(0,n.jsxs)(C,{onStyleLoad:function(){var e=(0,i.Z)(a().mark((function e(t){var n,o,c,i;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.e(905).then(r.bind(r,1905));case 2:n=e.sent,o=n.RulerControl,c=n.ZoomControl,n.InspectControl,i=n.StylesControl,t.addControl(new i,"bottom-right"),t.addControl(new c,"bottom-right"),t.addControl(new o,"bottom-right");case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),className:"content w-full",fitBounds:y,center:P,style:"mapbox://styles/pdxcleanair/ckpx7yno443sa17p6iy65qn95",containerStyle:{height:"100%",width:"100vw"},onClick:F,children:[b&&(0,n.jsx)(S,D({},{geojson:b,type:(null===(e=b.features[0])||void 0===e?void 0:e.properties)["PM2.5 Corrected"]?"pm2":"voc",onSelectFeature:function(e){y&&j(void 0),P&&k(e.geometry.coordinates),q(e)}})),N?(0,n.jsx)(_,{title:"Measurements",className:"h-96 overflow-auto",feature:N,onClick:function(e){e.preventDefault()}}):void 0]})]})}},9590:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/map",function(){return r(8779)}])}},function(e){e.O(0,[275,485,348,888,179],(function(){return t=9590,e(e.s=t);var t}));var t=e.O();_N_E=t}]);