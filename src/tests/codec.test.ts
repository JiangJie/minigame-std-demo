import { assert } from '@std/assert';
import { decode, encode } from 'minigame-std';

const data = 'minigame-std';

console.time('decode-after-encode');
assert(decode(encode(data)) === data);
console.timeEnd('decode-after-encode');