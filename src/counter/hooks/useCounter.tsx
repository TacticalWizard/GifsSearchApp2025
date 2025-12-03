//customHook
import { useState } from "react";

export const useCounter = ( initialValue: number = 10) => {

    const [counter, setCounter] = useState(initialValue) 

    const handleAdd = () => {
        setCounter(counter + 1);
    }

    const handleSustract = () => {
        setCounter( (prevState) => prevState - 1);
    }
    
    const handleReset = () => {
        setCounter(initialValue);
    }

    return {
        //Properties / Values
        counter, //property that points to a variable of the same name e.g., [counter: counter] con be left like this.

        //Methods / Actions
        handleAdd,
        handleSustract,
        handleReset
    }
}