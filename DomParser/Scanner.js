const Module = require("module")

class Scanner {
    constructor (source) {
        this.source = source
    }


     scan = () => {
        while (this.source.length  >  this.current) {
            this.start = this.current;
            this.scanTokens();
        }
    }

        

    scanTokens = () => {}


}



module.exports = Scanner;