import { assert } from '@std/assert';
import { fs } from 'minigame-std';

(async () => {
    const mockServer = 'https://fakestoreapi.com';

    const mockAll = `${ mockServer }/products`;
    const mockSingle = `${ mockAll }/1`;

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

    // File no longer fs.exists
    const statRes = await fs.stat('/happy/opfs/a.txt');
    assert(statRes.isErr());

    assert((await fs.readFile('/happy/b.txt')).unwrap().byteLength === 21);
    // Automatically normalize the path
    assert((await fs.readTextFile('//happy///b.txt//')).unwrap() === 'hello opfs happy opfs');

    assert((await fs.remove('/happy/not/fs.exists')).unwrap());
    await fs.remove('/happy/opfs');

    assert(!(await fs.exists('/happy/opfs')).unwrap());
    assert((await fs.exists('/happy/b.txt')).unwrap());

    // Download a file
    const downloadTask = fs.downloadFile(mockSingle, '/todo.json', {
        timeout: 1000,
    });
    const downloadRes = await downloadTask.response;
    if (downloadRes.isOk()) {
        assert((downloadRes.unwrap() as WechatMinigame.DownloadFileSuccessCallbackResult).filePath.endsWith('/todo.json'));

        const postData = (await fs.readTextFile('/todo.json')).unwrap();
        const postJson: {
            id: number;
            title: string;
        } = JSON.parse(postData);
        assert(postJson.id === 1);

        // Modify the file
        postJson.title = 'happy-opfs';
        await fs.writeFile('/todo.json', JSON.stringify(postJson));

        // Upload a file
        assert(((await fs.uploadFile('/todo.json', mockAll).response).unwrap() as WechatMinigame.UploadFileSuccessCallbackResult).statusCode === 200);
    } else {
        assert(downloadRes.unwrapErr() instanceof Error);
    }

    // Will create directory
    await fs.emptyDir('/not-exists');

    // List all files and folders in the root directory
    for (const name of (await fs.readDir('/')).unwrap()) {
        console.log(name);
    }

    await fs.remove('/');
})();