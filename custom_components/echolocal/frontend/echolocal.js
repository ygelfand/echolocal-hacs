var lr=Object.defineProperty;var cr=Object.getOwnPropertyDescriptor;var c=(s,i,e,t)=>{for(var r=t>1?void 0:t?cr(i,e):i,n=s.length-1,o;n>=0;n--)(o=s[n])&&(r=(t?o(i,e,r):o(r))||r);return t&&r&&lr(i,e,r),r};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Me=globalThis,He=Me.ShadowRoot&&(Me.ShadyCSS===void 0||Me.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Mt=Symbol(),Ct=new WeakMap,Te=class{constructor(i,e,t){if(this._$cssResult$=!0,t!==Mt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=i,this.t=e}get styleSheet(){let i=this.o,e=this.t;if(He&&i===void 0){let t=e!==void 0&&e.length===1;t&&(i=Ct.get(e)),i===void 0&&((this.o=i=new CSSStyleSheet).replaceSync(this.cssText),t&&Ct.set(e,i))}return i}toString(){return this.cssText}},b=s=>new Te(typeof s=="string"?s:s+"",void 0,Mt);var Tt=(s,i)=>{if(He)s.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of i){let t=document.createElement("style"),r=Me.litNonce;r!==void 0&&t.setAttribute("nonce",r),t.textContent=e.cssText,s.appendChild(t)}},Qe=He?s=>s:s=>s instanceof CSSStyleSheet?(i=>{let e="";for(let t of i.cssRules)e+=t.cssText;return b(e)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var{is:dr,defineProperty:pr,getOwnPropertyDescriptor:hr,getOwnPropertyNames:ur,getOwnPropertySymbols:mr,getPrototypeOf:gr}=Object,Pe=globalThis,Ht=Pe.trustedTypes,fr=Ht?Ht.emptyScript:"",vr=Pe.reactiveElementPolyfillSupport,fe=(s,i)=>s,ve={toAttribute(s,i){switch(i){case Boolean:s=s?fr:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,i){let e=s;switch(i){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},Re=(s,i)=>!dr(s,i),Pt={attribute:!0,type:String,converter:ve,reflect:!1,useDefault:!1,hasChanged:Re};Symbol.metadata??=Symbol("metadata"),Pe.litPropertyMetadata??=new WeakMap;var B=class extends HTMLElement{static addInitializer(i){this._$Ei(),(this.l??=[]).push(i)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(i,e=Pt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(i)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(i,e),!e.noAccessor){let t=Symbol(),r=this.getPropertyDescriptor(i,t,e);r!==void 0&&pr(this.prototype,i,r)}}static getPropertyDescriptor(i,e,t){let{get:r,set:n}=hr(this.prototype,i)??{get(){return this[e]},set(o){this[e]=o}};return{get:r,set(o){let l=r?.call(this);n?.call(this,o),this.requestUpdate(i,l,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(i){return this.elementProperties.get(i)??Pt}static _$Ei(){if(this.hasOwnProperty(fe("elementProperties")))return;let i=gr(this);i.finalize(),i.l!==void 0&&(this.l=[...i.l]),this.elementProperties=new Map(i.elementProperties)}static finalize(){if(this.hasOwnProperty(fe("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(fe("properties"))){let e=this.properties,t=[...ur(e),...mr(e)];for(let r of t)this.createProperty(r,e[r])}let i=this[Symbol.metadata];if(i!==null){let e=litPropertyMetadata.get(i);if(e!==void 0)for(let[t,r]of e)this.elementProperties.set(t,r)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let r=this._$Eu(e,t);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(i){let e=[];if(Array.isArray(i)){let t=new Set(i.flat(1/0).reverse());for(let r of t)e.unshift(Qe(r))}else i!==void 0&&e.push(Qe(i));return e}static _$Eu(i,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof i=="string"?i.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(i=>i(this))}addController(i){(this._$EO??=new Set).add(i),this.renderRoot!==void 0&&this.isConnected&&i.hostConnected?.()}removeController(i){this._$EO?.delete(i)}_$E_(){let i=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(i.set(t,this[t]),delete this[t]);i.size>0&&(this._$Ep=i)}createRenderRoot(){let i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Tt(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(i=>i.hostConnected?.())}enableUpdating(i){}disconnectedCallback(){this._$EO?.forEach(i=>i.hostDisconnected?.())}attributeChangedCallback(i,e,t){this._$AK(i,t)}_$ET(i,e){let t=this.constructor.elementProperties.get(i),r=this.constructor._$Eu(i,t);if(r!==void 0&&t.reflect===!0){let n=(t.converter?.toAttribute!==void 0?t.converter:ve).toAttribute(e,t.type);this._$Em=i,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(i,e){let t=this.constructor,r=t._$Eh.get(i);if(r!==void 0&&this._$Em!==r){let n=t.getPropertyOptions(r),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:ve;this._$Em=r;let l=o.fromAttribute(e,n.type);this[r]=l??this._$Ej?.get(r)??l,this._$Em=null}}requestUpdate(i,e,t,r=!1,n){if(i!==void 0){let o=this.constructor;if(r===!1&&(n=this[i]),t??=o.getPropertyOptions(i),!((t.hasChanged??Re)(n,e)||t.useDefault&&t.reflect&&n===this._$Ej?.get(i)&&!this.hasAttribute(o._$Eu(i,t))))return;this.C(i,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(i,e,{useDefault:t,reflect:r,wrapped:n},o){t&&!(this._$Ej??=new Map).has(i)&&(this._$Ej.set(i,o??e??this[i]),n!==!0||o!==void 0)||(this._$AL.has(i)||(this.hasUpdated||t||(e=void 0),this._$AL.set(i,e)),r===!0&&this._$Em!==i&&(this._$Eq??=new Set).add(i))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let i=this.scheduleUpdate();return i!=null&&await i,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[r,n]of t){let{wrapped:o}=n,l=this[r];o!==!0||this._$AL.has(r)||l===void 0||this.C(r,void 0,n,l)}}let i=!1,e=this._$AL;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw i=!1,this._$EM(),t}i&&this._$AE(e)}willUpdate(i){}_$AE(i){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(i)),this.updated(i)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(i){return!0}update(i){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(i){}firstUpdated(i){}};B.elementStyles=[],B.shadowRootOptions={mode:"open"},B[fe("elementProperties")]=new Map,B[fe("finalized")]=new Map,vr?.({ReactiveElement:B}),(Pe.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ot=globalThis,Rt=s=>s,ze=ot.trustedTypes,zt=ze?ze.createPolicy("lit-html",{createHTML:s=>s}):void 0,Ut="$lit$",G=`lit$${Math.random().toFixed(9).slice(2)}$`,Ft="?"+G,br=`<${Ft}>`,ie=document,ye=()=>ie.createComment(""),xe=s=>s===null||typeof s!="object"&&typeof s!="function",at=Array.isArray,yr=s=>at(s)||typeof s?.[Symbol.iterator]=="function",et=`[ 	
\f\r]`,be=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Et=/-->/g,Ot=/>/g,ee=RegExp(`>|${et}(?:([^\\s"'>=/]+)(${et}*=${et}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Nt=/'/g,It=/"/g,jt=/^(?:script|style|textarea|title)$/i,lt=s=>(i,...e)=>({_$litType$:s,strings:i,values:e}),a=lt(1),x=lt(2),Ks=lt(3),re=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),Dt=new WeakMap,te=ie.createTreeWalker(ie,129);function Wt(s,i){if(!at(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return zt!==void 0?zt.createHTML(i):i}var xr=(s,i)=>{let e=s.length-1,t=[],r,n=i===2?"<svg>":i===3?"<math>":"",o=be;for(let l=0;l<e;l++){let d=s[l],h,g,f=-1,w=0;for(;w<d.length&&(o.lastIndex=w,g=o.exec(d),g!==null);)w=o.lastIndex,o===be?g[1]==="!--"?o=Et:g[1]!==void 0?o=Ot:g[2]!==void 0?(jt.test(g[2])&&(r=RegExp("</"+g[2],"g")),o=ee):g[3]!==void 0&&(o=ee):o===ee?g[0]===">"?(o=r??be,f=-1):g[1]===void 0?f=-2:(f=o.lastIndex-g[2].length,h=g[1],o=g[3]===void 0?ee:g[3]==='"'?It:Nt):o===It||o===Nt?o=ee:o===Et||o===Ot?o=be:(o=ee,r=void 0);let $=o===ee&&s[l+1].startsWith("/>")?" ":"";n+=o===be?d+br:f>=0?(t.push(h),d.slice(0,f)+Ut+d.slice(f)+G+$):d+G+(f===-2?l:$)}return[Wt(s,n+(s[e]||"<?>")+(i===2?"</svg>":i===3?"</math>":"")),t]},we=class s{constructor({strings:i,_$litType$:e},t){let r;this.parts=[];let n=0,o=0,l=i.length-1,d=this.parts,[h,g]=xr(i,e);if(this.el=s.createElement(h,t),te.currentNode=this.el.content,e===2||e===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(r=te.nextNode())!==null&&d.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(let f of r.getAttributeNames())if(f.endsWith(Ut)){let w=g[o++],$=r.getAttribute(f).split(G),T=/([.?@])?(.*)/.exec(w);d.push({type:1,index:n,name:T[2],strings:$,ctor:T[1]==="."?it:T[1]==="?"?rt:T[1]==="@"?st:ae}),r.removeAttribute(f)}else f.startsWith(G)&&(d.push({type:6,index:n}),r.removeAttribute(f));if(jt.test(r.tagName)){let f=r.textContent.split(G),w=f.length-1;if(w>0){r.textContent=ze?ze.emptyScript:"";for(let $=0;$<w;$++)r.append(f[$],ye()),te.nextNode(),d.push({type:2,index:++n});r.append(f[w],ye())}}}else if(r.nodeType===8)if(r.data===Ft)d.push({type:2,index:n});else{let f=-1;for(;(f=r.data.indexOf(G,f+1))!==-1;)d.push({type:7,index:n}),f+=G.length-1}n++}}static createElement(i,e){let t=ie.createElement("template");return t.innerHTML=i,t}};function oe(s,i,e=s,t){if(i===re)return i;let r=t!==void 0?e._$Co?.[t]:e._$Cl,n=xe(i)?void 0:i._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),n===void 0?r=void 0:(r=new n(s),r._$AT(s,e,t)),t!==void 0?(e._$Co??=[])[t]=r:e._$Cl=r),r!==void 0&&(i=oe(s,r._$AS(s,i.values),r,t)),i}var tt=class{constructor(i,e){this._$AV=[],this._$AN=void 0,this._$AD=i,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(i){let{el:{content:e},parts:t}=this._$AD,r=(i?.creationScope??ie).importNode(e,!0);te.currentNode=r;let n=te.nextNode(),o=0,l=0,d=t[0];for(;d!==void 0;){if(o===d.index){let h;d.type===2?h=new $e(n,n.nextSibling,this,i):d.type===1?h=new d.ctor(n,d.name,d.strings,this,i):d.type===6&&(h=new nt(n,this,i)),this._$AV.push(h),d=t[++l]}o!==d?.index&&(n=te.nextNode(),o++)}return te.currentNode=ie,r}p(i){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(i,t,e),e+=t.strings.length-2):t._$AI(i[e])),e++}},$e=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(i,e,t,r){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=i,this._$AB=e,this._$AM=t,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let i=this._$AA.parentNode,e=this._$AM;return e!==void 0&&i?.nodeType===11&&(i=e.parentNode),i}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(i,e=this){i=oe(this,i,e),xe(i)?i===p||i==null||i===""?(this._$AH!==p&&this._$AR(),this._$AH=p):i!==this._$AH&&i!==re&&this._(i):i._$litType$!==void 0?this.$(i):i.nodeType!==void 0?this.T(i):yr(i)?this.k(i):this._(i)}O(i){return this._$AA.parentNode.insertBefore(i,this._$AB)}T(i){this._$AH!==i&&(this._$AR(),this._$AH=this.O(i))}_(i){this._$AH!==p&&xe(this._$AH)?this._$AA.nextSibling.data=i:this.T(ie.createTextNode(i)),this._$AH=i}$(i){let{values:e,_$litType$:t}=i,r=typeof t=="number"?this._$AC(i):(t.el===void 0&&(t.el=we.createElement(Wt(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===r)this._$AH.p(e);else{let n=new tt(r,this),o=n.u(this.options);n.p(e),this.T(o),this._$AH=n}}_$AC(i){let e=Dt.get(i.strings);return e===void 0&&Dt.set(i.strings,e=new we(i)),e}k(i){at(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,r=0;for(let n of i)r===e.length?e.push(t=new s(this.O(ye()),this.O(ye()),this,this.options)):t=e[r],t._$AI(n),r++;r<e.length&&(this._$AR(t&&t._$AB.nextSibling,r),e.length=r)}_$AR(i=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);i!==this._$AB;){let t=Rt(i).nextSibling;Rt(i).remove(),i=t}}setConnected(i){this._$AM===void 0&&(this._$Cv=i,this._$AP?.(i))}},ae=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(i,e,t,r,n){this.type=1,this._$AH=p,this._$AN=void 0,this.element=i,this.name=e,this._$AM=r,this.options=n,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=p}_$AI(i,e=this,t,r){let n=this.strings,o=!1;if(n===void 0)i=oe(this,i,e,0),o=!xe(i)||i!==this._$AH&&i!==re,o&&(this._$AH=i);else{let l=i,d,h;for(i=n[0],d=0;d<n.length-1;d++)h=oe(this,l[t+d],e,d),h===re&&(h=this._$AH[d]),o||=!xe(h)||h!==this._$AH[d],h===p?i=p:i!==p&&(i+=(h??"")+n[d+1]),this._$AH[d]=h}o&&!r&&this.j(i)}j(i){i===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,i??"")}},it=class extends ae{constructor(){super(...arguments),this.type=3}j(i){this.element[this.name]=i===p?void 0:i}},rt=class extends ae{constructor(){super(...arguments),this.type=4}j(i){this.element.toggleAttribute(this.name,!!i&&i!==p)}},st=class extends ae{constructor(i,e,t,r,n){super(i,e,t,r,n),this.type=5}_$AI(i,e=this){if((i=oe(this,i,e,0)??p)===re)return;let t=this._$AH,r=i===p&&t!==p||i.capture!==t.capture||i.once!==t.once||i.passive!==t.passive,n=i!==p&&(t===p||r);r&&this.element.removeEventListener(this.name,this,t),n&&this.element.addEventListener(this.name,this,i),this._$AH=i}handleEvent(i){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,i):this._$AH.handleEvent(i)}},nt=class{constructor(i,e,t){this.element=i,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(i){oe(this,i)}};var wr=ot.litHtmlPolyfillSupport;wr?.(we,$e),(ot.litHtmlVersions??=[]).push("3.3.3");var Bt=(s,i,e)=>{let t=e?.renderBefore??i,r=t._$litPart$;if(r===void 0){let n=e?.renderBefore??null;t._$litPart$=r=new $e(i.insertBefore(ye(),n),n,void 0,e??{})}return r._$AI(s),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ct=globalThis,v=class extends B{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let i=super.createRenderRoot();return this.renderOptions.renderBefore??=i.firstChild,i}update(i){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(i),this._$Do=Bt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return re}};v._$litElement$=!0,v.finalized=!0,ct.litElementHydrateSupport?.({LitElement:v});var $r=ct.litElementPolyfillSupport;$r?.({LitElement:v});(ct.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var y=s=>(i,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(s,i)}):customElements.define(s,i)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var _r={attribute:!0,type:String,converter:ve,reflect:!1,hasChanged:Re},kr=(s=_r,i,e)=>{let{kind:t,metadata:r}=e,n=globalThis.litPropertyMetadata.get(r);if(n===void 0&&globalThis.litPropertyMetadata.set(r,n=new Map),t==="setter"&&((s=Object.create(s)).wrapped=!0),n.set(e.name,s),t==="accessor"){let{name:o}=e;return{set(l){let d=i.get.call(this);i.set.call(this,l),this.requestUpdate(o,d,s,!0,l)},init(l){return l!==void 0&&this.C(o,void 0,s,l),l}}}if(t==="setter"){let{name:o}=e;return function(l){let d=this[o];i.call(this,l),this.requestUpdate(o,d,s,!0,l)}}throw Error("Unsupported decorator location: "+t)};function u(s){return(i,e)=>typeof e=="object"?kr(s,i,e):((t,r,n)=>{let o=r.hasOwnProperty(n);return r.constructor.createProperty(n,t),o?Object.getOwnPropertyDescriptor(r,n):void 0})(s,i,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function m(s){return u({...s,state:!0,attribute:!1})}/**
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
 */var _e=12,qt=2.2,O=100,N=100,Kt=500;function Gt(s,i){let e=Array.from({length:_e},(t,r)=>{let n=-90+360/_e*r+qt/2,o=-90+360/_e*(r+1)-qt/2;return Cr(93,82,n,o)});return x`
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

      <circle cx=${O} cy=${N} r="97" fill="var(--el-shell)"></circle>
      <circle cx=${O} cy=${N} r="97" fill="none" stroke="var(--el-edge)" stroke-width="1"></circle>

      <g class="halo" filter="url(#blur)" style="opacity:${s.glow}">
        ${e.map((t,r)=>x`<path d=${t} style="fill:${s.segments[r].opacity?s.segments[r].fill:"transparent"}"></path>`)}
      </g>

      ${e.map((t,r)=>x`<path
          class="segment"
          data-picked=${String(s.picked===r)}
          data-divisible=${String(s.divisible)}
          d=${t}
          style="fill:${s.segments[r].fill};opacity:${s.segments[r].opacity}"
          @click=${s.divisible?()=>i.segment(r):i.ring}
        ></path>`)}

      <circle cx=${O} cy=${N} r="79" fill="url(#top)"></circle>
      <circle cx=${O} cy=${N} r="79" fill="none" stroke="var(--el-edge)" stroke-width="1"></circle>

      ${s.lux?x`<text
            class="lux"
            x=${O}
            y=${N+5}
            text-anchor="middle"
            style="--lit:${s.lux.lit}"
          >${Math.round(s.lux.value)}<tspan class="unit" dx="3.5">lx</tspan></text>`:""}


      ${dt(O,N-46,x`<path d="M-4.5 0h9M0 -4.5v9"></path>`,"Volume up",()=>i.volume(1))}
      <g
        class="btn"
        data-lit=${String(s.holding)}
        transform="translate(${O+46} ${N})"
        role="button"
        tabindex="0"
        aria-label=${s.holding?"Wake the second assistant":"Wake"}
        @pointerdown=${()=>i.action("down")}
        @pointerup=${()=>i.action("up")}
        @pointerleave=${()=>i.action("cancel")}
        @pointercancel=${()=>i.action("cancel")}
      >
        <circle class="face" cx="0" cy="0" r="13"></circle>
        <g class="glyph"><circle cx="0" cy="0" r="4.5"></circle></g>
      </g>
      ${dt(O,N+46,x`<path d="M-4.5 0h9"></path>`,"Volume down",()=>i.volume(-1))}
      ${dt(O-46,N,Sr(s.muted),s.muted?"Microphone muted":"Microphone live",i.mute,s.muted)}
    </svg>
  `}function dt(s,i,e,t,r,n=!1){return x`<g class="btn" data-lit=${String(n)} transform="translate(${s} ${i})"
    role="button" tabindex="0" aria-label=${t} @click=${r}>
    <circle class="face" cx="0" cy="0" r="13"></circle>
    <g class="glyph">${e}</g>
  </g>`}function Sr(s){return x`
    <path d="M-2.6 -5.2a2.6 2.6 0 0 1 5.2 0v4a2.6 2.6 0 0 1-5.2 0z"></path>
    <path d="M-4.6 -0.6a4.6 4.6 0 0 0 9.2 0"></path>
    <path d="M0 3.8v2.6"></path>
    ${s?x`<path d="M-6.4 6.4L6.4 -6.4"></path>`:Ar()}
  `}function Ar(){return x``}function Cr(s,i,e,t){let r=($,T)=>{let W=T*Math.PI/180;return[(O+$*Math.cos(W)).toFixed(2),(N+$*Math.sin(W)).toFixed(2)]},[n,o]=r(s,e),[l,d]=r(s,t),[h,g]=r(i,t),[f,w]=r(i,e);return`M${n} ${o}A${s} ${s} 0 0 1 ${l} ${d}L${h} ${g}A${i} ${i} 0 0 0 ${f} ${w}Z`}var Vt=`:host{display:block}ha-card{padding:16px}.frame{position:relative;display:grid;grid-template-columns:minmax(0,1fr) auto;grid-template-rows:auto auto;gap:12px;align-items:center}text.lux{fill:color-mix(in srgb,var(--el-warm) calc(var(--lit) * 100%),var(--el-read));filter:drop-shadow(0 0 calc(var(--lit) * 5px) color-mix(in srgb,var(--el-warm) calc(var(--lit) * 65%),transparent));font-family:var(--ha-font-family-body, inherit);font-size:15px;font-weight:500;letter-spacing:-.3px;pointer-events:none}text.lux .unit{font-size:9px;font-weight:400;fill:var(--el-glyph)}.art{grid-area:1 / 1;min-width:0;max-width:240px;margin:0 auto;--el-shell: #4a4d52;--el-top: #3c3f44;--el-top-high: #5a5e64;--el-edge: rgba(255, 255, 255, .13);--el-ring-off: rgba(255, 255, 255, .1);--el-glyph: rgba(255, 255, 255, .62);--el-btn: rgba(255, 255, 255, .07);--el-read: rgba(255, 255, 255, .78);--el-warm: #ffc061}.art[data-shell=black]{--el-shell: #24262a;--el-top: #191b1e;--el-top-high: #2e3237;--el-edge: rgba(255, 255, 255, .09);--el-ring-off: rgba(255, 255, 255, .07);--el-glyph: rgba(255, 255, 255, .55);--el-btn: rgba(255, 255, 255, .05);--el-read: rgba(255, 255, 255, .72);--el-warm: #ffc061}.art[data-shell=white]{--el-shell: #e7e4dd;--el-top: #f2f0ea;--el-top-high: #ffffff;--el-edge: rgba(0, 0, 0, .1);--el-ring-off: rgba(0, 0, 0, .09);--el-glyph: rgba(0, 0, 0, .45);--el-btn: rgba(0, 0, 0, .04);--el-read: rgba(0, 0, 0, .72);--el-warm: #e07b00}.art[data-shell=charcoal]{--el-shell: #2b2d31;--el-glass: #08090b;--el-edge: rgba(255, 255, 255, .1);--el-glyph: rgba(255, 255, 255, .58);--el-btn: #3a3d42;--el-lens: #1b222c;--el-shutter: #5b5e63}.frame[data-shape=show] .art{max-width:300px}.frame[data-shape=show] .side{display:grid;grid-template-columns:repeat(2,40px);align-content:center}.screen{cursor:pointer}.screen text{font-family:var(--ha-font-family-body, inherit);pointer-events:none}.screen .clock{font-weight:500;font-variant-numeric:tabular-nums;letter-spacing:-.5px}.screen .line{font-size:6.5px}.bar{fill:#38a0ff;opacity:0;transition:opacity .3s ease}.art[data-activity=listening] .bar,.art[data-activity=processing] .bar,.art[data-activity=responding] .bar{opacity:1}.art[data-activity=processing] .bar{animation:breathe 1.2s ease-in-out infinite}.bar[data-muted=true]{fill:var(--error-color, #db4437);opacity:1;animation:none}.lens{cursor:pointer}.lens circle:not(.hit),.lens rect{fill:var(--el-lens);stroke:#ffffff1f;stroke-width:.5}.lens[data-covered=true] circle:not(.hit),.lens[data-covered=true] rect{fill:var(--el-shutter)}.key .glyph path{stroke-width:1.1}svg{width:100%;height:auto;display:block}.segment{transition:fill .4s ease,opacity .4s ease}.segment[data-divisible=true]{cursor:pointer}.segment[data-picked=true]{stroke:var(--primary-text-color);stroke-width:2}.plain{padding:7px 12px;border:1px solid color-mix(in srgb,var(--primary-color) 45%,transparent);border-radius:10px;background:color-mix(in srgb,var(--primary-color) 12%,transparent);color:var(--primary-color);font:inherit;font-size:.82rem;cursor:pointer;white-space:nowrap}.plain:hover{background:color-mix(in srgb,var(--primary-color) 20%,transparent)}.plain.quiet{border-color:var(--divider-color);background:none;color:var(--secondary-text-color)}.plain.quiet:hover{background:var(--secondary-background-color)}.palette{flex-direction:column;align-items:stretch;gap:10px}.palette .top{display:flex;align-items:center;justify-content:space-between;gap:12px}.palette .name{white-space:nowrap}.palette .swatches{display:grid;grid-template-columns:repeat(auto-fit,minmax(24px,1fr));gap:6px}.palette .swatch{aspect-ratio:1;min-width:0;padding:0;border:2px solid transparent;border-radius:8px;cursor:pointer}.palette .swatch:hover{border-color:var(--primary-text-color)}.palette .sq{width:30px;height:30px;border-radius:8px}.palette .sq ha-icon{--mdc-icon-size: 18px}.halo{transition:opacity .4s ease}.art[data-activity=listening] .halo{animation:breathe 2s ease-in-out infinite}@keyframes breathe{0%,to{opacity:.35}50%{opacity:.8}}.hit{cursor:pointer;pointer-events:stroke}.btn{cursor:pointer}.face{fill:var(--el-btn)}.btn .glyph path{stroke:var(--el-glyph);stroke-width:1.6;fill:none;stroke-linecap:round}.btn .glyph circle{fill:var(--el-glyph)}.btn:hover .face{fill:var(--el-edge)}.btn[data-lit=true] .glyph path{stroke:var(--error-color, #db4437)}.btn[data-lit=true] .face{fill:color-mix(in srgb,var(--error-color, #db4437) 22%,transparent)}.side{grid-area:1 / 2;display:flex;flex-direction:column;gap:8px}.foot{grid-area:2 / 1 / 3 / 3;display:flex;align-items:stretch;justify-content:space-between;gap:12px;border-top:1px solid var(--divider-color);padding-top:12px}.label{display:flex;flex-direction:column;justify-content:center;min-width:0}.name{font-size:1.05rem;font-weight:500;color:var(--primary-text-color)}.status{font-size:.8rem;color:var(--secondary-text-color)}.tail{display:flex;gap:8px;padding-left:12px;border-left:1px solid var(--divider-color)}.sq{position:relative;width:40px;height:40px;flex:0 0 auto;display:grid;place-items:center;padding:0;border:1px solid var(--divider-color);border-radius:10px;background:none;cursor:pointer;color:inherit}.sq:hover{background:var(--secondary-background-color)}.sq ha-icon{--mdc-icon-size: 22px;color:var(--secondary-text-color);display:flex}.badge{position:absolute;right:3px;bottom:1px;font-size:.62rem;line-height:1;color:var(--secondary-text-color)}.missing{color:var(--secondary-text-color)}
`;var Yt=`:host{display:flex;gap:18px;align-items:center;padding:14px;border-radius:14px;background:color-mix(in srgb,var(--primary-text-color) 5%,transparent)}.dial{width:190px;flex:0 0 auto;touch-action:none}svg{width:100%;height:auto;display:block}.arc-bed{fill:none;stroke:color-mix(in srgb,var(--primary-text-color) 10%,transparent);stroke-width:9;stroke-linecap:round}.arc-live{fill:none;stroke:var(--primary-color);stroke-width:9;stroke-linecap:round;transition:stroke-dasharray .5s ease,stroke .3s ease}.arc-live[data-over=true]{stroke:var(--success-color, #43a047)}.notch{stroke:var(--primary-text-color);stroke-width:3;stroke-linecap:round;cursor:grab}.capsule{fill:color-mix(in srgb,var(--primary-text-color) 14%,transparent);transition:fill .3s ease}.capsule[data-on=true]{fill:var(--primary-color)}.beam{fill:color-mix(in srgb,var(--primary-color) 16%,transparent);stroke:color-mix(in srgb,var(--primary-color) 40%,transparent)}.spoke{stroke:color-mix(in srgb,var(--primary-color) 35%,transparent);stroke-width:1.2}.slash{stroke:var(--error-color, #db4437);stroke-width:3;stroke-linecap:round}.side{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:10px}.reading{display:flex;align-items:baseline;gap:6px}.now{font-size:1.9rem;font-weight:500;font-variant-numeric:tabular-nums;color:var(--primary-text-color);line-height:1}.unit{font-size:.8rem;color:var(--secondary-text-color)}.now.cut{color:var(--error-color, #db4437)}.caption{margin-left:auto;padding:4px 10px;border-radius:10px;font-size:.75rem;background:color-mix(in srgb,var(--primary-text-color) 7%,transparent);color:var(--secondary-text-color)}.caption[data-over=true]{background:color-mix(in srgb,var(--success-color, #43a047) 18%,transparent);color:var(--success-color, #43a047)}.modes{display:flex;flex-direction:column;gap:6px}.mode{display:flex;align-items:center;gap:10px;padding:8px 10px;border:1px solid transparent;border-radius:12px;background:color-mix(in srgb,var(--primary-text-color) 6%,transparent);color:var(--secondary-text-color);font:inherit;font-size:.85rem;cursor:pointer;text-align:left}.mode:hover{background:color-mix(in srgb,var(--primary-text-color) 11%,transparent)}.mode[data-on=true]{border-color:color-mix(in srgb,var(--primary-color) 45%,transparent);background:color-mix(in srgb,var(--primary-color) 15%,transparent);color:var(--primary-color)}.mode svg{width:26px;flex:0 0 auto}.gate{font-size:.78rem;color:var(--secondary-text-color)}.gate b{color:var(--primary-text-color);font-weight:500;font-variant-numeric:tabular-nums}
`;var Lt=26,Oe=135,Ne=270,_=100,k=100,V=84,Ie=38,H=class extends v{constructor(){super(...arguments);this.level="";this.floor="";this.gate="";this.mode="";this.muted=!1;this.held=null;this.grab=e=>{let t=e.currentTarget;t.setPointerCapture(e.pointerId);let r=this.hass.states[this.gate]?.attributes??{},n=r.min??0,o=r.max??20,l=r.step??1,d=this.number(this.floor)??0,h=this.number(this.level)??0,g=Math.max(d+Lt,h+3),f=T=>{let W=t.getBoundingClientRect(),nr=T.clientX-W.left-W.width/2,or=T.clientY-W.top-W.height/2,Je=Math.atan2(or,nr)*180/Math.PI-Oe;for(;Je<0;)Je+=360;let ar=pt(Math.min(Je,Ne)/Ne);return Math.max(n,Math.min(o,Math.round(ar*(g-d)/l)*l))},w=T=>{this.held=f(T)},$=T=>{t.removeEventListener("pointermove",w),t.removeEventListener("pointerup",$),t.removeEventListener("pointercancel",$);let W=f(T);this.held=null,this.hass.callService("number","set_value",{entity_id:this.gate,value:W})};t.addEventListener("pointermove",w),t.addEventListener("pointerup",$),t.addEventListener("pointercancel",$),this.held=f(e)}}render(){let e=this.number(this.level),t=this.number(this.floor),r=this.held??this.number(this.gate);if(e===null||t===null||r===null)return p;let n=this.hass.states[this.mode],o=Xt(n?.state),l=Math.max(t+Lt,e+3),d=pt((e-t)/(l-t)),h=pt(r/(l-t)),g=e>=t+r&&!this.muted;return a`
      <div class="dial" @pointerdown=${this.grab}>
        <svg viewBox="0 0 200 200" role="img" aria-label="Microphone array">
          <path class="arc-bed" d=${Zt()} pathLength="100"></path>
          ${this.muted?p:x`<path
                class="arc-live"
                data-over=${String(g)}
                d=${Zt()}
                pathLength="100"
                stroke-dasharray=${`${d*100} 100`}
              ></path>`}
          ${this.muted?p:Er(h)} ${o==="beam"?zr():p}
          ${o==="sum"?Rr():p} ${Hr(o,this.muted)}
          ${this.muted?x`<path class="slash" d="M${_-30} ${k+30}L${_+30} ${k-30}"></path>`:p}
        </svg>
      </div>

      <div class="side">
        <div class="reading">
          ${this.muted?a`<span class="now cut">Cut</span>`:a`<span class="now">${e.toFixed(1)}</span><span class="unit">dB</span>
                <span class="caption" data-over=${String(g)}>
                  ${g?"Over the gate":"Quiet"}
                </span>`}
        </div>

        <div class="modes">
          ${(n?.attributes.options??[]).map(f=>a`<button
              class="mode"
              data-on=${String(f===n?.state)}
              @click=${()=>this.hass.callService("select","select_option",{entity_id:this.mode,option:f})}
            >
              <svg viewBox="0 0 40 40">${Pr(Xt(f))}</svg>
              <span>${f}</span>
            </button>`)}
        </div>

        <div class="gate">Gate <b>${r} dB</b> over a floor of <b>${t.toFixed(0)} dB</b></div>
      </div>
    `}number(e){let t=Number(this.hass?.states?.[e]?.state);return Number.isFinite(t)?t:null}};H.styles=b(Yt),c([u({attribute:!1})],H.prototype,"hass",2),c([u()],H.prototype,"level",2),c([u()],H.prototype,"floor",2),c([u()],H.prototype,"gate",2),c([u()],H.prototype,"mode",2),c([u({type:Boolean})],H.prototype,"muted",2),c([m()],H.prototype,"held",2),H=c([y("echolocal-array")],H);function Xt(s){let i=(s??"").toLowerCase();return i.includes("center")||i.includes("centre")?"one":i.includes("beam")?"beam":"sum"}function Hr(s,i){return[[_,k],...Array.from({length:6},(t,r)=>{let n=(-90+r*60)*Math.PI/180;return[_+Ie*Math.cos(n),k+Ie*Math.sin(n)]})].map(([t,r],n)=>x`<circle class="capsule" data-on=${String(!i&&(s!=="one"||n===0))}
      cx=${t.toFixed(1)} cy=${r.toFixed(1)} r=${n===0?7:5.5}></circle>`)}function Pr(s){let i=[[20,20],...Array.from({length:6},(e,t)=>{let r=(-90+t*60)*Math.PI/180;return[20+12*Math.cos(r),20+12*Math.sin(r)]})];return x`
    ${s==="beam"?x`<path class="beam" d="M20 20C9 11 13 1 20 1C27 1 31 11 20 20Z"></path>`:p}
    ${i.map(([e,t],r)=>x`<circle class="capsule" data-on=${String(s!=="one"||r===0)}
          cx=${e.toFixed(1)} cy=${t.toFixed(1)} r=${r===0?3.4:2.6}></circle>`)}`}function Rr(){return Array.from({length:6},(s,i)=>{let e=(-90+i*60)*Math.PI/180;return x`<line class="spoke" x1=${_} y1=${k}
      x2=${(_+Ie*Math.cos(e)).toFixed(1)} y2=${(k+Ie*Math.sin(e)).toFixed(1)}></line>`})}function zr(){return x`<path class="beam" d="M${_} ${k}C${_-34} ${k-30} ${_-24} ${k-66} ${_} ${k-66}C${_+24} ${k-66} ${_+34} ${k-30} ${_} ${k}Z"></path>`}function Zt(){let s=Oe*Math.PI/180,i=(Oe+Ne)*Math.PI/180;return`M${(_+V*Math.cos(s)).toFixed(2)} ${(k+V*Math.sin(s)).toFixed(2)}
    A${V} ${V} 0 1 1 ${(_+V*Math.cos(i)).toFixed(2)} ${(k+V*Math.sin(i)).toFixed(2)}`}function Er(s){let i=(Oe+s*Ne)*Math.PI/180,e=V-8,t=V+8;return x`<line class="notch"
    x1=${(_+e*Math.cos(i)).toFixed(1)} y1=${(k+e*Math.sin(i)).toFixed(1)}
    x2=${(_+t*Math.cos(i)).toFixed(1)} y2=${(k+t*Math.sin(i)).toFixed(1)}></line>`}function pt(s){return Math.max(0,Math.min(1,s))}var Jt=`:host{display:inline-flex;flex:0 0 auto;vertical-align:middle}button{width:15px;height:15px;display:grid;place-items:center;padding:0;border:1px solid color-mix(in srgb,var(--primary-text-color) 26%,transparent);border-radius:50%;background:none;color:var(--secondary-text-color);font:inherit;font-size:9px;font-weight:700;line-height:1;cursor:help;opacity:.65}button:hover{opacity:1;color:var(--primary-color);border-color:var(--primary-color)}ha-tooltip{--max-width: min(300px, 70vw);--ha-tooltip-font-size: .79rem;--ha-tooltip-font-weight: 400;--ha-tooltip-line-height: 1.45;--ha-tooltip-padding: 11px 13px;--ha-tooltip-border-radius: 11px}
`;var Nr=0,le=class extends v{constructor(){super(...arguments);this.text="";this.anchor=`ask-${++Nr}`}render(){return this.text?a`
      <button id=${this.anchor} aria-label="What this does" @click=${this.swallow}>?</button>
      <ha-tooltip for=${this.anchor} trigger="click" placement="top">${this.text}</ha-tooltip>
    `:p}swallow(e){e.stopPropagation(),e.preventDefault()}};le.styles=b(Jt),c([u()],le.prototype,"text",2),le=c([y("echolocal-bubble")],le);var Qt=`.sheet{transition:width .2s ease}.head{display:flex;align-items:center;gap:14px;margin-bottom:16px}.crest{width:44px;height:44px;flex:0 0 auto;display:grid;place-items:center;border-radius:14px;background:color-mix(in srgb,var(--primary-color) 16%,transparent)}.crest ha-icon{--mdc-icon-size: 24px;color:var(--primary-color);display:flex}.titles{flex:1 1 auto;min-width:0}.crown{display:flex;align-items:center;gap:12px;flex:0 0 auto}.crown ha-control-switch{width:52px;--control-switch-thickness: 30px;--control-switch-border-radius: 15px}.crown ha-control-switch.warn{--control-switch-on-color: var(--error-color, #db4437)}.crown .lamp{max-width:168px;--control-select-thickness: 30px;--control-select-border-radius: 15px}.crown ha-icon-button{color:var(--primary-color)}.crown.picture{margin-left:auto;padding:0;border:none;background:none;cursor:pointer}.crown.picture img{display:block;width:160px;aspect-ratio:16 / 9;object-fit:cover;border-radius:8px;background:var(--secondary-background-color)}.title{display:flex;align-items:center;gap:8px;font-size:1.25rem;font-weight:500;color:var(--primary-text-color);line-height:1.2}.explained{position:relative}.explained>:not(echolocal-bubble){padding-right:21px}.explained>echolocal-bubble.corner{position:absolute;top:1px;right:0;z-index:3}.subtitle{font-size:.8rem;color:var(--secondary-text-color)}.hero{margin-bottom:16px}.groups{columns:2 300px;column-gap:24px}.group{break-inside:avoid;overflow:hidden;margin-bottom:14px}.section{display:flex;align-items:center;gap:8px;margin:0 0 8px 2px;font-size:.7rem;font-weight:600;text-transform:uppercase;letter-spacing:.09em;color:var(--secondary-text-color)}.section:before{content:"";width:3px;height:12px;border-radius:2px;background:var(--primary-color);opacity:.6}.tile{display:flex;flex-direction:column;gap:9px;padding:10px 14px;margin-bottom:5px;border-radius:14px;background:color-mix(in srgb,var(--primary-text-color) 5%,transparent)}.top{display:flex;align-items:center;gap:12px}.icon{width:32px;height:32px;flex:0 0 auto;display:grid;place-items:center;border-radius:10px;background:color-mix(in srgb,var(--primary-text-color) 7%,transparent);transition:background .2s ease}.icon ha-icon{--mdc-icon-size: 19px;color:var(--secondary-text-color);display:flex;transition:color .2s ease}.tile[data-active=true] .icon{background:color-mix(in srgb,var(--primary-color) 20%,transparent)}.tile[data-active=true] .icon ha-icon{color:var(--primary-color)}.tile[data-alert=true] .icon{background:color-mix(in srgb,var(--error-color, #db4437) 20%,transparent)}.tile[data-alert=true] .icon ha-icon{color:var(--error-color, #db4437)}.named{flex:1 1 auto;min-width:0;display:flex;align-items:center;gap:7px}.name{flex:0 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--primary-text-color)}.trail{flex:0 0 auto;display:flex;align-items:center;gap:6px}.trail ha-control-switch{width:44px;--control-switch-thickness: 26px;--control-switch-border-radius: 13px}ha-control-select{--control-select-thickness: 34px;white-space:nowrap}.trail ha-control-select-menu{min-width:0;max-width:210px;--control-select-menu-height: 34px}ha-control-slider{--control-slider-thickness: 34px}.reading{background:none;border:none;padding:0;font:inherit;font-size:1.15rem;font-weight:500;font-variant-numeric:tabular-nums;color:var(--primary-text-color);cursor:pointer}.reading:hover{color:var(--primary-color)}.unit{font-size:.78rem;color:var(--secondary-text-color)}.reading.version{max-width:18ch;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:.85rem;font-weight:400}.offer{display:flex;align-items:center;gap:10px}.note{flex:1 1 auto;min-width:0;font-size:.78rem;color:var(--secondary-text-color);word-break:break-all}.lines{padding:0;border:none;background:none;font:inherit;font-size:.82rem;font-variant-numeric:tabular-nums;color:var(--primary-text-color);text-align:left;cursor:pointer;line-height:1.5;overflow-wrap:anywhere}.lines:hover{color:var(--primary-color)}.empty{color:var(--secondary-text-color)}
`;var De=`.pills{display:flex;flex-wrap:wrap;gap:5px}.pill{padding:6px 11px;border:1px solid transparent;border-radius:10px;background:color-mix(in srgb,var(--primary-text-color) 6%,transparent);color:var(--secondary-text-color);font:inherit;font-size:.8rem;cursor:pointer;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.pill:hover{background:color-mix(in srgb,var(--primary-text-color) 12%,transparent)}.pill[data-on=true]{border-color:color-mix(in srgb,var(--primary-color) 45%,transparent);background:color-mix(in srgb,var(--primary-color) 15%,transparent);color:var(--primary-color)}.pill:disabled{opacity:.4;cursor:default}
`;var ei=`:host{display:block;padding:14px;border-radius:14px;background:color-mix(in srgb,var(--primary-text-color) 5%,transparent)}.dim{display:flex;align-items:center;gap:12px;padding-bottom:12px;margin-bottom:12px;border-bottom:1px solid color-mix(in srgb,var(--primary-text-color) 10%,transparent);font-size:.85rem;color:var(--secondary-text-color)}.dim b{font-variant-numeric:tabular-nums;color:var(--primary-text-color);font-weight:500}.dim ha-control-slider{flex:1 1 auto;min-width:0;--control-slider-thickness: 28px}.hue{display:flex;align-items:center;gap:12px;padding-bottom:12px;margin-bottom:12px;border-bottom:1px solid color-mix(in srgb,var(--primary-text-color) 10%,transparent);font-size:.85rem;color:var(--secondary-text-color)}.swatches{display:flex;flex-wrap:wrap;gap:6px}.swatch{width:24px;height:24px;padding:0;border:2px solid transparent;border-radius:50%;cursor:pointer}.swatch[data-on=true]{border-color:var(--primary-text-color)}.when{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:6px;margin-bottom:12px}.situation{display:flex;align-items:center;gap:9px;padding:9px 11px;border:1px solid transparent;border-radius:12px;background:color-mix(in srgb,var(--primary-text-color) 6%,transparent);color:var(--secondary-text-color);font:inherit;cursor:pointer;text-align:left;min-width:0}.situation:hover{background:color-mix(in srgb,var(--primary-text-color) 12%,transparent)}.situation[data-on=true]{border-color:color-mix(in srgb,var(--primary-color) 45%,transparent);background:color-mix(in srgb,var(--primary-color) 14%,transparent)}.situation ha-icon{--mdc-icon-size: 19px;flex:0 0 auto;display:flex}.situation .text{min-width:0}.situation .label{font-size:.72rem;text-transform:uppercase;letter-spacing:.06em}.situation .shows{font-size:.88rem;color:var(--primary-text-color);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.situation[data-on=true] .shows{color:var(--primary-color)}.caption{margin-bottom:8px;font-size:.7rem;font-weight:600;text-transform:uppercase;letter-spacing:.09em;color:var(--secondary-text-color)}.pills{display:grid;grid-template-columns:repeat(auto-fill,minmax(104px,1fr))}
`;var Ue=[["White",[255,255,255]],["Warm",[255,190,120]],["Red",[255,40,40]],["Orange",[255,130,20]],["Yellow",[250,230,60]],["Green",[60,220,90]],["Teal",[40,220,200]],["Blue",[60,140,255]],["Violet",[150,90,255]],["Pink",[255,90,200]]];function Fr(s,i){return Array.isArray(s)&&i.every((e,t)=>s[t]===e)}var z=class extends v{constructor(){super(...arguments);this.light="";this.muted="";this.failure="";this.room="";this.target="rest"}render(){let e=this.hass.states[this.light];if(!e)return p;let t=this.situations(),r=t.find(o=>o.key===this.target)??t[0],n=e.attributes.brightness??255;return a`
      <div class="dim">
        <span>Brightness</span>
        <ha-control-slider
          min="1"
          max="255"
          .value=${n}
          .disabled=${e.state!=="on"}
          @value-changed=${o=>this.hass.callService("light","turn_on",{entity_id:this.light,brightness:o.detail.value})}
        ></ha-control-slider>
        <b>${Math.round(n/255*100)}%</b>
      </div>

      <div class="hue">
        <span>Color</span>
        <div class="swatches">
          ${Ue.map(([o,l])=>a`<button
              class="swatch"
              title=${o}
              aria-label=${o}
              data-on=${String(Fr(e.attributes.rgb_color,l))}
              style=${`background:rgb(${l.join(",")})`}
              @click=${()=>this.hass.callService("light","turn_on",{entity_id:this.light,rgb_color:l})}
            ></button>`)}
        </div>
      </div>

      <div class="when">
        ${t.map(o=>a`<button
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
      <div class="pills">
        ${this.options(r).map(o=>a`<button
            class="pill"
            data-on=${String(o===this.showing(r))}
            @click=${()=>this.choose(r,o)}
          >
            ${o}
          </button>`)}
      </div>
    `}situations(){return[{key:"rest",label:"At rest",icon:"mdi:record-circle-outline"},{key:"muted",label:"Muted",icon:"mdi:microphone-off",entity:this.muted},{key:"failure",label:"On failure",icon:"mdi:alert-circle-outline",entity:this.failure},{key:"room",label:"Follows the room",icon:"mdi:motion-sensor",entity:this.room}].filter(t=>t.key==="rest"||t.entity&&this.hass.states[t.entity])}showing(e){if(e.entity)return this.hass.states[e.entity]?.state??"";let t=this.hass.states[this.light];return t?.state!=="on"?"":t.attributes.effect??""}options(e){return(e.entity?this.hass.states[e.entity]?.attributes.options:this.hass.states[this.light]?.attributes.effect_list)??[]}choose(e,t){if(!e.entity){this.hass.callService("light","turn_on",{entity_id:this.light,effect:t});return}this.hass.callService("select","select_option",{entity_id:e.entity,option:t})}};z.styles=[b(De),b(ei)],c([u({attribute:!1})],z.prototype,"hass",2),c([u()],z.prototype,"light",2),c([u()],z.prototype,"muted",2),c([u()],z.prototype,"failure",2),c([u()],z.prototype,"room",2),c([m()],z.prototype,"target",2),z=c([y("echolocal-appearance")],z);var jr={mic_mute:"Cuts the microphones in hardware. The device cannot hear anything at all while this is on, including its wake word \u2014 it is a switch on the power to the capsules, not a software mute.",microphone_gain:"How much the capsules are amplified before anything else happens. Raise it in a large or quiet room; lower it if speech close to the device clips and comes out distorted.",microphone_mixing:"How the seven capsules are combined into the one channel the speech engine hears. Beamforming favours whichever direction someone is talking from and rejects the rest of the room; averaging treats every direction equally and is steadier when several people talk.",microphone_leveling:"Evens out loud and quiet talkers so a whisper across the room and a shout beside it arrive at similar volume. Helps transcription, and costs a little dynamic range.",microphone_cancel_echo:"Subtracts what the speaker is playing from what the microphones hear, so the device can be interrupted while it is talking and does not answer its own reply.",microphone_noise_reduction:"Takes the steady part of the room \u2014 a fan, traffic, air conditioning \u2014 out of what the microphones heard. Try turning it on in a room with background noise.",microphone_sensitivity:"How much louder than the room's own noise floor a sound has to be before the device treats it as somebody talking. Raise it in a noisy room to stop the device reacting to the room itself; lower it if quiet speech is missed.",room_level:"How loud the room is right now, in decibels below full scale. Nothing to set \u2014 it is what the sensitivity is measured against, and watching it is how you pick a sensible one.",room_floor:"The quietest the room has been recently, which is the baseline the device compares against. It drifts with the room, so a fridge switching on raises it rather than fooling the device.",mute_led_brightness:"How bright the red ring is while the microphones are cut. Dim is enough to see in a dark room without lighting it up.",mute_sound:"What the device plays when the microphones are cut or restored. Mute tones fall for muting and rise for unmuting, so the two are told apart without looking; None mutes silently.",stop_word_sensitivity:"How sure the device has to be before it takes an interruption as the word stop. Lower it if saying stop over a reply does not land.",ring:"The whole ring, as one light. Turning it off leaves the device working normally and silent about it.",segment:"One of the twelve segments, addressable on its own. They ship switched off in Home Assistant because twelve extra lights in every list is rarely what anyone wants \u2014 enable one and it can be coloured individually from the card.",ring_muted:"What the ring does while the microphones are cut. Something visible is worth choosing: a muted device that looks identical to a listening one is how people end up talking to a device that cannot hear them.",failure_effect:"What the ring does when a turn fails \u2014 no network, no pipeline, nothing understood. Distinct from the normal colours on purpose.",room_reaction:"Lets the ring track how loud the room is while the device is listening, so somebody can see that it is hearing them before it answers.",headphones:"Sends audio out of the jack instead of the speaker. The speaker goes quiet while this is on.",noise_layer:"Plays a generated sound the device makes itself \u2014 rain, a fan, a brook. Nothing is streamed and nothing is stored: it is synthesised as it plays, so it never loops or runs out. Two layers can overlap, so rain over a fan is one choice in each.",media_on_turn:"What happens to music when someone says the wake word. Ducking drops the volume and keeps playing, which resumes on the same note; stopping does not.",media_duck_level:"How far the volume drops while the device is listening or talking. Far enough that the microphones are not fighting the music, not so far that the room goes silent.",cast_receiver:"Lets phones and browsers cast to the device.",youtube_live_delay:"How far behind live a YouTube live stream plays, in seconds.",youtube_sponsorblock:"SponsorBlock categories to skip in YouTube videos, separated by commas.",backlight:"How bright the screen is.",screen_mode:"Sets the brightness from the room's light.",drawer_edge:"Which edge of the screen the dock sits on.",idle_after:"How long the screen waits with nobody using it before the idle screen comes up.",poster_every:"How often the next photo comes up.",rtsp:"Serves the camera as an RTSP stream on the network.",camera_keyframe:"Seconds between full frames.",camera_banding:"Set to your mains frequency if lights flicker in the picture.",bluetooth_speaker:"Lets phones pair with the device and play through it.",voice_resampling:"How the reply's audio is resampled to what the speaker wants. Better quality costs a little more work on a device that has four small cores.",wake_word:"What this assistant listens for. The list is what the device has on disk plus whatever Home Assistant is offering from its custom_wake_words directory.",wake_threshold:"How sure the device has to be before it decides it heard its wake word. Lower it if it misses you; raise it if the television sets it off.",follow_up:"Keeps listening for a moment after a reply, so a second question needs no second wake word.",max_listen:"How long the device will wait for someone to finish talking before giving up on the turn.",max_think:"How long to wait for Home Assistant's pipeline to answer. Generous is usually right \u2014 a slow answer beats a turn that dies just before it arrives.",wake_effect:"What the ring does at this point in a turn. Cosmetic, but it is how somebody knows the device heard them.",thinking_effect:"What the ring does while Home Assistant works on the answer. Default leaves it as the ring effect, played backwards.",replying_effect:"What the ring does while the answer plays. Default leaves it as the ring effect, played backwards.",wake_tone:"A short sound at this point in a turn. Some people want the confirmation; some find it grating.",reply_buffer:"How much of a reply to collect before starting to play it. More is steadier on a poor network, at the cost of answering a beat later.",reply_delivery:"Whether a reply starts playing as it arrives or once all of it has. Streaming is faster to start and stutters on a bad connection.",update_channel:"Which releases this device is offered. Stable only, or the ones that are still being tried out.",check_for_updates:"Looks now rather than waiting for the next scheduled check. Nothing is installed by pressing it.",bluetooth_proxy:"Forwards nearby Bluetooth advertisements to Home Assistant, so this device extends Bluetooth coverage into its room. It costs some radio time it would otherwise spend on wifi.",metrics_interval:"How often the device reports its own temperature, memory and load. Often enough to be useful; every report is work the device does instead of listening.",purge_cache:"Deletes what Android's runtime has cached. It comes back on its own, so this buys disk space for a while rather than permanently.",test_playback:"Plays a short sound, which is the quickest way to find out whether the speaker, the volume and the output route are all what you think they are.",remote_adb:"Opens Android's debugging port over the network. Off by default, and worth leaving off: it is an unauthenticated way onto the device for anything on the same network.",insecure_tls:"Lets the device accept a certificate it cannot verify, which is what talking to a Home Assistant with a self-signed one needs. It also means anything on the network can pose as that server, so it is worth turning off again once a certificate the device trusts is in place.",vad_sensitivity:"How readily the device decides somebody has stopped talking. Tighter ends a turn sooner and can cut you off mid-sentence.",wifi_signal:"How strong the connection to the access point is. Above about -70 dBm is comfortable; below -80 dBm is where audio starts arriving late.",cpu_temperature:"The chip's own temperature. These run warm by design \u2014 it is a sustained climb rather than a number that matters.",load_average:"How much work is queued across the cores. Listening for a wake word is continuous work, so this is never zero.",memory_available:"How much memory is free. Wake models and the audio path are what use it.",free_space:"Disk left. Wake models and saved recordings are what fill it.",update_status:"What the last self-update did. Worth reading when a device is on an older version than the rest."},Wr={array:"The seven capsules and what the room sounds like to them. The arc is how loud the room is right now; the notch is how far above the room's own noise floor something has to be before the device treats it as speech. Drag the notch, then talk from where you normally would and watch whether the arc crosses it.",appearance:"Ring controls, current brighness and color, active and conditional effects.",noise:"Sounds the device generates itself, mixed live rather than played from a file, so nothing loops. Two layers overlap \u2014 pick rain in one and a fan in the other.",volume:"The speaker's volume, in the same thirty steps the buttons on the device move it through, so this dial and the device agree.",history:"What the device has been hearing. Rows rebuilt from Home Assistant's recorder show what was said; rows the device itself reported also show where the time went and can be played back."},Br={microphone:"The seven microphones and how the room sounds to them. Everything here changes what the device hears before a word of it reaches Home Assistant, so it is the first place to look when it mishears or does not wake at all.",ring:"The twelve-segment light. None of it changes what the device does \u2014 it changes what somebody in the room can tell about it, which is why the muted and failed colours are worth setting.",playback:"The speaker: what comes out of it, how loud, and what happens to music when somebody talks to the device.",screen:"How the screen looks: brightness, theme, the clock, and what it shows when nobody is using it. Tap the screen on the card to open this.",poster:"Photos from an Immich server. Fill in the server and API key, then pick albums or tags.",camera:"The camera's picture and stream. Tap the picture for the live view.",assistant:"One wake word and the turn that follows it. A device can run more than one, each with its own word, sensitivity and timings, which is how one device answers to two names.",device:"The device itself rather than anything it hears or says: which releases it takes, what else it does for the network, and the housekeeping.",diagnostics:"What the device reports about itself. Nothing here is a setting \u2014 it is the evidence, and it is what to read before changing anything else.",activity:"The last few turns: what woke the device, what it heard, and what it said back. Rows the device itself reported also show where the time went, and can be played back or saved."};function ti(s){return jr[s]}function ii(s){return Wr[s]}function ri(s){return Br[s]??""}var ni="turn_audio",oi="recordings",ai="logs",qr=[{key:"listen_ms",label:"Listen"},{key:"think_ms",label:"Think"},{key:"speak_ms",label:"Reply"}];function ce(s){return qr.map(({key:i,label:e})=>({key:i,label:e,ms:Number(s[i]??0)})).filter(i=>i.ms>0)}function de(s){return ce(s).reduce((i,e)=>i+e.ms,0)}function li(s){let i=s;if(!i||i.version!=="1"||!i.wake_word)return null;let e={version:1,device:i.device_id??"",id:i.id??"",slot:si(i.slot)??1,wake_word:i.wake_word,outcome:i.outcome??"completed"};i.heard&&(e.heard=i.heard),i.reply&&(e.reply=i.reply);for(let t of["listen_ms","think_ms","speak_ms","audio_seconds"]){let r=si(i[t]);r!==void 0&&(e[t]=r)}return e}function si(s){if(s===void 0||s==="")return;let i=Number(s);return Number.isFinite(i)?i:void 0}function Fe(s,i,e,t){if(!s.connection)return Promise.resolve(()=>{});let r={type:"logbook/event_stream",start_time:i.toISOString()};return e.length&&(r.device_ids=e),s.connection.subscribeMessage(n=>{let o=[];for(let l of n.events??[]){let d=li(l);d&&o.push({at:l.when*1e3,turn:d})}t(o)},r)}var ci=`:host{display:block}.caption{display:flex;align-items:baseline;gap:8px;margin-bottom:8px;font-size:.7rem;font-weight:600;text-transform:uppercase;letter-spacing:.09em;color:var(--secondary-text-color)}.caption span{margin-left:auto;text-transform:none;letter-spacing:0;font-weight:400;font-size:.75rem}.turns{display:flex;flex-direction:column;gap:4px;max-height:300px;overflow:auto;mask-image:linear-gradient(to bottom,black calc(100% - 16px),transparent)}.turn{display:grid;grid-template-columns:auto 1fr auto;gap:4px 10px;padding:9px 12px;border-radius:12px;background:color-mix(in srgb,var(--primary-text-color) 5%,transparent)}.when{font-size:.78rem;font-variant-numeric:tabular-nums;color:var(--secondary-text-color);white-space:nowrap}.wake{font-size:.78rem;color:var(--primary-color)}.right{grid-column:3;grid-row:1;display:flex;align-items:center;gap:8px}.outcome{font-size:.72rem;color:var(--secondary-text-color);white-space:nowrap}.outcome[data-bad=true]{color:var(--error-color, #db4437)}.said,.said-back,.bar{grid-column:2 / span 2}.said{font-size:.85rem;color:var(--primary-text-color)}.said-back{font-size:.85rem;color:var(--secondary-text-color)}.said-back:before{content:"\\21b3  ";opacity:.6}.bar{display:flex;height:20px;margin-top:6px;border-radius:5px;overflow:hidden;background:color-mix(in srgb,var(--primary-text-color) 8%,transparent)}.slice{min-width:2px;display:flex;align-items:center;justify-content:center;overflow:hidden;font-size:.68rem;font-variant-numeric:tabular-nums;color:var(--text-primary-color, #fff);white-space:nowrap}.slice[data-phase=listen_ms]{background:color-mix(in srgb,var(--primary-color) 55%,transparent)}.slice[data-phase=think_ms]{background:color-mix(in srgb,var(--primary-text-color) 30%,transparent)}.slice[data-phase=speak_ms]{background:var(--success-color, #43a047)}.legend{display:flex;flex-wrap:wrap;gap:14px;margin-bottom:10px;font-size:.7rem;color:var(--secondary-text-color)}.key{display:flex;align-items:center;gap:5px}.dot{width:9px;height:9px;border-radius:2px}.none{padding:10px 0;font-size:.82rem;color:var(--secondary-text-color)}.loading{display:flex;justify-content:center;padding:32px 0}
`;var ut=new Map;function pi(s){return ut.get(s)}var Gr=6e4,Vr=6e3,di=new Map,ht=new Map;function hi(s,i){let e=di.get(i);if(e&&Date.now()-e.at<Gr)return Promise.resolve(e.ids);let t=ht.get(i);if(t)return t;let r=Lr(Yr(s,i),Vr).catch(()=>new Set).then(n=>(di.set(i,{at:Date.now(),ids:n}),n)).finally(()=>ht.delete(i));return ht.set(i,r),r}async function Yr(s,i){let t=(await s.callService("esphome",i,{},void 0,!0,!0))?.response;return t?.version===1&&Array.isArray(t.ids)?new Set(t.ids):new Set}function Lr(s,i){return new Promise((e,t)=>{let r=setTimeout(()=>t(new Error("timeout")),i);s.then(n=>{clearTimeout(r),e(n)},n=>{clearTimeout(r),t(n)})})}function ke(s,i,e){let r=`${i.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"")}_${e}`;return s?.services?.esphome?.[r]?r:void 0}async function ui(s,i,e){let t=ut.get(e);if(t)return t;let r=[],n="audio/wav",o=1;for(let d=0;d<Math.min(o,64);d++){let h=await Xr(s,i,e,d);if(!h)return null;o=h.pages||1,n=h.mime||n,r.push(Zr(h.data))}let l=URL.createObjectURL(new Blob(r,{type:n}));return ut.set(e,l),l}async function Xr(s,i,e,t){try{let n=(await s.callService("esphome",i,{id:e,page:t},void 0,!0,!0))?.response;return n?.version===1&&typeof n.data=="string"?n:null}catch{return null}}function Zr(s){let i=atob(s),e=new Uint8Array(i.length);for(let t=0;t<i.length;t++)e[t]=i.charCodeAt(t);return e}var mi=`:host{display:flex;gap:6px;flex:0 0 auto}button{flex:0 0 auto;width:28px;height:28px;display:grid;place-items:center;padding:0;border:1px solid color-mix(in srgb,var(--primary-color) 40%,transparent);border-radius:50%;background:color-mix(in srgb,var(--primary-color) 12%,transparent);cursor:pointer}button.keep{border-color:color-mix(in srgb,var(--primary-text-color) 18%,transparent);background:color-mix(in srgb,var(--primary-text-color) 5%,transparent)}button ha-icon{--mdc-icon-size: 16px;color:var(--primary-color);display:flex}button.keep ha-icon{color:var(--secondary-text-color)}.gone{display:flex;opacity:.4}.gone ha-icon{--mdc-icon-size: 16px;color:var(--secondary-text-color);display:flex}
`;var pe=null,Qr=5*6e4,M=class extends v{constructor(){super(...arguments);this.device="";this.turn="";this.filename="recording.wav";this.at=0;this.busy=!1;this.playing=!1;this.gone=!1;this.play=async()=>{if(this.playing){pe?.audio.pause();return}let e=await this.fetch();if(!e)return;pe?.stop();let t=new Audio(e),r=()=>{this.playing=!1,pe?.audio===t&&(pe=null)};t.addEventListener("ended",r),t.addEventListener("pause",r),pe={audio:t,stop:()=>t.pause()},this.playing=!0,t.play().catch(r)};this.save=async()=>{let e=await this.fetch();if(!e)return;let t=document.createElement("a");t.href=e,t.download=this.filename,t.click()}}disconnectedCallback(){super.disconnectedCallback(),this.playing&&pe?.audio.pause()}updated(){if(!this.hass||!this.turn||this.checkedTurn===this.turn)return;if(this.checkedTurn=this.turn,this.present=void 0,this.gone=!1,this.at&&Date.now()-this.at<Qr){this.present=!0;return}let e=this.device?ke(this.hass,this.device,oi):void 0;e&&hi(this.hass,e).then(t=>{this.checkedTurn===this.turn&&(this.present=t.has(this.turn))})}render(){return!this.turn||!this.action()||this.present!==!0?p:this.gone?a`<span class="gone" title="The device no longer has this recording">
        <ha-icon icon="mdi:playlist-remove"></ha-icon>
      </span>`:a`
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
    `}action(){return this.device?ke(this.hass,this.device,ni):void 0}async fetch(){let e=pi(this.turn);if(e)return e;let t=this.action();if(!t)return null;this.busy=!0;try{let r=await ui(this.hass,t,this.turn);return this.gone=!r,r||this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:"That recording is no longer on the device."},bubbles:!0,composed:!0})),r}finally{this.busy=!1}}};M.styles=b(mi),c([u({attribute:!1})],M.prototype,"hass",2),c([u()],M.prototype,"device",2),c([u()],M.prototype,"turn",2),c([u()],M.prototype,"filename",2),c([u({type:Number})],M.prototype,"at",2),c([m()],M.prototype,"busy",2),c([m()],M.prototype,"playing",2),c([m()],M.prototype,"present",2),c([m()],M.prototype,"gone",2),M=c([y("echolocal-recording")],M);var es=14,E=class extends v{constructor(){super(...arguments);this.device="";this.deviceId="";this.live=[];this.asked=!1;this.loading=!0}updated(){this.asked||!this.hass||!this.deviceId||(this.asked=!0,this.listen())}disconnectedCallback(){super.disconnectedCallback(),this.stop?.()}render(){let e=this.merged(),t=e.some(r=>r.turn&&ce(r.turn).length>0);return a`
      <div class="caption">
        Recent turns
        ${e.length?a`<span>${e.length===1?"1 turn":`${e.length} turns`}</span>`:p}
      </div>
      ${t?a`<div class="legend">
            ${[["listen_ms","Listen"],["think_ms","Think"],["speak_ms","Reply"]].map(([r,n])=>a`<span class="key"
                ><span class="dot slice" data-phase=${r}></span>${n}</span
              >`)}
          </div>`:p}
      ${e.length?a`<div class="turns">${e.map(r=>this.row(r,this.scale(e)))}</div>`:this.loading?a`<div class="loading"><ha-spinner size="medium"></ha-spinner></div>`:a`<div class="none">No recent activity found.</div>`}
    `}scale(e){return Math.max(1,...e.map(t=>t.turn?de(t.turn):0))}row(e,t){let r=e.turn,n=r?ce(r):[],o=r?de(r):0;return a`<div class="turn">
      <div class="when">${ts(e.at)}</div>
      <div class="wake">${e.wake}</div>
      <div class="right">
        ${r?a`<div class="outcome" data-bad=${String(r.outcome!=="completed")}>
              ${r.outcome==="completed"?`${(o/1e3).toFixed(1)}s`:r.outcome}
            </div>`:p}
        ${r?.audio_seconds?a`<echolocal-recording
              .hass=${this.hass}
              .device=${this.device}
              .turn=${r.id}
              .at=${e.at}
              .filename=${is(e)}
            ></echolocal-recording>`:p}
      </div>
      ${e.heard?a`<div class="said">${e.heard}</div>`:p}
      ${e.reply?a`<div class="said-back">${e.reply}</div>`:p}
      ${n.length?a`<div class="bar">
            ${n.map(l=>a`<div
                class="slice"
                data-phase=${l.key}
                title=${`${l.label} ${l.ms} ms`}
                style=${`flex:0 0 ${l.ms/t*100}%`}
              >
                ${(l.ms/1e3).toFixed(1)}s
              </div>`)}
          </div>`:p}
    </div>`}merged(){return[...this.live].sort((e,t)=>t.at-e.at)}async listen(){let e=new Date(Date.now()-es*864e5),t=this.deviceId?[this.deviceId]:[];try{this.stop=await Fe(this.hass,e,t,r=>{this.loading=!1,r.length&&(this.live=[...r.map(({at:n,turn:o})=>({at:n,wake:o.wake_word,heard:o.heard,reply:o.reply,turn:o})),...this.live])})}catch{this.loading=!1}}};E.styles=b(ci),c([u({attribute:!1})],E.prototype,"hass",2),c([u()],E.prototype,"device",2),c([u()],E.prototype,"deviceId",2),c([m()],E.prototype,"live",2),c([m()],E.prototype,"asked",2),c([m()],E.prototype,"loading",2),E=c([y("echolocal-history")],E);function ts(s){return new Date(s).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function is(s){let i=new Date(s.at).toISOString().replace(/[:.]/g,"-").slice(0,19),e=s.wake.toLowerCase().replace(/[^a-z0-9]+/g,"-");return`${i}-${e}.wav`}var gi=`:host{display:flex;flex:0 0 auto;align-self:center}button{flex:0 0 auto;display:flex;align-items:center;gap:8px;height:34px;padding:0 14px;border:1px solid color-mix(in srgb,var(--primary-text-color) 18%,transparent);border-radius:999px;background:color-mix(in srgb,var(--primary-text-color) 5%,transparent);color:var(--primary-text-color);font:inherit;font-size:.9em;white-space:nowrap;cursor:pointer}button[disabled]{cursor:default;opacity:.6}button ha-icon{--mdc-icon-size: 18px;color:var(--secondary-text-color);display:flex}button.failed{border-color:color-mix(in srgb,var(--error-color, #db4437) 50%,transparent)}button.failed ha-icon{color:var(--error-color, #db4437)}
`;var ss=64,q=class extends v{constructor(){super(...arguments);this.device="";this.busy=!1;this.failed=!1;this.save=async()=>{let e=this.action();if(e){this.busy=!0,this.failed=!1;try{let t=await this.read(e);if(!t){this.failed=!0;return}os(`${this.device}_logs_${ns()}.txt`,t.join(`
`)+`
`)}finally{this.busy=!1}}}}render(){return this.action()?a`
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
    `:p}action(){return this.device?ke(this.hass,this.device,ai):void 0}async read(e){let t=[],r=1;for(let n=0;n<Math.min(r,ss);n++){let o=await this.call(e,n);if(!o)return null;r=o.pages||1,t.push(...o.lines??[])}return t}async call(e,t){try{let n=(await this.hass.callService("esphome",e,{page:t},void 0,!0,!0))?.response;return n?.version===1&&Array.isArray(n.lines)?n:null}catch{return null}}};q.styles=b(gi),c([u({attribute:!1})],q.prototype,"hass",2),c([u()],q.prototype,"device",2),c([m()],q.prototype,"busy",2),c([m()],q.prototype,"failed",2),q=c([y("echolocal-logs")],q);function ns(){return new Date().toISOString().replace(/\.\d+Z$/,"").replace(/:/g,"-")}function os(s,i){let e=URL.createObjectURL(new Blob([i],{type:"text/plain"})),t=document.createElement("a");t.href=e,t.download=s,t.click(),URL.revokeObjectURL(e)}var fi=`:host{display:block;padding:14px;border-radius:14px;background:color-mix(in srgb,var(--primary-text-color) 5%,transparent)}.caption{display:flex;align-items:baseline;gap:8px;margin-bottom:10px;font-size:.7rem;font-weight:600;text-transform:uppercase;letter-spacing:.09em;color:var(--secondary-text-color)}.caption span{margin-left:auto;text-transform:none;letter-spacing:0;font-weight:400;font-size:.75rem}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(78px,1fr));gap:6px}.sound{position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;padding:10px 6px;border:1px solid transparent;border-radius:12px;background:color-mix(in srgb,var(--primary-text-color) 6%,transparent);color:var(--secondary-text-color);font:inherit;font-size:.75rem;cursor:pointer}.sound:hover{background:color-mix(in srgb,var(--primary-text-color) 12%,transparent)}.sound[data-on=true]{border-color:color-mix(in srgb,var(--primary-color) 45%,transparent);background:color-mix(in srgb,var(--primary-color) 15%,transparent);color:var(--primary-color)}.sound ha-icon{--mdc-icon-size: 22px;display:flex}.layer{position:absolute;top:4px;right:6px;font-size:.62rem;line-height:1}
`;var vi=`:host{display:flex;gap:18px;align-items:center;padding:14px;border-radius:14px;background:color-mix(in srgb,var(--primary-text-color) 5%,transparent)}.dial{width:150px;flex:0 0 auto;touch-action:none}svg{width:100%;height:auto;display:block}.bed{fill:none;stroke:color-mix(in srgb,var(--primary-text-color) 10%,transparent);stroke-width:10;stroke-linecap:round}.live{fill:none;stroke:var(--primary-color);stroke-width:10;stroke-linecap:round;transition:stroke-dasharray .25s ease}.live[data-muted=true]{stroke:color-mix(in srgb,var(--primary-text-color) 20%,transparent)}.step{fill:var(--primary-text-color);font-size:26px;font-weight:500;text-anchor:middle}.of{fill:var(--secondary-text-color);font-size:10px;text-anchor:middle;text-transform:uppercase;letter-spacing:.1em}.side{flex:1 1 auto;min-width:0;display:flex;align-items:center;justify-content:space-between;gap:12px}.state{font-size:1.05rem;color:var(--primary-text-color)}.badges{display:flex;flex-wrap:wrap;gap:6px}.badge{display:flex;align-items:center;gap:6px;padding:5px 10px;border-radius:10px;background:color-mix(in srgb,var(--primary-text-color) 7%,transparent);font-size:.78rem;color:var(--secondary-text-color)}.badge ha-icon{--mdc-icon-size: 16px;display:flex}.badge[data-on=true]{background:color-mix(in srgb,var(--primary-color) 16%,transparent);color:var(--primary-color)}
`;var mt=135,gt=270,je=100,We=100,he=78,cs={White:"mdi:grain",Pink:"mdi:blur",Brown:"mdi:waveform",Rain:"mdi:weather-pouring",Ocean:"mdi:waves",Brook:"mdi:water",Wind:"mdi:weather-windy",Fire:"mdi:fireplace",Crickets:"mdi:bug-outline",Fan:"mdi:fan",Cabin:"mdi:airplane"},ue="None",Y=class extends v{constructor(){super(...arguments);this.player="";this.jack="";this.grab=e=>{let t=e.currentTarget;t.setPointerCapture(e.pointerId);let r=d=>{let h=t.getBoundingClientRect(),g=d.clientX-h.left-h.width/2,f=d.clientY-h.top-h.height/2,w=Math.atan2(f,g)*180/Math.PI-mt;for(;w<0;)w+=360;let $=Math.max(0,Math.min(1,Math.min(w,gt)/gt));return Math.round($*30)/30},n=d=>this.hass.callService("media_player","volume_set",{entity_id:this.player,volume_level:r(d)}),o=d=>n(d),l=d=>{t.removeEventListener("pointermove",o),t.removeEventListener("pointerup",l),t.removeEventListener("pointercancel",l),n(d)};t.addEventListener("pointermove",o),t.addEventListener("pointerup",l),t.addEventListener("pointercancel",l),n(e)}}render(){let e=this.hass.states[this.player];if(!e)return p;let t=Number(e.attributes.volume_level??0),r=e.attributes.is_volume_muted===!0,n=this.jack?this.hass.states[this.jack]?.state==="on":!1;return a`
      <div class="dial" @pointerdown=${this.grab}>
        <svg viewBox="0 0 200 200" role="img" aria-label="Volume">
          <path class="bed" d=${bi()} pathLength="100"></path>
          ${t>0?x`<path class="live" data-muted=${String(r)} d=${bi()} pathLength="100"
                stroke-dasharray=${`${t*100} 100`}></path>`:p}
          <text class="step" x=${je} y=${We+4}>${Math.round(t*30)}</text>
          <text class="of" x=${je} y=${We+20}>of 30</text>
        </svg>
      </div>

      <div class="side">
        <div class="state">${ds(e.state)}</div>
        <div class="badges">
          <div class="badge" data-on=${String(r)}>
            <ha-icon .icon=${r?"mdi:volume-off":"mdi:volume-high"}></ha-icon>
            ${r?"Muted":`${Math.round(t*100)}%`}
          </div>
          ${this.jack?a`<div class="badge" data-on=${String(n)}>
                <ha-icon icon="mdi:headphones"></ha-icon>
                ${n?"Headphones":"Speaker"}
              </div>`:p}
        </div>
      </div>
    `}};Y.styles=b(vi),c([u({attribute:!1})],Y.prototype,"hass",2),c([u()],Y.prototype,"player",2),c([u()],Y.prototype,"jack",2),Y=c([y("echolocal-volume")],Y);var L=class extends v{constructor(){super(...arguments);this.layers=[];this.busy=!1}render(){let e=this.layers.map(o=>this.hass.states[o]?.state??ue),t=(this.hass.states[this.layers[0]]?.attributes.options??[]).filter(o=>o!==ue),r=e.every(o=>o!==ue),n=o=>e.indexOf(o);return a`
      <div class="caption">
        Generated sound
        <span>${r?"Both layers in use":`${e.filter(o=>o!==ue).length} of 2`}</span>
      </div>
      <div class="grid">
        ${t.map(o=>{let l=n(o);return a`<button
            class="sound"
            data-on=${String(l>=0)}
            ?disabled=${this.busy}
            @click=${()=>this.pick(o,l,e)}
          >
            <ha-icon .icon=${cs[o]??"mdi:music-note"}></ha-icon>
            ${o}
            ${l>=0&&this.layers.length>1?a`<span class="layer">${l+1}</span>`:p}
          </button>`})}
      </div>
    `}async pick(e,t,r){let n=r.findIndex(l=>l===ue),o=t>=0?t:n>=0?n:this.layers.length-1;if(!(o<0)){this.busy=!0;try{await this.hass.callService("select","select_option",{entity_id:this.layers[o],option:t>=0?ue:e})}finally{this.busy=!1}}}};L.styles=b(fi),c([u({attribute:!1})],L.prototype,"hass",2),c([u({attribute:!1})],L.prototype,"layers",2),c([m()],L.prototype,"busy",2),L=c([y("echolocal-noise")],L);function ds(s){return s==="playing"?"Playing":s==="paused"?"Paused":s==="unavailable"?"Unavailable":"Idle"}function bi(){let s=mt*Math.PI/180,i=(mt+gt)*Math.PI/180;return`M${(je+he*Math.cos(s)).toFixed(2)} ${(We+he*Math.sin(s)).toFixed(2)}
    A${he} ${he} 0 1 1 ${(je+he*Math.cos(i)).toFixed(2)} ${(We+he*Math.sin(i)).toFixed(2)}`}var A=class extends v{constructor(){super(...arguments);this.heading="";this.subtitle="";this.icon="";this.sections=[];this.widgets=[];this.device="";this.deviceId="";this.help=!0;this.about="";this.held={}}render(){let e=this.sections.map(o=>({...o,rows:o.rows.filter(l=>this.hass.states?.[l.entityId])})).filter(o=>o.rows.length),n=`--ha-dialog-width-md:${e.reduce((o,l)=>o+l.rows.length,0)>3||this.widgets.some(o=>o.place!=="header")?820:460}px`;return a`
      <ha-dialog open hideActions style=${n} @closed=${this.dismiss}>
        <div class="sheet">
          <div class="head">
            <div class="crest"><ha-icon .icon=${this.icon}></ha-icon></div>
            <div class="titles">
              <div class="title">
                ${this.heading}
                ${this.help&&this.about?a`<echolocal-bubble .text=${this.about}></echolocal-bubble>`:p}
              </div>
              ${this.subtitle?a`<div class="subtitle">${this.subtitle}</div>`:p}
            </div>
            ${this.widgets.filter(o=>o.place==="header").map(o=>this.widget(o))}
          </div>
          ${this.widgets.filter(o=>o.place!=="header").map(o=>this.explained(o))}
          <div class="groups">
            ${e.length?e.map(o=>this.group(o)):this.widgets.length?p:a`<div class="empty">Nothing to show here.</div>`}
          </div>
        </div>
      </ha-dialog>
    `}widget({widget:e,roles:t,lists:r}){let n=o=>o?.[0]??"";switch(e){case"appearance":return a`<echolocal-appearance
          class="hero"
          .hass=${this.hass}
          .light=${t.light}
          .muted=${n(r.muted)}
          .failure=${n(r.failure)}
          .room=${n(r.room)}
        ></echolocal-appearance>`;case"array":return a`<echolocal-array
          class="hero"
          .hass=${this.hass}
          .level=${t.level}
          .floor=${t.floor}
          .gate=${t.gate}
          .mode=${t.mode}
          .muted=${this.muted}
        ></echolocal-array>`;case"logs":return a`<echolocal-logs
          .hass=${this.hass}
          .device=${this.device}
        ></echolocal-logs>`;case"history":return a`<echolocal-history
          class="hero"
          .hass=${this.hass}
          .device=${this.device}
          .deviceId=${this.deviceId}
        ></echolocal-history>`;case"volume":return a`<echolocal-volume
          class="hero"
          .hass=${this.hass}
          .player=${t.player}
          .jack=${n(r.jack)}
        ></echolocal-volume>`;case"noise":return a`<echolocal-noise
          class="hero"
          .hass=${this.hass}
          .layers=${r.layers??[]}
        ></echolocal-noise>`;case"player":return this.crownPlayer(t.player);case"power":return this.crownPower(t.light);case"mute":return this.crownMute(t.mute,t.lamp);case"camera":return this.crownCamera(t.camera)}}crownCamera(e){let t=this.hass.states[e]?.attributes.entity_picture;if(typeof t!="string")return a``;let r=`${t}${t.includes("?")?"&":"?"}t=${Math.floor(Date.now()/1e4)}`;return a`<button class="crown picture" @click=${()=>this.moreInfo(e)}>
      <img src=${r} alt="Camera" />
    </button>`}crownPlayer(e){let t=this.hass.states[e],r=t?.state==="playing",n=t?.attributes.is_volume_muted!==!0;return a`<div class="crown">
      <ha-icon-button
        .label=${r?"Pause":"Play"}
        @click=${()=>this.hass.callService("media_player",r?"media_pause":"media_play",{entity_id:e})}
      >
        <ha-icon .icon=${r?"mdi:pause":"mdi:play"}></ha-icon>
      </ha-icon-button>
      ${this.crownSwitch(n,"Sound",o=>this.hass.callService("media_player","volume_mute",{entity_id:e,is_volume_muted:!o}))}
    </div>`}crownPower(e){return a`<div class="crown">
      ${this.crownSwitch(this.hass.states[e]?.state==="on","Ring",t=>this.hass.callService("light",t?"turn_on":"turn_off",{entity_id:e}))}
    </div>`}crownMute(e,t){let r=this.hass.states[t];return a`<div class="crown">
      ${r?a`<ha-control-select
            class="lamp"
            .options=${(r.attributes.options??[]).map(n=>({value:n,label:n}))}
            .value=${r.state}
            label="Mute indicator"
            @value-changed=${n=>this.hass.callService("select","select_option",{entity_id:t,option:n.detail.value})}
          ></ha-control-select>`:p}
      ${this.crownSwitch(this.hass.states[e]?.state==="on","Microphone mute",n=>this.hass.callService("switch",n?"turn_on":"turn_off",{entity_id:e}),"warn")}
    </div>`}crownSwitch(e,t,r,n=""){return a`<ha-control-switch
      class=${n}
      .checked=${e}
      .label=${t}
      @change=${o=>r(o.target.checked)}
    ></ha-control-switch>`}get muted(){let e=this.widgets.find(t=>t.roles.mute)?.roles.mute;return!!e&&this.hass.states[e]?.state==="on"}explained(e){let t=this.help?ii(e.widget):void 0;return t?a`<div class="explained">
      ${this.widget(e)}
      <echolocal-bubble class="corner" .text=${t}></echolocal-bubble>
    </div>`:this.widget(e)}group(e){return a`<section class="group">
      ${e.title?a`<div class="section">${e.title}</div>`:p}
      ${e.rows.map(t=>this.row(t))}
    </section>`}row(e){if(!this.hass.states?.[e.entityId])return p;switch(e.entityId.split(".")[0]){case"switch":return this.toggle(e,"switch");case"light":return this.toggle(e,"light");case"number":return this.slider(e);case"select":return this.options(e);case"button":return this.press(e);case"update":return this.version(e);default:return this.reading(e)}}version(e){let t=this.hass.states[e.entityId],r=t.attributes.installed_version,n=t.attributes.latest_version,o=t.state==="on"&&n&&n!==r;return t.attributes.in_progress?this.tile(e,!0,{trail:a`<ha-spinner size="tiny"></ha-spinner>`,under:a`<div class="note">Installing ${String(n)}</div>`}):this.tile(e,!1,{trail:a`<button class="reading version" @click=${()=>this.moreInfo(e.entityId)}>
        ${r?String(r):t.state}
      </button>`,under:o?a`<div class="offer">
            <div class="note">New: ${String(n)}</div>
            <ha-button
              size="small"
              @click=${()=>this.hass.callService("update","install",{entity_id:e.entityId})}
            >
              Update
            </ha-button>
          </div>`:void 0})}toggle(e,t){let{entityId:r,label:n}=e,o=this.hass.states[r].state;return this.tile(e,o==="on",{trail:a`<ha-control-switch
        .checked=${o==="on"}
        .disabled=${o==="unavailable"}
        .label=${n}
        @change=${l=>this.hass.callService(t,l.target.checked?"turn_on":"turn_off",{entity_id:r})}
      ></ha-control-switch>`})}slider(e){let{entityId:t}=e,r=this.hass.states[t],n=r.attributes,o=n.min??0,l=n.max??100,d=this.held[t]??Number(r.state);return this.tile(e,!1,{trail:a`<span class="reading">${Number.isNaN(d)?"\u2014":d}</span>
        ${n.unit_of_measurement?a`<span class="unit">${n.unit_of_measurement}</span>`:p}`,under:a`<ha-control-slider
        .value=${d}
        .min=${o}
        .max=${l}
        .step=${n.step??1}
        .unit=${n.unit_of_measurement??""}
        .disabled=${r.state==="unavailable"}
        @slider-moved=${h=>{this.held={...this.held,[t]:h.detail.value}}}
        @value-changed=${h=>{let{[t]:g,...f}=this.held;this.held=f,this.hass.callService("number","set_value",{entity_id:t,value:h.detail.value})}}
      ></ha-control-slider>`})}options(e){let{entityId:t}=e,r=this.hass.states[t],n=r.attributes.options??[],o=n.map(h=>({value:h,label:h})),l=h=>{h&&h!==r.state&&this.hass.callService("select","select_option",{entity_id:t,option:h})},d=r.state==="unavailable";return this.tile(e,!1,{trail:n.length===2?a`<div class="pills">
              ${n.map(h=>a`<button
                  class="pill"
                  data-on=${String(h===r.state)}
                  ?disabled=${d}
                  @click=${()=>l(h)}
                >
                  ${h}
                </button>`)}
            </div>`:a`<ha-control-select-menu
              .options=${o}
              .value=${r.state}
              .disabled=${d}
              .label=${e.label}
              hide-label
              show-arrow
              @wa-select=${h=>l(h.detail.item?.value)}
            ></ha-control-select-menu>`})}press(e){let t=e.reading?this.hass.states[e.reading]:void 0,r=a`<ha-button
      size="small"
      @click=${()=>this.hass.callService("button","press",{entity_id:e.entityId})}
    >
      Run
    </ha-button>`;return t?this.tile(e,!1,{trail:a`<span class="reading">${t.state}</span>
        ${t.attributes.unit_of_measurement?a`<span class="unit">${t.attributes.unit_of_measurement}</span>`:p}`,under:r}):this.tile(e,!1,{trail:r})}reading(e){let t=this.hass.states[e.entityId],r=t.attributes.unit_of_measurement,n=t.state.split(", ").filter(l=>l.length);if(n.length>1)return this.tile(e,!1,{under:a`<button class="lines" @click=${()=>this.moreInfo(e.entityId)}>
          ${n.map(l=>a`<div>${l}</div>`)}
        </button>`});let o=t.attributes.mode==="password"&&t.state?"\u2022\u2022\u2022\u2022\u2022\u2022":t.state;return this.tile(e,!1,{trail:a`<button
          class=${o.length>12?"reading version":"reading"}
          title=${o}
          @click=${()=>this.moreInfo(e.entityId)}
        >
          ${o}
        </button>
        ${r?a`<span class="unit">${r}</span>`:p}`})}tile({entityId:e,label:t,name:r},n,o){let l=this.hass.states[e].attributes.icon,d=n&&l?.includes("mic")&&l.includes("off"),h=this.help?ti(r):void 0;return a`<div class="tile" data-active=${String(n&&!d)} data-alert=${String(!!d)}>
      <div class="top">
        <div class="icon"><ha-icon .icon=${l??"mdi:tune"}></ha-icon></div>
        <div class="named">
          <div class="name">${t}</div>
          ${h?a`<echolocal-bubble .text=${h}></echolocal-bubble>`:p}
        </div>
        ${o.trail?a`<div class="trail">${o.trail}</div>`:p}
      </div>
      ${o.under??p}
    </div>`}moreInfo(e){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))}dismiss(){this.dispatchEvent(new CustomEvent("closed",{bubbles:!0,composed:!0}))}};A.styles=[b(De),b(Qt)],c([u({attribute:!1})],A.prototype,"hass",2),c([u()],A.prototype,"heading",2),c([u()],A.prototype,"subtitle",2),c([u()],A.prototype,"icon",2),c([u({attribute:!1})],A.prototype,"sections",2),c([u({attribute:!1})],A.prototype,"widgets",2),c([u()],A.prototype,"device",2),c([u()],A.prototype,"deviceId",2),c([u({type:Boolean})],A.prototype,"help",2),c([u()],A.prototype,"about",2),c([m()],A.prototype,"held",2),A=c([y("echolocal-dialog")],A);function xi(s,i){let e=ft(s);return i.map(t=>{let r=e?.get(t.entity_id);return{...t,name:r?.name??"",slot:r?.slot??0}})}function Be(s){let i=new Map;for(let e of s){let t=i.get(e.name);t?t.push(e):i.set(e.name,[e])}for(let e of i.values())e.sort((t,r)=>t.slot-r.slot);return i}var se="echolocal-keys",yi=!1,wi=null;function ft(s){return yi||(yi=!0,ps(s)),wi}function ps(s){s.connection?.subscribeMessage(i=>{let e=new Map;for(let t of i.entities)t.device_id&&e.set(t.entity_id,{entityId:t.entity_id,deviceId:t.device_id,...hs(t.object_id),disabled:t.disabled});wi=e,window.dispatchEvent(new Event(se))},{type:"echolocal/entities"}).catch(()=>{})}function hs(s){let i=s.lastIndexOf("_"),e=i<0?"":s.slice(i+1);return/^\d+$/.test(e)?{name:s.slice(0,i),slot:Number(e)}:{name:s,slot:0}}var Ke={ring:[{title:null,rows:[["ring","Ring"]]},{title:"Segments",rows:[["segment","Segment"]]}],microphone:[{title:null,rows:[["mic_mute","Mute"]]},{title:"Capture",rows:[["microphone_gain","Gain"],["microphone_mixing","Mixing"],["microphone_leveling","Leveling"],["microphone_cancel_echo","Echo cancellation"],["microphone_noise_reduction","Noise reduction"]]},{title:"The room",rows:[["microphone_sensitivity","Sensitivity"],["room_level","Room level"],["room_floor","Room floor"],["stop_word_sensitivity","Stop word"],["vad_sensitivity","End of speech"]]},{title:"Indicator",rows:[["mute_led_brightness","Mute light"],["mute_sound","Mute sound"]]}],playback:[{title:null,rows:[["headphones","Headphones"]]},{title:"Volume",rows:[["volume_media","Music"],["volume_voice","Voice"],["volume_alerts","Alerts"],["volume_feedback","Beeps"]]},{title:"Generated sound",rows:[["noise_layer","Layer"]]},{title:"During a turn",rows:[["media_on_turn","Music"],["media_duck_level","Ducking"]]},{title:"Voice",rows:[["voice_resampling","Resampling"]]},{title:"Cast",rows:[["cast_receiver","Cast receiver"],["youtube_lounge_on_demand","YouTube on demand"],["youtube_live_delay","YouTube live delay"],["youtube_sponsorblock","SponsorBlock categories"],["cast_credentials","Credentials"],["cast_credentials_expire","Credentials expire"],["cast_oracle","Credential server"]]}],screen:[{title:null,rows:[["backlight","Brightness"],["screen_mode","Automatic brightness"],["screen_brightness","Brightness now"],["ambient_light","Room light"]]},{title:"Look",rows:[["theme","Theme"],["screen_style","Style"],["screen_size","Size"],["drawer_edge","Dock side"],["dashboard_logo","Logo"],["privacy_marks","Privacy marks"]]},{title:"Clock",rows:[["clock_face","Face"],["clock_format","Format"],["clock_size","Size"],["clock_position","Position"],["clock_color","Color"],["clock_date","Date"]]},{title:"Visual",rows:[["visual","Visual"],["visual_label","Label"]]},{title:"When idle",rows:[["idle_after","Idle after"],["idle_face","Clock face"],["idle_size","Clock size"],["idle_position","Vertical position"],["idle_align","Horizontal position"],["idle_visual","Visual"],["idle_visual_1_source","Visual 1 listens to"],["idle_visual_2_source","Visual 2 listens to"]]}],poster:[{title:null,rows:[["poster","Posters"],["poster_showing","Showing"],["poster_every","Changes"],["poster_next","Next poster"]]},{title:"Immich",rows:[["poster_server","Server"],["poster_key","API key"],["poster_albums","Albums"],["poster_tags","Tags"]]}],camera:[{title:null,rows:[["camera_covered","Shutter closed"],["rtsp","RTSP server"],["camera_main_on","Main stream"]]},{title:"Stream",rows:[["camera_main_size","Resolution"],["camera_quality","Quality"],["camera_framerate","Frame rate"],["camera_framerate_auto","Automatic frame rate"],["camera_keyframe","Keyframe interval"]]},{title:"Picture",rows:[["camera_brightness","Brightness"],["camera_contrast","Contrast"],["camera_saturation","Saturation"],["camera_sharpness","Sharpness"],["camera_hue","Hue"],["camera_ev","Exposure"],["camera_iso","ISO"],["camera_whitebalance","White balance"],["camera_scene","Scene"],["camera_effect","Effect"],["camera_banding","Anti-banding"],["camera_reset","Reset"]]}],assistant:[{title:null,rows:[["wake_word","Wake word"],["pipeline","Pipeline"],["wake_threshold","Wake sensitivity"]]},{title:"Timing",rows:[["max_listen","Max listen"],["max_think","Max think"],["follow_up","Follow up"]]},{title:"Feedback",rows:[["wake_effect","Listening effect"],["thinking_effect","Thinking effect"],["replying_effect","Replying effect"],["wake_tone","Chime"]]},{title:"Reply",rows:[["reply_buffer","Buffer"],["reply_delivery","Delivery"]]},{title:"Recordings",rows:[["keep_recordings","Recordings kept"]]}],device:[{title:null,rows:[["firmware","Firmware"],["update_channel","Update channel"],["check_for_updates","Check for updates"]]},{title:"Bluetooth",rows:[["bluetooth_proxy","Proxy enabled"],["bluetooth_speaker","Speaker"]]},{title:"Maintenance",rows:[["metrics_interval","Metrics interval"],["purge_cache","Purge cache","cached_data"],["test_playback","Test playback"],["remote_adb","Remote adb"],["insecure_tls","Insecure TLS"]]}],diagnostics:[{title:"Network",rows:[["ip_address","IP address"],["wifi_signal","Signal"],["wifi_sent","Sent"],["wifi_received","Received"],["ble_advertisements","Bluetooth advertisements"]]},{title:"Hardware",rows:[["cpu_temperature","CPU"],["radio_temperature","Radio"],["cpu_cores","Cores"],["cpu_cores_online","Cores online"],["load_average","Load"],["memory_available","Memory"],["free_space","Disk"]]},{title:"Updates",rows:[["update_status","Update status"],["update_outcome","Last update"]]}]},us={ring:[{widget:"power",place:"header",roles:{light:"ring"}},{widget:"appearance",roles:{light:"ring"},lists:{segments:"segment",muted:"ring_muted",failure:"failure_effect",room:"room_reaction"}}],playback:[{widget:"player",place:"header",roles:{player:"speaker"}},{widget:"volume",roles:{player:"speaker"},lists:{jack:"headphones"}},{widget:"noise",roles:{first:"noise_layer"},lists:{layers:"noise_layer"}}],activity:[{widget:"history",roles:{}}],camera:[{widget:"camera",place:"header",roles:{camera:"camera"}}],microphone:[{widget:"mute",place:"header",roles:{mute:"mic_mute",lamp:"mute_led_brightness"}},{widget:"array",roles:{level:"room_level",floor:"room_floor",gate:"microphone_sensitivity",mode:"microphone_mixing"}}]},ms=[["ring","ring"],["microphone","mic_mute"],["playback","speaker"],["screen","theme"],["poster","poster"],["camera","camera"]];function $i(s){let i=ms.filter(([,e])=>s.by.has(e)).map(([e])=>({kind:e,slot:0}));for(let e of s.by.get("wake_threshold")??[])i.push({kind:"assistant",slot:e.slot});return i}function _i(s,i,e=0){let t=[],r=new Set;for(let n of us[s]??[]){let o={};for(let[d,h]of Object.entries(n.roles)){let g=qe(i.by,h,e)[0];g&&(o[d]=g.entity_id)}if(Object.keys(o).length!==Object.keys(n.roles).length)continue;let l={};for(let[d,h]of Object.entries(n.lists??{}))l[d]=qe(i.by,h,e).map(g=>g.entity_id);t.push({widget:n.widget,place:n.place??"body",roles:o,lists:l}),[...Object.values(o),...Object.values(l).flat()].forEach(d=>r.add(d))}return{widgets:t,sections:Ai(Ke[s]??[],i.by,e,r)}}var gs=new Set(["switch","select","number","button","text","time","update"]);function ki(s){return Ci(Ke.device??[],s.entities.filter(i=>i.device_id===s.device.id&&gs.has(i.entity_id.split(".")[0])),new Set,i=>i.entity_category!=="diagnostic")}function Si(s){let i=s.entities.filter(e=>e.entity_category==="diagnostic");return{widgets:[{widget:"logs",place:"header",roles:{},lists:{}}],sections:Ci(Ke.diagnostics??[],i,new Set)}}function qe(s,i,e){let t=s.get(i)??[];return e?t.filter(r=>(r.slot||1)===e):t}function Ai(s,i,e,t){let r=[];for(let n of s){let o=[];for(let[l,d,h]of n.rows){let g=qe(i,l,e);for(let f of g)t.has(f.entity_id)||o.push({entityId:f.entity_id,name:l,label:g.length>1?`${d} ${f.slot}`:d,reading:h?qe(i,h,e)[0]?.entity_id:void 0})}o.length&&r.push({title:n.title,rows:o})}return r}var fs=new Set(Object.values(Ke).flatMap(s=>(s??[]).flatMap(i=>i.rows.flatMap(([e,,t])=>t?[e,t]:[e]))));function Ci(s,i,e,t=()=>!0){let r=Ai(s,Be(i),0,e),n=new Set(r.flatMap(l=>l.rows.flatMap(d=>[d.entityId,d.reading??""]))),o=i.filter(l=>!n.has(l.entity_id)&&!e.has(l.entity_id)&&!fs.has(l.name)&&t(l));return o.length?[...r,{title:r.length?"More":null,rows:o.map(l=>({entityId:l.entity_id,name:l.name,label:l.name||l.entity_id})).sort((l,d)=>l.label.localeCompare(d.label))}]:r}var vs="EchoLocal",bs="esphome",Se=12;function ys(s){return!!s?.identifiers?.some(([i])=>i===bs)}function Mi(s,i){return Object.values(s.devices??{}).filter(e=>e.via_device_id===i&&!e.disabled_by).sort((e,t)=>S(e).localeCompare(S(t)))}function C(s){return s?Object.values(s.devices??{}).filter(i=>xs(s,i.id)&&!i.via_device_id&&!i.disabled_by).sort((i,e)=>S(i).localeCompare(S(e))):[]}function S(s){return s?.name_by_user||s?.name||""}function xs(s,i){return s?.devices?.[i]?.manufacturer!==vs?!1:Mi(s,i).some(ys)}function K(s,i){if(!s||!i)return null;let e=s.devices?.[i];if(!e)return null;let t=new Set([i,...Mi(s,i).map(h=>h.id)]),r=xi(s,Object.values(s.entities??{}).filter(h=>h.device_id&&t.has(h.device_id)&&!h.hidden)),n=Be(r),o=h=>n.get(h)?.[0]?.entity_id,l=new Array(Se).fill(void 0);for(let h of n.get("segment")??[]){let g=h.slot-1;g>=0&&g<Se&&(l[g]=h.entity_id)}let d=o("hardware_board");return{device:e,entities:r,by:n,board:d&&s.states?.[d]?.state||"",satellite:o("assist_satellite"),player:o("speaker"),update:o("firmware"),ring:o("ring"),segments:l,mute:o("mic_mute")}}function Ae(s){return s.by.has("backlight")}function Ti(s){return(s.by.get("wake_assistant")??[]).map(i=>i.entity_id)}function Ce(s,i){let e=i?s?.states?.[i]:void 0;return!e||e.state!=="on"?null:{rgb:e.attributes.rgb_color??[255,255,255],level:(e.attributes.brightness??255)/255}}function Ge(s,i){return!!i&&s?.states?.[i]?.state==="on"}function Hi(s,i){return(i?s?.states?.[i]?.state:void 0)??"unavailable"}function Pi(s,i){let e=new Array(Se).fill(void 0),t=ft(s);if(!t)return e;let r=new Set(i.entities.map(n=>n.device_id));for(let n of t.values())!n.disabled||n.name!=="segment"||r.has(n.deviceId)&&n.slot>=1&&n.slot<=Se&&(e[n.slot-1]=n.entityId);return e}async function Ri(s,i){await s.callWS({type:"config/entity_registry/update",entity_id:i,disabled_by:null})}var ws={checkers:"round",cronos:"square"};function Ei(s){return ws[s]??null}var bt={Midnight:{background:"#0b0e14",text:"#e6edf3",muted:"#8b97a8",accent:"#4c9aff"},Nocturne:{background:"#11131a",text:"#e8e6e3",muted:"#9a97a3",accent:"#c8a2ff"},Slate:{background:"#14171c",text:"#dfe4ea",muted:"#8a929e",accent:"#5ec8c8"},Ember:{background:"#14100e",text:"#f3e7dd",muted:"#a8948a",accent:"#ff8c42"},Forest:{background:"#0e1512",text:"#dfeae2",muted:"#85998c",accent:"#5fbf8f"},Ocean:{background:"#081620",text:"#dceaf2",muted:"#7d9aa8",accent:"#36b6d6"},Plum:{background:"#150f1a",text:"#ece4f5",muted:"#9b8fae",accent:"#d86fd8"},Carbon:{background:"#000000",text:"#f2f2f2",muted:"#8c8c8c",accent:"#ffffff"},Paper:{background:"#f7f5f1",text:"#22252a",muted:"#6d7480",accent:"#2f6fdb"},Linen:{background:"#f3ece2",text:"#2b2622",muted:"#7b6f63",accent:"#b5652f"},Mist:{background:"#eef2f5",text:"#1f2933",muted:"#66737f",accent:"#2b93b6"},Bloom:{background:"#faf0f3",text:"#2e2329",muted:"#7d6a73",accent:"#d1547d"}},Oi="Paper",Ni={Amber:"#f2a63b",Red:"#e5544b",Green:"#4caf78",Cyan:"#35b8c4",Blue:"#4f8ef7",Violet:"#9a7bf0",Pink:"#e86aa6"},zi={Nano:9,Micro:12,Mini:15,Small:19,Medium:25,Large:33},Ve=27,X=33,Ye=186,me=93;function Ii(s,i){let{screen:e}=s;return x`
    <svg viewBox="0 0 240 150" role="img" aria-label="Echo Show">
      ${vt(140,x`<path d="M-3 0h6"></path>`,"Volume down",()=>i.volume(-1))}
      ${vt(166,x`<path d="M-3 0h6M0 -3v6"></path>`,"Volume up",()=>i.volume(1))}
      ${vt(192,x`<path d="M-1.6 -2.6a1.6 1.6 0 0 1 3.2 0v1.8a1.6 1.6 0 0 1-3.2 0z"></path>
          <path d="M-2.8 -0.6a2.8 2.8 0 0 0 5.6 0"></path>`,s.muted?"Microphone muted":"Microphone live",i.mute,s.muted)}

      <rect x="4" y="14" width="232" height="130" rx="16" fill="var(--el-shell)"></rect>
      <rect x="4" y="14" width="232" height="130" rx="16" fill="none" stroke="var(--el-edge)"></rect>
      <rect x="11" y="21" width="218" height="116" rx="10" fill="var(--el-glass)"></rect>

      <g class="screen" role="button" tabindex="0" aria-label="Screen" @click=${i.screen}>
        <rect x=${Ve} y=${X} width=${Ye} height=${me} rx="2" fill=${e.palette.background}></rect>
        ${$s(e)}
        <rect
          x=${Ve}
          y=${X}
          width=${Ye}
          height=${me}
          rx="2"
          fill="#000"
          style="opacity:${(1-e.lit)*.7}"
        ></rect>
        <rect
          class="bar"
          data-muted=${String(s.muted)}
          x=${Ve}
          y=${X+me-3}
          width=${Ye}
          height="3"
        ></rect>
      </g>

      ${_s(s.lens,s.covered,i.camera)}
    </svg>
  `}function $s(s){let i=zi[s.size]??zi.Medium,e=s.date?i*.42:0,t=i*.8+e,r=Ve+Ye/2,n;s.place==="Top"?n=X+8:s.place==="Bottom"?n=X+me-12-t:n=X+(me-t)/2;let o=s.place==="Bottom"?X+12:X+me-9;return x`
    <text
      class="clock"
      x=${r}
      y=${n+i*.8}
      text-anchor="middle"
      style="font-size:${i}px;fill:${s.ink}"
    >${s.time}</text>
    ${s.date?x`<text
          class="date"
          x=${r}
          y=${n+t}
          text-anchor="middle"
          style="font-size:${i*.3}px;fill:${s.palette.muted}"
        >${s.date}</text>`:""}
    ${s.line?x`<text
          class="line"
          x=${r}
          y=${o}
          text-anchor="middle"
          style="fill:${s.palette.muted}"
        >${ks(s.line,44)}</text>`:""}
  `}function _s(s,i,e){if(!s)return"";let t=s==="round"?x`<circle cx="0" cy="0" r="3.4"></circle>`:x`<rect x="-3.2" y="-3.2" width="6.4" height="6.4" rx="0.8"></rect>`;return x`<g
    class="lens"
    data-covered=${String(i)}
    transform="translate(203 27)"
    role="button"
    tabindex="0"
    aria-label=${i?"Camera covered":"Camera"}
    @click=${e}
  >
    <circle class="hit" cx="0" cy="0" r="8" fill="transparent"></circle>
    ${t}
  </g>`}function vt(s,i,e,t,r=!1){return x`<g class="btn key" data-lit=${String(r)} transform="translate(${s} 12)"
    role="button" tabindex="0" aria-label=${e} @click=${t}>
    <rect class="hit" x="-13" y="-12" width="26" height="18" fill="transparent"></rect>
    <rect class="face" x="-11" y="-5" width="22" height="9" rx="4.5"></rect>
    <g class="glyph" transform="translate(0 -0.5)">${i}</g>
  </g>`}function ks(s,i){return s.length>i?`${s.slice(0,i-1)}\u2026`:s}var Ss={device_id:"Device",shell:"Shell",help:"Explain each setting"},ne={ring:"mdi:record-circle-outline",microphone:"mdi:microphone",playback:"mdi:speaker",screen:"mdi:monitor",poster:"mdi:image-multiple",camera:"mdi:camera",assistant:"mdi:account-voice",device:"mdi:cog-outline",diagnostics:"mdi:stethoscope",activity:"mdi:timeline-text-outline",follow:"mdi:backup-restore",close:"mdi:check"},Di={idle:"Idle",listening:"Listening",processing:"Thinking",responding:"Speaking",playing:"Playing",unavailable:"Unavailable",unknown:"Unknown"},As=2500;function Cs(s){let i=Math.log10(Math.max(s,1))/Math.log10(As);return Math.min(1,Math.max(0,i))}var P=class extends v{constructor(){super(...arguments);this.opened=null;this.picked=null;this.holding=!1;this.timer=0;this.offering=null;this.now=new Date;this.clock=0;this.again=()=>this.requestUpdate()}static getConfigElement(){return document.createElement("echolocal-satellite-card-editor")}static getStubConfig(e){return{device_id:C(e)[0]?.id??""}}setConfig(e){if(!e?.device_id)throw new Error("Choose an EchoLocal device");this.config={...e}}getCardSize(){return 6}connectedCallback(){super.connectedCallback(),window.addEventListener(se,this.again),this.clock=window.setInterval(()=>this.now=new Date,15e3)}disconnectedCallback(){window.removeEventListener(se,this.again),clearInterval(this.clock),super.disconnectedCallback()}doing(e){let t=Hi(this.hass,e.satellite);return t!=="idle"?t:(e.player?this.hass?.states?.[e.player]?.state:void 0)==="playing"?"playing":t}shellFor(e){if(Ae(e))return"charcoal";let t=this.config?.shell;if(t&&t!=="auto")return t;let r=e.by.get("hardware_color")?.[0]?.entity_id,n=r?this.hass.states[r]?.state:void 0;return n==="black"||n==="white"?n:"grey"}lux(e){let t=e.by.get("lux")?.[0]?.entity_id,r=t?Number(this.hass.states[t]?.state):NaN;return Number.isNaN(r)?null:{value:r,lit:Cs(r)}}render(){if(!this.hass||!this.config)return p;let e=K(this.hass,this.config.device_id);if(!e)return a`<ha-card><div class="missing">Device not found</div></ha-card>`;let t=this.doing(e);return a`
      <ha-card>
        <div class="frame" data-shape=${Ae(e)?"show":"dot"}>
          <div class="art" data-shell=${this.shellFor(e)} data-activity=${t}>
            ${Ae(e)?this.show(e,t):Gt({segments:this.segments(e),glow:this.glow(e),muted:Ge(this.hass,e.mute),holding:this.holding,picked:this.picked,divisible:[...e.segments,...this.switchedOff(e)].some(Boolean),lux:this.lux(e)},{ring:()=>this.open({kind:"ring",slot:0}),segment:r=>this.tapped(e,r),action:r=>this.pressed(e,r),mute:()=>this.toggle("switch",e.mute),volume:r=>this.volume(e,r)})}
          </div>

          <div class="side">${this.side(e)}</div>

          ${this.offering!==null?this.offer(e,this.offering):this.picked===null?this.foot(e,t):this.palette(e)}
        </div>
      </ha-card>

      ${this.popup(e)}
    `}show(e,t){let r=e.by.has("camera");return Ii({lens:Ei(e.board),screen:this.screen(e,t),muted:Ge(this.hass,e.mute),covered:Ge(this.hass,this.entity(e,"camera_covered"))},{screen:()=>this.open({kind:"screen",slot:0}),camera:()=>r?this.open({kind:"camera",slot:0}):void 0,mute:()=>this.toggle("switch",e.mute),volume:n=>this.volume(e,n)})}entity(e,t){return e.by.get(t)?.[0]?.entity_id}value(e,t){let r=this.entity(e,t);return r?this.hass.states[r]?.state:void 0}screen(e,t){let r=bt[this.value(e,"theme")??""]??bt[Oi],n=Number(this.value(e,"screen_brightness")??this.value(e,"backlight")),o=this.hass.config?.time_zone,d=new Intl.DateTimeFormat(void 0,{hour:"numeric",minute:"2-digit",hour12:this.value(e,"clock_format")==="12 hour",timeZone:o}).formatToParts(this.now).filter(g=>g.type==="hour"||g.type==="minute"||g.type==="literal").map(g=>g.value).join("").trim(),h=this.value(e,"clock_date")==="on"?new Intl.DateTimeFormat(void 0,{weekday:"short",month:"short",day:"numeric",timeZone:o}).format(this.now):null;return{palette:r,ink:Ni[this.value(e,"clock_color")??""]??r.text,lit:Number.isNaN(n)?1:.15+.85*Math.min(1,Math.max(0,n/100)),time:d,date:h,size:this.value(e,"clock_size")??"",place:this.value(e,"clock_position")??"",line:this.playing(e,t)}}playing(e,t){if(t!=="idle"&&t!=="playing")return Di[t]??t;let r=e.player?this.hass.states[e.player]:void 0,n=r?.attributes.media_title??this.value(e,"sendspin_title"),o=r?.attributes.media_artist??this.value(e,"sendspin_artist");return t!=="playing"||!n?"":o?`${n} \xB7 ${o}`:String(n)}foot(e,t){return a`<div class="foot">
      <div class="label">
        <div class="name">${S(e.device)}</div>
        <div class="status">${Di[t]??t}</div>
      </div>
      <div class="tail">
        ${this.square(ne.activity,"Activity",()=>this.open({kind:"activity",slot:0}))}
        ${this.square(ne.device,"Settings",()=>this.open({kind:"device",slot:0}))}
        ${this.square(ne.diagnostics,"Diagnostics",()=>this.open({kind:"diagnostics",slot:0}))}
      </div>
    </div>`}tapped(e,t){if(e.segments[t]){this.picked=this.picked===t?null:t;return}if(this.switchedOff(e)[t]){this.offering=t;return}this.open({kind:"ring",slot:0})}switchedOff(e){return Pi(this.hass,e)}offer(e,t){let r=this.switchedOff(e),n=async o=>{for(let l of o)l&&await Ri(this.hass,l);this.offering=null,this.picked=t};return a`<div class="foot">
      <div class="label">
        <div class="name">Segment ${t+1} disabled</div>
      </div>
      <div class="tail">
        <button class="plain" @click=${()=>n([r[t]])}>Enable</button>
        <button class="plain" @click=${()=>n(r)}>Enable all</button>
        <button class="plain quiet" @click=${()=>this.offering=null}>Cancel</button>
      </div>
    </div>`}palette(e){let t=e.segments[this.picked];return a`<div class="foot palette">
      <div class="top">
        <div class="name">Segment ${this.picked+1}</div>
        <div class="tail">
          ${this.square(ne.follow,"Follow the ring",()=>{this.hass.callService("light","turn_off",{entity_id:t}),this.picked=null})}
          ${this.square(ne.close,"Done",()=>this.picked=null)}
        </div>
      </div>
      <div class="swatches">
        ${Ue.map(([r,n])=>a`<button
            class="swatch"
            title=${r}
            aria-label=${r}
            style=${`background:rgb(${n.join(",")})`}
            @click=${()=>this.hass.callService("light","turn_on",{entity_id:t,rgb_color:n})}
          ></button>`)}
      </div>
    </div>`}segments(e){let t=Ce(this.hass,e.ring);return Array.from({length:_e},(r,n)=>{let o=Ce(this.hass,e.segments[n])??t;return{fill:o?`rgb(${o.rgb.join(",")})`:"var(--el-ring-off)",opacity:o?.25+.75*o.level:1}})}glow(e){return Ce(this.hass,e.ring)||e.segments.some(r=>Ce(this.hass,r))?.55:0}side(e){let t=$i(e),r=t.filter(n=>n.kind==="assistant").length>1;return t.map(({kind:n,slot:o})=>this.square(ne[n],this.titled(n,o),()=>this.open({kind:n,slot:o}),r&&n==="assistant"?o:null))}titled(e,t){let r={ring:"Ring",microphone:"Microphone",playback:"Playback",screen:"Screen",poster:"Posters",camera:"Camera",assistant:"Assistant",device:"Settings",diagnostics:"Diagnostics",activity:"Activity"}[e];return t?`${r} ${t}`:r}square(e,t,r,n=null){return a`<button class="sq" title=${t} aria-label=${t} @click=${r}>
      <ha-icon .icon=${e}></ha-icon>
      ${n?a`<span class="badge">${n}</span>`:p}
    </button>`}popup(e){if(!this.opened)return p;let{kind:t,slot:r}=this.opened,n,o=[];return t==="device"?n=ki(e):t==="diagnostics"?{widgets:o,sections:n}=Si(e):{widgets:o,sections:n}=_i(t,e,r),a`<echolocal-dialog
      .hass=${this.hass}
      .heading=${this.titled(t,r)}
      .subtitle=${S(e.device)}
      .icon=${ne[t]}
      .sections=${n}
      .widgets=${o}
      .device=${e.device.name??""}
      .deviceId=${e.device.id}
      .help=${this.config.help!==!1}
      .about=${ri(t)}
      @closed=${()=>this.opened=null}
    ></echolocal-dialog>`}open(e){this.opened=e}pressed(e,t){if(t==="down"){this.holding=!1,this.timer=window.setTimeout(()=>this.holding=!0,Kt);return}clearTimeout(this.timer);let r=this.holding;if(this.holding=!1,t==="cancel")return;let n=Ti(e),o=n[r&&n.length>1?1:0];o?this.hass.callService("button","press",{entity_id:o}):this.moreInfo(e.satellite)}toggle(e,t){t&&this.hass.callService(e,"toggle",{entity_id:t})}volume(e,t){e.player&&this.hass.callService("media_player",t>0?"volume_up":"volume_down",{entity_id:e.player})}moreInfo(e){e&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))}};P.styles=b(Vt),c([u({attribute:!1})],P.prototype,"hass",2),c([m()],P.prototype,"config",2),c([m()],P.prototype,"opened",2),c([m()],P.prototype,"picked",2),c([m()],P.prototype,"holding",2),c([m()],P.prototype,"offering",2),c([m()],P.prototype,"now",2),P=c([y("echolocal-satellite-card")],P);var ge=class extends v{setConfig(i){this.config={...i}}render(){if(!this.hass||!this.config)return p;let i=K(this.hass,this.config.device_id),e=[{name:"device_id",required:!0,selector:{select:{mode:"dropdown",options:C(this.hass).map(t=>({value:t.id,label:S(t)}))}}},{name:"shell",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Auto (from device)"},{value:"black",label:"Black"},{value:"white",label:"White"},{value:"grey",label:"Grey"}]}}},{name:"help",selector:{boolean:{}}}].filter(t=>t.name!=="shell"||!i||!Ae(i));return a`<ha-form
      .hass=${this.hass}
      .data=${{help:!0,shell:"auto",...this.config}}
      .schema=${e}
      .computeLabel=${t=>Ss[t.name]??t.name}
      @value-changed=${t=>this.emit(t.detail.value)}
    ></ha-form>`}emit(i){this.config={...this.config,...i},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}};c([u({attribute:!1})],ge.prototype,"hass",2),c([m()],ge.prototype,"config",2),ge=c([y("echolocal-satellite-card-editor")],ge);var yt=[];function I(s){yt.push(s),yt.sort((i,e)=>i.order-e.order||i.title.localeCompare(e.title))}function wt(s){return yt.filter(i=>s||!i.admin)}function Ui(s,i){let e=xt(s),t=wt(i);return t.find(r=>r.path===e)??t[0]}function Fi(s,i){let e=i?`${s}/${i}`:s;location.pathname!==e&&history.pushState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}function $t(s,i){if(i!==void 0)return xt(i);let e=location.pathname;return xt(e.startsWith(s)?e.slice(s.length):"")}function xt(s){return s.replace(/^\/+|\/+$/g,"")}var ji=`:host{display:block;height:100%;overflow:auto;background:var(--primary-background-color);color:var(--primary-text-color)}header{position:sticky;top:0;z-index:2;background:var(--primary-background-color);border-bottom:1px solid color-mix(in srgb,var(--primary-text-color) 10%,transparent)}.bar{max-width:1280px;margin:0 auto;padding:0 16px;display:flex;gap:4px;overflow-x:auto;scrollbar-width:none}.bar::-webkit-scrollbar{display:none}button{display:flex;align-items:center;gap:7px;flex:0 0 auto;padding:14px 14px 12px;border:none;border-bottom:2px solid transparent;background:none;color:var(--secondary-text-color);font:inherit;font-size:.88rem;cursor:pointer}button:hover{color:var(--primary-text-color)}button[data-here=true]{color:var(--primary-color);border-bottom-color:var(--primary-color)}button ha-icon{--mdc-icon-size: 19px;display:flex}.page{max-width:1280px;margin:0 auto;padding:20px 16px 48px;box-sizing:border-box}@media(max-width:600px){button span{display:none}button{padding:14px 16px 12px}}
`;var _t="";async function Le(s){try{return await s.callWS({type:"config/label_registry/list"})??[]}catch{return[]}}function Xe(s,i){let e=new Map,t=[];for(let n of s){let o=n.labels??[];if(!o.length){t.push(n);continue}for(let l of o){let d=i.find(g=>g.label_id===l),h=e.get(l);h?h.devices.push(n):e.set(l,{id:l,name:d?.name??l,icon:d?.icon,devices:[n]})}}let r=[...e.values()].sort((n,o)=>n.name.localeCompare(o.name));return t.length&&r.push({id:_t,name:"Ungrouped",devices:t}),r}async function Wi(s,i){try{return await s.callWS({type:"config/label_registry/create",name:i})}catch{return null}}async function Bi(s,i,e){await s.callWS({type:"config/label_registry/update",label_id:i,name:e})}async function qi(s,i){await s.callWS({type:"config/label_registry/delete",label_id:i})}async function Ki(s,i,e){await s.callWS({type:"config/device_registry/update",device_id:i,labels:[...new Set(e)]})}async function Gi(s,i,e,t){let r=0,n=0,o=0;return await Promise.all(i.map(async l=>{let d=Vi(s,l,e);if(!d){o+=1;return}try{await t(d),r+=1}catch{n+=1}})),{done:r,failed:n,missing:o}}function Ze(s,i,e){let t=i.map(n=>Vi(s,n,e)).filter(n=>!!n),r=[...new Set(t.map(n=>s.states[n]?.state).filter(Boolean))];return{value:r.length===1?r[0]:null,mixed:r.length>1,entities:t}}function Vi(s,i,e){return K(s,i.id)?.by.get(e)?.[0]?.entity_id}var Yi=`:host{display:block;margin-bottom:10px}.bar{display:flex;align-items:center;gap:12px;padding:8px 4px 8px 2px;border-bottom:1px solid color-mix(in srgb,var(--primary-text-color) 10%,transparent)}.name{font-size:1.05rem;color:var(--primary-text-color)}.count{font-size:.78rem;color:var(--secondary-text-color)}.spacer{flex:1}button{display:flex;align-items:center;gap:6px;padding:5px 11px;border:1px solid color-mix(in srgb,var(--primary-text-color) 16%,transparent);border-radius:999px;background:none;color:var(--secondary-text-color);font:inherit;font-size:.8rem;cursor:pointer}button:hover{color:var(--primary-text-color);border-color:color-mix(in srgb,var(--primary-text-color) 34%,transparent)}button[data-on=true]{color:var(--primary-color);border-color:color-mix(in srgb,var(--primary-color) 50%,transparent);background:color-mix(in srgb,var(--primary-color) 12%,transparent)}button ha-icon{--mdc-icon-size: 16px;display:flex}.mixed{font-size:.7rem;opacity:.75}
`;var Li="mic_mute",Xi="ring",Zi="speaker",Z=class extends v{constructor(){super(...arguments);this.said=""}render(){if(!this.hass||!this.group)return p;let e=this.group.devices,t=Ze(this.hass,e,Li),r=Ze(this.hass,e,Xi);return a`<div class="bar">
      ${this.group.icon?a`<ha-icon .icon=${this.group.icon}></ha-icon>`:p}
      <div class="name">${this.group.name}</div>
      <div class="count">${e.length} ${e.length===1?"device":"devices"}</div>
      <div class="spacer"></div>
      ${this.said?a`<div class="short">${this.said}</div>`:p}

      ${t.entities.length?this.toggle("mdi:microphone-off","Mute all",t,()=>this.write(Li,"switch",t.value==="on"?"turn_off":"turn_on")):p}
      ${r.entities.length?this.toggle("mdi:lightbulb-outline","Ring",r,()=>this.write(Xi,"light",r.value==="on"?"turn_off":"turn_on")):p}
      ${this.has(Zi)?a`<button title="Stop whatever is playing" @click=${()=>this.write(Zi,"media_player","media_stop")}>
            <ha-icon icon="mdi:stop"></ha-icon>Stop
          </button>`:p}
    </div>`}toggle(e,t,r,n){return a`<button data-on=${String(r.value==="on")} @click=${n}>
      <ha-icon .icon=${e}></ha-icon>${t}
      ${r.mixed?a`<span class="mixed">mixed</span>`:p}
    </button>`}has(e){return Ze(this.hass,this.group.devices,e).entities.length>0}async write(e,t,r){let{done:n,failed:o,missing:l}=await Gi(this.hass,this.group.devices,e,h=>this.hass.callService(t,r,{entity_id:h})),d=o+l;this.said=d?`${n} of ${n+d}`:"",this.said&&setTimeout(()=>this.said="",4e3)}};Z.styles=b(Yi),c([u({attribute:!1})],Z.prototype,"hass",2),c([u({attribute:!1})],Z.prototype,"group",2),c([m()],Z.prototype,"said",2),Z=c([y("echolocal-groupbar")],Z);var Ji=`:host{display:block}.group{margin-bottom:26px}.view{display:flex;justify-content:flex-end;margin-bottom:14px}.pair{display:flex;border:1px solid color-mix(in srgb,var(--primary-text-color) 16%,transparent);border-radius:999px;overflow:hidden}.pair button{display:flex;align-items:center;gap:6px;padding:5px 13px;border:none;background:none;color:var(--secondary-text-color);font:inherit;font-size:.8rem;cursor:pointer}.pair button:hover{color:var(--primary-text-color)}.pair button[data-on=true]{color:var(--primary-color);background:color-mix(in srgb,var(--primary-color) 14%,transparent)}.pair button ha-icon{--mdc-icon-size: 16px;display:flex}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:16px;align-items:start}.empty{color:var(--secondary-text-color);max-width:46ch;line-height:1.5}
`;I({path:"",title:"Home",icon:"mdi:view-grid-outline",element:"echolocal-home",order:0});var Qi="echolocal:home:grouped",D=class extends v{constructor(){super(...arguments);this.narrow=!1;this.known=[];this.asked=!1;this.grouped=localStorage.getItem(Qi)!=="no";this.cards=new Map}updated(){this.asked||!this.hass||(this.asked=!0,this.load())}render(){if(!this.hass)return p;let e=C(this.hass);if(!e.length)return a`<div class="empty">
        No EchoLocal devices yet. One appears here once Home Assistant has adopted it over the ESPHome
        integration.
      </div>`;let t=Xe(e,this.known),r=t.some(o=>o.id!==_t),n=this.grouped&&r?t:[{id:"all",name:"All devices",devices:e}];return a`
      ${r?a`<div class="view">
            <div class="pair">
              ${this.button(!0,"mdi:group","Grouped")}${this.button(!1,"mdi:view-grid-outline","All")}
            </div>
          </div>`:p}
      ${n.map(o=>this.group(o))}
    `}button(e,t,r){return a`<button
      data-on=${String(this.grouped===e)}
      @click=${()=>{this.grouped=e,localStorage.setItem(Qi,e?"yes":"no")}}
    >
      <ha-icon .icon=${t}></ha-icon>${r}
    </button>`}group(e){return a`<div class="group">
      <echolocal-groupbar .hass=${this.hass} .group=${e}></echolocal-groupbar>
      <div class="grid">${e.devices.map(t=>this.card(e.id,t.id))}</div>
    </div>`}card(e,t){let r=`${e}/${t}`,n=this.cards.get(r);return n||(n=document.createElement("echolocal-satellite-card"),n.setConfig({device_id:t}),this.cards.set(r,n)),n.hass=this.hass,n}async load(){this.known=await Le(this.hass)}};D.styles=b(Ji),c([u({attribute:!1})],D.prototype,"hass",2),c([u({type:Boolean})],D.prototype,"narrow",2),c([m()],D.prototype,"known",2),c([m()],D.prototype,"asked",2),c([m()],D.prototype,"grouped",2),D=c([y("echolocal-home")],D);var er=`:host{display:block}.make{display:flex;gap:8px;margin-bottom:20px}ha-input.new{flex:1;max-width:280px}table{width:100%;border-collapse:collapse;font-size:.9rem}th{padding:8px 10px;text-align:center;font-weight:600;font-size:.72rem;text-transform:uppercase;letter-spacing:.07em;color:var(--secondary-text-color);white-space:nowrap}th.who{text-align:left}th .label{display:flex;align-items:center;justify-content:center;gap:4px}th ha-input{--ha-input-text-align: center}th ha-icon-button{--mdc-icon-size: 15px;color:var(--secondary-text-color)}th ha-icon-button:hover{color:var(--error-color, #db4437)}td{padding:10px;border-top:1px solid color-mix(in srgb,var(--primary-text-color) 10%,transparent);text-align:center}td.who{text-align:left;color:var(--primary-text-color)}.none{color:var(--secondary-text-color);max-width:52ch;line-height:1.5}
`;I({path:"groups",title:"Groups",icon:"mdi:group",element:"echolocal-groups",order:30,admin:!0});var U=class extends v{constructor(){super(...arguments);this.known=[];this.asked=!1;this.naming="";this.busy=!1}connectedCallback(){super.connectedCallback(),this.hass?.connection?.subscribeEvents(()=>this.load(),"label_registry_updated").then(e=>this.stop=e).catch(()=>{})}disconnectedCallback(){super.disconnectedCallback(),this.stop?.()}updated(){this.asked||!this.hass||(this.asked=!0,this.load())}render(){if(!this.hass)return p;let e=C(this.hass),t=this.known;return a`
      <div class="make">
        <ha-input
          class="new"
          placeholder="New group"
          .value=${this.naming}
          @input=${r=>this.naming=r.target.value}
          @keydown=${r=>r.key==="Enter"&&this.make()}
        ></ha-input>
        <ha-button
          .disabled=${!this.naming.trim()||this.busy}
          .loading=${this.busy}
          @click=${this.make}
        >
          Add
        </ha-button>
      </div>

      ${e.length?a`<table>
            <thead>
              <tr>
                <th class="who">Device</th>
                ${t.map(r=>this.head(r))}
              </tr>
            </thead>
            <tbody>
              ${e.map(r=>this.row(r,t))}
            </tbody>
          </table>`:a`<div class="none">
            No EchoLocal devices yet, so there is nothing to group.
          </div>`}
    `}head(e){let t=Xe(C(this.hass),this.known).find(r=>r.id===e.label_id)?.devices.length;return a`<th>
      <div class="label">
        <ha-input
          .value=${e.name}
          style=${`width:${Math.max(8,e.name.length+2)}ch`}
          @change=${r=>this.rename(e,r.target.value)}
        ></ha-input>
        <ha-icon-button
          .label=${t?`Delete ${e.name}, ${t} still in it`:`Delete ${e.name}`}
          @click=${()=>this.discard(e)}
        >
          <ha-icon icon="mdi:close"></ha-icon>
        </ha-icon-button>
      </div>
    </th>`}row(e,t){let r=e.labels??[];return a`<tr>
      <td class="who">${S(e)}</td>
      ${t.map(n=>a`<td>
          <ha-checkbox
            aria-label="${S(e)} in ${n.name}"
            .checked=${r.includes(n.label_id)}
            @change=${o=>this.set(e,n.label_id,o.target.checked)}
          ></ha-checkbox>
        </td>`)}
    </tr>`}async make(){let e=this.naming.trim();if(!e||this.busy)return;this.busy=!0,this.naming="";let t=await Wi(this.hass,e);t&&(this.known=[...this.known,t].sort((r,n)=>r.name.localeCompare(n.name))),this.busy=!1,t||await this.load()}async rename(e,t){!t.trim()||t===e.name||(this.known=this.known.map(r=>r.label_id===e.label_id?{...r,name:t.trim()}:r),await Bi(this.hass,e.label_id,t.trim()))}async discard(e){this.known=this.known.filter(t=>t.label_id!==e.label_id),await qi(this.hass,e.label_id)}async set(e,t,r){let n=new Set(e.labels??[]);r?n.add(t):n.delete(t),await Ki(this.hass,e.id,[...n])}async load(){this.known=await Le(this.hass)}};U.styles=b(er),c([u({attribute:!1})],U.prototype,"hass",2),c([m()],U.prototype,"known",2),c([m()],U.prototype,"asked",2),c([m()],U.prototype,"naming",2),c([m()],U.prototype,"busy",2),U=c([y("echolocal-groups")],U);var tr=`:host{display:block}.filters{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px}.filters button{padding:5px 12px;border:1px solid color-mix(in srgb,var(--primary-text-color) 16%,transparent);border-radius:999px;background:none;color:var(--secondary-text-color);font:inherit;font-size:.8rem;cursor:pointer}.filters button[data-on=true]{color:var(--primary-color);border-color:color-mix(in srgb,var(--primary-color) 50%,transparent);background:color-mix(in srgb,var(--primary-color) 12%,transparent)}.turns{display:grid;gap:8px}.turn{display:grid;grid-template-columns:auto 9ch 1fr auto;gap:3px 12px;align-items:center;padding:11px 14px;border-radius:12px;background:color-mix(in srgb,var(--primary-text-color) 5%,transparent)}.right{display:flex;align-items:center;gap:10px;justify-content:flex-end}.when{font-size:.78rem;color:var(--secondary-text-color);font-variant-numeric:tabular-nums}.who{font-size:.88rem;color:var(--primary-text-color);overflow:hidden;text-overflow:ellipsis}.content{display:flex;flex-direction:column;gap:2px;min-width:0}.wake{font-size:.8rem;color:var(--primary-color);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.said,.said-back{font-size:.88rem;color:var(--secondary-text-color);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.said-back:before{content:"\\21b3  ";opacity:.6}.took{font-size:.8rem;color:var(--secondary-text-color);font-variant-numeric:tabular-nums}.took[data-bad=true]{color:var(--error-color, #db4437)}.bar{grid-column:2 / -1;display:flex;height:20px;margin-top:5px;border-radius:5px;overflow:hidden;background:color-mix(in srgb,var(--primary-text-color) 8%,transparent)}.slice{display:flex;align-items:center;justify-content:center;overflow:hidden;font-size:.68rem;font-variant-numeric:tabular-nums;color:var(--text-primary-color, #fff);white-space:nowrap}.slice[data-phase=listen_ms]{background:color-mix(in srgb,var(--info-color, #039be5) 55%,var(--primary-text-color))}.slice[data-phase=think_ms]{background:var(--secondary-text-color)}.slice[data-phase=speak_ms]{background:var(--success-color, #43a047)}.none{color:var(--secondary-text-color);max-width:56ch;line-height:1.5}.loading{display:flex;justify-content:center;padding:48px 0}.legend{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:14px;font-size:.72rem;color:var(--secondary-text-color)}.key{display:flex;align-items:center;gap:5px}.dot{width:9px;height:9px;border-radius:2px}
`;I({path:"activity",title:"Activity",icon:"mdi:timeline-text-outline",element:"echolocal-activity",order:20});var zs=14,F=class extends v{constructor(){super(...arguments);this.seen=[];this.only="";this.asked=!1;this.loading=!0}updated(){this.asked||!this.hass||(this.asked=!0,this.listen())}disconnectedCallback(){super.disconnectedCallback(),this.stop?.()}render(){if(!this.hass)return p;let e=this.names(),t=this.only?this.seen.filter(n=>n.turn.device===this.only):this.seen,r=Math.max(1,...t.map(n=>de(n.turn)));return a`
      ${this.seen.length>0&&Object.keys(e).length>1?a`<div class="filters">
            <button data-on=${String(!this.only)} @click=${()=>this.only=""}>Everything</button>
            ${[...new Set(this.seen.map(n=>n.turn.device))].map(n=>a`<button
                data-on=${String(this.only===n)}
                @click=${()=>this.only=n}
              >
                ${e[n]?.label??n}
              </button>`)}
          </div>`:p}

      ${t.length?a`<div class="legend">
              ${[["listen_ms","Listen"],["think_ms","Think"],["speak_ms","Reply"]].map(([n,o])=>a`<span class="key"
                  ><span class="dot slice" data-phase=${n}></span>${o}</span
                >`)}
            </div>
            <div class="turns">${t.map(n=>this.row(n,e,r))}</div>`:this.loading?a`<div class="loading"><ha-spinner size="large"></ha-spinner></div>`:a`<div class="none">No recent activity found.</div>`}
    `}row(e,t,r){let n=ce(e.turn),o=de(e.turn),l=e.turn.outcome!=="completed",d=t[e.turn.device],h=d?.label??"elsewhere";return a`<div class="turn">
      <div class="when">${Os(e.at)}</div>
      <div class="who">${h}</div>
      <div class="content">
        <div class="wake">${e.turn.wake_word}</div>
        ${e.turn.heard?a`<div class="said">${e.turn.heard}</div>`:p}
        ${e.turn.reply?a`<div class="said-back">${e.turn.reply}</div>`:p}
      </div>
      <div class="right">
        <div class="took" data-bad=${String(l)}>
          ${l?e.turn.outcome:`${(o/1e3).toFixed(1)}s`}
        </div>
        ${e.turn.audio_seconds?a`<echolocal-recording
              .hass=${this.hass}
              .device=${d?.node??""}
              .turn=${e.turn.id}
              .at=${e.at}
              .filename=${Es(e,h)}
            ></echolocal-recording>`:p}
      </div>
      ${n.length?a`<div class="bar">
            ${n.map(g=>a`<div
                class="slice"
                data-phase=${g.key}
                title=${`${g.label} ${g.ms} ms`}
                style=${`flex:0 0 ${g.ms/r*100}%`}
              >
                ${(g.ms/1e3).toFixed(1)}s
              </div>`)}
          </div>`:p}
    </div>`}names(){let e={};for(let t of C(this.hass))e[t.id]={label:S(t),node:t.name??""};return e}async listen(){let e=new Date(Date.now()-zs*864e5),t=C(this.hass).map(r=>r.id);if(!t.length){this.asked=!1;return}try{this.stop=await Fe(this.hass,e,t,r=>{this.loading=!1,r.length&&(this.seen=[...r,...this.seen].sort((n,o)=>o.at-n.at))})}catch{this.loading=!1}}};F.styles=b(tr),c([u({attribute:!1})],F.prototype,"hass",2),c([m()],F.prototype,"seen",2),c([m()],F.prototype,"only",2),c([m()],F.prototype,"asked",2),c([m()],F.prototype,"loading",2),F=c([y("echolocal-activity")],F);function Es(s,i){let e=new Date(s.at).toISOString().replace(/[:.]/g,"-").slice(0,19),t=r=>r.toLowerCase().replace(/[^a-z0-9]+/g,"-");return`${e}-${t(i)}-${t(s.turn.wake_word)}.wav`}function Os(s){return new Date(s).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}var ir=`:host{display:block}.scroll{overflow-x:auto}table{width:100%;border-collapse:collapse;font-size:.88rem}th{padding:8px 12px;text-align:right;white-space:nowrap;font-weight:600;font-size:.71rem;text-transform:uppercase;letter-spacing:.07em;color:var(--secondary-text-color);cursor:pointer;user-select:none}th:first-child{text-align:left}th:hover{color:var(--primary-text-color)}th[data-by=true]{color:var(--primary-color)}td{padding:11px 12px;text-align:right;white-space:nowrap;border-top:1px solid color-mix(in srgb,var(--primary-text-color) 10%,transparent);font-variant-numeric:tabular-nums;color:var(--secondary-text-color)}td.who{text-align:left;color:var(--primary-text-color)}td.who button{padding:0;border:none;background:none;color:inherit;font:inherit;cursor:pointer;text-align:left}td.who button:hover{color:var(--primary-color)}td[data-wrong=warn]{color:var(--warning-color, #ffa600)}td[data-wrong=bad]{color:var(--error-color, #db4437);font-weight:600}tr[data-off=true] td{opacity:.5}.none{color:var(--secondary-text-color)}
`;I({path:"health",title:"Health",icon:"mdi:heart-pulse",element:"echolocal-health",order:40});function kt(s){let i=Number(s.state);return s.attributes.unit_of_measurement==="\xB0F"?(i-32)*5/9:i}var St=[{title:"Version",name:"firmware",show:s=>String(s.attributes.installed_version??"\u2014"),sort:s=>String(s.attributes.installed_version??"")},{title:"Update",name:"firmware",show:s=>s.state==="on"?"waiting":s.state==="off"?"current":s.state,wrong:s=>s.state==="on"?"warn":void 0,sort:s=>s.state},{title:"Wifi",name:"wifi_signal",show:s=>`${Math.round(Number(s.state))} ${s.attributes.unit_of_measurement||"dBm"}`,wrong:s=>Number(s.state)<-80?"bad":Number(s.state)<-70?"warn":void 0},{title:"CPU",name:"cpu_temperature",show:s=>`${Math.round(Number(s.state))}${s.attributes.unit_of_measurement||"\xB0C"}`,wrong:s=>kt(s)>85?"bad":kt(s)>70?"warn":void 0,sort:kt},{title:"Load",name:"load_average",show:s=>Number(s.state).toFixed(2)},{title:"Memory",name:"memory_available",show:s=>`${Math.round(Number(s.state))} ${s.attributes.unit_of_measurement||"MB"}`,wrong:s=>Number(s.state)<40?"bad":Number(s.state)<80?"warn":void 0},{title:"Disk",name:"free_space",show:s=>`${Math.round(Number(s.state))} ${s.attributes.unit_of_measurement||"MB"}`,wrong:s=>Number(s.state)<50?"bad":Number(s.state)<150?"warn":void 0},{title:"Address",name:"ip_address",show:s=>s.state.split(", ")[0]??s.state}],J=class extends v{constructor(){super(...arguments);this.by="";this.down=!1}render(){if(!this.hass)return p;let e=C(this.hass);if(!e.length)return a`<div class="none">No EchoLocal devices yet.</div>`;let t=e.map(n=>this.read(n)),r=this.sort(t);return a`<div class="scroll">
      <table>
        <thead>
          <tr>
            ${this.head("Device")}${St.map(n=>this.head(n.title))}
          </tr>
        </thead>
        <tbody>
          ${r.map(n=>a`<tr data-off=${String(!n.up)}>
              <td class="who">
                <button @click=${()=>this.open(n.device)}>${n.name}</button>
              </td>
              ${St.map(o=>{let l=n.cells[o.title];return a`<td data-wrong=${l?.wrong??""}>${l?.text??"\u2014"}</td>`})}
            </tr>`)}
        </tbody>
      </table>
    </div>`}head(e){return a`<th
      data-by=${String(this.by===e)}
      @click=${()=>{this.down=this.by===e?!this.down:!1,this.by=e}}
    >
      ${e}
    </th>`}read(e){let t=K(this.hass,e.id),r={},n=!1;for(let o of St){let l=t?.by.get(o.name)?.[0]?.entity_id,d=l?this.hass.states[l]:void 0;if(!d||d.state==="unavailable"||d.state==="unknown")continue;n=!0;let h=Number(d.state),g=d.attributes.unit_of_measurement??"";r[o.title]={text:o.show?o.show(d):g?`${d.state} ${g}`:d.state,sort:o.sort?o.sort(d):Number.isFinite(h)&&d.state!==""?h:d.state,wrong:o.wrong?.(d)}}return{device:e,name:S(e),cells:r,up:n}}sort(e){if(!this.by)return e;let t=r=>this.by==="Device"?r.name:r.cells[this.by]?.sort??"";return[...e].sort((r,n)=>{let o=t(r),l=t(n),d=typeof o=="number"&&typeof l=="number"?o-l:String(o).localeCompare(String(l));return this.down?-d:d})}open(e){history.pushState(null,"",`/config/devices/device/${e.id}`),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}};J.styles=b(ir),c([u({attribute:!1})],J.prototype,"hass",2),c([m()],J.prototype,"by",2),c([m()],J.prototype,"down",2),J=c([y("echolocal-health")],J);var rr=`:host{display:block}.zone{display:flex;align-items:center;gap:12px;padding:16px;margin-bottom:16px;border:1px dashed color-mix(in srgb,var(--primary-text-color) 22%,transparent);border-radius:14px;background:color-mix(in srgb,var(--primary-text-color) 4%,transparent);cursor:pointer;transition:border-color .15s ease,background .15s ease}.zone[data-over=true]{border-color:var(--primary-color);background:color-mix(in srgb,var(--primary-color) 12%,transparent)}.zone ha-icon{--mdc-icon-size: 24px;color:var(--secondary-text-color);display:flex;flex:0 0 auto}.zone[data-over=true] ha-icon{color:var(--primary-color)}.lead{font-size:.95rem;color:var(--primary-text-color)}.sub{font-size:.78rem;color:var(--secondary-text-color)}.scroll{overflow-x:auto}table{width:100%;border-collapse:collapse;font-size:.85rem}th{padding:0 10px 6px;text-align:left;font-size:.68rem;font-weight:600;text-transform:uppercase;letter-spacing:.07em;color:var(--secondary-text-color);white-space:nowrap}td{padding:4px 10px;border-top:1px solid color-mix(in srgb,var(--primary-text-color) 8%,transparent);vertical-align:middle}tbody tr[data-used=true] td:first-child{box-shadow:inset 3px 0 0 var(--success-color, #43a047)}tbody tr[data-used=false] td:first-child{box-shadow:inset 3px 0 0 var(--info-color, #039be5)}tbody tr[data-bad=true] td:first-child{box-shadow:inset 3px 0 0 var(--error-color, #db4437)}tbody tr:hover td{background:color-mix(in srgb,var(--primary-text-color) 4%,transparent)}.say{width:22ch}.say ha-input{--ha-input-padding-top: 0;--ha-input-padding-bottom: 0}.say ha-input::part(wa-base){border-color:transparent;background:none;min-height:34px}.say ha-input:hover::part(wa-base){border-color:color-mix(in srgb,var(--primary-text-color) 22%,transparent)}.say ha-input:focus-within::part(wa-base){border-color:var(--primary-color)}.say ha-input::part(wa-input){font-size:.9rem;padding-inline:8px}.id{font-family:var(--ha-font-family-code, monospace);font-size:.78rem;color:var(--secondary-text-color);word-break:break-all}.facts{color:var(--secondary-text-color);font-size:.78rem;font-variant-numeric:tabular-nums;white-space:nowrap}.end{text-align:right}.acts{display:flex;gap:2px;justify-content:flex-end}.act{width:30px;height:30px;display:grid;place-items:center;padding:0;border:none;border-radius:50%;background:none;color:var(--secondary-text-color);cursor:pointer}.act:hover{background:color-mix(in srgb,var(--primary-color) 16%,transparent);color:var(--primary-color)}.act.bin:hover{background:color-mix(in srgb,var(--error-color, #db4437) 16%,transparent);color:var(--error-color, #db4437)}.act ha-icon{--mdc-icon-size: 18px;display:flex}tr.wrong td{border-top:none;padding-top:0;font-size:.76rem;color:var(--error-color, #db4437)}.none{padding:4px 0;font-size:.85rem;color:var(--secondary-text-color)}input[type=file]{display:none}
`;async function At(s){try{return(await s.callWS({type:"echolocal/wake_words/list"}))?.wake_words??[]}catch{return[]}}var R=class extends v{constructor(){super(...arguments);this.inUse=new Set;this.words=[];this.over=!1;this.busy=!1;this.said="";this.asked=!1;this.dropped=e=>{e.preventDefault(),this.over=!1,this.add(e.dataTransfer?.files??null)}}updated(){this.asked||!this.hass||(this.asked=!0,this.refresh())}render(){return a`
      <div
        class="zone"
        data-over=${String(this.over)}
        @click=${()=>this.shadowRoot?.querySelector("input[type=file]")?.click()}
        @dragover=${e=>{e.preventDefault(),this.over=!0}}
        @dragleave=${()=>this.over=!1}
        @drop=${this.dropped}
      >
        ${this.busy?a`<ha-spinner></ha-spinner>`:a`<ha-icon icon="mdi:tray-arrow-up"></ha-icon>`}
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

      ${this.words.length?a`<div class="scroll">
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
          </div>`:a`<div class="none">
            Nothing in custom_wake_words yet. Whatever the firmware ships with is unaffected.
          </div>`}
    `}row(e){let t=[e.type||"no type",e.size?`${Math.round(e.size/1024)} KB`:"no model",...e.trained_languages.length?[e.trained_languages.join(", ")]:[]],r=this.inUse.has(e.wake_word);return a`<tr data-bad=${String(e.problems.length>0)} data-used=${String(r)}>
      <td class="say">
        <ha-input
          appearance="outlined"
          .value=${e.wake_word}
          placeholder="what wakes it"
          @change=${n=>this.rename(e,n.target.value)}
        ></ha-input>
      </td>
      <td class="id">${e.id}</td>
      <td class="facts">${t.join(" \xB7 ")}</td>
      <td class="end">
        <div class="acts">
          ${e.model_url?a`<a class="act" href=${e.model_url} download title=${`${e.id}.tflite`}>
                <ha-icon icon="mdi:waveform"></ha-icon>
              </a>`:p}
          ${e.config_url?a`<a class="act" href=${e.config_url} download title=${`${e.id}.json`}>
                <ha-icon icon="mdi:code-json"></ha-icon>
              </a>`:p}
          <button class="act bin" title=${`Remove ${e.id}`} @click=${()=>this.discard(e)}>
            <ha-icon icon="mdi:trash-can-outline"></ha-icon>
          </button>
        </div>
      </td>
    </tr>
    ${e.problems.length?a`<tr class="wrong" data-bad="true">
          <td colspan="4">${e.problems.join(". ")}.</td>
        </tr>`:p}`}async add(e){let t=[...e??[]].filter(r=>r.name.endsWith(".tflite"));if(!t.length){this.said="A wake model is a .tflite file.";return}this.busy=!0,this.said="";for(let r of t){let n=new FormData;n.append("file",r);try{let o=await fetch("/api/echolocal/wake_words",{method:"POST",body:n,headers:this.credentials()});if(!o.ok){let l=await o.json().catch(()=>({}));this.said=l.error??`Home Assistant refused ${r.name}.`;break}}catch(o){this.said=`That did not reach Home Assistant: ${o}`;break}}this.busy=!1,await this.refresh()}async rename(e,t){t!==e.wake_word&&(await this.hass.callWS({type:"echolocal/wake_words/update",wake_word_id:e.id,wake_word:t}),await this.refresh())}async discard(e){await this.hass.callWS({type:"echolocal/wake_words/delete",wake_word_id:e.id}),await this.refresh()}async refresh(){this.words=await At(this.hass)}credentials(){let e=this.hass.auth?.data?.access_token;return e?{authorization:`Bearer ${e}`}:{}}};R.styles=b(rr),c([u({attribute:!1})],R.prototype,"hass",2),c([u({attribute:!1})],R.prototype,"inUse",2),c([m()],R.prototype,"words",2),c([m()],R.prototype,"over",2),c([m()],R.prototype,"busy",2),c([m()],R.prototype,"said",2),c([m()],R.prototype,"asked",2),R=c([y("echolocal-wake-words")],R);var sr=`:host{display:block}h2.first{margin-top:0}h2{margin:26px 0 10px;font-size:.72rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--secondary-text-color)}.listening{display:grid;gap:8px}.who{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;padding:10px 14px;border-radius:12px;background:color-mix(in srgb,var(--primary-text-color) 5%,transparent);font-size:.9rem}.who .name{color:var(--primary-text-color);min-width:8ch}.word{padding:2px 9px;border-radius:999px;font-size:.78rem;background:color-mix(in srgb,var(--primary-color) 16%,transparent);color:var(--primary-color)}.word[data-gone=true]{background:color-mix(in srgb,var(--error-color, #db4437) 16%,transparent);color:var(--error-color, #db4437)}.spare{font-size:.85rem;color:var(--secondary-text-color);line-height:1.5}.heading{display:flex;align-items:baseline;gap:14px;flex-wrap:wrap}.legend{display:flex;gap:14px;flex-wrap:wrap;margin-left:auto;font-size:.72rem;color:var(--secondary-text-color)}.key{display:flex;align-items:center;gap:5px}.dot{width:9px;height:9px;border-radius:2px;background:var(--info-color, #039be5)}.dot[data-used=true]{background:var(--success-color, #43a047)}
`;I({path:"wake-words",title:"Wake words",icon:"mdi:waveform",element:"echolocal-words",order:10,admin:!0});var Q=class extends v{constructor(){super(...arguments);this.words=[];this.asked=!1;this.again=()=>this.requestUpdate()}connectedCallback(){super.connectedCallback(),window.addEventListener(se,this.again)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(se,this.again)}updated(){this.asked||!this.hass||(this.asked=!0,this.load())}render(){if(!this.hass)return p;let e=this.chosen(),t=new Set(this.words.filter(n=>n.problems.length&&n.wake_word).map(n=>n.wake_word)),r=new Set(e.flatMap(n=>n.words));return a`
      <h2 class="first">Listening for</h2>
      ${e.length?a`<div class="listening">
            ${e.map(n=>a`<div class="who">
                <span class="name">${n.name}</span>
                ${n.words.map(o=>a`<span
                      class="word"
                      data-gone=${String(t.has(o))}
                      title=${t.has(o)?"Its library entry is broken, so it is not offered":""}
                      >${o}</span
                    >`)}
              </div>`)}
          </div>`:a`<div class="spare">No devices have picked a wake word yet.</div>`}

      <div class="heading">
        <h2>The library</h2>
        <div class="legend">
          <span class="key"><span class="dot" data-used="true"></span>Used</span>
          <span class="key"><span class="dot" data-used="false"></span>Unused</span>
        </div>
      </div>
      <echolocal-wake-words .hass=${this.hass} .inUse=${r}></echolocal-wake-words>
    `}chosen(){return C(this.hass).map(e=>{let r=(K(this.hass,e.id)?.by.get("wake_word")??[]).map(n=>this.hass.states[n.entity_id]?.state).filter(n=>n!=="no_wake_word").filter(n=>!!n&&n!=="unknown"&&n!=="None");return{name:S(e),words:r}}).filter(e=>e.words.length)}async load(){this.words=await At(this.hass)}};Q.styles=b(sr),c([u({attribute:!1})],Q.prototype,"hass",2),c([m()],Q.prototype,"words",2),c([m()],Q.prototype,"asked",2),Q=c([y("echolocal-words")],Q);var j=class extends v{constructor(){super(...arguments);this.narrow=!1;this.at="";this.made=new Map;this.moved=()=>{this.at=$t(this.base(),void 0),this.requestUpdate()}}connectedCallback(){super.connectedCallback(),window.addEventListener("location-changed",this.moved),window.addEventListener("popstate",this.moved)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("location-changed",this.moved),window.removeEventListener("popstate",this.moved)}render(){if(!this.hass)return p;let e=!!this.hass.user?.is_admin,t=wt(e),r=Ui(this.where(),e);return a`
      <header>
        <div class="bar">${t.map(n=>this.button(n,n===r))}</div>
      </header>
      <div class="page">${r?this.body(r):p}</div>
    `}button(e,t){return a`<button
      data-here=${String(t)}
      @click=${()=>{this.at=e.path,Fi(this.base(),e.path)}}
    >
      <ha-icon .icon=${e.icon}></ha-icon><span>${e.title}</span>
    </button>`}body(e){let t=this.made.get(e.path);return t||(t=document.createElement(e.element),this.made.set(e.path,t)),t.hass=this.hass,t.narrow=this.narrow,t}where(){return this.route?$t(this.base(),this.route.path):this.at}base(){return this.route?.prefix??"/echolocal"}};j.styles=b(ji),c([u({attribute:!1})],j.prototype,"hass",2),c([u({type:Boolean})],j.prototype,"narrow",2),c([u({attribute:!1})],j.prototype,"route",2),c([u({attribute:!1})],j.prototype,"panel",2),c([m()],j.prototype,"at",2),j=c([y("echolocal-panel")],j);window.customCards=window.customCards??[];window.customCards.some(s=>s.type==="echolocal-satellite-card")||window.customCards.push({type:"echolocal-satellite-card",name:"EchoLocal Satellite",description:"An EchoLocal satellite, drawn as itself, with its controls live.",preview:!0,documentationURL:"https://github.com/ygelfand/echolocal-hacs"});
