import * as esbuild from 'esbuild';

await esbuild.build({
    entryPoints: [
        'src/index.ts',
    ],
    bundle: true,
    splitting: false,
    outdir: 'dist/esbuild',
    format: 'esm',
    treeShaking: true,
    define: {
        __MINIGAME_STD_MINA__: `true`,
    },
});