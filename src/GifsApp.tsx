import { GifsList } from './gifs/components/GifsList.tsx'
import { PreviousSearches } from './gifs/components/PreviousSearches.tsx'
import { CustomHeader } from './shared/components/CustomHeader';
import { SearchBar } from './shared/components/SearchBar'


import { useGifs } from './gifs/hooks/useGifs.tsx';

export const GifsApp = () => {
    
    const { previousRecords, gifList, handleTermClicked, handleSearch } = useGifs();

    return(
        <>
            {/* header */}
            <CustomHeader 
                title="Buscador de Gifs" description="Busca los mejores gifs. Es una orden."
            />


            {/* search */}
            <SearchBar 
                placeHolder="Busqueda de gifs"
                onQuery = {handleSearch}
            />

            {/* Search History */}
            <PreviousSearches 
                subTitle="historial" searches= { previousRecords } 
                onLabelClicked= {handleTermClicked} 
            />  {/* onLabelClicked= (term: string) => {term}*/}

            {/* gifs */}
            <GifsList 
                gifs={ gifList }
            />
        </>
    )
};