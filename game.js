import './dist/rollup/index';
import './libs/weapp-adapter';

window.requestAnimationFrame(loop)

function loop() {
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

    ctx.fillStyle = '#000000'
    ctx.font = `${ parseInt(window.innerWidth / 20) }px Arial`
    ctx.fillText('欢迎使用代码片段', 10, window.innerHeight * 1 / 5)
    ctx.fillText('可在控制台查看代码片段的说明和文档', 10, window.innerHeight * 1 / 5 + 30)

    window.requestAnimationFrame(loop)
}
