var Nr=Object.defineProperty;var Or=Object.getOwnPropertyDescriptor;var d=(o,r,t,e)=>{for(var i=e>1?void 0:e?Or(r,t):r,s=o.length-1,n;s>=0;s--)(n=o[s])&&(i=(e?n(r,t,i):n(i))||i);return e&&i&&Nr(r,t,i),i};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var _t=globalThis,St=_t.ShadowRoot&&(_t.ShadyCSS===void 0||_t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ve=Symbol(),fe=new WeakMap,kt=class{constructor(r,t,e){if(this._$cssResult$=!0,e!==ve)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=r,this.t=t}get styleSheet(){let r=this.o,t=this.t;if(St&&r===void 0){let e=t!==void 0&&t.length===1;e&&(r=fe.get(t)),r===void 0&&((this.o=r=new CSSStyleSheet).replaceSync(this.cssText),e&&fe.set(t,r))}return r}toString(){return this.cssText}},b=o=>new kt(typeof o=="string"?o:o+"",void 0,ve);var be=(o,r)=>{if(St)o.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of r){let e=document.createElement("style"),i=_t.litNonce;i!==void 0&&e.setAttribute("nonce",i),e.textContent=t.cssText,o.appendChild(e)}},Bt=St?o=>o:o=>o instanceof CSSStyleSheet?(r=>{let t="";for(let e of r.cssRules)t+=e.cssText;return b(t)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var{is:Ur,defineProperty:Dr,getOwnPropertyDescriptor:Wr,getOwnPropertyNames:jr,getOwnPropertySymbols:Fr,getPrototypeOf:qr}=Object,At=globalThis,ye=At.trustedTypes,Br=ye?ye.emptyScript:"",Ir=At.reactiveElementPolyfillSupport,ut=(o,r)=>o,mt={toAttribute(o,r){switch(r){case Boolean:o=o?Br:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,r){let t=o;switch(r){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},Ct=(o,r)=>!Ur(o,r),xe={attribute:!0,type:String,converter:mt,reflect:!1,useDefault:!1,hasChanged:Ct};Symbol.metadata??=Symbol("metadata"),At.litPropertyMetadata??=new WeakMap;var F=class extends HTMLElement{static addInitializer(r){this._$Ei(),(this.l??=[]).push(r)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(r,t=xe){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(r)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(r,t),!t.noAccessor){let e=Symbol(),i=this.getPropertyDescriptor(r,e,t);i!==void 0&&Dr(this.prototype,r,i)}}static getPropertyDescriptor(r,t,e){let{get:i,set:s}=Wr(this.prototype,r)??{get(){return this[t]},set(n){this[t]=n}};return{get:i,set(n){let l=i?.call(this);s?.call(this,n),this.requestUpdate(r,l,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(r){return this.elementProperties.get(r)??xe}static _$Ei(){if(this.hasOwnProperty(ut("elementProperties")))return;let r=qr(this);r.finalize(),r.l!==void 0&&(this.l=[...r.l]),this.elementProperties=new Map(r.elementProperties)}static finalize(){if(this.hasOwnProperty(ut("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ut("properties"))){let t=this.properties,e=[...jr(t),...Fr(t)];for(let i of e)this.createProperty(i,t[i])}let r=this[Symbol.metadata];if(r!==null){let t=litPropertyMetadata.get(r);if(t!==void 0)for(let[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(let[t,e]of this.elementProperties){let i=this._$Eu(t,e);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(r){let t=[];if(Array.isArray(r)){let e=new Set(r.flat(1/0).reverse());for(let i of e)t.unshift(Bt(i))}else r!==void 0&&t.push(Bt(r));return t}static _$Eu(r,t){let e=t.attribute;return e===!1?void 0:typeof e=="string"?e:typeof r=="string"?r.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(r=>r(this))}addController(r){(this._$EO??=new Set).add(r),this.renderRoot!==void 0&&this.isConnected&&r.hostConnected?.()}removeController(r){this._$EO?.delete(r)}_$E_(){let r=new Map,t=this.constructor.elementProperties;for(let e of t.keys())this.hasOwnProperty(e)&&(r.set(e,this[e]),delete this[e]);r.size>0&&(this._$Ep=r)}createRenderRoot(){let r=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return be(r,this.constructor.elementStyles),r}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(r=>r.hostConnected?.())}enableUpdating(r){}disconnectedCallback(){this._$EO?.forEach(r=>r.hostDisconnected?.())}attributeChangedCallback(r,t,e){this._$AK(r,e)}_$ET(r,t){let e=this.constructor.elementProperties.get(r),i=this.constructor._$Eu(r,e);if(i!==void 0&&e.reflect===!0){let s=(e.converter?.toAttribute!==void 0?e.converter:mt).toAttribute(t,e.type);this._$Em=r,s==null?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(r,t){let e=this.constructor,i=e._$Eh.get(r);if(i!==void 0&&this._$Em!==i){let s=e.getPropertyOptions(i),n=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:mt;this._$Em=i;let l=n.fromAttribute(t,s.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(r,t,e,i=!1,s){if(r!==void 0){let n=this.constructor;if(i===!1&&(s=this[r]),e??=n.getPropertyOptions(r),!((e.hasChanged??Ct)(s,t)||e.useDefault&&e.reflect&&s===this._$Ej?.get(r)&&!this.hasAttribute(n._$Eu(r,e))))return;this.C(r,t,e)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(r,t,{useDefault:e,reflect:i,wrapped:s},n){e&&!(this._$Ej??=new Map).has(r)&&(this._$Ej.set(r,n??t??this[r]),s!==!0||n!==void 0)||(this._$AL.has(r)||(this.hasUpdated||e||(t=void 0),this._$AL.set(r,t)),i===!0&&this._$Em!==r&&(this._$Eq??=new Set).add(r))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let r=this.scheduleUpdate();return r!=null&&await r,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,s]of this._$Ep)this[i]=s;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[i,s]of e){let{wrapped:n}=s,l=this[i];n!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,s,l)}}let r=!1,t=this._$AL;try{r=this.shouldUpdate(t),r?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(e){throw r=!1,this._$EM(),e}r&&this._$AE(t)}willUpdate(r){}_$AE(r){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(r)),this.updated(r)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(r){return!0}update(r){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(r){}firstUpdated(r){}};F.elementStyles=[],F.shadowRootOptions={mode:"open"},F[ut("elementProperties")]=new Map,F[ut("finalized")]=new Map,Ir?.({ReactiveElement:F}),(At.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Zt=globalThis,we=o=>o,Mt=Zt.trustedTypes,$e=Mt?Mt.createPolicy("lit-html",{createHTML:o=>o}):void 0,Me="$lit$",K=`lit$${Math.random().toFixed(9).slice(2)}$`,He="?"+K,Gr=`<${He}>`,tt=document,ft=()=>tt.createComment(""),vt=o=>o===null||typeof o!="object"&&typeof o!="function",Jt=Array.isArray,Kr=o=>Jt(o)||typeof o?.[Symbol.iterator]=="function",It=`[ 	
\f\r]`,gt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_e=/-->/g,ke=/>/g,Q=RegExp(`>|${It}(?:([^\\s"'>=/]+)(${It}*=${It}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Se=/'/g,Ae=/"/g,Te=/^(?:script|style|textarea|title)$/i,Qt=o=>(r,...t)=>({_$litType$:o,strings:r,values:t}),a=Qt(1),$=Qt(2),Qi=Qt(3),et=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),Ce=new WeakMap,L=tt.createTreeWalker(tt,129);function Ee(o,r){if(!Jt(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return $e!==void 0?$e.createHTML(r):r}var Vr=(o,r)=>{let t=o.length-1,e=[],i,s=r===2?"<svg>":r===3?"<math>":"",n=gt;for(let l=0;l<t;l++){let c=o[l],m,h,g=-1,x=0;for(;x<c.length&&(n.lastIndex=x,h=n.exec(c),h!==null);)x=n.lastIndex,n===gt?h[1]==="!--"?n=_e:h[1]!==void 0?n=ke:h[2]!==void 0?(Te.test(h[2])&&(i=RegExp("</"+h[2],"g")),n=Q):h[3]!==void 0&&(n=Q):n===Q?h[0]===">"?(n=i??gt,g=-1):h[1]===void 0?g=-2:(g=n.lastIndex-h[2].length,m=h[1],n=h[3]===void 0?Q:h[3]==='"'?Ae:Se):n===Ae||n===Se?n=Q:n===_e||n===ke?n=gt:(n=Q,i=void 0);let w=n===Q&&o[l+1].startsWith("/>")?" ":"";s+=n===gt?c+Gr:g>=0?(e.push(m),c.slice(0,g)+Me+c.slice(g)+K+w):c+K+(g===-2?l:w)}return[Ee(o,s+(o[t]||"<?>")+(r===2?"</svg>":r===3?"</math>":"")),e]},bt=class o{constructor({strings:r,_$litType$:t},e){let i;this.parts=[];let s=0,n=0,l=r.length-1,c=this.parts,[m,h]=Vr(r,t);if(this.el=o.createElement(m,e),L.currentNode=this.el.content,t===2||t===3){let g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(i=L.nextNode())!==null&&c.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(let g of i.getAttributeNames())if(g.endsWith(Me)){let x=h[n++],w=i.getAttribute(g).split(K),k=/([.?@])?(.*)/.exec(x);c.push({type:1,index:s,name:k[2],strings:w,ctor:k[1]==="."?Kt:k[1]==="?"?Vt:k[1]==="@"?Xt:ot}),i.removeAttribute(g)}else g.startsWith(K)&&(c.push({type:6,index:s}),i.removeAttribute(g));if(Te.test(i.tagName)){let g=i.textContent.split(K),x=g.length-1;if(x>0){i.textContent=Mt?Mt.emptyScript:"";for(let w=0;w<x;w++)i.append(g[w],ft()),L.nextNode(),c.push({type:2,index:++s});i.append(g[x],ft())}}}else if(i.nodeType===8)if(i.data===He)c.push({type:2,index:s});else{let g=-1;for(;(g=i.data.indexOf(K,g+1))!==-1;)c.push({type:7,index:s}),g+=K.length-1}s++}}static createElement(r,t){let e=tt.createElement("template");return e.innerHTML=r,e}};function st(o,r,t=o,e){if(r===et)return r;let i=e!==void 0?t._$Co?.[e]:t._$Cl,s=vt(r)?void 0:r._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(!1),s===void 0?i=void 0:(i=new s(o),i._$AT(o,t,e)),e!==void 0?(t._$Co??=[])[e]=i:t._$Cl=i),i!==void 0&&(r=st(o,i._$AS(o,r.values),i,e)),r}var Gt=class{constructor(r,t){this._$AV=[],this._$AN=void 0,this._$AD=r,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(r){let{el:{content:t},parts:e}=this._$AD,i=(r?.creationScope??tt).importNode(t,!0);L.currentNode=i;let s=L.nextNode(),n=0,l=0,c=e[0];for(;c!==void 0;){if(n===c.index){let m;c.type===2?m=new yt(s,s.nextSibling,this,r):c.type===1?m=new c.ctor(s,c.name,c.strings,this,r):c.type===6&&(m=new Yt(s,this,r)),this._$AV.push(m),c=e[++l]}n!==c?.index&&(s=L.nextNode(),n++)}return L.currentNode=tt,i}p(r){let t=0;for(let e of this._$AV)e!==void 0&&(e.strings!==void 0?(e._$AI(r,e,t),t+=e.strings.length-2):e._$AI(r[t])),t++}},yt=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(r,t,e,i){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=r,this._$AB=t,this._$AM=e,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let r=this._$AA.parentNode,t=this._$AM;return t!==void 0&&r?.nodeType===11&&(r=t.parentNode),r}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(r,t=this){r=st(this,r,t),vt(r)?r===p||r==null||r===""?(this._$AH!==p&&this._$AR(),this._$AH=p):r!==this._$AH&&r!==et&&this._(r):r._$litType$!==void 0?this.$(r):r.nodeType!==void 0?this.T(r):Kr(r)?this.k(r):this._(r)}O(r){return this._$AA.parentNode.insertBefore(r,this._$AB)}T(r){this._$AH!==r&&(this._$AR(),this._$AH=this.O(r))}_(r){this._$AH!==p&&vt(this._$AH)?this._$AA.nextSibling.data=r:this.T(tt.createTextNode(r)),this._$AH=r}$(r){let{values:t,_$litType$:e}=r,i=typeof e=="number"?this._$AC(r):(e.el===void 0&&(e.el=bt.createElement(Ee(e.h,e.h[0]),this.options)),e);if(this._$AH?._$AD===i)this._$AH.p(t);else{let s=new Gt(i,this),n=s.u(this.options);s.p(t),this.T(n),this._$AH=s}}_$AC(r){let t=Ce.get(r.strings);return t===void 0&&Ce.set(r.strings,t=new bt(r)),t}k(r){Jt(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,e,i=0;for(let s of r)i===t.length?t.push(e=new o(this.O(ft()),this.O(ft()),this,this.options)):e=t[i],e._$AI(s),i++;i<t.length&&(this._$AR(e&&e._$AB.nextSibling,i),t.length=i)}_$AR(r=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);r!==this._$AB;){let e=we(r).nextSibling;we(r).remove(),r=e}}setConnected(r){this._$AM===void 0&&(this._$Cv=r,this._$AP?.(r))}},ot=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(r,t,e,i,s){this.type=1,this._$AH=p,this._$AN=void 0,this.element=r,this.name=t,this._$AM=i,this.options=s,e.length>2||e[0]!==""||e[1]!==""?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=p}_$AI(r,t=this,e,i){let s=this.strings,n=!1;if(s===void 0)r=st(this,r,t,0),n=!vt(r)||r!==this._$AH&&r!==et,n&&(this._$AH=r);else{let l=r,c,m;for(r=s[0],c=0;c<s.length-1;c++)m=st(this,l[e+c],t,c),m===et&&(m=this._$AH[c]),n||=!vt(m)||m!==this._$AH[c],m===p?r=p:r!==p&&(r+=(m??"")+s[c+1]),this._$AH[c]=m}n&&!i&&this.j(r)}j(r){r===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,r??"")}},Kt=class extends ot{constructor(){super(...arguments),this.type=3}j(r){this.element[this.name]=r===p?void 0:r}},Vt=class extends ot{constructor(){super(...arguments),this.type=4}j(r){this.element.toggleAttribute(this.name,!!r&&r!==p)}},Xt=class extends ot{constructor(r,t,e,i,s){super(r,t,e,i,s),this.type=5}_$AI(r,t=this){if((r=st(this,r,t,0)??p)===et)return;let e=this._$AH,i=r===p&&e!==p||r.capture!==e.capture||r.once!==e.once||r.passive!==e.passive,s=r!==p&&(e===p||i);i&&this.element.removeEventListener(this.name,this,e),s&&this.element.addEventListener(this.name,this,r),this._$AH=r}handleEvent(r){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,r):this._$AH.handleEvent(r)}},Yt=class{constructor(r,t,e){this.element=r,this.type=6,this._$AN=void 0,this._$AM=t,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(r){st(this,r)}};var Xr=Zt.litHtmlPolyfillSupport;Xr?.(bt,yt),(Zt.litHtmlVersions??=[]).push("3.3.3");var Pe=(o,r,t)=>{let e=t?.renderBefore??r,i=e._$litPart$;if(i===void 0){let s=t?.renderBefore??null;e._$litPart$=i=new yt(r.insertBefore(ft(),s),s,void 0,t??{})}return i._$AI(o),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Lt=globalThis,v=class extends F{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let r=super.createRenderRoot();return this.renderOptions.renderBefore??=r.firstChild,r}update(r){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(r),this._$Do=Pe(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return et}};v._$litElement$=!0,v.finalized=!0,Lt.litElementHydrateSupport?.({LitElement:v});var Yr=Lt.litElementPolyfillSupport;Yr?.({LitElement:v});(Lt.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var y=o=>(r,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(o,r)}):customElements.define(o,r)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Zr={attribute:!0,type:String,converter:mt,reflect:!1,hasChanged:Ct},Jr=(o=Zr,r,t)=>{let{kind:e,metadata:i}=t,s=globalThis.litPropertyMetadata.get(i);if(s===void 0&&globalThis.litPropertyMetadata.set(i,s=new Map),e==="setter"&&((o=Object.create(o)).wrapped=!0),s.set(t.name,o),e==="accessor"){let{name:n}=t;return{set(l){let c=r.get.call(this);r.set.call(this,l),this.requestUpdate(n,c,o,!0,l)},init(l){return l!==void 0&&this.C(n,void 0,o,l),l}}}if(e==="setter"){let{name:n}=t;return function(l){let c=this[n];r.call(this,l),this.requestUpdate(n,c,o,!0,l)}}throw Error("Unsupported decorator location: "+e)};function u(o){return(r,t)=>typeof t=="object"?Jr(o,r,t):((e,i,s)=>{let n=i.hasOwnProperty(s);return i.constructor.createProperty(s,e),n?Object.getOwnPropertyDescriptor(i,s):void 0})(o,r,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function f(o){return u({...o,state:!0,attribute:!1})}/**
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
 */var xt=12,Re=2.2,O=100,U=100;function ze(o,r){let t=Array.from({length:xt},(e,i)=>{let s=-90+360/xt*i+Re/2,n=-90+360/xt*(i+1)-Re/2;return ti(93,82,s,n)});return $`
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

      <circle cx=${O} cy=${U} r="97" fill="var(--el-shell)"></circle>
      <circle cx=${O} cy=${U} r="97" fill="none" stroke="var(--el-edge)" stroke-width="1"></circle>

      <g class="halo" filter="url(#blur)" style="opacity:${o.glow}">
        ${t.map((e,i)=>$`<path d=${e} style="fill:${o.segments[i].opacity?o.segments[i].fill:"transparent"}"></path>`)}
      </g>

      ${t.map((e,i)=>$`<path
          class="segment"
          data-picked=${String(o.picked===i)}
          data-divisible=${String(o.divisible)}
          d=${e}
          style="fill:${o.segments[i].fill};opacity:${o.segments[i].opacity}"
          @click=${o.divisible?()=>r.segment(i):r.ring}
        ></path>`)}

      <circle cx=${O} cy=${U} r="79" fill="url(#top)"></circle>
      <circle cx=${O} cy=${U} r="79" fill="none" stroke="var(--el-edge)" stroke-width="1"></circle>

      <circle class="hit" cx=${O} cy=${U} r="93" fill="none" stroke="transparent"
        stroke-width="12" @click=${r.ring}></circle>

      ${Tt(O,U-46,$`<path d="M-4.5 0h9M0 -4.5v9"></path>`,"Volume up",()=>r.volume(1))}
      ${Tt(O+46,U,$`<circle cx="0" cy="0" r="4.5"></circle>`,"Action",r.action)}
      ${Tt(O,U+46,$`<path d="M-4.5 0h9"></path>`,"Volume down",()=>r.volume(-1))}
      ${Tt(O-46,U,Qr(o.muted),o.muted?"Microphone muted":"Microphone live",r.mute,o.muted)}
    </svg>
  `}function Tt(o,r,t,e,i,s=!1){return $`<g class="btn" data-lit=${String(s)} transform="translate(${o} ${r})"
    role="button" tabindex="0" aria-label=${e} @click=${i}>
    <circle class="face" cx="0" cy="0" r="13"></circle>
    <g class="glyph">${t}</g>
  </g>`}function Qr(o){return $`
    <path d="M-2.6 -5.2a2.6 2.6 0 0 1 5.2 0v4a2.6 2.6 0 0 1-5.2 0z"></path>
    <path d="M-4.6 -0.6a4.6 4.6 0 0 0 9.2 0"></path>
    <path d="M0 3.8v2.6"></path>
    ${o?$`<path d="M-6.4 6.4L6.4 -6.4"></path>`:Lr()}
  `}function Lr(){return $``}function ti(o,r,t,e){let i=(w,k)=>{let T=k*Math.PI/180;return[(O+w*Math.cos(T)).toFixed(2),(U+w*Math.sin(T)).toFixed(2)]},[s,n]=i(o,t),[l,c]=i(o,e),[m,h]=i(r,e),[g,x]=i(r,t);return`M${s} ${n}A${o} ${o} 0 0 1 ${l} ${c}L${m} ${h}A${r} ${r} 0 0 0 ${g} ${x}Z`}var Ne=`:host {
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
`;var Oe=`:host {
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
`;var Ue=26,Et=135,Pt=270,S=100,A=100,V=84,Rt=38,E=class extends v{constructor(){super(...arguments);this.level="";this.floor="";this.gate="";this.mode="";this.muted=!1;this.held=null;this.grab=t=>{let e=t.currentTarget;e.setPointerCapture(t.pointerId);let i=this.hass.states[this.gate]?.attributes??{},s=i.min??0,n=i.max??20,l=i.step??1,c=this.number(this.floor)??0,m=this.number(this.level)??0,h=Math.max(c+Ue,m+3),g=k=>{let T=e.getBoundingClientRect(),ge=k.clientX-T.left-T.width/2,qt=k.clientY-T.top-T.height/2,ht=Math.atan2(qt,ge)*180/Math.PI-Et;for(;ht<0;)ht+=360;let zr=te(Math.min(ht,Pt)/Pt);return Math.max(s,Math.min(n,Math.round(zr*(h-c)/l)*l))},x=k=>{this.held=g(k)},w=k=>{e.removeEventListener("pointermove",x),e.removeEventListener("pointerup",w),e.removeEventListener("pointercancel",w);let T=g(k);this.held=null,this.hass.callService("number","set_value",{entity_id:this.gate,value:T})};e.addEventListener("pointermove",x),e.addEventListener("pointerup",w),e.addEventListener("pointercancel",w),this.held=g(t)}}render(){let t=this.number(this.level),e=this.number(this.floor),i=this.held??this.number(this.gate);if(t===null||e===null||i===null)return p;let s=this.hass.states[this.mode],n=De(s?.state),l=Math.max(e+Ue,t+3),c=te((t-e)/(l-e)),m=te(i/(l-e)),h=t>=e+i&&!this.muted;return a`
      <div class="dial" @pointerdown=${this.grab}>
        <svg viewBox="0 0 200 200" role="img" aria-label="Microphone array">
          <path class="arc-bed" d=${We()} pathLength="100"></path>
          ${this.muted?p:$`<path
                class="arc-live"
                data-over=${String(h)}
                d=${We()}
                pathLength="100"
                stroke-dasharray=${`${c*100} 100`}
              ></path>`}
          ${this.muted?p:ai(m)} ${n==="beam"?ni():p}
          ${n==="sum"?oi():p} ${ii(n,this.muted)}
          ${this.muted?$`<path class="slash" d="M${S-30} ${A+30}L${S+30} ${A-30}"></path>`:p}
        </svg>
      </div>

      <div class="side">
        <div class="reading">
          ${this.muted?a`<span class="now cut">Cut</span>`:a`<span class="now">${t.toFixed(1)}</span><span class="unit">dB</span>
                <span class="caption" data-over=${String(h)}>
                  ${h?"Over the gate":"Quiet"}
                </span>`}
        </div>

        <div class="modes">
          ${(s?.attributes.options??[]).map(g=>a`<button
              class="mode"
              data-on=${String(g===s?.state)}
              @click=${()=>this.hass.callService("select","select_option",{entity_id:this.mode,option:g})}
            >
              <svg viewBox="0 0 40 40">${si(De(g))}</svg>
              <span>${g}</span>
            </button>`)}
        </div>

        <div class="gate">Gate <b>${i} dB</b> over a floor of <b>${e.toFixed(0)} dB</b></div>
      </div>
    `}number(t){let e=Number(this.hass?.states?.[t]?.state);return Number.isFinite(e)?e:null}};E.styles=b(Oe),d([u({attribute:!1})],E.prototype,"hass",2),d([u()],E.prototype,"level",2),d([u()],E.prototype,"floor",2),d([u()],E.prototype,"gate",2),d([u()],E.prototype,"mode",2),d([u({type:Boolean})],E.prototype,"muted",2),d([f()],E.prototype,"held",2),E=d([y("echolocal-array")],E);function De(o){let r=(o??"").toLowerCase();return r.includes("center")||r.includes("centre")?"one":r.includes("beam")?"beam":"sum"}function ii(o,r){return[[S,A],...Array.from({length:6},(e,i)=>{let s=(-90+i*60)*Math.PI/180;return[S+Rt*Math.cos(s),A+Rt*Math.sin(s)]})].map(([e,i],s)=>$`<circle class="capsule" data-on=${String(!r&&(o!=="one"||s===0))}
      cx=${e.toFixed(1)} cy=${i.toFixed(1)} r=${s===0?7:5.5}></circle>`)}function si(o){let r=[[20,20],...Array.from({length:6},(t,e)=>{let i=(-90+e*60)*Math.PI/180;return[20+12*Math.cos(i),20+12*Math.sin(i)]})];return $`
    ${o==="beam"?$`<path class="beam" d="M20 20C9 11 13 1 20 1C27 1 31 11 20 20Z"></path>`:p}
    ${r.map(([t,e],i)=>$`<circle class="capsule" data-on=${String(o!=="one"||i===0)}
          cx=${t.toFixed(1)} cy=${e.toFixed(1)} r=${i===0?3.4:2.6}></circle>`)}`}function oi(){return Array.from({length:6},(o,r)=>{let t=(-90+r*60)*Math.PI/180;return $`<line class="spoke" x1=${S} y1=${A}
      x2=${(S+Rt*Math.cos(t)).toFixed(1)} y2=${(A+Rt*Math.sin(t)).toFixed(1)}></line>`})}function ni(){return $`<path class="beam" d="M${S} ${A}C${S-34} ${A-30} ${S-24} ${A-66} ${S} ${A-66}C${S+24} ${A-66} ${S+34} ${A-30} ${S} ${A}Z"></path>`}function We(){let o=Et*Math.PI/180,r=(Et+Pt)*Math.PI/180;return`M${(S+V*Math.cos(o)).toFixed(2)} ${(A+V*Math.sin(o)).toFixed(2)}
    A${V} ${V} 0 1 1 ${(S+V*Math.cos(r)).toFixed(2)} ${(A+V*Math.sin(r)).toFixed(2)}`}function ai(o){let r=(Et+o*Pt)*Math.PI/180,t=V-8,e=V+8;return $`<line class="notch"
    x1=${(S+t*Math.cos(r)).toFixed(1)} y1=${(A+t*Math.sin(r)).toFixed(1)}
    x2=${(S+e*Math.cos(r)).toFixed(1)} y2=${(A+e*Math.sin(r)).toFixed(1)}></line>`}function te(o){return Math.max(0,Math.min(1,o))}var je=`:host {
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

`;var rt=class extends v{constructor(){super(...arguments);this.text="";this.open=!1;this.toggle=t=>{t.stopPropagation(),t.preventDefault(),this.open=!this.open,this.open?(this.place(),document.addEventListener("click",this.elsewhere,!0)):document.removeEventListener("click",this.elsewhere,!0)};this.elsewhere=t=>{t.composedPath().includes(this)||(this.open=!1,document.removeEventListener("click",this.elsewhere,!0))}}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this.elsewhere,!0)}render(){return this.text?a`
      <button
        data-open=${String(this.open)}
        aria-label="What this does"
        aria-expanded=${String(this.open)}
        @click=${this.toggle}
      >
        ?
      </button>
      ${this.open?a`<div class="said" role="tooltip">${this.text}</div>`:p}
    `:p}async place(){let t=(await this.updateComplete,this.shadowRoot?.querySelector(".said"));if(!(t instanceof HTMLElement))return;t.style.removeProperty("transform");let e=(this.closest(".sheet")??this.offsetParent??document.body).getBoundingClientRect(),i=t.getBoundingClientRect(),s=10,n=Math.max(0,e.left+s-i.left)-Math.max(0,i.right-e.right+s);n&&(t.style.transform=`translateX(${Math.round(n)}px)`)}};rt.styles=b(je),d([u()],rt.prototype,"text",2),d([f()],rt.prototype,"open",2),rt=d([y("echolocal-bubble")],rt);var Fe=`.sheet {
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
`;var qe=`:host {
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
`;var P=class extends v{constructor(){super(...arguments);this.light="";this.muted="";this.failure="";this.room="";this.target="rest"}render(){let t=this.hass.states[this.light];if(!t)return p;let e=this.situations(),i=e.find(n=>n.key===this.target)??e[0],s=t.attributes.brightness??255;return a`
      <div class="dim">
        <span>Brightness</span>
        <input
          type="range"
          min="1"
          max="255"
          .value=${String(s)}
          ?disabled=${t.state!=="on"}
          @change=${n=>this.hass.callService("light","turn_on",{entity_id:this.light,brightness:Number(n.target.value)})}
        />
        <b>${Math.round(s/255*100)}%</b>
      </div>

      <div class="when">
        ${e.map(n=>a`<button
            class="situation"
            data-on=${String(n.key===i.key)}
            @click=${()=>this.target=n.key}
          >
            <ha-icon .icon=${n.icon}></ha-icon>
            <div class="text">
              <div class="label">${n.label}</div>
              <div class="shows">${this.showing(n)||"None"}</div>
            </div>
          </button>`)}
      </div>

      <div class="caption">${i.label} shows</div>
      <div class="options">
        ${this.options(i).map(n=>a`<button
            class="option"
            data-on=${String(n===this.showing(i))}
            @click=${()=>this.choose(i,n)}
          >
            ${n}
          </button>`)}
      </div>
    `}situations(){return[{key:"rest",label:"At rest",icon:"mdi:record-circle-outline"},{key:"muted",label:"Muted",icon:"mdi:microphone-off",entity:this.muted},{key:"failure",label:"On failure",icon:"mdi:alert-circle-outline",entity:this.failure},{key:"room",label:"Follows the room",icon:"mdi:motion-sensor",entity:this.room}].filter(e=>e.key==="rest"||e.entity&&this.hass.states[e.entity])}showing(t){return t.entity?this.hass.states[t.entity]?.state??"":this.hass.states[this.light]?.attributes.effect??""}options(t){return(t.entity?this.hass.states[t.entity]?.attributes.options:this.hass.states[this.light]?.attributes.effect_list)??[]}choose(t,e){if(!t.entity){this.hass.callService("light","turn_on",{entity_id:this.light,effect:e});return}this.hass.callService("select","select_option",{entity_id:t.entity,option:e})}};P.styles=b(qe),d([u({attribute:!1})],P.prototype,"hass",2),d([u()],P.prototype,"light",2),d([u()],P.prototype,"muted",2),d([u()],P.prototype,"failure",2),d([u()],P.prototype,"room",2),d([f()],P.prototype,"target",2),P=d([y("echolocal-appearance")],P);var pi=[[/_microphone_mute$/,"Cuts the microphones in hardware. The device cannot hear anything at all while this is on, including its wake word \u2014 it is a switch on the power to the capsules, not a software mute."],[/_microphone_gain$/,"How much the capsules are amplified before anything else happens. Raise it in a large or quiet room; lower it if speech close to the device clips and comes out distorted."],[/_microphone_mixing$/,"How the seven capsules are combined into the one channel the speech engine hears. Beamforming favours whichever direction someone is talking from and rejects the rest of the room; averaging treats every direction equally and is steadier when several people talk."],[/_microphone_leveling$/,"Evens out loud and quiet talkers so a whisper across the room and a shout beside it arrive at similar volume. Helps transcription, and costs a little dynamic range."],[/_microphone_echo_cancellation$/,"Subtracts what the speaker is playing from what the microphones hear, so the device can be interrupted while it is talking and does not answer its own reply."],[/_room_sensitivity$/,"How much louder than the room's own noise floor a sound has to be before the device treats it as somebody talking. Raise it in a noisy room to stop the device reacting to the room itself; lower it if quiet speech is missed."],[/_room_level$/,"How loud the room is right now, in decibels below full scale. Nothing to set \u2014 it is what the sensitivity is measured against, and watching it is how you pick a sensible one."],[/_room_floor$/,"The quietest the room has been recently, which is the baseline the device compares against. It drifts with the room, so a fridge switching on raises it rather than fooling the device."],[/_mute_led_brightness$/,"How bright the red ring is while the microphones are cut. Dim is enough to see in a dark room without lighting it up."],[/_led_ring$/,"The whole ring, as one light. Turning it off leaves the device working normally and silent about it."],[/_led_ring_segment_\d+$/,"One of the twelve segments, addressable on its own. They ship switched off in Home Assistant because twelve extra lights in every list is rarely what anyone wants \u2014 enable one and it can be coloured individually from the card."],[/_ring_while_muted$/,"What the ring does while the microphones are cut. Something visible is worth choosing: a muted device that looks identical to a listening one is how people end up talking to a device that cannot hear them."],[/_ring_on_failure$/,"What the ring does when a turn fails \u2014 no network, no pipeline, nothing understood. Distinct from the normal colours on purpose."],[/_ring_follows_the_room$/,"Lets the ring track how loud the room is while the device is listening, so somebody can see that it is hearing them before it answers."],[/_headphones$/,"Sends audio out of the jack instead of the speaker. The speaker goes quiet while this is on."],[/_white_noise_layer_\d+$/,"Plays a generated sound the device makes itself \u2014 rain, a fan, a brook. Nothing is streamed and nothing is stored: it is synthesised as it plays, so it never loops or runs out. Two layers can overlap, so rain over a fan is one choice in each."],[/_music_during_a_turn$/,"What happens to music when someone says the wake word. Ducking drops the volume and keeps playing, which resumes on the same note; stopping does not."],[/_music_ducking$/,"How far the volume drops while the device is listening or talking. Far enough that the microphones are not fighting the music, not so far that the room goes silent."],[/_voice_resampling$/,"How the reply's audio is resampled to what the speaker wants. Better quality costs a little more work on a device that has four small cores."],[/_wake_word/,"What this assistant listens for. The list is what the device has on disk plus whatever Home Assistant is offering from its custom_wake_words directory."],[/_(?:wake_)?threshold$/,"How sure the device has to be before it decides it heard its wake word. Lower it if it misses you; raise it if the television sets it off."],[/_follow_up$/,"Keeps listening for a moment after a reply, so a second question needs no second wake word."],[/_max_listen/,"How long the device will wait for someone to finish talking before giving up on the turn."],[/_max_think/,"How long to wait for Home Assistant's pipeline to answer. Generous is usually right \u2014 a slow answer beats a turn that dies just before it arrives."],[/_effect$/,"What the ring does at this point in a turn. Cosmetic, but it is how somebody knows the device heard them."],[/_tone$/,"A short sound at this point in a turn. Some people want the confirmation; some find it grating."],[/_reply_buffer/,"How much of a reply to collect before starting to play it. More is steadier on a poor network, at the cost of answering a beat later."],[/_reply_delivery/,"Whether a reply starts playing as it arrives or once all of it has. Streaming is faster to start and stutters on a bad connection."],[/_update_channel$/,"Which releases this device is offered. Stable only, or the ones that are still being tried out."],[/_check_for_updates$/,"Looks now rather than waiting for the next scheduled check. Nothing is installed by pressing it."],[/_bluetooth_proxy$/,"Forwards nearby Bluetooth advertisements to Home Assistant, so this device extends Bluetooth coverage into its room. It costs some radio time it would otherwise spend on wifi."],[/_metrics_interval$/,"How often the device reports its own temperature, memory and load. Often enough to be useful; every report is work the device does instead of listening."],[/_purge_cache$/,"Deletes what Android's runtime has cached. It comes back on its own, so this buys disk space for a while rather than permanently."],[/_test_playback$/,"Plays a short sound, which is the quickest way to find out whether the speaker, the volume and the output route are all what you think they are."],[/_remote_adb$/,"Opens Android's debugging port over the network. Off by default, and worth leaving off: it is an unauthenticated way onto the device for anything on the same network."],[/_wifi_signal$/,"How strong the connection to the access point is. Above about -70 dBm is comfortable; below -80 dBm is where audio starts arriving late."],[/_cpu_temperature$/,"The chip's own temperature. These run warm by design \u2014 it is a sustained climb rather than a number that matters."],[/_load_average$/,"How much work is queued across the cores. Listening for a wake word is continuous work, so this is never zero."],[/_memory_available$/,"How much memory is free. Wake models and the audio path are what use it."],[/_free_space$/,"Disk left. Wake models and saved recordings are what fill it."],[/_update_status$/,"What the last self-update did. Worth reading when a device is on an older version than the rest."]],hi={array:"The seven capsules and what the room sounds like to them. The arc is how loud the room is right now; the notch is how far above the room's own noise floor something has to be before the device treats it as speech. Drag the notch, then talk from where you normally would and watch whether the arc crosses it.",appearance:"Everything the ring does, in one place. Brightness applies to all of it; the four situations below are what colour it takes when the device is idle, muted, has failed, or is showing how loud the room is.",turn:"A turn's budget, end to end. The two grips are how long the device will wait for someone to finish talking, and how long it will wait for Home Assistant to answer. The band is what a slow turn would spend.",noise:"Sounds the device generates itself, mixed live rather than played from a file, so nothing loops. Two layers overlap \u2014 pick rain in one and a fan in the other.",volume:"The speaker's volume, in the same thirty steps the buttons on the device move it through, so this dial and the device agree.",history:"What the device has been hearing. Rows rebuilt from Home Assistant's recorder show what was said; rows the device itself reported also show where the time went and can be played back."},ui={microphone:"The seven microphones and how the room sounds to them. Everything here changes what the device hears before a word of it reaches Home Assistant, so it is the first place to look when it mishears or does not wake at all.",ring:"The twelve-segment light. None of it changes what the device does \u2014 it changes what somebody in the room can tell about it, which is why the muted and failed colours are worth setting.",playback:"The speaker: what comes out of it, how loud, and what happens to music when somebody talks to the device.",assistant:"One wake word and the turn that follows it. A device can run more than one, each with its own word, sensitivity and timings, which is how one device answers to two names.",device:"The device itself rather than anything it hears or says: which releases it takes, what else it does for the network, and the housekeeping.",diagnostics:"What the device reports about itself. Nothing here is a setting \u2014 it is the evidence, and it is what to read before changing anything else."};function Be(o){return pi.find(([r])=>r.test(o))?.[1]}function Ie(o){return hi[o]}function Ge(o){return ui[o]??""}var zt="echolocal_turn";var Ve="turn_audio";var mi=[{key:"wake_ms",label:"Wake"},{key:"listen_ms",label:"Listen"},{key:"think_ms",label:"Think"},{key:"speak_ms",label:"Reply"}];function wt(o){return mi.map(({key:r,label:t})=>({key:r,label:t,ms:Number(o[r]??0)})).filter(r=>r.ms>0)}function nt(o){return wt(o).reduce((r,t)=>r+t.ms,0)}function Nt(o){let r=o;if(!r||r.version!=="1"||!r.wake_word)return null;let t={version:1,mac:(r.mac??"").toLowerCase(),id:r.id??"",slot:Ke(r.slot)??1,wake_word:r.wake_word,outcome:r.outcome??"completed"};r.heard&&(t.heard=r.heard),r.reply&&(t.reply=r.reply);for(let e of["wake_ms","listen_ms","think_ms","speak_ms","audio_seconds","peak_db","floor_db"]){let i=Ke(r[e]);i!==void 0&&(t[e]=i)}return t}function Ke(o){if(o===void 0||o==="")return;let r=Number(o);return Number.isFinite(r)?r:void 0}var Xe=`:host {
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
`;var ee=new Map;function Ye(o){return ee.get(o)}function Ze(o,r,t){let i=`${r.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"")}_${t}`;return o?.services?.esphome?.[i]?i:void 0}async function Je(o,r,t){let e=ee.get(t);if(e)return e;let i=[],s="audio/wav",n=1;for(let c=0;c<Math.min(n,64);c++){let m=await fi(o,r,t,c);if(!m)return null;n=m.pages||1,s=m.mime||s,i.push(vi(m.data))}let l=URL.createObjectURL(new Blob(i,{type:s}));return ee.set(t,l),l}async function fi(o,r,t,e){try{let s=(await o.callService("esphome",r,{id:t,page:e},void 0,!0,!0))?.response;return s?.version===1&&typeof s.data=="string"?s:null}catch{return null}}function vi(o){let r=atob(o),t=new Uint8Array(r.length);for(let e=0;e<r.length;e++)t[e]=r.charCodeAt(e);return t}var Qe=`:host {
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
`;var at=null,R=class extends v{constructor(){super(...arguments);this.device="";this.turn="";this.filename="recording.wav";this.busy=!1;this.playing=!1;this.play=async()=>{if(this.playing){at?.audio.pause();return}let t=await this.fetch();if(!t)return;at?.stop();let e=new Audio(t),i=()=>{this.playing=!1,at?.audio===e&&(at=null)};e.addEventListener("ended",i),e.addEventListener("pause",i),at={audio:e,stop:()=>e.pause()},this.playing=!0,e.play().catch(i)};this.save=async()=>{let t=await this.fetch();if(!t)return;let e=document.createElement("a");e.href=t,e.download=this.filename,e.click()}}disconnectedCallback(){super.disconnectedCallback(),this.playing&&at?.audio.pause()}render(){return!this.turn||!this.action()?p:a`
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
    `}action(){return this.device?Ze(this.hass,this.device,Ve):void 0}async fetch(){let t=Ye(this.turn);if(t)return t;let e=this.action();if(!e)return null;this.busy=!0;try{return await Je(this.hass,e,this.turn)}finally{this.busy=!1}}};R.styles=b(Qe),d([u({attribute:!1})],R.prototype,"hass",2),d([u()],R.prototype,"device",2),d([u()],R.prototype,"turn",2),d([u()],R.prototype,"filename",2),d([f()],R.prototype,"busy",2),d([f()],R.prototype,"playing",2),R=d([y("echolocal-recording")],R);var Le=24,tr=12,yi=4e3,M=class extends v{constructor(){super(...arguments);this.mac="";this.wake="";this.heard="";this.reply="";this.device="";this.recorded=[];this.live=[];this.asked=!1}updated(){this.asked||!this.hass||!this.wake||(this.asked=!0,this.load(),this.listen())}disconnectedCallback(){super.disconnectedCallback(),this.stop?.()}render(){let t=this.merged();return a`
      <div class="caption">
        Recent turns ${t.length?a`<span>last ${Le} hours</span>`:p}
      </div>
      ${t.length?a`<div class="turns">${t.map(e=>this.row(e,this.scale(t)))}</div>`:a`<div class="none">${this.asked?"Nothing in the last day.":"Looking\u2026"}</div>`}
    `}scale(t){return Math.max(1,...t.map(e=>e.turn?nt(e.turn):0))}row(t,e){let i=t.turn,s=i?wt(i):[],n=i?nt(i):0;return a`<div class="turn">
      <div class="when">${$i(t.at)}</div>
      <div class="wake">${t.wake}</div>
      <div class="right">
        ${i?a`<div class="outcome" data-bad=${String(i.outcome!=="completed")}>
              ${i.outcome==="completed"?`${(n/1e3).toFixed(1)}s`:i.outcome}
            </div>`:p}
        ${i?.audio_seconds?a`<echolocal-recording
              .hass=${this.hass}
              .device=${this.device}
              .turn=${i.id}
              .filename=${_i(t)}
            ></echolocal-recording>`:p}
      </div>
      ${t.heard?a`<div class="said">${t.heard}</div>`:p}
      ${t.reply?a`<div class="said-back">${t.reply}</div>`:p}
      ${s.length?a`<div class="bar">
              ${s.map(l=>a`<div
                  class="slice"
                  data-phase=${l.key}
                  title=${`${l.label} ${l.ms} ms`}
                  style=${`flex:0 0 ${l.ms/e*100}%`}
                ></div>`)}
            </div>
            <div class="legend">
              ${s.map(l=>a`<span>${l.label} ${(l.ms/1e3).toFixed(1)}s</span>`)}
            </div>`:p}
    </div>`}merged(){let t=[...this.live];for(let e of this.recorded)t.some(i=>Math.abs(i.at-e.at)<yi)||t.push(e);return t.sort((e,i)=>i.at-e.at).slice(0,tr)}async load(){let t=[this.wake,this.heard,this.reply].filter(Boolean),e=new Date(Date.now()-Le*36e5).toISOString();try{let i=await this.hass.callWS({type:"history/history_during_period",start_time:e,entity_ids:t,minimal_response:!0,no_attributes:!0});this.recorded=xi(re(i[this.wake]),re(i[this.heard]),re(i[this.reply]))}catch{this.recorded=[]}}async listen(){if(this.hass.connection)try{this.stop=await this.hass.connection.subscribeEvents(t=>{let e=Nt(t.data);e&&(this.mac&&e.mac&&e.mac!==this.mac||(this.live=[{at:Date.now(),wake:e.wake_word,heard:e.heard,reply:e.reply,turn:e},...this.live].slice(0,tr)))},zt)}catch{}}};M.styles=b(Xe),d([u({attribute:!1})],M.prototype,"hass",2),d([u()],M.prototype,"mac",2),d([u()],M.prototype,"wake",2),d([u()],M.prototype,"heard",2),d([u()],M.prototype,"reply",2),d([u()],M.prototype,"device",2),d([f()],M.prototype,"recorded",2),d([f()],M.prototype,"live",2),d([f()],M.prototype,"asked",2),M=d([y("echolocal-history")],M);function re(o){return(o??[]).map(r=>({at:r.lu?r.lu*1e3:Date.parse(r.last_updated??""),value:r.s??r.state??""})).filter(r=>Number.isFinite(r.at)&&wi(r.value))}function xi(o,r,t){let e=[...o].sort((s,n)=>n.at-s.at),i=s=>[...s].sort((n,l)=>n.at-l.at);return e.map((s,n)=>{let l=e[n-1]?.at??1/0,c=m=>i(m).find(h=>h.at>=s.at&&h.at<l)?.value;return{at:s.at,wake:s.value,heard:c(r),reply:c(t)}})}function wi(o){return!!o&&o!=="unknown"&&o!=="unavailable"&&o!=="None"}function $i(o){return new Date(o).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function _i(o){let r=new Date(o.at).toISOString().replace(/[:.]/g,"-").slice(0,19),t=o.wake.toLowerCase().replace(/[^a-z0-9]+/g,"-");return`${r}-${t}.wav`}var er=`:host {
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
`;var rr=`:host {
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
`;var ie=135,se=270,Ot=100,Ut=100,lt=78,Ai={White:"mdi:grain",Pink:"mdi:blur",Brown:"mdi:waveform",Rain:"mdi:weather-pouring",Ocean:"mdi:waves",Brook:"mdi:water",Wind:"mdi:weather-windy",Fire:"mdi:fireplace",Crickets:"mdi:bug-outline",Fan:"mdi:fan",Cabin:"mdi:airplane"},ct="None",X=class extends v{constructor(){super(...arguments);this.player="";this.jack="";this.grab=t=>{let e=t.currentTarget;e.setPointerCapture(t.pointerId);let i=c=>{let m=e.getBoundingClientRect(),h=c.clientX-m.left-m.width/2,g=c.clientY-m.top-m.height/2,x=Math.atan2(g,h)*180/Math.PI-ie;for(;x<0;)x+=360;let w=Math.max(0,Math.min(1,Math.min(x,se)/se));return Math.round(w*30)/30},s=c=>this.hass.callService("media_player","volume_set",{entity_id:this.player,volume_level:i(c)}),n=c=>s(c),l=c=>{e.removeEventListener("pointermove",n),e.removeEventListener("pointerup",l),e.removeEventListener("pointercancel",l),s(c)};e.addEventListener("pointermove",n),e.addEventListener("pointerup",l),e.addEventListener("pointercancel",l),s(t)}}render(){let t=this.hass.states[this.player];if(!t)return p;let e=Number(t.attributes.volume_level??0),i=t.attributes.is_volume_muted===!0,s=this.jack?this.hass.states[this.jack]?.state==="on":!1;return a`
      <div class="dial" @pointerdown=${this.grab}>
        <svg viewBox="0 0 200 200" role="img" aria-label="Volume">
          <path class="bed" d=${ir()} pathLength="100"></path>
          ${e>0?$`<path class="live" data-muted=${String(i)} d=${ir()} pathLength="100"
                stroke-dasharray=${`${e*100} 100`}></path>`:p}
          <text class="step" x=${Ot} y=${Ut+4}>${Math.round(e*30)}</text>
          <text class="of" x=${Ot} y=${Ut+20}>of 30</text>
        </svg>
      </div>

      <div class="side">
        <div class="state">${Ci(t.state)}</div>
        <div class="badges">
          <div class="badge" data-on=${String(i)}>
            <ha-icon .icon=${i?"mdi:volume-off":"mdi:volume-high"}></ha-icon>
            ${i?"Muted":`${Math.round(e*100)}%`}
          </div>
          ${this.jack?a`<div class="badge" data-on=${String(s)}>
                <ha-icon icon="mdi:headphones"></ha-icon>
                ${s?"Headphones":"Speaker"}
              </div>`:p}
        </div>
      </div>
    `}};X.styles=b(rr),d([u({attribute:!1})],X.prototype,"hass",2),d([u()],X.prototype,"player",2),d([u()],X.prototype,"jack",2),X=d([y("echolocal-volume")],X);var Y=class extends v{constructor(){super(...arguments);this.layers=[];this.busy=!1}render(){let t=this.layers.map(n=>this.hass.states[n]?.state??ct),e=(this.hass.states[this.layers[0]]?.attributes.options??[]).filter(n=>n!==ct),i=t.every(n=>n!==ct),s=n=>t.indexOf(n);return a`
      <div class="caption">
        Generated sound
        <span>${i?"Both layers in use":`${t.filter(n=>n!==ct).length} of 2`}</span>
      </div>
      <div class="grid">
        ${e.map(n=>{let l=s(n);return a`<button
            class="sound"
            data-on=${String(l>=0)}
            ?disabled=${this.busy}
            @click=${()=>this.pick(n,l,t)}
          >
            <ha-icon .icon=${Ai[n]??"mdi:music-note"}></ha-icon>
            ${n}
            ${l>=0&&this.layers.length>1?a`<span class="layer">${l+1}</span>`:p}
          </button>`})}
      </div>
    `}async pick(t,e,i){let s=i.findIndex(l=>l===ct),n=e>=0?e:s>=0?s:this.layers.length-1;if(!(n<0)){this.busy=!0;try{await this.hass.callService("select","select_option",{entity_id:this.layers[n],option:e>=0?ct:t})}finally{this.busy=!1}}}};Y.styles=b(er),d([u({attribute:!1})],Y.prototype,"hass",2),d([u({attribute:!1})],Y.prototype,"layers",2),d([f()],Y.prototype,"busy",2),Y=d([y("echolocal-noise")],Y);function Ci(o){return o==="playing"?"Playing":o==="paused"?"Paused":o==="unavailable"?"Unavailable":"Idle"}function ir(){let o=ie*Math.PI/180,r=(ie+se)*Math.PI/180;return`M${(Ot+lt*Math.cos(o)).toFixed(2)} ${(Ut+lt*Math.sin(o)).toFixed(2)}
    A${lt} ${lt} 0 1 1 ${(Ot+lt*Math.cos(r)).toFixed(2)} ${(Ut+lt*Math.sin(r)).toFixed(2)}`}var sr=`:host {
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
`;var q=class extends v{constructor(){super(...arguments);this.listen="";this.think="";this.held={}}render(){let t=this.reading(this.listen),e=this.reading(this.think);if(!t||!e)return p;let i=t.max+e.max,s=n=>n/i*100;return a`
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
    `}grip(t,e,i,s){return a`<div
      class="grip"
      style=${`left:calc(${i}px + ${s}% - ${i*s/100}px)`}
      role="slider"
      aria-label=${t}
      aria-valuenow=${e.value}
      @pointerdown=${n=>this.drag(n,t,e)}
    ></div>`}drag(t,e,i){let s=t.currentTarget.parentElement;s.setPointerCapture(t.pointerId);let n=e===this.listen?this.reading(this.think):this.reading(this.listen),l=e===this.think?this.reading(this.listen)?.value??0:0,c=(i.max??0)+(n?.max??0),m=x=>{let w=s.getBoundingClientRect(),k=64,T=w.width-k,qt=Math.max(0,Math.min(1,(x.clientX-w.left-k)/T))*c-l,ht=Math.round(qt/(i.step||1))*(i.step||1);return Math.max(i.min,Math.min(i.max,ht))},h=x=>{this.held={...this.held,[e]:m(x)}},g=x=>{s.removeEventListener("pointermove",h),s.removeEventListener("pointerup",g),s.removeEventListener("pointercancel",g);let w=m(x),{[e]:k,...T}=this.held;this.held=T,this.hass.callService("number","set_value",{entity_id:e,value:w})};s.addEventListener("pointermove",h),s.addEventListener("pointerup",g),s.addEventListener("pointercancel",g)}reading(t){let e=this.hass?.states?.[t];if(!e)return null;let i=this.held[t]??Number(e.state);return Number.isFinite(i)?{value:i,min:e.attributes.min??0,max:e.attributes.max??30,step:e.attributes.step??1}:null}};q.styles=b(sr),d([u({attribute:!1})],q.prototype,"hass",2),d([u()],q.prototype,"listen",2),d([u()],q.prototype,"think",2),d([f()],q.prototype,"held",2),q=d([y("echolocal-turn")],q);var C=class extends v{constructor(){super(...arguments);this.heading="";this.subtitle="";this.icon="";this.sections=[];this.widgets=[];this.strip=[];this.device="";this.mac="";this.help=!0;this.about="";this.held={}}render(){let t=this.sections.map(s=>({...s,entities:s.entities.filter(n=>this.hass.states?.[n])})).filter(s=>s.entities.length),i=t.reduce((s,n)=>s+n.entities.length,0)>3||this.widgets.some(s=>s.place!=="header")?820:460;return a`
      <ha-dialog open hideActions @closed=${this.dismiss}>
        <div class="sheet" style=${`width:min(88vw,${i}px)`}>
          <div class="head">
            <div class="crest"><ha-icon .icon=${this.icon}></ha-icon></div>
            <div class="titles">
              <div class="title">
                ${this.heading}
                ${this.help&&this.about?a`<echolocal-bubble .text=${this.about}></echolocal-bubble>`:p}
              </div>
              ${this.subtitle?a`<div class="subtitle">${this.subtitle}</div>`:p}
            </div>
            ${this.widgets.filter(s=>s.place==="header").map(s=>this.widget(s))}
          </div>
          ${this.widgets.filter(s=>s.place!=="header").map(s=>this.explained(s))}
          <div class="groups">
            ${t.length?t.map(s=>this.group(s)):this.widgets.length?p:a`<div class="empty">Nothing to show here.</div>`}
          </div>
        </div>
      </ha-dialog>
    `}widget({widget:t,roles:e,lists:i}){let s=n=>n?.[0]??"";switch(t){case"appearance":return a`<echolocal-appearance
          class="hero"
          .hass=${this.hass}
          .light=${e.light}
          .muted=${s(i.muted)}
          .failure=${s(i.failure)}
          .room=${s(i.room)}
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
          .wake=${e.wake}
          .heard=${e.heard??""}
          .reply=${e.reply??""}
          .device=${this.device}
          .mac=${this.mac}
        ></echolocal-history>`;case"turn":return a`<echolocal-turn
          class="hero"
          .hass=${this.hass}
          .listen=${e.listen}
          .think=${e.think}
        ></echolocal-turn>`;case"volume":return a`<echolocal-volume
          class="hero"
          .hass=${this.hass}
          .player=${e.player}
          .jack=${s(i.jack)}
        ></echolocal-volume>`;case"noise":return a`<echolocal-noise
          class="hero"
          .hass=${this.hass}
          .layers=${i.layers??[]}
        ></echolocal-noise>`;case"player":return this.crownPlayer(e.player);case"power":return this.crownPower(e.light);case"mute":return this.crownMute(e.mute,e.lamp)}}crownPlayer(t){let e=this.hass.states[t],i=e?.state==="playing",s=e?.attributes.is_volume_muted!==!0;return a`<div class="crown">
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
    </div>`}crownPower(t){return a`<div class="crown">
      <button
        class="toggle big power"
        data-on=${String(this.hass.states[t]?.state==="on")}
        aria-label="Ring"
        @click=${()=>this.hass.callService("light","toggle",{entity_id:t})}
      ></button>
    </div>`}crownMute(t,e){let i=this.hass.states[e];return a`<div class="crown">
      ${i?a`<div class="lamp" title="Mute indicator">
            <ha-icon icon="mdi:brightness-6"></ha-icon>
            ${(i.attributes.options??[]).map(s=>a`<button
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
    </div>`}get muted(){let t=this.widgets.find(e=>e.roles.mute)?.roles.mute;return!!t&&this.hass.states[t]?.state==="on"}explained(t){let e=this.help?Ie(t.widget):void 0;return e?a`<div class="explained">
      ${this.widget(t)}
      <echolocal-bubble class="corner" .text=${e}></echolocal-bubble>
    </div>`:this.widget(t)}group(t){return a`<section class="group">
      ${t.title?a`<div class="section">${t.title}</div>`:p}
      ${t.entities.map(e=>this.row(e))}
    </section>`}row(t){let e=this.hass.states?.[t];if(!e)return p;let i=t.split(".")[0],s=this.name(t),n=e.attributes.icon;switch(i){case"switch":case"light":return this.toggle(t,s,n,i);case"number":return this.slider(t,s,n);case"select":return this.options(t,s,n);case"button":return this.press(t,s,n);default:return this.reading(t,s,n)}}toggle(t,e,i,s){let n=this.hass.states[t].state,l=n==="unavailable"?"unavailable":String(n==="on");return this.tile(t,e,i,l==="true",{trail:a`<button
        class="toggle"
        data-on=${l}
        aria-label=${e}
        @click=${()=>this.hass.callService(s,"toggle",{entity_id:t})}
      ></button>`})}slider(t,e,i){let s=this.hass.states[t],n=s.attributes,l=n.min??0,c=n.max??100,m=this.held[t]??Number(s.state),h=c>l?(m-l)/(c-l)*100:0;return this.tile(t,e,i,!1,{trail:a`<span class="reading">${Number.isNaN(m)?"\u2014":m}</span>
        ${n.unit_of_measurement?a`<span class="unit">${n.unit_of_measurement}</span>`:p}`,under:a`<input
        type="range"
        style="--fill:${h}%"
        .value=${String(m)}
        min=${l}
        max=${c}
        step=${n.step??1}
        ?disabled=${s.state==="unavailable"}
        @input=${g=>{this.held={...this.held,[t]:Number(g.target.value)}}}
        @change=${g=>{let x=Number(g.target.value),{[t]:w,...k}=this.held;this.held=k,this.hass.callService("number","set_value",{entity_id:t,value:x})}}
      />`})}options(t,e,i){let s=this.hass.states[t],n=s.attributes.options??[],l=c=>this.hass.callService("select","select_option",{entity_id:t,option:c});return n.length>4?this.tile(t,e,i,!1,{under:a`<select
          ?disabled=${s.state==="unavailable"}
          @change=${c=>l(c.target.value)}
        >
          ${n.map(c=>a`<option value=${c} ?selected=${c===s.state}>${c}</option>`)}
        </select>`}):this.tile(t,e,i,!1,{under:a`<div class="options">
        ${n.map(c=>a`<button
            class="chip"
            data-on=${String(c===s.state)}
            @click=${()=>l(c)}
          >
            ${c}
          </button>`)}
      </div>`})}press(t,e,i){return this.tile(t,e,i,!1,{trail:a`<button
        class="press"
        @click=${()=>this.hass.callService("button","press",{entity_id:t})}
      >
        Run
      </button>`})}reading(t,e,i){let s=this.hass.states[t],n=s.attributes.unit_of_measurement;return this.tile(t,e,i,!1,{trail:a`<button class="reading" @click=${()=>this.moreInfo(t)}>
          ${s.state}
        </button>
        ${n?a`<span class="unit">${n}</span>`:p}`})}tile(t,e,i,s,n){let l=s&&i?.includes("mic")&&i.includes("off"),c=this.help?Be(t):void 0;return a`<div class="tile" data-active=${String(s&&!l)} data-alert=${String(!!l)}>
      <div class="top">
        <div class="icon"><ha-icon .icon=${i??"mdi:tune"}></ha-icon></div>
        <div class="named">
          <div class="name">${e}</div>
          ${c?a`<echolocal-bubble .text=${c}></echolocal-bubble>`:p}
        </div>
        ${n.trail?a`<div class="trail">${n.trail}</div>`:p}
      </div>
      ${n.under??p}
    </div>`}name(t){let e=this.hass.states[t].attributes.friendly_name??t,i=this.strip.filter(Boolean);for(let s=!0;s;){s=!1;for(let n of i)e.toLowerCase().startsWith(`${n.toLowerCase()} `)&&(e=e.slice(n.length+1),s=!0)}return e.charAt(0).toUpperCase()+e.slice(1)}moreInfo(t){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}dismiss(){this.dispatchEvent(new CustomEvent("closed",{bubbles:!0,composed:!0}))}};C.styles=b(Fe),d([u({attribute:!1})],C.prototype,"hass",2),d([u()],C.prototype,"heading",2),d([u()],C.prototype,"subtitle",2),d([u()],C.prototype,"icon",2),d([u({attribute:!1})],C.prototype,"sections",2),d([u({attribute:!1})],C.prototype,"widgets",2),d([u({attribute:!1})],C.prototype,"strip",2),d([u()],C.prototype,"device",2),d([u()],C.prototype,"mac",2),d([u({type:Boolean})],C.prototype,"help",2),d([u()],C.prototype,"about",2),d([f()],C.prototype,"held",2),C=d([y("echolocal-dialog")],C);var Hi="EchoLocal";function H(o){return o?Object.values(o.devices??{}).filter(r=>r.manufacturer===Hi&&!r.via_device_id&&!r.disabled_by).sort((r,t)=>_(r).localeCompare(_(t))):[]}function _(o){return o?.name_by_user||o?.name||""}function B(o,r){if(!o||!r)return null;let t=o.devices?.[r];if(!t)return null;let e=Object.values(o.devices).filter(h=>h.via_device_id===r&&!h.disabled_by).sort((h,g)=>_(h).localeCompare(_(g))),i=new Set([r,...e.map(h=>h.id)]),s=Object.values(o.entities??{}).filter(h=>h.device_id&&i.has(h.device_id)&&!h.hidden),n=(h,g=!1)=>s.filter(x=>x.entity_id.startsWith(`${h}.`)&&(!g||!x.entity_category)),l=n("light",!0),c=h=>/_\d+$/.test(h.entity_id),m=new Array(12).fill(void 0);for(let h of l.filter(c)){let g=oe(h.entity_id)-1;g>=0&&g<12&&(m[g]=h.entity_id)}return{device:t,parts:e,entities:s,satellite:n("assist_satellite")[0]?.entity_id,player:n("media_player")[0]?.entity_id,update:n("update")[0]?.entity_id,ring:(l.find(h=>!c(h))??l[0])?.entity_id,segments:m,mute:n("switch",!0)[0]?.entity_id}}function oe(o){return Number.parseInt(o.match(/_(\d+)$/)?.[1]??"0",10)}function ne(o,r,t){let e=i=>!!i&&o.entities?.[i]?.device_id===t.id;return e(r.ring)?"ring":e(r.player)?"playback":e(r.mute)?"microphone":"assistant"}function or(o,r){return o.entities.filter(t=>t.device_id===r)}function $t(o,r){let t=r?o?.states?.[r]:void 0;return!t||t.state!=="on"?null:{rgb:t.attributes.rgb_color??[255,255,255],level:(t.attributes.brightness??255)/255}}function nr(o,r){return!!r&&o?.states?.[r]?.state==="on"}function ar(o,r){return(r?o?.states?.[r]?.state:void 0)??"unavailable"}var ae={ring:[{title:null,rows:[/_led_ring$/]},{title:"Segments",rows:[/_led_ring_segment_\d+$/]}],microphone:[{title:null,rows:[/_microphone_mute$/]},{title:"Capture",rows:[/_microphone_gain$/,/_microphone_mixing$/,/_microphone_leveling$/,/_microphone_echo_cancellation$/]},{title:"The room",rows:[/_room_sensitivity$/,/_room_level$/,/_room_floor$/]},{title:"Indicator",rows:[/_mute_led_brightness$/]}],playback:[{title:null,rows:[/^media_player\./,/_headphones$/]},{title:"Generated sound",rows:[/_white_noise_layer_\d+$/]},{title:"During a turn",rows:[/_music_during_a_turn$/,/_music_ducking$/]},{title:"Voice",rows:[/_voice_resampling$/]}],assistant:[{title:null,rows:[/_wake_word/,/_sensitivity/,/_threshold/]},{title:"Timing",rows:[/_follow_up/]},{title:"Feedback",rows:[/_effect/,/_tone/]},{title:"Reply",rows:[/_reply_buffer/,/_reply_delivery/]}],device:[{title:null,rows:[/^update\./,/_update_channel$/,/_check_for_updates$/,/_update_status$/]},{title:"Bluetooth",rows:[/_bluetooth_proxy$/,/_ble_advertisements$/]},{title:"Maintenance",rows:[/_metrics_interval$/,/_purge_cache$/,/_cached_data$/,/_test_playback$/]}],diagnostics:[{title:"Network",rows:[/_ip_address$/,/_wifi_signal$/,/_wifi_sent$/,/_wifi_received$/]},{title:"Hardware",rows:[/_cpu_temperature$/,/_radio_temperature$/,/_cpu_cores/,/_load_average$/,/_memory_available$/,/_free_space$/]},{title:"The room",rows:[/_room_level$/,/_room_floor$/]},{title:"Last turn",rows:[/_last_wake_word$/,/_last_heard$/,/_last_reply$/]},{title:"Access",rows:[/_remote_adb$/,/_update_outcome$/]}]},Ti={ring:[{widget:"power",place:"header",roles:{light:/_led_ring$/}},{widget:"appearance",roles:{light:/_led_ring$/},lists:{segments:/_led_ring_segment_\d+$/,muted:/_ring_while_muted$/,failure:/_ring_on_failure$/,room:/_ring_follows_the_room$/}}],assistant:[{widget:"turn",roles:{listen:/_max_listen/,think:/_max_think/}}],playback:[{widget:"player",place:"header",roles:{player:/^media_player\./}},{widget:"volume",roles:{player:/^media_player\./},lists:{jack:/_headphones$/}},{widget:"noise",roles:{first:/_white_noise_layer_1$/},lists:{layers:/_white_noise_layer_\d+$/}}],microphone:[{widget:"mute",place:"header",roles:{mute:/_microphone_mute$/,lamp:/_mute_led_brightness$/}},{widget:"array",roles:{level:/_room_level$/,floor:/_room_floor$/,gate:/_room_sensitivity$/,mode:/_microphone_mixing$/}}]};function lr(o,r){let t=r.map(s=>s.entity_id),e=[],i=new Set;for(let s of Ti[o]??[]){let n={};for(let[c,m]of Object.entries(s.roles)){let h=t.find(g=>m.test(g));h&&(n[c]=h)}if(Object.keys(n).length!==Object.keys(s.roles).length)continue;let l={};for(let[c,m]of Object.entries(s.lists??{}))l[c]=t.filter(h=>m.test(h)).sort(Ei);e.push({widget:s.widget,place:s.place??"body",roles:n,lists:l}),[...Object.values(n),...Object.values(l).flat()].forEach(c=>i.add(c))}return{widgets:e,sections:le(ae[o],t.filter(s=>!i.has(s)))}}function cr(o,r){let t=[],e=[[o.device,!0],...o.parts.map(i=>[i,!1])];for(let[i,s]of e){let n=o.entities.filter(c=>c.device_id===i.id&&(c.entity_category==="config"||s&&!c.entity_category)).map(c=>c.entity_id);if(!n.length)continue;let l=le(ae[s?"device":r[i.id]],n);t.push({title:_(i),entities:l.flatMap(c=>c.entities)})}return t}function dr(o){let r=o.entities.filter(s=>s.entity_category==="diagnostic").map(s=>s.entity_id),t={};for(let[s,n]of Object.entries({wake:/_last_wake_word$/,heard:/_last_heard$/,reply:/_last_reply$/})){let l=r.find(c=>n.test(c));l&&(t[s]=l)}let e=t.wake?[{widget:"history",place:"body",roles:t,lists:{}}]:[],i=new Set(Object.values(t));return{widgets:e,sections:le(ae.diagnostics,r.filter(s=>!i.has(s)))}}function Ei(o,r){let t=e=>Number.parseInt(e.match(/_(\d+)$/)?.[1]??"0",10);return t(o)-t(r)}function le(o,r){let t=new Set(r),e=[];for(let i of o??[]){let s=[];for(let n of i.rows)for(let l of[...t].sort())n.test(l)&&(s.push(l),t.delete(l));s.length&&e.push({title:i.title,entities:s})}return t.size&&e.push({title:e.length?"More":null,entities:[...t].sort()}),e}var Pi=/_led_ring_segment_\d+$/;async function hr(o,r){let t=new Array(12).fill(void 0);if(!o.user?.is_admin)return t;try{let e=await o.callWS({type:"config/entity_registry/list"});for(let i of e){if(!i.disabled_by||!i.device_id||!r.has(i.device_id)||!Pi.test(i.entity_id))continue;let s=oe(i.entity_id)-1;s>=0&&s<12&&(t[s]=i.entity_id)}}catch{}return t}async function ur(o,r){await o.callWS({type:"config/entity_registry/update",entity_id:r,disabled_by:null})}var dt={ring:"mdi:record-circle-outline",microphone:"mdi:microphone",playback:"mdi:speaker",assistant:"mdi:account-voice",device:"mdi:cog-outline",diagnostics:"mdi:stethoscope",follow:"mdi:backup-restore",close:"mdi:check"},Ri=[["White",[255,255,255]],["Warm",[255,190,120]],["Red",[255,40,40]],["Orange",[255,130,20]],["Yellow",[250,230,60]],["Green",[60,220,90]],["Teal",[40,220,200]],["Blue",[60,140,255]],["Violet",[150,90,255]],["Pink",[255,90,200]]],zi={idle:"Idle",listening:"Listening",processing:"Thinking",responding:"Speaking",unavailable:"Unavailable",unknown:"Unknown"},z=class extends v{constructor(){super(...arguments);this.opened=null;this.picked=null;this.hiddenSegments=[];this.offering=null;this.asked=!1}static getConfigElement(){return document.createElement("echolocal-satellite-card-editor")}static getStubConfig(t){return{device_id:H(t)[0]?.id??""}}setConfig(t){if(!t?.device_id)throw new Error("Choose an EchoLocal device");this.config={shell:"grey",...t}}getCardSize(){return 6}updated(){if(this.asked||!this.hass||!this.config)return;let t=B(this.hass,this.config.device_id);!t||t.segments.some(Boolean)||(this.asked=!0,hr(this.hass,new Set([t.device.id,...t.parts.map(e=>e.id)])).then(e=>this.hiddenSegments=e))}render(){if(!this.hass||!this.config)return p;let t=B(this.hass,this.config.device_id);if(!t)return a`<ha-card><div class="missing">Device not found</div></ha-card>`;let e=ar(this.hass,t.satellite);return a`
      <ha-card>
        <div class="frame">
          <div class="art" data-shell=${this.config.shell??"grey"} data-activity=${e}>
            ${ze({segments:this.segments(t),glow:this.glow(t),muted:nr(this.hass,t.mute),picked:this.picked,divisible:[...t.segments,...this.hiddenSegments].some(Boolean)},{ring:()=>this.moreInfo(t.ring),segment:i=>this.tapped(t,i),action:()=>this.moreInfo(t.satellite),mute:()=>this.toggle("switch",t.mute),volume:i=>this.volume(t,i)})}
          </div>

          <div class="side">${this.side(t)}</div>

          ${this.offering!==null?this.offer(this.offering):this.picked===null?this.foot(t,e):this.palette(t)}
        </div>
      </ha-card>

      ${this.popup(t)}
    `}foot(t,e){return a`<div class="foot">
      <div class="label">
        <div class="name">${_(t.device)}</div>
        <div class="status">${zi[e]??e}</div>
      </div>
      <div class="tail">
        ${this.square(dt.device,"Settings",()=>this.open({kind:"device",cross:"settings"}))}
        ${this.square(dt.diagnostics,"Diagnostics",()=>this.open({kind:"diagnostics",cross:"diagnostics"}))}
      </div>
    </div>`}tapped(t,e){if(t.segments[e]){this.picked=this.picked===e?null:e;return}if(this.hiddenSegments[e]){this.offering=e;return}this.moreInfo(t.ring)}offer(t){let e=async i=>{for(let s of i)s&&await ur(this.hass,s);this.hiddenSegments=this.hiddenSegments.map(s=>i.includes(s)?void 0:s),this.offering=null,this.picked=t};return a`<div class="foot">
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
          ${this.square(dt.follow,"Follow the ring",()=>{this.hass.callService("light","turn_off",{entity_id:e}),this.picked=null})}
          ${this.square(dt.close,"Done",()=>this.picked=null)}
        </div>
      </div>
      <div class="swatches">
        ${Ri.map(([i,s])=>a`<button
            class="swatch"
            title=${i}
            aria-label=${i}
            style=${`background:rgb(${s.join(",")})`}
            @click=${()=>this.hass.callService("light","turn_on",{entity_id:e,rgb_color:s})}
          ></button>`)}
      </div>
    </div>`}segments(t){let e=$t(this.hass,t.ring);return Array.from({length:xt},(i,s)=>{let n=$t(this.hass,t.segments[s])??e;return{fill:n?`rgb(${n.rgb.join(",")})`:"var(--el-ring-off)",opacity:n?.25+.75*n.level:1}})}glow(t){return $t(this.hass,t.ring)||t.segments.some(i=>$t(this.hass,i))?.55:0}kinds(t){return Object.fromEntries(t.parts.map(e=>[e.id,ne(this.hass,t,e)]))}side(t){let e=t.parts.map(n=>ne(this.hass,t,n)),i=e.filter(n=>n==="assistant").length,s=0;return t.parts.map((n,l)=>{let c=e[l],m=c==="assistant"?++s:void 0,h=c==="assistant"&&i>1?m:null;return this.square(dt[c],_(n),()=>this.open({kind:c,part:n,slot:m}),h)})}square(t,e,i,s=null){return a`<button class="sq" title=${e} aria-label=${e} @click=${i}>
      <ha-icon .icon=${t}></ha-icon>
      ${s?a`<span class="badge">${s}</span>`:p}
    </button>`}popup(t){if(!this.opened)return p;let{kind:e,part:i,cross:s}=this.opened,n,l=[],c,m=[_(t.device)];if(s==="settings")n=cr(t,this.kinds(t)),c="Settings";else if(s==="diagnostics")({widgets:l,sections:n}=dr(t)),c="Diagnostics";else if(i)({widgets:l,sections:n}=lr(e,or(t,i.id))),c=_(i),m.push(c);else return p;return a`<echolocal-dialog
      .hass=${this.hass}
      .heading=${c}
      .subtitle=${_(t.device)}
      .icon=${dt[e]}
      .sections=${n}
      .widgets=${l}
      .strip=${m}
      .device=${_(t.device)}
      .mac=${t.device.connections?.find(([h])=>h==="mac")?.[1]??""}
      .help=${this.config.help!==!1}
      .about=${Ge(e)}
      @closed=${()=>this.opened=null}
    ></echolocal-dialog>`}open(t){this.opened=t}toggle(t,e){e&&this.hass.callService(t,"toggle",{entity_id:e})}volume(t,e){t.player&&this.hass.callService("media_player",e>0?"volume_up":"volume_down",{entity_id:t.player})}moreInfo(t){t&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}};z.styles=b(Ne),d([u({attribute:!1})],z.prototype,"hass",2),d([f()],z.prototype,"config",2),d([f()],z.prototype,"opened",2),d([f()],z.prototype,"picked",2),d([f()],z.prototype,"hiddenSegments",2),d([f()],z.prototype,"offering",2),z=d([y("echolocal-satellite-card")],z);var pt=class extends v{setConfig(r){this.config={shell:"grey",...r}}render(){if(!this.hass||!this.config)return p;let r=H(this.hass);return a`
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
          ${r.map(t=>a`<option
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
          ${[["grey","Grey (unknown)"],["black","Black"],["white","White"]].map(([t,e])=>a`<option value=${t} ?selected=${(this.config.shell??"grey")===t}>
                ${e}
              </option>`)}
        </select>
      </div>
    `}emit(r){this.config={...this.config,...r},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}};d([u({attribute:!1})],pt.prototype,"hass",2),d([f()],pt.prototype,"config",2),pt=d([y("echolocal-satellite-card-editor")],pt);var ce=[];function D(o){ce.push(o),ce.sort((r,t)=>r.order-t.order||r.title.localeCompare(t.title))}function pe(o){return ce.filter(r=>o||!r.admin)}function mr(o,r){let t=de(o),e=pe(r);return e.find(i=>i.path===t)??e[0]}function gr(o,r){let t=r?`${o}/${r}`:o;location.pathname!==t&&history.pushState(null,"",t),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}function he(o,r){if(r!==void 0)return de(r);let t=location.pathname;return de(t.startsWith(o)?t.slice(o.length):"")}function de(o){return o.replace(/^\/+|\/+$/g,"")}var fr=`:host {
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
`;var Dt="";async function Wt(o){try{return await o.callWS({type:"config/label_registry/list"})??[]}catch{return[]}}function jt(o,r){let t=new Map,e=[];for(let s of o){let n=s.labels??[];if(!n.length){e.push(s);continue}for(let l of n){let c=r.find(h=>h.label_id===l),m=t.get(l);m?m.devices.push(s):t.set(l,{id:l,name:c?.name??l,icon:c?.icon,devices:[s]})}}let i=[...t.values()].sort((s,n)=>s.name.localeCompare(n.name));return e.length&&i.push({id:Dt,name:"Ungrouped",devices:e}),i}async function vr(o,r){try{return await o.callWS({type:"config/label_registry/create",name:r})}catch{return null}}async function br(o,r,t){await o.callWS({type:"config/label_registry/update",label_id:r,name:t})}async function yr(o,r){await o.callWS({type:"config/label_registry/delete",label_id:r})}async function xr(o,r,t){await o.callWS({type:"config/device_registry/update",device_id:r,labels:[...new Set(t)]})}async function wr(o,r,t,e){let i=0,s=0,n=0;return await Promise.all(r.map(async l=>{let c=$r(o,l,t);if(!c){n+=1;return}try{await e(c),i+=1}catch{s+=1}})),{done:i,failed:s,missing:n}}function Ft(o,r,t){let e=r.map(s=>$r(o,s,t)).filter(s=>!!s),i=[...new Set(e.map(s=>o.states[s]?.state).filter(Boolean))];return{value:i.length===1?i[0]:null,mixed:i.length>1,entities:e}}function $r(o,r,t){let e=B(o,r.id);if(e)return e.entities.map(i=>i.entity_id).find(i=>t.test(i))}var _r=`:host {
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
`;var kr=/_microphone_mute$/,Sr=/_led_ring$/,Ar=/^media_player\./,it=class extends v{render(){if(!this.hass||!this.group)return p;let r=this.group.devices,t=Ft(this.hass,r,kr),e=Ft(this.hass,r,Sr);return a`<div class="bar">
      ${this.group.icon?a`<ha-icon .icon=${this.group.icon}></ha-icon>`:p}
      <div class="name">${this.group.name}</div>
      <div class="count">${r.length} ${r.length===1?"device":"devices"}</div>
      <div class="spacer"></div>

      ${t.entities.length?this.toggle("mdi:microphone-off","Mute all",t,()=>this.write(kr,"switch",t.value==="on"?"turn_off":"turn_on")):p}
      ${e.entities.length?this.toggle("mdi:lightbulb-outline","Ring",e,()=>this.write(Sr,"light",e.value==="on"?"turn_off":"turn_on")):p}
      ${this.has(Ar)?a`<button title="Stop whatever is playing" @click=${()=>this.write(Ar,"media_player","media_stop")}>
            <ha-icon icon="mdi:stop"></ha-icon>Stop
          </button>`:p}
    </div>`}toggle(r,t,e,i){return a`<button data-on=${String(e.value==="on")} @click=${i}>
      <ha-icon .icon=${r}></ha-icon>${t}
      ${e.mixed?a`<span class="mixed">mixed</span>`:p}
    </button>`}has(r){return Ft(this.hass,this.group.devices,r).entities.length>0}write(r,t,e){return wr(this.hass,this.group.devices,r,i=>this.hass.callService(t,e,{entity_id:i}))}};it.styles=b(_r),d([u({attribute:!1})],it.prototype,"hass",2),d([u({attribute:!1})],it.prototype,"group",2),it=d([y("echolocal-groupbar")],it);var Cr=`:host {
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
`;D({path:"",title:"Home",icon:"mdi:view-grid-outline",element:"echolocal-home",order:0});var Mr="echolocal:home:grouped",W=class extends v{constructor(){super(...arguments);this.narrow=!1;this.known=[];this.asked=!1;this.grouped=localStorage.getItem(Mr)!=="no";this.cards=new Map}updated(){this.asked||!this.hass||(this.asked=!0,this.load())}render(){if(!this.hass)return p;let t=H(this.hass);if(!t.length)return a`<div class="empty">
        No EchoLocal devices yet. One appears here once Home Assistant has adopted it over the ESPHome
        integration.
      </div>`;let e=jt(t,this.known);return e.length===1&&e[0].id===Dt?a`<div class="grid">${t.map(i=>this.card(Dt,i.id))}</div>`:a`
      <div class="view">
        <div class="pair">
          ${this.button(!0,"mdi:group","Grouped")}${this.button(!1,"mdi:view-grid-outline","All")}
        </div>
      </div>
      ${this.grouped?e.map(i=>this.group(i)):a`<div class="grid">${t.map(i=>this.card("all",i.id))}</div>`}
    `}button(t,e,i){return a`<button
      data-on=${String(this.grouped===t)}
      @click=${()=>{this.grouped=t,localStorage.setItem(Mr,t?"yes":"no")}}
    >
      <ha-icon .icon=${e}></ha-icon>${i}
    </button>`}group(t){return a`<div class="group">
      <echolocal-groupbar .hass=${this.hass} .group=${t}></echolocal-groupbar>
      <div class="grid">${t.devices.map(e=>this.card(t.id,e.id))}</div>
    </div>`}card(t,e){let i=`${t}/${e}`,s=this.cards.get(i);return s||(s=document.createElement("echolocal-satellite-card"),s.setConfig({device_id:e}),this.cards.set(i,s)),s.hass=this.hass,s}async load(){this.known=await Wt(this.hass)}};W.styles=b(Cr),d([u({attribute:!1})],W.prototype,"hass",2),d([u({type:Boolean})],W.prototype,"narrow",2),d([f()],W.prototype,"known",2),d([f()],W.prototype,"asked",2),d([f()],W.prototype,"grouped",2),W=d([y("echolocal-home")],W);var Hr=`:host {
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
`;D({path:"groups",title:"Groups",icon:"mdi:group",element:"echolocal-groups",order:30,admin:!0});var I=class extends v{constructor(){super(...arguments);this.known=[];this.asked=!1;this.naming=""}updated(){this.asked||!this.hass||(this.asked=!0,this.load())}render(){if(!this.hass)return p;let t=H(this.hass),e=this.known;return a`
      <div class="make">
        <input
          class="new"
          placeholder="New group"
          .value=${this.naming}
          @input=${i=>this.naming=i.target.value}
          @keydown=${i=>i.key==="Enter"&&this.make()}
        />
        <button class="make" ?disabled=${!this.naming.trim()} @click=${this.make}>Add</button>
      </div>

      ${t.length?a`<table>
            <thead>
              <tr>
                <th class="who">Device</th>
                ${e.map(i=>this.head(i))}
              </tr>
            </thead>
            <tbody>
              ${t.map(i=>this.row(i,e))}
            </tbody>
          </table>`:a`<div class="none">
            No EchoLocal devices yet, so there is nothing to group.
          </div>`}
    `}head(t){let e=jt(H(this.hass),this.known).find(i=>i.id===t.label_id)?.devices.length;return a`<th>
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
    </th>`}row(t,e){let i=t.labels??[];return a`<tr>
      <td class="who">${_(t)}</td>
      ${e.map(s=>a`<td>
          <input
            type="checkbox"
            aria-label="${_(t)} in ${s.name}"
            .checked=${i.includes(s.label_id)}
            @change=${n=>this.set(t,s.label_id,n.target.checked)}
          />
        </td>`)}
    </tr>`}async make(){let t=this.naming.trim();t&&(this.naming="",await vr(this.hass,t),await this.load())}async rename(t,e){!e.trim()||e===t.name||(await br(this.hass,t.label_id,e.trim()),await this.load())}async discard(t){await yr(this.hass,t.label_id),await this.load()}async set(t,e,i){let s=new Set(t.labels??[]);i?s.add(e):s.delete(e),await xr(this.hass,t.id,[...s])}async load(){this.known=await Wt(this.hass)}};I.styles=b(Hr),d([u({attribute:!1})],I.prototype,"hass",2),d([f()],I.prototype,"known",2),d([f()],I.prototype,"asked",2),d([f()],I.prototype,"naming",2),I=d([y("echolocal-groups")],I);var Tr=`:host {
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
`;D({path:"activity",title:"Activity",icon:"mdi:timeline-text-outline",element:"echolocal-activity",order:20});var ji=60,G=class extends v{constructor(){super(...arguments);this.seen=[];this.only="";this.asked=!1}updated(){this.asked||!this.hass||(this.asked=!0,this.listen())}disconnectedCallback(){super.disconnectedCallback(),this.stop?.()}render(){if(!this.hass)return p;let t=this.names(),e=this.only?this.seen.filter(s=>s.turn.mac===this.only):this.seen,i=Math.max(1,...e.map(s=>nt(s.turn)));return a`
      ${this.seen.length>0&&Object.keys(t).length>1?a`<div class="filters">
            <button data-on=${String(!this.only)} @click=${()=>this.only=""}>Everything</button>
            ${[...new Set(this.seen.map(s=>s.turn.mac))].map(s=>a`<button
                data-on=${String(this.only===s)}
                @click=${()=>this.only=s}
              >
                ${t[s]??s}
              </button>`)}
          </div>`:p}

      ${e.length?a`<div class="legend">
              ${[["wake_ms","Wake"],["listen_ms","Listen"],["think_ms","Think"],["speak_ms","Reply"]].map(([s,n])=>a`<span class="key"
                  ><span class="dot slice" data-phase=${s}></span>${n}</span
                >`)}
            </div>
            <div class="turns">${e.map(s=>this.row(s,t,i))}</div>`:a`<div class="none">
            Nothing yet. Turns appear here as they happen, across every device — the timings come from the
            device rather than from the recorder, so there is no past to load.
          </div>`}
    `}row(t,e,i){let s=wt(t.turn),n=nt(t.turn),l=t.turn.outcome!=="completed",c=e[t.turn.mac]??"elsewhere";return a`<div class="turn">
      <div class="when">${qi(t.at)}</div>
      <div class="who">${c}</div>
      <div class="said">${t.turn.heard||t.turn.wake_word}</div>
      <div class="right">
        <div class="took" data-bad=${String(l)}>
          ${l?t.turn.outcome:`${(n/1e3).toFixed(1)}s`}
        </div>
        ${t.turn.audio_seconds?a`<echolocal-recording
              .hass=${this.hass}
              .device=${c}
              .turn=${t.turn.id}
              .filename=${Fi(t,c)}
            ></echolocal-recording>`:p}
      </div>
      ${s.length?a`<div class="bar">
            ${s.map(m=>a`<div
                class="slice"
                data-phase=${m.key}
                title=${`${m.label} ${m.ms} ms`}
                style=${`flex:0 0 ${m.ms/i*100}%`}
              ></div>`)}
          </div>`:p}
    </div>`}names(){let t={};for(let e of H(this.hass)){let i=e.connections?.find(([s])=>s==="mac")?.[1];i&&(t[i.toLowerCase()]=_(e))}return t}async listen(){if(this.hass.connection)try{this.stop=await this.hass.connection.subscribeEvents(t=>{let e=Nt(t.data);e&&(this.seen=[{at:Date.now(),turn:e},...this.seen].slice(0,ji))},zt)}catch{}}};G.styles=b(Tr),d([u({attribute:!1})],G.prototype,"hass",2),d([f()],G.prototype,"seen",2),d([f()],G.prototype,"only",2),d([f()],G.prototype,"asked",2),G=d([y("echolocal-activity")],G);function Fi(o,r){let t=new Date(o.at).toISOString().replace(/[:.]/g,"-").slice(0,19),e=i=>i.toLowerCase().replace(/[^a-z0-9]+/g,"-");return`${t}-${e(r)}-${e(o.turn.wake_word)}.wav`}function qi(o){return new Date(o).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}var Er=`:host {
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
`;D({path:"health",title:"Health",icon:"mdi:heart-pulse",element:"echolocal-health",order:40});var ue=[{title:"Version",match:/_(?:current_version|installed_version)$/},{title:"Update",match:/^update\./,show:o=>o==="on"?"waiting":o==="off"?"current":o,wrong:o=>o==="on"?"warn":void 0},{title:"Wifi",match:/_wifi_signal$/,show:(o,r)=>`${Math.round(Number(o))} ${r||"dBm"}`,wrong:o=>Number(o)<-80?"bad":Number(o)<-70?"warn":void 0},{title:"CPU",match:/_cpu_temperature$/,show:(o,r)=>`${Math.round(Number(o))}${r||"\xB0C"}`,wrong:o=>Number(o)>80?"bad":Number(o)>70?"warn":void 0},{title:"Load",match:/_load_average$/,show:o=>Number(o).toFixed(2)},{title:"Memory",match:/_memory_available$/,show:(o,r)=>`${Math.round(Number(o))} ${r||"MB"}`,wrong:o=>Number(o)<40?"bad":Number(o)<80?"warn":void 0},{title:"Disk",match:/_free_space$/,show:(o,r)=>`${Math.round(Number(o))} ${r||"MB"}`,wrong:o=>Number(o)<50?"bad":Number(o)<150?"warn":void 0},{title:"Address",match:/_ip_address$/}],Z=class extends v{constructor(){super(...arguments);this.by="";this.down=!1}render(){if(!this.hass)return p;let t=H(this.hass);if(!t.length)return a`<div class="none">No EchoLocal devices yet.</div>`;let e=t.map(s=>this.read(s)),i=this.sort(e);return a`<div class="scroll">
      <table>
        <thead>
          <tr>
            ${this.head("Device")}${ue.map(s=>this.head(s.title))}
          </tr>
        </thead>
        <tbody>
          ${i.map(s=>a`<tr data-off=${String(!s.up)}>
              <td class="who">
                <button @click=${()=>this.open(s.device)}>${s.name}</button>
              </td>
              ${ue.map(n=>{let l=s.cells[n.title];return a`<td data-wrong=${l?.wrong??""}>${l?.text??"\u2014"}</td>`})}
            </tr>`)}
        </tbody>
      </table>
    </div>`}head(t){return a`<th
      data-by=${String(this.by===t)}
      @click=${()=>{this.down=this.by===t?!this.down:!1,this.by=t}}
    >
      ${t}
    </th>`}read(t){let i=(B(this.hass,t.id)?.entities??[]).map(l=>l.entity_id),s={},n=!1;for(let l of ue){let c=i.find(w=>l.match.test(w)),m=c?this.hass.states[c]:void 0;if(!m)continue;let h=m.state;if(h==="unavailable"||h==="unknown")continue;n=!0;let g=m.attributes.unit_of_measurement??"",x=Number(h);s[l.title]={text:l.show?l.show(h,g):g?`${h} ${g}`:h,sort:Number.isFinite(x)&&h!==""?x:h,wrong:l.wrong?.(Number.isFinite(x)?x:h)}}return{device:t,name:_(t),cells:s,up:n}}sort(t){if(!this.by)return t;let e=i=>this.by==="Device"?i.name:i.cells[this.by]?.sort??"";return[...t].sort((i,s)=>{let n=e(i),l=e(s),c=typeof n=="number"&&typeof l=="number"?n-l:String(n).localeCompare(String(l));return this.down?-c:c})}open(t){history.pushState(null,"",`/config/devices/device/${t.id}`),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}};Z.styles=b(Er),d([u({attribute:!1})],Z.prototype,"hass",2),d([f()],Z.prototype,"by",2),d([f()],Z.prototype,"down",2),Z=d([y("echolocal-health")],Z);var Pr=`:host {
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
`;async function me(o){try{return(await o.callWS({type:"echolocal/wake_words/list"}))?.wake_words??[]}catch{return[]}}var N=class extends v{constructor(){super(...arguments);this.words=[];this.over=!1;this.busy=!1;this.said="";this.asked=!1;this.dropped=t=>{t.preventDefault(),this.over=!1,this.add(t.dataTransfer?.files??null)}}updated(){this.asked||!this.hass||(this.asked=!0,this.refresh())}render(){return a`
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

      ${this.words.length?a`<div class="list">${this.words.map(t=>this.row(t))}</div>`:a`<div class="none">
            Nothing in custom_wake_words yet. Whatever the firmware ships with is unaffected.
          </div>`}
    `}row(t){let e=[t.type||"no type",t.size?`${Math.round(t.size/1024)} KB`:"no model",...t.trained_languages.length?[t.trained_languages.join(", ")]:[]];return a`<div class="word" data-bad=${String(t.problems.length>0)}>
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
      ${t.problems.length?a`<div class="wrong">${t.problems.join(". ")}.</div>`:p}
    </div>`}async add(t){let e=[...t??[]].filter(i=>i.name.endsWith(".tflite"));if(!e.length){this.said="A wake model is a .tflite file.";return}this.busy=!0,this.said="";for(let i of e){let s=new FormData;s.append("file",i);try{let n=await fetch("/api/echolocal/wake_words",{method:"POST",body:s,headers:this.credentials()});if(!n.ok){let l=await n.json().catch(()=>({}));this.said=l.error??`Home Assistant refused ${i.name}.`;break}}catch(n){this.said=`That did not reach Home Assistant: ${n}`;break}}this.busy=!1,await this.refresh()}async rename(t,e){e!==t.wake_word&&(await this.hass.callWS({type:"echolocal/wake_words/update",wake_word_id:t.id,wake_word:e}),await this.refresh())}async discard(t){await this.hass.callWS({type:"echolocal/wake_words/delete",wake_word_id:t.id}),await this.refresh()}async refresh(){this.words=await me(this.hass)}credentials(){let t=this.hass.auth?.data?.access_token;return t?{authorization:`Bearer ${t}`}:{}}};N.styles=b(Pr),d([u({attribute:!1})],N.prototype,"hass",2),d([f()],N.prototype,"words",2),d([f()],N.prototype,"over",2),d([f()],N.prototype,"busy",2),d([f()],N.prototype,"said",2),d([f()],N.prototype,"asked",2),N=d([y("echolocal-wake-words")],N);var Rr=`:host {
  display: block;
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
`;D({path:"wake-words",title:"Wake words",icon:"mdi:waveform",element:"echolocal-words",order:10,admin:!0});var J=class extends v{constructor(){super(...arguments);this.words=[];this.asked=!1}updated(){this.asked||!this.hass||(this.asked=!0,this.load())}render(){if(!this.hass)return p;let t=this.chosen(),e=new Set(this.words.filter(s=>s.problems.length&&s.wake_word).map(s=>s.wake_word)),i=this.words.filter(s=>!s.problems.length&&!t.some(n=>n.words.includes(s.wake_word)));return a`
      <echolocal-wake-words .hass=${this.hass}></echolocal-wake-words>

      <h2>Listening for</h2>
      ${t.length?a`<div class="listening">
            ${t.map(s=>a`<div class="who">
                <span class="name">${s.name}</span>
                ${s.words.map(n=>a`<span
                      class="word"
                      data-gone=${String(e.has(n))}
                      title=${e.has(n)?"Its library entry is broken, so it is not offered":""}
                      >${n}</span
                    >`)}
              </div>`)}
          </div>`:a`<div class="spare">No devices have picked a wake word yet.</div>`}

      ${i.length?a`<h2>In the library, unused</h2>
            <div class="spare">
              ${i.map(s=>s.wake_word).join(", ")} — offered to every satellite, picked by
              none of them.
            </div>`:p}
    `}chosen(){return H(this.hass).map(t=>{let i=(B(this.hass,t.id)?.entities??[]).filter(s=>/select\..*_wake_word/.test(s.entity_id)).map(s=>this.hass.states[s.entity_id]?.state).filter(s=>!!s&&s!=="unknown"&&s!=="None");return{name:_(t),words:i}}).filter(t=>t.words.length)}async load(){this.words=await me(this.hass)}};J.styles=b(Rr),d([u({attribute:!1})],J.prototype,"hass",2),d([f()],J.prototype,"words",2),d([f()],J.prototype,"asked",2),J=d([y("echolocal-words")],J);var j=class extends v{constructor(){super(...arguments);this.narrow=!1;this.at="";this.made=new Map;this.moved=()=>{this.at=he(this.base(),void 0),this.requestUpdate()}}connectedCallback(){super.connectedCallback(),window.addEventListener("location-changed",this.moved),window.addEventListener("popstate",this.moved)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("location-changed",this.moved),window.removeEventListener("popstate",this.moved)}render(){if(!this.hass)return p;let t=!!this.hass.user?.is_admin,e=pe(t),i=mr(this.where(),t);return a`
      <header>
        <div class="bar">${e.map(s=>this.button(s,s===i))}</div>
      </header>
      <div class="page">${i?this.body(i):p}</div>
    `}button(t,e){return a`<button
      data-here=${String(e)}
      @click=${()=>{this.at=t.path,gr(this.base(),t.path)}}
    >
      <ha-icon .icon=${t.icon}></ha-icon><span>${t.title}</span>
    </button>`}body(t){let e=this.made.get(t.path);return e||(e=document.createElement(t.element),this.made.set(t.path,e)),e.hass=this.hass,e.narrow=this.narrow,e}where(){return this.route?he(this.base(),this.route.path):this.at}base(){return this.route?.prefix??"/echolocal"}};j.styles=b(fr),d([u({attribute:!1})],j.prototype,"hass",2),d([u({type:Boolean})],j.prototype,"narrow",2),d([u({attribute:!1})],j.prototype,"route",2),d([u({attribute:!1})],j.prototype,"panel",2),d([f()],j.prototype,"at",2),j=d([y("echolocal-panel")],j);window.customCards=window.customCards??[];window.customCards.some(o=>o.type==="echolocal-satellite-card")||window.customCards.push({type:"echolocal-satellite-card",name:"EchoLocal Satellite",description:"An EchoLocal satellite, drawn as itself, with its ring and mute live.",preview:!0,documentationURL:"https://github.com/ygelfand/echolocal-hacs"});
