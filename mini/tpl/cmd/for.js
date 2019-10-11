import{forCmdName,forIdxAttrName}from"../const.js";import{copy,$goCopy}from"../../util.js";import{inc_get$els,inc_isInc}from"./inc.js";export default{render:function(a){const b=this.get$srcDescr(a.$src),c=this.renderTag.bind(this),{$els:d,$elsLen:e,keys:f,keysLen:g}=for_get.call(this,a,c);if(!g){for(let b=d[0].length-1;-1<b;b--)d[0][b]=this.hide(d[0][b],a.str);for(let a,b=1;b<e;b++)for(a=d[b].length-1;-1<a;a--)this.removeChild(d[b][a]);return b.for_oldLastVal&&delete b.for_oldLastVal[a.str],{$e:d[0][d[0].length-1],isLast:!0}}b.isAsOne=!0,b.for_oldLastVal||(b.for_oldLastVal={});const h=JSON.stringify(a.value[f[g-1]]),i=h===void 0||h!=b.for_oldLastVal[a.str];let j;if(!b.isRendered){//!!if on start call render function instand of linker function
if(i){for_render.call(this,a,d,f,0,c);for(let a=1;a<e;a++)for_copyDescr.call(this,d,0,a)}else{const b=e-1;for_render.call(this,a,d,f,b,c);for(let a=0;a<b;a++)for_copyDescr.call(this,d,b,a)}j=b.isRendered=!0}let k,l;if(!i){if(k=0,l=g,j){l--;const b=getForIdxName(a.str);for(let a=e-1,c=d[a].length-1;-1<c;c--){const e=d[a][c];e instanceof HTMLElement&&e.setAttribute(b,l)}}if(e<g){a._$fr=this.createDocumentFragment(),a._$frBeforePrev=d[0][0].previousSibling,a._$frParent=d[0][0].parentNode,k=g-e;const b=d[e-1];for(let c=k-1;-1<c;c--)d.unshift(for_clone$e.call(this,a,a._$fr,b,a._$fr.firstChild,c));for(let b=0;b<k;b++)for_render.call(this,a,d,f,b,c)}else if(e>g){const a=e-g;for(let b=0;b<a;b++)for(let a=0;a<d[b].length;a++)this.removeChild(d[b][a]);d.splice(0,a)}}else if(k=j?1:0,l=g,e<g){a._$fr=this.createDocumentFragment();const b=d[e-1][d[e-1].length-1];a._$frBefore=b.nextSibling,a._$frParent=b.parentNode,l=e;for(let b=l;b<g;b++)d.push(for_clone$e.call(this,a,a._$fr,d[0],null,b)),for_render.call(this,a,d,f,b,c)}else if(e>g){for(let a=g;a<e;a++)for(let b=0;b<d[a].length;b++)this.removeChild(d[a][b]);d.splice(g,e-g)}for(let b=k;b<l;b++)for_render.call(this,a,d,f,b,c);b.for_oldLastVal[a.str]=h,a._$fr&&a._$frParent.insertBefore(a._$fr,a._$frBefore===void 0?a._$frBeforePrev?a._$frBeforePrev.nextSibling:a._$frParent.firstChild:a._$frBefore);const m=d[d.length-1];return{$e:m[m.length-1],isLast:!0}},linker(a){const b=this.linker.bind(this),{$els:c,$elsLen:e,keys:f,keysLen:g}=for_get.call(this,a,b),h=c[e-1];if(!g)return{$e:h[h.length-1],isLast:!0};const i=this.get$srcDescr(a.$src);i.isAsOne=!0;for(let d=1;d<e;d++)for_copyDescr.call(this,c,0,d),for_render.call(this,a,c,f,d,b);return i.for_oldLastVal||(i.for_oldLastVal={}),i.for_oldLastVal[a.str]=JSON.stringify(a.value[f[g-1]]),{$e:h[h.length-1],isLast:!0}},getScope:function(a){const b=getForIdx(a.$src,a.str);if(null===b)return!1;const c=this.eval(a);if(!c)return!1;let d,e=0;for(const f in c){if(e==b){d=f;break}e++}const f=a.args[0];f&&(a.scope[f]=c[d]);const g=a.args[1];return g&&(a.scope[g]=d),!0}};function for_get(a){a.scope=copy(a.scope),a.value=this.eval(a);const b=for_get$first.call(this,a,a.$src);if(!a.value)return for_getEmptyRes.call(this,a,b);const c=[];for(const b in a.value)c.push(b);if(!c.length)return for_getEmptyRes.call(this,a,b);a.valName=a.args[0],a.keyName=a.args[1],a.attrsAfter=this.getAttrsAfter(this.getAttrs(a.$src),a.str);const d=for_get$els.call(this,a,b);return{$els:d,$elsLen:d.length,keys:c,keysLen:c.length}}function for_get$first(a,b){const[c,d]=for_getForStrs.call(this,a,b);for(let e=b;e;e=e.previousElementSibling){const f=getForIdx(e,a.str);if(null===f)return b;if(b=e,0==f){for(e=e.previousElementSibling;e;e=e.previousElementSibling){const f=getForIdx(e,a.str);if(null===f||0!=f)return b;if(c)for(let f=d;-1<f;f--){const d=c[f];if(getForIdx(e,d.str)!=d.val)return b}b=e}return b}}return b}function for_getEmptyRes(a,b){const c=for_get$els.call(this,a,b);return{$els:c,$elsLen:c.length}}function for_get$els(a,b){if(inc_isInc.call(this,a.$src,a.str))return for_get$elsInc.call(this,a,b);const[c,d]=for_getForStrs.call(this,a,b),e=[];for(let f=b;f;){const b=[f];e.push(b);const g=getForIdx(f,a.str);if(null===g)return e;for(f=f.nextElementSibling;f;f=f.nextElementSibling){if(c)for(let b=d;-1<b;b--){const d=c[b];if(getForIdx(f,d.str)!=d.val)return e}const h=getForIdx(f,a.str);if(null===h||+g>+h)return e;if(g!=h)break;b.push(f)}}return e}function for_get$elsInc(a,b){const c=[];for(let d=b;d;){const b=inc_get$els.call(this,d);c.push(b);const e=getForIdx(d,a.str);if(null===e)return c;for(d=b[b.length-1].nextElementSibling;d;d=d.nextElementSibling){if(!inc_isInc.call(this,d,a.str))return c;const f=getForIdx(d,a.str);if(null===f||+e>+f)return c;if(e!=f)break;b.push(...inc_get$els.call(this,d))}}return c}function for_getForStrs(a,b){const c=[];for(const d of this.getAttrs(b).keys()){if(d==a.str)break;const[e]=this.getCmdArgs(d);e==forCmdName&&c.push({str:d,val:getForIdx(b,d)})}return c.length?[c,c.length-1]:[]}function for_render(a,b,c,d,e){a.valName&&(a.scope[a.valName]=a.value[c[d]]),a.keyName&&(a.scope[a.keyName]=c[d]);const f=getForIdxName(a.str),g=b[d][b[d].length-1].nextSibling;let h=b[d][0];for(b[d]=[];h;){if(h instanceof HTMLElement){h=this.show(h,a.str);const c=inc_isInc.call(this,h,a.str)?inc_get$els.call(this,h)[0].previousSibling:h.previousSibling;h=e(h,a.scope,a.attrsAfter);for(let a=c?c.nextSibling:h.parentNode.firstChild;;a=a.nextSibling)if(a instanceof HTMLElement&&a.setAttribute(f,d),b[d].push(a),a==h)break}const c=h.nextSibling;if(!c||c==g)break;h=c}}function for_copyDescr(a,b,c){const d=this.copyDescr.bind(this),e=a[b][0].content&&null===getForIdx(a[b][0],$req.str)?a[b][0].content.childNodes:a[b],f=a[c][0].content&&null==getForIdx(a[c][0],req.str)?a[c][0].content.childNodes:a[c];for(let g=0;g<e.length;g++)e[g]instanceof HTMLElement&&$goCopy(e[g],f[g],d)}function for_clone$e(a,b,c,d){const e=[],f=c.length;for(let g=0;g<f;g++)e.push(b.insertBefore(this.cloneNode(c[g]),d));return e}function getForIdxName(a){return forIdxAttrName+"_"+a}function getForIdx(a,b){return a.getAttribute(getForIdxName(b))}