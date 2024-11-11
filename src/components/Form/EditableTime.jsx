import PropTypes from "prop-types";
import EditableBase from "./EditableBase";
import { useDBState } from "../../state/IndexedDB";

// Компонент перегляду
const ViewComponent = ({ value, label, showLabel, onClick, t = (v) => v }) => (
  <div className="flex items-center w-full" onClick={onClick}>
    {showLabel && label && <label className="mr-2">{t(label)}</label>}
    <span>{value}</span>
  </div>
);

ViewComponent.propTypes = {
  value: PropTypes.string.isRequired,
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
        {label}
      </label>
    )}
    <input
      type="time"
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
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  showLabel: PropTypes.bool,
  onInput: PropTypes.func.isRequired,
  t: PropTypes.func,
};

// Основний компонент EditableTime
const EditableTime = ({ value, setValue, t = (v) => v, ...props }) => {
  const [currentValue, setCurrentValue] = useDBState(value, value); // Використовуємо хук для збереження значення в IndexedDB

  const handleInput = (e) => {
    const newValue = e.target.value;
    setCurrentValue(newValue); // Оновлюємо значення
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

EditableTime.displayName = "EditableTime";

EditableTime.propTypes = {
  ...EditableBase.propTypes,
  value: PropTypes.string.isRequired,
  t: PropTypes.func,
};

export default EditableTime;
