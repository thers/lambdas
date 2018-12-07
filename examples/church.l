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
