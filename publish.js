// publish.mjs
import { execSync } from 'node:child_process';
import fs from 'fs';
import { createRequire } from 'module';

// Use createRequire to import package.json
const require = createRequire(import.meta.url);
const packageJson = require('./package.json');

// Color and symbol constants
const GREEN = '\x1b[92m'; // Green Text
const RED = '\x1b[91m'; // Red Text
const RESET = '\x1b[0m'; // Reset to default
const OK = '✓';
const FAIL = '×';

// Helper function to run shell commands
function runCommand(command, errorMessage) {
	try {
		execSync(command, { stdio: 'inherit' });
		console.log(` ${GREEN}${OK}${RESET} ${command}`);
	} catch (error) {
		console.error(` ${RED}${FAIL} ${errorMessage}${RESET}`);
		process.exit(1);
	}
}

// Step 1: Check for uncommitted changes
try {
	const gitStatus = execSync('git status --porcelain').toString().trim();
	if (gitStatus) {
		console.error(` ${RED}${FAIL} Uncommitted changes found.${RESET}`);
		console.error('   Please commit or stash them before publishing.');
		process.exit(1);
	}
	console.log(` ${GREEN}${OK}${RESET} No uncommitted changes.`);
} catch (error) {
	console.error(` ${RED}${FAIL} Failed to check for uncommitted changes.${RESET}`);
	process.exit(1);
}

// Step 2: Pull latest changes
runCommand(
	'git pull origin $(git rev-parse --abbrev-ref HEAD)',
	'Failed to pull latest changes.'
);

// Step 3: Run tests
runCommand('npm test', 'Tests failed. Aborting publish.');

// Step 4: Clean build artifacts
if (fs.existsSync('clean')) {
	runCommand('npm run clean', 'Clean failed.');
} else {
	console.log(` ${GREEN}${OK}${RESET} No clean script found. Skipping.`);
}

// Step 5: Run linter
runCommand('npm run lint', 'Linting failed. Aborting publish.');

// Step 6: Build project
runCommand('npm run build', 'Build failed. Aborting publish.');

// Step 7: Tag the release
const version = packageJson.version;
try {
	runCommand(`git tag -a "v${version}" -m "Release version ${version}"`, 'Failed to tag the release.');
	runCommand('git push origin --tags', 'Failed to push tags.');
} catch (error) {
	console.error(` ${RED}${FAIL} Tagging or pushing tags failed.${RESET}`);
	process.exit(1);
}

// Step 8: Publish the package
runCommand('npm publish', 'Publishing failed.');

console.log(` ${GREEN}${OK} Package published successfully.${RESET}`);