/**
 * Компонент EditableNumber дозволяє користувачеві вибрати валюту зі списку.
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
const EditableNumber = ({ value, onChange }) => {
  return (
    <select defaultValue={value} onChange={(e) => onChange(e.target.value)}>
      <option value="USD">Долари (USD)</option>
      <option value="UAH">Гривні (UAH)</option>
      <option value="RUB">Рублі (RUB)</option>
    </select>
  );
};

export default EditableNumber;
