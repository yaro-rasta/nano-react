Here is a detailed README.md for your nano-react library:

# Nano React

`nano-react` is a lightweight utility library for React applications that provides custom hooks to persist state in various web storage mechanisms: `localStorage`, `sessionStorage`, and `IndexedDB`. This library makes it easy to manage state with persistence, ensuring your data is retained even after a page reload.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [useLSState (localStorage)](#uselsstate-localstorage)
  - [useSSState (sessionStorage)](#usessstate-sessionstorage)
  - [useIDbState (IndexedDB)](#useidbstate-indexeddb)
- [Examples](#examples)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)
- [Notes](#notes)

## Installation

You can install `nano-react` via npm:

```bash
npm install nano-react
```

or using Yarn:

```bash
yarn add nano-react
```

## Usage

Importing the Hooks

```jsx
import { useLSState, useSSState, useIDbState } from 'nano-react';
```

### useLSState (localStorage)

`useLSState` is a custom hook that manages state with persistence in `localStorage`.

**Parameters**

- name (string): The key under which the state will be stored in `localStorage`.
- defaultValue: The initial value if nothing is found in `localStorage`.

**Example**

```jsx
const [count, setCount] = useLSState('app.count', 0);

<button onClick={() => setCount(count + 1)}>
  localStorage count: {count}
</button>
```

### useSSState (sessionStorage)

`useSSState` is a custom hook that manages state with persistence in `sessionStorage`.

**Parameters**

- name (string): The key under which the state will be stored in `sessionStorage`.
- defaultValue: The initial value if nothing is found in `sessionStorage`.

**Example**

```jsx
const [sessionCount, setSessionCount] = useSSState('app.sessionCount', 0);

<button onClick={() => setSessionCount(sessionCount + 1)}>
  sessionStorage count: {sessionCount}
</button>
```

### useIDbState (IndexedDB)

`useIDbState` is a custom hook that manages state with persistence in `IndexedDB`. It allows more complex data storage and is suitable for larger datasets compared to localStorage or sessionStorage.

**Parameters**

- key (string): A unique key to identify the state in IndexedDB.
- defaultValue: The initial value if nothing is found in IndexedDB.
- dbOpts (object): Options for the database:
- name (string): The name of the IndexedDB database. Default is 'db'.
- store (string): The name of the object store within the database. Default is 'store'.

**Example**

```jsx
const [dbCount, setDbCount] = useIDbState('app.dbCount', 0, {
  name: 'userDatabase',
  store: 'userData',
});

<button onClick={() => setDbCount(dbCount + 1)}>
  IndexedDB count: {dbCount}
</button>
```

## Examples

Here is a full example demonstrating all hooks in a simple React component:

```jsx
import React from 'react';
import { useLSState, useSSState, useIDbState } from 'nano-react';

function App() {
  const [count, setCount] = useLSState('app.count', 0);
  const [sessionCount, setSessionCount] = useSSState('app.sessionCount', 0);
  const [dbCount, setDbCount] = useIDbState('app.dbCount', 0, {
    name: 'userDatabase',
    store: 'userData',
  });

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>localStorage count: {count}</button>
      <button onClick={() => setSessionCount(sessionCount + 1)}>sessionStorage count: {sessionCount}</button>
      <button onClick={() => setDbCount(dbCount + 1)}>IndexedDB count: {dbCount}</button>
    </div>
  );
}

export default App;
```

## API Reference

`useLSState(name, defaultValue)`

- Description: Manages state in localStorage.
- Parameters:
- name (string)
- defaultValue

`useSSState(name, defaultValue)`

- Description: Manages state in sessionStorage.
- Parameters:
- name (string)
- defaultValue

`useIDbState(key, defaultValue, dbOpts)`

- Description: Manages state in IndexedDB.
- Parameters:
- key (string)
- defaultValue
- dbOpts (object) => { name, store }

## Contributing

Contributions are welcome! Please read the CONTRIBUTING.md file for guidelines on contributing to this project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Notes:
- **Installation Instructions**: Describes how to install the package.
- **Usage Examples**: Provides clear examples for each hook.
- **API Reference**: Detailed explanation of each hook and its parameters.
- **Contributing and License**: Information on how to contribute and the project’s license. 

Feel free to modify the content to better suit your needs and add any additional sections as necessary, such as FAQs or a section on common issues.
