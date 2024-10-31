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
- Documentation and Console Warnings: 
  - Warnings and error messages for invalid usage, such as non-string keys in `localStorage` and `sessionStorage` hooks.
- Example Project: 
  - A simple React application demonstrating the use of the `nano-react` hooks, complete with a responsive layout and Vite integration.

### Changed
- Initial Version: This is the first stable release of `nano-react`, providing a set of utility hooks for state persistence in web storage mechanisms (`localStorage`, `sessionStorage`, `IndexedDB`).

### Notes
- **Usage Instructions**: Refer to the README for examples of how to use each hook in a React project.
- **Build System**: The library uses Vite for building and bundling, which ensures fast development and optimized production builds.
