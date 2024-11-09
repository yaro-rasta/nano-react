/**
 * EditableTime - Компонент для редагування часу.
 *
 * Цей компонент дозволяє користувачу редагувати значення часу через поле введення або переглядати його в режимі перегляду.
 * В режимі редагування користувач може вибрати час через елемент input типу "time". Зміни зберігаються в IndexedDB.
 *
 * @param {string} id - Унікальний ідентифікатор для поля введення.
 * @param {string} name - Ім'я поля введення.
 * @param {string} label - Текст для мітки, що описує поле.
 * @param {string} value - Поточне значення часу.
 * @param {function} onInput - Функція зворотного виклику для обробки змін значення.
 * @param {boolean} showLabel - Показати або сховати мітку.
 * @returns {React.Element} - Компонент для редагування часу.
 */

import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useDBState } from "../../state/IndexedDB";

const EditableTime = ({ value, onInput, label, showLabel, ...props }) => {
  const [currentValue, setCurrentValue] = useDBState(props.id, value);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (value !== currentValue) setCurrentValue(value);
  }, [value]);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (onInput && currentValue !== value) onInput(currentValue);
  };

  const handleChange = (event) => {
    setCurrentValue(event.target.value);
  };

  return (
    <div className="editable-time-container">
      {showLabel && label && <div className="editable-time-label">{label}</div>}
      <div className="editable-time-content">
        {isEditing ? (
          <input
            type="time"
            id={props.id}
            name={props.name}
            value={currentValue}
            onChange={handleChange}
            onBlur={handleBlur}
            className="editable-time-input"
          />
        ) : (
          <span onClick={handleClick} className="editable-time-view">
            {currentValue || "Click to set time"}
          </span>
        )}
      </div>
    </div>
  );
};

EditableTime.propTypes = {
  value: PropTypes.string.isRequired,
  onInput: PropTypes.func.isRequired,
  label: PropTypes.string,
  showLabel: PropTypes.bool,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

EditableTime.defaultProps = {
  showLabel: true,
};

export default EditableTime;
