var Gi=Object.defineProperty;var Vi=Object.getOwnPropertyDescriptor;var c=(n,i,t,e)=>{for(var r=e>1?void 0:e?Vi(i,t):i,s=n.length-1,o;s>=0;s--)(o=n[s])&&(r=(e?o(i,t,r):o(r))||r);return e&&r&&Gi(i,t,r),r};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var St=globalThis,Ct=St.ShadowRoot&&(St.ShadyCSS===void 0||St.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,we=Symbol(),xe=new WeakMap,At=class{constructor(i,t,e){if(this._$cssResult$=!0,e!==we)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=i,this.t=t}get styleSheet(){let i=this.o,t=this.t;if(Ct&&i===void 0){let e=t!==void 0&&t.length===1;e&&(i=xe.get(t)),i===void 0&&((this.o=i=new CSSStyleSheet).replaceSync(this.cssText),e&&xe.set(t,i))}return i}toString(){return this.cssText}},b=n=>new At(typeof n=="string"?n:n+"",void 0,we);var $e=(n,i)=>{if(Ct)n.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of i){let e=document.createElement("style"),r=St.litNonce;r!==void 0&&e.setAttribute("nonce",r),e.textContent=t.cssText,n.appendChild(e)}},Gt=Ct?n=>n:n=>n instanceof CSSStyleSheet?(i=>{let t="";for(let e of i.cssRules)t+=e.cssText;return b(t)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var{is:Yi,defineProperty:Xi,getOwnPropertyDescriptor:Zi,getOwnPropertyNames:Ji,getOwnPropertySymbols:Li,getPrototypeOf:Qi}=Object,Mt=globalThis,ke=Mt.trustedTypes,tr=ke?ke.emptyScript:"",er=Mt.reactiveElementPolyfillSupport,ut=(n,i)=>n,mt={toAttribute(n,i){switch(i){case Boolean:n=n?tr:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,i){let t=n;switch(i){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},Ht=(n,i)=>!Yi(n,i),_e={attribute:!0,type:String,converter:mt,reflect:!1,useDefault:!1,hasChanged:Ht};Symbol.metadata??=Symbol("metadata"),Mt.litPropertyMetadata??=new WeakMap;var W=class extends HTMLElement{static addInitializer(i){this._$Ei(),(this.l??=[]).push(i)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(i,t=_e){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(i)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(i,t),!t.noAccessor){let e=Symbol(),r=this.getPropertyDescriptor(i,e,t);r!==void 0&&Xi(this.prototype,i,r)}}static getPropertyDescriptor(i,t,e){let{get:r,set:s}=Zi(this.prototype,i)??{get(){return this[t]},set(o){this[t]=o}};return{get:r,set(o){let a=r?.call(this);s?.call(this,o),this.requestUpdate(i,a,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(i){return this.elementProperties.get(i)??_e}static _$Ei(){if(this.hasOwnProperty(ut("elementProperties")))return;let i=Qi(this);i.finalize(),i.l!==void 0&&(this.l=[...i.l]),this.elementProperties=new Map(i.elementProperties)}static finalize(){if(this.hasOwnProperty(ut("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ut("properties"))){let t=this.properties,e=[...Ji(t),...Li(t)];for(let r of e)this.createProperty(r,t[r])}let i=this[Symbol.metadata];if(i!==null){let t=litPropertyMetadata.get(i);if(t!==void 0)for(let[e,r]of t)this.elementProperties.set(e,r)}this._$Eh=new Map;for(let[t,e]of this.elementProperties){let r=this._$Eu(t,e);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(i){let t=[];if(Array.isArray(i)){let e=new Set(i.flat(1/0).reverse());for(let r of e)t.unshift(Gt(r))}else i!==void 0&&t.push(Gt(i));return t}static _$Eu(i,t){let e=t.attribute;return e===!1?void 0:typeof e=="string"?e:typeof i=="string"?i.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(i=>i(this))}addController(i){(this._$EO??=new Set).add(i),this.renderRoot!==void 0&&this.isConnected&&i.hostConnected?.()}removeController(i){this._$EO?.delete(i)}_$E_(){let i=new Map,t=this.constructor.elementProperties;for(let e of t.keys())this.hasOwnProperty(e)&&(i.set(e,this[e]),delete this[e]);i.size>0&&(this._$Ep=i)}createRenderRoot(){let i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return $e(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(i=>i.hostConnected?.())}enableUpdating(i){}disconnectedCallback(){this._$EO?.forEach(i=>i.hostDisconnected?.())}attributeChangedCallback(i,t,e){this._$AK(i,e)}_$ET(i,t){let e=this.constructor.elementProperties.get(i),r=this.constructor._$Eu(i,e);if(r!==void 0&&e.reflect===!0){let s=(e.converter?.toAttribute!==void 0?e.converter:mt).toAttribute(t,e.type);this._$Em=i,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(i,t){let e=this.constructor,r=e._$Eh.get(i);if(r!==void 0&&this._$Em!==r){let s=e.getPropertyOptions(r),o=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:mt;this._$Em=r;let a=o.fromAttribute(t,s.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(i,t,e,r=!1,s){if(i!==void 0){let o=this.constructor;if(r===!1&&(s=this[i]),e??=o.getPropertyOptions(i),!((e.hasChanged??Ht)(s,t)||e.useDefault&&e.reflect&&s===this._$Ej?.get(i)&&!this.hasAttribute(o._$Eu(i,e))))return;this.C(i,t,e)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(i,t,{useDefault:e,reflect:r,wrapped:s},o){e&&!(this._$Ej??=new Map).has(i)&&(this._$Ej.set(i,o??t??this[i]),s!==!0||o!==void 0)||(this._$AL.has(i)||(this.hasUpdated||e||(t=void 0),this._$AL.set(i,t)),r===!0&&this._$Em!==i&&(this._$Eq??=new Set).add(i))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let i=this.scheduleUpdate();return i!=null&&await i,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,s]of this._$Ep)this[r]=s;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[r,s]of e){let{wrapped:o}=s,a=this[r];o!==!0||this._$AL.has(r)||a===void 0||this.C(r,void 0,s,a)}}let i=!1,t=this._$AL;try{i=this.shouldUpdate(t),i?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(e){throw i=!1,this._$EM(),e}i&&this._$AE(t)}willUpdate(i){}_$AE(i){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(i)),this.updated(i)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(i){return!0}update(i){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(i){}firstUpdated(i){}};W.elementStyles=[],W.shadowRootOptions={mode:"open"},W[ut("elementProperties")]=new Map,W[ut("finalized")]=new Map,er?.({ReactiveElement:W}),(Mt.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Qt=globalThis,Se=n=>n,Tt=Qt.trustedTypes,Ae=Tt?Tt.createPolicy("lit-html",{createHTML:n=>n}):void 0,Pe="$lit$",G=`lit$${Math.random().toFixed(9).slice(2)}$`,Ee="?"+G,ir=`<${Ee}>`,et=document,ft=()=>et.createComment(""),vt=n=>n===null||typeof n!="object"&&typeof n!="function",te=Array.isArray,rr=n=>te(n)||typeof n?.[Symbol.iterator]=="function",Vt=`[ 	
\f\r]`,gt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ce=/-->/g,Me=/>/g,Q=RegExp(`>|${Vt}(?:([^\\s"'>=/]+)(${Vt}*=${Vt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),He=/'/g,Te=/"/g,ze=/^(?:script|style|textarea|title)$/i,ee=n=>(i,...t)=>({_$litType$:n,strings:i,values:t}),l=ee(1),$=ee(2),gs=ee(3),it=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),Re=new WeakMap,tt=et.createTreeWalker(et,129);function Oe(n,i){if(!te(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ae!==void 0?Ae.createHTML(i):i}var sr=(n,i)=>{let t=n.length-1,e=[],r,s=i===2?"<svg>":i===3?"<math>":"",o=gt;for(let a=0;a<t;a++){let d=n[a],h,m,f=-1,x=0;for(;x<d.length&&(o.lastIndex=x,m=o.exec(d),m!==null);)x=o.lastIndex,o===gt?m[1]==="!--"?o=Ce:m[1]!==void 0?o=Me:m[2]!==void 0?(ze.test(m[2])&&(r=RegExp("</"+m[2],"g")),o=Q):m[3]!==void 0&&(o=Q):o===Q?m[0]===">"?(o=r??gt,f=-1):m[1]===void 0?f=-2:(f=o.lastIndex-m[2].length,h=m[1],o=m[3]===void 0?Q:m[3]==='"'?Te:He):o===Te||o===He?o=Q:o===Ce||o===Me?o=gt:(o=Q,r=void 0);let w=o===Q&&n[a+1].startsWith("/>")?" ":"";s+=o===gt?d+ir:f>=0?(e.push(h),d.slice(0,f)+Pe+d.slice(f)+G+w):d+G+(f===-2?a:w)}return[Oe(n,s+(n[t]||"<?>")+(i===2?"</svg>":i===3?"</math>":"")),e]},bt=class n{constructor({strings:i,_$litType$:t},e){let r;this.parts=[];let s=0,o=0,a=i.length-1,d=this.parts,[h,m]=sr(i,t);if(this.el=n.createElement(h,e),tt.currentNode=this.el.content,t===2||t===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(r=tt.nextNode())!==null&&d.length<a;){if(r.nodeType===1){if(r.hasAttributes())for(let f of r.getAttributeNames())if(f.endsWith(Pe)){let x=m[o++],w=r.getAttribute(f).split(G),_=/([.?@])?(.*)/.exec(x);d.push({type:1,index:s,name:_[2],strings:w,ctor:_[1]==="."?Xt:_[1]==="?"?Zt:_[1]==="@"?Jt:nt}),r.removeAttribute(f)}else f.startsWith(G)&&(d.push({type:6,index:s}),r.removeAttribute(f));if(ze.test(r.tagName)){let f=r.textContent.split(G),x=f.length-1;if(x>0){r.textContent=Tt?Tt.emptyScript:"";for(let w=0;w<x;w++)r.append(f[w],ft()),tt.nextNode(),d.push({type:2,index:++s});r.append(f[x],ft())}}}else if(r.nodeType===8)if(r.data===Ee)d.push({type:2,index:s});else{let f=-1;for(;(f=r.data.indexOf(G,f+1))!==-1;)d.push({type:7,index:s}),f+=G.length-1}s++}}static createElement(i,t){let e=et.createElement("template");return e.innerHTML=i,e}};function st(n,i,t=n,e){if(i===it)return i;let r=e!==void 0?t._$Co?.[e]:t._$Cl,s=vt(i)?void 0:i._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),s===void 0?r=void 0:(r=new s(n),r._$AT(n,t,e)),e!==void 0?(t._$Co??=[])[e]=r:t._$Cl=r),r!==void 0&&(i=st(n,r._$AS(n,i.values),r,e)),i}var Yt=class{constructor(i,t){this._$AV=[],this._$AN=void 0,this._$AD=i,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(i){let{el:{content:t},parts:e}=this._$AD,r=(i?.creationScope??et).importNode(t,!0);tt.currentNode=r;let s=tt.nextNode(),o=0,a=0,d=e[0];for(;d!==void 0;){if(o===d.index){let h;d.type===2?h=new yt(s,s.nextSibling,this,i):d.type===1?h=new d.ctor(s,d.name,d.strings,this,i):d.type===6&&(h=new Lt(s,this,i)),this._$AV.push(h),d=e[++a]}o!==d?.index&&(s=tt.nextNode(),o++)}return tt.currentNode=et,r}p(i){let t=0;for(let e of this._$AV)e!==void 0&&(e.strings!==void 0?(e._$AI(i,e,t),t+=e.strings.length-2):e._$AI(i[t])),t++}},yt=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(i,t,e,r){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=i,this._$AB=t,this._$AM=e,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let i=this._$AA.parentNode,t=this._$AM;return t!==void 0&&i?.nodeType===11&&(i=t.parentNode),i}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(i,t=this){i=st(this,i,t),vt(i)?i===p||i==null||i===""?(this._$AH!==p&&this._$AR(),this._$AH=p):i!==this._$AH&&i!==it&&this._(i):i._$litType$!==void 0?this.$(i):i.nodeType!==void 0?this.T(i):rr(i)?this.k(i):this._(i)}O(i){return this._$AA.parentNode.insertBefore(i,this._$AB)}T(i){this._$AH!==i&&(this._$AR(),this._$AH=this.O(i))}_(i){this._$AH!==p&&vt(this._$AH)?this._$AA.nextSibling.data=i:this.T(et.createTextNode(i)),this._$AH=i}$(i){let{values:t,_$litType$:e}=i,r=typeof e=="number"?this._$AC(i):(e.el===void 0&&(e.el=bt.createElement(Oe(e.h,e.h[0]),this.options)),e);if(this._$AH?._$AD===r)this._$AH.p(t);else{let s=new Yt(r,this),o=s.u(this.options);s.p(t),this.T(o),this._$AH=s}}_$AC(i){let t=Re.get(i.strings);return t===void 0&&Re.set(i.strings,t=new bt(i)),t}k(i){te(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,e,r=0;for(let s of i)r===t.length?t.push(e=new n(this.O(ft()),this.O(ft()),this,this.options)):e=t[r],e._$AI(s),r++;r<t.length&&(this._$AR(e&&e._$AB.nextSibling,r),t.length=r)}_$AR(i=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);i!==this._$AB;){let e=Se(i).nextSibling;Se(i).remove(),i=e}}setConnected(i){this._$AM===void 0&&(this._$Cv=i,this._$AP?.(i))}},nt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(i,t,e,r,s){this.type=1,this._$AH=p,this._$AN=void 0,this.element=i,this.name=t,this._$AM=r,this.options=s,e.length>2||e[0]!==""||e[1]!==""?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=p}_$AI(i,t=this,e,r){let s=this.strings,o=!1;if(s===void 0)i=st(this,i,t,0),o=!vt(i)||i!==this._$AH&&i!==it,o&&(this._$AH=i);else{let a=i,d,h;for(i=s[0],d=0;d<s.length-1;d++)h=st(this,a[e+d],t,d),h===it&&(h=this._$AH[d]),o||=!vt(h)||h!==this._$AH[d],h===p?i=p:i!==p&&(i+=(h??"")+s[d+1]),this._$AH[d]=h}o&&!r&&this.j(i)}j(i){i===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,i??"")}},Xt=class extends nt{constructor(){super(...arguments),this.type=3}j(i){this.element[this.name]=i===p?void 0:i}},Zt=class extends nt{constructor(){super(...arguments),this.type=4}j(i){this.element.toggleAttribute(this.name,!!i&&i!==p)}},Jt=class extends nt{constructor(i,t,e,r,s){super(i,t,e,r,s),this.type=5}_$AI(i,t=this){if((i=st(this,i,t,0)??p)===it)return;let e=this._$AH,r=i===p&&e!==p||i.capture!==e.capture||i.once!==e.once||i.passive!==e.passive,s=i!==p&&(e===p||r);r&&this.element.removeEventListener(this.name,this,e),s&&this.element.addEventListener(this.name,this,i),this._$AH=i}handleEvent(i){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,i):this._$AH.handleEvent(i)}},Lt=class{constructor(i,t,e){this.element=i,this.type=6,this._$AN=void 0,this._$AM=t,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(i){st(this,i)}};var nr=Qt.litHtmlPolyfillSupport;nr?.(bt,yt),(Qt.litHtmlVersions??=[]).push("3.3.3");var Ne=(n,i,t)=>{let e=t?.renderBefore??i,r=e._$litPart$;if(r===void 0){let s=t?.renderBefore??null;e._$litPart$=r=new yt(i.insertBefore(ft(),s),s,void 0,t??{})}return r._$AI(n),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ie=globalThis,v=class extends W{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let i=super.createRenderRoot();return this.renderOptions.renderBefore??=i.firstChild,i}update(i){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(i),this._$Do=Ne(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return it}};v._$litElement$=!0,v.finalized=!0,ie.litElementHydrateSupport?.({LitElement:v});var or=ie.litElementPolyfillSupport;or?.({LitElement:v});(ie.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var y=n=>(i,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(n,i)}):customElements.define(n,i)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ar={attribute:!0,type:String,converter:mt,reflect:!1,hasChanged:Ht},lr=(n=ar,i,t)=>{let{kind:e,metadata:r}=t,s=globalThis.litPropertyMetadata.get(r);if(s===void 0&&globalThis.litPropertyMetadata.set(r,s=new Map),e==="setter"&&((n=Object.create(n)).wrapped=!0),s.set(t.name,n),e==="accessor"){let{name:o}=t;return{set(a){let d=i.get.call(this);i.set.call(this,a),this.requestUpdate(o,d,n,!0,a)},init(a){return a!==void 0&&this.C(o,void 0,n,a),a}}}if(e==="setter"){let{name:o}=t;return function(a){let d=this[o];i.call(this,a),this.requestUpdate(o,d,n,!0,a)}}throw Error("Unsupported decorator location: "+e)};function u(n){return(i,t)=>typeof t=="object"?lr(n,i,t):((e,r,s)=>{let o=r.hasOwnProperty(s);return r.constructor.createProperty(s,e),o?Object.getOwnPropertyDescriptor(r,s):void 0})(n,i,t)}/**
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
 */var xt=12,Ie=2.2,j=100,F=100,Ue=500;function De(n,i){let t=Array.from({length:xt},(e,r)=>{let s=-90+360/xt*r+Ie/2,o=-90+360/xt*(r+1)-Ie/2;return pr(93,82,s,o)});return $`
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
        ${t.map((e,r)=>$`<path d=${e} style="fill:${n.segments[r].opacity?n.segments[r].fill:"transparent"}"></path>`)}
      </g>

      ${t.map((e,r)=>$`<path
          class="segment"
          data-picked=${String(n.picked===r)}
          data-divisible=${String(n.divisible)}
          d=${e}
          style="fill:${n.segments[r].fill};opacity:${n.segments[r].opacity}"
          @click=${n.divisible?()=>i.segment(r):i.ring}
        ></path>`)}

      <circle cx=${j} cy=${F} r="79" fill="url(#top)"></circle>
      <circle cx=${j} cy=${F} r="79" fill="none" stroke="var(--el-edge)" stroke-width="1"></circle>


      ${re(j,F-46,$`<path d="M-4.5 0h9M0 -4.5v9"></path>`,"Volume up",()=>i.volume(1))}
      <g
        class="btn"
        data-lit=${String(n.holding)}
        transform="translate(${j+46} ${F})"
        role="button"
        tabindex="0"
        aria-label=${n.holding?"Wake the second assistant":"Wake"}
        @pointerdown=${()=>i.action("down")}
        @pointerup=${()=>i.action("up")}
        @pointerleave=${()=>i.action("cancel")}
        @pointercancel=${()=>i.action("cancel")}
      >
        <circle class="face" cx="0" cy="0" r="13"></circle>
        <g class="glyph"><circle cx="0" cy="0" r="4.5"></circle></g>
      </g>
      ${re(j,F+46,$`<path d="M-4.5 0h9"></path>`,"Volume down",()=>i.volume(-1))}
      ${re(j-46,F,cr(n.muted),n.muted?"Microphone muted":"Microphone live",i.mute,n.muted)}
    </svg>
  `}function re(n,i,t,e,r,s=!1){return $`<g class="btn" data-lit=${String(s)} transform="translate(${n} ${i})"
    role="button" tabindex="0" aria-label=${e} @click=${r}>
    <circle class="face" cx="0" cy="0" r="13"></circle>
    <g class="glyph">${t}</g>
  </g>`}function cr(n){return $`
    <path d="M-2.6 -5.2a2.6 2.6 0 0 1 5.2 0v4a2.6 2.6 0 0 1-5.2 0z"></path>
    <path d="M-4.6 -0.6a4.6 4.6 0 0 0 9.2 0"></path>
    <path d="M0 3.8v2.6"></path>
    ${n?$`<path d="M-6.4 6.4L6.4 -6.4"></path>`:dr()}
  `}function dr(){return $``}function pr(n,i,t,e){let r=(w,_)=>{let T=_*Math.PI/180;return[(j+w*Math.cos(T)).toFixed(2),(F+w*Math.sin(T)).toFixed(2)]},[s,o]=r(n,t),[a,d]=r(n,e),[h,m]=r(i,e),[f,x]=r(i,t);return`M${s} ${o}A${n} ${n} 0 0 1 ${a} ${d}L${h} ${m}A${i} ${i} 0 0 0 ${f} ${x}Z`}var We=`:host {
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
`;var Fe=26,Pt=135,Et=270,S=100,A=100,V=84,zt=38,R=class extends v{constructor(){super(...arguments);this.level="";this.floor="";this.gate="";this.mode="";this.muted=!1;this.held=null;this.grab=t=>{let e=t.currentTarget;e.setPointerCapture(t.pointerId);let r=this.hass.states[this.gate]?.attributes??{},s=r.min??0,o=r.max??20,a=r.step??1,d=this.number(this.floor)??0,h=this.number(this.level)??0,m=Math.max(d+Fe,h+3),f=_=>{let T=e.getBoundingClientRect(),ye=_.clientX-T.left-T.width/2,Kt=_.clientY-T.top-T.height/2,ht=Math.atan2(Kt,ye)*180/Math.PI-Pt;for(;ht<0;)ht+=360;let Ki=se(Math.min(ht,Et)/Et);return Math.max(s,Math.min(o,Math.round(Ki*(m-d)/a)*a))},x=_=>{this.held=f(_)},w=_=>{e.removeEventListener("pointermove",x),e.removeEventListener("pointerup",w),e.removeEventListener("pointercancel",w);let T=f(_);this.held=null,this.hass.callService("number","set_value",{entity_id:this.gate,value:T})};e.addEventListener("pointermove",x),e.addEventListener("pointerup",w),e.addEventListener("pointercancel",w),this.held=f(t)}}render(){let t=this.number(this.level),e=this.number(this.floor),r=this.held??this.number(this.gate);if(t===null||e===null||r===null)return p;let s=this.hass.states[this.mode],o=qe(s?.state),a=Math.max(e+Fe,t+3),d=se((t-e)/(a-e)),h=se(r/(a-e)),m=t>=e+r&&!this.muted;return l`
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
          ${this.muted?p:br(h)} ${o==="beam"?vr():p}
          ${o==="sum"?fr():p} ${mr(o,this.muted)}
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
              <svg viewBox="0 0 40 40">${gr(qe(f))}</svg>
              <span>${f}</span>
            </button>`)}
        </div>

        <div class="gate">Gate <b>${r} dB</b> over a floor of <b>${e.toFixed(0)} dB</b></div>
      </div>
    `}number(t){let e=Number(this.hass?.states?.[t]?.state);return Number.isFinite(e)?e:null}};R.styles=b(je),c([u({attribute:!1})],R.prototype,"hass",2),c([u()],R.prototype,"level",2),c([u()],R.prototype,"floor",2),c([u()],R.prototype,"gate",2),c([u()],R.prototype,"mode",2),c([u({type:Boolean})],R.prototype,"muted",2),c([g()],R.prototype,"held",2),R=c([y("echolocal-array")],R);function qe(n){let i=(n??"").toLowerCase();return i.includes("center")||i.includes("centre")?"one":i.includes("beam")?"beam":"sum"}function mr(n,i){return[[S,A],...Array.from({length:6},(e,r)=>{let s=(-90+r*60)*Math.PI/180;return[S+zt*Math.cos(s),A+zt*Math.sin(s)]})].map(([e,r],s)=>$`<circle class="capsule" data-on=${String(!i&&(n!=="one"||s===0))}
      cx=${e.toFixed(1)} cy=${r.toFixed(1)} r=${s===0?7:5.5}></circle>`)}function gr(n){let i=[[20,20],...Array.from({length:6},(t,e)=>{let r=(-90+e*60)*Math.PI/180;return[20+12*Math.cos(r),20+12*Math.sin(r)]})];return $`
    ${n==="beam"?$`<path class="beam" d="M20 20C9 11 13 1 20 1C27 1 31 11 20 20Z"></path>`:p}
    ${i.map(([t,e],r)=>$`<circle class="capsule" data-on=${String(n!=="one"||r===0)}
          cx=${t.toFixed(1)} cy=${e.toFixed(1)} r=${r===0?3.4:2.6}></circle>`)}`}function fr(){return Array.from({length:6},(n,i)=>{let t=(-90+i*60)*Math.PI/180;return $`<line class="spoke" x1=${S} y1=${A}
      x2=${(S+zt*Math.cos(t)).toFixed(1)} y2=${(A+zt*Math.sin(t)).toFixed(1)}></line>`})}function vr(){return $`<path class="beam" d="M${S} ${A}C${S-34} ${A-30} ${S-24} ${A-66} ${S} ${A-66}C${S+24} ${A-66} ${S+34} ${A-30} ${S} ${A}Z"></path>`}function Be(){let n=Pt*Math.PI/180,i=(Pt+Et)*Math.PI/180;return`M${(S+V*Math.cos(n)).toFixed(2)} ${(A+V*Math.sin(n)).toFixed(2)}
    A${V} ${V} 0 1 1 ${(S+V*Math.cos(i)).toFixed(2)} ${(A+V*Math.sin(i)).toFixed(2)}`}function br(n){let i=(Pt+n*Et)*Math.PI/180,t=V-8,e=V+8;return $`<line class="notch"
    x1=${(S+t*Math.cos(i)).toFixed(1)} y1=${(A+t*Math.sin(i)).toFixed(1)}
    x2=${(S+e*Math.cos(i)).toFixed(1)} y2=${(A+e*Math.sin(i)).toFixed(1)}></line>`}function se(n){return Math.max(0,Math.min(1,n))}var Ke=`:host {
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

`;var rt=class extends v{constructor(){super(...arguments);this.text="";this.open=!1;this.toggle=t=>{t.stopPropagation(),t.preventDefault(),this.open=!this.open,this.open?(this.place(),document.addEventListener("click",this.elsewhere,!0)):document.removeEventListener("click",this.elsewhere,!0)};this.elsewhere=t=>{t.composedPath().includes(this)||(this.open=!1,document.removeEventListener("click",this.elsewhere,!0))}}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this.elsewhere,!0)}render(){return this.text?l`
      <button
        data-open=${String(this.open)}
        aria-label="What this does"
        aria-expanded=${String(this.open)}
        @click=${this.toggle}
      >
        ?
      </button>
      ${this.open?l`<div class="said" role="tooltip">${this.text}</div>`:p}
    `:p}async place(){let t=(await this.updateComplete,this.shadowRoot?.querySelector(".said"));if(!(t instanceof HTMLElement))return;t.style.removeProperty("transform");let e=(this.closest(".sheet")??this.offsetParent??document.body).getBoundingClientRect(),r=t.getBoundingClientRect(),s=10,o=Math.max(0,e.left+s-r.left)-Math.max(0,r.right-e.right+s);o&&(t.style.transform=`translateX(${Math.round(o)}px)`)}};rt.styles=b(Ke),c([u()],rt.prototype,"text",2),c([g()],rt.prototype,"open",2),rt=c([y("echolocal-bubble")],rt);var Ge=`.sheet {
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

/* Home Assistant's controls fill whatever they are given, so the size is set here rather than by them. */
.crown ha-control-switch {
  width: 52px;
  --control-switch-thickness: 30px;
  --control-switch-border-radius: 15px;
}

/* Mute reads as a warning when it is on; every other header switch is just on. */
.crown ha-control-switch.warn {
  --control-switch-on-color: var(--error-color, #db4437);
}

.crown .lamp {
  max-width: 168px;
  --control-select-thickness: 30px;
  --control-select-border-radius: 15px;
}

.crown ha-icon-button {
  color: var(--primary-color);
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
  flex: 0 1 auto;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

.trail ha-control-switch {
  width: 44px;
  --control-switch-thickness: 26px;
  --control-switch-border-radius: 13px;
}

/* Wide enough to read the chosen option, capped so the row's name keeps its own room. Segments need more
   of it than a menu does: a menu shows one name at a time and segments show all of them. */
.trail ha-control-select,
.trail ha-control-select-menu {
  min-width: 0;
  --control-select-thickness: 34px;
  --control-select-menu-height: 34px;
}

.trail ha-control-select {
  max-width: 280px;
}

.trail ha-control-select-menu {
  max-width: 210px;
}

ha-control-slider {
  --control-slider-thickness: 34px;
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

.dim ha-control-slider {
  flex: 1 1 auto;
  min-width: 0;
  --control-slider-thickness: 28px;
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

ha-control-select-menu {
  --control-select-menu-height: 36px;
}
`;var E=class extends v{constructor(){super(...arguments);this.light="";this.muted="";this.failure="";this.room="";this.target="rest"}render(){let t=this.hass.states[this.light];if(!t)return p;let e=this.situations(),r=e.find(o=>o.key===this.target)??e[0],s=t.attributes.brightness??255;return l`
      <div class="dim">
        <span>Brightness</span>
        <ha-control-slider
          min="1"
          max="255"
          .value=${s}
          .disabled=${t.state!=="on"}
          @value-changed=${o=>this.hass.callService("light","turn_on",{entity_id:this.light,brightness:o.detail.value})}
        ></ha-control-slider>
        <b>${Math.round(s/255*100)}%</b>
      </div>

      <div class="when">
        ${e.map(o=>l`<button
            class="situation"
            data-on=${String(o.key===r.key)}
            @click=${()=>this.target=o.key}
          >
            <ha-icon .icon=${o.icon}></ha-icon>
            <div class="text">
              <div class="label">${o.label}</div>
              <div class="shows">${this.showing(o)||"\u2014"}</div>
            </div>
          </button>`)}
      </div>

      <div class="caption">${r.label} shows</div>
      <ha-control-select-menu
        .options=${this.options(r).map(o=>({value:o,label:o}))}
        .value=${this.showing(r)}
        .label=${r.label}
        hide-label
        show-arrow
        @wa-select=${o=>{let a=o.detail.item?.value;a&&this.choose(r,a)}}
      ></ha-control-select-menu>
    `}situations(){return[{key:"rest",label:"At rest",icon:"mdi:record-circle-outline"},{key:"muted",label:"Muted",icon:"mdi:microphone-off",entity:this.muted},{key:"failure",label:"On failure",icon:"mdi:alert-circle-outline",entity:this.failure},{key:"room",label:"Follows the room",icon:"mdi:motion-sensor",entity:this.room}].filter(e=>e.key==="rest"||e.entity&&this.hass.states[e.entity])}showing(t){if(t.entity)return this.hass.states[t.entity]?.state??"";let e=this.hass.states[this.light];return e?.state!=="on"?"":e.attributes.effect??""}options(t){return(t.entity?this.hass.states[t.entity]?.attributes.options:this.hass.states[this.light]?.attributes.effect_list)??[]}choose(t,e){if(!t.entity){this.hass.callService("light","turn_on",{entity_id:this.light,effect:e});return}this.hass.callService("select","select_option",{entity_id:t.entity,option:e})}};E.styles=b(Ve),c([u({attribute:!1})],E.prototype,"hass",2),c([u()],E.prototype,"light",2),c([u()],E.prototype,"muted",2),c([u()],E.prototype,"failure",2),c([u()],E.prototype,"room",2),c([g()],E.prototype,"target",2),E=c([y("echolocal-appearance")],E);var $r={mic_mute:"Cuts the microphones in hardware. The device cannot hear anything at all while this is on, including its wake word \u2014 it is a switch on the power to the capsules, not a software mute.",microphone_gain:"How much the capsules are amplified before anything else happens. Raise it in a large or quiet room; lower it if speech close to the device clips and comes out distorted.",microphone_mixing:"How the seven capsules are combined into the one channel the speech engine hears. Beamforming favours whichever direction someone is talking from and rejects the rest of the room; averaging treats every direction equally and is steadier when several people talk.",microphone_leveling:"Evens out loud and quiet talkers so a whisper across the room and a shout beside it arrive at similar volume. Helps transcription, and costs a little dynamic range.",microphone_cancel_echo:"Subtracts what the speaker is playing from what the microphones hear, so the device can be interrupted while it is talking and does not answer its own reply.",microphone_sensitivity:"How much louder than the room's own noise floor a sound has to be before the device treats it as somebody talking. Raise it in a noisy room to stop the device reacting to the room itself; lower it if quiet speech is missed.",room_level:"How loud the room is right now, in decibels below full scale. Nothing to set \u2014 it is what the sensitivity is measured against, and watching it is how you pick a sensible one.",room_floor:"The quietest the room has been recently, which is the baseline the device compares against. It drifts with the room, so a fridge switching on raises it rather than fooling the device.",mute_led_brightness:"How bright the red ring is while the microphones are cut. Dim is enough to see in a dark room without lighting it up.",stop_word_sensitivity:"How sure the device has to be before it takes an interruption as the word stop. Lower it if saying stop over a reply does not land.",ring:"The whole ring, as one light. Turning it off leaves the device working normally and silent about it.",segment:"One of the twelve segments, addressable on its own. They ship switched off in Home Assistant because twelve extra lights in every list is rarely what anyone wants \u2014 enable one and it can be coloured individually from the card.",ring_muted:"What the ring does while the microphones are cut. Something visible is worth choosing: a muted device that looks identical to a listening one is how people end up talking to a device that cannot hear them.",failure_effect:"What the ring does when a turn fails \u2014 no network, no pipeline, nothing understood. Distinct from the normal colours on purpose.",room_reaction:"Lets the ring track how loud the room is while the device is listening, so somebody can see that it is hearing them before it answers.",headphones:"Sends audio out of the jack instead of the speaker. The speaker goes quiet while this is on.",noise_layer:"Plays a generated sound the device makes itself \u2014 rain, a fan, a brook. Nothing is streamed and nothing is stored: it is synthesised as it plays, so it never loops or runs out. Two layers can overlap, so rain over a fan is one choice in each.",media_on_turn:"What happens to music when someone says the wake word. Ducking drops the volume and keeps playing, which resumes on the same note; stopping does not.",media_duck_level:"How far the volume drops while the device is listening or talking. Far enough that the microphones are not fighting the music, not so far that the room goes silent.",voice_resampling:"How the reply's audio is resampled to what the speaker wants. Better quality costs a little more work on a device that has four small cores.",wake_word:"What this assistant listens for. The list is what the device has on disk plus whatever Home Assistant is offering from its custom_wake_words directory.",wake_threshold:"How sure the device has to be before it decides it heard its wake word. Lower it if it misses you; raise it if the television sets it off.",follow_up:"Keeps listening for a moment after a reply, so a second question needs no second wake word.",max_listen:"How long the device will wait for someone to finish talking before giving up on the turn.",max_think:"How long to wait for Home Assistant's pipeline to answer. Generous is usually right \u2014 a slow answer beats a turn that dies just before it arrives.",wake_effect:"What the ring does at this point in a turn. Cosmetic, but it is how somebody knows the device heard them.",wake_tone:"A short sound at this point in a turn. Some people want the confirmation; some find it grating.",reply_buffer:"How much of a reply to collect before starting to play it. More is steadier on a poor network, at the cost of answering a beat later.",reply_delivery:"Whether a reply starts playing as it arrives or once all of it has. Streaming is faster to start and stutters on a bad connection.",update_channel:"Which releases this device is offered. Stable only, or the ones that are still being tried out.",check_for_updates:"Looks now rather than waiting for the next scheduled check. Nothing is installed by pressing it.",bluetooth_proxy:"Forwards nearby Bluetooth advertisements to Home Assistant, so this device extends Bluetooth coverage into its room. It costs some radio time it would otherwise spend on wifi.",metrics_interval:"How often the device reports its own temperature, memory and load. Often enough to be useful; every report is work the device does instead of listening.",purge_cache:"Deletes what Android's runtime has cached. It comes back on its own, so this buys disk space for a while rather than permanently.",test_playback:"Plays a short sound, which is the quickest way to find out whether the speaker, the volume and the output route are all what you think they are.",remote_adb:"Opens Android's debugging port over the network. Off by default, and worth leaving off: it is an unauthenticated way onto the device for anything on the same network.",vad_sensitivity:"How readily the device decides somebody has stopped talking. Tighter ends a turn sooner and can cut you off mid-sentence.",wifi_signal:"How strong the connection to the access point is. Above about -70 dBm is comfortable; below -80 dBm is where audio starts arriving late.",cpu_temperature:"The chip's own temperature. These run warm by design \u2014 it is a sustained climb rather than a number that matters.",load_average:"How much work is queued across the cores. Listening for a wake word is continuous work, so this is never zero.",memory_available:"How much memory is free. Wake models and the audio path are what use it.",free_space:"Disk left. Wake models and saved recordings are what fill it.",update_status:"What the last self-update did. Worth reading when a device is on an older version than the rest."},kr={array:"The seven capsules and what the room sounds like to them. The arc is how loud the room is right now; the notch is how far above the room's own noise floor something has to be before the device treats it as speech. Drag the notch, then talk from where you normally would and watch whether the arc crosses it.",appearance:"Ring controls, current brighness and color, active and conditional effects.",turn:"A turn's budget, end to end. The two grips are how long the device will wait for someone to finish talking, and how long it will wait for Home Assistant to answer. The band is what a slow turn would spend.",noise:"Sounds the device generates itself, mixed live rather than played from a file, so nothing loops. Two layers overlap \u2014 pick rain in one and a fan in the other.",volume:"The speaker's volume, in the same thirty steps the buttons on the device move it through, so this dial and the device agree.",history:"What the device has been hearing. Rows rebuilt from Home Assistant's recorder show what was said; rows the device itself reported also show where the time went and can be played back."},_r={microphone:"The seven microphones and how the room sounds to them. Everything here changes what the device hears before a word of it reaches Home Assistant, so it is the first place to look when it mishears or does not wake at all.",ring:"The twelve-segment light. None of it changes what the device does \u2014 it changes what somebody in the room can tell about it, which is why the muted and failed colours are worth setting.",playback:"The speaker: what comes out of it, how loud, and what happens to music when somebody talks to the device.",assistant:"One wake word and the turn that follows it. A device can run more than one, each with its own word, sensitivity and timings, which is how one device answers to two names.",device:"The device itself rather than anything it hears or says: which releases it takes, what else it does for the network, and the housekeeping.",diagnostics:"What the device reports about itself. Nothing here is a setting \u2014 it is the evidence, and it is what to read before changing anything else."};function Ye(n){return $r[n]}function Xe(n){return kr[n]}function Ze(n){return _r[n]??""}var Ot="echolocal_turn";var Le="turn_audio";var Sr=[{key:"wake_ms",label:"Wake"},{key:"listen_ms",label:"Listen"},{key:"think_ms",label:"Think"},{key:"speak_ms",label:"Reply"}];function wt(n){return Sr.map(({key:i,label:t})=>({key:i,label:t,ms:Number(n[i]??0)})).filter(i=>i.ms>0)}function ot(n){return wt(n).reduce((i,t)=>i+t.ms,0)}function Nt(n){let i=n;if(!i||i.version!=="1"||!i.wake_word)return null;let t={version:1,mac:(i.mac??"").toLowerCase(),id:i.id??"",slot:Je(i.slot)??1,wake_word:i.wake_word,outcome:i.outcome??"completed"};i.heard&&(t.heard=i.heard),i.reply&&(t.reply=i.reply);for(let e of["wake_ms","listen_ms","think_ms","speak_ms","audio_seconds","peak_db","floor_db"]){let r=Je(i[e]);r!==void 0&&(t[e]=r)}return t}function Je(n){if(n===void 0||n==="")return;let i=Number(n);return Number.isFinite(i)?i:void 0}var Qe=`:host {
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
`;var ne=new Map;function ti(n){return ne.get(n)}function ei(n,i,t){let r=`${i.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"")}_${t}`;return n?.services?.esphome?.[r]?r:void 0}async function ii(n,i,t){let e=ne.get(t);if(e)return e;let r=[],s="audio/wav",o=1;for(let d=0;d<Math.min(o,64);d++){let h=await Cr(n,i,t,d);if(!h)return null;o=h.pages||1,s=h.mime||s,r.push(Mr(h.data))}let a=URL.createObjectURL(new Blob(r,{type:s}));return ne.set(t,a),a}async function Cr(n,i,t,e){try{let s=(await n.callService("esphome",i,{id:t,page:e},void 0,!0,!0))?.response;return s?.version===1&&typeof s.data=="string"?s:null}catch{return null}}function Mr(n){let i=atob(n),t=new Uint8Array(i.length);for(let e=0;e<i.length;e++)t[e]=i.charCodeAt(e);return t}var ri=`:host {
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
`;var at=null,z=class extends v{constructor(){super(...arguments);this.device="";this.turn="";this.filename="recording.wav";this.busy=!1;this.playing=!1;this.play=async()=>{if(this.playing){at?.audio.pause();return}let t=await this.fetch();if(!t)return;at?.stop();let e=new Audio(t),r=()=>{this.playing=!1,at?.audio===e&&(at=null)};e.addEventListener("ended",r),e.addEventListener("pause",r),at={audio:e,stop:()=>e.pause()},this.playing=!0,e.play().catch(r)};this.save=async()=>{let t=await this.fetch();if(!t)return;let e=document.createElement("a");e.href=t,e.download=this.filename,e.click()}}disconnectedCallback(){super.disconnectedCallback(),this.playing&&at?.audio.pause()}render(){return!this.turn||!this.action()?p:l`
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
    `}action(){return this.device?ei(this.hass,this.device,Le):void 0}async fetch(){let t=ti(this.turn);if(t)return t;let e=this.action();if(!e)return null;this.busy=!0;try{return await ii(this.hass,e,this.turn)}finally{this.busy=!1}}};z.styles=b(ri),c([u({attribute:!1})],z.prototype,"hass",2),c([u()],z.prototype,"device",2),c([u()],z.prototype,"turn",2),c([u()],z.prototype,"filename",2),c([g()],z.prototype,"busy",2),c([g()],z.prototype,"playing",2),z=c([y("echolocal-recording")],z);var si=24,ni=12,Tr=4e3,M=class extends v{constructor(){super(...arguments);this.mac="";this.wake="";this.heard="";this.reply="";this.device="";this.recorded=[];this.live=[];this.asked=!1}updated(){this.asked||!this.hass||!this.wake||(this.asked=!0,this.load(),this.listen())}disconnectedCallback(){super.disconnectedCallback(),this.stop?.()}render(){let t=this.merged();return l`
      <div class="caption">
        Recent turns ${t.length?l`<span>last ${si} hours</span>`:p}
      </div>
      ${t.length?l`<div class="turns">${t.map(e=>this.row(e,this.scale(t)))}</div>`:l`<div class="none">${this.asked?"Nothing in the last day.":"Looking\u2026"}</div>`}
    `}scale(t){return Math.max(1,...t.map(e=>e.turn?ot(e.turn):0))}row(t,e){let r=t.turn,s=r?wt(r):[],o=r?ot(r):0;return l`<div class="turn">
      <div class="when">${Er(t.at)}</div>
      <div class="wake">${t.wake}</div>
      <div class="right">
        ${r?l`<div class="outcome" data-bad=${String(r.outcome!=="completed")}>
              ${r.outcome==="completed"?`${(o/1e3).toFixed(1)}s`:r.outcome}
            </div>`:p}
        ${r?.audio_seconds?l`<echolocal-recording
              .hass=${this.hass}
              .device=${this.device}
              .turn=${r.id}
              .filename=${zr(t)}
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
    </div>`}merged(){let t=[...this.live];for(let e of this.recorded)t.some(r=>Math.abs(r.at-e.at)<Tr)||t.push(e);return t.sort((e,r)=>r.at-e.at).slice(0,ni)}async load(){let t=[this.wake,this.heard,this.reply].filter(Boolean),e=new Date(Date.now()-si*36e5).toISOString();try{let r=await this.hass.callWS({type:"history/history_during_period",start_time:e,entity_ids:t,minimal_response:!0,no_attributes:!0});this.recorded=Rr(oe(r[this.wake]),oe(r[this.heard]),oe(r[this.reply]))}catch{this.recorded=[]}}async listen(){if(this.hass.connection)try{this.stop=await this.hass.connection.subscribeEvents(t=>{let e=Nt(t.data);e&&(this.mac&&e.mac&&e.mac!==this.mac||(this.live=[{at:Date.now(),wake:e.wake_word,heard:e.heard,reply:e.reply,turn:e},...this.live].slice(0,ni)))},Ot)}catch{}}};M.styles=b(Qe),c([u({attribute:!1})],M.prototype,"hass",2),c([u()],M.prototype,"mac",2),c([u()],M.prototype,"wake",2),c([u()],M.prototype,"heard",2),c([u()],M.prototype,"reply",2),c([u()],M.prototype,"device",2),c([g()],M.prototype,"recorded",2),c([g()],M.prototype,"live",2),c([g()],M.prototype,"asked",2),M=c([y("echolocal-history")],M);function oe(n){return(n??[]).map(i=>({at:i.lu?i.lu*1e3:Date.parse(i.last_updated??""),value:i.s??i.state??""})).filter(i=>Number.isFinite(i.at)&&Pr(i.value))}function Rr(n,i,t){let e=[...n].sort((s,o)=>o.at-s.at),r=s=>[...s].sort((o,a)=>o.at-a.at);return e.map((s,o)=>{let a=e[o-1]?.at??1/0,d=h=>r(h).find(m=>m.at>=s.at&&m.at<a)?.value;return{at:s.at,wake:s.value,heard:d(i),reply:d(t)}})}function Pr(n){return!!n&&n!=="unknown"&&n!=="unavailable"&&n!=="None"}function Er(n){return new Date(n).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function zr(n){let i=new Date(n.at).toISOString().replace(/[:.]/g,"-").slice(0,19),t=n.wake.toLowerCase().replace(/[^a-z0-9]+/g,"-");return`${i}-${t}.wav`}var oi=`:host {
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
`;var ai=`:host {
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
`;var ae=135,le=270,It=100,Ut=100,lt=78,Ir={White:"mdi:grain",Pink:"mdi:blur",Brown:"mdi:waveform",Rain:"mdi:weather-pouring",Ocean:"mdi:waves",Brook:"mdi:water",Wind:"mdi:weather-windy",Fire:"mdi:fireplace",Crickets:"mdi:bug-outline",Fan:"mdi:fan",Cabin:"mdi:airplane"},ct="None",Y=class extends v{constructor(){super(...arguments);this.player="";this.jack="";this.grab=t=>{let e=t.currentTarget;e.setPointerCapture(t.pointerId);let r=d=>{let h=e.getBoundingClientRect(),m=d.clientX-h.left-h.width/2,f=d.clientY-h.top-h.height/2,x=Math.atan2(f,m)*180/Math.PI-ae;for(;x<0;)x+=360;let w=Math.max(0,Math.min(1,Math.min(x,le)/le));return Math.round(w*30)/30},s=d=>this.hass.callService("media_player","volume_set",{entity_id:this.player,volume_level:r(d)}),o=d=>s(d),a=d=>{e.removeEventListener("pointermove",o),e.removeEventListener("pointerup",a),e.removeEventListener("pointercancel",a),s(d)};e.addEventListener("pointermove",o),e.addEventListener("pointerup",a),e.addEventListener("pointercancel",a),s(t)}}render(){let t=this.hass.states[this.player];if(!t)return p;let e=Number(t.attributes.volume_level??0),r=t.attributes.is_volume_muted===!0,s=this.jack?this.hass.states[this.jack]?.state==="on":!1;return l`
      <div class="dial" @pointerdown=${this.grab}>
        <svg viewBox="0 0 200 200" role="img" aria-label="Volume">
          <path class="bed" d=${li()} pathLength="100"></path>
          ${e>0?$`<path class="live" data-muted=${String(r)} d=${li()} pathLength="100"
                stroke-dasharray=${`${e*100} 100`}></path>`:p}
          <text class="step" x=${It} y=${Ut+4}>${Math.round(e*30)}</text>
          <text class="of" x=${It} y=${Ut+20}>of 30</text>
        </svg>
      </div>

      <div class="side">
        <div class="state">${Ur(t.state)}</div>
        <div class="badges">
          <div class="badge" data-on=${String(r)}>
            <ha-icon .icon=${r?"mdi:volume-off":"mdi:volume-high"}></ha-icon>
            ${r?"Muted":`${Math.round(e*100)}%`}
          </div>
          ${this.jack?l`<div class="badge" data-on=${String(s)}>
                <ha-icon icon="mdi:headphones"></ha-icon>
                ${s?"Headphones":"Speaker"}
              </div>`:p}
        </div>
      </div>
    `}};Y.styles=b(ai),c([u({attribute:!1})],Y.prototype,"hass",2),c([u()],Y.prototype,"player",2),c([u()],Y.prototype,"jack",2),Y=c([y("echolocal-volume")],Y);var X=class extends v{constructor(){super(...arguments);this.layers=[];this.busy=!1}render(){let t=this.layers.map(o=>this.hass.states[o]?.state??ct),e=(this.hass.states[this.layers[0]]?.attributes.options??[]).filter(o=>o!==ct),r=t.every(o=>o!==ct),s=o=>t.indexOf(o);return l`
      <div class="caption">
        Generated sound
        <span>${r?"Both layers in use":`${t.filter(o=>o!==ct).length} of 2`}</span>
      </div>
      <div class="grid">
        ${e.map(o=>{let a=s(o);return l`<button
            class="sound"
            data-on=${String(a>=0)}
            ?disabled=${this.busy}
            @click=${()=>this.pick(o,a,t)}
          >
            <ha-icon .icon=${Ir[o]??"mdi:music-note"}></ha-icon>
            ${o}
            ${a>=0&&this.layers.length>1?l`<span class="layer">${a+1}</span>`:p}
          </button>`})}
      </div>
    `}async pick(t,e,r){let s=r.findIndex(a=>a===ct),o=e>=0?e:s>=0?s:this.layers.length-1;if(!(o<0)){this.busy=!0;try{await this.hass.callService("select","select_option",{entity_id:this.layers[o],option:e>=0?ct:t})}finally{this.busy=!1}}}};X.styles=b(oi),c([u({attribute:!1})],X.prototype,"hass",2),c([u({attribute:!1})],X.prototype,"layers",2),c([g()],X.prototype,"busy",2),X=c([y("echolocal-noise")],X);function Ur(n){return n==="playing"?"Playing":n==="paused"?"Paused":n==="unavailable"?"Unavailable":"Idle"}function li(){let n=ae*Math.PI/180,i=(ae+le)*Math.PI/180;return`M${(It+lt*Math.cos(n)).toFixed(2)} ${(Ut+lt*Math.sin(n)).toFixed(2)}
    A${lt} ${lt} 0 1 1 ${(It+lt*Math.cos(i)).toFixed(2)} ${(Ut+lt*Math.sin(i)).toFixed(2)}`}var ci=`:host {
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
`;var q=class extends v{constructor(){super(...arguments);this.listen="";this.think="";this.held={}}render(){let t=this.reading(this.listen),e=this.reading(this.think);if(!t||!e)return p;let r=t.max+e.max,s=o=>o/r*100;return l`
      <div class="top">
        <div class="caption">A turn</div>
        <div class="total">
          longest <b>${(t.value+e.value).toFixed(0)}s</b> of ${r.toFixed(0)}s
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
    `}grip(t,e,r,s){return l`<div
      class="grip"
      style=${`left:calc(${r}px + ${s}% - ${r*s/100}px)`}
      role="slider"
      aria-label=${t}
      aria-valuenow=${e.value}
      @pointerdown=${o=>this.drag(o,t,e)}
    ></div>`}drag(t,e,r){let s=t.currentTarget.parentElement;s.setPointerCapture(t.pointerId);let o=e===this.listen?this.reading(this.think):this.reading(this.listen),a=e===this.think?this.reading(this.listen)?.value??0:0,d=(r.max??0)+(o?.max??0),h=x=>{let w=s.getBoundingClientRect(),_=64,T=w.width-_,Kt=Math.max(0,Math.min(1,(x.clientX-w.left-_)/T))*d-a,ht=Math.round(Kt/(r.step||1))*(r.step||1);return Math.max(r.min,Math.min(r.max,ht))},m=x=>{this.held={...this.held,[e]:h(x)}},f=x=>{s.removeEventListener("pointermove",m),s.removeEventListener("pointerup",f),s.removeEventListener("pointercancel",f);let w=h(x),{[e]:_,...T}=this.held;this.held=T,this.hass.callService("number","set_value",{entity_id:e,value:w})};s.addEventListener("pointermove",m),s.addEventListener("pointerup",f),s.addEventListener("pointercancel",f)}reading(t){let e=this.hass?.states?.[t];if(!e)return null;let r=this.held[t]??Number(e.state);return Number.isFinite(r)?{value:r,min:e.attributes.min??0,max:e.attributes.max??30,step:e.attributes.step??1}:null}};q.styles=b(ci),c([u({attribute:!1})],q.prototype,"hass",2),c([u()],q.prototype,"listen",2),c([u()],q.prototype,"think",2),c([g()],q.prototype,"held",2),q=c([y("echolocal-turn")],q);var C=class extends v{constructor(){super(...arguments);this.heading="";this.subtitle="";this.icon="";this.sections=[];this.widgets=[];this.device="";this.mac="";this.help=!0;this.about="";this.held={}}render(){let t=this.sections.map(o=>({...o,rows:o.rows.filter(a=>this.hass.states?.[a.entityId])})).filter(o=>o.rows.length),s=`--ha-dialog-width-md:${t.reduce((o,a)=>o+a.rows.length,0)>3||this.widgets.some(o=>o.place!=="header")?820:460}px`;return l`
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
    `}widget({widget:t,roles:e,lists:r}){let s=o=>o?.[0]??"";switch(t){case"appearance":return l`<echolocal-appearance
          class="hero"
          .hass=${this.hass}
          .light=${e.light}
          .muted=${s(r.muted)}
          .failure=${s(r.failure)}
          .room=${s(r.room)}
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
          .jack=${s(r.jack)}
        ></echolocal-volume>`;case"noise":return l`<echolocal-noise
          class="hero"
          .hass=${this.hass}
          .layers=${r.layers??[]}
        ></echolocal-noise>`;case"player":return this.crownPlayer(e.player);case"power":return this.crownPower(e.light);case"mute":return this.crownMute(e.mute,e.lamp)}}crownPlayer(t){let e=this.hass.states[t],r=e?.state==="playing",s=e?.attributes.is_volume_muted!==!0;return l`<div class="crown">
      <ha-icon-button
        .label=${r?"Pause":"Play"}
        @click=${()=>this.hass.callService("media_player",r?"media_pause":"media_play",{entity_id:t})}
      >
        <ha-icon .icon=${r?"mdi:pause":"mdi:play"}></ha-icon>
      </ha-icon-button>
      ${this.crownSwitch(s,"Sound",o=>this.hass.callService("media_player","volume_mute",{entity_id:t,is_volume_muted:!o}))}
    </div>`}crownPower(t){return l`<div class="crown">
      ${this.crownSwitch(this.hass.states[t]?.state==="on","Ring",e=>this.hass.callService("light",e?"turn_on":"turn_off",{entity_id:t}))}
    </div>`}crownMute(t,e){let r=this.hass.states[e];return l`<div class="crown">
      ${r?l`<ha-control-select
            class="lamp"
            .options=${(r.attributes.options??[]).map(s=>({value:s,label:s}))}
            .value=${r.state}
            label="Mute indicator"
            @value-changed=${s=>this.hass.callService("select","select_option",{entity_id:e,option:s.detail.value})}
          ></ha-control-select>`:p}
      ${this.crownSwitch(this.hass.states[t]?.state==="on","Microphone mute",s=>this.hass.callService("switch",s?"turn_on":"turn_off",{entity_id:t}),"warn")}
    </div>`}crownSwitch(t,e,r,s=""){return l`<ha-control-switch
      class=${s}
      .checked=${t}
      .label=${e}
      @change=${o=>r(o.target.checked)}
    ></ha-control-switch>`}get muted(){let t=this.widgets.find(e=>e.roles.mute)?.roles.mute;return!!t&&this.hass.states[t]?.state==="on"}explained(t){let e=this.help?Xe(t.widget):void 0;return e?l`<div class="explained">
      ${this.widget(t)}
      <echolocal-bubble class="corner" .text=${e}></echolocal-bubble>
    </div>`:this.widget(t)}group(t){return l`<section class="group">
      ${t.title?l`<div class="section">${t.title}</div>`:p}
      ${t.rows.map(e=>this.row(e))}
    </section>`}row(t){if(!this.hass.states?.[t.entityId])return p;switch(t.entityId.split(".")[0]){case"switch":return this.toggle(t,"switch");case"light":return this.toggle(t,"light");case"number":return this.slider(t);case"select":return this.options(t);case"button":return this.press(t);case"update":return this.version(t);default:return this.reading(t)}}version(t){let e=this.hass.states[t.entityId],r=e.attributes.installed_version,s=e.attributes.latest_version;return this.tile(t,!1,{trail:e.attributes.in_progress?l`<ha-spinner size="tiny"></ha-spinner>`:l`<button class="reading" @click=${()=>this.moreInfo(t.entityId)}>
              ${r?String(r):e.state}
            </button>
            ${e.state==="on"?l`<ha-button
                  size="small"
                  @click=${()=>this.hass.callService("update","install",{entity_id:t.entityId})}
                >
                  ${String(s)}
                </ha-button>`:p}`})}toggle(t,e){let{entityId:r,label:s}=t,o=this.hass.states[r].state;return this.tile(t,o==="on",{trail:l`<ha-control-switch
        .checked=${o==="on"}
        .disabled=${o==="unavailable"}
        .label=${s}
        @change=${a=>this.hass.callService(e,a.target.checked?"turn_on":"turn_off",{entity_id:r})}
      ></ha-control-switch>`})}slider(t){let{entityId:e}=t,r=this.hass.states[e],s=r.attributes,o=s.min??0,a=s.max??100,d=this.held[e]??Number(r.state);return this.tile(t,!1,{trail:l`<span class="reading">${Number.isNaN(d)?"\u2014":d}</span>
        ${s.unit_of_measurement?l`<span class="unit">${s.unit_of_measurement}</span>`:p}`,under:l`<ha-control-slider
        .value=${d}
        .min=${o}
        .max=${a}
        .step=${s.step??1}
        .unit=${s.unit_of_measurement??""}
        .disabled=${r.state==="unavailable"}
        @slider-moved=${h=>{this.held={...this.held,[e]:h.detail.value}}}
        @value-changed=${h=>{let{[e]:m,...f}=this.held;this.held=f,this.hass.callService("number","set_value",{entity_id:e,value:h.detail.value})}}
      ></ha-control-slider>`})}options(t){let{entityId:e}=t,r=this.hass.states[e],s=r.attributes.options??[],o=s.map(m=>({value:m,label:m})),a=m=>{m&&m!==r.state&&this.hass.callService("select","select_option",{entity_id:e,option:m})},d=r.state==="unavailable",h=s.length<=4&&s.join("").length<=36;return this.tile(t,!1,{trail:h?l`<ha-control-select
            .options=${o}
            .value=${r.state}
            .disabled=${d}
            .label=${t.label}
            @value-changed=${m=>a(m.detail.value)}
          ></ha-control-select>`:l`<ha-control-select-menu
            .options=${o}
            .value=${r.state}
            .disabled=${d}
            .label=${t.label}
            hide-label
            show-arrow
            @wa-select=${m=>a(m.detail.item?.value)}
          ></ha-control-select-menu>`})}press(t){return this.tile(t,!1,{trail:l`<ha-button
        size="small"
        @click=${()=>this.hass.callService("button","press",{entity_id:t.entityId})}
      >
        Run
      </ha-button>`})}reading(t){let e=this.hass.states[t.entityId],r=e.attributes.unit_of_measurement;return this.tile(t,!1,{trail:l`<button class="reading" @click=${()=>this.moreInfo(t.entityId)}>
          ${e.state}
        </button>
        ${r?l`<span class="unit">${r}</span>`:p}`})}tile({entityId:t,label:e,name:r},s,o){let a=this.hass.states[t].attributes.icon,d=s&&a?.includes("mic")&&a.includes("off"),h=this.help?Ye(r):void 0;return l`<div class="tile" data-active=${String(s&&!d)} data-alert=${String(!!d)}>
      <div class="top">
        <div class="icon"><ha-icon .icon=${a??"mdi:tune"}></ha-icon></div>
        <div class="named">
          <div class="name">${e}</div>
          ${h?l`<echolocal-bubble .text=${h}></echolocal-bubble>`:p}
        </div>
        ${o.trail?l`<div class="trail">${o.trail}</div>`:p}
      </div>
      ${o.under??p}
    </div>`}moreInfo(t){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}dismiss(){this.dispatchEvent(new CustomEvent("closed",{bubbles:!0,composed:!0}))}};C.styles=b(Ge),c([u({attribute:!1})],C.prototype,"hass",2),c([u()],C.prototype,"heading",2),c([u()],C.prototype,"subtitle",2),c([u()],C.prototype,"icon",2),c([u({attribute:!1})],C.prototype,"sections",2),c([u({attribute:!1})],C.prototype,"widgets",2),c([u()],C.prototype,"device",2),c([u()],C.prototype,"mac",2),c([u({type:Boolean})],C.prototype,"help",2),c([u()],C.prototype,"about",2),c([g()],C.prototype,"held",2),C=c([y("echolocal-dialog")],C);function di(n,i){let t=pi(n);return i.map(e=>{let r=t?.get(e.entity_id);return{...e,name:r?.name??"",slot:r?.slot??0,part:r?.part??0}})}function $t(n){let i=new Map;for(let t of n){let e=i.get(t.name);e?e.push(t):i.set(t.name,[t])}for(let t of i.values())t.sort((e,r)=>e.slot-r.slot);return i}var Wt="echolocal-keys",Dt=null,ce=null;function pi(n){return Dt||(Dt=Wr(n),Dt.then(()=>window.dispatchEvent(new Event(Wt))),jr(n)),ce}async function Wr(n){let i=new Map;try{let t=await n.callWS({type:"config/entity_registry/list"});for(let e of t)e.device_id&&i.set(e.entity_id,{entityId:e.entity_id,deviceId:e.device_id,...de(e.unique_id),platform:e.platform,disabled:!!e.disabled_by})}catch{}return ce=i,i}function de(n){let i=n.replace(/^(?:[0-9a-f]{2}:){5}[0-9a-f]{2}-?/i,""),t=i.lastIndexOf("@"),e=t<0?0:Number(i.slice(t+1))||0,r=t<0?i:i.slice(0,t),s=r.indexOf("-"),o=s<0?r:r.slice(s+1),a=o.lastIndexOf("_"),d=a<0?"":o.slice(a+1),h=/^\d+$/.test(d);return{name:h?o.slice(0,a):o,slot:h?Number(d):0,part:e}}function jr(n){n.connection?.subscribeEvents(()=>{Dt=null,ce=null,pi(n)},"entity_registry_updated").catch(()=>{})}var jt={ring:[{title:null,rows:[["ring","Ring"]]},{title:"Segments",rows:[["segment","Segment"]]}],microphone:[{title:null,rows:[["mic_mute","Mute"]]},{title:"Capture",rows:[["microphone_gain","Gain"],["microphone_mixing","Mixing"],["microphone_leveling","Leveling"],["microphone_cancel_echo","Echo cancellation"]]},{title:"The room",rows:[["microphone_sensitivity","Sensitivity"],["room_level","Room level"],["room_floor","Room floor"],["stop_word_sensitivity","Stop word"]]},{title:"Indicator",rows:[["mute_led_brightness","Mute light"]]}],playback:[{title:null,rows:[["headphones","Headphones"]]},{title:"Generated sound",rows:[["noise_layer","Layer"]]},{title:"During a turn",rows:[["media_on_turn","Music"],["media_duck_level","Ducking"]]},{title:"Voice",rows:[["voice_resampling","Resampling"]]}],assistant:[{title:null,rows:[["wake_word","Wake word"],["pipeline","Pipeline"],["wake_threshold","Wake sensitivity"]]},{title:"Timing",rows:[["max_listen","Max listen"],["max_think","Max think"],["follow_up","Follow up"]]},{title:"Feedback",rows:[["wake_effect","Ring effect"],["wake_tone","Chime"]]},{title:"Reply",rows:[["reply_buffer","Buffer"],["reply_delivery","Delivery"]]}],device:[{title:null,rows:[["firmware","Firmware"],["update_channel","Update channel"],["check_for_updates","Check for updates"]]},{title:"Listening",rows:[["vad_sensitivity","End of speech"]]},{title:"Bluetooth",rows:[["bluetooth_proxy","Proxy"]]},{title:"Maintenance",rows:[["metrics_interval","Metrics interval"],["purge_cache","Purge cache"],["test_playback","Test playback"],["remote_adb","Remote adb"]]}],diagnostics:[{title:"Network",rows:[["ip_address","IP address"],["wifi_signal","Signal"],["wifi_sent","Sent"],["wifi_received","Received"],["ble_advertisements","Bluetooth advertisements"]]},{title:"Hardware",rows:[["cpu_temperature","CPU"],["radio_temperature","Radio"],["cpu_cores","Cores"],["cpu_cores_online","Cores online"],["load_average","Load"],["memory_available","Memory"],["free_space","Disk"],["cached_data","Cached data"]]},{title:"The room",rows:[["room_level","Room level"],["room_floor","Room floor"]]},{title:"Updates",rows:[["update_status","Update status"],["update_outcome","Last update"]]}]},Fr={ring:[{widget:"power",place:"header",roles:{light:"ring"}},{widget:"appearance",roles:{light:"ring"},lists:{segments:"segment",muted:"ring_muted",failure:"failure_effect",room:"room_reaction"}}],assistant:[{widget:"turn",roles:{listen:"max_listen",think:"max_think"}}],playback:[{widget:"player",place:"header",roles:{player:"speaker"}},{widget:"volume",roles:{player:"speaker"},lists:{jack:"headphones"}},{widget:"noise",roles:{first:"noise_layer"},lists:{layers:"noise_layer"}}],microphone:[{widget:"mute",place:"header",roles:{mute:"mic_mute",lamp:"mute_led_brightness"}},{widget:"array",roles:{level:"room_level",floor:"room_floor",gate:"microphone_sensitivity",mode:"microphone_mixing"}}]},qr=[["ring","ring"],["microphone","mic_mute"],["playback","speaker"]];function hi(n){let i=qr.filter(([,t])=>n.by.has(t)).map(([t])=>({kind:t,slot:0}));for(let t of n.by.get("wake_threshold")??[])i.push({kind:"assistant",slot:t.slot});return i}function ui(n,i,t=0){let e=[],r=new Set;for(let s of Fr[n]??[]){let o={};for(let[d,h]of Object.entries(s.roles)){let m=pe(i.by,h,t)[0];m&&(o[d]=m.entity_id)}if(Object.keys(o).length!==Object.keys(s.roles).length)continue;let a={};for(let[d,h]of Object.entries(s.lists??{}))a[d]=pe(i.by,h,t).map(m=>m.entity_id);e.push({widget:s.widget,place:s.place??"body",roles:o,lists:a}),[...Object.values(o),...Object.values(a).flat()].forEach(d=>r.add(d))}return{widgets:e,sections:fi(jt[n]??[],i.by,t,r)}}var Br=new Set(["switch","select","number","button","text","time","update"]),Kr=new Set(Object.entries(jt).filter(([n])=>n!=="device").flatMap(([,n])=>n.flatMap(i=>i.rows.map(([t])=>t))));function mi(n){return vi(jt.device??[],n.entities.filter(i=>i.device_id===n.device.id&&Br.has(i.entity_id.split(".")[0])&&!Kr.has(i.name)),new Set)}function gi(n){let i=n.entities.filter(s=>s.entity_category==="diagnostic"),t=$t(i),e={};for(let[s,o]of Object.entries({wake:"last_wake_word",heard:"last_heard",reply:"last_reply"})){let a=t.get(o)?.[0];a&&(e[s]=a.entity_id)}return{widgets:e.wake?[{widget:"history",place:"body",roles:e,lists:{}}]:[],sections:vi(jt.diagnostics??[],i,new Set(Object.values(e)))}}function pe(n,i,t){let e=n.get(i)??[];return t?e.filter(r=>(r.slot||1)===t):e}function fi(n,i,t,e){let r=[];for(let s of n){let o=[];for(let[a,d]of s.rows){let h=pe(i,a,t);for(let m of h)e.has(m.entity_id)||o.push({entityId:m.entity_id,name:a,label:h.length>1?`${d} ${m.slot}`:d})}o.length&&r.push({title:s.title,rows:o})}return r}function vi(n,i,t){let e=fi(n,$t(i),0,t),r=new Set(e.flatMap(o=>o.rows.map(a=>a.entityId))),s=i.filter(o=>!r.has(o.entity_id)&&!t.has(o.entity_id));return s.length?[...e,{title:e.length?"More":null,rows:s.map(o=>({entityId:o.entity_id,name:o.name,label:o.name||o.entity_id})).sort((o,a)=>o.label.localeCompare(a.label))}]:e}var Gr="EchoLocal",Vr="esphome",kt=12;function Yr(n){return!!n?.identifiers?.some(([i])=>i===Vr)}function bi(n,i){return Object.values(n.devices??{}).filter(t=>t.via_device_id===i&&!t.disabled_by).sort((t,e)=>k(t).localeCompare(k(e)))}function H(n){return n?Object.values(n.devices??{}).filter(i=>Xr(n,i.id)&&!i.via_device_id&&!i.disabled_by).sort((i,t)=>k(i).localeCompare(k(t))):[]}function k(n){return n?.name_by_user||n?.name||""}function Xr(n,i){return n?.devices?.[i]?.manufacturer!==Gr?!1:bi(n,i).some(Yr)}function B(n,i){if(!n||!i)return null;let t=n.devices?.[i];if(!t)return null;let e=new Set([i,...bi(n,i).map(d=>d.id)]),r=di(n,Object.values(n.entities??{}).filter(d=>d.device_id&&e.has(d.device_id)&&!d.hidden)),s=$t(r),o=d=>s.get(d)?.[0]?.entity_id,a=new Array(kt).fill(void 0);for(let d of s.get("segment")??[]){let h=d.slot-1;h>=0&&h<kt&&(a[h]=d.entity_id)}return{device:t,entities:r,by:s,satellite:o("assist_satellite"),player:o("speaker"),update:o("firmware"),ring:o("ring"),segments:a,mute:o("mic_mute")}}function yi(n){return(n.by.get("wake_assistant")??[]).map(i=>i.entity_id)}function _t(n,i){let t=i?n?.states?.[i]:void 0;return!t||t.state!=="on"?null:{rgb:t.attributes.rgb_color??[255,255,255],level:(t.attributes.brightness??255)/255}}function xi(n,i){return!!i&&n?.states?.[i]?.state==="on"}function wi(n,i){return(i?n?.states?.[i]?.state:void 0)??"unavailable"}async function $i(n,i){let t=new Array(kt).fill(void 0);if(!n.user?.is_admin)return t;let e=new Set(i.entities.map(r=>r.device_id));try{let r=await n.callWS({type:"config/entity_registry/list"});for(let s of r){if(!s.disabled_by||!s.device_id||!e.has(s.device_id))continue;let{name:o,slot:a}=de(s.unique_id);o==="segment"&&a>=1&&a<=kt&&(t[a-1]=s.entity_id)}}catch{}return t}async function ki(n,i){await n.callWS({type:"config/entity_registry/update",entity_id:i,disabled_by:null})}var _i=[["White",[255,255,255]],["Warm",[255,190,120]],["Red",[255,40,40]],["Orange",[255,130,20]],["Yellow",[250,230,60]],["Green",[60,220,90]],["Teal",[40,220,200]],["Blue",[60,140,255]],["Violet",[150,90,255]],["Pink",[255,90,200]]];var Zr={device_id:"Device",shell:"Shell",help:"Explain each setting"},dt={ring:"mdi:record-circle-outline",microphone:"mdi:microphone",playback:"mdi:speaker",assistant:"mdi:account-voice",device:"mdi:cog-outline",diagnostics:"mdi:stethoscope",follow:"mdi:backup-restore",close:"mdi:check"},Jr={idle:"Idle",listening:"Listening",processing:"Thinking",responding:"Speaking",unavailable:"Unavailable",unknown:"Unknown"},P=class extends v{constructor(){super(...arguments);this.opened=null;this.picked=null;this.holding=!1;this.timer=0;this.hiddenSegments=[];this.offering=null;this.asked=!1}static getConfigElement(){return document.createElement("echolocal-satellite-card-editor")}static getStubConfig(t){return{device_id:H(t)[0]?.id??""}}setConfig(t){if(!t?.device_id)throw new Error("Choose an EchoLocal device");this.config={shell:"grey",...t}}getCardSize(){return 6}updated(){if(this.asked||!this.hass||!this.config)return;let t=B(this.hass,this.config.device_id);!t||t.segments.some(Boolean)||(this.asked=!0,$i(this.hass,t).then(e=>this.hiddenSegments=e))}render(){if(!this.hass||!this.config)return p;let t=B(this.hass,this.config.device_id);if(!t)return l`<ha-card><div class="missing">Device not found</div></ha-card>`;let e=wi(this.hass,t.satellite);return l`
      <ha-card>
        <div class="frame">
          <div class="art" data-shell=${this.config.shell??"grey"} data-activity=${e}>
            ${De({segments:this.segments(t),glow:this.glow(t),muted:xi(this.hass,t.mute),holding:this.holding,picked:this.picked,divisible:[...t.segments,...this.hiddenSegments].some(Boolean)},{ring:()=>this.open({kind:"ring",slot:0}),segment:r=>this.tapped(t,r),action:r=>this.pressed(t,r),mute:()=>this.toggle("switch",t.mute),volume:r=>this.volume(t,r)})}
          </div>

          <div class="side">${this.side(t)}</div>

          ${this.offering!==null?this.offer(this.offering):this.picked===null?this.foot(t,e):this.palette(t)}
        </div>
      </ha-card>

      ${this.popup(t)}
    `}foot(t,e){return l`<div class="foot">
      <div class="label">
        <div class="name">${k(t.device)}</div>
        <div class="status">${Jr[e]??e}</div>
      </div>
      <div class="tail">
        ${this.square(dt.device,"Settings",()=>this.open({kind:"device",slot:0}))}
        ${this.square(dt.diagnostics,"Diagnostics",()=>this.open({kind:"diagnostics",slot:0}))}
      </div>
    </div>`}tapped(t,e){if(t.segments[e]){this.picked=this.picked===e?null:e;return}if(this.hiddenSegments[e]){this.offering=e;return}this.open({kind:"ring",slot:0})}offer(t){let e=async r=>{for(let s of r)s&&await ki(this.hass,s);this.hiddenSegments=this.hiddenSegments.map(s=>r.includes(s)?void 0:s),this.offering=null,this.picked=t};return l`<div class="foot">
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
        ${_i.map(([r,s])=>l`<button
            class="swatch"
            title=${r}
            aria-label=${r}
            style=${`background:rgb(${s.join(",")})`}
            @click=${()=>this.hass.callService("light","turn_on",{entity_id:e,rgb_color:s})}
          ></button>`)}
      </div>
    </div>`}segments(t){let e=_t(this.hass,t.ring);return Array.from({length:xt},(r,s)=>{let o=_t(this.hass,t.segments[s])??e;return{fill:o?`rgb(${o.rgb.join(",")})`:"var(--el-ring-off)",opacity:o?.25+.75*o.level:1}})}glow(t){return _t(this.hass,t.ring)||t.segments.some(r=>_t(this.hass,r))?.55:0}side(t){let e=hi(t),r=e.filter(s=>s.kind==="assistant").length>1;return e.map(({kind:s,slot:o})=>this.square(dt[s],this.titled(s,o),()=>this.open({kind:s,slot:o}),r&&s==="assistant"?o:null))}titled(t,e){let r={ring:"Ring",microphone:"Microphone",playback:"Playback",assistant:"Assistant",device:"Settings",diagnostics:"Diagnostics"}[t];return e?`${r} ${e}`:r}square(t,e,r,s=null){return l`<button class="sq" title=${e} aria-label=${e} @click=${r}>
      <ha-icon .icon=${t}></ha-icon>
      ${s?l`<span class="badge">${s}</span>`:p}
    </button>`}popup(t){if(!this.opened)return p;let{kind:e,slot:r}=this.opened,s,o=[];return e==="device"?s=mi(t):e==="diagnostics"?{widgets:o,sections:s}=gi(t):{widgets:o,sections:s}=ui(e,t,r),l`<echolocal-dialog
      .hass=${this.hass}
      .heading=${this.titled(e,r)}
      .subtitle=${k(t.device)}
      .icon=${dt[e]}
      .sections=${s}
      .widgets=${o}
      .device=${k(t.device)}
      .mac=${t.device.connections?.find(([a])=>a==="mac")?.[1]??""}
      .help=${this.config.help!==!1}
      .about=${Ze(e)}
      @closed=${()=>this.opened=null}
    ></echolocal-dialog>`}open(t){this.opened=t}pressed(t,e){if(e==="down"){this.holding=!1,this.timer=window.setTimeout(()=>this.holding=!0,Ue);return}clearTimeout(this.timer);let r=this.holding;if(this.holding=!1,e==="cancel")return;let s=yi(t),o=s[r&&s.length>1?1:0];o?this.hass.callService("button","press",{entity_id:o}):this.moreInfo(t.satellite)}toggle(t,e){e&&this.hass.callService(t,"toggle",{entity_id:e})}volume(t,e){t.player&&this.hass.callService("media_player",e>0?"volume_up":"volume_down",{entity_id:t.player})}moreInfo(t){t&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}};P.styles=b(We),c([u({attribute:!1})],P.prototype,"hass",2),c([g()],P.prototype,"config",2),c([g()],P.prototype,"opened",2),c([g()],P.prototype,"picked",2),c([g()],P.prototype,"holding",2),c([g()],P.prototype,"hiddenSegments",2),c([g()],P.prototype,"offering",2),P=c([y("echolocal-satellite-card")],P);var pt=class extends v{setConfig(i){this.config={shell:"grey",...i}}render(){if(!this.hass||!this.config)return p;let i=[{name:"device_id",required:!0,selector:{select:{mode:"dropdown",options:H(this.hass).map(t=>({value:t.id,label:k(t)}))}}},{name:"shell",selector:{select:{mode:"dropdown",options:[{value:"grey",label:"Grey (unknown)"},{value:"black",label:"Black"},{value:"white",label:"White"}]}}},{name:"help",selector:{boolean:{}}}];return l`<ha-form
      .hass=${this.hass}
      .data=${{help:!0,...this.config}}
      .schema=${i}
      .computeLabel=${t=>Zr[t.name]??t.name}
      @value-changed=${t=>this.emit(t.detail.value)}
    ></ha-form>`}emit(i){this.config={...this.config,...i},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}};c([u({attribute:!1})],pt.prototype,"hass",2),c([g()],pt.prototype,"config",2),pt=c([y("echolocal-satellite-card-editor")],pt);var he=[];function N(n){he.push(n),he.sort((i,t)=>i.order-t.order||i.title.localeCompare(t.title))}function me(n){return he.filter(i=>n||!i.admin)}function Si(n,i){let t=ue(n),e=me(i);return e.find(r=>r.path===t)??e[0]}function Ai(n,i){let t=i?`${n}/${i}`:n;location.pathname!==t&&history.pushState(null,"",t),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}function ge(n,i){if(i!==void 0)return ue(i);let t=location.pathname;return ue(t.startsWith(n)?t.slice(n.length):"")}function ue(n){return n.replace(/^\/+|\/+$/g,"")}var Ci=`:host {
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
`;var fe="";async function Ft(n){try{return await n.callWS({type:"config/label_registry/list"})??[]}catch{return[]}}function qt(n,i){let t=new Map,e=[];for(let s of n){let o=s.labels??[];if(!o.length){e.push(s);continue}for(let a of o){let d=i.find(m=>m.label_id===a),h=t.get(a);h?h.devices.push(s):t.set(a,{id:a,name:d?.name??a,icon:d?.icon,devices:[s]})}}let r=[...t.values()].sort((s,o)=>s.name.localeCompare(o.name));return e.length&&r.push({id:fe,name:"Ungrouped",devices:e}),r}async function Mi(n,i){try{return await n.callWS({type:"config/label_registry/create",name:i})}catch{return null}}async function Hi(n,i,t){await n.callWS({type:"config/label_registry/update",label_id:i,name:t})}async function Ti(n,i){await n.callWS({type:"config/label_registry/delete",label_id:i})}async function Ri(n,i,t){await n.callWS({type:"config/device_registry/update",device_id:i,labels:[...new Set(t)]})}async function Pi(n,i,t,e){let r=0,s=0,o=0;return await Promise.all(i.map(async a=>{let d=Ei(n,a,t);if(!d){o+=1;return}try{await e(d),r+=1}catch{s+=1}})),{done:r,failed:s,missing:o}}function Bt(n,i,t){let e=i.map(s=>Ei(n,s,t)).filter(s=>!!s),r=[...new Set(e.map(s=>n.states[s]?.state).filter(Boolean))];return{value:r.length===1?r[0]:null,mixed:r.length>1,entities:e}}function Ei(n,i,t){return B(n,i.id)?.by.get(t)?.[0]?.entity_id}var zi=`:host {
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
`;var Oi="mic_mute",Ni="ring",Ii="speaker",Z=class extends v{constructor(){super(...arguments);this.said=""}render(){if(!this.hass||!this.group)return p;let t=this.group.devices,e=Bt(this.hass,t,Oi),r=Bt(this.hass,t,Ni);return l`<div class="bar">
      ${this.group.icon?l`<ha-icon .icon=${this.group.icon}></ha-icon>`:p}
      <div class="name">${this.group.name}</div>
      <div class="count">${t.length} ${t.length===1?"device":"devices"}</div>
      <div class="spacer"></div>
      ${this.said?l`<div class="short">${this.said}</div>`:p}

      ${e.entities.length?this.toggle("mdi:microphone-off","Mute all",e,()=>this.write(Oi,"switch",e.value==="on"?"turn_off":"turn_on")):p}
      ${r.entities.length?this.toggle("mdi:lightbulb-outline","Ring",r,()=>this.write(Ni,"light",r.value==="on"?"turn_off":"turn_on")):p}
      ${this.has(Ii)?l`<button title="Stop whatever is playing" @click=${()=>this.write(Ii,"media_player","media_stop")}>
            <ha-icon icon="mdi:stop"></ha-icon>Stop
          </button>`:p}
    </div>`}toggle(t,e,r,s){return l`<button data-on=${String(r.value==="on")} @click=${s}>
      <ha-icon .icon=${t}></ha-icon>${e}
      ${r.mixed?l`<span class="mixed">mixed</span>`:p}
    </button>`}has(t){return Bt(this.hass,this.group.devices,t).entities.length>0}async write(t,e,r){let{done:s,failed:o,missing:a}=await Pi(this.hass,this.group.devices,t,h=>this.hass.callService(e,r,{entity_id:h})),d=o+a;this.said=d?`${s} of ${s+d}`:"",this.said&&setTimeout(()=>this.said="",4e3)}};Z.styles=b(zi),c([u({attribute:!1})],Z.prototype,"hass",2),c([u({attribute:!1})],Z.prototype,"group",2),c([g()],Z.prototype,"said",2),Z=c([y("echolocal-groupbar")],Z);var Ui=`:host {
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
`;N({path:"",title:"Home",icon:"mdi:view-grid-outline",element:"echolocal-home",order:0});var Di="echolocal:home:grouped",I=class extends v{constructor(){super(...arguments);this.narrow=!1;this.known=[];this.asked=!1;this.grouped=localStorage.getItem(Di)!=="no";this.cards=new Map}updated(){this.asked||!this.hass||(this.asked=!0,this.load())}render(){if(!this.hass)return p;let t=H(this.hass);if(!t.length)return l`<div class="empty">
        No EchoLocal devices yet. One appears here once Home Assistant has adopted it over the ESPHome
        integration.
      </div>`;let e=qt(t,this.known),r=e.some(o=>o.id!==fe),s=this.grouped&&r?e:[{id:"all",name:"All devices",devices:t}];return l`
      ${r?l`<div class="view">
            <div class="pair">
              ${this.button(!0,"mdi:group","Grouped")}${this.button(!1,"mdi:view-grid-outline","All")}
            </div>
          </div>`:p}
      ${s.map(o=>this.group(o))}
    `}button(t,e,r){return l`<button
      data-on=${String(this.grouped===t)}
      @click=${()=>{this.grouped=t,localStorage.setItem(Di,t?"yes":"no")}}
    >
      <ha-icon .icon=${e}></ha-icon>${r}
    </button>`}group(t){return l`<div class="group">
      <echolocal-groupbar .hass=${this.hass} .group=${t}></echolocal-groupbar>
      <div class="grid">${t.devices.map(e=>this.card(t.id,e.id))}</div>
    </div>`}card(t,e){let r=`${t}/${e}`,s=this.cards.get(r);return s||(s=document.createElement("echolocal-satellite-card"),s.setConfig({device_id:e}),this.cards.set(r,s)),s.hass=this.hass,s}async load(){this.known=await Ft(this.hass)}};I.styles=b(Ui),c([u({attribute:!1})],I.prototype,"hass",2),c([u({type:Boolean})],I.prototype,"narrow",2),c([g()],I.prototype,"known",2),c([g()],I.prototype,"asked",2),c([g()],I.prototype,"grouped",2),I=c([y("echolocal-home")],I);var Wi=`:host {
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
`;N({path:"groups",title:"Groups",icon:"mdi:group",element:"echolocal-groups",order:30,admin:!0});var U=class extends v{constructor(){super(...arguments);this.known=[];this.asked=!1;this.naming="";this.busy=!1}connectedCallback(){super.connectedCallback(),this.hass?.connection?.subscribeEvents(()=>this.load(),"label_registry_updated").then(t=>this.stop=t).catch(()=>{})}disconnectedCallback(){super.disconnectedCallback(),this.stop?.()}updated(){this.asked||!this.hass||(this.asked=!0,this.load())}render(){if(!this.hass)return p;let t=H(this.hass),e=this.known;return l`
      <div class="make">
        <input
          class="new"
          placeholder="New group"
          .value=${this.naming}
          @input=${r=>this.naming=r.target.value}
          @keydown=${r=>r.key==="Enter"&&this.make()}
        />
        <button class="make" ?disabled=${!this.naming.trim()||this.busy} @click=${this.make}>
          ${this.busy?"Adding\u2026":"Add"}
        </button>
      </div>

      ${t.length?l`<table>
            <thead>
              <tr>
                <th class="who">Device</th>
                ${e.map(r=>this.head(r))}
              </tr>
            </thead>
            <tbody>
              ${t.map(r=>this.row(r,e))}
            </tbody>
          </table>`:l`<div class="none">
            No EchoLocal devices yet, so there is nothing to group.
          </div>`}
    `}head(t){let e=qt(H(this.hass),this.known).find(r=>r.id===t.label_id)?.devices.length;return l`<th>
      <div class="label">
        <input
          .value=${t.name}
          style=${`width:${Math.max(6,t.name.length+1)}ch`}
          @change=${r=>this.rename(t,r.target.value)}
        />
        <button
          aria-label="Delete ${t.name}"
          title=${e?`${e} still in it`:"Delete this group"}
          @click=${()=>this.discard(t)}
        >
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </div>
    </th>`}row(t,e){let r=t.labels??[];return l`<tr>
      <td class="who">${k(t)}</td>
      ${e.map(s=>l`<td>
          <input
            type="checkbox"
            aria-label="${k(t)} in ${s.name}"
            .checked=${r.includes(s.label_id)}
            @change=${o=>this.set(t,s.label_id,o.target.checked)}
          />
        </td>`)}
    </tr>`}async make(){let t=this.naming.trim();if(!t||this.busy)return;this.busy=!0,this.naming="";let e=await Mi(this.hass,t);e&&(this.known=[...this.known,e].sort((r,s)=>r.name.localeCompare(s.name))),this.busy=!1,e||await this.load()}async rename(t,e){!e.trim()||e===t.name||(this.known=this.known.map(r=>r.label_id===t.label_id?{...r,name:e.trim()}:r),await Hi(this.hass,t.label_id,e.trim()))}async discard(t){this.known=this.known.filter(e=>e.label_id!==t.label_id),await Ti(this.hass,t.label_id)}async set(t,e,r){let s=new Set(t.labels??[]);r?s.add(e):s.delete(e),await Ri(this.hass,t.id,[...s])}async load(){this.known=await Ft(this.hass)}};U.styles=b(Wi),c([u({attribute:!1})],U.prototype,"hass",2),c([g()],U.prototype,"known",2),c([g()],U.prototype,"asked",2),c([g()],U.prototype,"naming",2),c([g()],U.prototype,"busy",2),U=c([y("echolocal-groups")],U);var ji=`:host {
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
`;N({path:"activity",title:"Activity",icon:"mdi:timeline-text-outline",element:"echolocal-activity",order:20});var rs=60,K=class extends v{constructor(){super(...arguments);this.seen=[];this.only="";this.asked=!1}updated(){this.asked||!this.hass||(this.asked=!0,this.listen())}disconnectedCallback(){super.disconnectedCallback(),this.stop?.()}render(){if(!this.hass)return p;let t=this.names(),e=this.only?this.seen.filter(s=>s.turn.mac===this.only):this.seen,r=Math.max(1,...e.map(s=>ot(s.turn)));return l`
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
            <div class="turns">${e.map(s=>this.row(s,t,r))}</div>`:l`<div class="none">
            Nothing yet. Turns appear here as they happen, across every device — the timings come from the
            device rather than from the recorder, so there is no past to load.
          </div>`}
    `}row(t,e,r){let s=wt(t.turn),o=ot(t.turn),a=t.turn.outcome!=="completed",d=e[t.turn.mac]??"elsewhere";return l`<div class="turn">
      <div class="when">${ns(t.at)}</div>
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
              .filename=${ss(t,d)}
            ></echolocal-recording>`:p}
      </div>
      ${s.length?l`<div class="bar">
            ${s.map(h=>l`<div
                class="slice"
                data-phase=${h.key}
                title=${`${h.label} ${h.ms} ms`}
                style=${`flex:0 0 ${h.ms/r*100}%`}
              ></div>`)}
          </div>`:p}
    </div>`}names(){let t={};for(let e of H(this.hass)){let r=e.connections?.find(([s])=>s==="mac")?.[1];r&&(t[r.toLowerCase()]=k(e))}return t}async listen(){if(this.hass.connection)try{this.stop=await this.hass.connection.subscribeEvents(t=>{let e=Nt(t.data);e&&(this.seen=[{at:Date.now(),turn:e},...this.seen].slice(0,rs))},Ot)}catch{}}};K.styles=b(ji),c([u({attribute:!1})],K.prototype,"hass",2),c([g()],K.prototype,"seen",2),c([g()],K.prototype,"only",2),c([g()],K.prototype,"asked",2),K=c([y("echolocal-activity")],K);function ss(n,i){let t=new Date(n.at).toISOString().replace(/[:.]/g,"-").slice(0,19),e=r=>r.toLowerCase().replace(/[^a-z0-9]+/g,"-");return`${t}-${e(i)}-${e(n.turn.wake_word)}.wav`}function ns(n){return new Date(n).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}var Fi=`:host {
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
`;N({path:"health",title:"Health",icon:"mdi:heart-pulse",element:"echolocal-health",order:40});var ve=[{title:"Version",match:/_(?:current_version|installed_version)$/},{title:"Update",match:/^update\./,show:n=>n==="on"?"waiting":n==="off"?"current":n,wrong:n=>n==="on"?"warn":void 0},{title:"Wifi",match:/_wifi_signal$/,show:(n,i)=>`${Math.round(Number(n))} ${i||"dBm"}`,wrong:n=>Number(n)<-80?"bad":Number(n)<-70?"warn":void 0},{title:"CPU",match:/_cpu_temperature$/,show:(n,i)=>`${Math.round(Number(n))}${i||"\xB0C"}`,wrong:n=>Number(n)>80?"bad":Number(n)>70?"warn":void 0},{title:"Load",match:/_load_average$/,show:n=>Number(n).toFixed(2)},{title:"Memory",match:/_memory_available$/,show:(n,i)=>`${Math.round(Number(n))} ${i||"MB"}`,wrong:n=>Number(n)<40?"bad":Number(n)<80?"warn":void 0},{title:"Disk",match:/_free_space$/,show:(n,i)=>`${Math.round(Number(n))} ${i||"MB"}`,wrong:n=>Number(n)<50?"bad":Number(n)<150?"warn":void 0},{title:"Address",match:/_ip_address$/}],J=class extends v{constructor(){super(...arguments);this.by="";this.down=!1}render(){if(!this.hass)return p;let t=H(this.hass);if(!t.length)return l`<div class="none">No EchoLocal devices yet.</div>`;let e=t.map(s=>this.read(s)),r=this.sort(e);return l`<div class="scroll">
      <table>
        <thead>
          <tr>
            ${this.head("Device")}${ve.map(s=>this.head(s.title))}
          </tr>
        </thead>
        <tbody>
          ${r.map(s=>l`<tr data-off=${String(!s.up)}>
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
    </th>`}read(t){let r=(B(this.hass,t.id)?.entities??[]).map(a=>a.entity_id),s={},o=!1;for(let a of ve){let d=r.find(w=>a.match.test(w)),h=d?this.hass.states[d]:void 0;if(!h)continue;let m=h.state;if(m==="unavailable"||m==="unknown")continue;o=!0;let f=h.attributes.unit_of_measurement??"",x=Number(m);s[a.title]={text:a.show?a.show(m,f):f?`${m} ${f}`:m,sort:Number.isFinite(x)&&m!==""?x:m,wrong:a.wrong?.(Number.isFinite(x)?x:m)}}return{device:t,name:k(t),cells:s,up:o}}sort(t){if(!this.by)return t;let e=r=>this.by==="Device"?r.name:r.cells[this.by]?.sort??"";return[...t].sort((r,s)=>{let o=e(r),a=e(s),d=typeof o=="number"&&typeof a=="number"?o-a:String(o).localeCompare(String(a));return this.down?-d:d})}open(t){history.pushState(null,"",`/config/devices/device/${t.id}`),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}};J.styles=b(Fi),c([u({attribute:!1})],J.prototype,"hass",2),c([g()],J.prototype,"by",2),c([g()],J.prototype,"down",2),J=c([y("echolocal-health")],J);var qi=`:host {
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
          @change=${r=>this.rename(t,r.target.value)}
        />
      </div>
      <div class="about">${e.join(" \xB7 ")}</div>
      <div class="buttons">
        <button class="icon" aria-label="Remove ${t.id}" @click=${()=>this.discard(t)}>
          <ha-icon icon="mdi:trash-can-outline"></ha-icon>
        </button>
      </div>
      ${t.problems.length?l`<div class="wrong">${t.problems.join(". ")}.</div>`:p}
    </div>`}async add(t){let e=[...t??[]].filter(r=>r.name.endsWith(".tflite"));if(!e.length){this.said="A wake model is a .tflite file.";return}this.busy=!0,this.said="";for(let r of e){let s=new FormData;s.append("file",r);try{let o=await fetch("/api/echolocal/wake_words",{method:"POST",body:s,headers:this.credentials()});if(!o.ok){let a=await o.json().catch(()=>({}));this.said=a.error??`Home Assistant refused ${r.name}.`;break}}catch(o){this.said=`That did not reach Home Assistant: ${o}`;break}}this.busy=!1,await this.refresh()}async rename(t,e){e!==t.wake_word&&(await this.hass.callWS({type:"echolocal/wake_words/update",wake_word_id:t.id,wake_word:e}),await this.refresh())}async discard(t){await this.hass.callWS({type:"echolocal/wake_words/delete",wake_word_id:t.id}),await this.refresh()}async refresh(){this.words=await be(this.hass)}credentials(){let t=this.hass.auth?.data?.access_token;return t?{authorization:`Bearer ${t}`}:{}}};O.styles=b(qi),c([u({attribute:!1})],O.prototype,"hass",2),c([g()],O.prototype,"words",2),c([g()],O.prototype,"over",2),c([g()],O.prototype,"busy",2),c([g()],O.prototype,"said",2),c([g()],O.prototype,"asked",2),O=c([y("echolocal-wake-words")],O);var Bi=`:host {
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
`;N({path:"wake-words",title:"Wake words",icon:"mdi:waveform",element:"echolocal-words",order:10,admin:!0});var L=class extends v{constructor(){super(...arguments);this.words=[];this.asked=!1;this.again=()=>this.requestUpdate()}connectedCallback(){super.connectedCallback(),window.addEventListener(Wt,this.again)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(Wt,this.again)}updated(){this.asked||!this.hass||(this.asked=!0,this.load())}render(){if(!this.hass)return p;let t=this.chosen(),e=new Set(this.words.filter(s=>s.problems.length&&s.wake_word).map(s=>s.wake_word)),r=this.words.filter(s=>!s.problems.length&&!t.some(o=>o.words.includes(s.wake_word)));return l`
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

      ${r.length?l`<div class="spare">
            Unused: ${r.map(s=>s.wake_word).join(", ")} — offered to every satellite, picked
            by none of them.
          </div>`:p}
    `}chosen(){return H(this.hass).map(t=>{let r=(B(this.hass,t.id)?.by.get("wake_word")??[]).map(s=>this.hass.states[s.entity_id]?.state).filter(s=>!!s&&s!=="unknown"&&s!=="None");return{name:k(t),words:r}}).filter(t=>t.words.length)}async load(){this.words=await be(this.hass)}};L.styles=b(Bi),c([u({attribute:!1})],L.prototype,"hass",2),c([g()],L.prototype,"words",2),c([g()],L.prototype,"asked",2),L=c([y("echolocal-words")],L);var D=class extends v{constructor(){super(...arguments);this.narrow=!1;this.at="";this.made=new Map;this.moved=()=>{this.at=ge(this.base(),void 0),this.requestUpdate()}}connectedCallback(){super.connectedCallback(),window.addEventListener("location-changed",this.moved),window.addEventListener("popstate",this.moved)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("location-changed",this.moved),window.removeEventListener("popstate",this.moved)}render(){if(!this.hass)return p;let t=!!this.hass.user?.is_admin,e=me(t),r=Si(this.where(),t);return l`
      <header>
        <div class="bar">${e.map(s=>this.button(s,s===r))}</div>
      </header>
      <div class="page">${r?this.body(r):p}</div>
    `}button(t,e){return l`<button
      data-here=${String(e)}
      @click=${()=>{this.at=t.path,Ai(this.base(),t.path)}}
    >
      <ha-icon .icon=${t.icon}></ha-icon><span>${t.title}</span>
    </button>`}body(t){let e=this.made.get(t.path);return e||(e=document.createElement(t.element),this.made.set(t.path,e)),e.hass=this.hass,e.narrow=this.narrow,e}where(){return this.route?ge(this.base(),this.route.path):this.at}base(){return this.route?.prefix??"/echolocal"}};D.styles=b(Ci),c([u({attribute:!1})],D.prototype,"hass",2),c([u({type:Boolean})],D.prototype,"narrow",2),c([u({attribute:!1})],D.prototype,"route",2),c([u({attribute:!1})],D.prototype,"panel",2),c([g()],D.prototype,"at",2),D=c([y("echolocal-panel")],D);window.customCards=window.customCards??[];window.customCards.some(n=>n.type==="echolocal-satellite-card")||window.customCards.push({type:"echolocal-satellite-card",name:"EchoLocal Satellite",description:"An EchoLocal satellite, drawn as itself, with its ring and mute live.",preview:!0,documentationURL:"https://github.com/ygelfand/echolocal-hacs"});
