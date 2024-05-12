import { decodeBase64, encodeBase64 } from 'minigame-std';

const data = 'minigame-std';
const encodedData = 'bWluaWdhbWUtc3Rk';

const data1 = '中文';
const encodedData1 = '5Lit5paH';

console.assert(encodeBase64(data) === encodedData);
console.assert(decodeBase64(encodedData) === data);

console.assert(encodeBase64(data1) === encodedData1);
console.assert(decodeBase64(encodedData1) === data1);