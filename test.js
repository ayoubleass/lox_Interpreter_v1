const Scanner = require("./js/Scanner");
const {Parser, tokenType} = require("./js/Parser");





let source = "(4 * 4) + 4;";
const scanner = new Scanner(source);

const tokens = scanner
                .scane()
                .getTokens();

console.log(tokens);
console.log('==================================');

const parser = new Parser(tokens).expression();
console.log(parser);




source = "4 + 5 * 5";
const scanner2 = new Scanner(source);

const tokens2 = scanner2.scane().getTokens();


// const parseExpression  = () => {
//     while (Object) {

//     }
// }


