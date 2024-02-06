import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import autoExternal from 'rollup-plugin-auto-external';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: './src/index.ts',
  output: {
    file: './lib/index.js',
    format: 'esm'
  },
  plugins: [
    json(),
    nodeResolve(),
    commonjs(),
    autoExternal({
      builtins: true,
      packagePath: './'
    }),
    typescript()
  ]
};
