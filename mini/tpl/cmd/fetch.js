import{cmdPref}from"../const.js";import{normalizeURL}from"../../util.js";self.AsyncFunction||(self.AsyncFunction=Object.getPrototypeOf(async function(){}).constructor);export default{render:function(a){const b=fetch_get.call(this,a),c=fetch_getVal.call(this,a,"body");if(!b||(a.$src.dataset.body||a.$src.dataset[cmdPref+"body"])&&c===void 0)return{isLast:!0};const d=fetch_getVal.call(this,a,"headers"),e=a.$src.dataset.type;Promise.all([c,d,e]).then(c=>{fetch_render.call(this,a,b,...c)})},linker(a){fetch_get.call(this,a)}};function fetch_get(a){const b=a.args[0]?a.expr:this.eval(a);return b?normalizeURL(b):void 0}function fetch_render(a,b,c,d={},e){for(const f in d)d[f]||0===d[f]||delete d[f];if(e)switch(e.toUpperCase()){case"JSON":d["Content-Type"]="application/json";break;case"FORM":d["Content-Type"]="application/x-www-form-urlencoded";}fetch(b,{method:a.$src.dataset.method,headers:d,body:c,mode:a.$src.dataset.mode,credentials:a.$src.dataset.credentials,cache:a.$src.dataset.cache,redirect:a.$src.dataset.cache}).then(b=>{fetch_execAsync.call(this,a,"onload",b),b.ok?fetch_execAsync.call(this,a,"onok",b):fetch_execAsync.call(this,a,"onerror",b)})}function fetch_getVal(a,b){let c=a.$src.dataset[b];if(c)try{return this.getEvalFunc(a,c).call(a.$src)}catch(b){return void this.check(b,a)}if(c=a.$src.dataset[cmdPref+b]){const b=this.eval({$src:a.$src,scope:a.scope,expr:c});return b}}function fetch_execAsync(a,b,c){const d=a.$src.dataset[b];d&&new self.AsyncFunction("tpl","req","try {"+d+"} catch(err) {console.log('!! async func error', err); tpl.check(err, req)}").call(c,this,a)}