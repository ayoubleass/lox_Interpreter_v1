const HtmlScanner = require('./DomParser/HtmlScanner');





const source = '<h1 class="main-text" style="width: 200px; padding: 0 10px 0 3px"> Welcome to my page<span class="aeae">!<div>:)</div></span></h1>'
const scanner = new HtmlScanner(source);

scanner.scan();

const tokens = scanner.tokens;

console.log(tokens);










