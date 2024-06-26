import { assert } from '@std/assert';
import { fetchT } from 'minigame-std';

(async () => {
    const fetchTask = fetchT<{
        name: string;
    }>('https://jsr.io/@happy-js/minigame-std/meta.json', {
        abortable: true,
        responseType: 'json',
    });

    setTimeout(() => {
        fetchTask.abort();
    }, 100);

    const res = await fetchTask.response;

    if (res.isErr()) {
        assert((res.unwrapErr() as Error).name === 'AbortError');
    } else {
        assert(res.unwrap().name === 'minigame-std');
    }
})();