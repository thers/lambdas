const parser = require("./parser.js");

const globals = {
  _: "undefined",
  log: (...arg) => console.log(...arg),
  star: '"*"',
  num: (n) => {
    let i = 1;

    const f = () => i++;

    console.log(n(f)());
  }
};
const globalKeys = Object.keys(globals).join(",");
const globalValues = Object.values(globals).join(",");

function bind(binding) {
  const name = binding.name;
  const bound = evaluate(binding.exp);

  return `const ${name} = ${bound}`;
}

function apply(fn) {
  const fun = evaluate(fn.function);
  const arg = evaluate(fn.arg);

  return `${fun}(${arg})`;
}

function makeFunction(def) {
  const argName = def.arg.name;
  const body = evaluate(def.body);

  return `${argName}=> ${body}`;
}

function evaluate(exp) {
  switch (exp.t) {
    case "bind":
      return bind(exp);
    case "apply":
      return apply(exp);
    case "var":
      return exp.name;
    case "value":
    case "number":
      return exp.value;
    case "function":
      return makeFunction(exp);
  }
}

function run(prog, opts) {
  const instance = parser();
  instance.feed(prog.trim());

  const compiled = instance.results[0].map(evaluate).join(";\n").trim();

  if (opts.showCompiled) {
    const compiledFancy = compiled
      .trim()
      .split('\n')
      .map((line) => line.trim())
      .join('\n\t');

    console.log(`Compiled js:\n\t${compiledFancy}\nOutput:`);
  }

  return eval(`((${globalKeys}) => { ${compiled} })(${globalValues})`);
}

module.exports = run;
