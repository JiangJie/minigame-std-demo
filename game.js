require('./dist/index');
require('./libs/weapp-adapter');

// window.requestAnimationFrame(loop)

function loop() {
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

    ctx.fillStyle = '#000000'
    ctx.font = `${ parseInt(window.innerWidth / 20) }px Arial`
    ctx.fillText('minigame-std 小游戏环境测试用例', 10, window.innerHeight * 1 / 5 + 30)

    // window.requestAnimationFrame(loop)
}

loop();