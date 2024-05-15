import { assert } from '@std/assert';
import { fs } from 'minigame-std';

(async () => {
    // Clear all files and folders
    console.time('fs.clear-root');
    await fs.remove('/');
    console.timeEnd('fs.clear-root');
    // Recursively create the /happy/opfs directory
    await fs.mkdir('/happy/opfs');
    // Create and write file content
    await fs.writeFile('/happy/opfs/a.txt', 'hello opfs');
    // Move the file
    await fs.rename('/happy/opfs/a.txt', '/happy/b.txt');
    // Append content to the file
    await fs.appendFile('/happy/b.txt', ' happy opfs');

    // File no longer exists
    assert((await fs.stat('/happy/opfs/a.txt')).isErr());
    assert((await fs.readFile('/happy/b.txt')).unwrap().byteLength === 21);
    // Automatically normalize the path
    assert((await fs.readTextFile('//happy///b.txt//')).unwrap() === 'hello opfs happy opfs');

    await fs.remove('/happy/opfs');

    assert(!(await fs.exists('/happy/opfs')).unwrap());
    assert((await fs.exists('/happy/b.txt')).unwrap());

    // Download a file
    assert((await fs.downloadFile('https://jsonplaceholder.typicode.com/posts/1', '/post.json')).unwrap());

    const postData = (await fs.readTextFile('/post.json')).unwrap();
    const postJson = JSON.parse(postData);
    assert(postJson.userId === 1);

    // Modify the file
    postJson.title = 'minigame-std';
    await fs.writeFile('/post.json', JSON.stringify(postJson));

    // Upload a file
    assert((await fs.uploadFile('/post.json', 'https://jsonplaceholder.typicode.com/posts')).unwrap());

    // List all files and folders in the root directory
    for await (const name of (await fs.readDir('/')).unwrap()) {
        // post.json
        // happy
        console.log(name);
    }
})();