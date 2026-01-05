import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";
import * as gifActions  from "../actions/get.gifs.by.query.action"; //Imported all "GetGifsByQuery object to send 2 parameters as the spyOn method requires"

describe( 'useGifs', () => {
    test('should return default values and methods', () => {
        const {result} = renderHook(() => useGifs())

        expect(result.current.gifList.length).toBe(0);
        expect(result.current.previousRecords.length).toBe(0);
        expect(result.current.handleSearch).toBeDefined();
        expect(result.current.handleSearch).toBeDefined();
    });

    test('should return a list of gifs', async () => {
        const {result} = renderHook(() => useGifs())

        await act(async() => {
           await result.current.handleSearch('Bikes'); //keep in mind the Asynchronous function
        })

        expect(result.current.gifList.length).toBe(10)
    });

    test('should return a list of gifs when handleTermClicked is called', async () => {
        const {result} = renderHook(() => useGifs())

        await act(async() => {
            await result.current.handleSearch('Cars');
        })

        expect(result.current.gifList.length).toBe(10)
    });

    test('should return searched term from cache if the same term is called twice', async () => {
        //Note: if we test like this, the query will be sent. This is why we should try to mock this kind of tests.
        //if this is not working it may be because we deleted our DEV environment API calls for today (100 p/ day limit)
        //Consider to disable the autoSave option so we dont launch a petition each time we modify a file.
        const {result} = renderHook(() => useGifs())

        await act(async() => {
            await result.current.handleSearch('Cacheado');
        })
        expect(result.current.gifList.length).toBe(10)
 
        await act(async() => {
            await result.current.handleSearch('Cacheado');
        })

        vi.spyOn(gifActions, 'getGifByQuery').mockRejectedValue(
            new Error('This method should not have been called since we should have this value on cache')
        )

        expect(result.current.gifList.length).toBe(10)
    });

    test('Should return no more than 8 previous terms', async () => {
        const { result } = renderHook( () => useGifs() );

        vi.spyOn(gifActions, 'getGifByQuery').mockResolvedValue([]);

        await act(async() => {
            await result.current.handleSearch('gif1');
        })
        
        await act(async() => {
            await result.current.handleSearch('gif2');
        })
        
        await act(async() => {
            await result.current.handleSearch('gif3');
        })

        await act(async() => {
            await result.current.handleSearch('gif4');
        })

        await act(async() => {
            await result.current.handleSearch('gif5');
        })

        await act(async() => {
            await result.current.handleSearch('gif6');
        })

        await act(async() => {
            await result.current.handleSearch('gif7');
        })

        await act(async() => {
            await result.current.handleSearch('gif8');
        })

        console.log('previousRecords', result.current.previousRecords)

        expect(result.current.previousRecords).toStrictEqual(
            ['gif8', 'gif7', 'gif6', 'gif5', 'gif4','gif3','gif2']
        );

        expect(result.current.previousRecords.length).toBe(7);
    })
});