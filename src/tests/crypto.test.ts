// deno-lint-ignore-file no-explicit-any
/* eslint-disable @typescript-eslint/no-explicit-any */
(globalThis as any).__MINIGAME_STD_MINA__ = false;

import { assert } from '@std/assert';
import { cryptos, textEncode } from 'minigame-std';

(async () => {
    const data = 'minigame-std';
    const md5Str = 'e1937f8f99218d8b92587af454df4f39';
    const sha1Str = '89d4f4548e9c58c7272971b7d2cf018aea78ed1a';

    assert(cryptos.md5(data) === md5Str);
    assert(cryptos.md5(textEncode(data)) === md5Str);

    assert(await cryptos.sha1(data) === sha1Str);
    assert(await cryptos.sha1(textEncode(data)) === sha1Str);
})();