const { EOF } = require("dns");
const fs = require('fs');
const readline = require('readline');
const {Parser, tokenType} = require("./parser");



const source = "if (12 >= 2) return true;";

class Scanner {

    constructor (source) {
        this.source = source;
        this.current = 0;
        this.start = 0;
        this.tokens = [];
    }

    scanToken = () => {
        const c = this.advance(); 
        switch (c) {
            case  '>':
                this.tokens.push({
                    type: !this.match('=') ? tokenType.GREATER : tokenType.GREATER_EQUAL ,
                    literal : null,
                    line: 1,
                });
                break;
            case this.isDigit(c):
                while (this.isDigit(this.source.charAt(this.current))) this.advance();
                this.tokens.push({
                    type: tokenType.NUMBER,
                    literal: parseInt(this.source.substring(this.start, this.AtTheEndcurrent)),
                    line: 1, 
                });
                break;
            case '(':
                this.tokens.push({
                    type: tokenType.LEFT_PAREN,
                    literal : null, 
                    line: 1,
                });
                break;
            case '':
                break;
            case ')':
                this.tokens.push({
                    type: tokenType.RIGHT_PAREN,
                    literal : null, 
                    line: 1,
                });
                break;
            case ';':
                this.tokens.push({
                    type: tokenType.SEMICOLON,
                    literal : null, 
                    line: 1,
                })
                break;
        }

    }


    scane = () => {
        while (!this.AtTheEnd()) {
            this.start = this.current;
            this.scanToken();     
        }
        return this;
    }


    getTokens = ()  => {
        return this.tokens;
    }


    advance = () => {    
        return this.source.charAt(this.current++);
    }
    
    match = (expected) => {
        if (expected !== source.charAt(this.current)) {
            return false;
        }
        this.current++;
        return true;
    }

    AtTheEnd = () => {
        return this.current >= this.source.length;
    }


    isDigit = (c) => {
        if(c >= "0" && c <= "9") {
            return c;
        }
        return false;
    }
}   






const scanner = new Scanner(source);

const tokens = scanner
                .scane()
                .getTokens();

console.log(tokens);
console.log('==================================');

const parser = new Parser(tokens).equality();
console.log(parser);




