import { decode, encode } from 'minigame-std';

const data = 'minigame-std';
console.assert(decode(encode(data)) === data);