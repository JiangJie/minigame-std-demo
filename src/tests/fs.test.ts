import { assert } from '@std/assert';
import { fs } from 'minigame-std';

(async () => {
    // Clear all files and folders
    await fs.emptyDir('/');
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
    assert((await fs.readTextFile('/happy/b.txt')).unwrap() === 'hello opfs happy opfs');

    await fs.remove('/happy/opfs');

    assert(!(await fs.exists('/happy/opfs')).unwrap());
    assert((await fs.exists('/happy/b.txt')).unwrap());

    // Download a file
    const downloadRes = await fs.downloadFile('https://jsonplaceholder.typicode.com/todos/1', '/todo.json');
    if (downloadRes.isOk()) {
        assert(downloadRes.unwrap());
    } else {
        assert(downloadRes.err() instanceof Error);
    }

    const postData = (await fs.readTextFile('/todo.json')).unwrap();
    const postJson: {
        id: number;
        title: string;
    } = JSON.parse(postData);
    assert(postJson.id === 1);

    // Modify the file
    postJson.title = 'minigame-std';
    await fs.writeFile('/todo.json', JSON.stringify(postJson));

    // Upload a file
    assert((await fs.uploadFile('/todo.json', 'https://jsonplaceholder.typicode.com/todos')).unwrap());

    // Will create directory
    await fs.emptyDir('/not-exists');

    // List all files and folders in the root directory
    for await (const name of (await fs.readDir('/')).unwrap()) {
        // todo.json is a file
        // not-exists is a directory
        // happy is a directory
        console.log(name);
    }

    await fs.emptyDir('/');
})();