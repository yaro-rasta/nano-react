/**
 * @comment #dev/editable.md
 * 
 * # FormLayout Компонент
 *
 * Цей компонент використовує декілька редагованих полів, які зберігаються в локальному сховищі браузера.
 * Компонент дозволяє користувачеві змінювати текстові значення, числові значення та суми з валютою.
 *
 * ## Використання
 *
 * 1. Імпортуйте потрібні компоненти:
 * 
jsx
 * import { useLSState } from "../..";
 * import { AppProvider } from "../../context/AppContext";
 * import EditableString from "./EditableString";
 * import EditableNumber from "./EditableNumber";
 * import EditableAmount from "./EditableAmount";
 *

 *
 * 2. Використовуйте компонент у вашому додатку:
 * 
jsx
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
 *

 *
 * ## Пропси компонентів
 *
 * ### EditableString
 * - id (string): Ідентифікатор для елемента.
 * - name (string): Ім'я для елемента.
 * - label (string): Текст мітки, що відображається поруч з елементом.
 * - value (string): Початкове значення для елемента.
 * - onChange (function): Функція, яка викликається при зміні значення.
 *
 * ### EditableNumber
 * - id (string): Ідентифікатор для елемента.
 * - name (string): Ім'я для елемента.
 * - label (string): Текст мітки, що відображається поруч з елементом.
 * - value (number): Початкове значення для елемента.
 * - onChange (function): Функція, яка викликається при зміні значення.
 *
 * ### EditableAmount
 * - id (string): Ідентифікатор для елемента.
 * - name (string): Ім'я для елемента.
 * - label (string): Текст мітки, що відображається поруч з елементом.
 * - value (number): Початкове значення для елемента.
 * - onChange (function): Функція, яка викликається при зміні значення.
 * - currency (string): Поточна валюта.
 * - setCurrency (function): Функція для зміни валюти.
 *
 *  * ## Життєвий цикл компонента
 *
 * Компонент FormLayout проходить через кілька етапів під час свого життєвого циклу:
 *
 * 1. **Ініціалізація стану:** Компонент використовує хук useLSState для ініціалізації значень з локального сховища або встановлення їх за замовчуванням. Використовуються такі змінні стану:
 *    - textOneLine (string): Значення текстового поля.
 *    - numberValue (number): Значення числового поля.
 *    - amountValue (number): Значення поля суми.
 *    - currency (string): Вибрана валюта.
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
 * 
jsx
 * import { render } from '@testing-library/react';
 * import FormLayout from './FormLayout';
 *
 * test('компонент монтується без помилок', () => {
 *   render(<FormLayout />);
 * });
 *

 *
 * ### 2. Тестування початкового стану:
 * Переконайтеся, що початковий стан компонентів (текстового поля, числового поля та суми) відповідає очікуваному.
 *
 * 
jsx
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
 *

 *
 * ### 3. Тестування подій:
 * Симулюйте зміну значень в полях та перевірте, чи стан компонентів оновлюється належним чином.
 *
 * 
jsx
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
 *

 *
 * ### 4. Тестування зміни валюти:
 * Перевірте, чи компонент коректно обробляє зміну валюти.
 *
 * 
jsx
 * import { render, screen, fireEvent } from '@testing-library/react';
 * import FormLayout from './FormLayout';
 *
 * test('перевірка зміни валюти', () => {
 *   render(<FormLayout />);
 *   const currencyField = screen.getByLabelText(/Currency/i);
 *   fireEvent.change(currencyField, { target: { value: 'USD' } });
 *   expect(currencyField.value).toBe('USD');
 * });
 */

import PropTypes from "prop-types";
import EditableBase from "./EditableBase";
import { AppProvider } from "../../context/AppContext";

const ViewComponent = ({ value, label, showLabel, onClick, currency }) => (
  <div className="flex items-center w-full" onClick={onClick}>
    {showLabel && label && <label className="mr-2">{label}</label>}
    <span>{`${value} ${currency.char}`}</span>
  </div>
);

ViewComponent.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string,
  showLabel: PropTypes.bool,
  onClick: PropTypes.func,
  currency: PropTypes.shape({
    code: PropTypes.string.isRequired,
    char: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

const EditComponent = ({
  id,
  name,
  value,
  label,
  showLabel,
  onInput,
  currency,
  onCurrencyChange,
  currencies,
}) => {
  const { t } = AppProvider.useAppContext();

  return (
    <div className="flex items-center w-full">
      {showLabel && label && (
        <label htmlFor={id} className="mr-2">
          {label}
        </label>
      )}
      <input
        type="number"
        id={id}
        name={name}
        value={value}
        className="border rounded p-2 w-full"
        onInput={onInput}
      />
      <select
        value={currency.code}
        onChange={(e) => onCurrencyChange(e.target.value)}
        className="ml-2 border rounded p-2"
      >
        {currencies.map((curr) => (
          <option key={curr.code} value={curr.code}>
            {t(curr.title)}
          </option>
        ))}
      </select>
    </div>
  );
};

EditComponent.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string,
  showLabel: PropTypes.bool,
  onInput: PropTypes.func.isRequired,
  currency: PropTypes.shape({
    code: PropTypes.string.isRequired,
    char: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onCurrencyChange: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      char: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const EditableAmount = ({
  currencies = [
    { code: "USD", char: "$", title: "Dollar" },
    { code: "EUR", char: "€", title: "Euro" },
    { code: "UAH", char: "₴", title: "Hryvnia" },
  ],
  currency,
  setCurrency,
  ...props
}) => {
  const handleCurrencyChange = (code) => {
    const selectedCurrency = currencies.find((curr) => curr.code === code);
    setCurrency(selectedCurrency);
  };

  return (
    <EditableBase
      {...props}
      viewComponent={(viewProps) => (
        <ViewComponent {...viewProps} currency={currency} />
      )}
      editComponent={(editProps) => (
        <EditComponent
          {...editProps}
          currency={currency}
          onCurrencyChange={handleCurrencyChange}
          currencies={currencies}
        />
      )}
    />
  );
};

EditableAmount.displayName = "EditableAmount";

EditableAmount.propTypes = {
  ...EditableBase.propTypes,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  currency: PropTypes.shape({
    code: PropTypes.string.isRequired,
    char: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      char: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};

export default EditableAmount;
