(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[538],{8779:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return L}});var n=r(4637),o=r(1384),c=r(2205),a=r.n(c),i=r(606),s=r(2468),u=r(1691),l=r(9496),f=r(5262),p=r(8626),d=r(419),h=r(9206),b=function(e){return fetch(e,{mode:"cors",redirect:"follow",headers:{accept:"text"}}).then((function(e){return e.text()}))},g=function(e,t){return.0534*e-.0844*t+5.604},m=function(e){return new Promise((function(t,r){return(0,h.csv2geojson)(e,{latfield:"Latitude",lonfield:"Longitude",delimiter:","},(function(e,n){return e?r(e):t(n)}))}))},v=function(){var e=(0,i.Z)(a().mark((function e(t){var r,n,o,c;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=new URL(t),(n=new URLSearchParams(r.search)).has("tqx")||n.set("tqx","out:csv"),n.has("sheet")||n.set("sheet","data"),r.search=n.toString(),e.next=7,b(r.toString());case 7:return o=e.sent,e.next=10,m(o.replace(new RegExp("&#179;","g"),"^3").replace(new RegExp("&#x2082;","g"),"\u2082").replace(new RegExp("&#x2083;","g"),"\u2083").replace(new RegExp("&#x2103;","g"),"\u2103"));case 10:return(c=e.sent).features.forEach((function(e){var t=e.properties;if(!t)throw new Error("missing properties");var r=t["Particulate Matter-PM2.5 (ug/m^3)"],n=t["Particulate Matter-PM1.0 (ug/m^3)"],o=t["Humidity-Humidity (%RH)"],c=parseInt(r),a=parseInt(n),i=parseFloat(o);t["PM2.5"]=c,t.PM1=a,t["PM2.5 Corrected"]=g(c,i),t["PM1 Corrected"]=g(a,i)})),e.abrupt("return",c);case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),y=r(6817),j=r(7254),w=r(3988);function x(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var O=["get","PM2.5 Corrected"],P=["#4d0173","#991113","#ff5600","#ffaa00","#feff00","#6fc400","#3aa702"].reverse(),k=[["<=",O,.25],["all",[">",O,.25],["<=",O,.5]],["all",[">",O,.5],["<=",O,1]],["all",[">",O,1],["<=",O,2.5]],["all",[">",O,2.5],["<=",O,5]],["all",[">",O,5],["<=",O,20]],[">",O,20]],C={visibility:"visible"},E={"circle-color":["case"].concat((0,w.Z)(k.flatMap((function(e,t){return[e,P[t]]}))),["black"]),"circle-radius":5},M=function(e){var t=e.geojson,r=e.onSelectFeature,c=l.useCallback((function(e){e.preventDefault();var t=e.target.queryRenderedFeatures(e.point),n=(0,s.Z)(t,1)[0];"Point"===(null===n||void 0===n?void 0:n.geometry.type)?r(n):console.error("no feature found under pointer :thinking:",n)}),[r]),a=l.useCallback((function(e){e.target.getCanvas().style.cursor="pointer"}),[]),i=l.useCallback((function(e){e.target.getCanvas().style.cursor=""}),[]);return(0,n.jsx)(f.Wy,function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?x(Object(r),!0).forEach((function(t){(0,o.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):x(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},{id:"pm25Corrected",data:t,circleLayout:C,circlePaint:E,circleOnClick:c,circleOnMouseEnter:a,circleOnMouseLeave:i}))},S=r(2530),R=r(4942);function Z(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function N(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Z(Object(r),!0).forEach((function(t){(0,o.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Z(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var D=(0,y.default)((function(){return r.e(171).then(r.bind(r,1171))}),{loadableGenerated:{webpack:function(){return[1171]},modules:["../src/components/pages/map.tsx -> ../MeasurementPopup"]}}),_=function(e,t){return{url:"api.mapbox.com"===e.slice(8,22)||"tiles.mapbox.com"===e.slice(10,26)?e.replace("?","?pluginName=sheetMapper&"):e}};function L(){!function(){var e=(0,d.wl)().value.url,t=(0,R.useRouter)();(0,l.useEffect)((function(){return(e?void 0:t.push("/"))&&void 0}),[e,t])}();var e=(0,d.wl)().value.url,t=(0,p.useQuery)({queryKey:["map-csv"],queryFn:function(){return v(e)}}),o=t.isLoading,c=t.error,h=t.data,b=l.useState(),g=(0,s.Z)(b,2),m=g[0],y=g[1],w=l.useState([-122.66155,45.54846]),x=(0,s.Z)(w,2),O=x[0],P=x[1];!function(e,t){(0,l.useEffect)((function(){if(e){var r=(0,S.VWR)(e);r[0]<=-1/0||r[0]>=1/0?console.error("infitity detected. bounds skipped"):t(r)}}),[e])}(h,y);var k=l.useRef((0,f.ZP)({accessToken:"pk.eyJ1IjoicGR4Y2xlYW5haXIiLCJhIjoiY2tweDFuZmxpMjFmbzJ3bXVkajd4dDQ4dSJ9.LYiRB4TgOAckcqZGi-cUXg",transformRequest:_})).current,C=l.useState(null),E=(0,s.Z)(C,2),Z=E[0],L=E[1],q=l.useCallback((function(){Z&&L(null)}),[Z,L]);return c?(0,n.jsxs)("div",{children:[(0,n.jsx)("h1",{children:"Error"}),(0,n.jsx)("p",{children:"string"===typeof c?c:JSON.stringify(c,null,2)})]}):o?(0,n.jsx)("div",{className:"flex flex-column w-full content justify-center",children:(0,n.jsx)(j.Z,{className:"animate-spin w-20"})}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(u.default,{children:(0,n.jsx)("link",{href:"https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css",rel:"stylesheet"})}),0===(null===h||void 0===h?void 0:h.features.length)?(0,n.jsxs)("div",{className:"p-4",children:[(0,n.jsx)("h1",{className:"text-xl",children:"Missing data"}),(0,n.jsx)("p",{children:"The data has been downloaded, but is empty :/"})]}):(0,n.jsxs)(k,{onStyleLoad:function(){var e=(0,i.Z)(a().mark((function e(t){var n,o,c,i;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.e(905).then(r.bind(r,1905));case 2:n=e.sent,o=n.RulerControl,c=n.ZoomControl,n.InspectControl,i=n.StylesControl,t.addControl(new i,"bottom-right"),t.addControl(new c,"bottom-right"),t.addControl(new o,"bottom-right");case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),className:"content w-full",fitBounds:m,center:O,style:"mapbox://styles/pdxcleanair/ckpx7yno443sa17p6iy65qn95",containerStyle:{height:"100%",width:"100vw"},onClick:q,children:[h&&(0,n.jsx)(M,N({},{geojson:h,onSelectFeature:function(e){m&&y(void 0),O&&P(e.geometry.coordinates),L(e)}})),Z?(0,n.jsx)(D,{title:"Measurements",className:"h-96 overflow-auto",feature:Z,onClick:function(e){e.preventDefault()}}):void 0]})]})}},9590:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/map",function(){return r(8779)}])}},function(e){e.O(0,[275,485,348,888,179],(function(){return t=9590,e(e.s=t);var t}));var t=e.O();_N_E=t}]);