/**
 * @comment #dev/editable.md
 * Компонент EditableTime
 *
 * Компонент `EditableTime` є розширенням базового компонента `EditableBase` і призначений для редагування значення часу.
 * Цей компонент дозволяє користувачеві переглядати та редагувати значення часу у форматі поля вводу типу `time`.
 * В основному використовується для відображення часу, який може бути змінений користувачем. Компонент складається з двох частин:
 *
 * 1. **`ViewComponent`** - компонент для перегляду значення часу, який просто відображає поточне значення в форматі години та хвилини.
 * 2. **`EditComponent`** - компонент для редагування часу, де користувач може вводити нове значення часу через інпут типу `time`.
 *
 * Користувач може переключатись між режимами перегляду та редагування за допомогою кліків по значенню або взаємодії з інпутом.
 *
 * ## Використання:
 * Компонент `EditableTime` застосовується для забезпечення інтерфейсу для редагування часу. Він дозволяє:
 * - Відображати час у вигляді тексту.
 * - Дозволяти користувачу редагувати час.
 *
 * * Для використання компонента імпортуйте його у вашому файлі:
 * ```jsx
 * import EditableTime from './EditableTime';
 * ```
 *
 * Далі, використайте компонент у вашому додатку:
 * ```jsx
 * <EditableTime
 *   value={yourValue}
 *   onInput={yourChangeHandler}
 *   name="yourName"
 *   id="yourId"
 *   label="Your Label"
 * />
 * ```
 *
 * ## Пропси:
 * - `value` (string): обов'язковий пропс, який визначає поточне значення часу для відображення або редагування.
 * - `label` (string, не обов'язково): етикетка, яка може бути показана поряд з полем.
 * - `showLabel` (bool, не обов'язково): якщо `true`, етикетка буде відображена.
 * - `onInput` (function, обов'язково): функція, яка буде викликана при введенні нового значення часу.
 * - Всі інші пропси передаються компоненту `EditableBase`, що дозволяє налаштовувати додаткову поведінку.
 *
 * ## Життєвий цикл компонента:
 * 1. Спочатку компонент відображається в режимі перегляду, де показується поточне значення часу.
 * 2. Користувач може натискати на значення часу, щоб переключитися в режим редагування.
 * 3. В режимі редагування користувач вводить нове значення часу.
 * 4. Після редагування, зміни можуть бути збережені або скасовані в залежності від функціоналу компонента `EditableBase`.
 * 5. Компонент знову переходить в режим перегляду після внесення змін або скасування.
 *
 * ## Тестування:
 * Для тестування компонента можна перевіряти:
 * - Чи відображається правильне значення часу в режимі перегляду.
 * - Чи можна редагувати значення часу через інпут.
 * - Чи правильно працює перемикання між режимами перегляду та редагування.
 * - Чи зберігаються зміни або скасовуються відповідно до дій користувача.
 *
 * ## Важливі аспекти:
 * - Компонент використовує інтерфейс `EditableBase` для обробки всіх основних функцій редагування і перегляду.
 * - Важливо передавати правильні пропси, зокрема `value`, щоб коректно відображати та редагувати значення часу.
 * - Пропс `onInput` дозволяє контролювати зміни значення часу у батьківському компоненті.
 *
 */

import EditableBase from "./EditableBase";
import PropTypes from "prop-types";

const ViewComponent = ({ value, label, showLabel, onClick }) => (
  <div className="flex items-center w-full" onClick={onClick}>
    {showLabel && label && <label className="mr-2">{label}</label>}
    <span>{value}</span>
  </div>
);

ViewComponent.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  showLabel: PropTypes.bool,
  onClick: PropTypes.func,
};

const EditComponent = ({ id, name, value, label, showLabel, onInput }) => (
  <div className="flex items-center w-full">
    {showLabel && label && (
      <label htmlFor={id} className="mr-2">
        {label}
      </label>
    )}
    <input
      type="time"
      id={id}
      name={name}
      value={value}
      className="border rounded p-2 w-full "
      onInput={onInput}
    />
  </div>
);

EditComponent.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  showLabel: PropTypes.bool,
  onInput: PropTypes.func.isRequired,
};

const EditableTime = (props) => (
  <EditableBase
    {...props}
    viewComponent={ViewComponent}
    editComponent={EditComponent}
  />
);

EditableTime.displayName = "EditableTime";

EditableTime.propTypes = {
  ...EditableBase.propTypes,
  value: PropTypes.string.isRequired,
};

export default EditableTime;