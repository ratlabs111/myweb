/*!
 * myweb/getLineNo.js v0.9.0
 * (c) 2019 Aleksey Zobnev
 * Released under the MIT License.
 * https://github.com/mywebengine/myweb
 */export function markLines(a=document.documentElement,b=window.location.pathname){return a.getLineNo()?Promise.resolve():fetch(b).then(a=>a.ok?a.text():void console.error(`markLines: request stat ${a.status}`)).then(c=>{markLines.mark({url:b,html:c},a)})}markLines.mark=function(a,b){a.html=a.html.toUpperCase(),a.line||(a.line=1),markLines._mark(a,b)},markLines._mark=function(a,b){if(b instanceof HTMLElement){const c=a.html.indexOf("<"+b.tagName);if(-1==c)return void console.error(`markLines.mark: index <${b.tagName} = -1`,b,a);a.line+=a.html.substr(0,c).split("\n").length-1,b.setAttribute(this.lineNoAttrName,`${a.url}:${a.line}`),a.html=a.html.substr(c+1)}for(let c,d=0;d<b.children.length;d++)if(c=b.children[d],this.mark(a,c),"object"==typeof c.content){c=c.content;for(let b=0;b<c.children.length;b++)this.mark(a,c.children[b])}},markLines.lineNoAttrName="debug:line",self.markLines=markLines,HTMLElement.prototype.getLineNo=function(){return this.getAttribute(markLines.lineNoAttrName)};export default new Promise((a,b)=>{const c=()=>{markLines().then(a).catch(b)};"loading"==document.readyState?document.addEventListener("DOMContentLoaded",c):c()});