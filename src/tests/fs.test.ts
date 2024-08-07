import { assert } from '@std/assert';
import { fs } from 'minigame-std';

const mockServer = 'https://fakestoreapi.com';

const mockAll = `${ mockServer }/products`;
const mockSingle = `${ mockAll }/1`;

async function testAsync() {
    // Clear all files and folders
    await fs.emptyDir(fs.ROOT_DIR);
    // Recursively create the /happy/opfs directory
    await fs.mkdir('/happy/opfs');
    // Create and write file content
    await fs.writeFile('/happy/opfs/a.txt', 'hello opfs');
    await fs.writeFile('/happy/op-fs/fs.txt', 'hello opfs');
    // Move the file
    await fs.rename('/happy/opfs/a.txt', '/happy/b.txt');
    // Append content to the file
    await fs.appendFile('/happy/b.txt', ' happy opfs');

    // File no longer exists
    const statRes = await fs.stat('/happy/opfs/a.txt');
    assert(statRes.isErr());

    assert((await fs.readFile('/happy/b.txt')).unwrap().byteLength === 21);
    // Automatically normalize the path
    assert((await fs.readTextFile('//happy///b.txt//')).unwrap() === 'hello opfs happy opfs');

    assert((await fs.remove('/happy/not/exists')).isOk());
    await fs.remove('/happy/opfs');

    assert(!(await fs.exists('/happy/opfs')).unwrap());
    assert((await fs.exists('/happy/b.txt')).unwrap());
    assert((await fs.stat('/happy/b.txt')).unwrap().isFile());

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

    // Zip/Unzip
    assert((await fs.zip('/happy', '/happy.zip')).isOk());
    assert((await fs.unzip('/happy.zip', '/happy-2')).isOk());

    // List all files and folders in the root directory
    for (const name of (await fs.readDir(fs.ROOT_DIR)).unwrap()) {
        console.log(name);
    }

    await fs.remove(fs.ROOT_DIR);
}

function testSync() {
    // Clear all files and folders
    fs.emptyDirSync(fs.ROOT_DIR);
    // Recursively create the /happy/opfs directory
    fs.mkdirSync('/happy/opfs');
    // Create and write file content
    fs.writeFileSync('/happy/opfs/a.txt', 'hello opfs');
    fs.writeFileSync('/happy/op-fs/fs.txt', 'hello opfs');
    // Move the file
    fs.renameSync('/happy/opfs/a.txt', '/happy/b.txt');
    // Append content to the file
    fs.appendFileSync('/happy/b.txt', ' happy opfs');

    // File no longer exists
    const statRes = fs.statSync('/happy/opfs/a.txt');
    assert(statRes.isErr());

    assert((fs.readFileSync('/happy/b.txt')).unwrap().byteLength === 21);
    // Automatically normalize the path
    assert((fs.readTextFileSync('//happy///b.txt//')).unwrap() === 'hello opfs happy opfs');

    assert((fs.removeSync('/happy/not/exists')).isOk());
    fs.removeSync('/happy/opfs');

    assert(!(fs.existsSync('/happy/opfs')).unwrap());
    assert((fs.existsSync('/happy/b.txt')).unwrap());
    assert((fs.statSync('/happy/b.txt')).unwrap().isFile());

    // Will create directory
    fs.emptyDirSync('/not-exists');

    // Zip/Unzip
    assert((fs.zipSync('/happy', '/happy.zip')).isOk());
    assert((fs.unzipSync('/happy.zip', '/happy-2')).isOk());

    // List all files and folders in the root directory
    for (const name of (fs.readDirSync(fs.ROOT_DIR)).unwrap()) {
        console.log(name);
    }

    fs.removeSync(fs.ROOT_DIR);
}

(async () => {
    await testAsync();
    testSync();
})();