/*!
 * myweb/util.js v0.9.0
 * (c) 2019 Aleksey Zobnev
 * Released under the MIT License.
 * https://github.com/mywebengine/myweb
 */import{tplProxyTargetPropName}from"./tpl/const.js";export const spaceRe=/\s+/g;export const dRe=/\d/g;export const DRe=/\D/g;export const trimSlashRe=/(^\/|\/$)/g;export let idCurVal=0;export function getId(a){return a[getId.propName]||(a[getId.propName]=(++idCurVal).toString())}getId.propName=Symbol(),self.getId=getId;export function copy(a){return a instanceof Array?a.concat():a instanceof Object?Object.assign({},a):a}export function wrapDeep(a,b){for(const c in a)a[c]instanceof Object&&(a[c]=wrapDeep(a[c],b));return b(a)}export function $goTagsDeep(a,b){if(b(a),a.isCustomHTML)return a;for(let c=a.firstElementChild;c;c=c.nextElementSibling)$goTagsDeep(c,b);return a}export function $goCopy(a,b,c){if(c(a,b),a.isCustomHTML)return b;const d=a.children.length;for(let e=0;e<d;e++)$goCopy(a.children[e],b.children[e],c);return b}export function getMustacheBlocks(a){const b=a.length,c=[];for(let d=0,e=0;e<b;){if(e=a.indexOf("{{",e),-1==e){c.push({begin:d,end:b});break}let f=a.indexOf("}}",e);if(-1==f){c.push({begin:d,end:b});break}for(;a.indexOf("}}",f+1)==f+1;)f++;e!=d&&c.push({begin:d,end:e}),c.push({begin:e+2,end:f,expr:!0}),e=d=f+2}return c}self.getMustacheBlocks=getMustacheBlocks;const normalizeURL_reHost=/^(\w*\:*\/\/+|\/\/+).+?(\/|$)/,normalizeURL_reSlash=/\/\/+/g,normalizeURL_reUp=/[^\.\/]+\/+\.\.\//g,normalizeURL_reThis=/\/\.\//g;export function normalizeURL(a){if(a=a.trim(),0==a.search(normalizeURL_reHost))return new URL(a).href;if("/"!=a[0]){const b=location.pathname.lastIndexOf("/");b==location.pathname.length-1?a=location.pathname+a:-1!=b&&(a=location.pathname.substr(0,b+1)+a)}return normalizeURL_get(a)}function normalizeURL_get(a){for(let b=[normalizeURL_reSlash,normalizeURL_reUp,normalizeURL_reThis],c=b.length-1;-1<c;c--)a=a.replace(b[c],"/");return a.trim()}self.normalizeURL=normalizeURL;export function getURL(a,b){if(isURI(a))if(b){isURI(b)&&(b=normalizeURL(b));let c=normalizeURL_get(a);for(;0==c.indexOf(".");)0==c.indexOf("./")?c=c.substr(2):0==c.indexOf("../")&&(c=c.substr(3));a=b.endsWith(c)?b:normalizeURL(b.substr(0,b.lastIndexOf("/")+1)+a)}else a=normalizeURL(a);return-1==a.search(normalizeURL_reHost)&&(a=location.origin+a),normalizeURL(a)}self.getURL=getURL;export function isURI(a){return a=a.trimLeft(),-1==a.search(normalizeURL_reHost)&&"/"!=a[0]}function hideEnum(a,b){Object.defineProperty(a,b,{enumerable:!1})}if(!String.prototype.q){const a=/`/g,b=/'/g,c=/'/g;String.prototype.a=function(){return this.replace(a,"\\`")},String.prototype.q=function(){return this.replace(b,"\\'")},String.prototype.qq=function(){return this.replace(c,"\\\"")};const d=["a","q","qq"];for(const a of d)Number.prototype[a]=function(){return this.toString().qq()};for(const a of[String.prototype,Number.prototype])for(const b of d)hideEnum(a,b);String.localeDotSymbol=-1==.1.toLocaleString().indexOf(".")?",":".",String.prototype.toNumber=function(){const a=this.lastIndexOf(String.localeDotSymbol);return+(-1==a?this.replace(DRe,""):this.substr(0,a).replace(DRe,"")+"."+this.substr(a+1))},hideEnum(String.prototype,"toNumber"),String.prototype.json=function(){try{return JSON.parse(this)}catch(a){console.error(a)}},hideEnum(String.prototype,"json"),String.prototype.copyToClipboard=function(){const a=document.createElement("input");a.type="text",a.contentEditable=!0,a.value=this,a.style.position="absolute",a.style.left="-1000px",document.body.appendChild(a),a.select(),a.setSelectionRange(0,this.length),document.execCommand("copy"),a.parentNode.removeChild(a)},hideEnum(String.prototype,"copyToClipboard"),FormData.prototype[tplProxyTargetPropName]=!0,Document.prototype[tplProxyTargetPropName]=!0,DocumentFragment.prototype[tplProxyTargetPropName]=!0,HTMLElement.prototype[tplProxyTargetPropName]=!0,Text.prototype[tplProxyTargetPropName]=!0}FormData.prototype.toJSON||(FormData.prototype.toJSON=function(){const a={};for(const[b,c]of this.entries())a[b]=c;return a}),HTMLFormElement.prototype.toJSON||(HTMLFormElement.prototype.toJSON=function(){const a={},b=this.elements.length;for(let c=0;c<b;c++)a[this.elements[c].name||this.elements[c].id]=this.elements[c].value;return a}),self.del=function(a,b){const c=a[b];return delete a[b],c};