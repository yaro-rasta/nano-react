/**
 * @comment #dev/editable.md
 *
 * # Компонент EditableString
 *
 * Компонент EditableString дозволяє редагувати текстове значення. Він використовує
 * компоненти ViewComponent та EditComponent для перегляду та редагування значення.
 *
 * ## Використання
 *
 * Для використання компонента імпортуйте його у вашому файлі:
 * ```jsx
 * import EditableString from './EditableString';
 * ```
 *
 * Далі, використайте компонент у вашому додатку:
 * ```jsx
 * <EditableString
 *   value={yourValue}
 *   onChange={yourChangeHandler}
 *   name="yourName"
 *   id="yourId"
 *   label="Your Label"
 *   labelInView={true}
 *   labelInEdit={true}
 *   size="lg"
 *   tabIndex={0}
 * />
 * ```
 *
 * ## Пропси компонента
 *
 * - `value` (string): Початкове значення для текстового поля. **Обов'язковий параметр.**
 * - `onChange` (function): Функція, яка викликається при зміні значення.
 * - `name` (string): Ім'я для поля вводу. **Обов'язковий параметр.**
 * - `id` (string): Ідентифікатор для поля вводу. **Обов'язковий параметр.**
 * - `label` (string): Текст мітки, що відображається поруч з полем вводу.
 * - `labelInView` (boolean): Чи відображати мітку в режимі перегляду (за замовчуванням true).
 * - `labelInEdit` (boolean): Чи відображати мітку в режимі редагування (за замовчуванням true).
 * - `size` (string): Розмір поля вводу (наприклад, 'lg', 'sm').
 * - `tabIndex` (number): Індекс вкладки для групи вводу (за замовчуванням 0).
 *
 * ## Життєвий цикл компонента
 *
 * 1. **Ініціалізація стану:** Компонент не має внутрішнього стану, але отримує `value` та `onChange` з батьківського компонента.
 *
 * 2. **Рендеринг:**
 *   - У режимі перегляду (`ViewComponent`): Відображає текстове значення з міткою, якщо `showLabel` є true.
 *   - У режимі редагування (`EditComponent`): Відображає текстове поле з можливістю редагування значення.
 *
 * 3. **Оновлення:** При зміні значення в текстовому полі, викликається функція `onInput`, що оновлює значення в батьківському компоненті.
 *
 * ## Тестування компонента
 *
 * Щоб перевірити роботу компонента, ви можете виконати наступні тести:
 *
 * ### 1. Тест на рендеринг:
 * Переконайтеся, що компонент рендериться без помилок.
 * ```jsx
 * import { render } from '@testing-library/react';
 * import EditableString from './EditableString';
 *
 * test('компонент рендериться без помилок', () => {
 *   render(<EditableString value="Test" onChange={() => {}} name="testName" id="testId" />);
 * });
 * ```
 *
 * ### 2. Тест на початковий стан:
 * Перевірте, чи правильно відображається початкове значення.
 * ```jsx
 * import { render, screen } from '@testing-library/react';
 * import EditableString from './EditableString';
 *
 * test('перевірка початкового значення', () => {
 *   render(<EditableString value="Test" onChange={() => {}} name="testName" id="testId" />);
 *   expect(screen.getByText('Test')).toBeInTheDocument();
 * });
 * ```
 *
 * ### 3. Тест на зміни значення:
 * Симулюйте зміну значення та перевірте, чи викликається `onChange`.
 * ```jsx
 * import { render, screen, fireEvent } from '@testing-library/react';
 * import EditableString from './EditableString';
 *
 * test('перевірка зміни значення', () => {
 *   const handleChange = jest.fn();
 *   render(<EditableString value="Test" onChange={handleChange} name="testName" id="testId" />);
 *
 *   fireEvent.click(screen.getByText('Test')); // Переключаємо в режим редагування
 *   const input = screen.getByRole('textbox');
 *   fireEvent.change(input, { target: { value: 'New Value' } });
 *   expect(handleChange).toHaveBeenCalledWith('New Value');
 * });
 * ```
 */
import { useTheme } from "../../context/useTheme";
import EditableBase from "./EditableBase";
import PropTypes from "prop-types";

const EditComponent = ({ id, name, value, label, showLabel, onInput }) => {
	const theme = useTheme();
	return (
		<div className={theme.editContainer || theme.container}>
			{showLabel && label && (
				<label htmlFor={id} className={theme.editLabel || theme.label}>
					{label}
				</label>
			)}
			<input
				type="text"
				id={id}
				name={name}
				value={String(value)}
				className={theme.input}
				onInput={onInput}
			/>
		</div>
	);
};

EditComponent.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	label: PropTypes.string,
	showLabel: PropTypes.bool,
	onInput: PropTypes.func.isRequired,
};

const EditableString = (props) => (
	<EditableBase
		{...props}
		editComponent={EditComponent}
	/>
);

EditableString.displayName = "EditableString";

EditableString.propTypes = {
	...EditableBase.propTypes,
	value: PropTypes.string.isRequired,
};

export default EditableString;
