

const tokenType = Object.freeze({
  // Single-character tokens
  LEFT_PAREN: 'LEFT_PAREN',
  RIGHT_PAREN: 'RIGHT_PAREN',
  LEFT_BRACE: 'LEFT_BRACE',
  RIGHT_BRACE: 'RIGHT_BRACE',
  COMMA: 'COMMA',
  DOT: 'DOT',
  MINUS: 'MINUS',
  PLUS: 'PLUS',
  SEMICOLON: 'SEMICOLON',
  SLASH: 'SLASH',
  STAR: 'STAR',

  // One or two character tokens
  BANG: 'BANG',
  BANG_EQUAL: 'BANG_EQUAL',
  EQUAL: 'EQUAL',
  EQUAL_EQUAL: 'EQUAL_EQUAL',
  GREATER: 'GREATER',
  GREATER_EQUAL: 'GREATER_EQUAL',
  LESS: 'LESS',
  LESS_EQUAL: 'LESS_EQUAL',

  // Literals
  IDENTIFIER: 'IDENTIFIER',
  STRING: 'STRING',
  NUMBER: 'NUMBER',

  // Keywords
  AND: 'AND',
  CLASS: 'CLASS',
  ELSE: 'ELSE',
  FALSE: 'FALSE',
  FUN: 'FUN',
  FOR: 'FOR',
  IF: 'IF',
  NIL: 'NIL',
  OR: 'OR',
  PRINT: 'PRINT',
  RETURN: 'RETURN',
  SUPER: 'SUPER',
  THIS: 'THIS',
  TRUE: 'TRUE',
  VAR: 'VAR',
  WHILE: 'WHILE',

  EOF: 'EOF'
});



class Expression { 
    constructor () {}
}

class BinaryExpression extends Expression {
    constructor (left, operator, right) {
        super();
        this.left = left;
        this.operator = operator;
        this.right = right;
    }

}

class groupingExpr extends Expression {
    constructor (expr) {
        super();
        this.expr = expr;
    }
}
 
class UnaryExpr extends Expression {
    constructor (operator, right) {
        super();
        this.operator = operator,
        this.right = right;
    }
}

class LiteralExpression extends Expression {
    constructor (value) {
        super();
        if (value === null) {
            throw new Expression('value must be type string or a number');
        }
        this.value = value;
    }
}



class Parser {

    constructor (tokens) {
        this.tokens = tokens;
        this.current = 0;
    }

    expression = () => {
        return this.equality(); 
    }


    equality = () => {
        return this.term();
    }

    term = () => {
        let expr = this.factor();   
        while (this.match(tokenType.MINUS, tokenType.PLUS)) {
            const operator = this.previous().type;
            const right = this.factor();
            expr = new BinaryExpression(expr, operator, right);
        }
        return expr;
    }


    factor = () => {
        let expr = this.unary();
        while(this.match(tokenType.SLASH, tokenType.STAR)) {
            const operator = this.previous().type;
            const right = this.factor();
            expr = new BinaryExpression(expr, operator, right);
        }
        return expr;
    }
    

    unary = () => {
        while(this.match(tokenType.MINUS, tokenType.BANG)) {
            return new UnaryExpr(
                this.previous().type,
                this.unary(),
            );
        }
        return this.primary();
    }

    
    primary = () => {
        if (this.match(tokenType.TRUE)) return new LiteralExpression(true);

        if (this.match(tokenType.FALSE)) return new LiteralExpression(false);

        if (this.match(tokenType.STRING) || this.match(tokenType.NUMBER)) {
            return new LiteralExpression(this.previous().literal);
        } 
   
        if (this.match(tokenType.LEFT_PAREN)) {
            const exp = this.expression();
            const c = this.getCurrent();
            if (c.type !== tokenType.RIGHT_PAREN) {
                throw Error('Expected  missing \')\' after the expression');
            }
            this.advance();
            return new groupingExpr(exp);
        }
        throw Error('Expected expression');
    }

    match(...tokensType) {
        for (const token of tokensType) {
            if (this.check(token)) {
                this.advance();
                return true;
            }
        }
        return false;
    }


    advance() {
        this.current++;
    }


    previous () {
        if (this.current > 0) {
            return this.tokens[this.current - 1];
        }
    }


    atTheEnd () {
        if (this.tokens[this.current].type !== tokenType.EOF) {
            return false;
        }
        return true;
    }

    check (tokenType) {
        return tokenType === this.tokens[this.current].type;   
    }


    getCurrent = () => {
        return this.tokens[this.current];
    }


}




module.exports = {
    Parser,
    tokenType,
};
