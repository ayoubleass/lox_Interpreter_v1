const Scanner = require("./Scanner");


const tokenType = {
    SLASH : 'SLASH',
    TAG : 'TAG',
    AttR : 'ATTR',
    ATTR_VAL : 'ATTR_VAL',
    INNERTEXT : 'INNERTEXT',
    CLOSING_TAG : 'CLOSING_TAG',
};


const tags = [
  'html',
  'head',
  'title',
  'body',
  'article',
  'aside',
  'footer',
  'header',
  'hgroup',
  'main',
  'nav',
  'section',
  'div',
  'span',
  'base',
  'link',
  'meta',
  'noscript',
  'script',
  'style',
  'template',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'a',
  'abbr',
  'address',
  'blockquote',
  'br',
  'code', 'data', 'del', 'dfn', 'em', 'i', 'ins',
  'kbd', 'mark', 'q', 'ruby', 's', 'samp', 'small', 'strong', 'sub',
  'sup', 'time', 'u', 'var', 'wbr', 'ul', 'ol', 'li', 'dl', 'dt', 'dd',
  'table', 'caption', 'th', 'tr', 'td', 'thead', 'tbody', 'tfoot', 'col',
  'colgroup', 'form', 'input', 'button', 'select', 'option', 'optgroup',
  'label', 'fieldset', 'legend', 'datalist', 'output', 'textarea',
  'audio', 'video', 'source', 'img', 'map', 'area', 'canvas', 'embed',
  'iframe', 'object', 'param', 'picture', 'track', 'details', 'dialog',
  'figure', 'figcaption', 'meter', 'progress', 'hr', 'summary'
];


const attributes = [
    'accesskey',
    'autocapitalize',
    'autofocus',
    'class',
    'contenteditable',
    'data-*',
    'dir',
    'draggable',
    'enterkeyhint',
    'hidden',
    'id',
    'inert',
    'inputmode',
    'is', 
    'itemid',
    'itemprop',
    'itemref',
    'itemscope',
    'itemtype',
    'lang',
    'nonce',
    'part',
    'role',
    'slot',
    'spellcheck',
    'style',
    'tabindex',
    'title',
    'translate'
];



class HtmlScanner extends Scanner {

    constructor (source) {
        super(source);
        this.current = 0;
        this.start = 0;
        this.tokens = [];
    }


        


    scanTokens = () => {
        let c = this.advance();
        if (c === '<') {
            while (!this.match(">") && !this.atEnd()) {
                this.advance();
            }
            this.advance();
            this.addTokens(this.source.substring(this.start, this.current), ' >');
        }
        if (c !== '<') {
            while (!this.match('<') && !this.atEnd()) {
                this.advance();
            }
           this.addToken(tokenType.INNERTEXT,
                this.source.substring(this.start, this.current)); 
        }
        return
    }



    advance = () => {
        return this.source.charAt(this.current++);
    }


    match(c) {
        if (c === this.source.charAt(this.current)) {
            return true;
        }
        return false;
    }

    addToken = (type, value) => {
        this.tokens.push({
            type, 
            value,
        })
    }



    addTokens  = (frags, delemite,  start = 0) => {
        if (start >= frags.length) return;
        let i = start;
        while (i < frags.length && !delemite.includes(frags[i])) {
            i++;
        }
        let  value = frags.substring(start , i);
        
        if (value.includes('<')) {
            value =  frags.substring(start + 1 , i)
        }
        
        if (value.includes('</')) {
            value = value.replace(/[<>]/g, '');;
        }
        
        if (tags.includes(value)) {
            this.addToken(tokenType.TAG, value);
        } else {
            //Todo scan the attributes
            this.addAttributes(value);            
        }

        this.addTokens(frags.substring(i + 1), '>', 0);
    }


    addAttributes = (str) => {
        const attr = str.split(' ');
        console.log(attr);
    }


    atEnd = () => {
        return this.source.length <= this.current;
    }

}




module.exports = HtmlScanner;