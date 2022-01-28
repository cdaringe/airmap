(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[538],{4306:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/map",function(){return t(5476)}])},5476:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return L}});var r=t(4637),o=t(9496),i=t(8229),a=t(9227),c=t(6869),s=t(5256);function l(){return(0,r.jsx)("div",{className:"flex flex-column w-full content justify-center",children:(0,r.jsx)(s.Z,{className:"animate-spin w-20"})})}function u(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=[],r=!0,o=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(r=(a=c.next()).done)&&(t.push(a.value),!n||t.length!==n);r=!0);}catch(s){o=!0,i=s}finally{try{r||null==c.return||c.return()}finally{if(o)throw i}}return t}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function d(e){return function(e){if(Array.isArray(e)){for(var n=0,t=new Array(e.length);n<e.length;n++)t[n]=e[n];return t}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var f={visibility:"visible"},p=function(e){var n,t=e.geojson,a=e.onSelectFeature,c=e.circleCases,s=void 0===c?[]:c,l=o.useCallback((function(e){e.preventDefault();var n=u(e.target.queryRenderedFeatures(e.point),1)[0];"Point"===(null===n||void 0===n?void 0:n.geometry.type)?a(n):console.error("no feature found under pointer :thinking:",n)}),[a]),p=o.useCallback((function(e){e.target.getCanvas().style.cursor="pointer"}),[]),v=o.useCallback((function(e){e.target.getCanvas().style.cursor=""}),[]);return(0,r.jsx)(i.Wy,{data:t,circleLayout:f,circlePaint:(n=s,{"circle-color":["case"].concat(d(n),["black"]),"circle-radius":5}),circleOnClick:l,circleOnMouseEnter:p,circleOnMouseLeave:v})},v=t(1825),h=t(6970),y=t(8658),m=t(3793);function x(e){var n=e.error,t=e.datasource;return(0,r.jsxs)("div",{className:"p-2",children:[(0,r.jsx)("h1",{children:"Error"}),(0,r.jsx)("h2",{children:"Failed to load map data."}),(0,r.jsx)("p",{children:"string"===typeof n?n:(0,r.jsx)("pre",{children:JSON.stringify(n,null,2)})}),(0,r.jsxs)("p",{children:["Are you sure your datasource is correct?",(0,r.jsx)("pre",{children:JSON.stringify(t,null,2)})]})]})}function g(){return(0,r.jsx)("p",{className:"p-2",children:"The datafile provided could not be converted into geojson format. Generally, this occurs because the columns in the data sheet do not match the expected field names."})}var j=t(310);function b(){return(0,r.jsx)(j.default,{children:(0,r.jsx)("link",{href:"https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css",rel:"stylesheet"})})}var w=t(7383),k=t.n(w),N=t(5629);function C(e,n,t,r,o,i,a){try{var c=e[i](a),s=c.value}catch(l){return void t(l)}c.done?n(s):Promise.resolve(s).then(r,o)}function S(e){return function(){var n=this,t=arguments;return new Promise((function(r,o){var i=e.apply(n,t);function a(e){C(i,r,o,a,c,"next",e)}function c(e){C(i,r,o,a,c,"throw",e)}a(void 0)}))}}function A(e){return E.apply(this,arguments)}function E(){return(E=S(k().mark((function e(n){return k().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.addControl(new N.Ex,"bottom-right"),n.addControl(new N.Ly,"bottom-right"),n.addControl(new N.jP,"bottom-right");case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function O(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=[],r=!0,o=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(r=(a=c.next()).done)&&(t.push(a.value),!n||t.length!==n);r=!0);}catch(s){o=!0,i=s}finally{try{r||null==c.return||c.return()}finally{if(o)throw i}}return t}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function T(e){return function(e){if(Array.isArray(e)){for(var n=0,t=new Array(e.length);n<e.length;n++)t[n]=e[n];return t}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var _=(0,c.default)((function(){return t.e(957).then(t.bind(t,4954))}),{loadableGenerated:{webpack:function(){return[4954]},modules:["../src/components/pages/map/index.tsx -> ../../MeasurementPopup"]}}),F=function(e,n){return{url:"api.mapbox.com"===e.slice(8,22)||"tiles.mapbox.com"===e.slice(10,26)?e.replace("?","?pluginName=sheetMapper&"):e}};function L(){var e,n=(0,o.useState)(!0),t=n[0],c=n[1];!function(){var e=(0,a.wl)().value.urls,n=(0,h.useRouter)();(0,o.useEffect)((function(){return(!e.length||e.some((function(e){return!e}))?n.push("/"):void 0)&&void 0}),[e,n])}();var s,u=O(o.useState(),2),d=u[0],f=u[1],j=O(o.useState([-122.66155,45.54846]),2),w=j[0],k=j[1],N=(0,a.wl)(),C=N.value,S=C.urls,E=C.sensorType,L=(0,y.rk)(E),P=L.isLoading,M=L.error,R=L.data,I=(void 0===R?{}:R).download,q=(0,m.useQuery)({queryKey:T(S).concat(["undefined"===typeof I?"undefined":(s=I,s&&"undefined"!==typeof Symbol&&s.constructor===Symbol?"symbol":typeof s)]),queryFn:function(){return null===I||void 0===I?void 0:I(S)},cacheTime:1e9}),J=q.isLoading,D=q.error,X=q.data,G=void 0===X?{}:X,W=G.geojson,Y=G.getLevels,Z=(0,o.useMemo)((function(){return Y?Y(t):null}),[Y,t]),B=M||D,Q=P||J;!function(e,n){(0,o.useEffect)((function(){if(e){var t=(0,v.VWR)(e);t[0]<=-1/0||t[0]>=1/0?console.error("infitity detected. bounds skipped"):n(t)}}),[e])}(W,f);var V=o.useRef((0,i.ZP)({accessToken:"pk.eyJ1IjoicGR4Y2xlYW5haXIiLCJhIjoiY2tweDFuZmxpMjFmbzJ3bXVkajd4dDQ4dSJ9.LYiRB4TgOAckcqZGi-cUXg",transformRequest:F})).current,z=O(o.useState(null),2),K=z[0],U=z[1],H=o.useCallback((function(){return K&&U(null)}),[K,U]);return B?(0,r.jsx)(x,{error:B,datasource:N}):Q?(0,r.jsx)(l,{}):(null===(e=null===W||void 0===W?void 0:W.features[0])||void 0===e?void 0:e.properties)?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(b,{}),0===(null===W||void 0===W?void 0:W.features.length)?(0,r.jsxs)("div",{className:"p-4",children:[(0,r.jsx)("h1",{className:"text-xl",children:"Missing data"}),(0,r.jsx)("p",{children:"The data has been downloaded, but is empty :/"})]}):(0,r.jsxs)(V,{onStyleLoad:A,className:"content w-full",fitBounds:d,center:w,style:"mapbox://styles/pdxcleanair/ckpx7yno443sa17p6iy65qn95",containerStyle:{height:"100%",width:"100vw"},onClick:H,children:[W&&(0,r.jsx)(p,{geojson:W,circleCases:null===Z||void 0===Z?void 0:Z.circleCases,onSelectFeature:function(e){d&&f(void 0),w&&k(e.geometry.coordinates),U(e)}}),K?(0,r.jsx)(_,{title:"Measurements",className:"h-96 overflow-auto",feature:K,onClick:function(e){e.preventDefault()}}):void 0,(0,r.jsxs)("div",{className:"map-overlay",children:[(0,r.jsxs)("div",{className:"map-overlay-control map-legend",children:[(0,r.jsx)("div",{style:{fontWeight:"bold"},children:null===Z||void 0===Z?void 0:Z.fieldName}),null===Z||void 0===Z?void 0:Z.pm2Ranges.map((function(e,n){var o=O(e,2),i=o[0],a=o[1];return(0,r.jsxs)("div",{children:[(0,r.jsx)("span",{style:{backgroundColor:Z.colors[n]},className:"map-legend-key"}),(0,r.jsxs)("span",{children:["[",i.toFixed(1),", ",a.toFixed(1),")"]})]},"".concat(t,"-").concat(n))}))]}),(0,r.jsxs)("div",{className:"map-overlay-control map-pollution-range-mode",children:[(0,r.jsx)("input",{type:"checkbox",checked:t,onChange:function(){return c(!t)}})," ","Dynamic Levels"]})]})]})]}):(0,r.jsx)(g,{})}}},function(e){e.O(0,[774,275,259,912,888,179],(function(){return n=4306,e(e.s=n);var n}));var n=e.O();_N_E=n}]);