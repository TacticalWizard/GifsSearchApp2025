import { describe, expect, test } from "vitest";
import { getGifByQuery } from "./get.gifs.by.query.action";

describe( 'get.figs.by.query.action', () => {
     test('Should return a list of gifs', async() => {
         const gifs = await getGifByQuery('mcqueen')
         const [ gif1 ] = gifs
         expect(gif1).toStrictEqual({
             id: expect.any(String),
             height: expect.any(Number),
             width: expect.any(Number),
             title: expect.any(String),
             url: expect.any(String),
         })
         console.log(gif1);
     })
});

