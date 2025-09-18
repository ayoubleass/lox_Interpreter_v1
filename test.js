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

const expStrs = [
                'ayeaaab',
                'aaaab',
                'aaaaaaaab',
                'aaaaaaaacb',
];



let generatedStr = '';


const findStar = (pattern , str, index = 0, transition = 1) => {
    if (index >= str.length) {
        generatedStr +=  str.charAt(index);
        return;
    }
    let state = pattern[transition];
    
    if (state === "*" && str.charAt(index) === pattern[transition - 1]) {
        transition = transition - 1;
        state = pattern[transition];
    }
    
    if (state == "*" && str.charAt(index) !== pattern[transition - 1])  {
        transition = transition + 1;
        state = pattern[transition];
    }

    if (str.charAt(index) === state) {
        generatedStr += str.charAt(index);
    }
    

    find(pattern, str, ++index  , ++transition);
}




findStar('/a*b/', expStrs[1]);
console.log(generatedStr);


//console.log(expr);







