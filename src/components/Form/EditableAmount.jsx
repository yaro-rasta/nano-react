import PropTypes from "prop-types"
import EditableBase from "./EditableBase"
import defaultCurrencies from "./currencies"

const ViewComponent = ({ value, label, showLabel, onClick, currency, t = v => v }) => (
	<div className="flex items-center w-full" onClick={onClick}>
		{showLabel && label && <label className="mr-2">{t(label)}</label>}
		<span>{`${value} ${currency.char}`}</span>
	</div>
)

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
	t: PropTypes.func
}

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
	t = v => v,
}) => {
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
}

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
	t: PropTypes.func
}

/**
 * @comment #dev/editable.md
 *
 * # Компонент EditableAmount
 *
 * Компонент EditableAmount дозволяє редагувати числове значення з вибором валюти.
 * Він використовує компоненти ViewComponent та EditComponent для перегляду та редагування значення.
 *
 * ## Використання
 *
 * Для використання компонента імпортуйте його у вашому файлі:
 * 
 * ```jsx
 * import EditableAmount from './EditableAmount';
 * ```
 *
 * Далі, використайте компонент у вашому додатку:
 * 
 * ```jsx
 * <EditableAmount
 *   value={amount}
 *   onChange={yourChangeHandler}
 *   name="amount"
 *   id="amountId"
 *   label="Сума"
 *   currency={selectedCurrency}
 *   setCurrency={setSelectedCurrency}
 * />
 * ```
 *
 * ## Пропси компонента
 *
 * - value (string | number): Початкове значення для поля вводу. **Обов'язковий параметр.**
 * - onChange (function): Функція, яка викликається при зміні значення.
 * - name (string): Ім'я для поля вводу. **Обов'язковий параметр.**
 * - id (string): Ідентифікатор для поля вводу. **Обов'язковий параметр.**
 * - label (string): Текст мітки, що відображається поруч з полем вводу.
 * - currency (string): Вибрана валюта, що відображається поряд з числовим значенням. **Обов'язковий параметр.**
 * - setCurrency (function): Функція для оновлення валюти.
 * - currencies (array): Масив доступних валют для вибору (за замовчуванням ["$", "€", "UAH"]).
 *
 * ## Життєвий цикл компонента
 *
 * 1. **Ініціалізація:** Компонент EditableAmount отримує значення та функцію для зміни валюти через пропси.
 *
 * 2. **Рендеринг:**
 *   - У режимі перегляду (ViewComponent): Відображає числове значення з валютою та міткою, якщо showLabel є true.
 *   - У режимі редагування (EditComponent): Відображає поле вводу для числа та випадаючий список для вибору валюти.
 *
 * 3. **Оновлення:**
 *   - При зміні значення в полі вводу, викликається функція onInput, що оновлює значення в батьківському компоненті.
 *   - При виборі нової валюти, викликається функція onCurrencyChange, що оновлює валюту в стані батьківського компонента.
 *
 * ## Тестування життєвого циклу компонента
 *
 * Щоб протестувати життєвий цикл компонента, ви можете виконати наступні кроки:
 *
 * ### 1. Тест на рендеринг:
 * Переконайтеся, що компонент рендериться без помилок.
 * 
 * ```jsx
 * import { render } from '@testing-library/react';
 * import EditableAmount from './EditableAmount';
 *
 * test('компонент рендериться без помилок', () => {
 *   render(<EditableAmount value={0} onChange={() => {}} name="amount" id="amountId" currency="UAH" setCurrency={() => {}} />);
 * });
 * ```
 *
 * ### 2. Тест на початковий стан:
 * Перевірте, чи правильно відображається початкове значення та валюта.
 *
 * ```jsx
 * import { render, screen } from '@testing-library/react';
 * import EditableAmount from './EditableAmount';
 *
 * test('перевірка початкового значення і валюти', () => {
 *   render(<EditableAmount value={100} onChange={() => {}} name="amount" id="amountId" currency="UAH" setCurrency={() => {}} />);
 *   expect(screen.getByText('100 UAH')).toBeInTheDocument();
 * });
 * ```
 *
 * ### 3. Тест на зміну значення:
 * Симулюйте зміну значення та перевірте, чи викликається onChange.
 * 
 * ```jsx
 * import { render, screen, fireEvent } from '@testing-library/react';
 * import EditableAmount from './EditableAmount';
 *
 * test('перевірка зміни значення', () => {
 *   const handleChange = jest.fn();
 *   render(<EditableAmount value={100} onChange={handleChange} name="amount" id="amountId" currency="UAH" setCurrency={() => {}} />);
 *
 *   const input = screen.getByRole('spinbutton'); // Оскільки це поле для введення числа
 *   fireEvent.change(input, { target: { value: '150' } });
 *   expect(handleChange).toHaveBeenCalledWith('150'); // Перевірте, чи викликано onChange з новим значенням
 * });
 * ```
 *
 * ### 4. Тест на зміну валюти:
 * Перевірте, чи валюта змінюється при виборі з випадаючого списку.
 * 
 * ```jsx
 * import { render, screen, fireEvent } from '@testing-library/react';
 * import EditableAmount from './EditableAmount';
 *
 * test('перевірка зміни валюти', () => {
 *   const setCurrency = jest.fn();
 *   render(<EditableAmount value={100} onChange={() => {}} name="amount" id="amountId" currency="UAH" setCurrency={setCurrency} />);
 *
 *   const select = screen.getByRole('combobox');
 *   fireEvent.change(select, { target: { value: '€' } });
 *   expect(setCurrency).toHaveBeenCalledWith('€'); // Перевірте, чи викликано setCurrency з новою валютою
 * });
 * ```
 */
const EditableAmount = ({
	currencies = defaultCurrencies,
	currency,
	setCurrency,
	t = v => v,
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
				<ViewComponent {...viewProps} currency={currency} t={t} />
			)}
			editComponent={(editProps) => (
				<EditComponent
					{...editProps}
					currency={currency}
					onCurrencyChange={handleCurrencyChange}
					currencies={currencies}
					t={t}
				/>
			)}
		/>
	);
}

EditableAmount.displayName = "EditableAmount"

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
	t: PropTypes.func
}

export default EditableAmount
