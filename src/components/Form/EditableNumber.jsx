/**
 * EditableNumber - Компонент для редагування числових значень.
 *
 * @param {string} id - Унікальний ідентифікатор для поля введення.
 * @param {string} name - Ім'я поля введення.
 * @param {string} label - Текст для мітки, що описує поле.
 * @param {number} value - Поточне числове значення, яке можна редагувати.
 * @param {function} onChange - Функція зворотного виклику для обробки змін значення.
 * @returns {React.Element} - Компонент для редагування числових значень.
 */

import PropTypes from "prop-types";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDBState } from "../../state/IndexedDB"; // Імпортуємо ваш хук

const EditableNumber = ({ id, name, label, value, onChange }) => {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(false);

  // Використовуємо хук для збереження значення в IndexedDB
  const [numberValue, setNumberValue] = useDBState(id, value);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setEditMode(false);
      onChange(numberValue); // Викликаємо onChange для збереження нового значення
    } else if (e.key === "Escape") {
      setNumberValue(value); // Відміняємо редагування при Escape
      setEditMode(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id}>{t(label)}</label>
      {editMode ? (
        <input
          type="number"
          id={id}
          name={name}
          value={numberValue} // Використовуємо значення з IndexedDB
          onChange={(e) => setNumberValue(Number(e.target.value))} // Оновлюємо значення в IndexedDB
          onKeyDown={handleKeyDown}
          className="border rounded p-2"
          onBlur={() => {
            setEditMode(false);
            onChange(numberValue); // Зберігаємо число при втраті фокуса
          }}
        />
      ) : (
        <span onClick={() => setEditMode(true)}>{numberValue}</span> // Виводимо число з IndexedDB
      )}
    </div>
  );
};

EditableNumber.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EditableNumber;
