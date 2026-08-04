var Ir=Object.defineProperty;var Kr=Object.getOwnPropertyDescriptor;var d=(n,r,e,t)=>{for(var i=t>1?void 0:t?Kr(r,e):r,s=n.length-1,o;s>=0;s--)(o=n[s])&&(i=(t?o(r,e,i):o(i))||i);return t&&i&&Ir(r,e,i),i};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ae=globalThis,Me=Ae.ShadowRoot&&(Ae.ShadyCSS===void 0||Ae.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,$t=Symbol(),wt=new WeakMap,Ce=class{constructor(r,e,t){if(this._$cssResult$=!0,t!==$t)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=r,this.t=e}get styleSheet(){let r=this.o,e=this.t;if(Me&&r===void 0){let t=e!==void 0&&e.length===1;t&&(r=wt.get(e)),r===void 0&&((this.o=r=new CSSStyleSheet).replaceSync(this.cssText),t&&wt.set(e,r))}return r}toString(){return this.cssText}},y=n=>new Ce(typeof n=="string"?n:n+"",void 0,$t);var kt=(n,r)=>{if(Me)n.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of r){let t=document.createElement("style"),i=Ae.litNonce;i!==void 0&&t.setAttribute("nonce",i),t.textContent=e.cssText,n.appendChild(t)}},Ge=Me?n=>n:n=>n instanceof CSSStyleSheet?(r=>{let e="";for(let t of r.cssRules)e+=t.cssText;return y(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var{is:Gr,defineProperty:Yr,getOwnPropertyDescriptor:Vr,getOwnPropertyNames:Xr,getOwnPropertySymbols:Lr,getPrototypeOf:Zr}=Object,Te=globalThis,_t=Te.trustedTypes,Jr=_t?_t.emptyScript:"",Qr=Te.reactiveElementPolyfillSupport,ge=(n,r)=>n,fe={toAttribute(n,r){switch(r){case Boolean:n=n?Jr:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,r){let e=n;switch(r){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},He=(n,r)=>!Gr(n,r),St={attribute:!0,type:String,converter:fe,reflect:!1,useDefault:!1,hasChanged:He};Symbol.metadata??=Symbol("metadata"),Te.litPropertyMetadata??=new WeakMap;var B=class extends HTMLElement{static addInitializer(r){this._$Ei(),(this.l??=[]).push(r)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(r,e=St){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(r)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(r,e),!e.noAccessor){let t=Symbol(),i=this.getPropertyDescriptor(r,t,e);i!==void 0&&Yr(this.prototype,r,i)}}static getPropertyDescriptor(r,e,t){let{get:i,set:s}=Vr(this.prototype,r)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){let a=i?.call(this);s?.call(this,o),this.requestUpdate(r,a,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(r){return this.elementProperties.get(r)??St}static _$Ei(){if(this.hasOwnProperty(ge("elementProperties")))return;let r=Zr(this);r.finalize(),r.l!==void 0&&(this.l=[...r.l]),this.elementProperties=new Map(r.elementProperties)}static finalize(){if(this.hasOwnProperty(ge("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ge("properties"))){let e=this.properties,t=[...Xr(e),...Lr(e)];for(let i of t)this.createProperty(i,e[i])}let r=this[Symbol.metadata];if(r!==null){let e=litPropertyMetadata.get(r);if(e!==void 0)for(let[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let i=this._$Eu(e,t);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(r){let e=[];if(Array.isArray(r)){let t=new Set(r.flat(1/0).reverse());for(let i of t)e.unshift(Ge(i))}else r!==void 0&&e.push(Ge(r));return e}static _$Eu(r,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof r=="string"?r.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(r=>r(this))}addController(r){(this._$EO??=new Set).add(r),this.renderRoot!==void 0&&this.isConnected&&r.hostConnected?.()}removeController(r){this._$EO?.delete(r)}_$E_(){let r=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(r.set(t,this[t]),delete this[t]);r.size>0&&(this._$Ep=r)}createRenderRoot(){let r=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return kt(r,this.constructor.elementStyles),r}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(r=>r.hostConnected?.())}enableUpdating(r){}disconnectedCallback(){this._$EO?.forEach(r=>r.hostDisconnected?.())}attributeChangedCallback(r,e,t){this._$AK(r,t)}_$ET(r,e){let t=this.constructor.elementProperties.get(r),i=this.constructor._$Eu(r,t);if(i!==void 0&&t.reflect===!0){let s=(t.converter?.toAttribute!==void 0?t.converter:fe).toAttribute(e,t.type);this._$Em=r,s==null?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(r,e){let t=this.constructor,i=t._$Eh.get(r);if(i!==void 0&&this._$Em!==i){let s=t.getPropertyOptions(i),o=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:fe;this._$Em=i;let a=o.fromAttribute(e,s.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(r,e,t,i=!1,s){if(r!==void 0){let o=this.constructor;if(i===!1&&(s=this[r]),t??=o.getPropertyOptions(r),!((t.hasChanged??He)(s,e)||t.useDefault&&t.reflect&&s===this._$Ej?.get(r)&&!this.hasAttribute(o._$Eu(r,t))))return;this.C(r,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(r,e,{useDefault:t,reflect:i,wrapped:s},o){t&&!(this._$Ej??=new Map).has(r)&&(this._$Ej.set(r,o??e??this[r]),s!==!0||o!==void 0)||(this._$AL.has(r)||(this.hasUpdated||t||(e=void 0),this._$AL.set(r,e)),i===!0&&this._$Em!==r&&(this._$Eq??=new Set).add(r))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let r=this.scheduleUpdate();return r!=null&&await r,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,s]of this._$Ep)this[i]=s;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[i,s]of t){let{wrapped:o}=s,a=this[i];o!==!0||this._$AL.has(i)||a===void 0||this.C(i,void 0,s,a)}}let r=!1,e=this._$AL;try{r=this.shouldUpdate(e),r?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw r=!1,this._$EM(),t}r&&this._$AE(e)}willUpdate(r){}_$AE(r){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(r)),this.updated(r)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(r){return!0}update(r){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(r){}firstUpdated(r){}};B.elementStyles=[],B.shadowRootOptions={mode:"open"},B[ge("elementProperties")]=new Map,B[ge("finalized")]=new Map,Qr?.({ReactiveElement:B}),(Te.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Qe=globalThis,At=n=>n,Ee=Qe.trustedTypes,Ct=Ee?Ee.createPolicy("lit-html",{createHTML:n=>n}):void 0,Pt="$lit$",Y=`lit$${Math.random().toFixed(9).slice(2)}$`,zt="?"+Y,ei=`<${zt}>`,re=document,be=()=>re.createComment(""),ye=n=>n===null||typeof n!="object"&&typeof n!="function",et=Array.isArray,ti=n=>et(n)||typeof n?.[Symbol.iterator]=="function",Ye=`[ 	
\f\r]`,ve=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Mt=/-->/g,Tt=/>/g,ee=RegExp(`>|${Ye}(?:([^\\s"'>=/]+)(${Ye}*=${Ye}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ht=/'/g,Et=/"/g,Ot=/^(?:script|style|textarea|title)$/i,tt=n=>(r,...e)=>({_$litType$:n,strings:r,values:e}),c=tt(1),_=tt(2),hs=tt(3),ie=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),Rt=new WeakMap,te=re.createTreeWalker(re,129);function Nt(n,r){if(!et(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ct!==void 0?Ct.createHTML(r):r}var ri=(n,r)=>{let e=n.length-1,t=[],i,s=r===2?"<svg>":r===3?"<math>":"",o=ve;for(let a=0;a<e;a++){let l=n[a],u,f,v=-1,w=0;for(;w<l.length&&(o.lastIndex=w,f=o.exec(l),f!==null);)w=o.lastIndex,o===ve?f[1]==="!--"?o=Mt:f[1]!==void 0?o=Tt:f[2]!==void 0?(Ot.test(f[2])&&(i=RegExp("</"+f[2],"g")),o=ee):f[3]!==void 0&&(o=ee):o===ee?f[0]===">"?(o=i??ve,v=-1):f[1]===void 0?v=-2:(v=o.lastIndex-f[2].length,u=f[1],o=f[3]===void 0?ee:f[3]==='"'?Et:Ht):o===Et||o===Ht?o=ee:o===Mt||o===Tt?o=ve:(o=ee,i=void 0);let $=o===ee&&n[a+1].startsWith("/>")?" ":"";s+=o===ve?l+ei:v>=0?(t.push(u),l.slice(0,v)+Pt+l.slice(v)+Y+$):l+Y+(v===-2?a:$)}return[Nt(n,s+(n[e]||"<?>")+(r===2?"</svg>":r===3?"</math>":"")),t]},xe=class n{constructor({strings:r,_$litType$:e},t){let i;this.parts=[];let s=0,o=0,a=r.length-1,l=this.parts,[u,f]=ri(r,e);if(this.el=n.createElement(u,t),te.currentNode=this.el.content,e===2||e===3){let v=this.el.content.firstChild;v.replaceWith(...v.childNodes)}for(;(i=te.nextNode())!==null&&l.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(let v of i.getAttributeNames())if(v.endsWith(Pt)){let w=f[o++],$=i.getAttribute(v).split(Y),S=/([.?@])?(.*)/.exec(w);l.push({type:1,index:s,name:S[2],strings:$,ctor:S[1]==="."?Xe:S[1]==="?"?Le:S[1]==="@"?Ze:oe}),i.removeAttribute(v)}else v.startsWith(Y)&&(l.push({type:6,index:s}),i.removeAttribute(v));if(Ot.test(i.tagName)){let v=i.textContent.split(Y),w=v.length-1;if(w>0){i.textContent=Ee?Ee.emptyScript:"";for(let $=0;$<w;$++)i.append(v[$],be()),te.nextNode(),l.push({type:2,index:++s});i.append(v[w],be())}}}else if(i.nodeType===8)if(i.data===zt)l.push({type:2,index:s});else{let v=-1;for(;(v=i.data.indexOf(Y,v+1))!==-1;)l.push({type:7,index:s}),v+=Y.length-1}s++}}static createElement(r,e){let t=re.createElement("template");return t.innerHTML=r,t}};function ne(n,r,e=n,t){if(r===ie)return r;let i=t!==void 0?e._$Co?.[t]:e._$Cl,s=ye(r)?void 0:r._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(!1),s===void 0?i=void 0:(i=new s(n),i._$AT(n,e,t)),t!==void 0?(e._$Co??=[])[t]=i:e._$Cl=i),i!==void 0&&(r=ne(n,i._$AS(n,r.values),i,t)),r}var Ve=class{constructor(r,e){this._$AV=[],this._$AN=void 0,this._$AD=r,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(r){let{el:{content:e},parts:t}=this._$AD,i=(r?.creationScope??re).importNode(e,!0);te.currentNode=i;let s=te.nextNode(),o=0,a=0,l=t[0];for(;l!==void 0;){if(o===l.index){let u;l.type===2?u=new we(s,s.nextSibling,this,r):l.type===1?u=new l.ctor(s,l.name,l.strings,this,r):l.type===6&&(u=new Je(s,this,r)),this._$AV.push(u),l=t[++a]}o!==l?.index&&(s=te.nextNode(),o++)}return te.currentNode=re,i}p(r){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(r,t,e),e+=t.strings.length-2):t._$AI(r[e])),e++}},we=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(r,e,t,i){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=r,this._$AB=e,this._$AM=t,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let r=this._$AA.parentNode,e=this._$AM;return e!==void 0&&r?.nodeType===11&&(r=e.parentNode),r}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(r,e=this){r=ne(this,r,e),ye(r)?r===h||r==null||r===""?(this._$AH!==h&&this._$AR(),this._$AH=h):r!==this._$AH&&r!==ie&&this._(r):r._$litType$!==void 0?this.$(r):r.nodeType!==void 0?this.T(r):ti(r)?this.k(r):this._(r)}O(r){return this._$AA.parentNode.insertBefore(r,this._$AB)}T(r){this._$AH!==r&&(this._$AR(),this._$AH=this.O(r))}_(r){this._$AH!==h&&ye(this._$AH)?this._$AA.nextSibling.data=r:this.T(re.createTextNode(r)),this._$AH=r}$(r){let{values:e,_$litType$:t}=r,i=typeof t=="number"?this._$AC(r):(t.el===void 0&&(t.el=xe.createElement(Nt(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===i)this._$AH.p(e);else{let s=new Ve(i,this),o=s.u(this.options);s.p(e),this.T(o),this._$AH=s}}_$AC(r){let e=Rt.get(r.strings);return e===void 0&&Rt.set(r.strings,e=new xe(r)),e}k(r){et(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,i=0;for(let s of r)i===e.length?e.push(t=new n(this.O(be()),this.O(be()),this,this.options)):t=e[i],t._$AI(s),i++;i<e.length&&(this._$AR(t&&t._$AB.nextSibling,i),e.length=i)}_$AR(r=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);r!==this._$AB;){let t=At(r).nextSibling;At(r).remove(),r=t}}setConnected(r){this._$AM===void 0&&(this._$Cv=r,this._$AP?.(r))}},oe=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(r,e,t,i,s){this.type=1,this._$AH=h,this._$AN=void 0,this.element=r,this.name=e,this._$AM=i,this.options=s,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=h}_$AI(r,e=this,t,i){let s=this.strings,o=!1;if(s===void 0)r=ne(this,r,e,0),o=!ye(r)||r!==this._$AH&&r!==ie,o&&(this._$AH=r);else{let a=r,l,u;for(r=s[0],l=0;l<s.length-1;l++)u=ne(this,a[t+l],e,l),u===ie&&(u=this._$AH[l]),o||=!ye(u)||u!==this._$AH[l],u===h?r=h:r!==h&&(r+=(u??"")+s[l+1]),this._$AH[l]=u}o&&!i&&this.j(r)}j(r){r===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,r??"")}},Xe=class extends oe{constructor(){super(...arguments),this.type=3}j(r){this.element[this.name]=r===h?void 0:r}},Le=class extends oe{constructor(){super(...arguments),this.type=4}j(r){this.element.toggleAttribute(this.name,!!r&&r!==h)}},Ze=class extends oe{constructor(r,e,t,i,s){super(r,e,t,i,s),this.type=5}_$AI(r,e=this){if((r=ne(this,r,e,0)??h)===ie)return;let t=this._$AH,i=r===h&&t!==h||r.capture!==t.capture||r.once!==t.once||r.passive!==t.passive,s=r!==h&&(t===h||i);i&&this.element.removeEventListener(this.name,this,t),s&&this.element.addEventListener(this.name,this,r),this._$AH=r}handleEvent(r){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,r):this._$AH.handleEvent(r)}},Je=class{constructor(r,e,t){this.element=r,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(r){ne(this,r)}};var ii=Qe.litHtmlPolyfillSupport;ii?.(xe,we),(Qe.litHtmlVersions??=[]).push("3.3.3");var Ut=(n,r,e)=>{let t=e?.renderBefore??r,i=t._$litPart$;if(i===void 0){let s=e?.renderBefore??null;t._$litPart$=i=new we(r.insertBefore(be(),s),s,void 0,e??{})}return i._$AI(n),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var rt=globalThis,b=class extends B{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let r=super.createRenderRoot();return this.renderOptions.renderBefore??=r.firstChild,r}update(r){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(r),this._$Do=Ut(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ie}};b._$litElement$=!0,b.finalized=!0,rt.litElementHydrateSupport?.({LitElement:b});var si=rt.litElementPolyfillSupport;si?.({LitElement:b});(rt.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var x=n=>(r,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(n,r)}):customElements.define(n,r)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ni={attribute:!0,type:String,converter:fe,reflect:!1,hasChanged:He},oi=(n=ni,r,e)=>{let{kind:t,metadata:i}=e,s=globalThis.litPropertyMetadata.get(i);if(s===void 0&&globalThis.litPropertyMetadata.set(i,s=new Map),t==="setter"&&((n=Object.create(n)).wrapped=!0),s.set(e.name,n),t==="accessor"){let{name:o}=e;return{set(a){let l=r.get.call(this);r.set.call(this,a),this.requestUpdate(o,l,n,!0,a)},init(a){return a!==void 0&&this.C(o,void 0,n,a),a}}}if(t==="setter"){let{name:o}=e;return function(a){let l=this[o];r.call(this,a),this.requestUpdate(o,l,n,!0,a)}}throw Error("Unsupported decorator location: "+t)};function m(n){return(r,e)=>typeof e=="object"?oi(n,r,e):((t,i,s)=>{let o=i.hasOwnProperty(s);return i.constructor.createProperty(s,t),o?Object.getOwnPropertyDescriptor(i,s):void 0})(n,r,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function g(n){return m({...n,state:!0,attribute:!1})}/**
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
 */var $e=12,Dt=2.2,U=100,D=100,Wt=500;function Ft(n,r){let e=Array.from({length:$e},(t,i)=>{let s=-90+360/$e*i+Dt/2,o=-90+360/$e*(i+1)-Dt/2;return ci(93,82,s,o)});return _`
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

      <circle cx=${U} cy=${D} r="97" fill="var(--el-shell)"></circle>
      <circle cx=${U} cy=${D} r="97" fill="none" stroke="var(--el-edge)" stroke-width="1"></circle>

      <g class="halo" filter="url(#blur)" style="opacity:${n.glow}">
        ${e.map((t,i)=>_`<path d=${t} style="fill:${n.segments[i].opacity?n.segments[i].fill:"transparent"}"></path>`)}
      </g>

      ${e.map((t,i)=>_`<path
          class="segment"
          data-picked=${String(n.picked===i)}
          data-divisible=${String(n.divisible)}
          d=${t}
          style="fill:${n.segments[i].fill};opacity:${n.segments[i].opacity}"
          @click=${n.divisible?()=>r.segment(i):r.ring}
        ></path>`)}

      <circle cx=${U} cy=${D} r="79" fill="url(#top)"></circle>
      <circle cx=${U} cy=${D} r="79" fill="none" stroke="var(--el-edge)" stroke-width="1"></circle>

      <circle class="hit" cx=${U} cy=${D} r="93" fill="none" stroke="transparent"
        stroke-width="12" @click=${r.ring}></circle>

      ${it(U,D-46,_`<path d="M-4.5 0h9M0 -4.5v9"></path>`,"Volume up",()=>r.volume(1))}
      <g
        class="btn"
        data-lit=${String(n.holding)}
        transform="translate(${U+46} ${D})"
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
      ${it(U,D+46,_`<path d="M-4.5 0h9"></path>`,"Volume down",()=>r.volume(-1))}
      ${it(U-46,D,ai(n.muted),n.muted?"Microphone muted":"Microphone live",r.mute,n.muted)}
    </svg>
  `}function it(n,r,e,t,i,s=!1){return _`<g class="btn" data-lit=${String(s)} transform="translate(${n} ${r})"
    role="button" tabindex="0" aria-label=${t} @click=${i}>
    <circle class="face" cx="0" cy="0" r="13"></circle>
    <g class="glyph">${e}</g>
  </g>`}function ai(n){return _`
    <path d="M-2.6 -5.2a2.6 2.6 0 0 1 5.2 0v4a2.6 2.6 0 0 1-5.2 0z"></path>
    <path d="M-4.6 -0.6a4.6 4.6 0 0 0 9.2 0"></path>
    <path d="M0 3.8v2.6"></path>
    ${n?_`<path d="M-6.4 6.4L6.4 -6.4"></path>`:li()}
  `}function li(){return _``}function ci(n,r,e,t){let i=($,S)=>{let E=S*Math.PI/180;return[(U+$*Math.cos(E)).toFixed(2),(D+$*Math.sin(E)).toFixed(2)]},[s,o]=i(n,e),[a,l]=i(n,t),[u,f]=i(r,t),[v,w]=i(r,e);return`M${s} ${o}A${n} ${n} 0 0 1 ${a} ${l}L${u} ${f}A${r} ${r} 0 0 0 ${v} ${w}Z`}var jt=`:host {
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
`;var qt=`:host {
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
`;var Bt=26,Pe=135,ze=270,A=100,C=100,V=84,Oe=38,R=class extends b{constructor(){super(...arguments);this.level="";this.floor="";this.gate="";this.mode="";this.muted=!1;this.held=null;this.grab=e=>{let t=e.currentTarget;t.setPointerCapture(e.pointerId);let i=this.hass.states[this.gate]?.attributes??{},s=i.min??0,o=i.max??20,a=i.step??1,l=this.number(this.floor)??0,u=this.number(this.level)??0,f=Math.max(l+Bt,u+3),v=S=>{let E=t.getBoundingClientRect(),xt=S.clientX-E.left-E.width/2,Ke=S.clientY-E.top-E.height/2,me=Math.atan2(Ke,xt)*180/Math.PI-Pe;for(;me<0;)me+=360;let Br=st(Math.min(me,ze)/ze);return Math.max(s,Math.min(o,Math.round(Br*(f-l)/a)*a))},w=S=>{this.held=v(S)},$=S=>{t.removeEventListener("pointermove",w),t.removeEventListener("pointerup",$),t.removeEventListener("pointercancel",$);let E=v(S);this.held=null,this.hass.callService("number","set_value",{entity_id:this.gate,value:E})};t.addEventListener("pointermove",w),t.addEventListener("pointerup",$),t.addEventListener("pointercancel",$),this.held=v(e)}}render(){let e=this.number(this.level),t=this.number(this.floor),i=this.held??this.number(this.gate);if(e===null||t===null||i===null)return h;let s=this.hass.states[this.mode],o=It(s?.state),a=Math.max(t+Bt,e+3),l=st((e-t)/(a-t)),u=st(i/(a-t)),f=e>=t+i&&!this.muted;return c`
      <div class="dial" @pointerdown=${this.grab}>
        <svg viewBox="0 0 200 200" role="img" aria-label="Microphone array">
          <path class="arc-bed" d=${Kt()} pathLength="100"></path>
          ${this.muted?h:_`<path
                class="arc-live"
                data-over=${String(f)}
                d=${Kt()}
                pathLength="100"
                stroke-dasharray=${`${l*100} 100`}
              ></path>`}
          ${this.muted?h:fi(u)} ${o==="beam"?gi():h}
          ${o==="sum"?mi():h} ${hi(o,this.muted)}
          ${this.muted?_`<path class="slash" d="M${A-30} ${C+30}L${A+30} ${C-30}"></path>`:h}
        </svg>
      </div>

      <div class="side">
        <div class="reading">
          ${this.muted?c`<span class="now cut">Cut</span>`:c`<span class="now">${e.toFixed(1)}</span><span class="unit">dB</span>
                <span class="caption" data-over=${String(f)}>
                  ${f?"Over the gate":"Quiet"}
                </span>`}
        </div>

        <div class="modes">
          ${(s?.attributes.options??[]).map(v=>c`<button
              class="mode"
              data-on=${String(v===s?.state)}
              @click=${()=>this.hass.callService("select","select_option",{entity_id:this.mode,option:v})}
            >
              <svg viewBox="0 0 40 40">${ui(It(v))}</svg>
              <span>${v}</span>
            </button>`)}
        </div>

        <div class="gate">Gate <b>${i} dB</b> over a floor of <b>${t.toFixed(0)} dB</b></div>
      </div>
    `}number(e){let t=Number(this.hass?.states?.[e]?.state);return Number.isFinite(t)?t:null}};R.styles=y(qt),d([m({attribute:!1})],R.prototype,"hass",2),d([m()],R.prototype,"level",2),d([m()],R.prototype,"floor",2),d([m()],R.prototype,"gate",2),d([m()],R.prototype,"mode",2),d([m({type:Boolean})],R.prototype,"muted",2),d([g()],R.prototype,"held",2),R=d([x("echolocal-array")],R);function It(n){let r=(n??"").toLowerCase();return r.includes("center")||r.includes("centre")?"one":r.includes("beam")?"beam":"sum"}function hi(n,r){return[[A,C],...Array.from({length:6},(t,i)=>{let s=(-90+i*60)*Math.PI/180;return[A+Oe*Math.cos(s),C+Oe*Math.sin(s)]})].map(([t,i],s)=>_`<circle class="capsule" data-on=${String(!r&&(n!=="one"||s===0))}
      cx=${t.toFixed(1)} cy=${i.toFixed(1)} r=${s===0?7:5.5}></circle>`)}function ui(n){let r=[[20,20],...Array.from({length:6},(e,t)=>{let i=(-90+t*60)*Math.PI/180;return[20+12*Math.cos(i),20+12*Math.sin(i)]})];return _`
    ${n==="beam"?_`<path class="beam" d="M20 20C9 11 13 1 20 1C27 1 31 11 20 20Z"></path>`:h}
    ${r.map(([e,t],i)=>_`<circle class="capsule" data-on=${String(n!=="one"||i===0)}
          cx=${e.toFixed(1)} cy=${t.toFixed(1)} r=${i===0?3.4:2.6}></circle>`)}`}function mi(){return Array.from({length:6},(n,r)=>{let e=(-90+r*60)*Math.PI/180;return _`<line class="spoke" x1=${A} y1=${C}
      x2=${(A+Oe*Math.cos(e)).toFixed(1)} y2=${(C+Oe*Math.sin(e)).toFixed(1)}></line>`})}function gi(){return _`<path class="beam" d="M${A} ${C}C${A-34} ${C-30} ${A-24} ${C-66} ${A} ${C-66}C${A+24} ${C-66} ${A+34} ${C-30} ${A} ${C}Z"></path>`}function Kt(){let n=Pe*Math.PI/180,r=(Pe+ze)*Math.PI/180;return`M${(A+V*Math.cos(n)).toFixed(2)} ${(C+V*Math.sin(n)).toFixed(2)}
    A${V} ${V} 0 1 1 ${(A+V*Math.cos(r)).toFixed(2)} ${(C+V*Math.sin(r)).toFixed(2)}`}function fi(n){let r=(Pe+n*ze)*Math.PI/180,e=V-8,t=V+8;return _`<line class="notch"
    x1=${(A+e*Math.cos(r)).toFixed(1)} y1=${(C+e*Math.sin(r)).toFixed(1)}
    x2=${(A+t*Math.cos(r)).toFixed(1)} y2=${(C+t*Math.sin(r)).toFixed(1)}></line>`}function st(n){return Math.max(0,Math.min(1,n))}var Gt=`:host {
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

`;var se=class extends b{constructor(){super(...arguments);this.text="";this.open=!1;this.toggle=e=>{e.stopPropagation(),e.preventDefault(),this.open=!this.open,this.open?(this.place(),document.addEventListener("click",this.elsewhere,!0)):document.removeEventListener("click",this.elsewhere,!0)};this.elsewhere=e=>{e.composedPath().includes(this)||(this.open=!1,document.removeEventListener("click",this.elsewhere,!0))}}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this.elsewhere,!0)}render(){return this.text?c`
      <button
        data-open=${String(this.open)}
        aria-label="What this does"
        aria-expanded=${String(this.open)}
        @click=${this.toggle}
      >
        ?
      </button>
      ${this.open?c`<div class="said" role="tooltip">${this.text}</div>`:h}
    `:h}async place(){let e=(await this.updateComplete,this.shadowRoot?.querySelector(".said"));if(!(e instanceof HTMLElement))return;e.style.removeProperty("transform");let t=(this.closest(".sheet")??this.offsetParent??document.body).getBoundingClientRect(),i=e.getBoundingClientRect(),s=10,o=Math.max(0,t.left+s-i.left)-Math.max(0,i.right-t.right+s);o&&(e.style.transform=`translateX(${Math.round(o)}px)`)}};se.styles=y(Gt),d([m()],se.prototype,"text",2),d([g()],se.prototype,"open",2),se=d([x("echolocal-bubble")],se);var Yt=`.sheet {
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
`;var Vt=`:host {
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
`;var z=class extends b{constructor(){super(...arguments);this.light="";this.muted="";this.failure="";this.room="";this.target="rest"}render(){let e=this.hass.states[this.light];if(!e)return h;let t=this.situations(),i=t.find(o=>o.key===this.target)??t[0],s=e.attributes.brightness??255;return c`
      <div class="dim">
        <span>Brightness</span>
        <input
          type="range"
          min="1"
          max="255"
          .value=${String(s)}
          ?disabled=${e.state!=="on"}
          @change=${o=>this.hass.callService("light","turn_on",{entity_id:this.light,brightness:Number(o.target.value)})}
        />
        <b>${Math.round(s/255*100)}%</b>
      </div>

      <div class="when">
        ${t.map(o=>c`<button
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
        ${this.options(i).map(o=>c`<button
            class="option"
            data-on=${String(o===this.showing(i))}
            @click=${()=>this.choose(i,o)}
          >
            ${o}
          </button>`)}
      </div>
    `}situations(){return[{key:"rest",label:"At rest",icon:"mdi:record-circle-outline"},{key:"muted",label:"Muted",icon:"mdi:microphone-off",entity:this.muted},{key:"failure",label:"On failure",icon:"mdi:alert-circle-outline",entity:this.failure},{key:"room",label:"Follows the room",icon:"mdi:motion-sensor",entity:this.room}].filter(t=>t.key==="rest"||t.entity&&this.hass.states[t.entity])}showing(e){return e.entity?this.hass.states[e.entity]?.state??"":this.hass.states[this.light]?.attributes.effect??""}options(e){return(e.entity?this.hass.states[e.entity]?.attributes.options:this.hass.states[this.light]?.attributes.effect_list)??[]}choose(e,t){if(!e.entity){this.hass.callService("light","turn_on",{entity_id:this.light,effect:t});return}this.hass.callService("select","select_option",{entity_id:e.entity,option:t})}};z.styles=y(Vt),d([m({attribute:!1})],z.prototype,"hass",2),d([m()],z.prototype,"light",2),d([m()],z.prototype,"muted",2),d([m()],z.prototype,"failure",2),d([m()],z.prototype,"room",2),d([g()],z.prototype,"target",2),z=d([x("echolocal-appearance")],z);var xi=[[/_microphone_mute$/,"Cuts the microphones in hardware. The device cannot hear anything at all while this is on, including its wake word \u2014 it is a switch on the power to the capsules, not a software mute."],[/_microphone_gain$/,"How much the capsules are amplified before anything else happens. Raise it in a large or quiet room; lower it if speech close to the device clips and comes out distorted."],[/_microphone_mixing$/,"How the seven capsules are combined into the one channel the speech engine hears. Beamforming favours whichever direction someone is talking from and rejects the rest of the room; averaging treats every direction equally and is steadier when several people talk."],[/_microphone_leveling$/,"Evens out loud and quiet talkers so a whisper across the room and a shout beside it arrive at similar volume. Helps transcription, and costs a little dynamic range."],[/_microphone_echo_cancellation$/,"Subtracts what the speaker is playing from what the microphones hear, so the device can be interrupted while it is talking and does not answer its own reply."],[/_room_sensitivity$/,"How much louder than the room's own noise floor a sound has to be before the device treats it as somebody talking. Raise it in a noisy room to stop the device reacting to the room itself; lower it if quiet speech is missed."],[/_room_level$/,"How loud the room is right now, in decibels below full scale. Nothing to set \u2014 it is what the sensitivity is measured against, and watching it is how you pick a sensible one."],[/_room_floor$/,"The quietest the room has been recently, which is the baseline the device compares against. It drifts with the room, so a fridge switching on raises it rather than fooling the device."],[/_mute_led_brightness$/,"How bright the red ring is while the microphones are cut. Dim is enough to see in a dark room without lighting it up."],[/_led_ring$/,"The whole ring, as one light. Turning it off leaves the device working normally and silent about it."],[/_led_ring_segment_\d+$/,"One of the twelve segments, addressable on its own. They ship switched off in Home Assistant because twelve extra lights in every list is rarely what anyone wants \u2014 enable one and it can be coloured individually from the card."],[/_ring_while_muted$/,"What the ring does while the microphones are cut. Something visible is worth choosing: a muted device that looks identical to a listening one is how people end up talking to a device that cannot hear them."],[/_ring_on_failure$/,"What the ring does when a turn fails \u2014 no network, no pipeline, nothing understood. Distinct from the normal colours on purpose."],[/_ring_follows_the_room$/,"Lets the ring track how loud the room is while the device is listening, so somebody can see that it is hearing them before it answers."],[/_headphones$/,"Sends audio out of the jack instead of the speaker. The speaker goes quiet while this is on."],[/_white_noise_layer_\d+$/,"Plays a generated sound the device makes itself \u2014 rain, a fan, a brook. Nothing is streamed and nothing is stored: it is synthesised as it plays, so it never loops or runs out. Two layers can overlap, so rain over a fan is one choice in each."],[/_music_during_a_turn$/,"What happens to music when someone says the wake word. Ducking drops the volume and keeps playing, which resumes on the same note; stopping does not."],[/_music_ducking$/,"How far the volume drops while the device is listening or talking. Far enough that the microphones are not fighting the music, not so far that the room goes silent."],[/_voice_resampling$/,"How the reply's audio is resampled to what the speaker wants. Better quality costs a little more work on a device that has four small cores."],[/_wake_word/,"What this assistant listens for. The list is what the device has on disk plus whatever Home Assistant is offering from its custom_wake_words directory."],[/_(?:wake_)?threshold$/,"How sure the device has to be before it decides it heard its wake word. Lower it if it misses you; raise it if the television sets it off."],[/_follow_up$/,"Keeps listening for a moment after a reply, so a second question needs no second wake word."],[/_max_listen/,"How long the device will wait for someone to finish talking before giving up on the turn."],[/_max_think/,"How long to wait for Home Assistant's pipeline to answer. Generous is usually right \u2014 a slow answer beats a turn that dies just before it arrives."],[/_effect$/,"What the ring does at this point in a turn. Cosmetic, but it is how somebody knows the device heard them."],[/_tone$/,"A short sound at this point in a turn. Some people want the confirmation; some find it grating."],[/_reply_buffer/,"How much of a reply to collect before starting to play it. More is steadier on a poor network, at the cost of answering a beat later."],[/_reply_delivery/,"Whether a reply starts playing as it arrives or once all of it has. Streaming is faster to start and stutters on a bad connection."],[/_update_channel$/,"Which releases this device is offered. Stable only, or the ones that are still being tried out."],[/_check_for_updates$/,"Looks now rather than waiting for the next scheduled check. Nothing is installed by pressing it."],[/_bluetooth_proxy$/,"Forwards nearby Bluetooth advertisements to Home Assistant, so this device extends Bluetooth coverage into its room. It costs some radio time it would otherwise spend on wifi."],[/_metrics_interval$/,"How often the device reports its own temperature, memory and load. Often enough to be useful; every report is work the device does instead of listening."],[/_purge_cache$/,"Deletes what Android's runtime has cached. It comes back on its own, so this buys disk space for a while rather than permanently."],[/_test_playback$/,"Plays a short sound, which is the quickest way to find out whether the speaker, the volume and the output route are all what you think they are."],[/_remote_adb$/,"Opens Android's debugging port over the network. Off by default, and worth leaving off: it is an unauthenticated way onto the device for anything on the same network."],[/_wifi_signal$/,"How strong the connection to the access point is. Above about -70 dBm is comfortable; below -80 dBm is where audio starts arriving late."],[/_cpu_temperature$/,"The chip's own temperature. These run warm by design \u2014 it is a sustained climb rather than a number that matters."],[/_load_average$/,"How much work is queued across the cores. Listening for a wake word is continuous work, so this is never zero."],[/_memory_available$/,"How much memory is free. Wake models and the audio path are what use it."],[/_free_space$/,"Disk left. Wake models and saved recordings are what fill it."],[/_update_status$/,"What the last self-update did. Worth reading when a device is on an older version than the rest."]],wi={array:"The seven capsules and what the room sounds like to them. The arc is how loud the room is right now; the notch is how far above the room's own noise floor something has to be before the device treats it as speech. Drag the notch, then talk from where you normally would and watch whether the arc crosses it.",appearance:"Everything the ring does, in one place. Brightness applies to all of it; the four situations below are what colour it takes when the device is idle, muted, has failed, or is showing how loud the room is.",turn:"A turn's budget, end to end. The two grips are how long the device will wait for someone to finish talking, and how long it will wait for Home Assistant to answer. The band is what a slow turn would spend.",noise:"Sounds the device generates itself, mixed live rather than played from a file, so nothing loops. Two layers overlap \u2014 pick rain in one and a fan in the other.",volume:"The speaker's volume, in the same thirty steps the buttons on the device move it through, so this dial and the device agree.",history:"What the device has been hearing. Rows rebuilt from Home Assistant's recorder show what was said; rows the device itself reported also show where the time went and can be played back."},$i={microphone:"The seven microphones and how the room sounds to them. Everything here changes what the device hears before a word of it reaches Home Assistant, so it is the first place to look when it mishears or does not wake at all.",ring:"The twelve-segment light. None of it changes what the device does \u2014 it changes what somebody in the room can tell about it, which is why the muted and failed colours are worth setting.",playback:"The speaker: what comes out of it, how loud, and what happens to music when somebody talks to the device.",assistant:"One wake word and the turn that follows it. A device can run more than one, each with its own word, sensitivity and timings, which is how one device answers to two names.",device:"The device itself rather than anything it hears or says: which releases it takes, what else it does for the network, and the housekeeping.",diagnostics:"What the device reports about itself. Nothing here is a setting \u2014 it is the evidence, and it is what to read before changing anything else."};function Xt(n){return xi.find(([r])=>r.test(n))?.[1]}function Lt(n){return wi[n]}function Zt(n){return $i[n]??""}var p={firmware:/^update-firmware$/,updateChannel:/^select-update_channel$/,checkUpdates:/^button-check_for_updates$/,updateStatus:/^text_sensor-update_status$/,updateOutcome:/^event-update_outcome$/,bluetooth:/^switch-bluetooth_proxy$/,advertisements:/^sensor-ble_advertisements$/,metrics:/^number-metrics_interval$/,purge:/^button-purge_cache$/,cached:/^sensor-cached_data$/,testPlayback:/^button-test_playback$/,adb:/^switch-remote_adb$/,player:/^media_player-speaker$/,wakeWord:/^wake_word(_\d+)?$/,pipeline:/^pipeline(_\d+)?$/,vad:/^vad_sensitivity$/,ring:/^light-ring$/,segment:/^light-segment_(\d+)$/,whileMuted:/^select-ring_muted$/,onFailure:/^select-failure_effect$/,followsRoom:/^select-room_reaction$/,mute:/^switch-mic_mute$/,gain:/^number-microphone_gain$/,sensitivity:/^number-microphone_sensitivity$/,stopWord:/^number-stop_word_sensitivity$/,mixing:/^select-microphone_mixing$/,muteLamp:/^select-mute_led_brightness$/,leveling:/^switch-microphone_leveling$/,echo:/^switch-microphone_cancel_echo$/,roomLevel:/^sensor-room_level$/,roomFloor:/^sensor-room_floor$/,noise:/^select-noise_layer_(\d+)$/,headphones:/^binary_sensor-headphones$/,musicOnTurn:/^select-media_on_turn$/,ducking:/^number-media_duck_level$/,resampling:/^select-voice_resampling$/,wake:/^button-wake_assistant_\d+$/,threshold:/^number-wake_threshold_\d+$/,maxListen:/^number-max_listen_\d+$/,maxThink:/^number-max_think_\d+$/,followUp:/^number-follow_up_\d+$/,replyBuffer:/^number-reply_buffer_\d+$/,replyDelivery:/^select-reply_delivery_\d+$/,wakeEffect:/^select-wake_effect_\d+$/,wakeTone:/^select-wake_tone_\d+$/,ip:/^text_sensor-ip_address$/,wifiSignal:/^sensor-wifi_signal$/,wifiSent:/^sensor-wifi_sent$/,wifiReceived:/^sensor-wifi_received$/,cpuTemperature:/^sensor-cpu_temperature$/,radioTemperature:/^sensor-radio_temperature$/,cores:/^sensor-cpu_cores(_online)?$/,load:/^sensor-load_average$/,memory:/^sensor-memory_available$/,disk:/^sensor-free_space$/,lastWakeWord:/^text_sensor-last_wake_word$/,lastHeard:/^text_sensor-last_heard$/,lastReply:/^text_sensor-last_reply$/};function Jt(n,r){let e=ae(n);return r.map(t=>{let i=e?.get(t.entity_id);return{...t,key:i?.key??"",part:i?.part??0,label:i?.name??n.states[t.entity_id]?.attributes.friendly_name??t.entity_id}})}var Ue="echolocal-keys",Ne=null,nt=null;function ae(n){return Ne||(Ne=ki(n),Ne.then(()=>window.dispatchEvent(new Event(Ue))),Si(n)),nt}async function ki(n){let r=new Map;try{let e=await n.callWS({type:"config/entity_registry/list"});for(let t of e)t.device_id&&r.set(t.entity_id,{entityId:t.entity_id,deviceId:t.device_id,..._i(t.unique_id),platform:t.platform,name:t.name||t.original_name||t.entity_id,disabled:!!t.disabled_by})}catch{}return nt=r,r}function _i(n){let r=n.replace(/^(?:[0-9a-f]{2}:){5}[0-9a-f]{2}-?/i,""),e=r.lastIndexOf("@");return e<0?{key:r,part:0}:{key:r.slice(0,e),part:Number(r.slice(e+1))||0}}function Si(n){n.connection?.subscribeEvents(()=>{Ne=null,nt=null,ae(n)},"entity_registry_updated").catch(()=>{})}var De="echolocal_turn";var er="turn_audio";var Ai=[{key:"wake_ms",label:"Wake"},{key:"listen_ms",label:"Listen"},{key:"think_ms",label:"Think"},{key:"speak_ms",label:"Reply"}];function ke(n){return Ai.map(({key:r,label:e})=>({key:r,label:e,ms:Number(n[r]??0)})).filter(r=>r.ms>0)}function le(n){return ke(n).reduce((r,e)=>r+e.ms,0)}function We(n){let r=n;if(!r||r.version!=="1"||!r.wake_word)return null;let e={version:1,mac:(r.mac??"").toLowerCase(),id:r.id??"",slot:Qt(r.slot)??1,wake_word:r.wake_word,outcome:r.outcome??"completed"};r.heard&&(e.heard=r.heard),r.reply&&(e.reply=r.reply);for(let t of["wake_ms","listen_ms","think_ms","speak_ms","audio_seconds","peak_db","floor_db"]){let i=Qt(r[t]);i!==void 0&&(e[t]=i)}return e}function Qt(n){if(n===void 0||n==="")return;let r=Number(n);return Number.isFinite(r)?r:void 0}var tr=`:host {
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
`;var ot=new Map;function rr(n){return ot.get(n)}function ir(n,r,e){let i=`${r.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"")}_${e}`;return n?.services?.esphome?.[i]?i:void 0}async function sr(n,r,e){let t=ot.get(e);if(t)return t;let i=[],s="audio/wav",o=1;for(let l=0;l<Math.min(o,64);l++){let u=await Mi(n,r,e,l);if(!u)return null;o=u.pages||1,s=u.mime||s,i.push(Ti(u.data))}let a=URL.createObjectURL(new Blob(i,{type:s}));return ot.set(e,a),a}async function Mi(n,r,e,t){try{let s=(await n.callService("esphome",r,{id:e,page:t},void 0,!0,!0))?.response;return s?.version===1&&typeof s.data=="string"?s:null}catch{return null}}function Ti(n){let r=atob(n),e=new Uint8Array(r.length);for(let t=0;t<r.length;t++)e[t]=r.charCodeAt(t);return e}var nr=`:host {
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
`;var ce=null,O=class extends b{constructor(){super(...arguments);this.device="";this.turn="";this.filename="recording.wav";this.busy=!1;this.playing=!1;this.play=async()=>{if(this.playing){ce?.audio.pause();return}let e=await this.fetch();if(!e)return;ce?.stop();let t=new Audio(e),i=()=>{this.playing=!1,ce?.audio===t&&(ce=null)};t.addEventListener("ended",i),t.addEventListener("pause",i),ce={audio:t,stop:()=>t.pause()},this.playing=!0,t.play().catch(i)};this.save=async()=>{let e=await this.fetch();if(!e)return;let t=document.createElement("a");t.href=e,t.download=this.filename,t.click()}}disconnectedCallback(){super.disconnectedCallback(),this.playing&&ce?.audio.pause()}render(){return!this.turn||!this.action()?h:c`
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
    `}action(){return this.device?ir(this.hass,this.device,er):void 0}async fetch(){let e=rr(this.turn);if(e)return e;let t=this.action();if(!t)return null;this.busy=!0;try{return await sr(this.hass,t,this.turn)}finally{this.busy=!1}}};O.styles=y(nr),d([m({attribute:!1})],O.prototype,"hass",2),d([m()],O.prototype,"device",2),d([m()],O.prototype,"turn",2),d([m()],O.prototype,"filename",2),d([g()],O.prototype,"busy",2),d([g()],O.prototype,"playing",2),O=d([x("echolocal-recording")],O);var or=24,ar=12,Ei=4e3,T=class extends b{constructor(){super(...arguments);this.mac="";this.wake="";this.heard="";this.reply="";this.device="";this.recorded=[];this.live=[];this.asked=!1}updated(){this.asked||!this.hass||!this.wake||(this.asked=!0,this.load(),this.listen())}disconnectedCallback(){super.disconnectedCallback(),this.stop?.()}render(){let e=this.merged();return c`
      <div class="caption">
        Recent turns ${e.length?c`<span>last ${or} hours</span>`:h}
      </div>
      ${e.length?c`<div class="turns">${e.map(t=>this.row(t,this.scale(e)))}</div>`:c`<div class="none">${this.asked?"Nothing in the last day.":"Looking\u2026"}</div>`}
    `}scale(e){return Math.max(1,...e.map(t=>t.turn?le(t.turn):0))}row(e,t){let i=e.turn,s=i?ke(i):[],o=i?le(i):0;return c`<div class="turn">
      <div class="when">${zi(e.at)}</div>
      <div class="wake">${e.wake}</div>
      <div class="right">
        ${i?c`<div class="outcome" data-bad=${String(i.outcome!=="completed")}>
              ${i.outcome==="completed"?`${(o/1e3).toFixed(1)}s`:i.outcome}
            </div>`:h}
        ${i?.audio_seconds?c`<echolocal-recording
              .hass=${this.hass}
              .device=${this.device}
              .turn=${i.id}
              .filename=${Oi(e)}
            ></echolocal-recording>`:h}
      </div>
      ${e.heard?c`<div class="said">${e.heard}</div>`:h}
      ${e.reply?c`<div class="said-back">${e.reply}</div>`:h}
      ${s.length?c`<div class="bar">
              ${s.map(a=>c`<div
                  class="slice"
                  data-phase=${a.key}
                  title=${`${a.label} ${a.ms} ms`}
                  style=${`flex:0 0 ${a.ms/t*100}%`}
                ></div>`)}
            </div>
            <div class="legend">
              ${s.map(a=>c`<span>${a.label} ${(a.ms/1e3).toFixed(1)}s</span>`)}
            </div>`:h}
    </div>`}merged(){let e=[...this.live];for(let t of this.recorded)e.some(i=>Math.abs(i.at-t.at)<Ei)||e.push(t);return e.sort((t,i)=>i.at-t.at).slice(0,ar)}async load(){let e=[this.wake,this.heard,this.reply].filter(Boolean),t=new Date(Date.now()-or*36e5).toISOString();try{let i=await this.hass.callWS({type:"history/history_during_period",start_time:t,entity_ids:e,minimal_response:!0,no_attributes:!0});this.recorded=Ri(at(i[this.wake]),at(i[this.heard]),at(i[this.reply]))}catch{this.recorded=[]}}async listen(){if(this.hass.connection)try{this.stop=await this.hass.connection.subscribeEvents(e=>{let t=We(e.data);t&&(this.mac&&t.mac&&t.mac!==this.mac||(this.live=[{at:Date.now(),wake:t.wake_word,heard:t.heard,reply:t.reply,turn:t},...this.live].slice(0,ar)))},De)}catch{}}};T.styles=y(tr),d([m({attribute:!1})],T.prototype,"hass",2),d([m()],T.prototype,"mac",2),d([m()],T.prototype,"wake",2),d([m()],T.prototype,"heard",2),d([m()],T.prototype,"reply",2),d([m()],T.prototype,"device",2),d([g()],T.prototype,"recorded",2),d([g()],T.prototype,"live",2),d([g()],T.prototype,"asked",2),T=d([x("echolocal-history")],T);function at(n){return(n??[]).map(r=>({at:r.lu?r.lu*1e3:Date.parse(r.last_updated??""),value:r.s??r.state??""})).filter(r=>Number.isFinite(r.at)&&Pi(r.value))}function Ri(n,r,e){let t=[...n].sort((s,o)=>o.at-s.at),i=s=>[...s].sort((o,a)=>o.at-a.at);return t.map((s,o)=>{let a=t[o-1]?.at??1/0,l=u=>i(u).find(f=>f.at>=s.at&&f.at<a)?.value;return{at:s.at,wake:s.value,heard:l(r),reply:l(e)}})}function Pi(n){return!!n&&n!=="unknown"&&n!=="unavailable"&&n!=="None"}function zi(n){return new Date(n).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function Oi(n){let r=new Date(n.at).toISOString().replace(/[:.]/g,"-").slice(0,19),e=n.wake.toLowerCase().replace(/[^a-z0-9]+/g,"-");return`${r}-${e}.wav`}var lr=`:host {
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
`;var cr=`:host {
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
`;var lt=135,ct=270,Fe=100,je=100,de=78,Di={White:"mdi:grain",Pink:"mdi:blur",Brown:"mdi:waveform",Rain:"mdi:weather-pouring",Ocean:"mdi:waves",Brook:"mdi:water",Wind:"mdi:weather-windy",Fire:"mdi:fireplace",Crickets:"mdi:bug-outline",Fan:"mdi:fan",Cabin:"mdi:airplane"},pe="None",X=class extends b{constructor(){super(...arguments);this.player="";this.jack="";this.grab=e=>{let t=e.currentTarget;t.setPointerCapture(e.pointerId);let i=l=>{let u=t.getBoundingClientRect(),f=l.clientX-u.left-u.width/2,v=l.clientY-u.top-u.height/2,w=Math.atan2(v,f)*180/Math.PI-lt;for(;w<0;)w+=360;let $=Math.max(0,Math.min(1,Math.min(w,ct)/ct));return Math.round($*30)/30},s=l=>this.hass.callService("media_player","volume_set",{entity_id:this.player,volume_level:i(l)}),o=l=>s(l),a=l=>{t.removeEventListener("pointermove",o),t.removeEventListener("pointerup",a),t.removeEventListener("pointercancel",a),s(l)};t.addEventListener("pointermove",o),t.addEventListener("pointerup",a),t.addEventListener("pointercancel",a),s(e)}}render(){let e=this.hass.states[this.player];if(!e)return h;let t=Number(e.attributes.volume_level??0),i=e.attributes.is_volume_muted===!0,s=this.jack?this.hass.states[this.jack]?.state==="on":!1;return c`
      <div class="dial" @pointerdown=${this.grab}>
        <svg viewBox="0 0 200 200" role="img" aria-label="Volume">
          <path class="bed" d=${dr()} pathLength="100"></path>
          ${t>0?_`<path class="live" data-muted=${String(i)} d=${dr()} pathLength="100"
                stroke-dasharray=${`${t*100} 100`}></path>`:h}
          <text class="step" x=${Fe} y=${je+4}>${Math.round(t*30)}</text>
          <text class="of" x=${Fe} y=${je+20}>of 30</text>
        </svg>
      </div>

      <div class="side">
        <div class="state">${Wi(e.state)}</div>
        <div class="badges">
          <div class="badge" data-on=${String(i)}>
            <ha-icon .icon=${i?"mdi:volume-off":"mdi:volume-high"}></ha-icon>
            ${i?"Muted":`${Math.round(t*100)}%`}
          </div>
          ${this.jack?c`<div class="badge" data-on=${String(s)}>
                <ha-icon icon="mdi:headphones"></ha-icon>
                ${s?"Headphones":"Speaker"}
              </div>`:h}
        </div>
      </div>
    `}};X.styles=y(cr),d([m({attribute:!1})],X.prototype,"hass",2),d([m()],X.prototype,"player",2),d([m()],X.prototype,"jack",2),X=d([x("echolocal-volume")],X);var L=class extends b{constructor(){super(...arguments);this.layers=[];this.busy=!1}render(){let e=this.layers.map(o=>this.hass.states[o]?.state??pe),t=(this.hass.states[this.layers[0]]?.attributes.options??[]).filter(o=>o!==pe),i=e.every(o=>o!==pe),s=o=>e.indexOf(o);return c`
      <div class="caption">
        Generated sound
        <span>${i?"Both layers in use":`${e.filter(o=>o!==pe).length} of 2`}</span>
      </div>
      <div class="grid">
        ${t.map(o=>{let a=s(o);return c`<button
            class="sound"
            data-on=${String(a>=0)}
            ?disabled=${this.busy}
            @click=${()=>this.pick(o,a,e)}
          >
            <ha-icon .icon=${Di[o]??"mdi:music-note"}></ha-icon>
            ${o}
            ${a>=0&&this.layers.length>1?c`<span class="layer">${a+1}</span>`:h}
          </button>`})}
      </div>
    `}async pick(e,t,i){let s=i.findIndex(a=>a===pe),o=t>=0?t:s>=0?s:this.layers.length-1;if(!(o<0)){this.busy=!0;try{await this.hass.callService("select","select_option",{entity_id:this.layers[o],option:t>=0?pe:e})}finally{this.busy=!1}}}};L.styles=y(lr),d([m({attribute:!1})],L.prototype,"hass",2),d([m({attribute:!1})],L.prototype,"layers",2),d([g()],L.prototype,"busy",2),L=d([x("echolocal-noise")],L);function Wi(n){return n==="playing"?"Playing":n==="paused"?"Paused":n==="unavailable"?"Unavailable":"Idle"}function dr(){let n=lt*Math.PI/180,r=(lt+ct)*Math.PI/180;return`M${(Fe+de*Math.cos(n)).toFixed(2)} ${(je+de*Math.sin(n)).toFixed(2)}
    A${de} ${de} 0 1 1 ${(Fe+de*Math.cos(r)).toFixed(2)} ${(je+de*Math.sin(r)).toFixed(2)}`}var pr=`:host {
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
`;var I=class extends b{constructor(){super(...arguments);this.listen="";this.think="";this.held={}}render(){let e=this.reading(this.listen),t=this.reading(this.think);if(!e||!t)return h;let i=e.max+t.max,s=o=>o/i*100;return c`
      <div class="top">
        <div class="caption">A turn</div>
        <div class="total">
          longest <b>${(e.value+t.value).toFixed(0)}s</b> of ${i.toFixed(0)}s
        </div>
      </div>

      <div class="band">
        <div class="phase wake">Wake</div>
        <div class="phase listen" style=${`flex:0 0 ${s(e.value)}%`}>
          ${e.value>=3?"Listen":""}
        </div>
        <div class="phase think" style=${`flex:0 0 ${s(t.value)}%`}>
          ${t.value>=3?"Think":""}
        </div>
        <div class="phase reply">Reply</div>

        ${this.grip(this.listen,e,64,s(e.value))}
        ${this.grip(this.think,t,64,s(e.value)+s(t.value))}
      </div>

      <div class="legend">
        <span>Listening <b>${e.value}s</b></span>
        <span>Thinking <b>${t.value}s</b></span>
      </div>
    `}grip(e,t,i,s){return c`<div
      class="grip"
      style=${`left:calc(${i}px + ${s}% - ${i*s/100}px)`}
      role="slider"
      aria-label=${e}
      aria-valuenow=${t.value}
      @pointerdown=${o=>this.drag(o,e,t)}
    ></div>`}drag(e,t,i){let s=e.currentTarget.parentElement;s.setPointerCapture(e.pointerId);let o=t===this.listen?this.reading(this.think):this.reading(this.listen),a=t===this.think?this.reading(this.listen)?.value??0:0,l=(i.max??0)+(o?.max??0),u=w=>{let $=s.getBoundingClientRect(),S=64,E=$.width-S,Ke=Math.max(0,Math.min(1,(w.clientX-$.left-S)/E))*l-a,me=Math.round(Ke/(i.step||1))*(i.step||1);return Math.max(i.min,Math.min(i.max,me))},f=w=>{this.held={...this.held,[t]:u(w)}},v=w=>{s.removeEventListener("pointermove",f),s.removeEventListener("pointerup",v),s.removeEventListener("pointercancel",v);let $=u(w),{[t]:S,...E}=this.held;this.held=E,this.hass.callService("number","set_value",{entity_id:t,value:$})};s.addEventListener("pointermove",f),s.addEventListener("pointerup",v),s.addEventListener("pointercancel",v)}reading(e){let t=this.hass?.states?.[e];if(!t)return null;let i=this.held[e]??Number(t.state);return Number.isFinite(i)?{value:i,min:t.attributes.min??0,max:t.attributes.max??30,step:t.attributes.step??1}:null}};I.styles=y(pr),d([m({attribute:!1})],I.prototype,"hass",2),d([m()],I.prototype,"listen",2),d([m()],I.prototype,"think",2),d([g()],I.prototype,"held",2),I=d([x("echolocal-turn")],I);var M=class extends b{constructor(){super(...arguments);this.heading="";this.subtitle="";this.icon="";this.sections=[];this.widgets=[];this.strip=[];this.device="";this.mac="";this.help=!0;this.about="";this.held={}}render(){let e=this.sections.map(o=>({...o,entities:o.entities.filter(a=>this.hass.states?.[a])})).filter(o=>o.entities.length),i=e.reduce((o,a)=>o+a.entities.length,0)>3||this.widgets.some(o=>o.place!=="header")?820:460,s=`--mdc-dialog-min-width:min(94vw,${i}px);--mdc-dialog-max-width:min(94vw,${i}px)`;return c`
      <ha-dialog open hideActions style=${s} @closed=${this.dismiss}>
        <div class="sheet">
          <div class="head">
            <div class="crest"><ha-icon .icon=${this.icon}></ha-icon></div>
            <div class="titles">
              <div class="title">
                ${this.heading}
                ${this.help&&this.about?c`<echolocal-bubble .text=${this.about}></echolocal-bubble>`:h}
              </div>
              ${this.subtitle?c`<div class="subtitle">${this.subtitle}</div>`:h}
            </div>
            ${this.widgets.filter(o=>o.place==="header").map(o=>this.widget(o))}
          </div>
          ${this.widgets.filter(o=>o.place!=="header").map(o=>this.explained(o))}
          <div class="groups">
            ${e.length?e.map(o=>this.group(o)):this.widgets.length?h:c`<div class="empty">Nothing to show here.</div>`}
          </div>
        </div>
      </ha-dialog>
    `}widget({widget:e,roles:t,lists:i}){let s=o=>o?.[0]??"";switch(e){case"appearance":return c`<echolocal-appearance
          class="hero"
          .hass=${this.hass}
          .light=${t.light}
          .muted=${s(i.muted)}
          .failure=${s(i.failure)}
          .room=${s(i.room)}
        ></echolocal-appearance>`;case"array":return c`<echolocal-array
          class="hero"
          .hass=${this.hass}
          .level=${t.level}
          .floor=${t.floor}
          .gate=${t.gate}
          .mode=${t.mode}
          .muted=${this.muted}
        ></echolocal-array>`;case"history":return c`<echolocal-history
          class="hero"
          .hass=${this.hass}
          .wake=${t.wake}
          .heard=${t.heard??""}
          .reply=${t.reply??""}
          .device=${this.device}
          .mac=${this.mac}
        ></echolocal-history>`;case"turn":return c`<echolocal-turn
          class="hero"
          .hass=${this.hass}
          .listen=${t.listen}
          .think=${t.think}
        ></echolocal-turn>`;case"volume":return c`<echolocal-volume
          class="hero"
          .hass=${this.hass}
          .player=${t.player}
          .jack=${s(i.jack)}
        ></echolocal-volume>`;case"noise":return c`<echolocal-noise
          class="hero"
          .hass=${this.hass}
          .layers=${i.layers??[]}
        ></echolocal-noise>`;case"player":return this.crownPlayer(t.player);case"power":return this.crownPower(t.light);case"mute":return this.crownMute(t.mute,t.lamp)}}crownPlayer(e){let t=this.hass.states[e],i=t?.state==="playing",s=t?.attributes.is_volume_muted!==!0;return c`<div class="crown">
      <button
        class="round"
        aria-label=${i?"Pause":"Play"}
        @click=${()=>this.hass.callService("media_player",i?"media_pause":"media_play",{entity_id:e})}
      >
        <ha-icon .icon=${i?"mdi:pause":"mdi:play"}></ha-icon>
      </button>
      <button
        class="toggle big power"
        data-on=${String(s)}
        aria-label="Sound"
        @click=${()=>this.hass.callService("media_player","volume_mute",{entity_id:e,is_volume_muted:s})}
      ></button>
    </div>`}crownPower(e){return c`<div class="crown">
      <button
        class="toggle big power"
        data-on=${String(this.hass.states[e]?.state==="on")}
        aria-label="Ring"
        @click=${()=>this.hass.callService("light","toggle",{entity_id:e})}
      ></button>
    </div>`}crownMute(e,t){let i=this.hass.states[t];return c`<div class="crown">
      ${i?c`<div class="lamp" title="Mute indicator">
            <ha-icon icon="mdi:brightness-6"></ha-icon>
            ${(i.attributes.options??[]).map(s=>c`<button
                class="pip"
                data-on=${String(s===i.state)}
                @click=${()=>this.hass.callService("select","select_option",{entity_id:t,option:s})}
              >
                ${s}
              </button>`)}
          </div>`:h}
      <button
        class="toggle big"
        data-on=${String(this.hass.states[e]?.state==="on")}
        aria-label="Microphone mute"
        @click=${()=>this.hass.callService("switch","toggle",{entity_id:e})}
      ></button>
    </div>`}get muted(){let e=this.widgets.find(t=>t.roles.mute)?.roles.mute;return!!e&&this.hass.states[e]?.state==="on"}explained(e){let t=this.help?Lt(e.widget):void 0;return t?c`<div class="explained">
      ${this.widget(e)}
      <echolocal-bubble class="corner" .text=${t}></echolocal-bubble>
    </div>`:this.widget(e)}group(e){return c`<section class="group">
      ${e.title?c`<div class="section">${e.title}</div>`:h}
      ${e.entities.map(t=>this.row(t))}
    </section>`}row(e){let t=this.hass.states?.[e];if(!t)return h;let i=e.split(".")[0],s=this.name(e),o=t.attributes.icon;switch(i){case"switch":case"light":return this.toggle(e,s,o,i);case"number":return this.slider(e,s,o);case"select":return this.options(e,s,o);case"button":return this.press(e,s,o);default:return this.reading(e,s,o)}}toggle(e,t,i,s){let o=this.hass.states[e].state,a=o==="unavailable"?"unavailable":String(o==="on");return this.tile(e,t,i,a==="true",{trail:c`<button
        class="toggle"
        data-on=${a}
        aria-label=${t}
        @click=${()=>this.hass.callService(s,"toggle",{entity_id:e})}
      ></button>`})}slider(e,t,i){let s=this.hass.states[e],o=s.attributes,a=o.min??0,l=o.max??100,u=this.held[e]??Number(s.state),f=l>a?(u-a)/(l-a)*100:0;return this.tile(e,t,i,!1,{trail:c`<span class="reading">${Number.isNaN(u)?"\u2014":u}</span>
        ${o.unit_of_measurement?c`<span class="unit">${o.unit_of_measurement}</span>`:h}`,under:c`<input
        type="range"
        style="--fill:${f}%"
        .value=${String(u)}
        min=${a}
        max=${l}
        step=${o.step??1}
        ?disabled=${s.state==="unavailable"}
        @input=${v=>{this.held={...this.held,[e]:Number(v.target.value)}}}
        @change=${v=>{let w=Number(v.target.value),{[e]:$,...S}=this.held;this.held=S,this.hass.callService("number","set_value",{entity_id:e,value:w})}}
      />`})}options(e,t,i){let s=this.hass.states[e],o=s.attributes.options??[],a=l=>this.hass.callService("select","select_option",{entity_id:e,option:l});return o.length>4?this.tile(e,t,i,!1,{under:c`<select
          ?disabled=${s.state==="unavailable"}
          @change=${l=>a(l.target.value)}
        >
          ${o.map(l=>c`<option value=${l} ?selected=${l===s.state}>${l}</option>`)}
        </select>`}):this.tile(e,t,i,!1,{under:c`<div class="options">
        ${o.map(l=>c`<button
            class="chip"
            data-on=${String(l===s.state)}
            @click=${()=>a(l)}
          >
            ${l}
          </button>`)}
      </div>`})}press(e,t,i){return this.tile(e,t,i,!1,{trail:c`<button
        class="press"
        @click=${()=>this.hass.callService("button","press",{entity_id:e})}
      >
        Run
      </button>`})}reading(e,t,i){let s=this.hass.states[e],o=s.attributes.unit_of_measurement;return this.tile(e,t,i,!1,{trail:c`<button class="reading" @click=${()=>this.moreInfo(e)}>
          ${s.state}
        </button>
        ${o?c`<span class="unit">${o}</span>`:h}`})}tile(e,t,i,s,o){let a=s&&i?.includes("mic")&&i.includes("off"),l=this.help?Xt(e):void 0;return c`<div class="tile" data-active=${String(s&&!a)} data-alert=${String(!!a)}>
      <div class="top">
        <div class="icon"><ha-icon .icon=${i??"mdi:tune"}></ha-icon></div>
        <div class="named">
          <div class="name">${t}</div>
          ${l?c`<echolocal-bubble .text=${l}></echolocal-bubble>`:h}
        </div>
        ${o.trail?c`<div class="trail">${o.trail}</div>`:h}
      </div>
      ${o.under??h}
    </div>`}name(e){let t=ae(this.hass)?.get(e);if(t)return t.name;let i=this.hass.states[e]?.attributes.friendly_name??e,s=this.strip.filter(Boolean).sort((o,a)=>a.length-o.length);for(let o=!0;o;){o=!1;for(let a of s)if(i.toLowerCase().startsWith(`${a.toLowerCase()} `)){i=i.slice(a.length+1),o=!0;break}}return i.charAt(0).toUpperCase()+i.slice(1)}moreInfo(e){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))}dismiss(){this.dispatchEvent(new CustomEvent("closed",{bubbles:!0,composed:!0}))}};M.styles=y(Yt),d([m({attribute:!1})],M.prototype,"hass",2),d([m()],M.prototype,"heading",2),d([m()],M.prototype,"subtitle",2),d([m()],M.prototype,"icon",2),d([m({attribute:!1})],M.prototype,"sections",2),d([m({attribute:!1})],M.prototype,"widgets",2),d([m({attribute:!1})],M.prototype,"strip",2),d([m()],M.prototype,"device",2),d([m()],M.prototype,"mac",2),d([m({type:Boolean})],M.prototype,"help",2),d([m()],M.prototype,"about",2),d([g()],M.prototype,"held",2),M=d([x("echolocal-dialog")],M);var ji="EchoLocal",qi="esphome",_e=12;function Bi(n){return!!n?.identifiers?.some(([r])=>r===qi)}function hr(n,r){return Object.values(n.devices??{}).filter(e=>e.via_device_id===r&&!e.disabled_by).sort((e,t)=>k(e).localeCompare(k(t)))}function H(n){return n?Object.values(n.devices??{}).filter(r=>Ii(n,r.id)&&!r.via_device_id&&!r.disabled_by).sort((r,e)=>k(r).localeCompare(k(e))):[]}function k(n){return n?.name_by_user||n?.name||""}function Ii(n,r){return n?.devices?.[r]?.manufacturer!==ji?!1:hr(n,r).some(Bi)}function K(n,r){if(!n||!r)return null;let e=n.devices?.[r];if(!e)return null;let t=hr(n,r),i=new Set([r,...t.map(l=>l.id)]),s=Jt(n,Object.values(n.entities??{}).filter(l=>l.device_id&&i.has(l.device_id)&&!l.hidden)),o=l=>s.find(u=>l.test(u.key))?.entity_id,a=new Array(_e).fill(void 0);for(let l of s){let u=Number(l.key.match(p.segment)?.[1]??0)-1;u>=0&&u<_e&&(a[u]=l.entity_id)}return{device:e,parts:t,entities:s,satellite:s.find(l=>l.key==="assist_satellite")?.entity_id,player:o(p.player),update:o(p.firmware),ring:o(p.ring),segments:a,mute:o(p.mute)}}function dt(n,r){let e=t=>n.entities.some(i=>i.device_id===r.id&&t.test(i.key));return e(p.ring)||e(p.segment)?"ring":e(p.mute)||e(p.gain)?"microphone":e(p.noise)||e(p.headphones)?"playback":"assistant"}function ur(n,r){return n.entities.filter(e=>e.device_id===r)}function mr(n){return n.entities.filter(r=>p.wake.test(r.key)).sort((r,e)=>r.key.localeCompare(e.key)).map(r=>r.entity_id)}function Se(n,r){let e=r?n?.states?.[r]:void 0;return!e||e.state!=="on"?null:{rgb:e.attributes.rgb_color??[255,255,255],level:(e.attributes.brightness??255)/255}}function gr(n,r){return!!r&&n?.states?.[r]?.state==="on"}function fr(n,r){return(r?n?.states?.[r]?.state:void 0)??"unavailable"}var pt={ring:[{title:null,rows:[p.ring]},{title:"Segments",rows:[p.segment]}],microphone:[{title:null,rows:[p.mute]},{title:"Capture",rows:[p.gain,p.mixing,p.leveling,p.echo]},{title:"The room",rows:[p.sensitivity,p.roomLevel,p.roomFloor,p.stopWord]},{title:"Indicator",rows:[p.muteLamp]}],playback:[{title:null,rows:[p.headphones]},{title:"Generated sound",rows:[p.noise]},{title:"During a turn",rows:[p.musicOnTurn,p.ducking]},{title:"Voice",rows:[p.resampling]}],assistant:[{title:null,rows:[p.threshold]},{title:"Timing",rows:[p.maxListen,p.maxThink,p.followUp]},{title:"Feedback",rows:[p.wakeEffect,p.wakeTone]},{title:"Reply",rows:[p.replyBuffer,p.replyDelivery]}],device:[{title:null,rows:[p.firmware,p.wakeWord,p.pipeline,p.updateChannel,p.checkUpdates]},{title:"Listening",rows:[p.vad]},{title:"Bluetooth",rows:[p.bluetooth,p.advertisements]},{title:"Maintenance",rows:[p.metrics,p.purge,p.cached,p.testPlayback]}],diagnostics:[{title:"Network",rows:[p.ip,p.wifiSignal,p.wifiSent,p.wifiReceived]},{title:"Hardware",rows:[p.cpuTemperature,p.radioTemperature,p.cores,p.load,p.memory,p.disk]},{title:"The room",rows:[p.roomLevel,p.roomFloor]},{title:"Last turn",rows:[p.lastWakeWord,p.lastHeard,p.lastReply]},{title:"Access",rows:[p.adb,p.updateStatus,p.updateOutcome]}]},Ki={ring:[{widget:"power",place:"header",roles:{light:p.ring}},{widget:"appearance",roles:{light:p.ring},lists:{segments:p.segment,muted:p.whileMuted,failure:p.onFailure,room:p.followsRoom}}],assistant:[{widget:"turn",roles:{listen:p.maxListen,think:p.maxThink}}],playback:[{widget:"player",place:"header",roles:{player:p.player}},{widget:"volume",roles:{player:p.player},lists:{jack:p.headphones}},{widget:"noise",roles:{first:p.noise},lists:{layers:p.noise}}],microphone:[{widget:"mute",place:"header",roles:{mute:p.mute,lamp:p.muteLamp}},{widget:"array",roles:{level:p.roomLevel,floor:p.roomFloor,gate:p.sensitivity,mode:p.mixing}}]};function vr(n,r){let e=[],t=new Set;for(let i of Ki[n]??[]){let s={};for(let[a,l]of Object.entries(i.roles)){let u=r.find(f=>l.test(f.key));u&&(s[a]=u.entity_id)}if(Object.keys(s).length!==Object.keys(i.roles).length)continue;let o={};for(let[a,l]of Object.entries(i.lists??{}))o[a]=r.filter(u=>l.test(u.key)).sort(xr).map(u=>u.entity_id);e.push({widget:i.widget,place:i.place??"body",roles:s,lists:o}),[...Object.values(s),...Object.values(o).flat()].forEach(a=>t.add(a))}return{widgets:e,sections:ht(pt[n],r.filter(i=>!t.has(i.entity_id)))}}function br(n,r){let e=[],t=[[n.device,!0],...n.parts.map(i=>[i,!1])];for(let[i,s]of t){let o=n.entities.filter(l=>l.device_id===i.id&&(l.entity_category==="config"||s&&!l.entity_category));if(!o.length)continue;let a=ht(pt[s?"device":r[i.id]],o);e.push({title:k(i),entities:a.flatMap(l=>l.entities)})}return e}function yr(n){let r=n.entities.filter(s=>s.entity_category==="diagnostic"),e={};for(let[s,o]of Object.entries({wake:p.lastWakeWord,heard:p.lastHeard,reply:p.lastReply})){let a=r.find(l=>o.test(l.key));a&&(e[s]=a.entity_id)}let t=e.wake?[{widget:"history",place:"body",roles:e,lists:{}}]:[],i=new Set(Object.values(e));return{widgets:t,sections:ht(pt.diagnostics,r.filter(s=>!i.has(s.entity_id)))}}function xr(n,r){let e=t=>Number.parseInt(t.key.match(/_(\d+)$/)?.[1]??"0",10);return e(n)-e(r)}function ht(n,r){let e=new Set(r),t=[];for(let i of n??[]){let s=[];for(let o of i.rows)for(let a of[...e].sort(xr))o.test(a.key)&&(s.push(a.entity_id),e.delete(a));s.length&&t.push({title:i.title,entities:s})}return e.size&&t.push({title:t.length?"More":null,entities:[...e].sort((i,s)=>i.label.localeCompare(s.label)).map(i=>i.entity_id)}),t}async function wr(n,r){let e=new Array(_e).fill(void 0);if(!n.user?.is_admin)return e;try{let t=await n.callWS({type:"config/entity_registry/list"});for(let i of t){if(!i.disabled_by||!i.device_id||!r.has(i.device_id))continue;let s=i.unique_id.replace(/^(?:[0-9a-f]{2}:){5}[0-9a-f]{2}-?/i,"").split("@")[0],o=Number(s.match(p.segment)?.[1]??0)-1;o>=0&&o<_e&&(e[o]=i.entity_id)}}catch{}return e}async function $r(n,r){await n.callWS({type:"config/entity_registry/update",entity_id:r,disabled_by:null})}var he={ring:"mdi:record-circle-outline",microphone:"mdi:microphone",playback:"mdi:speaker",assistant:"mdi:account-voice",device:"mdi:cog-outline",diagnostics:"mdi:stethoscope",follow:"mdi:backup-restore",close:"mdi:check"},Gi=[["White",[255,255,255]],["Warm",[255,190,120]],["Red",[255,40,40]],["Orange",[255,130,20]],["Yellow",[250,230,60]],["Green",[60,220,90]],["Teal",[40,220,200]],["Blue",[60,140,255]],["Violet",[150,90,255]],["Pink",[255,90,200]]],Yi={idle:"Idle",listening:"Listening",processing:"Thinking",responding:"Speaking",unavailable:"Unavailable",unknown:"Unknown"},P=class extends b{constructor(){super(...arguments);this.opened=null;this.picked=null;this.holding=!1;this.timer=0;this.hiddenSegments=[];this.offering=null;this.asked=!1}static getConfigElement(){return document.createElement("echolocal-satellite-card-editor")}static getStubConfig(e){return{device_id:H(e)[0]?.id??""}}setConfig(e){if(!e?.device_id)throw new Error("Choose an EchoLocal device");this.config={shell:"grey",...e}}getCardSize(){return 6}updated(){if(this.asked||!this.hass||!this.config)return;let e=K(this.hass,this.config.device_id);!e||e.segments.some(Boolean)||(this.asked=!0,wr(this.hass,new Set([e.device.id,...e.parts.map(t=>t.id)])).then(t=>this.hiddenSegments=t))}render(){if(!this.hass||!this.config)return h;let e=K(this.hass,this.config.device_id);if(!e)return c`<ha-card><div class="missing">Device not found</div></ha-card>`;let t=fr(this.hass,e.satellite);return c`
      <ha-card>
        <div class="frame">
          <div class="art" data-shell=${this.config.shell??"grey"} data-activity=${t}>
            ${Ft({segments:this.segments(e),glow:this.glow(e),muted:gr(this.hass,e.mute),holding:this.holding,picked:this.picked,divisible:[...e.segments,...this.hiddenSegments].some(Boolean)},{ring:()=>this.moreInfo(e.ring),segment:i=>this.tapped(e,i),action:i=>this.pressed(e,i),mute:()=>this.toggle("switch",e.mute),volume:i=>this.volume(e,i)})}
          </div>

          <div class="side">${this.side(e)}</div>

          ${this.offering!==null?this.offer(this.offering):this.picked===null?this.foot(e,t):this.palette(e)}
        </div>
      </ha-card>

      ${this.popup(e)}
    `}foot(e,t){return c`<div class="foot">
      <div class="label">
        <div class="name">${k(e.device)}</div>
        <div class="status">${Yi[t]??t}</div>
      </div>
      <div class="tail">
        ${this.square(he.device,"Settings",()=>this.open({kind:"device",cross:"settings"}))}
        ${this.square(he.diagnostics,"Diagnostics",()=>this.open({kind:"diagnostics",cross:"diagnostics"}))}
      </div>
    </div>`}tapped(e,t){if(e.segments[t]){this.picked=this.picked===t?null:t;return}if(this.hiddenSegments[t]){this.offering=t;return}this.moreInfo(e.ring)}offer(e){let t=async i=>{for(let s of i)s&&await $r(this.hass,s);this.hiddenSegments=this.hiddenSegments.map(s=>i.includes(s)?void 0:s),this.offering=null,this.picked=e};return c`<div class="foot">
      <div class="label">
        <div class="name">Segment ${e+1} disabled</div>
      </div>
      <div class="tail">
        <button class="plain" @click=${()=>t([this.hiddenSegments[e]])}>Enable</button>
        <button class="plain" @click=${()=>t(this.hiddenSegments)}>Enable all</button>
        <button class="plain quiet" @click=${()=>this.offering=null}>Cancel</button>
      </div>
    </div>`}palette(e){let t=e.segments[this.picked];return c`<div class="foot palette">
      <div class="top">
        <div class="name">Segment ${this.picked+1}</div>
        <div class="tail">
          ${this.square(he.follow,"Follow the ring",()=>{this.hass.callService("light","turn_off",{entity_id:t}),this.picked=null})}
          ${this.square(he.close,"Done",()=>this.picked=null)}
        </div>
      </div>
      <div class="swatches">
        ${Gi.map(([i,s])=>c`<button
            class="swatch"
            title=${i}
            aria-label=${i}
            style=${`background:rgb(${s.join(",")})`}
            @click=${()=>this.hass.callService("light","turn_on",{entity_id:t,rgb_color:s})}
          ></button>`)}
      </div>
    </div>`}segments(e){let t=Se(this.hass,e.ring);return Array.from({length:$e},(i,s)=>{let o=Se(this.hass,e.segments[s])??t;return{fill:o?`rgb(${o.rgb.join(",")})`:"var(--el-ring-off)",opacity:o?.25+.75*o.level:1}})}glow(e){return Se(this.hass,e.ring)||e.segments.some(i=>Se(this.hass,i))?.55:0}kinds(e){return Object.fromEntries(e.parts.map(t=>[t.id,dt(e,t)]))}side(e){let t=e.parts.map(o=>dt(e,o)),i=t.filter(o=>o==="assistant").length,s=0;return e.parts.map((o,a)=>{let l=t[a],u=l==="assistant"?++s:void 0,f=l==="assistant"&&i>1?u:null;return this.square(he[l],k(o),()=>this.open({kind:l,part:o,slot:u}),f)})}square(e,t,i,s=null){return c`<button class="sq" title=${t} aria-label=${t} @click=${i}>
      <ha-icon .icon=${e}></ha-icon>
      ${s?c`<span class="badge">${s}</span>`:h}
    </button>`}popup(e){if(!this.opened)return h;let{kind:t,part:i,cross:s}=this.opened,o,a=[],l,u=[k(e.device)];if(s==="settings")o=br(e,this.kinds(e)),l="Settings";else if(s==="diagnostics")({widgets:a,sections:o}=yr(e)),l="Diagnostics";else if(i)({widgets:a,sections:o}=vr(t,ur(e,i.id))),l=k(i),u.push(l);else return h;return c`<echolocal-dialog
      .hass=${this.hass}
      .heading=${l}
      .subtitle=${k(e.device)}
      .icon=${he[t]}
      .sections=${o}
      .widgets=${a}
      .strip=${u}
      .device=${k(e.device)}
      .mac=${e.device.connections?.find(([f])=>f==="mac")?.[1]??""}
      .help=${this.config.help!==!1}
      .about=${Zt(t)}
      @closed=${()=>this.opened=null}
    ></echolocal-dialog>`}open(e){this.opened=e}pressed(e,t){if(t==="down"){this.holding=!1,this.timer=window.setTimeout(()=>this.holding=!0,Wt);return}clearTimeout(this.timer);let i=this.holding;if(this.holding=!1,t==="cancel")return;let s=mr(e),o=s[i&&s.length>1?1:0];o?this.hass.callService("button","press",{entity_id:o}):this.moreInfo(e.satellite)}toggle(e,t){t&&this.hass.callService(e,"toggle",{entity_id:t})}volume(e,t){e.player&&this.hass.callService("media_player",t>0?"volume_up":"volume_down",{entity_id:e.player})}moreInfo(e){e&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))}};P.styles=y(jt),d([m({attribute:!1})],P.prototype,"hass",2),d([g()],P.prototype,"config",2),d([g()],P.prototype,"opened",2),d([g()],P.prototype,"picked",2),d([g()],P.prototype,"holding",2),d([g()],P.prototype,"hiddenSegments",2),d([g()],P.prototype,"offering",2),P=d([x("echolocal-satellite-card")],P);var ue=class extends b{setConfig(r){this.config={shell:"grey",...r}}render(){if(!this.hass||!this.config)return h;let r=H(this.hass);return c`
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
        <select @change=${e=>this.emit({device_id:e.target.value})}>
          ${r.map(e=>c`<option
              value=${e.id}
              ?selected=${e.id===this.config.device_id}
            >
              ${k(e)}
            </option>`)}
        </select>
      </div>
      <div class="field">
        <label>Shell</label>
        <select
          @change=${e=>this.emit({shell:e.target.value})}
        >
          ${[["grey","Grey (unknown)"],["black","Black"],["white","White"]].map(([e,t])=>c`<option value=${e} ?selected=${(this.config.shell??"grey")===e}>
                ${t}
              </option>`)}
        </select>
      </div>
    `}emit(r){this.config={...this.config,...r},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}};d([m({attribute:!1})],ue.prototype,"hass",2),d([g()],ue.prototype,"config",2),ue=d([x("echolocal-satellite-card-editor")],ue);var ut=[];function W(n){ut.push(n),ut.sort((r,e)=>r.order-e.order||r.title.localeCompare(e.title))}function gt(n){return ut.filter(r=>n||!r.admin)}function kr(n,r){let e=mt(n),t=gt(r);return t.find(i=>i.path===e)??t[0]}function _r(n,r){let e=r?`${n}/${r}`:n;location.pathname!==e&&history.pushState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}function ft(n,r){if(r!==void 0)return mt(r);let e=location.pathname;return mt(e.startsWith(n)?e.slice(n.length):"")}function mt(n){return n.replace(/^\/+|\/+$/g,"")}var Sr=`:host {
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
`;var vt="";async function qe(n){try{return await n.callWS({type:"config/label_registry/list"})??[]}catch{return[]}}function Be(n,r){let e=new Map,t=[];for(let s of n){let o=s.labels??[];if(!o.length){t.push(s);continue}for(let a of o){let l=r.find(f=>f.label_id===a),u=e.get(a);u?u.devices.push(s):e.set(a,{id:a,name:l?.name??a,icon:l?.icon,devices:[s]})}}let i=[...e.values()].sort((s,o)=>s.name.localeCompare(o.name));return t.length&&i.push({id:vt,name:"Ungrouped",devices:t}),i}async function Ar(n,r){try{return await n.callWS({type:"config/label_registry/create",name:r})}catch{return null}}async function Cr(n,r,e){await n.callWS({type:"config/label_registry/update",label_id:r,name:e})}async function Mr(n,r){await n.callWS({type:"config/label_registry/delete",label_id:r})}async function Tr(n,r,e){await n.callWS({type:"config/device_registry/update",device_id:r,labels:[...new Set(e)]})}async function Hr(n,r,e,t){let i=0,s=0,o=0;return await Promise.all(r.map(async a=>{let l=Er(n,a,e);if(!l){o+=1;return}try{await t(l),i+=1}catch{s+=1}})),{done:i,failed:s,missing:o}}function Ie(n,r,e){let t=r.map(s=>Er(n,s,e)).filter(s=>!!s),i=[...new Set(t.map(s=>n.states[s]?.state).filter(Boolean))];return{value:i.length===1?i[0]:null,mixed:i.length>1,entities:t}}function Er(n,r,e){let t=K(n,r.id);if(t)return t.entities.find(i=>e.test(i.key))?.entity_id}var Rr=`:host {
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
`;var Pr=p.mute,zr=p.ring,Or=p.player,Z=class extends b{constructor(){super(...arguments);this.said=""}render(){if(!this.hass||!this.group)return h;let e=this.group.devices,t=Ie(this.hass,e,Pr),i=Ie(this.hass,e,zr);return c`<div class="bar">
      ${this.group.icon?c`<ha-icon .icon=${this.group.icon}></ha-icon>`:h}
      <div class="name">${this.group.name}</div>
      <div class="count">${e.length} ${e.length===1?"device":"devices"}</div>
      <div class="spacer"></div>
      ${this.said?c`<div class="short">${this.said}</div>`:h}

      ${t.entities.length?this.toggle("mdi:microphone-off","Mute all",t,()=>this.write(Pr,"switch",t.value==="on"?"turn_off":"turn_on")):h}
      ${i.entities.length?this.toggle("mdi:lightbulb-outline","Ring",i,()=>this.write(zr,"light",i.value==="on"?"turn_off":"turn_on")):h}
      ${this.has(Or)?c`<button title="Stop whatever is playing" @click=${()=>this.write(Or,"media_player","media_stop")}>
            <ha-icon icon="mdi:stop"></ha-icon>Stop
          </button>`:h}
    </div>`}toggle(e,t,i,s){return c`<button data-on=${String(i.value==="on")} @click=${s}>
      <ha-icon .icon=${e}></ha-icon>${t}
      ${i.mixed?c`<span class="mixed">mixed</span>`:h}
    </button>`}has(e){return Ie(this.hass,this.group.devices,e).entities.length>0}async write(e,t,i){let{done:s,failed:o,missing:a}=await Hr(this.hass,this.group.devices,e,u=>this.hass.callService(t,i,{entity_id:u})),l=o+a;this.said=l?`${s} of ${s+l}`:"",this.said&&setTimeout(()=>this.said="",4e3)}};Z.styles=y(Rr),d([m({attribute:!1})],Z.prototype,"hass",2),d([m({attribute:!1})],Z.prototype,"group",2),d([g()],Z.prototype,"said",2),Z=d([x("echolocal-groupbar")],Z);var Nr=`:host {
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
`;W({path:"",title:"Home",icon:"mdi:view-grid-outline",element:"echolocal-home",order:0});var Ur="echolocal:home:grouped",F=class extends b{constructor(){super(...arguments);this.narrow=!1;this.known=[];this.asked=!1;this.grouped=localStorage.getItem(Ur)!=="no";this.cards=new Map}updated(){this.asked||!this.hass||(this.asked=!0,this.load())}render(){if(!this.hass)return h;let e=H(this.hass);if(!e.length)return c`<div class="empty">
        No EchoLocal devices yet. One appears here once Home Assistant has adopted it over the ESPHome
        integration.
      </div>`;let t=Be(e,this.known),i=t.some(o=>o.id!==vt),s=this.grouped&&i?t:[{id:"all",name:"All devices",devices:e}];return c`
      ${i?c`<div class="view">
            <div class="pair">
              ${this.button(!0,"mdi:group","Grouped")}${this.button(!1,"mdi:view-grid-outline","All")}
            </div>
          </div>`:h}
      ${s.map(o=>this.group(o))}
    `}button(e,t,i){return c`<button
      data-on=${String(this.grouped===e)}
      @click=${()=>{this.grouped=e,localStorage.setItem(Ur,e?"yes":"no")}}
    >
      <ha-icon .icon=${t}></ha-icon>${i}
    </button>`}group(e){return c`<div class="group">
      <echolocal-groupbar .hass=${this.hass} .group=${e}></echolocal-groupbar>
      <div class="grid">${e.devices.map(t=>this.card(e.id,t.id))}</div>
    </div>`}card(e,t){let i=`${e}/${t}`,s=this.cards.get(i);return s||(s=document.createElement("echolocal-satellite-card"),s.setConfig({device_id:t}),this.cards.set(i,s)),s.hass=this.hass,s}async load(){this.known=await qe(this.hass)}};F.styles=y(Nr),d([m({attribute:!1})],F.prototype,"hass",2),d([m({type:Boolean})],F.prototype,"narrow",2),d([g()],F.prototype,"known",2),d([g()],F.prototype,"asked",2),d([g()],F.prototype,"grouped",2),F=d([x("echolocal-home")],F);var Dr=`:host {
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
`;W({path:"groups",title:"Groups",icon:"mdi:group",element:"echolocal-groups",order:30,admin:!0});var j=class extends b{constructor(){super(...arguments);this.known=[];this.asked=!1;this.naming="";this.busy=!1}connectedCallback(){super.connectedCallback(),this.hass?.connection?.subscribeEvents(()=>this.load(),"label_registry_updated").then(e=>this.stop=e).catch(()=>{})}disconnectedCallback(){super.disconnectedCallback(),this.stop?.()}updated(){this.asked||!this.hass||(this.asked=!0,this.load())}render(){if(!this.hass)return h;let e=H(this.hass),t=this.known;return c`
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

      ${e.length?c`<table>
            <thead>
              <tr>
                <th class="who">Device</th>
                ${t.map(i=>this.head(i))}
              </tr>
            </thead>
            <tbody>
              ${e.map(i=>this.row(i,t))}
            </tbody>
          </table>`:c`<div class="none">
            No EchoLocal devices yet, so there is nothing to group.
          </div>`}
    `}head(e){let t=Be(H(this.hass),this.known).find(i=>i.id===e.label_id)?.devices.length;return c`<th>
      <div class="label">
        <input
          .value=${e.name}
          style=${`width:${Math.max(6,e.name.length+1)}ch`}
          @change=${i=>this.rename(e,i.target.value)}
        />
        <button
          aria-label="Delete ${e.name}"
          title=${t?`${t} still in it`:"Delete this group"}
          @click=${()=>this.discard(e)}
        >
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </div>
    </th>`}row(e,t){let i=e.labels??[];return c`<tr>
      <td class="who">${k(e)}</td>
      ${t.map(s=>c`<td>
          <input
            type="checkbox"
            aria-label="${k(e)} in ${s.name}"
            .checked=${i.includes(s.label_id)}
            @change=${o=>this.set(e,s.label_id,o.target.checked)}
          />
        </td>`)}
    </tr>`}async make(){let e=this.naming.trim();if(!e||this.busy)return;this.busy=!0,this.naming="";let t=await Ar(this.hass,e);t&&(this.known=[...this.known,t].sort((i,s)=>i.name.localeCompare(s.name))),this.busy=!1,t||await this.load()}async rename(e,t){!t.trim()||t===e.name||(this.known=this.known.map(i=>i.label_id===e.label_id?{...i,name:t.trim()}:i),await Cr(this.hass,e.label_id,t.trim()))}async discard(e){this.known=this.known.filter(t=>t.label_id!==e.label_id),await Mr(this.hass,e.label_id)}async set(e,t,i){let s=new Set(e.labels??[]);i?s.add(t):s.delete(t),await Tr(this.hass,e.id,[...s])}async load(){this.known=await qe(this.hass)}};j.styles=y(Dr),d([m({attribute:!1})],j.prototype,"hass",2),d([g()],j.prototype,"known",2),d([g()],j.prototype,"asked",2),d([g()],j.prototype,"naming",2),d([g()],j.prototype,"busy",2),j=d([x("echolocal-groups")],j);var Wr=`:host {
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
`;W({path:"activity",title:"Activity",icon:"mdi:timeline-text-outline",element:"echolocal-activity",order:20});var Qi=60,G=class extends b{constructor(){super(...arguments);this.seen=[];this.only="";this.asked=!1}updated(){this.asked||!this.hass||(this.asked=!0,this.listen())}disconnectedCallback(){super.disconnectedCallback(),this.stop?.()}render(){if(!this.hass)return h;let e=this.names(),t=this.only?this.seen.filter(s=>s.turn.mac===this.only):this.seen,i=Math.max(1,...t.map(s=>le(s.turn)));return c`
      ${this.seen.length>0&&Object.keys(e).length>1?c`<div class="filters">
            <button data-on=${String(!this.only)} @click=${()=>this.only=""}>Everything</button>
            ${[...new Set(this.seen.map(s=>s.turn.mac))].map(s=>c`<button
                data-on=${String(this.only===s)}
                @click=${()=>this.only=s}
              >
                ${e[s]??s}
              </button>`)}
          </div>`:h}

      ${t.length?c`<div class="legend">
              ${[["wake_ms","Wake"],["listen_ms","Listen"],["think_ms","Think"],["speak_ms","Reply"]].map(([s,o])=>c`<span class="key"
                  ><span class="dot slice" data-phase=${s}></span>${o}</span
                >`)}
            </div>
            <div class="turns">${t.map(s=>this.row(s,e,i))}</div>`:c`<div class="none">
            Nothing yet. Turns appear here as they happen, across every device — the timings come from the
            device rather than from the recorder, so there is no past to load.
          </div>`}
    `}row(e,t,i){let s=ke(e.turn),o=le(e.turn),a=e.turn.outcome!=="completed",l=t[e.turn.mac]??"elsewhere";return c`<div class="turn">
      <div class="when">${ts(e.at)}</div>
      <div class="who">${l}</div>
      <div class="said">${e.turn.heard||e.turn.wake_word}</div>
      <div class="right">
        <div class="took" data-bad=${String(a)}>
          ${a?e.turn.outcome:`${(o/1e3).toFixed(1)}s`}
        </div>
        ${e.turn.audio_seconds?c`<echolocal-recording
              .hass=${this.hass}
              .device=${l}
              .turn=${e.turn.id}
              .filename=${es(e,l)}
            ></echolocal-recording>`:h}
      </div>
      ${s.length?c`<div class="bar">
            ${s.map(u=>c`<div
                class="slice"
                data-phase=${u.key}
                title=${`${u.label} ${u.ms} ms`}
                style=${`flex:0 0 ${u.ms/i*100}%`}
              ></div>`)}
          </div>`:h}
    </div>`}names(){let e={};for(let t of H(this.hass)){let i=t.connections?.find(([s])=>s==="mac")?.[1];i&&(e[i.toLowerCase()]=k(t))}return e}async listen(){if(this.hass.connection)try{this.stop=await this.hass.connection.subscribeEvents(e=>{let t=We(e.data);t&&(this.seen=[{at:Date.now(),turn:t},...this.seen].slice(0,Qi))},De)}catch{}}};G.styles=y(Wr),d([m({attribute:!1})],G.prototype,"hass",2),d([g()],G.prototype,"seen",2),d([g()],G.prototype,"only",2),d([g()],G.prototype,"asked",2),G=d([x("echolocal-activity")],G);function es(n,r){let e=new Date(n.at).toISOString().replace(/[:.]/g,"-").slice(0,19),t=i=>i.toLowerCase().replace(/[^a-z0-9]+/g,"-");return`${e}-${t(r)}-${t(n.turn.wake_word)}.wav`}function ts(n){return new Date(n).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}var Fr=`:host {
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
`;W({path:"health",title:"Health",icon:"mdi:heart-pulse",element:"echolocal-health",order:40});var bt=[{title:"Version",match:/_(?:current_version|installed_version)$/},{title:"Update",match:/^update\./,show:n=>n==="on"?"waiting":n==="off"?"current":n,wrong:n=>n==="on"?"warn":void 0},{title:"Wifi",match:/_wifi_signal$/,show:(n,r)=>`${Math.round(Number(n))} ${r||"dBm"}`,wrong:n=>Number(n)<-80?"bad":Number(n)<-70?"warn":void 0},{title:"CPU",match:/_cpu_temperature$/,show:(n,r)=>`${Math.round(Number(n))}${r||"\xB0C"}`,wrong:n=>Number(n)>80?"bad":Number(n)>70?"warn":void 0},{title:"Load",match:/_load_average$/,show:n=>Number(n).toFixed(2)},{title:"Memory",match:/_memory_available$/,show:(n,r)=>`${Math.round(Number(n))} ${r||"MB"}`,wrong:n=>Number(n)<40?"bad":Number(n)<80?"warn":void 0},{title:"Disk",match:/_free_space$/,show:(n,r)=>`${Math.round(Number(n))} ${r||"MB"}`,wrong:n=>Number(n)<50?"bad":Number(n)<150?"warn":void 0},{title:"Address",match:/_ip_address$/}],J=class extends b{constructor(){super(...arguments);this.by="";this.down=!1}render(){if(!this.hass)return h;let e=H(this.hass);if(!e.length)return c`<div class="none">No EchoLocal devices yet.</div>`;let t=e.map(s=>this.read(s)),i=this.sort(t);return c`<div class="scroll">
      <table>
        <thead>
          <tr>
            ${this.head("Device")}${bt.map(s=>this.head(s.title))}
          </tr>
        </thead>
        <tbody>
          ${i.map(s=>c`<tr data-off=${String(!s.up)}>
              <td class="who">
                <button @click=${()=>this.open(s.device)}>${s.name}</button>
              </td>
              ${bt.map(o=>{let a=s.cells[o.title];return c`<td data-wrong=${a?.wrong??""}>${a?.text??"\u2014"}</td>`})}
            </tr>`)}
        </tbody>
      </table>
    </div>`}head(e){return c`<th
      data-by=${String(this.by===e)}
      @click=${()=>{this.down=this.by===e?!this.down:!1,this.by=e}}
    >
      ${e}
    </th>`}read(e){let i=(K(this.hass,e.id)?.entities??[]).map(a=>a.entity_id),s={},o=!1;for(let a of bt){let l=i.find($=>a.match.test($)),u=l?this.hass.states[l]:void 0;if(!u)continue;let f=u.state;if(f==="unavailable"||f==="unknown")continue;o=!0;let v=u.attributes.unit_of_measurement??"",w=Number(f);s[a.title]={text:a.show?a.show(f,v):v?`${f} ${v}`:f,sort:Number.isFinite(w)&&f!==""?w:f,wrong:a.wrong?.(Number.isFinite(w)?w:f)}}return{device:e,name:k(e),cells:s,up:o}}sort(e){if(!this.by)return e;let t=i=>this.by==="Device"?i.name:i.cells[this.by]?.sort??"";return[...e].sort((i,s)=>{let o=t(i),a=t(s),l=typeof o=="number"&&typeof a=="number"?o-a:String(o).localeCompare(String(a));return this.down?-l:l})}open(e){history.pushState(null,"",`/config/devices/device/${e.id}`),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}};J.styles=y(Fr),d([m({attribute:!1})],J.prototype,"hass",2),d([g()],J.prototype,"by",2),d([g()],J.prototype,"down",2),J=d([x("echolocal-health")],J);var jr=`:host {
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
`;async function yt(n){try{return(await n.callWS({type:"echolocal/wake_words/list"}))?.wake_words??[]}catch{return[]}}var N=class extends b{constructor(){super(...arguments);this.words=[];this.over=!1;this.busy=!1;this.said="";this.asked=!1;this.dropped=e=>{e.preventDefault(),this.over=!1,this.add(e.dataTransfer?.files??null)}}updated(){this.asked||!this.hass||(this.asked=!0,this.refresh())}render(){return c`
      <div
        class="zone"
        data-over=${String(this.over)}
        @click=${()=>this.shadowRoot?.querySelector("input[type=file]")?.click()}
        @dragover=${e=>{e.preventDefault(),this.over=!0}}
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
          @change=${e=>this.add(e.target.files)}
        />
      </div>

      ${this.words.length?c`<div class="list">${this.words.map(e=>this.row(e))}</div>`:c`<div class="none">
            Nothing in custom_wake_words yet. Whatever the firmware ships with is unaffected.
          </div>`}
    `}row(e){let t=[e.type||"no type",e.size?`${Math.round(e.size/1024)} KB`:"no model",...e.trained_languages.length?[e.trained_languages.join(", ")]:[]];return c`<div class="word" data-bad=${String(e.problems.length>0)}>
      <div class="said">
        <input
          .value=${e.wake_word}
          placeholder="what someone says to wake it"
          @change=${i=>this.rename(e,i.target.value)}
        />
      </div>
      <div class="about">${t.join(" \xB7 ")}</div>
      <div class="buttons">
        <button class="icon" aria-label="Remove ${e.id}" @click=${()=>this.discard(e)}>
          <ha-icon icon="mdi:trash-can-outline"></ha-icon>
        </button>
      </div>
      ${e.problems.length?c`<div class="wrong">${e.problems.join(". ")}.</div>`:h}
    </div>`}async add(e){let t=[...e??[]].filter(i=>i.name.endsWith(".tflite"));if(!t.length){this.said="A wake model is a .tflite file.";return}this.busy=!0,this.said="";for(let i of t){let s=new FormData;s.append("file",i);try{let o=await fetch("/api/echolocal/wake_words",{method:"POST",body:s,headers:this.credentials()});if(!o.ok){let a=await o.json().catch(()=>({}));this.said=a.error??`Home Assistant refused ${i.name}.`;break}}catch(o){this.said=`That did not reach Home Assistant: ${o}`;break}}this.busy=!1,await this.refresh()}async rename(e,t){t!==e.wake_word&&(await this.hass.callWS({type:"echolocal/wake_words/update",wake_word_id:e.id,wake_word:t}),await this.refresh())}async discard(e){await this.hass.callWS({type:"echolocal/wake_words/delete",wake_word_id:e.id}),await this.refresh()}async refresh(){this.words=await yt(this.hass)}credentials(){let e=this.hass.auth?.data?.access_token;return e?{authorization:`Bearer ${e}`}:{}}};N.styles=y(jr),d([m({attribute:!1})],N.prototype,"hass",2),d([g()],N.prototype,"words",2),d([g()],N.prototype,"over",2),d([g()],N.prototype,"busy",2),d([g()],N.prototype,"said",2),d([g()],N.prototype,"asked",2),N=d([x("echolocal-wake-words")],N);var qr=`:host {
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
`;var ns=/^wake_word(_\d+)?$/;W({path:"wake-words",title:"Wake words",icon:"mdi:waveform",element:"echolocal-words",order:10,admin:!0});var Q=class extends b{constructor(){super(...arguments);this.words=[];this.asked=!1;this.again=()=>this.requestUpdate()}connectedCallback(){super.connectedCallback(),window.addEventListener(Ue,this.again)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(Ue,this.again)}updated(){this.asked||!this.hass||(this.asked=!0,this.load())}render(){if(!this.hass)return h;let e=this.chosen(),t=new Set(this.words.filter(s=>s.problems.length&&s.wake_word).map(s=>s.wake_word)),i=this.words.filter(s=>!s.problems.length&&!e.some(o=>o.words.includes(s.wake_word)));return c`
      <h2 class="first">Listening for</h2>
      ${e.length?c`<div class="listening">
            ${e.map(s=>c`<div class="who">
                <span class="name">${s.name}</span>
                ${s.words.map(o=>c`<span
                      class="word"
                      data-gone=${String(t.has(o))}
                      title=${t.has(o)?"Its library entry is broken, so it is not offered":""}
                      >${o}</span
                    >`)}
              </div>`)}
          </div>`:c`<div class="spare">No devices have picked a wake word yet.</div>`}

      <h2>The library</h2>
      <echolocal-wake-words .hass=${this.hass}></echolocal-wake-words>

      ${i.length?c`<div class="spare">
            Unused: ${i.map(s=>s.wake_word).join(", ")} — offered to every satellite, picked
            by none of them.
          </div>`:h}
    `}chosen(){let e=ae(this.hass);return H(this.hass).map(t=>{let s=(K(this.hass,t.id)?.entities??[]).filter(o=>ns.test(e?.get(o.entity_id)?.key??"")).map(o=>this.hass.states[o.entity_id]?.state).filter(o=>!!o&&o!=="unknown"&&o!=="None");return{name:k(t),words:s}}).filter(t=>t.words.length)}async load(){this.words=await yt(this.hass)}};Q.styles=y(qr),d([m({attribute:!1})],Q.prototype,"hass",2),d([g()],Q.prototype,"words",2),d([g()],Q.prototype,"asked",2),Q=d([x("echolocal-words")],Q);var q=class extends b{constructor(){super(...arguments);this.narrow=!1;this.at="";this.made=new Map;this.moved=()=>{this.at=ft(this.base(),void 0),this.requestUpdate()}}connectedCallback(){super.connectedCallback(),window.addEventListener("location-changed",this.moved),window.addEventListener("popstate",this.moved)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("location-changed",this.moved),window.removeEventListener("popstate",this.moved)}render(){if(!this.hass)return h;let e=!!this.hass.user?.is_admin,t=gt(e),i=kr(this.where(),e);return c`
      <header>
        <div class="bar">${t.map(s=>this.button(s,s===i))}</div>
      </header>
      <div class="page">${i?this.body(i):h}</div>
    `}button(e,t){return c`<button
      data-here=${String(t)}
      @click=${()=>{this.at=e.path,_r(this.base(),e.path)}}
    >
      <ha-icon .icon=${e.icon}></ha-icon><span>${e.title}</span>
    </button>`}body(e){let t=this.made.get(e.path);return t||(t=document.createElement(e.element),this.made.set(e.path,t)),t.hass=this.hass,t.narrow=this.narrow,t}where(){return this.route?ft(this.base(),this.route.path):this.at}base(){return this.route?.prefix??"/echolocal"}};q.styles=y(Sr),d([m({attribute:!1})],q.prototype,"hass",2),d([m({type:Boolean})],q.prototype,"narrow",2),d([m({attribute:!1})],q.prototype,"route",2),d([m({attribute:!1})],q.prototype,"panel",2),d([g()],q.prototype,"at",2),q=d([x("echolocal-panel")],q);window.customCards=window.customCards??[];window.customCards.some(n=>n.type==="echolocal-satellite-card")||window.customCards.push({type:"echolocal-satellite-card",name:"EchoLocal Satellite",description:"An EchoLocal satellite, drawn as itself, with its ring and mute live.",preview:!0,documentationURL:"https://github.com/ygelfand/echolocal-hacs"});
