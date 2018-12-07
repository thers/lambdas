@builtin "number.ne"

@{% function NONE() {} %}
@{% function FIRST(d) { return d[0] } %}
@{% function SECOND(d) { return d[1] } %}

@{% function VAR(d) { return { t:'var', name:d[0].join('') } } %}
@{% function INT(d) { return { t:'number', value:d[0] } } %}

@{% function BIND(d) { return { t:'bind', name:d[2].name, exp:d[6] } } %}
@{% function APPLY(d) { return { t:'apply', function:d[1], arg:d[3] } } %}
@{% function FUN(d) { return { t:'function', name:d[0].name, arg:d[0], body:d[2] } } %}

Block     -> (null|__) Line:+    {% SECOND %}
Line      -> Statement (null|__) {% FIRST %}
Statement -> Bind                {% FIRST %}
           | Apply               {% FIRST %}

Bind  -> "let" _ Var _ "=" _ Exp {% BIND %}
Apply -> "(" Exp _ Exp ")"       {% APPLY %}
Fn    -> Var "." Exp             {% FUN %}

Exp  -> _Exp {% function (d) { return d[0][0] } %}
_Exp -> Fn
      | Val
      | Apply

Val  -> _Val {% FIRST %}
_Val -> Var {% FIRST %}
      | int {% INT %}

Var -> [a-z_$]:+ {% VAR %}

_  -> [\s] {% NONE %}
__ -> _ | __ _ {% NONE %}
