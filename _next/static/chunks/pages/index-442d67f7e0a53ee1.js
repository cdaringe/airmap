(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[332],{99693:(e,r,t)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(33856)}])},33856:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>C});var n=t(14952),a=t(34618),s=t(92831),i=t(65723),u=t(29766),o=t(22155),c=t(60502),l=t(52062),d=t(48747),p=t(83043),h=t(58139);let f=function(e){var r=e.className,t=(0,h._)(e,["className"]);return(0,i.jsx)("select",(0,a._)({className:"block text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ".concat(r||"")},t))};var m=function(e){return(0,i.jsxs)(f,(0,s._)((0,a._)({},e),{children:[(0,i.jsx)("option",{value:"googlesheetsurl",children:"Google Sheets URL"}),(0,i.jsx)("option",{disabled:!0,value:"googledrive",children:"Google Drive"}),(0,i.jsx)("option",{disabled:!0,value:"csvurl",children:"CSV URL"})]}))},g=t(48967),v=t(12551),x=t(61760),b=t(65959),y=t(57277),w=t(32793),_=t(22774),j=new Set(["dat","csv","gpx"]),N=function(e){var r=e.onInputRead,n=(0,u.useRouter)(),a=(0,v._)(o.useState(!1),2),s=a[0],c=a[1],l=(0,v._)(o.useState(""),2),p=l[0],h=l[1],f=(0,v._)(o.useState(!1),2),m=f[0],N=f[1],S=(0,v._)(o.useState(void 0),2),R=S[0],M=S[1],T=(0,v._)(o.useState(void 0),2),C=T[0],k=T[1],D=(0,v._)(o.useState(void 0),2),P=D[0],E=D[1];o.useEffect(function(){!p&&C&&P&&c(!0)},[p,R,C,P,r]);var H=o.useCallback(function(e){var r,n;r=(0,g._)(function(){return(0,b.YH)(this,function(r){switch(r.label){case 0:var n;return N(!0),[4,Promise.all(Array.from(e).map((n=(0,g._)(function(e){var r,n,a,s;return(0,b.YH)(this,function(i){switch(i.label){case 0:if(n=null===(r=e.name.match(/\.(.*)$/))||void 0===r?void 0:r[1],!j.has(n))throw Error("invalid filename. must end with ".concat((0,x._)(j).join(", ")));switch(n){case"csv":return[3,1];case"dat":return[3,4];case"gpx":return[3,7]}return[3,10];case 1:return[4,(0,_.Hf)()];case 2:case 5:return[4,i.sent().stream.parse(e.stream().getReader())];case 3:return M(i.sent().records),[3,11];case 4:return[4,(0,_.jr)()];case 6:return k(i.sent().records),[3,11];case 7:return[4,t.e(472).then(t.bind(t,11472))];case 8:return a=i.sent(),[4,e.text()];case 9:return s=i.sent(),E(a.ofGpxString(s)),[3,11];case 10:throw Error("unhandled case: ".concat(n));case 11:return[2]}})}),function(e){return n.apply(this,arguments)}))).finally(function(){N(!1)})];case 1:return r.sent(),[2]}})}),n=function(e){return h(String(e))},Promise.resolve(r()).catch(n)},[]);return(0,i.jsxs)(i.Fragment,{children:[p?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("h3",{children:"Error"}),(0,i.jsx)("p",{children:p}),(0,i.jsx)(d.A,{onClick:function(){return h("")},children:"Try again?"})]}):(0,i.jsxs)(i.Fragment,{children:[m?(0,i.jsx)("p",{children:"Loading..."}):null,(0,i.jsx)(y.l,{disabled:m,multiple:!0,handleChange:H,name:"file",types:(0,x._)(j)}),R?(0,i.jsx)("p",{className:"text-green-800",children:"✅ PocketLabs"}):(0,i.jsx)("p",{className:"text-red-800",children:"Missing pocketlab file"}),C?(0,i.jsx)("p",{className:"text-green-800",children:"✅ MiniWras"}):(0,i.jsx)("p",{className:"text-red-800",children:"Missing miniwras file"}),P?(0,i.jsx)("p",{className:"text-green-800",children:"✅ Strava"}):(0,i.jsx)("p",{className:"text-red-800",children:"Missing strava file"})]}),(0,i.jsx)(d.A,{disabled:!s,className:"block m-auto mt-2",onClick:(0,g._)(function(){return(0,b.YH)(this,function(e){switch(e.label){case 0:return[4,(0,_.jr)()];case 1:if(e.sent(),!P||!C)throw Error("expected Strava & MiniWras data");return r((0,w.kg)({pocketlabs:R,strava:P,miniwras:C})),n.push("/device/miniwras/calibration"),[2]}})}),children:"Submit"})]})},S=function(e){var r=e.datasource,t=e.isRenderingUrlErrorState,n=e.isSubmitDisabled,a=(e.luggage,e.onDatasourceSourceChange),s=e.onMiniWrasReady,u=e.onSubmit,o=e.onUrlsChange,c=e.onSensorTypeChange,h=e.sensorType,g=e.urls,v=h!==l.Dr;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("p",{className:"text-center text-gray-600 gray-200",children:"Enter your datasource"}),(0,i.jsxs)(f,{defaultValue:h,placeholder:"Select sensor type",className:"w-full mt-1",onMouseOver:function(){h===l.xL&&c(-1)},onMouseOut:function(){h<l.xL&&c(0)},onChange:function(e){var r=e.currentTarget.value;o([]),c(parseInt(r,10))},children:[(0,i.jsx)("option",{disabled:!0,value:l.xL,children:"Select sensor type..."}),(0,i.jsx)("option",{value:l.tH,children:"Flow"}),(0,i.jsx)("option",{value:l.Ke,children:"PocketLabs"}),(0,i.jsx)("option",{value:l.Dr,children:"MiniWRAS"}),(0,i.jsx)("option",{value:l.cZ,children:"airmap™ GPS"})]}),v?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(m,{required:!0,className:"w-full mt-1",value:r,onChange:a}),(0,i.jsx)(p.A,{required:!0,error:t,className:"w-full mt-1",placeholder:h===l.tH?"User Measures: https://url/to/data":"https://url/to/data",defaultValue:g[0],onChange:function(e){return o([e.currentTarget.value,g[1]].filter(Boolean))}},"".concat(h,"-url-1"))]}):null,h===l.tH?(0,i.jsx)(p.A,{required:!0,error:t,className:"w-full mt-1",placeholder:"User Positions: https://url/to/data",defaultValue:g[1],onChange:function(e){return o([g[0],e.currentTarget.value])}},"".concat(h,"-url-2")):null,t?(0,i.jsxs)("p",{className:"text-sm text-left text-red-600",children:["Sheets URL must have the form:",(0,i.jsx)("br",{}),"https://docs.google.com/spreadsheets/d/:id/gviz/tq"]}):null,h===l.Dr?(0,i.jsx)("div",{className:"mt-1",children:(0,i.jsx)(N,{onInputRead:function(e){s(e)}})}):null,h===l.Dr?null:(0,i.jsx)(d.A,{disabled:n,className:"block m-auto mt-2",onClick:u,children:"Submit"})]})},R=t(521),M=t(95988),T=[];function C(){var e=(0,R.xw)(),r=e.value,t=e.update,o=r.urls,d=r.datasource,p=r.sensorType,h=r.luggage,f=function(e,i){return t((0,s._)((0,a._)({},r),(0,n._)({},e,i)))},m=(0,M.m_)(),g=m.value.accessToken;m.update;var v=o.every(function(e){return(0,c.zB)(e)})&&(p!==l.tH||2===o.length),x=(0,u.useRouter)(),b=!!(o.length&&!v),y=!v||!g||0===p||p===l.Dr&&!h;return(0,i.jsxs)("form",{className:"max-w-screen-md content home w-96",onSubmit:function(e){return e.preventDefault()},children:[(0,i.jsx)("h1",{className:"text-4xl text-center",children:"airmap!"}),(0,i.jsx)(S,{isSubmitDisabled:y,luggage:h,datasource:d,sensorType:p,isRenderingUrlErrorState:b,onDatasourceSourceChange:function(e){return f("datasource",e.currentTarget.value)},onSensorTypeChange:function(e){return t(function(t){return{datasource:t.datasource,luggage:T.includes(r.sensorType)?t.luggage:null,urls:[],sensorType:e}})},onUrlsChange:function(e){return f("urls",e)},onMiniWrasReady:function(e){return f("luggage",e)},urls:o,onSubmit:function(){y||(f("urls",o.map(function(e){return(0,c.DM)(e)})),x.push("/map"))}}),null]})}},48747:(e,r,t)=>{"use strict";t.d(r,{A:()=>o});var n=t(34618),a=t(58139),s=t(65723),i=t(70851);t(22155);var u={bg:"bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200",display:"flex"};let o=function(e){var r=e.styles,t=void 0===r?{}:r,o=t.bg,c=void 0===o?u.bg:o,l=t.display,d=void 0===l?u.display:l,p=e.type,h=e.className,f=(0,a._)(e,["styles","type","className"]),m=(0,i.A)(h,c,d,"py-2 px-4 justify-center items-center text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg",f.disabled?"bg-gray-400 hover:bg-gray-400 cursor-not-allowed":"");return(0,s.jsx)("button",(0,n._)({type:void 0===p?"button":p,className:m},f))}},83043:(e,r,t)=>{"use strict";t.d(r,{A:()=>u});var n=t(34618),a=t(58139),s=t(65723),i=t(70851);t(22155);let u=function(e){var r=e.error,t=e.className,u=(0,a._)(e,["error","className"]);return(0,s.jsx)("input",(0,n._)({className:(0,i.A)("rounded-lg border-transparent flex-1 appearance-none border border-gray-400 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent",r?"border-red-600":void 0,t)},u))}},22774:(e,r,t)=>{"use strict";t.d(r,{Hf:()=>u,JS:()=>d,jr:()=>c});var n=t(48967),a=t(65959),s=t(29928),i=t(52062),u=function(){return t.e(994).then(t.bind(t,26994)).then(function(e){return e.getResources()})},o=function(){var e;return t.e(881).then(t.bind(t,66881)).then((e=(0,n._)(function(e){return(0,a.YH)(this,function(r){return[2,e.getResources()]})}),function(r){return e.apply(this,arguments)}))},c=function(){var e;return t.e(867).then(t.bind(t,67867)).then((e=(0,n._)(function(e){return(0,a.YH)(this,function(r){return[2,e.getResources()]})}),function(r){return e.apply(this,arguments)}))},l=function(){var e;return t.e(109).then(t.bind(t,38109)).then((e=(0,n._)(function(e){return(0,a.YH)(this,function(r){return[2,e.getResources()]})}),function(r){return e.apply(this,arguments)}))},d=function(e){return(0,s.useQuery)({queryKey:"get-mapping-".concat(e),queryFn:(0,n._)(function(){return(0,a.YH)(this,function(r){switch(r.label){case 0:return[4,e===i.Ke?u():e===i.tH?o():e===i.Dr?c():e===i.cZ?l():function(){throw Error("unsupported sensor type ".concat(e))}()];case 1:return[2,r.sent()]}})}),cacheTime:1e9})}},60502:(e,r,t)=>{"use strict";t.d(r,{zB:()=>i,k8:()=>o,DM:()=>u});var n=t(12551),a=t(61760),s=t(69152);function i(e){try{var r=new URL(e),t=(0,n._)(r.pathname.substr(1).split("/"),3),a=t[0],s=t[1],i=t[2];if("spreadsheets"===a&&"d"===s&&i&&r.host.match("google.com"))return!0}catch(e){}return!1}function u(e){var r=new URL(e);return r.pathname=(0,a._)(r.pathname.substr(1).split("/").splice(0,3)).concat(["export"]).join("/"),String(r)}var o=function(e){var r=new URL(e),t=new URLSearchParams(r.search);return t.has("format")||t.set("format","csv"),r.search=t.toString(),fetch(u(r.toString()),{mode:"cors",redirect:"follow",headers:{accept:"text"}}).then(function(e){return e.body}).then(function(e){var r=null==e?void 0:e.getReader();return(0,s.V)(r,"missing stream body"),r})}},32793:(e,r,t)=>{"use strict";t.d(r,{bl:()=>i.RHO_GRIMM,kg:()=>s,cz:()=>i.sum,Tc:()=>i["toPartialμgPerM3"],dT:()=>i["toPartialμgPerM3SansRho"]});var n=t(34618),a=t(92831),s=function(e){var r=e.pocketlabs,t=void 0===r?[]:r,s=e.strava,i=e.miniwras,u=[],o=!0,c=!1,l=void 0;try{for(var d,p=i[Symbol.iterator]();!(o=(d=p.next()).done);o=!0){var h=d.value,f=h.date,m=function(e){for(;;){var r=s[0],t=null==r?void 0:r.date;if(!t||!r)return console.warn("no strava data, skipping, dropping miniwras point"),null;if(t<e)s.shift();else if(t.getTime()-e.getTime()<6e4)return s.shift(),r;else return console.warn("miniwras > 1 minute away from strava points, dropping miniwras point"),null}}(f),g=function(e){for(;;){var r=t[0],n=null==r?void 0:r.date;if(!n||!r)return null;if(n<e)t.shift();else if(n.getTime()-e.getTime()<6e4)return t.shift(),r;else return null}}(f);m&&u.push((0,a._)((0,n._)({latitude:m.lat,longitude:m.lon},m,h),{pm05Calibrated:-1,pm05Derived:-1,pm05To3Calibrated:-1,pm01To03Derived:-1,pocketlabsEntry:g||void 0}))}}catch(e){c=!0,l=e}finally{try{o||null==p.return||p.return()}finally{if(c)throw l}}return{type:"FeatureCollection",features:u.map(function(e){return{type:"Feature",geometry:{type:"Point",coordinates:[e.longitude,e.latitude]},properties:e}})}},i=t(58875)},58875:(e,r,t)=>{"use strict";t.r(r),t.d(r,{RHO_GRIMM:()=>u,parse:()=>m,sum:()=>c,toPartialμgPerM3:()=>p,toPartialμgPerM3SansRho:()=>h});var n=t(48967),a=t(65959),s=t(69152),i=t(12551),u=1800,o=[6.842765,7.1751666,7.0114602,6.9088991,7.0263146,6.9180838,7.0393966,6.989318,6.9812267,5.2701795,14.0655402,13.8262107,14.1929174,14.0017841,13.8883794,13.9963284,14.0409634,14.2779903,13.8513492,13.898864,13.6873067,14.3390373,13.8184393,14.1478588,14.0655395,13.8262102,14.1929179,13.8296286,14.062005,13.9963317,14.040958,14.001345,13.96783,14,13.95533,14.00924,14,14,14,14,14],c=function(){for(var e=arguments.length,r=Array(e),t=0;t<e;t++)r[t]=arguments[t];return r.reduce(function(e,r){return e+r},0)},l=function(e){return e/1e9},d=function(e){return 1e6*e},p=function(e,r,t,n){return d(e)/o[t]*(Math.PI/6)*Math.pow(l(r),3)*n*(1e9/1)},h=function(e,r,t){return d(e)/o[t]*(Math.PI/6)*Math.pow(l(r),3)*(1e9/1)},f={date:function(e){return new Date(e.trim().split(" ").map(function(e,r){if(0===r){var t=(0,i._)(e.split("/"),3),n=t[0],a=t[1],s=t[2],u=function(e){return 1===e.length?"0".concat(e):e};return"".concat(n,"-").concat(u(a),"-").concat(u(s))}return"T".concat(e,".000+01:00")}).join(""))},pm_2_5:function(e){var r=parseFloat(e);return Number.isNaN(r)?(console.error("Expected a number, got a NaN. MiniWras export problem?"),0):r}},m=function(){var e=(0,n._)(function(e){var r,t,n,i,o,c,l=arguments;return(0,a.YH)(this,function(a){switch(a.label){case 0:return r=l.length>1&&void 0!==l[1]?l[1]:{records:[],partial:"",particleDiametersAscending:[]},[4,e.read()];case 1:return n=(t=a.sent()).done,((i=t.value)||n)&&(r.partial+="string"==typeof i?i:i?new TextDecoder().decode(i):"",c=(o=r.partial.split(/\n/g).map(function(e){return e.trim()}).filter(function(e){return!!e})).length-1,o.forEach(function(e,t){if(c!==t||n){var a=e.includes(",")?e.split(","):e.split("	");if(r.headerIndiciesByName){var i=a[r.headerIndiciesByName.Time],o=a[r.headerIndiciesByName["pm2.5 [ug/m3]"]];(0,s.V)(i,"date missing"),(0,s.V)(Number.isFinite(o),"column 'pm2.5 [ug/m3]' missing");for(var l=0,d=r.headerIndiciesByName["10.00 nm"],h=r.headerIndiciesByName["449.48 nm"],m=r.headerIndiciesByName["3238.77 nm"],g=[],v=0,x={all:[],sub500nm:[],sub3000nm:[]};d<m;){var b=parseFloat(a[d]),y=(r.particleDiametersAscending[v]+r.particleDiametersAscending[v+1])/2,w={value:b,diameterMidpointNm:y,calibrationIndex:v};x.all.push(w);var _=p(b,y,v,u);d<h&&(x.sub500nm.push(w),l+=_),d<m&&x.sub3000nm.push(w),++d,++v}console.log({sampleNum:r.records.length,pm05:l,debug:g}),r.records.push({channels:x,date:f.date(i),debug:g,pm05EndCol:h,pm05Naive:l,pm_2_5:f.pm_2_5(o)}),n&&(r.partial="")}else r.headerCells=a,r.headerIndiciesByName=a.reduce(function(e,t,n){var a=t.trim();e[a]=n;var s=a.match(/\s*(\d+\.\d+)\s+nm/);return s&&r.particleDiametersAscending.push(parseInt(s[1],10)),e},{})}else r.partial=e})),[2,n?r:m(e,r)]}})});return function(r){return e.apply(this,arguments)}}()},69152:(e,r,t)=>{"use strict";function n(e,r){if(null==e)throw Error(r)}t.d(r,{V:()=>n})}},e=>{var r=r=>e(e.s=r);e.O(0,[277,636,593,792],()=>r(99693)),_N_E=e.O()}]);