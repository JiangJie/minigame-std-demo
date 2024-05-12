/**
 * @type {import('rollup').RollupOptions}
 */
export default
    {
        input: 'dist/esbuild/index.js',
        output: [
            {
                file: 'dist/rollup/index.js',
                format: 'esm',
                sourcemap: false,
            },
        ],
        external: [
            'minigame-std',
        ],
        treeshake: 'smallest',
    };