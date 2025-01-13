/**
 * @comment #dev/editable.md
 *
 * # Компонент EditableNumber
 *
 * Компонент `EditableNumber` дозволяє редагувати числове значення.
 * Він використовує компоненти `ViewComponent` та `EditComponent` для перегляду та редагування значення.
 *
 * ## Використання
 *
 * Для використання компонента імпортуйте його у вашому файлі:
 * ```jsx
 * import EditableNumber from './EditableNumber';
 * ```
 *
 * Далі, використайте компонент у вашому додатку:
 * ```jsx
 * <EditableNumber
 *   value={numberValue}
 *   onChange={yourChangeHandler}
 *   name="number"
 *   id="numberId"
 *   label="Кількість"
 * />
 * ```
 *
 * ## Пропси компонента
 *
 * - `value` (string | number): Початкове значення для поля вводу. **Обов'язковий параметр.**
 * - `onChange` (function): Функція, яка викликається при зміні значення.
 * - `name` (string): Ім'я для поля вводу. **Обов'язковий параметр.**
 * - `id` (string): Ідентифікатор для поля вводу. **Обов'язковий параметр.**
 * - `label` (string): Текст мітки, що відображається поруч з полем вводу.
 * - `showLabel` (bool): Вказує, чи відображати мітку.
 *
 * ## Життєвий цикл компонента
 *
 * 1. **Ініціалізація:** Компонент `EditableNumber` отримує значення через пропси.
 *
 * 2. **Рендеринг:**
 *   - У режимі перегляду (`ViewComponent`): Відображає числове значення та мітку, якщо `showLabel` є true.
 *   - У режимі редагування (`EditComponent`): Відображає поле вводу для числа з міткою, якщо `showLabel` є true.
 *
 * 3. **Оновлення:**
 *   - При зміні значення в полі вводу, викликається функція `onInput`, що оновлює значення в батьківському компоненті.
 *
 * ## Тестування життєвого циклу компонента
 *
 * Щоб протестувати життєвий цикл компонента, ви можете виконати наступні кроки:
 *
 * ### 1. Тест на рендеринг:
 * Переконайтеся, що компонент рендериться без помилок.
 * ```jsx
 * import { render } from '@testing-library/react';
 * import EditableNumber from './EditableNumber';
 *
 * test('компонент рендериться без помилок', () => {
 *   render(<EditableNumber value={0} onChange={() => {}} name="number" id="numberId" />);
 * });
 * ```
 *
 * ### 2. Тест на початковий стан:
 * Перевірте, чи правильно відображається початкове значення.
 * ```jsx
 * import { render, screen } from '@testing-library/react';
 * import EditableNumber from './EditableNumber';
 *
 * test('перевірка початкового значення', () => {
 *   render(<EditableNumber value={100} onChange={() => {}} name="number" id="numberId" />);
 *   expect(screen.getByText('100')).toBeInTheDocument();
 * });
 * ```
 *
 * ### 3. Тест на зміну значення:
 * Симулюйте зміну значення та перевірте, чи викликається `onChange`.
 * ```jsx
 * import { render, screen, fireEvent } from '@testing-library/react';
 * import EditableNumber from './EditableNumber';
 *
 * test('перевірка зміни значення', () => {
 *   const handleChange = jest.fn();
 *   render(<EditableNumber value={100} onChange={handleChange} name="number" id="numberId" />);
 *
 *   const input = screen.getByRole('spinbutton'); // Оскільки це поле для введення числа
 *   fireEvent.change(input, { target: { value: '150' } });
 *   expect(handleChange).toHaveBeenCalledWith('150'); // Перевірте, чи викликано onChange з новим значенням
 * });
 * ```
 */
import { useTheme } from "../../context/useTheme";
import PropTypes from "prop-types";
import EditableBase from "./EditableBase";

const EditComponent = ({ id, name, value, label, showLabel, onInput }) => {
	const theme = useTheme();
	return (
		<div className={theme.editContainer}>
			{showLabel && label && (
				<label htmlFor={id} className={theme.editLabel || theme.label}>
					{label}
				</label>
			)}
			<input
				type="number"
				id={id}
				name={name}
				value={value}
				className={theme.input}
				onInput={onInput}
			/>
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
};

const EditableNumber = (props) => (
	<EditableBase
		{...props}
		editComponent={EditComponent}
	/>
);

EditableNumber.displayName = "EditableNumber";

EditableNumber.propTypes = {
	...EditableBase.propTypes,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default EditableNumber;
