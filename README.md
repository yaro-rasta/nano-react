# nano-react

Проект для використання різних утіліт для `React` додатків.

## Збереження даних

### useDBState(name, defaultValue)

Працює як звичайний `useState()` тільки ще й зберігає дані у `localStorage`, `sessionStorage`, або `IndexedDB`.

`name` для `localStorage`, `sessionStorage` це рядок, а для `IndexedDB` це може бути і обʼєкт з назвою бази і іншими її атрибутами.

```jsx
import { useDBState } from './localStorage'
// або
import { useDBState } from './sessionStorage'
// або
import { useDBState } from './IndexedDB'
```