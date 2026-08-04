var Kr=Object.defineProperty;var Gr=Object.getOwnPropertyDescriptor;var d=(s,r,t,e)=>{for(var i=e>1?void 0:e?Gr(r,t):r,n=s.length-1,o;n>=0;n--)(o=s[n])&&(i=(e?o(r,t,i):o(i))||i);return e&&i&&Kr(r,t,i),i};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var At=globalThis,Tt=At.ShadowRoot&&(At.ShadyCSS===void 0||At.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,we=Symbol(),xe=new WeakMap,Ct=class{constructor(r,t,e){if(this._$cssResult$=!0,e!==we)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=r,this.t=t}get styleSheet(){let r=this.o,t=this.t;if(Tt&&r===void 0){let e=t!==void 0&&t.length===1;e&&(r=xe.get(t)),r===void 0&&((this.o=r=new CSSStyleSheet).replaceSync(this.cssText),e&&xe.set(t,r))}return r}toString(){return this.cssText}},y=s=>new Ct(typeof s=="string"?s:s+"",void 0,we);var $e=(s,r)=>{if(Tt)s.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of r){let e=document.createElement("style"),i=At.litNonce;i!==void 0&&e.setAttribute("nonce",i),e.textContent=t.cssText,s.appendChild(e)}},Gt=Tt?s=>s:s=>s instanceof CSSStyleSheet?(r=>{let t="";for(let e of r.cssRules)t+=e.cssText;return y(t)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var{is:Yr,defineProperty:Vr,getOwnPropertyDescriptor:Lr,getOwnPropertyNames:Xr,getOwnPropertySymbols:Zr,getPrototypeOf:Jr}=Object,Mt=globalThis,ke=Mt.trustedTypes,Qr=ke?ke.emptyScript:"",ti=Mt.reactiveElementPolyfillSupport,gt=(s,r)=>s,ft={toAttribute(s,r){switch(r){case Boolean:s=s?Qr:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,r){let t=s;switch(r){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},Ht=(s,r)=>!Yr(s,r),_e={attribute:!0,type:String,converter:ft,reflect:!1,useDefault:!1,hasChanged:Ht};Symbol.metadata??=Symbol("metadata"),Mt.litPropertyMetadata??=new WeakMap;var B=class extends HTMLElement{static addInitializer(r){this._$Ei(),(this.l??=[]).push(r)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(r,t=_e){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(r)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(r,t),!t.noAccessor){let e=Symbol(),i=this.getPropertyDescriptor(r,e,t);i!==void 0&&Vr(this.prototype,r,i)}}static getPropertyDescriptor(r,t,e){let{get:i,set:n}=Lr(this.prototype,r)??{get(){return this[t]},set(o){this[t]=o}};return{get:i,set(o){let a=i?.call(this);n?.call(this,o),this.requestUpdate(r,a,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(r){return this.elementProperties.get(r)??_e}static _$Ei(){if(this.hasOwnProperty(gt("elementProperties")))return;let r=Jr(this);r.finalize(),r.l!==void 0&&(this.l=[...r.l]),this.elementProperties=new Map(r.elementProperties)}static finalize(){if(this.hasOwnProperty(gt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(gt("properties"))){let t=this.properties,e=[...Xr(t),...Zr(t)];for(let i of e)this.createProperty(i,t[i])}let r=this[Symbol.metadata];if(r!==null){let t=litPropertyMetadata.get(r);if(t!==void 0)for(let[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(let[t,e]of this.elementProperties){let i=this._$Eu(t,e);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(r){let t=[];if(Array.isArray(r)){let e=new Set(r.flat(1/0).reverse());for(let i of e)t.unshift(Gt(i))}else r!==void 0&&t.push(Gt(r));return t}static _$Eu(r,t){let e=t.attribute;return e===!1?void 0:typeof e=="string"?e:typeof r=="string"?r.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(r=>r(this))}addController(r){(this._$EO??=new Set).add(r),this.renderRoot!==void 0&&this.isConnected&&r.hostConnected?.()}removeController(r){this._$EO?.delete(r)}_$E_(){let r=new Map,t=this.constructor.elementProperties;for(let e of t.keys())this.hasOwnProperty(e)&&(r.set(e,this[e]),delete this[e]);r.size>0&&(this._$Ep=r)}createRenderRoot(){let r=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return $e(r,this.constructor.elementStyles),r}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(r=>r.hostConnected?.())}enableUpdating(r){}disconnectedCallback(){this._$EO?.forEach(r=>r.hostDisconnected?.())}attributeChangedCallback(r,t,e){this._$AK(r,e)}_$ET(r,t){let e=this.constructor.elementProperties.get(r),i=this.constructor._$Eu(r,e);if(i!==void 0&&e.reflect===!0){let n=(e.converter?.toAttribute!==void 0?e.converter:ft).toAttribute(t,e.type);this._$Em=r,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(r,t){let e=this.constructor,i=e._$Eh.get(r);if(i!==void 0&&this._$Em!==i){let n=e.getPropertyOptions(i),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:ft;this._$Em=i;let a=o.fromAttribute(t,n.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(r,t,e,i=!1,n){if(r!==void 0){let o=this.constructor;if(i===!1&&(n=this[r]),e??=o.getPropertyOptions(r),!((e.hasChanged??Ht)(n,t)||e.useDefault&&e.reflect&&n===this._$Ej?.get(r)&&!this.hasAttribute(o._$Eu(r,e))))return;this.C(r,t,e)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(r,t,{useDefault:e,reflect:i,wrapped:n},o){e&&!(this._$Ej??=new Map).has(r)&&(this._$Ej.set(r,o??t??this[r]),n!==!0||o!==void 0)||(this._$AL.has(r)||(this.hasUpdated||e||(t=void 0),this._$AL.set(r,t)),i===!0&&this._$Em!==r&&(this._$Eq??=new Set).add(r))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let r=this.scheduleUpdate();return r!=null&&await r,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[i,n]of e){let{wrapped:o}=n,a=this[i];o!==!0||this._$AL.has(i)||a===void 0||this.C(i,void 0,n,a)}}let r=!1,t=this._$AL;try{r=this.shouldUpdate(t),r?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(e){throw r=!1,this._$EM(),e}r&&this._$AE(t)}willUpdate(r){}_$AE(r){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(r)),this.updated(r)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(r){return!0}update(r){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(r){}firstUpdated(r){}};B.elementStyles=[],B.shadowRootOptions={mode:"open"},B[gt("elementProperties")]=new Map,B[gt("finalized")]=new Map,ti?.({ReactiveElement:B}),(Mt.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Qt=globalThis,Se=s=>s,Et=Qt.trustedTypes,Ae=Et?Et.createPolicy("lit-html",{createHTML:s=>s}):void 0,Re="$lit$",Y=`lit$${Math.random().toFixed(9).slice(2)}$`,Pe="?"+Y,ei=`<${Pe}>`,rt=document,bt=()=>rt.createComment(""),yt=s=>s===null||typeof s!="object"&&typeof s!="function",te=Array.isArray,ri=s=>te(s)||typeof s?.[Symbol.iterator]=="function",Yt=`[ 	
\f\r]`,vt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ce=/-->/g,Te=/>/g,tt=RegExp(`>|${Yt}(?:([^\\s"'>=/]+)(${Yt}*=${Yt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Me=/'/g,He=/"/g,ze=/^(?:script|style|textarea|title)$/i,ee=s=>(r,...t)=>({_$litType$:s,strings:r,values:t}),c=ee(1),k=ee(2),hs=ee(3),it=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),Ee=new WeakMap,et=rt.createTreeWalker(rt,129);function Oe(s,r){if(!te(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ae!==void 0?Ae.createHTML(r):r}var ii=(s,r)=>{let t=s.length-1,e=[],i,n=r===2?"<svg>":r===3?"<math>":"",o=vt;for(let a=0;a<t;a++){let p=s[a],u,g,v=-1,w=0;for(;w<p.length&&(o.lastIndex=w,g=o.exec(p),g!==null);)w=o.lastIndex,o===vt?g[1]==="!--"?o=Ce:g[1]!==void 0?o=Te:g[2]!==void 0?(ze.test(g[2])&&(i=RegExp("</"+g[2],"g")),o=tt):g[3]!==void 0&&(o=tt):o===tt?g[0]===">"?(o=i??vt,v=-1):g[1]===void 0?v=-2:(v=o.lastIndex-g[2].length,u=g[1],o=g[3]===void 0?tt:g[3]==='"'?He:Me):o===He||o===Me?o=tt:o===Ce||o===Te?o=vt:(o=tt,i=void 0);let $=o===tt&&s[a+1].startsWith("/>")?" ":"";n+=o===vt?p+ei:v>=0?(e.push(u),p.slice(0,v)+Re+p.slice(v)+Y+$):p+Y+(v===-2?a:$)}return[Oe(s,n+(s[t]||"<?>")+(r===2?"</svg>":r===3?"</math>":"")),e]},xt=class s{constructor({strings:r,_$litType$:t},e){let i;this.parts=[];let n=0,o=0,a=r.length-1,p=this.parts,[u,g]=ii(r,t);if(this.el=s.createElement(u,e),et.currentNode=this.el.content,t===2||t===3){let v=this.el.content.firstChild;v.replaceWith(...v.childNodes)}for(;(i=et.nextNode())!==null&&p.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(let v of i.getAttributeNames())if(v.endsWith(Re)){let w=g[o++],$=i.getAttribute(v).split(Y),S=/([.?@])?(.*)/.exec(w);p.push({type:1,index:n,name:S[2],strings:$,ctor:S[1]==="."?Lt:S[1]==="?"?Xt:S[1]==="@"?Zt:at}),i.removeAttribute(v)}else v.startsWith(Y)&&(p.push({type:6,index:n}),i.removeAttribute(v));if(ze.test(i.tagName)){let v=i.textContent.split(Y),w=v.length-1;if(w>0){i.textContent=Et?Et.emptyScript:"";for(let $=0;$<w;$++)i.append(v[$],bt()),et.nextNode(),p.push({type:2,index:++n});i.append(v[w],bt())}}}else if(i.nodeType===8)if(i.data===Pe)p.push({type:2,index:n});else{let v=-1;for(;(v=i.data.indexOf(Y,v+1))!==-1;)p.push({type:7,index:n}),v+=Y.length-1}n++}}static createElement(r,t){let e=rt.createElement("template");return e.innerHTML=r,e}};function ot(s,r,t=s,e){if(r===it)return r;let i=e!==void 0?t._$Co?.[e]:t._$Cl,n=yt(r)?void 0:r._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(s),i._$AT(s,t,e)),e!==void 0?(t._$Co??=[])[e]=i:t._$Cl=i),i!==void 0&&(r=ot(s,i._$AS(s,r.values),i,e)),r}var Vt=class{constructor(r,t){this._$AV=[],this._$AN=void 0,this._$AD=r,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(r){let{el:{content:t},parts:e}=this._$AD,i=(r?.creationScope??rt).importNode(t,!0);et.currentNode=i;let n=et.nextNode(),o=0,a=0,p=e[0];for(;p!==void 0;){if(o===p.index){let u;p.type===2?u=new wt(n,n.nextSibling,this,r):p.type===1?u=new p.ctor(n,p.name,p.strings,this,r):p.type===6&&(u=new Jt(n,this,r)),this._$AV.push(u),p=e[++a]}o!==p?.index&&(n=et.nextNode(),o++)}return et.currentNode=rt,i}p(r){let t=0;for(let e of this._$AV)e!==void 0&&(e.strings!==void 0?(e._$AI(r,e,t),t+=e.strings.length-2):e._$AI(r[t])),t++}},wt=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(r,t,e,i){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=r,this._$AB=t,this._$AM=e,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let r=this._$AA.parentNode,t=this._$AM;return t!==void 0&&r?.nodeType===11&&(r=t.parentNode),r}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(r,t=this){r=ot(this,r,t),yt(r)?r===h||r==null||r===""?(this._$AH!==h&&this._$AR(),this._$AH=h):r!==this._$AH&&r!==it&&this._(r):r._$litType$!==void 0?this.$(r):r.nodeType!==void 0?this.T(r):ri(r)?this.k(r):this._(r)}O(r){return this._$AA.parentNode.insertBefore(r,this._$AB)}T(r){this._$AH!==r&&(this._$AR(),this._$AH=this.O(r))}_(r){this._$AH!==h&&yt(this._$AH)?this._$AA.nextSibling.data=r:this.T(rt.createTextNode(r)),this._$AH=r}$(r){let{values:t,_$litType$:e}=r,i=typeof e=="number"?this._$AC(r):(e.el===void 0&&(e.el=xt.createElement(Oe(e.h,e.h[0]),this.options)),e);if(this._$AH?._$AD===i)this._$AH.p(t);else{let n=new Vt(i,this),o=n.u(this.options);n.p(t),this.T(o),this._$AH=n}}_$AC(r){let t=Ee.get(r.strings);return t===void 0&&Ee.set(r.strings,t=new xt(r)),t}k(r){te(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,e,i=0;for(let n of r)i===t.length?t.push(e=new s(this.O(bt()),this.O(bt()),this,this.options)):e=t[i],e._$AI(n),i++;i<t.length&&(this._$AR(e&&e._$AB.nextSibling,i),t.length=i)}_$AR(r=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);r!==this._$AB;){let e=Se(r).nextSibling;Se(r).remove(),r=e}}setConnected(r){this._$AM===void 0&&(this._$Cv=r,this._$AP?.(r))}},at=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(r,t,e,i,n){this.type=1,this._$AH=h,this._$AN=void 0,this.element=r,this.name=t,this._$AM=i,this.options=n,e.length>2||e[0]!==""||e[1]!==""?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=h}_$AI(r,t=this,e,i){let n=this.strings,o=!1;if(n===void 0)r=ot(this,r,t,0),o=!yt(r)||r!==this._$AH&&r!==it,o&&(this._$AH=r);else{let a=r,p,u;for(r=n[0],p=0;p<n.length-1;p++)u=ot(this,a[e+p],t,p),u===it&&(u=this._$AH[p]),o||=!yt(u)||u!==this._$AH[p],u===h?r=h:r!==h&&(r+=(u??"")+n[p+1]),this._$AH[p]=u}o&&!i&&this.j(r)}j(r){r===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,r??"")}},Lt=class extends at{constructor(){super(...arguments),this.type=3}j(r){this.element[this.name]=r===h?void 0:r}},Xt=class extends at{constructor(){super(...arguments),this.type=4}j(r){this.element.toggleAttribute(this.name,!!r&&r!==h)}},Zt=class extends at{constructor(r,t,e,i,n){super(r,t,e,i,n),this.type=5}_$AI(r,t=this){if((r=ot(this,r,t,0)??h)===it)return;let e=this._$AH,i=r===h&&e!==h||r.capture!==e.capture||r.once!==e.once||r.passive!==e.passive,n=r!==h&&(e===h||i);i&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,r),this._$AH=r}handleEvent(r){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,r):this._$AH.handleEvent(r)}},Jt=class{constructor(r,t,e){this.element=r,this.type=6,this._$AN=void 0,this._$AM=t,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(r){ot(this,r)}};var si=Qt.litHtmlPolyfillSupport;si?.(xt,wt),(Qt.litHtmlVersions??=[]).push("3.3.3");var Ne=(s,r,t)=>{let e=t?.renderBefore??r,i=e._$litPart$;if(i===void 0){let n=t?.renderBefore??null;e._$litPart$=i=new wt(r.insertBefore(bt(),n),n,void 0,t??{})}return i._$AI(s),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var re=globalThis,b=class extends B{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let r=super.createRenderRoot();return this.renderOptions.renderBefore??=r.firstChild,r}update(r){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(r),this._$Do=Ne(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return it}};b._$litElement$=!0,b.finalized=!0,re.litElementHydrateSupport?.({LitElement:b});var ni=re.litElementPolyfillSupport;ni?.({LitElement:b});(re.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var x=s=>(r,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(s,r)}):customElements.define(s,r)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var oi={attribute:!0,type:String,converter:ft,reflect:!1,hasChanged:Ht},ai=(s=oi,r,t)=>{let{kind:e,metadata:i}=t,n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),e==="setter"&&((s=Object.create(s)).wrapped=!0),n.set(t.name,s),e==="accessor"){let{name:o}=t;return{set(a){let p=r.get.call(this);r.set.call(this,a),this.requestUpdate(o,p,s,!0,a)},init(a){return a!==void 0&&this.C(o,void 0,s,a),a}}}if(e==="setter"){let{name:o}=t;return function(a){let p=this[o];r.call(this,a),this.requestUpdate(o,p,s,!0,a)}}throw Error("Unsupported decorator location: "+e)};function m(s){return(r,t)=>typeof t=="object"?ai(s,r,t):((e,i,n)=>{let o=i.hasOwnProperty(n);return i.constructor.createProperty(n,e),o?Object.getOwnPropertyDescriptor(i,n):void 0})(s,r,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function f(s){return m({...s,state:!0,attribute:!1})}/**
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
 */var $t=12,Ue=2.2,U=100,D=100,De=500;function We(s,r){let t=Array.from({length:$t},(e,i)=>{let n=-90+360/$t*i+Ue/2,o=-90+360/$t*(i+1)-Ue/2;return di(93,82,n,o)});return k`
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

      <g class="halo" filter="url(#blur)" style="opacity:${s.glow}">
        ${t.map((e,i)=>k`<path d=${e} style="fill:${s.segments[i].opacity?s.segments[i].fill:"transparent"}"></path>`)}
      </g>

      ${t.map((e,i)=>k`<path
          class="segment"
          data-picked=${String(s.picked===i)}
          data-divisible=${String(s.divisible)}
          d=${e}
          style="fill:${s.segments[i].fill};opacity:${s.segments[i].opacity}"
          @click=${s.divisible?()=>r.segment(i):r.ring}
        ></path>`)}

      <circle cx=${U} cy=${D} r="79" fill="url(#top)"></circle>
      <circle cx=${U} cy=${D} r="79" fill="none" stroke="var(--el-edge)" stroke-width="1"></circle>

      <circle class="hit" cx=${U} cy=${D} r="93" fill="none" stroke="transparent"
        stroke-width="12" @click=${r.ring}></circle>

      ${ie(U,D-46,k`<path d="M-4.5 0h9M0 -4.5v9"></path>`,"Volume up",()=>r.volume(1))}
      <g
        class="btn"
        data-lit=${String(s.holding)}
        transform="translate(${U+46} ${D})"
        role="button"
        tabindex="0"
        aria-label=${s.holding?"Wake the second assistant":"Wake"}
        @pointerdown=${()=>r.action("down")}
        @pointerup=${()=>r.action("up")}
        @pointerleave=${()=>r.action("cancel")}
        @pointercancel=${()=>r.action("cancel")}
      >
        <circle class="face" cx="0" cy="0" r="13"></circle>
        <g class="glyph"><circle cx="0" cy="0" r="4.5"></circle></g>
      </g>
      ${ie(U,D+46,k`<path d="M-4.5 0h9"></path>`,"Volume down",()=>r.volume(-1))}
      ${ie(U-46,D,li(s.muted),s.muted?"Microphone muted":"Microphone live",r.mute,s.muted)}
    </svg>
  `}function ie(s,r,t,e,i,n=!1){return k`<g class="btn" data-lit=${String(n)} transform="translate(${s} ${r})"
    role="button" tabindex="0" aria-label=${e} @click=${i}>
    <circle class="face" cx="0" cy="0" r="13"></circle>
    <g class="glyph">${t}</g>
  </g>`}function li(s){return k`
    <path d="M-2.6 -5.2a2.6 2.6 0 0 1 5.2 0v4a2.6 2.6 0 0 1-5.2 0z"></path>
    <path d="M-4.6 -0.6a4.6 4.6 0 0 0 9.2 0"></path>
    <path d="M0 3.8v2.6"></path>
    ${s?k`<path d="M-6.4 6.4L6.4 -6.4"></path>`:ci()}
  `}function ci(){return k``}function di(s,r,t,e){let i=($,S)=>{let E=S*Math.PI/180;return[(U+$*Math.cos(E)).toFixed(2),(D+$*Math.sin(E)).toFixed(2)]},[n,o]=i(s,t),[a,p]=i(s,e),[u,g]=i(r,e),[v,w]=i(r,t);return`M${n} ${o}A${s} ${s} 0 0 1 ${a} ${p}L${u} ${g}A${r} ${r} 0 0 0 ${v} ${w}Z`}var Fe=`:host {
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
`;var qe=26,Pt=135,zt=270,A=100,C=100,V=84,Ot=38,R=class extends b{constructor(){super(...arguments);this.level="";this.floor="";this.gate="";this.mode="";this.muted=!1;this.held=null;this.grab=t=>{let e=t.currentTarget;e.setPointerCapture(t.pointerId);let i=this.hass.states[this.gate]?.attributes??{},n=i.min??0,o=i.max??20,a=i.step??1,p=this.number(this.floor)??0,u=this.number(this.level)??0,g=Math.max(p+qe,u+3),v=S=>{let E=e.getBoundingClientRect(),ye=S.clientX-E.left-E.width/2,Kt=S.clientY-E.top-E.height/2,mt=Math.atan2(Kt,ye)*180/Math.PI-Pt;for(;mt<0;)mt+=360;let Ir=se(Math.min(mt,zt)/zt);return Math.max(n,Math.min(o,Math.round(Ir*(g-p)/a)*a))},w=S=>{this.held=v(S)},$=S=>{e.removeEventListener("pointermove",w),e.removeEventListener("pointerup",$),e.removeEventListener("pointercancel",$);let E=v(S);this.held=null,this.hass.callService("number","set_value",{entity_id:this.gate,value:E})};e.addEventListener("pointermove",w),e.addEventListener("pointerup",$),e.addEventListener("pointercancel",$),this.held=v(t)}}render(){let t=this.number(this.level),e=this.number(this.floor),i=this.held??this.number(this.gate);if(t===null||e===null||i===null)return h;let n=this.hass.states[this.mode],o=Be(n?.state),a=Math.max(e+qe,t+3),p=se((t-e)/(a-e)),u=se(i/(a-e)),g=t>=e+i&&!this.muted;return c`
      <div class="dial" @pointerdown=${this.grab}>
        <svg viewBox="0 0 200 200" role="img" aria-label="Microphone array">
          <path class="arc-bed" d=${Ie()} pathLength="100"></path>
          ${this.muted?h:k`<path
                class="arc-live"
                data-over=${String(g)}
                d=${Ie()}
                pathLength="100"
                stroke-dasharray=${`${p*100} 100`}
              ></path>`}
          ${this.muted?h:vi(u)} ${o==="beam"?fi():h}
          ${o==="sum"?gi():h} ${ui(o,this.muted)}
          ${this.muted?k`<path class="slash" d="M${A-30} ${C+30}L${A+30} ${C-30}"></path>`:h}
        </svg>
      </div>

      <div class="side">
        <div class="reading">
          ${this.muted?c`<span class="now cut">Cut</span>`:c`<span class="now">${t.toFixed(1)}</span><span class="unit">dB</span>
                <span class="caption" data-over=${String(g)}>
                  ${g?"Over the gate":"Quiet"}
                </span>`}
        </div>

        <div class="modes">
          ${(n?.attributes.options??[]).map(v=>c`<button
              class="mode"
              data-on=${String(v===n?.state)}
              @click=${()=>this.hass.callService("select","select_option",{entity_id:this.mode,option:v})}
            >
              <svg viewBox="0 0 40 40">${mi(Be(v))}</svg>
              <span>${v}</span>
            </button>`)}
        </div>

        <div class="gate">Gate <b>${i} dB</b> over a floor of <b>${e.toFixed(0)} dB</b></div>
      </div>
    `}number(t){let e=Number(this.hass?.states?.[t]?.state);return Number.isFinite(e)?e:null}};R.styles=y(je),d([m({attribute:!1})],R.prototype,"hass",2),d([m()],R.prototype,"level",2),d([m()],R.prototype,"floor",2),d([m()],R.prototype,"gate",2),d([m()],R.prototype,"mode",2),d([m({type:Boolean})],R.prototype,"muted",2),d([f()],R.prototype,"held",2),R=d([x("echolocal-array")],R);function Be(s){let r=(s??"").toLowerCase();return r.includes("center")||r.includes("centre")?"one":r.includes("beam")?"beam":"sum"}function ui(s,r){return[[A,C],...Array.from({length:6},(e,i)=>{let n=(-90+i*60)*Math.PI/180;return[A+Ot*Math.cos(n),C+Ot*Math.sin(n)]})].map(([e,i],n)=>k`<circle class="capsule" data-on=${String(!r&&(s!=="one"||n===0))}
      cx=${e.toFixed(1)} cy=${i.toFixed(1)} r=${n===0?7:5.5}></circle>`)}function mi(s){let r=[[20,20],...Array.from({length:6},(t,e)=>{let i=(-90+e*60)*Math.PI/180;return[20+12*Math.cos(i),20+12*Math.sin(i)]})];return k`
    ${s==="beam"?k`<path class="beam" d="M20 20C9 11 13 1 20 1C27 1 31 11 20 20Z"></path>`:h}
    ${r.map(([t,e],i)=>k`<circle class="capsule" data-on=${String(s!=="one"||i===0)}
          cx=${t.toFixed(1)} cy=${e.toFixed(1)} r=${i===0?3.4:2.6}></circle>`)}`}function gi(){return Array.from({length:6},(s,r)=>{let t=(-90+r*60)*Math.PI/180;return k`<line class="spoke" x1=${A} y1=${C}
      x2=${(A+Ot*Math.cos(t)).toFixed(1)} y2=${(C+Ot*Math.sin(t)).toFixed(1)}></line>`})}function fi(){return k`<path class="beam" d="M${A} ${C}C${A-34} ${C-30} ${A-24} ${C-66} ${A} ${C-66}C${A+24} ${C-66} ${A+34} ${C-30} ${A} ${C}Z"></path>`}function Ie(){let s=Pt*Math.PI/180,r=(Pt+zt)*Math.PI/180;return`M${(A+V*Math.cos(s)).toFixed(2)} ${(C+V*Math.sin(s)).toFixed(2)}
    A${V} ${V} 0 1 1 ${(A+V*Math.cos(r)).toFixed(2)} ${(C+V*Math.sin(r)).toFixed(2)}`}function vi(s){let r=(Pt+s*zt)*Math.PI/180,t=V-8,e=V+8;return k`<line class="notch"
    x1=${(A+t*Math.cos(r)).toFixed(1)} y1=${(C+t*Math.sin(r)).toFixed(1)}
    x2=${(A+e*Math.cos(r)).toFixed(1)} y2=${(C+e*Math.sin(r)).toFixed(1)}></line>`}function se(s){return Math.max(0,Math.min(1,s))}var Ke=`:host {
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

`;var st=class extends b{constructor(){super(...arguments);this.text="";this.open=!1;this.toggle=t=>{t.stopPropagation(),t.preventDefault(),this.open=!this.open,this.open?(this.place(),document.addEventListener("click",this.elsewhere,!0)):document.removeEventListener("click",this.elsewhere,!0)};this.elsewhere=t=>{t.composedPath().includes(this)||(this.open=!1,document.removeEventListener("click",this.elsewhere,!0))}}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this.elsewhere,!0)}render(){return this.text?c`
      <button
        data-open=${String(this.open)}
        aria-label="What this does"
        aria-expanded=${String(this.open)}
        @click=${this.toggle}
      >
        ?
      </button>
      ${this.open?c`<div class="said" role="tooltip">${this.text}</div>`:h}
    `:h}async place(){let t=(await this.updateComplete,this.shadowRoot?.querySelector(".said"));if(!(t instanceof HTMLElement))return;t.style.removeProperty("transform");let e=(this.closest(".sheet")??this.offsetParent??document.body).getBoundingClientRect(),i=t.getBoundingClientRect(),n=10,o=Math.max(0,e.left+n-i.left)-Math.max(0,i.right-e.right+n);o&&(t.style.transform=`translateX(${Math.round(o)}px)`)}};st.styles=y(Ke),d([m()],st.prototype,"text",2),d([f()],st.prototype,"open",2),st=d([x("echolocal-bubble")],st);var Ge=`.sheet {
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
`;var Ye=`:host {
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
`;var z=class extends b{constructor(){super(...arguments);this.light="";this.muted="";this.failure="";this.room="";this.target="rest"}render(){let t=this.hass.states[this.light];if(!t)return h;let e=this.situations(),i=e.find(o=>o.key===this.target)??e[0],n=t.attributes.brightness??255;return c`
      <div class="dim">
        <span>Brightness</span>
        <input
          type="range"
          min="1"
          max="255"
          .value=${String(n)}
          ?disabled=${t.state!=="on"}
          @change=${o=>this.hass.callService("light","turn_on",{entity_id:this.light,brightness:Number(o.target.value)})}
        />
        <b>${Math.round(n/255*100)}%</b>
      </div>

      <div class="when">
        ${e.map(o=>c`<button
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
    `}situations(){return[{key:"rest",label:"At rest",icon:"mdi:record-circle-outline"},{key:"muted",label:"Muted",icon:"mdi:microphone-off",entity:this.muted},{key:"failure",label:"On failure",icon:"mdi:alert-circle-outline",entity:this.failure},{key:"room",label:"Follows the room",icon:"mdi:motion-sensor",entity:this.room}].filter(e=>e.key==="rest"||e.entity&&this.hass.states[e.entity])}showing(t){return t.entity?this.hass.states[t.entity]?.state??"":this.hass.states[this.light]?.attributes.effect??""}options(t){return(t.entity?this.hass.states[t.entity]?.attributes.options:this.hass.states[this.light]?.attributes.effect_list)??[]}choose(t,e){if(!t.entity){this.hass.callService("light","turn_on",{entity_id:this.light,effect:e});return}this.hass.callService("select","select_option",{entity_id:t.entity,option:e})}};z.styles=y(Ye),d([m({attribute:!1})],z.prototype,"hass",2),d([m()],z.prototype,"light",2),d([m()],z.prototype,"muted",2),d([m()],z.prototype,"failure",2),d([m()],z.prototype,"room",2),d([f()],z.prototype,"target",2),z=d([x("echolocal-appearance")],z);var l={firmware:/^update-firmware$/,updateChannel:/^select-update_channel$/,checkUpdates:/^button-check_for_updates$/,updateStatus:/^text_sensor-update_status$/,updateOutcome:/^event-update_outcome$/,bluetooth:/^switch-bluetooth_proxy$/,advertisements:/^sensor-ble_advertisements$/,metrics:/^number-metrics_interval$/,purge:/^button-purge_cache$/,cached:/^sensor-cached_data$/,testPlayback:/^button-test_playback$/,adb:/^switch-remote_adb$/,player:/^media_player-speaker$/,wakeWord:/^wake_word(_\d+)?$/,pipeline:/^pipeline(_\d+)?$/,vad:/^vad_sensitivity$/,ring:/^light-ring$/,segment:/^light-segment_(\d+)$/,whileMuted:/^select-ring_muted$/,onFailure:/^select-failure_effect$/,followsRoom:/^select-room_reaction$/,mute:/^switch-mic_mute$/,gain:/^number-microphone_gain$/,sensitivity:/^number-microphone_sensitivity$/,stopWord:/^number-stop_word_sensitivity$/,mixing:/^select-microphone_mixing$/,muteLamp:/^select-mute_led_brightness$/,leveling:/^switch-microphone_leveling$/,echo:/^switch-microphone_cancel_echo$/,roomLevel:/^sensor-room_level$/,roomFloor:/^sensor-room_floor$/,noise:/^select-noise_layer_(\d+)$/,headphones:/^binary_sensor-headphones$/,musicOnTurn:/^select-media_on_turn$/,ducking:/^number-media_duck_level$/,resampling:/^select-voice_resampling$/,wake:/^button-wake_assistant_\d+$/,threshold:/^number-wake_threshold_\d+$/,maxListen:/^number-max_listen_\d+$/,maxThink:/^number-max_think_\d+$/,followUp:/^number-follow_up_\d+$/,replyBuffer:/^number-reply_buffer_\d+$/,replyDelivery:/^select-reply_delivery_\d+$/,wakeEffect:/^select-wake_effect_\d+$/,wakeTone:/^select-wake_tone_\d+$/,ip:/^text_sensor-ip_address$/,wifiSignal:/^sensor-wifi_signal$/,wifiSent:/^sensor-wifi_sent$/,wifiReceived:/^sensor-wifi_received$/,cpuTemperature:/^sensor-cpu_temperature$/,radioTemperature:/^sensor-radio_temperature$/,cores:/^sensor-cpu_cores(_online)?$/,load:/^sensor-load_average$/,memory:/^sensor-memory_available$/,disk:/^sensor-free_space$/,lastWakeWord:/^text_sensor-last_wake_word$/,lastHeard:/^text_sensor-last_heard$/,lastReply:/^text_sensor-last_reply$/};function Ve(s,r){let t=nt(s);return r.map(e=>{let i=t?.get(e.entity_id);return{...e,key:i?.key??"",part:i?.part??0,label:i?.name??s.states[e.entity_id]?.attributes.friendly_name??e.entity_id}})}var Ut="echolocal-keys",Nt=null,ne=null;function nt(s){return Nt||(Nt=wi(s),Nt.then(()=>window.dispatchEvent(new Event(Ut))),ki(s)),ne}async function wi(s){let r=new Map;try{let t=await s.callWS({type:"config/entity_registry/list"});for(let e of t)e.device_id&&r.set(e.entity_id,{entityId:e.entity_id,deviceId:e.device_id,...$i(e.unique_id),platform:e.platform,name:e.name||e.original_name||e.entity_id,disabled:!!e.disabled_by})}catch{}return ne=r,r}function $i(s){let r=s.replace(/^(?:[0-9a-f]{2}:){5}[0-9a-f]{2}-?/i,""),t=r.lastIndexOf("@");return t<0?{key:r,part:0}:{key:r.slice(0,t),part:Number(r.slice(t+1))||0}}function ki(s){s.connection?.subscribeEvents(()=>{Nt=null,ne=null,nt(s)},"entity_registry_updated").catch(()=>{})}var _i=[[l.mute,"Cuts the microphones in hardware. The device cannot hear anything at all while this is on, including its wake word \u2014 it is a switch on the power to the capsules, not a software mute."],[l.gain,"How much the capsules are amplified before anything else happens. Raise it in a large or quiet room; lower it if speech close to the device clips and comes out distorted."],[l.mixing,"How the seven capsules are combined into the one channel the speech engine hears. Beamforming favours whichever direction someone is talking from and rejects the rest of the room; averaging treats every direction equally and is steadier when several people talk."],[l.leveling,"Evens out loud and quiet talkers so a whisper across the room and a shout beside it arrive at similar volume. Helps transcription, and costs a little dynamic range."],[l.echo,"Subtracts what the speaker is playing from what the microphones hear, so the device can be interrupted while it is talking and does not answer its own reply."],[l.sensitivity,"How much louder than the room's own noise floor a sound has to be before the device treats it as somebody talking. Raise it in a noisy room to stop the device reacting to the room itself; lower it if quiet speech is missed."],[l.roomLevel,"How loud the room is right now, in decibels below full scale. Nothing to set \u2014 it is what the sensitivity is measured against, and watching it is how you pick a sensible one."],[l.roomFloor,"The quietest the room has been recently, which is the baseline the device compares against. It drifts with the room, so a fridge switching on raises it rather than fooling the device."],[l.muteLamp,"How bright the red ring is while the microphones are cut. Dim is enough to see in a dark room without lighting it up."],[l.stopWord,"How sure the device has to be before it takes an interruption as the word stop. Lower it if saying stop over a reply does not land."],[l.ring,"The whole ring, as one light. Turning it off leaves the device working normally and silent about it."],[l.segment,"One of the twelve segments, addressable on its own. They ship switched off in Home Assistant because twelve extra lights in every list is rarely what anyone wants \u2014 enable one and it can be coloured individually from the card."],[l.whileMuted,"What the ring does while the microphones are cut. Something visible is worth choosing: a muted device that looks identical to a listening one is how people end up talking to a device that cannot hear them."],[l.onFailure,"What the ring does when a turn fails \u2014 no network, no pipeline, nothing understood. Distinct from the normal colours on purpose."],[l.followsRoom,"Lets the ring track how loud the room is while the device is listening, so somebody can see that it is hearing them before it answers."],[l.headphones,"Sends audio out of the jack instead of the speaker. The speaker goes quiet while this is on."],[l.noise,"Plays a generated sound the device makes itself \u2014 rain, a fan, a brook. Nothing is streamed and nothing is stored: it is synthesised as it plays, so it never loops or runs out. Two layers can overlap, so rain over a fan is one choice in each."],[l.musicOnTurn,"What happens to music when someone says the wake word. Ducking drops the volume and keeps playing, which resumes on the same note; stopping does not."],[l.ducking,"How far the volume drops while the device is listening or talking. Far enough that the microphones are not fighting the music, not so far that the room goes silent."],[l.resampling,"How the reply's audio is resampled to what the speaker wants. Better quality costs a little more work on a device that has four small cores."],[l.wakeWord,"What this assistant listens for. The list is what the device has on disk plus whatever Home Assistant is offering from its custom_wake_words directory."],[l.threshold,"How sure the device has to be before it decides it heard its wake word. Lower it if it misses you; raise it if the television sets it off."],[l.followUp,"Keeps listening for a moment after a reply, so a second question needs no second wake word."],[l.maxListen,"How long the device will wait for someone to finish talking before giving up on the turn."],[l.maxThink,"How long to wait for Home Assistant's pipeline to answer. Generous is usually right \u2014 a slow answer beats a turn that dies just before it arrives."],[l.wakeEffect,"What the ring does at this point in a turn. Cosmetic, but it is how somebody knows the device heard them."],[l.wakeTone,"A short sound at this point in a turn. Some people want the confirmation; some find it grating."],[l.replyBuffer,"How much of a reply to collect before starting to play it. More is steadier on a poor network, at the cost of answering a beat later."],[l.replyDelivery,"Whether a reply starts playing as it arrives or once all of it has. Streaming is faster to start and stutters on a bad connection."],[l.updateChannel,"Which releases this device is offered. Stable only, or the ones that are still being tried out."],[l.checkUpdates,"Looks now rather than waiting for the next scheduled check. Nothing is installed by pressing it."],[l.bluetooth,"Forwards nearby Bluetooth advertisements to Home Assistant, so this device extends Bluetooth coverage into its room. It costs some radio time it would otherwise spend on wifi."],[l.metrics,"How often the device reports its own temperature, memory and load. Often enough to be useful; every report is work the device does instead of listening."],[l.purge,"Deletes what Android's runtime has cached. It comes back on its own, so this buys disk space for a while rather than permanently."],[l.testPlayback,"Plays a short sound, which is the quickest way to find out whether the speaker, the volume and the output route are all what you think they are."],[l.adb,"Opens Android's debugging port over the network. Off by default, and worth leaving off: it is an unauthenticated way onto the device for anything on the same network."],[l.vad,"How readily the device decides somebody has stopped talking. Tighter ends a turn sooner and can cut you off mid-sentence."],[l.wifiSignal,"How strong the connection to the access point is. Above about -70 dBm is comfortable; below -80 dBm is where audio starts arriving late."],[l.cpuTemperature,"The chip's own temperature. These run warm by design \u2014 it is a sustained climb rather than a number that matters."],[l.load,"How much work is queued across the cores. Listening for a wake word is continuous work, so this is never zero."],[l.memory,"How much memory is free. Wake models and the audio path are what use it."],[l.disk,"Disk left. Wake models and saved recordings are what fill it."],[l.updateStatus,"What the last self-update did. Worth reading when a device is on an older version than the rest."]],Si={array:"The seven capsules and what the room sounds like to them. The arc is how loud the room is right now; the notch is how far above the room's own noise floor something has to be before the device treats it as speech. Drag the notch, then talk from where you normally would and watch whether the arc crosses it.",appearance:"Ring controls, current brighness and color, active and conditional effects.",turn:"A turn's budget, end to end. The two grips are how long the device will wait for someone to finish talking, and how long it will wait for Home Assistant to answer. The band is what a slow turn would spend.",noise:"Sounds the device generates itself, mixed live rather than played from a file, so nothing loops. Two layers overlap \u2014 pick rain in one and a fan in the other.",volume:"The speaker's volume, in the same thirty steps the buttons on the device move it through, so this dial and the device agree.",history:"What the device has been hearing. Rows rebuilt from Home Assistant's recorder show what was said; rows the device itself reported also show where the time went and can be played back."},Ai={microphone:"The seven microphones and how the room sounds to them. Everything here changes what the device hears before a word of it reaches Home Assistant, so it is the first place to look when it mishears or does not wake at all.",ring:"The twelve-segment light. None of it changes what the device does \u2014 it changes what somebody in the room can tell about it, which is why the muted and failed colours are worth setting.",playback:"The speaker: what comes out of it, how loud, and what happens to music when somebody talks to the device.",assistant:"One wake word and the turn that follows it. A device can run more than one, each with its own word, sensitivity and timings, which is how one device answers to two names.",device:"The device itself rather than anything it hears or says: which releases it takes, what else it does for the network, and the housekeeping.",diagnostics:"What the device reports about itself. Nothing here is a setting \u2014 it is the evidence, and it is what to read before changing anything else."};function Le(s){if(s)return _i.find(([r])=>r.test(s))?.[1]}function Xe(s){return Si[s]}function Ze(s){return Ai[s]??""}var Dt="echolocal_turn";var Qe="turn_audio";var Ci=[{key:"wake_ms",label:"Wake"},{key:"listen_ms",label:"Listen"},{key:"think_ms",label:"Think"},{key:"speak_ms",label:"Reply"}];function kt(s){return Ci.map(({key:r,label:t})=>({key:r,label:t,ms:Number(s[r]??0)})).filter(r=>r.ms>0)}function lt(s){return kt(s).reduce((r,t)=>r+t.ms,0)}function Wt(s){let r=s;if(!r||r.version!=="1"||!r.wake_word)return null;let t={version:1,mac:(r.mac??"").toLowerCase(),id:r.id??"",slot:Je(r.slot)??1,wake_word:r.wake_word,outcome:r.outcome??"completed"};r.heard&&(t.heard=r.heard),r.reply&&(t.reply=r.reply);for(let e of["wake_ms","listen_ms","think_ms","speak_ms","audio_seconds","peak_db","floor_db"]){let i=Je(r[e]);i!==void 0&&(t[e]=i)}return t}function Je(s){if(s===void 0||s==="")return;let r=Number(s);return Number.isFinite(r)?r:void 0}var tr=`:host {
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
`;var oe=new Map;function er(s){return oe.get(s)}function rr(s,r,t){let i=`${r.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"")}_${t}`;return s?.services?.esphome?.[i]?i:void 0}async function ir(s,r,t){let e=oe.get(t);if(e)return e;let i=[],n="audio/wav",o=1;for(let p=0;p<Math.min(o,64);p++){let u=await Mi(s,r,t,p);if(!u)return null;o=u.pages||1,n=u.mime||n,i.push(Hi(u.data))}let a=URL.createObjectURL(new Blob(i,{type:n}));return oe.set(t,a),a}async function Mi(s,r,t,e){try{let n=(await s.callService("esphome",r,{id:t,page:e},void 0,!0,!0))?.response;return n?.version===1&&typeof n.data=="string"?n:null}catch{return null}}function Hi(s){let r=atob(s),t=new Uint8Array(r.length);for(let e=0;e<r.length;e++)t[e]=r.charCodeAt(e);return t}var sr=`:host {
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
`;var ct=null,O=class extends b{constructor(){super(...arguments);this.device="";this.turn="";this.filename="recording.wav";this.busy=!1;this.playing=!1;this.play=async()=>{if(this.playing){ct?.audio.pause();return}let t=await this.fetch();if(!t)return;ct?.stop();let e=new Audio(t),i=()=>{this.playing=!1,ct?.audio===e&&(ct=null)};e.addEventListener("ended",i),e.addEventListener("pause",i),ct={audio:e,stop:()=>e.pause()},this.playing=!0,e.play().catch(i)};this.save=async()=>{let t=await this.fetch();if(!t)return;let e=document.createElement("a");e.href=t,e.download=this.filename,e.click()}}disconnectedCallback(){super.disconnectedCallback(),this.playing&&ct?.audio.pause()}render(){return!this.turn||!this.action()?h:c`
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
    `}action(){return this.device?rr(this.hass,this.device,Qe):void 0}async fetch(){let t=er(this.turn);if(t)return t;let e=this.action();if(!e)return null;this.busy=!0;try{return await ir(this.hass,e,this.turn)}finally{this.busy=!1}}};O.styles=y(sr),d([m({attribute:!1})],O.prototype,"hass",2),d([m()],O.prototype,"device",2),d([m()],O.prototype,"turn",2),d([m()],O.prototype,"filename",2),d([f()],O.prototype,"busy",2),d([f()],O.prototype,"playing",2),O=d([x("echolocal-recording")],O);var nr=24,or=12,Ri=4e3,M=class extends b{constructor(){super(...arguments);this.mac="";this.wake="";this.heard="";this.reply="";this.device="";this.recorded=[];this.live=[];this.asked=!1}updated(){this.asked||!this.hass||!this.wake||(this.asked=!0,this.load(),this.listen())}disconnectedCallback(){super.disconnectedCallback(),this.stop?.()}render(){let t=this.merged();return c`
      <div class="caption">
        Recent turns ${t.length?c`<span>last ${nr} hours</span>`:h}
      </div>
      ${t.length?c`<div class="turns">${t.map(e=>this.row(e,this.scale(t)))}</div>`:c`<div class="none">${this.asked?"Nothing in the last day.":"Looking\u2026"}</div>`}
    `}scale(t){return Math.max(1,...t.map(e=>e.turn?lt(e.turn):0))}row(t,e){let i=t.turn,n=i?kt(i):[],o=i?lt(i):0;return c`<div class="turn">
      <div class="when">${Oi(t.at)}</div>
      <div class="wake">${t.wake}</div>
      <div class="right">
        ${i?c`<div class="outcome" data-bad=${String(i.outcome!=="completed")}>
              ${i.outcome==="completed"?`${(o/1e3).toFixed(1)}s`:i.outcome}
            </div>`:h}
        ${i?.audio_seconds?c`<echolocal-recording
              .hass=${this.hass}
              .device=${this.device}
              .turn=${i.id}
              .filename=${Ni(t)}
            ></echolocal-recording>`:h}
      </div>
      ${t.heard?c`<div class="said">${t.heard}</div>`:h}
      ${t.reply?c`<div class="said-back">${t.reply}</div>`:h}
      ${n.length?c`<div class="bar">
              ${n.map(a=>c`<div
                  class="slice"
                  data-phase=${a.key}
                  title=${`${a.label} ${a.ms} ms`}
                  style=${`flex:0 0 ${a.ms/e*100}%`}
                ></div>`)}
            </div>
            <div class="legend">
              ${n.map(a=>c`<span>${a.label} ${(a.ms/1e3).toFixed(1)}s</span>`)}
            </div>`:h}
    </div>`}merged(){let t=[...this.live];for(let e of this.recorded)t.some(i=>Math.abs(i.at-e.at)<Ri)||t.push(e);return t.sort((e,i)=>i.at-e.at).slice(0,or)}async load(){let t=[this.wake,this.heard,this.reply].filter(Boolean),e=new Date(Date.now()-nr*36e5).toISOString();try{let i=await this.hass.callWS({type:"history/history_during_period",start_time:e,entity_ids:t,minimal_response:!0,no_attributes:!0});this.recorded=Pi(ae(i[this.wake]),ae(i[this.heard]),ae(i[this.reply]))}catch{this.recorded=[]}}async listen(){if(this.hass.connection)try{this.stop=await this.hass.connection.subscribeEvents(t=>{let e=Wt(t.data);e&&(this.mac&&e.mac&&e.mac!==this.mac||(this.live=[{at:Date.now(),wake:e.wake_word,heard:e.heard,reply:e.reply,turn:e},...this.live].slice(0,or)))},Dt)}catch{}}};M.styles=y(tr),d([m({attribute:!1})],M.prototype,"hass",2),d([m()],M.prototype,"mac",2),d([m()],M.prototype,"wake",2),d([m()],M.prototype,"heard",2),d([m()],M.prototype,"reply",2),d([m()],M.prototype,"device",2),d([f()],M.prototype,"recorded",2),d([f()],M.prototype,"live",2),d([f()],M.prototype,"asked",2),M=d([x("echolocal-history")],M);function ae(s){return(s??[]).map(r=>({at:r.lu?r.lu*1e3:Date.parse(r.last_updated??""),value:r.s??r.state??""})).filter(r=>Number.isFinite(r.at)&&zi(r.value))}function Pi(s,r,t){let e=[...s].sort((n,o)=>o.at-n.at),i=n=>[...n].sort((o,a)=>o.at-a.at);return e.map((n,o)=>{let a=e[o-1]?.at??1/0,p=u=>i(u).find(g=>g.at>=n.at&&g.at<a)?.value;return{at:n.at,wake:n.value,heard:p(r),reply:p(t)}})}function zi(s){return!!s&&s!=="unknown"&&s!=="unavailable"&&s!=="None"}function Oi(s){return new Date(s).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function Ni(s){let r=new Date(s.at).toISOString().replace(/[:.]/g,"-").slice(0,19),t=s.wake.toLowerCase().replace(/[^a-z0-9]+/g,"-");return`${r}-${t}.wav`}var ar=`:host {
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
`;var lr=`:host {
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
`;var le=135,ce=270,Ft=100,jt=100,dt=78,Wi={White:"mdi:grain",Pink:"mdi:blur",Brown:"mdi:waveform",Rain:"mdi:weather-pouring",Ocean:"mdi:waves",Brook:"mdi:water",Wind:"mdi:weather-windy",Fire:"mdi:fireplace",Crickets:"mdi:bug-outline",Fan:"mdi:fan",Cabin:"mdi:airplane"},pt="None",L=class extends b{constructor(){super(...arguments);this.player="";this.jack="";this.grab=t=>{let e=t.currentTarget;e.setPointerCapture(t.pointerId);let i=p=>{let u=e.getBoundingClientRect(),g=p.clientX-u.left-u.width/2,v=p.clientY-u.top-u.height/2,w=Math.atan2(v,g)*180/Math.PI-le;for(;w<0;)w+=360;let $=Math.max(0,Math.min(1,Math.min(w,ce)/ce));return Math.round($*30)/30},n=p=>this.hass.callService("media_player","volume_set",{entity_id:this.player,volume_level:i(p)}),o=p=>n(p),a=p=>{e.removeEventListener("pointermove",o),e.removeEventListener("pointerup",a),e.removeEventListener("pointercancel",a),n(p)};e.addEventListener("pointermove",o),e.addEventListener("pointerup",a),e.addEventListener("pointercancel",a),n(t)}}render(){let t=this.hass.states[this.player];if(!t)return h;let e=Number(t.attributes.volume_level??0),i=t.attributes.is_volume_muted===!0,n=this.jack?this.hass.states[this.jack]?.state==="on":!1;return c`
      <div class="dial" @pointerdown=${this.grab}>
        <svg viewBox="0 0 200 200" role="img" aria-label="Volume">
          <path class="bed" d=${cr()} pathLength="100"></path>
          ${e>0?k`<path class="live" data-muted=${String(i)} d=${cr()} pathLength="100"
                stroke-dasharray=${`${e*100} 100`}></path>`:h}
          <text class="step" x=${Ft} y=${jt+4}>${Math.round(e*30)}</text>
          <text class="of" x=${Ft} y=${jt+20}>of 30</text>
        </svg>
      </div>

      <div class="side">
        <div class="state">${Fi(t.state)}</div>
        <div class="badges">
          <div class="badge" data-on=${String(i)}>
            <ha-icon .icon=${i?"mdi:volume-off":"mdi:volume-high"}></ha-icon>
            ${i?"Muted":`${Math.round(e*100)}%`}
          </div>
          ${this.jack?c`<div class="badge" data-on=${String(n)}>
                <ha-icon icon="mdi:headphones"></ha-icon>
                ${n?"Headphones":"Speaker"}
              </div>`:h}
        </div>
      </div>
    `}};L.styles=y(lr),d([m({attribute:!1})],L.prototype,"hass",2),d([m()],L.prototype,"player",2),d([m()],L.prototype,"jack",2),L=d([x("echolocal-volume")],L);var X=class extends b{constructor(){super(...arguments);this.layers=[];this.busy=!1}render(){let t=this.layers.map(o=>this.hass.states[o]?.state??pt),e=(this.hass.states[this.layers[0]]?.attributes.options??[]).filter(o=>o!==pt),i=t.every(o=>o!==pt),n=o=>t.indexOf(o);return c`
      <div class="caption">
        Generated sound
        <span>${i?"Both layers in use":`${t.filter(o=>o!==pt).length} of 2`}</span>
      </div>
      <div class="grid">
        ${e.map(o=>{let a=n(o);return c`<button
            class="sound"
            data-on=${String(a>=0)}
            ?disabled=${this.busy}
            @click=${()=>this.pick(o,a,t)}
          >
            <ha-icon .icon=${Wi[o]??"mdi:music-note"}></ha-icon>
            ${o}
            ${a>=0&&this.layers.length>1?c`<span class="layer">${a+1}</span>`:h}
          </button>`})}
      </div>
    `}async pick(t,e,i){let n=i.findIndex(a=>a===pt),o=e>=0?e:n>=0?n:this.layers.length-1;if(!(o<0)){this.busy=!0;try{await this.hass.callService("select","select_option",{entity_id:this.layers[o],option:e>=0?pt:t})}finally{this.busy=!1}}}};X.styles=y(ar),d([m({attribute:!1})],X.prototype,"hass",2),d([m({attribute:!1})],X.prototype,"layers",2),d([f()],X.prototype,"busy",2),X=d([x("echolocal-noise")],X);function Fi(s){return s==="playing"?"Playing":s==="paused"?"Paused":s==="unavailable"?"Unavailable":"Idle"}function cr(){let s=le*Math.PI/180,r=(le+ce)*Math.PI/180;return`M${(Ft+dt*Math.cos(s)).toFixed(2)} ${(jt+dt*Math.sin(s)).toFixed(2)}
    A${dt} ${dt} 0 1 1 ${(Ft+dt*Math.cos(r)).toFixed(2)} ${(jt+dt*Math.sin(r)).toFixed(2)}`}var dr=`:host {
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
`;var I=class extends b{constructor(){super(...arguments);this.listen="";this.think="";this.held={}}render(){let t=this.reading(this.listen),e=this.reading(this.think);if(!t||!e)return h;let i=t.max+e.max,n=o=>o/i*100;return c`
      <div class="top">
        <div class="caption">A turn</div>
        <div class="total">
          longest <b>${(t.value+e.value).toFixed(0)}s</b> of ${i.toFixed(0)}s
        </div>
      </div>

      <div class="band">
        <div class="phase wake">Wake</div>
        <div class="phase listen" style=${`flex:0 0 ${n(t.value)}%`}>
          ${t.value>=3?"Listen":""}
        </div>
        <div class="phase think" style=${`flex:0 0 ${n(e.value)}%`}>
          ${e.value>=3?"Think":""}
        </div>
        <div class="phase reply">Reply</div>

        ${this.grip(this.listen,t,64,n(t.value))}
        ${this.grip(this.think,e,64,n(t.value)+n(e.value))}
      </div>

      <div class="legend">
        <span>Listening <b>${t.value}s</b></span>
        <span>Thinking <b>${e.value}s</b></span>
      </div>
    `}grip(t,e,i,n){return c`<div
      class="grip"
      style=${`left:calc(${i}px + ${n}% - ${i*n/100}px)`}
      role="slider"
      aria-label=${t}
      aria-valuenow=${e.value}
      @pointerdown=${o=>this.drag(o,t,e)}
    ></div>`}drag(t,e,i){let n=t.currentTarget.parentElement;n.setPointerCapture(t.pointerId);let o=e===this.listen?this.reading(this.think):this.reading(this.listen),a=e===this.think?this.reading(this.listen)?.value??0:0,p=(i.max??0)+(o?.max??0),u=w=>{let $=n.getBoundingClientRect(),S=64,E=$.width-S,Kt=Math.max(0,Math.min(1,(w.clientX-$.left-S)/E))*p-a,mt=Math.round(Kt/(i.step||1))*(i.step||1);return Math.max(i.min,Math.min(i.max,mt))},g=w=>{this.held={...this.held,[e]:u(w)}},v=w=>{n.removeEventListener("pointermove",g),n.removeEventListener("pointerup",v),n.removeEventListener("pointercancel",v);let $=u(w),{[e]:S,...E}=this.held;this.held=E,this.hass.callService("number","set_value",{entity_id:e,value:$})};n.addEventListener("pointermove",g),n.addEventListener("pointerup",v),n.addEventListener("pointercancel",v)}reading(t){let e=this.hass?.states?.[t];if(!e)return null;let i=this.held[t]??Number(e.state);return Number.isFinite(i)?{value:i,min:e.attributes.min??0,max:e.attributes.max??30,step:e.attributes.step??1}:null}};I.styles=y(dr),d([m({attribute:!1})],I.prototype,"hass",2),d([m()],I.prototype,"listen",2),d([m()],I.prototype,"think",2),d([f()],I.prototype,"held",2),I=d([x("echolocal-turn")],I);var T=class extends b{constructor(){super(...arguments);this.heading="";this.subtitle="";this.icon="";this.sections=[];this.widgets=[];this.strip=[];this.device="";this.mac="";this.help=!0;this.about="";this.held={}}render(){let t=this.sections.map(o=>({...o,entities:o.entities.filter(a=>this.hass.states?.[a])})).filter(o=>o.entities.length),i=t.reduce((o,a)=>o+a.entities.length,0)>3||this.widgets.some(o=>o.place!=="header")?820:460,n=`--mdc-dialog-min-width:min(94vw,${i}px);--mdc-dialog-max-width:min(94vw,${i}px)`;return c`
      <ha-dialog open hideActions style=${n} @closed=${this.dismiss}>
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
            ${t.length?t.map(o=>this.group(o)):this.widgets.length?h:c`<div class="empty">Nothing to show here.</div>`}
          </div>
        </div>
      </ha-dialog>
    `}widget({widget:t,roles:e,lists:i}){let n=o=>o?.[0]??"";switch(t){case"appearance":return c`<echolocal-appearance
          class="hero"
          .hass=${this.hass}
          .light=${e.light}
          .muted=${n(i.muted)}
          .failure=${n(i.failure)}
          .room=${n(i.room)}
        ></echolocal-appearance>`;case"array":return c`<echolocal-array
          class="hero"
          .hass=${this.hass}
          .level=${e.level}
          .floor=${e.floor}
          .gate=${e.gate}
          .mode=${e.mode}
          .muted=${this.muted}
        ></echolocal-array>`;case"history":return c`<echolocal-history
          class="hero"
          .hass=${this.hass}
          .wake=${e.wake}
          .heard=${e.heard??""}
          .reply=${e.reply??""}
          .device=${this.device}
          .mac=${this.mac}
        ></echolocal-history>`;case"turn":return c`<echolocal-turn
          class="hero"
          .hass=${this.hass}
          .listen=${e.listen}
          .think=${e.think}
        ></echolocal-turn>`;case"volume":return c`<echolocal-volume
          class="hero"
          .hass=${this.hass}
          .player=${e.player}
          .jack=${n(i.jack)}
        ></echolocal-volume>`;case"noise":return c`<echolocal-noise
          class="hero"
          .hass=${this.hass}
          .layers=${i.layers??[]}
        ></echolocal-noise>`;case"player":return this.crownPlayer(e.player);case"power":return this.crownPower(e.light);case"mute":return this.crownMute(e.mute,e.lamp)}}crownPlayer(t){let e=this.hass.states[t],i=e?.state==="playing",n=e?.attributes.is_volume_muted!==!0;return c`<div class="crown">
      <button
        class="round"
        aria-label=${i?"Pause":"Play"}
        @click=${()=>this.hass.callService("media_player",i?"media_pause":"media_play",{entity_id:t})}
      >
        <ha-icon .icon=${i?"mdi:pause":"mdi:play"}></ha-icon>
      </button>
      <button
        class="toggle big power"
        data-on=${String(n)}
        aria-label="Sound"
        @click=${()=>this.hass.callService("media_player","volume_mute",{entity_id:t,is_volume_muted:n})}
      ></button>
    </div>`}crownPower(t){return c`<div class="crown">
      <button
        class="toggle big power"
        data-on=${String(this.hass.states[t]?.state==="on")}
        aria-label="Ring"
        @click=${()=>this.hass.callService("light","toggle",{entity_id:t})}
      ></button>
    </div>`}crownMute(t,e){let i=this.hass.states[e];return c`<div class="crown">
      ${i?c`<div class="lamp" title="Mute indicator">
            <ha-icon icon="mdi:brightness-6"></ha-icon>
            ${(i.attributes.options??[]).map(n=>c`<button
                class="pip"
                data-on=${String(n===i.state)}
                @click=${()=>this.hass.callService("select","select_option",{entity_id:e,option:n})}
              >
                ${n}
              </button>`)}
          </div>`:h}
      <button
        class="toggle big"
        data-on=${String(this.hass.states[t]?.state==="on")}
        aria-label="Microphone mute"
        @click=${()=>this.hass.callService("switch","toggle",{entity_id:t})}
      ></button>
    </div>`}get muted(){let t=this.widgets.find(e=>e.roles.mute)?.roles.mute;return!!t&&this.hass.states[t]?.state==="on"}explained(t){let e=this.help?Xe(t.widget):void 0;return e?c`<div class="explained">
      ${this.widget(t)}
      <echolocal-bubble class="corner" .text=${e}></echolocal-bubble>
    </div>`:this.widget(t)}group(t){return c`<section class="group">
      ${t.title?c`<div class="section">${t.title}</div>`:h}
      ${t.entities.map(e=>this.row(e))}
    </section>`}row(t){let e=this.hass.states?.[t];if(!e)return h;let i=t.split(".")[0],n=this.name(t),o=e.attributes.icon;switch(i){case"switch":case"light":return this.toggle(t,n,o,i);case"number":return this.slider(t,n,o);case"select":return this.options(t,n,o);case"button":return this.press(t,n,o);default:return this.reading(t,n,o)}}toggle(t,e,i,n){let o=this.hass.states[t].state,a=o==="unavailable"?"unavailable":String(o==="on");return this.tile(t,e,i,a==="true",{trail:c`<button
        class="toggle"
        data-on=${a}
        aria-label=${e}
        @click=${()=>this.hass.callService(n,"toggle",{entity_id:t})}
      ></button>`})}slider(t,e,i){let n=this.hass.states[t],o=n.attributes,a=o.min??0,p=o.max??100,u=this.held[t]??Number(n.state),g=p>a?(u-a)/(p-a)*100:0;return this.tile(t,e,i,!1,{trail:c`<span class="reading">${Number.isNaN(u)?"\u2014":u}</span>
        ${o.unit_of_measurement?c`<span class="unit">${o.unit_of_measurement}</span>`:h}`,under:c`<input
        type="range"
        style="--fill:${g}%"
        .value=${String(u)}
        min=${a}
        max=${p}
        step=${o.step??1}
        ?disabled=${n.state==="unavailable"}
        @input=${v=>{this.held={...this.held,[t]:Number(v.target.value)}}}
        @change=${v=>{let w=Number(v.target.value),{[t]:$,...S}=this.held;this.held=S,this.hass.callService("number","set_value",{entity_id:t,value:w})}}
      />`})}options(t,e,i){let n=this.hass.states[t],o=n.attributes.options??[],a=g=>this.hass.callService("select","select_option",{entity_id:t,option:g});if(o.length>4)return this.tile(t,e,i,!1,{under:c`<select
          ?disabled=${n.state==="unavailable"}
          @change=${g=>a(g.target.value)}
        >
          ${o.map(g=>c`<option value=${g} ?selected=${g===n.state}>${g}</option>`)}
        </select>`});let p=c`<div class="options">
      ${o.map(g=>c`<button
          class="chip"
          data-on=${String(g===n.state)}
          @click=${()=>a(g)}
        >
          ${g}
        </button>`)}
    </div>`,u=o.join("").length<=22&&o.length<=3;return this.tile(t,e,i,!1,u?{trail:p}:{under:p})}press(t,e,i){return this.tile(t,e,i,!1,{trail:c`<button
        class="press"
        @click=${()=>this.hass.callService("button","press",{entity_id:t})}
      >
        Run
      </button>`})}reading(t,e,i){let n=this.hass.states[t],o=n.attributes.unit_of_measurement;return this.tile(t,e,i,!1,{trail:c`<button class="reading" @click=${()=>this.moreInfo(t)}>
          ${n.state}
        </button>
        ${o?c`<span class="unit">${o}</span>`:h}`})}tile(t,e,i,n,o){let a=n&&i?.includes("mic")&&i.includes("off"),p=this.help?Le(nt(this.hass)?.get(t)?.key??""):void 0;return c`<div class="tile" data-active=${String(n&&!a)} data-alert=${String(!!a)}>
      <div class="top">
        <div class="icon"><ha-icon .icon=${i??"mdi:tune"}></ha-icon></div>
        <div class="named">
          <div class="name">${e}</div>
          ${p?c`<echolocal-bubble .text=${p}></echolocal-bubble>`:h}
        </div>
        ${o.trail?c`<div class="trail">${o.trail}</div>`:h}
      </div>
      ${o.under??h}
    </div>`}name(t){let e=nt(this.hass)?.get(t);if(e)return e.name;let i=this.hass.states[t]?.attributes.friendly_name??t,n=this.strip.filter(Boolean).sort((o,a)=>a.length-o.length);for(let o=!0;o;){o=!1;for(let a of n)if(i.toLowerCase().startsWith(`${a.toLowerCase()} `)){i=i.slice(a.length+1),o=!0;break}}return i.charAt(0).toUpperCase()+i.slice(1)}moreInfo(t){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}dismiss(){this.dispatchEvent(new CustomEvent("closed",{bubbles:!0,composed:!0}))}};T.styles=y(Ge),d([m({attribute:!1})],T.prototype,"hass",2),d([m()],T.prototype,"heading",2),d([m()],T.prototype,"subtitle",2),d([m()],T.prototype,"icon",2),d([m({attribute:!1})],T.prototype,"sections",2),d([m({attribute:!1})],T.prototype,"widgets",2),d([m({attribute:!1})],T.prototype,"strip",2),d([m()],T.prototype,"device",2),d([m()],T.prototype,"mac",2),d([m({type:Boolean})],T.prototype,"help",2),d([m()],T.prototype,"about",2),d([f()],T.prototype,"held",2),T=d([x("echolocal-dialog")],T);var de={ring:[{title:null,rows:[l.ring]},{title:"Segments",rows:[l.segment]}],microphone:[{title:null,rows:[l.mute]},{title:"Capture",rows:[l.gain,l.mixing,l.leveling,l.echo]},{title:"The room",rows:[l.sensitivity,l.roomLevel,l.roomFloor,l.stopWord]},{title:"Indicator",rows:[l.muteLamp]}],playback:[{title:null,rows:[l.headphones]},{title:"Generated sound",rows:[l.noise]},{title:"During a turn",rows:[l.musicOnTurn,l.ducking]},{title:"Voice",rows:[l.resampling]}],assistant:[{title:null,rows:[l.threshold]},{title:"Timing",rows:[l.maxListen,l.maxThink,l.followUp]},{title:"Feedback",rows:[l.wakeEffect,l.wakeTone]},{title:"Reply",rows:[l.replyBuffer,l.replyDelivery]}],device:[{title:null,rows:[l.firmware,l.wakeWord,l.pipeline,l.updateChannel,l.checkUpdates]},{title:"Listening",rows:[l.vad]},{title:"Bluetooth",rows:[l.bluetooth,l.advertisements]},{title:"Maintenance",rows:[l.metrics,l.purge,l.cached,l.testPlayback]}],diagnostics:[{title:"Network",rows:[l.ip,l.wifiSignal,l.wifiSent,l.wifiReceived]},{title:"Hardware",rows:[l.cpuTemperature,l.radioTemperature,l.cores,l.load,l.memory,l.disk]},{title:"The room",rows:[l.roomLevel,l.roomFloor]},{title:"Last turn",rows:[l.lastWakeWord,l.lastHeard,l.lastReply]},{title:"Access",rows:[l.adb,l.updateStatus,l.updateOutcome]}]},qi={ring:[{widget:"power",place:"header",roles:{light:l.ring}},{widget:"appearance",roles:{light:l.ring},lists:{segments:l.segment,muted:l.whileMuted,failure:l.onFailure,room:l.followsRoom}}],assistant:[{widget:"turn",roles:{listen:l.maxListen,think:l.maxThink}}],playback:[{widget:"player",place:"header",roles:{player:l.player}},{widget:"volume",roles:{player:l.player},lists:{jack:l.headphones}},{widget:"noise",roles:{first:l.noise},lists:{layers:l.noise}}],microphone:[{widget:"mute",place:"header",roles:{mute:l.mute,lamp:l.muteLamp}},{widget:"array",roles:{level:l.roomLevel,floor:l.roomFloor,gate:l.sensitivity,mode:l.mixing}}]};function pr(s,r){let t=[],e=new Set;for(let i of qi[s]??[]){let n={};for(let[a,p]of Object.entries(i.roles)){let u=r.find(g=>p.test(g.key));u&&(n[a]=u.entity_id)}if(Object.keys(n).length!==Object.keys(i.roles).length)continue;let o={};for(let[a,p]of Object.entries(i.lists??{}))o[a]=r.filter(u=>p.test(u.key)).sort(mr).map(u=>u.entity_id);t.push({widget:i.widget,place:i.place??"body",roles:n,lists:o}),[...Object.values(n),...Object.values(o).flat()].forEach(a=>e.add(a))}return{widgets:t,sections:pe(de[s],r.filter(i=>!e.has(i.entity_id)))}}function hr(s){let r=s.entities.filter(t=>t.device_id===s.device.id&&(t.entity_category==="config"||!t.entity_category));return pe(de.device,r)}function ur(s){let r=s.entities.filter(n=>n.entity_category==="diagnostic"),t={};for(let[n,o]of Object.entries({wake:l.lastWakeWord,heard:l.lastHeard,reply:l.lastReply})){let a=r.find(p=>o.test(p.key));a&&(t[n]=a.entity_id)}let e=t.wake?[{widget:"history",place:"body",roles:t,lists:{}}]:[],i=new Set(Object.values(t));return{widgets:e,sections:pe(de.diagnostics,r.filter(n=>!i.has(n.entity_id)))}}function mr(s,r){let t=e=>Number.parseInt(e.key.match(/_(\d+)$/)?.[1]??"0",10);return t(s)-t(r)}function pe(s,r){let t=new Set(r),e=[];for(let i of s??[]){let n=[];for(let o of i.rows)for(let a of[...t].sort(mr))o.test(a.key)&&(n.push(a.entity_id),t.delete(a));n.length&&e.push({title:i.title,entities:n})}return t.size&&e.push({title:e.length?"More":null,entities:[...t].sort((i,n)=>i.label.localeCompare(n.label)).map(i=>i.entity_id)}),e}var Bi="EchoLocal",Ii="esphome",_t=12;function Ki(s){return!!s?.identifiers?.some(([r])=>r===Ii)}function gr(s,r){return Object.values(s.devices??{}).filter(t=>t.via_device_id===r&&!t.disabled_by).sort((t,e)=>_(t).localeCompare(_(e)))}function H(s){return s?Object.values(s.devices??{}).filter(r=>Gi(s,r.id)&&!r.via_device_id&&!r.disabled_by).sort((r,t)=>_(r).localeCompare(_(t))):[]}function _(s){return s?.name_by_user||s?.name||""}function Gi(s,r){return s?.devices?.[r]?.manufacturer!==Bi?!1:gr(s,r).some(Ki)}function K(s,r){if(!s||!r)return null;let t=s.devices?.[r];if(!t)return null;let e=gr(s,r),i=new Set([r,...e.map(p=>p.id)]),n=Ve(s,Object.values(s.entities??{}).filter(p=>p.device_id&&i.has(p.device_id)&&!p.hidden)),o=p=>n.find(u=>p.test(u.key))?.entity_id,a=new Array(_t).fill(void 0);for(let p of n){let u=Number(p.key.match(l.segment)?.[1]??0)-1;u>=0&&u<_t&&(a[u]=p.entity_id)}return{device:t,parts:e,entities:n,satellite:n.find(p=>p.key==="assist_satellite")?.entity_id,player:o(l.player),update:o(l.firmware),ring:o(l.ring),segments:a,mute:o(l.mute)}}function fr(s,r){let t=e=>s.entities.some(i=>i.device_id===r.id&&e.test(i.key));return t(l.ring)||t(l.segment)?"ring":t(l.mute)||t(l.gain)?"microphone":t(l.noise)||t(l.headphones)?"playback":"assistant"}function vr(s,r){return s.entities.filter(t=>t.device_id===r)}function br(s){return s.entities.filter(r=>l.wake.test(r.key)).sort((r,t)=>r.key.localeCompare(t.key)).map(r=>r.entity_id)}function St(s,r){let t=r?s?.states?.[r]:void 0;return!t||t.state!=="on"?null:{rgb:t.attributes.rgb_color??[255,255,255],level:(t.attributes.brightness??255)/255}}function yr(s,r){return!!r&&s?.states?.[r]?.state==="on"}function xr(s,r){return(r?s?.states?.[r]?.state:void 0)??"unavailable"}async function wr(s,r){let t=new Array(_t).fill(void 0);if(!s.user?.is_admin)return t;try{let e=await s.callWS({type:"config/entity_registry/list"});for(let i of e){if(!i.disabled_by||!i.device_id||!r.has(i.device_id))continue;let n=i.unique_id.replace(/^(?:[0-9a-f]{2}:){5}[0-9a-f]{2}-?/i,"").split("@")[0],o=Number(n.match(l.segment)?.[1]??0)-1;o>=0&&o<_t&&(t[o]=i.entity_id)}}catch{}return t}async function $r(s,r){await s.callWS({type:"config/entity_registry/update",entity_id:r,disabled_by:null})}var kr=[["White",[255,255,255]],["Warm",[255,190,120]],["Red",[255,40,40]],["Orange",[255,130,20]],["Yellow",[250,230,60]],["Green",[60,220,90]],["Teal",[40,220,200]],["Blue",[60,140,255]],["Violet",[150,90,255]],["Pink",[255,90,200]]];var ht={ring:"mdi:record-circle-outline",microphone:"mdi:microphone",playback:"mdi:speaker",assistant:"mdi:account-voice",device:"mdi:cog-outline",diagnostics:"mdi:stethoscope",follow:"mdi:backup-restore",close:"mdi:check"},Yi={idle:"Idle",listening:"Listening",processing:"Thinking",responding:"Speaking",unavailable:"Unavailable",unknown:"Unknown"},P=class extends b{constructor(){super(...arguments);this.opened=null;this.picked=null;this.holding=!1;this.timer=0;this.hiddenSegments=[];this.offering=null;this.asked=!1}static getConfigElement(){return document.createElement("echolocal-satellite-card-editor")}static getStubConfig(t){return{device_id:H(t)[0]?.id??""}}setConfig(t){if(!t?.device_id)throw new Error("Choose an EchoLocal device");this.config={shell:"grey",...t}}getCardSize(){return 6}updated(){if(this.asked||!this.hass||!this.config)return;let t=K(this.hass,this.config.device_id);!t||t.segments.some(Boolean)||(this.asked=!0,wr(this.hass,new Set([t.device.id,...t.parts.map(e=>e.id)])).then(e=>this.hiddenSegments=e))}render(){if(!this.hass||!this.config)return h;let t=K(this.hass,this.config.device_id);if(!t)return c`<ha-card><div class="missing">Device not found</div></ha-card>`;let e=xr(this.hass,t.satellite);return c`
      <ha-card>
        <div class="frame">
          <div class="art" data-shell=${this.config.shell??"grey"} data-activity=${e}>
            ${We({segments:this.segments(t),glow:this.glow(t),muted:yr(this.hass,t.mute),holding:this.holding,picked:this.picked,divisible:[...t.segments,...this.hiddenSegments].some(Boolean)},{ring:()=>this.moreInfo(t.ring),segment:i=>this.tapped(t,i),action:i=>this.pressed(t,i),mute:()=>this.toggle("switch",t.mute),volume:i=>this.volume(t,i)})}
          </div>

          <div class="side">${this.side(t)}</div>

          ${this.offering!==null?this.offer(this.offering):this.picked===null?this.foot(t,e):this.palette(t)}
        </div>
      </ha-card>

      ${this.popup(t)}
    `}foot(t,e){return c`<div class="foot">
      <div class="label">
        <div class="name">${_(t.device)}</div>
        <div class="status">${Yi[e]??e}</div>
      </div>
      <div class="tail">
        ${this.square(ht.device,"Settings",()=>this.open({kind:"device",cross:"settings"}))}
        ${this.square(ht.diagnostics,"Diagnostics",()=>this.open({kind:"diagnostics",cross:"diagnostics"}))}
      </div>
    </div>`}tapped(t,e){if(t.segments[e]){this.picked=this.picked===e?null:e;return}if(this.hiddenSegments[e]){this.offering=e;return}this.moreInfo(t.ring)}offer(t){let e=async i=>{for(let n of i)n&&await $r(this.hass,n);this.hiddenSegments=this.hiddenSegments.map(n=>i.includes(n)?void 0:n),this.offering=null,this.picked=t};return c`<div class="foot">
      <div class="label">
        <div class="name">Segment ${t+1} disabled</div>
      </div>
      <div class="tail">
        <button class="plain" @click=${()=>e([this.hiddenSegments[t]])}>Enable</button>
        <button class="plain" @click=${()=>e(this.hiddenSegments)}>Enable all</button>
        <button class="plain quiet" @click=${()=>this.offering=null}>Cancel</button>
      </div>
    </div>`}palette(t){let e=t.segments[this.picked];return c`<div class="foot palette">
      <div class="top">
        <div class="name">Segment ${this.picked+1}</div>
        <div class="tail">
          ${this.square(ht.follow,"Follow the ring",()=>{this.hass.callService("light","turn_off",{entity_id:e}),this.picked=null})}
          ${this.square(ht.close,"Done",()=>this.picked=null)}
        </div>
      </div>
      <div class="swatches">
        ${kr.map(([i,n])=>c`<button
            class="swatch"
            title=${i}
            aria-label=${i}
            style=${`background:rgb(${n.join(",")})`}
            @click=${()=>this.hass.callService("light","turn_on",{entity_id:e,rgb_color:n})}
          ></button>`)}
      </div>
    </div>`}segments(t){let e=St(this.hass,t.ring);return Array.from({length:$t},(i,n)=>{let o=St(this.hass,t.segments[n])??e;return{fill:o?`rgb(${o.rgb.join(",")})`:"var(--el-ring-off)",opacity:o?.25+.75*o.level:1}})}glow(t){return St(this.hass,t.ring)||t.segments.some(i=>St(this.hass,i))?.55:0}side(t){let e=t.parts.map(o=>fr(t,o)),i=e.filter(o=>o==="assistant").length,n=0;return t.parts.map((o,a)=>{let p=e[a],u=p==="assistant"?++n:void 0,g=p==="assistant"&&i>1?u:null;return this.square(ht[p],_(o),()=>this.open({kind:p,part:o,slot:u}),g)})}square(t,e,i,n=null){return c`<button class="sq" title=${e} aria-label=${e} @click=${i}>
      <ha-icon .icon=${t}></ha-icon>
      ${n?c`<span class="badge">${n}</span>`:h}
    </button>`}popup(t){if(!this.opened)return h;let{kind:e,part:i,cross:n}=this.opened,o,a=[],p,u=[_(t.device)];if(n==="settings")o=hr(t),p="Settings";else if(n==="diagnostics")({widgets:a,sections:o}=ur(t)),p="Diagnostics";else if(i)({widgets:a,sections:o}=pr(e,vr(t,i.id))),p=_(i),u.push(p);else return h;return c`<echolocal-dialog
      .hass=${this.hass}
      .heading=${p}
      .subtitle=${_(t.device)}
      .icon=${ht[e]}
      .sections=${o}
      .widgets=${a}
      .strip=${u}
      .device=${_(t.device)}
      .mac=${t.device.connections?.find(([g])=>g==="mac")?.[1]??""}
      .help=${this.config.help!==!1}
      .about=${Ze(e)}
      @closed=${()=>this.opened=null}
    ></echolocal-dialog>`}open(t){this.opened=t}pressed(t,e){if(e==="down"){this.holding=!1,this.timer=window.setTimeout(()=>this.holding=!0,De);return}clearTimeout(this.timer);let i=this.holding;if(this.holding=!1,e==="cancel")return;let n=br(t),o=n[i&&n.length>1?1:0];o?this.hass.callService("button","press",{entity_id:o}):this.moreInfo(t.satellite)}toggle(t,e){e&&this.hass.callService(t,"toggle",{entity_id:e})}volume(t,e){t.player&&this.hass.callService("media_player",e>0?"volume_up":"volume_down",{entity_id:t.player})}moreInfo(t){t&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}};P.styles=y(Fe),d([m({attribute:!1})],P.prototype,"hass",2),d([f()],P.prototype,"config",2),d([f()],P.prototype,"opened",2),d([f()],P.prototype,"picked",2),d([f()],P.prototype,"holding",2),d([f()],P.prototype,"hiddenSegments",2),d([f()],P.prototype,"offering",2),P=d([x("echolocal-satellite-card")],P);var ut=class extends b{setConfig(r){this.config={shell:"grey",...r}}render(){if(!this.hass||!this.config)return h;let r=H(this.hass);return c`
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
          ${r.map(t=>c`<option
              value=${t.id}
              ?selected=${t.id===this.config.device_id}
            >
              ${_(t)}
            </option>`)}
        </select>
      </div>
      <div class="field">
        <label>Shell</label>
        <select
          @change=${t=>this.emit({shell:t.target.value})}
        >
          ${[["grey","Grey (unknown)"],["black","Black"],["white","White"]].map(([t,e])=>c`<option value=${t} ?selected=${(this.config.shell??"grey")===t}>
                ${e}
              </option>`)}
        </select>
      </div>
    `}emit(r){this.config={...this.config,...r},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}};d([m({attribute:!1})],ut.prototype,"hass",2),d([f()],ut.prototype,"config",2),ut=d([x("echolocal-satellite-card-editor")],ut);var he=[];function W(s){he.push(s),he.sort((r,t)=>r.order-t.order||r.title.localeCompare(t.title))}function me(s){return he.filter(r=>s||!r.admin)}function _r(s,r){let t=ue(s),e=me(r);return e.find(i=>i.path===t)??e[0]}function Sr(s,r){let t=r?`${s}/${r}`:s;location.pathname!==t&&history.pushState(null,"",t),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}function ge(s,r){if(r!==void 0)return ue(r);let t=location.pathname;return ue(t.startsWith(s)?t.slice(s.length):"")}function ue(s){return s.replace(/^\/+|\/+$/g,"")}var Ar=`:host {
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
`;var fe="";async function qt(s){try{return await s.callWS({type:"config/label_registry/list"})??[]}catch{return[]}}function Bt(s,r){let t=new Map,e=[];for(let n of s){let o=n.labels??[];if(!o.length){e.push(n);continue}for(let a of o){let p=r.find(g=>g.label_id===a),u=t.get(a);u?u.devices.push(n):t.set(a,{id:a,name:p?.name??a,icon:p?.icon,devices:[n]})}}let i=[...t.values()].sort((n,o)=>n.name.localeCompare(o.name));return e.length&&i.push({id:fe,name:"Ungrouped",devices:e}),i}async function Cr(s,r){try{return await s.callWS({type:"config/label_registry/create",name:r})}catch{return null}}async function Tr(s,r,t){await s.callWS({type:"config/label_registry/update",label_id:r,name:t})}async function Mr(s,r){await s.callWS({type:"config/label_registry/delete",label_id:r})}async function Hr(s,r,t){await s.callWS({type:"config/device_registry/update",device_id:r,labels:[...new Set(t)]})}async function Er(s,r,t,e){let i=0,n=0,o=0;return await Promise.all(r.map(async a=>{let p=Rr(s,a,t);if(!p){o+=1;return}try{await e(p),i+=1}catch{n+=1}})),{done:i,failed:n,missing:o}}function It(s,r,t){let e=r.map(n=>Rr(s,n,t)).filter(n=>!!n),i=[...new Set(e.map(n=>s.states[n]?.state).filter(Boolean))];return{value:i.length===1?i[0]:null,mixed:i.length>1,entities:e}}function Rr(s,r,t){let e=K(s,r.id);if(e)return e.entities.find(i=>t.test(i.key))?.entity_id}var Pr=`:host {
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
`;var zr=l.mute,Or=l.ring,Nr=l.player,Z=class extends b{constructor(){super(...arguments);this.said=""}render(){if(!this.hass||!this.group)return h;let t=this.group.devices,e=It(this.hass,t,zr),i=It(this.hass,t,Or);return c`<div class="bar">
      ${this.group.icon?c`<ha-icon .icon=${this.group.icon}></ha-icon>`:h}
      <div class="name">${this.group.name}</div>
      <div class="count">${t.length} ${t.length===1?"device":"devices"}</div>
      <div class="spacer"></div>
      ${this.said?c`<div class="short">${this.said}</div>`:h}

      ${e.entities.length?this.toggle("mdi:microphone-off","Mute all",e,()=>this.write(zr,"switch",e.value==="on"?"turn_off":"turn_on")):h}
      ${i.entities.length?this.toggle("mdi:lightbulb-outline","Ring",i,()=>this.write(Or,"light",i.value==="on"?"turn_off":"turn_on")):h}
      ${this.has(Nr)?c`<button title="Stop whatever is playing" @click=${()=>this.write(Nr,"media_player","media_stop")}>
            <ha-icon icon="mdi:stop"></ha-icon>Stop
          </button>`:h}
    </div>`}toggle(t,e,i,n){return c`<button data-on=${String(i.value==="on")} @click=${n}>
      <ha-icon .icon=${t}></ha-icon>${e}
      ${i.mixed?c`<span class="mixed">mixed</span>`:h}
    </button>`}has(t){return It(this.hass,this.group.devices,t).entities.length>0}async write(t,e,i){let{done:n,failed:o,missing:a}=await Er(this.hass,this.group.devices,t,u=>this.hass.callService(e,i,{entity_id:u})),p=o+a;this.said=p?`${n} of ${n+p}`:"",this.said&&setTimeout(()=>this.said="",4e3)}};Z.styles=y(Pr),d([m({attribute:!1})],Z.prototype,"hass",2),d([m({attribute:!1})],Z.prototype,"group",2),d([f()],Z.prototype,"said",2),Z=d([x("echolocal-groupbar")],Z);var Ur=`:host {
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
`;W({path:"",title:"Home",icon:"mdi:view-grid-outline",element:"echolocal-home",order:0});var Dr="echolocal:home:grouped",F=class extends b{constructor(){super(...arguments);this.narrow=!1;this.known=[];this.asked=!1;this.grouped=localStorage.getItem(Dr)!=="no";this.cards=new Map}updated(){this.asked||!this.hass||(this.asked=!0,this.load())}render(){if(!this.hass)return h;let t=H(this.hass);if(!t.length)return c`<div class="empty">
        No EchoLocal devices yet. One appears here once Home Assistant has adopted it over the ESPHome
        integration.
      </div>`;let e=Bt(t,this.known),i=e.some(o=>o.id!==fe),n=this.grouped&&i?e:[{id:"all",name:"All devices",devices:t}];return c`
      ${i?c`<div class="view">
            <div class="pair">
              ${this.button(!0,"mdi:group","Grouped")}${this.button(!1,"mdi:view-grid-outline","All")}
            </div>
          </div>`:h}
      ${n.map(o=>this.group(o))}
    `}button(t,e,i){return c`<button
      data-on=${String(this.grouped===t)}
      @click=${()=>{this.grouped=t,localStorage.setItem(Dr,t?"yes":"no")}}
    >
      <ha-icon .icon=${e}></ha-icon>${i}
    </button>`}group(t){return c`<div class="group">
      <echolocal-groupbar .hass=${this.hass} .group=${t}></echolocal-groupbar>
      <div class="grid">${t.devices.map(e=>this.card(t.id,e.id))}</div>
    </div>`}card(t,e){let i=`${t}/${e}`,n=this.cards.get(i);return n||(n=document.createElement("echolocal-satellite-card"),n.setConfig({device_id:e}),this.cards.set(i,n)),n.hass=this.hass,n}async load(){this.known=await qt(this.hass)}};F.styles=y(Ur),d([m({attribute:!1})],F.prototype,"hass",2),d([m({type:Boolean})],F.prototype,"narrow",2),d([f()],F.prototype,"known",2),d([f()],F.prototype,"asked",2),d([f()],F.prototype,"grouped",2),F=d([x("echolocal-home")],F);var Wr=`:host {
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
`;W({path:"groups",title:"Groups",icon:"mdi:group",element:"echolocal-groups",order:30,admin:!0});var j=class extends b{constructor(){super(...arguments);this.known=[];this.asked=!1;this.naming="";this.busy=!1}connectedCallback(){super.connectedCallback(),this.hass?.connection?.subscribeEvents(()=>this.load(),"label_registry_updated").then(t=>this.stop=t).catch(()=>{})}disconnectedCallback(){super.disconnectedCallback(),this.stop?.()}updated(){this.asked||!this.hass||(this.asked=!0,this.load())}render(){if(!this.hass)return h;let t=H(this.hass),e=this.known;return c`
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

      ${t.length?c`<table>
            <thead>
              <tr>
                <th class="who">Device</th>
                ${e.map(i=>this.head(i))}
              </tr>
            </thead>
            <tbody>
              ${t.map(i=>this.row(i,e))}
            </tbody>
          </table>`:c`<div class="none">
            No EchoLocal devices yet, so there is nothing to group.
          </div>`}
    `}head(t){let e=Bt(H(this.hass),this.known).find(i=>i.id===t.label_id)?.devices.length;return c`<th>
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
    </th>`}row(t,e){let i=t.labels??[];return c`<tr>
      <td class="who">${_(t)}</td>
      ${e.map(n=>c`<td>
          <input
            type="checkbox"
            aria-label="${_(t)} in ${n.name}"
            .checked=${i.includes(n.label_id)}
            @change=${o=>this.set(t,n.label_id,o.target.checked)}
          />
        </td>`)}
    </tr>`}async make(){let t=this.naming.trim();if(!t||this.busy)return;this.busy=!0,this.naming="";let e=await Cr(this.hass,t);e&&(this.known=[...this.known,e].sort((i,n)=>i.name.localeCompare(n.name))),this.busy=!1,e||await this.load()}async rename(t,e){!e.trim()||e===t.name||(this.known=this.known.map(i=>i.label_id===t.label_id?{...i,name:e.trim()}:i),await Tr(this.hass,t.label_id,e.trim()))}async discard(t){this.known=this.known.filter(e=>e.label_id!==t.label_id),await Mr(this.hass,t.label_id)}async set(t,e,i){let n=new Set(t.labels??[]);i?n.add(e):n.delete(e),await Hr(this.hass,t.id,[...n])}async load(){this.known=await qt(this.hass)}};j.styles=y(Wr),d([m({attribute:!1})],j.prototype,"hass",2),d([f()],j.prototype,"known",2),d([f()],j.prototype,"asked",2),d([f()],j.prototype,"naming",2),d([f()],j.prototype,"busy",2),j=d([x("echolocal-groups")],j);var Fr=`:host {
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
`;W({path:"activity",title:"Activity",icon:"mdi:timeline-text-outline",element:"echolocal-activity",order:20});var Qi=60,G=class extends b{constructor(){super(...arguments);this.seen=[];this.only="";this.asked=!1}updated(){this.asked||!this.hass||(this.asked=!0,this.listen())}disconnectedCallback(){super.disconnectedCallback(),this.stop?.()}render(){if(!this.hass)return h;let t=this.names(),e=this.only?this.seen.filter(n=>n.turn.mac===this.only):this.seen,i=Math.max(1,...e.map(n=>lt(n.turn)));return c`
      ${this.seen.length>0&&Object.keys(t).length>1?c`<div class="filters">
            <button data-on=${String(!this.only)} @click=${()=>this.only=""}>Everything</button>
            ${[...new Set(this.seen.map(n=>n.turn.mac))].map(n=>c`<button
                data-on=${String(this.only===n)}
                @click=${()=>this.only=n}
              >
                ${t[n]??n}
              </button>`)}
          </div>`:h}

      ${e.length?c`<div class="legend">
              ${[["wake_ms","Wake"],["listen_ms","Listen"],["think_ms","Think"],["speak_ms","Reply"]].map(([n,o])=>c`<span class="key"
                  ><span class="dot slice" data-phase=${n}></span>${o}</span
                >`)}
            </div>
            <div class="turns">${e.map(n=>this.row(n,t,i))}</div>`:c`<div class="none">
            Nothing yet. Turns appear here as they happen, across every device — the timings come from the
            device rather than from the recorder, so there is no past to load.
          </div>`}
    `}row(t,e,i){let n=kt(t.turn),o=lt(t.turn),a=t.turn.outcome!=="completed",p=e[t.turn.mac]??"elsewhere";return c`<div class="turn">
      <div class="when">${es(t.at)}</div>
      <div class="who">${p}</div>
      <div class="said">${t.turn.heard||t.turn.wake_word}</div>
      <div class="right">
        <div class="took" data-bad=${String(a)}>
          ${a?t.turn.outcome:`${(o/1e3).toFixed(1)}s`}
        </div>
        ${t.turn.audio_seconds?c`<echolocal-recording
              .hass=${this.hass}
              .device=${p}
              .turn=${t.turn.id}
              .filename=${ts(t,p)}
            ></echolocal-recording>`:h}
      </div>
      ${n.length?c`<div class="bar">
            ${n.map(u=>c`<div
                class="slice"
                data-phase=${u.key}
                title=${`${u.label} ${u.ms} ms`}
                style=${`flex:0 0 ${u.ms/i*100}%`}
              ></div>`)}
          </div>`:h}
    </div>`}names(){let t={};for(let e of H(this.hass)){let i=e.connections?.find(([n])=>n==="mac")?.[1];i&&(t[i.toLowerCase()]=_(e))}return t}async listen(){if(this.hass.connection)try{this.stop=await this.hass.connection.subscribeEvents(t=>{let e=Wt(t.data);e&&(this.seen=[{at:Date.now(),turn:e},...this.seen].slice(0,Qi))},Dt)}catch{}}};G.styles=y(Fr),d([m({attribute:!1})],G.prototype,"hass",2),d([f()],G.prototype,"seen",2),d([f()],G.prototype,"only",2),d([f()],G.prototype,"asked",2),G=d([x("echolocal-activity")],G);function ts(s,r){let t=new Date(s.at).toISOString().replace(/[:.]/g,"-").slice(0,19),e=i=>i.toLowerCase().replace(/[^a-z0-9]+/g,"-");return`${t}-${e(r)}-${e(s.turn.wake_word)}.wav`}function es(s){return new Date(s).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}var jr=`:host {
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
`;W({path:"health",title:"Health",icon:"mdi:heart-pulse",element:"echolocal-health",order:40});var ve=[{title:"Version",match:/_(?:current_version|installed_version)$/},{title:"Update",match:/^update\./,show:s=>s==="on"?"waiting":s==="off"?"current":s,wrong:s=>s==="on"?"warn":void 0},{title:"Wifi",match:/_wifi_signal$/,show:(s,r)=>`${Math.round(Number(s))} ${r||"dBm"}`,wrong:s=>Number(s)<-80?"bad":Number(s)<-70?"warn":void 0},{title:"CPU",match:/_cpu_temperature$/,show:(s,r)=>`${Math.round(Number(s))}${r||"\xB0C"}`,wrong:s=>Number(s)>80?"bad":Number(s)>70?"warn":void 0},{title:"Load",match:/_load_average$/,show:s=>Number(s).toFixed(2)},{title:"Memory",match:/_memory_available$/,show:(s,r)=>`${Math.round(Number(s))} ${r||"MB"}`,wrong:s=>Number(s)<40?"bad":Number(s)<80?"warn":void 0},{title:"Disk",match:/_free_space$/,show:(s,r)=>`${Math.round(Number(s))} ${r||"MB"}`,wrong:s=>Number(s)<50?"bad":Number(s)<150?"warn":void 0},{title:"Address",match:/_ip_address$/}],J=class extends b{constructor(){super(...arguments);this.by="";this.down=!1}render(){if(!this.hass)return h;let t=H(this.hass);if(!t.length)return c`<div class="none">No EchoLocal devices yet.</div>`;let e=t.map(n=>this.read(n)),i=this.sort(e);return c`<div class="scroll">
      <table>
        <thead>
          <tr>
            ${this.head("Device")}${ve.map(n=>this.head(n.title))}
          </tr>
        </thead>
        <tbody>
          ${i.map(n=>c`<tr data-off=${String(!n.up)}>
              <td class="who">
                <button @click=${()=>this.open(n.device)}>${n.name}</button>
              </td>
              ${ve.map(o=>{let a=n.cells[o.title];return c`<td data-wrong=${a?.wrong??""}>${a?.text??"\u2014"}</td>`})}
            </tr>`)}
        </tbody>
      </table>
    </div>`}head(t){return c`<th
      data-by=${String(this.by===t)}
      @click=${()=>{this.down=this.by===t?!this.down:!1,this.by=t}}
    >
      ${t}
    </th>`}read(t){let i=(K(this.hass,t.id)?.entities??[]).map(a=>a.entity_id),n={},o=!1;for(let a of ve){let p=i.find($=>a.match.test($)),u=p?this.hass.states[p]:void 0;if(!u)continue;let g=u.state;if(g==="unavailable"||g==="unknown")continue;o=!0;let v=u.attributes.unit_of_measurement??"",w=Number(g);n[a.title]={text:a.show?a.show(g,v):v?`${g} ${v}`:g,sort:Number.isFinite(w)&&g!==""?w:g,wrong:a.wrong?.(Number.isFinite(w)?w:g)}}return{device:t,name:_(t),cells:n,up:o}}sort(t){if(!this.by)return t;let e=i=>this.by==="Device"?i.name:i.cells[this.by]?.sort??"";return[...t].sort((i,n)=>{let o=e(i),a=e(n),p=typeof o=="number"&&typeof a=="number"?o-a:String(o).localeCompare(String(a));return this.down?-p:p})}open(t){history.pushState(null,"",`/config/devices/device/${t.id}`),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}};J.styles=y(jr),d([m({attribute:!1})],J.prototype,"hass",2),d([f()],J.prototype,"by",2),d([f()],J.prototype,"down",2),J=d([x("echolocal-health")],J);var qr=`:host {
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
`;async function be(s){try{return(await s.callWS({type:"echolocal/wake_words/list"}))?.wake_words??[]}catch{return[]}}var N=class extends b{constructor(){super(...arguments);this.words=[];this.over=!1;this.busy=!1;this.said="";this.asked=!1;this.dropped=t=>{t.preventDefault(),this.over=!1,this.add(t.dataTransfer?.files??null)}}updated(){this.asked||!this.hass||(this.asked=!0,this.refresh())}render(){return c`
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

      ${this.words.length?c`<div class="list">${this.words.map(t=>this.row(t))}</div>`:c`<div class="none">
            Nothing in custom_wake_words yet. Whatever the firmware ships with is unaffected.
          </div>`}
    `}row(t){let e=[t.type||"no type",t.size?`${Math.round(t.size/1024)} KB`:"no model",...t.trained_languages.length?[t.trained_languages.join(", ")]:[]];return c`<div class="word" data-bad=${String(t.problems.length>0)}>
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
      ${t.problems.length?c`<div class="wrong">${t.problems.join(". ")}.</div>`:h}
    </div>`}async add(t){let e=[...t??[]].filter(i=>i.name.endsWith(".tflite"));if(!e.length){this.said="A wake model is a .tflite file.";return}this.busy=!0,this.said="";for(let i of e){let n=new FormData;n.append("file",i);try{let o=await fetch("/api/echolocal/wake_words",{method:"POST",body:n,headers:this.credentials()});if(!o.ok){let a=await o.json().catch(()=>({}));this.said=a.error??`Home Assistant refused ${i.name}.`;break}}catch(o){this.said=`That did not reach Home Assistant: ${o}`;break}}this.busy=!1,await this.refresh()}async rename(t,e){e!==t.wake_word&&(await this.hass.callWS({type:"echolocal/wake_words/update",wake_word_id:t.id,wake_word:e}),await this.refresh())}async discard(t){await this.hass.callWS({type:"echolocal/wake_words/delete",wake_word_id:t.id}),await this.refresh()}async refresh(){this.words=await be(this.hass)}credentials(){let t=this.hass.auth?.data?.access_token;return t?{authorization:`Bearer ${t}`}:{}}};N.styles=y(qr),d([m({attribute:!1})],N.prototype,"hass",2),d([f()],N.prototype,"words",2),d([f()],N.prototype,"over",2),d([f()],N.prototype,"busy",2),d([f()],N.prototype,"said",2),d([f()],N.prototype,"asked",2),N=d([x("echolocal-wake-words")],N);var Br=`:host {
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
`;var ns=/^wake_word(_\d+)?$/;W({path:"wake-words",title:"Wake words",icon:"mdi:waveform",element:"echolocal-words",order:10,admin:!0});var Q=class extends b{constructor(){super(...arguments);this.words=[];this.asked=!1;this.again=()=>this.requestUpdate()}connectedCallback(){super.connectedCallback(),window.addEventListener(Ut,this.again)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(Ut,this.again)}updated(){this.asked||!this.hass||(this.asked=!0,this.load())}render(){if(!this.hass)return h;let t=this.chosen(),e=new Set(this.words.filter(n=>n.problems.length&&n.wake_word).map(n=>n.wake_word)),i=this.words.filter(n=>!n.problems.length&&!t.some(o=>o.words.includes(n.wake_word)));return c`
      <h2 class="first">Listening for</h2>
      ${t.length?c`<div class="listening">
            ${t.map(n=>c`<div class="who">
                <span class="name">${n.name}</span>
                ${n.words.map(o=>c`<span
                      class="word"
                      data-gone=${String(e.has(o))}
                      title=${e.has(o)?"Its library entry is broken, so it is not offered":""}
                      >${o}</span
                    >`)}
              </div>`)}
          </div>`:c`<div class="spare">No devices have picked a wake word yet.</div>`}

      <h2>The library</h2>
      <echolocal-wake-words .hass=${this.hass}></echolocal-wake-words>

      ${i.length?c`<div class="spare">
            Unused: ${i.map(n=>n.wake_word).join(", ")} — offered to every satellite, picked
            by none of them.
          </div>`:h}
    `}chosen(){let t=nt(this.hass);return H(this.hass).map(e=>{let n=(K(this.hass,e.id)?.entities??[]).filter(o=>ns.test(t?.get(o.entity_id)?.key??"")).map(o=>this.hass.states[o.entity_id]?.state).filter(o=>!!o&&o!=="unknown"&&o!=="None");return{name:_(e),words:n}}).filter(e=>e.words.length)}async load(){this.words=await be(this.hass)}};Q.styles=y(Br),d([m({attribute:!1})],Q.prototype,"hass",2),d([f()],Q.prototype,"words",2),d([f()],Q.prototype,"asked",2),Q=d([x("echolocal-words")],Q);var q=class extends b{constructor(){super(...arguments);this.narrow=!1;this.at="";this.made=new Map;this.moved=()=>{this.at=ge(this.base(),void 0),this.requestUpdate()}}connectedCallback(){super.connectedCallback(),window.addEventListener("location-changed",this.moved),window.addEventListener("popstate",this.moved)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("location-changed",this.moved),window.removeEventListener("popstate",this.moved)}render(){if(!this.hass)return h;let t=!!this.hass.user?.is_admin,e=me(t),i=_r(this.where(),t);return c`
      <header>
        <div class="bar">${e.map(n=>this.button(n,n===i))}</div>
      </header>
      <div class="page">${i?this.body(i):h}</div>
    `}button(t,e){return c`<button
      data-here=${String(e)}
      @click=${()=>{this.at=t.path,Sr(this.base(),t.path)}}
    >
      <ha-icon .icon=${t.icon}></ha-icon><span>${t.title}</span>
    </button>`}body(t){let e=this.made.get(t.path);return e||(e=document.createElement(t.element),this.made.set(t.path,e)),e.hass=this.hass,e.narrow=this.narrow,e}where(){return this.route?ge(this.base(),this.route.path):this.at}base(){return this.route?.prefix??"/echolocal"}};q.styles=y(Ar),d([m({attribute:!1})],q.prototype,"hass",2),d([m({type:Boolean})],q.prototype,"narrow",2),d([m({attribute:!1})],q.prototype,"route",2),d([m({attribute:!1})],q.prototype,"panel",2),d([f()],q.prototype,"at",2),q=d([x("echolocal-panel")],q);window.customCards=window.customCards??[];window.customCards.some(s=>s.type==="echolocal-satellite-card")||window.customCards.push({type:"echolocal-satellite-card",name:"EchoLocal Satellite",description:"An EchoLocal satellite, drawn as itself, with its ring and mute live.",preview:!0,documentationURL:"https://github.com/ygelfand/echolocal-hacs"});
