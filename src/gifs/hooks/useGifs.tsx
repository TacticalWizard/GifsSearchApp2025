import { useRef, useState } from 'react';
import type { Gif } from '../interfaces/gif.interface.ts';
import { getGifByQuery } from '../actions/get.gifs.by.query.action.ts';

export const useGifs = (  ) => {
        
    const [previousHistory, setpreviousHistory] = useState<string[]>([]) //USE STATE
    const [gifList, SetGifList] = useState<Gif[]>([]);

    const gifsCache = useRef<Record<string, Gif[]>>({});

    const handleTermClicked = async (term: string) => {
        console.log({ term })
        if( gifsCache.current[term]) {
            SetGifList(gifsCache.current[term]);
            return;
        }
        const gifs = await getGifByQuery(term);
        SetGifList(gifs);
    }
    
    const handleSearch = async (query: string) => { //query parameter will be the string searched by the user
    
        console.log({ query })
    
        if (query.length === 0) return;
        
        const queryFormatted = query.trim().toLowerCase(); //delete forward and back empty spaces
        console.log({ queryFormatted })
        
        const queryExisted = previousHistory.includes(queryFormatted);
                
        if (queryExisted) return
    
        setpreviousHistory([query, ...previousHistory].splice(0,7));
    
        const gifs = await getGifByQuery(query);
    
        console.log(gifs);
    
        SetGifList(gifs);

        gifsCache.current[query] = gifs;
    }

        return{
            //props
            gifList,
            //methods
            previousHistory,
            handleTermClicked,
            handleSearch,
        }
}
