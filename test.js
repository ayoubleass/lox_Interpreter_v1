const Scanner = require("./Interpreter_js/Scanner");
const {Parser, tokenType, LiteralExpression, BinaryExpression} = require("./Interpreter_js/Parser");

const arithOp = {
    [tokenType.PLUS] : '+',
    [tokenType.MINUS] : '-',
    [tokenType.STAR] : '*',
    [tokenType.SLASH] : '/'
};


let source = "(4 * 4) + 4;";
source = "4 + 5 * 5";



const scanner2 = new Scanner(source);
const tokens2 = scanner2.scane().getTokens();
const parsedToken = new Parser(tokens2).expression();


const prettyPrint = (expObjects, expr = '') => {
    for (const token in expObjects) {
        const obj = expObjects[token];
        if (obj instanceof LiteralExpression) {
            expr +=  `${obj.value}`;
        }
        if (token === "operator") {
            expr += ` ${arithOp[obj]} `;
        }
        if (obj instanceof BinaryExpression) {
            expr += '( ';
            expr = prettyPrint(obj, expr);
            expr += (' )');
        }
    }
    return expr;
}



const expr = prettyPrint(parsedToken);
// let laoding = '';


// const startTime = performance.now();
// const endTime = startTime - (startTime * 8);

// let elapedTime = 0;
// setInterval(() => {
//     elapedTime += 1000;
//     if (laoding.length === 3) {
//         laoding = '';
//     }
//     laoding += '.';

// }, 1000);




console.log(expr);







