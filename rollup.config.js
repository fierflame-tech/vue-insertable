
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import dts from 'rollup-plugin-dts';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import fsFn from 'fs';
const { name, version, author, license } = JSON.parse(fsFn.readFileSync('./package.json'));

const beginYear = 2019;
const year = new Date().getFullYear();

const banner = `
/*!
 * ${ name } v${ version }
 * (c) ${ beginYear === year ? beginYear : `${ beginYear }-${ year }` } ${ author }
 * @license ${ license }
 */
`;
export default [
	{
		input: 'src/index.ts',
		output: [
			{
				file: 'dist/vue-insertable.common.js',
				sourcemap: true,
				format: 'cjs',
				banner,
				exports: 'default',
			},
			{
				file: 'dist/vue-insertable.esm.js',
				sourcemap: true,
				format: 'esm',
				banner,
			},
		],
		plugins: [
			resolve({ extensions: [ '.mjs', '.js', '.jsx', '.json', '.ts', '.tsx' ] }),
			babel({ extensions: [ '.mjs', '.js', '.jsx', '.es', '.ts', '.tsx' ] }),
			replace({ __VERSION__: version }),
		],
	},
	{
		input: 'src/browser.ts',
		output: [
			{
				file: 'dist/vue-insertable.js',
				sourcemap: true,
				format: 'umd',
				name: 'VueInsertable',
				banner,
				exports: 'default',
				globals: {
					vue: 'Vue',
				},
			},
		],
		plugins: [
			resolve({ extensions: [ '.mjs', '.js', '.jsx', '.json', '.ts', '.tsx' ] }),
			babel({ extensions: [ '.mjs', '.js', '.jsx', '.es', '.ts', '.tsx' ] }),
			replace({ __VERSION__: version }),
		],
		external: ['vue'],
	},
	{
		input: 'src/browser.ts',
		output: [
			{
				file: 'dist/vue-insertable.min.js',
				sourcemap: true,
				format: 'umd',
				name: 'VueInsertable',
				exports: 'default',
				banner,
				globals: {
					vue: 'Vue',
				},
			},
		],
		plugins: [
			resolve({ extensions: [ '.mjs', '.js', '.jsx', '.json', '.ts', '.tsx' ] }),
			babel({ extensions: [ '.mjs', '.js', '.jsx', '.es', '.ts', '.tsx' ] }),
			replace({ __VERSION__: version }),
			terser(),
		],
		external: ['vue'],
	},
	{
		input: 'src/index.ts',
		output: [
			{
				file: 'dist/vue-insertable.esm.min.js',
				sourcemap: true,
				format: 'esm',
				banner,
			},
		],
		plugins: [
			resolve({ extensions: [ '.mjs', '.js', '.jsx', '.json', '.ts', '.tsx' ] }),
			babel({ extensions: [ '.mjs', '.js', '.jsx', '.es', '.ts', '.tsx' ] }),
			replace({ __VERSION__: version }),
			terser(),
		],
	},
	{
		input: [ 'src/index.ts' ],
		output: [ { file: 'types.d.ts', format: 'esm', banner } ],
		plugins: [ dts() ],
		external: ['vue'],
	},
];
