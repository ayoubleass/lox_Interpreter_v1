


class InterpreteR {

    interpret = (expresion) => {
        try {
            this.evaluate(expresion);
        } catch(Error) {

        }
    } 


    evaluate = (expresion) => {
        return expresion.accept(this);
    }


    
}