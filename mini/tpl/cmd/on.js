export default{render:f,linker:f};function f(a){const b=a.$src,c=a.expr;b["on"+a.args[0]]=()=>this.eval({$src:b,scope:this.getScope(b),expr:c},!0)}