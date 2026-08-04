var Gr=Object.defineProperty;var Vr=Object.getOwnPropertyDescriptor;var c=(n,r,t,e)=>{for(var i=e>1?void 0:e?Vr(r,t):r,s=n.length-1,o;s>=0;s--)(o=n[s])&&(i=(e?o(r,t,i):o(i))||i);return e&&i&&Gr(r,t,i),i};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var St=globalThis,Ct=St.ShadowRoot&&(St.ShadyCSS===void 0||St.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,we=Symbol(),xe=new WeakMap,At=class{constructor(r,t,e){if(this._$cssResult$=!0,e!==we)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=r,this.t=t}get styleSheet(){let r=this.o,t=this.t;if(Ct&&r===void 0){let e=t!==void 0&&t.length===1;e&&(r=xe.get(t)),r===void 0&&((this.o=r=new CSSStyleSheet).replaceSync(this.cssText),e&&xe.set(t,r))}return r}toString(){return this.cssText}},b=n=>new At(typeof n=="string"?n:n+"",void 0,we);var $e=(n,r)=>{if(Ct)n.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of r){let e=document.createElement("style"),i=St.litNonce;i!==void 0&&e.setAttribute("nonce",i),e.textContent=t.cssText,n.appendChild(e)}},Kt=Ct?n=>n:n=>n instanceof CSSStyleSheet?(r=>{let t="";for(let e of r.cssRules)t+=e.cssText;return b(t)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var{is:Yr,defineProperty:Xr,getOwnPropertyDescriptor:Zr,getOwnPropertyNames:Jr,getOwnPropertySymbols:Lr,getPrototypeOf:Qr}=Object,Mt=globalThis,ke=Mt.trustedTypes,ti=ke?ke.emptyScript:"",ei=Mt.reactiveElementPolyfillSupport,ut=(n,r)=>n,mt={toAttribute(n,r){switch(r){case Boolean:n=n?ti:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,r){let t=n;switch(r){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},Ht=(n,r)=>!Yr(n,r),_e={attribute:!0,type:String,converter:mt,reflect:!1,useDefault:!1,hasChanged:Ht};Symbol.metadata??=Symbol("metadata"),Mt.litPropertyMetadata??=new WeakMap;var W=class extends HTMLElement{static addInitializer(r){this._$Ei(),(this.l??=[]).push(r)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(r,t=_e){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(r)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(r,t),!t.noAccessor){let e=Symbol(),i=this.getPropertyDescriptor(r,e,t);i!==void 0&&Xr(this.prototype,r,i)}}static getPropertyDescriptor(r,t,e){let{get:i,set:s}=Zr(this.prototype,r)??{get(){return this[t]},set(o){this[t]=o}};return{get:i,set(o){let a=i?.call(this);s?.call(this,o),this.requestUpdate(r,a,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(r){return this.elementProperties.get(r)??_e}static _$Ei(){if(this.hasOwnProperty(ut("elementProperties")))return;let r=Qr(this);r.finalize(),r.l!==void 0&&(this.l=[...r.l]),this.elementProperties=new Map(r.elementProperties)}static finalize(){if(this.hasOwnProperty(ut("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ut("properties"))){let t=this.properties,e=[...Jr(t),...Lr(t)];for(let i of e)this.createProperty(i,t[i])}let r=this[Symbol.metadata];if(r!==null){let t=litPropertyMetadata.get(r);if(t!==void 0)for(let[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(let[t,e]of this.elementProperties){let i=this._$Eu(t,e);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(r){let t=[];if(Array.isArray(r)){let e=new Set(r.flat(1/0).reverse());for(let i of e)t.unshift(Kt(i))}else r!==void 0&&t.push(Kt(r));return t}static _$Eu(r,t){let e=t.attribute;return e===!1?void 0:typeof e=="string"?e:typeof r=="string"?r.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(r=>r(this))}addController(r){(this._$EO??=new Set).add(r),this.renderRoot!==void 0&&this.isConnected&&r.hostConnected?.()}removeController(r){this._$EO?.delete(r)}_$E_(){let r=new Map,t=this.constructor.elementProperties;for(let e of t.keys())this.hasOwnProperty(e)&&(r.set(e,this[e]),delete this[e]);r.size>0&&(this._$Ep=r)}createRenderRoot(){let r=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return $e(r,this.constructor.elementStyles),r}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(r=>r.hostConnected?.())}enableUpdating(r){}disconnectedCallback(){this._$EO?.forEach(r=>r.hostDisconnected?.())}attributeChangedCallback(r,t,e){this._$AK(r,e)}_$ET(r,t){let e=this.constructor.elementProperties.get(r),i=this.constructor._$Eu(r,e);if(i!==void 0&&e.reflect===!0){let s=(e.converter?.toAttribute!==void 0?e.converter:mt).toAttribute(t,e.type);this._$Em=r,s==null?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(r,t){let e=this.constructor,i=e._$Eh.get(r);if(i!==void 0&&this._$Em!==i){let s=e.getPropertyOptions(i),o=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:mt;this._$Em=i;let a=o.fromAttribute(t,s.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(r,t,e,i=!1,s){if(r!==void 0){let o=this.constructor;if(i===!1&&(s=this[r]),e??=o.getPropertyOptions(r),!((e.hasChanged??Ht)(s,t)||e.useDefault&&e.reflect&&s===this._$Ej?.get(r)&&!this.hasAttribute(o._$Eu(r,e))))return;this.C(r,t,e)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(r,t,{useDefault:e,reflect:i,wrapped:s},o){e&&!(this._$Ej??=new Map).has(r)&&(this._$Ej.set(r,o??t??this[r]),s!==!0||o!==void 0)||(this._$AL.has(r)||(this.hasUpdated||e||(t=void 0),this._$AL.set(r,t)),i===!0&&this._$Em!==r&&(this._$Eq??=new Set).add(r))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let r=this.scheduleUpdate();return r!=null&&await r,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,s]of this._$Ep)this[i]=s;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[i,s]of e){let{wrapped:o}=s,a=this[i];o!==!0||this._$AL.has(i)||a===void 0||this.C(i,void 0,s,a)}}let r=!1,t=this._$AL;try{r=this.shouldUpdate(t),r?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(e){throw r=!1,this._$EM(),e}r&&this._$AE(t)}willUpdate(r){}_$AE(r){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(r)),this.updated(r)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(r){return!0}update(r){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(r){}firstUpdated(r){}};W.elementStyles=[],W.shadowRootOptions={mode:"open"},W[ut("elementProperties")]=new Map,W[ut("finalized")]=new Map,ei?.({ReactiveElement:W}),(Mt.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Lt=globalThis,Se=n=>n,Tt=Lt.trustedTypes,Ae=Tt?Tt.createPolicy("lit-html",{createHTML:n=>n}):void 0,Pe="$lit$",G=`lit$${Math.random().toFixed(9).slice(2)}$`,Ee="?"+G,ri=`<${Ee}>`,et=document,ft=()=>et.createComment(""),vt=n=>n===null||typeof n!="object"&&typeof n!="function",Qt=Array.isArray,ii=n=>Qt(n)||typeof n?.[Symbol.iterator]=="function",Gt=`[ 	
\f\r]`,gt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ce=/-->/g,Me=/>/g,Q=RegExp(`>|${Gt}(?:([^\\s"'>=/]+)(${Gt}*=${Gt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),He=/'/g,Te=/"/g,ze=/^(?:script|style|textarea|title)$/i,te=n=>(r,...t)=>({_$litType$:n,strings:r,values:t}),l=te(1),$=te(2),hs=te(3),rt=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),Re=new WeakMap,tt=et.createTreeWalker(et,129);function Oe(n,r){if(!Qt(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ae!==void 0?Ae.createHTML(r):r}var si=(n,r)=>{let t=n.length-1,e=[],i,s=r===2?"<svg>":r===3?"<math>":"",o=gt;for(let a=0;a<t;a++){let d=n[a],h,m,f=-1,x=0;for(;x<d.length&&(o.lastIndex=x,m=o.exec(d),m!==null);)x=o.lastIndex,o===gt?m[1]==="!--"?o=Ce:m[1]!==void 0?o=Me:m[2]!==void 0?(ze.test(m[2])&&(i=RegExp("</"+m[2],"g")),o=Q):m[3]!==void 0&&(o=Q):o===Q?m[0]===">"?(o=i??gt,f=-1):m[1]===void 0?f=-2:(f=o.lastIndex-m[2].length,h=m[1],o=m[3]===void 0?Q:m[3]==='"'?Te:He):o===Te||o===He?o=Q:o===Ce||o===Me?o=gt:(o=Q,i=void 0);let w=o===Q&&n[a+1].startsWith("/>")?" ":"";s+=o===gt?d+ri:f>=0?(e.push(h),d.slice(0,f)+Pe+d.slice(f)+G+w):d+G+(f===-2?a:w)}return[Oe(n,s+(n[t]||"<?>")+(r===2?"</svg>":r===3?"</math>":"")),e]},bt=class n{constructor({strings:r,_$litType$:t},e){let i;this.parts=[];let s=0,o=0,a=r.length-1,d=this.parts,[h,m]=si(r,t);if(this.el=n.createElement(h,e),tt.currentNode=this.el.content,t===2||t===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(i=tt.nextNode())!==null&&d.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(let f of i.getAttributeNames())if(f.endsWith(Pe)){let x=m[o++],w=i.getAttribute(f).split(G),_=/([.?@])?(.*)/.exec(x);d.push({type:1,index:s,name:_[2],strings:w,ctor:_[1]==="."?Yt:_[1]==="?"?Xt:_[1]==="@"?Zt:nt}),i.removeAttribute(f)}else f.startsWith(G)&&(d.push({type:6,index:s}),i.removeAttribute(f));if(ze.test(i.tagName)){let f=i.textContent.split(G),x=f.length-1;if(x>0){i.textContent=Tt?Tt.emptyScript:"";for(let w=0;w<x;w++)i.append(f[w],ft()),tt.nextNode(),d.push({type:2,index:++s});i.append(f[x],ft())}}}else if(i.nodeType===8)if(i.data===Ee)d.push({type:2,index:s});else{let f=-1;for(;(f=i.data.indexOf(G,f+1))!==-1;)d.push({type:7,index:s}),f+=G.length-1}s++}}static createElement(r,t){let e=et.createElement("template");return e.innerHTML=r,e}};function st(n,r,t=n,e){if(r===rt)return r;let i=e!==void 0?t._$Co?.[e]:t._$Cl,s=vt(r)?void 0:r._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(!1),s===void 0?i=void 0:(i=new s(n),i._$AT(n,t,e)),e!==void 0?(t._$Co??=[])[e]=i:t._$Cl=i),i!==void 0&&(r=st(n,i._$AS(n,r.values),i,e)),r}var Vt=class{constructor(r,t){this._$AV=[],this._$AN=void 0,this._$AD=r,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(r){let{el:{content:t},parts:e}=this._$AD,i=(r?.creationScope??et).importNode(t,!0);tt.currentNode=i;let s=tt.nextNode(),o=0,a=0,d=e[0];for(;d!==void 0;){if(o===d.index){let h;d.type===2?h=new yt(s,s.nextSibling,this,r):d.type===1?h=new d.ctor(s,d.name,d.strings,this,r):d.type===6&&(h=new Jt(s,this,r)),this._$AV.push(h),d=e[++a]}o!==d?.index&&(s=tt.nextNode(),o++)}return tt.currentNode=et,i}p(r){let t=0;for(let e of this._$AV)e!==void 0&&(e.strings!==void 0?(e._$AI(r,e,t),t+=e.strings.length-2):e._$AI(r[t])),t++}},yt=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(r,t,e,i){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=r,this._$AB=t,this._$AM=e,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let r=this._$AA.parentNode,t=this._$AM;return t!==void 0&&r?.nodeType===11&&(r=t.parentNode),r}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(r,t=this){r=st(this,r,t),vt(r)?r===p||r==null||r===""?(this._$AH!==p&&this._$AR(),this._$AH=p):r!==this._$AH&&r!==rt&&this._(r):r._$litType$!==void 0?this.$(r):r.nodeType!==void 0?this.T(r):ii(r)?this.k(r):this._(r)}O(r){return this._$AA.parentNode.insertBefore(r,this._$AB)}T(r){this._$AH!==r&&(this._$AR(),this._$AH=this.O(r))}_(r){this._$AH!==p&&vt(this._$AH)?this._$AA.nextSibling.data=r:this.T(et.createTextNode(r)),this._$AH=r}$(r){let{values:t,_$litType$:e}=r,i=typeof e=="number"?this._$AC(r):(e.el===void 0&&(e.el=bt.createElement(Oe(e.h,e.h[0]),this.options)),e);if(this._$AH?._$AD===i)this._$AH.p(t);else{let s=new Vt(i,this),o=s.u(this.options);s.p(t),this.T(o),this._$AH=s}}_$AC(r){let t=Re.get(r.strings);return t===void 0&&Re.set(r.strings,t=new bt(r)),t}k(r){Qt(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,e,i=0;for(let s of r)i===t.length?t.push(e=new n(this.O(ft()),this.O(ft()),this,this.options)):e=t[i],e._$AI(s),i++;i<t.length&&(this._$AR(e&&e._$AB.nextSibling,i),t.length=i)}_$AR(r=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);r!==this._$AB;){let e=Se(r).nextSibling;Se(r).remove(),r=e}}setConnected(r){this._$AM===void 0&&(this._$Cv=r,this._$AP?.(r))}},nt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(r,t,e,i,s){this.type=1,this._$AH=p,this._$AN=void 0,this.element=r,this.name=t,this._$AM=i,this.options=s,e.length>2||e[0]!==""||e[1]!==""?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=p}_$AI(r,t=this,e,i){let s=this.strings,o=!1;if(s===void 0)r=st(this,r,t,0),o=!vt(r)||r!==this._$AH&&r!==rt,o&&(this._$AH=r);else{let a=r,d,h;for(r=s[0],d=0;d<s.length-1;d++)h=st(this,a[e+d],t,d),h===rt&&(h=this._$AH[d]),o||=!vt(h)||h!==this._$AH[d],h===p?r=p:r!==p&&(r+=(h??"")+s[d+1]),this._$AH[d]=h}o&&!i&&this.j(r)}j(r){r===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,r??"")}},Yt=class extends nt{constructor(){super(...arguments),this.type=3}j(r){this.element[this.name]=r===p?void 0:r}},Xt=class extends nt{constructor(){super(...arguments),this.type=4}j(r){this.element.toggleAttribute(this.name,!!r&&r!==p)}},Zt=class extends nt{constructor(r,t,e,i,s){super(r,t,e,i,s),this.type=5}_$AI(r,t=this){if((r=st(this,r,t,0)??p)===rt)return;let e=this._$AH,i=r===p&&e!==p||r.capture!==e.capture||r.once!==e.once||r.passive!==e.passive,s=r!==p&&(e===p||i);i&&this.element.removeEventListener(this.name,this,e),s&&this.element.addEventListener(this.name,this,r),this._$AH=r}handleEvent(r){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,r):this._$AH.handleEvent(r)}},Jt=class{constructor(r,t,e){this.element=r,this.type=6,this._$AN=void 0,this._$AM=t,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(r){st(this,r)}};var ni=Lt.litHtmlPolyfillSupport;ni?.(bt,yt),(Lt.litHtmlVersions??=[]).push("3.3.3");var Ne=(n,r,t)=>{let e=t?.renderBefore??r,i=e._$litPart$;if(i===void 0){let s=t?.renderBefore??null;e._$litPart$=i=new yt(r.insertBefore(ft(),s),s,void 0,t??{})}return i._$AI(n),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ee=globalThis,v=class extends W{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let r=super.createRenderRoot();return this.renderOptions.renderBefore??=r.firstChild,r}update(r){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(r),this._$Do=Ne(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return rt}};v._$litElement$=!0,v.finalized=!0,ee.litElementHydrateSupport?.({LitElement:v});var oi=ee.litElementPolyfillSupport;oi?.({LitElement:v});(ee.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var y=n=>(r,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(n,r)}):customElements.define(n,r)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ai={attribute:!0,type:String,converter:mt,reflect:!1,hasChanged:Ht},li=(n=ai,r,t)=>{let{kind:e,metadata:i}=t,s=globalThis.litPropertyMetadata.get(i);if(s===void 0&&globalThis.litPropertyMetadata.set(i,s=new Map),e==="setter"&&((n=Object.create(n)).wrapped=!0),s.set(t.name,n),e==="accessor"){let{name:o}=t;return{set(a){let d=r.get.call(this);r.set.call(this,a),this.requestUpdate(o,d,n,!0,a)},init(a){return a!==void 0&&this.C(o,void 0,n,a),a}}}if(e==="setter"){let{name:o}=t;return function(a){let d=this[o];r.call(this,a),this.requestUpdate(o,d,n,!0,a)}}throw Error("Unsupported decorator location: "+e)};function u(n){return(r,t)=>typeof t=="object"?li(n,r,t):((e,i,s)=>{let o=i.hasOwnProperty(s);return i.constructor.createProperty(s,e),o?Object.getOwnPropertyDescriptor(i,s):void 0})(n,r,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function g(n){return u({...n,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
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
 */var xt=12,Ue=2.2,j=100,F=100,Ie=500;function De(n,r){let t=Array.from({length:xt},(e,i)=>{let s=-90+360/xt*i+Ue/2,o=-90+360/xt*(i+1)-Ue/2;return pi(93,82,s,o)});return $`
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

      <circle cx=${j} cy=${F} r="97" fill="var(--el-shell)"></circle>
      <circle cx=${j} cy=${F} r="97" fill="none" stroke="var(--el-edge)" stroke-width="1"></circle>

      <g class="halo" filter="url(#blur)" style="opacity:${n.glow}">
        ${t.map((e,i)=>$`<path d=${e} style="fill:${n.segments[i].opacity?n.segments[i].fill:"transparent"}"></path>`)}
      </g>

      ${t.map((e,i)=>$`<path
          class="segment"
          data-picked=${String(n.picked===i)}
          data-divisible=${String(n.divisible)}
          d=${e}
          style="fill:${n.segments[i].fill};opacity:${n.segments[i].opacity}"
          @click=${n.divisible?()=>r.segment(i):r.ring}
        ></path>`)}

      <circle cx=${j} cy=${F} r="79" fill="url(#top)"></circle>
      <circle cx=${j} cy=${F} r="79" fill="none" stroke="var(--el-edge)" stroke-width="1"></circle>


      ${re(j,F-46,$`<path d="M-4.5 0h9M0 -4.5v9"></path>`,"Volume up",()=>r.volume(1))}
      <g
        class="btn"
        data-lit=${String(n.holding)}
        transform="translate(${j+46} ${F})"
        role="button"
        tabindex="0"
        aria-label=${n.holding?"Wake the second assistant":"Wake"}
        @pointerdown=${()=>r.action("down")}
        @pointerup=${()=>r.action("up")}
        @pointerleave=${()=>r.action("cancel")}
        @pointercancel=${()=>r.action("cancel")}
      >
        <circle class="face" cx="0" cy="0" r="13"></circle>
        <g class="glyph"><circle cx="0" cy="0" r="4.5"></circle></g>
      </g>
      ${re(j,F+46,$`<path d="M-4.5 0h9"></path>`,"Volume down",()=>r.volume(-1))}
      ${re(j-46,F,ci(n.muted),n.muted?"Microphone muted":"Microphone live",r.mute,n.muted)}
    </svg>
  `}function re(n,r,t,e,i,s=!1){return $`<g class="btn" data-lit=${String(s)} transform="translate(${n} ${r})"
    role="button" tabindex="0" aria-label=${e} @click=${i}>
    <circle class="face" cx="0" cy="0" r="13"></circle>
    <g class="glyph">${t}</g>
  </g>`}function ci(n){return $`
    <path d="M-2.6 -5.2a2.6 2.6 0 0 1 5.2 0v4a2.6 2.6 0 0 1-5.2 0z"></path>
    <path d="M-4.6 -0.6a4.6 4.6 0 0 0 9.2 0"></path>
    <path d="M0 3.8v2.6"></path>
    ${n?$`<path d="M-6.4 6.4L6.4 -6.4"></path>`:di()}
  `}function di(){return $``}function pi(n,r,t,e){let i=(w,_)=>{let T=_*Math.PI/180;return[(j+w*Math.cos(T)).toFixed(2),(F+w*Math.sin(T)).toFixed(2)]},[s,o]=i(n,t),[a,d]=i(n,e),[h,m]=i(r,e),[f,x]=i(r,t);return`M${s} ${o}A${n} ${n} 0 0 1 ${a} ${d}L${h} ${m}A${r} ${r} 0 0 0 ${f} ${x}Z`}var We=`:host {
  display: block;
}

ha-card {
  padding: 16px;
}

/* The controls wrap the artwork on two sides \u2014 down the right, along the bottom \u2014 so there is room for
   more of them without the card growing a menu. */
.frame {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  grid-template-rows: auto auto;
  gap: 12px;
  align-items: center;
}

/* The shell colors are the product's own, so they are fixed rather than themed. Everything outside the
   artwork comes from Home Assistant's theme variables. */
/* The default. Grey reads on a light page and a dark one. */
.art {
  grid-area: 1 / 1;
  min-width: 0;
  max-width: 240px;
  margin: 0 auto;

  --el-shell: #4a4d52;
  --el-top: #3c3f44;
  --el-top-high: #5a5e64;
  --el-edge: rgba(255, 255, 255, 0.13);
  --el-ring-off: rgba(255, 255, 255, 0.1);
  --el-glyph: rgba(255, 255, 255, 0.62);
  --el-btn: rgba(255, 255, 255, 0.07);
}

.art[data-shell="black"] {
  --el-shell: #24262a;
  --el-top: #191b1e;
  --el-top-high: #2e3237;
  --el-edge: rgba(255, 255, 255, 0.09);
  --el-ring-off: rgba(255, 255, 255, 0.07);
  --el-glyph: rgba(255, 255, 255, 0.55);
  --el-btn: rgba(255, 255, 255, 0.05);
}

.art[data-shell="white"] {
  --el-shell: #e7e4dd;
  --el-top: #f2f0ea;
  --el-top-high: #ffffff;
  --el-edge: rgba(0, 0, 0, 0.1);
  --el-ring-off: rgba(0, 0, 0, 0.09);
  --el-glyph: rgba(0, 0, 0, 0.45);
  --el-btn: rgba(0, 0, 0, 0.04);
}

svg {
  width: 100%;
  height: auto;
  display: block;
}

.segment {
  transition: fill 0.4s ease, opacity 0.4s ease;
}

.segment[data-divisible="true"] {
  cursor: pointer;
}

.segment[data-picked="true"] {
  stroke: var(--primary-text-color);
  stroke-width: 2;
}

.plain {
  padding: 7px 12px;
  border: 1px solid color-mix(in srgb, var(--primary-color) 45%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, var(--primary-color) 12%, transparent);
  color: var(--primary-color);
  font: inherit;
  font-size: 0.82rem;
  cursor: pointer;
  white-space: nowrap;
}

.plain:hover {
  background: color-mix(in srgb, var(--primary-color) 20%, transparent);
}

.plain.quiet {
  border-color: var(--divider-color);
  background: none;
  color: var(--secondary-text-color);
}

.plain.quiet:hover {
  background: var(--secondary-background-color);
}

.palette {
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
}

.palette .top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.palette .name {
  white-space: nowrap;
}

.palette .swatches {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(24px, 1fr));
  gap: 6px;
}

.palette .swatch {
  aspect-ratio: 1;
  min-width: 0;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
}

.palette .swatch:hover {
  border-color: var(--primary-text-color);
}

.palette .sq {
  width: 30px;
  height: 30px;
  border-radius: 8px;
}

.palette .sq ha-icon {
  --mdc-icon-size: 18px;
}

.halo {
  transition: opacity 0.4s ease;
}

.art[data-activity="listening"] .halo {
  animation: breathe 2s ease-in-out infinite;
}

@keyframes breathe {
  0%,
  100% {
    opacity: 0.35;
  }
  50% {
    opacity: 0.8;
  }
}

.hit {
  cursor: pointer;
  pointer-events: stroke;
}

.btn {
  cursor: pointer;
}

.face {
  fill: var(--el-btn);
}

.btn .glyph path {
  stroke: var(--el-glyph);
  stroke-width: 1.6;
  fill: none;
  stroke-linecap: round;
}

.btn .glyph circle {
  fill: var(--el-glyph);
}

.btn:hover .face {
  fill: var(--el-edge);
}

.btn[data-lit="true"] .glyph path {
  stroke: var(--error-color, #db4437);
}

.btn[data-lit="true"] .face {
  fill: color-mix(in srgb, var(--error-color, #db4437) 22%, transparent);
}

.side {
  grid-area: 1 / 2;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.foot {
  grid-area: 2 / 1 / 3 / 3;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 12px;
  border-top: 1px solid var(--divider-color);
  padding-top: 12px;
}

.label {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}

.name {
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--primary-text-color);
}

.status {
  font-size: 0.8rem;
  color: var(--secondary-text-color);
}

/* The divider is what makes the L read as one shape: the name keeps its own compartment, and the buttons
   past it are the foot of the run that comes down the right. */
.tail {
  display: flex;
  gap: 8px;
  padding-left: 12px;
  border-left: 1px solid var(--divider-color);
}

.sq {
  position: relative;
  width: 40px;
  height: 40px;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  padding: 0;
  border: 1px solid var(--divider-color);
  border-radius: 10px;
  background: none;
  cursor: pointer;
  color: inherit;
}

.sq:hover {
  background: var(--secondary-background-color);
}

.sq ha-icon {
  --mdc-icon-size: 22px;
  color: var(--secondary-text-color);
  display: flex;
}

.badge {
  position: absolute;
  right: 3px;
  bottom: 1px;
  font-size: 0.62rem;
  line-height: 1;
  color: var(--secondary-text-color);
}

.missing {
  color: var(--secondary-text-color);
}
`;var je=`:host {
  display: flex;
  gap: 18px;
  align-items: center;
  padding: 14px;
  border-radius: 14px;
  background: color-mix(in srgb, var(--primary-text-color) 5%, transparent);
}

.dial {
  width: 190px;
  flex: 0 0 auto;
  touch-action: none;
}

svg {
  width: 100%;
  height: auto;
  display: block;
}

.arc-bed {
  fill: none;
  stroke: color-mix(in srgb, var(--primary-text-color) 10%, transparent);
  stroke-width: 9;
  stroke-linecap: round;
}

.arc-live {
  fill: none;
  stroke: var(--primary-color);
  stroke-width: 9;
  stroke-linecap: round;
  transition: stroke-dasharray 0.5s ease, stroke 0.3s ease;
}

.arc-live[data-over="true"] {
  stroke: var(--success-color, #43a047);
}

.notch {
  stroke: var(--primary-text-color);
  stroke-width: 3;
  stroke-linecap: round;
  cursor: grab;
}

.capsule {
  fill: color-mix(in srgb, var(--primary-text-color) 14%, transparent);
  transition: fill 0.3s ease;
}

.capsule[data-on="true"] {
  fill: var(--primary-color);
}

.beam {
  fill: color-mix(in srgb, var(--primary-color) 16%, transparent);
  stroke: color-mix(in srgb, var(--primary-color) 40%, transparent);
}

.spoke {
  stroke: color-mix(in srgb, var(--primary-color) 35%, transparent);
  stroke-width: 1.2;
}

.slash {
  stroke: var(--error-color, #db4437);
  stroke-width: 3;
  stroke-linecap: round;
}

.side {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.reading {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.now {
  font-size: 1.9rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: var(--primary-text-color);
  line-height: 1;
}

.unit {
  font-size: 0.8rem;
  color: var(--secondary-text-color);
}

.now.cut {
  color: var(--error-color, #db4437);
}

.caption {
  margin-left: auto;
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 0.75rem;
  background: color-mix(in srgb, var(--primary-text-color) 7%, transparent);
  color: var(--secondary-text-color);
}

.caption[data-over="true"] {
  background: color-mix(in srgb, var(--success-color, #43a047) 18%, transparent);
  color: var(--success-color, #43a047);
}

.modes {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.mode {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border: 1px solid transparent;
  border-radius: 12px;
  background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
  color: var(--secondary-text-color);
  font: inherit;
  font-size: 0.85rem;
  cursor: pointer;
  text-align: left;
}

.mode:hover {
  background: color-mix(in srgb, var(--primary-text-color) 11%, transparent);
}

.mode[data-on="true"] {
  border-color: color-mix(in srgb, var(--primary-color) 45%, transparent);
  background: color-mix(in srgb, var(--primary-color) 15%, transparent);
  color: var(--primary-color);
}

.mode svg {
  width: 26px;
  flex: 0 0 auto;
}

.gate {
  font-size: 0.78rem;
  color: var(--secondary-text-color);
}

.gate b {
  color: var(--primary-text-color);
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}
`;var Fe=26,Pt=135,Et=270,S=100,A=100,V=84,zt=38,R=class extends v{constructor(){super(...arguments);this.level="";this.floor="";this.gate="";this.mode="";this.muted=!1;this.held=null;this.grab=t=>{let e=t.currentTarget;e.setPointerCapture(t.pointerId);let i=this.hass.states[this.gate]?.attributes??{},s=i.min??0,o=i.max??20,a=i.step??1,d=this.number(this.floor)??0,h=this.number(this.level)??0,m=Math.max(d+Fe,h+3),f=_=>{let T=e.getBoundingClientRect(),ye=_.clientX-T.left-T.width/2,Bt=_.clientY-T.top-T.height/2,ht=Math.atan2(Bt,ye)*180/Math.PI-Pt;for(;ht<0;)ht+=360;let Kr=ie(Math.min(ht,Et)/Et);return Math.max(s,Math.min(o,Math.round(Kr*(m-d)/a)*a))},x=_=>{this.held=f(_)},w=_=>{e.removeEventListener("pointermove",x),e.removeEventListener("pointerup",w),e.removeEventListener("pointercancel",w);let T=f(_);this.held=null,this.hass.callService("number","set_value",{entity_id:this.gate,value:T})};e.addEventListener("pointermove",x),e.addEventListener("pointerup",w),e.addEventListener("pointercancel",w),this.held=f(t)}}render(){let t=this.number(this.level),e=this.number(this.floor),i=this.held??this.number(this.gate);if(t===null||e===null||i===null)return p;let s=this.hass.states[this.mode],o=qe(s?.state),a=Math.max(e+Fe,t+3),d=ie((t-e)/(a-e)),h=ie(i/(a-e)),m=t>=e+i&&!this.muted;return l`
      <div class="dial" @pointerdown=${this.grab}>
        <svg viewBox="0 0 200 200" role="img" aria-label="Microphone array">
          <path class="arc-bed" d=${Be()} pathLength="100"></path>
          ${this.muted?p:$`<path
                class="arc-live"
                data-over=${String(m)}
                d=${Be()}
                pathLength="100"
                stroke-dasharray=${`${d*100} 100`}
              ></path>`}
          ${this.muted?p:bi(h)} ${o==="beam"?vi():p}
          ${o==="sum"?fi():p} ${mi(o,this.muted)}
          ${this.muted?$`<path class="slash" d="M${S-30} ${A+30}L${S+30} ${A-30}"></path>`:p}
        </svg>
      </div>

      <div class="side">
        <div class="reading">
          ${this.muted?l`<span class="now cut">Cut</span>`:l`<span class="now">${t.toFixed(1)}</span><span class="unit">dB</span>
                <span class="caption" data-over=${String(m)}>
                  ${m?"Over the gate":"Quiet"}
                </span>`}
        </div>

        <div class="modes">
          ${(s?.attributes.options??[]).map(f=>l`<button
              class="mode"
              data-on=${String(f===s?.state)}
              @click=${()=>this.hass.callService("select","select_option",{entity_id:this.mode,option:f})}
            >
              <svg viewBox="0 0 40 40">${gi(qe(f))}</svg>
              <span>${f}</span>
            </button>`)}
        </div>

        <div class="gate">Gate <b>${i} dB</b> over a floor of <b>${e.toFixed(0)} dB</b></div>
      </div>
    `}number(t){let e=Number(this.hass?.states?.[t]?.state);return Number.isFinite(e)?e:null}};R.styles=b(je),c([u({attribute:!1})],R.prototype,"hass",2),c([u()],R.prototype,"level",2),c([u()],R.prototype,"floor",2),c([u()],R.prototype,"gate",2),c([u()],R.prototype,"mode",2),c([u({type:Boolean})],R.prototype,"muted",2),c([g()],R.prototype,"held",2),R=c([y("echolocal-array")],R);function qe(n){let r=(n??"").toLowerCase();return r.includes("center")||r.includes("centre")?"one":r.includes("beam")?"beam":"sum"}function mi(n,r){return[[S,A],...Array.from({length:6},(e,i)=>{let s=(-90+i*60)*Math.PI/180;return[S+zt*Math.cos(s),A+zt*Math.sin(s)]})].map(([e,i],s)=>$`<circle class="capsule" data-on=${String(!r&&(n!=="one"||s===0))}
      cx=${e.toFixed(1)} cy=${i.toFixed(1)} r=${s===0?7:5.5}></circle>`)}function gi(n){let r=[[20,20],...Array.from({length:6},(t,e)=>{let i=(-90+e*60)*Math.PI/180;return[20+12*Math.cos(i),20+12*Math.sin(i)]})];return $`
    ${n==="beam"?$`<path class="beam" d="M20 20C9 11 13 1 20 1C27 1 31 11 20 20Z"></path>`:p}
    ${r.map(([t,e],i)=>$`<circle class="capsule" data-on=${String(n!=="one"||i===0)}
          cx=${t.toFixed(1)} cy=${e.toFixed(1)} r=${i===0?3.4:2.6}></circle>`)}`}function fi(){return Array.from({length:6},(n,r)=>{let t=(-90+r*60)*Math.PI/180;return $`<line class="spoke" x1=${S} y1=${A}
      x2=${(S+zt*Math.cos(t)).toFixed(1)} y2=${(A+zt*Math.sin(t)).toFixed(1)}></line>`})}function vi(){return $`<path class="beam" d="M${S} ${A}C${S-34} ${A-30} ${S-24} ${A-66} ${S} ${A-66}C${S+24} ${A-66} ${S+34} ${A-30} ${S} ${A}Z"></path>`}function Be(){let n=Pt*Math.PI/180,r=(Pt+Et)*Math.PI/180;return`M${(S+V*Math.cos(n)).toFixed(2)} ${(A+V*Math.sin(n)).toFixed(2)}
    A${V} ${V} 0 1 1 ${(S+V*Math.cos(r)).toFixed(2)} ${(A+V*Math.sin(r)).toFixed(2)}`}function bi(n){let r=(Pt+n*Et)*Math.PI/180,t=V-8,e=V+8;return $`<line class="notch"
    x1=${(S+t*Math.cos(r)).toFixed(1)} y1=${(A+t*Math.sin(r)).toFixed(1)}
    x2=${(S+e*Math.cos(r)).toFixed(1)} y2=${(A+e*Math.sin(r)).toFixed(1)}></line>`}function ie(n){return Math.max(0,Math.min(1,n))}var Ke=`:host {
  position: relative;
  display: inline-flex;
  flex: 0 0 auto;
  vertical-align: middle;
}

button {
  width: 15px;
  height: 15px;
  display: grid;
  place-items: center;
  padding: 0;
  border: 1px solid color-mix(in srgb, var(--primary-text-color) 26%, transparent);
  border-radius: 50%;
  background: none;
  color: var(--secondary-text-color);
  font: inherit;
  font-size: 9px;
  font-weight: 700;
  line-height: 1;
  cursor: help;
  opacity: 0.65;
}

button:hover,
button[data-open="true"] {
  opacity: 1;
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.said {
  position: absolute;
  top: calc(100% + 7px);
  right: -4px;
  z-index: 20;
  width: max-content;
  max-width: min(300px, 70vw);
  padding: 11px 13px;
  border-radius: 11px;
  border: 1px solid color-mix(in srgb, var(--primary-text-color) 12%, transparent);
  background: var(--card-background-color, var(--primary-background-color));
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);
  color: var(--primary-text-color);
  font-size: 0.79rem;
  font-weight: 400;
  line-height: 1.45;
  text-align: left;
  text-transform: none;
  letter-spacing: normal;
  white-space: normal;
}

`;var it=class extends v{constructor(){super(...arguments);this.text="";this.open=!1;this.toggle=t=>{t.stopPropagation(),t.preventDefault(),this.open=!this.open,this.open?(this.place(),document.addEventListener("click",this.elsewhere,!0)):document.removeEventListener("click",this.elsewhere,!0)};this.elsewhere=t=>{t.composedPath().includes(this)||(this.open=!1,document.removeEventListener("click",this.elsewhere,!0))}}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this.elsewhere,!0)}render(){return this.text?l`
      <button
        data-open=${String(this.open)}
        aria-label="What this does"
        aria-expanded=${String(this.open)}
        @click=${this.toggle}
      >
        ?
      </button>
      ${this.open?l`<div class="said" role="tooltip">${this.text}</div>`:p}
    `:p}async place(){let t=(await this.updateComplete,this.shadowRoot?.querySelector(".said"));if(!(t instanceof HTMLElement))return;t.style.removeProperty("transform");let e=(this.closest(".sheet")??this.offsetParent??document.body).getBoundingClientRect(),i=t.getBoundingClientRect(),s=10,o=Math.max(0,e.left+s-i.left)-Math.max(0,i.right-e.right+s);o&&(t.style.transform=`translateX(${Math.round(o)}px)`)}};it.styles=b(Ke),c([u()],it.prototype,"text",2),c([g()],it.prototype,"open",2),it=c([y("echolocal-bubble")],it);var Ge=`.sheet {
  transition: width 0.2s ease;
}

.head {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}

.crest {
  width: 44px;
  height: 44px;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: color-mix(in srgb, var(--primary-color) 16%, transparent);
}

.crest ha-icon {
  --mdc-icon-size: 24px;
  color: var(--primary-color);
  display: flex;
}

.titles {
  flex: 1 1 auto;
  min-width: 0;
}

/* The header's right hand side: a component's primary control, which is dead space otherwise. */
.crown {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 0 0 auto;
}

.lamp {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px 4px 6px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
}

.lamp ha-icon {
  --mdc-icon-size: 16px;
  color: var(--secondary-text-color);
  display: flex;
}

.pip {
  padding: 3px 8px;
  border: none;
  border-radius: 8px;
  background: none;
  color: var(--secondary-text-color);
  font: inherit;
  font-size: 0.75rem;
  cursor: pointer;
}

.pip[data-on="true"] {
  background: color-mix(in srgb, var(--primary-color) 20%, transparent);
  color: var(--primary-color);
}

.toggle.big {
  width: 52px;
  height: 30px;
  border-radius: 15px;
}

.toggle.big::after {
  width: 24px;
  height: 24px;
}

/* Mute reads as a warning when it is on; every other header switch is just on. */
.toggle.big[data-on="true"] {
  background: var(--error-color, #db4437);
}

.toggle.big.power[data-on="true"] {
  background: var(--primary-color);
}

.round {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  padding: 0;
  border: 1px solid color-mix(in srgb, var(--primary-color) 45%, transparent);
  border-radius: 50%;
  background: color-mix(in srgb, var(--primary-color) 12%, transparent);
  cursor: pointer;
}

.round ha-icon {
  --mdc-icon-size: 22px;
  color: var(--primary-color);
  display: flex;
}

.round:hover {
  background: color-mix(in srgb, var(--primary-color) 20%, transparent);
}

.toggle.big[data-on="true"]::after {
  transform: translateX(22px);
}

.title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--primary-text-color);
  line-height: 1.2;
}

/* A widget's own "?" sits in its top corner. The room for it is reserved rather than overlapped: every
   one of these puts something at the top right of itself, and a "?" over a reading is worse than none. */
.explained {
  position: relative;
}

.explained > :not(echolocal-bubble) {
  padding-right: 21px;
}

.explained > echolocal-bubble.corner {
  position: absolute;
  top: 1px;
  right: 0;
  z-index: 3;
}

.subtitle {
  font-size: 0.8rem;
  color: var(--secondary-text-color);
}

.hero {
  margin-bottom: 16px;
}

/* Columns rather than a grid: sections are different heights, and a grid strands the short ones next to
   a tall one instead of packing them. */
.groups {
  columns: 2 300px;
  column-gap: 24px;
}

.group {
  break-inside: avoid;
  margin-bottom: 14px;
}

.section {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 8px 2px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  color: var(--secondary-text-color);
}

.section::before {
  content: "";
  width: 3px;
  height: 12px;
  border-radius: 2px;
  background: var(--primary-color);
  opacity: 0.6;
}

.tile {
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding: 10px 14px;
  margin-bottom: 5px;
  border-radius: 14px;
  background: color-mix(in srgb, var(--primary-text-color) 5%, transparent);
}

.top {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon {
  width: 32px;
  height: 32px;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: color-mix(in srgb, var(--primary-text-color) 7%, transparent);
  transition: background 0.2s ease;
}

.icon ha-icon {
  --mdc-icon-size: 19px;
  color: var(--secondary-text-color);
  display: flex;
  transition: color 0.2s ease;
}

.tile[data-active="true"] .icon {
  background: color-mix(in srgb, var(--primary-color) 20%, transparent);
}

.tile[data-active="true"] .icon ha-icon {
  color: var(--primary-color);
}

.tile[data-alert="true"] .icon {
  background: color-mix(in srgb, var(--error-color, #db4437) 20%, transparent);
}

.tile[data-alert="true"] .icon ha-icon {
  color: var(--error-color, #db4437);
}

/* The name takes the slack so the reading stays at the right edge, and the "?" travels with the words
   rather than being pushed across the row to sit against the value. */
.named {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 7px;
}

.name {
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--primary-text-color);
}

.trail {
  flex: 0 0 auto;
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.reading {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  font-size: 1.15rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: var(--primary-text-color);
  cursor: pointer;
}

.reading:hover {
  color: var(--primary-color);
}

.unit {
  font-size: 0.78rem;
  color: var(--secondary-text-color);
}

.toggle {
  flex: 0 0 auto;
  width: 44px;
  height: 26px;
  padding: 0;
  border: none;
  border-radius: 13px;
  background: color-mix(in srgb, var(--primary-text-color) 18%, transparent);
  cursor: pointer;
  position: relative;
  transition: background 0.2s ease;
}

.toggle::after {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--card-background-color);
  transition: transform 0.2s ease;
}

.toggle[data-on="true"] {
  background: var(--primary-color);
}

.toggle[data-on="true"]::after {
  transform: translateX(18px);
}

.toggle[data-on="unavailable"] {
  opacity: 0.4;
  cursor: default;
}

/* The track is drawn rather than left to the browser, so the filled part reads as the value at a glance
   and the thumb is big enough to grab on a phone. */
input[type="range"] {
  width: 100%;
  height: 8px;
  margin: 0;
  border-radius: 4px;
  appearance: none;
  background: linear-gradient(
    to right,
    var(--primary-color) 0%,
    var(--primary-color) var(--fill, 50%),
    color-mix(in srgb, var(--primary-text-color) 12%, transparent) var(--fill, 50%),
    color-mix(in srgb, var(--primary-text-color) 12%, transparent) 100%
  );
  cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--card-background-color);
  border: 2px solid var(--primary-color);
  cursor: grab;
}

input[type="range"]::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border: 2px solid var(--primary-color);
  border-radius: 50%;
  background: var(--card-background-color);
  cursor: grab;
}

.options {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.chip {
  padding: 7px 13px;
  border: 1px solid transparent;
  border-radius: 10px;
  background: color-mix(in srgb, var(--primary-text-color) 7%, transparent);
  color: var(--secondary-text-color);
  font: inherit;
  font-size: 0.84rem;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}

.chip:hover {
  background: color-mix(in srgb, var(--primary-text-color) 12%, transparent);
}

.chip[data-on="true"] {
  background: color-mix(in srgb, var(--primary-color) 18%, transparent);
  border-color: color-mix(in srgb, var(--primary-color) 45%, transparent);
  color: var(--primary-color);
}

select {
  width: 100%;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid color-mix(in srgb, var(--primary-text-color) 12%, transparent);
  background: var(--card-background-color);
  color: var(--primary-text-color);
  font: inherit;
}

.press {
  padding: 7px 14px;
  border: 1px solid color-mix(in srgb, var(--primary-color) 45%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, var(--primary-color) 12%, transparent);
  color: var(--primary-color);
  font: inherit;
  font-size: 0.84rem;
  cursor: pointer;
}

.press:hover {
  background: color-mix(in srgb, var(--primary-color) 20%, transparent);
}

.empty {
  color: var(--secondary-text-color);
}
`;var Ve=`:host {
  display: block;
  padding: 14px;
  border-radius: 14px;
  background: color-mix(in srgb, var(--primary-text-color) 5%, transparent);
}

.dim {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid color-mix(in srgb, var(--primary-text-color) 10%, transparent);
  font-size: 0.85rem;
  color: var(--secondary-text-color);
}

.dim b {
  font-variant-numeric: tabular-nums;
  color: var(--primary-text-color);
  font-weight: 500;
}

input[type="range"] {
  flex: 1 1 auto;
  accent-color: var(--primary-color);
  min-width: 0;
}

.when {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 6px;
  margin-bottom: 12px;
}

.situation {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 9px 11px;
  border: 1px solid transparent;
  border-radius: 12px;
  background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
  color: var(--secondary-text-color);
  font: inherit;
  cursor: pointer;
  text-align: left;
  min-width: 0;
}

.situation:hover {
  background: color-mix(in srgb, var(--primary-text-color) 12%, transparent);
}

.situation[data-on="true"] {
  border-color: color-mix(in srgb, var(--primary-color) 45%, transparent);
  background: color-mix(in srgb, var(--primary-color) 14%, transparent);
}

.situation ha-icon {
  --mdc-icon-size: 19px;
  flex: 0 0 auto;
  display: flex;
}

.situation .text {
  min-width: 0;
}

.situation .label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.situation .shows {
  font-size: 0.88rem;
  color: var(--primary-text-color);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.situation[data-on="true"] .shows {
  color: var(--primary-color);
}

.caption {
  margin-bottom: 8px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  color: var(--secondary-text-color);
}

/* Scrolls, so forty effects do not push the rest of the popup down. */
.options {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  max-height: 150px;
  overflow: auto;
  mask-image: linear-gradient(to bottom, black calc(100% - 18px), transparent);
}

.option {
  padding: 6px 11px;
  border: 1px solid transparent;
  border-radius: 10px;
  background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
  color: var(--secondary-text-color);
  font: inherit;
  font-size: 0.8rem;
  cursor: pointer;
  white-space: nowrap;
}

.option:hover {
  background: color-mix(in srgb, var(--primary-text-color) 12%, transparent);
}

.option[data-on="true"] {
  border-color: color-mix(in srgb, var(--primary-color) 45%, transparent);
  background: color-mix(in srgb, var(--primary-color) 15%, transparent);
  color: var(--primary-color);
}
`;var E=class extends v{constructor(){super(...arguments);this.light="";this.muted="";this.failure="";this.room="";this.target="rest"}render(){let t=this.hass.states[this.light];if(!t)return p;let e=this.situations(),i=e.find(o=>o.key===this.target)??e[0],s=t.attributes.brightness??255;return l`
      <div class="dim">
        <span>Brightness</span>
        <input
          type="range"
          min="1"
          max="255"
          .value=${String(s)}
          ?disabled=${t.state!=="on"}
          @change=${o=>this.hass.callService("light","turn_on",{entity_id:this.light,brightness:Number(o.target.value)})}
        />
        <b>${Math.round(s/255*100)}%</b>
      </div>

      <div class="when">
        ${e.map(o=>l`<button
            class="situation"
            data-on=${String(o.key===i.key)}
            @click=${()=>this.target=o.key}
          >
            <ha-icon .icon=${o.icon}></ha-icon>
            <div class="text">
              <div class="label">${o.label}</div>
              <div class="shows">${this.showing(o)||"None"}</div>
            </div>
          </button>`)}
      </div>

      <div class="caption">${i.label} shows</div>
      <div class="options">
        ${this.options(i).map(o=>l`<button
            class="option"
            data-on=${String(o===this.showing(i))}
            @click=${()=>this.choose(i,o)}
          >
            ${o}
          </button>`)}
      </div>
    `}situations(){return[{key:"rest",label:"At rest",icon:"mdi:record-circle-outline"},{key:"muted",label:"Muted",icon:"mdi:microphone-off",entity:this.muted},{key:"failure",label:"On failure",icon:"mdi:alert-circle-outline",entity:this.failure},{key:"room",label:"Follows the room",icon:"mdi:motion-sensor",entity:this.room}].filter(e=>e.key==="rest"||e.entity&&this.hass.states[e.entity])}showing(t){return t.entity?this.hass.states[t.entity]?.state??"":this.hass.states[this.light]?.attributes.effect??""}options(t){return(t.entity?this.hass.states[t.entity]?.attributes.options:this.hass.states[this.light]?.attributes.effect_list)??[]}choose(t,e){if(!t.entity){this.hass.callService("light","turn_on",{entity_id:this.light,effect:e});return}this.hass.callService("select","select_option",{entity_id:t.entity,option:e})}};E.styles=b(Ve),c([u({attribute:!1})],E.prototype,"hass",2),c([u()],E.prototype,"light",2),c([u()],E.prototype,"muted",2),c([u()],E.prototype,"failure",2),c([u()],E.prototype,"room",2),c([g()],E.prototype,"target",2),E=c([y("echolocal-appearance")],E);var $i={mic_mute:"Cuts the microphones in hardware. The device cannot hear anything at all while this is on, including its wake word \u2014 it is a switch on the power to the capsules, not a software mute.",microphone_gain:"How much the capsules are amplified before anything else happens. Raise it in a large or quiet room; lower it if speech close to the device clips and comes out distorted.",microphone_mixing:"How the seven capsules are combined into the one channel the speech engine hears. Beamforming favours whichever direction someone is talking from and rejects the rest of the room; averaging treats every direction equally and is steadier when several people talk.",microphone_leveling:"Evens out loud and quiet talkers so a whisper across the room and a shout beside it arrive at similar volume. Helps transcription, and costs a little dynamic range.",microphone_cancel_echo:"Subtracts what the speaker is playing from what the microphones hear, so the device can be interrupted while it is talking and does not answer its own reply.",microphone_sensitivity:"How much louder than the room's own noise floor a sound has to be before the device treats it as somebody talking. Raise it in a noisy room to stop the device reacting to the room itself; lower it if quiet speech is missed.",room_level:"How loud the room is right now, in decibels below full scale. Nothing to set \u2014 it is what the sensitivity is measured against, and watching it is how you pick a sensible one.",room_floor:"The quietest the room has been recently, which is the baseline the device compares against. It drifts with the room, so a fridge switching on raises it rather than fooling the device.",mute_led_brightness:"How bright the red ring is while the microphones are cut. Dim is enough to see in a dark room without lighting it up.",stop_word_sensitivity:"How sure the device has to be before it takes an interruption as the word stop. Lower it if saying stop over a reply does not land.",ring:"The whole ring, as one light. Turning it off leaves the device working normally and silent about it.",segment:"One of the twelve segments, addressable on its own. They ship switched off in Home Assistant because twelve extra lights in every list is rarely what anyone wants \u2014 enable one and it can be coloured individually from the card.",ring_muted:"What the ring does while the microphones are cut. Something visible is worth choosing: a muted device that looks identical to a listening one is how people end up talking to a device that cannot hear them.",failure_effect:"What the ring does when a turn fails \u2014 no network, no pipeline, nothing understood. Distinct from the normal colours on purpose.",room_reaction:"Lets the ring track how loud the room is while the device is listening, so somebody can see that it is hearing them before it answers.",headphones:"Sends audio out of the jack instead of the speaker. The speaker goes quiet while this is on.",noise_layer:"Plays a generated sound the device makes itself \u2014 rain, a fan, a brook. Nothing is streamed and nothing is stored: it is synthesised as it plays, so it never loops or runs out. Two layers can overlap, so rain over a fan is one choice in each.",media_on_turn:"What happens to music when someone says the wake word. Ducking drops the volume and keeps playing, which resumes on the same note; stopping does not.",media_duck_level:"How far the volume drops while the device is listening or talking. Far enough that the microphones are not fighting the music, not so far that the room goes silent.",voice_resampling:"How the reply's audio is resampled to what the speaker wants. Better quality costs a little more work on a device that has four small cores.",wake_word:"What this assistant listens for. The list is what the device has on disk plus whatever Home Assistant is offering from its custom_wake_words directory.",wake_threshold:"How sure the device has to be before it decides it heard its wake word. Lower it if it misses you; raise it if the television sets it off.",follow_up:"Keeps listening for a moment after a reply, so a second question needs no second wake word.",max_listen:"How long the device will wait for someone to finish talking before giving up on the turn.",max_think:"How long to wait for Home Assistant's pipeline to answer. Generous is usually right \u2014 a slow answer beats a turn that dies just before it arrives.",wake_effect:"What the ring does at this point in a turn. Cosmetic, but it is how somebody knows the device heard them.",wake_tone:"A short sound at this point in a turn. Some people want the confirmation; some find it grating.",reply_buffer:"How much of a reply to collect before starting to play it. More is steadier on a poor network, at the cost of answering a beat later.",reply_delivery:"Whether a reply starts playing as it arrives or once all of it has. Streaming is faster to start and stutters on a bad connection.",update_channel:"Which releases this device is offered. Stable only, or the ones that are still being tried out.",check_for_updates:"Looks now rather than waiting for the next scheduled check. Nothing is installed by pressing it.",bluetooth_proxy:"Forwards nearby Bluetooth advertisements to Home Assistant, so this device extends Bluetooth coverage into its room. It costs some radio time it would otherwise spend on wifi.",metrics_interval:"How often the device reports its own temperature, memory and load. Often enough to be useful; every report is work the device does instead of listening.",purge_cache:"Deletes what Android's runtime has cached. It comes back on its own, so this buys disk space for a while rather than permanently.",test_playback:"Plays a short sound, which is the quickest way to find out whether the speaker, the volume and the output route are all what you think they are.",remote_adb:"Opens Android's debugging port over the network. Off by default, and worth leaving off: it is an unauthenticated way onto the device for anything on the same network.",vad_sensitivity:"How readily the device decides somebody has stopped talking. Tighter ends a turn sooner and can cut you off mid-sentence.",wifi_signal:"How strong the connection to the access point is. Above about -70 dBm is comfortable; below -80 dBm is where audio starts arriving late.",cpu_temperature:"The chip's own temperature. These run warm by design \u2014 it is a sustained climb rather than a number that matters.",load_average:"How much work is queued across the cores. Listening for a wake word is continuous work, so this is never zero.",memory_available:"How much memory is free. Wake models and the audio path are what use it.",free_space:"Disk left. Wake models and saved recordings are what fill it.",update_status:"What the last self-update did. Worth reading when a device is on an older version than the rest."},ki={array:"The seven capsules and what the room sounds like to them. The arc is how loud the room is right now; the notch is how far above the room's own noise floor something has to be before the device treats it as speech. Drag the notch, then talk from where you normally would and watch whether the arc crosses it.",appearance:"Ring controls, current brighness and color, active and conditional effects.",turn:"A turn's budget, end to end. The two grips are how long the device will wait for someone to finish talking, and how long it will wait for Home Assistant to answer. The band is what a slow turn would spend.",noise:"Sounds the device generates itself, mixed live rather than played from a file, so nothing loops. Two layers overlap \u2014 pick rain in one and a fan in the other.",volume:"The speaker's volume, in the same thirty steps the buttons on the device move it through, so this dial and the device agree.",history:"What the device has been hearing. Rows rebuilt from Home Assistant's recorder show what was said; rows the device itself reported also show where the time went and can be played back."},_i={microphone:"The seven microphones and how the room sounds to them. Everything here changes what the device hears before a word of it reaches Home Assistant, so it is the first place to look when it mishears or does not wake at all.",ring:"The twelve-segment light. None of it changes what the device does \u2014 it changes what somebody in the room can tell about it, which is why the muted and failed colours are worth setting.",playback:"The speaker: what comes out of it, how loud, and what happens to music when somebody talks to the device.",assistant:"One wake word and the turn that follows it. A device can run more than one, each with its own word, sensitivity and timings, which is how one device answers to two names.",device:"The device itself rather than anything it hears or says: which releases it takes, what else it does for the network, and the housekeeping.",diagnostics:"What the device reports about itself. Nothing here is a setting \u2014 it is the evidence, and it is what to read before changing anything else."};function Ye(n){return $i[n]}function Xe(n){return ki[n]}function Ze(n){return _i[n]??""}var Ot="echolocal_turn";var Le="turn_audio";var Si=[{key:"wake_ms",label:"Wake"},{key:"listen_ms",label:"Listen"},{key:"think_ms",label:"Think"},{key:"speak_ms",label:"Reply"}];function wt(n){return Si.map(({key:r,label:t})=>({key:r,label:t,ms:Number(n[r]??0)})).filter(r=>r.ms>0)}function ot(n){return wt(n).reduce((r,t)=>r+t.ms,0)}function Nt(n){let r=n;if(!r||r.version!=="1"||!r.wake_word)return null;let t={version:1,mac:(r.mac??"").toLowerCase(),id:r.id??"",slot:Je(r.slot)??1,wake_word:r.wake_word,outcome:r.outcome??"completed"};r.heard&&(t.heard=r.heard),r.reply&&(t.reply=r.reply);for(let e of["wake_ms","listen_ms","think_ms","speak_ms","audio_seconds","peak_db","floor_db"]){let i=Je(r[e]);i!==void 0&&(t[e]=i)}return t}function Je(n){if(n===void 0||n==="")return;let r=Number(n);return Number.isFinite(r)?r:void 0}var Qe=`:host {
  display: block;
}

.caption {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  color: var(--secondary-text-color);
}

.caption span {
  margin-left: auto;
  text-transform: none;
  letter-spacing: 0;
  font-weight: 400;
  font-size: 0.75rem;
}

.turns {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-height: 300px;
  overflow: auto;
  mask-image: linear-gradient(to bottom, black calc(100% - 16px), transparent);
}

.turn {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 4px 10px;
  padding: 9px 12px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--primary-text-color) 5%, transparent);
}

.when {
  font-size: 0.78rem;
  font-variant-numeric: tabular-nums;
  color: var(--secondary-text-color);
  white-space: nowrap;
}

.wake {
  font-size: 0.78rem;
  color: var(--primary-color);
}

.right {
  grid-column: 3;
  grid-row: 1;
  display: flex;
  align-items: center;
  gap: 8px;
}

.outcome {
  font-size: 0.72rem;
  color: var(--secondary-text-color);
  white-space: nowrap;
}

.outcome[data-bad="true"] {
  color: var(--error-color, #db4437);
}

.said,
.said-back,
.bar {
  grid-column: 2 / span 2;
}

.said {
  font-size: 0.85rem;
  color: var(--primary-text-color);
}

.said-back {
  font-size: 0.85rem;
  color: var(--secondary-text-color);
}

.said-back::before {
  content: "\u21B3 ";
  opacity: 0.6;
}

/* One turn's phases, to scale against each other. */
.bar {
  display: flex;
  height: 8px;
  margin-top: 6px;
  border-radius: 4px;
  overflow: hidden;
  background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
}

.slice {
  min-width: 2px;
}

.slice[data-phase="wake_ms"] {
  background: var(--primary-color);
}

.slice[data-phase="listen_ms"] {
  background: color-mix(in srgb, var(--primary-color) 55%, transparent);
}

.slice[data-phase="think_ms"] {
  background: color-mix(in srgb, var(--primary-text-color) 30%, transparent);
}

.slice[data-phase="speak_ms"] {
  background: var(--success-color, #43a047);
}

.legend {
  grid-column: 2 / span 2;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 5px;
  font-size: 0.7rem;
  color: var(--secondary-text-color);
  font-variant-numeric: tabular-nums;
}

.none {
  padding: 10px 0;
  font-size: 0.82rem;
  color: var(--secondary-text-color);
}
`;var se=new Map;function tr(n){return se.get(n)}function er(n,r,t){let i=`${r.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"")}_${t}`;return n?.services?.esphome?.[i]?i:void 0}async function rr(n,r,t){let e=se.get(t);if(e)return e;let i=[],s="audio/wav",o=1;for(let d=0;d<Math.min(o,64);d++){let h=await Ci(n,r,t,d);if(!h)return null;o=h.pages||1,s=h.mime||s,i.push(Mi(h.data))}let a=URL.createObjectURL(new Blob(i,{type:s}));return se.set(t,a),a}async function Ci(n,r,t,e){try{let s=(await n.callService("esphome",r,{id:t,page:e},void 0,!0,!0))?.response;return s?.version===1&&typeof s.data=="string"?s:null}catch{return null}}function Mi(n){let r=atob(n),t=new Uint8Array(r.length);for(let e=0;e<r.length;e++)t[e]=r.charCodeAt(e);return t}var ir=`:host {
  display: flex;
  gap: 6px;
  flex: 0 0 auto;
}

button {
  flex: 0 0 auto;
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  padding: 0;
  border: 1px solid color-mix(in srgb, var(--primary-color) 40%, transparent);
  border-radius: 50%;
  background: color-mix(in srgb, var(--primary-color) 12%, transparent);
  cursor: pointer;
}

button.keep {
  border-color: color-mix(in srgb, var(--primary-text-color) 18%, transparent);
  background: color-mix(in srgb, var(--primary-text-color) 5%, transparent);
}

button ha-icon {
  --mdc-icon-size: 16px;
  color: var(--primary-color);
  display: flex;
}

button.keep ha-icon {
  color: var(--secondary-text-color);
}
`;var at=null,z=class extends v{constructor(){super(...arguments);this.device="";this.turn="";this.filename="recording.wav";this.busy=!1;this.playing=!1;this.play=async()=>{if(this.playing){at?.audio.pause();return}let t=await this.fetch();if(!t)return;at?.stop();let e=new Audio(t),i=()=>{this.playing=!1,at?.audio===e&&(at=null)};e.addEventListener("ended",i),e.addEventListener("pause",i),at={audio:e,stop:()=>e.pause()},this.playing=!0,e.play().catch(i)};this.save=async()=>{let t=await this.fetch();if(!t)return;let e=document.createElement("a");e.href=t,e.download=this.filename,e.click()}}disconnectedCallback(){super.disconnectedCallback(),this.playing&&at?.audio.pause()}render(){return!this.turn||!this.action()?p:l`
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
    `}action(){return this.device?er(this.hass,this.device,Le):void 0}async fetch(){let t=tr(this.turn);if(t)return t;let e=this.action();if(!e)return null;this.busy=!0;try{return await rr(this.hass,e,this.turn)}finally{this.busy=!1}}};z.styles=b(ir),c([u({attribute:!1})],z.prototype,"hass",2),c([u()],z.prototype,"device",2),c([u()],z.prototype,"turn",2),c([u()],z.prototype,"filename",2),c([g()],z.prototype,"busy",2),c([g()],z.prototype,"playing",2),z=c([y("echolocal-recording")],z);var sr=24,nr=12,Ti=4e3,M=class extends v{constructor(){super(...arguments);this.mac="";this.wake="";this.heard="";this.reply="";this.device="";this.recorded=[];this.live=[];this.asked=!1}updated(){this.asked||!this.hass||!this.wake||(this.asked=!0,this.load(),this.listen())}disconnectedCallback(){super.disconnectedCallback(),this.stop?.()}render(){let t=this.merged();return l`
      <div class="caption">
        Recent turns ${t.length?l`<span>last ${sr} hours</span>`:p}
      </div>
      ${t.length?l`<div class="turns">${t.map(e=>this.row(e,this.scale(t)))}</div>`:l`<div class="none">${this.asked?"Nothing in the last day.":"Looking\u2026"}</div>`}
    `}scale(t){return Math.max(1,...t.map(e=>e.turn?ot(e.turn):0))}row(t,e){let i=t.turn,s=i?wt(i):[],o=i?ot(i):0;return l`<div class="turn">
      <div class="when">${Ei(t.at)}</div>
      <div class="wake">${t.wake}</div>
      <div class="right">
        ${i?l`<div class="outcome" data-bad=${String(i.outcome!=="completed")}>
              ${i.outcome==="completed"?`${(o/1e3).toFixed(1)}s`:i.outcome}
            </div>`:p}
        ${i?.audio_seconds?l`<echolocal-recording
              .hass=${this.hass}
              .device=${this.device}
              .turn=${i.id}
              .filename=${zi(t)}
            ></echolocal-recording>`:p}
      </div>
      ${t.heard?l`<div class="said">${t.heard}</div>`:p}
      ${t.reply?l`<div class="said-back">${t.reply}</div>`:p}
      ${s.length?l`<div class="bar">
              ${s.map(a=>l`<div
                  class="slice"
                  data-phase=${a.key}
                  title=${`${a.label} ${a.ms} ms`}
                  style=${`flex:0 0 ${a.ms/e*100}%`}
                ></div>`)}
            </div>
            <div class="legend">
              ${s.map(a=>l`<span>${a.label} ${(a.ms/1e3).toFixed(1)}s</span>`)}
            </div>`:p}
    </div>`}merged(){let t=[...this.live];for(let e of this.recorded)t.some(i=>Math.abs(i.at-e.at)<Ti)||t.push(e);return t.sort((e,i)=>i.at-e.at).slice(0,nr)}async load(){let t=[this.wake,this.heard,this.reply].filter(Boolean),e=new Date(Date.now()-sr*36e5).toISOString();try{let i=await this.hass.callWS({type:"history/history_during_period",start_time:e,entity_ids:t,minimal_response:!0,no_attributes:!0});this.recorded=Ri(ne(i[this.wake]),ne(i[this.heard]),ne(i[this.reply]))}catch{this.recorded=[]}}async listen(){if(this.hass.connection)try{this.stop=await this.hass.connection.subscribeEvents(t=>{let e=Nt(t.data);e&&(this.mac&&e.mac&&e.mac!==this.mac||(this.live=[{at:Date.now(),wake:e.wake_word,heard:e.heard,reply:e.reply,turn:e},...this.live].slice(0,nr)))},Ot)}catch{}}};M.styles=b(Qe),c([u({attribute:!1})],M.prototype,"hass",2),c([u()],M.prototype,"mac",2),c([u()],M.prototype,"wake",2),c([u()],M.prototype,"heard",2),c([u()],M.prototype,"reply",2),c([u()],M.prototype,"device",2),c([g()],M.prototype,"recorded",2),c([g()],M.prototype,"live",2),c([g()],M.prototype,"asked",2),M=c([y("echolocal-history")],M);function ne(n){return(n??[]).map(r=>({at:r.lu?r.lu*1e3:Date.parse(r.last_updated??""),value:r.s??r.state??""})).filter(r=>Number.isFinite(r.at)&&Pi(r.value))}function Ri(n,r,t){let e=[...n].sort((s,o)=>o.at-s.at),i=s=>[...s].sort((o,a)=>o.at-a.at);return e.map((s,o)=>{let a=e[o-1]?.at??1/0,d=h=>i(h).find(m=>m.at>=s.at&&m.at<a)?.value;return{at:s.at,wake:s.value,heard:d(r),reply:d(t)}})}function Pi(n){return!!n&&n!=="unknown"&&n!=="unavailable"&&n!=="None"}function Ei(n){return new Date(n).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function zi(n){let r=new Date(n.at).toISOString().replace(/[:.]/g,"-").slice(0,19),t=n.wake.toLowerCase().replace(/[^a-z0-9]+/g,"-");return`${r}-${t}.wav`}var or=`:host {
  display: block;
  padding: 14px;
  border-radius: 14px;
  background: color-mix(in srgb, var(--primary-text-color) 5%, transparent);
}

.caption {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 10px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  color: var(--secondary-text-color);
}

.caption span {
  margin-left: auto;
  text-transform: none;
  letter-spacing: 0;
  font-weight: 400;
  font-size: 0.75rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(78px, 1fr));
  gap: 6px;
}

.sound {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 10px 6px;
  border: 1px solid transparent;
  border-radius: 12px;
  background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
  color: var(--secondary-text-color);
  font: inherit;
  font-size: 0.75rem;
  cursor: pointer;
}

.sound:hover {
  background: color-mix(in srgb, var(--primary-text-color) 12%, transparent);
}

.sound[data-on="true"] {
  border-color: color-mix(in srgb, var(--primary-color) 45%, transparent);
  background: color-mix(in srgb, var(--primary-color) 15%, transparent);
  color: var(--primary-color);
}

.sound ha-icon {
  --mdc-icon-size: 22px;
  display: flex;
}

/* Which of the two layers a sound is on, when there is more than one. */
.layer {
  position: absolute;
  top: 4px;
  right: 6px;
  font-size: 0.62rem;
  line-height: 1;
}
`;var ar=`:host {
  display: flex;
  gap: 18px;
  align-items: center;
  padding: 14px;
  border-radius: 14px;
  background: color-mix(in srgb, var(--primary-text-color) 5%, transparent);
}

.dial {
  width: 150px;
  flex: 0 0 auto;
  touch-action: none;
}

svg {
  width: 100%;
  height: auto;
  display: block;
}

.bed {
  fill: none;
  stroke: color-mix(in srgb, var(--primary-text-color) 10%, transparent);
  stroke-width: 10;
  stroke-linecap: round;
}

.live {
  fill: none;
  stroke: var(--primary-color);
  stroke-width: 10;
  stroke-linecap: round;
  transition: stroke-dasharray 0.25s ease;
}

.live[data-muted="true"] {
  stroke: color-mix(in srgb, var(--primary-text-color) 20%, transparent);
}

.step {
  fill: var(--primary-text-color);
  font-size: 26px;
  font-weight: 500;
  text-anchor: middle;
}

.of {
  fill: var(--secondary-text-color);
  font-size: 10px;
  text-anchor: middle;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.side {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.state {
  font-size: 1.05rem;
  color: var(--primary-text-color);
}

.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--primary-text-color) 7%, transparent);
  font-size: 0.78rem;
  color: var(--secondary-text-color);
}

.badge ha-icon {
  --mdc-icon-size: 16px;
  display: flex;
}

.badge[data-on="true"] {
  background: color-mix(in srgb, var(--primary-color) 16%, transparent);
  color: var(--primary-color);
}
`;var oe=135,ae=270,Ut=100,It=100,lt=78,Ui={White:"mdi:grain",Pink:"mdi:blur",Brown:"mdi:waveform",Rain:"mdi:weather-pouring",Ocean:"mdi:waves",Brook:"mdi:water",Wind:"mdi:weather-windy",Fire:"mdi:fireplace",Crickets:"mdi:bug-outline",Fan:"mdi:fan",Cabin:"mdi:airplane"},ct="None",Y=class extends v{constructor(){super(...arguments);this.player="";this.jack="";this.grab=t=>{let e=t.currentTarget;e.setPointerCapture(t.pointerId);let i=d=>{let h=e.getBoundingClientRect(),m=d.clientX-h.left-h.width/2,f=d.clientY-h.top-h.height/2,x=Math.atan2(f,m)*180/Math.PI-oe;for(;x<0;)x+=360;let w=Math.max(0,Math.min(1,Math.min(x,ae)/ae));return Math.round(w*30)/30},s=d=>this.hass.callService("media_player","volume_set",{entity_id:this.player,volume_level:i(d)}),o=d=>s(d),a=d=>{e.removeEventListener("pointermove",o),e.removeEventListener("pointerup",a),e.removeEventListener("pointercancel",a),s(d)};e.addEventListener("pointermove",o),e.addEventListener("pointerup",a),e.addEventListener("pointercancel",a),s(t)}}render(){let t=this.hass.states[this.player];if(!t)return p;let e=Number(t.attributes.volume_level??0),i=t.attributes.is_volume_muted===!0,s=this.jack?this.hass.states[this.jack]?.state==="on":!1;return l`
      <div class="dial" @pointerdown=${this.grab}>
        <svg viewBox="0 0 200 200" role="img" aria-label="Volume">
          <path class="bed" d=${lr()} pathLength="100"></path>
          ${e>0?$`<path class="live" data-muted=${String(i)} d=${lr()} pathLength="100"
                stroke-dasharray=${`${e*100} 100`}></path>`:p}
          <text class="step" x=${Ut} y=${It+4}>${Math.round(e*30)}</text>
          <text class="of" x=${Ut} y=${It+20}>of 30</text>
        </svg>
      </div>

      <div class="side">
        <div class="state">${Ii(t.state)}</div>
        <div class="badges">
          <div class="badge" data-on=${String(i)}>
            <ha-icon .icon=${i?"mdi:volume-off":"mdi:volume-high"}></ha-icon>
            ${i?"Muted":`${Math.round(e*100)}%`}
          </div>
          ${this.jack?l`<div class="badge" data-on=${String(s)}>
                <ha-icon icon="mdi:headphones"></ha-icon>
                ${s?"Headphones":"Speaker"}
              </div>`:p}
        </div>
      </div>
    `}};Y.styles=b(ar),c([u({attribute:!1})],Y.prototype,"hass",2),c([u()],Y.prototype,"player",2),c([u()],Y.prototype,"jack",2),Y=c([y("echolocal-volume")],Y);var X=class extends v{constructor(){super(...arguments);this.layers=[];this.busy=!1}render(){let t=this.layers.map(o=>this.hass.states[o]?.state??ct),e=(this.hass.states[this.layers[0]]?.attributes.options??[]).filter(o=>o!==ct),i=t.every(o=>o!==ct),s=o=>t.indexOf(o);return l`
      <div class="caption">
        Generated sound
        <span>${i?"Both layers in use":`${t.filter(o=>o!==ct).length} of 2`}</span>
      </div>
      <div class="grid">
        ${e.map(o=>{let a=s(o);return l`<button
            class="sound"
            data-on=${String(a>=0)}
            ?disabled=${this.busy}
            @click=${()=>this.pick(o,a,t)}
          >
            <ha-icon .icon=${Ui[o]??"mdi:music-note"}></ha-icon>
            ${o}
            ${a>=0&&this.layers.length>1?l`<span class="layer">${a+1}</span>`:p}
          </button>`})}
      </div>
    `}async pick(t,e,i){let s=i.findIndex(a=>a===ct),o=e>=0?e:s>=0?s:this.layers.length-1;if(!(o<0)){this.busy=!0;try{await this.hass.callService("select","select_option",{entity_id:this.layers[o],option:e>=0?ct:t})}finally{this.busy=!1}}}};X.styles=b(or),c([u({attribute:!1})],X.prototype,"hass",2),c([u({attribute:!1})],X.prototype,"layers",2),c([g()],X.prototype,"busy",2),X=c([y("echolocal-noise")],X);function Ii(n){return n==="playing"?"Playing":n==="paused"?"Paused":n==="unavailable"?"Unavailable":"Idle"}function lr(){let n=oe*Math.PI/180,r=(oe+ae)*Math.PI/180;return`M${(Ut+lt*Math.cos(n)).toFixed(2)} ${(It+lt*Math.sin(n)).toFixed(2)}
    A${lt} ${lt} 0 1 1 ${(Ut+lt*Math.cos(r)).toFixed(2)} ${(It+lt*Math.sin(r)).toFixed(2)}`}var cr=`:host {
  display: block;
  padding: 14px;
  border-radius: 14px;
  background: color-mix(in srgb, var(--primary-text-color) 5%, transparent);
}

.top {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 12px;
}

.caption {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  color: var(--secondary-text-color);
}

.total {
  margin-left: auto;
  font-size: 0.8rem;
  color: var(--secondary-text-color);
}

.total b {
  color: var(--primary-text-color);
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}

.band {
  position: relative;
  display: flex;
  height: 44px;
  border-radius: 10px;
  overflow: hidden;
  background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
  touch-action: none;
}

.phase {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  font-size: 0.78rem;
  white-space: nowrap;
  overflow: hidden;
  transition: flex-basis 0.15s ease;
}

.phase.wake {
  flex: 0 0 64px;
  background: color-mix(in srgb, var(--primary-color) 30%, transparent);
  color: var(--primary-text-color);
}

.phase.listen {
  background: color-mix(in srgb, var(--primary-color) 18%, transparent);
  color: var(--primary-color);
}

.phase.think {
  background: color-mix(in srgb, var(--primary-text-color) 12%, transparent);
  color: var(--secondary-text-color);
}

.phase.reply {
  flex: 1 1 auto;
  color: var(--secondary-text-color);
}

.grip {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 12px;
  margin-left: -6px;
  cursor: col-resize;
  display: grid;
  place-items: center;
}

.grip::before {
  content: "";
  width: 2px;
  height: 60%;
  border-radius: 1px;
  background: var(--primary-text-color);
  opacity: 0.6;
}

.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 10px;
  font-size: 0.78rem;
  color: var(--secondary-text-color);
}

.legend b {
  color: var(--primary-text-color);
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}
`;var q=class extends v{constructor(){super(...arguments);this.listen="";this.think="";this.held={}}render(){let t=this.reading(this.listen),e=this.reading(this.think);if(!t||!e)return p;let i=t.max+e.max,s=o=>o/i*100;return l`
      <div class="top">
        <div class="caption">A turn</div>
        <div class="total">
          longest <b>${(t.value+e.value).toFixed(0)}s</b> of ${i.toFixed(0)}s
        </div>
      </div>

      <div class="band">
        <div class="phase wake">Wake</div>
        <div class="phase listen" style=${`flex:0 0 ${s(t.value)}%`}>
          ${t.value>=3?"Listen":""}
        </div>
        <div class="phase think" style=${`flex:0 0 ${s(e.value)}%`}>
          ${e.value>=3?"Think":""}
        </div>
        <div class="phase reply">Reply</div>

        ${this.grip(this.listen,t,64,s(t.value))}
        ${this.grip(this.think,e,64,s(t.value)+s(e.value))}
      </div>

      <div class="legend">
        <span>Listening <b>${t.value}s</b></span>
        <span>Thinking <b>${e.value}s</b></span>
      </div>
    `}grip(t,e,i,s){return l`<div
      class="grip"
      style=${`left:calc(${i}px + ${s}% - ${i*s/100}px)`}
      role="slider"
      aria-label=${t}
      aria-valuenow=${e.value}
      @pointerdown=${o=>this.drag(o,t,e)}
    ></div>`}drag(t,e,i){let s=t.currentTarget.parentElement;s.setPointerCapture(t.pointerId);let o=e===this.listen?this.reading(this.think):this.reading(this.listen),a=e===this.think?this.reading(this.listen)?.value??0:0,d=(i.max??0)+(o?.max??0),h=x=>{let w=s.getBoundingClientRect(),_=64,T=w.width-_,Bt=Math.max(0,Math.min(1,(x.clientX-w.left-_)/T))*d-a,ht=Math.round(Bt/(i.step||1))*(i.step||1);return Math.max(i.min,Math.min(i.max,ht))},m=x=>{this.held={...this.held,[e]:h(x)}},f=x=>{s.removeEventListener("pointermove",m),s.removeEventListener("pointerup",f),s.removeEventListener("pointercancel",f);let w=h(x),{[e]:_,...T}=this.held;this.held=T,this.hass.callService("number","set_value",{entity_id:e,value:w})};s.addEventListener("pointermove",m),s.addEventListener("pointerup",f),s.addEventListener("pointercancel",f)}reading(t){let e=this.hass?.states?.[t];if(!e)return null;let i=this.held[t]??Number(e.state);return Number.isFinite(i)?{value:i,min:e.attributes.min??0,max:e.attributes.max??30,step:e.attributes.step??1}:null}};q.styles=b(cr),c([u({attribute:!1})],q.prototype,"hass",2),c([u()],q.prototype,"listen",2),c([u()],q.prototype,"think",2),c([g()],q.prototype,"held",2),q=c([y("echolocal-turn")],q);var C=class extends v{constructor(){super(...arguments);this.heading="";this.subtitle="";this.icon="";this.sections=[];this.widgets=[];this.device="";this.mac="";this.help=!0;this.about="";this.held={}}render(){let t=this.sections.map(o=>({...o,rows:o.rows.filter(a=>this.hass.states?.[a.entityId])})).filter(o=>o.rows.length),i=t.reduce((o,a)=>o+a.rows.length,0)>3||this.widgets.some(o=>o.place!=="header")?820:460,s=`--mdc-dialog-min-width:min(94vw,${i}px);--mdc-dialog-max-width:min(94vw,${i}px)`;return l`
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
            ${this.widgets.filter(o=>o.place==="header").map(o=>this.widget(o))}
          </div>
          ${this.widgets.filter(o=>o.place!=="header").map(o=>this.explained(o))}
          <div class="groups">
            ${t.length?t.map(o=>this.group(o)):this.widgets.length?p:l`<div class="empty">Nothing to show here.</div>`}
          </div>
        </div>
      </ha-dialog>
    `}widget({widget:t,roles:e,lists:i}){let s=o=>o?.[0]??"";switch(t){case"appearance":return l`<echolocal-appearance
          class="hero"
          .hass=${this.hass}
          .light=${e.light}
          .muted=${s(i.muted)}
          .failure=${s(i.failure)}
          .room=${s(i.room)}
        ></echolocal-appearance>`;case"array":return l`<echolocal-array
          class="hero"
          .hass=${this.hass}
          .level=${e.level}
          .floor=${e.floor}
          .gate=${e.gate}
          .mode=${e.mode}
          .muted=${this.muted}
        ></echolocal-array>`;case"history":return l`<echolocal-history
          class="hero"
          .hass=${this.hass}
          .wake=${e.wake}
          .heard=${e.heard??""}
          .reply=${e.reply??""}
          .device=${this.device}
          .mac=${this.mac}
        ></echolocal-history>`;case"turn":return l`<echolocal-turn
          class="hero"
          .hass=${this.hass}
          .listen=${e.listen}
          .think=${e.think}
        ></echolocal-turn>`;case"volume":return l`<echolocal-volume
          class="hero"
          .hass=${this.hass}
          .player=${e.player}
          .jack=${s(i.jack)}
        ></echolocal-volume>`;case"noise":return l`<echolocal-noise
          class="hero"
          .hass=${this.hass}
          .layers=${i.layers??[]}
        ></echolocal-noise>`;case"player":return this.crownPlayer(e.player);case"power":return this.crownPower(e.light);case"mute":return this.crownMute(e.mute,e.lamp)}}crownPlayer(t){let e=this.hass.states[t],i=e?.state==="playing",s=e?.attributes.is_volume_muted!==!0;return l`<div class="crown">
      <button
        class="round"
        aria-label=${i?"Pause":"Play"}
        @click=${()=>this.hass.callService("media_player",i?"media_pause":"media_play",{entity_id:t})}
      >
        <ha-icon .icon=${i?"mdi:pause":"mdi:play"}></ha-icon>
      </button>
      <button
        class="toggle big power"
        data-on=${String(s)}
        aria-label="Sound"
        @click=${()=>this.hass.callService("media_player","volume_mute",{entity_id:t,is_volume_muted:s})}
      ></button>
    </div>`}crownPower(t){return l`<div class="crown">
      <button
        class="toggle big power"
        data-on=${String(this.hass.states[t]?.state==="on")}
        aria-label="Ring"
        @click=${()=>this.hass.callService("light","toggle",{entity_id:t})}
      ></button>
    </div>`}crownMute(t,e){let i=this.hass.states[e];return l`<div class="crown">
      ${i?l`<div class="lamp" title="Mute indicator">
            <ha-icon icon="mdi:brightness-6"></ha-icon>
            ${(i.attributes.options??[]).map(s=>l`<button
                class="pip"
                data-on=${String(s===i.state)}
                @click=${()=>this.hass.callService("select","select_option",{entity_id:e,option:s})}
              >
                ${s}
              </button>`)}
          </div>`:p}
      <button
        class="toggle big"
        data-on=${String(this.hass.states[t]?.state==="on")}
        aria-label="Microphone mute"
        @click=${()=>this.hass.callService("switch","toggle",{entity_id:t})}
      ></button>
    </div>`}get muted(){let t=this.widgets.find(e=>e.roles.mute)?.roles.mute;return!!t&&this.hass.states[t]?.state==="on"}explained(t){let e=this.help?Xe(t.widget):void 0;return e?l`<div class="explained">
      ${this.widget(t)}
      <echolocal-bubble class="corner" .text=${e}></echolocal-bubble>
    </div>`:this.widget(t)}group(t){return l`<section class="group">
      ${t.title?l`<div class="section">${t.title}</div>`:p}
      ${t.rows.map(e=>this.row(e))}
    </section>`}row(t){if(!this.hass.states?.[t.entityId])return p;switch(t.entityId.split(".")[0]){case"switch":return this.toggle(t,"switch");case"light":return this.toggle(t,"light");case"number":return this.slider(t);case"select":return this.options(t);case"button":return this.press(t);default:return this.reading(t)}}toggle(t,e){let{entityId:i,label:s}=t,o=this.hass.states[i].state,a=o==="unavailable"?"unavailable":String(o==="on");return this.tile(t,a==="true",{trail:l`<button
        class="toggle"
        data-on=${a}
        aria-label=${s}
        @click=${()=>this.hass.callService(e,"toggle",{entity_id:i})}
      ></button>`})}slider(t){let{entityId:e}=t,i=this.hass.states[e],s=i.attributes,o=s.min??0,a=s.max??100,d=this.held[e]??Number(i.state),h=a>o?(d-o)/(a-o)*100:0;return this.tile(t,!1,{trail:l`<span class="reading">${Number.isNaN(d)?"\u2014":d}</span>
        ${s.unit_of_measurement?l`<span class="unit">${s.unit_of_measurement}</span>`:p}`,under:l`<input
        type="range"
        style="--fill:${h}%"
        .value=${String(d)}
        min=${o}
        max=${a}
        step=${s.step??1}
        ?disabled=${i.state==="unavailable"}
        @input=${m=>{this.held={...this.held,[e]:Number(m.target.value)}}}
        @change=${m=>{let f=Number(m.target.value),{[e]:x,...w}=this.held;this.held=w,this.hass.callService("number","set_value",{entity_id:e,value:f})}}
      />`})}options(t){let{entityId:e}=t,i=this.hass.states[e],s=i.attributes.options??[],o=h=>this.hass.callService("select","select_option",{entity_id:e,option:h});if(s.length>4)return this.tile(t,!1,{under:l`<select
          ?disabled=${i.state==="unavailable"}
          @change=${h=>o(h.target.value)}
        >
          ${s.map(h=>l`<option value=${h} ?selected=${h===i.state}>${h}</option>`)}
        </select>`});let a=l`<div class="options">
      ${s.map(h=>l`<button
          class="chip"
          data-on=${String(h===i.state)}
          @click=${()=>o(h)}
        >
          ${h}
        </button>`)}
    </div>`,d=s.join("").length<=22&&s.length<=3;return this.tile(t,!1,d?{trail:a}:{under:a})}press(t){return this.tile(t,!1,{trail:l`<button
        class="press"
        @click=${()=>this.hass.callService("button","press",{entity_id:t.entityId})}
      >
        Run
      </button>`})}reading(t){let e=this.hass.states[t.entityId],i=e.attributes.unit_of_measurement;return this.tile(t,!1,{trail:l`<button class="reading" @click=${()=>this.moreInfo(t.entityId)}>
          ${e.state}
        </button>
        ${i?l`<span class="unit">${i}</span>`:p}`})}tile({entityId:t,label:e,name:i},s,o){let a=this.hass.states[t].attributes.icon,d=s&&a?.includes("mic")&&a.includes("off"),h=this.help?Ye(i):void 0;return l`<div class="tile" data-active=${String(s&&!d)} data-alert=${String(!!d)}>
      <div class="top">
        <div class="icon"><ha-icon .icon=${a??"mdi:tune"}></ha-icon></div>
        <div class="named">
          <div class="name">${e}</div>
          ${h?l`<echolocal-bubble .text=${h}></echolocal-bubble>`:p}
        </div>
        ${o.trail?l`<div class="trail">${o.trail}</div>`:p}
      </div>
      ${o.under??p}
    </div>`}moreInfo(t){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}dismiss(){this.dispatchEvent(new CustomEvent("closed",{bubbles:!0,composed:!0}))}};C.styles=b(Ge),c([u({attribute:!1})],C.prototype,"hass",2),c([u()],C.prototype,"heading",2),c([u()],C.prototype,"subtitle",2),c([u()],C.prototype,"icon",2),c([u({attribute:!1})],C.prototype,"sections",2),c([u({attribute:!1})],C.prototype,"widgets",2),c([u()],C.prototype,"device",2),c([u()],C.prototype,"mac",2),c([u({type:Boolean})],C.prototype,"help",2),c([u()],C.prototype,"about",2),c([g()],C.prototype,"held",2),C=c([y("echolocal-dialog")],C);function dr(n,r){let t=pr(n);return r.map(e=>{let i=t?.get(e.entity_id);return{...e,name:i?.name??"",slot:i?.slot??0,part:i?.part??0}})}function $t(n){let r=new Map;for(let t of n){let e=r.get(t.name);e?e.push(t):r.set(t.name,[t])}for(let t of r.values())t.sort((e,i)=>e.slot-i.slot);return r}var Wt="echolocal-keys",Dt=null,le=null;function pr(n){return Dt||(Dt=Wi(n),Dt.then(()=>window.dispatchEvent(new Event(Wt))),ji(n)),le}async function Wi(n){let r=new Map;try{let t=await n.callWS({type:"config/entity_registry/list"});for(let e of t)e.device_id&&r.set(e.entity_id,{entityId:e.entity_id,deviceId:e.device_id,...ce(e.unique_id),platform:e.platform,disabled:!!e.disabled_by})}catch{}return le=r,r}function ce(n){let r=n.replace(/^(?:[0-9a-f]{2}:){5}[0-9a-f]{2}-?/i,""),t=r.lastIndexOf("@"),e=t<0?0:Number(r.slice(t+1))||0,i=t<0?r:r.slice(0,t),s=i.indexOf("-"),o=s<0?i:i.slice(s+1),a=o.lastIndexOf("_"),d=a<0?"":o.slice(a+1),h=/^\d+$/.test(d);return{name:h?o.slice(0,a):o,slot:h?Number(d):0,part:e}}function ji(n){n.connection?.subscribeEvents(()=>{Dt=null,le=null,pr(n)},"entity_registry_updated").catch(()=>{})}var pe={ring:[{title:null,rows:[["ring","Ring"]]},{title:"Segments",rows:[["segment","Segment"]]}],microphone:[{title:null,rows:[["mic_mute","Mute"]]},{title:"Capture",rows:[["microphone_gain","Gain"],["microphone_mixing","Mixing"],["microphone_leveling","Leveling"],["microphone_cancel_echo","Echo cancellation"]]},{title:"The room",rows:[["microphone_sensitivity","Sensitivity"],["room_level","Room level"],["room_floor","Room floor"],["stop_word_sensitivity","Stop word"]]},{title:"Indicator",rows:[["mute_led_brightness","Mute light"]]}],playback:[{title:null,rows:[["headphones","Headphones"]]},{title:"Generated sound",rows:[["noise_layer","Layer"]]},{title:"During a turn",rows:[["media_on_turn","Music"],["media_duck_level","Ducking"]]},{title:"Voice",rows:[["voice_resampling","Resampling"]]}],assistant:[{title:null,rows:[["wake_threshold","Wake sensitivity"]]},{title:"Timing",rows:[["max_listen","Max listen"],["max_think","Max think"],["follow_up","Follow up"]]},{title:"Feedback",rows:[["wake_effect","Ring effect"],["wake_tone","Chime"]]},{title:"Reply",rows:[["reply_buffer","Buffer"],["reply_delivery","Delivery"]]}],device:[{title:null,rows:[["firmware","Firmware"],["wake_word","Wake word"],["pipeline","Pipeline"],["update_channel","Update channel"],["check_for_updates","Check for updates"]]},{title:"Listening",rows:[["vad_sensitivity","End of speech"]]},{title:"Bluetooth",rows:[["bluetooth_proxy","Proxy"],["ble_advertisements","Advertisements"]]},{title:"Maintenance",rows:[["metrics_interval","Metrics interval"],["purge_cache","Purge cache"],["cached_data","Cached data"],["test_playback","Test playback"]]}],diagnostics:[{title:"Network",rows:[["ip_address","IP address"],["wifi_signal","Signal"],["wifi_sent","Sent"],["wifi_received","Received"]]},{title:"Hardware",rows:[["cpu_temperature","CPU"],["radio_temperature","Radio"],["cpu_cores","Cores"],["cpu_cores_online","Cores online"],["load_average","Load"],["memory_available","Memory"],["free_space","Disk"]]},{title:"The room",rows:[["room_level","Room level"],["room_floor","Room floor"]]},{title:"Access",rows:[["remote_adb","Remote adb"],["update_status","Update status"],["update_outcome","Last update"]]}]},Fi={ring:[{widget:"power",place:"header",roles:{light:"ring"}},{widget:"appearance",roles:{light:"ring"},lists:{segments:"segment",muted:"ring_muted",failure:"failure_effect",room:"room_reaction"}}],assistant:[{widget:"turn",roles:{listen:"max_listen",think:"max_think"}}],playback:[{widget:"player",place:"header",roles:{player:"speaker"}},{widget:"volume",roles:{player:"speaker"},lists:{jack:"headphones"}},{widget:"noise",roles:{first:"noise_layer"},lists:{layers:"noise_layer"}}],microphone:[{widget:"mute",place:"header",roles:{mute:"mic_mute",lamp:"mute_led_brightness"}},{widget:"array",roles:{level:"room_level",floor:"room_floor",gate:"microphone_sensitivity",mode:"microphone_mixing"}}]},qi=[["ring","ring"],["microphone","mic_mute"],["playback","speaker"]];function hr(n){let r=qi.filter(([,t])=>n.by.has(t)).map(([t])=>({kind:t,slot:0}));for(let t of n.by.get("wake_threshold")??[])r.push({kind:"assistant",slot:t.slot});return r}function ur(n,r,t=0){let e=[],i=new Set;for(let s of Fi[n]??[]){let o={};for(let[d,h]of Object.entries(s.roles)){let m=de(r.by,h,t)[0];m&&(o[d]=m.entity_id)}if(Object.keys(o).length!==Object.keys(s.roles).length)continue;let a={};for(let[d,h]of Object.entries(s.lists??{}))a[d]=de(r.by,h,t).map(m=>m.entity_id);e.push({widget:s.widget,place:s.place??"body",roles:o,lists:a}),[...Object.values(o),...Object.values(a).flat()].forEach(d=>i.add(d))}return{widgets:e,sections:fr(pe[n]??[],r.by,t,i)}}function mr(n){return vr(pe.device??[],n.entities.filter(r=>r.device_id===n.device.id&&(r.entity_category==="config"||!r.entity_category)),new Set)}function gr(n){let r=n.entities.filter(s=>s.entity_category==="diagnostic"),t=$t(r),e={};for(let[s,o]of Object.entries({wake:"last_wake_word",heard:"last_heard",reply:"last_reply"})){let a=t.get(o)?.[0];a&&(e[s]=a.entity_id)}return{widgets:e.wake?[{widget:"history",place:"body",roles:e,lists:{}}]:[],sections:vr(pe.diagnostics??[],r,new Set(Object.values(e)))}}function de(n,r,t){let e=n.get(r)??[];return t?e.filter(i=>i.slot===t):e}function fr(n,r,t,e){let i=[];for(let s of n){let o=[];for(let[a,d]of s.rows){let h=de(r,a,t);for(let m of h)e.has(m.entity_id)||o.push({entityId:m.entity_id,name:a,label:h.length>1?`${d} ${m.slot}`:d})}o.length&&i.push({title:s.title,rows:o})}return i}function vr(n,r,t){let e=fr(n,$t(r),0,t),i=new Set(e.flatMap(o=>o.rows.map(a=>a.entityId))),s=r.filter(o=>!i.has(o.entity_id)&&!t.has(o.entity_id));return s.length?[...e,{title:e.length?"More":null,rows:s.map(o=>({entityId:o.entity_id,name:o.name,label:o.name||o.entity_id})).sort((o,a)=>o.label.localeCompare(a.label))}]:e}var Bi="EchoLocal",Ki="esphome",kt=12;function Gi(n){return!!n?.identifiers?.some(([r])=>r===Ki)}function br(n,r){return Object.values(n.devices??{}).filter(t=>t.via_device_id===r&&!t.disabled_by).sort((t,e)=>k(t).localeCompare(k(e)))}function H(n){return n?Object.values(n.devices??{}).filter(r=>Vi(n,r.id)&&!r.via_device_id&&!r.disabled_by).sort((r,t)=>k(r).localeCompare(k(t))):[]}function k(n){return n?.name_by_user||n?.name||""}function Vi(n,r){return n?.devices?.[r]?.manufacturer!==Bi?!1:br(n,r).some(Gi)}function B(n,r){if(!n||!r)return null;let t=n.devices?.[r];if(!t)return null;let e=new Set([r,...br(n,r).map(d=>d.id)]),i=dr(n,Object.values(n.entities??{}).filter(d=>d.device_id&&e.has(d.device_id)&&!d.hidden)),s=$t(i),o=d=>s.get(d)?.[0]?.entity_id,a=new Array(kt).fill(void 0);for(let d of s.get("segment")??[]){let h=d.slot-1;h>=0&&h<kt&&(a[h]=d.entity_id)}return{device:t,entities:i,by:s,satellite:o("assist_satellite"),player:o("speaker"),update:o("firmware"),ring:o("ring"),segments:a,mute:o("mic_mute")}}function yr(n){return(n.by.get("wake_assistant")??[]).map(r=>r.entity_id)}function _t(n,r){let t=r?n?.states?.[r]:void 0;return!t||t.state!=="on"?null:{rgb:t.attributes.rgb_color??[255,255,255],level:(t.attributes.brightness??255)/255}}function xr(n,r){return!!r&&n?.states?.[r]?.state==="on"}function wr(n,r){return(r?n?.states?.[r]?.state:void 0)??"unavailable"}async function $r(n,r){let t=new Array(kt).fill(void 0);if(!n.user?.is_admin)return t;let e=new Set(r.entities.map(i=>i.device_id));try{let i=await n.callWS({type:"config/entity_registry/list"});for(let s of i){if(!s.disabled_by||!s.device_id||!e.has(s.device_id))continue;let{name:o,slot:a}=ce(s.unique_id);o==="segment"&&a>=1&&a<=kt&&(t[a-1]=s.entity_id)}}catch{}return t}async function kr(n,r){await n.callWS({type:"config/entity_registry/update",entity_id:r,disabled_by:null})}var _r=[["White",[255,255,255]],["Warm",[255,190,120]],["Red",[255,40,40]],["Orange",[255,130,20]],["Yellow",[250,230,60]],["Green",[60,220,90]],["Teal",[40,220,200]],["Blue",[60,140,255]],["Violet",[150,90,255]],["Pink",[255,90,200]]];var dt={ring:"mdi:record-circle-outline",microphone:"mdi:microphone",playback:"mdi:speaker",assistant:"mdi:account-voice",device:"mdi:cog-outline",diagnostics:"mdi:stethoscope",follow:"mdi:backup-restore",close:"mdi:check"},Yi={idle:"Idle",listening:"Listening",processing:"Thinking",responding:"Speaking",unavailable:"Unavailable",unknown:"Unknown"},P=class extends v{constructor(){super(...arguments);this.opened=null;this.picked=null;this.holding=!1;this.timer=0;this.hiddenSegments=[];this.offering=null;this.asked=!1}static getConfigElement(){return document.createElement("echolocal-satellite-card-editor")}static getStubConfig(t){return{device_id:H(t)[0]?.id??""}}setConfig(t){if(!t?.device_id)throw new Error("Choose an EchoLocal device");this.config={shell:"grey",...t}}getCardSize(){return 6}updated(){if(this.asked||!this.hass||!this.config)return;let t=B(this.hass,this.config.device_id);!t||t.segments.some(Boolean)||(this.asked=!0,$r(this.hass,t).then(e=>this.hiddenSegments=e))}render(){if(!this.hass||!this.config)return p;let t=B(this.hass,this.config.device_id);if(!t)return l`<ha-card><div class="missing">Device not found</div></ha-card>`;let e=wr(this.hass,t.satellite);return l`
      <ha-card>
        <div class="frame">
          <div class="art" data-shell=${this.config.shell??"grey"} data-activity=${e}>
            ${De({segments:this.segments(t),glow:this.glow(t),muted:xr(this.hass,t.mute),holding:this.holding,picked:this.picked,divisible:[...t.segments,...this.hiddenSegments].some(Boolean)},{ring:()=>this.open({kind:"ring",slot:0}),segment:i=>this.tapped(t,i),action:i=>this.pressed(t,i),mute:()=>this.toggle("switch",t.mute),volume:i=>this.volume(t,i)})}
          </div>

          <div class="side">${this.side(t)}</div>

          ${this.offering!==null?this.offer(this.offering):this.picked===null?this.foot(t,e):this.palette(t)}
        </div>
      </ha-card>

      ${this.popup(t)}
    `}foot(t,e){return l`<div class="foot">
      <div class="label">
        <div class="name">${k(t.device)}</div>
        <div class="status">${Yi[e]??e}</div>
      </div>
      <div class="tail">
        ${this.square(dt.device,"Settings",()=>this.open({kind:"device",slot:0}))}
        ${this.square(dt.diagnostics,"Diagnostics",()=>this.open({kind:"diagnostics",slot:0}))}
      </div>
    </div>`}tapped(t,e){if(t.segments[e]){this.picked=this.picked===e?null:e;return}if(this.hiddenSegments[e]){this.offering=e;return}this.open({kind:"ring",slot:0})}offer(t){let e=async i=>{for(let s of i)s&&await kr(this.hass,s);this.hiddenSegments=this.hiddenSegments.map(s=>i.includes(s)?void 0:s),this.offering=null,this.picked=t};return l`<div class="foot">
      <div class="label">
        <div class="name">Segment ${t+1} disabled</div>
      </div>
      <div class="tail">
        <button class="plain" @click=${()=>e([this.hiddenSegments[t]])}>Enable</button>
        <button class="plain" @click=${()=>e(this.hiddenSegments)}>Enable all</button>
        <button class="plain quiet" @click=${()=>this.offering=null}>Cancel</button>
      </div>
    </div>`}palette(t){let e=t.segments[this.picked];return l`<div class="foot palette">
      <div class="top">
        <div class="name">Segment ${this.picked+1}</div>
        <div class="tail">
          ${this.square(dt.follow,"Follow the ring",()=>{this.hass.callService("light","turn_off",{entity_id:e}),this.picked=null})}
          ${this.square(dt.close,"Done",()=>this.picked=null)}
        </div>
      </div>
      <div class="swatches">
        ${_r.map(([i,s])=>l`<button
            class="swatch"
            title=${i}
            aria-label=${i}
            style=${`background:rgb(${s.join(",")})`}
            @click=${()=>this.hass.callService("light","turn_on",{entity_id:e,rgb_color:s})}
          ></button>`)}
      </div>
    </div>`}segments(t){let e=_t(this.hass,t.ring);return Array.from({length:xt},(i,s)=>{let o=_t(this.hass,t.segments[s])??e;return{fill:o?`rgb(${o.rgb.join(",")})`:"var(--el-ring-off)",opacity:o?.25+.75*o.level:1}})}glow(t){return _t(this.hass,t.ring)||t.segments.some(i=>_t(this.hass,i))?.55:0}side(t){let e=hr(t),i=e.filter(s=>s.kind==="assistant").length>1;return e.map(({kind:s,slot:o})=>this.square(dt[s],this.titled(s,o),()=>this.open({kind:s,slot:o}),i&&s==="assistant"?o:null))}titled(t,e){let i={ring:"Ring",microphone:"Microphone",playback:"Playback",assistant:"Assistant",device:"Settings",diagnostics:"Diagnostics"}[t];return e?`${i} ${e}`:i}square(t,e,i,s=null){return l`<button class="sq" title=${e} aria-label=${e} @click=${i}>
      <ha-icon .icon=${t}></ha-icon>
      ${s?l`<span class="badge">${s}</span>`:p}
    </button>`}popup(t){if(!this.opened)return p;let{kind:e,slot:i}=this.opened,s,o=[];return e==="device"?s=mr(t):e==="diagnostics"?{widgets:o,sections:s}=gr(t):{widgets:o,sections:s}=ur(e,t,i),l`<echolocal-dialog
      .hass=${this.hass}
      .heading=${this.titled(e,i)}
      .subtitle=${k(t.device)}
      .icon=${dt[e]}
      .sections=${s}
      .widgets=${o}
      .device=${k(t.device)}
      .mac=${t.device.connections?.find(([a])=>a==="mac")?.[1]??""}
      .help=${this.config.help!==!1}
      .about=${Ze(e)}
      @closed=${()=>this.opened=null}
    ></echolocal-dialog>`}open(t){this.opened=t}pressed(t,e){if(e==="down"){this.holding=!1,this.timer=window.setTimeout(()=>this.holding=!0,Ie);return}clearTimeout(this.timer);let i=this.holding;if(this.holding=!1,e==="cancel")return;let s=yr(t),o=s[i&&s.length>1?1:0];o?this.hass.callService("button","press",{entity_id:o}):this.moreInfo(t.satellite)}toggle(t,e){e&&this.hass.callService(t,"toggle",{entity_id:e})}volume(t,e){t.player&&this.hass.callService("media_player",e>0?"volume_up":"volume_down",{entity_id:t.player})}moreInfo(t){t&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}};P.styles=b(We),c([u({attribute:!1})],P.prototype,"hass",2),c([g()],P.prototype,"config",2),c([g()],P.prototype,"opened",2),c([g()],P.prototype,"picked",2),c([g()],P.prototype,"holding",2),c([g()],P.prototype,"hiddenSegments",2),c([g()],P.prototype,"offering",2),P=c([y("echolocal-satellite-card")],P);var pt=class extends v{setConfig(r){this.config={shell:"grey",...r}}render(){if(!this.hass||!this.config)return p;let r=H(this.hass);return l`
      <style>
        .field {
          display: block;
          margin-bottom: 12px;
        }
        label {
          display: block;
          font-size: 0.85rem;
          color: var(--secondary-text-color);
          margin-bottom: 4px;
        }
        select {
          width: 100%;
          padding: 8px;
        }
      </style>
      <div class="field">
        <label>Device</label>
        <select @change=${t=>this.emit({device_id:t.target.value})}>
          ${r.map(t=>l`<option
              value=${t.id}
              ?selected=${t.id===this.config.device_id}
            >
              ${k(t)}
            </option>`)}
        </select>
      </div>
      <div class="field">
        <label>Shell</label>
        <select
          @change=${t=>this.emit({shell:t.target.value})}
        >
          ${[["grey","Grey (unknown)"],["black","Black"],["white","White"]].map(([t,e])=>l`<option value=${t} ?selected=${(this.config.shell??"grey")===t}>
                ${e}
              </option>`)}
        </select>
      </div>
    `}emit(r){this.config={...this.config,...r},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}};c([u({attribute:!1})],pt.prototype,"hass",2),c([g()],pt.prototype,"config",2),pt=c([y("echolocal-satellite-card-editor")],pt);var he=[];function N(n){he.push(n),he.sort((r,t)=>r.order-t.order||r.title.localeCompare(t.title))}function me(n){return he.filter(r=>n||!r.admin)}function Sr(n,r){let t=ue(n),e=me(r);return e.find(i=>i.path===t)??e[0]}function Ar(n,r){let t=r?`${n}/${r}`:n;location.pathname!==t&&history.pushState(null,"",t),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}function ge(n,r){if(r!==void 0)return ue(r);let t=location.pathname;return ue(t.startsWith(n)?t.slice(n.length):"")}function ue(n){return n.replace(/^\/+|\/+$/g,"")}var Cr=`:host {
  display: block;
  height: 100%;
  overflow: auto;
  background: var(--primary-background-color);
  color: var(--primary-text-color);
}

header {
  position: sticky;
  top: 0;
  z-index: 2;
  background: var(--primary-background-color);
  border-bottom: 1px solid color-mix(in srgb, var(--primary-text-color) 10%, transparent);
}

.bar {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  gap: 4px;
  overflow-x: auto;
  scrollbar-width: none;
}

.bar::-webkit-scrollbar {
  display: none;
}

button {
  display: flex;
  align-items: center;
  gap: 7px;
  flex: 0 0 auto;
  padding: 14px 14px 12px;
  border: none;
  border-bottom: 2px solid transparent;
  background: none;
  color: var(--secondary-text-color);
  font: inherit;
  font-size: 0.88rem;
  cursor: pointer;
}

button:hover {
  color: var(--primary-text-color);
}

button[data-here="true"] {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
}

button ha-icon {
  --mdc-icon-size: 19px;
  display: flex;
}

.page {
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px 16px 48px;
  box-sizing: border-box;
}

/* On a phone the icons carry the tabs on their own, which is what keeps five of them on one line. */
@media (max-width: 600px) {
  button span {
    display: none;
  }

  button {
    padding: 14px 16px 12px;
  }
}
`;var fe="";async function jt(n){try{return await n.callWS({type:"config/label_registry/list"})??[]}catch{return[]}}function Ft(n,r){let t=new Map,e=[];for(let s of n){let o=s.labels??[];if(!o.length){e.push(s);continue}for(let a of o){let d=r.find(m=>m.label_id===a),h=t.get(a);h?h.devices.push(s):t.set(a,{id:a,name:d?.name??a,icon:d?.icon,devices:[s]})}}let i=[...t.values()].sort((s,o)=>s.name.localeCompare(o.name));return e.length&&i.push({id:fe,name:"Ungrouped",devices:e}),i}async function Mr(n,r){try{return await n.callWS({type:"config/label_registry/create",name:r})}catch{return null}}async function Hr(n,r,t){await n.callWS({type:"config/label_registry/update",label_id:r,name:t})}async function Tr(n,r){await n.callWS({type:"config/label_registry/delete",label_id:r})}async function Rr(n,r,t){await n.callWS({type:"config/device_registry/update",device_id:r,labels:[...new Set(t)]})}async function Pr(n,r,t,e){let i=0,s=0,o=0;return await Promise.all(r.map(async a=>{let d=Er(n,a,t);if(!d){o+=1;return}try{await e(d),i+=1}catch{s+=1}})),{done:i,failed:s,missing:o}}function qt(n,r,t){let e=r.map(s=>Er(n,s,t)).filter(s=>!!s),i=[...new Set(e.map(s=>n.states[s]?.state).filter(Boolean))];return{value:i.length===1?i[0]:null,mixed:i.length>1,entities:e}}function Er(n,r,t){return B(n,r.id)?.by.get(t)?.[0]?.entity_id}var zr=`:host {
  display: block;
  margin-bottom: 10px;
}

.bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 4px 8px 2px;
  border-bottom: 1px solid color-mix(in srgb, var(--primary-text-color) 10%, transparent);
}

.name {
  font-size: 1.05rem;
  color: var(--primary-text-color);
}

.count {
  font-size: 0.78rem;
  color: var(--secondary-text-color);
}

.spacer {
  flex: 1;
}

button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 11px;
  border: 1px solid color-mix(in srgb, var(--primary-text-color) 16%, transparent);
  border-radius: 999px;
  background: none;
  color: var(--secondary-text-color);
  font: inherit;
  font-size: 0.8rem;
  cursor: pointer;
}

button:hover {
  color: var(--primary-text-color);
  border-color: color-mix(in srgb, var(--primary-text-color) 34%, transparent);
}

button[data-on="true"] {
  color: var(--primary-color);
  border-color: color-mix(in srgb, var(--primary-color) 50%, transparent);
  background: color-mix(in srgb, var(--primary-color) 12%, transparent);
}

button ha-icon {
  --mdc-icon-size: 16px;
  display: flex;
}

.mixed {
  font-size: 0.7rem;
  opacity: 0.75;
}
`;var Or="mic_mute",Nr="ring",Ur="speaker",Z=class extends v{constructor(){super(...arguments);this.said=""}render(){if(!this.hass||!this.group)return p;let t=this.group.devices,e=qt(this.hass,t,Or),i=qt(this.hass,t,Nr);return l`<div class="bar">
      ${this.group.icon?l`<ha-icon .icon=${this.group.icon}></ha-icon>`:p}
      <div class="name">${this.group.name}</div>
      <div class="count">${t.length} ${t.length===1?"device":"devices"}</div>
      <div class="spacer"></div>
      ${this.said?l`<div class="short">${this.said}</div>`:p}

      ${e.entities.length?this.toggle("mdi:microphone-off","Mute all",e,()=>this.write(Or,"switch",e.value==="on"?"turn_off":"turn_on")):p}
      ${i.entities.length?this.toggle("mdi:lightbulb-outline","Ring",i,()=>this.write(Nr,"light",i.value==="on"?"turn_off":"turn_on")):p}
      ${this.has(Ur)?l`<button title="Stop whatever is playing" @click=${()=>this.write(Ur,"media_player","media_stop")}>
            <ha-icon icon="mdi:stop"></ha-icon>Stop
          </button>`:p}
    </div>`}toggle(t,e,i,s){return l`<button data-on=${String(i.value==="on")} @click=${s}>
      <ha-icon .icon=${t}></ha-icon>${e}
      ${i.mixed?l`<span class="mixed">mixed</span>`:p}
    </button>`}has(t){return qt(this.hass,this.group.devices,t).entities.length>0}async write(t,e,i){let{done:s,failed:o,missing:a}=await Pr(this.hass,this.group.devices,t,h=>this.hass.callService(e,i,{entity_id:h})),d=o+a;this.said=d?`${s} of ${s+d}`:"",this.said&&setTimeout(()=>this.said="",4e3)}};Z.styles=b(zr),c([u({attribute:!1})],Z.prototype,"hass",2),c([u({attribute:!1})],Z.prototype,"group",2),c([g()],Z.prototype,"said",2),Z=c([y("echolocal-groupbar")],Z);var Ir=`:host {
  display: block;
}

.group {
  margin-bottom: 26px;
}

.view {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 14px;
}

.pair {
  display: flex;
  border: 1px solid color-mix(in srgb, var(--primary-text-color) 16%, transparent);
  border-radius: 999px;
  overflow: hidden;
}

.pair button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 13px;
  border: none;
  background: none;
  color: var(--secondary-text-color);
  font: inherit;
  font-size: 0.8rem;
  cursor: pointer;
}

.pair button:hover {
  color: var(--primary-text-color);
}

.pair button[data-on="true"] {
  color: var(--primary-color);
  background: color-mix(in srgb, var(--primary-color) 14%, transparent);
}

.pair button ha-icon {
  --mdc-icon-size: 16px;
  display: flex;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 16px;
  align-items: start;
}

.empty {
  color: var(--secondary-text-color);
  max-width: 46ch;
  line-height: 1.5;
}
`;N({path:"",title:"Home",icon:"mdi:view-grid-outline",element:"echolocal-home",order:0});var Dr="echolocal:home:grouped",U=class extends v{constructor(){super(...arguments);this.narrow=!1;this.known=[];this.asked=!1;this.grouped=localStorage.getItem(Dr)!=="no";this.cards=new Map}updated(){this.asked||!this.hass||(this.asked=!0,this.load())}render(){if(!this.hass)return p;let t=H(this.hass);if(!t.length)return l`<div class="empty">
        No EchoLocal devices yet. One appears here once Home Assistant has adopted it over the ESPHome
        integration.
      </div>`;let e=Ft(t,this.known),i=e.some(o=>o.id!==fe),s=this.grouped&&i?e:[{id:"all",name:"All devices",devices:t}];return l`
      ${i?l`<div class="view">
            <div class="pair">
              ${this.button(!0,"mdi:group","Grouped")}${this.button(!1,"mdi:view-grid-outline","All")}
            </div>
          </div>`:p}
      ${s.map(o=>this.group(o))}
    `}button(t,e,i){return l`<button
      data-on=${String(this.grouped===t)}
      @click=${()=>{this.grouped=t,localStorage.setItem(Dr,t?"yes":"no")}}
    >
      <ha-icon .icon=${e}></ha-icon>${i}
    </button>`}group(t){return l`<div class="group">
      <echolocal-groupbar .hass=${this.hass} .group=${t}></echolocal-groupbar>
      <div class="grid">${t.devices.map(e=>this.card(t.id,e.id))}</div>
    </div>`}card(t,e){let i=`${t}/${e}`,s=this.cards.get(i);return s||(s=document.createElement("echolocal-satellite-card"),s.setConfig({device_id:e}),this.cards.set(i,s)),s.hass=this.hass,s}async load(){this.known=await jt(this.hass)}};U.styles=b(Ir),c([u({attribute:!1})],U.prototype,"hass",2),c([u({type:Boolean})],U.prototype,"narrow",2),c([g()],U.prototype,"known",2),c([g()],U.prototype,"asked",2),c([g()],U.prototype,"grouped",2),U=c([y("echolocal-home")],U);var Wr=`:host {
  display: block;
}

.make {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

input.new {
  flex: 1;
  max-width: 280px;
  padding: 9px 12px;
  border: 1px solid color-mix(in srgb, var(--primary-text-color) 18%, transparent);
  border-radius: 10px;
  background: none;
  color: var(--primary-text-color);
  font: inherit;
  font-size: 0.9rem;
}

input.new:focus {
  outline: none;
  border-color: var(--primary-color);
}

button.make {
  padding: 9px 16px;
  border: none;
  border-radius: 10px;
  background: var(--primary-color);
  color: var(--text-primary-color, #fff);
  font: inherit;
  font-size: 0.9rem;
  cursor: pointer;
  margin: 0;
}

button.make:disabled {
  opacity: 0.4;
  cursor: default;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

th {
  padding: 8px 10px;
  text-align: center;
  font-weight: 600;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--secondary-text-color);
  white-space: nowrap;
}

th.who {
  text-align: left;
}

th .label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

/* The header cell is the input. Width comes from the value; a fixed one clips longer names. */
th input {
  padding: 2px 0;
  border: none;
  border-bottom: 1px solid transparent;
  background: none;
  color: inherit;
  font: inherit;
  text-align: center;
  text-transform: none;
  letter-spacing: normal;
}

th input:hover {
  border-bottom-color: color-mix(in srgb, var(--primary-text-color) 25%, transparent);
}

th input:focus {
  outline: none;
  border-bottom-color: var(--primary-color);
  color: var(--primary-text-color);
}

th button {
  padding: 0;
  border: none;
  background: none;
  color: var(--secondary-text-color);
  cursor: pointer;
  display: flex;
}

th button:hover {
  color: var(--error-color, #db4437);
}

th button ha-icon {
  --mdc-icon-size: 15px;
  display: flex;
}

td {
  padding: 10px;
  border-top: 1px solid color-mix(in srgb, var(--primary-text-color) 10%, transparent);
  text-align: center;
}

td.who {
  text-align: left;
  color: var(--primary-text-color);
}

input[type="checkbox"] {
  width: 17px;
  height: 17px;
  accent-color: var(--primary-color);
  cursor: pointer;
}

.none {
  color: var(--secondary-text-color);
  max-width: 52ch;
  line-height: 1.5;
}
`;N({path:"groups",title:"Groups",icon:"mdi:group",element:"echolocal-groups",order:30,admin:!0});var I=class extends v{constructor(){super(...arguments);this.known=[];this.asked=!1;this.naming="";this.busy=!1}connectedCallback(){super.connectedCallback(),this.hass?.connection?.subscribeEvents(()=>this.load(),"label_registry_updated").then(t=>this.stop=t).catch(()=>{})}disconnectedCallback(){super.disconnectedCallback(),this.stop?.()}updated(){this.asked||!this.hass||(this.asked=!0,this.load())}render(){if(!this.hass)return p;let t=H(this.hass),e=this.known;return l`
      <div class="make">
        <input
          class="new"
          placeholder="New group"
          .value=${this.naming}
          @input=${i=>this.naming=i.target.value}
          @keydown=${i=>i.key==="Enter"&&this.make()}
        />
        <button class="make" ?disabled=${!this.naming.trim()||this.busy} @click=${this.make}>
          ${this.busy?"Adding\u2026":"Add"}
        </button>
      </div>

      ${t.length?l`<table>
            <thead>
              <tr>
                <th class="who">Device</th>
                ${e.map(i=>this.head(i))}
              </tr>
            </thead>
            <tbody>
              ${t.map(i=>this.row(i,e))}
            </tbody>
          </table>`:l`<div class="none">
            No EchoLocal devices yet, so there is nothing to group.
          </div>`}
    `}head(t){let e=Ft(H(this.hass),this.known).find(i=>i.id===t.label_id)?.devices.length;return l`<th>
      <div class="label">
        <input
          .value=${t.name}
          style=${`width:${Math.max(6,t.name.length+1)}ch`}
          @change=${i=>this.rename(t,i.target.value)}
        />
        <button
          aria-label="Delete ${t.name}"
          title=${e?`${e} still in it`:"Delete this group"}
          @click=${()=>this.discard(t)}
        >
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </div>
    </th>`}row(t,e){let i=t.labels??[];return l`<tr>
      <td class="who">${k(t)}</td>
      ${e.map(s=>l`<td>
          <input
            type="checkbox"
            aria-label="${k(t)} in ${s.name}"
            .checked=${i.includes(s.label_id)}
            @change=${o=>this.set(t,s.label_id,o.target.checked)}
          />
        </td>`)}
    </tr>`}async make(){let t=this.naming.trim();if(!t||this.busy)return;this.busy=!0,this.naming="";let e=await Mr(this.hass,t);e&&(this.known=[...this.known,e].sort((i,s)=>i.name.localeCompare(s.name))),this.busy=!1,e||await this.load()}async rename(t,e){!e.trim()||e===t.name||(this.known=this.known.map(i=>i.label_id===t.label_id?{...i,name:e.trim()}:i),await Hr(this.hass,t.label_id,e.trim()))}async discard(t){this.known=this.known.filter(e=>e.label_id!==t.label_id),await Tr(this.hass,t.label_id)}async set(t,e,i){let s=new Set(t.labels??[]);i?s.add(e):s.delete(e),await Rr(this.hass,t.id,[...s])}async load(){this.known=await jt(this.hass)}};I.styles=b(Wr),c([u({attribute:!1})],I.prototype,"hass",2),c([g()],I.prototype,"known",2),c([g()],I.prototype,"asked",2),c([g()],I.prototype,"naming",2),c([g()],I.prototype,"busy",2),I=c([y("echolocal-groups")],I);var jr=`:host {
  display: block;
}

.filters {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.filters button {
  padding: 5px 12px;
  border: 1px solid color-mix(in srgb, var(--primary-text-color) 16%, transparent);
  border-radius: 999px;
  background: none;
  color: var(--secondary-text-color);
  font: inherit;
  font-size: 0.8rem;
  cursor: pointer;
}

.filters button[data-on="true"] {
  color: var(--primary-color);
  border-color: color-mix(in srgb, var(--primary-color) 50%, transparent);
  background: color-mix(in srgb, var(--primary-color) 12%, transparent);
}

.turns {
  display: grid;
  gap: 8px;
}

.turn {
  display: grid;
  grid-template-columns: auto 9ch 1fr auto;
  gap: 3px 12px;
  align-items: center;
  padding: 11px 14px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--primary-text-color) 5%, transparent);
}

.right {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-end;
}

.when {
  font-size: 0.78rem;
  color: var(--secondary-text-color);
  font-variant-numeric: tabular-nums;
}

.who {
  font-size: 0.88rem;
  color: var(--primary-text-color);
  overflow: hidden;
  text-overflow: ellipsis;
}

.said {
  font-size: 0.88rem;
  color: var(--secondary-text-color);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.took {
  font-size: 0.8rem;
  color: var(--secondary-text-color);
  font-variant-numeric: tabular-nums;
}

.took[data-bad="true"] {
  color: var(--error-color, #db4437);
}

.bar {
  grid-column: 2 / -1;
  display: flex;
  height: 7px;
  margin-top: 4px;
  border-radius: 4px;
  overflow: hidden;
  background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
}

.slice[data-phase="wake_ms"] {
  background: var(--info-color, #039be5);
}

.slice[data-phase="listen_ms"] {
  background: color-mix(in srgb, var(--info-color, #039be5) 55%, var(--primary-text-color));
}

.slice[data-phase="think_ms"] {
  background: var(--secondary-text-color);
}

.slice[data-phase="speak_ms"] {
  background: var(--success-color, #43a047);
}

.none {
  color: var(--secondary-text-color);
  max-width: 56ch;
  line-height: 1.5;
}

.legend {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 14px;
  font-size: 0.72rem;
  color: var(--secondary-text-color);
}

.key {
  display: flex;
  align-items: center;
  gap: 5px;
}

.dot {
  width: 9px;
  height: 9px;
  border-radius: 2px;
}
`;N({path:"activity",title:"Activity",icon:"mdi:timeline-text-outline",element:"echolocal-activity",order:20});var ts=60,K=class extends v{constructor(){super(...arguments);this.seen=[];this.only="";this.asked=!1}updated(){this.asked||!this.hass||(this.asked=!0,this.listen())}disconnectedCallback(){super.disconnectedCallback(),this.stop?.()}render(){if(!this.hass)return p;let t=this.names(),e=this.only?this.seen.filter(s=>s.turn.mac===this.only):this.seen,i=Math.max(1,...e.map(s=>ot(s.turn)));return l`
      ${this.seen.length>0&&Object.keys(t).length>1?l`<div class="filters">
            <button data-on=${String(!this.only)} @click=${()=>this.only=""}>Everything</button>
            ${[...new Set(this.seen.map(s=>s.turn.mac))].map(s=>l`<button
                data-on=${String(this.only===s)}
                @click=${()=>this.only=s}
              >
                ${t[s]??s}
              </button>`)}
          </div>`:p}

      ${e.length?l`<div class="legend">
              ${[["wake_ms","Wake"],["listen_ms","Listen"],["think_ms","Think"],["speak_ms","Reply"]].map(([s,o])=>l`<span class="key"
                  ><span class="dot slice" data-phase=${s}></span>${o}</span
                >`)}
            </div>
            <div class="turns">${e.map(s=>this.row(s,t,i))}</div>`:l`<div class="none">
            Nothing yet. Turns appear here as they happen, across every device — the timings come from the
            device rather than from the recorder, so there is no past to load.
          </div>`}
    `}row(t,e,i){let s=wt(t.turn),o=ot(t.turn),a=t.turn.outcome!=="completed",d=e[t.turn.mac]??"elsewhere";return l`<div class="turn">
      <div class="when">${rs(t.at)}</div>
      <div class="who">${d}</div>
      <div class="said">${t.turn.heard||t.turn.wake_word}</div>
      <div class="right">
        <div class="took" data-bad=${String(a)}>
          ${a?t.turn.outcome:`${(o/1e3).toFixed(1)}s`}
        </div>
        ${t.turn.audio_seconds?l`<echolocal-recording
              .hass=${this.hass}
              .device=${d}
              .turn=${t.turn.id}
              .filename=${es(t,d)}
            ></echolocal-recording>`:p}
      </div>
      ${s.length?l`<div class="bar">
            ${s.map(h=>l`<div
                class="slice"
                data-phase=${h.key}
                title=${`${h.label} ${h.ms} ms`}
                style=${`flex:0 0 ${h.ms/i*100}%`}
              ></div>`)}
          </div>`:p}
    </div>`}names(){let t={};for(let e of H(this.hass)){let i=e.connections?.find(([s])=>s==="mac")?.[1];i&&(t[i.toLowerCase()]=k(e))}return t}async listen(){if(this.hass.connection)try{this.stop=await this.hass.connection.subscribeEvents(t=>{let e=Nt(t.data);e&&(this.seen=[{at:Date.now(),turn:e},...this.seen].slice(0,ts))},Ot)}catch{}}};K.styles=b(jr),c([u({attribute:!1})],K.prototype,"hass",2),c([g()],K.prototype,"seen",2),c([g()],K.prototype,"only",2),c([g()],K.prototype,"asked",2),K=c([y("echolocal-activity")],K);function es(n,r){let t=new Date(n.at).toISOString().replace(/[:.]/g,"-").slice(0,19),e=i=>i.toLowerCase().replace(/[^a-z0-9]+/g,"-");return`${t}-${e(r)}-${e(n.turn.wake_word)}.wav`}function rs(n){return new Date(n).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}var Fr=`:host {
  display: block;
}

.scroll {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
}

th {
  padding: 8px 12px;
  text-align: right;
  white-space: nowrap;
  font-weight: 600;
  font-size: 0.71rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--secondary-text-color);
  cursor: pointer;
  user-select: none;
}

th:first-child {
  text-align: left;
}

th:hover {
  color: var(--primary-text-color);
}

th[data-by="true"] {
  color: var(--primary-color);
}

td {
  padding: 11px 12px;
  text-align: right;
  white-space: nowrap;
  border-top: 1px solid color-mix(in srgb, var(--primary-text-color) 10%, transparent);
  font-variant-numeric: tabular-nums;
  color: var(--secondary-text-color);
}

td.who {
  text-align: left;
  color: var(--primary-text-color);
}

td.who button {
  padding: 0;
  border: none;
  background: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
  text-align: left;
}

td.who button:hover {
  color: var(--primary-color);
}

td[data-wrong="warn"] {
  color: var(--warning-color, #ffa600);
}

td[data-wrong="bad"] {
  color: var(--error-color, #db4437);
  font-weight: 600;
}

tr[data-off="true"] td {
  opacity: 0.5;
}

.none {
  color: var(--secondary-text-color);
}
`;N({path:"health",title:"Health",icon:"mdi:heart-pulse",element:"echolocal-health",order:40});var ve=[{title:"Version",match:/_(?:current_version|installed_version)$/},{title:"Update",match:/^update\./,show:n=>n==="on"?"waiting":n==="off"?"current":n,wrong:n=>n==="on"?"warn":void 0},{title:"Wifi",match:/_wifi_signal$/,show:(n,r)=>`${Math.round(Number(n))} ${r||"dBm"}`,wrong:n=>Number(n)<-80?"bad":Number(n)<-70?"warn":void 0},{title:"CPU",match:/_cpu_temperature$/,show:(n,r)=>`${Math.round(Number(n))}${r||"\xB0C"}`,wrong:n=>Number(n)>80?"bad":Number(n)>70?"warn":void 0},{title:"Load",match:/_load_average$/,show:n=>Number(n).toFixed(2)},{title:"Memory",match:/_memory_available$/,show:(n,r)=>`${Math.round(Number(n))} ${r||"MB"}`,wrong:n=>Number(n)<40?"bad":Number(n)<80?"warn":void 0},{title:"Disk",match:/_free_space$/,show:(n,r)=>`${Math.round(Number(n))} ${r||"MB"}`,wrong:n=>Number(n)<50?"bad":Number(n)<150?"warn":void 0},{title:"Address",match:/_ip_address$/}],J=class extends v{constructor(){super(...arguments);this.by="";this.down=!1}render(){if(!this.hass)return p;let t=H(this.hass);if(!t.length)return l`<div class="none">No EchoLocal devices yet.</div>`;let e=t.map(s=>this.read(s)),i=this.sort(e);return l`<div class="scroll">
      <table>
        <thead>
          <tr>
            ${this.head("Device")}${ve.map(s=>this.head(s.title))}
          </tr>
        </thead>
        <tbody>
          ${i.map(s=>l`<tr data-off=${String(!s.up)}>
              <td class="who">
                <button @click=${()=>this.open(s.device)}>${s.name}</button>
              </td>
              ${ve.map(o=>{let a=s.cells[o.title];return l`<td data-wrong=${a?.wrong??""}>${a?.text??"\u2014"}</td>`})}
            </tr>`)}
        </tbody>
      </table>
    </div>`}head(t){return l`<th
      data-by=${String(this.by===t)}
      @click=${()=>{this.down=this.by===t?!this.down:!1,this.by=t}}
    >
      ${t}
    </th>`}read(t){let i=(B(this.hass,t.id)?.entities??[]).map(a=>a.entity_id),s={},o=!1;for(let a of ve){let d=i.find(w=>a.match.test(w)),h=d?this.hass.states[d]:void 0;if(!h)continue;let m=h.state;if(m==="unavailable"||m==="unknown")continue;o=!0;let f=h.attributes.unit_of_measurement??"",x=Number(m);s[a.title]={text:a.show?a.show(m,f):f?`${m} ${f}`:m,sort:Number.isFinite(x)&&m!==""?x:m,wrong:a.wrong?.(Number.isFinite(x)?x:m)}}return{device:t,name:k(t),cells:s,up:o}}sort(t){if(!this.by)return t;let e=i=>this.by==="Device"?i.name:i.cells[this.by]?.sort??"";return[...t].sort((i,s)=>{let o=e(i),a=e(s),d=typeof o=="number"&&typeof a=="number"?o-a:String(o).localeCompare(String(a));return this.down?-d:d})}open(t){history.pushState(null,"",`/config/devices/device/${t.id}`),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}};J.styles=b(Fr),c([u({attribute:!1})],J.prototype,"hass",2),c([g()],J.prototype,"by",2),c([g()],J.prototype,"down",2),J=c([y("echolocal-health")],J);var qr=`:host {
  display: block;
}

.zone {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px dashed color-mix(in srgb, var(--primary-text-color) 22%, transparent);
  border-radius: 14px;
  background: color-mix(in srgb, var(--primary-text-color) 4%, transparent);
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease;
}

.zone[data-over="true"] {
  border-color: var(--primary-color);
  background: color-mix(in srgb, var(--primary-color) 12%, transparent);
}

.zone ha-icon {
  --mdc-icon-size: 24px;
  color: var(--secondary-text-color);
  display: flex;
  flex: 0 0 auto;
}

.zone[data-over="true"] ha-icon {
  color: var(--primary-color);
}

.lead {
  font-size: 0.95rem;
  color: var(--primary-text-color);
}

.sub {
  font-size: 0.78rem;
  color: var(--secondary-text-color);
}

.list {
  display: grid;
  gap: 10px;
}

.word {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 4px 12px;
  align-items: center;
  padding: 12px 14px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
}

.word[data-bad="true"] {
  background: color-mix(in srgb, var(--error-color, #db4437) 10%, transparent);
}

/* Edited where it is read; filling an empty one is what starts it being offered. */
.said {
  font-size: 1rem;
  color: var(--primary-text-color);
}

.said input {
  font: inherit;
  color: inherit;
  width: 100%;
  padding: 2px 0;
  border: none;
  border-bottom: 1px solid transparent;
  background: none;
}

.said input:hover {
  border-bottom-color: color-mix(in srgb, var(--primary-text-color) 20%, transparent);
}

.said input:focus {
  outline: none;
  border-bottom-color: var(--primary-color);
}

.about {
  grid-column: 1;
  font-size: 0.76rem;
  color: var(--secondary-text-color);
  font-variant-numeric: tabular-nums;
}

.wrong {
  grid-column: 1 / -1;
  font-size: 0.78rem;
  color: var(--error-color, #db4437);
}

.buttons {
  grid-row: 1 / span 2;
  grid-column: 2;
  display: flex;
  gap: 6px;
}

button.icon {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  padding: 0;
  border: 1px solid color-mix(in srgb, var(--primary-text-color) 16%, transparent);
  border-radius: 50%;
  background: none;
  color: var(--secondary-text-color);
  cursor: pointer;
}

button.icon:hover {
  color: var(--error-color, #db4437);
  border-color: color-mix(in srgb, var(--error-color, #db4437) 40%, transparent);
}

button.icon ha-icon {
  --mdc-icon-size: 17px;
  display: flex;
}

.none {
  padding: 4px 0;
  font-size: 0.85rem;
  color: var(--secondary-text-color);
}

input[type="file"] {
  display: none;
}
`;async function be(n){try{return(await n.callWS({type:"echolocal/wake_words/list"}))?.wake_words??[]}catch{return[]}}var O=class extends v{constructor(){super(...arguments);this.words=[];this.over=!1;this.busy=!1;this.said="";this.asked=!1;this.dropped=t=>{t.preventDefault(),this.over=!1,this.add(t.dataTransfer?.files??null)}}updated(){this.asked||!this.hass||(this.asked=!0,this.refresh())}render(){return l`
      <div
        class="zone"
        data-over=${String(this.over)}
        @click=${()=>this.shadowRoot?.querySelector("input[type=file]")?.click()}
        @dragover=${t=>{t.preventDefault(),this.over=!0}}
        @dragleave=${()=>this.over=!1}
        @drop=${this.dropped}
      >
        <ha-icon .icon=${this.busy?"mdi:timer-outline":"mdi:tray-arrow-up"}></ha-icon>
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
          @change=${t=>this.add(t.target.files)}
        />
      </div>

      ${this.words.length?l`<div class="list">${this.words.map(t=>this.row(t))}</div>`:l`<div class="none">
            Nothing in custom_wake_words yet. Whatever the firmware ships with is unaffected.
          </div>`}
    `}row(t){let e=[t.type||"no type",t.size?`${Math.round(t.size/1024)} KB`:"no model",...t.trained_languages.length?[t.trained_languages.join(", ")]:[]];return l`<div class="word" data-bad=${String(t.problems.length>0)}>
      <div class="said">
        <input
          .value=${t.wake_word}
          placeholder="what someone says to wake it"
          @change=${i=>this.rename(t,i.target.value)}
        />
      </div>
      <div class="about">${e.join(" \xB7 ")}</div>
      <div class="buttons">
        <button class="icon" aria-label="Remove ${t.id}" @click=${()=>this.discard(t)}>
          <ha-icon icon="mdi:trash-can-outline"></ha-icon>
        </button>
      </div>
      ${t.problems.length?l`<div class="wrong">${t.problems.join(". ")}.</div>`:p}
    </div>`}async add(t){let e=[...t??[]].filter(i=>i.name.endsWith(".tflite"));if(!e.length){this.said="A wake model is a .tflite file.";return}this.busy=!0,this.said="";for(let i of e){let s=new FormData;s.append("file",i);try{let o=await fetch("/api/echolocal/wake_words",{method:"POST",body:s,headers:this.credentials()});if(!o.ok){let a=await o.json().catch(()=>({}));this.said=a.error??`Home Assistant refused ${i.name}.`;break}}catch(o){this.said=`That did not reach Home Assistant: ${o}`;break}}this.busy=!1,await this.refresh()}async rename(t,e){e!==t.wake_word&&(await this.hass.callWS({type:"echolocal/wake_words/update",wake_word_id:t.id,wake_word:e}),await this.refresh())}async discard(t){await this.hass.callWS({type:"echolocal/wake_words/delete",wake_word_id:t.id}),await this.refresh()}async refresh(){this.words=await be(this.hass)}credentials(){let t=this.hass.auth?.data?.access_token;return t?{authorization:`Bearer ${t}`}:{}}};O.styles=b(qr),c([u({attribute:!1})],O.prototype,"hass",2),c([g()],O.prototype,"words",2),c([g()],O.prototype,"over",2),c([g()],O.prototype,"busy",2),c([g()],O.prototype,"said",2),c([g()],O.prototype,"asked",2),O=c([y("echolocal-wake-words")],O);var Br=`:host {
  display: block;
}

h2.first {
  margin-top: 0;
}

h2 {
  margin: 26px 0 10px;
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--secondary-text-color);
}

.listening {
  display: grid;
  gap: 8px;
}

.who {
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
  padding: 10px 14px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--primary-text-color) 5%, transparent);
  font-size: 0.9rem;
}

.who .name {
  color: var(--primary-text-color);
  min-width: 8ch;
}

.word {
  padding: 2px 9px;
  border-radius: 999px;
  font-size: 0.78rem;
  background: color-mix(in srgb, var(--primary-color) 16%, transparent);
  color: var(--primary-color);
}

.word[data-gone="true"] {
  background: color-mix(in srgb, var(--error-color, #db4437) 16%, transparent);
  color: var(--error-color, #db4437);
}

.spare {
  font-size: 0.85rem;
  color: var(--secondary-text-color);
  line-height: 1.5;
}
`;N({path:"wake-words",title:"Wake words",icon:"mdi:waveform",element:"echolocal-words",order:10,admin:!0});var L=class extends v{constructor(){super(...arguments);this.words=[];this.asked=!1;this.again=()=>this.requestUpdate()}connectedCallback(){super.connectedCallback(),window.addEventListener(Wt,this.again)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(Wt,this.again)}updated(){this.asked||!this.hass||(this.asked=!0,this.load())}render(){if(!this.hass)return p;let t=this.chosen(),e=new Set(this.words.filter(s=>s.problems.length&&s.wake_word).map(s=>s.wake_word)),i=this.words.filter(s=>!s.problems.length&&!t.some(o=>o.words.includes(s.wake_word)));return l`
      <h2 class="first">Listening for</h2>
      ${t.length?l`<div class="listening">
            ${t.map(s=>l`<div class="who">
                <span class="name">${s.name}</span>
                ${s.words.map(o=>l`<span
                      class="word"
                      data-gone=${String(e.has(o))}
                      title=${e.has(o)?"Its library entry is broken, so it is not offered":""}
                      >${o}</span
                    >`)}
              </div>`)}
          </div>`:l`<div class="spare">No devices have picked a wake word yet.</div>`}

      <h2>The library</h2>
      <echolocal-wake-words .hass=${this.hass}></echolocal-wake-words>

      ${i.length?l`<div class="spare">
            Unused: ${i.map(s=>s.wake_word).join(", ")} — offered to every satellite, picked
            by none of them.
          </div>`:p}
    `}chosen(){return H(this.hass).map(t=>{let i=(B(this.hass,t.id)?.by.get("wake_word")??[]).map(s=>this.hass.states[s.entity_id]?.state).filter(s=>!!s&&s!=="unknown"&&s!=="None");return{name:k(t),words:i}}).filter(t=>t.words.length)}async load(){this.words=await be(this.hass)}};L.styles=b(Br),c([u({attribute:!1})],L.prototype,"hass",2),c([g()],L.prototype,"words",2),c([g()],L.prototype,"asked",2),L=c([y("echolocal-words")],L);var D=class extends v{constructor(){super(...arguments);this.narrow=!1;this.at="";this.made=new Map;this.moved=()=>{this.at=ge(this.base(),void 0),this.requestUpdate()}}connectedCallback(){super.connectedCallback(),window.addEventListener("location-changed",this.moved),window.addEventListener("popstate",this.moved)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("location-changed",this.moved),window.removeEventListener("popstate",this.moved)}render(){if(!this.hass)return p;let t=!!this.hass.user?.is_admin,e=me(t),i=Sr(this.where(),t);return l`
      <header>
        <div class="bar">${e.map(s=>this.button(s,s===i))}</div>
      </header>
      <div class="page">${i?this.body(i):p}</div>
    `}button(t,e){return l`<button
      data-here=${String(e)}
      @click=${()=>{this.at=t.path,Ar(this.base(),t.path)}}
    >
      <ha-icon .icon=${t.icon}></ha-icon><span>${t.title}</span>
    </button>`}body(t){let e=this.made.get(t.path);return e||(e=document.createElement(t.element),this.made.set(t.path,e)),e.hass=this.hass,e.narrow=this.narrow,e}where(){return this.route?ge(this.base(),this.route.path):this.at}base(){return this.route?.prefix??"/echolocal"}};D.styles=b(Cr),c([u({attribute:!1})],D.prototype,"hass",2),c([u({type:Boolean})],D.prototype,"narrow",2),c([u({attribute:!1})],D.prototype,"route",2),c([u({attribute:!1})],D.prototype,"panel",2),c([g()],D.prototype,"at",2),D=c([y("echolocal-panel")],D);window.customCards=window.customCards??[];window.customCards.some(n=>n.type==="echolocal-satellite-card")||window.customCards.push({type:"echolocal-satellite-card",name:"EchoLocal Satellite",description:"An EchoLocal satellite, drawn as itself, with its ring and mute live.",preview:!0,documentationURL:"https://github.com/ygelfand/echolocal-hacs"});
