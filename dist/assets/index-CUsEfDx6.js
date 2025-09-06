import{c as d,r as b,$ as n}from"./index-COc_9EsS.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=d("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);function S(r){const[h,e]=b.useState(void 0);return n(()=>{if(r){e({width:r.offsetWidth,height:r.offsetHeight});const c=new ResizeObserver(i=>{if(!Array.isArray(i)||!i.length)return;const f=i[0];let o,t;if("borderBoxSize"in f){const s=f.borderBoxSize,a=Array.isArray(s)?s[0]:s;o=a.inlineSize,t=a.blockSize}else o=r.offsetWidth,t=r.offsetHeight;e({width:o,height:t})});return c.observe(r,{box:"border-box"}),()=>c.unobserve(r)}else e(void 0)},[r]),h}export{z as C,S as u};
