# lambdas
Compiler for small-tiny-mini language to play with lambdas

For a code like this:
```
let next = n.f.x.(f ((n f) x))
let sum = a.b.((a next) b)
let mul = a.b.f.(a (b f))
let prev = n.f.x.(((n g.h.(h (g f))) u.x) u.u)

let zero = f.x.x
let one = f.x.(f x)
let two = (next one)
let three = (next two)
let four = (next three)

(num (prev three))
(num ((mul three) four))
(num ((sum four) three))
```
It will compile a js like this:
```js
const next = n=> f=> x=> f(n(f)(x));
const sum = a=> b=> a(next)(b);
const mul = a=> b=> f=> a(b(f));
const prev = n=> f=> x=> n(g=> h=> h(g(f)))(u=> x)(u=> u);
const zero = f=> x=> x;
const one = f=> x=> f(x);
const two = next(one);
const three = next(two);
const four = next(three);
num(prev(three));
num(mul(three)(four));
num(sum(four)(three)) 
```
# Syntax

#### Lambdas
Lambdas are functions. They can accept only one argument and must return something.

Id lambda:
```
x.x
```

Value lambda:
```
_.123
```

#### Application
Application is function invocation with an argument. Only one argument.

The following will output `123`, as `log` is a predefined function for printing stuff.
```
(log 123)
```

#### Variable binding
You can bind expressions evaluation results to the names.
Values given to those names are immutable.
```
let num = 123
let fun = a.a
let call = (log 123)
```
# Missing stuff
- Strings
- Math operators, such as `+ - / * ^`, etc.
- Objects
- Arrays
- Tuples
- Lists
- More than one argument for the function
- None arguments for the function
- Pretty much everything else

# We don't need all above, really

# Things we have built-in
- `_` variable, it evaluates to `undefined` eventually
- `log` function
- `num` function that accepts function as argument and will pass function to that function to count how many times it will be invoked, in the end it will invoke what the argument function returned, so it should be a function.
