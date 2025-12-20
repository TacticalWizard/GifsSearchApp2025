//import axios from 'axios' //npm install axios. HTTP query. Later replaced with axios intance IN ../api/giphy.api
import { giphyApi } from '../api/giphy.api';
import type { GiphyResponse } from '../interfaces/giphy.response';
import type { Gif } from '../interfaces/gif.interface'

export const getGifByQuery = async(query: string): Promise<Gif[]> => {  
    
    //adjust so we don´t reach the endpoint when the query is empty
    if ( query.trim().length === 0) { 
        return[];
    }

    try{
         const response = await giphyApi<GiphyResponse>('/search', { // <> type assertion indicates TS the expected result  
            params: {
                q: query,
                limit: 10,
            }, 
        });
        
        console.log(response.data)

        return response.data.data.map((gif) => ({
            id: gif.id,
            title: gif.title,
            url: gif.images.original.url,
            width: Number(gif.images.original.width), //For giphyGif interface this is a string but for ours is a number. So we changed the type here.
            height: Number(gif.images.original.height) 
        }));
    } catch(error) 
    {
        console.error(error);
        return [];
    }

    
};

