import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react'; //Testing library used to mount and work with components
import { CustomHeader } from './CustomHeader';


describe( 'customHeader', () => {
    const title= "Test Title";

    test('should render the title correctly', () => {
        //const { container } = render(<CustomHeader title="Buscador de Gifs" />); another way of doing it with container
        
        /*const testTitle = screen.getByRole('heading', {
            level: 1,
        });*/

        render(<CustomHeader title = {title} />);

        const testTitle = screen.getByText(title);
        //screen.debug(); //to see what's rendering 

        expect(testTitle).toBeDefined();
    });

    test('should render the description when provided', () => {
        const description = 'Test Description'

        render(<CustomHeader title= {title} description= {description}/>);
        
        const descriptionByRole = screen.getByRole('paragraph'); //test by role (In this case a paragraph)

        //screen.debug(); //to see what's rendering 

        expect(screen.getByText(description)).toBeDefined();
        expect(descriptionByRole).toBeDefined();
        expect(descriptionByRole.innerHTML).toBe(description);
    });

    test('should not render description when not provided', () => {
        //if you use screen the element has to exist. So we use container
        
        const { container } = render(<CustomHeader title= {title} />)

        const divElement = container.querySelector('.content-center');

        const p = divElement ? divElement.querySelector('p') : null; //DivElement does not exist
        
        expect(p).toBeNull();
    });
})