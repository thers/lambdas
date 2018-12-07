const fs = require('fs');
const path = require('path');
const nearley = require("nearley");
const grammar = require('./grammar');

const parser = () => new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

module.exports = parser;
