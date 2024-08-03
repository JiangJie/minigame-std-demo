import { addErrorListener, addUnhandledrejectionListener } from 'minigame-std';

// const mock: any = null;

addErrorListener((err) => {
    console.error('addErrorListener message', err.message);
    // console.error('addErrorListener stack', err.stack); // stack is empty
});

addUnhandledrejectionListener((err) => {
    console.error('addUnhandledrejectionListener reason', err.reason);
    // console.log('addUnhandledrejectionListener promise', err.promise);
});

// setTimeout(() => {
//     mock.notExistsFunction();
// }, 1000);

// setTimeout(() => {
//     Promise.reject('test');
// }, 2000);