# State hooks
Working with the ease with the different drivers of the saving state in the browser.

## useLSState()
Custom React hook that persists state in localStorage.
This hook manages state persistence using the browser's `localStorage`. It initializes state
from `localStorage` and updates `localStorage` whenever the state changes. This ensures that
the state is persisted across page reloads and browser restarts.

- **Key**: A unique key to identify the state in `localStorage`.
- **Default Value**: The initial value to use if no value is found in `localStorage`.

### Examples
```jsx
import { useLSState } from 'nanoweb-react';
const [username, setUsername] = useLSState('username', 'guest');
const [theme, setTheme] = useLSState('theme', 'light');
```

@param {string} key - A unique key to identify the state in `localStorage`.
@param {any} defaultValue - The default value for the state.
@return {[any, function]} - An array containing the current state value and a setter function.

## useSSState()
Custom React hook that persists state in sessionStorage.
This hook manages state persistence using the browser's `sessionStorage`. It initializes state
from `sessionStorage` and updates `sessionStorage` whenever the state changes. This ensures
that the state is persisted only for the duration of the page session.

- **Key**: A unique key to identify the state in `sessionStorage`.
- **Default Value**: The initial value to use if no value is found in `sessionStorage`.

### Examples
```jsx
import { useSSState } from 'nanoweb-react';
const [cart, setCart] = useSSState('cart', []);
const [token, setToken] = useSSState('token', null);
```

@param {string} key - A unique key to identify the state in `sessionStorage`.
@param {any} defaultValue - The default value for the state.
@return {[any, function]} - An array containing the current state value and a setter function.

## useIDbState()
Custom React hook that persists state in IndexedDB.
This hook manages state persistence using IndexedDB. It initializes state from the database
and updates the database whenever the state changes. It also uses a subscription mechanism
to synchronize state across components.

- **Key**: A unique key to identify the state in IndexedDB.
- **Default Value**: The initial value to use if no value is found in the database.
- **Database Options**: An object containing database name and store name configurations.

### Examples
```jsx
import { useIDbState } from 'nanoweb-react';
const [height, setHeight] = useIDbState('height', 0, { name: 'app', store: 'store' });
const [size, setSize] = useIDbState('size', 'md');
```

@param {string} key - A unique key to identify the state in IndexedDB.
@param {any} defaultValue - The default value for the state.
@param {Object} [dbOpts={ name: 'db', store: 'store' }] - The database configuration options.
@return {[any, function]} - An array containing the current state value and a setter function.