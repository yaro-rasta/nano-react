import PropTypes from "prop-types";
import EditableBase from "./EditableBase";
import { useDBState } from "../../state/IndexedDB";

// Компонент перегляду
const ViewComponent = ({ value, label, showLabel, onClick, t = (v) => v }) => (
  <div className="flex items-center w-full" onClick={onClick}>
    {showLabel && label && <label className="mr-2">{t(label)}</label>}{" "}
    {/* Викликаємо t для перекладу лейбла */}
    <span>{value}</span>
  </div>
);

ViewComponent.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string,
  showLabel: PropTypes.bool,
  onClick: PropTypes.func,
  t: PropTypes.func,
};

// Компонент редагування
const EditComponent = ({
  id,
  name,
  value,
  label,
  showLabel,
  onInput,
  t = (v) => v,
}) => (
  <div className="flex items-center w-full">
    {showLabel && label && (
      <label htmlFor={id} className="mr-2">
        {t(label)} {/* Викликаємо t для перекладу лейбла */}
      </label>
    )}
    <input
      type="number"
      id={id}
      name={name}
      value={value}
      className="border rounded p-2 w-full"
      onInput={onInput}
    />
  </div>
);

EditComponent.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string,
  showLabel: PropTypes.bool,
  onInput: PropTypes.func.isRequired,
  t: PropTypes.func,
};

// Основний компонент EditableNumber
const EditableNumber = ({ value, t = (v) => v, ...props }) => {
  const [currentValue, setCurrentValue] = useDBState(props.id, value); // Використовуємо хук для збереження значення в IndexedDB

  // Обробка введення значення
  const handleInput = (e) => {
    const newValue = e.target.value;
    // Перевірка, якщо порожнє значення, то очищуємо
    if (newValue === "") {
      setCurrentValue(""); // Оновлюємо значення на порожнє
    } else {
      const numberValue = Number(newValue);
      if (!isNaN(numberValue)) {
        setCurrentValue(numberValue); // Якщо це число, оновлюємо стейт
      }
    }
  };

  return (
    <EditableBase
      {...props}
      value={currentValue}
      viewComponent={(viewProps) => <ViewComponent {...viewProps} t={t} />}
      editComponent={(editProps) => (
        <EditComponent {...editProps} onInput={handleInput} t={t} />
      )}
    />
  );
};

EditableNumber.displayName = "EditableNumber";

EditableNumber.propTypes = {
  ...EditableBase.propTypes,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  t: PropTypes.func,
};

export default EditableNumber;
