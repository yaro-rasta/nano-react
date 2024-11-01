const { resolve, dirname, findAllFiles, ensureDirectory, save, loadTXT } = require('nanoweb-fs');

// Directory containing your source files
const srcDir = resolve(__dirname, 'src');
// Directory where your documentation Markdown files will be saved
const docsDir = resolve(__dirname, 'docs');
ensureDirectory(docsDir, true);

const docs = new Map();

function renderComment(comment) {
	const arr = Array.isArray(comment) ? comment : comment.split('\n');
	const rows = arr.map(r => {
		if (' */' === r) return null;
		return String(r.startsWith(' * ') ? r.slice(3) : r).trimEnd();
	}).filter(r => null !== r);
	return rows.join('\n');
}

function extractComments(filePath) {
	const content = (loadTXT(filePath, '\n', true) || []).join('\n');
	const commentPattern = /\/\*\*\s*\* @comment ([\s\S]*?)\*\//g;
	const matches = content.match(commentPattern);

	if (!matches) return;
	matches.forEach(match => {
		const [_, comment] = match.match(/@comment (.*)/s);
		const [filePath, ...commentContent] = comment.trim().split('\n');
		const fullPath = resolve(docsDir, filePath.trim().replace(/^\#/, ''));
		if (!docs.has(fullPath)) {
			docs.set(fullPath, []);
		}
		const arr = docs.get(fullPath);
		arr.push(renderComment(commentContent));
	});
}

const extToSearchIn = [
	'.js', '.jsx', '.mjs', '.cjs', '.js', '.ts', 
	'.scss', 
	'.yaml', '.nano'
];
const ignoreDirs = ['node_modules', 'dist', 'tmp'];
const files = findAllFiles(srcDir, { endsWith: extToSearchIn }, { includes: ignoreDirs });
console.debug(files);
files.forEach(filePath => {
	extractComments(filePath);
});
docs.entries().forEach(([file, rows]) => {
	const dir = dirname(file);
	ensureDirectory(dir);
	save(file, rows.join('\n\n').trim());
	console.info(`Documentation generated: ${file}`);
});
