import{spaceRe}from"../../util.js";export default{render:scope_get,linker:scope_get,getScope:function(a){return scope_get.call(this,a)}};function scope_get(a){const b=a.expr.trim().split(spaceRe),c=b.length;if(!c)return this.check(new Error(">>>Tpl scope:01: Need set variable(s) name"),a),!1;for(let d=0;d<c;d++)a.scope[b[d]]=a.scope;return!0}