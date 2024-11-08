/**
 * @comment #dev/editable.md
 * Компонент EditableTime
 *
 * Компонент `EditableTime` дозволяє редагувати час у двох режимах:
 * 1. **Режим перегляду:** Відображає час як текст.
 * 2. **Режим редагування:** Дозволяє редагувати час через інпут типу `time`.
 *
 * Користувач може натискати на час для переходу в режим редагування. Після редагування, зміни можуть бути збережені через обробник `onInput`.
 *
 * ## Використання:
 * Імпортуйте компонент:
 * ```jsx
 * import EditableTime from './EditableTime';
 * ```
 *
 * Використовуйте компонент у вашому додатку:
 * ```jsx
 * <EditableTime
 *   value={yourValue}
 *   onInput={handleTimeChange}
 *   name="timeInput"
 *   id="timeInputId"
 *   label="Time"
 * />
 * ```
 *
 * ## Пропси:
 * - `value` (string): поточне значення часу для відображення або редагування.
 * - `onInput` (function): функція для обробки зміни часу.
 * - `label` (string, необов'язково): етикетка для поля.
 * - `showLabel` (bool, необов'язково): якщо `true`, відображатиметься етикетка.
 * - `id` (string, обов'язково): ідентифікатор інпуту.
 * - `name` (string, обов'язково): ім'я інпуту для передачі даних.
 *
 * ## Життєвий цикл компонента:
 * 1. Спочатку компонент відображається в режимі перегляду, де показується поточне значення часу.
 * 2. Користувач може натискати на значення часу, щоб переключитися в режим редагування.
 * 3. В режимі редагування користувач вводить нове значення часу.
 * 4. Після редагування, зміни зберігаються при втраті фокусу або за допомогою батьківського обробника `onInput`.
 * 5. Компонент знову переходить в режим перегляду після внесення змін або скасування.
 *
 * ## Використання хука для IndexedDB:
 * Компонент зберігає значення часу в IndexedDB для збереження даних між перезавантаженнями сторінки.
 * Це дозволяє відновити попереднє значення після оновлення сторінки або повторного завантаження.
 *
 * ## Тестування:
 * Для тестування компонента можна перевіряти:
 * - Чи відображається правильне значення часу в режимі перегляду.
 * - Чи можна редагувати значення часу через інпут.
 * - Чи правильно працює перемикання між режимами перегляду та редагування.
 * - Чи зберігаються зміни або скасовуються відповідно до дій користувача.
 *
 * ## Важливі аспекти:
 * - Компонент використовує хук `useDBState` для роботи з IndexedDB, що дозволяє зберігати та отримувати значення часу.
 * - Пропс `onInput` дозволяє контролювати зміни значення часу у батьківському компоненті.
 * - При редагуванні значення часу, зміни оновлюються в IndexedDB і передаються через обробник `onInput`.
 */

import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useDBState } from "../../state/IndexedDB"; // Імпортуємо хук для роботи з IndexedDB

const EditableTime = ({ value, onInput, label, showLabel, ...props }) => {
  // Використовуємо useDBState для збереження значення часу в IndexedDB
  const [currentValue, setCurrentValue] = useDBState(props.id, value); // Завантажуємо значення з IndexedDB або використовуємо default value

  const [isEditing, setIsEditing] = useState(false);

  // Перехід в режим редагування
  const handleClick = () => {
    setIsEditing(true);
  };

  // Завершення редагування при втраті фокусу
  const handleBlur = () => {
    setIsEditing(false);
    if (onInput) {
      onInput(currentValue);
    }
  };

  // Оновлення значення часу
  const handleChange = (event) => {
    setCurrentValue(event.target.value); // Оновлюємо значення часу в IndexedDB
  };

  useEffect(() => {
    if (onInput) {
      onInput(currentValue); // Оновлюємо батьківський компонент, коли значення змінюється
    }
  }, [currentValue, onInput]);

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
  id: PropTypes.string.isRequired, // id має бути рядком і обов'язковим
  name: PropTypes.string.isRequired, // name має бути рядком і обов'язковим
};

EditableTime.defaultProps = {
  showLabel: true,
};

export default EditableTime;
