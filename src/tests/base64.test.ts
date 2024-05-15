import { assert } from '@std/assert';
import { decodeBase64, encodeBase64 } from 'minigame-std';

const data = 'minigame-std';
const encodedData = 'bWluaWdhbWUtc3Rk';

const data1 = '中文';
const encodedData1 = '5Lit5paH';

console.time('encodeBase64');
assert(encodeBase64(data) === encodedData);
console.timeEnd('encodeBase64');

console.time('decodeBase64');
assert(decodeBase64(encodedData) === data);
console.timeEnd('decodeBase64');

console.time('encodeBase64-中文');
assert(encodeBase64(data1) === encodedData1);
console.timeEnd('encodeBase64-中文');

console.time('decodeBase64-中文');
assert(decodeBase64(encodedData1) === data1);
console.timeEnd('decodeBase64-中文');