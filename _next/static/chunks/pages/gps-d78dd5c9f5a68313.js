(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[700],{83129:(e,r,n)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/gps",function(){return n(43471)}])},43471:(e,r,n)=>{"use strict";n.r(r),n.d(r,{default:()=>g});var t=n(48967),o=n(34618),s=n(92831),i=n(12551),a=n(65959),u=n(65723),c=n(22155),l=n(48747),d=n(83043);function g(){var e=c.useRef(null),r=c.useRef(null),n=(0,i._)(c.useState(!1),2),g=n[0],f=n[1],b=(0,i._)(c.useState(1e4),2),m=b[0],p=b[1],h=c.useRef(g),v=c.useCallback(function(){h.current=!h.current,f(h.current)},[f]),y=(0,i._)(c.useState(new Date().getTime()),2),w=(y[0],y[1]),k=(0,i._)(c.useState(""),2),_=k[0],x=k[1],N=(0,i._)(c.useState(""),2),S=N[0],j=N[1],C=c.useCallback((0,t._)(function(){var r,n;return(0,a.YH)(this,function(t){switch(t.label){case 0:w(function(e){return e+1}),t.label=1;case 1:return t.trys.push([1,3,,4]),[4,new Promise(function(e,r){return navigator.geolocation.getCurrentPosition(e,r,{enableHighAccuracy:!1,timeout:5e3,maximumAge:0})})];case 2:if(r=t.sent(),!(n=e.current))throw Error("missing pre el");return n.innerHTML+=[new Date(r.timestamp).toISOString(),r.coords.latitude,r.coords.longitude].map(function(e){return e.toString()}).join(",")+"\n",[3,4];case 3:return x(String(t.sent())),[3,4];case 4:return[2]}})}),[]),E=c.useCallback(function(){var n=e.current;n&&(n.innerHTML="timestamp,latitude,longitude\n",function e(r){var n=r.fn,t=r.timeoutRef,i=r.duration,a=r.leadingEdge,u=r.isRecordingPausedRef;t.current=window.setTimeout(function(){return((null==u?void 0:u.current)?Promise.resolve():n()).finally(function(){Number.isFinite(t.current)&&e((0,s._)((0,o._)({},r),{leadingEdge:!1}))})},void 0===a||a?0:void 0===i?3e4:i)}({fn:C,timeoutRef:r,duration:m,isRecordingPausedRef:h}))},[r,C,m]),R=(0,i._)(c.useState(3),2),A=R[0],T=R[1],P=c.useCallback(function(){var e=function(){return T(3)},n=A-1;if(n){T(n);var t=setTimeout(e,2e3);return function(){return clearTimeout(t)}}clearTimeout(r.current),r.current=null,w(0),e()},[A]),I=Number.isFinite(r.current);return c.useEffect(function(){var e=function(e){return j(["Warning: WakeLock error. WakeLock helps your phone stay awake while it's polling GPS data. It is not required, but helps keep data flowing reliably. This generally happens when not using Google Chrome, using Apple devices, low battery, or permissions issues. We will proceed without it.",e].filter(Boolean).join("\n\n"))};try{var r=navigator.wakeLock;if(!r)throw Error("no wake lock");if(!I)return;r.request("screen").then(function(){},function(r){return e(String(r))})}catch(r){e("If you have issues, try Google Chrome.")}},[_,x,I]),(0,u.jsxs)("div",{className:"p-2",children:[(0,u.jsx)(l.A,{disabled:h.current,styles:{bg:I?"bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200":"bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200",display:"inline-block"},className:"mr-1",onClick:function(){I?P():E()},children:I?"Stop".concat(3===A?"":" (Confirm quickly, ".concat(A,"x clicks)")):"Start"}),(0,u.jsx)(l.A,{disabled:!I,styles:{bg:"bg-orange-600 hover:bg-orange-700 focus:ring-orange-500 focus:ring-offset-orange-200",display:"inline-block"},className:"mr-1",onClick:function(){return v()},children:h.current?"Resume":"Pause"}),(0,u.jsx)(l.A,{styles:{bg:"bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200",display:"inline-block"},className:"mr-1",onClick:function(){var r,n=(null===(r=e.current)||void 0===r?void 0:r.textContent)||"",t=document.createElement("a");t.download="gps_data_".concat(new Date().toISOString(),".csv");var o=new Blob([n],{type:"text/csv"});t.href=window.URL.createObjectURL(o),t.click()},children:"Export"}),(0,u.jsx)("label",{htmlFor:"durationMs",children:"Interval (ms)"}),(0,u.jsx)(d.A,{className:"mb-2",type:"number",name:"durationMs",value:m,disabled:I,onChange:function(e){var r=parseInt(e.currentTarget.value,10);Number.isInteger(r)&&p(r)}}),_?(0,u.jsx)("pre",{className:"w-full p-2 mb-1 bg-red-200 border border-red-500 rounded",children:_}):null,S?(0,u.jsx)("pre",{className:"w-full p-2 mb-1 whitespace-pre-line bg-orange-200 border border-orange-500 rounded",children:S}):null,(0,u.jsx)("pre",{className:"block",ref:e})]})}},48747:(e,r,n)=>{"use strict";n.d(r,{A:()=>u});var t=n(34618),o=n(58139),s=n(65723),i=n(70851);n(22155);var a={bg:"bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200",display:"flex"};let u=function(e){var r=e.styles,n=void 0===r?{}:r,u=n.bg,c=void 0===u?a.bg:u,l=n.display,d=void 0===l?a.display:l,g=e.type,f=e.className,b=(0,o._)(e,["styles","type","className"]),m=(0,i.A)(f,c,d,"py-2 px-4 justify-center items-center text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg",b.disabled?"bg-gray-400 hover:bg-gray-400 cursor-not-allowed":"");return(0,s.jsx)("button",(0,t._)({type:void 0===g?"button":g,className:m},b))}},83043:(e,r,n)=>{"use strict";n.d(r,{A:()=>a});var t=n(34618),o=n(58139),s=n(65723),i=n(70851);n(22155);let a=function(e){var r=e.error,n=e.className,a=(0,o._)(e,["error","className"]);return(0,s.jsx)("input",(0,t._)({className:(0,i.A)("rounded-lg border-transparent flex-1 appearance-none border border-gray-400 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent",r?"border-red-600":void 0,n)},a))}}},e=>{var r=r=>e(e.s=r);e.O(0,[636,593,792],()=>r(83129)),_N_E=e.O()}]);