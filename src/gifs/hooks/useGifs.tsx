import { useRef, useState } from 'react';
import type { Gif } from '../interfaces/gif.interface.ts';
import { getGifByQuery } from '../actions/get.gifs.by.query.action.ts';

export const useGifs = (  ) => {
        
    const [previousRecords, setpreviousRecord] = useState< string[] > ([]) //USE STATE
    const [gifList, setGifList] = useState< Gif[] > ([]);

    const gifsCache = useRef<Record <string, Gif[]> > ({});

    const handleTermClicked = async (term: string) => {
        //console.log({ term })
        if( gifsCache.current[term]) {
            setGifList(gifsCache.current[term]);
            return;
        }
        const gifs = await getGifByQuery(term);
        setGifList(gifs);
        //gifsCache.current[term] = gifs;
    }
    
    const handleSearch = async (query: string) => { //query parameter will be the string searched by the user
    
    
        if (query.length === 0) return;
        
        const queryFormatted = query.trim().toLowerCase(); //delete forward and back empty spaces
        //console.log({ queryFormatted })
        
        const queryExisted = previousRecords.includes(queryFormatted);
                
        if (queryExisted) return
    
        setpreviousRecord([query, ...previousRecords].splice(0,7));
    
        const gifs = await getGifByQuery(query);
    
    
        setGifList(gifs);

        gifsCache.current[query] = gifs;
    }

        return{
            //props
            gifList,
            previousRecords,
            //methods
            handleTermClicked,
            handleSearch,
        }
}
