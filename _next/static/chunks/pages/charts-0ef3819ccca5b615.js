(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[650],{5488:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/charts",function(){return r(858)}])},858:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return N}});var n=r(1250),o=r(9901),a=r(4235),u=r.n(a),c=r(1371),i=r(565),s=function(e){return[e.getDate(),e.getMonth(),e.getFullYear()]};function l(e){if(Array.isArray(e))return e}function f(e,t,r,n,o,a,u){try{var c=e[a](u),i=c.value}catch(s){return void r(s)}c.done?t(i):Promise.resolve(i).then(n,o)}function d(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var a=e.apply(t,r);function u(e){f(a,n,o,u,c,"next",e)}function c(e){f(a,n,o,u,c,"throw",e)}u(void 0)}))}}function p(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function h(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function y(e,t){return l(e)||function(e,t){var r=[],n=!0,o=!1,a=void 0;try{for(var u,c=e[Symbol.iterator]();!(n=(u=c.next()).done)&&(r.push(u.value),!t||r.length!==t);n=!0);}catch(i){o=!0,a=i}finally{try{n||null==c.return||c.return()}finally{if(o)throw a}}return r}(e,t)||h()}function v(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||p(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var b=r(6637),g=r(3507),w=r(4657),m=r(2242),x=r(7839),j=r(2462);function k(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function O(e){return(O=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function E(e,t){return!t||"object"!==C(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function S(e,t){return(S=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function D(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],n=!0,o=!1,a=void 0;try{for(var u,c=e[Symbol.iterator]();!(n=(u=c.next()).done)&&(r.push(u.value),!t||r.length!==t);n=!0);}catch(i){o=!0,a=i}finally{try{n||null==c.return||c.return()}finally{if(o)throw a}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var C=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function T(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=O(e);if(t){var o=O(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return E(this,r)}}var A=[new Date("2021-08-17 00:00:00"),new Date("2021-09-23 00:00:00")],F=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&S(e,t)}(u,e);var t,r,o,a=T(u);function u(){return k(this,u),a.apply(this,arguments)}return t=u,(r=[{key:"render",value:function(){var e=this.props,t=e.x,r=e.y,o=(e.stroke,e.payload);return(0,n.jsx)("g",{transform:"translate(".concat(t,",").concat(r,")"),children:(0,n.jsx)("text",{x:0,y:0,dy:16,textAnchor:"end",fill:"#666",transform:"rotate(-35)",children:o.value})})}}])&&_(t.prototype,r),o&&_(t,o),u}(o.PureComponent),P=function(){return window.document.body.getBoundingClientRect().width},R=function(e){var t=e.onChange,r=e.value,o=D(s(r),3),a=o[0],u=o[1],c=[o[2],u,a].map((function(e,t){var r=String(e);return 0===t?r:1===r.length?"0".concat(r):r})).join("-");return(0,n.jsx)("input",{type:"date",pattern:"\\d{4}-\\d{2}-\\d{2}",className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"Select date",onChange:t,value:c})};var N=function(){var e=(0,o.useState)(A[0]),t=e[0],r=e[1],a=(0,o.useState)(A[1]),f=a[0],k=a[1],_=(0,o.useState)(P()),O=_[0],E=_[1];(0,o.useLayoutEffect)((function(){var e=function(){E(P())};return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]);var S=function(e,t,r,n){var o=y(t,2),a=o[0],f=o[1];return(0,c.useQuery)({queryKey:"get-chart-".concat(e,"-").concat(a.getTime(),"-").concat(f.getTime()),queryFn:d(u().mark((function e(t){var n,o,c,b,g,w,m,x,j,k,_;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=null,o=[],e.next=4,fetch(r);case 4:if(c=e.sent,b=c.body){e.next=8;break}throw new Error("missing data");case 8:return g=b.getReader(),w=new TextDecoder,m=w.decode.bind(w),x=function(e){return parseInt(e,10)},j=[function(e){return new Date(e)},parseFloat,x,x,x,parseFloat,parseFloat,parseFloat],k=new ReadableStream({start:function(e){return d(u().mark((function t(){var r,c,s,l,d,p,h,y,v,b,w,x,k;return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=3,g.read();case 3:if(r=t.sent,c=r.done,s=r.value,!c){t.next=8;break}return t.abrupt("break",31);case 8:if(l=m(s),!(d=(0,i.parse)(l)).errors.length){t.next=12;break}throw new Error(JSON.stringify(d.errors));case 12:for(p=!0,h=!1,y=void 0,t.prev=13,v=d.data[Symbol.iterator]();!(p=(b=v.next()).done);p=!0)w=b.value,n?(x=w.map((function(e,t){return j[t](e)})),(k=x[0])>=a&&k<=f&&o.push(x)):n=w;t.next=21;break;case 17:t.prev=17,t.t0=t.catch(13),h=!0,y=t.t0;case 21:t.prev=21,t.prev=22,p||null==v.return||v.return();case 24:if(t.prev=24,!h){t.next=27;break}throw y;case 27:return t.finish(24);case 28:return t.finish(21);case 29:t.next=0;break;case 31:e.close(),g.releaseLock();case 33:case"end":return t.stop()}}),t,null,[[13,17,21,29],[22,,24,28]])})))()}}),e.next=17,new Response(k).blob();case 17:return _=v(o.reduce((function(e,t){var r=y(t,1)[0],n=y(s(r),3),o=n[0],a=n[1],u=n[2],c="".concat(o,"_").concat(a,"_").concat(u),i=e.get(c)||[];return i.push(t),e.set(c,i),e}),new Map).values()).map((function(e){var t,r=l(t=y(e,1)[0])||p(t)||h(),n=r[0],o=(r[1],r.slice(2),parseFloat((e.reduce((function(e,t){return e+y(t,2)[1]}),0)/e.length).toFixed(2))),a=new Date(n.getFullYear(),n.getMonth(),n.getDate());return{date:a,prettyDate:"".concat(a.getDate()," ").concat(a.toLocaleString("default",{month:"long"})," ").concat(a.getFullYear()),vocAverage:o}})).sort((function(e,t){return e.date>t.date?1:-1})),e.abrupt("return",{header:n,rows:_});case 19:case"end":return e.stop()}}),e)})))})}("sampleatmos",[t,f],["/airmap","/atmotube__bank_st__sample.csv"].join("")),D=S.isLoading,C=S.error,T=S.data;if(D)return"is loading";if(C)return String(C);var N=null===T||void 0===T?void 0:T.rows;if(!N)throw new Error("missing data");return(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{htmlFor:"start-date",children:"Start Date"}),(0,n.jsx)(R,{name:"start-date",value:t,onChange:function(e){var t=new Date(e.currentTarget.value);t>f||r(t)}}),(0,n.jsx)("label",{htmlFor:"end-date",children:"End Date"}),(0,n.jsx)(R,{name:"end-date",value:f,onChange:function(e){var r=new Date(e.currentTarget.value);r<t||k(r)}}),(0,n.jsx)("h1",{className:"text-xl block text-center",children:"VOC, ppm"}),(0,n.jsx)("br",{}),(0,n.jsxs)(b.T,{width:O,height:600,data:N,margin:{top:10,right:30,left:0,bottom:0},children:[(0,n.jsx)("defs",{children:(0,n.jsxs)("linearGradient",{id:"colorVoc",x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,n.jsx)("stop",{offset:"5%",stopColor:"#8884d8",stopOpacity:.8}),(0,n.jsx)("stop",{offset:"95%",stopColor:"#8884d8",stopOpacity:0})]})}),(0,n.jsx)(g.u,{fillOpacity:1,fill:"url(#colorVoc)",type:"monotone",dataKey:"vocAverage",stroke:"#8884d8"}),(0,n.jsx)(w.q,{vertical:!0,horizontal:!0,stroke:"#ccc",strokeDasharray:"3 3"}),(0,n.jsx)(m.u,{}),(0,n.jsx)(x.K,{label:"Date",height:200,dataKey:"prettyDate",tick:(0,n.jsx)(F,{})}),(0,n.jsx)(j.B,{label:"VOC, ppm"})]})]})}}},function(e){e.O(0,[573,50,774,888,179],(function(){return t=5488,e(e.s=t);var t}));var t=e.O();_N_E=t}]);