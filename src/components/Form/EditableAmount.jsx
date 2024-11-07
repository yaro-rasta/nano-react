// EditableAmount.jsx
import PropTypes from "prop-types";
import { useState } from "react";
import { useDBState } from "../../state/IndexedDB"; // Імпортуємо хук

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
  const [editMode, setEditMode] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useDBState(
    "selectedCurrency", // Ключ для збереження в IndexedDB
    currency // Початкове значення
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSave();
    } else if (e.key === "Escape") {
      setEditMode(false);
    }
  };

  const onSave = () => {
    setCurrency(selectedCurrency);
    setEditMode(false);
  };

  return (
    <div className="flex items-center gap-2" onKeyDown={handleKeyDown}>
      <label htmlFor={id}>{t(label)}</label>
      <input
        type="number"
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="border rounded p-2"
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
