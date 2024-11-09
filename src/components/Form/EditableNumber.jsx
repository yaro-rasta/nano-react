/**
 * EditableNumber - Компонент для редагування числових значень.
 *
 * Цей компонент дозволяє користувачу редагувати числові значення через input типу "number". Користувач може змінювати значення
 * у числовому полі та зберігати їх, натискаючи Enter або скасовувати зміни через Escape. Зміни зберігаються в IndexedDB.
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
import { useDBState } from "../../state/IndexedDB";

const EditableNumber = ({ id, name, label, value, onChange }) => {
  const [editMode, setEditMode] = useState(false);
  const [numberValue, setNumberValue] = useDBState(id, value);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setEditMode(false);
      onChange(numberValue);
    } else if (e.key === "Escape") {
      setNumberValue(value);
      setEditMode(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id}>{label}</label>
      {editMode ? (
        <input
          type="number"
          id={id}
          name={name}
          value={numberValue}
          onChange={(e) => setNumberValue(Number(e.target.value))}
          onKeyDown={handleKeyDown}
          className="border rounded p-2"
          onBlur={() => {
            setEditMode(false);
            onChange(numberValue);
          }}
        />
      ) : (
        <span onClick={() => setEditMode(true)}>{numberValue}</span>
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
