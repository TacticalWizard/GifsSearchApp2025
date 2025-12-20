import { beforeEach, describe, expect, test, vi } from "vitest";
import AxiosMockAdapter from 'axios-mock-adapter';
import { getGifByQuery } from "./get.gifs.by.query.action";
import { giphyApi } from "../api/giphy.api";
import { giphySearchResponseMock } from './../../tests/mocks/giphy.response.data'

describe( 'get.figs.by.query.action', () => {
    let mock = new AxiosMockAdapter(giphyApi);

    beforeEach(() => { //before each test
        //mock.reset()
        mock = new AxiosMockAdapter(giphyApi);
    });

    //  test('Should return a list of gifs', async() => {
    //      const gifs = await getGifByQuery('mcqueen')
    //      const [ gif1 ] = gifs
    //      expect(gif1).toStrictEqual({
    //          id: expect.any(String),
    //          height: expect.any(Number),
    //          width: expect.any(Number),
    //          title: expect.any(String),
    //          url: expect.any(String),
    //      })
    //      console.log(gif1);
    //  })

    test('Should return a list of gifs', async () => {
        mock.onGet('/search').reply(200, giphySearchResponseMock);

        const gifs = await getGifByQuery('McQueen');

        expect(gifs.length).toBe(25); //This is 25 because the mock query returned this number of gifs

        gifs.forEach((gif) => {
            expect(typeof gif.id).toBe('string');
            expect(typeof gif.height).toBe('number');
            expect(typeof gif.width).toBe('number');
            expect(typeof gif.title).toBe('string');
            expect(typeof gif.url).toBe('string');
        });
    });

    test('Should return an empty list of gifs if query is empty', async () => {
        // mock.onGet('/search').reply(200, giphySearchResponseMock);
        mock.restore(); //Restores axios instance so we can use the original response and not the mock

        const gifs = await getGifByQuery('');

        expect(gifs.length).toBe(0);
    });

    test('Should handle error when the API returns an error', async () => {

        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { console.log('Custom console error')});

         mock.onGet('/search').reply(400, {data: {
            message: "Bad request"
         }
        });

        const gifs = await getGifByQuery('Obi');

        expect(gifs.length).toBe(0);
        expect(consoleErrorSpy).toHaveBeenCalled();
        expect(consoleErrorSpy).toBeCalledTimes(1);
        expect(consoleErrorSpy).toBeCalledWith(expect.anything());
        console.log(gifs);
    });
});
