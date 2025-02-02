# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
1. Guiding Principles
	- Changelogs are for humans, not machines.
	- There should be an entry for every single version.
	- The same types of changes should be grouped.
	- Versions and sections should be linkable.
	- The latest version comes first.
	- The release date of each version is displayed.
	- Mention whether you follow Semantic Versioning.
2. Types of changes
	- `Added` for new features.
	- `Changed` for changes in existing functionality.
	- `Deprecated` for soon-to-be removed features.
	- `Removed` for now removed features.
	- `Fixed` for any bug fixes.
	- `Security` in case of vulnerabilities.

and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2025-02-02

## Changelog

### Added
- Implemented `useLSState` unit tests in `test/browser/state/localStorage.test.jsx` to validate localStorage state handling.
- Added `vitest` plugin to `eslint.config.js` for linting Vitest-specific rules.
- Introduced `ws:check`, `ws:workspace`, `ws:latest`, and `ws:init` scripts in `package.json` for workspace management.
- Added missing `husky` pre-commit hook to enforce workspace checks.
- Included `@testing-library/jest-dom` for enhanced testing assertions in `package.json`.
- Introduced `clean` script to `package.json` for workspace cleanup.
- Added `vitest.setup.js` to configure a jsdom-like test environment and mock `localStorage` and `sessionStorage`.
- Included `react` import in `src/context/AppContext.jsx` to prevent runtime errors.

### Changed
- Migrated test framework from `jest` to `vitest` in `package.json`.
- Updated `test` script in `package.json` to use `vitest --run` instead of `jest`.
- Improved ESLint configuration to better handle React, Hooks, and Vitest environments in `eslint.config.js`.
- Upgraded dependencies in `package.json`, including `react`, `react-router-dom`, and `eslint` plugins.
- Refactored `useTheme.jsx` to correctly import `ThemeContext` instead of `ThemeProvider`.
- Fixed accessibility by adding `rel="noreferrer"` to external links in `src/App.jsx`.
- Modified `test/build.test.js` to remove redundant `@jest/globals` imports.
- Refactored `helloWorld.test.js` to use `test` instead of `it` for consistency with Vitest.
- Improved `storage.test.js` by adding mocks for `console.error` and `console.debug` to avoid unnecessary logs during test failures.
- Adjusted `eslint.config.js` ignores to include `.vite_cache` and `dist-app` directories.

### Fixed
- Resolved incorrect imports in `src/context/useTheme.jsx`.
- Fixed incorrect handling of localStorage sanitization in `test/browser/state/localStorage.test.jsx`.
- Corrected the `useLSState` reference in `test/build.test.js`.
- Addressed an issue where changing localStorage keys did not properly reset state in `useLSState` tests.
- Fixed missing `defaultValue` handling in `test/browser/state/localStorage.test.jsx`.
- Ensured proper React import handling in `src/context/AppContext.jsx`.
- Fixed inconsistent JSON transformation handling in `storage.test.js`.

### Removed
- Removed `@jest/globals` imports from tests, replacing them with `vitest` equivalents.
- Eliminated unused `collapsed` state logic in `src/App.jsx`.


## [1.2.0] - 2025-01-13

### Added
- **`sanitizer` Support:**
  - Added `sanitizer` function to `useLSState`, `useSSState`, and `useIDbState` hooks for value preprocessing before setting them in storage.
  - Improved sanitization on both initialization and updates.

- **`useRemoteState`:**
  - Introduced a new hook to fetch and manage remote state from a URL.
  - Handles base URL resolution and gracefully manages errors during fetch operations.

- **Testing Enhancements:**
  - Added comprehensive test coverage for `useLSState`, `useSSState`, `useIDbState`, and `useRemoteState`.
  - Added transformer tests for `toJSON` and `fromJSON` to handle advanced serialization and deserialization scenarios.

- **Rollup Configuration:**
  - Added support for `.d.ts` file copying in Rollup builds.
  - Included a plugin to preserve JSDoc comments in the output.

### Fixed
- Resolved an issue in `useLSState` and `useSSState` where state did not reset correctly when the key changed.
- Fixed infinite loop scenarios in storage hooks caused by repeated state updates.

### Changed
- Updated `fromJSON` to handle invalid JSON gracefully with enhanced error handling.
- Improved example application to demonstrate all hooks, including the new `useRemoteState`.
- Reorganized build system with explicit `exports` for `input`, `require`, `import`, and `types` paths.

### Removed
- Removed redundant imports and unused variables in `App.jsx` and context files.

## [1.1.1] - 2024-11-29

### Fixed
- Proper dist file paths used now.

## [1.1.0] - 2024-11-29

### Added
- `sanitizer` added to useLSState and useSSState.

## [1.0.0] - 2024-10-31

### Added
- Core Hooks: 
  - `useLSState`: A custom React hook to persist state in `localStorage`.
  - `useSSState`: A custom React hook to persist state in `sessionStorage`.
  - `useIDbState`: A custom React hook to persist state in `IndexedDB` with automatic database initialization and subscription support.
- App Component: 
  - Example usage of all three hooks (`useLSState`, `useSSState`, `useIDbState`) with buttons to increment counts stored in different storage mechanisms.
  - Hot Module Replacement (HMR) support with Vite.
- IndexedDB Implementation: 
  - `useIDbState` includes subscription management to update state when changes are made externally in `IndexedDB`.
  - `getDbInstance`, `getDbValue`, and `setDbValue` functions for handling IndexedDB operations.
- Vite Configuration: 
  - Configured Vite to build the project in library mode, ensuring `react` and `react-dom` are treated as external dependencies.
- Example Project: 
  - A simple React application demonstrating the use of the `nano-react` hooks, complete with a responsive layout and Vite integration.

### Changed
- Initial Version: This is the first stable release of `nano-react`, providing a set of utility hooks for state persistence in web storage mechanisms (`localStorage`, `sessionStorage`, `IndexedDB`).

### Notes
- **Usage Instructions**: Refer to the README for examples of how to use each hook in a React project.
- **Build System**: The library uses Vite for building and bundling, which ensures fast development and optimized production builds.
