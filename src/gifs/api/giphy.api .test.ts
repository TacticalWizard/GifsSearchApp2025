import { describe, expect, test } from 'vitest';
import { giphyApi } from './giphy.api';

describe('giphy.api', () => {
    test('Should be configured correctly', () => {
        //console.log(giphyApi.defaults);
        const params = giphyApi.defaults.params;

        expect(giphyApi.defaults.baseURL).toBe('https://api.giphy.com/v1/gifs');
        expect(params.lang).toBe('es');
        expect(params.api_key).toBe(import.meta.env.VITE_GIPHY_API_KEY);

        //If we want to evaluate the whole object instead we use strictEqual
        expect(params).toStrictEqual({
            lang: 'es',
            api_key: import.meta.env.VITE_GIPHY_API_KEY
        })
    });
});