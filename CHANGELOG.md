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
