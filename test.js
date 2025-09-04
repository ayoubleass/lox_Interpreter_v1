const { EOF } = require("dns");
const fs = require('fs');
const readline = require('readline');

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

class Token {
    constructor (type, literal, line) {
        this.type = type, 
        this.literal = literal;
        this.line = line;

    }
}



class Scanner {

    constructor (source) {
        this.source = source;
        this.start = 0;
        this.current = 0;
        this.tokens = [];
        this.line = 1;
    }


    scanTokens () {
        while (this.notTheEnd) {
            start = current;
            this.scanToken();
        }
        this.tokens.push(new Token(EOF, '', 1));
        return this.tokens;
    }


    scanToken () {
        const char = this.advance(); 
        switch (char) {
            case '(': addToken(tokenType.LEFT_PAREN); break;
            case ')': addToken(tokenType.RIGHT_PAREN); break;
            case '{': addToken(tokenType.LEFT_BRACE); break;
            case '}': addToken(tokenType.RIGHT_BRACE); break;
            case ',': addToken(tokenType.COMMA); break;
            case '.': addToken(tokenType.DOT); break;
            case '-': addToken(tokenType.MINUS); break;
            case '+': addToken(tokenType.PLUS); break;
            case ';': addToken(tokenType.SEMICOLON); break;
            case '*': addToken(tokenType.STAR); break;
            default:
                console.error(line, "Unexpected character.");
                break;
        }
        scanToken();
    }

    advance() {
        return this.source.charAt(this.current++);
    }

    notTheEnd () {
        return this.current <= this.source;        
    }
    
    addToken(type) {
        return this.addToken(type, null);
    }

    addToken(type, literal) {
        const text = this.source.subString(this.start, this.current);
        this.tokens.push(new Token(type, text, literal, this.line));
    }

}


 const rl = readline.createInterface({
    input: fs.createReadStream('file.lox'),
    crlfDelay: Infinity // Handles both \r\n and \n line endings
});




// const scanner = new Scanner();
// const tokens = scanner.scanToken();


/**/


const name = "ayoubLeas";
let current = 0;



const advance = () => {    
    return name.charAt(current++);
}


while (current <= name.length) {
    console.log(advance());
}
