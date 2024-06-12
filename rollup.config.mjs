import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import esbuild from 'rollup-plugin-esbuild';

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
    input: 'src/index.ts',
    plugins: [
        esbuild({
            target: 'esnext',
        }),
        replace({
            preventAssignment: true,
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
            __MINIGAME_STD_MINA__: `true`,
        }),
        nodeResolve(),
        commonjs(),
    ],
    output: [
        {
            file: 'dist/index.js',
            format: 'esm',
            sourcemap: false,
        },
    ],
    treeshake: {
        unknownGlobalSideEffects: false,
        propertyReadSideEffects: false,
    },
};