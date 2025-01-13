import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import { promises as fs } from 'node:fs';

const require = createRequire(import.meta.url);
const { exports } = require('./package.json');
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Custom Plugin to Copy .d.ts Files
function copyDtsFiles(targets) {
	return {
		name: 'copy-dts-files',
		async buildStart() {
			for (const { src, dest } of targets) {
				try {
					const srcPath = path.resolve(__dirname, src);
					const destPath = path.resolve(__dirname, dest);
					console.log(srcPath, destPath);
					await fs.mkdir(path.dirname(destPath), { recursive: true });
					await fs.copyFile(srcPath, destPath);
					console.log(`Copied: ${srcPath} -> ${destPath}`);
				} catch (err) {
					console.error(`Error copying ${src} to ${dest}: ${err.message}`);
				}
			}
		},
	};
}

const result = [];

Object.entries(exports).forEach(([, config]) => {
	const input = config.input;
	const output = [
		{ file: config.require, format: 'cjs', exports: 'auto' },
		{ file: config.import, format: 'esm' },
	];
	const targets = [];
	if (config.types) {
		const dest = config.types;
		const src = config.input.replace(/\.js$/, '.d.ts');
		targets.push({ src, dest });
	}
	const plugins = [
		resolve(),
		commonjs(),
		copyDtsFiles(targets), // Use custom plugin to copy .d.ts files
	];
	result.push({ input, output, plugins });
});

export default result;
