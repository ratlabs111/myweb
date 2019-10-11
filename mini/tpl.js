/*!
 * myweb/tpl.js v0.9.0
 * (c) 2019 Aleksey Zobnev
 * Released under the MIT License.
 * https://github.com/mywebengine/myweb
 */import{cmdArgsBegin,cmdArgsDiv,incCmdName,orderCmdName,scopeCmdName,htmlCmdName,textCmdName,attrCmdName,forCmdName,fetchCmdName,onCmdName,ifCmdName,elseifCmdName,elseCmdName,switchCmdName,caseCmdName,defaultCmdName,renderEventName,tplProxyTargetPropName,resVarName}from"./tpl/const.js";import{getId,wrapDeep,$goCopy,$goTagsDeep,getMustacheBlocks,spaceRe,trimSlashRe}from"./util.js";import scopeCmd from"./tpl/cmd/scope.js";import{ifCmd,switchCmd}from"./tpl/cmd/if.js";import forCmd from"./tpl/cmd/for.js";import attrCmd from"./tpl/cmd/attr.js";import htmlCmd from"./tpl/cmd/html.js";import incCmd,{getIncVal,inc_get$els,inc_isInc}from"./tpl/cmd/inc.js";import fetchCmd from"./tpl/cmd/fetch.js";import onCmd from"./tpl/cmd/on.js";export class Tpl{constructor(a=document.documentElement,b=0){this.delay=b,this.$src=a,this.descr=new Map,this.$srcById=new Map,this.$srcByVar=new WeakMap,this.$srcByVarProp=new WeakMap,this.sync=0,this.renderStack=new Map,this._reqCmd=new Map,this._func=new Map}go(a=this.$src,b=this.delay,c,d){const e=()=>{a.dispatchEvent(new CustomEvent(renderEventName,{detail:{tpl:this}}))};if(!a.dataset.isRendered||"false"==a.dataset.isRendered){if(0<=b)return this.async(a,b,c,d).then(e);this.render(a,c,d)}else this.linker(a,c,d);return Promise.resolve().then(e)}render(a=this.$src,b=this.getScope(a),c){return a instanceof HTMLElement?this.renderTag(a,b,c):a instanceof Text?this.renderText(a,b):a}renderTag(a,b=this.getScope(a),c=this.getAttrs(a)){for(const[d,e]of c){const c=this.execRender(a,d,e,b);if(c&&(c.$e&&(a=c.$e),c.isLast))return a}if(a instanceof HTMLElement&&!a.isCustomHTML)for(let c=a.firstChild;c;c=c.nextSibling)c=this.render(c,b);return a}renderText(a,c){if(a.isTextRendered)return a;const d=a.textContent,e=getMustacheBlocks(d),f=e.length;if(!f||1==f&&!e[0].expr)return a.isTextRendered=!0,a;const g=document.createDocumentFragment();for(let h=0;h<f;h++){const a=e[h];if(a.expr){const b=g.appendChild(document.createElement("span"));this.setAttribute(b,textCmdName,d.substring(a.begin,a.end)),this.renderTag(b,c)}else g.appendChild(document.createTextNode(d.substring(a.begin,a.end))).isTextRendered=!0}const h=g.lastChild;return a.parentNode.replaceChild(g,a),h}linker(a=this.$src,b=this.getScope(a),c=this.getAttrs(a)){//!!--
if(!(a instanceof HTMLElement))return console.log("!!!!!!! is not tag",a),a;for(const[d,e]of c){const c=this.execLinker(a,d,e,b);if(c&&(c.$e&&(a=c.$e),c.isLast))return a}if(a instanceof HTMLElement)for(let c=a.firstElementChild;c;c=c.nextElementSibling)c=this.linker(c,b);return a}async(a=this.$src,b=this.delay||0,c,d){const e=this.renderStack.get(a);if(e)return setTimeout(this._async.bind(this,++this.sync),b),e.promise;const f={scope:c,attr:d};return this.renderStack.set(a,f),f.promise=new Promise((a,c)=>{f.resolve=a,f.reject=c,setTimeout(this._async.bind(this,++this.sync),b)})}_async(a){if(a==this.sync){this.onbeforeasync(),this.isDebug&&console.log("tpl async stack",this.renderStack);for(const[a,b]of this.renderStack)if(!b.isDel){try{this.render(a,b.scope,b.attr)}catch(a){console.log(a);break}b.resolve&&b.resolve()}this.renderStack.clear(),this.onasync()}}onbeforeasync(){}onasync(){}getScope(a){this._scoping=!0;const b=[];//!!_parent		for (; $e = $e.parentNode || $e._parentNode; $path.push($e));
for(;a;b.push(a),a=a.parentNode);const c={};for(let d=b.length-2;-1<d;d--)this.execScopeItem(b[d],c);return this._scoping=!1,c}execScopeItem(a,b){for(const[c,d]of this.getAttrs(a))if(!this.execGetScope(a,c,d,b))break}execRender(a,b,c,d){const e=this.getReq(a,b,c,d);if(e&&e.cmd.render)return e.cmd.render.call(this,e)}execLinker(a,b,c,d){const e=this.getReq(a,b,c,d);if(e&&e.cmd.linker)return e.cmd.linker.call(this,e)}execGetScope(a,b,c,d){const e=this.getReq(a,b,c,d);return!(e&&e.cmd.getScope)||e.cmd.getScope.call(this,e)}getReq(a,b,c,d){const e=this.getReqCmd(b);return e?{cmdName:e.cmdName,cmd:e.cmd,args:e.args,str:b,expr:c,$src:a,scope:d}:void 0}getReqCmd(a){const b=this._reqCmd.get(a);if(void 0!==b)return b||void 0;const[c,d]=this.getCmdArgs(a),e=this.getCommand(c);if(!e)return void this._reqCmd.set(a,!1);const f={cmdName:c,cmd:e,args:d};return this._reqCmd.set(a,f),f}getCmdArgs(a){const b=a.indexOf(cmdArgsBegin);return-1==b?[a,[]]:[a.substr(0,b),a.substr(b+1).split(cmdArgsDiv)]}cloneNode(a){return a instanceof HTMLElement?$goCopy(a,a.cloneNode(!0),this.copyDescr.bind(this)):a.cloneNode(!0)}replaceChild(a,b){return $goTagsDeep(b.parentNode.replaceChild(a,b),this.clearTagProps.bind(this))}removeChild(a){return $goTagsDeep(a.parentNode.removeChild(a),this.clearTagProps.bind(this))}//!!!
createDocumentFragment(){return document.createDocumentFragment()}//!!!<--
setAttribute(a,b,c){a.setAttribute(b,c),this.getAttrs(a).set(b,c);"value"===b?c&&(a.value=c):"checked"===b?a.checked="false"!=c:void 0}removeAttribute(a,b){a.removeAttribute(b),this.getAttrs(a).delete(b);"value"===b?a.value="":"checked"===b?a.checked=!1:void 0}getAttrs(a){const b=this.get$srcDescr(a)||this.createTagDescr(a);return b.attr}getAttrsAfter(b,c){const d=new Map;let a;for(const[e,f]of b)a?d.set(e,f):e==c&&(a=!0);return d}get$srcDescr(a){return this.descr.get(a[getId.propName])}createTagDescr(a){const b={id:getId(a),attr:this.createAttr(a),target:new Set};this.descr.set(b.id,b);let c=this.$srcById.get(b.id);return c||this.$srcById.set(b.id,c=new Set),c.add(a),b}createAttr(a){const b=new Map,c=a.getAttribute(orderCmdName);if(c){const d=c.trim().split(spaceRe),e=d.length;for(let c=0;c<e;c++)b.set(d[c],a.getAttribute(d[c]))}const d=Array.from(a.attributes),e=d.length;for(let c=0;c<e;c++){const e=d[c];b.has(e.name)||b.set(e.name,e.value)}return b}getTopURLBy$src(a){for(let b=a.parentNode;b;b=b.parentNode){const a=this.get$srcDescr(b);if(!a)continue;if(a.tpl_url)return a.tpl_url;let c;for(const[d,e]of a.attr){const[a]=this.getCmdArgs(d);a==incCmdName&&(c=getIncVal(b,d))}if(c)return c}}show(a,b){if("TEMPLATE"!=a.nodeName)return a;if(1!=a.content.childNodes.length)return void this.check(new Error(">>>Tpl show:01: Template element invalid structure on show function. <template>.childNodes.length must be only one element."),{$src:a,afterAttrName:b});const c=a.content.firstChild;return this.moveProps(a,c),a.parentNode.replaceChild(c,a),c}hide(a,b){if("TEMPLATE"==a.nodeName)return a;const c=document.createElement("template");if(a instanceof HTMLElement){this.moveProps(a,c);for(let b=a.firstElementChild;b;b=b.nextElementSibling)$goTagsDeep(b,this.clearTagPropsToMove.bind(this))}return a.parentNode.replaceChild(c,a),c.content.appendChild(a),this.renderStack.size&&this.renderStack.set(c,{isDel:!0}),c}moveProps(a,b){const c=this.renderStack.get(a);c&&(c.isDel=!0);const e=this.get$srcDescr(a);b[getId.propName]=e.id;const d=this.$srcById.get(e.id);d?(d.delete(a),d.add(b)):console.log("!!!!!!!! $srcById",e.id,a,b);//!!!!!!!!!attributes
const f=Array.from(a.attributes);for(const c of f)//!!должно выполняться полсе присвоения ID, потому что в setAttribute используется getAttrs
this.setAttribute(b,c.name,c.value)}clearTagProps(a){const b=this.get$srcDescr(a);if(b){const c=this.renderStack.get(a);c&&(c.isDel=!0);const d=this.$srcById.get(b.id);d&&(d.delete(a),d.size||(this.$srcById.delete(b.id),this.clearVarsByDescr(b)))}}clearTagPropsToMove(a){const b=this.get$srcDescr(a);if(b){const c=this.renderStack.get(a);c&&(c.isDel=!0),this.clearVarsByDescr(b)}}clearVarsByDescr(a){for(const b of a.target){const c=this.$srcByVar.get(b);c&&(c.delete(a.id),!c.size&&this.$srcByVar.delete(b));const d=this.$srcByVarProp.get(b);if(d){for(const[b,c]of d)c.has(a.id)&&(c.delete(a.id),c.size||d.delete(b));d.size||this.$srcByVarProp.delete(b)}}}copyDescr(a,b){const c=a[getId.propName];if(c){b[getId.propName]=c;const a=this.$srcById.get(c);a&&a.add(b)}}setDescrWithVars(a,b,c){b[getId.propName]=c,this.$srcById.get(c).add(b);const d=a.id;for(const e of a.target){this.descr.get(c).target.add(e);const a=this.$srcByVar.get(e);a&&a.add(c);const b=this.$srcByVarProp.get(e);if(b)for(const a of b.values())a.has(d)&&a.add(c)}}eval(a,b){let c="";const d=[];for(const e in a.scope)c?c+=","+e:c=e,d.push(a.scope[e]);if(!b){this.curReq=a;let b;try{b=this.getEvalFunc(a,a.expr,c).apply(a.$src,d)}catch(b){return void this.check(b,a)}return delete this.curReq,b}try{return this.getEvalFunc(a,a.expr,c).apply(a.$src,d)}catch(b){this.check(b,a)}}getEvalFunc(a,b,c){const d=b+(c||"");let e=this._func.get(d);if(e)return e;const g=0==b.trimLeft().indexOf("return")?b:"const "+resVarName+" = "+b+"; return "+resVarName+";";try{e=new Function(c,g)}catch(b){throw new Error(`${b}\n\tfunction body => ${g}\n\targs => ${c}`,a)}return this._func.set(d,e),e}check(a,b,c,d,e){if(!(a instanceof Error))return;const f=b.$srcForErr||b.$src,g=(f.getLineNo?" in "+f.getLineNo():"")+(b.str?"\n\t"+b.str+" => "+b.expr:"")+"\n\t$src => ";console.error(a,"\n>>>Tpl error"+g,f,b),c&&(a=new Error(a,c,d,e));const h=f.dataset.onerror;if(h)try{new Function("err",h).call(b.$src,a)}catch(a){console.error(">>>Tpl error in onerror handler"+g,f,"onerror=>"+h,b,a)}throw a}getProxy(a={}){return a[tplProxyTargetPropName]?a:wrapDeep(a,this.getProxyItem.bind(this))}getProxyItem(a){return new Proxy(a,this.getProxyItemHandler())}getProxyItemHandler(){return{get:this.proxyGet.bind(this),set:this.proxySet.bind(this),deleteProperty:this.proxyDeleteProperty.bind(this)}}proxyGet(a,b,c){if(b==tplProxyTargetPropName)return a;const d=a[b];if(!this.curReq)return d;const e=this.curReq.$src[getId.propName],f=this.$srcByVarProp.get(c);if(f){const a=f.get(b);a?!a.has(e)&&a.add(e):f.set(b,new Set([e]))}else this.$srcByVarProp.set(c,new Map([[b,new Set([e])]]));const g=this.descr.get(e).target;g.has(c)||g.add(c),d instanceof Object&&(!d[tplProxyTargetPropName]&&(d=wrapDeep(d,this.getProxyItem.bind(this))),c=d,!g.has(c)&&g.add(c));const h=this.$srcByVar.get(c);return h?!h.has(e)&&h.add(e):this.$srcByVar.set(c,new Set([e])),d}proxySet(a,b,c,d){if(this._scoping)return Reflect.set(a,b,c);const e=a[b];return!(c!==e||c&&!Object.getOwnPropertyDescriptor(a,b).enumerable)||(this.clearVarsByVar(e),c instanceof Object&&!c[tplProxyTargetPropName]&&(c=wrapDeep(c,this.getProxyItem.bind(this))),!!Reflect.set(a,b,c)&&this.set$srcByVar(a,b,c,d))}proxyDeleteProperty(a,b,c){const d=a[b];return!!Reflect.deleteProperty(a,b)&&(this.clearVarsByVar(d),this.set$srcByVar(a,b,void 0,c))}clearVarsByVar(a){if(a instanceof Object){if(a instanceof Array){const b=a.length;for(let c=0;c<b;c++)this.clearVarsByVar(a[c])}else for(const b in a)this.clearVarsByVar(a[b]);this.$srcByVar.has(a)&&this.$srcByVar.delete(a),this.$srcByVarProp.has(a)&&this.$srcByVarProp.delete(a)}}set$srcByVar(a,b,c,d){const e=this.$srcByVarProp.get(d);if(e){const a=e.get(b);if(a)return this.renderBy$srcIdSet(a),!0}const f=this.$srcByVar.get(d);return!f||(this.renderBy$srcIdSet(f),!0)}renderBy$srcIdSet(a){const b=this.renderStack.size;if(this.add$srcSetToRenderStack(a),!b)for(const b of a){const a=this.$srcById.get(b);if(a)for(const b of a)return void this.async(b)}}add$srcSetToRenderStack(a){for(const b of a){const a=this.$srcById.get(b);if(a){if(this.descr.get(b).isAsOne){for(const b of a){this.renderStack.has(b)||this.renderStack.set(b,{});break}continue}for(const b of a)this.renderStack.has(b)||this.renderStack.set(b,{})}}}getLoc(a,b=""){a=new URL(a);const c=this.getLoc_parsePath(a.href,a.pathname,b);c.hash=this.getLoc_parsePath(a.hash,a.hash.substr(1),b);for(const[d,e]of a.searchParams)c.query[d]=e;return c}getLoc_parsePath(a,b,c){const d={href:a,path:b,args:b.replace(trimSlashRe,"").split("/"),param:{},query:{}};d.name=d.args[0]||c;for(let e=1,f=d.args.length;e<f;e+=2)d.param[d.args[e]]=d.args[e+1];return d}getCommand(a){return Tpl.cmd.get(a)}static addCommand(a,b){this.cmd.set(a,b)}}Tpl.cmd=new Map,Tpl.addCommand(scopeCmdName,scopeCmd),Tpl.addCommand(htmlCmdName,htmlCmd),Tpl.addCommand(attrCmdName,attrCmd),Tpl.addCommand(ifCmdName,ifCmd),Tpl.addCommand(elseifCmdName,ifCmd),Tpl.addCommand(elseCmdName,ifCmd),Tpl.addCommand(switchCmdName,switchCmd),Tpl.addCommand(caseCmdName,switchCmd),Tpl.addCommand(defaultCmdName,switchCmd),Tpl.addCommand(forCmdName,forCmd),Tpl.addCommand(incCmdName,incCmd),Tpl.addCommand(fetchCmdName,fetchCmd),Tpl.addCommand(onCmdName,onCmd);export default self.tpl=new Tpl;self.data=tpl.getProxy(self.data),self.data.loc=tpl.getLoc(location.href),self.addEventListener("hashchange",()=>{self.data.loc=tpl.getLoc(location.href)});//!!for Edge
const $s=document.querySelector("script"),url=$s&&new URL($s.src);function main(){self.tpl.go()}function debug(){if(self.tpl.onbeforeasync=function(){this.time=performance.now()},self.tpl.onasync=function(){console.log("render time: ",performance.now()-this.time)},!url)return void main();//!!for Edge
try{eval("import(url.origin + \"/myweb/getLineNo.js\").then(m => m.default).then(main);")}catch(a){main()}}function onload(){self.tpl.isDebug?debug():main()}self.tpl.isDebug=url&&-1!=url.search.indexOf("debug"),url&&-1==url.search.indexOf("onload")?document.readyState&&"loading"!=document.readyState?onload():document.addEventListener("DOMContentLoaded",onload):"complete"==document.readyState?onload():self.addEventListener("load",onload);