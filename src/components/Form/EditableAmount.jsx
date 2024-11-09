/**
 * EditableAmount - Компонент для редагування суми з підтримкою валют.
 *
 * Цей компонент дозволяє користувачу редагувати числове значення суми та вибирати валюту з доступного списку.
 * Користувач може змінювати суму та валюту, після чого зміни зберігаються в IndexedDB.
 * Підтримує кілька валют (USD, UAH, RUB) та локалізацію для назв валют.
 *
 * @param {string} id - Унікальний ідентифікатор для поля введення.
 * @param {string} name - Ім'я поля введення.
 * @param {string} label - Текст для мітки, що описує поле.
 * @param {number} value - Поточне числове значення суми, яку можна редагувати.
 * @param {function} onChange - Функція зворотного виклику для обробки змін значення.
 * @param {string} currency - Поточна валюта суми.
 * @param {function} setCurrency - Функція для оновлення валюти.
 * @param {function} t - Функція перекладу для локалізації тексту.
 * @returns {React.Element} - Компонент для редагування суми з вибором валюти.
 */

import PropTypes from "prop-types";
import { useState } from "react";
import { useDBState } from "../../state/IndexedDB";

const EditableAmount = ({
  id,
  name,
  label,
  value,
  onChange,
  currency,
  setCurrency,
  t,
}) => {
  // Стан для контролю режиму редагування
  const [editMode, setEditMode] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useDBState(
    "selectedCurrency",
    currency
  );

  // Обробка натискання клавіш Enter та Escape
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSave();
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  // Зберігає значення та виходить з режиму редагування
  const onSave = () => {
    setCurrency(selectedCurrency);
    setEditMode(false);
  };

  // Відміняє зміни та виходить з режиму редагування
  const onCancel = () => {
    setSelectedCurrency(currency);
    setEditMode(false);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id}>{t(label)}</label>
      {editMode ? (
        <>
          <input
            type="number"
            id={id}
            name={name}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="border rounded p-2"
            onKeyDown={handleKeyDown}
            onBlur={onSave}
          />
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="border rounded p-2"
          >
            <option value="USD">{t("Долари (USD)")}</option>
            <option value="UAH">{t("Гривні (UAH)")}</option>
            <option value="RUB">{t("Рублі (RUB)")}</option>
          </select>
        </>
      ) : (
        <span onClick={() => setEditMode(true)} className="cursor-pointer">
          {value} {selectedCurrency}
        </span>
      )}
    </div>
  );
};

EditableAmount.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  setCurrency: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default EditableAmount;
