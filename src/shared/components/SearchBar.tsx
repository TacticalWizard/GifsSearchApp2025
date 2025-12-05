import { useEffect, useState } from 'react';

interface Props{
    placeHolder: string;
    onQuery: (query:string) => void; //it´s void because this is only so we can call the function from the father component
}

export const SearchBar = ( {placeHolder = 'Buscar', onQuery} : Props) => { //added default value for placeHolder prop
        const [query, setQuery] = useState('') ///USE STATE

        useEffect(() => { //effect triggered each time the component is loaded        
            const timeoutId = setTimeout(() => {
                onQuery(query);
            }, 1200);

            return () => { //effect triggered each time the component is loaded and every time the callback function is executed
                console.log('Funcion de limpieza');
                clearTimeout(timeoutId);
            };
        },[query, onQuery])  //added dependencies wich are going to use the effect

        const handleSearch = () => {
            onQuery(query);
        };

        const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter'){
                handleSearch();
            }
        }

        return(
            <div className = "search-container">
                    <input 
                        type="text" 
                        placeholder = {placeHolder} 
                        value= {query}
                        onChange= {(event) => setQuery(event.target.value)} //console.log(event)
                        onKeyDown= { handleKeyDown }
                    />
                    <button onClick={ handleSearch }>Buscar</button>
            </div>
        );
    //</>
};

