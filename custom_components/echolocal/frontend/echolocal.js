var Bi=Object.defineProperty;var Ki=Object.getOwnPropertyDescriptor;var d=(r,i,t,e)=>{for(var s=e>1?void 0:e?Ki(i,t):i,n=r.length-1,o;n>=0;n--)(o=r[n])&&(s=(e?o(i,t,s):o(s))||s);return e&&s&&Bi(i,t,s),s};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var $t=globalThis,kt=$t.ShadowRoot&&($t.ShadyCSS===void 0||$t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,we=Symbol(),ye=new WeakMap,_t=class{constructor(i,t,e){if(this._$cssResult$=!0,e!==we)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=i,this.t=t}get styleSheet(){let i=this.o,t=this.t;if(kt&&i===void 0){let e=t!==void 0&&t.length===1;e&&(i=ye.get(t)),i===void 0&&((this.o=i=new CSSStyleSheet).replaceSync(this.cssText),e&&ye.set(t,i))}return i}toString(){return this.cssText}},b=r=>new _t(typeof r=="string"?r:r+"",void 0,we);var xe=(r,i)=>{if(kt)r.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of i){let e=document.createElement("style"),s=$t.litNonce;s!==void 0&&e.setAttribute("nonce",s),e.textContent=t.cssText,r.appendChild(e)}},Gt=kt?r=>r:r=>r instanceof CSSStyleSheet?(i=>{let t="";for(let e of i.cssRules)t+=e.cssText;return b(t)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var{is:Gi,defineProperty:Yi,getOwnPropertyDescriptor:Vi,getOwnPropertyNames:Xi,getOwnPropertySymbols:Zi,getPrototypeOf:Ji}=Object,St=globalThis,$e=St.trustedTypes,Qi=$e?$e.emptyScript:"",Li=St.reactiveElementPolyfillSupport,pt=(r,i)=>r,ht={toAttribute(r,i){switch(i){case Boolean:r=r?Qi:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,i){let t=r;switch(i){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},At=(r,i)=>!Gi(r,i),_e={attribute:!0,type:String,converter:ht,reflect:!1,useDefault:!1,hasChanged:At};Symbol.metadata??=Symbol("metadata"),St.litPropertyMetadata??=new WeakMap;var j=class extends HTMLElement{static addInitializer(i){this._$Ei(),(this.l??=[]).push(i)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(i,t=_e){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(i)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(i,t),!t.noAccessor){let e=Symbol(),s=this.getPropertyDescriptor(i,e,t);s!==void 0&&Yi(this.prototype,i,s)}}static getPropertyDescriptor(i,t,e){let{get:s,set:n}=Vi(this.prototype,i)??{get(){return this[t]},set(o){this[t]=o}};return{get:s,set(o){let l=s?.call(this);n?.call(this,o),this.requestUpdate(i,l,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(i){return this.elementProperties.get(i)??_e}static _$Ei(){if(this.hasOwnProperty(pt("elementProperties")))return;let i=Ji(this);i.finalize(),i.l!==void 0&&(this.l=[...i.l]),this.elementProperties=new Map(i.elementProperties)}static finalize(){if(this.hasOwnProperty(pt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(pt("properties"))){let t=this.properties,e=[...Xi(t),...Zi(t)];for(let s of e)this.createProperty(s,t[s])}let i=this[Symbol.metadata];if(i!==null){let t=litPropertyMetadata.get(i);if(t!==void 0)for(let[e,s]of t)this.elementProperties.set(e,s)}this._$Eh=new Map;for(let[t,e]of this.elementProperties){let s=this._$Eu(t,e);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(i){let t=[];if(Array.isArray(i)){let e=new Set(i.flat(1/0).reverse());for(let s of e)t.unshift(Gt(s))}else i!==void 0&&t.push(Gt(i));return t}static _$Eu(i,t){let e=t.attribute;return e===!1?void 0:typeof e=="string"?e:typeof i=="string"?i.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(i=>i(this))}addController(i){(this._$EO??=new Set).add(i),this.renderRoot!==void 0&&this.isConnected&&i.hostConnected?.()}removeController(i){this._$EO?.delete(i)}_$E_(){let i=new Map,t=this.constructor.elementProperties;for(let e of t.keys())this.hasOwnProperty(e)&&(i.set(e,this[e]),delete this[e]);i.size>0&&(this._$Ep=i)}createRenderRoot(){let i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return xe(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(i=>i.hostConnected?.())}enableUpdating(i){}disconnectedCallback(){this._$EO?.forEach(i=>i.hostDisconnected?.())}attributeChangedCallback(i,t,e){this._$AK(i,e)}_$ET(i,t){let e=this.constructor.elementProperties.get(i),s=this.constructor._$Eu(i,e);if(s!==void 0&&e.reflect===!0){let n=(e.converter?.toAttribute!==void 0?e.converter:ht).toAttribute(t,e.type);this._$Em=i,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(i,t){let e=this.constructor,s=e._$Eh.get(i);if(s!==void 0&&this._$Em!==s){let n=e.getPropertyOptions(s),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:ht;this._$Em=s;let l=o.fromAttribute(t,n.type);this[s]=l??this._$Ej?.get(s)??l,this._$Em=null}}requestUpdate(i,t,e,s=!1,n){if(i!==void 0){let o=this.constructor;if(s===!1&&(n=this[i]),e??=o.getPropertyOptions(i),!((e.hasChanged??At)(n,t)||e.useDefault&&e.reflect&&n===this._$Ej?.get(i)&&!this.hasAttribute(o._$Eu(i,e))))return;this.C(i,t,e)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(i,t,{useDefault:e,reflect:s,wrapped:n},o){e&&!(this._$Ej??=new Map).has(i)&&(this._$Ej.set(i,o??t??this[i]),n!==!0||o!==void 0)||(this._$AL.has(i)||(this.hasUpdated||e||(t=void 0),this._$AL.set(i,t)),s===!0&&this._$Em!==i&&(this._$Eq??=new Set).add(i))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let i=this.scheduleUpdate();return i!=null&&await i,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[s,n]of e){let{wrapped:o}=n,l=this[s];o!==!0||this._$AL.has(s)||l===void 0||this.C(s,void 0,n,l)}}let i=!1,t=this._$AL;try{i=this.shouldUpdate(t),i?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(e){throw i=!1,this._$EM(),e}i&&this._$AE(t)}willUpdate(i){}_$AE(i){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(i)),this.updated(i)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(i){return!0}update(i){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(i){}firstUpdated(i){}};j.elementStyles=[],j.shadowRootOptions={mode:"open"},j[pt("elementProperties")]=new Map,j[pt("finalized")]=new Map,Li?.({ReactiveElement:j}),(St.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Lt=globalThis,ke=r=>r,Ct=Lt.trustedTypes,Se=Ct?Ct.createPolicy("lit-html",{createHTML:r=>r}):void 0,Pe="$lit$",K=`lit$${Math.random().toFixed(9).slice(2)}$`,Re="?"+K,ts=`<${Re}>`,tt=document,mt=()=>tt.createComment(""),gt=r=>r===null||typeof r!="object"&&typeof r!="function",te=Array.isArray,es=r=>te(r)||typeof r?.[Symbol.iterator]=="function",Yt=`[ 	
\f\r]`,ut=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ae=/-->/g,Ce=/>/g,Q=RegExp(`>|${Yt}(?:([^\\s"'>=/]+)(${Yt}*=${Yt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Me=/'/g,He=/"/g,Ee=/^(?:script|style|textarea|title)$/i,ee=r=>(i,...t)=>({_$litType$:r,strings:i,values:t}),a=ee(1),w=ee(2),hr=ee(3),et=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),Te=new WeakMap,L=tt.createTreeWalker(tt,129);function ze(r,i){if(!te(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Se!==void 0?Se.createHTML(i):i}var is=(r,i)=>{let t=r.length-1,e=[],s,n=i===2?"<svg>":i===3?"<math>":"",o=ut;for(let l=0;l<t;l++){let c=r[l],h,g,f=-1,x=0;for(;x<c.length&&(o.lastIndex=x,g=o.exec(c),g!==null);)x=o.lastIndex,o===ut?g[1]==="!--"?o=Ae:g[1]!==void 0?o=Ce:g[2]!==void 0?(Ee.test(g[2])&&(s=RegExp("</"+g[2],"g")),o=Q):g[3]!==void 0&&(o=Q):o===Q?g[0]===">"?(o=s??ut,f=-1):g[1]===void 0?f=-2:(f=o.lastIndex-g[2].length,h=g[1],o=g[3]===void 0?Q:g[3]==='"'?He:Me):o===He||o===Me?o=Q:o===Ae||o===Ce?o=ut:(o=Q,s=void 0);let $=o===Q&&r[l+1].startsWith("/>")?" ":"";n+=o===ut?c+ts:f>=0?(e.push(h),c.slice(0,f)+Pe+c.slice(f)+K+$):c+K+(f===-2?l:$)}return[ze(r,n+(r[t]||"<?>")+(i===2?"</svg>":i===3?"</math>":"")),e]},ft=class r{constructor({strings:i,_$litType$:t},e){let s;this.parts=[];let n=0,o=0,l=i.length-1,c=this.parts,[h,g]=is(i,t);if(this.el=r.createElement(h,e),L.currentNode=this.el.content,t===2||t===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(s=L.nextNode())!==null&&c.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let f of s.getAttributeNames())if(f.endsWith(Pe)){let x=g[o++],$=s.getAttribute(f).split(K),M=/([.?@])?(.*)/.exec(x);c.push({type:1,index:n,name:M[2],strings:$,ctor:M[1]==="."?Xt:M[1]==="?"?Zt:M[1]==="@"?Jt:rt}),s.removeAttribute(f)}else f.startsWith(K)&&(c.push({type:6,index:n}),s.removeAttribute(f));if(Ee.test(s.tagName)){let f=s.textContent.split(K),x=f.length-1;if(x>0){s.textContent=Ct?Ct.emptyScript:"";for(let $=0;$<x;$++)s.append(f[$],mt()),L.nextNode(),c.push({type:2,index:++n});s.append(f[x],mt())}}}else if(s.nodeType===8)if(s.data===Re)c.push({type:2,index:n});else{let f=-1;for(;(f=s.data.indexOf(K,f+1))!==-1;)c.push({type:7,index:n}),f+=K.length-1}n++}}static createElement(i,t){let e=tt.createElement("template");return e.innerHTML=i,e}};function st(r,i,t=r,e){if(i===et)return i;let s=e!==void 0?t._$Co?.[e]:t._$Cl,n=gt(i)?void 0:i._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),n===void 0?s=void 0:(s=new n(r),s._$AT(r,t,e)),e!==void 0?(t._$Co??=[])[e]=s:t._$Cl=s),s!==void 0&&(i=st(r,s._$AS(r,i.values),s,e)),i}var Vt=class{constructor(i,t){this._$AV=[],this._$AN=void 0,this._$AD=i,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(i){let{el:{content:t},parts:e}=this._$AD,s=(i?.creationScope??tt).importNode(t,!0);L.currentNode=s;let n=L.nextNode(),o=0,l=0,c=e[0];for(;c!==void 0;){if(o===c.index){let h;c.type===2?h=new vt(n,n.nextSibling,this,i):c.type===1?h=new c.ctor(n,c.name,c.strings,this,i):c.type===6&&(h=new Qt(n,this,i)),this._$AV.push(h),c=e[++l]}o!==c?.index&&(n=L.nextNode(),o++)}return L.currentNode=tt,s}p(i){let t=0;for(let e of this._$AV)e!==void 0&&(e.strings!==void 0?(e._$AI(i,e,t),t+=e.strings.length-2):e._$AI(i[t])),t++}},vt=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(i,t,e,s){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=i,this._$AB=t,this._$AM=e,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let i=this._$AA.parentNode,t=this._$AM;return t!==void 0&&i?.nodeType===11&&(i=t.parentNode),i}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(i,t=this){i=st(this,i,t),gt(i)?i===p||i==null||i===""?(this._$AH!==p&&this._$AR(),this._$AH=p):i!==this._$AH&&i!==et&&this._(i):i._$litType$!==void 0?this.$(i):i.nodeType!==void 0?this.T(i):es(i)?this.k(i):this._(i)}O(i){return this._$AA.parentNode.insertBefore(i,this._$AB)}T(i){this._$AH!==i&&(this._$AR(),this._$AH=this.O(i))}_(i){this._$AH!==p&&gt(this._$AH)?this._$AA.nextSibling.data=i:this.T(tt.createTextNode(i)),this._$AH=i}$(i){let{values:t,_$litType$:e}=i,s=typeof e=="number"?this._$AC(i):(e.el===void 0&&(e.el=ft.createElement(ze(e.h,e.h[0]),this.options)),e);if(this._$AH?._$AD===s)this._$AH.p(t);else{let n=new Vt(s,this),o=n.u(this.options);n.p(t),this.T(o),this._$AH=n}}_$AC(i){let t=Te.get(i.strings);return t===void 0&&Te.set(i.strings,t=new ft(i)),t}k(i){te(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,e,s=0;for(let n of i)s===t.length?t.push(e=new r(this.O(mt()),this.O(mt()),this,this.options)):e=t[s],e._$AI(n),s++;s<t.length&&(this._$AR(e&&e._$AB.nextSibling,s),t.length=s)}_$AR(i=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);i!==this._$AB;){let e=ke(i).nextSibling;ke(i).remove(),i=e}}setConnected(i){this._$AM===void 0&&(this._$Cv=i,this._$AP?.(i))}},rt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(i,t,e,s,n){this.type=1,this._$AH=p,this._$AN=void 0,this.element=i,this.name=t,this._$AM=s,this.options=n,e.length>2||e[0]!==""||e[1]!==""?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=p}_$AI(i,t=this,e,s){let n=this.strings,o=!1;if(n===void 0)i=st(this,i,t,0),o=!gt(i)||i!==this._$AH&&i!==et,o&&(this._$AH=i);else{let l=i,c,h;for(i=n[0],c=0;c<n.length-1;c++)h=st(this,l[e+c],t,c),h===et&&(h=this._$AH[c]),o||=!gt(h)||h!==this._$AH[c],h===p?i=p:i!==p&&(i+=(h??"")+n[c+1]),this._$AH[c]=h}o&&!s&&this.j(i)}j(i){i===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,i??"")}},Xt=class extends rt{constructor(){super(...arguments),this.type=3}j(i){this.element[this.name]=i===p?void 0:i}},Zt=class extends rt{constructor(){super(...arguments),this.type=4}j(i){this.element.toggleAttribute(this.name,!!i&&i!==p)}},Jt=class extends rt{constructor(i,t,e,s,n){super(i,t,e,s,n),this.type=5}_$AI(i,t=this){if((i=st(this,i,t,0)??p)===et)return;let e=this._$AH,s=i===p&&e!==p||i.capture!==e.capture||i.once!==e.once||i.passive!==e.passive,n=i!==p&&(e===p||s);s&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,i),this._$AH=i}handleEvent(i){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,i):this._$AH.handleEvent(i)}},Qt=class{constructor(i,t,e){this.element=i,this.type=6,this._$AN=void 0,this._$AM=t,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(i){st(this,i)}};var ss=Lt.litHtmlPolyfillSupport;ss?.(ft,vt),(Lt.litHtmlVersions??=[]).push("3.3.3");var Oe=(r,i,t)=>{let e=t?.renderBefore??i,s=e._$litPart$;if(s===void 0){let n=t?.renderBefore??null;e._$litPart$=s=new vt(i.insertBefore(mt(),n),n,void 0,t??{})}return s._$AI(r),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ie=globalThis,v=class extends j{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let i=super.createRenderRoot();return this.renderOptions.renderBefore??=i.firstChild,i}update(i){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(i),this._$Do=Oe(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return et}};v._$litElement$=!0,v.finalized=!0,ie.litElementHydrateSupport?.({LitElement:v});var rs=ie.litElementPolyfillSupport;rs?.({LitElement:v});(ie.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var y=r=>(i,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(r,i)}):customElements.define(r,i)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ns={attribute:!0,type:String,converter:ht,reflect:!1,hasChanged:At},os=(r=ns,i,t)=>{let{kind:e,metadata:s}=t,n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),e==="setter"&&((r=Object.create(r)).wrapped=!0),n.set(t.name,r),e==="accessor"){let{name:o}=t;return{set(l){let c=i.get.call(this);i.set.call(this,l),this.requestUpdate(o,c,r,!0,l)},init(l){return l!==void 0&&this.C(o,void 0,r,l),l}}}if(e==="setter"){let{name:o}=t;return function(l){let c=this[o];i.call(this,l),this.requestUpdate(o,c,r,!0,l)}}throw Error("Unsupported decorator location: "+e)};function u(r){return(i,t)=>typeof t=="object"?os(r,i,t):((e,s,n)=>{let o=s.hasOwnProperty(n);return s.constructor.createProperty(n,e),o?Object.getOwnPropertyDescriptor(s,n):void 0})(r,i,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function m(r){return u({...r,state:!0,attribute:!1})}/**
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
 */var bt=12,Ne=2.2,q=100,F=100,Ie=500;function Ue(r,i){let t=Array.from({length:bt},(e,s)=>{let n=-90+360/bt*s+Ne/2,o=-90+360/bt*(s+1)-Ne/2;return cs(93,82,n,o)});return w`
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

      <circle cx=${q} cy=${F} r="97" fill="var(--el-shell)"></circle>
      <circle cx=${q} cy=${F} r="97" fill="none" stroke="var(--el-edge)" stroke-width="1"></circle>

      <g class="halo" filter="url(#blur)" style="opacity:${r.glow}">
        ${t.map((e,s)=>w`<path d=${e} style="fill:${r.segments[s].opacity?r.segments[s].fill:"transparent"}"></path>`)}
      </g>

      ${t.map((e,s)=>w`<path
          class="segment"
          data-picked=${String(r.picked===s)}
          data-divisible=${String(r.divisible)}
          d=${e}
          style="fill:${r.segments[s].fill};opacity:${r.segments[s].opacity}"
          @click=${r.divisible?()=>i.segment(s):i.ring}
        ></path>`)}

      <circle cx=${q} cy=${F} r="79" fill="url(#top)"></circle>
      <circle cx=${q} cy=${F} r="79" fill="none" stroke="var(--el-edge)" stroke-width="1"></circle>


      ${se(q,F-46,w`<path d="M-4.5 0h9M0 -4.5v9"></path>`,"Volume up",()=>i.volume(1))}
      <g
        class="btn"
        data-lit=${String(r.holding)}
        transform="translate(${q+46} ${F})"
        role="button"
        tabindex="0"
        aria-label=${r.holding?"Wake the second assistant":"Wake"}
        @pointerdown=${()=>i.action("down")}
        @pointerup=${()=>i.action("up")}
        @pointerleave=${()=>i.action("cancel")}
        @pointercancel=${()=>i.action("cancel")}
      >
        <circle class="face" cx="0" cy="0" r="13"></circle>
        <g class="glyph"><circle cx="0" cy="0" r="4.5"></circle></g>
      </g>
      ${se(q,F+46,w`<path d="M-4.5 0h9"></path>`,"Volume down",()=>i.volume(-1))}
      ${se(q-46,F,as(r.muted),r.muted?"Microphone muted":"Microphone live",i.mute,r.muted)}
    </svg>
  `}function se(r,i,t,e,s,n=!1){return w`<g class="btn" data-lit=${String(n)} transform="translate(${r} ${i})"
    role="button" tabindex="0" aria-label=${e} @click=${s}>
    <circle class="face" cx="0" cy="0" r="13"></circle>
    <g class="glyph">${t}</g>
  </g>`}function as(r){return w`
    <path d="M-2.6 -5.2a2.6 2.6 0 0 1 5.2 0v4a2.6 2.6 0 0 1-5.2 0z"></path>
    <path d="M-4.6 -0.6a4.6 4.6 0 0 0 9.2 0"></path>
    <path d="M0 3.8v2.6"></path>
    ${r?w`<path d="M-6.4 6.4L6.4 -6.4"></path>`:ls()}
  `}function ls(){return w``}function cs(r,i,t,e){let s=($,M)=>{let W=M*Math.PI/180;return[(q+$*Math.cos(W)).toFixed(2),(F+$*Math.sin(W)).toFixed(2)]},[n,o]=s(r,t),[l,c]=s(r,e),[h,g]=s(i,e),[f,x]=s(i,t);return`M${n} ${o}A${r} ${r} 0 0 1 ${l} ${c}L${h} ${g}A${i} ${i} 0 0 0 ${f} ${x}Z`}var De=`:host {
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
`;var We=`:host {
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
`;var je=26,Ht=135,Tt=270,_=100,k=100,G=84,Pt=38,H=class extends v{constructor(){super(...arguments);this.level="";this.floor="";this.gate="";this.mode="";this.muted=!1;this.held=null;this.grab=t=>{let e=t.currentTarget;e.setPointerCapture(t.pointerId);let s=this.hass.states[this.gate]?.attributes??{},n=s.min??0,o=s.max??20,l=s.step??1,c=this.number(this.floor)??0,h=this.number(this.level)??0,g=Math.max(c+je,h+3),f=M=>{let W=e.getBoundingClientRect(),ji=M.clientX-W.left-W.width/2,qi=M.clientY-W.top-W.height/2,Kt=Math.atan2(qi,ji)*180/Math.PI-Ht;for(;Kt<0;)Kt+=360;let Fi=re(Math.min(Kt,Tt)/Tt);return Math.max(n,Math.min(o,Math.round(Fi*(g-c)/l)*l))},x=M=>{this.held=f(M)},$=M=>{e.removeEventListener("pointermove",x),e.removeEventListener("pointerup",$),e.removeEventListener("pointercancel",$);let W=f(M);this.held=null,this.hass.callService("number","set_value",{entity_id:this.gate,value:W})};e.addEventListener("pointermove",x),e.addEventListener("pointerup",$),e.addEventListener("pointercancel",$),this.held=f(t)}}render(){let t=this.number(this.level),e=this.number(this.floor),s=this.held??this.number(this.gate);if(t===null||e===null||s===null)return p;let n=this.hass.states[this.mode],o=qe(n?.state),l=Math.max(e+je,t+3),c=re((t-e)/(l-e)),h=re(s/(l-e)),g=t>=e+s&&!this.muted;return a`
      <div class="dial" @pointerdown=${this.grab}>
        <svg viewBox="0 0 200 200" role="img" aria-label="Microphone array">
          <path class="arc-bed" d=${Fe()} pathLength="100"></path>
          ${this.muted?p:w`<path
                class="arc-live"
                data-over=${String(g)}
                d=${Fe()}
                pathLength="100"
                stroke-dasharray=${`${c*100} 100`}
              ></path>`}
          ${this.muted?p:fs(h)} ${o==="beam"?gs():p}
          ${o==="sum"?ms():p} ${hs(o,this.muted)}
          ${this.muted?w`<path class="slash" d="M${_-30} ${k+30}L${_+30} ${k-30}"></path>`:p}
        </svg>
      </div>

      <div class="side">
        <div class="reading">
          ${this.muted?a`<span class="now cut">Cut</span>`:a`<span class="now">${t.toFixed(1)}</span><span class="unit">dB</span>
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
              <svg viewBox="0 0 40 40">${us(qe(f))}</svg>
              <span>${f}</span>
            </button>`)}
        </div>

        <div class="gate">Gate <b>${s} dB</b> over a floor of <b>${e.toFixed(0)} dB</b></div>
      </div>
    `}number(t){let e=Number(this.hass?.states?.[t]?.state);return Number.isFinite(e)?e:null}};H.styles=b(We),d([u({attribute:!1})],H.prototype,"hass",2),d([u()],H.prototype,"level",2),d([u()],H.prototype,"floor",2),d([u()],H.prototype,"gate",2),d([u()],H.prototype,"mode",2),d([u({type:Boolean})],H.prototype,"muted",2),d([m()],H.prototype,"held",2),H=d([y("echolocal-array")],H);function qe(r){let i=(r??"").toLowerCase();return i.includes("center")||i.includes("centre")?"one":i.includes("beam")?"beam":"sum"}function hs(r,i){return[[_,k],...Array.from({length:6},(e,s)=>{let n=(-90+s*60)*Math.PI/180;return[_+Pt*Math.cos(n),k+Pt*Math.sin(n)]})].map(([e,s],n)=>w`<circle class="capsule" data-on=${String(!i&&(r!=="one"||n===0))}
      cx=${e.toFixed(1)} cy=${s.toFixed(1)} r=${n===0?7:5.5}></circle>`)}function us(r){let i=[[20,20],...Array.from({length:6},(t,e)=>{let s=(-90+e*60)*Math.PI/180;return[20+12*Math.cos(s),20+12*Math.sin(s)]})];return w`
    ${r==="beam"?w`<path class="beam" d="M20 20C9 11 13 1 20 1C27 1 31 11 20 20Z"></path>`:p}
    ${i.map(([t,e],s)=>w`<circle class="capsule" data-on=${String(r!=="one"||s===0)}
          cx=${t.toFixed(1)} cy=${e.toFixed(1)} r=${s===0?3.4:2.6}></circle>`)}`}function ms(){return Array.from({length:6},(r,i)=>{let t=(-90+i*60)*Math.PI/180;return w`<line class="spoke" x1=${_} y1=${k}
      x2=${(_+Pt*Math.cos(t)).toFixed(1)} y2=${(k+Pt*Math.sin(t)).toFixed(1)}></line>`})}function gs(){return w`<path class="beam" d="M${_} ${k}C${_-34} ${k-30} ${_-24} ${k-66} ${_} ${k-66}C${_+24} ${k-66} ${_+34} ${k-30} ${_} ${k}Z"></path>`}function Fe(){let r=Ht*Math.PI/180,i=(Ht+Tt)*Math.PI/180;return`M${(_+G*Math.cos(r)).toFixed(2)} ${(k+G*Math.sin(r)).toFixed(2)}
    A${G} ${G} 0 1 1 ${(_+G*Math.cos(i)).toFixed(2)} ${(k+G*Math.sin(i)).toFixed(2)}`}function fs(r){let i=(Ht+r*Tt)*Math.PI/180,t=G-8,e=G+8;return w`<line class="notch"
    x1=${(_+t*Math.cos(i)).toFixed(1)} y1=${(k+t*Math.sin(i)).toFixed(1)}
    x2=${(_+e*Math.cos(i)).toFixed(1)} y2=${(k+e*Math.sin(i)).toFixed(1)}></line>`}function re(r){return Math.max(0,Math.min(1,r))}var Be=`:host {
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

button:hover {
  opacity: 1;
  color: var(--primary-color);
  border-color: var(--primary-color);
}

/* A paragraph rather than a label, so it gets room and normal weight. Staying on screen is ha-tooltip's
   own doing: it renders a wa-popup with flip and shift, which the hand-placed panel needed code for. */
ha-tooltip {
  --max-width: min(300px, 70vw);
  --ha-tooltip-font-size: 0.79rem;
  --ha-tooltip-font-weight: 400;
  --ha-tooltip-line-height: 1.45;
  --ha-tooltip-padding: 11px 13px;
  --ha-tooltip-border-radius: 11px;
}

`;var bs=0,nt=class extends v{constructor(){super(...arguments);this.text="";this.anchor=`ask-${++bs}`}render(){return this.text?a`
      <button id=${this.anchor} aria-label="What this does" @click=${this.swallow}>?</button>
      <ha-tooltip for=${this.anchor} trigger="click" placement="top">${this.text}</ha-tooltip>
    `:p}swallow(t){t.stopPropagation(),t.preventDefault()}};nt.styles=b(Be),d([u()],nt.prototype,"text",2),nt=d([y("echolocal-bubble")],nt);var Ke=`.sheet {
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

/* Never squeezed below its content: a segmented control that has to shrink breaks "Whole file" over two
   lines. The row's name gives up its room instead, which it can do because it ellipsizes. */
.trail {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 6px;
}

.trail ha-control-switch {
  width: 44px;
  --control-switch-thickness: 26px;
  --control-switch-border-radius: 13px;
}

/* nowrap is inherited, so it reaches the option labels inside: "stable" broken over two lines is what a
   squeezed segment does, and one word on two lines reads as a broken control. */
ha-control-select {
  --control-select-thickness: 34px;
  white-space: nowrap;
}

/* A menu shows one name at a time, so it can be capped and ellipsize; segments cannot. */
.trail ha-control-select-menu {
  min-width: 0;
  max-width: 210px;
  --control-select-menu-height: 34px;
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

.lines {
  padding: 0;
  border: none;
  background: none;
  font: inherit;
  font-size: 0.82rem;
  font-variant-numeric: tabular-nums;
  color: var(--primary-text-color);
  text-align: left;
  cursor: pointer;
  line-height: 1.5;
  overflow-wrap: anywhere;
}

.lines:hover {
  color: var(--primary-color);
}

.empty {
  color: var(--secondary-text-color);
}
`;var Rt=`/* The card's own way of showing a short set of choices, shared by the ring's animations and by any row
   with two of them. */

.pills {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.pill {
  padding: 6px 11px;
  border: 1px solid transparent;
  border-radius: 10px;
  background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
  color: var(--secondary-text-color);
  font: inherit;
  font-size: 0.8rem;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pill:hover {
  background: color-mix(in srgb, var(--primary-text-color) 12%, transparent);
}

.pill[data-on="true"] {
  border-color: color-mix(in srgb, var(--primary-color) 45%, transparent);
  background: color-mix(in srgb, var(--primary-color) 15%, transparent);
  color: var(--primary-color);
}

.pill:disabled {
  opacity: 0.4;
  cursor: default;
}
`;var Ge=`:host {
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

.hue {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid color-mix(in srgb, var(--primary-text-color) 10%, transparent);
  font-size: 0.85rem;
  color: var(--secondary-text-color);
}

.swatches {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.swatch {
  width: 24px;
  height: 24px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 50%;
  cursor: pointer;
}

.swatch[data-on="true"] {
  border-color: var(--primary-text-color);
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

/* Even columns rather than a ragged wrap: forty names all fit at this width, so nothing has to scroll. */
.pills {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(104px, 1fr));
}
`;var Et=[["White",[255,255,255]],["Warm",[255,190,120]],["Red",[255,40,40]],["Orange",[255,130,20]],["Yellow",[250,230,60]],["Green",[60,220,90]],["Teal",[40,220,200]],["Blue",[60,140,255]],["Violet",[150,90,255]],["Pink",[255,90,200]]];function $s(r,i){return Array.isArray(r)&&i.every((t,e)=>r[e]===t)}var R=class extends v{constructor(){super(...arguments);this.light="";this.muted="";this.failure="";this.room="";this.target="rest"}render(){let t=this.hass.states[this.light];if(!t)return p;let e=this.situations(),s=e.find(o=>o.key===this.target)??e[0],n=t.attributes.brightness??255;return a`
      <div class="dim">
        <span>Brightness</span>
        <ha-control-slider
          min="1"
          max="255"
          .value=${n}
          .disabled=${t.state!=="on"}
          @value-changed=${o=>this.hass.callService("light","turn_on",{entity_id:this.light,brightness:o.detail.value})}
        ></ha-control-slider>
        <b>${Math.round(n/255*100)}%</b>
      </div>

      <div class="hue">
        <span>Color</span>
        <div class="swatches">
          ${Et.map(([o,l])=>a`<button
              class="swatch"
              title=${o}
              aria-label=${o}
              data-on=${String($s(t.attributes.rgb_color,l))}
              style=${`background:rgb(${l.join(",")})`}
              @click=${()=>this.hass.callService("light","turn_on",{entity_id:this.light,rgb_color:l})}
            ></button>`)}
        </div>
      </div>

      <div class="when">
        ${e.map(o=>a`<button
            class="situation"
            data-on=${String(o.key===s.key)}
            @click=${()=>this.target=o.key}
          >
            <ha-icon .icon=${o.icon}></ha-icon>
            <div class="text">
              <div class="label">${o.label}</div>
              <div class="shows">${this.showing(o)||"\u2014"}</div>
            </div>
          </button>`)}
      </div>

      <div class="caption">${s.label} shows</div>
      <div class="pills">
        ${this.options(s).map(o=>a`<button
            class="pill"
            data-on=${String(o===this.showing(s))}
            @click=${()=>this.choose(s,o)}
          >
            ${o}
          </button>`)}
      </div>
    `}situations(){return[{key:"rest",label:"At rest",icon:"mdi:record-circle-outline"},{key:"muted",label:"Muted",icon:"mdi:microphone-off",entity:this.muted},{key:"failure",label:"On failure",icon:"mdi:alert-circle-outline",entity:this.failure},{key:"room",label:"Follows the room",icon:"mdi:motion-sensor",entity:this.room}].filter(e=>e.key==="rest"||e.entity&&this.hass.states[e.entity])}showing(t){if(t.entity)return this.hass.states[t.entity]?.state??"";let e=this.hass.states[this.light];return e?.state!=="on"?"":e.attributes.effect??""}options(t){return(t.entity?this.hass.states[t.entity]?.attributes.options:this.hass.states[this.light]?.attributes.effect_list)??[]}choose(t,e){if(!t.entity){this.hass.callService("light","turn_on",{entity_id:this.light,effect:e});return}this.hass.callService("select","select_option",{entity_id:t.entity,option:e})}};R.styles=[b(Rt),b(Ge)],d([u({attribute:!1})],R.prototype,"hass",2),d([u()],R.prototype,"light",2),d([u()],R.prototype,"muted",2),d([u()],R.prototype,"failure",2),d([u()],R.prototype,"room",2),d([m()],R.prototype,"target",2),R=d([y("echolocal-appearance")],R);var _s={mic_mute:"Cuts the microphones in hardware. The device cannot hear anything at all while this is on, including its wake word \u2014 it is a switch on the power to the capsules, not a software mute.",microphone_gain:"How much the capsules are amplified before anything else happens. Raise it in a large or quiet room; lower it if speech close to the device clips and comes out distorted.",microphone_mixing:"How the seven capsules are combined into the one channel the speech engine hears. Beamforming favours whichever direction someone is talking from and rejects the rest of the room; averaging treats every direction equally and is steadier when several people talk.",microphone_leveling:"Evens out loud and quiet talkers so a whisper across the room and a shout beside it arrive at similar volume. Helps transcription, and costs a little dynamic range.",microphone_cancel_echo:"Subtracts what the speaker is playing from what the microphones hear, so the device can be interrupted while it is talking and does not answer its own reply.",microphone_sensitivity:"How much louder than the room's own noise floor a sound has to be before the device treats it as somebody talking. Raise it in a noisy room to stop the device reacting to the room itself; lower it if quiet speech is missed.",room_level:"How loud the room is right now, in decibels below full scale. Nothing to set \u2014 it is what the sensitivity is measured against, and watching it is how you pick a sensible one.",room_floor:"The quietest the room has been recently, which is the baseline the device compares against. It drifts with the room, so a fridge switching on raises it rather than fooling the device.",mute_led_brightness:"How bright the red ring is while the microphones are cut. Dim is enough to see in a dark room without lighting it up.",stop_word_sensitivity:"How sure the device has to be before it takes an interruption as the word stop. Lower it if saying stop over a reply does not land.",ring:"The whole ring, as one light. Turning it off leaves the device working normally and silent about it.",segment:"One of the twelve segments, addressable on its own. They ship switched off in Home Assistant because twelve extra lights in every list is rarely what anyone wants \u2014 enable one and it can be coloured individually from the card.",ring_muted:"What the ring does while the microphones are cut. Something visible is worth choosing: a muted device that looks identical to a listening one is how people end up talking to a device that cannot hear them.",failure_effect:"What the ring does when a turn fails \u2014 no network, no pipeline, nothing understood. Distinct from the normal colours on purpose.",room_reaction:"Lets the ring track how loud the room is while the device is listening, so somebody can see that it is hearing them before it answers.",headphones:"Sends audio out of the jack instead of the speaker. The speaker goes quiet while this is on.",noise_layer:"Plays a generated sound the device makes itself \u2014 rain, a fan, a brook. Nothing is streamed and nothing is stored: it is synthesised as it plays, so it never loops or runs out. Two layers can overlap, so rain over a fan is one choice in each.",media_on_turn:"What happens to music when someone says the wake word. Ducking drops the volume and keeps playing, which resumes on the same note; stopping does not.",media_duck_level:"How far the volume drops while the device is listening or talking. Far enough that the microphones are not fighting the music, not so far that the room goes silent.",voice_resampling:"How the reply's audio is resampled to what the speaker wants. Better quality costs a little more work on a device that has four small cores.",wake_word:"What this assistant listens for. The list is what the device has on disk plus whatever Home Assistant is offering from its custom_wake_words directory.",wake_threshold:"How sure the device has to be before it decides it heard its wake word. Lower it if it misses you; raise it if the television sets it off.",follow_up:"Keeps listening for a moment after a reply, so a second question needs no second wake word.",max_listen:"How long the device will wait for someone to finish talking before giving up on the turn.",max_think:"How long to wait for Home Assistant's pipeline to answer. Generous is usually right \u2014 a slow answer beats a turn that dies just before it arrives.",wake_effect:"What the ring does at this point in a turn. Cosmetic, but it is how somebody knows the device heard them.",wake_tone:"A short sound at this point in a turn. Some people want the confirmation; some find it grating.",reply_buffer:"How much of a reply to collect before starting to play it. More is steadier on a poor network, at the cost of answering a beat later.",reply_delivery:"Whether a reply starts playing as it arrives or once all of it has. Streaming is faster to start and stutters on a bad connection.",update_channel:"Which releases this device is offered. Stable only, or the ones that are still being tried out.",check_for_updates:"Looks now rather than waiting for the next scheduled check. Nothing is installed by pressing it.",bluetooth_proxy:"Forwards nearby Bluetooth advertisements to Home Assistant, so this device extends Bluetooth coverage into its room. It costs some radio time it would otherwise spend on wifi.",metrics_interval:"How often the device reports its own temperature, memory and load. Often enough to be useful; every report is work the device does instead of listening.",purge_cache:"Deletes what Android's runtime has cached. It comes back on its own, so this buys disk space for a while rather than permanently.",test_playback:"Plays a short sound, which is the quickest way to find out whether the speaker, the volume and the output route are all what you think they are.",remote_adb:"Opens Android's debugging port over the network. Off by default, and worth leaving off: it is an unauthenticated way onto the device for anything on the same network.",vad_sensitivity:"How readily the device decides somebody has stopped talking. Tighter ends a turn sooner and can cut you off mid-sentence.",wifi_signal:"How strong the connection to the access point is. Above about -70 dBm is comfortable; below -80 dBm is where audio starts arriving late.",cpu_temperature:"The chip's own temperature. These run warm by design \u2014 it is a sustained climb rather than a number that matters.",load_average:"How much work is queued across the cores. Listening for a wake word is continuous work, so this is never zero.",memory_available:"How much memory is free. Wake models and the audio path are what use it.",free_space:"Disk left. Wake models and saved recordings are what fill it.",update_status:"What the last self-update did. Worth reading when a device is on an older version than the rest."},ks={array:"The seven capsules and what the room sounds like to them. The arc is how loud the room is right now; the notch is how far above the room's own noise floor something has to be before the device treats it as speech. Drag the notch, then talk from where you normally would and watch whether the arc crosses it.",appearance:"Ring controls, current brighness and color, active and conditional effects.",noise:"Sounds the device generates itself, mixed live rather than played from a file, so nothing loops. Two layers overlap \u2014 pick rain in one and a fan in the other.",volume:"The speaker's volume, in the same thirty steps the buttons on the device move it through, so this dial and the device agree.",history:"What the device has been hearing. Rows rebuilt from Home Assistant's recorder show what was said; rows the device itself reported also show where the time went and can be played back."},Ss={microphone:"The seven microphones and how the room sounds to them. Everything here changes what the device hears before a word of it reaches Home Assistant, so it is the first place to look when it mishears or does not wake at all.",ring:"The twelve-segment light. None of it changes what the device does \u2014 it changes what somebody in the room can tell about it, which is why the muted and failed colours are worth setting.",playback:"The speaker: what comes out of it, how loud, and what happens to music when somebody talks to the device.",assistant:"One wake word and the turn that follows it. A device can run more than one, each with its own word, sensitivity and timings, which is how one device answers to two names.",device:"The device itself rather than anything it hears or says: which releases it takes, what else it does for the network, and the housekeeping.",diagnostics:"What the device reports about itself. Nothing here is a setting \u2014 it is the evidence, and it is what to read before changing anything else.",activity:"The last few turns: what woke the device, what it heard, and what it said back. Rows the device itself reported also show where the time went, and can be played back or saved."};function Ye(r){return _s[r]}function Ve(r){return ks[r]}function Xe(r){return Ss[r]??""}var Je="turn_audio";var As=[{key:"listen_ms",label:"Listen"},{key:"think_ms",label:"Think"},{key:"speak_ms",label:"Reply"}];function yt(r){return As.map(({key:i,label:t})=>({key:i,label:t,ms:Number(r[i]??0)})).filter(i=>i.ms>0)}function ot(r){return yt(r).reduce((i,t)=>i+t.ms,0)}function Qe(r){let i=r;if(!i||i.version!=="1"||!i.wake_word)return null;let t={version:1,device:i.device_id??"",id:i.id??"",slot:Ze(i.slot)??1,wake_word:i.wake_word,outcome:i.outcome??"completed"};i.heard&&(t.heard=i.heard),i.reply&&(t.reply=i.reply);for(let e of["listen_ms","think_ms","speak_ms","audio_seconds","peak_db","floor_db"]){let s=Ze(i[e]);s!==void 0&&(t[e]=s)}return t}function Ze(r){if(r===void 0||r==="")return;let i=Number(r);return Number.isFinite(i)?i:void 0}function zt(r,i,t,e){if(!r.connection)return Promise.resolve(()=>{});let s={type:"logbook/event_stream",start_time:i.toISOString()};return t.length&&(s.device_ids=t),r.connection.subscribeMessage(n=>{let o=[];for(let l of n.events??[]){let c=Qe(l);c&&o.push({at:l.when*1e3,turn:c})}o.length&&e(o)},s)}var Le=`:host {
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
  height: 20px;
  margin-top: 6px;
  border-radius: 5px;
  overflow: hidden;
  background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
}

.slice {
  min-width: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-size: 0.68rem;
  font-variant-numeric: tabular-nums;
  color: var(--text-primary-color, #fff);
  white-space: nowrap;
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
`;var ne=new Map;function ti(r){return ne.get(r)}function ei(r,i,t){let s=`${i.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"")}_${t}`;return r?.services?.esphome?.[s]?s:void 0}async function ii(r,i,t){let e=ne.get(t);if(e)return e;let s=[],n="audio/wav",o=1;for(let c=0;c<Math.min(o,64);c++){let h=await Ms(r,i,t,c);if(!h)return null;o=h.pages||1,n=h.mime||n,s.push(Hs(h.data))}let l=URL.createObjectURL(new Blob(s,{type:n}));return ne.set(t,l),l}async function Ms(r,i,t,e){try{let n=(await r.callService("esphome",i,{id:t,page:e},void 0,!0,!0))?.response;return n?.version===1&&typeof n.data=="string"?n:null}catch{return null}}function Hs(r){let i=atob(r),t=new Uint8Array(i.length);for(let e=0;e<i.length;e++)t[e]=i.charCodeAt(e);return t}var si=`:host {
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

.gone {
  display: flex;
  opacity: 0.4;
}

.gone ha-icon {
  --mdc-icon-size: 16px;
  color: var(--secondary-text-color);
  display: flex;
}
`;var at=null,T=class extends v{constructor(){super(...arguments);this.device="";this.turn="";this.filename="recording.wav";this.busy=!1;this.playing=!1;this.gone=!1;this.play=async()=>{if(this.playing){at?.audio.pause();return}let t=await this.fetch();if(!t)return;at?.stop();let e=new Audio(t),s=()=>{this.playing=!1,at?.audio===e&&(at=null)};e.addEventListener("ended",s),e.addEventListener("pause",s),at={audio:e,stop:()=>e.pause()},this.playing=!0,e.play().catch(s)};this.save=async()=>{let t=await this.fetch();if(!t)return;let e=document.createElement("a");e.href=t,e.download=this.filename,e.click()}}disconnectedCallback(){super.disconnectedCallback(),this.playing&&at?.audio.pause()}render(){return!this.turn||!this.action()?p:this.gone?a`<span class="gone" title="The device no longer has this recording">
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
    `}action(){return this.device?ei(this.hass,this.device,Je):void 0}async fetch(){let t=ti(this.turn);if(t)return t;let e=this.action();if(!e)return null;this.busy=!0;try{let s=await ii(this.hass,e,this.turn);return this.gone=!s,s}finally{this.busy=!1}}};T.styles=b(si),d([u({attribute:!1})],T.prototype,"hass",2),d([u()],T.prototype,"device",2),d([u()],T.prototype,"turn",2),d([u()],T.prototype,"filename",2),d([m()],T.prototype,"busy",2),d([m()],T.prototype,"playing",2),d([m()],T.prototype,"gone",2),T=d([y("echolocal-recording")],T);var Ps=14,E=class extends v{constructor(){super(...arguments);this.device="";this.deviceId="";this.live=[];this.asked=!1;this.loading=!0}updated(){this.asked||!this.hass||!this.deviceId||(this.asked=!0,this.listen())}disconnectedCallback(){super.disconnectedCallback(),this.stop?.()}render(){let t=this.merged();return a`
      <div class="caption">
        Recent turns
        ${t.length?a`<span>${t.length===1?"1 turn":`${t.length} turns`}</span>`:p}
      </div>
      ${t.length?a`<div class="turns">${t.map(e=>this.row(e,this.scale(t)))}</div>`:a`<div class="none">
            ${this.loading?a`<ha-spinner></ha-spinner> Looking…`:"No turns recorded for this device yet."}
          </div>`}
    `}scale(t){return Math.max(1,...t.map(e=>e.turn?ot(e.turn):0))}row(t,e){let s=t.turn,n=s?yt(s):[],o=s?ot(s):0;return a`<div class="turn">
      <div class="when">${Rs(t.at)}</div>
      <div class="wake">${t.wake}</div>
      <div class="right">
        ${s?a`<div class="outcome" data-bad=${String(s.outcome!=="completed")}>
              ${s.outcome==="completed"?`${(o/1e3).toFixed(1)}s`:s.outcome}
            </div>`:p}
        ${s?.audio_seconds?a`<echolocal-recording
              .hass=${this.hass}
              .device=${this.device}
              .turn=${s.id}
              .filename=${Es(t)}
            ></echolocal-recording>`:p}
      </div>
      ${t.heard?a`<div class="said">${t.heard}</div>`:p}
      ${t.reply?a`<div class="said-back">${t.reply}</div>`:p}
      ${n.length?a`<div class="bar">
              ${n.map(l=>a`<div
                  class="slice"
                  data-phase=${l.key}
                  title=${`${l.label} ${l.ms} ms`}
                  style=${`flex:0 0 ${l.ms/e*100}%`}
                >
                  ${(l.ms/1e3).toFixed(1)}s
                </div>`)}
            </div>
            <div class="legend">
              ${n.map(l=>a`<span>${l.label} ${(l.ms/1e3).toFixed(1)}s</span>`)}
            </div>`:p}
    </div>`}merged(){return[...this.live].sort((t,e)=>e.at-t.at)}async listen(){let t=new Date(Date.now()-Ps*864e5),e=this.deviceId?[this.deviceId]:[];try{this.stop=await zt(this.hass,t,e,s=>{this.live=[...s.map(({at:n,turn:o})=>({at:n,wake:o.wake_word,heard:o.heard,reply:o.reply,turn:o})),...this.live],this.loading=!1})}catch{this.loading=!1}}};E.styles=b(Le),d([u({attribute:!1})],E.prototype,"hass",2),d([u()],E.prototype,"device",2),d([u()],E.prototype,"deviceId",2),d([m()],E.prototype,"live",2),d([m()],E.prototype,"asked",2),d([m()],E.prototype,"loading",2),E=d([y("echolocal-history")],E);function Rs(r){return new Date(r).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function Es(r){let i=new Date(r.at).toISOString().replace(/[:.]/g,"-").slice(0,19),t=r.wake.toLowerCase().replace(/[^a-z0-9]+/g,"-");return`${i}-${t}.wav`}var ri=`:host {
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
`;var ni=`:host {
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

/* A row rather than a column: there are three things to say and a column of them beside a small dial
   leaves most of a wide popup empty. Spread, they read as a bar across it. */
.side {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
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
`;var oe=135,ae=270,Ot=100,Nt=100,lt=78,Ns={White:"mdi:grain",Pink:"mdi:blur",Brown:"mdi:waveform",Rain:"mdi:weather-pouring",Ocean:"mdi:waves",Brook:"mdi:water",Wind:"mdi:weather-windy",Fire:"mdi:fireplace",Crickets:"mdi:bug-outline",Fan:"mdi:fan",Cabin:"mdi:airplane"},ct="None",Y=class extends v{constructor(){super(...arguments);this.player="";this.jack="";this.grab=t=>{let e=t.currentTarget;e.setPointerCapture(t.pointerId);let s=c=>{let h=e.getBoundingClientRect(),g=c.clientX-h.left-h.width/2,f=c.clientY-h.top-h.height/2,x=Math.atan2(f,g)*180/Math.PI-oe;for(;x<0;)x+=360;let $=Math.max(0,Math.min(1,Math.min(x,ae)/ae));return Math.round($*30)/30},n=c=>this.hass.callService("media_player","volume_set",{entity_id:this.player,volume_level:s(c)}),o=c=>n(c),l=c=>{e.removeEventListener("pointermove",o),e.removeEventListener("pointerup",l),e.removeEventListener("pointercancel",l),n(c)};e.addEventListener("pointermove",o),e.addEventListener("pointerup",l),e.addEventListener("pointercancel",l),n(t)}}render(){let t=this.hass.states[this.player];if(!t)return p;let e=Number(t.attributes.volume_level??0),s=t.attributes.is_volume_muted===!0,n=this.jack?this.hass.states[this.jack]?.state==="on":!1;return a`
      <div class="dial" @pointerdown=${this.grab}>
        <svg viewBox="0 0 200 200" role="img" aria-label="Volume">
          <path class="bed" d=${oi()} pathLength="100"></path>
          ${e>0?w`<path class="live" data-muted=${String(s)} d=${oi()} pathLength="100"
                stroke-dasharray=${`${e*100} 100`}></path>`:p}
          <text class="step" x=${Ot} y=${Nt+4}>${Math.round(e*30)}</text>
          <text class="of" x=${Ot} y=${Nt+20}>of 30</text>
        </svg>
      </div>

      <div class="side">
        <div class="state">${Is(t.state)}</div>
        <div class="badges">
          <div class="badge" data-on=${String(s)}>
            <ha-icon .icon=${s?"mdi:volume-off":"mdi:volume-high"}></ha-icon>
            ${s?"Muted":`${Math.round(e*100)}%`}
          </div>
          ${this.jack?a`<div class="badge" data-on=${String(n)}>
                <ha-icon icon="mdi:headphones"></ha-icon>
                ${n?"Headphones":"Speaker"}
              </div>`:p}
        </div>
      </div>
    `}};Y.styles=b(ni),d([u({attribute:!1})],Y.prototype,"hass",2),d([u()],Y.prototype,"player",2),d([u()],Y.prototype,"jack",2),Y=d([y("echolocal-volume")],Y);var V=class extends v{constructor(){super(...arguments);this.layers=[];this.busy=!1}render(){let t=this.layers.map(o=>this.hass.states[o]?.state??ct),e=(this.hass.states[this.layers[0]]?.attributes.options??[]).filter(o=>o!==ct),s=t.every(o=>o!==ct),n=o=>t.indexOf(o);return a`
      <div class="caption">
        Generated sound
        <span>${s?"Both layers in use":`${t.filter(o=>o!==ct).length} of 2`}</span>
      </div>
      <div class="grid">
        ${e.map(o=>{let l=n(o);return a`<button
            class="sound"
            data-on=${String(l>=0)}
            ?disabled=${this.busy}
            @click=${()=>this.pick(o,l,t)}
          >
            <ha-icon .icon=${Ns[o]??"mdi:music-note"}></ha-icon>
            ${o}
            ${l>=0&&this.layers.length>1?a`<span class="layer">${l+1}</span>`:p}
          </button>`})}
      </div>
    `}async pick(t,e,s){let n=s.findIndex(l=>l===ct),o=e>=0?e:n>=0?n:this.layers.length-1;if(!(o<0)){this.busy=!0;try{await this.hass.callService("select","select_option",{entity_id:this.layers[o],option:e>=0?ct:t})}finally{this.busy=!1}}}};V.styles=b(ri),d([u({attribute:!1})],V.prototype,"hass",2),d([u({attribute:!1})],V.prototype,"layers",2),d([m()],V.prototype,"busy",2),V=d([y("echolocal-noise")],V);function Is(r){return r==="playing"?"Playing":r==="paused"?"Paused":r==="unavailable"?"Unavailable":"Idle"}function oi(){let r=oe*Math.PI/180,i=(oe+ae)*Math.PI/180;return`M${(Ot+lt*Math.cos(r)).toFixed(2)} ${(Nt+lt*Math.sin(r)).toFixed(2)}
    A${lt} ${lt} 0 1 1 ${(Ot+lt*Math.cos(i)).toFixed(2)} ${(Nt+lt*Math.sin(i)).toFixed(2)}`}var A=class extends v{constructor(){super(...arguments);this.heading="";this.subtitle="";this.icon="";this.sections=[];this.widgets=[];this.device="";this.deviceId="";this.help=!0;this.about="";this.held={}}render(){let t=this.sections.map(o=>({...o,rows:o.rows.filter(l=>this.hass.states?.[l.entityId])})).filter(o=>o.rows.length),n=`--ha-dialog-width-md:${t.reduce((o,l)=>o+l.rows.length,0)>3||this.widgets.some(o=>o.place!=="header")?820:460}px`;return a`
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
            ${t.length?t.map(o=>this.group(o)):this.widgets.length?p:a`<div class="empty">Nothing to show here.</div>`}
          </div>
        </div>
      </ha-dialog>
    `}widget({widget:t,roles:e,lists:s}){let n=o=>o?.[0]??"";switch(t){case"appearance":return a`<echolocal-appearance
          class="hero"
          .hass=${this.hass}
          .light=${e.light}
          .muted=${n(s.muted)}
          .failure=${n(s.failure)}
          .room=${n(s.room)}
        ></echolocal-appearance>`;case"array":return a`<echolocal-array
          class="hero"
          .hass=${this.hass}
          .level=${e.level}
          .floor=${e.floor}
          .gate=${e.gate}
          .mode=${e.mode}
          .muted=${this.muted}
        ></echolocal-array>`;case"history":return a`<echolocal-history
          class="hero"
          .hass=${this.hass}
          .device=${this.device}
          .deviceId=${this.deviceId}
        ></echolocal-history>`;case"volume":return a`<echolocal-volume
          class="hero"
          .hass=${this.hass}
          .player=${e.player}
          .jack=${n(s.jack)}
        ></echolocal-volume>`;case"noise":return a`<echolocal-noise
          class="hero"
          .hass=${this.hass}
          .layers=${s.layers??[]}
        ></echolocal-noise>`;case"player":return this.crownPlayer(e.player);case"power":return this.crownPower(e.light);case"mute":return this.crownMute(e.mute,e.lamp)}}crownPlayer(t){let e=this.hass.states[t],s=e?.state==="playing",n=e?.attributes.is_volume_muted!==!0;return a`<div class="crown">
      <ha-icon-button
        .label=${s?"Pause":"Play"}
        @click=${()=>this.hass.callService("media_player",s?"media_pause":"media_play",{entity_id:t})}
      >
        <ha-icon .icon=${s?"mdi:pause":"mdi:play"}></ha-icon>
      </ha-icon-button>
      ${this.crownSwitch(n,"Sound",o=>this.hass.callService("media_player","volume_mute",{entity_id:t,is_volume_muted:!o}))}
    </div>`}crownPower(t){return a`<div class="crown">
      ${this.crownSwitch(this.hass.states[t]?.state==="on","Ring",e=>this.hass.callService("light",e?"turn_on":"turn_off",{entity_id:t}))}
    </div>`}crownMute(t,e){let s=this.hass.states[e];return a`<div class="crown">
      ${s?a`<ha-control-select
            class="lamp"
            .options=${(s.attributes.options??[]).map(n=>({value:n,label:n}))}
            .value=${s.state}
            label="Mute indicator"
            @value-changed=${n=>this.hass.callService("select","select_option",{entity_id:e,option:n.detail.value})}
          ></ha-control-select>`:p}
      ${this.crownSwitch(this.hass.states[t]?.state==="on","Microphone mute",n=>this.hass.callService("switch",n?"turn_on":"turn_off",{entity_id:t}),"warn")}
    </div>`}crownSwitch(t,e,s,n=""){return a`<ha-control-switch
      class=${n}
      .checked=${t}
      .label=${e}
      @change=${o=>s(o.target.checked)}
    ></ha-control-switch>`}get muted(){let t=this.widgets.find(e=>e.roles.mute)?.roles.mute;return!!t&&this.hass.states[t]?.state==="on"}explained(t){let e=this.help?Ve(t.widget):void 0;return e?a`<div class="explained">
      ${this.widget(t)}
      <echolocal-bubble class="corner" .text=${e}></echolocal-bubble>
    </div>`:this.widget(t)}group(t){return a`<section class="group">
      ${t.title?a`<div class="section">${t.title}</div>`:p}
      ${t.rows.map(e=>this.row(e))}
    </section>`}row(t){if(!this.hass.states?.[t.entityId])return p;switch(t.entityId.split(".")[0]){case"switch":return this.toggle(t,"switch");case"light":return this.toggle(t,"light");case"number":return this.slider(t);case"select":return this.options(t);case"button":return this.press(t);case"update":return this.version(t);default:return this.reading(t)}}version(t){let e=this.hass.states[t.entityId],s=e.attributes.installed_version,n=e.attributes.latest_version;return this.tile(t,!1,{trail:e.attributes.in_progress?a`<ha-spinner size="tiny"></ha-spinner>`:a`<button class="reading" @click=${()=>this.moreInfo(t.entityId)}>
              ${s?String(s):e.state}
            </button>
            ${e.state==="on"?a`<ha-button
                  size="small"
                  @click=${()=>this.hass.callService("update","install",{entity_id:t.entityId})}
                >
                  ${String(n)}
                </ha-button>`:p}`})}toggle(t,e){let{entityId:s,label:n}=t,o=this.hass.states[s].state;return this.tile(t,o==="on",{trail:a`<ha-control-switch
        .checked=${o==="on"}
        .disabled=${o==="unavailable"}
        .label=${n}
        @change=${l=>this.hass.callService(e,l.target.checked?"turn_on":"turn_off",{entity_id:s})}
      ></ha-control-switch>`})}slider(t){let{entityId:e}=t,s=this.hass.states[e],n=s.attributes,o=n.min??0,l=n.max??100,c=this.held[e]??Number(s.state);return this.tile(t,!1,{trail:a`<span class="reading">${Number.isNaN(c)?"\u2014":c}</span>
        ${n.unit_of_measurement?a`<span class="unit">${n.unit_of_measurement}</span>`:p}`,under:a`<ha-control-slider
        .value=${c}
        .min=${o}
        .max=${l}
        .step=${n.step??1}
        .unit=${n.unit_of_measurement??""}
        .disabled=${s.state==="unavailable"}
        @slider-moved=${h=>{this.held={...this.held,[e]:h.detail.value}}}
        @value-changed=${h=>{let{[e]:g,...f}=this.held;this.held=f,this.hass.callService("number","set_value",{entity_id:e,value:h.detail.value})}}
      ></ha-control-slider>`})}options(t){let{entityId:e}=t,s=this.hass.states[e],n=s.attributes.options??[],o=n.map(h=>({value:h,label:h})),l=h=>{h&&h!==s.state&&this.hass.callService("select","select_option",{entity_id:e,option:h})},c=s.state==="unavailable";return this.tile(t,!1,{trail:n.length===2?a`<div class="pills">
              ${n.map(h=>a`<button
                  class="pill"
                  data-on=${String(h===s.state)}
                  ?disabled=${c}
                  @click=${()=>l(h)}
                >
                  ${h}
                </button>`)}
            </div>`:a`<ha-control-select-menu
              .options=${o}
              .value=${s.state}
              .disabled=${c}
              .label=${t.label}
              hide-label
              show-arrow
              @wa-select=${h=>l(h.detail.item?.value)}
            ></ha-control-select-menu>`})}press(t){let e=t.reading?this.hass.states[t.reading]:void 0,s=a`<ha-button
      size="small"
      @click=${()=>this.hass.callService("button","press",{entity_id:t.entityId})}
    >
      Run
    </ha-button>`;return e?this.tile(t,!1,{trail:a`<span class="reading">${e.state}</span>
        ${e.attributes.unit_of_measurement?a`<span class="unit">${e.attributes.unit_of_measurement}</span>`:p}`,under:s}):this.tile(t,!1,{trail:s})}reading(t){let e=this.hass.states[t.entityId],s=e.attributes.unit_of_measurement,n=e.state.split(", ").filter(o=>o.length);return n.length>1?this.tile(t,!1,{under:a`<button class="lines" @click=${()=>this.moreInfo(t.entityId)}>
          ${n.map(o=>a`<div>${o}</div>`)}
        </button>`}):this.tile(t,!1,{trail:a`<button class="reading" @click=${()=>this.moreInfo(t.entityId)}>
          ${e.state}
        </button>
        ${s?a`<span class="unit">${s}</span>`:p}`})}tile({entityId:t,label:e,name:s},n,o){let l=this.hass.states[t].attributes.icon,c=n&&l?.includes("mic")&&l.includes("off"),h=this.help?Ye(s):void 0;return a`<div class="tile" data-active=${String(n&&!c)} data-alert=${String(!!c)}>
      <div class="top">
        <div class="icon"><ha-icon .icon=${l??"mdi:tune"}></ha-icon></div>
        <div class="named">
          <div class="name">${e}</div>
          ${h?a`<echolocal-bubble .text=${h}></echolocal-bubble>`:p}
        </div>
        ${o.trail?a`<div class="trail">${o.trail}</div>`:p}
      </div>
      ${o.under??p}
    </div>`}moreInfo(t){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}dismiss(){this.dispatchEvent(new CustomEvent("closed",{bubbles:!0,composed:!0}))}};A.styles=[b(Rt),b(Ke)],d([u({attribute:!1})],A.prototype,"hass",2),d([u()],A.prototype,"heading",2),d([u()],A.prototype,"subtitle",2),d([u()],A.prototype,"icon",2),d([u({attribute:!1})],A.prototype,"sections",2),d([u({attribute:!1})],A.prototype,"widgets",2),d([u()],A.prototype,"device",2),d([u()],A.prototype,"deviceId",2),d([u({type:Boolean})],A.prototype,"help",2),d([u()],A.prototype,"about",2),d([m()],A.prototype,"held",2),A=d([y("echolocal-dialog")],A);function ai(r,i){let t=li(r);return i.map(e=>{let s=t?.get(e.entity_id);return{...e,name:s?.name??"",slot:s?.slot??0,part:s?.part??0}})}function Ut(r){let i=new Map;for(let t of r){let e=i.get(t.name);e?e.push(t):i.set(t.name,[t])}for(let t of i.values())t.sort((e,s)=>e.slot-s.slot);return i}var Dt="echolocal-keys",It=null,le=null;function li(r){return It||(It=Us(r),It.then(()=>window.dispatchEvent(new Event(Dt))),Ds(r)),le}async function Us(r){let i=new Map;try{let t=await r.callWS({type:"config/entity_registry/list"});for(let e of t)e.device_id&&i.set(e.entity_id,{entityId:e.entity_id,deviceId:e.device_id,...ce(e.unique_id),platform:e.platform,disabled:!!e.disabled_by})}catch{}return le=i,i}function ce(r){let i=r.replace(/^(?:[0-9a-f]{2}:){5}[0-9a-f]{2}-?/i,""),t=i.lastIndexOf("@"),e=t<0?0:Number(i.slice(t+1))||0,s=t<0?i:i.slice(0,t),n=s.indexOf("-"),o=n<0?s:s.slice(n+1),l=o.lastIndexOf("_"),c=l<0?"":o.slice(l+1),h=/^\d+$/.test(c);return{name:h?o.slice(0,l):o,slot:h?Number(c):0,part:e}}function Ds(r){r.connection?.subscribeEvents(()=>{It=null,le=null,li(r)},"entity_registry_updated").catch(()=>{})}var jt={ring:[{title:null,rows:[["ring","Ring"]]},{title:"Segments",rows:[["segment","Segment"]]}],microphone:[{title:null,rows:[["mic_mute","Mute"]]},{title:"Capture",rows:[["microphone_gain","Gain"],["microphone_mixing","Mixing"],["microphone_leveling","Leveling"],["microphone_cancel_echo","Echo cancellation"]]},{title:"The room",rows:[["microphone_sensitivity","Sensitivity"],["room_level","Room level"],["room_floor","Room floor"],["stop_word_sensitivity","Stop word"],["vad_sensitivity","End of speech"]]},{title:"Indicator",rows:[["mute_led_brightness","Mute light"]]}],playback:[{title:null,rows:[["headphones","Headphones"]]},{title:"Generated sound",rows:[["noise_layer","Layer"]]},{title:"During a turn",rows:[["media_on_turn","Music"],["media_duck_level","Ducking"]]},{title:"Voice",rows:[["voice_resampling","Resampling"]]}],assistant:[{title:null,rows:[["wake_word","Wake word"],["pipeline","Pipeline"],["wake_threshold","Wake sensitivity"]]},{title:"Timing",rows:[["max_listen","Max listen"],["max_think","Max think"],["follow_up","Follow up"]]},{title:"Feedback",rows:[["wake_effect","Ring effect"],["wake_tone","Chime"]]},{title:"Reply",rows:[["reply_buffer","Buffer"],["reply_delivery","Delivery"]]}],device:[{title:null,rows:[["firmware","Firmware"],["update_channel","Update channel"],["check_for_updates","Check for updates"]]},{title:"Bluetooth",rows:[["bluetooth_proxy","Proxy enabled"]]},{title:"Maintenance",rows:[["metrics_interval","Metrics interval"],["purge_cache","Purge cache","cached_data"],["test_playback","Test playback"],["remote_adb","Remote adb"]]}],diagnostics:[{title:"Network",rows:[["ip_address","IP address"],["wifi_signal","Signal"],["wifi_sent","Sent"],["wifi_received","Received"],["ble_advertisements","Bluetooth advertisements"]]},{title:"Hardware",rows:[["cpu_temperature","CPU"],["radio_temperature","Radio"],["cpu_cores","Cores"],["cpu_cores_online","Cores online"],["load_average","Load"],["memory_available","Memory"],["free_space","Disk"]]},{title:"Updates",rows:[["update_status","Update status"],["update_outcome","Last update"]]}]},Ws={ring:[{widget:"power",place:"header",roles:{light:"ring"}},{widget:"appearance",roles:{light:"ring"},lists:{segments:"segment",muted:"ring_muted",failure:"failure_effect",room:"room_reaction"}}],playback:[{widget:"player",place:"header",roles:{player:"speaker"}},{widget:"volume",roles:{player:"speaker"},lists:{jack:"headphones"}},{widget:"noise",roles:{first:"noise_layer"},lists:{layers:"noise_layer"}}],activity:[{widget:"history",roles:{}}],microphone:[{widget:"mute",place:"header",roles:{mute:"mic_mute",lamp:"mute_led_brightness"}},{widget:"array",roles:{level:"room_level",floor:"room_floor",gate:"microphone_sensitivity",mode:"microphone_mixing"}}]},js=[["ring","ring"],["microphone","mic_mute"],["playback","speaker"]];function ci(r){let i=js.filter(([,t])=>r.by.has(t)).map(([t])=>({kind:t,slot:0}));for(let t of r.by.get("wake_threshold")??[])i.push({kind:"assistant",slot:t.slot});return i}function di(r,i,t=0){let e=[],s=new Set;for(let n of Ws[r]??[]){let o={};for(let[c,h]of Object.entries(n.roles)){let g=Wt(i.by,h,t)[0];g&&(o[c]=g.entity_id)}if(Object.keys(o).length!==Object.keys(n.roles).length)continue;let l={};for(let[c,h]of Object.entries(n.lists??{}))l[c]=Wt(i.by,h,t).map(g=>g.entity_id);e.push({widget:n.widget,place:n.place??"body",roles:o,lists:l}),[...Object.values(o),...Object.values(l).flat()].forEach(c=>s.add(c))}return{widgets:e,sections:ui(jt[r]??[],i.by,t,s)}}var qs=new Set(["switch","select","number","button","text","time","update"]);function pi(r){return mi(jt.device??[],r.entities.filter(i=>i.device_id===r.device.id&&qs.has(i.entity_id.split(".")[0])),new Set)}function hi(r){let i=r.entities.filter(t=>t.entity_category==="diagnostic");return{widgets:[],sections:mi(jt.diagnostics??[],i,new Set)}}function Wt(r,i,t){let e=r.get(i)??[];return t?e.filter(s=>(s.slot||1)===t):e}function ui(r,i,t,e){let s=[];for(let n of r){let o=[];for(let[l,c,h]of n.rows){let g=Wt(i,l,t);for(let f of g)e.has(f.entity_id)||o.push({entityId:f.entity_id,name:l,label:g.length>1?`${c} ${f.slot}`:c,reading:h?Wt(i,h,t)[0]?.entity_id:void 0})}o.length&&s.push({title:n.title,rows:o})}return s}var Fs=new Set(Object.values(jt).flatMap(r=>(r??[]).flatMap(i=>i.rows.flatMap(([t,,e])=>e?[t,e]:[t]))));function mi(r,i,t){let e=ui(r,Ut(i),0,t),s=new Set(e.flatMap(o=>o.rows.flatMap(l=>[l.entityId,l.reading??""]))),n=i.filter(o=>!s.has(o.entity_id)&&!t.has(o.entity_id)&&!Fs.has(o.name));return n.length?[...e,{title:e.length?"More":null,rows:n.map(o=>({entityId:o.entity_id,name:o.name,label:o.name||o.entity_id})).sort((o,l)=>o.label.localeCompare(l.label))}]:e}var Bs="EchoLocal",Ks="esphome",wt=12;function Gs(r){return!!r?.identifiers?.some(([i])=>i===Ks)}function gi(r,i){return Object.values(r.devices??{}).filter(t=>t.via_device_id===i&&!t.disabled_by).sort((t,e)=>S(t).localeCompare(S(e)))}function C(r){return r?Object.values(r.devices??{}).filter(i=>Ys(r,i.id)&&!i.via_device_id&&!i.disabled_by).sort((i,t)=>S(i).localeCompare(S(t))):[]}function S(r){return r?.name_by_user||r?.name||""}function Ys(r,i){return r?.devices?.[i]?.manufacturer!==Bs?!1:gi(r,i).some(Gs)}function B(r,i){if(!r||!i)return null;let t=r.devices?.[i];if(!t)return null;let e=new Set([i,...gi(r,i).map(c=>c.id)]),s=ai(r,Object.values(r.entities??{}).filter(c=>c.device_id&&e.has(c.device_id)&&!c.hidden)),n=Ut(s),o=c=>n.get(c)?.[0]?.entity_id,l=new Array(wt).fill(void 0);for(let c of n.get("segment")??[]){let h=c.slot-1;h>=0&&h<wt&&(l[h]=c.entity_id)}return{device:t,entities:s,by:n,satellite:o("assist_satellite"),player:o("speaker"),update:o("firmware"),ring:o("ring"),segments:l,mute:o("mic_mute")}}function fi(r){return(r.by.get("wake_assistant")??[]).map(i=>i.entity_id)}function xt(r,i){let t=i?r?.states?.[i]:void 0;return!t||t.state!=="on"?null:{rgb:t.attributes.rgb_color??[255,255,255],level:(t.attributes.brightness??255)/255}}function vi(r,i){return!!i&&r?.states?.[i]?.state==="on"}function bi(r,i){return(i?r?.states?.[i]?.state:void 0)??"unavailable"}async function yi(r,i){let t=new Array(wt).fill(void 0);if(!r.user?.is_admin)return t;let e=new Set(i.entities.map(s=>s.device_id));try{let s=await r.callWS({type:"config/entity_registry/list"});for(let n of s){if(!n.disabled_by||!n.device_id||!e.has(n.device_id))continue;let{name:o,slot:l}=ce(n.unique_id);o==="segment"&&l>=1&&l<=wt&&(t[l-1]=n.entity_id)}}catch{}return t}async function wi(r,i){await r.callWS({type:"config/entity_registry/update",entity_id:i,disabled_by:null})}var Vs={device_id:"Device",shell:"Shell",help:"Explain each setting"},it={ring:"mdi:record-circle-outline",microphone:"mdi:microphone",playback:"mdi:speaker",assistant:"mdi:account-voice",device:"mdi:cog-outline",diagnostics:"mdi:stethoscope",activity:"mdi:timeline-text-outline",follow:"mdi:backup-restore",close:"mdi:check"},Xs={idle:"Idle",listening:"Listening",processing:"Thinking",responding:"Speaking",unavailable:"Unavailable",unknown:"Unknown"},P=class extends v{constructor(){super(...arguments);this.opened=null;this.picked=null;this.holding=!1;this.timer=0;this.hiddenSegments=[];this.offering=null;this.asked=!1}static getConfigElement(){return document.createElement("echolocal-satellite-card-editor")}static getStubConfig(t){return{device_id:C(t)[0]?.id??""}}setConfig(t){if(!t?.device_id)throw new Error("Choose an EchoLocal device");this.config={shell:"grey",...t}}getCardSize(){return 6}updated(){if(this.asked||!this.hass||!this.config)return;let t=B(this.hass,this.config.device_id);!t||t.segments.some(Boolean)||(this.asked=!0,yi(this.hass,t).then(e=>this.hiddenSegments=e))}render(){if(!this.hass||!this.config)return p;let t=B(this.hass,this.config.device_id);if(!t)return a`<ha-card><div class="missing">Device not found</div></ha-card>`;let e=bi(this.hass,t.satellite);return a`
      <ha-card>
        <div class="frame">
          <div class="art" data-shell=${this.config.shell??"grey"} data-activity=${e}>
            ${Ue({segments:this.segments(t),glow:this.glow(t),muted:vi(this.hass,t.mute),holding:this.holding,picked:this.picked,divisible:[...t.segments,...this.hiddenSegments].some(Boolean)},{ring:()=>this.open({kind:"ring",slot:0}),segment:s=>this.tapped(t,s),action:s=>this.pressed(t,s),mute:()=>this.toggle("switch",t.mute),volume:s=>this.volume(t,s)})}
          </div>

          <div class="side">${this.side(t)}</div>

          ${this.offering!==null?this.offer(this.offering):this.picked===null?this.foot(t,e):this.palette(t)}
        </div>
      </ha-card>

      ${this.popup(t)}
    `}foot(t,e){return a`<div class="foot">
      <div class="label">
        <div class="name">${S(t.device)}</div>
        <div class="status">${Xs[e]??e}</div>
      </div>
      <div class="tail">
        ${this.square(it.activity,"Activity",()=>this.open({kind:"activity",slot:0}))}
        ${this.square(it.device,"Settings",()=>this.open({kind:"device",slot:0}))}
        ${this.square(it.diagnostics,"Diagnostics",()=>this.open({kind:"diagnostics",slot:0}))}
      </div>
    </div>`}tapped(t,e){if(t.segments[e]){this.picked=this.picked===e?null:e;return}if(this.hiddenSegments[e]){this.offering=e;return}this.open({kind:"ring",slot:0})}offer(t){let e=async s=>{for(let n of s)n&&await wi(this.hass,n);this.hiddenSegments=this.hiddenSegments.map(n=>s.includes(n)?void 0:n),this.offering=null,this.picked=t};return a`<div class="foot">
      <div class="label">
        <div class="name">Segment ${t+1} disabled</div>
      </div>
      <div class="tail">
        <button class="plain" @click=${()=>e([this.hiddenSegments[t]])}>Enable</button>
        <button class="plain" @click=${()=>e(this.hiddenSegments)}>Enable all</button>
        <button class="plain quiet" @click=${()=>this.offering=null}>Cancel</button>
      </div>
    </div>`}palette(t){let e=t.segments[this.picked];return a`<div class="foot palette">
      <div class="top">
        <div class="name">Segment ${this.picked+1}</div>
        <div class="tail">
          ${this.square(it.follow,"Follow the ring",()=>{this.hass.callService("light","turn_off",{entity_id:e}),this.picked=null})}
          ${this.square(it.close,"Done",()=>this.picked=null)}
        </div>
      </div>
      <div class="swatches">
        ${Et.map(([s,n])=>a`<button
            class="swatch"
            title=${s}
            aria-label=${s}
            style=${`background:rgb(${n.join(",")})`}
            @click=${()=>this.hass.callService("light","turn_on",{entity_id:e,rgb_color:n})}
          ></button>`)}
      </div>
    </div>`}segments(t){let e=xt(this.hass,t.ring);return Array.from({length:bt},(s,n)=>{let o=xt(this.hass,t.segments[n])??e;return{fill:o?`rgb(${o.rgb.join(",")})`:"var(--el-ring-off)",opacity:o?.25+.75*o.level:1}})}glow(t){return xt(this.hass,t.ring)||t.segments.some(s=>xt(this.hass,s))?.55:0}side(t){let e=ci(t),s=e.filter(n=>n.kind==="assistant").length>1;return e.map(({kind:n,slot:o})=>this.square(it[n],this.titled(n,o),()=>this.open({kind:n,slot:o}),s&&n==="assistant"?o:null))}titled(t,e){let s={ring:"Ring",microphone:"Microphone",playback:"Playback",assistant:"Assistant",device:"Settings",diagnostics:"Diagnostics",activity:"Activity"}[t];return e?`${s} ${e}`:s}square(t,e,s,n=null){return a`<button class="sq" title=${e} aria-label=${e} @click=${s}>
      <ha-icon .icon=${t}></ha-icon>
      ${n?a`<span class="badge">${n}</span>`:p}
    </button>`}popup(t){if(!this.opened)return p;let{kind:e,slot:s}=this.opened,n,o=[];return e==="device"?n=pi(t):e==="diagnostics"?{widgets:o,sections:n}=hi(t):{widgets:o,sections:n}=di(e,t,s),a`<echolocal-dialog
      .hass=${this.hass}
      .heading=${this.titled(e,s)}
      .subtitle=${S(t.device)}
      .icon=${it[e]}
      .sections=${n}
      .widgets=${o}
      .device=${t.device.name??""}
      .deviceId=${t.device.id}
      .help=${this.config.help!==!1}
      .about=${Xe(e)}
      @closed=${()=>this.opened=null}
    ></echolocal-dialog>`}open(t){this.opened=t}pressed(t,e){if(e==="down"){this.holding=!1,this.timer=window.setTimeout(()=>this.holding=!0,Ie);return}clearTimeout(this.timer);let s=this.holding;if(this.holding=!1,e==="cancel")return;let n=fi(t),o=n[s&&n.length>1?1:0];o?this.hass.callService("button","press",{entity_id:o}):this.moreInfo(t.satellite)}toggle(t,e){e&&this.hass.callService(t,"toggle",{entity_id:e})}volume(t,e){t.player&&this.hass.callService("media_player",e>0?"volume_up":"volume_down",{entity_id:t.player})}moreInfo(t){t&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}};P.styles=b(De),d([u({attribute:!1})],P.prototype,"hass",2),d([m()],P.prototype,"config",2),d([m()],P.prototype,"opened",2),d([m()],P.prototype,"picked",2),d([m()],P.prototype,"holding",2),d([m()],P.prototype,"hiddenSegments",2),d([m()],P.prototype,"offering",2),P=d([y("echolocal-satellite-card")],P);var dt=class extends v{setConfig(i){this.config={shell:"grey",...i}}render(){if(!this.hass||!this.config)return p;let i=[{name:"device_id",required:!0,selector:{select:{mode:"dropdown",options:C(this.hass).map(t=>({value:t.id,label:S(t)}))}}},{name:"shell",selector:{select:{mode:"dropdown",options:[{value:"grey",label:"Grey (unknown)"},{value:"black",label:"Black"},{value:"white",label:"White"}]}}},{name:"help",selector:{boolean:{}}}];return a`<ha-form
      .hass=${this.hass}
      .data=${{help:!0,...this.config}}
      .schema=${i}
      .computeLabel=${t=>Vs[t.name]??t.name}
      @value-changed=${t=>this.emit(t.detail.value)}
    ></ha-form>`}emit(i){this.config={...this.config,...i},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}};d([u({attribute:!1})],dt.prototype,"hass",2),d([m()],dt.prototype,"config",2),dt=d([y("echolocal-satellite-card-editor")],dt);var de=[];function O(r){de.push(r),de.sort((i,t)=>i.order-t.order||i.title.localeCompare(t.title))}function he(r){return de.filter(i=>r||!i.admin)}function xi(r,i){let t=pe(r),e=he(i);return e.find(s=>s.path===t)??e[0]}function $i(r,i){let t=i?`${r}/${i}`:r;location.pathname!==t&&history.pushState(null,"",t),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}function ue(r,i){if(i!==void 0)return pe(i);let t=location.pathname;return pe(t.startsWith(r)?t.slice(r.length):"")}function pe(r){return r.replace(/^\/+|\/+$/g,"")}var _i=`:host {
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
`;var me="";async function qt(r){try{return await r.callWS({type:"config/label_registry/list"})??[]}catch{return[]}}function Ft(r,i){let t=new Map,e=[];for(let n of r){let o=n.labels??[];if(!o.length){e.push(n);continue}for(let l of o){let c=i.find(g=>g.label_id===l),h=t.get(l);h?h.devices.push(n):t.set(l,{id:l,name:c?.name??l,icon:c?.icon,devices:[n]})}}let s=[...t.values()].sort((n,o)=>n.name.localeCompare(o.name));return e.length&&s.push({id:me,name:"Ungrouped",devices:e}),s}async function ki(r,i){try{return await r.callWS({type:"config/label_registry/create",name:i})}catch{return null}}async function Si(r,i,t){await r.callWS({type:"config/label_registry/update",label_id:i,name:t})}async function Ai(r,i){await r.callWS({type:"config/label_registry/delete",label_id:i})}async function Ci(r,i,t){await r.callWS({type:"config/device_registry/update",device_id:i,labels:[...new Set(t)]})}async function Mi(r,i,t,e){let s=0,n=0,o=0;return await Promise.all(i.map(async l=>{let c=Hi(r,l,t);if(!c){o+=1;return}try{await e(c),s+=1}catch{n+=1}})),{done:s,failed:n,missing:o}}function Bt(r,i,t){let e=i.map(n=>Hi(r,n,t)).filter(n=>!!n),s=[...new Set(e.map(n=>r.states[n]?.state).filter(Boolean))];return{value:s.length===1?s[0]:null,mixed:s.length>1,entities:e}}function Hi(r,i,t){return B(r,i.id)?.by.get(t)?.[0]?.entity_id}var Ti=`:host {
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
`;var Pi="mic_mute",Ri="ring",Ei="speaker",X=class extends v{constructor(){super(...arguments);this.said=""}render(){if(!this.hass||!this.group)return p;let t=this.group.devices,e=Bt(this.hass,t,Pi),s=Bt(this.hass,t,Ri);return a`<div class="bar">
      ${this.group.icon?a`<ha-icon .icon=${this.group.icon}></ha-icon>`:p}
      <div class="name">${this.group.name}</div>
      <div class="count">${t.length} ${t.length===1?"device":"devices"}</div>
      <div class="spacer"></div>
      ${this.said?a`<div class="short">${this.said}</div>`:p}

      ${e.entities.length?this.toggle("mdi:microphone-off","Mute all",e,()=>this.write(Pi,"switch",e.value==="on"?"turn_off":"turn_on")):p}
      ${s.entities.length?this.toggle("mdi:lightbulb-outline","Ring",s,()=>this.write(Ri,"light",s.value==="on"?"turn_off":"turn_on")):p}
      ${this.has(Ei)?a`<button title="Stop whatever is playing" @click=${()=>this.write(Ei,"media_player","media_stop")}>
            <ha-icon icon="mdi:stop"></ha-icon>Stop
          </button>`:p}
    </div>`}toggle(t,e,s,n){return a`<button data-on=${String(s.value==="on")} @click=${n}>
      <ha-icon .icon=${t}></ha-icon>${e}
      ${s.mixed?a`<span class="mixed">mixed</span>`:p}
    </button>`}has(t){return Bt(this.hass,this.group.devices,t).entities.length>0}async write(t,e,s){let{done:n,failed:o,missing:l}=await Mi(this.hass,this.group.devices,t,h=>this.hass.callService(e,s,{entity_id:h})),c=o+l;this.said=c?`${n} of ${n+c}`:"",this.said&&setTimeout(()=>this.said="",4e3)}};X.styles=b(Ti),d([u({attribute:!1})],X.prototype,"hass",2),d([u({attribute:!1})],X.prototype,"group",2),d([m()],X.prototype,"said",2),X=d([y("echolocal-groupbar")],X);var zi=`:host {
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
`;O({path:"",title:"Home",icon:"mdi:view-grid-outline",element:"echolocal-home",order:0});var Oi="echolocal:home:grouped",N=class extends v{constructor(){super(...arguments);this.narrow=!1;this.known=[];this.asked=!1;this.grouped=localStorage.getItem(Oi)!=="no";this.cards=new Map}updated(){this.asked||!this.hass||(this.asked=!0,this.load())}render(){if(!this.hass)return p;let t=C(this.hass);if(!t.length)return a`<div class="empty">
        No EchoLocal devices yet. One appears here once Home Assistant has adopted it over the ESPHome
        integration.
      </div>`;let e=Ft(t,this.known),s=e.some(o=>o.id!==me),n=this.grouped&&s?e:[{id:"all",name:"All devices",devices:t}];return a`
      ${s?a`<div class="view">
            <div class="pair">
              ${this.button(!0,"mdi:group","Grouped")}${this.button(!1,"mdi:view-grid-outline","All")}
            </div>
          </div>`:p}
      ${n.map(o=>this.group(o))}
    `}button(t,e,s){return a`<button
      data-on=${String(this.grouped===t)}
      @click=${()=>{this.grouped=t,localStorage.setItem(Oi,t?"yes":"no")}}
    >
      <ha-icon .icon=${e}></ha-icon>${s}
    </button>`}group(t){return a`<div class="group">
      <echolocal-groupbar .hass=${this.hass} .group=${t}></echolocal-groupbar>
      <div class="grid">${t.devices.map(e=>this.card(t.id,e.id))}</div>
    </div>`}card(t,e){let s=`${t}/${e}`,n=this.cards.get(s);return n||(n=document.createElement("echolocal-satellite-card"),n.setConfig({device_id:e}),this.cards.set(s,n)),n.hass=this.hass,n}async load(){this.known=await qt(this.hass)}};N.styles=b(zi),d([u({attribute:!1})],N.prototype,"hass",2),d([u({type:Boolean})],N.prototype,"narrow",2),d([m()],N.prototype,"known",2),d([m()],N.prototype,"asked",2),d([m()],N.prototype,"grouped",2),N=d([y("echolocal-home")],N);var Ni=`:host {
  display: block;
}

.make {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

ha-input.new {
  flex: 1;
  max-width: 280px;
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
th ha-input {
  --ha-input-text-align: center;
}

th ha-icon-button {
  --mdc-icon-size: 15px;
  color: var(--secondary-text-color);
}

th ha-icon-button:hover {
  color: var(--error-color, #db4437);
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


.none {
  color: var(--secondary-text-color);
  max-width: 52ch;
  line-height: 1.5;
}
`;O({path:"groups",title:"Groups",icon:"mdi:group",element:"echolocal-groups",order:30,admin:!0});var I=class extends v{constructor(){super(...arguments);this.known=[];this.asked=!1;this.naming="";this.busy=!1}connectedCallback(){super.connectedCallback(),this.hass?.connection?.subscribeEvents(()=>this.load(),"label_registry_updated").then(t=>this.stop=t).catch(()=>{})}disconnectedCallback(){super.disconnectedCallback(),this.stop?.()}updated(){this.asked||!this.hass||(this.asked=!0,this.load())}render(){if(!this.hass)return p;let t=C(this.hass),e=this.known;return a`
      <div class="make">
        <ha-input
          class="new"
          placeholder="New group"
          .value=${this.naming}
          @input=${s=>this.naming=s.target.value}
          @keydown=${s=>s.key==="Enter"&&this.make()}
        ></ha-input>
        <ha-button
          .disabled=${!this.naming.trim()||this.busy}
          .loading=${this.busy}
          @click=${this.make}
        >
          Add
        </ha-button>
      </div>

      ${t.length?a`<table>
            <thead>
              <tr>
                <th class="who">Device</th>
                ${e.map(s=>this.head(s))}
              </tr>
            </thead>
            <tbody>
              ${t.map(s=>this.row(s,e))}
            </tbody>
          </table>`:a`<div class="none">
            No EchoLocal devices yet, so there is nothing to group.
          </div>`}
    `}head(t){let e=Ft(C(this.hass),this.known).find(s=>s.id===t.label_id)?.devices.length;return a`<th>
      <div class="label">
        <ha-input
          .value=${t.name}
          style=${`width:${Math.max(8,t.name.length+2)}ch`}
          @change=${s=>this.rename(t,s.target.value)}
        ></ha-input>
        <ha-icon-button
          .label=${e?`Delete ${t.name}, ${e} still in it`:`Delete ${t.name}`}
          @click=${()=>this.discard(t)}
        >
          <ha-icon icon="mdi:close"></ha-icon>
        </ha-icon-button>
      </div>
    </th>`}row(t,e){let s=t.labels??[];return a`<tr>
      <td class="who">${S(t)}</td>
      ${e.map(n=>a`<td>
          <ha-checkbox
            aria-label="${S(t)} in ${n.name}"
            .checked=${s.includes(n.label_id)}
            @change=${o=>this.set(t,n.label_id,o.target.checked)}
          ></ha-checkbox>
        </td>`)}
    </tr>`}async make(){let t=this.naming.trim();if(!t||this.busy)return;this.busy=!0,this.naming="";let e=await ki(this.hass,t);e&&(this.known=[...this.known,e].sort((s,n)=>s.name.localeCompare(n.name))),this.busy=!1,e||await this.load()}async rename(t,e){!e.trim()||e===t.name||(this.known=this.known.map(s=>s.label_id===t.label_id?{...s,name:e.trim()}:s),await Si(this.hass,t.label_id,e.trim()))}async discard(t){this.known=this.known.filter(e=>e.label_id!==t.label_id),await Ai(this.hass,t.label_id)}async set(t,e,s){let n=new Set(t.labels??[]);s?n.add(e):n.delete(e),await Ci(this.hass,t.id,[...n])}async load(){this.known=await qt(this.hass)}};I.styles=b(Ni),d([u({attribute:!1})],I.prototype,"hass",2),d([m()],I.prototype,"known",2),d([m()],I.prototype,"asked",2),d([m()],I.prototype,"naming",2),d([m()],I.prototype,"busy",2),I=d([y("echolocal-groups")],I);var Ii=`:host {
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
  height: 20px;
  margin-top: 5px;
  border-radius: 5px;
  overflow: hidden;
  background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
}

.slice {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-size: 0.68rem;
  font-variant-numeric: tabular-nums;
  color: var(--text-primary-color, #fff);
  white-space: nowrap;
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
`;O({path:"activity",title:"Activity",icon:"mdi:timeline-text-outline",element:"echolocal-activity",order:20});var ge=14,U=class extends v{constructor(){super(...arguments);this.seen=[];this.only="";this.asked=!1;this.loading=!0}updated(){this.asked||!this.hass||(this.asked=!0,this.listen())}disconnectedCallback(){super.disconnectedCallback(),this.stop?.()}render(){if(!this.hass)return p;let t=this.names(),e=this.only?this.seen.filter(n=>n.turn.device===this.only):this.seen,s=Math.max(1,...e.map(n=>ot(n.turn)));return a`
      ${this.seen.length>0&&Object.keys(t).length>1?a`<div class="filters">
            <button data-on=${String(!this.only)} @click=${()=>this.only=""}>Everything</button>
            ${[...new Set(this.seen.map(n=>n.turn.device))].map(n=>a`<button
                data-on=${String(this.only===n)}
                @click=${()=>this.only=n}
              >
                ${t[n]?.label??n}
              </button>`)}
          </div>`:p}

      ${e.length?a`<div class="legend">
              ${[["listen_ms","Listen"],["think_ms","Think"],["speak_ms","Reply"]].map(([n,o])=>a`<span class="key"
                  ><span class="dot slice" data-phase=${n}></span>${o}</span
                >`)}
            </div>
            <div class="turns">${e.map(n=>this.row(n,t,s))}</div>`:this.loading?a`<div class="none"><ha-spinner></ha-spinner> Looking through the last ${ge} days…</div>`:a`<div class="none">
            No turns in the last ${ge} days. They appear here as they happen, across every device.
          </div>`}
    `}row(t,e,s){let n=yt(t.turn),o=ot(t.turn),l=t.turn.outcome!=="completed",c=e[t.turn.device],h=c?.label??"elsewhere";return a`<div class="turn">
      <div class="when">${ir(t.at)}</div>
      <div class="who">${h}</div>
      <div class="said">${t.turn.heard||t.turn.wake_word}</div>
      <div class="right">
        <div class="took" data-bad=${String(l)}>
          ${l?t.turn.outcome:`${(o/1e3).toFixed(1)}s`}
        </div>
        ${t.turn.audio_seconds?a`<echolocal-recording
              .hass=${this.hass}
              .device=${c?.node??""}
              .turn=${t.turn.id}
              .filename=${er(t,h)}
            ></echolocal-recording>`:p}
      </div>
      ${n.length?a`<div class="bar">
            ${n.map(g=>a`<div
                class="slice"
                data-phase=${g.key}
                title=${`${g.label} ${g.ms} ms`}
                style=${`flex:0 0 ${g.ms/s*100}%`}
              >
                ${(g.ms/1e3).toFixed(1)}s
              </div>`)}
          </div>`:p}
    </div>`}names(){let t={};for(let e of C(this.hass))t[e.id]={label:S(e),node:e.name??""};return t}async listen(){let t=new Date(Date.now()-ge*864e5),e=C(this.hass).map(s=>s.id);if(!e.length){this.asked=!1;return}try{this.stop=await zt(this.hass,t,e,s=>{this.seen=[...s,...this.seen].sort((n,o)=>o.at-n.at),this.loading=!1})}catch{this.loading=!1}}};U.styles=b(Ii),d([u({attribute:!1})],U.prototype,"hass",2),d([m()],U.prototype,"seen",2),d([m()],U.prototype,"only",2),d([m()],U.prototype,"asked",2),d([m()],U.prototype,"loading",2),U=d([y("echolocal-activity")],U);function er(r,i){let t=new Date(r.at).toISOString().replace(/[:.]/g,"-").slice(0,19),e=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,"-");return`${t}-${e(i)}-${e(r.turn.wake_word)}.wav`}function ir(r){return new Date(r).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}var Ui=`:host {
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
`;O({path:"health",title:"Health",icon:"mdi:heart-pulse",element:"echolocal-health",order:40});function fe(r){let i=Number(r.state);return r.attributes.unit_of_measurement==="\xB0F"?(i-32)*5/9:i}var ve=[{title:"Version",name:"firmware",show:r=>String(r.attributes.installed_version??"\u2014"),sort:r=>String(r.attributes.installed_version??"")},{title:"Update",name:"firmware",show:r=>r.state==="on"?"waiting":r.state==="off"?"current":r.state,wrong:r=>r.state==="on"?"warn":void 0,sort:r=>r.state},{title:"Wifi",name:"wifi_signal",show:r=>`${Math.round(Number(r.state))} ${r.attributes.unit_of_measurement||"dBm"}`,wrong:r=>Number(r.state)<-80?"bad":Number(r.state)<-70?"warn":void 0},{title:"CPU",name:"cpu_temperature",show:r=>`${Math.round(Number(r.state))}${r.attributes.unit_of_measurement||"\xB0C"}`,wrong:r=>fe(r)>85?"bad":fe(r)>70?"warn":void 0,sort:fe},{title:"Load",name:"load_average",show:r=>Number(r.state).toFixed(2)},{title:"Memory",name:"memory_available",show:r=>`${Math.round(Number(r.state))} ${r.attributes.unit_of_measurement||"MB"}`,wrong:r=>Number(r.state)<40?"bad":Number(r.state)<80?"warn":void 0},{title:"Disk",name:"free_space",show:r=>`${Math.round(Number(r.state))} ${r.attributes.unit_of_measurement||"MB"}`,wrong:r=>Number(r.state)<50?"bad":Number(r.state)<150?"warn":void 0},{title:"Address",name:"ip_address",show:r=>r.state.split(", ")[0]??r.state}],Z=class extends v{constructor(){super(...arguments);this.by="";this.down=!1}render(){if(!this.hass)return p;let t=C(this.hass);if(!t.length)return a`<div class="none">No EchoLocal devices yet.</div>`;let e=t.map(n=>this.read(n)),s=this.sort(e);return a`<div class="scroll">
      <table>
        <thead>
          <tr>
            ${this.head("Device")}${ve.map(n=>this.head(n.title))}
          </tr>
        </thead>
        <tbody>
          ${s.map(n=>a`<tr data-off=${String(!n.up)}>
              <td class="who">
                <button @click=${()=>this.open(n.device)}>${n.name}</button>
              </td>
              ${ve.map(o=>{let l=n.cells[o.title];return a`<td data-wrong=${l?.wrong??""}>${l?.text??"\u2014"}</td>`})}
            </tr>`)}
        </tbody>
      </table>
    </div>`}head(t){return a`<th
      data-by=${String(this.by===t)}
      @click=${()=>{this.down=this.by===t?!this.down:!1,this.by=t}}
    >
      ${t}
    </th>`}read(t){let e=B(this.hass,t.id),s={},n=!1;for(let o of ve){let l=e?.by.get(o.name)?.[0]?.entity_id,c=l?this.hass.states[l]:void 0;if(!c||c.state==="unavailable"||c.state==="unknown")continue;n=!0;let h=Number(c.state),g=c.attributes.unit_of_measurement??"";s[o.title]={text:o.show?o.show(c):g?`${c.state} ${g}`:c.state,sort:o.sort?o.sort(c):Number.isFinite(h)&&c.state!==""?h:c.state,wrong:o.wrong?.(c)}}return{device:t,name:S(t),cells:s,up:n}}sort(t){if(!this.by)return t;let e=s=>this.by==="Device"?s.name:s.cells[this.by]?.sort??"";return[...t].sort((s,n)=>{let o=e(s),l=e(n),c=typeof o=="number"&&typeof l=="number"?o-l:String(o).localeCompare(String(l));return this.down?-c:c})}open(t){history.pushState(null,"",`/config/devices/device/${t.id}`),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}};Z.styles=b(Ui),d([u({attribute:!1})],Z.prototype,"hass",2),d([m()],Z.prototype,"by",2),d([m()],Z.prototype,"down",2),Z=d([y("echolocal-health")],Z);var Di=`:host {
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
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
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

.said {
  font-size: 1rem;
  color: var(--primary-text-color);
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
`;async function be(r){try{return(await r.callWS({type:"echolocal/wake_words/list"}))?.wake_words??[]}catch{return[]}}var z=class extends v{constructor(){super(...arguments);this.words=[];this.over=!1;this.busy=!1;this.said="";this.asked=!1;this.dropped=t=>{t.preventDefault(),this.over=!1,this.add(t.dataTransfer?.files??null)}}updated(){this.asked||!this.hass||(this.asked=!0,this.refresh())}render(){return a`
      <div
        class="zone"
        data-over=${String(this.over)}
        @click=${()=>this.shadowRoot?.querySelector("input[type=file]")?.click()}
        @dragover=${t=>{t.preventDefault(),this.over=!0}}
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
          @change=${t=>this.add(t.target.files)}
        />
      </div>

      ${this.words.length?a`<div class="list">${this.words.map(t=>this.row(t))}</div>`:a`<div class="none">
            Nothing in custom_wake_words yet. Whatever the firmware ships with is unaffected.
          </div>`}
    `}row(t){let e=[t.type||"no type",t.size?`${Math.round(t.size/1024)} KB`:"no model",...t.trained_languages.length?[t.trained_languages.join(", ")]:[]];return a`<div class="word" data-bad=${String(t.problems.length>0)}>
      <div class="said">
        <ha-input
          .value=${t.wake_word}
          placeholder="what someone says to wake it"
          @change=${s=>this.rename(t,s.target.value)}
        ></ha-input>
      </div>
      <div class="about">${e.join(" \xB7 ")}</div>
      <div class="buttons">
        <ha-icon-button .label=${`Remove ${t.id}`} @click=${()=>this.discard(t)}>
          <ha-icon icon="mdi:trash-can-outline"></ha-icon>
        </ha-icon-button>
      </div>
      ${t.problems.length?a`<div class="wrong">${t.problems.join(". ")}.</div>`:p}
    </div>`}async add(t){let e=[...t??[]].filter(s=>s.name.endsWith(".tflite"));if(!e.length){this.said="A wake model is a .tflite file.";return}this.busy=!0,this.said="";for(let s of e){let n=new FormData;n.append("file",s);try{let o=await fetch("/api/echolocal/wake_words",{method:"POST",body:n,headers:this.credentials()});if(!o.ok){let l=await o.json().catch(()=>({}));this.said=l.error??`Home Assistant refused ${s.name}.`;break}}catch(o){this.said=`That did not reach Home Assistant: ${o}`;break}}this.busy=!1,await this.refresh()}async rename(t,e){e!==t.wake_word&&(await this.hass.callWS({type:"echolocal/wake_words/update",wake_word_id:t.id,wake_word:e}),await this.refresh())}async discard(t){await this.hass.callWS({type:"echolocal/wake_words/delete",wake_word_id:t.id}),await this.refresh()}async refresh(){this.words=await be(this.hass)}credentials(){let t=this.hass.auth?.data?.access_token;return t?{authorization:`Bearer ${t}`}:{}}};z.styles=b(Di),d([u({attribute:!1})],z.prototype,"hass",2),d([m()],z.prototype,"words",2),d([m()],z.prototype,"over",2),d([m()],z.prototype,"busy",2),d([m()],z.prototype,"said",2),d([m()],z.prototype,"asked",2),z=d([y("echolocal-wake-words")],z);var Wi=`:host {
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
`;O({path:"wake-words",title:"Wake words",icon:"mdi:waveform",element:"echolocal-words",order:10,admin:!0});var J=class extends v{constructor(){super(...arguments);this.words=[];this.asked=!1;this.again=()=>this.requestUpdate()}connectedCallback(){super.connectedCallback(),window.addEventListener(Dt,this.again)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(Dt,this.again)}updated(){this.asked||!this.hass||(this.asked=!0,this.load())}render(){if(!this.hass)return p;let t=this.chosen(),e=new Set(this.words.filter(n=>n.problems.length&&n.wake_word).map(n=>n.wake_word)),s=this.words.filter(n=>!n.problems.length&&!t.some(o=>o.words.includes(n.wake_word)));return a`
      <h2 class="first">Listening for</h2>
      ${t.length?a`<div class="listening">
            ${t.map(n=>a`<div class="who">
                <span class="name">${n.name}</span>
                ${n.words.map(o=>a`<span
                      class="word"
                      data-gone=${String(e.has(o))}
                      title=${e.has(o)?"Its library entry is broken, so it is not offered":""}
                      >${o}</span
                    >`)}
              </div>`)}
          </div>`:a`<div class="spare">No devices have picked a wake word yet.</div>`}

      <h2>The library</h2>
      <echolocal-wake-words .hass=${this.hass}></echolocal-wake-words>

      ${s.length?a`<div class="spare">
            Unused: ${s.map(n=>n.wake_word).join(", ")} — offered to every satellite, picked
            by none of them.
          </div>`:p}
    `}chosen(){return C(this.hass).map(t=>{let s=(B(this.hass,t.id)?.by.get("wake_word")??[]).map(n=>this.hass.states[n.entity_id]?.state).filter(n=>n!=="no_wake_word").filter(n=>!!n&&n!=="unknown"&&n!=="None");return{name:S(t),words:s}}).filter(t=>t.words.length)}async load(){this.words=await be(this.hass)}};J.styles=b(Wi),d([u({attribute:!1})],J.prototype,"hass",2),d([m()],J.prototype,"words",2),d([m()],J.prototype,"asked",2),J=d([y("echolocal-words")],J);var D=class extends v{constructor(){super(...arguments);this.narrow=!1;this.at="";this.made=new Map;this.moved=()=>{this.at=ue(this.base(),void 0),this.requestUpdate()}}connectedCallback(){super.connectedCallback(),window.addEventListener("location-changed",this.moved),window.addEventListener("popstate",this.moved)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("location-changed",this.moved),window.removeEventListener("popstate",this.moved)}render(){if(!this.hass)return p;let t=!!this.hass.user?.is_admin,e=he(t),s=xi(this.where(),t);return a`
      <header>
        <div class="bar">${e.map(n=>this.button(n,n===s))}</div>
      </header>
      <div class="page">${s?this.body(s):p}</div>
    `}button(t,e){return a`<button
      data-here=${String(e)}
      @click=${()=>{this.at=t.path,$i(this.base(),t.path)}}
    >
      <ha-icon .icon=${t.icon}></ha-icon><span>${t.title}</span>
    </button>`}body(t){let e=this.made.get(t.path);return e||(e=document.createElement(t.element),this.made.set(t.path,e)),e.hass=this.hass,e.narrow=this.narrow,e}where(){return this.route?ue(this.base(),this.route.path):this.at}base(){return this.route?.prefix??"/echolocal"}};D.styles=b(_i),d([u({attribute:!1})],D.prototype,"hass",2),d([u({type:Boolean})],D.prototype,"narrow",2),d([u({attribute:!1})],D.prototype,"route",2),d([u({attribute:!1})],D.prototype,"panel",2),d([m()],D.prototype,"at",2),D=d([y("echolocal-panel")],D);window.customCards=window.customCards??[];window.customCards.some(r=>r.type==="echolocal-satellite-card")||window.customCards.push({type:"echolocal-satellite-card",name:"EchoLocal Satellite",description:"An EchoLocal satellite, drawn as itself, with its ring and mute live.",preview:!0,documentationURL:"https://github.com/ygelfand/echolocal-hacs"});
