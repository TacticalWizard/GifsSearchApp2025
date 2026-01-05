import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { SearchBar } from "./SearchBar";

describe('SearchBar', () => {
    test('Should render SearchBar correctly', () => {
        const { container } = render( <SearchBar onQuery={()=>{}} /> )
        expect(container).toMatchSnapshot();

        //also can be done with screen methods
    })

    test('Should call onQuery with the correct value after 700ms', async () => {
        const onQuery = vi.fn(); //Declared variable just to be able to use(call) the anonymous functions
        render(<SearchBar onQuery={onQuery} />);

        const input = screen.getByRole('textbox'); //the only textbox in the component
        fireEvent.change(input, { target: {value: 'testEvent'} }); //onChange Event in the SearchBar

        //await new Promise ((resolve) => setTimeout(resolve, 701)) hardcoded
        waitFor( () => { //instead
            expect(onQuery).toHaveBeenCalled();
            expect(onQuery).toHaveBeenCalledWith('testEvent');
        })
    })

    test('Should call only once with the last value (debounce)', async ()=> {
        const onQuery = vi.fn();
        
        render(<SearchBar onQuery={onQuery} />);
        const input = screen.getByRole('textbox');
        screen.debug();
        fireEvent.change(input, { target: {value: 't'}} );
        fireEvent.change(input, { target: {value: 'te'}} );
        fireEvent.change(input, { target: {value: 'tes'}} );
        fireEvent.change(input, { target: {value: 'test'}} );
        waitFor( () => {
            expect(onQuery).toBeCalledTimes(1);
            expect(onQuery).toBeCalledWith('test');
        })
    })

    test('Should call onQuery when button clicked with the input value', ()=> {
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} />);
        
        const input = screen.getByRole('textbox');
        const button = screen.getByRole('button');
        
        fireEvent.change(input, { target: {value: 'test'}} );
        fireEvent.click(button);

        expect(onQuery).toBeCalledTimes(1);
        expect(onQuery).toBeCalledWith('test');
    })

    test('Should have the correct placeholder value, the input', ()=> {
        const value = 'new Placeholder';
        render( <SearchBar onQuery={()=>{}} placeHolder= {value} />);

        expect(screen.getByPlaceholderText(value)).toBeDefined();
    })
})
