/**
 * @comment #dev/editable.md
 * @todo напиши документацію українською мовою яка описує як користуватись компонентом, всі його функції та можливості
 * покроково і всі змінні які передаються та повертаються.
 * @todo напиши сюди md документацію українською мовою у js коментарі а також допиши jsdoc для змінних і результату.
 * @todo також додай та опиши сюди до документації lifeCycle компонента так щоб було легко покроково тестувати (перевірити) роботу компонента.
 */

/**
 * # FormLayout Компонент
 *
 * Цей компонент використовує декілька редагованих полів, які зберігаються в локальному сховищі браузера.
 * Компонент дозволяє користувачеві змінювати текстові значення, числові значення та суми з валютою.
 *
 * ## Використання
 *
 * 1. Імпортуйте потрібні компоненти:
 * ```jsx
 * import { useLSState } from "../..";
 * import { AppProvider } from "../../context/AppContext";
 * import EditableString from "./EditableString";
 * import EditableNumber from "./EditableNumber";
 * import EditableAmount from "./EditableAmount";
 * ```
 *
 * 2. Використовуйте компонент у вашому додатку:
 * ```jsx
 * function FormLayout() {
 *   const { t } = AppProvider.useAppContext();
 *   const [textOneLine, setTextOneLine] = useLSState("textOneLine", "Text in one line");
 *   const [numberValue, setNumberValue] = useLSState("numberValue", 0);
 *   const [amountValue, setAmountValue] = useLSState("amountValue", 0);
 *   const [currency, setCurrency] = useLSState("currency", "UAH");
 *
 *   return (
 *     <div className="flex flex-col gap-5">
 *       <EditableString
 *         id="textOneLine"
 *         name="textOneLine"
 *         label={t("Name")}
 *         value={textOneLine}
 *         onChange={setTextOneLine}
 *       />
 *       <EditableNumber
 *         id="numberValue"
 *         name="numberValue"
 *         label={t("Number")}
 *         value={numberValue}
 *         onChange={setNumberValue}
 *       />
 *       <EditableAmount
 *         id="amountValue"
 *         name="amountValue"
 *         label={t("Amount")}
 *         value={amountValue}
 *         onChange={setAmountValue}
 *         currency={currency}
 *         setCurrency={setCurrency}
 *       />
 *     </div>
 *   );
 * }
 * ```
 *
 * ## Пропси компонентів
 *
 * ### EditableString
 * - `id` (string): Ідентифікатор для елемента.
 * - `name` (string): Ім'я для елемента.
 * - `label` (string): Текст мітки, що відображається поруч з елементом.
 * - `value` (string): Початкове значення для елемента.
 * - `onChange` (function): Функція, яка викликається при зміні значення.
 *
 * ### EditableNumber
 * - `id` (string): Ідентифікатор для елемента.
 * - `name` (string): Ім'я для елемента.
 * - `label` (string): Текст мітки, що відображається поруч з елементом.
 * - `value` (number): Початкове значення для елемента.
 * - `onChange` (function): Функція, яка викликається при зміні значення.
 *
 * ### EditableAmount
 * - `id` (string): Ідентифікатор для елемента.
 * - `name` (string): Ім'я для елемента.
 * - `label` (string): Текст мітки, що відображається поруч з елементом.
 * - `value` (number): Початкове значення для елемента.
 * - `onChange` (function): Функція, яка викликається при зміні значення.
 * - `currency` (string): Поточна валюта.
 * - `setCurrency` (function): Функція для зміни валюти.
 *
 *  * ## Життєвий цикл компонента
 *
 * Компонент FormLayout проходить через кілька етапів під час свого життєвого циклу:
 *
 * 1. **Ініціалізація стану:** Компонент використовує хук `useLSState` для ініціалізації значень з локального сховища або встановлення їх за замовчуванням. Використовуються такі змінні стану:
 *    - `textOneLine` (string): Значення текстового поля.
 *    - `numberValue` (number): Значення числового поля.
 *    - `amountValue` (number): Значення поля суми.
 *    - `currency` (string): Вибрана валюта.
 *
 * 2. **Рендеринг:** Компонент відображає три редаговані поля (EditableString, EditableNumber, EditableAmount), кожне з яких має свої пропси для значень та функцій зміни значень.
 *
 * 3. **Оновлення:** При зміні значень в полях, компонент автоматично оновлює стан і зберігає нові значення в локальному сховищі.
 *
 * ## Тестування компонента
 *
 * Для тестування компонента можна використовувати такі підходи:
 *
 * ### 1. Монтуючий тест:
 * Перевірте, чи компонент правильно монтується без помилок.
 *
 * ```jsx
 * import { render } from '@testing-library/react';
 * import FormLayout from './FormLayout';
 *
 * test('компонент монтується без помилок', () => {
 *   render(<FormLayout />);
 * });
 * ```
 *
 * ### 2. Тестування початкового стану:
 * Переконайтеся, що початковий стан компонентів (текстового поля, числового поля та суми) відповідає очікуваному.
 *
 * ```jsx
 * import { render, screen } from '@testing-library/react';
 * import FormLayout from './FormLayout';
 *
 * test('перевірка початкового стану компонентів', () => {
 *   render(<FormLayout />);
 *   const textField = screen.getByLabelText(/Name/i);
 *   const numberField = screen.getByLabelText(/Number/i);
 *   const amountField = screen.getByLabelText(/Amount/i);
 *
 *   expect(textField.value).toBe('Text in one line');
 *   expect(numberField.value).toBe('0');
 *   expect(amountField.value).toBe('0');
 * });
 * ```
 *
 * ### 3. Тестування подій:
 * Симулюйте зміну значень в полях та перевірте, чи стан компонентів оновлюється належним чином.
 *
 * ```jsx
 * import { render, screen, fireEvent } from '@testing-library/react';
 * import FormLayout from './FormLayout';
 *
 * test('перевірка оновлення значень', () => {
 *   render(<FormLayout />);
 *   const textField = screen.getByLabelText(/Name/i);
 *   const numberField = screen.getByLabelText(/Number/i);
 *   const amountField = screen.getByLabelText(/Amount/i);
 *
 *   fireEvent.change(textField, { target: { value: 'New text' } });
 *   fireEvent.change(numberField, { target: { value: '123' } });
 *   fireEvent.change(amountField, { target: { value: '456' } });
 *
 *   expect(textField.value).toBe('New text');
 *   expect(numberField.value).toBe('123');
 *   expect(amountField.value).toBe('456');
 * });
 * ```
 *
 * ### 4. Тестування зміни валюти:
 * Перевірте, чи компонент коректно обробляє зміну валюти.
 *
 * ```jsx
 * import { render, screen, fireEvent } from '@testing-library/react';
 * import FormLayout from './FormLayout';
 *
 * test('перевірка зміни валюти', () => {
 *   render(<FormLayout />);
 *   const currencyField = screen.getByLabelText(/Currency/i);
 *   fireEvent.change(currencyField, { target: { value: 'USD' } });
 *   expect(currencyField.value).toBe('USD');
 * });
 * ```
 *
 */

import { useLSState } from "../..";
import { AppProvider } from "../../context/AppContext";
import EditableString from "./EditableString";
import EditableNumber from "./EditableNumber";
import EditableAmount from "./EditableAmount ";

function FormLayout() {
  const { t } = AppProvider.useAppContext();
  const [textOneLine, setTextOneLine] = useLSState(
    "textOneLine",
    "Text in one line"
  );
  const [numberValue, setNumberValue] = useLSState("numberValue", 0);
  const [amountValue, setAmountValue] = useLSState("amountValue", 0);
  const [currency, setCurrency] = useLSState("currency", "UAH");

  return (
    <div className="flex flex-col gap-5">
      <EditableString
        id="textOneLine"
        name="textOneLine"
        label={t("Name")}
        value={textOneLine}
        onChange={setTextOneLine}
      />
      <EditableNumber
        id="numberValue"
        name="numberValue"
        label={t("Number")}
        value={numberValue}
        onChange={setNumberValue}
      />
      <EditableAmount
        id="amountValue"
        name="amountValue"
        label={t("Amount")}
        value={amountValue}
        onChange={setAmountValue}
        currency={currency}
        setCurrency={setCurrency}
      />
    </div>
  );
}

export default FormLayout;
