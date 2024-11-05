import { useState } from "react";
import PropTypes from "prop-types";

/**
 * Компонент Editable дозволяє переключатися між режимом перегляду та редагування значення.
 * @todo описати у документації усі onInput, onChange, onCancel.
 * @todo описати покроково як має працювати компонент.
 * @todo переходимо на TAB замість пробілів у коді.
 * @todo додати горячі клавіши ESCAPE, ENTER.
 *
 * @component
 * @param {Object} props - Об'єкт властивостей компонента.
 * @param {string} props.value - Значення для відображення у режимі перегляду.
 * @param {function} props.onChange - Функція, яка викликається при збереженні нового значення.
 * @param {React.ReactNode} props.children - Елементи, які будуть відображатися у режимі редагування.
 *
 * @example
 * return (
 *   <Editable value="100 USD" onChange={(newValue) => console.log(newValue)}>
 *     <input type="text" />
 *   </Editable>
 * )
 *
 * @returns {JSX.Element} Рендерить значення або елементи редагування на основі режиму.
 */
const Editable = ({ value, onChange, children }) => {
  const [isEditing, setEditing] = useState(false);

  /**
   * Перемикає компонент у режим редагування.
   */
  const handleEdit = () => {
    setEditing(true);
  };

  /**
   * Зберігає нове значення та повертається до режиму перегляду.
   */
  const handleSave = () => {
    setEditing(false);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div>
      {isEditing ? (
        <div>
          {children}
		  {/* @todo всі надписи мають використовувати трансляцію t = v => v */}
          <button onClick={handleSave}>{t('Зберегти')}</button>
        </div>
      ) : (
        <div onClick={handleEdit}>{value}</div>
      )}
    </div>
  );
};

Editable.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Editable;
