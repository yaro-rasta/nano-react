/**
 * Компонент EditableNumber дозволяє користувачеві вибрати валюту зі списку.
 * @todo описати покроково як має працювати компонент.
 *
 * @component
 * @param {Object} props - Об'єкт властивостей компонента.
 * @param {string} props.value - Поточна обрана валюта.
 * @param {function} props.onChange - Функція, яка викликається при зміні значення валюти.
 *
 * @example
 * return (
 *   <EditableNumber value="USD" onChange={(val) => console.log(val)} />
 * )
 *
 * @returns {JSX.Element} Рендерить випадаючий список для вибору валюти.
 */
// @todo використовувати через базовий компонет, це або число, або називається EditableSelect
// optionsList має передавитись через props.
const EditableNumber = ({ value, onChange }) => {
  return (
    <select defaultValue={value} onChange={(e) => onChange(e.target.value)}>
      <option value="USD">Долари (USD)</option>
      <option value="UAH">Гривні (UAH)</option>
      <option value="RUB">Рублі (RUB)</option>
    </select>
  );
};

// @todo додати propTypes.

export default EditableNumber;
