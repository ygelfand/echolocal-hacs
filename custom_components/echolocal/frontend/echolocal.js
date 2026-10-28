var jr=Object.defineProperty;var Br=Object.getOwnPropertyDescriptor;var c=(a,r,e,t)=>{for(var i=t>1?void 0:t?Br(r,e):r,s=a.length-1,n;s>=0;s--)(n=a[s])&&(i=(t?n(r,e,i):n(i))||i);return t&&i&&jr(r,e,i),i};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ne=globalThis,Ue=Ne.ShadowRoot&&(Ne.ShadyCSS===void 0||Ne.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ut=Symbol(),It=new WeakMap,Ie=class{constructor(r,e,t){if(this._$cssResult$=!0,t!==Ut)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=r,this.t=e}get styleSheet(){let r=this.o,e=this.t;if(Ue&&r===void 0){let t=e!==void 0&&e.length===1;t&&(r=It.get(e)),r===void 0&&((this.o=r=new CSSStyleSheet).replaceSync(this.cssText),t&&It.set(e,r))}return r}toString(){return this.cssText}},b=a=>new Ie(typeof a=="string"?a:a+"",void 0,Ut);var jt=(a,r)=>{if(Ue)a.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of r){let t=document.createElement("style"),i=Ne.litNonce;i!==void 0&&t.setAttribute("nonce",i),t.textContent=e.cssText,a.appendChild(t)}},ot=Ue?a=>a:a=>a instanceof CSSStyleSheet?(r=>{let e="";for(let t of r.cssRules)e+=t.cssText;return b(e)})(a):a;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var{is:Fr,defineProperty:Wr,getOwnPropertyDescriptor:qr,getOwnPropertyNames:Vr,getOwnPropertySymbols:Gr,getPrototypeOf:Kr}=Object,je=globalThis,Bt=je.trustedTypes,Lr=Bt?Bt.emptyScript:"",Yr=je.reactiveElementPolyfillSupport,Se=(a,r)=>a,Ae={toAttribute(a,r){switch(r){case Boolean:a=a?Lr:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,r){let e=a;switch(r){case Boolean:e=a!==null;break;case Number:e=a===null?null:Number(a);break;case Object:case Array:try{e=JSON.parse(a)}catch{e=null}}return e}},Be=(a,r)=>!Fr(a,r),Ft={attribute:!0,type:String,converter:Ae,reflect:!1,useDefault:!1,hasChanged:Be};Symbol.metadata??=Symbol("metadata"),je.litPropertyMetadata??=new WeakMap;var L=class extends HTMLElement{static addInitializer(r){this._$Ei(),(this.l??=[]).push(r)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(r,e=Ft){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(r)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(r,e),!e.noAccessor){let t=Symbol(),i=this.getPropertyDescriptor(r,t,e);i!==void 0&&Wr(this.prototype,r,i)}}static getPropertyDescriptor(r,e,t){let{get:i,set:s}=qr(this.prototype,r)??{get(){return this[e]},set(n){this[e]=n}};return{get:i,set(n){let o=i?.call(this);s?.call(this,n),this.requestUpdate(r,o,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(r){return this.elementProperties.get(r)??Ft}static _$Ei(){if(this.hasOwnProperty(Se("elementProperties")))return;let r=Kr(this);r.finalize(),r.l!==void 0&&(this.l=[...r.l]),this.elementProperties=new Map(r.elementProperties)}static finalize(){if(this.hasOwnProperty(Se("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Se("properties"))){let e=this.properties,t=[...Vr(e),...Gr(e)];for(let i of t)this.createProperty(i,e[i])}let r=this[Symbol.metadata];if(r!==null){let e=litPropertyMetadata.get(r);if(e!==void 0)for(let[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let i=this._$Eu(e,t);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(r){let e=[];if(Array.isArray(r)){let t=new Set(r.flat(1/0).reverse());for(let i of t)e.unshift(ot(i))}else r!==void 0&&e.push(ot(r));return e}static _$Eu(r,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof r=="string"?r.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(r=>r(this))}addController(r){(this._$EO??=new Set).add(r),this.renderRoot!==void 0&&this.isConnected&&r.hostConnected?.()}removeController(r){this._$EO?.delete(r)}_$E_(){let r=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(r.set(t,this[t]),delete this[t]);r.size>0&&(this._$Ep=r)}createRenderRoot(){let r=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return jt(r,this.constructor.elementStyles),r}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(r=>r.hostConnected?.())}enableUpdating(r){}disconnectedCallback(){this._$EO?.forEach(r=>r.hostDisconnected?.())}attributeChangedCallback(r,e,t){this._$AK(r,t)}_$ET(r,e){let t=this.constructor.elementProperties.get(r),i=this.constructor._$Eu(r,t);if(i!==void 0&&t.reflect===!0){let s=(t.converter?.toAttribute!==void 0?t.converter:Ae).toAttribute(e,t.type);this._$Em=r,s==null?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(r,e){let t=this.constructor,i=t._$Eh.get(r);if(i!==void 0&&this._$Em!==i){let s=t.getPropertyOptions(i),n=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:Ae;this._$Em=i;let o=n.fromAttribute(e,s.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(r,e,t,i=!1,s){if(r!==void 0){let n=this.constructor;if(i===!1&&(s=this[r]),t??=n.getPropertyOptions(r),!((t.hasChanged??Be)(s,e)||t.useDefault&&t.reflect&&s===this._$Ej?.get(r)&&!this.hasAttribute(n._$Eu(r,t))))return;this.C(r,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(r,e,{useDefault:t,reflect:i,wrapped:s},n){t&&!(this._$Ej??=new Map).has(r)&&(this._$Ej.set(r,n??e??this[r]),s!==!0||n!==void 0)||(this._$AL.has(r)||(this.hasUpdated||t||(e=void 0),this._$AL.set(r,e)),i===!0&&this._$Em!==r&&(this._$Eq??=new Set).add(r))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let r=this.scheduleUpdate();return r!=null&&await r,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,s]of this._$Ep)this[i]=s;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[i,s]of t){let{wrapped:n}=s,o=this[i];n!==!0||this._$AL.has(i)||o===void 0||this.C(i,void 0,s,o)}}let r=!1,e=this._$AL;try{r=this.shouldUpdate(e),r?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw r=!1,this._$EM(),t}r&&this._$AE(e)}willUpdate(r){}_$AE(r){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(r)),this.updated(r)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(r){return!0}update(r){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(r){}firstUpdated(r){}};L.elementStyles=[],L.shadowRootOptions={mode:"open"},L[Se("elementProperties")]=new Map,L[Se("finalized")]=new Map,Yr?.({ReactiveElement:L}),(je.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var mt=globalThis,Wt=a=>a,Fe=mt.trustedTypes,qt=Fe?Fe.createPolicy("lit-html",{createHTML:a=>a}):void 0,Xt="$lit$",J=`lit$${Math.random().toFixed(9).slice(2)}$`,Zt="?"+J,Xr=`<${Zt}>`,le=document,Ce=()=>le.createComment(""),Me=a=>a===null||typeof a!="object"&&typeof a!="function",ft=Array.isArray,Zr=a=>ft(a)||typeof a?.[Symbol.iterator]=="function",lt=`[ 	
\f\r]`,Te=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Vt=/-->/g,Gt=/>/g,ne=RegExp(`>|${lt}(?:([^\\s"'>=/]+)(${lt}*=${lt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Kt=/'/g,Lt=/"/g,Jt=/^(?:script|style|textarea|title)$/i,gt=a=>(r,...e)=>({_$litType$:a,strings:r,values:e}),l=gt(1),x=gt(2),Ia=gt(3),Y=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),Yt=new WeakMap,oe=le.createTreeWalker(le,129);function Qt(a,r){if(!ft(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return qt!==void 0?qt.createHTML(r):r}var Jr=(a,r)=>{let e=a.length-1,t=[],i,s=r===2?"<svg>":r===3?"<math>":"",n=Te;for(let o=0;o<e;o++){let d=a[o],h,f,y=-1,w=0;for(;w<d.length&&(n.lastIndex=w,f=n.exec(d),f!==null);)w=n.lastIndex,n===Te?f[1]==="!--"?n=Vt:f[1]!==void 0?n=Gt:f[2]!==void 0?(Jt.test(f[2])&&(i=RegExp("</"+f[2],"g")),n=ne):f[3]!==void 0&&(n=ne):n===ne?f[0]===">"?(n=i??Te,y=-1):f[1]===void 0?y=-2:(y=n.lastIndex-f[2].length,h=f[1],n=f[3]===void 0?ne:f[3]==='"'?Lt:Kt):n===Lt||n===Kt?n=ne:n===Vt||n===Gt?n=Te:(n=ne,i=void 0);let $=n===ne&&a[o+1].startsWith("/>")?" ":"";s+=n===Te?d+Xr:y>=0?(t.push(h),d.slice(0,y)+Xt+d.slice(y)+J+$):d+J+(y===-2?o:$)}return[Qt(a,s+(a[e]||"<?>")+(r===2?"</svg>":r===3?"</math>":"")),t]},He=class a{constructor({strings:r,_$litType$:e},t){let i;this.parts=[];let s=0,n=0,o=r.length-1,d=this.parts,[h,f]=Jr(r,e);if(this.el=a.createElement(h,t),oe.currentNode=this.el.content,e===2||e===3){let y=this.el.content.firstChild;y.replaceWith(...y.childNodes)}for(;(i=oe.nextNode())!==null&&d.length<o;){if(i.nodeType===1){if(i.hasAttributes())for(let y of i.getAttributeNames())if(y.endsWith(Xt)){let w=f[n++],$=i.getAttribute(y).split(J),A=/([.?@])?(.*)/.exec(w);d.push({type:1,index:s,name:A[2],strings:$,ctor:A[1]==="."?dt:A[1]==="?"?pt:A[1]==="@"?ht:ue}),i.removeAttribute(y)}else y.startsWith(J)&&(d.push({type:6,index:s}),i.removeAttribute(y));if(Jt.test(i.tagName)){let y=i.textContent.split(J),w=y.length-1;if(w>0){i.textContent=Fe?Fe.emptyScript:"";for(let $=0;$<w;$++)i.append(y[$],Ce()),oe.nextNode(),d.push({type:2,index:++s});i.append(y[w],Ce())}}}else if(i.nodeType===8)if(i.data===Zt)d.push({type:2,index:s});else{let y=-1;for(;(y=i.data.indexOf(J,y+1))!==-1;)d.push({type:7,index:s}),y+=J.length-1}s++}}static createElement(r,e){let t=le.createElement("template");return t.innerHTML=r,t}};function he(a,r,e=a,t){if(r===Y)return r;let i=t!==void 0?e._$Co?.[t]:e._$Cl,s=Me(r)?void 0:r._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(!1),s===void 0?i=void 0:(i=new s(a),i._$AT(a,e,t)),t!==void 0?(e._$Co??=[])[t]=i:e._$Cl=i),i!==void 0&&(r=he(a,i._$AS(a,r.values),i,t)),r}var ct=class{constructor(r,e){this._$AV=[],this._$AN=void 0,this._$AD=r,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(r){let{el:{content:e},parts:t}=this._$AD,i=(r?.creationScope??le).importNode(e,!0);oe.currentNode=i;let s=oe.nextNode(),n=0,o=0,d=t[0];for(;d!==void 0;){if(n===d.index){let h;d.type===2?h=new Re(s,s.nextSibling,this,r):d.type===1?h=new d.ctor(s,d.name,d.strings,this,r):d.type===6&&(h=new ut(s,this,r)),this._$AV.push(h),d=t[++o]}n!==d?.index&&(s=oe.nextNode(),n++)}return oe.currentNode=le,i}p(r){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(r,t,e),e+=t.strings.length-2):t._$AI(r[e])),e++}},Re=class a{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(r,e,t,i){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=r,this._$AB=e,this._$AM=t,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let r=this._$AA.parentNode,e=this._$AM;return e!==void 0&&r?.nodeType===11&&(r=e.parentNode),r}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(r,e=this){r=he(this,r,e),Me(r)?r===p||r==null||r===""?(this._$AH!==p&&this._$AR(),this._$AH=p):r!==this._$AH&&r!==Y&&this._(r):r._$litType$!==void 0?this.$(r):r.nodeType!==void 0?this.T(r):Zr(r)?this.k(r):this._(r)}O(r){return this._$AA.parentNode.insertBefore(r,this._$AB)}T(r){this._$AH!==r&&(this._$AR(),this._$AH=this.O(r))}_(r){this._$AH!==p&&Me(this._$AH)?this._$AA.nextSibling.data=r:this.T(le.createTextNode(r)),this._$AH=r}$(r){let{values:e,_$litType$:t}=r,i=typeof t=="number"?this._$AC(r):(t.el===void 0&&(t.el=He.createElement(Qt(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===i)this._$AH.p(e);else{let s=new ct(i,this),n=s.u(this.options);s.p(e),this.T(n),this._$AH=s}}_$AC(r){let e=Yt.get(r.strings);return e===void 0&&Yt.set(r.strings,e=new He(r)),e}k(r){ft(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,i=0;for(let s of r)i===e.length?e.push(t=new a(this.O(Ce()),this.O(Ce()),this,this.options)):t=e[i],t._$AI(s),i++;i<e.length&&(this._$AR(t&&t._$AB.nextSibling,i),e.length=i)}_$AR(r=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);r!==this._$AB;){let t=Wt(r).nextSibling;Wt(r).remove(),r=t}}setConnected(r){this._$AM===void 0&&(this._$Cv=r,this._$AP?.(r))}},ue=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(r,e,t,i,s){this.type=1,this._$AH=p,this._$AN=void 0,this.element=r,this.name=e,this._$AM=i,this.options=s,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=p}_$AI(r,e=this,t,i){let s=this.strings,n=!1;if(s===void 0)r=he(this,r,e,0),n=!Me(r)||r!==this._$AH&&r!==Y,n&&(this._$AH=r);else{let o=r,d,h;for(r=s[0],d=0;d<s.length-1;d++)h=he(this,o[t+d],e,d),h===Y&&(h=this._$AH[d]),n||=!Me(h)||h!==this._$AH[d],h===p?r=p:r!==p&&(r+=(h??"")+s[d+1]),this._$AH[d]=h}n&&!i&&this.j(r)}j(r){r===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,r??"")}},dt=class extends ue{constructor(){super(...arguments),this.type=3}j(r){this.element[this.name]=r===p?void 0:r}},pt=class extends ue{constructor(){super(...arguments),this.type=4}j(r){this.element.toggleAttribute(this.name,!!r&&r!==p)}},ht=class extends ue{constructor(r,e,t,i,s){super(r,e,t,i,s),this.type=5}_$AI(r,e=this){if((r=he(this,r,e,0)??p)===Y)return;let t=this._$AH,i=r===p&&t!==p||r.capture!==t.capture||r.once!==t.once||r.passive!==t.passive,s=r!==p&&(t===p||i);i&&this.element.removeEventListener(this.name,this,t),s&&this.element.addEventListener(this.name,this,r),this._$AH=r}handleEvent(r){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,r):this._$AH.handleEvent(r)}},ut=class{constructor(r,e,t){this.element=r,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(r){he(this,r)}};var Qr=mt.litHtmlPolyfillSupport;Qr?.(He,Re),(mt.litHtmlVersions??=[]).push("3.3.3");var ei=(a,r,e)=>{let t=e?.renderBefore??r,i=t._$litPart$;if(i===void 0){let s=e?.renderBefore??null;t._$litPart$=i=new Re(r.insertBefore(Ce(),s),s,void 0,e??{})}return i._$AI(a),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var bt=globalThis,g=class extends L{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let r=super.createRenderRoot();return this.renderOptions.renderBefore??=r.firstChild,r}update(r){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(r),this._$Do=ei(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Y}};g._$litElement$=!0,g.finalized=!0,bt.litElementHydrateSupport?.({LitElement:g});var es=bt.litElementPolyfillSupport;es?.({LitElement:g});(bt.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var v=a=>(r,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(a,r)}):customElements.define(a,r)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ts={attribute:!0,type:String,converter:Ae,reflect:!1,hasChanged:Be},is=(a=ts,r,e)=>{let{kind:t,metadata:i}=e,s=globalThis.litPropertyMetadata.get(i);if(s===void 0&&globalThis.litPropertyMetadata.set(i,s=new Map),t==="setter"&&((a=Object.create(a)).wrapped=!0),s.set(e.name,a),t==="accessor"){let{name:n}=e;return{set(o){let d=r.get.call(this);r.set.call(this,o),this.requestUpdate(n,d,a,!0,o)},init(o){return o!==void 0&&this.C(n,void 0,a,o),o}}}if(t==="setter"){let{name:n}=e;return function(o){let d=this[n];r.call(this,o),this.requestUpdate(n,d,a,!0,o)}}throw Error("Unsupported decorator location: "+t)};function m(a){return(r,e)=>typeof e=="object"?is(a,r,e):((t,i,s)=>{let n=i.hasOwnProperty(s);return i.constructor.createProperty(s,t),n?Object.getOwnPropertyDescriptor(i,s):void 0})(a,r,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function u(a){return m({...a,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ce=(a,r,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof r!="object"&&Object.defineProperty(a,r,e),e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function We(a,r){return(e,t,i)=>{let s=n=>n.renderRoot?.querySelector(a)??null;if(r){let{get:n,set:o}=typeof t=="object"?e:i??(()=>{let d=Symbol();return{get(){return this[d]},set(h){this[d]=h}}})();return ce(e,t,{get(){let d=n.call(this);return d===void 0&&(d=s(this),(d!==null||this.hasUpdated)&&o.call(this,d)),d}})}return ce(e,t,{get(){return s(this)}})}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ze=12,ti=2.2,j=100,B=100,ii=500;function ri(a,r){let e=Array.from({length:ze},(o,d)=>{let h=-90+360/ze*d+ti/2,f=-90+360/ze*(d+1)-ti/2;return as(93,82,h,f)}),t=a.controls??{},i=t.volume!==!1,s=t.action!==!1,n=t.mute!==!1;return x`
    <svg viewBox="0 0 200 200" role="img" aria-label="Echo Dot">
      <defs>
        <radialGradient id="top" cx="38%" cy="30%" r="78%">
          <stop offset="0%" stop-color="var(--el-top-high)"></stop>
          <stop offset="100%" stop-color="var(--el-top)"></stop>
        </radialGradient>
        <filter id="blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4"></feGaussianBlur>
        </filter>
      </defs>

      <circle cx=${j} cy=${B} r="97" fill="var(--el-shell)"></circle>
      <circle cx=${j} cy=${B} r="97" fill="none" stroke="var(--el-edge)" stroke-width="1"></circle>

      <g class="halo" filter="url(#blur)" style="opacity:${a.glow}">
        ${e.map((o,d)=>x`<path d=${o} style="fill:${a.segments[d].opacity?a.segments[d].fill:"transparent"}"></path>`)}
      </g>

      ${e.map((o,d)=>x`<path
          class="segment"
          data-picked=${String(a.picked===d)}
          data-divisible=${String(a.divisible)}
          d=${o}
          style="fill:${a.segments[d].fill};opacity:${a.segments[d].opacity}"
          @click=${a.divisible?()=>r.segment(d):r.ring}
        ></path>`)}

      <circle cx=${j} cy=${B} r="79" fill="url(#top)"></circle>
      <circle cx=${j} cy=${B} r="79" fill="none" stroke="var(--el-edge)" stroke-width="1"></circle>

      ${a.lux?x`<text
            class="lux"
            x=${j}
            y=${B+5}
            text-anchor="middle"
            style="--lit:${a.lux.lit}"
          >${Math.round(a.lux.value)}<tspan class="unit" dx="3.5">lx</tspan></text>`:""}


      ${i?yt(j,B-46,x`<path d="M-4.5 0h9M0 -4.5v9"></path>`,"Volume up",()=>r.volume(1)):""}
      ${s?x`<g
            class="btn"
            data-lit=${String(a.holding)}
            transform="translate(${j+46} ${B})"
            role="button"
            tabindex="0"
            aria-label=${a.holding?"Wake the second assistant":"Wake"}
            @pointerdown=${()=>r.action("down")}
            @pointerup=${()=>r.action("up")}
            @pointerleave=${()=>r.action("cancel")}
            @pointercancel=${()=>r.action("cancel")}
          >
            <circle class="face" cx="0" cy="0" r="13"></circle>
            <g class="glyph"><circle cx="0" cy="0" r="4.5"></circle></g>
          </g>`:""}
      ${i?yt(j,B+46,x`<path d="M-4.5 0h9"></path>`,"Volume down",()=>r.volume(-1)):""}
      ${n?yt(j-46,B,rs(a.muted),a.muted?"Microphone muted":"Microphone live",r.mute,a.muted):""}
    </svg>
  `}function yt(a,r,e,t,i,s=!1){return x`<g class="btn" data-lit=${String(s)} transform="translate(${a} ${r})"
    role="button" tabindex="0" aria-label=${t} @click=${i}>
    <circle class="face" cx="0" cy="0" r="13"></circle>
    <g class="glyph">${e}</g>
  </g>`}function rs(a){return x`
    <path d="M-2.6 -5.2a2.6 2.6 0 0 1 5.2 0v4a2.6 2.6 0 0 1-5.2 0z"></path>
    <path d="M-4.6 -0.6a4.6 4.6 0 0 0 9.2 0"></path>
    <path d="M0 3.8v2.6"></path>
    ${a?x`<path d="M-6.4 6.4L6.4 -6.4"></path>`:ss()}
  `}function ss(){return x``}function as(a,r,e,t){let i=($,A)=>{let K=A*Math.PI/180;return[(j+$*Math.cos(K)).toFixed(2),(B+$*Math.sin(K)).toFixed(2)]},[s,n]=i(a,e),[o,d]=i(a,t),[h,f]=i(r,t),[y,w]=i(r,e);return`M${s} ${n}A${a} ${a} 0 0 1 ${o} ${d}L${h} ${f}A${r} ${r} 0 0 0 ${y} ${w}Z`}var xt=new Map;function ai(a){return xt.get(a)}var ns=6e4,os=6e3,si=new Map,vt=new Map;function ni(a,r){let e=si.get(r);if(e&&Date.now()-e.at<ns)return Promise.resolve(e.ids);let t=vt.get(r);if(t)return t;let i=cs(ls(a,r),os).catch(()=>new Set).then(s=>(si.set(r,{at:Date.now(),ids:s}),s)).finally(()=>vt.delete(r));return vt.set(r,i),i}async function ls(a,r){let t=(await a.callService("esphome",r,{},void 0,!0,!0))?.response;return t?.version===1&&Array.isArray(t.ids)?new Set(t.ids):new Set}function cs(a,r){return new Promise((e,t)=>{let i=setTimeout(()=>t(new Error("timeout")),r);a.then(s=>{clearTimeout(i),e(s)},s=>{clearTimeout(i),t(s)})})}function X(a,r,e){let i=`${r.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"")}_${e}`;return a?.services?.esphome?.[i]?i:void 0}async function oi(a,r,e){let t=xt.get(e);if(t)return t;let i=[],s="audio/wav",n=1;for(let d=0;d<Math.min(n,64);d++){let h=await ds(a,r,e,d);if(!h)return null;n=h.pages||1,s=h.mime||s,i.push(ps(h.data))}let o=URL.createObjectURL(new Blob(i,{type:s}));return xt.set(e,o),o}async function ds(a,r,e,t){try{let s=(await a.callService("esphome",r,{id:e,page:t},void 0,!0,!0))?.response;return s?.version===1&&typeof s.data=="string"?s:null}catch{return null}}function ps(a){let r=atob(a),e=new Uint8Array(r.length);for(let t=0;t<r.length;t++)e[t]=r.charCodeAt(t);return e}var li=`ha-dialog[width=large]{--mdc-dialog-min-width: min(92vw, 960px);--mdc-dialog-max-width: 92vw}.sheet:fullscreen{display:flex;flex-direction:column;box-sizing:border-box;padding:16px;background:#000;color:#fff}.sheet:fullscreen .head{display:none}.sheet:fullscreen .stage{flex:1 1 auto;min-height:0;aspect-ratio:auto;border-radius:0}.sheet:fullscreen .controls{margin-top:16px}.head{display:flex;align-items:center;gap:14px;margin-bottom:16px}.crest{width:44px;height:44px;flex:0 0 auto;display:grid;place-items:center;border-radius:14px;background:color-mix(in srgb,var(--primary-color) 16%,transparent)}.crest ha-icon{--mdc-icon-size: 24px;color:var(--primary-color);display:flex}.titles{flex:1 1 auto;min-width:0}.title{font-size:1.2em;font-weight:500}.subtitle{color:var(--secondary-text-color)}.stage{position:relative;border-radius:16px;overflow:hidden;background:#000;aspect-ratio:16 / 9}.stage[data-video=false]{aspect-ratio:auto;height:0}#far{width:100%;height:100%;object-fit:contain}#near{position:absolute;right:12px;bottom:12px;width:28%;border-radius:10px;border:2px solid rgba(255,255,255,.6);transform:scaleX(-1)}.controls{display:flex;justify-content:center;gap:18px;margin-top:20px}.round{display:flex;align-items:center;gap:8px;min-width:56px;height:56px;padding:0 18px;justify-content:center;border:none;border-radius:28px;cursor:pointer;color:var(--primary-text-color);background:var(--secondary-background-color);font:inherit}.round ha-icon{--mdc-icon-size: 26px;display:flex}.round[data-on=true]{color:var(--text-primary-color, #fff);background:var(--warning-color, #ff9800)}.round.go{color:var(--text-primary-color, #fff);background:var(--success-color, #43a047)}.round.stop{color:var(--text-primary-color, #fff);background:var(--error-color, #db4437)}
`;var us=3e3,ms={hangup:"Call ended",declined:"Declined",busy:"Busy",unanswered:"No answer",refused:"Not taking calls",unavailable:"Not taking calls",failed:"Call failed",dropped:"Connection lost"};function fs(a){return a.iceGatheringState==="complete"?Promise.resolve():new Promise(r=>{let e=window.setTimeout(r,us);a.addEventListener("icegatheringstatechange",()=>{a.iceGatheringState==="complete"&&(clearTimeout(e),r())})})}function gs(a){let r=RTCRtpReceiver.getCapabilities("video")?.codecs??[],e=r.filter(t=>t.mimeType==="video/H264");e.length&&a.setCodecPreferences&&a.setCodecPreferences([...e,...r.filter(t=>t.mimeType!=="video/H264")])}var S=class extends g{constructor(){super(...arguments);this.deviceId="";this.name="";this.camera=!1;this.phase="choose";this.reason="";this.video=!1;this.muted=!1;this.blind=!1;this.full=!1;this.resized=()=>{this.full=!!this.sheet&&this.shadowRoot?.fullscreenElement===this.sheet}}connectedCallback(){super.connectedCallback(),document.addEventListener("fullscreenchange",this.resized)}disconnectedCallback(){document.removeEventListener("fullscreenchange",this.resized),this.full&&document.exitFullscreen(),this.hangUp(),super.disconnectedCallback()}async start(e){this.video=e,this.phase="calling",this.reason="";try{this.local=await navigator.mediaDevices.getUserMedia({audio:!0,video:e});let t=new RTCPeerConnection;this.pc=t,this.remote=new MediaStream,t.ontrack=n=>{this.remote?.addTrack(n.track),this.attach()},t.onconnectionstatechange=()=>{t.connectionState==="failed"&&this.ended("dropped")};for(let n of this.local.getTracks())t.addTrack(n,this.local);let i=t.getTransceivers().find(n=>n.sender.track?.kind==="video");if(i&&gs(i),!e&&this.camera&&t.addTransceiver("video",{direction:"recvonly"}),await t.setLocalDescription(await t.createOffer()),await fs(t),this.phase!=="calling"||!this.hass.connection)return;let s=this.local.getVideoTracks()[0]?.getSettings();this.unsubscribe=await this.hass.connection.subscribeMessage(n=>void this.heard(n),{type:"echolocal/call",device_id:this.deviceId,sdp:t.localDescription?.sdp??"",video:e,width:s?.width??0,height:s?.height??0}),this.attach()}catch(t){console.warn("echolocal call failed",t),this.ended("failed")}}async heard(e){switch(e.type){case"ringing":this.phase="ringing";return;case"answer":try{await this.pc?.setRemoteDescription({type:"answer",sdp:e.sdp}),this.phase="talking",this.attach()}catch(t){console.warn("echolocal call answer rejected",t),this.ended("failed")}return;case"end":this.ended(e.reason||"hangup")}}attach(){this.updateComplete.then(()=>{this.far&&this.remote&&this.far.srcObject!==this.remote&&(this.far.srcObject=this.remote),this.near&&this.local&&this.near.srcObject!==this.local&&(this.near.srcObject=this.local)})}release(){this.pc?.close(),this.pc=void 0;for(let e of this.local?.getTracks()??[])e.stop();this.local=void 0,this.remote=void 0}ended(e){this.unsubscribe=void 0,this.release(),this.reason=e,this.phase="ended"}hangUp(){let e=this.unsubscribe;this.unsubscribe=void 0,e?.(),this.release()}toggleMute(){this.muted=!this.muted;for(let e of this.local?.getAudioTracks()??[])e.enabled=!this.muted}toggleCamera(){this.blind=!this.blind;for(let e of this.local?.getVideoTracks()??[])e.enabled=!this.blind}toggleFull(){if(this.full){document.exitFullscreen();return}this.sheet?.requestFullscreen().catch(e=>console.warn("echolocal fullscreen refused",e))}close(){this.full&&document.exitFullscreen(),this.hangUp(),this.dispatchEvent(new CustomEvent("closed",{bubbles:!0,composed:!0}))}status(){switch(this.phase){case"calling":return"Calling\u2026";case"ringing":return"Ringing\u2026";case"talking":return this.video?"Video call":"On a call";case"ended":return ms[this.reason]??"Call ended"}return""}render(){let e=this.phase==="calling"||this.phase==="ringing"||this.phase==="talking";return l`
      <ha-dialog open hideActions width=${this.video?"large":"medium"} @closed=${this.close}>
        <div class="sheet">
          <div class="head">
            <div class="crest"><ha-icon icon="mdi:phone"></ha-icon></div>
            <div class="titles">
              <div class="title">${this.name}</div>
              <div class="subtitle">${this.status()}</div>
            </div>
          </div>

          ${e?l`<div
                class="stage"
                data-video=${String(this.camera||this.video)}
                @dblclick=${this.video?this.toggleFull:p}
              >
                <video id="far" autoplay playsinline></video>
                ${this.video?l`<video id="near" autoplay playsinline muted></video>`:p}
              </div>`:p}

          <div class="controls">
            ${this.phase==="choose"||this.phase==="ended"?l`
                  <button class="round go" @click=${()=>this.start(!1)}>
                    <ha-icon icon="mdi:phone"></ha-icon><span>Call</span>
                  </button>
                  ${this.camera?l`<button class="round go" @click=${()=>this.start(!0)}>
                        <ha-icon icon="mdi:video"></ha-icon><span>Video</span>
                      </button>`:p}
                `:l`
                  <button class="round" data-on=${String(this.muted)} @click=${this.toggleMute}>
                    <ha-icon icon=${this.muted?"mdi:microphone-off":"mdi:microphone"}></ha-icon>
                  </button>
                  ${this.video?l`<button
                        class="round"
                        data-on=${String(this.blind)}
                        @click=${this.toggleCamera}
                      >
                        <ha-icon icon=${this.blind?"mdi:video-off":"mdi:video"}></ha-icon>
                      </button>`:p}
                  ${this.video?l`<button class="round" @click=${this.toggleFull}>
                        <ha-icon icon=${this.full?"mdi:fullscreen-exit":"mdi:fullscreen"}></ha-icon>
                      </button>`:p}
                  <button class="round stop" @click=${this.close}>
                    <ha-icon icon="mdi:phone-hangup"></ha-icon>
                  </button>
                `}
          </div>
        </div>
      </ha-dialog>
    `}};S.styles=b(li),c([m({attribute:!1})],S.prototype,"hass",2),c([m()],S.prototype,"deviceId",2),c([m()],S.prototype,"name",2),c([m({type:Boolean})],S.prototype,"camera",2),c([u()],S.prototype,"phase",2),c([u()],S.prototype,"reason",2),c([u()],S.prototype,"video",2),c([u()],S.prototype,"muted",2),c([u()],S.prototype,"blind",2),c([u()],S.prototype,"full",2),c([We("#far")],S.prototype,"far",2),c([We("#near")],S.prototype,"near",2),c([We(".sheet")],S.prototype,"sheet",2),S=c([v("echolocal-call")],S);var ci=`:host{display:block}ha-card{padding:16px}.frame{position:relative;display:grid;grid-template-columns:minmax(0,1fr) auto;grid-template-rows:auto auto;gap:12px;align-items:center}text.lux{fill:color-mix(in srgb,var(--el-warm) calc(var(--lit) * 100%),var(--el-read));filter:drop-shadow(0 0 calc(var(--lit) * 5px) color-mix(in srgb,var(--el-warm) calc(var(--lit) * 65%),transparent));font-family:var(--ha-font-family-body, inherit);font-size:15px;font-weight:500;letter-spacing:-.3px;pointer-events:none}text.lux .unit{font-size:9px;font-weight:400;fill:var(--el-glyph)}.art{grid-area:1 / 1;min-width:0;width:100%;max-width:240px;height:240px;margin:0 auto;--el-shell: #4a4d52;--el-top: #3c3f44;--el-top-high: #5a5e64;--el-edge: rgba(255, 255, 255, .13);--el-ring-off: rgba(255, 255, 255, .1);--el-glyph: rgba(255, 255, 255, .62);--el-btn: rgba(255, 255, 255, .07);--el-read: rgba(255, 255, 255, .78);--el-warm: #ffc061}.art[data-shell=black]{--el-shell: #24262a;--el-top: #191b1e;--el-top-high: #2e3237;--el-edge: rgba(255, 255, 255, .09);--el-ring-off: rgba(255, 255, 255, .07);--el-glyph: rgba(255, 255, 255, .55);--el-btn: rgba(255, 255, 255, .05);--el-read: rgba(255, 255, 255, .72);--el-warm: #ffc061}.art[data-shell=white]{--el-shell: #e7e4dd;--el-top: #f2f0ea;--el-top-high: #ffffff;--el-edge: rgba(0, 0, 0, .1);--el-ring-off: rgba(0, 0, 0, .09);--el-glyph: rgba(0, 0, 0, .45);--el-btn: rgba(0, 0, 0, .04);--el-read: rgba(0, 0, 0, .72);--el-warm: #e07b00}.art[data-shell=charcoal]{--el-shell: #2b2d31;--el-glass: #08090b;--el-edge: rgba(255, 255, 255, .1);--el-glyph: rgba(255, 255, 255, .58);--el-btn: #3a3d42;--el-lens: #1b222c;--el-shutter: #5b5e63}.frame[data-shape=panel] .art svg{display:block;width:100%;height:auto}.frame[data-shape=show] .side,.frame[data-shape=panel] .side{display:grid;grid-template-columns:repeat(2,40px);align-content:center}.screen{cursor:pointer}.screen text{font-family:var(--ha-font-family-body, inherit);pointer-events:none}.screen .clock{font-weight:500;font-variant-numeric:tabular-nums;letter-spacing:-.5px}.screen .line{font-size:6.5px}.bar{fill:#38a0ff;opacity:0;transition:opacity .3s ease}.art[data-activity=listening] .bar,.art[data-activity=processing] .bar,.art[data-activity=responding] .bar{opacity:1}.art[data-activity=processing] .bar{animation:breathe 1.2s ease-in-out infinite}.bar[data-muted=true]{fill:var(--error-color, #db4437);opacity:1;animation:none}.lens{cursor:pointer}.lens circle:not(.hit),.lens rect{fill:var(--el-lens);stroke:#ffffff1f;stroke-width:.5}.lens[data-covered=true] circle:not(.hit),.lens[data-covered=true] rect{fill:var(--el-shutter)}.key .glyph path{stroke-width:1.1}svg{width:100%;height:100%;display:block}.segment{transition:fill .4s ease,opacity .4s ease}.segment[data-divisible=true]{cursor:pointer}.segment[data-picked=true]{stroke:var(--primary-text-color);stroke-width:2}.plain{padding:7px 12px;border:1px solid color-mix(in srgb,var(--primary-color) 45%,transparent);border-radius:10px;background:color-mix(in srgb,var(--primary-color) 12%,transparent);color:var(--primary-color);font:inherit;font-size:.82rem;cursor:pointer;white-space:nowrap}.plain:hover{background:color-mix(in srgb,var(--primary-color) 20%,transparent)}.plain.quiet{border-color:var(--divider-color);background:none;color:var(--secondary-text-color)}.plain.quiet:hover{background:var(--secondary-background-color)}.palette{flex-direction:column;align-items:stretch;gap:10px}.palette .top{display:flex;align-items:center;justify-content:space-between;gap:12px}.palette .name{white-space:nowrap}.palette .swatches{display:grid;grid-template-columns:repeat(auto-fit,minmax(24px,1fr));gap:6px}.palette .swatch{aspect-ratio:1;min-width:0;padding:0;border:2px solid transparent;border-radius:8px;cursor:pointer}.palette .swatch:hover{border-color:var(--primary-text-color)}.palette .sq{width:30px;height:30px;border-radius:8px}.palette .sq ha-icon{--mdc-icon-size: 18px}.halo{transition:opacity .4s ease}.art[data-activity=listening] .halo{animation:breathe 2s ease-in-out infinite}@keyframes breathe{0%,to{opacity:.35}50%{opacity:.8}}.hit{cursor:pointer;pointer-events:stroke}.btn{cursor:pointer}.face{fill:var(--el-btn)}.btn .glyph path{stroke:var(--el-glyph);stroke-width:1.6;fill:none;stroke-linecap:round}.btn .glyph circle{fill:var(--el-glyph)}.btn:hover .face{fill:var(--el-edge)}.btn[data-lit=true] .glyph path{stroke:var(--error-color, #db4437)}.btn[data-lit=true] .face{fill:color-mix(in srgb,var(--error-color, #db4437) 22%,transparent)}.side{grid-area:1 / 2;display:flex;flex-direction:column;gap:8px}.foot{grid-area:2 / 1 / 3 / 3;display:flex;align-items:stretch;justify-content:space-between;gap:12px;border-top:1px solid var(--divider-color);padding-top:12px}.label{display:flex;flex-direction:column;justify-content:center;min-width:0}.name{font-size:1.05rem;font-weight:500;color:var(--primary-text-color)}.status{font-size:.8rem;color:var(--secondary-text-color)}.tail{display:flex;gap:8px;padding-left:12px;border-left:1px solid var(--divider-color)}.foot[data-label=false]{justify-content:flex-end}.foot[data-label=false] .tail{padding-left:0;border-left:none}.sq{position:relative;width:40px;height:40px;flex:0 0 auto;display:grid;place-items:center;padding:0;border:1px solid var(--divider-color);border-radius:10px;background:none;cursor:pointer;color:inherit}.sq:hover{background:var(--secondary-background-color)}.sq ha-icon{--mdc-icon-size: 22px;color:var(--secondary-text-color);display:flex}.badge{position:absolute;right:3px;bottom:1px;font-size:.62rem;line-height:1;color:var(--secondary-text-color)}.missing{color:var(--secondary-text-color)}
`;var di=`:host{display:flex;gap:18px;align-items:center;padding:14px;border-radius:14px;background:color-mix(in srgb,var(--primary-text-color) 5%,transparent)}.dial{width:190px;flex:0 0 auto;touch-action:none}svg{width:100%;height:auto;display:block}.arc-bed{fill:none;stroke:color-mix(in srgb,var(--primary-text-color) 10%,transparent);stroke-width:9;stroke-linecap:round}.arc-live{fill:none;stroke:var(--primary-color);stroke-width:9;stroke-linecap:round;transition:stroke-dasharray .5s ease,stroke .3s ease}.arc-live[data-over=true]{stroke:var(--success-color, #43a047)}.notch{stroke:var(--primary-text-color);stroke-width:3;stroke-linecap:round;cursor:grab}.capsule{fill:color-mix(in srgb,var(--primary-text-color) 14%,transparent);transition:fill .3s ease}.capsule[data-on=true]{fill:var(--primary-color)}.beam{fill:color-mix(in srgb,var(--primary-color) 16%,transparent);stroke:color-mix(in srgb,var(--primary-color) 40%,transparent)}.spoke{stroke:color-mix(in srgb,var(--primary-color) 35%,transparent);stroke-width:1.2}.slash{stroke:var(--error-color, #db4437);stroke-width:3;stroke-linecap:round}.side{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:10px}.reading{display:flex;align-items:baseline;gap:6px}.now{font-size:1.9rem;font-weight:500;font-variant-numeric:tabular-nums;color:var(--primary-text-color);line-height:1}.unit{font-size:.8rem;color:var(--secondary-text-color)}.now.cut{color:var(--error-color, #db4437)}.caption{margin-left:auto;padding:4px 10px;border-radius:10px;font-size:.75rem;background:color-mix(in srgb,var(--primary-text-color) 7%,transparent);color:var(--secondary-text-color)}.caption[data-over=true]{background:color-mix(in srgb,var(--success-color, #43a047) 18%,transparent);color:var(--success-color, #43a047)}.modes{display:flex;flex-direction:column;gap:6px}.mode{display:flex;align-items:center;gap:10px;padding:8px 10px;border:1px solid transparent;border-radius:12px;background:color-mix(in srgb,var(--primary-text-color) 6%,transparent);color:var(--secondary-text-color);font:inherit;font-size:.85rem;cursor:pointer;text-align:left}.mode:hover{background:color-mix(in srgb,var(--primary-text-color) 11%,transparent)}.mode[data-on=true]{border-color:color-mix(in srgb,var(--primary-color) 45%,transparent);background:color-mix(in srgb,var(--primary-color) 15%,transparent);color:var(--primary-color)}.mode svg{width:26px;flex:0 0 auto}.gate{font-size:.78rem;color:var(--secondary-text-color)}.gate b{color:var(--primary-text-color);font-weight:500;font-variant-numeric:tabular-nums}
`;var pi=26,qe=135,Ve=270,T=100,C=100,Q=84,Ge=38,D=class extends g{constructor(){super(...arguments);this.level="";this.floor="";this.gate="";this.mode="";this.muted=!1;this.held=null;this.grab=e=>{let t=e.currentTarget;t.setPointerCapture(e.pointerId);let i=this.hass.states[this.gate]?.attributes??{},s=i.min??0,n=i.max??20,o=i.step??1,d=this.number(this.floor)??0,h=this.number(this.level)??0,f=Math.max(d+pi,h+3),y=A=>{let K=t.getBoundingClientRect(),Nr=A.clientX-K.left-K.width/2,Ir=A.clientY-K.top-K.height/2,nt=Math.atan2(Ir,Nr)*180/Math.PI-qe;for(;nt<0;)nt+=360;let Ur=wt(Math.min(nt,Ve)/Ve);return Math.max(s,Math.min(n,Math.round(Ur*(f-d)/o)*o))},w=A=>{this.held=y(A)},$=A=>{t.removeEventListener("pointermove",w),t.removeEventListener("pointerup",$),t.removeEventListener("pointercancel",$);let K=y(A);this.held=null,this.hass.callService("number","set_value",{entity_id:this.gate,value:K})};t.addEventListener("pointermove",w),t.addEventListener("pointerup",$),t.addEventListener("pointercancel",$),this.held=y(e)}}render(){let e=this.number(this.level),t=this.number(this.floor),i=this.held??this.number(this.gate);if(e===null||t===null||i===null)return p;let s=this.hass.states[this.mode],n=hi(s?.state),o=Math.max(t+pi,e+3),d=wt((e-t)/(o-t)),h=wt(i/(o-t)),f=e>=t+i&&!this.muted;return l`
      <div class="dial" @pointerdown=${this.grab}>
        <svg viewBox="0 0 200 200" role="img" aria-label="Microphone array">
          <path class="arc-bed" d=${ui()} pathLength="100"></path>
          ${this.muted?p:x`<path
                class="arc-live"
                data-over=${String(f)}
                d=${ui()}
                pathLength="100"
                stroke-dasharray=${`${d*100} 100`}
              ></path>`}
          ${this.muted?p:ks(h)} ${n==="beam"?$s():p}
          ${n==="sum"?ws():p} ${vs(n,this.muted)}
          ${this.muted?x`<path class="slash" d="M${T-30} ${C+30}L${T+30} ${C-30}"></path>`:p}
        </svg>
      </div>

      <div class="side">
        <div class="reading">
          ${this.muted?l`<span class="now cut">Cut</span>`:l`<span class="now">${e.toFixed(1)}</span><span class="unit">dB</span>
                <span class="caption" data-over=${String(f)}>
                  ${f?"Over the gate":"Quiet"}
                </span>`}
        </div>

        <div class="modes">
          ${(s?.attributes.options??[]).map(y=>l`<button
              class="mode"
              data-on=${String(y===s?.state)}
              @click=${()=>this.hass.callService("select","select_option",{entity_id:this.mode,option:y})}
            >
              <svg viewBox="0 0 40 40">${xs(hi(y))}</svg>
              <span>${y}</span>
            </button>`)}
        </div>

        <div class="gate">Gate <b>${i} dB</b> over a floor of <b>${t.toFixed(0)} dB</b></div>
      </div>
    `}number(e){let t=Number(this.hass?.states?.[e]?.state);return Number.isFinite(t)?t:null}};D.styles=b(di),c([m({attribute:!1})],D.prototype,"hass",2),c([m()],D.prototype,"level",2),c([m()],D.prototype,"floor",2),c([m()],D.prototype,"gate",2),c([m()],D.prototype,"mode",2),c([m({type:Boolean})],D.prototype,"muted",2),c([u()],D.prototype,"held",2),D=c([v("echolocal-array")],D);function hi(a){let r=(a??"").toLowerCase();return r.includes("center")||r.includes("centre")?"one":r.includes("beam")?"beam":"sum"}function vs(a,r){return[[T,C],...Array.from({length:6},(t,i)=>{let s=(-90+i*60)*Math.PI/180;return[T+Ge*Math.cos(s),C+Ge*Math.sin(s)]})].map(([t,i],s)=>x`<circle class="capsule" data-on=${String(!r&&(a!=="one"||s===0))}
      cx=${t.toFixed(1)} cy=${i.toFixed(1)} r=${s===0?7:5.5}></circle>`)}function xs(a){let r=[[20,20],...Array.from({length:6},(e,t)=>{let i=(-90+t*60)*Math.PI/180;return[20+12*Math.cos(i),20+12*Math.sin(i)]})];return x`
    ${a==="beam"?x`<path class="beam" d="M20 20C9 11 13 1 20 1C27 1 31 11 20 20Z"></path>`:p}
    ${r.map(([e,t],i)=>x`<circle class="capsule" data-on=${String(a!=="one"||i===0)}
          cx=${e.toFixed(1)} cy=${t.toFixed(1)} r=${i===0?3.4:2.6}></circle>`)}`}function ws(){return Array.from({length:6},(a,r)=>{let e=(-90+r*60)*Math.PI/180;return x`<line class="spoke" x1=${T} y1=${C}
      x2=${(T+Ge*Math.cos(e)).toFixed(1)} y2=${(C+Ge*Math.sin(e)).toFixed(1)}></line>`})}function $s(){return x`<path class="beam" d="M${T} ${C}C${T-34} ${C-30} ${T-24} ${C-66} ${T} ${C-66}C${T+24} ${C-66} ${T+34} ${C-30} ${T} ${C}Z"></path>`}function ui(){let a=qe*Math.PI/180,r=(qe+Ve)*Math.PI/180;return`M${(T+Q*Math.cos(a)).toFixed(2)} ${(C+Q*Math.sin(a)).toFixed(2)}
    A${Q} ${Q} 0 1 1 ${(T+Q*Math.cos(r)).toFixed(2)} ${(C+Q*Math.sin(r)).toFixed(2)}`}function ks(a){let r=(qe+a*Ve)*Math.PI/180,e=Q-8,t=Q+8;return x`<line class="notch"
    x1=${(T+e*Math.cos(r)).toFixed(1)} y1=${(C+e*Math.sin(r)).toFixed(1)}
    x2=${(T+t*Math.cos(r)).toFixed(1)} y2=${(C+t*Math.sin(r)).toFixed(1)}></line>`}function wt(a){return Math.max(0,Math.min(1,a))}var mi=`:host{display:inline-flex;flex:0 0 auto;vertical-align:middle}button{width:15px;height:15px;display:grid;place-items:center;padding:0;border:1px solid color-mix(in srgb,var(--primary-text-color) 26%,transparent);border-radius:50%;background:none;color:var(--secondary-text-color);font:inherit;font-size:9px;font-weight:700;line-height:1;cursor:help;opacity:.65}button:hover{opacity:1;color:var(--primary-color);border-color:var(--primary-color)}ha-tooltip{--max-width: min(300px, 70vw);--ha-tooltip-font-size: .79rem;--ha-tooltip-font-weight: 400;--ha-tooltip-line-height: 1.45;--ha-tooltip-padding: 11px 13px;--ha-tooltip-border-radius: 11px}
`;var Ss=0,me=class extends g{constructor(){super(...arguments);this.text="";this.anchor=`ask-${++Ss}`}render(){return this.text?l`
      <button id=${this.anchor} aria-label="What this does" @click=${this.swallow}>?</button>
      <ha-tooltip for=${this.anchor} trigger="click" placement="top">${this.text}</ha-tooltip>
    `:p}swallow(e){e.stopPropagation(),e.preventDefault()}};me.styles=b(mi),c([m()],me.prototype,"text",2),me=c([v("echolocal-bubble")],me);var fi=`.sheet{transition:width .2s ease}.head{display:flex;align-items:center;gap:14px;margin-bottom:16px}.crest{width:44px;height:44px;flex:0 0 auto;display:grid;place-items:center;border-radius:14px;background:color-mix(in srgb,var(--primary-color) 16%,transparent)}.crest ha-icon{--mdc-icon-size: 24px;color:var(--primary-color);display:flex}.titles{flex:1 1 auto;min-width:0}.crown{display:flex;align-items:center;gap:12px;flex:0 0 auto}.crown ha-control-switch{width:52px;--control-switch-thickness: 30px;--control-switch-border-radius: 15px}.crown ha-control-switch.warn{--control-switch-on-color: var(--error-color, #db4437)}.crown .lamp{max-width:168px;--control-select-thickness: 30px;--control-select-border-radius: 15px}.crown ha-icon-button{color:var(--primary-color)}.crown.picture{margin-left:auto;padding:0;border:none;background:none;cursor:pointer}.crown.picture img{display:block;width:160px;aspect-ratio:16 / 9;object-fit:cover;border-radius:8px;background:var(--secondary-background-color)}.title{display:flex;align-items:center;gap:8px;font-size:1.25rem;font-weight:500;color:var(--primary-text-color);line-height:1.2}.explained{position:relative}.explained>:not(echolocal-bubble){padding-right:21px}.explained>echolocal-bubble.corner{position:absolute;top:1px;right:0;z-index:3}.subtitle{font-size:.8rem;color:var(--secondary-text-color)}.hero{margin-bottom:16px}.groups{columns:2 300px;column-gap:24px}.group{break-inside:avoid;overflow:hidden;margin-bottom:14px}.section{display:flex;align-items:center;gap:8px;margin:0 0 8px 2px;font-size:.7rem;font-weight:600;text-transform:uppercase;letter-spacing:.09em;color:var(--secondary-text-color)}.section:before{content:"";width:3px;height:12px;border-radius:2px;background:var(--primary-color);opacity:.6}.tile{display:flex;flex-direction:column;gap:9px;padding:10px 14px;margin-bottom:5px;border-radius:14px;background:color-mix(in srgb,var(--primary-text-color) 5%,transparent)}.top{display:flex;align-items:center;gap:12px}.icon{width:32px;height:32px;flex:0 0 auto;display:grid;place-items:center;border-radius:10px;background:color-mix(in srgb,var(--primary-text-color) 7%,transparent);transition:background .2s ease}.icon ha-icon{--mdc-icon-size: 19px;color:var(--secondary-text-color);display:flex;transition:color .2s ease}.tile[data-active=true] .icon{background:color-mix(in srgb,var(--primary-color) 20%,transparent)}.tile[data-active=true] .icon ha-icon{color:var(--primary-color)}.tile[data-alert=true] .icon{background:color-mix(in srgb,var(--error-color, #db4437) 20%,transparent)}.tile[data-alert=true] .icon ha-icon{color:var(--error-color, #db4437)}.named{flex:1 1 auto;min-width:0;display:flex;align-items:center;gap:7px}.name{flex:0 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--primary-text-color)}.trail{flex:0 0 auto;display:flex;align-items:center;gap:6px}.trail ha-control-switch{width:44px;--control-switch-thickness: 26px;--control-switch-border-radius: 13px}ha-control-select{--control-select-thickness: 34px;white-space:nowrap}.trail ha-control-select-menu{min-width:0;max-width:210px;--control-select-menu-height: 34px}ha-control-slider{--control-slider-thickness: 34px}.reading{background:none;border:none;padding:0;font:inherit;font-size:1.15rem;font-weight:500;font-variant-numeric:tabular-nums;color:var(--primary-text-color);cursor:pointer}.reading:hover{color:var(--primary-color)}.unit{font-size:.78rem;color:var(--secondary-text-color)}.reading.version{max-width:18ch;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:.85rem;font-weight:400}.offer{display:flex;align-items:center;gap:10px}.note{flex:1 1 auto;min-width:0;font-size:.78rem;color:var(--secondary-text-color);word-break:break-all}.lines{padding:0;border:none;background:none;font:inherit;font-size:.82rem;font-variant-numeric:tabular-nums;color:var(--primary-text-color);text-align:left;cursor:pointer;line-height:1.5;overflow-wrap:anywhere}.lines:hover{color:var(--primary-color)}.empty{color:var(--secondary-text-color)}
`;var fe=`.pills{display:flex;flex-wrap:wrap;gap:5px}.pill{padding:6px 11px;border:1px solid transparent;border-radius:10px;background:color-mix(in srgb,var(--primary-text-color) 6%,transparent);color:var(--secondary-text-color);font:inherit;font-size:.8rem;cursor:pointer;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.pill:hover{background:color-mix(in srgb,var(--primary-text-color) 12%,transparent)}.pill[data-on=true]{border-color:color-mix(in srgb,var(--primary-color) 45%,transparent);background:color-mix(in srgb,var(--primary-color) 15%,transparent);color:var(--primary-color)}.pill:disabled{opacity:.4;cursor:default}
`;var gi=`:host{display:block;padding:14px;border-radius:14px;background:color-mix(in srgb,var(--primary-text-color) 5%,transparent)}.dim{display:flex;align-items:center;gap:12px;padding-bottom:12px;margin-bottom:12px;border-bottom:1px solid color-mix(in srgb,var(--primary-text-color) 10%,transparent);font-size:.85rem;color:var(--secondary-text-color)}.dim b{font-variant-numeric:tabular-nums;color:var(--primary-text-color);font-weight:500}.dim ha-control-slider{flex:1 1 auto;min-width:0;--control-slider-thickness: 28px}.hue{display:flex;align-items:center;gap:12px;padding-bottom:12px;margin-bottom:12px;border-bottom:1px solid color-mix(in srgb,var(--primary-text-color) 10%,transparent);font-size:.85rem;color:var(--secondary-text-color)}.swatches{display:flex;flex-wrap:wrap;gap:6px}.swatch{width:24px;height:24px;padding:0;border:2px solid transparent;border-radius:50%;cursor:pointer}.swatch[data-on=true]{border-color:var(--primary-text-color)}.when{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:6px;margin-bottom:12px}.situation{display:flex;align-items:center;gap:9px;padding:9px 11px;border:1px solid transparent;border-radius:12px;background:color-mix(in srgb,var(--primary-text-color) 6%,transparent);color:var(--secondary-text-color);font:inherit;cursor:pointer;text-align:left;min-width:0}.situation:hover{background:color-mix(in srgb,var(--primary-text-color) 12%,transparent)}.situation[data-on=true]{border-color:color-mix(in srgb,var(--primary-color) 45%,transparent);background:color-mix(in srgb,var(--primary-color) 14%,transparent)}.situation ha-icon{--mdc-icon-size: 19px;flex:0 0 auto;display:flex}.situation .text{min-width:0}.situation .label{font-size:.72rem;text-transform:uppercase;letter-spacing:.06em}.situation .shows{font-size:.88rem;color:var(--primary-text-color);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.situation[data-on=true] .shows{color:var(--primary-color)}.caption{margin-bottom:8px;font-size:.7rem;font-weight:600;text-transform:uppercase;letter-spacing:.09em;color:var(--secondary-text-color)}.pills{display:grid;grid-template-columns:repeat(auto-fill,minmax(104px,1fr))}
`;var Ke=[["White",[255,255,255]],["Warm",[255,190,120]],["Red",[255,40,40]],["Orange",[255,130,20]],["Yellow",[250,230,60]],["Green",[60,220,90]],["Teal",[40,220,200]],["Blue",[60,140,255]],["Violet",[150,90,255]],["Pink",[255,90,200]]];function Ms(a,r){return Array.isArray(a)&&r.every((e,t)=>a[t]===e)}var N=class extends g{constructor(){super(...arguments);this.light="";this.muted="";this.failure="";this.room="";this.target="rest"}render(){let e=this.hass.states[this.light];if(!e)return p;let t=this.situations(),i=t.find(n=>n.key===this.target)??t[0],s=e.attributes.brightness??255;return l`
      <div class="dim">
        <span>Brightness</span>
        <ha-control-slider
          min="1"
          max="255"
          .value=${s}
          .disabled=${e.state!=="on"}
          @value-changed=${n=>this.hass.callService("light","turn_on",{entity_id:this.light,brightness:n.detail.value})}
        ></ha-control-slider>
        <b>${Math.round(s/255*100)}%</b>
      </div>

      <div class="hue">
        <span>Color</span>
        <div class="swatches">
          ${Ke.map(([n,o])=>l`<button
              class="swatch"
              title=${n}
              aria-label=${n}
              data-on=${String(Ms(e.attributes.rgb_color,o))}
              style=${`background:rgb(${o.join(",")})`}
              @click=${()=>this.hass.callService("light","turn_on",{entity_id:this.light,rgb_color:o})}
            ></button>`)}
        </div>
      </div>

      <div class="when">
        ${t.map(n=>l`<button
            class="situation"
            data-on=${String(n.key===i.key)}
            @click=${()=>this.target=n.key}
          >
            <ha-icon .icon=${n.icon}></ha-icon>
            <div class="text">
              <div class="label">${n.label}</div>
              <div class="shows">${this.showing(n)||"\u2014"}</div>
            </div>
          </button>`)}
      </div>

      <div class="caption">${i.label} shows</div>
      <div class="pills">
        ${this.options(i).map(n=>l`<button
            class="pill"
            data-on=${String(n===this.showing(i))}
            @click=${()=>this.choose(i,n)}
          >
            ${n}
          </button>`)}
      </div>
    `}situations(){return[{key:"rest",label:"At rest",icon:"mdi:record-circle-outline"},{key:"muted",label:"Muted",icon:"mdi:microphone-off",entity:this.muted},{key:"failure",label:"On failure",icon:"mdi:alert-circle-outline",entity:this.failure},{key:"room",label:"Follows the room",icon:"mdi:motion-sensor",entity:this.room}].filter(t=>t.key==="rest"||t.entity&&this.hass.states[t.entity])}showing(e){if(e.entity)return this.hass.states[e.entity]?.state??"";let t=this.hass.states[this.light];return t?.state!=="on"?"":t.attributes.effect??""}options(e){return(e.entity?this.hass.states[e.entity]?.attributes.options:this.hass.states[this.light]?.attributes.effect_list)??[]}choose(e,t){if(!e.entity){this.hass.callService("light","turn_on",{entity_id:this.light,effect:t});return}this.hass.callService("select","select_option",{entity_id:e.entity,option:t})}};N.styles=[b(fe),b(gi)],c([m({attribute:!1})],N.prototype,"hass",2),c([m()],N.prototype,"light",2),c([m()],N.prototype,"muted",2),c([m()],N.prototype,"failure",2),c([m()],N.prototype,"room",2),c([u()],N.prototype,"target",2),N=c([v("echolocal-appearance")],N);var Hs={mic_mute:"Cuts the microphones in hardware. The device cannot hear anything at all while this is on, including its wake word \u2014 it is a switch on the power to the capsules, not a software mute.",microphone_gain:"How much the capsules are amplified before anything else happens. Raise it in a large or quiet room; lower it if speech close to the device clips and comes out distorted.",microphone_mixing:"How the seven capsules are combined into the one channel the speech engine hears. Beamforming favours whichever direction someone is talking from and rejects the rest of the room; averaging treats every direction equally and is steadier when several people talk.",microphone_leveling:"Evens out loud and quiet talkers so a whisper across the room and a shout beside it arrive at similar volume. Helps transcription, and costs a little dynamic range.",microphone_cancel_echo:"Subtracts what the speaker is playing from what the microphones hear, so the device can be interrupted while it is talking and does not answer its own reply.",microphone_noise_reduction:"Takes the steady part of the room \u2014 a fan, traffic, air conditioning \u2014 out of what the microphones heard. Try turning it on in a room with background noise.",microphone_sensitivity:"How much louder than the room's background noise a sound has to be before the light ring and the on-screen listening animation react to it. Raise it if they react to the room itself; lower it if they miss quiet sounds.",room_level:"The loudest the room got since the last report, in decibels below full scale.",room_floor:"The room's background noise, which the device learns as it listens. It follows the room, so a fridge switching on raises it.",mute_led_brightness:"How bright the red ring is while the microphones are cut. Dim is enough to see in a dark room without lighting it up.",mute_sound:"What the device plays when the microphones are cut or restored. Mute tones fall for muting and rise for unmuting, so the two are told apart without looking; None mutes silently.",stop_word_sensitivity:"How sure the device has to be before it takes an interruption as the word stop. Lower it if saying stop over a reply does not land.",ring:"The whole ring, as one light. Turning it off leaves the device working normally and silent about it.",segment:"One of the twelve segments, addressable on its own. They ship switched off in Home Assistant because twelve extra lights in every list is rarely what anyone wants \u2014 enable one and it can be coloured individually from the card.",ring_muted:"What the ring does while the microphones are cut. Something visible is worth choosing: a muted device that looks identical to a listening one is how people end up talking to a device that cannot hear them.",failure_effect:"What the ring does when a turn fails \u2014 no network, no pipeline, nothing understood. Distinct from the normal colours on purpose.",room_reaction:"Lets the ring track how loud the room is while the device is listening, so somebody can see that it is hearing them before it answers.",headphones:"Sends audio out of the jack instead of the speaker. The speaker goes quiet while this is on.",noise_layer:"Plays a generated sound the device makes itself \u2014 rain, a fan, a brook. Nothing is streamed and nothing is stored: it is synthesised as it plays, so it never loops or runs out. Two layers can overlap, so rain over a fan is one choice in each.",media_on_turn:"What happens to music when someone says the wake word. Ducking drops the volume and keeps playing, which resumes on the same note; stopping does not.",media_duck_level:"How far the volume drops while the device is listening or talking. Far enough that the microphones are not fighting the music, not so far that the room goes silent.",cast_receiver:"Lets phones and browsers cast to the device.",youtube_live_delay:"How far behind live a YouTube live stream plays, in seconds.",youtube_sponsorblock:"SponsorBlock categories to skip in YouTube videos, separated by commas.",backlight:"How bright the screen is.",screen_mode:"Sets the brightness from the room's light.",drawer_edge:"Which edge of the screen the dock sits on.",idle_after:"How long the screen waits with nobody using it before the idle screen comes up.",poster_every:"How often the next photo comes up.",rtsp:"Serves the camera as an RTSP stream on the network.",camera_keyframe:"Seconds between full frames.",camera_banding:"Set to your mains frequency if lights flicker in the picture.",bluetooth_speaker:"Lets phones pair with the device and play through it.",voice_resampling:"How the reply's audio is resampled to what the speaker wants. Better quality costs a little more work on a device that has four small cores.",wake_word:"What this assistant listens for. The list is what the device has on disk plus whatever Home Assistant is offering from its custom_wake_words directory.",wake_threshold:"How sure the device has to be before it decides it heard its wake word. Lower it if it misses you; raise it if the television sets it off.",follow_up:"Keeps listening for a moment after a reply, so a second question needs no second wake word.",max_listen:"How long the device will wait for someone to finish talking before giving up on the turn.",max_think:"How long to wait for Home Assistant's pipeline to answer. Generous is usually right \u2014 a slow answer beats a turn that dies just before it arrives.",wake_effect:"What the ring does at this point in a turn. Cosmetic, but it is how somebody knows the device heard them.",thinking_effect:"What the ring does while Home Assistant works on the answer. Default leaves it as the ring effect, played backwards.",replying_effect:"What the ring does while the answer plays. Default leaves it as the ring effect, played backwards.",wake_tone:"A short sound at this point in a turn. Some people want the confirmation; some find it grating.",reply_buffer:"How much of a reply to collect before starting to play it. More is steadier on a poor network, at the cost of answering a beat later.",reply_delivery:"Whether a reply starts playing as it arrives or once all of it has. Streaming is faster to start and stutters on a bad connection.",update_channel:"Which releases this device is offered. Stable only, or the ones that are still being tried out.",check_for_updates:"Looks now rather than waiting for the next scheduled check. Nothing is installed by pressing it.",bluetooth_proxy:"Forwards nearby Bluetooth advertisements to Home Assistant, so this device extends Bluetooth coverage into its room. It costs some radio time it would otherwise spend on wifi.",metrics_interval:"How often the device reports its own temperature, memory and load. Often enough to be useful; every report is work the device does instead of listening.",purge_cache:"Deletes what Android's runtime has cached. It comes back on its own, so this buys disk space for a while rather than permanently.",test_playback:"Plays a short sound, which is the quickest way to find out whether the speaker, the volume and the output route are all what you think they are.",remote_adb:"Opens Android's debugging port over the network. Off by default, and worth leaving off: it is an unauthenticated way onto the device for anything on the same network.",insecure_tls:"Lets the device accept a certificate it cannot verify, which is what talking to a Home Assistant with a self-signed one needs. It also means anything on the network can pose as that server, so it is worth turning off again once a certificate the device trusts is in place.",vad_sensitivity:"How readily the device decides somebody has stopped talking. Tighter ends a turn sooner and can cut you off mid-sentence.",wifi_signal:"How strong the connection to the access point is. Above about -70 dBm is comfortable; below -80 dBm is where audio starts arriving late.",cpu_temperature:"The chip's own temperature. These run warm by design \u2014 it is a sustained climb rather than a number that matters.",load_average:"How much work is queued across the cores. Listening for a wake word is continuous work, so this is never zero.",memory_available:"How much memory is free. Wake models and the audio path are what use it.",free_space:"Disk left. Wake models and saved recordings are what fill it.",update_status:"What the last self-update did. Worth reading when a device is on an older version than the rest."},Rs={array:"The seven capsules and what the room sounds like to them. The arc is how loud the room is right now; the notch is how far above the room's own noise floor something has to be before the device treats it as speech. Drag the notch, then talk from where you normally would and watch whether the arc crosses it.",appearance:"Ring controls, current brighness and color, active and conditional effects.",noise:"Sounds the device generates itself, mixed live rather than played from a file, so nothing loops. Two layers overlap \u2014 pick rain in one and a fan in the other.",volume:"The speaker's volume, in the same thirty steps the buttons on the device move it through, so this dial and the device agree.",history:"What the device has been hearing. Rows rebuilt from Home Assistant's recorder show what was said; rows the device itself reported also show where the time went and can be played back."},zs={microphone:"The seven microphones and how the room sounds to them. Everything here changes what the device hears before a word of it reaches Home Assistant, so it is the first place to look when it mishears or does not wake at all.",ring:"The twelve-segment light. None of it changes what the device does \u2014 it changes what somebody in the room can tell about it, which is why the muted and failed colours are worth setting.",playback:"The speaker: what comes out of it, how loud, and what happens to music when somebody talks to the device.",screen:"How the screen looks: brightness, theme, the clock, and what it shows when nobody is using it. Tap the screen on the card to open this.",poster:"Photos from an Immich server. Fill in the server and API key, then pick albums or tags.",camera:"The camera's picture and stream. Tap the picture for the live view.",assistant:"One wake word and the turn that follows it. A device can run more than one, each with its own word, sensitivity and timings, which is how one device answers to two names.",device:"The device itself rather than anything it hears or says: which releases it takes, what else it does for the network, and the housekeeping.",diagnostics:"What the device reports about itself. Nothing here is a setting \u2014 it is the evidence, and it is what to read before changing anything else.",activity:"The last few turns: what woke the device, what it heard, and what it said back. Rows the device itself reported also show where the time went, and can be played back or saved."};function bi(a){return Hs[a]}function yi(a){return Rs[a]}function vi(a){return zs[a]??""}var wi="turn_audio",$i="recordings",ki="logs",_i="tone_write",Es=[{key:"listen_ms",label:"Listen"},{key:"think_ms",label:"Think"},{key:"speak_ms",label:"Reply"}];function ge(a){return Es.map(({key:r,label:e})=>({key:r,label:e,ms:Number(a[r]??0)})).filter(r=>r.ms>0)}function be(a){return ge(a).reduce((r,e)=>r+e.ms,0)}function Si(a){let r=a;if(!r||r.version!=="1"||!r.wake_word)return null;let e={version:1,device:r.device_id??"",id:r.id??"",slot:xi(r.slot)??1,wake_word:r.wake_word,outcome:r.outcome??"completed"};r.heard&&(e.heard=r.heard),r.reply&&(e.reply=r.reply);for(let t of["listen_ms","think_ms","speak_ms","audio_seconds"]){let i=xi(r[t]);i!==void 0&&(e[t]=i)}return e}function xi(a){if(a===void 0||a==="")return;let r=Number(a);return Number.isFinite(r)?r:void 0}function Le(a,r,e,t){if(!a.connection)return Promise.resolve(()=>{});let i={type:"logbook/event_stream",start_time:r.toISOString()};return e.length&&(i.device_ids=e),a.connection.subscribeMessage(s=>{let n=[];for(let o of s.events??[]){let d=Si(o);d&&n.push({at:o.when*1e3,turn:d})}t(n)},i)}var Ai=`:host{display:block}.caption{display:flex;align-items:baseline;gap:8px;margin-bottom:8px;font-size:.7rem;font-weight:600;text-transform:uppercase;letter-spacing:.09em;color:var(--secondary-text-color)}.caption span{margin-left:auto;text-transform:none;letter-spacing:0;font-weight:400;font-size:.75rem}.turns{display:flex;flex-direction:column;gap:4px;max-height:300px;overflow:auto;mask-image:linear-gradient(to bottom,black calc(100% - 16px),transparent)}.turn{display:grid;grid-template-columns:auto 1fr auto;gap:4px 10px;padding:9px 12px;border-radius:12px;background:color-mix(in srgb,var(--primary-text-color) 5%,transparent)}.when{font-size:.78rem;font-variant-numeric:tabular-nums;color:var(--secondary-text-color);white-space:nowrap}.wake{font-size:.78rem;color:var(--primary-color)}.right{grid-column:3;grid-row:1;display:flex;align-items:center;gap:8px}.outcome{font-size:.72rem;color:var(--secondary-text-color);white-space:nowrap}.outcome[data-bad=true]{color:var(--error-color, #db4437)}.said,.said-back,.bar{grid-column:2 / span 2}.said{font-size:.85rem;color:var(--primary-text-color)}.said-back{font-size:.85rem;color:var(--secondary-text-color)}.said-back:before{content:"\\21b3  ";opacity:.6}.bar{display:flex;height:20px;margin-top:6px;border-radius:5px;overflow:hidden;background:color-mix(in srgb,var(--primary-text-color) 8%,transparent)}.slice{min-width:2px;display:flex;align-items:center;justify-content:center;overflow:hidden;font-size:.68rem;font-variant-numeric:tabular-nums;color:var(--text-primary-color, #fff);white-space:nowrap}.slice[data-phase=listen_ms]{background:color-mix(in srgb,var(--primary-color) 55%,transparent)}.slice[data-phase=think_ms]{background:color-mix(in srgb,var(--primary-text-color) 30%,transparent)}.slice[data-phase=speak_ms]{background:var(--success-color, #43a047)}.legend{display:flex;flex-wrap:wrap;gap:14px;margin-bottom:10px;font-size:.7rem;color:var(--secondary-text-color)}.key{display:flex;align-items:center;gap:5px}.dot{width:9px;height:9px;border-radius:2px}.none{padding:10px 0;font-size:.82rem;color:var(--secondary-text-color)}.loading{display:flex;justify-content:center;padding:32px 0}
`;var Ti=`:host{display:flex;gap:6px;flex:0 0 auto}button{flex:0 0 auto;width:28px;height:28px;display:grid;place-items:center;padding:0;border:1px solid color-mix(in srgb,var(--primary-color) 40%,transparent);border-radius:50%;background:color-mix(in srgb,var(--primary-color) 12%,transparent);cursor:pointer}button.keep{border-color:color-mix(in srgb,var(--primary-text-color) 18%,transparent);background:color-mix(in srgb,var(--primary-text-color) 5%,transparent)}button ha-icon{--mdc-icon-size: 16px;color:var(--primary-color);display:flex}button.keep ha-icon{color:var(--secondary-text-color)}.gone{display:flex;opacity:.4}.gone ha-icon{--mdc-icon-size: 16px;color:var(--secondary-text-color);display:flex}
`;var ye=null,Os=5*6e4,P=class extends g{constructor(){super(...arguments);this.device="";this.turn="";this.filename="recording.wav";this.at=0;this.busy=!1;this.playing=!1;this.gone=!1;this.play=async()=>{if(this.playing){ye?.audio.pause();return}let e=await this.fetch();if(!e)return;ye?.stop();let t=new Audio(e),i=()=>{this.playing=!1,ye?.audio===t&&(ye=null)};t.addEventListener("ended",i),t.addEventListener("pause",i),ye={audio:t,stop:()=>t.pause()},this.playing=!0,t.play().catch(i)};this.save=async()=>{let e=await this.fetch();if(!e)return;let t=document.createElement("a");t.href=e,t.download=this.filename,t.click()}}disconnectedCallback(){super.disconnectedCallback(),this.playing&&ye?.audio.pause()}updated(){if(!this.hass||!this.turn||this.checkedTurn===this.turn)return;if(this.checkedTurn=this.turn,this.present=void 0,this.gone=!1,this.at&&Date.now()-this.at<Os){this.present=!0;return}let e=this.device?X(this.hass,this.device,$i):void 0;e&&ni(this.hass,e).then(t=>{this.checkedTurn===this.turn&&(this.present=t.has(this.turn))})}render(){return!this.turn||!this.action()||this.present!==!0?p:this.gone?l`<span class="gone" title="The device no longer has this recording">
        <ha-icon icon="mdi:playlist-remove"></ha-icon>
      </span>`:l`
      <button
        aria-label=${this.playing?"Stop the recording":"Play the recording"}
        @click=${this.play}
      >
        <ha-icon
          .icon=${this.busy?"mdi:timer-outline":this.playing?"mdi:pause":"mdi:play"}
        ></ha-icon>
      </button>
      <button class="keep" aria-label="Save the recording" @click=${this.save}>
        <ha-icon icon="mdi:tray-arrow-down"></ha-icon>
      </button>
    `}action(){return this.device?X(this.hass,this.device,wi):void 0}async fetch(){let e=ai(this.turn);if(e)return e;let t=this.action();if(!t)return null;this.busy=!0;try{let i=await oi(this.hass,t,this.turn);return this.gone=!i,i||this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:"That recording is no longer on the device."},bubbles:!0,composed:!0})),i}finally{this.busy=!1}}};P.styles=b(Ti),c([m({attribute:!1})],P.prototype,"hass",2),c([m()],P.prototype,"device",2),c([m()],P.prototype,"turn",2),c([m()],P.prototype,"filename",2),c([m({type:Number})],P.prototype,"at",2),c([u()],P.prototype,"busy",2),c([u()],P.prototype,"playing",2),c([u()],P.prototype,"present",2),c([u()],P.prototype,"gone",2),P=c([v("echolocal-recording")],P);var Ns=14,I=class extends g{constructor(){super(...arguments);this.device="";this.deviceId="";this.live=[];this.asked=!1;this.loading=!0}updated(){this.asked||!this.hass||!this.deviceId||(this.asked=!0,this.listen())}disconnectedCallback(){super.disconnectedCallback(),this.stop?.()}render(){let e=this.merged(),t=e.some(i=>i.turn&&ge(i.turn).length>0);return l`
      <div class="caption">
        Recent turns
        ${e.length?l`<span>${e.length===1?"1 turn":`${e.length} turns`}</span>`:p}
      </div>
      ${t?l`<div class="legend">
            ${[["listen_ms","Listen"],["think_ms","Think"],["speak_ms","Reply"]].map(([i,s])=>l`<span class="key"
                ><span class="dot slice" data-phase=${i}></span>${s}</span
              >`)}
          </div>`:p}
      ${e.length?l`<div class="turns">${e.map(i=>this.row(i,this.scale(e)))}</div>`:this.loading?l`<div class="loading"><ha-spinner size="medium"></ha-spinner></div>`:l`<div class="none">No recent activity found.</div>`}
    `}scale(e){return Math.max(1,...e.map(t=>t.turn?be(t.turn):0))}row(e,t){let i=e.turn,s=i?ge(i):[],n=i?be(i):0;return l`<div class="turn">
      <div class="when">${Is(e.at)}</div>
      <div class="wake">${e.wake}</div>
      <div class="right">
        ${i?l`<div class="outcome" data-bad=${String(i.outcome!=="completed")}>
              ${i.outcome==="completed"?`${(n/1e3).toFixed(1)}s`:i.outcome}
            </div>`:p}
        ${i?.audio_seconds?l`<echolocal-recording
              .hass=${this.hass}
              .device=${this.device}
              .turn=${i.id}
              .at=${e.at}
              .filename=${Us(e)}
            ></echolocal-recording>`:p}
      </div>
      ${e.heard?l`<div class="said">${e.heard}</div>`:p}
      ${e.reply?l`<div class="said-back">${e.reply}</div>`:p}
      ${s.length?l`<div class="bar">
            ${s.map(o=>l`<div
                class="slice"
                data-phase=${o.key}
                title=${`${o.label} ${o.ms} ms`}
                style=${`flex:0 0 ${o.ms/t*100}%`}
              >
                ${(o.ms/1e3).toFixed(1)}s
              </div>`)}
          </div>`:p}
    </div>`}merged(){return[...this.live].sort((e,t)=>t.at-e.at)}async listen(){let e=new Date(Date.now()-Ns*864e5),t=this.deviceId?[this.deviceId]:[];try{this.stop=await Le(this.hass,e,t,i=>{this.loading=!1,i.length&&(this.live=[...i.map(({at:s,turn:n})=>({at:s,wake:n.wake_word,heard:n.heard,reply:n.reply,turn:n})),...this.live])})}catch{this.loading=!1}}};I.styles=b(Ai),c([m({attribute:!1})],I.prototype,"hass",2),c([m()],I.prototype,"device",2),c([m()],I.prototype,"deviceId",2),c([u()],I.prototype,"live",2),c([u()],I.prototype,"asked",2),c([u()],I.prototype,"loading",2),I=c([v("echolocal-history")],I);function Is(a){return new Date(a).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function Us(a){let r=new Date(a.at).toISOString().replace(/[:.]/g,"-").slice(0,19),e=a.wake.toLowerCase().replace(/[^a-z0-9]+/g,"-");return`${r}-${e}.wav`}var Ci=`:host{display:flex;flex:0 0 auto;align-self:center}button{flex:0 0 auto;display:flex;align-items:center;gap:8px;height:34px;padding:0 14px;border:1px solid color-mix(in srgb,var(--primary-text-color) 18%,transparent);border-radius:999px;background:color-mix(in srgb,var(--primary-text-color) 5%,transparent);color:var(--primary-text-color);font:inherit;font-size:.9em;white-space:nowrap;cursor:pointer}button[disabled]{cursor:default;opacity:.6}button ha-icon{--mdc-icon-size: 18px;color:var(--secondary-text-color);display:flex}button.failed{border-color:color-mix(in srgb,var(--error-color, #db4437) 50%,transparent)}button.failed ha-icon{color:var(--error-color, #db4437)}
`;var Bs=64,Z=class extends g{constructor(){super(...arguments);this.device="";this.busy=!1;this.failed=!1;this.save=async()=>{let e=this.action();if(e){this.busy=!0,this.failed=!1;try{let t=await this.read(e);if(!t){this.failed=!0;return}Ws(`${this.device}_logs_${Fs()}.txt`,t.join(`
`)+`
`)}finally{this.busy=!1}}}}render(){return this.action()?l`
      <button
        ?disabled=${this.busy}
        class=${this.failed?"failed":""}
        title=${this.failed?"Could not read the logs":"Diagnostic logs"}
        aria-label=${this.failed?"Could not read the logs":"Download diagnostic logs"}
        @click=${this.save}
      >
        <ha-icon
          .icon=${this.busy?"mdi:timer-outline":"mdi:tray-arrow-down"}
        ></ha-icon>
        <span>${this.failed?"Could not read the logs":"Diagnostic logs"}</span>
      </button>
    `:p}action(){return this.device?X(this.hass,this.device,ki):void 0}async read(e){let t=[],i=1;for(let s=0;s<Math.min(i,Bs);s++){let n=await this.call(e,s);if(!n)return null;i=n.pages||1,t.push(...n.lines??[])}return t}async call(e,t){try{let s=(await this.hass.callService("esphome",e,{page:t},void 0,!0,!0))?.response;return s?.version===1&&Array.isArray(s.lines)?s:null}catch{return null}}};Z.styles=b(Ci),c([m({attribute:!1})],Z.prototype,"hass",2),c([m()],Z.prototype,"device",2),c([u()],Z.prototype,"busy",2),c([u()],Z.prototype,"failed",2),Z=c([v("echolocal-logs")],Z);function Fs(){return new Date().toISOString().replace(/\.\d+Z$/,"").replace(/:/g,"-")}function Ws(a,r){let e=URL.createObjectURL(new Blob([r],{type:"text/plain"})),t=document.createElement("a");t.href=e,t.download=a,t.click(),URL.revokeObjectURL(e)}var Mi=`:host{display:block;padding:14px;border-radius:14px;background:color-mix(in srgb,var(--primary-text-color) 5%,transparent)}.caption{display:flex;align-items:baseline;gap:8px;margin-bottom:10px;font-size:.7rem;font-weight:600;text-transform:uppercase;letter-spacing:.09em;color:var(--secondary-text-color)}.caption span{margin-left:auto;text-transform:none;letter-spacing:0;font-weight:400;font-size:.75rem}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(78px,1fr));gap:6px}.sound{position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;padding:10px 6px;border:1px solid transparent;border-radius:12px;background:color-mix(in srgb,var(--primary-text-color) 6%,transparent);color:var(--secondary-text-color);font:inherit;font-size:.75rem;cursor:pointer}.sound:hover{background:color-mix(in srgb,var(--primary-text-color) 12%,transparent)}.sound[data-on=true]{border-color:color-mix(in srgb,var(--primary-color) 45%,transparent);background:color-mix(in srgb,var(--primary-color) 15%,transparent);color:var(--primary-color)}.sound ha-icon{--mdc-icon-size: 22px;display:flex}.layer{position:absolute;top:4px;right:6px;font-size:.62rem;line-height:1}
`;var Hi=`:host{display:flex;gap:18px;align-items:center;padding:14px;border-radius:14px;background:color-mix(in srgb,var(--primary-text-color) 5%,transparent)}.dial{width:150px;flex:0 0 auto;touch-action:none}svg{width:100%;height:auto;display:block}.bed{fill:none;stroke:color-mix(in srgb,var(--primary-text-color) 10%,transparent);stroke-width:10;stroke-linecap:round}.live{fill:none;stroke:var(--primary-color);stroke-width:10;stroke-linecap:round;transition:stroke-dasharray .25s ease}.live[data-muted=true]{stroke:color-mix(in srgb,var(--primary-text-color) 20%,transparent)}.step{fill:var(--primary-text-color);font-size:26px;font-weight:500;text-anchor:middle}.of{fill:var(--secondary-text-color);font-size:10px;text-anchor:middle;text-transform:uppercase;letter-spacing:.1em}.side{flex:1 1 auto;min-width:0;display:flex;align-items:center;justify-content:space-between;gap:12px}.state{font-size:1.05rem;color:var(--primary-text-color)}.badges{display:flex;flex-wrap:wrap;gap:6px}.badge{display:flex;align-items:center;gap:6px;padding:5px 10px;border-radius:10px;background:color-mix(in srgb,var(--primary-text-color) 7%,transparent);font-size:.78rem;color:var(--secondary-text-color)}.badge ha-icon{--mdc-icon-size: 16px;display:flex}.badge[data-on=true]{background:color-mix(in srgb,var(--primary-color) 16%,transparent);color:var(--primary-color)}
`;var $t=135,kt=270,Ye=100,Xe=100,ve=78,Gs={White:"mdi:grain",Pink:"mdi:blur",Brown:"mdi:waveform",Rain:"mdi:weather-pouring",Ocean:"mdi:waves",Brook:"mdi:water",Wind:"mdi:weather-windy",Fire:"mdi:fireplace",Crickets:"mdi:bug-outline",Fan:"mdi:fan",Cabin:"mdi:airplane"},xe="None",ee=class extends g{constructor(){super(...arguments);this.player="";this.jack="";this.grab=e=>{let t=e.currentTarget;t.setPointerCapture(e.pointerId);let i=d=>{let h=t.getBoundingClientRect(),f=d.clientX-h.left-h.width/2,y=d.clientY-h.top-h.height/2,w=Math.atan2(y,f)*180/Math.PI-$t;for(;w<0;)w+=360;let $=Math.max(0,Math.min(1,Math.min(w,kt)/kt));return Math.round($*30)/30},s=d=>this.hass.callService("media_player","volume_set",{entity_id:this.player,volume_level:i(d)}),n=d=>s(d),o=d=>{t.removeEventListener("pointermove",n),t.removeEventListener("pointerup",o),t.removeEventListener("pointercancel",o),s(d)};t.addEventListener("pointermove",n),t.addEventListener("pointerup",o),t.addEventListener("pointercancel",o),s(e)}}render(){let e=this.hass.states[this.player];if(!e)return p;let t=Number(e.attributes.volume_level??0),i=e.attributes.is_volume_muted===!0,s=this.jack?this.hass.states[this.jack]?.state==="on":!1;return l`
      <div class="dial" @pointerdown=${this.grab}>
        <svg viewBox="0 0 200 200" role="img" aria-label="Volume">
          <path class="bed" d=${Ri()} pathLength="100"></path>
          ${t>0?x`<path class="live" data-muted=${String(i)} d=${Ri()} pathLength="100"
                stroke-dasharray=${`${t*100} 100`}></path>`:p}
          <text class="step" x=${Ye} y=${Xe+4}>${Math.round(t*30)}</text>
          <text class="of" x=${Ye} y=${Xe+20}>of 30</text>
        </svg>
      </div>

      <div class="side">
        <div class="state">${Ks(e.state)}</div>
        <div class="badges">
          <div class="badge" data-on=${String(i)}>
            <ha-icon .icon=${i?"mdi:volume-off":"mdi:volume-high"}></ha-icon>
            ${i?"Muted":`${Math.round(t*100)}%`}
          </div>
          ${this.jack?l`<div class="badge" data-on=${String(s)}>
                <ha-icon icon="mdi:headphones"></ha-icon>
                ${s?"Headphones":"Speaker"}
              </div>`:p}
        </div>
      </div>
    `}};ee.styles=b(Hi),c([m({attribute:!1})],ee.prototype,"hass",2),c([m()],ee.prototype,"player",2),c([m()],ee.prototype,"jack",2),ee=c([v("echolocal-volume")],ee);var te=class extends g{constructor(){super(...arguments);this.layers=[];this.busy=!1}render(){let e=this.layers.map(n=>this.hass.states[n]?.state??xe),t=(this.hass.states[this.layers[0]]?.attributes.options??[]).filter(n=>n!==xe),i=e.every(n=>n!==xe),s=n=>e.indexOf(n);return l`
      <div class="caption">
        Generated sound
        <span>${i?"Both layers in use":`${e.filter(n=>n!==xe).length} of 2`}</span>
      </div>
      <div class="grid">
        ${t.map(n=>{let o=s(n);return l`<button
            class="sound"
            data-on=${String(o>=0)}
            ?disabled=${this.busy}
            @click=${()=>this.pick(n,o,e)}
          >
            <ha-icon .icon=${Gs[n]??"mdi:music-note"}></ha-icon>
            ${n}
            ${o>=0&&this.layers.length>1?l`<span class="layer">${o+1}</span>`:p}
          </button>`})}
      </div>
    `}async pick(e,t,i){let s=i.findIndex(o=>o===xe),n=t>=0?t:s>=0?s:this.layers.length-1;if(!(n<0)){this.busy=!0;try{await this.hass.callService("select","select_option",{entity_id:this.layers[n],option:t>=0?xe:e})}finally{this.busy=!1}}}};te.styles=b(Mi),c([m({attribute:!1})],te.prototype,"hass",2),c([m({attribute:!1})],te.prototype,"layers",2),c([u()],te.prototype,"busy",2),te=c([v("echolocal-noise")],te);function Ks(a){return a==="playing"?"Playing":a==="paused"?"Paused":a==="unavailable"?"Unavailable":"Idle"}function Ri(){let a=$t*Math.PI/180,r=($t+kt)*Math.PI/180;return`M${(Ye+ve*Math.cos(a)).toFixed(2)} ${(Xe+ve*Math.sin(a)).toFixed(2)}
    A${ve} ${ve} 0 1 1 ${(Ye+ve*Math.cos(r)).toFixed(2)} ${(Xe+ve*Math.sin(r)).toFixed(2)}`}var H=class extends g{constructor(){super(...arguments);this.heading="";this.subtitle="";this.icon="";this.sections=[];this.widgets=[];this.device="";this.deviceId="";this.help=!0;this.about="";this.held={}}render(){let e=this.sections.map(n=>({...n,rows:n.rows.filter(o=>this.hass.states?.[o.entityId])})).filter(n=>n.rows.length),s=`--ha-dialog-width-md:${e.reduce((n,o)=>n+o.rows.length,0)>3||this.widgets.some(n=>n.place!=="header")?820:460}px`;return l`
      <ha-dialog open hideActions style=${s} @closed=${this.dismiss}>
        <div class="sheet">
          <div class="head">
            <div class="crest"><ha-icon .icon=${this.icon}></ha-icon></div>
            <div class="titles">
              <div class="title">
                ${this.heading}
                ${this.help&&this.about?l`<echolocal-bubble .text=${this.about}></echolocal-bubble>`:p}
              </div>
              ${this.subtitle?l`<div class="subtitle">${this.subtitle}</div>`:p}
            </div>
            ${this.widgets.filter(n=>n.place==="header").map(n=>this.widget(n))}
          </div>
          ${this.widgets.filter(n=>n.place!=="header").map(n=>this.explained(n))}
          <div class="groups">
            ${e.length?e.map(n=>this.group(n)):this.widgets.length?p:l`<div class="empty">Nothing to show here.</div>`}
          </div>
        </div>
      </ha-dialog>
    `}widget({widget:e,roles:t,lists:i}){let s=n=>n?.[0]??"";switch(e){case"appearance":return l`<echolocal-appearance
          class="hero"
          .hass=${this.hass}
          .light=${t.light}
          .muted=${s(i.muted)}
          .failure=${s(i.failure)}
          .room=${s(i.room)}
        ></echolocal-appearance>`;case"array":return l`<echolocal-array
          class="hero"
          .hass=${this.hass}
          .level=${t.level}
          .floor=${t.floor}
          .gate=${t.gate}
          .mode=${t.mode}
          .muted=${this.muted}
        ></echolocal-array>`;case"logs":return l`<echolocal-logs
          .hass=${this.hass}
          .device=${this.device}
        ></echolocal-logs>`;case"history":return l`<echolocal-history
          class="hero"
          .hass=${this.hass}
          .device=${this.device}
          .deviceId=${this.deviceId}
        ></echolocal-history>`;case"volume":return l`<echolocal-volume
          class="hero"
          .hass=${this.hass}
          .player=${t.player}
          .jack=${s(i.jack)}
        ></echolocal-volume>`;case"noise":return l`<echolocal-noise
          class="hero"
          .hass=${this.hass}
          .layers=${i.layers??[]}
        ></echolocal-noise>`;case"player":return this.crownPlayer(t.player);case"power":return this.crownPower(t.light);case"mute":return this.crownMute(t.mute,t.lamp);case"camera":return this.crownCamera(t.camera)}}crownCamera(e){let t=this.hass.states[e]?.attributes.entity_picture;if(typeof t!="string")return l``;let i=`${t}${t.includes("?")?"&":"?"}t=${Math.floor(Date.now()/1e4)}`;return l`<button class="crown picture" @click=${()=>this.moreInfo(e)}>
      <img src=${i} alt="Camera" />
    </button>`}crownPlayer(e){let t=this.hass.states[e],i=t?.state==="playing",s=t?.attributes.is_volume_muted!==!0;return l`<div class="crown">
      <ha-icon-button
        .label=${i?"Pause":"Play"}
        @click=${()=>this.hass.callService("media_player",i?"media_pause":"media_play",{entity_id:e})}
      >
        <ha-icon .icon=${i?"mdi:pause":"mdi:play"}></ha-icon>
      </ha-icon-button>
      ${this.crownSwitch(s,"Sound",n=>this.hass.callService("media_player","volume_mute",{entity_id:e,is_volume_muted:!n}))}
    </div>`}crownPower(e){return l`<div class="crown">
      ${this.crownSwitch(this.hass.states[e]?.state==="on","Ring",t=>this.hass.callService("light",t?"turn_on":"turn_off",{entity_id:e}))}
    </div>`}crownMute(e,t){let i=this.hass.states[t];return l`<div class="crown">
      ${i?l`<ha-control-select
            class="lamp"
            .options=${(i.attributes.options??[]).map(s=>({value:s,label:s}))}
            .value=${i.state}
            label="Mute indicator"
            @value-changed=${s=>this.hass.callService("select","select_option",{entity_id:t,option:s.detail.value})}
          ></ha-control-select>`:p}
      ${this.crownSwitch(this.hass.states[e]?.state==="on","Microphone mute",s=>this.hass.callService("switch",s?"turn_on":"turn_off",{entity_id:e}),"warn")}
    </div>`}crownSwitch(e,t,i,s=""){return l`<ha-control-switch
      class=${s}
      .checked=${e}
      .label=${t}
      @change=${n=>i(n.target.checked)}
    ></ha-control-switch>`}get muted(){let e=this.widgets.find(t=>t.roles.mute)?.roles.mute;return!!e&&this.hass.states[e]?.state==="on"}explained(e){let t=this.help?yi(e.widget):void 0;return t?l`<div class="explained">
      ${this.widget(e)}
      <echolocal-bubble class="corner" .text=${t}></echolocal-bubble>
    </div>`:this.widget(e)}group(e){return l`<section class="group">
      ${e.title?l`<div class="section">${e.title}</div>`:p}
      ${e.rows.map(t=>this.row(t))}
    </section>`}row(e){if(!this.hass.states?.[e.entityId])return p;switch(e.entityId.split(".")[0]){case"switch":return this.toggle(e,"switch");case"light":return this.toggle(e,"light");case"number":return this.slider(e);case"select":return this.options(e);case"button":return this.press(e);case"update":return this.version(e);default:return this.reading(e)}}version(e){let t=this.hass.states[e.entityId],i=t.attributes.installed_version,s=t.attributes.latest_version,n=t.state==="on"&&s&&s!==i;return t.attributes.in_progress?this.tile(e,!0,{trail:l`<ha-spinner size="tiny"></ha-spinner>`,under:l`<div class="note">Installing ${String(s)}</div>`}):this.tile(e,!1,{trail:l`<button class="reading version" @click=${()=>this.moreInfo(e.entityId)}>
        ${i?String(i):t.state}
      </button>`,under:n?l`<div class="offer">
            <div class="note">New: ${String(s)}</div>
            <ha-button
              size="small"
              @click=${()=>this.hass.callService("update","install",{entity_id:e.entityId})}
            >
              Update
            </ha-button>
          </div>`:void 0})}toggle(e,t){let{entityId:i,label:s}=e,n=this.hass.states[i].state;return this.tile(e,n==="on",{trail:l`<ha-control-switch
        .checked=${n==="on"}
        .disabled=${n==="unavailable"}
        .label=${s}
        @change=${o=>this.hass.callService(t,o.target.checked?"turn_on":"turn_off",{entity_id:i})}
      ></ha-control-switch>`})}slider(e){let{entityId:t}=e,i=this.hass.states[t],s=i.attributes,n=s.min??0,o=s.max??100,d=this.held[t]??Number(i.state);return this.tile(e,!1,{trail:l`<span class="reading">${Number.isNaN(d)?"\u2014":d}</span>
        ${s.unit_of_measurement?l`<span class="unit">${s.unit_of_measurement}</span>`:p}`,under:l`<ha-control-slider
        .value=${d}
        .min=${n}
        .max=${o}
        .step=${s.step??1}
        .unit=${s.unit_of_measurement??""}
        .disabled=${i.state==="unavailable"}
        @slider-moved=${h=>{this.held={...this.held,[t]:h.detail.value}}}
        @value-changed=${h=>{let{[t]:f,...y}=this.held;this.held=y,this.hass.callService("number","set_value",{entity_id:t,value:h.detail.value})}}
      ></ha-control-slider>`})}options(e){let{entityId:t}=e,i=this.hass.states[t],s=i.attributes.options??[],n=s.map(h=>({value:h,label:h})),o=h=>{h&&h!==i.state&&this.hass.callService("select","select_option",{entity_id:t,option:h})},d=i.state==="unavailable";return this.tile(e,!1,{trail:s.length===2?l`<div class="pills">
              ${s.map(h=>l`<button
                  class="pill"
                  data-on=${String(h===i.state)}
                  ?disabled=${d}
                  @click=${()=>o(h)}
                >
                  ${h}
                </button>`)}
            </div>`:l`<ha-control-select-menu
              .options=${n}
              .value=${i.state}
              .disabled=${d}
              .label=${e.label}
              hide-label
              show-arrow
              @wa-select=${h=>o(h.detail.item?.value)}
            ></ha-control-select-menu>`})}press(e){let t=e.reading?this.hass.states[e.reading]:void 0,i=l`<ha-button
      size="small"
      @click=${()=>this.hass.callService("button","press",{entity_id:e.entityId})}
    >
      Run
    </ha-button>`;return t?this.tile(e,!1,{trail:l`<span class="reading">${t.state}</span>
        ${t.attributes.unit_of_measurement?l`<span class="unit">${t.attributes.unit_of_measurement}</span>`:p}`,under:i}):this.tile(e,!1,{trail:i})}reading(e){let t=this.hass.states[e.entityId],i=t.attributes.unit_of_measurement,s=t.state.split(", ").filter(o=>o.length);if(s.length>1)return this.tile(e,!1,{under:l`<button class="lines" @click=${()=>this.moreInfo(e.entityId)}>
          ${s.map(o=>l`<div>${o}</div>`)}
        </button>`});let n=t.attributes.mode==="password"&&t.state?"\u2022\u2022\u2022\u2022\u2022\u2022":t.state;return this.tile(e,!1,{trail:l`<button
          class=${n.length>12?"reading version":"reading"}
          title=${n}
          @click=${()=>this.moreInfo(e.entityId)}
        >
          ${n}
        </button>
        ${i?l`<span class="unit">${i}</span>`:p}`})}tile({entityId:e,label:t,name:i},s,n){let o=this.hass.states[e].attributes.icon,d=s&&o?.includes("mic")&&o.includes("off"),h=this.help?bi(i):void 0;return l`<div class="tile" data-active=${String(s&&!d)} data-alert=${String(!!d)}>
      <div class="top">
        <div class="icon"><ha-icon .icon=${o??"mdi:tune"}></ha-icon></div>
        <div class="named">
          <div class="name">${t}</div>
          ${h?l`<echolocal-bubble .text=${h}></echolocal-bubble>`:p}
        </div>
        ${n.trail?l`<div class="trail">${n.trail}</div>`:p}
      </div>
      ${n.under??p}
    </div>`}moreInfo(e){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))}dismiss(){this.dispatchEvent(new CustomEvent("closed",{bubbles:!0,composed:!0}))}};H.styles=[b(fe),b(fi)],c([m({attribute:!1})],H.prototype,"hass",2),c([m()],H.prototype,"heading",2),c([m()],H.prototype,"subtitle",2),c([m()],H.prototype,"icon",2),c([m({attribute:!1})],H.prototype,"sections",2),c([m({attribute:!1})],H.prototype,"widgets",2),c([m()],H.prototype,"device",2),c([m()],H.prototype,"deviceId",2),c([m({type:Boolean})],H.prototype,"help",2),c([m()],H.prototype,"about",2),c([u()],H.prototype,"held",2),H=c([v("echolocal-dialog")],H);function Ei(a,r){let e=_t(a);return r.map(t=>{let i=e?.get(t.entity_id);return{...t,name:i?.name??"",slot:i?.slot??0}})}function Ze(a){let r=new Map;for(let e of a){let t=r.get(e.name);t?t.push(e):r.set(e.name,[e])}for(let e of r.values())e.sort((t,i)=>t.slot-i.slot);return r}var F="echolocal-keys",zi=!1,Pi=null;function _t(a){return zi||(zi=!0,Ls(a)),Pi}function Ls(a){a.connection?.subscribeMessage(r=>{let e=new Map;for(let t of r.entities)t.device_id&&e.set(t.entity_id,{entityId:t.entity_id,deviceId:t.device_id,...Ys(t.object_id),disabled:t.disabled});Pi=e,window.dispatchEvent(new Event(F))},{type:"echolocal/entities"}).catch(()=>{})}function Ys(a){let r=a.lastIndexOf("_"),e=r<0?"":a.slice(r+1);return/^\d+$/.test(e)?{name:a.slice(0,r),slot:Number(e)}:{name:a,slot:0}}var Qe={ring:[{title:null,rows:[["ring","Ring"]]},{title:"Segments",rows:[["segment","Segment"]]}],microphone:[{title:null,rows:[["mic_mute","Mute"]]},{title:"Capture",rows:[["microphone_gain","Gain"],["microphone_mixing","Mixing"],["microphone_leveling","Leveling"],["microphone_cancel_echo","Echo cancellation"],["microphone_noise_reduction","Noise reduction"]]},{title:"The room",rows:[["microphone_sensitivity","Sensitivity"],["room_level","Room level"],["room_floor","Room floor"],["stop_word_sensitivity","Stop word"],["vad_sensitivity","End of speech"]]},{title:"Indicator",rows:[["mute_led_brightness","Mute light"],["mute_sound","Mute sound"]]}],playback:[{title:null,rows:[["headphones","Headphones"]]},{title:"Volume",rows:[["volume_media","Music"],["volume_voice","Voice"],["volume_alerts","Alerts"],["volume_feedback","Beeps"]]},{title:"Generated sound",rows:[["noise_layer","Layer"]]},{title:"During a turn",rows:[["media_on_turn","Music"],["media_duck_level","Ducking"]]},{title:"Voice",rows:[["voice_resampling","Resampling"]]},{title:"Cast",rows:[["cast_receiver","Cast receiver"],["youtube_lounge_on_demand","YouTube on demand"],["youtube_live_delay","YouTube live delay"],["youtube_sponsorblock","SponsorBlock categories"],["cast_credentials","Credentials"],["cast_credentials_expire","Credentials expire"],["cast_oracle","Credential server"]]}],screen:[{title:null,rows:[["backlight","Brightness"],["screen_mode","Automatic brightness"],["screen_brightness","Brightness now"],["ambient_light","Room light"]]},{title:"Look",rows:[["theme","Theme"],["screen_style","Style"],["screen_size","Size"],["drawer_edge","Dock side"],["dashboard_logo","Logo"],["privacy_marks","Privacy marks"]]},{title:"Clock",rows:[["clock_face","Face"],["clock_format","Format"],["clock_size","Size"],["clock_position","Position"],["clock_color","Color"],["clock_date","Date"]]},{title:"Visual",rows:[["visual","Visual"],["visual_label","Label"]]},{title:"When idle",rows:[["idle_after","Idle after"],["idle_face","Clock face"],["idle_size","Clock size"],["idle_position","Vertical position"],["idle_align","Horizontal position"],["idle_visual","Visual"],["idle_visual_1_source","Visual 1 listens to"],["idle_visual_2_source","Visual 2 listens to"]]}],poster:[{title:null,rows:[["poster","Posters"],["poster_showing","Showing"],["poster_every","Changes"],["poster_next","Next poster"]]},{title:"Immich",rows:[["poster_server","Server"],["poster_key","API key"],["poster_albums","Albums"],["poster_tags","Tags"]]}],camera:[{title:null,rows:[["camera_covered","Shutter closed"],["rtsp","RTSP server"],["camera_main_on","Main stream"]]},{title:"Stream",rows:[["camera_main_size","Resolution"],["camera_quality","Quality"],["camera_framerate","Frame rate"],["camera_framerate_auto","Automatic frame rate"],["camera_keyframe","Keyframe interval"]]},{title:"Picture",rows:[["camera_brightness","Brightness"],["camera_contrast","Contrast"],["camera_saturation","Saturation"],["camera_sharpness","Sharpness"],["camera_hue","Hue"],["camera_ev","Exposure"],["camera_iso","ISO"],["camera_whitebalance","White balance"],["camera_scene","Scene"],["camera_effect","Effect"],["camera_banding","Anti-banding"],["camera_reset","Reset"]]}],assistant:[{title:null,rows:[["wake_word","Wake word"],["pipeline","Pipeline"],["wake_threshold","Wake sensitivity"]]},{title:"Timing",rows:[["max_listen","Max listen"],["max_think","Max think"],["follow_up","Follow up"]]},{title:"Feedback",rows:[["wake_effect","Listening effect"],["thinking_effect","Thinking effect"],["replying_effect","Replying effect"],["wake_tone","Chime"]]},{title:"Reply",rows:[["reply_buffer","Buffer"],["reply_delivery","Delivery"]]},{title:"Recordings",rows:[["keep_recordings","Recordings kept"]]}],device:[{title:null,rows:[["firmware","Firmware"],["update_channel","Update channel"],["check_for_updates","Check for updates"]]},{title:"Bluetooth",rows:[["bluetooth_proxy","Proxy enabled"],["bluetooth_speaker","Speaker"]]},{title:"Maintenance",rows:[["metrics_interval","Metrics interval"],["purge_cache","Purge cache","cached_data"],["test_playback","Test playback"],["remote_adb","Remote adb"],["insecure_tls","Insecure TLS"]]}],diagnostics:[{title:"Network",rows:[["ip_address","IP address"],["wifi_signal","Signal"],["wifi_sent","Sent"],["wifi_received","Received"],["ble_advertisements","Bluetooth advertisements"]]},{title:"Hardware",rows:[["cpu_temperature","CPU"],["radio_temperature","Radio"],["cpu_cores","Cores"],["cpu_cores_online","Cores online"],["load_average","Load"],["memory_available","Memory"],["free_space","Disk"]]},{title:"Updates",rows:[["update_status","Update status"],["update_outcome","Last update"]]}]},Xs={ring:[{widget:"power",place:"header",roles:{light:"ring"}},{widget:"appearance",roles:{light:"ring"},lists:{segments:"segment",muted:"ring_muted",failure:"failure_effect",room:"room_reaction"}}],playback:[{widget:"player",place:"header",roles:{player:"speaker"}},{widget:"volume",roles:{player:"speaker"},lists:{jack:"headphones"}},{widget:"noise",roles:{first:"noise_layer"},lists:{layers:"noise_layer"}}],activity:[{widget:"history",roles:{}}],camera:[{widget:"camera",place:"header",roles:{camera:"camera"}}],microphone:[{widget:"mute",place:"header",roles:{mute:"mic_mute",lamp:"mute_led_brightness"}},{widget:"array",roles:{level:"room_level",floor:"room_floor",gate:"microphone_sensitivity",mode:"microphone_mixing"}}]},Zs=[["ring","ring"],["microphone","mic_mute"],["playback","speaker"],["screen","theme"],["poster","poster"],["camera","camera"]];function Di(a){let r=Zs.filter(([,e])=>a.by.has(e)).map(([e])=>({kind:e,slot:0}));for(let e of a.by.get("wake_threshold")??[])r.push({kind:"assistant",slot:e.slot});return r}function Oi(a,r,e=0){let t=[],i=new Set;for(let s of Xs[a]??[]){let n={};for(let[d,h]of Object.entries(s.roles)){let f=Je(r.by,h,e)[0];f&&(n[d]=f.entity_id)}if(Object.keys(n).length!==Object.keys(s.roles).length)continue;let o={};for(let[d,h]of Object.entries(s.lists??{}))o[d]=Je(r.by,h,e).map(f=>f.entity_id);t.push({widget:s.widget,place:s.place??"body",roles:n,lists:o}),[...Object.values(n),...Object.values(o).flat()].forEach(d=>i.add(d))}return{widgets:t,sections:Ui(Qe[a]??[],r.by,e,i)}}var Js=new Set(["switch","select","number","button","text","time","update"]);function Ni(a){return ji(Qe.device??[],a.entities.filter(r=>r.device_id===a.device.id&&Js.has(r.entity_id.split(".")[0])),new Set,r=>r.entity_category!=="diagnostic")}function Ii(a){let r=a.entities.filter(e=>e.entity_category==="diagnostic");return{widgets:[{widget:"logs",place:"header",roles:{},lists:{}}],sections:ji(Qe.diagnostics??[],r,new Set)}}function Je(a,r,e){let t=a.get(r)??[];return e?t.filter(i=>(i.slot||1)===e):t}function Ui(a,r,e,t){let i=[];for(let s of a){let n=[];for(let[o,d,h]of s.rows){let f=Je(r,o,e);for(let y of f)t.has(y.entity_id)||n.push({entityId:y.entity_id,name:o,label:f.length>1?`${d} ${y.slot}`:d,reading:h?Je(r,h,e)[0]?.entity_id:void 0})}n.length&&i.push({title:s.title,rows:n})}return i}var Qs=new Set(Object.values(Qe).flatMap(a=>(a??[]).flatMap(r=>r.rows.flatMap(([e,,t])=>t?[e,t]:[e]))));function ji(a,r,e,t=()=>!0){let i=Ui(a,Ze(r),0,e),s=new Set(i.flatMap(o=>o.rows.flatMap(d=>[d.entityId,d.reading??""]))),n=r.filter(o=>!s.has(o.entity_id)&&!e.has(o.entity_id)&&!Qs.has(o.name)&&t(o));return n.length?[...i,{title:i.length?"More":null,rows:n.map(o=>({entityId:o.entity_id,name:o.name,label:o.name||o.entity_id})).sort((o,d)=>o.label.localeCompare(d.label))}]:i}var Bi=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 190">\r
<rect x="28" y="44" width="264" height="142" rx="12" fill="#9a9da2"/>\r
<rect x="33" y="49" width="58" height="132" rx="9" fill="#7d8086"/>\r
<rect x="96" y="49" width="191" height="132" rx="7" fill="#111214"/>\r
<rect x="104" y="61" width="175" height="108" rx="2" fill="#24303d"/>\r
<circle cx="191" cy="55" r="2.4" fill="#3a3f47"/>\r
</svg>\r
`;var Fi=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 190">\r
<rect x="4" y="4" width="312" height="182" rx="14" fill="#f2f2f0" stroke="#c4c5c3" stroke-width="2"/>\r
<rect x="10" y="10" width="72" height="170" rx="10" fill="#c8c9c7"/>\r
<circle cx="46" cy="164" r="3" fill="#a7a8a6"/>\r
<rect x="88" y="10" width="222" height="170" rx="8" fill="#111214"/>\r
<rect x="98" y="24" width="202" height="142" rx="2" fill="#24303d"/>\r
<circle cx="199" cy="17" r="2.6" fill="#3a3f47"/>\r
</svg>\r
`;var Wi=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 190">\r
<rect x="64" y="8" width="192" height="178" rx="14" fill="#f2f2f0" stroke="#c4c5c3" stroke-width="2"/>\r
<rect x="72" y="16" width="176" height="108" rx="9" fill="#111214"/>\r
<rect x="80" y="24" width="160" height="92" rx="2" fill="#24303d"/>\r
<circle cx="160" cy="20" r="2.2" fill="#3a3f47"/>\r
<rect x="72" y="130" width="176" height="50" rx="7" fill="#c6c7c8"/>\r
<circle cx="76" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="80" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="84" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="88" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="92" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="96" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="100" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="104" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="108" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="112" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="116" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="120" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="124" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="128" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="132" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="136" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="140" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="144" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="148" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="152" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="156" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="160" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="164" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="168" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="172" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="176" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="180" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="184" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="188" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="192" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="196" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="200" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="204" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="208" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="212" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="216" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="220" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="224" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="228" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="232" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="236" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="240" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="244" cy="136" r="0.9" fill="#d9dadb"/>\r
<circle cx="78" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="82" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="86" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="90" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="94" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="98" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="102" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="106" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="110" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="114" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="118" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="122" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="126" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="130" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="134" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="138" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="142" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="146" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="150" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="154" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="158" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="162" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="166" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="170" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="174" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="178" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="182" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="186" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="190" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="194" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="198" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="202" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="206" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="210" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="214" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="218" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="222" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="226" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="230" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="234" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="238" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="242" cy="140" r="0.9" fill="#d9dadb"/>\r
<circle cx="76" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="80" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="84" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="88" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="92" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="96" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="100" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="104" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="108" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="112" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="116" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="120" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="124" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="128" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="132" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="136" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="140" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="144" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="148" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="152" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="156" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="160" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="164" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="168" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="172" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="176" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="180" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="184" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="188" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="192" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="196" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="200" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="204" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="208" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="212" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="216" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="220" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="224" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="228" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="232" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="236" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="240" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="244" cy="144" r="0.9" fill="#d9dadb"/>\r
<circle cx="78" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="82" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="86" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="90" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="94" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="98" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="102" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="106" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="110" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="114" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="118" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="122" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="126" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="130" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="134" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="138" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="142" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="146" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="150" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="154" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="158" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="162" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="166" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="170" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="174" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="178" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="182" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="186" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="190" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="194" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="198" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="202" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="206" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="210" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="214" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="218" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="222" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="226" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="230" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="234" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="238" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="242" cy="148" r="0.9" fill="#d9dadb"/>\r
<circle cx="76" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="80" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="84" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="88" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="92" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="96" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="100" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="104" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="108" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="112" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="116" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="120" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="124" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="128" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="132" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="136" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="140" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="144" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="148" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="152" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="156" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="160" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="164" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="168" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="172" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="176" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="180" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="184" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="188" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="192" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="196" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="200" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="204" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="208" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="212" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="216" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="220" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="224" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="228" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="232" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="236" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="240" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="244" cy="152" r="0.9" fill="#d9dadb"/>\r
<circle cx="78" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="82" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="86" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="90" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="94" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="98" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="102" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="106" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="110" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="114" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="118" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="122" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="126" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="130" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="134" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="138" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="142" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="146" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="150" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="154" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="158" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="162" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="166" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="170" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="174" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="178" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="182" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="186" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="190" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="194" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="198" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="202" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="206" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="210" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="214" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="218" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="222" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="226" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="230" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="234" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="238" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="242" cy="156" r="0.9" fill="#d9dadb"/>\r
<circle cx="76" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="80" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="84" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="88" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="92" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="96" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="100" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="104" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="108" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="112" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="116" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="120" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="124" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="128" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="132" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="136" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="140" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="144" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="148" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="152" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="156" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="160" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="164" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="168" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="172" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="176" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="180" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="184" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="188" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="192" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="196" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="200" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="204" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="208" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="212" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="216" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="220" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="224" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="228" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="232" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="236" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="240" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="244" cy="160" r="0.9" fill="#d9dadb"/>\r
<circle cx="78" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="82" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="86" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="90" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="94" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="98" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="102" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="106" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="110" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="114" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="118" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="122" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="126" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="130" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="134" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="138" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="142" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="146" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="150" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="154" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="158" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="162" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="166" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="170" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="174" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="178" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="182" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="186" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="190" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="194" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="198" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="202" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="206" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="210" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="214" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="218" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="222" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="226" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="230" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="234" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="238" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="242" cy="164" r="0.9" fill="#d9dadb"/>\r
<circle cx="76" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="80" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="84" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="88" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="92" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="96" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="100" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="104" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="108" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="112" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="116" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="120" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="124" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="128" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="132" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="136" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="140" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="144" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="148" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="152" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="156" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="160" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="164" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="168" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="172" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="176" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="180" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="184" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="188" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="192" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="196" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="200" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="204" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="208" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="212" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="216" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="220" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="224" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="228" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="232" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="236" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="240" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="244" cy="168" r="0.9" fill="#d9dadb"/>\r
<circle cx="78" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="82" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="86" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="90" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="94" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="98" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="102" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="106" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="110" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="114" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="118" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="122" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="126" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="130" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="134" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="138" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="142" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="146" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="150" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="154" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="158" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="162" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="166" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="170" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="174" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="178" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="182" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="186" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="190" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="194" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="198" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="202" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="206" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="210" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="214" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="218" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="222" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="226" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="230" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="234" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="238" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="242" cy="172" r="0.9" fill="#d9dadb"/>\r
<circle cx="76" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="80" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="84" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="88" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="92" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="96" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="100" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="104" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="108" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="112" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="116" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="120" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="124" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="128" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="132" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="136" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="140" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="144" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="148" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="152" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="156" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="160" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="164" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="168" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="172" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="176" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="180" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="184" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="188" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="192" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="196" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="200" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="204" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="208" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="212" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="216" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="220" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="224" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="228" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="232" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="236" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="240" cy="176" r="0.9" fill="#d9dadb"/>\r
<circle cx="244" cy="176" r="0.9" fill="#d9dadb"/>\r
<rect x="241" y="140" width="2" height="22" rx="1" fill="#a9aaab"/>\r
</svg>\r
`;var qi=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 190">\r
<defs>\r
<clipPath id="l"><rect x="0" y="0" width="84" height="190"/></clipPath>\r
<clipPath id="r"><rect x="236" y="0" width="84" height="190"/></clipPath>\r
</defs>\r
<ellipse cx="160" cy="110" rx="154" ry="72" fill="#26272b"/>\r
<ellipse cx="160" cy="110" rx="146" ry="64" fill="#3a3b40" clip-path="url(#l)"/>\r
<ellipse cx="160" cy="110" rx="146" ry="64" fill="#3a3b40" clip-path="url(#r)"/>\r
<rect x="88" y="50" width="144" height="120" rx="8" fill="#0c0d0f"/>\r
<rect x="96" y="62" width="128" height="80" rx="2" fill="#24303d"/>\r
<circle cx="160" cy="56" r="2.4" fill="#3a3f47"/>\r
<rect x="152" y="152" width="16" height="5" rx="1" fill="#b9bcc2"/>\r
</svg>\r
`;var Vi=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 190">\r
<rect x="28" y="44" width="264" height="142" rx="12" fill="#2b2d31"/>\r
<rect x="33" y="49" width="58" height="132" rx="9" fill="#1f2125"/>\r
<rect x="96" y="49" width="191" height="132" rx="7" fill="#0b0c0e"/>\r
<rect x="104" y="61" width="175" height="108" rx="2" fill="#24303d"/>\r
<circle cx="191" cy="55" r="2.4" fill="#3a3f47"/>\r
</svg>\r
`;var St={athena:{shape:"show",lens:"wide",width:360},biscuit:{shape:"dot"},checkers:{shape:"show",lens:"round",width:300},cronos:{shape:"show",lens:"square",width:300},crown:{shape:"show",lens:"round",width:360},amber:{shape:"panel",picture:Bi,width:340,screen:{x:104,y:61,w:175,h:108}},blueberry:{shape:"panel",picture:Fi,width:380,screen:{x:98,y:24,w:202,h:142}},ivy:{shape:"panel",picture:Wi,width:320,screen:{x:80,y:24,w:160,h:92}},opal:{shape:"panel",picture:qi,width:340,screen:{x:96,y:62,w:128,h:80}},penghu:{shape:"panel",picture:Vi,width:380,screen:{x:104,y:61,w:175,h:108}}};function we(a){return St[a]??St.biscuit}function Gi(a){return!!a&&a in St}var aa=["EchoLocal","LANovo"],na="esphome",Ee=12;function oa(a){return!!a?.identifiers?.some(([r])=>r===na)}function Ki(a,r){return Object.values(a.devices??{}).filter(e=>e.via_device_id===r&&!e.disabled_by).sort((e,t)=>k(e).localeCompare(k(t)))}function M(a){return a?Object.values(a.devices??{}).filter(r=>la(a,r.id)&&!r.via_device_id&&!r.disabled_by).sort((r,e)=>k(r).localeCompare(k(e))):[]}function k(a){return a?.name_by_user||a?.name||""}function la(a,r){return!a||!aa.includes(a.devices?.[r]?.manufacturer??"")?!1:Ki(a,r).some(oa)}function U(a,r){if(!a||!r)return null;let e=a.devices?.[r];if(!e)return null;let t=new Set([r,...Ki(a,r).map(h=>h.id)]),i=Ei(a,Object.values(a.entities??{}).filter(h=>h.device_id&&t.has(h.device_id)&&!h.hidden)),s=Ze(i),n=h=>s.get(h)?.[0]?.entity_id,o=new Array(Ee).fill(void 0);for(let h of s.get("segment")??[]){let f=h.slot-1;f>=0&&f<Ee&&(o[f]=h.entity_id)}let d=n("hardware_board");return{device:e,entities:i,by:s,board:Gi(e.model)?e.model:d&&a.states?.[d]?.state||"",satellite:n("assist_satellite"),player:n("speaker"),update:n("firmware"),ring:n("ring"),segments:o,mute:n("mic_mute")}}function Li(a){return(a.by.get("wake_assistant")??[]).map(r=>r.entity_id)}function Pe(a,r){let e=r?a?.states?.[r]:void 0;return!e||e.state!=="on"?null:{rgb:e.attributes.rgb_color??[255,255,255],level:(e.attributes.brightness??255)/255}}function De(a,r){return!!r&&a?.states?.[r]?.state==="on"}function Yi(a,r){return(r?a?.states?.[r]?.state:void 0)??"unavailable"}function Xi(a,r){let e=new Array(Ee).fill(void 0),t=_t(a);if(!t)return e;let i=new Set(r.entities.map(s=>s.device_id));for(let s of t.values())!s.disabled||s.name!=="segment"||i.has(s.deviceId)&&s.slot>=1&&s.slot<=Ee&&(e[s.slot-1]=s.entityId);return e}async function Zi(a,r){await a.callWS({type:"config/entity_registry/update",entity_id:r,disabled_by:null})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ji={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},tt=a=>(...r)=>({_$litDirective$:a,values:r}),et=class{constructor(r){}get _$AU(){return this._$AM._$AU}_$AT(r,e,t){this._$Ct=r,this._$AM=e,this._$Ci=t}_$AS(r,e){return this.update(r,e)}update(r,e){return this.render(...e)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var de=class extends et{constructor(r){if(super(r),this.it=p,r.type!==Ji.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===p||r==null)return this._t=void 0,this.it=r;if(r===Y)return r;if(typeof r!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.it)return this._t;this.it=r;let e=[r];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}};de.directiveName="unsafeHTML",de.resultType=1;var Sl=tt(de);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Oe=class extends de{};Oe.directiveName="unsafeSVG",Oe.resultType=2;var it=tt(Oe);var Tt={Midnight:{background:"#0b0e14",text:"#e6edf3",muted:"#8b97a8",accent:"#4c9aff"},Nocturne:{background:"#11131a",text:"#e8e6e3",muted:"#9a97a3",accent:"#c8a2ff"},Slate:{background:"#14171c",text:"#dfe4ea",muted:"#8a929e",accent:"#5ec8c8"},Ember:{background:"#14100e",text:"#f3e7dd",muted:"#a8948a",accent:"#ff8c42"},Forest:{background:"#0e1512",text:"#dfeae2",muted:"#85998c",accent:"#5fbf8f"},Ocean:{background:"#081620",text:"#dceaf2",muted:"#7d9aa8",accent:"#36b6d6"},Plum:{background:"#150f1a",text:"#ece4f5",muted:"#9b8fae",accent:"#d86fd8"},Carbon:{background:"#000000",text:"#f2f2f2",muted:"#8c8c8c",accent:"#ffffff"},Paper:{background:"#f7f5f1",text:"#22252a",muted:"#6d7480",accent:"#2f6fdb"},Linen:{background:"#f3ece2",text:"#2b2622",muted:"#7b6f63",accent:"#b5652f"},Mist:{background:"#eef2f5",text:"#1f2933",muted:"#66737f",accent:"#2b93b6"},Bloom:{background:"#faf0f3",text:"#2e2329",muted:"#7d6a73",accent:"#d1547d"}},er="Paper",tr={Amber:"#f2a63b",Red:"#e5544b",Green:"#4caf78",Cyan:"#35b8c4",Blue:"#4f8ef7",Violet:"#9a7bf0",Pink:"#e86aa6"},Qi={Nano:9,Micro:12,Mini:15,Small:19,Medium:25,Large:33},Ct={x:27,y:33,w:186,h:93};function ir(a,r){let e=a.picture.match(/viewBox="([^"]+)"/)?.[1]??"0 0 320 190",t=a.picture.replace(/^[\s\S]*?<svg[^>]*>/,"").replace(/<\/svg>\s*$/,"");return x`
    <svg viewBox=${e} role="img" aria-label="Display">
      ${it(t)}
      ${sr(a.screen,a.box,a.muted,r)}
    </svg>
  `}function rr(a,r){let{screen:e}=a,t=a.controls??{},i=t.volume!==!1,s=t.mute!==!1,n=t.camera!==!1;return x`
    <svg viewBox="0 0 240 150" role="img" aria-label="Echo Show">
      ${i?At(140,x`<path d="M-3 0h6"></path>`,"Volume down",()=>r.volume(-1)):""}
      ${i?At(166,x`<path d="M-3 0h6M0 -3v6"></path>`,"Volume up",()=>r.volume(1)):""}
      ${s?At(192,x`<path d="M-1.6 -2.6a1.6 1.6 0 0 1 3.2 0v1.8a1.6 1.6 0 0 1-3.2 0z"></path>
              <path d="M-2.8 -0.6a2.8 2.8 0 0 0 5.6 0"></path>`,a.muted?"Microphone muted":"Microphone live",r.mute,a.muted):""}

      <rect x="4" y="14" width="232" height="130" rx="16" fill="var(--el-shell)"></rect>
      <rect x="4" y="14" width="232" height="130" rx="16" fill="none" stroke="var(--el-edge)"></rect>
      <rect x="11" y="21" width="218" height="116" rx="10" fill="var(--el-glass)"></rect>

      ${sr(e,Ct,a.muted,r.screen)}

      ${n?da(a.lens,a.covered,r.camera):""}
    </svg>
  `}function sr(a,r,e,t){let i=r.h/Ct.h;return x`<g class="screen" role="button" tabindex="0" aria-label="Screen" @click=${t}>
    <rect x=${r.x} y=${r.y} width=${r.w} height=${r.h} rx="2" fill=${a.palette.background}></rect>
    ${ca(a,r,i)}
    <rect
      x=${r.x}
      y=${r.y}
      width=${r.w}
      height=${r.h}
      rx="2"
      fill="#000"
      style="opacity:${(1-a.lit)*.7}"
    ></rect>
    <rect
      class="bar"
      data-muted=${String(e)}
      x=${r.x}
      y=${r.y+r.h-3*i}
      width=${r.w}
      height=${3*i}
    ></rect>
  </g>`}function ca(a,r,e){let t=(Qi[a.size]??Qi.Medium)*e,i=a.date?t*.42:0,s=t*.8+i,n=r.x+r.w/2,o;a.place==="Top"?o=r.y+8*e:a.place==="Bottom"?o=r.y+r.h-12*e-s:o=r.y+(r.h-s)/2;let d=a.place==="Bottom"?r.y+12*e:r.y+r.h-9*e,h=Math.round(44*r.w/(Ct.w*e));return x`
    <text
      class="clock"
      x=${n}
      y=${o+t*.8}
      text-anchor="middle"
      style="font-size:${t}px;fill:${a.ink}"
    >${a.time}</text>
    ${a.date?x`<text
          class="date"
          x=${n}
          y=${o+s}
          text-anchor="middle"
          style="font-size:${t*.3}px;fill:${a.palette.muted}"
        >${a.date}</text>`:""}
    ${a.line?x`<text
          class="line"
          x=${n}
          y=${d}
          text-anchor="middle"
          style="font-size:${6.5*e}px;fill:${a.palette.muted}"
        >${pa(a.line,h)}</text>`:""}
  `}function da(a,r,e){let t={round:x`<circle cx="0" cy="0" r="3.4"></circle>`,square:x`<rect x="-3.2" y="-3.2" width="6.4" height="6.4" rx="0.8"></rect>`,wide:x`<rect x="-6" y="-2.8" width="12" height="5.6" rx="1.2"></rect>`}[a];return x`<g
    class="lens"
    data-covered=${String(r)}
    transform="translate(203 27)"
    role="button"
    tabindex="0"
    aria-label=${r?"Camera covered":"Camera"}
    @click=${e}
  >
    <circle class="hit" cx="0" cy="0" r="8" fill="transparent"></circle>
    ${t}
  </g>`}function At(a,r,e,t,i=!1){return x`<g class="btn key" data-lit=${String(i)} transform="translate(${a} 12)"
    role="button" tabindex="0" aria-label=${e} @click=${t}>
    <rect class="hit" x="-13" y="-12" width="26" height="18" fill="transparent"></rect>
    <rect class="face" x="-11" y="-5" width="22" height="9" rx="4.5"></rect>
    <g class="glyph" transform="translate(0 -0.5)">${r}</g>
  </g>`}function pa(a,r){return a.length>r?`${a.slice(0,r-1)}\u2026`:a}var ha={device_id:"Device",shell:"Shell",help:"Explain each setting",elements:"Elements",label:"Name and status",activity:"Activity button",settings:"Settings button",diagnostics:"Diagnostics button",call:"Call button",action:"Action button",volume:"Volume buttons",mute:"Microphone button",ring:"Ring",microphone:"Microphone",playback:"Playback",screen:"Screen",poster:"Posters",camera:"Camera",assistant:"Assistant"},nr={label:!0,activity:!0,settings:!0,diagnostics:!0,call:!0,action:!0,volume:!0,mute:!0,ring:!0,microphone:!0,playback:!0,screen:!0,poster:!0,camera:!0,assistant:!0},pe={ring:"mdi:record-circle-outline",microphone:"mdi:microphone",playback:"mdi:speaker",screen:"mdi:monitor",poster:"mdi:image-multiple",camera:"mdi:camera",assistant:"mdi:account-voice",device:"mdi:cog-outline",diagnostics:"mdi:stethoscope",activity:"mdi:timeline-text-outline",follow:"mdi:backup-restore",close:"mdi:check"},ar={idle:"Idle",listening:"Listening",processing:"Thinking",responding:"Speaking",playing:"Playing",unavailable:"Unavailable",unknown:"Unknown"},ua=2500;function ma(a){let r=Math.log10(Math.max(a,1))/Math.log10(ua);return Math.min(1,Math.max(0,r))}var E=class extends g{constructor(){super(...arguments);this.opened=null;this.picked=null;this.holding=!1;this.timer=0;this.offering=null;this.now=new Date;this.clock=0;this.calling=!1;this.again=()=>this.requestUpdate()}static getConfigElement(){return document.createElement("echolocal-satellite-card-editor")}static getStubConfig(e){return{device_id:M(e)[0]?.id??""}}setConfig(e){if(!e?.device_id)throw new Error("Choose an EchoLocal device");this.config={...e}}getCardSize(){return 6}connectedCallback(){super.connectedCallback(),window.addEventListener(F,this.again),this.clock=window.setInterval(()=>this.now=new Date,15e3)}disconnectedCallback(){window.removeEventListener(F,this.again),clearInterval(this.clock),super.disconnectedCallback()}doing(e){let t=Yi(this.hass,e.satellite);return t!=="idle"?t:(e.player?this.hass?.states?.[e.player]?.state:void 0)==="playing"?"playing":t}shellFor(e){if(we(e.board).shape!=="dot")return"charcoal";let t=this.config?.shell;if(t&&t!=="auto")return t;let i=e.by.get("hardware_color")?.[0]?.entity_id,s=i?this.hass.states[i]?.state:void 0;return s==="black"||s==="white"?s:"grey"}lux(e){let t=e.by.get("lux")?.[0]?.entity_id,i=t?Number(this.hass.states[t]?.state):NaN;return Number.isNaN(i)?null:{value:i,lit:ma(i)}}render(){if(!this.hass||!this.config)return p;let e=U(this.hass,this.config.device_id);if(!e)return l`<ha-card><div class="missing">Device not found</div></ha-card>`;let t=this.doing(e),i=we(e.board),s=this.config.elements??{};return l`
      <ha-card>
        <div class="frame" data-shape=${i.shape}>
          <div
            class="art"
            data-shell=${this.shellFor(e)}
            data-activity=${t}
            style=${i.shape==="dot"?"":`max-width:${i.width}px`}
          >
            ${i.shape==="panel"?this.panel(e,t,i.picture,i.screen):i.shape==="show"?this.show(e,t,i.lens,s):ri({segments:this.segments(e),glow:this.glow(e),muted:De(this.hass,e.mute),holding:this.holding,picked:this.picked,divisible:[...e.segments,...this.switchedOff(e)].some(Boolean),lux:this.lux(e),controls:{action:s.action,volume:s.volume,mute:s.mute}},{ring:()=>this.open({kind:"ring",slot:0}),segment:n=>this.tapped(e,n),action:n=>this.pressed(e,n),mute:()=>this.toggle("switch",e.mute),volume:n=>this.volume(e,n)})}
          </div>

          <div class="side">${this.side(e,s)}</div>

          ${this.offering!==null?this.offer(e,this.offering):this.picked===null?this.foot(e,t,s):this.palette(e)}
        </div>
      </ha-card>

      ${this.popup(e)}
      ${this.calling?l`<echolocal-call
            .hass=${this.hass}
            .deviceId=${e.device.id}
            .name=${k(e.device)}
            .camera=${e.by.has("camera")}
            @closed=${()=>this.calling=!1}
          ></echolocal-call>`:p}
    `}show(e,t,i,s){let n=e.by.has("camera");return rr({lens:i,screen:this.screen(e,t),muted:De(this.hass,e.mute),covered:De(this.hass,this.entity(e,"camera_covered")),controls:{volume:s.volume,mute:s.mute,camera:s.camera}},{screen:()=>this.open({kind:"screen",slot:0}),camera:()=>n?this.open({kind:"camera",slot:0}):void 0,mute:()=>this.toggle("switch",e.mute),volume:o=>this.volume(e,o)})}panel(e,t,i,s){return ir({picture:i,box:s,screen:this.screen(e,t),muted:De(this.hass,e.mute)},()=>this.open({kind:"screen",slot:0}))}entity(e,t){return e.by.get(t)?.[0]?.entity_id}value(e,t){let i=this.entity(e,t);return i?this.hass.states[i]?.state:void 0}screen(e,t){let i=Tt[this.value(e,"theme")??""]??Tt[er],s=Number(this.value(e,"screen_brightness")??this.value(e,"backlight")),n=this.hass.config?.time_zone,d=new Intl.DateTimeFormat(void 0,{hour:"numeric",minute:"2-digit",hour12:this.value(e,"clock_format")==="12 hour",timeZone:n}).formatToParts(this.now).filter(f=>f.type==="hour"||f.type==="minute"||f.type==="literal").map(f=>f.value).join("").trim(),h=this.value(e,"clock_date")==="on"?new Intl.DateTimeFormat(void 0,{weekday:"short",month:"short",day:"numeric",timeZone:n}).format(this.now):null;return{palette:i,ink:tr[this.value(e,"clock_color")??""]??i.text,lit:Number.isNaN(s)?1:.15+.85*Math.min(1,Math.max(0,s/100)),time:d,date:h,size:this.value(e,"clock_size")??"",place:this.value(e,"clock_position")??"",line:this.playing(e,t)}}playing(e,t){if(t!=="idle"&&t!=="playing")return ar[t]??t;let i=e.player?this.hass.states[e.player]:void 0,s=i?.attributes.media_title??this.value(e,"sendspin_title"),n=i?.attributes.media_artist??this.value(e,"sendspin_artist");return t!=="playing"||!s?"":n?`${s} \xB7 ${n}`:String(s)}foot(e,t,i){let s=i.label!==!1,n=[i.call!==!1&&X(this.hass,e.device.name??"","call_offer")?this.square("mdi:phone","Call",()=>this.calling=!0):p,i.activity!==!1?this.square(pe.activity,"Activity",()=>this.open({kind:"activity",slot:0})):p,i.settings!==!1?this.square(pe.device,"Settings",()=>this.open({kind:"device",slot:0})):p,i.diagnostics!==!1?this.square(pe.diagnostics,"Diagnostics",()=>this.open({kind:"diagnostics",slot:0})):p].filter(o=>o!==p);return!s&&n.length===0?p:l`<div class="foot" data-label=${String(s)}>
      ${s?l`<div class="label">
            <div class="name">${k(e.device)}</div>
            <div class="status">${ar[t]??t}</div>
          </div>`:p}
      ${n.length>0?l`<div class="tail">${n}</div>`:p}
    </div>`}tapped(e,t){if(e.segments[t]){this.picked=this.picked===t?null:t;return}if(this.switchedOff(e)[t]){this.offering=t;return}this.open({kind:"ring",slot:0})}switchedOff(e){return Xi(this.hass,e)}offer(e,t){let i=this.switchedOff(e),s=async n=>{for(let o of n)o&&await Zi(this.hass,o);this.offering=null,this.picked=t};return l`<div class="foot">
      <div class="label">
        <div class="name">Segment ${t+1} disabled</div>
      </div>
      <div class="tail">
        <button class="plain" @click=${()=>s([i[t]])}>Enable</button>
        <button class="plain" @click=${()=>s(i)}>Enable all</button>
        <button class="plain quiet" @click=${()=>this.offering=null}>Cancel</button>
      </div>
    </div>`}palette(e){let t=e.segments[this.picked];return l`<div class="foot palette">
      <div class="top">
        <div class="name">Segment ${this.picked+1}</div>
        <div class="tail">
          ${this.square(pe.follow,"Follow the ring",()=>{this.hass.callService("light","turn_off",{entity_id:t}),this.picked=null})}
          ${this.square(pe.close,"Done",()=>this.picked=null)}
        </div>
      </div>
      <div class="swatches">
        ${Ke.map(([i,s])=>l`<button
            class="swatch"
            title=${i}
            aria-label=${i}
            style=${`background:rgb(${s.join(",")})`}
            @click=${()=>this.hass.callService("light","turn_on",{entity_id:t,rgb_color:s})}
          ></button>`)}
      </div>
    </div>`}segments(e){let t=Pe(this.hass,e.ring);return Array.from({length:ze},(i,s)=>{let n=Pe(this.hass,e.segments[s])??t;return{fill:n?`rgb(${n.rgb.join(",")})`:"var(--el-ring-off)",opacity:n?.25+.75*n.level:1}})}glow(e){return Pe(this.hass,e.ring)||e.segments.some(i=>Pe(this.hass,i))?.55:0}side(e,t){let i=Di(e),s=i.filter(n=>n.kind==="assistant").length>1;return i.filter(({kind:n})=>t[n]!==!1).map(({kind:n,slot:o})=>this.square(pe[n],this.titled(n,o),()=>this.open({kind:n,slot:o}),s&&n==="assistant"?o:null))}titled(e,t){let i={ring:"Ring",microphone:"Microphone",playback:"Playback",screen:"Screen",poster:"Posters",camera:"Camera",assistant:"Assistant",device:"Settings",diagnostics:"Diagnostics",activity:"Activity"}[e];return t?`${i} ${t}`:i}square(e,t,i,s=null){return l`<button class="sq" title=${t} aria-label=${t} @click=${i}>
      <ha-icon .icon=${e}></ha-icon>
      ${s?l`<span class="badge">${s}</span>`:p}
    </button>`}popup(e){if(!this.opened)return p;let{kind:t,slot:i}=this.opened,s,n=[];return t==="device"?s=Ni(e):t==="diagnostics"?{widgets:n,sections:s}=Ii(e):{widgets:n,sections:s}=Oi(t,e,i),l`<echolocal-dialog
      .hass=${this.hass}
      .heading=${this.titled(t,i)}
      .subtitle=${k(e.device)}
      .icon=${pe[t]}
      .sections=${s}
      .widgets=${n}
      .device=${e.device.name??""}
      .deviceId=${e.device.id}
      .help=${this.config.help!==!1}
      .about=${vi(t)}
      @closed=${()=>this.opened=null}
    ></echolocal-dialog>`}open(e){this.opened=e}pressed(e,t){if(t==="down"){this.holding=!1,this.timer=window.setTimeout(()=>this.holding=!0,ii);return}clearTimeout(this.timer);let i=this.holding;if(this.holding=!1,t==="cancel")return;let s=Li(e),n=s[i&&s.length>1?1:0];n?this.hass.callService("button","press",{entity_id:n}):this.moreInfo(e.satellite)}toggle(e,t){t&&this.hass.callService(e,"toggle",{entity_id:t})}volume(e,t){e.player&&this.hass.callService("media_player",t>0?"volume_up":"volume_down",{entity_id:e.player})}moreInfo(e){e&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))}};E.styles=b(ci),c([m({attribute:!1})],E.prototype,"hass",2),c([u()],E.prototype,"config",2),c([u()],E.prototype,"opened",2),c([u()],E.prototype,"picked",2),c([u()],E.prototype,"holding",2),c([u()],E.prototype,"offering",2),c([u()],E.prototype,"now",2),c([u()],E.prototype,"calling",2),E=c([v("echolocal-satellite-card")],E);var $e=class extends g{setConfig(r){this.config={...r}}render(){if(!this.hass||!this.config)return p;let r=U(this.hass,this.config.device_id),e=[{name:"device_id",required:!0,selector:{select:{mode:"dropdown",options:M(this.hass).map(t=>({value:t.id,label:k(t)}))}}},{name:"shell",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Auto (from device)"},{value:"black",label:"Black"},{value:"white",label:"White"},{value:"grey",label:"Grey"}]}}},{name:"help",selector:{boolean:{}}},{name:"elements",type:"expandable",icon:"mdi:eye-outline",schema:[{name:"label",selector:{boolean:{}}},{name:"activity",selector:{boolean:{}}},{name:"settings",selector:{boolean:{}}},{name:"diagnostics",selector:{boolean:{}}},{name:"call",selector:{boolean:{}}},{name:"action",selector:{boolean:{}}},{name:"volume",selector:{boolean:{}}},{name:"mute",selector:{boolean:{}}},{name:"ring",selector:{boolean:{}}},{name:"microphone",selector:{boolean:{}}},{name:"playback",selector:{boolean:{}}},{name:"screen",selector:{boolean:{}}},{name:"poster",selector:{boolean:{}}},{name:"camera",selector:{boolean:{}}},{name:"assistant",selector:{boolean:{}}}]}].filter(t=>t.name!=="shell"||!r||we(r.board).shape==="dot");return l`<ha-form
      .hass=${this.hass}
      .data=${{help:!0,shell:"auto",...this.config,elements:{...nr,...this.config.elements}}}
      .schema=${e}
      .computeLabel=${t=>ha[t.name]??t.name}
      @value-changed=${t=>this.emit(t.detail.value)}
    ></ha-form>`}emit(r){this.config={...this.config,...r},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}};c([m({attribute:!1})],$e.prototype,"hass",2),c([u()],$e.prototype,"config",2),$e=c([v("echolocal-satellite-card-editor")],$e);var rt=class extends E{static getStubConfig(r){return{...E.getStubConfig(r),elements:{...nr}}}};rt=c([v("echolocal-elements-card")],rt);var Mt=[];function R(a){Mt.push(a),Mt.sort((r,e)=>r.order-e.order||r.title.localeCompare(e.title))}function Rt(a){return Mt.filter(r=>a||!r.admin)}function or(a,r){let e=Ht(a),t=Rt(r);return t.find(i=>i.path===e)??t[0]}function lr(a,r){let e=r?`${a}/${r}`:a;location.pathname!==e&&history.pushState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}function zt(a,r){if(r!==void 0)return Ht(r);let e=location.pathname;return Ht(e.startsWith(a)?e.slice(a.length):"")}function Ht(a){return a.replace(/^\/+|\/+$/g,"")}var cr=`:host{display:block;height:100%;overflow:auto;background:var(--primary-background-color);color:var(--primary-text-color)}header{position:sticky;top:0;z-index:2;display:flex;align-items:center;background:var(--primary-background-color);border-bottom:1px solid color-mix(in srgb,var(--primary-text-color) 10%,transparent)}ha-menu-button{flex:0 0 auto;margin-left:4px}.bar{flex:1 1 auto;min-width:0;max-width:1280px;margin:0 auto;padding:0 16px;display:flex;gap:4px;overflow-x:auto;scrollbar-width:none}.bar::-webkit-scrollbar{display:none}button{display:flex;align-items:center;gap:7px;flex:0 0 auto;padding:14px 14px 12px;border:none;border-bottom:2px solid transparent;background:none;color:var(--secondary-text-color);font:inherit;font-size:.88rem;cursor:pointer}button:hover{color:var(--primary-text-color)}button[data-here=true]{color:var(--primary-color);border-bottom-color:var(--primary-color)}button ha-icon{--mdc-icon-size: 19px;display:flex}.page{max-width:1280px;margin:0 auto;padding:20px 16px 48px;box-sizing:border-box}@media(max-width:600px){button span{display:none}button{padding:14px 16px 12px}}
`;var Et="";async function ke(a){try{return await a.callWS({type:"config/label_registry/list"})??[]}catch{return[]}}function st(a,r){let e=new Map,t=[];for(let s of a){let n=s.labels??[];if(!n.length){t.push(s);continue}for(let o of n){let d=r.find(f=>f.label_id===o),h=e.get(o);h?h.devices.push(s):e.set(o,{id:o,name:d?.name??o,icon:d?.icon,devices:[s]})}}let i=[...e.values()].sort((s,n)=>s.name.localeCompare(n.name));return t.length&&i.push({id:Et,name:"Ungrouped",devices:t}),i}async function dr(a,r){try{return await a.callWS({type:"config/label_registry/create",name:r})}catch{return null}}async function pr(a,r,e){await a.callWS({type:"config/label_registry/update",label_id:r,name:e})}async function hr(a,r){await a.callWS({type:"config/label_registry/delete",label_id:r})}async function ur(a,r,e){await a.callWS({type:"config/device_registry/update",device_id:r,labels:[...new Set(e)]})}async function mr(a,r,e,t){let i=0,s=0,n=0;return await Promise.all(r.map(async o=>{let d=fr(a,o,e);if(!d){n+=1;return}try{await t(d),i+=1}catch{s+=1}})),{done:i,failed:s,missing:n}}function at(a,r,e){let t=r.map(s=>fr(a,s,e)).filter(s=>!!s),i=[...new Set(t.map(s=>a.states[s]?.state).filter(Boolean))];return{value:i.length===1?i[0]:null,mixed:i.length>1,entities:t}}function fr(a,r,e){return U(a,r.id)?.by.get(e)?.[0]?.entity_id}var gr=`:host{display:block;margin-bottom:10px}.bar{display:flex;align-items:center;gap:12px;padding:8px 4px 8px 2px;border-bottom:1px solid color-mix(in srgb,var(--primary-text-color) 10%,transparent)}.name{font-size:1.05rem;color:var(--primary-text-color)}.count{font-size:.78rem;color:var(--secondary-text-color)}.spacer{flex:1}button{display:flex;align-items:center;gap:6px;padding:5px 11px;border:1px solid color-mix(in srgb,var(--primary-text-color) 16%,transparent);border-radius:999px;background:none;color:var(--secondary-text-color);font:inherit;font-size:.8rem;cursor:pointer}button:hover{color:var(--primary-text-color);border-color:color-mix(in srgb,var(--primary-text-color) 34%,transparent)}button[data-on=true]{color:var(--primary-color);border-color:color-mix(in srgb,var(--primary-color) 50%,transparent);background:color-mix(in srgb,var(--primary-color) 12%,transparent)}button ha-icon{--mdc-icon-size: 16px;display:flex}.mixed{font-size:.7rem;opacity:.75}
`;var br="mic_mute",yr="ring",vr="speaker",ie=class extends g{constructor(){super(...arguments);this.said=""}render(){if(!this.hass||!this.group)return p;let e=this.group.devices,t=at(this.hass,e,br),i=at(this.hass,e,yr);return l`<div class="bar">
      ${this.group.icon?l`<ha-icon .icon=${this.group.icon}></ha-icon>`:p}
      <div class="name">${this.group.name}</div>
      <div class="count">${e.length} ${e.length===1?"device":"devices"}</div>
      <div class="spacer"></div>
      ${this.said?l`<div class="short">${this.said}</div>`:p}

      ${t.entities.length?this.toggle("mdi:microphone-off","Mute all",t,()=>this.write(br,"switch",t.value==="on"?"turn_off":"turn_on")):p}
      ${i.entities.length?this.toggle("mdi:lightbulb-outline","Ring",i,()=>this.write(yr,"light",i.value==="on"?"turn_off":"turn_on")):p}
      ${this.has(vr)?l`<button title="Stop whatever is playing" @click=${()=>this.write(vr,"media_player","media_stop")}>
            <ha-icon icon="mdi:stop"></ha-icon>Stop
          </button>`:p}
    </div>`}toggle(e,t,i,s){return l`<button data-on=${String(i.value==="on")} @click=${s}>
      <ha-icon .icon=${e}></ha-icon>${t}
      ${i.mixed?l`<span class="mixed">mixed</span>`:p}
    </button>`}has(e){return at(this.hass,this.group.devices,e).entities.length>0}async write(e,t,i){let{done:s,failed:n,missing:o}=await mr(this.hass,this.group.devices,e,h=>this.hass.callService(t,i,{entity_id:h})),d=n+o;this.said=d?`${s} of ${s+d}`:"",this.said&&setTimeout(()=>this.said="",4e3)}};ie.styles=b(gr),c([m({attribute:!1})],ie.prototype,"hass",2),c([m({attribute:!1})],ie.prototype,"group",2),c([u()],ie.prototype,"said",2),ie=c([v("echolocal-groupbar")],ie);var xr=`:host{display:block}.group{margin-bottom:26px}.view{display:flex;justify-content:flex-end;margin-bottom:14px}.pair{display:flex;border:1px solid color-mix(in srgb,var(--primary-text-color) 16%,transparent);border-radius:999px;overflow:hidden}.pair button{display:flex;align-items:center;gap:6px;padding:5px 13px;border:none;background:none;color:var(--secondary-text-color);font:inherit;font-size:.8rem;cursor:pointer}.pair button:hover{color:var(--primary-text-color)}.pair button[data-on=true]{color:var(--primary-color);background:color-mix(in srgb,var(--primary-color) 14%,transparent)}.pair button ha-icon{--mdc-icon-size: 16px;display:flex}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:16px;align-items:start}.empty{color:var(--secondary-text-color);max-width:46ch;line-height:1.5}
`;R({path:"",title:"Home",icon:"mdi:view-grid-outline",element:"echolocal-home",order:0});var wr="echolocal:home:grouped",W=class extends g{constructor(){super(...arguments);this.narrow=!1;this.known=[];this.asked=!1;this.grouped=localStorage.getItem(wr)!=="no";this.cards=new Map}updated(){this.asked||!this.hass||(this.asked=!0,this.load())}render(){if(!this.hass)return p;let e=M(this.hass);if(!e.length)return l`<div class="empty">
        No EchoLocal devices yet. One appears here once Home Assistant has adopted it over the ESPHome
        integration.
      </div>`;let t=st(e,this.known),i=t.some(n=>n.id!==Et),s=this.grouped&&i?t:[{id:"all",name:"All devices",devices:e}];return l`
      ${i?l`<div class="view">
            <div class="pair">
              ${this.button(!0,"mdi:group","Grouped")}${this.button(!1,"mdi:view-grid-outline","All")}
            </div>
          </div>`:p}
      ${s.map(n=>this.group(n))}
    `}button(e,t,i){return l`<button
      data-on=${String(this.grouped===e)}
      @click=${()=>{this.grouped=e,localStorage.setItem(wr,e?"yes":"no")}}
    >
      <ha-icon .icon=${t}></ha-icon>${i}
    </button>`}group(e){return l`<div class="group">
      <echolocal-groupbar .hass=${this.hass} .group=${e}></echolocal-groupbar>
      <div class="grid">${e.devices.map(t=>this.card(e.id,t.id))}</div>
    </div>`}card(e,t){let i=`${e}/${t}`,s=this.cards.get(i);return s||(s=document.createElement("echolocal-satellite-card"),s.setConfig({device_id:t}),this.cards.set(i,s)),s.hass=this.hass,s}async load(){this.known=await ke(this.hass)}};W.styles=b(xr),c([m({attribute:!1})],W.prototype,"hass",2),c([m({type:Boolean})],W.prototype,"narrow",2),c([u()],W.prototype,"known",2),c([u()],W.prototype,"asked",2),c([u()],W.prototype,"grouped",2),W=c([v("echolocal-home")],W);var $r=`:host{display:block}.make{display:flex;gap:8px;margin-bottom:20px}ha-input.new{flex:1;max-width:280px}table{width:100%;border-collapse:collapse;font-size:.9rem}th{padding:8px 10px;text-align:center;font-weight:600;font-size:.72rem;text-transform:uppercase;letter-spacing:.07em;color:var(--secondary-text-color);white-space:nowrap}th.who{text-align:left}th .label{display:flex;align-items:center;justify-content:center;gap:4px}th ha-input{--ha-input-text-align: center}th ha-icon-button{--mdc-icon-size: 15px;color:var(--secondary-text-color)}th ha-icon-button:hover{color:var(--error-color, #db4437)}td{padding:10px;border-top:1px solid color-mix(in srgb,var(--primary-text-color) 10%,transparent);text-align:center}td.who{text-align:left;color:var(--primary-text-color)}.none{color:var(--secondary-text-color);max-width:52ch;line-height:1.5}
`;R({path:"groups",title:"Groups",icon:"mdi:group",element:"echolocal-groups",order:30,admin:!0});var q=class extends g{constructor(){super(...arguments);this.known=[];this.asked=!1;this.naming="";this.busy=!1}connectedCallback(){super.connectedCallback(),this.hass?.connection?.subscribeEvents(()=>this.load(),"label_registry_updated").then(e=>this.stop=e).catch(()=>{})}disconnectedCallback(){super.disconnectedCallback(),this.stop?.()}updated(){this.asked||!this.hass||(this.asked=!0,this.load())}render(){if(!this.hass)return p;let e=M(this.hass),t=this.known;return l`
      <div class="make">
        <ha-input
          class="new"
          placeholder="New group"
          .value=${this.naming}
          @input=${i=>this.naming=i.target.value}
          @keydown=${i=>i.key==="Enter"&&this.make()}
        ></ha-input>
        <ha-button
          .disabled=${!this.naming.trim()||this.busy}
          .loading=${this.busy}
          @click=${this.make}
        >
          Add
        </ha-button>
      </div>

      ${e.length?l`<table>
            <thead>
              <tr>
                <th class="who">Device</th>
                ${t.map(i=>this.head(i))}
              </tr>
            </thead>
            <tbody>
              ${e.map(i=>this.row(i,t))}
            </tbody>
          </table>`:l`<div class="none">
            No EchoLocal devices yet, so there is nothing to group.
          </div>`}
    `}head(e){let t=st(M(this.hass),this.known).find(i=>i.id===e.label_id)?.devices.length;return l`<th>
      <div class="label">
        <ha-input
          .value=${e.name}
          style=${`width:${Math.max(8,e.name.length+2)}ch`}
          @change=${i=>this.rename(e,i.target.value)}
        ></ha-input>
        <ha-icon-button
          .label=${t?`Delete ${e.name}, ${t} still in it`:`Delete ${e.name}`}
          @click=${()=>this.discard(e)}
        >
          <ha-icon icon="mdi:close"></ha-icon>
        </ha-icon-button>
      </div>
    </th>`}row(e,t){let i=e.labels??[];return l`<tr>
      <td class="who">${k(e)}</td>
      ${t.map(s=>l`<td>
          <ha-checkbox
            aria-label="${k(e)} in ${s.name}"
            .checked=${i.includes(s.label_id)}
            @change=${n=>this.set(e,s.label_id,n.target.checked)}
          ></ha-checkbox>
        </td>`)}
    </tr>`}async make(){let e=this.naming.trim();if(!e||this.busy)return;this.busy=!0,this.naming="";let t=await dr(this.hass,e);t&&(this.known=[...this.known,t].sort((i,s)=>i.name.localeCompare(s.name))),this.busy=!1,t||await this.load()}async rename(e,t){!t.trim()||t===e.name||(this.known=this.known.map(i=>i.label_id===e.label_id?{...i,name:t.trim()}:i),await pr(this.hass,e.label_id,t.trim()))}async discard(e){this.known=this.known.filter(t=>t.label_id!==e.label_id),await hr(this.hass,e.label_id)}async set(e,t,i){let s=new Set(e.labels??[]);i?s.add(t):s.delete(t),await ur(this.hass,e.id,[...s])}async load(){this.known=await ke(this.hass)}};q.styles=b($r),c([m({attribute:!1})],q.prototype,"hass",2),c([u()],q.prototype,"known",2),c([u()],q.prototype,"asked",2),c([u()],q.prototype,"naming",2),c([u()],q.prototype,"busy",2),q=c([v("echolocal-groups")],q);var kr=`:host{display:block}.filters{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px}.filters button{padding:5px 12px;border:1px solid color-mix(in srgb,var(--primary-text-color) 16%,transparent);border-radius:999px;background:none;color:var(--secondary-text-color);font:inherit;font-size:.8rem;cursor:pointer}.filters button[data-on=true]{color:var(--primary-color);border-color:color-mix(in srgb,var(--primary-color) 50%,transparent);background:color-mix(in srgb,var(--primary-color) 12%,transparent)}.turns{display:grid;gap:8px}.turn{display:grid;grid-template-columns:auto 9ch 1fr auto;gap:3px 12px;align-items:center;padding:11px 14px;border-radius:12px;background:color-mix(in srgb,var(--primary-text-color) 5%,transparent)}.right{display:flex;align-items:center;gap:10px;justify-content:flex-end}.when{font-size:.78rem;color:var(--secondary-text-color);font-variant-numeric:tabular-nums}.who{font-size:.88rem;color:var(--primary-text-color);overflow:hidden;text-overflow:ellipsis}.content{display:flex;flex-direction:column;gap:2px;min-width:0}.wake{font-size:.8rem;color:var(--primary-color);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.said,.said-back{font-size:.88rem;color:var(--secondary-text-color);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.said-back:before{content:"\\21b3  ";opacity:.6}.took{font-size:.8rem;color:var(--secondary-text-color);font-variant-numeric:tabular-nums}.took[data-bad=true]{color:var(--error-color, #db4437)}.bar{grid-column:2 / -1;display:flex;height:20px;margin-top:5px;border-radius:5px;overflow:hidden;background:color-mix(in srgb,var(--primary-text-color) 8%,transparent)}.slice{display:flex;align-items:center;justify-content:center;overflow:hidden;font-size:.68rem;font-variant-numeric:tabular-nums;color:var(--text-primary-color, #fff);white-space:nowrap}.slice[data-phase=listen_ms]{background:color-mix(in srgb,var(--info-color, #039be5) 55%,var(--primary-text-color))}.slice[data-phase=think_ms]{background:var(--secondary-text-color)}.slice[data-phase=speak_ms]{background:var(--success-color, #43a047)}.none{color:var(--secondary-text-color);max-width:56ch;line-height:1.5}.loading{display:flex;justify-content:center;padding:48px 0}.legend{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:14px;font-size:.72rem;color:var(--secondary-text-color)}.key{display:flex;align-items:center;gap:5px}.dot{width:9px;height:9px;border-radius:2px}
`;R({path:"activity",title:"Activity",icon:"mdi:timeline-text-outline",element:"echolocal-activity",order:20});var xa=14,V=class extends g{constructor(){super(...arguments);this.seen=[];this.only="";this.asked=!1;this.loading=!0}updated(){this.asked||!this.hass||(this.asked=!0,this.listen())}disconnectedCallback(){super.disconnectedCallback(),this.stop?.()}render(){if(!this.hass)return p;let e=this.names(),t=this.only?this.seen.filter(s=>s.turn.device===this.only):this.seen,i=Math.max(1,...t.map(s=>be(s.turn)));return l`
      ${this.seen.length>0&&Object.keys(e).length>1?l`<div class="filters">
            <button data-on=${String(!this.only)} @click=${()=>this.only=""}>Everything</button>
            ${[...new Set(this.seen.map(s=>s.turn.device))].map(s=>l`<button
                data-on=${String(this.only===s)}
                @click=${()=>this.only=s}
              >
                ${e[s]?.label??s}
              </button>`)}
          </div>`:p}

      ${t.length?l`<div class="legend">
              ${[["listen_ms","Listen"],["think_ms","Think"],["speak_ms","Reply"]].map(([s,n])=>l`<span class="key"
                  ><span class="dot slice" data-phase=${s}></span>${n}</span
                >`)}
            </div>
            <div class="turns">${t.map(s=>this.row(s,e,i))}</div>`:this.loading?l`<div class="loading"><ha-spinner size="large"></ha-spinner></div>`:l`<div class="none">No recent activity found.</div>`}
    `}row(e,t,i){let s=ge(e.turn),n=be(e.turn),o=e.turn.outcome!=="completed",d=t[e.turn.device],h=d?.label??"elsewhere";return l`<div class="turn">
      <div class="when">${$a(e.at)}</div>
      <div class="who">${h}</div>
      <div class="content">
        <div class="wake">${e.turn.wake_word}</div>
        ${e.turn.heard?l`<div class="said">${e.turn.heard}</div>`:p}
        ${e.turn.reply?l`<div class="said-back">${e.turn.reply}</div>`:p}
      </div>
      <div class="right">
        <div class="took" data-bad=${String(o)}>
          ${o?e.turn.outcome:`${(n/1e3).toFixed(1)}s`}
        </div>
        ${e.turn.audio_seconds?l`<echolocal-recording
              .hass=${this.hass}
              .device=${d?.node??""}
              .turn=${e.turn.id}
              .at=${e.at}
              .filename=${wa(e,h)}
            ></echolocal-recording>`:p}
      </div>
      ${s.length?l`<div class="bar">
            ${s.map(f=>l`<div
                class="slice"
                data-phase=${f.key}
                title=${`${f.label} ${f.ms} ms`}
                style=${`flex:0 0 ${f.ms/i*100}%`}
              >
                ${(f.ms/1e3).toFixed(1)}s
              </div>`)}
          </div>`:p}
    </div>`}names(){let e={};for(let t of M(this.hass))e[t.id]={label:k(t),node:t.name??""};return e}async listen(){let e=new Date(Date.now()-xa*864e5),t=M(this.hass).map(i=>i.id);if(!t.length){this.asked=!1;return}try{this.stop=await Le(this.hass,e,t,i=>{this.loading=!1,i.length&&(this.seen=[...i,...this.seen].sort((s,n)=>n.at-s.at))})}catch{this.loading=!1}}};V.styles=b(kr),c([m({attribute:!1})],V.prototype,"hass",2),c([u()],V.prototype,"seen",2),c([u()],V.prototype,"only",2),c([u()],V.prototype,"asked",2),c([u()],V.prototype,"loading",2),V=c([v("echolocal-activity")],V);function wa(a,r){let e=new Date(a.at).toISOString().replace(/[:.]/g,"-").slice(0,19),t=i=>i.toLowerCase().replace(/[^a-z0-9]+/g,"-");return`${e}-${t(r)}-${t(a.turn.wake_word)}.wav`}function $a(a){return new Date(a).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}var _r=`:host{display:block}.scroll{overflow-x:auto}table{width:100%;border-collapse:collapse;font-size:.88rem}th{padding:8px 12px;text-align:right;white-space:nowrap;font-weight:600;font-size:.71rem;text-transform:uppercase;letter-spacing:.07em;color:var(--secondary-text-color);cursor:pointer;user-select:none}th:first-child{text-align:left}th:hover{color:var(--primary-text-color)}th[data-by=true]{color:var(--primary-color)}td{padding:11px 12px;text-align:right;white-space:nowrap;border-top:1px solid color-mix(in srgb,var(--primary-text-color) 10%,transparent);font-variant-numeric:tabular-nums;color:var(--secondary-text-color)}td.who{text-align:left;color:var(--primary-text-color)}td.who button{padding:0;border:none;background:none;color:inherit;font:inherit;cursor:pointer;text-align:left}td.who button:hover{color:var(--primary-color)}td[data-wrong=warn]{color:var(--warning-color, #ffa600)}td[data-wrong=bad]{color:var(--error-color, #db4437);font-weight:600}tr[data-off=true] td{opacity:.5}.none{color:var(--secondary-text-color)}
`;R({path:"health",title:"Health",icon:"mdi:heart-pulse",element:"echolocal-health",order:40});function Pt(a){let r=Number(a.state);return a.attributes.unit_of_measurement==="\xB0F"?(r-32)*5/9:r}var Dt=[{title:"Version",name:"firmware",show:a=>String(a.attributes.installed_version??"\u2014"),sort:a=>String(a.attributes.installed_version??"")},{title:"Update",name:"firmware",show:a=>a.state==="on"?"waiting":a.state==="off"?"current":a.state,wrong:a=>a.state==="on"?"warn":void 0,sort:a=>a.state},{title:"Wifi",name:"wifi_signal",show:a=>`${Math.round(Number(a.state))} ${a.attributes.unit_of_measurement||"dBm"}`,wrong:a=>Number(a.state)<-80?"bad":Number(a.state)<-70?"warn":void 0},{title:"CPU",name:"cpu_temperature",show:a=>`${Math.round(Number(a.state))}${a.attributes.unit_of_measurement||"\xB0C"}`,wrong:a=>Pt(a)>85?"bad":Pt(a)>70?"warn":void 0,sort:Pt},{title:"Load",name:"load_average",show:a=>Number(a.state).toFixed(2)},{title:"Memory",name:"memory_available",show:a=>`${Math.round(Number(a.state))} ${a.attributes.unit_of_measurement||"MB"}`,wrong:a=>Number(a.state)<40?"bad":Number(a.state)<80?"warn":void 0},{title:"Disk",name:"free_space",show:a=>`${Math.round(Number(a.state))} ${a.attributes.unit_of_measurement||"MB"}`,wrong:a=>Number(a.state)<50?"bad":Number(a.state)<150?"warn":void 0},{title:"Address",name:"ip_address",show:a=>a.state.split(", ")[0]??a.state}],re=class extends g{constructor(){super(...arguments);this.by="";this.down=!1}render(){if(!this.hass)return p;let e=M(this.hass);if(!e.length)return l`<div class="none">No EchoLocal devices yet.</div>`;let t=e.map(s=>this.read(s)),i=this.sort(t);return l`<div class="scroll">
      <table>
        <thead>
          <tr>
            ${this.head("Device")}${Dt.map(s=>this.head(s.title))}
          </tr>
        </thead>
        <tbody>
          ${i.map(s=>l`<tr data-off=${String(!s.up)}>
              <td class="who">
                <button @click=${()=>this.open(s.device)}>${s.name}</button>
              </td>
              ${Dt.map(n=>{let o=s.cells[n.title];return l`<td data-wrong=${o?.wrong??""}>${o?.text??"\u2014"}</td>`})}
            </tr>`)}
        </tbody>
      </table>
    </div>`}head(e){return l`<th
      data-by=${String(this.by===e)}
      @click=${()=>{this.down=this.by===e?!this.down:!1,this.by=e}}
    >
      ${e}
    </th>`}read(e){let t=U(this.hass,e.id),i={},s=!1;for(let n of Dt){let o=t?.by.get(n.name)?.[0]?.entity_id,d=o?this.hass.states[o]:void 0;if(!d||d.state==="unavailable"||d.state==="unknown")continue;s=!0;let h=Number(d.state),f=d.attributes.unit_of_measurement??"";i[n.title]={text:n.show?n.show(d):f?`${d.state} ${f}`:d.state,sort:n.sort?n.sort(d):Number.isFinite(h)&&d.state!==""?h:d.state,wrong:n.wrong?.(d)}}return{device:e,name:k(e),cells:i,up:s}}sort(e){if(!this.by)return e;let t=i=>this.by==="Device"?i.name:i.cells[this.by]?.sort??"";return[...e].sort((i,s)=>{let n=t(i),o=t(s),d=typeof n=="number"&&typeof o=="number"?n-o:String(n).localeCompare(String(o));return this.down?-d:d})}open(e){history.pushState(null,"",`/config/devices/device/${e.id}`),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}};re.styles=b(_r),c([m({attribute:!1})],re.prototype,"hass",2),c([u()],re.prototype,"by",2),c([u()],re.prototype,"down",2),re=c([v("echolocal-health")],re);var Sr=`:host{display:block}.zone{display:flex;align-items:center;gap:12px;padding:16px;margin-bottom:16px;border:1px dashed color-mix(in srgb,var(--primary-text-color) 22%,transparent);border-radius:14px;background:color-mix(in srgb,var(--primary-text-color) 4%,transparent);cursor:pointer;transition:border-color .15s ease,background .15s ease}.zone[data-over=true]{border-color:var(--primary-color);background:color-mix(in srgb,var(--primary-color) 12%,transparent)}.zone ha-icon{--mdc-icon-size: 24px;color:var(--secondary-text-color);display:flex;flex:0 0 auto}.zone[data-over=true] ha-icon{color:var(--primary-color)}.lead{font-size:.95rem;color:var(--primary-text-color)}.sub{font-size:.78rem;color:var(--secondary-text-color)}.scroll{overflow-x:auto}table{width:100%;border-collapse:collapse;font-size:.85rem}th{padding:0 10px 6px;text-align:left;font-size:.68rem;font-weight:600;text-transform:uppercase;letter-spacing:.07em;color:var(--secondary-text-color);white-space:nowrap}td{padding:4px 10px;border-top:1px solid color-mix(in srgb,var(--primary-text-color) 8%,transparent);vertical-align:middle}tbody tr[data-used=true] td:first-child{box-shadow:inset 3px 0 0 var(--success-color, #43a047)}tbody tr[data-used=false] td:first-child{box-shadow:inset 3px 0 0 var(--info-color, #039be5)}tbody tr[data-bad=true] td:first-child{box-shadow:inset 3px 0 0 var(--error-color, #db4437)}tbody tr:hover td{background:color-mix(in srgb,var(--primary-text-color) 4%,transparent)}.say{width:22ch}.say ha-input{--ha-input-padding-top: 0;--ha-input-padding-bottom: 0}.say ha-input::part(wa-base){border-color:transparent;background:none;min-height:34px}.say ha-input:hover::part(wa-base){border-color:color-mix(in srgb,var(--primary-text-color) 22%,transparent)}.say ha-input:focus-within::part(wa-base){border-color:var(--primary-color)}.say ha-input::part(wa-input){font-size:.9rem;padding-inline:8px}.id{font-family:var(--ha-font-family-code, monospace);font-size:.78rem;color:var(--secondary-text-color);word-break:break-all}.facts{color:var(--secondary-text-color);font-size:.78rem;font-variant-numeric:tabular-nums;white-space:nowrap}.end{text-align:right}.acts{display:flex;gap:2px;justify-content:flex-end}.act{width:30px;height:30px;display:grid;place-items:center;padding:0;border:none;border-radius:50%;background:none;color:var(--secondary-text-color);cursor:pointer}.act:hover{background:color-mix(in srgb,var(--primary-color) 16%,transparent);color:var(--primary-color)}.act.bin:hover{background:color-mix(in srgb,var(--error-color, #db4437) 16%,transparent);color:var(--error-color, #db4437)}.act ha-icon{--mdc-icon-size: 18px;display:flex}tr.wrong td{border-top:none;padding-top:0;font-size:.76rem;color:var(--error-color, #db4437)}.none{padding:4px 0;font-size:.85rem;color:var(--secondary-text-color)}input[type=file]{display:none}
`;async function Ot(a){try{return(await a.callWS({type:"echolocal/wake_words/list"}))?.wake_words??[]}catch{return[]}}var O=class extends g{constructor(){super(...arguments);this.inUse=new Set;this.words=[];this.over=!1;this.busy=!1;this.said="";this.asked=!1;this.dropped=e=>{e.preventDefault(),this.over=!1,this.add(e.dataTransfer?.files??null)}}updated(){this.asked||!this.hass||(this.asked=!0,this.refresh())}render(){return l`
      <div
        class="zone"
        data-over=${String(this.over)}
        @click=${()=>this.shadowRoot?.querySelector("input[type=file]")?.click()}
        @dragover=${e=>{e.preventDefault(),this.over=!0}}
        @dragleave=${()=>this.over=!1}
        @drop=${this.dropped}
      >
        ${this.busy?l`<ha-spinner></ha-spinner>`:l`<ha-icon icon="mdi:tray-arrow-up"></ha-icon>`}
        <div>
          <div class="lead">${this.busy?"Adding\u2026":"Drop a .tflite wake model here"}</div>
          <div class="sub">
            ${this.said||"Every satellite is offered the whole set and downloads what it is told to listen for"}
          </div>
        </div>
        <input
          type="file"
          accept=".tflite"
          multiple
          @change=${e=>this.add(e.target.files)}
        />
      </div>

      ${this.words.length?l`<div class="scroll">
            <table>
              <thead>
                <tr>
                  <th class="say">Wake word</th>
                  <th>File</th>
                  <th>Model</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                ${this.words.map(e=>this.row(e))}
              </tbody>
            </table>
          </div>`:l`<div class="none">
            Nothing in custom_wake_words yet. Whatever the firmware ships with is unaffected.
          </div>`}
    `}row(e){let t=[e.type||"no type",e.size?`${Math.round(e.size/1024)} KB`:"no model",...e.trained_languages.length?[e.trained_languages.join(", ")]:[]],i=this.inUse.has(e.wake_word);return l`<tr data-bad=${String(e.problems.length>0)} data-used=${String(i)}>
      <td class="say">
        <ha-input
          appearance="outlined"
          .value=${e.wake_word}
          placeholder="what wakes it"
          @change=${s=>this.rename(e,s.target.value)}
        ></ha-input>
      </td>
      <td class="id">${e.id}</td>
      <td class="facts">${t.join(" \xB7 ")}</td>
      <td class="end">
        <div class="acts">
          ${e.model_url?l`<a class="act" href=${e.model_url} download title=${`${e.id}.tflite`}>
                <ha-icon icon="mdi:waveform"></ha-icon>
              </a>`:p}
          ${e.config_url?l`<a class="act" href=${e.config_url} download title=${`${e.id}.json`}>
                <ha-icon icon="mdi:code-json"></ha-icon>
              </a>`:p}
          <button class="act bin" title=${`Remove ${e.id}`} @click=${()=>this.discard(e)}>
            <ha-icon icon="mdi:trash-can-outline"></ha-icon>
          </button>
        </div>
      </td>
    </tr>
    ${e.problems.length?l`<tr class="wrong" data-bad="true">
          <td colspan="4">${e.problems.join(". ")}.</td>
        </tr>`:p}`}async add(e){let t=[...e??[]].filter(i=>i.name.endsWith(".tflite"));if(!t.length){this.said="A wake model is a .tflite file.";return}this.busy=!0,this.said="";for(let i of t){let s=new FormData;s.append("file",i);try{let n=await fetch("/api/echolocal/wake_words",{method:"POST",body:s,headers:this.credentials()});if(!n.ok){let o=await n.json().catch(()=>({}));this.said=o.error??`Home Assistant refused ${i.name}.`;break}}catch(n){this.said=`That did not reach Home Assistant: ${n}`;break}}this.busy=!1,await this.refresh()}async rename(e,t){t!==e.wake_word&&(await this.hass.callWS({type:"echolocal/wake_words/update",wake_word_id:e.id,wake_word:t}),await this.refresh())}async discard(e){await this.hass.callWS({type:"echolocal/wake_words/delete",wake_word_id:e.id}),await this.refresh()}async refresh(){this.words=await Ot(this.hass)}credentials(){let e=this.hass.auth?.data?.access_token;return e?{authorization:`Bearer ${e}`}:{}}};O.styles=b(Sr),c([m({attribute:!1})],O.prototype,"hass",2),c([m({attribute:!1})],O.prototype,"inUse",2),c([u()],O.prototype,"words",2),c([u()],O.prototype,"over",2),c([u()],O.prototype,"busy",2),c([u()],O.prototype,"said",2),c([u()],O.prototype,"asked",2),O=c([v("echolocal-wake-words")],O);var Ar=`:host{display:block}h2.first{margin-top:0}h2{margin:26px 0 10px;font-size:.72rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--secondary-text-color)}.listening{display:grid;gap:8px}.who{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;padding:10px 14px;border-radius:12px;background:color-mix(in srgb,var(--primary-text-color) 5%,transparent);font-size:.9rem}.who .name{color:var(--primary-text-color);min-width:8ch}.word{padding:2px 9px;border-radius:999px;font-size:.78rem;background:color-mix(in srgb,var(--primary-color) 16%,transparent);color:var(--primary-color)}.word[data-gone=true]{background:color-mix(in srgb,var(--error-color, #db4437) 16%,transparent);color:var(--error-color, #db4437)}.spare{font-size:.85rem;color:var(--secondary-text-color);line-height:1.5}.heading{display:flex;align-items:baseline;gap:14px;flex-wrap:wrap}.legend{display:flex;gap:14px;flex-wrap:wrap;margin-left:auto;font-size:.72rem;color:var(--secondary-text-color)}.key{display:flex;align-items:center;gap:5px}.dot{width:9px;height:9px;border-radius:2px;background:var(--info-color, #039be5)}.dot[data-used=true]{background:var(--success-color, #43a047)}
`;R({path:"wake-words",title:"Wake words",icon:"mdi:waveform",element:"echolocal-words",order:10,admin:!0});var se=class extends g{constructor(){super(...arguments);this.words=[];this.asked=!1;this.again=()=>this.requestUpdate()}connectedCallback(){super.connectedCallback(),window.addEventListener(F,this.again)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(F,this.again)}updated(){this.asked||!this.hass||(this.asked=!0,this.load())}render(){if(!this.hass)return p;let e=this.chosen(),t=new Set(this.words.filter(s=>s.problems.length&&s.wake_word).map(s=>s.wake_word)),i=new Set(e.flatMap(s=>s.words));return l`
      <h2 class="first">Listening for</h2>
      ${e.length?l`<div class="listening">
            ${e.map(s=>l`<div class="who">
                <span class="name">${s.name}</span>
                ${s.words.map(n=>l`<span
                      class="word"
                      data-gone=${String(t.has(n))}
                      title=${t.has(n)?"Its library entry is broken, so it is not offered":""}
                      >${n}</span
                    >`)}
              </div>`)}
          </div>`:l`<div class="spare">No devices have picked a wake word yet.</div>`}

      <div class="heading">
        <h2>The library</h2>
        <div class="legend">
          <span class="key"><span class="dot" data-used="true"></span>Used</span>
          <span class="key"><span class="dot" data-used="false"></span>Unused</span>
        </div>
      </div>
      <echolocal-wake-words .hass=${this.hass} .inUse=${i}></echolocal-wake-words>
    `}chosen(){return M(this.hass).map(e=>{let i=(U(this.hass,e.id)?.by.get("wake_word")??[]).map(s=>this.hass.states[s.entity_id]?.state).filter(s=>s!=="no_wake_word").filter(s=>!!s&&s!=="unknown"&&s!=="None");return{name:k(e),words:i}}).filter(e=>e.words.length)}async load(){this.words=await Ot(this.hass)}};se.styles=b(Ar),c([m({attribute:!1})],se.prototype,"hass",2),c([u()],se.prototype,"words",2),c([u()],se.prototype,"asked",2),se=c([v("echolocal-words")],se);async function Tr(a){return(await a.callWS({type:"echolocal/tones/list"})).tones}function Cr(a){let r=a.auth?.data?.access_token;return r?{authorization:`Bearer ${r}`}:{}}async function Mr(a,r,e,t,i=""){let s=new FormData;s.append("name",r),i&&s.append("key",i),s.append("start",String(t.start)),s.append("end",String(t.end)),s.append("original",e,e.name),s.append("tone",t.wav,"tone.wav");let n=await fetch("/api/echolocal/tones",{method:"POST",body:s,headers:Cr(a)}),o=await n.json().catch(()=>({}));if(!n.ok)throw new Error(o.error??"Home Assistant refused the tone.");return o}async function Hr(a,r){let e=await fetch(`/api/echolocal/tones/${encodeURIComponent(r)}/tone`,{headers:Cr(a)});if(!e.ok)throw new Error("Home Assistant did not send the tone.");return URL.createObjectURL(await e.blob())}async function Rr(a,r){let e=new AudioContext,t;try{t=await e.decodeAudioData(await a.arrayBuffer())}catch{throw new Error("This browser cannot read that file as audio.")}finally{e.close()}let i=Math.ceil(t.duration*48e3),s=new OfflineAudioContext(1,Math.max(i,1),48e3),n=s.createBufferSource();n.buffer=t,n.connect(s.destination),n.start();let o=(await s.startRendering()).getChannelData(0),d=0,h=o.length;if(r.trim){for(;d<h&&Math.abs(o[d])<.003;)d++;for(;h>d&&Math.abs(o[h-1])<.003;)h--}let f=30*48e3,y=h-d>f;if(y&&(h=d+f),o=o.slice(d,h),!o.length)throw new Error("That file is silent.");if(r.even){let w=0;for(let $ of o)w=Math.max(w,Math.abs($));if(w>0){let $=.9/w;for(let A=0;A<o.length;A++)o[A]*=$}}return{wav:Aa(o),seconds:o.length/48e3,cut:y,start:d/48e3,end:h/48e3}}function Aa(a){let r=a.length*2,e=new DataView(new ArrayBuffer(44+r)),t=(i,s)=>{for(let n=0;n<s.length;n++)e.setUint8(i+n,s.charCodeAt(n))};t(0,"RIFF"),e.setUint32(4,36+r,!0),t(8,"WAVE"),t(12,"fmt "),e.setUint32(16,16,!0),e.setUint16(20,1,!0),e.setUint16(22,1,!0),e.setUint32(24,48e3,!0),e.setUint32(28,48e3*2,!0),e.setUint16(32,2,!0),e.setUint16(34,16,!0),t(36,"data"),e.setUint32(40,r,!0);for(let i=0;i<a.length;i++){let s=Math.max(-1,Math.min(1,a[i]));e.setInt16(44+i*2,Math.round(s*32767),!0)}return new Blob([e.buffer],{type:"audio/wav"})}function zr(a){let e=a.replace(/\.[^.]+$/,"").replace(/[_-]+/g," ").replace(/\s+/g," ").trim();return e?e[0].toUpperCase()+e.slice(1):"Tone"}var Er=`:host{display:block;--tint: color-mix(in srgb, var(--primary-text-color) 5%, transparent);--edge: color-mix(in srgb, var(--primary-text-color) 12%, transparent)}.heading{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px}h2{margin:0;font-size:.72rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--secondary-text-color)}.add{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:999px;background:color-mix(in srgb,var(--primary-color) 14%,transparent);color:var(--primary-color);font-size:.85rem;cursor:pointer;--mdc-icon-size: 18px}.add input{display:none}.list{display:grid;gap:8px}.tone,.draft{display:grid;gap:8px;padding:10px 14px;border-radius:12px;background:var(--tint)}.draft{margin-bottom:12px;border:1px dashed color-mix(in srgb,var(--primary-color) 50%,transparent)}.row{display:flex;align-items:center;gap:8px;min-width:0}.title{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--primary-text-color);cursor:text}input.name,input.search{flex:1;min-width:0;padding:6px 10px;border:1px solid var(--edge);border-radius:8px;background:var(--card-background-color, transparent);color:var(--primary-text-color);font:inherit}.length,.source,.state{color:var(--secondary-text-color);font-size:.8rem;font-variant-numeric:tabular-nums}.source{margin-left:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}button{font:inherit;cursor:pointer}button.icon{display:inline-flex;padding:4px;border:none;border-radius:8px;background:none;color:var(--secondary-text-color);--mdc-icon-size: 20px}button.icon:hover{color:var(--primary-text-color);background:var(--tint)}button.icon.danger{color:var(--error-color, #db4437)}button.icon:disabled{opacity:.4;cursor:default}.options label{display:inline-flex;align-items:center;gap:4px;font-size:.85rem}.actions{justify-content:flex-end}button.text,button.primary{padding:6px 14px;border-radius:999px;border:none}button.text{background:none;color:var(--secondary-text-color)}button.primary{background:var(--primary-color);color:var(--text-primary-color, #fff)}button.primary:disabled{opacity:.5;cursor:default}.devices{display:flex;align-items:center;gap:6px;padding:4px 0;border:none;background:none;color:var(--secondary-text-color);font-size:.85rem;text-align:left;--mdc-icon-size: 16px}.devices span{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.picker{display:grid;gap:4px;max-height:260px;overflow-y:auto;padding-top:4px;border-top:1px solid var(--edge)}.device{display:flex;align-items:center;gap:8px;padding:4px 2px;font-size:.9rem}.device[data-offline=true]{opacity:.55}.note{font-size:.8rem;color:var(--secondary-text-color)}.said{margin-bottom:12px;padding:8px 12px;border-radius:8px;background:color-mix(in srgb,var(--error-color, #db4437) 12%,transparent);color:var(--primary-text-color);font-size:.85rem}.spare{padding:16px;border-radius:12px;background:var(--tint);color:var(--secondary-text-color);font-size:.9rem}
`;R({path:"tones",title:"Tones",icon:"mdi:music-note",element:"echolocal-tones",order:11,admin:!0});var z=class extends g{constructor(){super(...arguments);this.tones=[];this.asked=!1;this.said="";this.busy=!1;this.open="";this.search="";this.sending=new Set;this.renaming="";this.doomed="";this.playing="";this.again=()=>this.requestUpdate()}connectedCallback(){super.connectedCallback(),window.addEventListener(F,this.again)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(F,this.again),this.stop()}updated(){this.asked||!this.hass||(this.asked=!0,this.refresh())}render(){if(!this.hass)return p;let e=this.holders();return l`
      <div class="heading">
        <h2 class="first">Tones</h2>
        <label class="add">
          <ha-icon icon="mdi:plus"></ha-icon><span>Add tone</span>
          <input
            type="file"
            accept="audio/*"
            @change=${t=>this.pick(t.target.files)}
          />
        </label>
      </div>
      ${this.draft?this.renderDraft(this.draft):p}
      ${this.said?l`<div class="said">${this.said}</div>`:p}
      ${this.tones.length?l`<div class="list">${this.tones.map(t=>this.renderTone(t,e))}</div>`:l`<div class="spare">No tones yet. Add one to use it for alerts, timers and wake chimes.</div>`}
    `}renderDraft(e){let t=e.processed;return l`
      <div class="draft">
        <div class="row">
          <input
            class="name"
            .value=${e.name}
            placeholder="Name"
            @input=${i=>this.edit({name:i.target.value})}
          />
          <button class="icon" ?disabled=${!t} @click=${()=>t&&this.preview("draft",URL.createObjectURL(t.wav))}>
            <ha-icon icon=${this.playing==="draft"?"mdi:stop":"mdi:play"}></ha-icon>
          </button>
          <span class="length">${t?`${t.seconds.toFixed(1)} s`:"\u2026"}</span>
        </div>
        <div class="row options">
          <label><input type="checkbox" .checked=${e.trim} @change=${i=>this.edit({trim:i.target.checked},!0)} />Trim silence</label>
          <label><input type="checkbox" .checked=${e.even} @change=${i=>this.edit({even:i.target.checked},!0)} />Even out loudness</label>
          <span class="source">${e.file.name}</span>
        </div>
        ${t?.cut?l`<div class="note">Using the first 30 seconds.</div>`:p}
        ${e.replace?l`<div class="note">Replaces "${e.replace.name}" on the devices that have it.</div>`:p}
        <div class="row actions">
          <button class="text" @click=${()=>this.draft=void 0}>Cancel</button>
          <button class="primary" ?disabled=${!t||!e.name.trim()||this.busy} @click=${()=>this.save(e)}>
            ${this.busy?"Uploading\u2026":e.replace?"Replace":"Upload"}
          </button>
        </div>
      </div>
    `}renderTone(e,t){let i=t.filter(n=>n.tones.has(e.name)),s=this.search?t.filter(n=>n.name.toLowerCase().includes(this.search.toLowerCase())):t;return l`
      <div class="tone">
        <div class="row">
          ${this.renaming===e.key?l`<input
                class="name"
                .value=${e.name}
                @keydown=${n=>{n.key==="Enter"&&this.rename(e,n.target.value),n.key==="Escape"&&(this.renaming="")}}
                @blur=${n=>void this.rename(e,n.target.value)}
              />`:l`<span class="title" @click=${()=>this.renaming=e.key}>${e.name}</span>`}
          <span class="length">${e.length.toFixed(1)} s</span>
          <button class="icon" title="Play" @click=${()=>void this.play(e)}>
            <ha-icon icon=${this.playing===e.key?"mdi:stop":"mdi:play"}></ha-icon>
          </button>
          <button class="icon" title="Rename" @click=${()=>this.renaming=e.key}>
            <ha-icon icon="mdi:pencil"></ha-icon>
          </button>
          <button
            class="icon ${this.doomed===e.key?"danger":""}"
            title=${this.doomed===e.key?"Tap again to delete":"Delete"}
            @click=${()=>void this.discard(e)}
          >
            <ha-icon icon=${this.doomed===e.key?"mdi:delete-alert":"mdi:delete"}></ha-icon>
          </button>
        </div>
        <button class="devices" @click=${()=>this.open=this.open===e.key?"":e.key}>
          <ha-icon icon="mdi:speaker-multiple"></ha-icon>
          <span>${i.length?i.map(n=>n.name).join(", "):"On no devices"}</span>
          <ha-icon icon=${this.open===e.key?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </button>
        ${this.open===e.key?l`<div class="picker">
              ${t.length>6?l`<input
                    class="search"
                    placeholder="Search devices"
                    .value=${this.search}
                    @input=${n=>this.search=n.target.value}
                  />`:p}
              ${s.map(n=>{let o=`${e.key}:${n.id}`,d=n.online&&n.supported;return l`<label class="device" data-offline=${String(!d)}>
                  <input
                    type="checkbox"
                    .checked=${n.tones.has(e.name)}
                    ?disabled=${!d||this.sending.has(o)}
                    @change=${h=>void this.toggle(e,n,h.target.checked)}
                  />
                  <span>${n.name}</span>
                  ${n.online?n.supported?p:l`<span class="state">needs an update</span>`:l`<span class="state">offline</span>`}
                  ${this.sending.has(o)?l`<span class="state">sending…</span>`:p}
                </label>`})}
            </div>`:p}
      </div>
    `}holders(){return M(this.hass).map(e=>{let t=U(this.hass,e.id),i=t?.by.get("alerts_timer")?.[0],n=(i?this.hass.states[i.entity_id]:void 0)?.attributes?.options??[],o=[...t?.by.values()??[]].flat().map(d=>this.hass.states[d.entity_id]);return{id:e.id,name:k(e),online:o.some(d=>d&&d.state!=="unavailable"),supported:!!X(this.hass,e.name??"",_i),tones:new Set(n)}}).sort((e,t)=>e.name.localeCompare(t.name))}pick(e){let t=e?.[0];if(!t)return;let i=zr(t.name),s=this.tones.find(n=>n.name.toLowerCase()===i.toLowerCase());this.said="",this.draft={file:t,name:i,trim:!0,even:!0,replace:s},this.process()}edit(e,t=!1){if(this.draft){if(this.draft={...this.draft,...e},"name"in e){let i=(e.name??"").trim().toLowerCase();this.draft.replace=this.tones.find(s=>s.name.toLowerCase()===i)}t&&this.process()}}async process(){let e=this.draft;if(e)try{let t=await Rr(e.file,{trim:e.trim,even:e.even});this.draft?.file===e.file&&(this.draft={...this.draft,processed:t})}catch(t){this.said=String(t.message??t),this.draft=void 0}}async save(e){if(e.processed){this.busy=!0,this.said="";try{let t=await Mr(this.hass,e.name.trim(),e.file,e.processed,e.replace?.key);if(this.draft=void 0,e.replace){let i=this.holders().filter(s=>s.online&&s.tones.has(e.replace.name));i.length&&await this.assign(t,i.map(s=>s.id))}}catch(t){this.said=String(t.message??t)}this.busy=!1,await this.refresh()}}async toggle(e,t,i){let s=`${e.key}:${t.id}`;this.sending=new Set([...this.sending,s]),this.said="";try{i?await this.assign(e,[t.id]):await this.hass.callService("echolocal","unassign_tone",{tone:e.key,device_id:[t.id]})}catch(o){this.said=`${t.name}: ${o.message??o}`}let n=new Set(this.sending);n.delete(s),this.sending=n}async assign(e,t){await this.hass.callService("echolocal","assign_tone",{tone:e.key,device_id:t})}async rename(e,t){if(this.renaming="",t=t.trim(),!(!t||t===e.name)){try{await this.hass.callWS({type:"echolocal/tones/rename",key:e.key,name:t})}catch(i){this.said=String(i.message??i)}await this.refresh()}}async discard(e){if(this.doomed!==e.key){this.doomed=e.key;return}this.doomed="";try{await this.hass.callWS({type:"echolocal/tones/delete",key:e.key})}catch(t){this.said=String(t.message??t)}await this.refresh()}async play(e){if(this.playing===e.key){this.stop();return}try{this.preview(e.key,await Hr(this.hass,e.key))}catch(t){this.said=String(t.message??t)}}preview(e,t){let i=this.playing;this.stop(),i!==e&&(this.player=new Audio(t),this.playing=e,this.player.onended=()=>this.stop(),this.player.play(),this.requestUpdate())}stop(){this.player&&(this.player.pause(),URL.revokeObjectURL(this.player.src)),this.player=void 0,this.playing="",this.requestUpdate()}async refresh(){try{this.tones=await Tr(this.hass)}catch(e){this.said=String(e.message??e)}}};z.styles=b(Er),c([m({attribute:!1})],z.prototype,"hass",2),c([u()],z.prototype,"tones",2),c([u()],z.prototype,"asked",2),c([u()],z.prototype,"draft",2),c([u()],z.prototype,"said",2),c([u()],z.prototype,"busy",2),c([u()],z.prototype,"open",2),c([u()],z.prototype,"search",2),c([u()],z.prototype,"sending",2),c([u()],z.prototype,"renaming",2),c([u()],z.prototype,"doomed",2),z=c([v("echolocal-tones")],z);var Pr=`:host{display:block;--tint: color-mix(in srgb, var(--primary-text-color) 5%, transparent)}h2{margin:20px 0 12px;font-size:.72rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--secondary-text-color)}h2.first{margin-top:0}.list{display:grid;gap:8px}.action,.match{padding:10px 14px;border-radius:12px;background:var(--tint)}.action{display:grid;gap:6px}.title{font-weight:500}.quiet{color:var(--secondary-text-color);font-size:.85rem}.devices{display:flex;align-items:center;gap:6px;padding:4px 0;border:none;background:none;color:var(--secondary-text-color);font-size:.85rem;text-align:left;cursor:pointer;--mdc-icon-size: 16px}.devices span{flex:1}.picker{display:grid;gap:4px;max-height:260px;overflow-y:auto;padding-top:4px;border-top:1px solid var(--divider-color)}.device{display:flex;align-items:center;gap:8px;padding:4px 2px;font-size:.9rem;--mdc-icon-size: 18px}.device[data-offline=true]{opacity:.55}.picture svg{display:block;width:22px;height:auto}.state{margin-left:auto;color:var(--secondary-text-color);font-size:.8rem}.row{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px}code{font-size:.8rem;color:var(--secondary-text-color)}ul{margin:0;padding-left:18px}.fixed{margin-left:6px;font-size:.8rem;color:var(--secondary-text-color)}.match{display:flex;flex-wrap:wrap;align-items:baseline;gap:10px}.when,.reply{color:var(--secondary-text-color);font-size:.85rem}.spare{color:var(--secondary-text-color);font-size:.9rem}
`;R({path:"actions",title:"Voice actions",icon:"mdi:gesture-tap-button",element:"echolocal-actions",order:12});function Ma(a){return`${a.sentence}|${JSON.stringify(a.args??{})}`}var ae=class extends g{constructor(){super(...arguments);this.open=""}disconnectedCallback(){super.disconnectedCallback(),this.stop?.then(e=>e()),this.stop=void 0}updated(){this.stop||!this.hass?.connection||(this.stop=this.hass.connection.subscribeMessage(e=>this.snapshot=e,{type:"echolocal/actions"}))}render(){if(!this.hass)return p;let e=this.byAction();return l`
      <h2 class="first">Voice actions</h2>
      ${e.length?l`<div class="list">${e.map(t=>this.renderAction(t))}</div>`:l`<div class="spare">No device has declared any actions yet.</div>`}
      <h2>Heard</h2>
      ${this.snapshot?.history.length?l`<div class="list">${this.snapshot.history.map(t=>this.renderMatch(t))}</div>`:l`<div class="spare">Nothing heard yet.</div>`}
    `}byAction(){let e=new Map;for(let[t,i]of Object.entries(this.snapshot?.devices??{}))for(let s of i.actions){let n=e.get(s.name)??{action:s,sentences:new Map,holders:[]};for(let o of s.triggers??[])n.sentences.set(Ma(o),o);n.holders.push({id:t,voiced:(s.triggers?.length??0)>0,declared:!!s.switch,entity:s.entity??void 0}),e.set(s.name,n)}for(let t of e.values())t.holders.sort((i,s)=>this.name(i.id).localeCompare(this.name(s.id)));return[...e.values()].sort((t,i)=>(t.action.title||t.action.name).localeCompare(i.action.title||i.action.name))}renderAction(e){let{action:t}=e,i=t.args.map(o=>`${o.name}: ${o.type}`).join(", "),s=[...e.sentences.values()],n=e.holders.filter(o=>this.voiced(o));return l`
      <div class="action">
        <div class="row">
          <span class="title">${t.title||t.name}</span>
          <code>${t.name}(${i})</code>
        </div>
        ${s.length?l`<ul>
              ${s.map(o=>l`<li>
                    “${o.sentence}”${o.args?l`<span class="fixed">
                          ${Object.entries(o.args).map(([d,h])=>`${d}=${h}`).join(" ")}</span
                        >`:p}
                  </li>`)}
            </ul>`:l`<div class="quiet">No voice triggers</div>`}
        <button class="devices" @click=${()=>this.open=this.open===t.name?"":t.name}>
          <ha-icon icon="mdi:speaker-multiple"></ha-icon>
          <span>
            ${n.length} of ${e.holders.length}
            ${e.holders.length===1?"device":"devices"} listening
          </span>
          <ha-icon icon=${this.open===t.name?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </button>
        ${this.open===t.name?l`<div class="picker">${e.holders.map(o=>this.renderHolder(o))}</div>`:p}
      </div>
    `}renderHolder(e){let t=we(this.hass.devices?.[e.id]?.model??""),i=e.entity;return l`
      <label class="device" data-offline=${String(!i)}>
        <input
          type="checkbox"
          .checked=${this.voiced(e)}
          ?disabled=${!i||!this.hass.user?.is_admin}
          @change=${s=>void this.setVoiced(i,s.target.checked)}
        />
        ${t.shape==="panel"?l`<span class="picture">${it(t.picture)}</span>`:l`<ha-icon icon=${t.shape==="dot"?"mdi:speaker":"mdi:tablet"}></ha-icon>`}
        <span>${this.name(e.id)}</span>
        ${i?p:l`<span class="state">${e.declared?"switch not found":"needs an update"}</span>`}
      </label>
    `}voiced(e){let t=e.entity?this.hass.states[e.entity]?.state:void 0;return t===void 0||t==="unavailable"?e.voiced:t==="on"}async setVoiced(e,t){await this.hass.callService("switch",t?"turn_on":"turn_off",{entity_id:e})}renderMatch(e){return l`
      <div class="match">
        <span class="when">${new Date(e.at*1e3).toLocaleTimeString()}</span>
        <span class="name">${e.device_id?this.name(e.device_id):"Unknown device"}</span>
        <span class="said">“${e.sentence}”</span>
        <code>${e.action}</code>
        <span class="reply">${e.reply||"silent"}</span>
      </div>
    `}name(e){return k(this.hass.devices?.[e])||e}};ae.styles=b(Pr),c([m({attribute:!1})],ae.prototype,"hass",2),c([u()],ae.prototype,"snapshot",2),c([u()],ae.prototype,"open",2),ae=c([v("echolocal-actions")],ae);var Dr=`:host{display:block;--tint: color-mix(in srgb, var(--primary-text-color) 5%, transparent);--good: var(--success-color, #43a047);--bad: var(--error-color, #db4437)}.top{position:relative;display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin-bottom:14px}.primary{min-width:220px}.search{padding:6px 10px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color);font:inherit}.spacer{flex:1}.toggle{display:flex;align-items:center;gap:6px;font-size:.85rem;color:var(--secondary-text-color)}.local{display:flex;align-items:center;gap:6px;padding:6px 11px;border:none;border-radius:10px;background:var(--tint);color:var(--primary-text-color);font:inherit;font-size:.85rem;cursor:pointer;--mdc-icon-size: 16px}.popover{position:absolute;top:100%;right:0;z-index:4;display:grid;gap:8px;width:min(360px,100%);margin-top:6px;padding:12px;border:1px solid var(--divider-color);border-radius:12px;background:var(--card-background-color);box-shadow:0 6px 24px #0003}.hint,.quiet,.spare{color:var(--secondary-text-color);font-size:.85rem}.options{display:grid;gap:2px;max-height:320px;overflow-y:auto}.options label{display:flex;align-items:center;gap:8px;padding:3px 2px;font-size:.85rem}.scroll{max-height:calc(100vh - 260px);overflow:auto;border-radius:12px;background:var(--tint)}table{border-collapse:separate;border-spacing:0;font-size:.85rem}th,td{padding:4px 8px;text-align:center;white-space:nowrap}thead th{position:sticky;top:0;z-index:2;vertical-align:bottom;background:var(--card-background-color);border-bottom:1px solid var(--divider-color)}.corner{left:0;z-index:1000;text-align:left}th.gutter{z-index:1;width:140px;min-width:140px;border-bottom:none}.corner-picks{display:flex;align-items:center;justify-content:space-between;gap:12px}.corner-split{width:1px;height:56px;background:var(--divider-color);transform:rotate(45deg)}.corner-picks label{display:flex;align-items:center;gap:4px;font-weight:500;color:var(--secondary-text-color)}.device{min-width:96px;max-width:160px;font-weight:500}.device-name{display:flex;align-items:center;justify-content:center;gap:2px;white-space:normal;line-height:1.2}th.slanted{width:44px;min-width:44px;max-width:44px;height:168px;padding:0 0 4px}.slanted .device-label{position:absolute;bottom:84px;left:50%;display:flex;align-items:center;gap:6px;width:max-content;max-width:200px;transform:rotate(-45deg);transform-origin:0 100%;white-space:nowrap;pointer-events:none}.slanted .device-title{overflow:hidden;text-overflow:ellipsis}.slanted .result{white-space:nowrap}.device-controls{display:flex;flex-direction:column;align-items:center}.primary-device{border-left:1px solid var(--divider-color);border-right:1px solid var(--divider-color)}.device-state{display:flex;align-items:center;justify-content:center;gap:2px;min-height:28px}.device[data-offline=true],td[data-offline=true]{opacity:.45}.device[data-offline=true] .ignore[data-on=true]{opacity:1}.ignore{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;padding:0;border:none;border-radius:50%;background:none;color:var(--secondary-text-color);cursor:pointer;opacity:.35;--mdc-icon-size: 18px}.ignore:hover{background:var(--tint)}.device:hover .ignore,.ignore[data-on=true]{opacity:1}.tag{padding:1px 6px;border-radius:6px;background:var(--tint);color:var(--secondary-text-color);font-size:.72rem;font-weight:400}.setting{position:sticky;left:0;z-index:1;min-width:220px;max-width:320px;background:var(--card-background-color);text-align:left;font-weight:400}.setting-name{display:flex;align-items:center;gap:6px}.setting-name span{overflow:hidden;text-overflow:ellipsis}.section-head{padding-top:10px}.section-head button{display:flex;align-items:center;gap:6px;padding:2px 0;border:none;background:none;color:var(--secondary-text-color);font:inherit;font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.06em;cursor:pointer;--mdc-icon-size: 16px}.section-head .quiet{font-size:.72rem;font-weight:400;text-transform:none;letter-spacing:0}tr.section th,tr.section td{border-top:1px solid var(--divider-color)}tbody tr:not(.section)+tr:not(.section) th,tbody tr:not(.section)+tr:not(.section) td{border-top:1px solid color-mix(in srgb,var(--divider-color) 50%,transparent)}.value{max-width:180px;overflow:hidden;text-overflow:ellipsis;color:var(--secondary-text-color);border-left:1px solid var(--divider-color);border-right:1px solid var(--divider-color)}.section-fill{border-left:none}.note{padding:12px 16px;color:var(--secondary-text-color);text-align:left}.cell{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:8px;--mdc-icon-size: 16px}.cell.match{color:color-mix(in srgb,var(--good) 75%,var(--secondary-text-color))}.cell.differs{background:color-mix(in srgb,var(--bad) 16%,transparent);color:var(--bad);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--bad) 35%,transparent)}.cell.na{color:color-mix(in srgb,var(--secondary-text-color) 45%,transparent);--mdc-icon-size: 14px}.count{padding:3px 8px;border-radius:8px;background:color-mix(in srgb,var(--bad) 16%,transparent);color:var(--bad);font-size:.78rem;font-weight:500}.match{color:var(--good)}.differs{color:var(--bad)}.result{font-size:.75rem;font-weight:400;white-space:normal}.bottom{display:flex;align-items:center;justify-content:flex-end;gap:12px;margin-top:14px}
`;R({path:"fleet",title:"Fleet",icon:"mdi:compare-horizontal",element:"echolocal-fleet",order:32,admin:!0});var Or={match:"mdi:check",differs:"mdi:not-equal-variant",na:"mdi:minus"},Nt={match:"Matches",differs:"Differs",na:"Doesn't apply"},Ra=new Set(["secret","credential","password"]);function _e(a){return`${a.domain}.${a.name}`}var _=class extends g{constructor(){super(...arguments);this.failed="";this.said="";this.master="";this.scope="";this.known=[];this.keys=new Set;this.targets=new Set;this.ignored=new Set;this.folded=new Set;this.everything=!1;this.picking=!1;this.search="";this.busy=!1;this.results=new Map;this.asked=!1}updated(){this.asked||!this.hass||(this.asked=!0,this.load(),ke(this.hass).then(e=>this.known=e))}render(){if(!this.hass)return p;if(this.failed)return l`<div class="spare">${this.failed}</div>`;if(!this.fleet)return l`<div class="spare">Reading every device…</div>`;let e=this.masterDevice(),t=this.sources();if(!e)return l`<div class="spare">No device is online to compare against.</div>`;let i=this.sections(e),s=this.others(e);return l`
      <div class="top">
        <ha-select
          class="primary"
          label="Primary"
          .value=${e.id}
          .options=${t.map(n=>({value:n.id,label:n.name}))}
          @selected=${n=>n.detail.value&&this.choose(n.detail.value)}
        ></ha-select>
        ${this.renderScope()}
        <div class="spacer"></div>
        <label class="toggle">
          <ha-switch
            .checked=${this.everything}
            @change=${n=>this.everything=n.target.checked}
          ></ha-switch>
          Show matching
        </label>
        <button class="local" @click=${()=>this.picking=!this.picking}>
          <ha-icon icon="mdi:pin-outline"></ha-icon>
          Local${this.fleet.local.length?` (${this.fleet.local.length})`:""}
        </button>
        ${this.picking?this.renderLocal(e):p}
      </div>

      <div class="scroll">${this.renderTable(e,i,s)}</div>

      <div class="bottom">
        ${this.said?l`<span class="differs">${this.said}</span>`:p}
        <span class="quiet">
          ${this.chosen(i).length} settings to ${this.targets.size}
          ${this.targets.size===1?"device":"devices"}
        </span>
        <ha-button
          .disabled=${this.busy||!this.targets.size||!this.chosen(i).length}
          .loading=${this.busy}
          @click=${()=>this.sync(e,i)}
        >
          Sync
        </ha-button>
      </div>
    `}renderScope(){let e=new Set(this.fleet.devices.flatMap(i=>this.hass.devices?.[i.id]?.labels??[])),t=this.known.filter(i=>e.has(i.label_id));return t.length?l`<div class="pills">
      <button class="pill" data-on=${String(!this.scope)} @click=${()=>this.scopeTo("")}>All</button>
      ${t.map(i=>l`<button
          class="pill"
          data-on=${String(this.scope===i.label_id)}
          @click=${()=>this.scopeTo(i.label_id)}
        >
          ${i.name}
        </button>`)}
    </div>`:p}renderLocal(e){let t=new Set(this.fleet.local),i=new Map;for(let o of e.settings)i.set(_e(o),this.fullTitle(o));for(let o of t)i.has(o)||i.set(o,o);let s=this.search.trim().toLowerCase(),n=[...i.entries()].filter(([o,d])=>!s||d.toLowerCase().includes(s)||o.includes(s)).sort((o,d)=>Number(t.has(d[0]))-Number(t.has(o[0]))||o[1].localeCompare(d[1]));return l`<div class="popover">
      <input
        class="search"
        placeholder="Search settings"
        .value=${this.search}
        @input=${o=>this.search=o.target.value}
      />
      <div class="hint">Checked settings are never synced.</div>
      <div class="options">
        ${n.map(([o,d])=>l`<label>
            <ha-checkbox
              .checked=${t.has(o)}
              @change=${h=>this.setLocal(o,h.target.checked)}
            ></ha-checkbox>
            <span>${d}</span>
          </label>`)}
      </div>
    </div>`}renderTable(e,t,i){let s=i.filter(h=>this.selectable(h)),n=s.length>0&&s.every(h=>this.targets.has(h.id)),o=t.flatMap(h=>h.rows.map(f=>f.key)),d=o.filter(h=>this.keys.has(h)).length;return l`<table>
      <thead>
        <tr>
          <th class="corner">
            <div class="corner-picks">
              <label>
                <ha-checkbox
                  aria-label="Every setting"
                  .checked=${o.length>0&&d===o.length}
                  .indeterminate=${d>0&&d<o.length}
                  @change=${h=>this.every(o,h.target.checked)}
                ></ha-checkbox>
                <span>All settings</span>
              </label>
              <span class="corner-split"></span>
              <label>
                <span>All devices</span>
                <ha-checkbox
                  aria-label="Every device"
                  .checked=${n}
                  .indeterminate=${!n&&this.targets.size>0}
                  @change=${h=>this.allTargets(s,h.target.checked)}
                ></ha-checkbox>
              </label>
            </div>
          </th>
          <th class="device primary-device">
            <div class="device-name">${e.name}</div>
            <span class="tag">primary</span>
          </th>
          ${i.map((h,f)=>this.renderDeviceHead(h,i.length-f))}
          <th class="gutter"></th>
        </tr>
      </thead>
      <tbody>
        ${t.length?t.map(h=>this.renderSection(h,e,i)):l`<tr>
              <td class="note" colspan=${i.length+2}>
                ${this.everything?"Nothing to compare":"Every device matches the primary"}
              </td>
            </tr>`}
      </tbody>
    </table>`}renderDeviceHead(e,t){let i=this.results.get(e.id),s=this.ignored.has(e.id);return l`<th
      class="device slanted"
      style=${`z-index: ${t+2}`}
      title=${e.name}
      data-offline=${String(!this.selectable(e))}
    >
      <div class="device-label">
        <span class="device-title">${e.name}</span>
        ${e.online?e.error==="update"?l`<span class="tag">needs an update</span>`:e.error?l`<span class="tag">unreadable</span>`:p:l`<span class="tag">offline</span>`}
        ${i?l`<span class="result">${this.renderResult(i)}</span>`:p}
      </div>
      <div class="device-controls">
        <button
          class="ignore"
          data-on=${String(s)}
          title=${s?`Compare ${e.name}`:`Ignore ${e.name}`}
          aria-label=${s?`Compare ${e.name}`:`Ignore ${e.name}`}
          @click=${()=>this.ignore(e.id,!s)}
        >
          <ha-icon icon=${s?"mdi:eye-off-outline":"mdi:eye-outline"}></ha-icon>
        </button>
        <ha-checkbox
          aria-label=${`Sync ${e.name}`}
          .disabled=${!this.selectable(e)}
          .checked=${this.targets.has(e.id)}
          @change=${n=>this.toggle("targets",e.id,n.target.checked)}
        ></ha-checkbox>
      </div>
    </th>`}renderSection(e,t,i){let s=this.folded.has(e.title),n=e.rows.filter(o=>this.keys.has(o.key)).length;return l`
      <tr class="section">
        <th class="setting section-head">
          <div class="setting-name">
            <ha-checkbox
              aria-label=${`Every setting in ${e.title}`}
              .checked=${n===e.rows.length}
              .indeterminate=${n>0&&n<e.rows.length}
              @change=${o=>this.group(e,o.target.checked)}
            ></ha-checkbox>
            <button @click=${()=>this.fold(e.title)}>
              <ha-icon icon=${s?"mdi:chevron-right":"mdi:chevron-down"}></ha-icon>
              <span>${e.title}</span>
              <span class="quiet">${e.rows.length}</span>
            </button>
          </div>
        </th>
        <td class="section-fill"></td>
        ${i.map(o=>s?this.renderSummary(o,e):l`<td class="section-fill"></td>`)}
      </tr>
      ${s?p:e.rows.map(o=>this.renderRow(o,t,i))}
    `}renderRow(e,t,i){return l`<tr>
      <th class="setting" title=${this.fullTitle(e.setting)}>
        <label class="setting-name">
          <ha-checkbox
            aria-label=${this.fullTitle(e.setting)}
            .checked=${this.keys.has(e.key)}
            @change=${s=>this.toggle("keys",e.key,s.target.checked)}
          ></ha-checkbox>
          <span>${this.shortTitle(e.setting)}</span>
        </label>
      </th>
      <td class="value">${this.shown(t.settings.find(s=>_e(s)===e.key)??e.setting)}</td>
      ${i.map(s=>this.renderCell(s,e))}
    </tr>`}renderCell(e,t){let i=this.mark(e,t),s=e.settings.find(o=>_e(o)===t.key),n=i==="differs"&&s?`${Nt[i]}: ${this.shown(s)}`:Nt[i];return l`<td data-offline=${String(!this.selectable(e))}>
      <span class="cell ${i}" title=${n}><ha-icon icon=${Or[i]}></ha-icon></span>
    </td>`}renderSummary(e,t){let i=t.rows.map(o=>this.mark(e,o)),s=i.filter(o=>o==="differs").length;if(s)return l`<td data-offline=${String(!this.selectable(e))}>
        <span class="count">${s} differ</span>
      </td>`;let n=i.includes("match")?"match":"na";return l`<td data-offline=${String(!this.selectable(e))}>
      <span class="cell ${n}" title=${Nt[n]}><ha-icon icon=${Or[n]}></ha-icon></span>
    </td>`}renderResult(e){if(e.errors.length)return l`<span class="differs" title=${e.errors.join(`
`)}>${e.errors[0]}</span>`;let t=e.skipped.length?`, ${e.skipped.length} skipped`:"";return l`<span class="match">${e.changed} changed${t}</span>`}shown(e){return Ra.has(e.kind)?e.value?"\u2022\u2022\u2022\u2022\u2022\u2022":"":e.value}syncable(e){return e.online&&!e.error}selectable(e){return this.syncable(e)&&!this.ignored.has(e.id)}sources(){return(this.fleet?.devices??[]).filter(e=>this.syncable(e)&&e.settings.length).sort((e,t)=>t.settings.length-e.settings.length||e.name.localeCompare(t.name))}masterDevice(){let e=this.sources();return e.find(t=>t.id===this.master)??e[0]}others(e){return this.fleet.devices.filter(t=>t.id!==e.id).filter(t=>!this.scope||(this.hass.devices?.[t.id]?.labels??[]).includes(this.scope)).sort((t,i)=>Number(i.online)-Number(t.online)||t.name.localeCompare(i.name))}mark(e,t){if(!e.online)return"na";let i=e.settings.find(s=>_e(s)===t.key);return!i||i.choices&&!i.choices.includes(t.setting.value)?"na":i.value===t.setting.value?"match":"differs"}differs(e,t){return this.others(t).some(i=>!this.ignored.has(i.id)&&this.mark(i,e)==="differs")}ignore(e,t){let i=new Set(this.ignored),s=new Set(this.targets);t?(i.add(e),s.delete(e)):i.delete(e),this.ignored=i,this.targets=s,this.defaults()}sections(e){let t=new Set(this.fleet.local),i=new Map;for(let s of e.settings){let n=_e(s);if(t.has(n))continue;let o={key:n,setting:s};if(!this.everything&&!this.differs(o,e))continue;let d=i.get(s.section)??{title:s.section,rows:[]};d.rows.push(o),i.set(s.section,d)}return[...i.values()]}chosen(e){return e.flatMap(t=>t.rows.map(i=>i.key)).filter(t=>this.keys.has(t))}shortTitle(e){return e.group&&e.group!==e.section&&/\d/.test(e.group)?`${e.title} ${e.group.replace(/\D+/g,"")}`:e.title}fullTitle(e){return e.group&&e.group!==e.section?`${e.section} \u203A ${e.group} \u203A ${e.title}`:`${e.section} \u203A ${e.title}`}choose(e){this.master=e,this.results=new Map,this.targets=new Set,this.defaults()}scopeTo(e){this.scope=e;let t=new Set(this.others(this.masterDevice()).map(i=>i.id));this.targets=new Set([...this.targets].filter(i=>t.has(i)))}fold(e){let t=new Set(this.folded);t.delete(e)||t.add(e),this.folded=t}toggle(e,t,i){let s=new Set(this[e]);i?s.add(t):s.delete(t),this[e]=s}group(e,t){this.every(e.rows.map(i=>i.key),t)}every(e,t){let i=new Set(this.keys);for(let s of e)t?i.add(s):i.delete(s);this.keys=i}allTargets(e,t){this.targets=t?new Set(e.map(i=>i.id)):new Set}defaults(){let e=this.masterDevice();if(!e)return;let t=e.settings.map(i=>({key:_e(i),setting:i})).filter(i=>this.differs(i,e)).map(i=>i.key);this.keys=new Set(t)}async load(){try{this.fleet=await this.hass.callWS({type:"echolocal/fleet"}),this.failed="",this.defaults()}catch(e){this.failed=`Couldn't read the devices: ${e.message??e}`}}async setLocal(e,t){let i=new Set(this.fleet.local);t?i.add(e):i.delete(e);let s=await this.hass.callWS({type:"echolocal/fleet/local",local:[...i]});this.fleet={...this.fleet,local:s.local};let n=new Set(this.keys);t&&n.delete(e),this.keys=n}async sync(e,t){this.busy=!0,this.said="";try{let i=await this.hass.callWS({type:"echolocal/fleet/sync",primary:e.id,targets:[...this.targets],keys:this.chosen(t)});this.results=new Map(i.results.map(n=>[n.id,n]));let s=this.keys;this.fleet=await this.hass.callWS({type:"echolocal/fleet"}),this.keys=s}catch(i){this.said=`Sync failed: ${i.message??i}`}finally{this.busy=!1}}};_.styles=[b(fe),b(Dr)],c([m({attribute:!1})],_.prototype,"hass",2),c([u()],_.prototype,"fleet",2),c([u()],_.prototype,"failed",2),c([u()],_.prototype,"said",2),c([u()],_.prototype,"master",2),c([u()],_.prototype,"scope",2),c([u()],_.prototype,"known",2),c([u()],_.prototype,"keys",2),c([u()],_.prototype,"targets",2),c([u()],_.prototype,"ignored",2),c([u()],_.prototype,"folded",2),c([u()],_.prototype,"everything",2),c([u()],_.prototype,"picking",2),c([u()],_.prototype,"search",2),c([u()],_.prototype,"busy",2),c([u()],_.prototype,"results",2),_=c([v("echolocal-fleet")],_);var G=class extends g{constructor(){super(...arguments);this.narrow=!1;this.at="";this.made=new Map;this.moved=()=>{this.at=zt(this.base(),void 0),this.requestUpdate()}}connectedCallback(){super.connectedCallback(),window.addEventListener("location-changed",this.moved),window.addEventListener("popstate",this.moved)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("location-changed",this.moved),window.removeEventListener("popstate",this.moved)}render(){if(!this.hass)return p;let e=!!this.hass.user?.is_admin,t=Rt(e),i=or(this.where(),e);return l`
      <header>
        <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
        <div class="bar">${t.map(s=>this.button(s,s===i))}</div>
      </header>
      <div class="page">${i?this.body(i):p}</div>
    `}button(e,t){return l`<button
      data-here=${String(t)}
      @click=${()=>{this.at=e.path,lr(this.base(),e.path)}}
    >
      <ha-icon .icon=${e.icon}></ha-icon><span>${e.title}</span>
    </button>`}body(e){let t=this.made.get(e.path);return t||(t=document.createElement(e.element),this.made.set(e.path,t)),t.hass=this.hass,t.narrow=this.narrow,t}where(){return this.route?zt(this.base(),this.route.path):this.at}base(){return this.route?.prefix??"/echolocal"}};G.styles=b(cr),c([m({attribute:!1})],G.prototype,"hass",2),c([m({type:Boolean})],G.prototype,"narrow",2),c([m({attribute:!1})],G.prototype,"route",2),c([m({attribute:!1})],G.prototype,"panel",2),c([u()],G.prototype,"at",2),G=c([v("echolocal-panel")],G);window.customCards=window.customCards??[];window.customCards.some(a=>a.type==="echolocal-satellite-card")||window.customCards.push({type:"echolocal-satellite-card",name:"EchoLocal Satellite",description:"An EchoLocal satellite, drawn as itself, with its controls live.",preview:!0,documentationURL:"https://github.com/ygelfand/echolocal-hacs"});window.customCards.some(a=>a.type==="echolocal-elements-card")||window.customCards.push({type:"echolocal-elements-card",name:"EchoLocal Satellite (Elements)",description:"An EchoLocal satellite with per-element visibility \u2014 turn any button, label or component off.",preview:!0,documentationURL:"https://github.com/ygelfand/echolocal-hacs"});
